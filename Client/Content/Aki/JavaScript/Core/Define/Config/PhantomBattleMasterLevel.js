"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleMasterLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleMasterLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Level() {
    return this.level();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Exp() {
    return this.exp();
  }
  get ExpNext() {
    return this.expnext();
  }
  get ExpNeed() {
    return this.expneed();
  }
  get UnlockDropId() {
    return this.unlockdropid();
  }
  get NormalDropId() {
    return this.normaldropid();
  }
  get TitleId() {
    return this.titleid();
  }
  get Desc() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descLength(), this.desc, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsPhantomBattleMasterLevel(t, e) {
    return (e || new PhantomBattleMasterLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  exp() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  expnext() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  expneed() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockdropid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  normaldropid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  titleid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDescAt(t) {
    return this.desc(t);
  }
  desc(t, e) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, e) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  descLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomBattleMasterLevel = PhantomBattleMasterLevel;
//# sourceMappingURL=PhantomBattleMasterLevel.js.map