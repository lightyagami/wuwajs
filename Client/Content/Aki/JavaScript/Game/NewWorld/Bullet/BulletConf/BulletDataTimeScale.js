"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataTimeScale = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class BulletDataTimeScale {
  constructor(t) {
    this.L9o = undefined;
    this.D9o = undefined;
    this.R9o = undefined;
    this.U9o = undefined;
    this.A9o = undefined;
    this.P9o = undefined;
    this.x9o = undefined;
    this.yx1 = false;
    this.w9o = undefined;
    this.B9o = undefined;
    this.b9o = undefined;
    this.rSa = undefined;
    this.Pe = t;
  }
  get AreaTimeScale() {
    if (this.L9o === undefined) {
      this.L9o = this.Pe.区域受击者时间膨胀;
    }
    return this.L9o;
  }
  get TimeScaleOnHit() {
    if (this.D9o === undefined) {
      this.D9o = this.Pe.受击顿帧;
    }
    return this.D9o;
  }
  get ForceBulletTimeScaleInArea() {
    if (this.R9o === undefined) {
      this.R9o = this.Pe.强制影响区域内子弹;
    }
    return this.R9o;
  }
  get TimeScaleOnAttack() {
    if (this.U9o === undefined) {
      this.U9o = this.Pe.攻击顿帧;
    }
    return this.U9o;
  }
  get TimeScaleOnAttackIgnoreAttacker() {
    if (this.A9o === undefined) {
      this.A9o = this.Pe.攻击顿帧忽略攻击者;
    }
    return this.A9o;
  }
  get TimeScaleEffectImmune() {
    if (this.P9o === undefined) {
      this.P9o = this.Pe.时间膨胀失效;
    }
    return this.P9o;
  }
  get TimeScaleWithAttacker() {
    if (this.x9o === undefined) {
      this.x9o = this.Pe.是否跟随攻击者顿帧;
    }
    return this.x9o;
  }
  get CharacterCustomKeyTimeScale() {
    var t;
    if (!this.yx1 && !(this.yx1 = true, t = this.Pe.自定义连携顿帧单位key, StringUtils_1.StringUtils.IsBlank(t))) {
      if ((t = t.split(",")).length > 0) {
        this.w9o = t;
      }
    }
    return this.w9o;
  }
  get AttackerTimeScaleOnHitWeakPoint() {
    if (this.B9o === undefined) {
      this.B9o = this.Pe.命中弱点攻击者顿帧;
    }
    return this.B9o;
  }
  get VictimTimeScaleOnHitWeakPoint() {
    if (this.b9o === undefined) {
      this.b9o = this.Pe.命中弱点受击者顿帧;
    }
    return this.b9o;
  }
  get RemoveHitTimeScaleOnDestroy() {
    if (this.rSa === undefined) {
      this.rSa = this.Pe.子弹销毁时移除受击顿帧;
    }
    return this.rSa;
  }
}
exports.BulletDataTimeScale = BulletDataTimeScale;
//# sourceMappingURL=BulletDataTimeScale.js.map