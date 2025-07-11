"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityStateAudioComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityStateAudioConfig_1 = require("./FbEntityStateAudioConfig");
const UnionAkEventTypeHelper_1 = require("./UnionAkEventTypeHelper");
class FbEntityStateAudioComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.D8h = false;
    this.B8h = undefined;
    this.q8h = false;
    this.k8h = undefined;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityStateAudioComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get AkEventType() {
    var t;
    var i;
    if (!this.D8h && (this.D8h = true, t = this.FbDataInternal.akEventTypeType(), i = UnionAkEventTypeHelper_1.UnionAkEventTypeHelper.GetUnionAkEventTypeObject(t))) {
      this.B8h = UnionAkEventTypeHelper_1.UnionAkEventTypeHelper.ReadUnionAkEventType(t, this.FbDataInternal.akEventType(i));
    }
    return this.B8h;
  }
  get AudioRangeType() {
    if (!this.q8h) {
      this.q8h = true;
      this.k8h = this.FbDataInternal.audioRangeType();
    }
    return this.k8h;
  }
  get Config() {
    if (!this.bSh) {
      this.bSh = true;
      this.TAe = new Array();
      var i = this.FbDataInternal.configLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.config(t, new fb_component_1.EntityStateAudioConfig());
          this.TAe.push(FbEntityStateAudioConfig_1.FbEntityStateAudioConfig.Create(e));
        }
      }
    }
    return this.TAe;
  }
}
exports.FbEntityStateAudioComponent = FbEntityStateAudioComponent;
//# sourceMappingURL=FbEntityStateAudioComponent.js.map