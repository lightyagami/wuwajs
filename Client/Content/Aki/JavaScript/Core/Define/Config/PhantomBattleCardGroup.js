"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleCardGroup = void 0;
class PhantomBattleCardGroup {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get GroupId() {
    return this.groupid()
  }
  get CardId() {
    return this.cardid()
  }
  get Num() {
    return this.num()
  }
  get IsCore() {
    return this.iscore()
  }
  __init(t, r) {
    return this.z7 = t, this.J7 = r, this
  }
  static getRootAsPhantomBattleCardGroup(t, r) {
    return (r || new PhantomBattleCardGroup).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  cardid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  num() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  iscore() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t)
  }
}
exports.PhantomBattleCardGroup = PhantomBattleCardGroup;
//# sourceMappingURL=PhantomBattleCardGroup.js.map