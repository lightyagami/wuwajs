"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCasterClassFactory = undefined;
class BulletCasterClassFactory {
  static GetInstance(t, s) {
    if (BulletCasterClassFactory.Rec.has(t)) {
      return new (BulletCasterClassFactory.Rec.get(t))(s);
    }
  }
  static Register(s) {
    return function (t) {
      if (!BulletCasterClassFactory.Rec.has(s)) {
        BulletCasterClassFactory.Rec.set(s, t);
      }
    };
  }
}
(exports.BulletCasterClassFactory = BulletCasterClassFactory).Rec = new Map();
//# sourceMappingURL=BulletCasterFactory.js.map