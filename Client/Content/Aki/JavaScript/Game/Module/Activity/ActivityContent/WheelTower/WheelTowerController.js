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
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const WheelTowerSubView_1 = require("./View/WheelTowerSubView");
const WheelTowerData_1 = require("./WheelTowerData");
const TAG_WAIT = "WheelTower";
class WheelTowerController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.nye = () => {
      if (ModelManager_1.ModelManager.WheelTowerModel.CheckInInstanceDungeon()) {
        this.SetBanTimeStop(true);
      }
    };
    this.b6f = e => {
      var o;
      var r = ModelManager_1.ModelManager.WheelTowerModel;
      if (r.EndlessMode && r.CachedRoundInProgress !== (o = e.UJ_)) {
        r.CachedRoundInProgress = o;
        UiManager_1.UiManager.OpenView("WheelTowerRoundTipsView", e.UJ_);
      }
    };
    this.lif = o => {
      const r = ModelManager_1.ModelManager.WheelTowerModel;
      var t = r.SelectedRound;
      var e = r.IsRoundChallenged(t);
      var a = r.GetIsEndlessUnlockedInInstance();
      if (!a) {
        if (e) {
          e = {
            BeforeData: {
              ScoreRecord: o.kuf,
              RoundScore: o.Ouf,
              TotalScore: r.GetRoundTotalScore(t),
              TeamRoleIdList: r.GetRoundSelectRoleIdList(t),
              BuffId: r.GetRoundSelectBuffList(t)[0]
            },
            AfterData: {
              ScoreRecord: o.quf,
              RoundScore: o.Guf,
              TotalScore: o.quf,
              TeamRoleIdList: o.jef.Vef.map(e => e.Q6n),
              BuffId: o.jef.$As[0]
            },
            IsEndless: r.EndlessMode,
            Round: t + 1
          };
          r.SetRecordPopupData(e);
        } else {
          r.ActivityData.OnAddNewRecord(o);
        }
      }
      var n = [];
      var l = o.$ef.length;
      for (let e = 0; e < l; e++) {
        var i = o.$ef[e];
        var _ = e === 0 ? r.GetRecordPrevBossHpPercentage(t - 1, i.Gef, i.UJ_) : 100;
        n.push({
          BossInfo: {
            WaveConfigId: i.Gef,
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
        CurrentScore: o.Guf,
        TotalScore: o.quf,
        BossInfoList: n,
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
      } else if (a) {
        e.CenterButtonData = s;
        e.RightButtonData = M;
        e.ShowEndlessUnlockTips = true;
      } else {
        a = o.jef.Hef;
        if (r.GetBossHpPercentage(a) <= 0 || r.IsLastRoundCheckLimit(o.gG_, t)) {
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
    this.Fqf = e => {
      var e = e.dM_;
      if (e && (e = e.gG_, ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e).Diff > 0)) {
        if (ModelManager_1.ModelManager.WheelTowerModel.BlockEndlessUnlockTips) {
          ModelManager_1.ModelManager.WheelTowerModel.SetIsEndlessUnlockedInInstance(true);
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WheelTower_EndlessModeUnlockTips");
        }
      }
    };
    this.Nqf = e => {
      ModelManager_1.ModelManager.WheelTowerModel.ActivityData.OnTaskUpdateNotify(e.E$s);
    };
    this.Vqf = e => {
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
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
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
    Net_1.Net.Register(29682, this.lif);
    Net_1.Net.Register(29243, this.Fqf);
    Net_1.Net.Register(27676, this.Nqf);
    Net_1.Net.Register(26958, this.Vqf);
    Net_1.Net.Register(17354, this.b6f);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29682);
    Net_1.Net.UnRegister(29243);
    Net_1.Net.UnRegister(27676);
    Net_1.Net.UnRegister(26958);
    Net_1.Net.UnRegister(17354);
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
    var r = new Protocol_1.Aki.Protocol.Mef();
    r.gG_ = o.GetCurrentLevelRecord().gG_;
    var o = await Net_1.Net.CallAsync(16135, r);
    if (o) {
      if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 19289);
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
    var a = new Protocol_1.Aki.Protocol.Jef();
    a.gG_ = e;
    a.c5n = o;
    a.$As = r;
    a.Vef = [];
    for (const i of t) {
      var n;
      var l = new Protocol_1.Aki.Protocol.zef();
      if (ModelManager_1.ModelManager.WheelTowerModel.IsTemplateRole(i)) {
        l.Q6n = i;
      } else {
        n = ModelManager_1.ModelManager.WheelTowerModel.GetRoleInfo(i);
        l.Q6n = i;
        l.Qtm = n.Weapon;
        l.Nef = n.Phantom;
      }
      a.Vef.push(l);
    }
    o = new Protocol_1.Aki.Protocol.Kef();
    o.K4s = a;
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Kef = o;
    r = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e);
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(r.InstId, t);
    ModelManager_1.ModelManager.WheelTowerModel.BlockEndlessUnlockTips = true;
    ModelManager_1.ModelManager.WheelTowerModel.DeleteRecordPopupData();
  }
  async RequestRoleEnergyUpdate() {
    var e = new Protocol_1.Aki.Protocol.Lef();
    e.bN_ = ModelManager_1.ModelManager.WheelTowerModel.ActivityData.CycleId;
    var e = await Net_1.Net.CallAsync(25752, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18349);
      } else {
        ModelManager_1.ModelManager.WheelTowerModel.ActivityData.OnRoleEnergyUpdateNotify(e.Qef);
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
      (o = new Protocol_1.Aki.Protocol.Ief()).Wef = e;
      if (o = await Net_1.Net.CallAsync(25657, o)) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 27714);
        } else {
          ModelManager_1.ModelManager.WheelTowerModel.ActivityData.OnTaskClaim(e);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("WheelTower", 90, "领取奖励请求异常，服务器返回为空！");
      }
    }
  }
  async RequestResetLevelRecord(e) {
    var o = new Protocol_1.Aki.Protocol.Duf();
    o.gG_ = e;
    var e = await Net_1.Net.CallAsync(23187, o);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27513);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("WheelTower", 90, "重置关卡请求异常，服务器返回为空！");
    }
  }
}
exports.WheelTowerController = WheelTowerController;
//# sourceMappingURL=WheelTowerController.js.map