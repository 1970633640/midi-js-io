recorded_key_data = [];
start_time = 0;
recording = false;

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
        recording = false;
        document.getElementById("record_button").innerText = "●"
    } else {
        start_time = new Date().getTime();
        recording = true;
        document.getElementById("record_button").innerText = "■"
    }
}

function record_noteon(note_name, note_octave, velocity) {
    recorded_key_data.push(new key_data(new Date().getTime() - start_time, 1, note_name, note_octave, velocity));
    document.getElementById("recorded_length").innerText = recorded_key_data.length.toString();
}

function record_noteoff(note_name, note_octave, velocity) {
    recorded_key_data.push(new key_data(new Date().getTime() - start_time, 2, note_name, note_octave, velocity));
    document.getElementById("recorded_length").innerText = recorded_key_data.length.toString();
}