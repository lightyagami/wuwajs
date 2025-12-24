"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreRouletteType = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ExploreRouletteType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SortId() {
    return this.sortid();
  }
  get ShowInPad() {
    return this.showinpad();
  }
  get UnlockFuncId() {
    return this.unlockfuncid();
  }
  get TabName() {
    return this.tabname();
  }
  get TabIcon() {
    return this.tabicon();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsExploreRouletteType(t, e) {
    return (e || new ExploreRouletteType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showinpad() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  unlockfuncid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tabname(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  tabicon(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.ExploreRouletteType = ExploreRouletteType;
//# sourceMappingURL=ExploreRouletteType.js.map