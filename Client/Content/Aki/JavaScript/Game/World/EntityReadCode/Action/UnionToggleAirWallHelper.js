"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionToggleAirWallHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbCloseAirWall_1 = require("./FbCloseAirWall");
const FbOpenAirWall_1 = require("./FbOpenAirWall");
class UnionToggleAirWallHelper {
  static GetUnionToggleAirWallObject(e) {
    switch (e) {
      case fb_action_1.UnionToggleAirWall.CloseAirWall:
        return new fb_action_1.CloseAirWall();
      case fb_action_1.UnionToggleAirWall.OpenAirWall:
        return new fb_action_1.OpenAirWall();
      default:
        return;
    }
  }
  static ReadUnionToggleAirWall(e, l) {
    if (l !== undefined) {
      switch (e) {
        case fb_action_1.UnionToggleAirWall.CloseAirWall:
          return FbCloseAirWall_1.FbCloseAirWall.Create(l);
        case fb_action_1.UnionToggleAirWall.OpenAirWall:
          return FbOpenAirWall_1.FbOpenAirWall.Create(l);
        default:
          return;
      }
    }
  }
}
exports.UnionToggleAirWallHelper = UnionToggleAirWallHelper;
//# sourceMappingURL=UnionToggleAirWallHelper.js.map