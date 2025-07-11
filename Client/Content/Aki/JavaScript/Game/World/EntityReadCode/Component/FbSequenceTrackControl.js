"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSequenceTrackControl = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSequenceTrackControlPoint_1 = require("./FbSequenceTrackControlPoint");
class FbSequenceTrackControl {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.mHh = false;
    this.CHh = undefined;
    this.hHh = false;
    this.lHh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSequenceTrackControl(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Sequence() {
    if (!this.mHh) {
      this.mHh = true;
      this.CHh = this.FbDataInternal.sequence();
    }
    return this.CHh;
  }
  get ControlPoints() {
    if (!this.hHh) {
      this.hHh = true;
      this.lHh = new Array();
      var e = this.FbDataInternal.controlPointsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.controlPoints(t, new fb_component_1.SequenceTrackControlPoint());
          this.lHh.push(FbSequenceTrackControlPoint_1.FbSequenceTrackControlPoint.Create(i));
        }
      }
    }
    return this.lHh;
  }
}
exports.FbSequenceTrackControl = FbSequenceTrackControl;
//# sourceMappingURL=FbSequenceTrackControl.js.map