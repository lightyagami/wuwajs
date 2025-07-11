"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCharacterConnectorRange = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbConnectorEffectConfig_1 = require("./FbConnectorEffectConfig");
const FbDynamicEntityMatch_1 = require("./FbDynamicEntityMatch");
class FbCharacterConnectorRange {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.hQh = false;
    this.lQh = undefined;
    this.ljh = false;
    this._jh = 0;
    this.cjh = false;
    this.ujh = 0;
    this.M$h = false;
    this.E$h = undefined;
    this._$h = false;
    this.c$h = undefined;
    this.u$h = false;
    this.d$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCharacterConnectorRange(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EffectConfig() {
    if (!this.hQh) {
      this.hQh = true;
      this.lQh = FbConnectorEffectConfig_1.FbConnectorEffectConfig.Create(this.FbDataInternal.effectConfig());
    }
    return this.lQh;
  }
  get EnterRange() {
    if (!this.ljh) {
      this.ljh = true;
      this._jh = this.FbDataInternal.enterRange();
    }
    return this._jh;
  }
  get LeaveRange() {
    if (!this.cjh) {
      this.cjh = true;
      this.ujh = this.FbDataInternal.leaveRange();
    }
    return this.ujh;
  }
  get TagConditions() {
    if (!this.M$h) {
      this.M$h = true;
      this.E$h = new Array();
      var i = this.FbDataInternal.tagConditionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.E$h.push(this.FbDataInternal.tagConditions(t));
        }
      }
    }
    return this.E$h;
  }
  get MatchConditions() {
    if (!this._$h) {
      this._$h = true;
      this.c$h = new Array();
      var i = this.FbDataInternal.matchConditionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.matchConditions(t, new fb_component_1.DynamicEntityMatch());
          this.c$h.push(FbDynamicEntityMatch_1.FbDynamicEntityMatch.Create(s));
        }
      }
    }
    return this.c$h;
  }
  get KeepConditions() {
    if (!this.u$h) {
      this.u$h = true;
      this.d$h = new Array();
      var i = this.FbDataInternal.keepConditionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.keepConditions(t, new fb_component_1.DynamicEntityMatch());
          this.d$h.push(FbDynamicEntityMatch_1.FbDynamicEntityMatch.Create(s));
        }
      }
    }
    return this.d$h;
  }
}
exports.FbCharacterConnectorRange = FbCharacterConnectorRange;
//# sourceMappingURL=FbCharacterConnectorRange.js.map