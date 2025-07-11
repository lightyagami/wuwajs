"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushBuffDesc = undefined;
class BossRushBuffDesc {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SoundAreaInfoConfigId() {
    return this.soundareainfoconfigid();
  }
  __init(s, t) {
    this.z7 = s;
    this.J7 = t;
    return this;
  }
  static getRootAsBossRushBuffDesc(s, t) {
    return (t || new BossRushBuffDesc()).__init(s.readInt32(s.position()) + s.position(), s);
  }
  id() {
    var s = this.J7.__offset(this.z7, 4);
    if (s) {
      return this.J7.readInt32(this.z7 + s);
    } else {
      return 0;
    }
  }
  soundareainfoconfigid() {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.z7 + s);
    } else {
      return 0;
    }
  }
}
exports.BossRushBuffDesc = BossRushBuffDesc;
//# sourceMappingURL=BossRushBuffDesc.js.map