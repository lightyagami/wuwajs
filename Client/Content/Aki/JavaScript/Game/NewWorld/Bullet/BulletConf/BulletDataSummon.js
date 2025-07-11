"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataSummon = undefined;
class BulletDataSummon {
  constructor(t) {
    this.I9o = undefined;
    this.T9o = undefined;
    this.Pe = t;
  }
  get EntityId() {
    if (this.I9o === undefined) {
      this.I9o = this.Pe.实体ID;
    }
    return this.I9o;
  }
  get DestroyEntityOnBulletEnd() {
    if (this.T9o === undefined) {
      this.T9o = this.Pe.是否随子弹销毁而销毁;
    }
    return this.T9o;
  }
}
exports.BulletDataSummon = BulletDataSummon;
//# sourceMappingURL=BulletDataSummon.js.map