"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletChildInfo = undefined;
class BulletChildInfo {
  constructor() {
    this.IsNumberNotEnough = false;
    this.IsActiveSummonChildBullet = false;
    this.HaveSpecialChildrenBullet = false;
    this.HaveSummonedBulletNumber = undefined;
  }
  SetIsNumberNotEnough(t) {
    this.IsNumberNotEnough = t;
  }
  SetIsActiveSummonChildBullet(t) {
    this.IsActiveSummonChildBullet = t;
  }
}
exports.BulletChildInfo = BulletChildInfo;
//# sourceMappingURL=BulletChildInfo.js.map