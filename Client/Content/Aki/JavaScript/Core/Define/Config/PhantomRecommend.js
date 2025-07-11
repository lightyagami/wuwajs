"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomRecommend = undefined;
class PhantomRecommend {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get RoleId() {
    return this.roleid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsPhantomRecommend(t, e) {
    return (e || new PhantomRecommend()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomRecommend = PhantomRecommend;
//# sourceMappingURL=PhantomRecommend.js.map