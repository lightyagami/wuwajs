"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSplineMovePatternHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbAirPassageMove_1 = require("./FbAirPassageMove");
const FbPathLineMove_1 = require("./FbPathLineMove");
const FbRacingTrackMove_1 = require("./FbRacingTrackMove");
const FbSlideTrackMove_1 = require("./FbSlideTrackMove");
class UnionSplineMovePatternHelper {
  static GetUnionSplineMovePatternObject(e) {
    switch (e) {
      case fb_action_1.UnionSplineMovePattern.AirPassageMove:
        return new fb_action_1.AirPassageMove();
      case fb_action_1.UnionSplineMovePattern.PathLineMove:
        return new fb_action_1.PathLineMove();
      case fb_action_1.UnionSplineMovePattern.RacingTrackMove:
        return new fb_action_1.RacingTrackMove();
      case fb_action_1.UnionSplineMovePattern.SlideTrackMove:
        return new fb_action_1.SlideTrackMove();
      default:
        return;
    }
  }
  static ReadUnionSplineMovePattern(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionSplineMovePattern.AirPassageMove:
          return FbAirPassageMove_1.FbAirPassageMove.Create(t);
        case fb_action_1.UnionSplineMovePattern.PathLineMove:
          return FbPathLineMove_1.FbPathLineMove.Create(t);
        case fb_action_1.UnionSplineMovePattern.RacingTrackMove:
          return FbRacingTrackMove_1.FbRacingTrackMove.Create(t);
        case fb_action_1.UnionSplineMovePattern.SlideTrackMove:
          return FbSlideTrackMove_1.FbSlideTrackMove.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionSplineMovePatternHelper = UnionSplineMovePatternHelper;
//# sourceMappingURL=UnionSplineMovePatternHelper.js.map