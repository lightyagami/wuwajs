"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResSynergyType = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResSynergyType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SynergyTypeName() {
    return this.synergytypename();
  }
  __init(e, t) {
    this.z7 = e;
    this.J7 = t;
    return this;
  }
  static getRootAsRogueResSynergyType(e, t) {
    return (t || new RogueResSynergyType()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  id() {
    var e = this.J7.__offset(this.z7, 4);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  synergytypename(e) {
    var t = this.J7.__offset(this.z7, 6);
    var t = t ? this.J7.__string(this.z7 + t, e) : null;
    if (typeof t == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(t);
    }
    return t;
  }
}
exports.RogueResSynergyType = RogueResSynergyType;
//# sourceMappingURL=RogueResSynergyType.js.map