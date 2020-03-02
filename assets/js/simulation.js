$(function () {
    $("#start-simulation").click(startSimulation);
    startSimulation();
});

function throwCoin() {
    var r = Math.random();
    if (r > 0.5) return "P";
    else if (r < 0.5) return "F";
    else return throwCoin();
}
var simulationInterval;
var simulationData;
var index;
function startSimulation() {
    $(".app-section").removeClass("displayed");
    $(".app-section#simulation").addClass("displayed");
    if (Settings.delta <= 0) return
    index = 0;
    simulationData = {
        P: 0,
        Ps: 0,
        BPs: 0,
        F: 0,
        Fs: 0,
        BFs: 0,
        FF: 0,
        O: 0,
        S: "",
    };
    simulationInterval = setInterval(coinIntervalFunc, Settings.delta);
}


function coinIntervalFunc() {
    var coin = throwCoin();
    simulationData.S+=coin;
    simulationData[coin]++;
    simulationData["O"]++;

    if (simulationData.F == simulationData.P) simulationData.FF++;

    $("#simulation-color-timeline").append(`<div class="color-timeline-cell ${coin}" id="c${index++}"></div>`);
    $(`.color-timeline-cell#c${index - 30}`).remove();

    $("#coinsString").val(simulationData.S);
    $("#coinsString").scrollTop($("#coinsString").prop("scrollHeight"));

    $(".simulation-stat-graph#P").css("height", simulationData.P / simulationData.O * 100 + "%");
    $(".simulation-stat-graph#P b").text("Piles : " + (simulationData.P / simulationData.O * 100).toFixed(1) + "%");
    $(".simulation-stat-graph#F").css("height", simulationData.F / simulationData.O * 100 + "%");
    $(".simulation-stat-graph#F b").text("Faces : " + (simulationData.F / simulationData.O * 100).toFixed(1) + "%");

    $("#simulation-infos #shots b").text(index);
    $("#simulation-infos #remaining b").text(Settings.n == 0 ? "∞" : Settings.n - index);
    $("#simulation-infos #Pcount b").text(simulationData.P);
    $("#simulation-infos #Fcount b").text(simulationData.F);
    $("#simulation-infos #diff b").text(Math.abs(simulationData.F - simulationData.P));
    $("#simulation-infos #FF b").text(simulationData.FF);

    if (Settings.n > 0 && Settings.n - index == 0) {
        stopSimulation();
    }

}

function stopSimulation() {
    clearInterval(simulationInterval);
    $(".app-section").removeClass("displayed");
    $(".app-section#results").addClass("displayed");
}