"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTargetGearComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbAimPart_1 = require("./FbAimPart");
const FbHitTimeScaleRatio_1 = require("./FbHitTimeScaleRatio");
const FbSplineMove_1 = require("./FbSplineMove");
const UnionHitBulletTypeHelper_1 = require("./UnionHitBulletTypeHelper");
const UnionHitLogicTypeHelper_1 = require("./UnionHitLogicTypeHelper");
class FbTargetGearComponent {
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
    this.u_h = false;
    this.f8o = undefined;
    this.zGh = false;
    this.JGh = false;
    this.ZGh = false;
    this.eOh = 0;
    this.VUh = false;
    this.jUh = undefined;
    this.tOh = false;
    this.iOh = undefined;
    this.qRh = false;
    this.kRh = undefined;
    this.FLh = false;
    this.NLh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTargetGearComponent(t);
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
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get IsCycle() {
    if (!this.zGh) {
      this.zGh = true;
      this.JGh = this.FbDataInternal.isCycle();
    }
    return this.JGh;
  }
  get CycleInterval() {
    if (!this.ZGh) {
      this.ZGh = true;
      this.eOh = this.FbDataInternal.cycleInterval();
    }
    return this.eOh;
  }
  get CycleStates() {
    if (!this.VUh) {
      this.VUh = true;
      this.jUh = new Array();
      var i = this.FbDataInternal.cycleStatesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.jUh.push(this.FbDataInternal.cycleStates(t));
        }
      }
    }
    return this.jUh;
  }
  get HitLogicType() {
    var t;
    var i;
    if (!this.tOh && (this.tOh = true, t = this.FbDataInternal.hitLogicTypeType(), i = UnionHitLogicTypeHelper_1.UnionHitLogicTypeHelper.GetUnionHitLogicTypeObject(t))) {
      this.iOh = UnionHitLogicTypeHelper_1.UnionHitLogicTypeHelper.ReadUnionHitLogicType(t, this.FbDataInternal.hitLogicType(i));
    }
    return this.iOh;
  }
  get Patrol() {
    if (!this.qRh) {
      this.qRh = true;
      this.kRh = FbSplineMove_1.FbSplineMove.Create(this.FbDataInternal.patrol());
    }
    return this.kRh;
  }
  get HitCd() {
    if (!this.FLh) {
      this.FLh = true;
      this.NLh = this.FbDataInternal.hitCd();
    }
    return this.NLh;
  }
}
exports.FbTargetGearComponent = FbTargetGearComponent;
//# sourceMappingURL=FbTargetGearComponent.js.map