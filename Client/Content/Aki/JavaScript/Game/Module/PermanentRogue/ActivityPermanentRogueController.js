"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityPermanentRogueController = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  RogueResCollectionByIdKey_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey"),
  RogueResDungeonConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueResDungeonConfigById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../Activity/ActivityControllerBase"),
  ActivityPermanentRogueData_1 = require("./ActivityPermanentRogueData"),
  PermanentRogueSubView_1 = require("./View/PermanentRogueSubView");
class ActivityPermanentRogueController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments), this.CNe = void 0, this.wGi = () => {
      var e;
      ActivityPermanentRogueController.Nk1 && (ActivityPermanentRogueController.Nk1 = !1, e = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(ActivityPermanentRogueController.vrh)) && (e = e.SeasonId, UiManager_1.UiManager.OpenView("RogueSeasonEntranceView", e))
    }, this.RequestEnterDungeon = e => {
      var t = new Protocol_1.Aki.Protocol.EEc;
      t.r6n = e, Net_1.Net.Call(27846, t, e => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17172)
      })
    }
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityRogue23Main"
  }
  async OnOpenSubView(e) {
    return await ActivityPermanentRogueController.OpenSeasonMainView()
  }
  OnCreateSubPageComponent(e) {
    return new PermanentRogueSubView_1.ActivitySubViewPermanentRogue
  }
  OnCreateActivityData(e) {
    return ActivityPermanentRogueController.ActivityId = e.s5n, this.CNe = new ActivityPermanentRogueData_1.ActivityPermanentRogueData, this.CNe
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(22552, ActivityPermanentRogueController.R6c), Net_1.Net.Register(24556, ActivityPermanentRogueController.A6c), Net_1.Net.Register(24427, ActivityPermanentRogueController.P6c), Net_1.Net.Register(18854, ActivityPermanentRogueController.is1), Net_1.Net.Register(19117, ActivityPermanentRogueController.x6c), Net_1.Net.Register(25270, ActivityPermanentRogueController.Pd1), Net_1.Net.Register(20315, ActivityPermanentRogueController.mw1)
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22552), Net_1.Net.UnRegister(24556), Net_1.Net.UnRegister(24427), Net_1.Net.UnRegister(18854), Net_1.Net.UnRegister(19117), Net_1.Net.UnRegister(25270), Net_1.Net.UnRegister(20315)
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseLoadingView, this.wGi)
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseLoadingView, this.wGi)
  }
  OnActivityFirstUnlock(e) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(30)
  }
  static SetReturnToWorld(e) {
    RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(e) && (ActivityPermanentRogueController.vrh = e, ActivityPermanentRogueController.Nk1 = !0)
  }
  static GetCurrentActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityPermanentRogueController.ActivityId);
    if (e) return e
  }
  RequestIllustrationAward(l) {
    var e = new Protocol_1.Aki.Protocol.khc;
    e.GNc = l, Net_1.Net.Call(22968, e, t => {
      if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 28825);
      else {
        t.WW1 && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Text_EchoLimit_Text"), this.CNe.SetIllustratedRewardGot(l), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate);
        var o = new Set;
        let e = [];
        for (const r of l) {
          var n = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(r);
          for (const i of e = 0 === n.Type ? this.CNe.GetTokenInSeason(r) : 1 === n.Type ? this.CNe.GetEventNormalInSeason(r) : this.CNe.GetEventMapInSeason(r)) o.add(i)
        }
        for (const a of e) EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, a)
      }
    })
  }
  static async RequestRogueResTalentSkillLevel(e) {
    var t = new Protocol_1.Aki.Protocol.Mhc,
      t = (t.r5n = e, await Net_1.Net.CallAsync(15751, t));
    t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 24092) : (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpgradeSkill(e, t.F6n), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResTalentLevelUp, e))
  }
  static async RequestRogueResLastInstInfo() {
    var e = new Protocol_1.Aki.Protocol.bEc,
      e = await Net_1.Net.CallAsync(19512, e);
    return e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15370), e
  }
  static RequestRogueResEndingReward(t, o, e) {
    var n = new Protocol_1.Aki.Protocol.bhc;
    n.UHn = t, n.c5n = e, Net_1.Net.Call(28889, n, e => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16224) : (ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetEndingAwardData(o), e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingAwardViewData(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, t))
    })
  }
  static async OpenSeasonMainView() {
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
    return !!UiManager_1.UiManager.IsViewOpen("RogueSeasonEntranceView") || (Log_1.Log.CheckInfo() && Log_1.Log.Info("RogueBattle", 77, "肉鸽赛季界面数据:", ["seasonId:", e]), void 0 !== await UiManager_1.UiManager.OpenViewAsync("RogueSeasonEntranceView", e))
  }
}(exports.ActivityPermanentRogueController = ActivityPermanentRogueController).ActivityId = 0, ActivityPermanentRogueController.vrh = 0, ActivityPermanentRogueController.Nk1 = !1, ActivityPermanentRogueController.R6c = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpdateIllustrateState(e)
}, ActivityPermanentRogueController.RequestTaskAward = t => {
  var e = new Protocol_1.Aki.Protocol.Uhc;
  e.v9n = t, Net_1.Net.Call(26633, e, e => {
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15555) : (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().SetTaskRewardGot(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate))
  })
}, ActivityPermanentRogueController.A6c = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpdateTaskNotify(e)
}, ActivityPermanentRogueController.P6c = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.InitCurrency(e.V2s)
}, ActivityPermanentRogueController.x6c = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.UpdateCurrency(e.$2s, e.sps)
}, ActivityPermanentRogueController.Pd1 = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.UpdateTotalShopItem(e.UHn, e.Qu1)
}, ActivityPermanentRogueController.mw1 = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.UpdateSkillTreeUnlockState(e.r5n)
}, ActivityPermanentRogueController.is1 = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpdateEndingNotify(e)
};
//# sourceMappingURL=ActivityPermanentRogueController.js.map