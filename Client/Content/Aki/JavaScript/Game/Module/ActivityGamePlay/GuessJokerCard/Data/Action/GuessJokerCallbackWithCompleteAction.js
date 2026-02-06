"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerCallbackWithCompleteAction = undefined;
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerCallbackWithCompleteAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e) {
    super();
    this.B7 = undefined;
    this.B7 = e;
  }
  OnStart() {
    this.B7(() => {
      this.Done = true;
    });
  }
}
exports.GuessJokerCallbackWithCompleteAction = GuessJokerCallbackWithCompleteAction;
//# sourceMappingURL=GuessJokerCallbackWithCompleteAction.js.map