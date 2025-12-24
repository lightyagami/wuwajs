"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridTrialRoleRightBottomTag = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const RoleUtils_1 = require("../../../RoleUi/RoleUtils");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridTrialRoleRightBottomTag extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_TagRoleTrial";
  }
  OnRefresh(e) {
    if (e.IsTrialRole && e.TrialRoleId) {
      e = RoleUtils_1.RoleUtils.GetTrailRoleLabelIconById(e.TrialRoleId);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetSpriteByPath(e, this.GetSprite(0), false);
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
}
exports.MediumItemGridTrialRoleRightBottomTag = MediumItemGridTrialRoleRightBottomTag;
//# sourceMappingURL=MediumItemGridTrialRoleRightBottomTag.js.map