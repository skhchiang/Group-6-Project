const puppeteer = require("puppeteer");
const fs = require("fs");
let citiesName = fs.readFileSync("./cities.json", "utf-8");
citiesName = JSON.parse(citiesName).city;
let allCityInfo = [];

let scrape = async City => {
  const browser = await puppeteer.launch({
    executablePath:
      "../../../Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless: false
  });
  const page = await browser.newPage();

  await page.goto(
    "https://www.visitacity.com/en/" + City + "/attraction-by-type/all"
  );

  await autoScroll(page);
  //await page.waitForSelector(".attractions-full-with-pa");
  const result = await page.evaluate(cityName => {
    let data = [];
    let attractions = document.querySelectorAll(".attractions-full-with-pa");

    function removeSuffix(input) {
      input = input.split("...")[0];
      input = input.split(". ");
      var discard = input.pop();
      input = input.join(". ").concat(".");
      return input;
    }

    function removePrefix(input) {
      input = input.split(": ")[1];
      return input;
    }

    for (var i = 0; i < attractions.length; i++) {
      let names = attractions[i].children[1].children[0].children[0].innerText;
      let types = attractions[i].children[2].children[0].innerText;
      types = removePrefix(types);
      types = types.replace(/[\n\t]/g, "");
      let addresses = attractions[i].children[2].children[2].getAttribute(
        "title"
      );
      if (addresses != null) {
        addresses = addresses.trim();
      }
      let descriptions =
        attractions[i].children[1].children[0].children[3].innerText;
      descriptions = removeSuffix(descriptions);
      let photos = attractions[i].children[0].children[0].getAttribute("src");

      cityName = cityName.replace("-", " ");
      cityName = cityName.replace(/\b\w/g, l => l.toUpperCase());

      data.push({
        name: names,
        type: types,
        address: addresses,
        description: descriptions,
        photo: photos,
        city: cityName
      });
    }
    return data;
  }, City);
  await page.goto('about:blank')
  await page.close();
  (await browser.pages()).forEach(page => page.close());
  return result;
};

function autoScroll(page) {
  return page.evaluate(() => {
    return new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 250;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

async function scrapeLoop() {
  for (var counter = 0; counter < citiesName.length; counter++) {
    let value = await scrape(citiesName[counter]);
    allCityInfo = allCityInfo.concat(value);
    console.log("Complete scrape for " + citiesName[counter]);
  }
  fs.writeFile("output.json", JSON.stringify(allCityInfo), function(err) {
    console.log("File written");
  });
}

scrapeLoop();
