"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementIconTag = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ElementIconTag {
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
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsElementIconTag(t, e) {
    return (e || new ElementIconTag()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  configparam(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.ElementIconTag = ElementIconTag;
//# sourceMappingURL=ElementIconTag.js.map