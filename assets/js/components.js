Vue.component("app-section", {
    props: ["title"],
    template: "<div class='app-section'><div class='app-section-title'>{{ title }}</div><slot></slot></div>"
});

Vue.component("histogram", {
    props: ["data"],
    template: `<div class='histogram'>
    <div class="tails">
        <b>Piles : {{ data.simulationData.tails.percentage.toFixed(2) }}%</b></div>
    <div class="heads">
        <b>Faces : {{ data.simulationData.heads.percentage.toFixed(2) }}%</b></div>
    </div>`
});