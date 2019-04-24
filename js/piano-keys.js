function create_piano_keys() {
    notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    for (var i = 2; i <= 6; i++) {
        var lastid = "";
        for (var j = 0; j < notes.length; j++) {
            var d = document.createElement("div");
            d.id = notes[j].replace('#','x') + i.toString();
            var divattr = document.createAttribute("class");
            if (notes[j].length == 1)
                divattr.value = "white-key";
            else
                divattr.value = "black-key";
            d.setAttributeNode(divattr);
            if (notes[j].length == 1)
                document.getElementById("keys").appendChild(d);
            else
                document.getElementById(lastid).appendChild(d);
            lastid = d.id;
        }
    }

}


