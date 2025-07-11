"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionMatchRoleOptionHelper = undefined;
const fb_match_1 = require("../../../../Game/World/EntityFb/fb-match");
const FbMatchPhantomRole_1 = require("./FbMatchPhantomRole");
const FbMatchPlayerRole_1 = require("./FbMatchPlayerRole");
class UnionMatchRoleOptionHelper {
  static GetUnionMatchRoleOptionObject(t) {
    switch (t) {
      case fb_match_1.UnionMatchRoleOption.MatchPhantomRole:
        return new fb_match_1.MatchPhantomRole();
      case fb_match_1.UnionMatchRoleOption.MatchPlayerRole:
        return new fb_match_1.MatchPlayerRole();
      default:
        return;
    }
  }
  static ReadUnionMatchRoleOption(t, e) {
    if (e !== undefined) {
      switch (t) {
        case fb_match_1.UnionMatchRoleOption.MatchPhantomRole:
          return FbMatchPhantomRole_1.FbMatchPhantomRole.Create(e);
        case fb_match_1.UnionMatchRoleOption.MatchPlayerRole:
          return FbMatchPlayerRole_1.FbMatchPlayerRole.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionMatchRoleOptionHelper = UnionMatchRoleOptionHelper;
//# sourceMappingURL=UnionMatchRoleOptionHelper.js.map