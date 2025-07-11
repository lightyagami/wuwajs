"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkEffect = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MarkEffect {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MarkId() {
    return this.markid();
  }
  get EffectResourcePath() {
    return this.effectresourcepath();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsMarkEffect(t, e) {
    return (e || new MarkEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  markid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectresourcepath(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.MarkEffect = MarkEffect;
//# sourceMappingURL=MarkEffect.js.map