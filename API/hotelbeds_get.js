const axios     = require('axios');
const Hashes    = require('jshashes');

function callAPI() {
    let encrypted =  new Hashes.SHA256().hex("5nfa6dfhq23m7deqf2ncvykc" + "m7ytC9HHYC" + Math.floor((Date.now() /1000)));
    console.log("key", encrypted, Math.floor((Date.now() / 1000)));
    axios.get('https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=code&destinationCode=NRT',
    { 
        'headers': {
            'Content-Type': "application/x-www-form-urlencoded",
            'Api-Key': "5nfa6dfhq23m7deqf2ncvykc",
            'X-signature': encrypted
        }   
    }).then((results)=> {
        console.log(results.data);
    }).catch((err) => {
        console.log(err);
    })
}


callAPI();