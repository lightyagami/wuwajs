"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionTeammateTeleportConfigHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbTelePortAfterTimeOut_1 = require("./FbTelePortAfterTimeOut");
class UnionTeammateTeleportConfigHelper {
  static GetUnionTeammateTeleportConfigObject(e) {
    if (e === fb_action_1.UnionTeammateTeleportConfig.TelePortAfterTimeOut) {
      return new fb_action_1.TelePortAfterTimeOut();
    }
  }
  static ReadUnionTeammateTeleportConfig(e, t) {
    if (t !== undefined && e === fb_action_1.UnionTeammateTeleportConfig.TelePortAfterTimeOut) {
      return FbTelePortAfterTimeOut_1.FbTelePortAfterTimeOut.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionTeammateTeleportConfigHelper = UnionTeammateTeleportConfigHelper;
//# sourceMappingURL=UnionTeammateTeleportConfigHelper.js.map