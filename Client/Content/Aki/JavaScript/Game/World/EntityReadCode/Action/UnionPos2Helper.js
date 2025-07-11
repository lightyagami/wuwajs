"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPos2Helper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbAbsolutePos2_1 = require("./FbAbsolutePos2");
const FbEntityPos2_1 = require("./FbEntityPos2");
const FbPlayerPos2_1 = require("./FbPlayerPos2");
class UnionPos2Helper {
  static GetUnionPos2Object(e) {
    switch (e) {
      case fb_action_1.UnionPos2.AbsolutePos2:
        return new fb_action_1.AbsolutePos2();
      case fb_action_1.UnionPos2.EntityPos2:
        return new fb_action_1.EntityPos2();
      case fb_action_1.UnionPos2.PlayerPos2:
        return new fb_action_1.PlayerPos2();
      default:
        return;
    }
  }
  static ReadUnionPos2(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionPos2.AbsolutePos2:
          return FbAbsolutePos2_1.FbAbsolutePos2.Create(t);
        case fb_action_1.UnionPos2.EntityPos2:
          return FbEntityPos2_1.FbEntityPos2.Create(t);
        case fb_action_1.UnionPos2.PlayerPos2:
          return FbPlayerPos2_1.FbPlayerPos2.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionPos2Helper = UnionPos2Helper;
//# sourceMappingURL=UnionPos2Helper.js.map