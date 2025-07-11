"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowText = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FlowText {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Key() {
    return this.key();
  }
  get FlowListId() {
    return this.flowlistid();
  }
  get PlotLineId() {
    return this.plotlineid();
  }
  get Id() {
    return this.id();
  }
  get Text() {
    return this.text();
  }
  get Sound() {
    return this.sound();
  }
  get EsKey() {
    return this.eskey();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsFlowText(t, s) {
    return (s || new FlowText()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  key() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt64(this.z7 + t);
    } else {
      return BigInt("0");
    }
  }
  flowlistid(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  plotlineid(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  id() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  text() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sound(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  eskey(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.FlowText = FlowText;
//# sourceMappingURL=FlowText.js.map