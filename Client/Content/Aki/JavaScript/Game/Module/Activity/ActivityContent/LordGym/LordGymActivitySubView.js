"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymActivitySubView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const LordGymDefine_1 = require("../../../LordGym/LordGymDefine");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
const LordGymBossCard_1 = require("./LordGymBossCard");
class LordGymActivitySubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.BossCard = undefined;
    this.tWt = () => {
      this.ActivityBaseData.ReadRedDot();
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ErrorCode_600064_Text");
        } else if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ErrorCode_200172_Text");
        } else {
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(LordGymDefine_1.THRID_ENTRANCE_ID);
        }
      } else {
        UiManager_1.UiManager.OpenView("QuestView", this.ActivityBaseData.GetUnFinishPreGuideQuestId());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    this.BossCard = new LordGymBossCard_1.LordGymBossCard();
    var e = [this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.BossCard.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())];
    await Promise.all(e);
    this.CommonInfoPanel?.SetBtnText("LongShanStage_Join01");
    this.CommonInfoPanel?.SetClickFunc(this.tWt);
  }
  OnRefreshView() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshActivityTab, this.ActivityBaseData.Id);
    this.CommonInfoPanel.SetFunctionRedDotVisible(this.ActivityBaseData.CheckRedDot());
    this.CommonInfoPanel?.OnRefreshView();
    var e = ModelManager_1.ModelManager.LordGymModel.GetLordGymEntranceWithNewTag();
    if (e.length === 0) {
      this.GetItem(1).SetUIActive(false);
    } else {
      this.BossCard?.Refresh(e);
    }
  }
}
exports.LordGymActivitySubView = LordGymActivitySubView;
//# sourceMappingURL=LordGymActivitySubView.js.map