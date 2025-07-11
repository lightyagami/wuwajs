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
    this.rbu = undefined;
    this.epu = undefined;
    this.Z0u = undefined;
    this.p5t = e => {
      UiManager_1.UiManager.OpenView("PhantomArenaEntranceView");
    };
    this.Z6c = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaEntranceShopMainView", "PhantomArenaEntranceTaskTabView");
    };
    this.Jj1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMasterInfoView");
    };
    this.obu = () => {
      var e = this.ActivityBaseData;
      if (e.RecommendQuestId > 0 && !ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e.RecommendQuestId)) {
        UiManager_1.UiManager.OpenView("QuestView", e.RecommendQuestId);
      }
    };
    this.nbu = () => {
      this.nOe();
    };
    this.sbu = (e, t) => {
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
    this.Q6a.HideRemainTime();
    this.Q6a.SetClickFunc(this.p5t);
    await this.Q6a.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.SetButtonUiActive(1, false);
    this.epu = new ButtonItem_1.ButtonItem();
    this.epu.SetFunction(this.Z6c);
    await this.epu.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.Z0u = new ButtonItem_1.ButtonItem();
    this.Z0u.SetFunction(this.Jj1);
    await this.Z0u.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.rbu = new ActivityQuestTipsItem_1.ActivityQuestTipsItem();
    await this.rbu.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.rbu.SetRewardButtonFunction(this.obu);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0 ? "IdleF" : "IdleM";
    this.GetSpine(6).SetAnimation(0, e, true);
    this.nOe();
    this.K8e();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.nbu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.nbu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.sbu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.nbu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityCrossDayRefresh, this.nbu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.sbu);
  }
  OnRefreshView() {
    this.nOe();
    this.K8e();
  }
  nOe() {
    this.Q6a.SetBtnText(PhantomArenaDefine_1.ACTIVITY_SUBVIEW_TEXT_UNLOCK);
    this.Q6a?.RefreshFunction();
    var [e, t] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime();
    this.epu?.SetUiActive(e);
    if (e) {
      this.epu?.SetText(t);
    }
    this.Uke();
    this.pmt();
  }
  Uke() {
    var e = this.ActivityBaseData;
    this.rbu.SetContentByTextId(e.RecommendQuestTips);
    this.rbu.SetUiActive(e.RecommendQuestId > 0 && !ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e.RecommendQuestId));
  }
  pmt() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel;
    var t = e.GetMasterLevel();
    var e = e.GetMasterLevelMax();
    this.Z0u?.SetLocalTextNew(PhantomArenaDefine_1.ENTRANCE_LEVEL_COUNT_ID, t, e);
  }
  OnBeforeHide() {
    this.Ovt();
  }
  K8e() {
    this.Ovt();
    this.epu.BindRedDot("RedDotPhantomArenaLimitReward");
    this.Z0u.BindRedDot("RedDotPhantomArenaLevelReward");
    this.Q6a?.GetFunctional()?.FunctionButton?.BindRedDot("RedDotPhantomArenaActivity");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id);
  }
  Ovt() {
    this.epu.UnBindRedDot();
    this.Z0u.UnBindRedDot();
    this.Q6a?.GetFunctional()?.FunctionButton?.UnBindRedDot();
  }
  OnTimer() {
    var [e, t] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime();
    this.epu?.SetUiActive(e);
    if (e) {
      this.epu?.SetText(t);
    }
  }
}
exports.PhantomArenaSubView = PhantomArenaSubView;
//# sourceMappingURL=PhantomArenaSubView.js.map