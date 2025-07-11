"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTimelineTrackControlComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbTimelineControlGroup_1 = require("./FbTimelineControlGroup");
class FbTimelineTrackControlComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.J8h = false;
    this.Z8h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTimelineTrackControlComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ControlGroups() {
    if (!this.J8h) {
      this.J8h = true;
      this.Z8h = new Array();
      var e = this.FbDataInternal.controlGroupsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var o = this.FbDataInternal.controlGroups(t, new fb_component_1.TimelineControlGroup());
          this.Z8h.push(FbTimelineControlGroup_1.FbTimelineControlGroup.Create(o));
        }
      }
    }
    return this.Z8h;
  }
}
exports.FbTimelineTrackControlComponent = FbTimelineTrackControlComponent;
//# sourceMappingURL=FbTimelineTrackControlComponent.js.map