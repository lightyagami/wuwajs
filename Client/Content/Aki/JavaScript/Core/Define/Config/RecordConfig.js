"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringString_1 = require("./SubType/DicStringString");
class RecordConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LimitParams() {
    return GameUtils_1.GameUtils.ConvertToMap(this.limitparamsLength(), this.limitparamsKey, this.limitparamsValue, this);
  }
  limitparamsKey(t) {
    return this.limitparams(t)?.key();
  }
  limitparamsValue(t) {
    return this.limitparams(t)?.value();
  }
  get ProgressNeed() {
    return this.progressneed();
  }
  get SaveRecord() {
    return this.saverecord();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRecordConfig(t, i) {
    return (i || new RecordConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLimitparamsAt(t, i) {
    return this.limitparams(t);
  }
  limitparams(t, i) {
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  limitparamsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  progressneed() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  saverecord() {
    var t = this.J7.__offset(this.z7, 10);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.RecordConfig = RecordConfig;
//# sourceMappingURL=RecordConfig.js.map