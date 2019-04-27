function save_io() {
    var name = document.getElementById("midi-in").value;
    localStorage.setItem("midi_in", name);
    name = document.getElementById("midi-out").value;
    localStorage.setItem("midi_out", name);
    name = document.getElementById("midi-copy").checked;
    localStorage.setItem("midi_copy", name);
    input = WebMidi.getInputById(midi_in);
    output = WebMidi.getOutputById(midi_out);
    midi_copy = localStorage.getItem("midi_copy");
    midi_in = localStorage.getItem("midi_in");
    midi_out = localStorage.getItem("midi_out");
}

function save_velocity() {
    var name = document.getElementById("midi-force-velocity").checked;
    localStorage.setItem("force_velocity", name);
    force_velocity= localStorage.getItem("force_velocity");
}

function save_effect() {
    var name = document.getElementById("midi-keydown-sparks").checked;
    localStorage.setItem("midi_keydown_sparks", name);
    midi_keydown_sparks= localStorage.getItem("midi_keydown_sparks");

    name = document.getElementById("midi-keydown-keydown").checked;
    localStorage.setItem("midi_keydown_keydown", name);
    midi_keydown_keydown= localStorage.getItem("midi_keydown_keydown");

    name = document.getElementById("midi-keydown-output").checked;
    localStorage.setItem("midi_keydown_output", name);
    midi_keydown_output= localStorage.getItem("midi_keydown_output");

    name = document.getElementById("midi-keydown-bars").checked;
    localStorage.setItem("midi_keydown_bars", name);
    midi_keydown_bars= localStorage.getItem("midi_keydown_bars");
//---------------------------
    name = document.getElementById("midi-force-sparks").checked;
    localStorage.setItem("midi_force_sparks", name);
    midi_force_sparks= localStorage.getItem("midi_force_sparks");

    name = document.getElementById("midi-force-keydown").checked;
    localStorage.setItem("midi_force_keydown", name);
    midi_force_keydown= localStorage.getItem("midi_force_keydown");

    name = document.getElementById("midi-force-output").checked;
    localStorage.setItem("midi_force_output", name);
    midi_force_output= localStorage.getItem("midi_force_output");
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
