"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerCallbackAction = undefined;
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerCallbackAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(s) {
    super();
    this.B7 = undefined;
    this.B7 = s;
  }
  OnStart() {
    this.B7();
    this.Done = true;
  }
}
exports.GuessJokerCallbackAction = GuessJokerCallbackAction;
//# sourceMappingURL=GuessJokerCallbackAction.js.map