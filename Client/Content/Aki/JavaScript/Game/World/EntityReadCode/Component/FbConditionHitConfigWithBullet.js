"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConditionHitConfigWithBullet = undefined;
const UnionHitBulletTypeHelper_1 = require("./UnionHitBulletTypeHelper");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbConditionHitConfigWithBullet {
  constructor(t) {
    this.FbDataInternal = t;
    this.ich = false;
    this.rch = undefined;
    this.Bch = false;
    this.Cbo = undefined;
    this.ZQ_ = false;
    this.eK_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbConditionHitConfigWithBullet(t);
    }
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.conditions());
    }
    return this.rch;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get HitBullets() {
    var t;
    var i;
    if (!this.ZQ_ && (this.ZQ_ = true, t = this.FbDataInternal.hitBulletsType(), i = UnionHitBulletTypeHelper_1.UnionHitBulletTypeHelper.GetUnionHitBulletTypeObject(t))) {
      this.eK_ = UnionHitBulletTypeHelper_1.UnionHitBulletTypeHelper.ReadUnionHitBulletType(t, this.FbDataInternal.hitBullets(i));
    }
    return this.eK_;
  }
}
exports.FbConditionHitConfigWithBullet = FbConditionHitConfigWithBullet;
//# sourceMappingURL=FbConditionHitConfigWithBullet.js.map