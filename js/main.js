var app = require('./js/app.js');
var eos = require('./js/eos.js');
var eth = require('./js/eth.js');
var mainWindow = null;
var lastError = null;
process.on(
    'uncaughtException',
    function (err)
    {
        if(lastError == err){
            return;
        }
        lastError = err;
        console.error(err);
        console.log(arguments);
    }
);


chrome.developerPrivate.openDevTools({
    renderViewId: -1,
    renderProcessId: -1,
    extensionId: chrome.runtime.id
});

setTimeout(function () {
    app.init().then(function(res){
        this.mainWindow = res;
        start();
        var today = eos.today();
        this.mainWindow.particleground(this.mainWindow.document.getElementById('app'), {
            dotColor: '#463d3d',
            lineColor: '#463d3d'
        });
        setColock(Math.floor(today['colock'] / 1000));

    })
});

function start() {
    eos.init(this.mainWindow);
    eth.init(this.mainWindow, setEosPrice);
    eos.getPrice();
    this.mainWindow.copy = copy;

    setTimeout(function(){
        start()
    }, 5000);
}

function copy() {
    nw.Clipboard.get().set("0xd0a6E6C54DbC68Db5db3A091B171A77407Ff7ccf");
}
function setEosPrice(ethPrice) {
    eos.setYesterdayPrice(ethPrice);
    eos.setTodayPrice(ethPrice);
}

function setColock(clock) {
    hour = Math.floor(clock / 60 / 60);
    min  = Math.floor(clock / 60 % 60);
    sec  = Math.floor(clock % 60);
    this.mainWindow.$('.hour-1').html(Math.floor(hour/10));
    this.mainWindow.$('.hour-2').html(hour%10);
    this.mainWindow.$('.min-1').html(Math.floor(min/10));
    this.mainWindow.$('.min-2').html(min%10);
    this.mainWindow.$('.sec-1').html(Math.floor(sec/10));
    this.mainWindow.$('.sec-2').html(sec%10);

    setTimeout(function(){
        setColock(clock - 1)
    }, 1000);
}
