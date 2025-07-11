"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionCheckTargetHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbCheckOnlinePlayer_1 = require("./FbCheckOnlinePlayer");
const FbCheckTargetEntity_1 = require("./FbCheckTargetEntity");
class UnionCheckTargetHelper {
  static GetUnionCheckTargetObject(e) {
    switch (e) {
      case fb_condition_1.UnionCheckTarget.CheckOnlinePlayer:
        return new fb_condition_1.CheckOnlinePlayer();
      case fb_condition_1.UnionCheckTarget.CheckTargetEntity:
        return new fb_condition_1.CheckTargetEntity();
      default:
        return;
    }
  }
  static ReadUnionCheckTarget(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_condition_1.UnionCheckTarget.CheckOnlinePlayer:
          return FbCheckOnlinePlayer_1.FbCheckOnlinePlayer.Create(t);
        case fb_condition_1.UnionCheckTarget.CheckTargetEntity:
          return FbCheckTargetEntity_1.FbCheckTargetEntity.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionCheckTargetHelper = UnionCheckTargetHelper;
//# sourceMappingURL=UnionCheckTargetHelper.js.map