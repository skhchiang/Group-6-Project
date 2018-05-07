const axios = require("axios");
const Hashes = require("jshashes");

function callAPI() {
  let encrypted = new Hashes.SHA256().hex(
    "5nfa6dfhq23m7deqf2ncvykc" + "m7ytC9HHYC" + Math.floor(Date.now() / 1000)
  );
  console.log("key", encrypted, Math.floor(Date.now() / 1000));
  axios
    .post(
      "https://api.test.hotelbeds.com/hotel-api/1.0/hotels/availabilityRQ",
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": "5nfa6dfhq23m7deqf2ncvykc",
          "X-signature": encrypted
        },
        body: {
          "stay": {
            "checkIn": "2018-08-15",
            "checkOut": "2018-08-20",
            "shiftDays": "2"
          },
          "occupancies": [
            {
              "rooms": 1,
              "adults": 1,
              "children": 1,
              "paxes": [
                {
                  "type": "CH",
                  "age": 2
                }
              ]
            }
          ],
          "hotels": {
            "hotel": [1, 271]
          },
          "rooms": {
            "included": true,
            "room": ["DBT.ST"]
          },
          "keywords": {
            "keyword": [34, 38]
          },
          "accommodations": ["HOTEL", "HOSTEL"],
          "boards": {
            "included": true,
            "board": ["RO", "BB"]
          },
          "reviews": [
            {
              "type": "TRIPADVISOR",
              "maxRate": 5,
              "minReviewCount": 3
            }
          ],
          "filter": {
            "minRate": 100,
            "maxRate": 1700,
            "minCategory": 3,
            "maxCategory": 5,
            "paymentType": "AT_HOTEL",
            "maxRatesPerRoom": 3,
            "packaging": true,
            "hotelPackage": "YES",
            "maxRooms": 2
          },
          "dailyRate": true
        }
      }
    )
    .then(results => {
      console.log(results.data);
    })
    .catch(err => {
      console.log(err);
    });
}

callAPI();
