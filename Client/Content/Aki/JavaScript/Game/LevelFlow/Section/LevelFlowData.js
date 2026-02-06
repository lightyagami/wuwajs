"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowData = undefined;
const Log_1 = require("../../../Core/Common/Log");
class LevelFlowData {
  constructor() {
    this.aTf = new Map();
    this.f7 = 0;
  }
  Init() {}
  Register(e) {
    this.aTf.set(this.f7, e);
    this.f7++;
  }
  GetSection(e) {
    var t = this.aTf.get(e);
    if (t) {
      return t();
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelFlow", 58, `LevelFlowSection index=${e} not registered.`);
    }
  }
  GetCapacity() {
    return this.f7;
  }
}
exports.LevelFlowData = LevelFlowData;
//# sourceMappingURL=LevelFlowData.js.map