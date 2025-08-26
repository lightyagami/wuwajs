"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaController = undefined;
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
const PhantomArenaActivityData_1 = require("./PhantomArenaActivityData");
const PhantomArenaSubView_1 = require("./Prepare/Entrance/PhantomArenaSubView");
class PhantomArenaController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.nye = () => {
      PhantomArenaController.PostUnlockView();
    };
    this.TA1 = e => {
      if (e) {
        ModelManager_1.ModelManager.PhantomArenaModel.UpdateChallengeInfoByNotify(e);
      }
    };
    this.jau = e => {
      var o;
      var r;
      if (e) {
        o = e.e8n;
        r = e.CMs;
        e = e.Dtu;
        ModelManager_1.ModelManager.PhantomArenaModel.UpdateChallengeInfoBySettleResult(o, r, e);
      }
    };
    this.RA1 = e => {
      if (e) {
        ModelManager_1.ModelManager.PhantomArenaModel.UpdateMasterInfoByNotify(e);
      }
    };
    this.LA1 = e => {
      if (e) {
        ModelManager_1.ModelManager.PhantomArenaModel.AddBadgeListByNotify(e);
        for (const o of e.mg1) {
          ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.push(o.Ig1);
        }
        if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          PhantomArenaController.PostUnlockView();
        }
      }
    };
    this.wA1 = e => {
      if (e) {
        ModelManager_1.ModelManager.PhantomArenaModel.UpdateBadgeRewardByNotify(e);
      }
    };
    this.AA1 = e => {
      if (e) {
        ModelManager_1.ModelManager.PhantomArenaModel.UpdateCardRewardByNotify(e);
      }
    };
    this.PA1 = e => {
      if (e && (ModelManager_1.ModelManager.PhantomArenaModel.AddRoleByNotify(e), !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())) {
        for (const o of e.pg1) {
          if (!ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(o.xg1).IsTrail) {
            ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.push(o.xg1);
            PhantomArenaController.PostUnlockView();
          }
        }
      }
    };
    this.xA1 = e => {
      if (e) {
        ModelManager_1.ModelManager.PhantomArenaModel.UpdateDeckList(e.vg1);
      }
    };
    this.yV1 = e => {
      if (e) {
        if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          for (const a of e.gg1) {
            var o = a.wg1;
            var r = ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(o);
            var t = a.K6n;
            if (!r && t) {
              ModelManager_1.ModelManager.PhantomArenaModel.CardUnlockQueue.push(o);
            }
            var r = ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(o);
            var t = a.Ag1;
            if (!r && t) {
              ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.push(o);
            }
          }
        }
        ModelManager_1.ModelManager.PhantomArenaModel.AddCardListByNotify(e);
        PhantomArenaController.PostUnlockView();
      }
    };
    this.Pou = e => {
      if (e) {
        ModelManager_1.ModelManager.PhantomArenaModel.UpdateTaskInfo(e);
      }
    };
  }
  OnGetIsOpeningActivityRelativeView() {
    throw new Error("Method not implemented.");
  }
  OnOpenView(e) {}
  async OnOpenSubView(e) {
    if (e === "PhantomArenaEntranceView") {
      ModelManager_1.ModelManager.PhantomArenaModel.EntranceOpenQueue = true;
      PhantomArenaController.PostUnlockView();
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
  OnGetActivityResource(e) {
    return "UiItem_SoundRemnantArenaMain";
  }
  OnCreateSubPageComponent(e) {
    return new PhantomArenaSubView_1.PhantomArenaSubView();
  }
  OnCreateActivityData(e) {
    ModelManager_1.ModelManager.PhantomArenaModel.ActivityId = e.s5n;
    return new PhantomArenaActivityData_1.PhantomArenaActivityData();
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(28361, this.TA1);
    Net_1.Net.Register(24668, this.jau);
    Net_1.Net.Register(25486, this.RA1);
    Net_1.Net.Register(22653, this.LA1);
    Net_1.Net.Register(27190, this.wA1);
    Net_1.Net.Register(25421, this.AA1);
    Net_1.Net.Register(18738, this.PA1);
    Net_1.Net.Register(28395, this.xA1);
    Net_1.Net.Register(16303, this.yV1);
    Net_1.Net.Register(20708, this.Pou);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28361);
    Net_1.Net.UnRegister(24668);
    Net_1.Net.UnRegister(25486);
    Net_1.Net.UnRegister(22653);
    Net_1.Net.UnRegister(27190);
    Net_1.Net.UnRegister(25421);
    Net_1.Net.UnRegister(18738);
    Net_1.Net.UnRegister(28395);
    Net_1.Net.UnRegister(16303);
    Net_1.Net.UnRegister(20708);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
  }
  OnActivityFirstUnlock(e) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(34);
  }
  static TaskRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol.ff1();
    e.gps = o;
    Net_1.Net.Call(20463, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20812);
        } else {
          ModelManager_1.ModelManager.PhantomArenaModel.UpdateTaskById(o);
        }
      }
    });
  }
  static MasterLevelMultiRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol.J5u();
    e.Mg1 = o;
    e.w6n = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId;
    Net_1.Net.Call(20024, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19114);
        } else {
          ModelManager_1.ModelManager.PhantomArenaModel.UpdateMasterLevelByConfigIds(o);
        }
      }
    });
  }
  static BadgeRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol.Mf1();
    var r = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityData().Id;
    e.w6n = r;
    e.Lg1 = o;
    Net_1.Net.Call(20695, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20812);
        } else {
          ModelManager_1.ModelManager.PhantomArenaModel.UpdateBadgeRewardByIds(o);
        }
      }
    });
  }
  static CardOutLookUpRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.Tf1();
    e.J7n = o;
    Net_1.Net.Call(17616, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PhantomArenaModel.OnCardOutlookUnlock(o);
          ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.push(o);
          PhantomArenaController.PostUnlockView();
          r?.(o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23970);
        }
      }
    });
  }
  static CardRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol.Lf1();
    var r = ModelManager_1.ModelManager.PhantomArenaModel.GetPhantomArenaActivityData().Id;
    e.w6n = r;
    e.I51 = o;
    Net_1.Net.Call(26578, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20812);
        } else {
          ModelManager_1.ModelManager.PhantomArenaModel.UpdateCardRewardByIds(o);
        }
      }
    });
  }
  static RoleRewardRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.Pf1();
    e.xg1 = o;
    Net_1.Net.Call(29264, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PhantomArenaModel.OnRoleReward(o);
          r?.(o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23970);
        }
      }
    });
  }
  static CardGroupAddRequest(e, o, r, t) {
    var a = new Protocol_1.Aki.Protocol.Df1();
    a.H8n = e;
    a.Ug1 = o;
    a.w6n = r;
    Net_1.Net.Call(27564, a, e => {
      var o;
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (e.OC1) {
            o = e.OC1;
            ModelManager_1.ModelManager.PhantomArenaModel.AddProtocolDeckInfo(o);
            t?.(o.c5n);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhantomArena", 43, "创建卡组时服务器返回数据为空");
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25282);
        }
      }
    });
  }
  static CardGroupDeleteRequest(o, e, r) {
    var t = new Protocol_1.Aki.Protocol.$41();
    t.c5n = o;
    t.w6n = e;
    Net_1.Net.Call(16800, t, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PhantomArenaModel.UpdateDeckList(e.OC1);
          ModelManager_1.ModelManager.PhantomArenaModel.SetLastUsedCardDeckServerId(e.dK1);
          r?.(o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28736);
        }
      }
    });
  }
  static CardGroupUpdateRequest(r, e, t) {
    var o = new Protocol_1.Aki.Protocol.kf1();
    o.c5n = r;
    o.Ug1 = e;
    o.w6n = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId;
    Net_1.Net.Call(27919, o, e => {
      var o;
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (o = e.OC1) {
            ModelManager_1.ModelManager.PhantomArenaModel.UpdateProtocolDeckInfo(o);
            t?.(r);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhantomArena", 43, "更新卡组时服务器返回数据为空");
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16947);
        }
      }
    });
  }
  static CardUnlockRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.Q41();
    e.J7n = o;
    Net_1.Net.Call(18694, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29209);
        } else {
          r?.(o);
        }
      }
    });
  }
  static async ReChallengeRequestAsync(e) {
    var o = new Protocol_1.Aki.Protocol.p1u();
    o.e8n = e;
    var e = await Net_1.Net.CallAsync(26512, o);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20824);
      }
      return e;
    }
  }
  static PostUnlockView() {
    return !UiManager_1.UiManager.IsViewOpen("PhantomArenaRoleUnlockView") && !UiManager_1.UiManager.IsViewOpen("PhantomArenaBadgeUnlockView") && !UiManager_1.UiManager.IsViewOpen("PhantomArenaCardRewardView") && !UiManager_1.UiManager.IsViewOpen("PhantomArenaCardOutlookRewardView") && !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.length > 0 ? (UiManager_1.UiManager.OpenView("PhantomArenaRoleUnlockView"), 0) : ModelManager_1.ModelManager.PhantomArenaModel.CardUnlockQueue.length > 0 ? (UiManager_1.UiManager.OpenView("PhantomArenaCardRewardView"), 0) : ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.length > 0 ? (UiManager_1.UiManager.OpenView("PhantomArenaCardOutlookRewardView"), 0) : ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.length > 0 ? (UiManager_1.UiManager.OpenView("PhantomArenaBadgeUnlockView"), 0) : ModelManager_1.ModelManager.PhantomArenaModel.EntranceOpenQueue && (UiManager_1.UiManager.OpenView("PhantomArenaEntranceView"), ModelManager_1.ModelManager.PhantomArenaModel.EntranceOpenQueue = false));
  }
  static OpenPhantomArenaConfirmBoxView(e) {
    e.CustomPopType = 10;
    e.CustomResourceId = "UiItem_SoundRemnantArenaTipsInfo";
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static UpdateCardDetailLockState(e) {
    var o;
    var r;
    var t;
    var a;
    if (e.IsUnLocked) {
      e.UnlockBtnItem.SetActive(false);
      e.TipText.SetUIActive(false);
      e.LockTipItem.SetUIActive(false);
    } else if ((o = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(e.CardId)).EnableBuy) {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10091)) {
        t = o.UnlockConsumeItems[0].ItemId;
        a = (r = o.UnlockConsumeItems[0].Count) <= ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
        e.TipText.SetUIActive(true);
        e.LockTipItem.SetUIActive(false);
        e.UnlockBtnItem.SetActive(true);
        e.UnlockBtnItem.SetEnableClick(a);
        e.UnlockBtnItem.SetRedDotVisible(e.ShowUnlockRedDotWhenCanUnlock && a);
        e.UnlockBtnItem.SetLocalTextNew("PhantomBattle_1010");
        t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t).IconSmall;
        a = a ? "PhantomBattle_1012" : "PhantomBattle_1011";
        LguiUtil_1.LguiUtil.SetLocalTextNew(e.TipText, a, t, r);
      } else {
        e.TipText.SetUIActive(false);
        e.LockTipItem.SetUIActive(false);
        e.UnlockBtnItem.SetActive(true);
        e.UnlockBtnItem.SetEnableClick(false);
        e.UnlockBtnItem.SetLocalTextNew("GenericPrompt_Unlocked_TipsText");
      }
    } else {
      e.LockTipItem.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e.LockTipText, o.ConditionDesc);
      e.TipText.SetUIActive(false);
      e.UnlockBtnItem.SetActive(false);
    }
  }
  static ReportDeckUpdate(e) {
    var o = new LogReportDefine_1.PhantomArenaDeckUpdateEvent();
    var r = e.DeckInfo;
    o.i_deck_order = r.GetDeckServerId() + 1;
    o.s_deck_name = r.GetDeckName();
    o.i_operation = e.Operation;
    var t = r.GetCardSlotList();
    var a = new Map();
    for (const c of t) {
      var n = c.CardId;
      var l = c.Cost;
      let o = a.get(l);
      if (!o) {
        o = [];
        a.set(l, o);
      }
      for (let e = 0; e < c.Count; e++) {
        o.push(n);
      }
    }
    var _;
    var i;
    var M = [];
    for ([_, i] of a) {
      M.push(_ + ":" + i.join());
    }
    o.o_deck_info = M.join();
    o.i_build_id = e.LastQuicklyBuildId;
    var d;
    var g;
    var s = [];
    for ([d, g] of e.QuicklyBuildDeckUseTimes) {
      if (g > 0) {
        s.push(d + ":" + g);
      }
    }
    o.o_build_click = s.join();
    o.i_deck_status = r.GetCanUse() ? 1 : 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LogReport", 43, "卡组构筑埋点：", ["logData", Json_1.Json.Stringify(o) ?? ""]);
    }
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
  }
  static CreateTempActivityData() {
    var e = new Protocol_1.Aki.Protocol.fks();
    e.s5n = 105200001;
    e.h5n = 52;
    e.cg1 = new Protocol_1.Aki.Protocol.cg1();
    ModelManager_1.ModelManager.ActivityModel.OnActivityUpdate([e]);
  }
}
exports.PhantomArenaController = PhantomArenaController;
(_a = PhantomArenaController).CardGroupNameRequest = async (e, o, r) => {
  var t = new Protocol_1.Aki.Protocol.qf1();
  t.H8n = e;
  t.c5n = o;
  t.w6n = r;
  var e = await Net_1.Net.CallAsync(22061, t);
  if (e) {
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19686);
    } else if (o = e.OC1) {
      ModelManager_1.ModelManager.PhantomArenaModel.UpdateProtocolDeckInfo(o);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 43, "卡组重命名时服务器返回数据为空");
    }
    return e.Q4n;
  } else {
    return Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError;
  }
}; //# sourceMappingURL=PhantomArenaController.js.map