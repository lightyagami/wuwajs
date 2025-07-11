"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvignonStageItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class AvignonStageItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xOe = 0;
    this.GSc = undefined;
    this.NSc = undefined;
    this.zAc = () => {
      this.NSc = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(this.xOe);
      var e = this.NSc.GetTaskProgress();
      this.GetText(4).SetText(e + "<size=-18>%</size>");
      var e = this.NSc.StageState;
      this.GetSprite(5).SetUIActive(e === 2);
      var e = this.NSc.GetRewardState() || this.NSc.HasNewStageFlag();
      this.GetItem(8).SetUIActive(e);
    };
    this.jYe = () => {
      if (this.NSc) {
        if (this.NSc.IsUnlock) {
          UiManager_1.UiManager.OpenView("AvignonStageTaskView", this.xOe);
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(this.NSc.GetLockConditionText());
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UISprite], [6, UE.UITexture], [7, UE.UISprite], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jYe]];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.zAc);
    this.xOe = this.OpenParam;
    this.GSc = ConfigManager_1.ConfigManager.AvignonConfig.GetStageConfigById(this.xOe);
    this.NSc = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(this.xOe);
    if (this.GSc) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.GSc.Title);
      let e = this.GSc.Icon;
      if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0) {
        e = this.GSc.FemaleIcon;
      }
      this.SetTextureByPath(e, this.GetTexture(6));
      this.SetSpriteByPath(this.GSc.RomaIcon, this.GetSprite(7), false);
      this.jSc();
    }
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.zAc);
  }
  jSc() {
    var e = this.NSc.StageState;
    this.GetItem(1).SetUIActive(e === 0);
    this.zAc();
    if (e === 0) {
      e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.GSc.OpenConditionId) ?? "";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
    }
  }
}
exports.AvignonStageItem = AvignonStageItem;
//# sourceMappingURL=AvignonStageItem.js.map