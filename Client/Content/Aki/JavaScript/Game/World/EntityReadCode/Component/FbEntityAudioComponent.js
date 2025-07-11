"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityAudioComponent = undefined;
const UnionAkEventTypeHelper_1 = require("./UnionAkEventTypeHelper");
class FbEntityAudioComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.D8h = false;
    this.B8h = undefined;
    this.q8h = false;
    this.k8h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityAudioComponent(t);
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
    var e;
    if (!this.D8h && (this.D8h = true, t = this.FbDataInternal.akEventTypeType(), e = UnionAkEventTypeHelper_1.UnionAkEventTypeHelper.GetUnionAkEventTypeObject(t))) {
      this.B8h = UnionAkEventTypeHelper_1.UnionAkEventTypeHelper.ReadUnionAkEventType(t, this.FbDataInternal.akEventType(e));
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
}
exports.FbEntityAudioComponent = FbEntityAudioComponent;
//# sourceMappingURL=FbEntityAudioComponent.js.map