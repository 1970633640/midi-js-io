recorded_key_data = [];
start_time = 0;
recording = false;
play_speed =  localStorage.getItem("play_speed");
class key_data {
    constructor(start_time, type, note_name, note_octave, velocity) {
        this.start_time = start_time;
        this.note_name = note_name;
        this.note_octave = note_octave;
        this.velocity = velocity;
        this.type = type; //1 on 2 off
    }
}

function start_record() {
    if (recording) {
        squares = [];
        recording = false;
        document.getElementById("record_button").innerText = "●"
    } else {
        start_time = new Date().getTime();
        recording = true;
        document.getElementById("record_button").innerText = "■"
    }
}

function start_playback() {
    var j = null;

    for (i in recorded_key_data) {
        (function (j) {
            if (recorded_key_data[j].type === 1) {
                setTimeout(function () {
                    //彩条信息
                    var k = document.getElementById(recorded_key_data[j].note_name.replace('#', 'x') + recorded_key_data[j].note_octave);
                    var dx = k.offsetLeft + k.offsetWidth / 2;
                    add_line2(dx, recorded_key_data[j].note_name + recorded_key_data[j].note_octave, recorded_key_data[j].velocity)
                }, recorded_key_data[j].start_time * play_speed);

                setTimeout(function () {
                    //播放声音
                    if (midi_force_output === 'true')
                        output.playNote(recorded_key_data[j].note_name + recorded_key_data[j].note_octave, 1, {velocity: 1});
                    var k = document.getElementById(recorded_key_data[j].note_name.replace('#', 'x') + recorded_key_data[j].note_octave);
                    var dx = k.offsetLeft + k.offsetWidth / 2;
                    if (midi_force_sparks === "true")
                        int(dx, 600);
                    if (midi_force_keydown === "true") {
                        var colors = anime({
                            targets: '#' + recorded_key_data[j].note_name.replace('#', 'x') + recorded_key_data[j].note_octave,
                            backgroundColor: [
                                {value: 'rgb(255, ' + (200 - recorded_key_data[j].velocity * 200).toString() + ', ' + (200 - recorded_key_data[j].velocity * 200).toString() + ')'},
                            ],
                            easing: 'linear',
                            direction: 'normal',
                            duration: 100
                        });
                    }
                }, recorded_key_data[j].start_time * play_speed + 1000);


            } else if (recorded_key_data[j].type === 2) {
                setTimeout(function () {
                    //彩条信息
                    release_line(recorded_key_data[j].note_name + recorded_key_data[j].note_octave)
                }, recorded_key_data[j].start_time * play_speed);

                setTimeout(function () {
                    //播放声音
                    if (midi_force_output === "true")
                        output.stopNote(recorded_key_data[j].note_name + recorded_key_data[j].note_octave, 1, {velocity: 1});

                    if (midi_force_keydown === "true") {
                        var c;
                        if (recorded_key_data[j].note_name.length > 1)
                            c = "#5e6c80";
                        else
                            c = "#FFFFFF";
                        var colors = anime({
                            targets: '#' + recorded_key_data[j].note_name.replace('#', 'x') + recorded_key_data[j].note_octave,
                            backgroundColor: [
                                {value: c}
                            ],
                            easing: 'linear',
                            direction: 'normal',
                            duration: 100
                        });
                    }

                }, recorded_key_data[j].start_time * play_speed + 1000);

            }
        })(i);
    }
}

function copy_out() {
    async function copyPageUrl() {
        try {
            await navigator.clipboard.writeText(JSON.stringify(recorded_key_data));
            console.log('Page URL copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    copyPageUrl();
}

function copy_in() {
    async function getClipboardContents() {
        try {
            const text = await navigator.clipboard.readText();
            console.log("read: " + text);
            recorded_key_data = JSON.parse(text);
            document.getElementById("recorded_length").innerText = recorded_key_data.length.toString();
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    }

    getClipboardContents();

}

function record_noteon(note_name, note_octave, velocity) {
    recorded_key_data.push(new key_data(new Date().getTime() - start_time, 1, note_name, note_octave, velocity));
    document.getElementById("recorded_length").innerText = recorded_key_data.length.toString();
}

function record_noteoff(note_name, note_octave, velocity) {
    recorded_key_data.push(new key_data(new Date().getTime() - start_time, 2, note_name, note_octave, velocity));
    document.getElementById("recorded_length").innerText = recorded_key_data.length.toString();
}