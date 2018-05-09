// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const axios = require('axios');
// const async = require('async');
require('handlebars');

// ======= Handlebars.js stuff


// Get Template with HTML & Handlebars syntax
var source = $("#testbar").html();

// Compile (package) HTML & Javascript
var template = Handlebars.compile(source);

// Register partial ({{partial name}}, id of template)

Handlebars.registerPartial("activityPartial", $("#activity-partial").html());

Handlebars.registerPartial("tagPartial", $("#tag-partial").html());

//Data to be displayed
var data = {
  tasks: [
    {
      title: "Journey to Edo",
      city: "Tokyo",
      description: "Tokyo is awesome!",
      activity_tags:["Historical", "Epic"],
      each_activity: [{
        img_url: "image url",
        act_name: "Edo Palace",
        address: "Edo District",
        activity_description: "Welcome to MTV cribs: shogun edition"
      }]
    },
    {
      title: "Singing in Singapore!",
      city: "Singapore",
      description: "We're singing in the rain!",
      activity_tags:["Theatrical", "Amazing"],
      each_activity: [
        {
        img_url: "image url",
        act_name: "Marina Bay Sands",
        address: "Marina Bay",
        activity_description: "ITS A GIANT CASINO"
      }, {
        img_url: "image url",
        act_name: "Merlion",
        address: "Marina Bay",
        activity_description: "ROARRRRRR"
      }
        ]
    },
    {
      title: "Eat your heart out Shanghai!",
      city: "Shanghai",
      description: "I'm so full I can't walk",
      activity_tags:["Gastronomic", "Umami"],
    }
  ]
};

// Merge the template with the data, and place it on the page
$("#content-placeholder").html(template(data));

