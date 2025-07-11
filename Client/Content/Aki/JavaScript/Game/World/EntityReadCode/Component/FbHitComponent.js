"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHitComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbAimPart_1 = require("./FbAimPart");
const FbHitTimeScaleRatio_1 = require("./FbHitTimeScaleRatio");
const UnionHitBulletTypeHelper_1 = require("./UnionHitBulletTypeHelper");
class FbHitComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.jGh = false;
    this.HGh = undefined;
    this.WGh = false;
    this.QGh = undefined;
    this.KGh = false;
    this.$Gh = undefined;
    this.XGh = false;
    this.YGh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHitComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get HitBullet() {
    var t;
    var i;
    if (!this.jGh && (this.jGh = true, t = this.FbDataInternal.hitBulletType(), i = UnionHitBulletTypeHelper_1.UnionHitBulletTypeHelper.GetUnionHitBulletTypeObject(t))) {
      this.HGh = UnionHitBulletTypeHelper_1.UnionHitBulletTypeHelper.ReadUnionHitBulletType(t, this.FbDataInternal.hitBullet(i));
    }
    return this.HGh;
  }
  get AttackerHitTimeScaleRatio() {
    if (!this.WGh) {
      this.WGh = true;
      this.QGh = FbHitTimeScaleRatio_1.FbHitTimeScaleRatio.Create(this.FbDataInternal.attackerHitTimeScaleRatio());
    }
    return this.QGh;
  }
  get VictimHitTimeScaleRatio() {
    if (!this.KGh) {
      this.KGh = true;
      this.$Gh = FbHitTimeScaleRatio_1.FbHitTimeScaleRatio.Create(this.FbDataInternal.victimHitTimeScaleRatio());
    }
    return this.$Gh;
  }
  get AimParts() {
    if (!this.XGh) {
      this.XGh = true;
      this.YGh = new Array();
      var i = this.FbDataInternal.aimPartsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.aimParts(t, new fb_component_1.AimPart());
          this.YGh.push(FbAimPart_1.FbAimPart.Create(e));
        }
      }
    }
    return this.YGh;
  }
}
exports.FbHitComponent = FbHitComponent;
//# sourceMappingURL=FbHitComponent.js.map