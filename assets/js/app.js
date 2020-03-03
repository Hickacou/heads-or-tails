const app = new Vue({
    el: "#app",
    data: {
        simulationSettings: {
            throws: 0,
            interval: 50,
            tailsColor: "#FF0000",
            headsColor: "#0000FF"
        },
        simulationData: {
            thrownCoins: 0,
            historyString: "",
            heads: {
                count: 0,
                streak: 0,
                hightestStreak: 0,
                percentage: 0,
            },
            tails: {
                count: 0,
                streak: 0,
                hightestStreak: 0,
                percentage: 0,
            },
            fiftyFifty: 0
        },
        section: "settings"
    },
    computed: {
        outcomes: function () {
            const n = this.simulationSettings.throws;
            if (n <= 0) {
                this.simulationSettings.throws = 0
                return "∞";
            }
            var pow = Math.pow(2, n);
            if (pow == Infinity) return `2<sup>${n}</sup>`;
            pow = pow.toString();
            if (pow.length < 7) return pow;
            if (pow.includes("e")) {
                pow = pow.split("e");
                console.log(pow);
                return pow[0].substring(0, 5).replace(".", ",") + ".10<sup>" + pow[1].slice(1) + "</sup>";
            }
            return (pow / Math.pow(10, pow.length - 1)).toFixed(3).toString().replace(".", ",") + ".10<sup>" + (pow.length - 1) + "</sup>";
        },
        minDuration: function () {
            const n = this.simulationSettings.throws;
            const d = this.simulationSettings.interval;
            if (n == 0) return "∞";
            return n * d / 1000 + "s";
        },
        simulationTimer: function () {
            return "lol" + new Date();
        }
    },
    methods: {
        initSimulation: function () {
            this.section = "simulation";
            this.startedAt = new Date();
            this.simulationInterval = setInterval(this.simulationIntervalFunc, this.simulationSettings.interval);
        },
        simulationIntervalFunc: function () {
            const coin = throwCoin();
            this.simulationData.thrownCoins++;
            this.simulationData.historyString += (coin == "heads") ? "F" : "P";
            this.simulationData[coin].count++;
            this.simulationData[(coin == "heads") ? "tails" : "heads"].streak = 0;
            if (++this.simulationData[coin].streak > this.simulationData[coin].highestStreak) {
                this.simulationData[coin].highestStreak = this.simulationData[coin].streak;
            }
            this.simulationData[(coin == "heads") ? "tails" : "heads"].percentage = (this.simulationData[(coin == "heads") ? "tails" : "heads"].count / this.simulationData.thrownCoins) * 100;
            this.simulationData[(coin == "heads") ? "heads" : "tails"].percentage = (this.simulationData[(coin == "heads") ? "heads" : "tails"].count / this.simulationData.thrownCoins) * 100;
            if (this.simulationData["heads"].count == this.simulationData["tails"].count) {
                this.simulationData.fiftyFifty++;
            }
            //Je dois vite boucler et j'ai pas réussi à régler les heights avec v-bind.
            this.$el.querySelector("#simulation-textarea").scrollTop = this.$el.querySelector("#simulation-textarea").scrollHeight; 
            this.$el.querySelector("#simulation-histogram .tails").style.height = this.simulationData.tails.percentage + "%";
            this.$el.querySelector("#simulation-histogram .tails").style.background = this.simulationSettings.tailsColor;
            this.$el.querySelector("#simulation-histogram .heads").style.height = this.simulationData.heads.percentage + "%";
            this.$el.querySelector("#simulation-histogram .heads").style.background = this.simulationSettings.headsColor;
            if (this.simulationData.thrownCoins == this.simulationSettings.throws) {
                this.stopSimulation();
            }
        },
        stopSimulation: function() {
            clearInterval(this.simulationInterval);
        }
    }
});


function throwCoin() {
    const r = Math.random();
    if (r > 0.5) return "heads";
    if (r < 0.5) return "tails";
    return throwCoin();
}
