"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideFromMontage = undefined;
class GuideFromMontage {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get EventGroupId() {
    return this.eventgroupid();
  }
  get GuideGroupId() {
    return this.guidegroupid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsGuideFromMontage(t, e) {
    return (e || new GuideFromMontage()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  eventgroupid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  guidegroupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GuideFromMontage = GuideFromMontage;
//# sourceMappingURL=GuideFromMontage.js.map