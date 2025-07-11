"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionSetPlayerOperationRestriction = exports.unionToUnionSetPlayerOperationRestriction = exports.UnionSetPlayerOperationRestriction = undefined;
const disable_all_player_operation_js_1 = require("../fb-action/disable-all-player-operation.js");
const disable_module_player_operation_js_1 = require("../fb-action/disable-module-player-operation.js");
const enable_all_player_operation_js_1 = require("../fb-action/enable-all-player-operation.js");
var UnionSetPlayerOperationRestriction;
function unionToUnionSetPlayerOperationRestriction(e, a) {
  switch (UnionSetPlayerOperationRestriction[e]) {
    case "NONE":
      return;
    case "DisableAllPlayerOperation":
      return a(new disable_all_player_operation_js_1.DisableAllPlayerOperation());
    case "DisableModulePlayerOperation":
      return a(new disable_module_player_operation_js_1.DisableModulePlayerOperation());
    case "EnableAllPlayerOperation":
      return a(new enable_all_player_operation_js_1.EnableAllPlayerOperation());
    default:
      return;
  }
}
function unionListToUnionSetPlayerOperationRestriction(e, a, r) {
  switch (UnionSetPlayerOperationRestriction[e]) {
    case "NONE":
      return;
    case "DisableAllPlayerOperation":
      return a(r, new disable_all_player_operation_js_1.DisableAllPlayerOperation());
    case "DisableModulePlayerOperation":
      return a(r, new disable_module_player_operation_js_1.DisableModulePlayerOperation());
    case "EnableAllPlayerOperation":
      return a(r, new enable_all_player_operation_js_1.EnableAllPlayerOperation());
    default:
      return;
  }
}
(function (e) {
  e[e.NONE = 0] = "NONE";
  e[e.DisableAllPlayerOperation = 1] = "DisableAllPlayerOperation";
  e[e.DisableModulePlayerOperation = 2] = "DisableModulePlayerOperation";
  e[e.EnableAllPlayerOperation = 3] = "EnableAllPlayerOperation";
})(UnionSetPlayerOperationRestriction = exports.UnionSetPlayerOperationRestriction ||= {});
exports.unionToUnionSetPlayerOperationRestriction = unionToUnionSetPlayerOperationRestriction;
exports.unionListToUnionSetPlayerOperationRestriction = unionListToUnionSetPlayerOperationRestriction; //# sourceMappingURL=union-set-player-operation-restriction.js.map