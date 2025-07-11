"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionTimelineTrackControlConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityTrackControl_1 = require("./FbEntityTrackControl");
const FbSequenceTrackControl_1 = require("./FbSequenceTrackControl");
class UnionTimelineTrackControlConfigHelper {
  static GetUnionTimelineTrackControlConfigObject(e) {
    switch (e) {
      case fb_component_1.UnionTimelineTrackControlConfig.EntityTrackControl:
        return new fb_component_1.EntityTrackControl();
      case fb_component_1.UnionTimelineTrackControlConfig.SequenceTrackControl:
        return new fb_component_1.SequenceTrackControl();
      default:
        return;
    }
  }
  static ReadUnionTimelineTrackControlConfig(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionTimelineTrackControlConfig.EntityTrackControl:
          return FbEntityTrackControl_1.FbEntityTrackControl.Create(n);
        case fb_component_1.UnionTimelineTrackControlConfig.SequenceTrackControl:
          return FbSequenceTrackControl_1.FbSequenceTrackControl.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionTimelineTrackControlConfigHelper = UnionTimelineTrackControlConfigHelper;
//# sourceMappingURL=UnionTimelineTrackControlConfigHelper.js.map