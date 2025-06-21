"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaSubView = void 0;
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityQuestTipsItem_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityQuestTipsItem"),
  ActivitySubViewBase_1 = require("../../../Activity/View/SubView/ActivitySubViewBase"),
  ActivitySubViewGeneralInfo_1 = require("../../../Activity/View/SubView/ActivitySubViewGeneralInfo"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments), this.Q6a = void 0, this.hdu = void 0, this.W_u = void 0, this.$_u = void 0, this.p5t = e => {
      UiManager_1.UiManager.OpenView("PhantomArenaEntranceView")
    }, this.Z6c = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaEntranceShopMainView", "PhantomArenaEntranceTaskTabView")
    }, this.Cj1 = () => {
      UiManager_1.UiManager.OpenView("PhantomArenaMasterInfoView")
    }, this.ldu = () => {
      var e = this.ActivityBaseData;
      0 < e.RecommendQuestId && !ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e.RecommendQuestId) && UiManager_1.UiManager.OpenView("QuestView", e.RecommendQuestId)
    }, this._du = () => {
      this.nOe()
    }, this.udu = (e, t) => {
      t >= Protocol_1.Aki.Protocol.hTs.a3_ && this.nOe()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.SpineSkeletonAnimationComponent]
    ]
  }
  async OnBeforeStartAsync() {
    this.Q6a = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo, this.Q6a.SetData(this.ActivityBaseData), this.Q6a.HideRemainTime(), this.Q6a.SetClickFunc(this.p5t), await this.Q6a.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.SetButtonUiActive(1, !1), this.W_u = new ButtonItem_1.ButtonItem, this.W_u.SetFunction(this.Z6c), await this.W_u.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.$_u = new ButtonItem_1.ButtonItem, this.$_u.SetFunction(this.Cj1), await this.$_u.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.hdu = new ActivityQuestTipsItem_1.ActivityQuestTipsItem, await this.hdu.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.hdu.SetRewardButtonFunction(this.ldu)
  }
  OnBeforeShow() {
    var e = 0 === ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() ? "IdleF" : "IdleM";
    this.GetSpine(6).SetAnimation(0, e, !0), this.nOe(), this.K8e()
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this._du), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActivityCrossDayRefresh, this._du), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.udu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this._du), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActivityCrossDayRefresh, this._du), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.udu)
  }
  OnRefreshView() {
    this.nOe(), this.K8e()
  }
  nOe() {
    this.Q6a.SetBtnText(PhantomArenaDefine_1.ACTIVITY_SUBVIEW_TEXT_UNLOCK), this.Q6a?.RefreshFunction();
    var [e, t] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime();
    this.W_u?.SetUiActive(e), e && this.W_u?.SetText(t), this.Uke(), this.pmt()
  }
  Uke() {
    var e = this.ActivityBaseData;
    this.hdu.SetContentByTextId(e.RecommendQuestTips), this.hdu.SetUiActive(0 < e.RecommendQuestId && !ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e.RecommendQuestId))
  }
  pmt() {
    var e = ModelManager_1.ModelManager.PhantomArenaModel,
      t = e.GetMasterLevel(),
      e = e.GetMasterLevelMax();
    this.$_u?.SetLocalTextNew(PhantomArenaDefine_1.ENTRANCE_LEVEL_COUNT_ID, t, e)
  }
  OnBeforeHide() {
    this.Ovt()
  }
  K8e() {
    this.Ovt(), this.W_u.BindRedDot("RedDotPhantomArenaLimitReward"), this.$_u.BindRedDot("RedDotPhantomArenaLevelReward"), this.Q6a?.GetFunctional()?.FunctionButton?.BindRedDot("RedDotPhantomArenaActivity"), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id)
  }
  Ovt() {
    this.W_u.UnBindRedDot(), this.$_u.UnBindRedDot(), this.Q6a?.GetFunctional()?.FunctionButton?.UnBindRedDot()
  }
  OnTimer() {
    var [e, t] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime();
    this.W_u?.SetUiActive(e), e && this.W_u?.SetText(t)
  }
}
exports.PhantomArenaSubView = PhantomArenaSubView;
//# sourceMappingURL=PhantomArenaSubView.js.map