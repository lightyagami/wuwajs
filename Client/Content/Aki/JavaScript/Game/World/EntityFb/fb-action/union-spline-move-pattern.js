"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unionListToUnionSplineMovePattern = exports.unionToUnionSplineMovePattern = exports.UnionSplineMovePattern = undefined;
const air_passage_move_js_1 = require("../fb-action/air-passage-move.js");
const path_line_move_js_1 = require("../fb-action/path-line-move.js");
const racing_track_move_js_1 = require("../fb-action/racing-track-move.js");
const slide_track_move_js_1 = require("../fb-action/slide-track-move.js");
var UnionSplineMovePattern;
function unionToUnionSplineMovePattern(e, n) {
  switch (UnionSplineMovePattern[e]) {
    case "NONE":
      return;
    case "AirPassageMove":
      return n(new air_passage_move_js_1.AirPassageMove());
    case "PathLineMove":
      return n(new path_line_move_js_1.PathLineMove());
    case "RacingTrackMove":
      return n(new racing_track_move_js_1.RacingTrackMove());
    case "SlideTrackMove":
      return n(new slide_track_move_js_1.SlideTrackMove());
    default:
      return;
  }
}
function unionListToUnionSplineMovePattern(e, n, r) {
  switch (UnionSplineMovePattern[e]) {
    case "NONE":
      return;
    case "AirPassageMove":
      return n(r, new air_passage_move_js_1.AirPassageMove());
    case "PathLineMove":
      return n(r, new path_line_move_js_1.PathLineMove());
    case "RacingTrackMove":
      return n(r, new racing_track_move_js_1.RacingTrackMove());
    case "SlideTrackMove":
      return n(r, new slide_track_move_js_1.SlideTrackMove());
    default:
      return;
  }
}
(function (e) {
  e[e.NONE = 0] = "NONE";
  e[e.AirPassageMove = 1] = "AirPassageMove";
  e[e.PathLineMove = 2] = "PathLineMove";
  e[e.RacingTrackMove = 3] = "RacingTrackMove";
  e[e.SlideTrackMove = 4] = "SlideTrackMove";
})(UnionSplineMovePattern = exports.UnionSplineMovePattern ||= {});
exports.unionToUnionSplineMovePattern = unionToUnionSplineMovePattern;
exports.unionListToUnionSplineMovePattern = unionListToUnionSplineMovePattern; //# sourceMappingURL=union-spline-move-pattern.js.map