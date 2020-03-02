const app = new Vue({
    el: "#app",
    data: {
        simulationSettings: {
            throws: 0,
        }
    },
    computed: {
        outcomes: function () {
            const n = this.simulationSettings.throws;
            var pow = Math.pow(2, n);
            if (pow == Infinity) return `2<sup>${n}</sup>`;
            pow = pow.toString();
            if (pow.length < 7) return n;
            if (pow.includes("e")) {
                pow = pow.split("e");
                console.log(pow);
                return pow[0].substring(0, 5).replace(".", ",") + ".10<sup>" + pow[1].slice(1) + "</sup>";
            }
            return (pow / Math.pow(10, pow.length - 1)).toFixed(3).toString().replace(".", ",") + ".10<sup>" + (pow.length - 1) + "</sup>";
        }
    }
});