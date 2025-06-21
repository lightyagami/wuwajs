"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaController = void 0;
const Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../Activity/ActivityControllerBase"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  PhantomArenaActivityData_1 = require("./PhantomArenaActivityData"),
  PhantomArenaSubView_1 = require("./Prepare/Entrance/PhantomArenaSubView");
class PhantomArenaController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments), this.nye = () => {
      PhantomArenaController.PostUnlockView()
    }, this.zw1 = e => {
      e && ModelManager_1.ModelManager.PhantomArenaModel.UpdateChallengeInfoByNotify(e)
    }, this.wru = e => {
      var o, r;
      e && (o = e.e8n, r = e.CMs, e = e._eu, ModelManager_1.ModelManager.PhantomArenaModel.UpdateChallengeInfoBySettleResult(o, r, e))
    }, this.Zw1 = e => {
      e && ModelManager_1.ModelManager.PhantomArenaModel.UpdateMasterInfoByNotify(e)
    }, this.eA1 = e => {
      if (e) {
        ModelManager_1.ModelManager.PhantomArenaModel.AddBadgeListByNotify(e);
        for (const o of e.$f1) ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.push(o.tg1);
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || PhantomArenaController.PostUnlockView()
      }
    }, this.tA1 = e => {
      e && ModelManager_1.ModelManager.PhantomArenaModel.UpdateBadgeRewardByNotify(e)
    }, this.iA1 = e => {
      e && ModelManager_1.ModelManager.PhantomArenaModel.UpdateCardRewardByNotify(e)
    }, this.rA1 = e => {
      if (e && (ModelManager_1.ModelManager.PhantomArenaModel.AddRoleByNotify(e), !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()))
        for (const o of e.Xf1) ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(o.lg1).IsTrail || (ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.push(o.lg1), PhantomArenaController.PostUnlockView())
    }, this.oA1 = e => {
      e && ModelManager_1.ModelManager.PhantomArenaModel.UpdateDeckList(e.Yf1)
    }, this.j41 = e => {
      if (e) {
        if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
          for (const a of e.Qf1) {
            var o = a.sg1,
              r = ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(o),
              t = a.K6n,
              r = (!r && t && ModelManager_1.ModelManager.PhantomArenaModel.CardUnlockQueue.push(o), ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(o)),
              t = a.ag1;
            !r && t && ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.push(o)
          }
        ModelManager_1.ModelManager.PhantomArenaModel.AddCardListByNotify(e), PhantomArenaController.PostUnlockView()
      }
    }, this.vtu = e => {
      e && ModelManager_1.ModelManager.PhantomArenaModel.UpdateTaskInfo(e)
    }
  }
  OnGetIsOpeningActivityRelativeView() {
    throw new Error("Method not implemented.")
  }
  OnOpenView(e) {}
  async OnOpenSubView(e) {
    return "PhantomArenaEntranceView" === e ? (ModelManager_1.ModelManager.PhantomArenaModel.EntranceOpenQueue = !0, PhantomArenaController.PostUnlockView(), Promise.resolve(!0)) : Promise.resolve(!1)
  }
  OnGetActivityResource(e) {
    return "UiItem_SoundRemnantArenaMain"
  }
  OnCreateSubPageComponent(e) {
    return new PhantomArenaSubView_1.PhantomArenaSubView
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.PhantomArenaModel.ActivityId = e.s5n, new PhantomArenaActivityData_1.PhantomArenaActivityData
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(28377, this.zw1), Net_1.Net.Register(26166, this.wru), Net_1.Net.Register(23661, this.Zw1), Net_1.Net.Register(25734, this.eA1), Net_1.Net.Register(20518, this.tA1), Net_1.Net.Register(26040, this.iA1), Net_1.Net.Register(18999, this.rA1), Net_1.Net.Register(26005, this.oA1), Net_1.Net.Register(29189, this.j41), Net_1.Net.Register(19838, this.vtu)
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28377), Net_1.Net.UnRegister(26166), Net_1.Net.UnRegister(23661), Net_1.Net.UnRegister(25734), Net_1.Net.UnRegister(20518), Net_1.Net.UnRegister(26040), Net_1.Net.UnRegister(18999), Net_1.Net.UnRegister(26005), Net_1.Net.UnRegister(29189), Net_1.Net.UnRegister(19838)
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye)
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye)
  }
  OnActivityFirstUnlock(e) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(34)
  }
  static TaskRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol.Wm1;
    e.gps = o, Net_1.Net.Call(17570, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28825) : ModelManager_1.ModelManager.PhantomArenaModel.UpdateTaskById(o))
    })
  }
  static MasterLevelRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol.Xm1;
    e.Zf1 = o, Net_1.Net.Call(20353, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28825) : ModelManager_1.ModelManager.PhantomArenaModel.UpdateMasterLevelByConfigId(o))
    })
  }
  static BadgeRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol.Zm1,
      r = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityData().Id;
    e.w6n = r, e.ng1 = o, Net_1.Net.Call(26707, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28825) : ModelManager_1.ModelManager.PhantomArenaModel.UpdateBadgeRewardByIds(o))
    })
  }
  static CardOutLookUpRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.if1;
    e.J7n = o, Net_1.Net.Call(29120, e, e => {
      e && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ? (ModelManager_1.ModelManager.PhantomArenaModel.OnCardOutlookUnlock(o), ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.push(o), PhantomArenaController.PostUnlockView(), r?.(o)) : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21589))
    })
  }
  static CardRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol.nf1,
      r = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityData().Id;
    e.w6n = r, e.j61 = o, Net_1.Net.Call(16429, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28825) : ModelManager_1.ModelManager.PhantomArenaModel.UpdateCardRewardByIds(o))
    })
  }
  static RoleRewardRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.hf1;
    e.lg1 = o, Net_1.Net.Call(20890, e, e => {
      e && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ? (ModelManager_1.ModelManager.PhantomArenaModel.OnRoleReward(o), r?.(o)) : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21589))
    })
  }
  static CardGroupAddRequest(e, o, r, t) {
    var a = new Protocol_1.Aki.Protocol.cf1;
    a.H8n = e, a._g1 = o, a.w6n = r, Net_1.Net.Call(15874, a, e => {
      var o;
      e && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ? e.mC1 ? (o = e.mC1, ModelManager_1.ModelManager.PhantomArenaModel.AddProtocolDeckInfo(o), t?.(o.c5n)) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "创建卡组时服务器返回数据为空") : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21169))
    })
  }
  static CardGroupDeleteRequest(o, e, r) {
    var t = new Protocol_1.Aki.Protocol.d41;
    t.c5n = o, t.w6n = e, Net_1.Net.Call(26537, t, e => {
      e && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ? (ModelManager_1.ModelManager.PhantomArenaModel.UpdateDeckList(e.mC1), ModelManager_1.ModelManager.PhantomArenaModel.SetLastUsedCardDeckServerId(e.IQ1), r?.(o)) : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15343))
    })
  }
  static CardGroupUpdateRequest(r, e, t) {
    var o = new Protocol_1.Aki.Protocol.df1;
    o.c5n = r, o._g1 = e, o.w6n = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId, Net_1.Net.Call(19541, o, e => {
      var o;
      e && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ? (o = e.mC1) ? (ModelManager_1.ModelManager.PhantomArenaModel.UpdateProtocolDeckInfo(o), t?.(r)) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "更新卡组时服务器返回数据为空") : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24255))
    })
  }
  static CardUnlockRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.g41;
    e.J7n = o, Net_1.Net.Call(24705, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16804) : r?.(o))
    })
  }
  static async ReChallengeRequestAsync(e) {
    var o = new Protocol_1.Aki.Protocol.Tnu,
      e = (o.e8n = e, await Net_1.Net.CallAsync(23158, o));
    if (e) return e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21242), e
  }
  static PostUnlockView() {
    return !(UiManager_1.UiManager.IsViewOpen("PhantomArenaRoleUnlockView") || UiManager_1.UiManager.IsViewOpen("PhantomArenaBadgeUnlockView") || UiManager_1.UiManager.IsViewOpen("PhantomArenaCardRewardView") || UiManager_1.UiManager.IsViewOpen("PhantomArenaCardOutlookRewardView") || ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || (0 < ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.length ? (UiManager_1.UiManager.OpenView("PhantomArenaRoleUnlockView"), 0) : 0 < ModelManager_1.ModelManager.PhantomArenaModel.CardUnlockQueue.length ? (UiManager_1.UiManager.OpenView("PhantomArenaCardRewardView"), 0) : 0 < ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.length ? (UiManager_1.UiManager.OpenView("PhantomArenaCardOutlookRewardView"), 0) : 0 < ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.length ? (UiManager_1.UiManager.OpenView("PhantomArenaBadgeUnlockView"), 0) : ModelManager_1.ModelManager.PhantomArenaModel.EntranceOpenQueue && (UiManager_1.UiManager.OpenView("PhantomArenaEntranceView"), ModelManager_1.ModelManager.PhantomArenaModel.EntranceOpenQueue = !1)))
  }
  static OpenPhantomArenaConfirmBoxView(e) {
    e.CustomPopType = 10, e.CustomResourceId = "UiItem_SoundRemnantArenaTipsInfo", ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e)
  }
  static UpdateCardDetailLockState(e) {
    var o, r, t, a;
    e.IsUnLocked ? (e.UnlockBtnItem.SetActive(!1), e.TipText.SetUIActive(!1), e.LockTipItem.SetUIActive(!1)) : (o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e.CardId)).EnableBuy ? ModelManager_1.ModelManager.FunctionModel.IsOpen(10091) ? (t = o.UnlockConsumeItems[0].ItemId, a = (r = o.UnlockConsumeItems[0].Count) <= ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t), e.TipText.SetUIActive(!0), e.LockTipItem.SetUIActive(!1), e.UnlockBtnItem.SetActive(!0), e.UnlockBtnItem.SetEnableClick(a), e.UnlockBtnItem.SetRedDotVisible(e.ShowUnlockRedDotWhenCanUnlock && a), e.UnlockBtnItem.SetLocalTextNew("PhantomBattle_1010"), t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t).IconSmall, a = a ? "PhantomBattle_1012" : "PhantomBattle_1011", LguiUtil_1.LguiUtil.SetLocalTextNew(e.TipText, a, t, r)) : (e.TipText.SetUIActive(!1), e.LockTipItem.SetUIActive(!1), e.UnlockBtnItem.SetActive(!0), e.UnlockBtnItem.SetEnableClick(!1), e.UnlockBtnItem.SetLocalTextNew("GenericPrompt_Unlocked_TipsText")) : (e.LockTipItem.SetUIActive(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(e.LockTipText, o.ConditionDesc), e.TipText.SetUIActive(!1), e.UnlockBtnItem.SetActive(!1))
  }
  static ReportDeckUpdate(e) {
    var o = new LogReportDefine_1.PhantomArenaDeckUpdateEvent,
      r = e.DeckInfo,
      t = (o.i_deck_order = r.GetDeckServerId() + 1, o.s_deck_name = r.GetDeckName(), o.i_operation = e.Operation, r.GetCardSlotList()),
      a = new Map;
    for (const c of t) {
      var n = c.CardId,
        l = c.Cost;
      let o = a.get(l);
      o || (o = [], a.set(l, o));
      for (let e = 0; e < c.Count; e++) o.push(n)
    }
    var _, i, M = [];
    for ([_, i] of a) M.push(_ + ":" + i.join());
    o.o_deck_info = M.join(), o.i_build_id = e.LastQuicklyBuildId;
    var d, g, s = [];
    for ([d, g] of e.QuicklyBuildDeckUseTimes) 0 < g && s.push(d + ":" + g);
    o.o_build_click = s.join(), o.i_deck_status = r.GetCanUse() ? 1 : 0, Log_1.Log.CheckDebug() && Log_1.Log.Debug("LogReport", 43, "卡组构筑埋点：", ["logData", Json_1.Json.Stringify(o) ?? ""]), ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o)
  }
  static CreateTempActivityData() {
    var e = new Protocol_1.Aki.Protocol.fks;
    e.s5n = 105200001, e.h5n = 52, e.Vf1 = new Protocol_1.Aki.Protocol.Vf1, ModelManager_1.ModelManager.ActivityModel.OnActivityUpdate([e])
  }
}
exports.PhantomArenaController = PhantomArenaController, (_a = PhantomArenaController).CardGroupNameRequest = async (e, o, r) => {
  var t = new Protocol_1.Aki.Protocol.ff1,
    e = (t.H8n = e, t.c5n = o, t.w6n = r, await Net_1.Net.CallAsync(28826, t));
  return e ? (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23945) : (o = e.mC1) ? ModelManager_1.ModelManager.PhantomArenaModel.UpdateProtocolDeckInfo(o) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "卡组重命名时服务器返回数据为空"), e.Q4n) : Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError
};
//# sourceMappingURL=PhantomArenaController.js.map