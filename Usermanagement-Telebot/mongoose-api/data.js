const fs = require("fs").promises;
const axios = require("axios");

async function readJSONfile(datapath) {
    return await fs.readFile(datapath, "utf8");
}

async function writeJSONfile(datapath, data) {
    return await fs.writeFile(datapath, data);
}

async function getJSON(url) {
    const response = await axios.get(url);
    console.log(response.data); // Log to see the returned data
    return response.data; // Return the data part of the response
}

module.exports = { readJSONfile, writeJSONfile, getJSON };