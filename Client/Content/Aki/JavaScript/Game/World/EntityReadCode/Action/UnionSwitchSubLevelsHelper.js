"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSwitchSubLevelsHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbPreloadSubLevels_1 = require("./FbPreloadSubLevels");
const FbSwitchPermission_1 = require("./FbSwitchPermission");
const FbSwitchSubLevelsDirectly_1 = require("./FbSwitchSubLevelsDirectly");
class UnionSwitchSubLevelsHelper {
  static GetUnionSwitchSubLevelsObject(e) {
    switch (e) {
      case fb_action_1.UnionSwitchSubLevels.PreloadSubLevels:
        return new fb_action_1.PreloadSubLevels();
      case fb_action_1.UnionSwitchSubLevels.SwitchPermission:
        return new fb_action_1.SwitchPermission();
      case fb_action_1.UnionSwitchSubLevels.SwitchSubLevelsDirectly:
        return new fb_action_1.SwitchSubLevelsDirectly();
      default:
        return;
    }
  }
  static ReadUnionSwitchSubLevels(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionSwitchSubLevels.PreloadSubLevels:
          return FbPreloadSubLevels_1.FbPreloadSubLevels.Create(t);
        case fb_action_1.UnionSwitchSubLevels.SwitchPermission:
          return FbSwitchPermission_1.FbSwitchPermission.Create(t);
        case fb_action_1.UnionSwitchSubLevels.SwitchSubLevelsDirectly:
          return FbSwitchSubLevelsDirectly_1.FbSwitchSubLevelsDirectly.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionSwitchSubLevelsHelper = UnionSwitchSubLevelsHelper;
//# sourceMappingURL=UnionSwitchSubLevelsHelper.js.map