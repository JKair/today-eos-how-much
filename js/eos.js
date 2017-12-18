var eos = function(){}
eos.mainWindow = null;
eos.allPrice = null;
eos.period = null;
eos.todayPrice = null;
eos.yesterdayPrice = null;

eos.init = function(mainWindow) {
    this.mainWindow = mainWindow;
    this.period = this.todayPeriod();
}
eos.getPrice = function() {
    this.allPrice = JSON.parse(this.mainWindow.$('#eos').contents().find('body > pre').html());
}
eos.today = function() {
    var todayEos = this.allPrice[this.period];
    var colock = new Date(todayEos['ends']).getTime() - new Date().getTime();

    this.todayPrice = todayEos['price'];

    return {'eos' : todayEos, 'colock' : colock};
}

eos.yesterday = function() {
    this.yesterdayPrice = this.allPrice[this.period - 1]['price'];
}

eos.todayPeriod = function() {
    var start = new Date('2017-07-01T13:00:00.000Z').getTime();
    var now = new Date().getTime();

    return Math.ceil((now - start) / 1000 / 60 / 60 / 23);
}

eos.setExchangePrice = function() {
    var self = this;
    this.mainWindow.$.ajax({
        type:'GET',
        url:'http://api.zb.com/data/v1/ticker?market=eos_usdt',
        dataType:'json',
        success: function(res) {
            price = res['ticker']['last'] * 6.7;
            self.mainWindow.$('#eos-exchange').html(Math.round(price*100)/100);
        }
    });
}

eos.setYesterdayPrice = function(ethPrice) {
    this.yesterday();
    this.mainWindow.$('#eos-yesterday').html(Math.round(ethPrice * this.yesterdayPrice * 100) / 100);
}
eos.setTodayPrice = function(ethPrice) {
    this.mainWindow.$('#eth-now').html(Math.round(this.allPrice[this.period]['dailyTotal'] * 100) / 100);
    this.mainWindow.$('#eos-now').html(Math.round(ethPrice * this.todayPrice * 100) / 100);
}

module.exports = eos;
