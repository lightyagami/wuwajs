"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFanComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFanEffectConfig_1 = require("./FbFanEffectConfig");
const FbFanStateEffect_1 = require("./FbFanStateEffect");
const UnionFanInteractOptionHelper_1 = require("./UnionFanInteractOptionHelper");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbFanComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.YWh = false;
    this.zWh = undefined;
    this.JWh = false;
    this.ZWh = undefined;
    this.f_h = false;
    this.X6o = undefined;
    this.eQh = false;
    this.tQh = undefined;
    this.iQh = false;
    this.rQh = undefined;
    this.oQh = false;
    this.nQh = 0;
    this.sQh = false;
    this.aQh = 0;
    this.Vvh = false;
    this.jvh = 0;
    this.hQh = false;
    this.lQh = undefined;
    this._Qh = false;
    this.cQh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFanComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get GearType() {
    if (!this.YWh) {
      this.YWh = true;
      this.zWh = this.FbDataInternal.gearType();
    }
    return this.zWh;
  }
  get InteractType() {
    var t;
    var i;
    if (!this.JWh && (this.JWh = true, t = this.FbDataInternal.interactTypeType(), i = UnionFanInteractOptionHelper_1.UnionFanInteractOptionHelper.GetUnionFanInteractOptionObject(t))) {
      this.ZWh = UnionFanInteractOptionHelper_1.UnionFanInteractOptionHelper.ReadUnionFanInteractOption(t, this.FbDataInternal.interactType(i));
    }
    return this.ZWh;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get RotateActor() {
    if (!this.eQh) {
      this.eQh = true;
      this.tQh = this.FbDataInternal.rotateActor();
    }
    return this.tQh;
  }
  get OffsetActor() {
    if (!this.iQh) {
      this.iQh = true;
      this.rQh = this.FbDataInternal.offsetActor();
    }
    return this.rQh;
  }
  get CirclePerRound() {
    if (!this.oQh) {
      this.oQh = true;
      this.nQh = this.FbDataInternal.circlePerRound();
    }
    return this.nQh;
  }
  get InitCircle() {
    if (!this.sQh) {
      this.sQh = true;
      this.aQh = this.FbDataInternal.initCircle();
    }
    return this.aQh;
  }
  get TargetEntityId() {
    if (!this.Vvh) {
      this.Vvh = true;
      this.jvh = this.FbDataInternal.targetEntityId();
    }
    return this.jvh;
  }
  get EffectConfig() {
    if (!this.hQh) {
      this.hQh = true;
      this.lQh = FbFanEffectConfig_1.FbFanEffectConfig.Create(this.FbDataInternal.effectConfig());
    }
    return this.lQh;
  }
  get EffectByState() {
    if (!this._Qh) {
      this._Qh = true;
      this.cQh = new Array();
      var i = this.FbDataInternal.effectByStateLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.effectByState(t, new fb_component_1.FanStateEffect());
          this.cQh.push(FbFanStateEffect_1.FbFanStateEffect.Create(s));
        }
      }
    }
    return this.cQh;
  }
}
exports.FbFanComponent = FbFanComponent;
//# sourceMappingURL=FbFanComponent.js.map