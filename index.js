var request = require('request');
var cheerio = require('cheerio');

var drWho = function() {
    this.name = 'dr-who';
    this.displayname = 'Dr Who';
    this.description = 'Gives you a random Dr Who quote';
}

drWho.prototype.init = function(){
    var self = this;
    this.listen('dr who me', 'standard', function(from, interface, params){
        self.getQuote(from, interface, params);
    })
}

drWho.prototype.getQuote = function(from, interface, params){
    var doctors = [
            "http://en.wikiquote.org/wiki/First_Doctor",
            "http://en.wikiquote.org/wiki/Second_Doctor",
            "http://en.wikiquote.org/wiki/Third_Doctor",
            "http://en.wikiquote.org/wiki/Fourth_Doctor",
            "http://en.wikiquote.org/wiki/Fifth_Doctor",
            "http://en.wikiquote.org/wiki/Sixth_Doctor",
            "http://en.wikiquote.org/wiki/Seventh_Doctor",
            "http://en.wikiquote.org/wiki/Eighth_Doctor",
            "http://en.wikiquote.org/wiki/War_Doctor",
            "http://en.wikiquote.org/wiki/Ninth_Doctor",
            "http://en.wikiquote.org/wiki/Tenth_Doctor",
            "http://en.wikiquote.org/wiki/Eleventh_Doctor",
            "http://en.wikiquote.org/wiki/Twelfth_Doctor"
        ];
    var doctor = doctors[Math.floor(Math.random() * doctors.length)];
    var self = this,
        options = {
            uri: doctor,
            headers: {
                'user-agent': 'Woodhouse Bot - https://github.com/lukeb-uk/woodhouse'
            }
        };

    request(options, function(err, response, html){
        if (err) {throw err}

        var $ = cheerio.load(html);
        var quotes = $('div > dl:not(:has(small, dl))').toArray();
        var quote = quotes[Math.floor(Math.random() * quotes.length)];
        var message = $(quote).text().trim();

        self.sendMessage(message, interface, from);
    })
}

module.exports = drWho;
