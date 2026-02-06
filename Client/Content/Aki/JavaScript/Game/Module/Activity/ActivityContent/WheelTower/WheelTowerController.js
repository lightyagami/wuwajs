"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTimeDilation_1 = require("../../../../Ui/Base/UiTimeDilation");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const WheelTowerSubView_1 = require("./View/WheelTowerSubView");
const WheelTowerData_1 = require("./WheelTowerData");
const TAG_WAIT = "WheelTower";
const wheelTowerViewNameList = ["WheelTowerModeSelectView", "WheelTowerRoundSelectView", "WheelTowerBuffSelectView"];
class WheelTowerController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Y3g = () => {
      if (ModelManager_1.ModelManager.WheelTowerModel.CheckInInstanceDungeon()) {
        this.ShowWheelTowerCycleChangeConfirmBox(() => {
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
        });
      } else {
        for (const e of wheelTowerViewNameList) {
          if (UiManager_1.UiManager.IsViewOpen(e)) {
            this.ShowWheelTowerCycleChangeConfirmBox(() => {
              UiManager_1.UiManager.ResetToBattleView();
            });
            return;
          }
        }
      }
    };
    this.nye = () => {
      if (ModelManager_1.ModelManager.WheelTowerModel.CheckInInstanceDungeon()) {
        this.SetBanTimeStop(true);
      }
    };
    this.Hzf = e => {
      var o;
      var r = ModelManager_1.ModelManager.WheelTowerModel;
      if (r.EndlessMode && r.CachedRoundInProgress !== (o = e.UJ_)) {
        r.CachedRoundInProgress = o;
        UiManager_1.UiManager.OpenView("WheelTowerRoundTipsView", e.UJ_);
      }
    };
    this.gof = o => {
      const r = ModelManager_1.ModelManager.WheelTowerModel;
      var t = r.SelectedRound;
      var e = r.IsRoundChallenged(t);
      var n = r.GetIsEndlessUnlockedInInstance();
      if (!n) {
        if (e) {
          e = {
            BeforeData: {
              ScoreRecord: o.Udf,
              RoundScore: o.Bdf,
              TotalScore: r.GetRoundTotalScore(t),
              TeamRoleIdList: r.GetRoundSelectRoleIdList(t),
              BuffId: r.GetRoundSelectBuffList(t)[0]
            },
            AfterData: {
              ScoreRecord: o.xdf,
              RoundScore: o.kdf,
              TotalScore: o.xdf,
              TeamRoleIdList: o.zif.Xif.map(e => e.Q6n),
              BuffId: o.zif.$As[0]
            },
            IsEndless: r.EndlessMode,
            Round: t + 1
          };
          r.SetRecordPopupData(e);
        } else {
          r.ActivityData.OnAddNewRecord(o);
        }
      }
      var a = [];
      var l = o.Jif.length;
      for (let e = 0; e < l; e++) {
        var i = o.Jif[e];
        var _ = e === 0 ? r.GetRecordPrevBossHpPercentage(t - 1, i.Wif, i.UJ_) : 100;
        a.push({
          BossInfo: {
            WaveConfigId: i.Wif,
            Round: i.UJ_,
            HpPercentage: r.GetBossHpPercentage(i)
          },
          StartPercent: _
        });
      }
      var e = {
        EndlessMode: r.EndlessMode,
        TotalRound: r.GetLastChallengeRound() + 1,
        CurrentRound: r.SelectedRound + 1,
        CurrentScore: o.kdf,
        TotalScore: o.xdf,
        BossInfoList: a,
        LeftButtonData: {
          Name: "WheelTower_Result_Back",
          OnClick: () => {
            UiManager_1.UiManager.OpenView("WheelTowerRoundSelectView", r.SelectedRound);
          }
        }
      };
      var s = {
        Name: "WheelTower_Result_Retry",
        OnClick: () => {
          this.RequestSelectedRoundChallenge();
        },
        ConfirmBoxId: 411
      };
      var d = {
        Name: "WheelTower_Result_Next",
        OnClick: () => {
          UiManager_1.UiManager.OpenView("WheelTowerRoundSelectView", r.SelectedRound + 1);
        }
      };
      var M = {
        Name: "WheelTower_Result_Endless",
        OnClick: () => {
          r.SetEndlessMode(true);
          UiManager_1.UiManager.OpenView("WheelTowerModeSelectView");
        }
      };
      if (r.EndlessMode) {
        e.CenterButtonData = s;
        e.RightButtonData = d;
      } else if (n) {
        e.CenterButtonData = s;
        e.RightButtonData = M;
        e.ShowEndlessUnlockTips = true;
      } else {
        n = o.zif.Yif;
        if (r.GetBossHpPercentage(n) <= 0 || r.IsLastRoundCheckLimit(o.gG_, t)) {
          e.RightButtonData = s;
        } else {
          e.CenterButtonData = s;
          e.RightButtonData = d;
        }
      }
      UiManager_1.UiManager.OpenView("WheelTowerResultView", e);
      this.SetBanTimeStop(false);
      r.CachedRoundInProgress = -1;
    };
    this.QVf = e => {
      var e = e.dM_;
      if (e && (e = e.gG_, ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e).Diff > 0)) {
        if (ModelManager_1.ModelManager.WheelTowerModel.BlockEndlessUnlockTips) {
          ModelManager_1.ModelManager.WheelTowerModel.SetIsEndlessUnlockedInInstance(true);
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WheelTower_EndlessModeUnlockTips");
        }
      }
    };
    this.KVf = e => {
      ModelManager_1.ModelManager.WheelTowerModel.ActivityData.OnTaskUpdateNotify(e.E$s);
    };
    this.XVf = e => {
      if (e.dM_) {
        ModelManager_1.ModelManager.WheelTowerModel.ActivityData.OnLevelRecordUpdateNotify(e.dM_);
      }
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_WheelTowerActivity";
  }
  OnCreateSubPageComponent(e) {
    return new WheelTowerSubView_1.WheelTowerSubView();
  }
  OnCreateActivityData(e) {
    return new WheelTowerData_1.WheelTowerData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WheelTowerCycleChange, this.Y3g);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WheelTowerCycleChange, this.Y3g);
  }
  ShowWheelTowerCycleChangeConfirmBox(e) {
    var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
    o.FunctionMap.set(1, e);
    o.FunctionMap.set(0, e);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
  }
  SetBanTimeStop(e) {
    var o = ModelManager_1.ModelManager.WheelTowerModel;
    if (o.IsTimeStopBanned !== e) {
      if (o.IsTimeStopBanned = e) {
        UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag(TAG_WAIT);
      } else {
        UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag(TAG_WAIT);
      }
    }
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21490, this.gof);
    Net_1.Net.Register(16153, this.QVf);
    Net_1.Net.Register(20260, this.KVf);
    Net_1.Net.Register(19169, this.XVf);
    Net_1.Net.Register(19641, this.Hzf);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21490);
    Net_1.Net.UnRegister(16153);
    Net_1.Net.UnRegister(20260);
    Net_1.Net.UnRegister(19169);
    Net_1.Net.UnRegister(19641);
  }
  TryOpenOverridePopupView(e) {
    var o = ModelManager_1.ModelManager.WheelTowerModel.GetRecordPopupData();
    if (o) {
      ModelManager_1.ModelManager.WheelTowerModel.DeleteRecordPopupData();
      o.OnClickConfirm = () => {
        this.TryOverrideLevelRecord(() => {
          e?.();
        });
      };
      UiManager_1.UiManager.OpenView("WheelTowerRecordPopup", o);
    }
  }
  async TryOverrideLevelRecord(e) {
    var o = ModelManager_1.ModelManager.WheelTowerModel;
    var r = new Protocol_1.Aki.Protocol.Aif();
    r.gG_ = o.GetCurrentLevelRecord().gG_;
    var o = await Net_1.Net.CallAsync(28134, r);
    if (o) {
      if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 28441);
      } else {
        e();
      }
    }
  }
  RequestSelectedRoundChallenge() {
    var e = ModelManager_1.ModelManager.WheelTowerModel.GetCurrentLevelRecord().gG_;
    var o = ModelManager_1.ModelManager.WheelTowerModel.SelectedRound;
    var r = [ModelManager_1.ModelManager.WheelTowerModel.SelectedBuff];
    var t = ModelManager_1.ModelManager.WheelTowerModel.SelectedRoleList;
    this.RequestChallenge(e, o, r, t);
  }
  RequestChallenge(e, o, r, t) {
    var n = new Protocol_1.Aki.Protocol.nrf();
    n.gG_ = e;
    n.c5n = o;
    n.$As = r;
    n.Xif = [];
    for (const i of t) {
      var a;
      var l = new Protocol_1.Aki.Protocol.orf();
      if (ModelManager_1.ModelManager.WheelTowerModel.IsTemplateRole(i)) {
        l.Q6n = i;
      } else {
        a = ModelManager_1.ModelManager.WheelTowerModel.GetRoleInfo(i);
        l.Q6n = i;
        l.Qtm = a.Weapon;
        l.Kif = a.Phantom;
      }
      n.Xif.push(l);
    }
    o = new Protocol_1.Aki.Protocol.trf();
    o.K4s = n;
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.trf = o;
    r = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e);
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(r.InstId, t);
    ModelManager_1.ModelManager.WheelTowerModel.BlockEndlessUnlockTips = true;
    ModelManager_1.ModelManager.WheelTowerModel.DeleteRecordPopupData();
  }
  async RequestRoleEnergyUpdate() {
    var e = new Protocol_1.Aki.Protocol.qif();
    e.bN_ = ModelManager_1.ModelManager.WheelTowerModel.ActivityData.CycleId;
    var e = await Net_1.Net.CallAsync(24635, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26897);
      } else {
        ModelManager_1.ModelManager.WheelTowerModel.ActivityData.OnRoleEnergyUpdateNotify(e.erf);
      }
    }
  }
  async RequestTaskReceive(e) {
    var o;
    var e = ModelManager_1.ModelManager.WheelTowerModel.ActivityData.GetCanReceiveRewardId(e ? 2 : 1);
    if (e.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("WheelTower", 90, "没有可领取的奖励，但意外点击到了领取奖励按钮！");
      }
    } else {
      (o = new Protocol_1.Aki.Protocol.Uif()).Zif = e;
      if (o = await Net_1.Net.CallAsync(19199, o)) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 29634);
        } else {
          ModelManager_1.ModelManager.WheelTowerModel.ActivityData.OnTaskClaim(e);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("WheelTower", 90, "领取奖励请求异常，服务器返回为空！");
      }
    }
  }
  async RequestResetLevelRecord(e) {
    var o = new Protocol_1.Aki.Protocol.Ldf();
    o.gG_ = e;
    var e = await Net_1.Net.CallAsync(23999, o);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16016);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WheelTower", 90, "重置关卡请求异常，服务器返回为空！");
    }
  }
}
exports.WheelTowerController = WheelTowerController;
//# sourceMappingURL=WheelTowerController.js.map