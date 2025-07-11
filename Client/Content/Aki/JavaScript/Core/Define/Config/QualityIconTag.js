"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QualityIconTag = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class QualityIconTag {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ConfigParam() {
    return this.configparam();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsQualityIconTag(t, i) {
    return (i || new QualityIconTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  configparam(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.QualityIconTag = QualityIconTag;
//# sourceMappingURL=QualityIconTag.js.map