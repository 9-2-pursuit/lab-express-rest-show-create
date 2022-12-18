const logsArr = require("../models/log");
module.exports = {
  order: function (order) {
    return order === "asc"
      ? logsArr.sort((a, b) => (a.captainName > b.captainName ? 1 : -1))
      : logsArr.sort((a, b) => (b.captainName - a.captainName ? 1 : -1));
  },
  mistakes: function (bool) {
    return bool == "true"
      ? logsArr.filter((log) => log.mistakesWereMadeToday)
      : logsArr.filter((log) => !log.mistakesWereMadeToday);
  },
  lastCrisis: function (value) {
    const comparison = value.match(/[a-z]+/gi)[0].toLowerCase(); // gt , gte,
    const number = Number(value.match(/[0-9]+/g)[0]); // Number('5'), Number('20')
    console.log(comparison, number);
    if (comparison === "gt") {
      return logsArr.filter((log) => log.daysSinceLastCrisis > number);
    } else if (comparison === "gte") {
      return logsArr.filter((log) => log.daysSinceLastCrisis >= number);
    } else if (comparison === "lt") {
      return logsArr.filter((log) => log.daysSinceLastCrisis < number);
    } else if (comparison === "lte") {
      return logsArr.filter((log) => log.daysSinceLastCrisis <= number);
    }
  },
};
