"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerQuickPass = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TowerQuickPass {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Num() {
    return this.num();
  }
  get QuickPassInst() {
    return GameUtils_1.GameUtils.ConvertToArray(this.quickpassinstLength(), this.quickpassinst, this);
  }
  get TipText() {
    return this.tiptext();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTowerQuickPass(t, s) {
    return (s || new TowerQuickPass()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  num() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetQuickpassinstAt(t) {
    return this.quickpassinst(t);
  }
  quickpassinst(t, s) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  quickpassinstLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  tiptext(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.TowerQuickPass = TowerQuickPass;
//# sourceMappingURL=TowerQuickPass.js.map