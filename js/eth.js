var eth = function(){}
var mainWindow = null;
var price = null;

eth.init = function(mainWindow, _setEosPrice) {
    this.mainWindow = mainWindow;
    this.getPrice(_setEosPrice);
}

eth.getPrice = function(_setEosPrice) {
    self = this;
    this.mainWindow.$.ajax({
        type:'GET',
        url:'http://api.zb.com/data/v1/ticker?market=eth_usdt',
        dataType:'json',
        success: function(res) {
            self.price = res['ticker']['last'] * 6.7;
            self.mainWindow.$('#eth').html(Math.round(self.price*100)/100);
            _setEosPrice(Math.round(self.price*100)/100);
        }
    });
}

module.exports = eth;
