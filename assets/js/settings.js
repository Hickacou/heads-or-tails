var Settings = {
    n: 0,
    delta: 50,
};

$(function () {
    $(".parameter-line#n input").keydown(function () { handleNChange($(this), false) });
    $(".parameter-line#n input").change(function () { handleNChange($(this), true) });
    $(".parameter-line#delta input").keydown(function () { handleDeltaChange($(this), false); });
    $(".parameter-line#delta input").change(function () { handleDeltaChange($(this), true); });
});

function handleNChange($this, correct) {
    setTimeout(() => {
        var n = parseInt($this.val());
        Settings.n = n;
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

function handleDeltaChange($this, correct) {
    setTimeout(function () {
        var delta = parseInt($this.val());
        Settings.delta = delta;
        if (delta < 0 && correct) {
            $this.val(0);
        }
    });
}

function scientificWriting(n) {
    if (n.toString().includes("e")) {
        n = n.toString().split("e");
        return parseFloat(n[0]).toFixed(3).toString().replace(".", ",") + ".10<sup>" + parseInt(n[1]) + "</sup>";
    } else if (n.toString().length > 5) {
        n = n.toString();
        return (n / Math.pow(10, n.length - 1)).toFixed(3).replace(".", ",") + ".10<sup>" + (n.length - 1) + "</sup>";
    } else {
        return n;
    }
}