var eth = function(){}
var mainWindow = null;
var price = null;

eth.init = function(mainWindow) {
    this.mainWindow = mainWindow;
    this.getPrice();
}

eth.getPrice = function() {
    this.mainWindow.$.ajax({
        type:'GET',
        url:'http://api.zb.com/data/v1/ticker?market=eth_usdt',
        dataType:'json',
        success: function(res) {
            console.log(res);
            this.price = res['ticker']['last'];
        }
    });
}

module.exports = eth;
