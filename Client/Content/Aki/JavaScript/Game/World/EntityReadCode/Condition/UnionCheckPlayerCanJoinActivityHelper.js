"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionCheckPlayerCanJoinActivityHelper = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbCheckPlayerCanJoinRogue_1 = require("./FbCheckPlayerCanJoinRogue");
class UnionCheckPlayerCanJoinActivityHelper {
  static GetUnionCheckPlayerCanJoinActivityObject(e) {
    if (e === fb_condition_1.UnionCheckPlayerCanJoinActivity.CheckPlayerCanJoinRogue) {
      return new fb_condition_1.CheckPlayerCanJoinRogue();
    }
  }
  static ReadUnionCheckPlayerCanJoinActivity(e, i) {
    if (i !== undefined && e === fb_condition_1.UnionCheckPlayerCanJoinActivity.CheckPlayerCanJoinRogue) {
      return FbCheckPlayerCanJoinRogue_1.FbCheckPlayerCanJoinRogue.Create(i);
    } else {
      return undefined;
    }
  }
}
exports.UnionCheckPlayerCanJoinActivityHelper = UnionCheckPlayerCanJoinActivityHelper;
//# sourceMappingURL=UnionCheckPlayerCanJoinActivityHelper.js.map