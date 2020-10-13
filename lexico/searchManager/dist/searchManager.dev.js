"use strict";

var AWS = require("aws-sdk");

var s3 = new AWS.S3({
  region: "us-east-1"
});
var Bucket = "lexico-dictionary";

var logret = function logret(statusCode, result) {
  var body = JSON.stringify(result, null, 2);
  console.log(statusCode, body);
  return {
    statusCode: statusCode,
    body: body
  };
};

function getWord(word) {
  var response;
  return regeneratorRuntime.async(function getWord$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(s3.getObject({
            Bucket: Bucket,
            Key: "".concat(word, ".json")
          }).promise());

        case 2:
          response = _context.sent;
          return _context.abrupt("return", JSON.parse(response.Body));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function searchRecurse(search, result) {
  var entry, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, etymology, root;

  return regeneratorRuntime.async(function searchRecurse$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getWord(search));

        case 2:
          entry = _context2.sent;
          if (!result.word) result.word = entry.word;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 7;
          _iterator = entry.etymologies[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 22;
            break;
          }

          etymology = _step.value;

          if (!etymology.root) {
            _context2.next = 15;
            break;
          }

          result.etymologies.push(etymology);
          _context2.next = 19;
          break;

        case 15:
          root = etymology.principalParts[0].split(": ")[1];
          _context2.next = 18;
          return regeneratorRuntime.awrap(searchRecurse(root, result));

        case 18:
          result = _context2.sent;

        case 19:
          _iteratorNormalCompletion = true;
          _context2.next = 9;
          break;

        case 22:
          _context2.next = 28;
          break;

        case 24:
          _context2.prev = 24;
          _context2.t0 = _context2["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 28:
          _context2.prev = 28;
          _context2.prev = 29;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 31:
          _context2.prev = 31;

          if (!_didIteratorError) {
            _context2.next = 34;
            break;
          }

          throw _iteratorError;

        case 34:
          return _context2.finish(31);

        case 35:
          return _context2.finish(28);

        case 36:
          return _context2.abrupt("return", result);

        case 37:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[7, 24, 28, 36], [29,, 31, 35]]);
}

exports.manageSearch = function _callee(search) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (search.body) {
            console.log("Event:", JSON.stringify(search, null, 2));
            search = JSON.parse(search.body);
          } else console.log("Search:", JSON.stringify(search, null, 2));

          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(searchRecurse(search, {
            etymologies: []
          }));

        case 4:
          result = _context3.sent;
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", logret(404, "not found"));

        case 10:
          return _context3.abrupt("return", logret(200, result));

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 7]]);
};