"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushController = undefined;
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const ItemRewardController_1 = require("../../../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const BossRushData_1 = require("./BossRushData");
const BossRushSubView_1 = require("./BossRushSubView");
const SENDCD = 1000;
class BossRushController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.fSn = () => {
      var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 20) {
        BossRushController.RequestSettlement();
      }
    };
    this.qCl = e => {
      if (e === Protocol_1.Aki.Protocol.Q4n.Proto_BossRushActivityBuffSelectionEmpty) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRushBuffTabChange, 0);
      }
      if (e === Protocol_1.Aki.Protocol.Q4n.Proto_BossRushBuffCountLimit) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRushBuffTabChange, 1);
      }
    };
    this.pSn = e => {
      var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e.w6n);
      t.PhraseLevelInfo(e.MMs, e.vMs);
      t.PhraseRewardInfo(e.pMs);
      t.CheckIfNewBossRushOpen();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRushDataUpdate);
      if (UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView")) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, t.GetRewardViewData());
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot, e.w6n);
    };
    this.MB_ = e => {
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(e.w6n).SetInsSelectedBuffIdMap(e.r6n, e.oB_);
    };
    this.EB_ = e => {
      var t = [];
      for (const r of e.E$s) {
        var o = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushTaskConfig(r.s5n).ActivityId;
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(o).RefreshSingleTaskData(r);
        if (!t.includes(o)) {
          t.push(o);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRushTaskStateChanged);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRefreshBossRushReward);
      for (const n of t) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot, n);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, n);
      }
    };
    this.IB_ = () => {
      var e = [];
      e.push({
        ButtonTextId: "BossRushFailLeave",
        DescriptionTextId: undefined,
        IsTimeDownCloseView: false,
        IsClickedCloseView: true,
        OnClickedCallback: function () {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        }
      });
      ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
      var e = ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(ItemRewardDefine_1.BOSS_RUSH_FAIL, false, undefined, undefined, undefined, e, undefined, undefined, () => {}, undefined);
      ItemRewardController_1.ItemRewardController.Open(e);
    };
    this.vSn = e => {
      this.MSn();
      var t = this.ESn(ItemRewardDefine_1.BOSS_RUSH_SUCCESS, true, () => {}, e);
      var o = new ItemRewardDefine_1.ReachTargetData();
      var r = [];
      var n = {
        Target: [e.LMs.toString()],
        DescriptionTextId: "BossRushMonsterScoreTips",
        IsReached: false
      };
      r.push(n);
      var n = {
        Target: [e.RMs.toString()],
        DescriptionTextId: "BossRushTimeScoreTips",
        IsReached: false
      };
      r.push(n);
      var n = {
        Target: [e.DMs.toString()],
        DescriptionTextId: "BossRushTechScoreTips",
        IsReached: false
      };
      r.push(n);
      var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Second_Text");
      var n = {
        Target: [e.zM_.toString() + n],
        DescriptionTextId: "BossRushLeftTimeTips",
        IsReached: false
      };
      r.push(n);
      o.TargetReached = r;
      var n = e.LMs + e.RMs + e.DMs;
      var r = n > e.AMs;
      o.IfNewRecord = r;
      o.FullScore = n;
      t.SetScoreReached(o);
      ItemRewardController_1.ItemRewardController.Open(t);
      ControllerHolder_1.ControllerHolder.TowerController.ClearAllHatredInTower();
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityBossrush";
  }
  OnCreateSubPageComponent(e) {
    return new BossRushSubView_1.BossRushSubView();
  }
  OnCreateActivityData(e) {
    return new BossRushData_1.BossRushData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(16976, this.vSn);
    Net_1.Net.Register(18410, this.pSn);
    Net_1.Net.Register(20974, this.IB_);
    Net_1.Net.Register(23881, this.EB_);
    Net_1.Net.Register(28873, this.MB_);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16976);
    Net_1.Net.UnRegister(18410);
    Net_1.Net.UnRegister(20974);
    Net_1.Net.UnRegister(23881);
    Net_1.Net.UnRegister(28873);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, this.fSn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterInstanceDungeonFail, this.qCl);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, this.fSn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterInstanceDungeonFail, this.qCl);
  }
  MSn() {
    for (const e of ModelManager_1.ModelManager.BossRushModel.CurrentOpenBossRushActivityIds) {
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(e).CheckIfNewBossRushOpen();
    }
  }
  static GetBossRushSelectedBuffId(e) {
    for (const o of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values()) {
      if (o instanceof BossRushData_1.BossRushData) {
        if (o.GetBossRushLevelDetailInfoById(e)) {
          var t = o.GetInsSelectedBuffId(e);
          if (t.length > 0) {
            return t[0];
          }
        }
      }
    }
    return 0;
  }
  ESn(e, t, o, r) {
    var n = [];
    n.push({
      ButtonTextId: "Text_ButtonTextConfirmResult_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: true,
      IsClickedCloseView: false,
      OnClickedCallback: () => {
        BossRushController.OpenDefaultBossRushView();
      }
    });
    var s = r.AMs > 0;
    n.push({
      ButtonTextId: "Text_ButtonTextChallengeOneMore_Text",
      DescriptionTextId: s ? "BossRushCurrentHighScore" : undefined,
      DescriptionArgs: [r.AMs],
      IsTimeDownCloseView: false,
      IsClickedCloseView: false,
      OnClickedCallback: () => {
        var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(r.w6n).GetBossRushLevelDetailInfoById(r.r6n);
        BossRushController.RequestStartBossRushByTeamData(e.ConvertToTeamInfo());
      }
    });
    ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
    var s = ModelManager_1.ModelManager.ItemRewardModel.RefreshExploreRewardDataFromConfig(e, t, undefined, undefined, undefined, n, undefined, undefined, o, undefined);
    return s;
  }
  static RequestStartBossRushByTeamData(e) {
    var t = [];
    for (const i of e.GetPrepareSelectBuff()) {
      var o = new Protocol_1.Aki.Protocol.Dks();
      o.b6n = i.BuffId;
      o.q6n = i.Slot;
      o.G6n = i.State;
      t.push(o);
    }
    var r = [];
    for (const a of e.GetPrepareSelectScoreBuff()) {
      if (a.BuffId > 0) {
        r.push(a.BuffId);
      }
    }
    var n = [];
    for (const _ of e.GetCurrentTeamMembers()) {
      n.push(_);
    }
    var s = e.ActivityId;
    this.RequestStartBossRush(s, e.GetCurrentSelectLevel().GetInstanceDungeonId(), t, r, n);
  }
  static RequestBossRushTaskReward(t) {
    var e = new Protocol_1.Aki.Protocol.oym();
    e.w6n = t;
    var o = ModelManager_1.ModelManager.ActivityModel.GetActivityById(t);
    e.Aym = o.GetFinishAndUnclaimedTaskList();
    Net_1.Net.Call(29383, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19588);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRefreshBossRushReward);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
    });
  }
  static RequestStartBossRush(e, t, o, r, n) {
    if (BossRushController.Tua !== 0 && Time_1.Time.Now - BossRushController.Tua <= SENDCD) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Activity", 27, "发送协议太快");
      }
      return;
    }
    this.Tua = Time_1.Time.Now;
    var s;
    var i = [];
    var a = ModelManager_1.ModelManager.BossRushModel.GetBossRushTeamInfoByActivityId(e).GetCurrentSelectBuff();
    for (const _ of o) {
      if (_.G6n !== Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty) {
        i.push(_);
      } else {
        (s = new Protocol_1.Aki.Protocol.Dks()).b6n = _.b6n;
        s.q6n = _.q6n;
        s.G6n = _.b6n === 0 ? Protocol_1.Aki.Protocol.Iks.Proto_BuffEmpty : Protocol_1.Aki.Protocol.Iks.Proto_BuffSelected;
        i.push(s);
      }
    }
    for (const l of a) {
      if (l.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive) {
        i.push({
          b6n: l.BuffId,
          q6n: l.Slot,
          G6n: Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive
        });
      }
    }
    o = {
      w6n: e,
      s5n: ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushByActivityIdAndInstanceId(e, t)?.Id ?? 0,
      O6n: i,
      Zal: r
    };
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Wah = o;
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(t, n, 0, 0);
  }
  static RequestSettlement() {
    Net_1.Net.Call(24661, new Protocol_1.Aki.Protocol.ffs(), e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29702);
      }
    });
  }
  static RequestGetBossRushReward(t, e, o) {
    var r = new Protocol_1.Aki.Protocol.Cfs();
    r.w6n = t;
    r.N6n = e;
    r.k6n = o;
    Net_1.Net.Call(23871, r, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28789);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRefreshBossRushReward);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
    });
  }
  static RequestGetBossRushLevelReward(t, e, o, r) {
    var n = new Protocol_1.Aki.Protocol.ZC_();
    n.ell = e;
    n.c5n = r;
    Net_1.Net.Call(26555, n, e => {
      if (e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 28789);
      }
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(t).SetRewardStateClaimed(o, r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot, t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BossRefreshBossRushReward);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
    });
  }
  static async OpenDefaultBossRushView() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values()) {
      if (e instanceof BossRushData_1.BossRushData) {
        return this.OpenBossRushView(e.Id);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 27, "找不到BossRush活动");
    }
    return false;
  }
  static async OpenBossRushView(e) {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    t.CacheCurrentOpenBossNum();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
    const o = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenView("BossRushMainView", e, e => {
      o.SetResult(e);
    });
    return o.Promise;
  }
  static async RefreshBossRushBuffInGame() {
    var e = Protocol_1.Aki.Protocol.pC_.create();
    var e = await Net_1.Net.CallAsync(22096, e);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27888);
      return false;
    } else {
      ModelManager_1.ModelManager.BossRushModel.ChoseBuffInGameHandleList = e?.$As ?? [];
      return true;
    }
  }
  static async RequestBossRushChooseBuffInGame(e) {
    var t = Protocol_1.Aki.Protocol.yC_.create();
    t.c5n = e;
    var e = await Net_1.Net.CallAsync(28161, t);
    return e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26609), false);
  }
}
(exports.BossRushController = BossRushController).Tua = 0;
//# sourceMappingURL=BossRushController.js.map