var eos = function(){}
eos.mainWindow = null;
eos.allPrice = null;
eos.period = null;

eos.init = function(mainWindow) {
    this.mainWindow = mainWindow;
    this.period = this.todayPeriod();
}
eos.getPrice = function() {
    this.allPrice = JSON.parse(this.mainWindow.$('#eos').contents().find('body > pre').html());
}
eos.today = function(){
    var todayEos = this.allPrice[this.period];
    var colock = new Date(todayEos['ends']).getTime() - new Date().getTime();
    return {'eos' : todayEos, 'colock' : colock};
}

eos.yesterday = function(){
    return this.allPrice[this.period - 1];
}

eos.todayPeriod = function(){
    var start = new Date('2017/07/01 00:00:00').getTime();
    var now = new Date().getTime();
    return Math.round((now - start) / 1000 / 60 / 60 / 23);
}

module.exports = eos;
