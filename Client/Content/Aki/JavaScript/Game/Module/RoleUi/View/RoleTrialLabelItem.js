"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTrialLabelItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoleDefine_1 = require("../RoleDefine");
const RoleUtils_1 = require("../RoleUtils");
class RoleTrialLabelItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText]];
  }
  Refresh(e) {
    var i;
    if (RoleUtils_1.RoleUtils.IsTrialRole(e) && (e = RoleUtils_1.RoleUtils.GetTrialRoleType(e)) !== 0) {
      i = RoleDefine_1.trialRoleHexColor[e] ?? RoleDefine_1.trialRoleHexColor[1];
      i = UE.Color.FromHex(i);
      this.GetSprite(0)?.SetColor(i);
      this.GetText(2)?.SetColor(i);
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(RoleUtils_1.RoleUtils.GetTrialRoleLabelIconByType(e));
      this.SetSpriteByPath(i, this.GetSprite(1), false);
    }
  }
}
exports.RoleTrialLabelItem = RoleTrialLabelItem;
//# sourceMappingURL=RoleTrialLabelItem.js.map