function panel_close(t){
    var cssProperties = anime({
        targets: t,
        opacity: .5,
        marginTop:'-250px' ,
        borderRadius: '8em',
        easing: 'easeInOutQuad'
    });
}

function panel_on(t){
    var cssProperties = anime({
        targets: t,
        opacity: 1,
        marginTop:'0px' ,
        borderRadius: '2em',
        easing: 'easeInOutQuad'
    });
}