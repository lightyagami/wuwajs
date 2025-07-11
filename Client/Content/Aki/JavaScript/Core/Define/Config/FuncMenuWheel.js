"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FuncMenuWheel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FuncMenuWheel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get FuncId() {
    return this.funcid();
  }
  get FuncName() {
    return this.funcname();
  }
  get FuncMenuIconPath() {
    return this.funcmenuiconpath();
  }
  get FuncMenuSequence() {
    return this.funcmenusequence();
  }
  get AutoEquip() {
    return this.autoequip();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get ShowInAssembly() {
    return this.showinassembly();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsFuncMenuWheel(t, e) {
    return (e || new FuncMenuWheel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  funcid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  funcname(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  funcmenuiconpath(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  funcmenusequence() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  autoequip() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showinassembly() {
    var t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.FuncMenuWheel = FuncMenuWheel;
//# sourceMappingURL=FuncMenuWheel.js.map