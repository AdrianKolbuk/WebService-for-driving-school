function changeTheme() {
    var e = document.getElementById("Theme");
    var theme = e.options[e.selectedIndex].value;
    document.getElementById("head1").style.backgroundImage = "url(" + theme + ")";
    document.getElementById("foot1").style.backgroundImage = "url(" + theme + ")";

    if (theme == "https://swiat-kolorow.com.pl/userdata/public/gfx/cf797262fd08df73461e9aaf5d9ff0fe.jpg") {
        document.getElementById("head1").style.color = "black";
        document.getElementById("foot1").style.color = "black";
    } else if (theme == "https://operatordronow.pl/wp-content/uploads/2016/11/tlo-szare.png") {
        document.getElementById("head1").style.color = "white";
        document.getElementById("foot1").style.color = "white";
    }

}



