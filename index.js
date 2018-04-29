const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const async = require('async');

// const getData = async.queue(function (data, callback) {
//     console.log('Retrieving requested data' + data);
//     axios.get('https://api.test.sabre.com/' + data)
//         .then((response => {
//             console.log(JSON.stringify(response.data), (err) => {
//                 if (err) {
//                     console.log(err);
//                 }

//                 callback();
//             });
//         }));
// });


// function callAPI() {
//     axios.get('https://api.test.sabre.com/v1/shop/flights/cheapest/fares/LAX?pointofsalecountry=US ',
//     { 
//         'headers': {
//             'Content-Type': ""application/x-www-form-urlencoded"",
//             'Api-Key': ""5nfa6dfhq23m7deqf2ncvykc"",
//             'X-signature': encrypted
//         }   
//     }).then((data)=> {
//         console.log(data);
//     }).catch((err) => {
//         console.log(err);
//     })
// }


// callAPI();"

// http.listen(3000);