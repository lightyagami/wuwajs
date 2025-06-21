"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Coupon = void 0;
class Coupon {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get Param() {
    return this.param()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsCoupon(t, s) {
    return (s || new Coupon).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  param() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.Coupon = Coupon;
//# sourceMappingURL=Coupon.js.map