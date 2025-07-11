"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleCardGroupInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleCardGroupInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get CoreSlotLocked() {
    return this.coreslotlocked();
  }
  get CoreCardCountLimit() {
    return this.corecardcountlimit();
  }
  get NormalCardCountLimit() {
    return this.normalcardcountlimit();
  }
  get ElementCountLimit() {
    return this.elementcountlimit();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsPhantomBattleCardGroupInfo(t, r) {
    return (r || new PhantomBattleCardGroupInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var r = this.J7.__offset(this.z7, 6);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  coreslotlocked() {
    var t = this.J7.__offset(this.z7, 8);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  corecardcountlimit() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  normalcardcountlimit() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementcountlimit() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomBattleCardGroupInfo = PhantomBattleCardGroupInfo;
//# sourceMappingURL=PhantomBattleCardGroupInfo.js.map