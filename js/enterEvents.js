window.addEventListener("keypress",(e) => {
    if(isWindowOpened) {
        if(e.key == "Enter") closeWindow();
    }
});