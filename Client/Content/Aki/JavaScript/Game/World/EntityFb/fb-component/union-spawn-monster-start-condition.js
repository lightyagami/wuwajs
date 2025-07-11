"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionSpawnMonsterStartCondition = exports.unionToUnionSpawnMonsterStartCondition = exports.UnionSpawnMonsterStartCondition = undefined;
const immediate_start_condition_js_1 = require("../fb-component/immediate-start-condition.js");
const trigger_range_start_condition_js_1 = require("../fb-component/trigger-range-start-condition.js");
var UnionSpawnMonsterStartCondition;
function unionToUnionSpawnMonsterStartCondition(t, n) {
  switch (UnionSpawnMonsterStartCondition[t]) {
    case "NONE":
      return;
    case "ImmediateStartCondition":
      return n(new immediate_start_condition_js_1.ImmediateStartCondition());
    case "TriggerRangeStartCondition":
      return n(new trigger_range_start_condition_js_1.TriggerRangeStartCondition());
    default:
      return;
  }
}
function unionListToUnionSpawnMonsterStartCondition(t, n, o) {
  switch (UnionSpawnMonsterStartCondition[t]) {
    case "NONE":
      return;
    case "ImmediateStartCondition":
      return n(o, new immediate_start_condition_js_1.ImmediateStartCondition());
    case "TriggerRangeStartCondition":
      return n(o, new trigger_range_start_condition_js_1.TriggerRangeStartCondition());
    default:
      return;
  }
}
(function (t) {
  t[t.NONE = 0] = "NONE";
  t[t.ImmediateStartCondition = 1] = "ImmediateStartCondition";
  t[t.TriggerRangeStartCondition = 2] = "TriggerRangeStartCondition";
})(UnionSpawnMonsterStartCondition = exports.UnionSpawnMonsterStartCondition ||= {});
exports.unionToUnionSpawnMonsterStartCondition = unionToUnionSpawnMonsterStartCondition;
exports.unionListToUnionSpawnMonsterStartCondition = unionListToUnionSpawnMonsterStartCondition; //# sourceMappingURL=union-spawn-monster-start-condition.js.map