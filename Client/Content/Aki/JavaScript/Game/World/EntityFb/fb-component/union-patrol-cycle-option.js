"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionPatrolCycleOption = exports.unionToUnionPatrolCycleOption = exports.UnionPatrolCycleOption = undefined;
const patrol_cycle_looply_js_1 = require("../fb-component/patrol-cycle-looply.js");
const patrol_cycle_oncely_js_1 = require("../fb-component/patrol-cycle-oncely.js");
var UnionPatrolCycleOption;
function unionToUnionPatrolCycleOption(o, e) {
  switch (UnionPatrolCycleOption[o]) {
    case "NONE":
      return;
    case "PatrolCycleLooply":
      return e(new patrol_cycle_looply_js_1.PatrolCycleLooply());
    case "PatrolCycleOncely":
      return e(new patrol_cycle_oncely_js_1.PatrolCycleOncely());
    default:
      return;
  }
}
function unionListToUnionPatrolCycleOption(o, e, l) {
  switch (UnionPatrolCycleOption[o]) {
    case "NONE":
      return;
    case "PatrolCycleLooply":
      return e(l, new patrol_cycle_looply_js_1.PatrolCycleLooply());
    case "PatrolCycleOncely":
      return e(l, new patrol_cycle_oncely_js_1.PatrolCycleOncely());
    default:
      return;
  }
}
(function (o) {
  o[o.NONE = 0] = "NONE";
  o[o.PatrolCycleLooply = 1] = "PatrolCycleLooply";
  o[o.PatrolCycleOncely = 2] = "PatrolCycleOncely";
})(UnionPatrolCycleOption = exports.UnionPatrolCycleOption ||= {});
exports.unionToUnionPatrolCycleOption = unionToUnionPatrolCycleOption;
exports.unionListToUnionPatrolCycleOption = unionListToUnionPatrolCycleOption; //# sourceMappingURL=union-patrol-cycle-option.js.map