 hmenu = {
    'menu_on' : false ,
    'toggle' : () => {
        let image = document.getElementById("menu");
        let navUL = document.getElementById("nav-ul");
        if ( hmenu.menu_on ) {
            image.src = "assets/burger.svg";
            navUL.classList.remove("show");
        } else {
            image.src = "assets/close.svg";
            navUL.classList.add("show");
        }
        hmenu.menu_on = !hmenu.menu_on ;
    }
}

let hamburger = document.getElementById("hamburger");
hamburger.addEventListener("click", hmenu.toggle ); 
