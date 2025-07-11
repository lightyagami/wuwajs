"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionSwitchSubLevels = exports.unionToUnionSwitchSubLevels = exports.UnionSwitchSubLevels = undefined;
const preload_sub_levels_js_1 = require("../fb-action/preload-sub-levels.js");
const switch_permission_js_1 = require("../fb-action/switch-permission.js");
const switch_sub_levels_directly_js_1 = require("../fb-action/switch-sub-levels-directly.js");
var UnionSwitchSubLevels;
function unionToUnionSwitchSubLevels(e, s) {
  switch (UnionSwitchSubLevels[e]) {
    case "NONE":
      return;
    case "PreloadSubLevels":
      return s(new preload_sub_levels_js_1.PreloadSubLevels());
    case "SwitchPermission":
      return s(new switch_permission_js_1.SwitchPermission());
    case "SwitchSubLevelsDirectly":
      return s(new switch_sub_levels_directly_js_1.SwitchSubLevelsDirectly());
    default:
      return;
  }
}
function unionListToUnionSwitchSubLevels(e, s, i) {
  switch (UnionSwitchSubLevels[e]) {
    case "NONE":
      return;
    case "PreloadSubLevels":
      return s(i, new preload_sub_levels_js_1.PreloadSubLevels());
    case "SwitchPermission":
      return s(i, new switch_permission_js_1.SwitchPermission());
    case "SwitchSubLevelsDirectly":
      return s(i, new switch_sub_levels_directly_js_1.SwitchSubLevelsDirectly());
    default:
      return;
  }
}
(function (e) {
  e[e.NONE = 0] = "NONE";
  e[e.PreloadSubLevels = 1] = "PreloadSubLevels";
  e[e.SwitchPermission = 2] = "SwitchPermission";
  e[e.SwitchSubLevelsDirectly = 3] = "SwitchSubLevelsDirectly";
})(UnionSwitchSubLevels = exports.UnionSwitchSubLevels ||= {});
exports.unionToUnionSwitchSubLevels = unionToUnionSwitchSubLevels;
exports.unionListToUnionSwitchSubLevels = unionListToUnionSwitchSubLevels; //# sourceMappingURL=union-switch-sub-levels.js.map