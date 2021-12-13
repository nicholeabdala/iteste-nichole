const axios = require("axios");

const api = axios.create({
    baseURL: "https://ico-fullstack-test.herokuapp.com/v1/histograma",
});

module.exports = api;