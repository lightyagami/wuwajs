"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillToughWhiteList = undefined;
class SkillToughWhiteList {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSkillToughWhiteList(t, i) {
    return (i || new SkillToughWhiteList()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SkillToughWhiteList = SkillToughWhiteList;
//# sourceMappingURL=SkillToughWhiteList.js.map