function create_square() {
    var d = document.createElement("div");
    d.id = "square";
    var divattr = document.createAttribute("style");
    divattr.value = "position:absolute;z-index: 90;top:550px;left:500px;width:100px;height:0px;background-color: #00e4fa";
    d.setAttributeNode(divattr);
    document.body.appendChild(d);
    var cssProperties = anime({
        targets: '#square',
        top: '50px',
        height:'500px',
        easing: 'linear'
    });
}