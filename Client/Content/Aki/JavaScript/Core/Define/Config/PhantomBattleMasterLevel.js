"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleMasterLevel = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleMasterLevel {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get Level() {
    return this.level()
  }
  get ActivityId() {
    return this.activityid()
  }
  get Exp() {
    return this.exp()
  }
  get ExpNext() {
    return this.expnext()
  }
  get ExpNeed() {
    return this.expneed()
  }
  get UnlockDropId() {
    return this.unlockdropid()
  }
  get NormalDropId() {
    return this.normaldropid()
  }
  get TitleId() {
    return this.titleid()
  }
  get Desc() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descLength(), this.desc, this)
  }
  __init(t, e) {
    return this.z7 = t, this.J7 = e, this
  }
  static getRootAsPhantomBattleMasterLevel(t, e) {
    return (e || new PhantomBattleMasterLevel).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  level() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  exp() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  expnext() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  expneed() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  unlockdropid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  normaldropid() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  titleid() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetDescAt(t) {
    return this.desc(t)
  }
  desc(t, e) {
    var s = this.J7.__offset(this.z7, 22),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  descLength() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
}
exports.PhantomBattleMasterLevel = PhantomBattleMasterLevel;
//# sourceMappingURL=PhantomBattleMasterLevel.js.map