"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaSubView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityQuestTipsItem_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityQuestTipsItem");
const ActivitySubViewBase_1 = require("../../../Activity/View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../Activity/View/SubView/ActivitySubViewGeneralInfo");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.Q6a = undefined;
    this.Ebu = undefined;
    this.evu = undefined;
    this.Zpu = undefined;
    this.p5t = e => {
      UiManager_1.UiManager.OpenView("PhantomArenaEntranceView");
    };
    this.Z6c = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaEntranceShopMainView", "PhantomArenaEntranceTaskTabView");
    };
    this.Jj1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMasterInfoView");
    };
    this.Ibu = () => {
      var e = this.ActivityBaseData;
      if (e.RecommendQuestId > 0 && !ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e.RecommendQuestId)) {
        UiManager_1.UiManager.OpenView("QuestView", e.RecommendQuestId);
      }
    };
    this.Tbu = () => {
      this.nOe();
    };
    this.bbu = (e, t) => {
      if (t >= Protocol_1.Aki.Protocol.hTs.a3_) {
        this.nOe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.SpineSkeletonAnimationComponent]];
  }
  async OnBeforeStartAsync() {
    this.Q6a = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.Q6a.SetData(this.ActivityBaseData);
    this.Q6a.SetClickFunc(this.p5t);
    await this.Q6a.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.Q6a.HideRemainTime();
    this.SetButtonUiActive(1, false);
    this.evu = new ButtonItem_1.ButtonItem();
    this.evu.SetFunction(this.Z6c);
    await this.evu.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.Zpu = new ButtonItem_1.ButtonItem();
    this.Zpu.SetFunction(this.Jj1);
    await this.Zpu.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.Ebu = new ActivityQuestTipsItem_1.ActivityQuestTipsItem();
    await this.Ebu.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.Ebu.SetRewardButtonFunction(this.Ibu);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0 ? "IdleF" : "IdleM";
    this.GetSpine(6).SetAnimation(0, e, true);
    this.nOe();
    this.K8e();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Tbu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Tbu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.bbu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Tbu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.Tbu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.bbu);
  }
  OnRefreshView() {
    this.nOe();
    this.K8e();
  }
  nOe() {
    this.Q6a.SetBtnText(PhantomArenaDefine_1.ACTIVITY_SUBVIEW_TEXT_UNLOCK);
    this.Q6a?.RefreshFunction();
    var [e, t] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime();
    this.evu?.SetUiActive(e);
    if (e) {
      this.evu?.SetText(t);
    }
    this.Uke();
    this.pmt();
  }
  Uke() {
    var e = this.ActivityBaseData;
    this.Ebu.SetContentByTextId(e.RecommendQuestTips);
    this.Ebu.SetUiActive(e.RecommendQuestId > 0 && !ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e.RecommendQuestId));
  }
  pmt() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel;
    var t = e.GetMasterLevel();
    var e = e.GetMasterLevelMax();
    this.Zpu?.SetLocalTextNew(PhantomArenaDefine_1.ENTRANCE_LEVEL_COUNT_ID, t, e);
  }
  OnBeforeHide() {
    this.Ovt();
  }
  K8e() {
    this.Ovt();
    this.evu.BindRedDot("RedDotPhantomArenaLimitReward");
    this.Zpu.BindRedDot("RedDotPhantomArenaLevelReward");
    this.Q6a?.GetFunctional()?.FunctionButton?.BindRedDot("RedDotPhantomArenaActivity");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
  }
  Ovt() {
    this.evu.UnBindRedDot();
    this.Zpu.UnBindRedDot();
    this.Q6a?.GetFunctional()?.FunctionButton?.UnBindRedDot();
  }
  OnTimer() {
    var [e, t] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime();
    this.evu?.SetUiActive(e);
    if (e) {
      this.evu?.SetText(t);
    }
  }
}
exports.PhantomArenaSubView = PhantomArenaSubView;
//# sourceMappingURL=PhantomArenaSubView.js.map