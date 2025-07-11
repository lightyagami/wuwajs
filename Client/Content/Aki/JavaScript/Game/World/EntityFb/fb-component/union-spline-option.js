"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionSplineOption = exports.unionToUnionSplineOption = exports.UnionSplineOption = undefined;
const air_passage_spline_js_1 = require("../fb-component/air-passage-spline.js");
const butterfly_spline_js_1 = require("../fb-component/butterfly-spline.js");
const common_spline_js_1 = require("../fb-component/common-spline.js");
const continues_variable_speed_movement_spline_js_1 = require("../fb-component/continues-variable-speed-movement-spline.js");
const effect_spline_js_1 = require("../fb-component/effect-spline.js");
const level_aispline_js_1 = require("../fb-component/level-aispline.js");
const parkour_spline_js_1 = require("../fb-component/parkour-spline.js");
const patrol_spline_js_1 = require("../fb-component/patrol-spline.js");
const time_patrol_spline_js_1 = require("../fb-component/time-patrol-spline.js");
var UnionSplineOption;
function unionToUnionSplineOption(e, n) {
  switch (UnionSplineOption[e]) {
    case "NONE":
      return;
    case "AirPassageSpline":
      return n(new air_passage_spline_js_1.AirPassageSpline());
    case "ButterflySpline":
      return n(new butterfly_spline_js_1.ButterflySpline());
    case "CommonSpline":
      return n(new common_spline_js_1.CommonSpline());
    case "ContinuesVariableSpeedMovementSpline":
      return n(new continues_variable_speed_movement_spline_js_1.ContinuesVariableSpeedMovementSpline());
    case "EffectSpline":
      return n(new effect_spline_js_1.EffectSpline());
    case "LevelAISpline":
      return n(new level_aispline_js_1.LevelAISpline());
    case "ParkourSpline":
      return n(new parkour_spline_js_1.ParkourSpline());
    case "PatrolSpline":
      return n(new patrol_spline_js_1.PatrolSpline());
    case "TimePatrolSpline":
      return n(new time_patrol_spline_js_1.TimePatrolSpline());
    default:
      return;
  }
}
function unionListToUnionSplineOption(e, n, i) {
  switch (UnionSplineOption[e]) {
    case "NONE":
      return;
    case "AirPassageSpline":
      return n(i, new air_passage_spline_js_1.AirPassageSpline());
    case "ButterflySpline":
      return n(i, new butterfly_spline_js_1.ButterflySpline());
    case "CommonSpline":
      return n(i, new common_spline_js_1.CommonSpline());
    case "ContinuesVariableSpeedMovementSpline":
      return n(i, new continues_variable_speed_movement_spline_js_1.ContinuesVariableSpeedMovementSpline());
    case "EffectSpline":
      return n(i, new effect_spline_js_1.EffectSpline());
    case "LevelAISpline":
      return n(i, new level_aispline_js_1.LevelAISpline());
    case "ParkourSpline":
      return n(i, new parkour_spline_js_1.ParkourSpline());
    case "PatrolSpline":
      return n(i, new patrol_spline_js_1.PatrolSpline());
    case "TimePatrolSpline":
      return n(i, new time_patrol_spline_js_1.TimePatrolSpline());
    default:
      return;
  }
}
(function (e) {
  e[e.NONE = 0] = "NONE";
  e[e.AirPassageSpline = 1] = "AirPassageSpline";
  e[e.ButterflySpline = 2] = "ButterflySpline";
  e[e.CommonSpline = 3] = "CommonSpline";
  e[e.ContinuesVariableSpeedMovementSpline = 4] = "ContinuesVariableSpeedMovementSpline";
  e[e.EffectSpline = 5] = "EffectSpline";
  e[e.LevelAISpline = 6] = "LevelAISpline";
  e[e.ParkourSpline = 7] = "ParkourSpline";
  e[e.PatrolSpline = 8] = "PatrolSpline";
  e[e.TimePatrolSpline = 9] = "TimePatrolSpline";
})(UnionSplineOption = exports.UnionSplineOption ||= {});
exports.unionToUnionSplineOption = unionToUnionSplineOption;
exports.unionListToUnionSplineOption = unionListToUnionSplineOption; //# sourceMappingURL=union-spline-option.js.map