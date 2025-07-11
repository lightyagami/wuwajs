"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionTeleportToLatestResetPointOptionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbTeleportToLatestResetPointDirectly_1 = require("./FbTeleportToLatestResetPointDirectly");
class UnionTeleportToLatestResetPointOptionHelper {
  static GetUnionTeleportToLatestResetPointOptionObject(t) {
    if (t === fb_action_1.UnionTeleportToLatestResetPointOption.TeleportToLatestResetPointDirectly) {
      return new fb_action_1.TeleportToLatestResetPointDirectly();
    }
  }
  static ReadUnionTeleportToLatestResetPointOption(t, e) {
    if (e !== undefined && t === fb_action_1.UnionTeleportToLatestResetPointOption.TeleportToLatestResetPointDirectly) {
      return FbTeleportToLatestResetPointDirectly_1.FbTeleportToLatestResetPointDirectly.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionTeleportToLatestResetPointOptionHelper = UnionTeleportToLatestResetPointOptionHelper;
//# sourceMappingURL=UnionTeleportToLatestResetPointOptionHelper.js.map