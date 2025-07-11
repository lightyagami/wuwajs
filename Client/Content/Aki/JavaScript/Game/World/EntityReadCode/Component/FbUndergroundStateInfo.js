"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUndergroundStateInfo = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbUndergroundStateInfo {
  constructor(t) {
    this.FbDataInternal = t;
    this.Q_h = false;
    this.K_h = 0;
    this.wkh = false;
    this.Pkh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbUndergroundStateInfo(t);
    }
  }
  get StateId() {
    if (!this.Q_h) {
      this.Q_h = true;
      this.K_h = this.FbDataInternal.stateId();
    }
    return this.K_h;
  }
  get RestartPos() {
    if (!this.wkh) {
      this.wkh = true;
      this.Pkh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.restartPos());
    }
    return this.Pkh;
  }
}
exports.FbUndergroundStateInfo = FbUndergroundStateInfo;
//# sourceMappingURL=FbUndergroundStateInfo.js.map