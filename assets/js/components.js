Vue.component("app-section", {
    props: ["title"],
    template: "<div class='app-section'><div class='app-section-title'> {{ title }}</div><slot></slot></div>"
});