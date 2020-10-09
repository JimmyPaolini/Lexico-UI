"use strict";

var app = require('../../app.js');

var chai = require('chai');

var expect = chai.expect;
var event, context;
describe('Tests index', function () {
  it('verifies successful response', function _callee() {
    var result, response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(app.lambdaHandler(event, context));

          case 2:
            result = _context.sent;
            expect(result).to.be.an('object');
            expect(result.statusCode).to.equal(200);
            expect(result.body).to.be.an('string');
            response = JSON.parse(result.body);
            expect(response).to.be.an('object');
            expect(response.message).to.be.equal("hello world"); // expect(response.location).to.be.an("string");

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  });
});