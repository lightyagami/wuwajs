"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.AvignonStageItem = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  LevelGeneralCommons_1 = require("../../../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class AvignonStageItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.xOe = 0, this.GSc = void 0, this.NSc = void 0, this.zAc = () => {
      this.NSc = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(this.xOe);
      var e = this.NSc.GetTaskProgress(),
        e = (this.GetText(4).SetText(e + "<size=-18>%</size>"), this.NSc.StageState),
        e = (this.GetSprite(5).SetUIActive(2 === e), this.NSc.GetRewardState() || this.NSc.HasNewStageFlag());
      this.GetItem(8).SetUIActive(e)
    }, this.jYe = () => {
      this.NSc && (this.NSc.IsUnlock ? UiManager_1.UiManager.OpenView("AvignonStageTaskView", this.xOe) : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(this.NSc.GetLockConditionText()))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UISprite],
      [6, UE.UITexture],
      [7, UE.UISprite],
      [8, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.jYe]
    ]
  }
  OnBeforeShow() {
    if (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.zAc), this.xOe = this.OpenParam, this.GSc = ConfigManager_1.ConfigManager.AvignonConfig.GetStageConfigById(this.xOe), this.NSc = ModelManager_1.ModelManager.AvignonModel.GetAvignonStageInfo(this.xOe), this.GSc) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.GSc.Title);
      let e = this.GSc.Icon;
      0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() && (e = this.GSc.FemaleIcon), this.SetTextureByPath(e, this.GetTexture(6)), this.SetSpriteByPath(this.GSc.RomaIcon, this.GetSprite(7), !1), this.jSc()
    }
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.zAc)
  }
  jSc() {
    var e = this.NSc.StageState;
    this.GetItem(1).SetUIActive(0 === e), this.zAc(), 0 === e && (e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.GSc.OpenConditionId) ?? "", LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e))
  }
}
exports.AvignonStageItem = AvignonStageItem;
//# sourceMappingURL=AvignonStageItem.js.map