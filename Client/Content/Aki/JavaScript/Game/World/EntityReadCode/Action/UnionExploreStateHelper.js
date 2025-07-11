"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionExploreStateHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbTeleControlConfig_1 = require("./FbTeleControlConfig");
class UnionExploreStateHelper {
  static GetUnionExploreStateObject(e) {
    if (e === fb_action_1.UnionExploreState.TeleControlConfig) {
      return new fb_action_1.TeleControlConfig();
    }
  }
  static ReadUnionExploreState(e, t) {
    if (t !== undefined && e === fb_action_1.UnionExploreState.TeleControlConfig) {
      return FbTeleControlConfig_1.FbTeleControlConfig.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionExploreStateHelper = UnionExploreStateHelper;
//# sourceMappingURL=UnionExploreStateHelper.js.map