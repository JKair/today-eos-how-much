var app = function() {}

app.init = function () {
    return new Promise(function(_do) {
        nw.Window.open(
            "./index.html",
            function(_window) {
                _window.showDevTools();
                setTimeout(function(){
                    _do(_window.window);
                },5000)

            }
        );
    })
}


module.exports = app;
