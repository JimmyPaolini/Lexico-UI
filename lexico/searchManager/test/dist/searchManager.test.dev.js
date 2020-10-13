"use strict";

var _require = require("../searchManager"),
    manageSearch = _require.manageSearch;

var search = "amo";
main();

function main() {
  var response;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(manageSearch(search));

        case 2:
          response = _context.sent;
          console.log("Response", response);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}