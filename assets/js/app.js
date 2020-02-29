$(function () {
    $(".parameter-line#n input").keydown(function () { displayCardOmega($(this), false) });
    $(".parameter-line#n input").change(function () { displayCardOmega($(this), true) });
});

function displayCardOmega($this, correct) {
    setTimeout(() => {
        var n = $this.val();
        var e = $("#cardOmega");
        if (n > 0) e.html((Math.pow(2, n) == Infinity)
            ? "2<sup>" + n + "</sup>"
            : scientificWriting(Math.pow(2, n))
        );
        else {
            e.text("∞")
            if (correct) $this.val(0);
        }
    });
}

function scientificWriting(n) {
    if (!n.toString().includes("e")) return n;
    n = n.toString().split("e");
    return parseFloat(n[0]).toFixed(3).toString().replace(".", ",") + ".10<sup>" + parseInt(n[1]) + "</sup>";
}