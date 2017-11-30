var eth = function(){}
var mainWindow = null

eos.init = function(mainWindow) {
    this.mainWindow = mainWindow;
    this.period = this.todayPeriod();
}

eth.getPrice = function() {

}

module.exports = eth;
