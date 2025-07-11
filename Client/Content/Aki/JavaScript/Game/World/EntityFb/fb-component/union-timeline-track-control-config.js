"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionTimelineTrackControlConfig = exports.unionToUnionTimelineTrackControlConfig = exports.UnionTimelineTrackControlConfig = undefined;
const entity_track_control_js_1 = require("../fb-component/entity-track-control.js");
const sequence_track_control_js_1 = require("../fb-component/sequence-track-control.js");
var UnionTimelineTrackControlConfig;
function unionToUnionTimelineTrackControlConfig(n, o) {
  switch (UnionTimelineTrackControlConfig[n]) {
    case "NONE":
      return;
    case "EntityTrackControl":
      return o(new entity_track_control_js_1.EntityTrackControl());
    case "SequenceTrackControl":
      return o(new sequence_track_control_js_1.SequenceTrackControl());
    default:
      return;
  }
}
function unionListToUnionTimelineTrackControlConfig(n, o, e) {
  switch (UnionTimelineTrackControlConfig[n]) {
    case "NONE":
      return;
    case "EntityTrackControl":
      return o(e, new entity_track_control_js_1.EntityTrackControl());
    case "SequenceTrackControl":
      return o(e, new sequence_track_control_js_1.SequenceTrackControl());
    default:
      return;
  }
}
(function (n) {
  n[n.NONE = 0] = "NONE";
  n[n.EntityTrackControl = 1] = "EntityTrackControl";
  n[n.SequenceTrackControl = 2] = "SequenceTrackControl";
})(UnionTimelineTrackControlConfig = exports.UnionTimelineTrackControlConfig ||= {});
exports.unionToUnionTimelineTrackControlConfig = unionToUnionTimelineTrackControlConfig;
exports.unionListToUnionTimelineTrackControlConfig = unionListToUnionTimelineTrackControlConfig; //# sourceMappingURL=union-timeline-track-control-config.js.map