"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemBase = undefined;
class OpenSystemBase {
  constructor(e) {
    this.EventBase = e;
  }
  async ExecuteOpenView(e, s) {
    return new Promise(e => {
      e(false);
    });
  }
}
exports.OpenSystemBase = OpenSystemBase;
//# sourceMappingURL=OpenSystemBase.js.map