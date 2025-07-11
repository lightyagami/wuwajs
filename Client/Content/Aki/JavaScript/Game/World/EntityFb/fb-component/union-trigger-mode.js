"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionTriggerMode = exports.unionToUnionTriggerMode = exports.UnionTriggerMode = undefined;
const skybox_distance_trigger_js_1 = require("../fb-component/skybox-distance-trigger.js");
const skybox_global_trigger_js_1 = require("../fb-component/skybox-global-trigger.js");
var UnionTriggerMode;
function unionToUnionTriggerMode(e, r) {
  switch (UnionTriggerMode[e]) {
    case "NONE":
      return;
    case "SkyboxDistanceTrigger":
      return r(new skybox_distance_trigger_js_1.SkyboxDistanceTrigger());
    case "SkyboxGlobalTrigger":
      return r(new skybox_global_trigger_js_1.SkyboxGlobalTrigger());
    default:
      return;
  }
}
function unionListToUnionTriggerMode(e, r, o) {
  switch (UnionTriggerMode[e]) {
    case "NONE":
      return;
    case "SkyboxDistanceTrigger":
      return r(o, new skybox_distance_trigger_js_1.SkyboxDistanceTrigger());
    case "SkyboxGlobalTrigger":
      return r(o, new skybox_global_trigger_js_1.SkyboxGlobalTrigger());
    default:
      return;
  }
}
(function (e) {
  e[e.NONE = 0] = "NONE";
  e[e.SkyboxDistanceTrigger = 1] = "SkyboxDistanceTrigger";
  e[e.SkyboxGlobalTrigger = 2] = "SkyboxGlobalTrigger";
})(UnionTriggerMode = exports.UnionTriggerMode ||= {});
exports.unionToUnionTriggerMode = unionToUnionTriggerMode;
exports.unionListToUnionTriggerMode = unionListToUnionTriggerMode; //# sourceMappingURL=union-trigger-mode.js.map