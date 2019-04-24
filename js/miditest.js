

WebMidi.enable(function (err) {

    if (err) {
        document.getElementById("midi-test").innerText = "WebMidi 不支持";
        alert("您的浏览器不支持midi功能");
    } else {
        document.getElementById("midi-test").innerText = "WebMidi 可用";
        var example1 = new Vue({
            el: '#midi-in',
            data: {
                items: WebMidi.inputs
            }
        });
        var example2 = new Vue({
            el: '#midi-out',
            data: {
                items: WebMidi.outputs
            }
        });
        var arr1 = new Array(128);
        for(var i=0;i<arr1.length;i++){
            arr1[i] = i;
        }
        var example3 = new Vue({
            el: '#midi-instrument',
            data: {
                items: arr1
            }
        });
    }

});

function ccc() {
    var output = WebMidi.getOutputById("output-0");
    var j = null;
    for (var i = 1; i <= 128; i++) {
        (function (j) {
            setTimeout(function timer() {
                output.sendProgramChange(j, "all");
                output.playNote("C3", "all", {velocity: 1})
                    .stopNote("C3", "all", {time: 200});    // After 1.2 s.
            }, j * 1000);
        })(i);
    }
}