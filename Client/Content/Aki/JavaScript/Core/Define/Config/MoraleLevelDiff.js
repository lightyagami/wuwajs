"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleLevelDiff = void 0;
class MoraleLevelDiff {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Level() {
    return this.level()
  }
  get DamageRatio() {
    return this.damageratio()
  }
  get DropRatio() {
    return this.dropratio()
  }
  __init(t, e) {
    return this.z7 = t, this.J7 = e, this
  }
  static getRootAsMoraleLevelDiff(t, e) {
    return (e || new MoraleLevelDiff).__init(t.readInt32(t.position()) + t.position(), t)
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  damageratio() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  dropratio() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 1e4
  }
}
exports.MoraleLevelDiff = MoraleLevelDiff;
//# sourceMappingURL=MoraleLevelDiff.js.map