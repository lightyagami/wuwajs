"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityTrackControl = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityTrackControlPoint_1 = require("./FbEntityTrackControlPoint");
class FbEntityTrackControl {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.hHh = false;
    this.lHh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityTrackControl(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get ControlPoints() {
    if (!this.hHh) {
      this.hHh = true;
      this.lHh = new Array();
      var i = this.FbDataInternal.controlPointsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var r = this.FbDataInternal.controlPoints(t, new fb_component_1.EntityTrackControlPoint());
          this.lHh.push(FbEntityTrackControlPoint_1.FbEntityTrackControlPoint.Create(r));
        }
      }
    }
    return this.lHh;
  }
}
exports.FbEntityTrackControl = FbEntityTrackControl;
//# sourceMappingURL=FbEntityTrackControl.js.map