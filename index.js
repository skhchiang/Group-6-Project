const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const async = require('async');


//Materialize Dropdown 'Select' Initialize
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

  // Or with jQuery

//   $(document).ready(function(){
//     $('select').formSelect();
//   });

