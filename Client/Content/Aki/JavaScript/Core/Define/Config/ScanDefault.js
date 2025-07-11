"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScanDefault = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ScanDefault {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get UId() {
    return this.uid();
  }
  get EntityType() {
    return this.entitytype();
  }
  get ScanId() {
    return this.scanid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsScanDefault(t, s) {
    return (s || new ScanDefault()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  uid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entitytype(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  scanid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ScanDefault = ScanDefault;
//# sourceMappingURL=ScanDefault.js.map