"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BubbleData = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BubbleData {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActionGuid() {
    return this.actionguid();
  }
  get Name() {
    return this.name();
  }
  get Async() {
    return this.async();
  }
  get Params() {
    return this.params();
  }
  get ActionId() {
    return this.actionid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBubbleData(t, s) {
    return (s || new BubbleData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  actionguid(t) {
    var s = this.J7.__offset(this.z7, 4);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  async() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  params(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  actionid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BubbleData = BubbleData;
//# sourceMappingURL=BubbleData.js.map