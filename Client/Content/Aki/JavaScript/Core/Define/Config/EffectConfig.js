"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class EffectConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Path() {
    return this.path();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsEffectConfig(t, s) {
    return (s || new EffectConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var s = this.J7.__offset(this.z7, 4);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  path(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.EffectConfig = EffectConfig;
//# sourceMappingURL=EffectConfig.js.map