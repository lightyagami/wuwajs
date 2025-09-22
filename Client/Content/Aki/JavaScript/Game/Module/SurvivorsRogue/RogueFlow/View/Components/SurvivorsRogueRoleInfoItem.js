"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueRoleInfoItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const SurvivorsRogueUiDefine_1 = require("../../../SurvivorsRogueUiDefine");
class SurvivorsRogueRoleInfoItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {}
  Refresh(e, i) {
    var r;
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e);
    if (e && (r = (e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.TrialRoleId))?.GetRoleConfig())) {
      this.SetTextureShowUntilLoaded(r.FormationRoleCard, this.GetTexture(0));
      this.GetText(1).SetText(e.GetName());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), SurvivorsRogueUiDefine_1.SURVIVORS_LV_KEY, i);
      this.GetText(2).SetUIActive(true);
    }
  }
}
exports.SurvivorsRogueRoleInfoItem = SurvivorsRogueRoleInfoItem;
//# sourceMappingURL=SurvivorsRogueRoleInfoItem.js.map