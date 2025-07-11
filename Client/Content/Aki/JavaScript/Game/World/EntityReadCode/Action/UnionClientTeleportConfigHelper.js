"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionClientTeleportConfigHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbClientTpRelativeEntityPos_1 = require("./FbClientTpRelativeEntityPos");
class UnionClientTeleportConfigHelper {
  static GetUnionClientTeleportConfigObject(e) {
    if (e === fb_action_1.UnionClientTeleportConfig.ClientTpRelativeEntityPos) {
      return new fb_action_1.ClientTpRelativeEntityPos();
    }
  }
  static ReadUnionClientTeleportConfig(e, t) {
    if (t !== undefined && e === fb_action_1.UnionClientTeleportConfig.ClientTpRelativeEntityPos) {
      return FbClientTpRelativeEntityPos_1.FbClientTpRelativeEntityPos.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionClientTeleportConfigHelper = UnionClientTeleportConfigHelper;
//# sourceMappingURL=UnionClientTeleportConfigHelper.js.map