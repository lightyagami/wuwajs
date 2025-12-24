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
const PhantomArenaDefine_1 = require("./PhantomArenaDefine");
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
      var t;
      if (e) {
        o = e.e8n;
        r = e.CMs;
        t = e.Sg1;
        e = e.qgf;
        ModelManager_1.ModelManager.PhantomArenaModel.UpdateChallengeInfoBySettleResult(o, r, t, e);
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
      if (e) {
        ModelManager_1.ModelManager.PhantomArenaModel.AddRoleByNotify(e);
        if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() || PhantomArenaController.CheckInPhantomArenaDungeon()) {
          for (const o of e.pg1) {
            if (!ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardRole(o.xg1).IsTrail) {
              ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.push(o.xg1);
            }
          }
        }
        if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          PhantomArenaController.PostUnlockView();
        }
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
  OnOpenView(e) {
    if (e.GetPreGuideQuestFinishState()) {
      ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.OpenPhantomArenaMapEntrance();
    } else {
      UiManager_1.UiManager.OpenView("QuestView", e.GetUnFinishPreGuideQuestId());
    }
  }
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
    return new PhantomArenaActivityData_1.PhantomArenaActivityData();
  }
  OnRegisterNetEvent() {
    if (!PhantomArenaController.Wpf) {
      Net_1.Net.Register(28377, this.TA1);
      Net_1.Net.Register(26166, this.jau);
      Net_1.Net.Register(23661, this.RA1);
      Net_1.Net.Register(25734, this.LA1);
      Net_1.Net.Register(20518, this.wA1);
      Net_1.Net.Register(26040, this.AA1);
      Net_1.Net.Register(18999, this.PA1);
      Net_1.Net.Register(29189, this.yV1);
      Net_1.Net.Register(19838, this.Pou);
      PhantomArenaController.Wpf = true;
    }
  }
  OnUnRegisterNetEvent() {
    if (PhantomArenaController.Wpf) {
      Net_1.Net.UnRegister(28377);
      Net_1.Net.UnRegister(26166);
      Net_1.Net.UnRegister(23661);
      Net_1.Net.UnRegister(25734);
      Net_1.Net.UnRegister(20518);
      Net_1.Net.UnRegister(26040);
      Net_1.Net.UnRegister(18999);
      Net_1.Net.UnRegister(29189);
      Net_1.Net.UnRegister(19838);
      PhantomArenaController.Wpf = false;
    }
  }
  OnAddEvents() {
    if (!PhantomArenaController.bJd) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
      PhantomArenaController.bJd = true;
    }
  }
  OnRemoveEvents() {
    if (PhantomArenaController.bJd) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
      PhantomArenaController.bJd = false;
    }
  }
  OnShowActivityFirstUnlockView(e) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(34);
  }
  static CheckInPhantomArenaDungeon() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 36);
  }
  static TaskRewardRequest(o) {
    var e = new Protocol_1.Aki.Protocol.ff1();
    e.gps = o;
    Net_1.Net.Call(17570, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28825);
        } else {
          ModelManager_1.ModelManager.PhantomArenaModel.UpdateTaskByIds([o]);
        }
      }
    });
  }
  static TaskAllRewardRequest(e) {
    e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetTaskConfigById(e);
    if (e) {
      const o = ModelManager_1.ModelManager.PhantomArenaModel.GetAllCanReceiveTaskIdsByTabId(e.ActivityId, e.TaskType);
      e = new Protocol_1.Aki.Protocol.bYm();
      e.gps = o;
      Net_1.Net.Call(22592, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16125);
          } else {
            ModelManager_1.ModelManager.PhantomArenaModel.UpdateTaskByIds(o);
          }
        }
      });
    }
  }
  static MasterLevelMultiRewardRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.d8u();
    e.Mg1 = o;
    e.w6n = r;
    Net_1.Net.Call(15285, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18480);
        } else {
          ModelManager_1.ModelManager.PhantomArenaModel.UpdateMasterLevelByConfigIds(o, r);
        }
      }
    });
  }
  static BadgeRewardRequest(o, e) {
    var r = new Protocol_1.Aki.Protocol.Mf1();
    r.w6n = e;
    r.Lg1 = o;
    Net_1.Net.Call(26707, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28825);
        } else {
          ModelManager_1.ModelManager.PhantomArenaModel.UpdateBadgeRewardByIds(o);
        }
      }
    });
  }
  static CardOutLookUpRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.Tf1();
    e.J7n = o;
    Net_1.Net.Call(29120, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PhantomArenaModel.OnCardOutlookUnlock(o);
          ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.push(o);
          PhantomArenaController.PostUnlockView();
          r?.(o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21589);
        }
      }
    });
  }
  static CardRewardRequest(o, e) {
    var r = new Protocol_1.Aki.Protocol.Lf1();
    r.w6n = e;
    r.I51 = o;
    Net_1.Net.Call(16429, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28825);
        } else {
          ModelManager_1.ModelManager.PhantomArenaModel.UpdateCardRewardByIds(o);
        }
      }
    });
  }
  static RoleRewardRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.Pf1();
    e.xg1 = o;
    Net_1.Net.Call(20890, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PhantomArenaModel.OnRoleReward(o);
          r?.(o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21589);
        }
      }
    });
  }
  static CardGroupAddRequest(e, o, r, t) {
    var a = new Protocol_1.Aki.Protocol.Df1();
    a.H8n = e;
    a.Ug1 = o;
    a.w6n = r;
    Net_1.Net.Call(15874, a, e => {
      var o;
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (e.OC1) {
            o = e.OC1;
            ModelManager_1.ModelManager.PhantomArenaModel.AddProtocolDeckInfo(o, r);
            t?.(o.c5n);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhantomArena", 43, "创建卡组时服务器返回数据为空");
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21169);
        }
      }
    });
  }
  static CardGroupDeleteRequest(o, r, t) {
    var e = new Protocol_1.Aki.Protocol.$41();
    e.c5n = o;
    e.w6n = r;
    Net_1.Net.Call(26537, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PhantomArenaModel.UpdateDeckList(e.OC1, r);
          ModelManager_1.ModelManager.PhantomArenaModel.SetLastUsedCardDeckServerId(e.dK1, r);
          t?.(o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15343);
        }
      }
    });
  }
  static CardGroupUpdateRequest(r, e, t, a) {
    var o = new Protocol_1.Aki.Protocol.kf1();
    o.c5n = r;
    o.Ug1 = e;
    o.w6n = t;
    Net_1.Net.Call(19541, o, e => {
      var o;
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (o = e.OC1) {
            ModelManager_1.ModelManager.PhantomArenaModel.UpdateProtocolDeckInfo(o, t);
            a?.(r);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhantomArena", 43, "更新卡组时服务器返回数据为空");
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24255);
        }
      }
    });
  }
  static CardUnlockRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.Q41();
    e.J7n = o;
    Net_1.Net.Call(24705, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16804);
        } else {
          r?.(o);
        }
      }
    });
  }
  static async ReChallengeRequestAsync(e) {
    var o = new Protocol_1.Aki.Protocol.p1u();
    o.e8n = e;
    var e = await Net_1.Net.CallAsync(23158, o);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21242);
      }
      return e;
    }
  }
  static PostUnlockView() {
    var e;
    return !UiManager_1.UiManager.IsViewOpen("PhantomArenaRoleUnlockView") && !UiManager_1.UiManager.IsViewOpen("PhantomArenaBadgeUnlockView") && !UiManager_1.UiManager.IsViewOpen("PhantomArenaCardsRewardView") && !UiManager_1.UiManager.IsViewOpen("PhantomArenaCardOutlookRewardView") && !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(ModelManager_1.ModelManager.PhantomArenaModel.RoleUnlockQueue.length > 0 ? (UiManager_1.UiManager.OpenView("PhantomArenaRoleUnlockView"), 0) : (e = ModelManager_1.ModelManager.PhantomArenaModel.CardUnlockQueue).length > 0 ? (ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.PhantomBattleResultShowCards(e, () => {
      PhantomArenaController.PostUnlockView();
    }), 0) : ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.length > 0 ? (UiManager_1.UiManager.OpenView("PhantomArenaCardOutlookRewardView"), 0) : ModelManager_1.ModelManager.PhantomArenaModel.BadgeUnlockQueue.length > 0 ? (UiManager_1.UiManager.OpenView("PhantomArenaBadgeUnlockView"), 0) : ModelManager_1.ModelManager.PhantomArenaModel.EntranceOpenQueue && (UiManager_1.UiManager.OpenView("PhantomArenaEntranceView"), ModelManager_1.ModelManager.PhantomArenaModel.EntranceOpenQueue = false));
  }
  static OpenPhantomArenaConfirmBoxView(e, o = false) {
    e.CustomPopType = 10;
    e.CustomResourceId = o ? "UiItem_SoundRemnantArenaTipsInfo_New" : "UiItem_SoundRemnantArenaTipsInfo";
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
      t = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(o.ActivityId) ? 10138 : 10091;
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(t)) {
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
    o.i_activity_id = e.ActivityId;
    o.i_deck_order = r.GetDeckServerId() + 1;
    o.s_deck_name = r.GetDeckName();
    o.i_operation = e.Operation;
    var t = r.GetCardSlotList();
    var a = new Map();
    for (const M of t) {
      var n = M.CardId;
      var l = M.Cost;
      let o = a.get(l);
      if (!o) {
        o = new PhantomArenaDefine_1.PhantomArenaReportCardInfo(l);
        a.set(l, o);
      }
      for (let e = 0; e < M.Count; e++) {
        o.CardIdList.push(n);
      }
    }
    o.o_deck_info = [...a.values()];
    o.i_build_id = e.LastQuicklyBuildId;
    var _;
    var i;
    var d = [];
    for ([_, i] of e.QuicklyBuildDeckUseTimes) {
      if (i > 0) {
        d.push(_ + ":" + i);
      }
    }
    o.o_build_click = d.join();
    o.i_deck_status = r.GetCanUse() ? 1 : 0;
    t = r.GetFieldCardConditionCurNum();
    e = r.GetFieldCardConditionTargetNum();
    o.i_special_effect = e !== 0 && e <= t ? 1 : 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LogReport", 43, "卡组构筑埋点：", ["logData", Json_1.Json.Stringify(o) ?? ""]);
    }
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(o);
  }
  static OpenDeckBuilderCardInfoViewWithoutOutlookTab(e) {
    e = {
      CurCardId: e,
      NeedOutlookTab: false
    };
    UiManager_1.UiManager.OpenView("DeckBuilderCardInfoView", e);
  }
  static RequestCheckCardSkillUnlock(o, r) {
    var e;
    var t;
    if (o.GetFieldCardSlot()) {
      e = new Protocol_1.Aki.Protocol.qqm();
      t = o.GetCardIdList();
      e.Hqm = t;
      Net_1.Net.Call(15200, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21375);
          } else {
            o.SetFieldCardConditionProgress(e.Vqm, e.Nqm);
            r(e);
          }
        }
      });
    }
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
(_a = PhantomArenaController).bJd = false;
PhantomArenaController.Wpf = false;
PhantomArenaController.CardGroupNameRequest = async (e, o, r) => {
  var t = new Protocol_1.Aki.Protocol.qf1();
  t.H8n = e;
  t.c5n = o;
  t.w6n = r;
  var e = await Net_1.Net.CallAsync(28826, t);
  if (e) {
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23945);
    } else if (o = e.OC1) {
      ModelManager_1.ModelManager.PhantomArenaModel.UpdateProtocolDeckInfo(o, r);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 43, "卡组重命名时服务器返回数据为空");
    }
    return e.Q4n;
  } else {
    return Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError;
  }
}; //# sourceMappingURL=PhantomArenaController.js.map