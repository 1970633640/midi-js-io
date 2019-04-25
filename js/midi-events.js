function midi_start() {

    document.getElementById("midi-test").innerText = "WebMidi 可用  开始监听";
    var midi_copy = localStorage.getItem("midi_copy");
    var midi_in = localStorage.getItem("midi_in");
    var midi_out = localStorage.getItem("midi_out");
    var input = WebMidi.getInputById(midi_in);
    var output = WebMidi.getOutputById(midi_out);

    input.addListener('noteon', "all",
        function (e) {
            console.log("Received 'noteon' message (" + e.note.name + e.note.octave + "--channel=" + e.channel + " --velocity=" + e.velocity + ").");
            if (midi_copy === "true") {
                output.playNote(e.note.name + e.note.octave, 1, {velocity: e.velocity});
            }
            var k = document.getElementById(e.note.name.replace('#', 'x') + e.note.octave);
            var dx = k.offsetLeft + k.offsetWidth / 2;
            int(dx, 500);
            //create_square();
            add_line(dx, e.note.name + e.note.octave);
            var colors = anime({
                targets: '#' + e.note.name.replace('#', 'x') + e.note.octave,
                backgroundColor: [
                    {value: 'rgb(255, ' + (200 - e.velocity * 200).toString() + ', ' + (200 - e.velocity * 200).toString() + ')'},
                ],
                easing: 'linear',
                direction: 'normal',
                duration: 100
            });
        }
    );

    input.addListener('noteoff', "all",
        function (e) {
            console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + "--channel=" + e.channel + " --velocity=" + e.velocity + ").");
            if (midi_copy === "true") {
                output.stopNote(e.note.name + e.note.octave, 1, {velocity: e.velocity});
            }
            release_line(e.note.name + e.note.octave)
            var c;
            if (e.note.name.length > 1)
                c = "#5e6c80";
            else
                c = "#FFFFFF";
            var colors = anime({
                targets: '#' + e.note.name.replace('#', 'x') + e.note.octave,
                backgroundColor: [
                    {value: c}
                ],
                easing: 'linear',
                direction: 'normal',
                duration: 100
            });
        }
    );

    // Listen to pitch bend message on channel 3
    input.addListener('pitchbend', "all",
        function (e) {
            console.log("Received 'pitchbend' message.", e);
        }
    );

    // Listen to control change message on all channels
    input.addListener('programchange', "all",
        function (e) {
            console.log("Received 'programchange' message.", e);
        }
    );

}

function change_instrument() {
    var name = document.getElementById("midi-instrument").value;
    var midi_out = localStorage.getItem("midi_out");
    var output = WebMidi.getOutputById(midi_out);
    output.sendProgramChange(name, "all");
}