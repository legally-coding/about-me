const navButton = document.querySelector('.menu-select');
const sidebar = document.querySelector(".sidebar");

var menuOpen = false;
var menuOpenAnim = false
navButton.onclick = () => {
    let openingnavmenu = () => {
        menuOpenAnim = true;
        setTimeout(() => {
            menuOpenAnim = false;
        }, 1000);
    }
    if (menuOpenAnim) return;
    if (!menuOpen) {
        document.querySelector(".nav-animate-bottom-middle").beginElement()
        document.querySelector(".nav-animate-top-middle").beginElement()
        navButton.classList.add("menu-select-rotate");
        navButton.classList.remove("menu-select-return");
        sidebar.classList.add("sidebar-shown");
        sidebar.classList.remove("sidebar-hidden");
        sidebar.style.display = "block";
        document.querySelector(".blur-overlay").style.display = "block";
        document.querySelector('.header').classList.add("header-blurred");
        blurContent([".main-content", ".title-container"]);
        menuOpen = true;
        openingnavmenu();
    } else {
        document.querySelector(".nav-animate-bottom-back").beginElement()
        document.querySelector(".nav-animate-top-back").beginElement()
        navButton.classList.remove("menu-select-rotate");
        navButton.classList.add("menu-select-return");
        sidebar.classList.add("sidebar-hidden");
        sidebar.classList.remove("sidebar-shown");
        document.querySelector(".blur-overlay").style.display = "none";
        document.querySelector('.header').classList.remove("header-blurred");
        unblurContent([".main-content", '.title-container']);
        menuOpen = false;
        openingnavmenu();
    }
}




function blurContent(selectors) {
    for (let i = 0; i < selectors.length; i++) {
        let element = document.querySelector(selectors[i]);
        element.classList.add("blur-content");
        element.classList.remove("unblur-content");
    }
}
function unblurContent(selectors) {
    for (let i = 0; i < selectors.length; i++) {
        let element = document.querySelector(selectors[i]);
        element.classList.remove("blur-content");
        element.classList.add("unblur-content");
    }
}