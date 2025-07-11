"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataChild = undefined;
class BulletDataChild {
  constructor(t) {
    this.W6o = undefined;
    this.K6o = undefined;
    this.Q6o = undefined;
    this.e6o = undefined;
    this.X6o = undefined;
    this.$6o = undefined;
    this.Pe = t;
  }
  get RowName() {
    if (this.W6o === undefined) {
      this.W6o = this.Pe.召唤子弹ID;
    }
    return this.W6o;
  }
  get Delay() {
    if (this.K6o === undefined) {
      this.K6o = this.Pe.召唤子弹延迟;
    }
    return this.K6o;
  }
  get Num() {
    if (this.Q6o === undefined) {
      this.Q6o = this.Pe.召唤子弹数量;
    }
    return this.Q6o;
  }
  get Interval() {
    if (this.e6o === undefined) {
      this.e6o = this.Pe.召唤子弹间隔;
    }
    return this.e6o;
  }
  get Condition() {
    if (this.X6o === undefined) {
      this.X6o = this.Pe.召唤触发;
    }
    return this.X6o;
  }
  get BreakOnFail() {
    if (this.$6o === undefined) {
      this.$6o = this.Pe.失败是否停止;
    }
    return this.$6o;
  }
}
exports.BulletDataChild = BulletDataChild;
//# sourceMappingURL=BulletDataChild.js.map