"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FarmGoldSubView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../View/SubView/ActivitySubViewGeneralInfo");
class FarmGoldSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.jwl = undefined;
    this.Q6a = undefined;
    this.Dsc = undefined;
    this.vBg = () => {
      this.R2e();
    };
    this.R2e = () => {
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", this.jwl.GetRewardPopUpViewData(), (e, t) => {
        UiManager_1.UiManager.GetViewByName("CommonActivityView")?.AddChildViewById(t);
      });
    };
    this.DFe = e => {
      var t = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
      if (t > 0) {
        UiManager_1.UiManager.OpenView("QuestView", t);
      } else if ((t = ConfigManager_1.ConfigManager.FarmGoldConfig.GetFarmGoldMarkByActivityId(this.ActivityBaseData.Id).EntranceId) > 0) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(t);
      }
    };
    this.BNe = () => {
      var e = this.jwl.EntranceRedDot();
      var t = this.jwl.GetPreGuideQuestFinishState();
      this.Q6a.SetFunctionRedDotVisible(t && e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Q6a = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.Q6a.SetData(this.ActivityBaseData);
    this.Q6a.SetClickFunc(this.DFe);
    this.Q6a.SetRewardButtonFunction(this.R2e);
    await this.Q6a.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.Dsc = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.Dsc.SetFunction(this.vBg);
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FarmGoldRefreshRewardRedDot, this.BNe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.BNe);
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FarmGoldRefreshRewardRedDot, this.BNe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.BNe);
  }
  OnStart() {
    this.jwl = this.ActivityBaseData;
  }
  OnBeforeShow() {
    if (this.ActivityBaseData.GetUnFinishPreGuideQuestId() > 0) {
      this.Q6a.SetBtnText("FarmGoldEnterText");
    } else {
      this.Q6a.SetBtnText("PrefabTextItem_2701983798_Text");
    }
    this.Zl_();
    this.Dsc?.BindRedDot("FarmGoldReward", this.ActivityBaseData?.Id ?? 0);
  }
  OnRefreshView() {
    this.yBg();
    this.BNe();
  }
  yBg() {
    var e = this.jwl?.GetAllRewardClaimedAndTotalNum();
    if (e) {
      this.Dsc?.SetText(e.ClaimedNum + "/" + e.TotalNum);
    }
  }
  OnBeforeHide() {
    this.Zl_();
  }
  Zl_() {
    this.Dsc?.UnBindRedDot();
  }
}
exports.FarmGoldSubView = FarmGoldSubView;
//# sourceMappingURL=FarmGoldSubView.js.map