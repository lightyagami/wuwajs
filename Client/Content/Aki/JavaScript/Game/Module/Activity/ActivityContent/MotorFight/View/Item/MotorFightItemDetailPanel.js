"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightItemDetailPanel = undefined;
const UE = require("ue");
const LevelGeneralCommons_1 = require("../../../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class MotorFightItemDetailPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIText], [7, UE.UIItem]];
  }
  Refresh(e) {
    var i = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightQuality(e.Quality);
    this.SetTextureByPath(i.DetailCardBg, this.GetTexture(1));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
    this.SetTextureByPath(e.BigIcon, this.GetTexture(3));
    var i = ConfigManager_1.ConfigManager.MotorFightConfig.GetMotorFightItemType(e.Type);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.Name);
    this.SetSpriteByPath(i.Icon, this.GetSprite(5), false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Desc, ...e.DescParams);
    this.GetItem(7)?.SetUIActive(!e.IsUnLock);
    if (!e.IsUnLock) {
      i = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.ConditionId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i);
    }
  }
}
exports.MotorFightItemDetailPanel = MotorFightItemDetailPanel;
//# sourceMappingURL=MotorFightItemDetailPanel.js.map