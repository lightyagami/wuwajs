"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LipSyncData = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class LipSyncData {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get DataID() {
    return this.dataid();
  }
  get FunctionName() {
    return this.functionname();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsLipSyncData(t, i) {
    return (i || new LipSyncData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  dataid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  functionname(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.LipSyncData = LipSyncData;
//# sourceMappingURL=LipSyncData.js.map