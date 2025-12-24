"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadReviveController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../Ui/UiManager");
const BuffItemControl_1 = require("../BuffItem/BuffItemControl");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const SceneTeamController_1 = require("../SceneTeam/SceneTeamController");
const TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController");
const DeadReviveDefine_1 = require("./DeadReviveDefine");
const TIME_TO_REVIVE = 3000;
const LOGIN_REVIVE = 1000;
const OPEN_FADE_DURATION = 0.1;
const CLOSE_FADE_DURATION = 0.5;
class DeadReviveController extends UiControllerBase_1.UiControllerBase {
  static OnChangeMode() {
    DeadReviveController.i0a();
    return true;
  }
  static OnAddEvents() {
    Net_1.Net.Register(17798, e => {
      DeadReviveController.r0a(e);
    });
    Net_1.Net.Register(20498, e => {
      DeadReviveController.o0a(e);
    });
    Net_1.Net.Register(18168, DeadReviveController.PLc);
    Net_1.Net.Register(17707, DeadReviveController.RBc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, DeadReviveController.hWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRevive, DeadReviveController.g7r);
  }
  static OnRemoveEvents() {
    Net_1.Net.UnRegister(17798);
    Net_1.Net.UnRegister(20498);
    Net_1.Net.UnRegister(18168);
    Net_1.Net.UnRegister(17707);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, DeadReviveController.hWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRevive, DeadReviveController.g7r);
  }
  static ReviveRequest(e, r) {
    var o;
    if (!DeadReviveController.n0a) {
      (o = new Protocol_1.Aki.Protocol.z1s()).bVn = e;
      DeadReviveController.n0a = true;
      Net_1.Net.Call(17060, o, e => {
        DeadReviveController.n0a = false;
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20168);
            r?.(false);
          } else {
            r?.(true);
          }
        } else {
          r?.(false);
        }
      });
    }
  }
  static TryReviveRole(e, r, o = false) {
    e = ModelManager_1.ModelManager.DeadReviveModel.ReviveCooldownCreatureMap.get(e);
    if (e) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(DeadReviveDefine_1.REVIVE_COOLDOWN, Math.floor(0.5 + MathUtils_1.MathUtils.MillisecondToSecond * e.RemainMilliseconds));
    } else {
      switch (ModelManager_1.ModelManager.DeadReviveModel.ReviveMode) {
        case 0:
          BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(r);
          break;
        case 1:
          DeadReviveController.xLc(r, o);
      }
    }
  }
  static TryReviveRoleWhenCurrentRoleDead(e, r) {
    var o;
    if (ModelManager_1.ModelManager.DeadReviveModel.ReviveMode === 1) {
      o = ModelManager_1.ModelManager.DeadReviveModel.OpenedViewName;
      if (!ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.Active && o && UiManager_1.UiManager.IsViewOpen(o)) {
        this.TryReviveRole(e, r, true);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(DeadReviveDefine_1.REVIVE_WAIT);
      }
    }
  }
  static CheckOtherPlayerReviveCooldown(e, r) {
    var o;
    if (e !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId() && (e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e)) && (o = ModelManager_1.ModelManager.DeadReviveModel.ReviveCooldownCreatureMap.get(r))) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(DeadReviveDefine_1.OTHER_PLAYER_REVIVE_COOLDOWN, e.PlayerNumber, Math.floor(0.5 + MathUtils_1.MathUtils.MillisecondToSecond * o.RemainMilliseconds));
    }
  }
  static r0a(e) {
    var r;
    var o = ModelManager_1.ModelManager.DeadReviveModel;
    if (e.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
      o.InitReviveConfig(e.I2s);
      o.ReviveLimitTime = e.E2s;
      o.IsShowRevive = e.T2s;
      o.IsAutoRevive = e.y2s;
      if (!e.y2s && !!e.T2s && !this.g51()) {
        UiManager_1.UiManager.ResetToBattleView();
      }
      if ((r = ModelManager_1.ModelManager.LordGymModel).IsChallenging()) {
        r.IsDeadInChallenge = true;
      }
      if (e.wVn) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, DeadReviveController.s0a);
      } else if (o.SkipDeathAnim) {
        DeadReviveController.a0a();
      } else {
        o.DeadDelayTimer = TimerSystem_1.GameplayTimerSystem.Delay(DeadReviveController.a0a, TIME_TO_REVIVE);
      }
    }
  }
  static o0a(e) {
    var r = new UE.VectorDouble(e.P5n?.X ?? 0, e.P5n?.Y ?? 0, e.P5n?.Z ?? 0);
    var o = new UE.Rotator(e.D2s?.Pitch ?? 0, e.D2s?.Yaw ?? 0, e.D2s?.Roll ?? 0);
    let a = undefined;
    var t = e.ss1;
    if (t) {
      a = Vector_1.Vector.Create(t.X, t.Y, t.Z);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 48, "执行复活流程", ["PlayerId", e.W5n], ["Location", r], ["Rotator", o], ["Gravity", a], ["ReviveType", e.R2s]);
    }
    if (e.W5n === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
      DeadReviveController.h0a(e, r, o, a);
    } else {
      DeadReviveController.i$s(e, r, o);
    }
  }
  static async h0a(e, r, o, a) {
    if (e.P2s) {
      ControllerHolder_1.ControllerHolder.SubLevelController.LoadOrUnloadSubLevel(e.U2s, e.W$_);
    }
    for (const v of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true)) {
      var t = v.Entity?.GetComponent(3);
      t?.SetInputRotator(o);
      t?.SetActorLocationAndRotation(r, o, "复活流程", false);
    }
    var l;
    var n;
    var i;
    DeadReviveController.i0a();
    ModelManager_1.ModelManager.DeadReviveModel.ClearReviveData();
    if (!(e.R2s <= 0)) {
      if (DeadReviveController.xFt(r)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("World", 48, "播放剧情并进行无加载传送");
        }
        if ((n = ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig?.ReviveSequencePath) && n !== "") {
          i = (n = n.split(","))[0];
          l = Number(n[1]);
          n = Number(n[2]);
          ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, undefined, OPEN_FADE_DURATION);
          i = ControllerHolder_1.ControllerHolder.FlowController.StartFlow(i, l, n);
          ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId = i;
          ModelManager_1.ModelManager.DeadReviveModel.RevivePosition = r;
          ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator = o;
          ModelManager_1.ModelManager.DeadReviveModel.ReviveGravity = a;
          return;
        } else {
          DeadReviveController.fFn(r, o, a, "RevivePerform");
          return;
        }
      } else {
        if (e.ZCa) {
          await ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
            ClientReason: "SelfRevive",
            TargetPosition: r,
            TargetRotation: o,
            TargetGravityDirect: a,
            TeleportMode: 0,
            TeleportCfgId: e.w2s
          }).finally(() => {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("World", 79, "复活传送完成，复活结束");
            }
            DeadReviveController.PlayerReviveEnded();
          });
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("World", 48, "复活执行无加载传送");
          }
          DeadReviveController.fFn(r, o, a, "NoLoadingRevive");
        }
        return;
      }
    }
    TimerSystem_1.GameplayTimerSystem.Delay(DeadReviveController.PlayerReviveEnded, LOGIN_REVIVE);
  }
  static xFt(e) {
    if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("World", 48, "非副本中不允许复活表演");
      }
      return false;
    }
    let r = false;
    for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true)) {
      if (o.Entity?.GetComponent(215)?.HasTag(-58810558)) {
        r = true;
        break;
      }
    }
    return !!r && (!!ControllerHolder_1.ControllerHolder.TeleportController.QueryCanTeleportNoLoading(e) || !(Log_1.Log.CheckInfo() && Log_1.Log.Info("World", 48, "复活位置不可无加载传送，不允许复活表演"), 1));
  }
  static i$s(e, r, o) {
    for (const l of e.A2s) {
      var a = MathUtils_1.MathUtils.LongToNumber(l.F4n);
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
      if (a?.Valid) {
        if (a.IsInit) {
          var t = a.Entity.GetComponent(3);
          t.SetInputRotator(o);
          t.SetActorLocationAndRotation(r, o, "复活流程.复活其他角色", false);
          a.Entity.GetComponent(71)?.ClearReplaySamples();
        } else {
          t = a.Entity.GetComponent(0);
          t?.SetLivingStatus(Protocol_1.Aki.Protocol.JEs.Proto_Alive);
          const r = e.P5n;
          if (r) {
            t?.SetInitLocation(r);
          }
        }
      }
    }
    SceneTeamController_1.SceneTeamController.ShowControlledRole(e.W5n);
  }
  static l0a() {
    var e = DeadReviveController.ULc();
    const r = e[0];
    const o = e[1];
    if (r) {
      ModelManager_1.ModelManager.DeadReviveModel.BlockAllInput = true;
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      ModelManager_1.ModelManager.DeadReviveModel.OpenedViewName = r;
      UiManager_1.UiManager.ResetToBattleView(() => {
        if (ModelManager_1.ModelManager.SceneTeamModel.GetGroupLivingState(ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0, 1) === 1) {
          ModelManager_1.ModelManager.DeadReviveModel.BlockAllInput = false;
          InputDistributeController_1.InputDistributeController.RefreshInputTag();
        } else {
          UiManager_1.UiManager.OpenView(r, o, () => {
            ModelManager_1.ModelManager.DeadReviveModel.BlockAllInput = false;
            InputDistributeController_1.InputDistributeController.RefreshInputTag();
          });
        }
      });
    }
  }
  static ULc() {
    var e;
    if (this.g51()) {
      return [undefined, undefined];
    } else if (ModelManager_1.ModelManager.DeadReviveModel.ReviveMode === 1) {
      return ["ShareTimesReviveView", undefined];
    } else if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      if (TowerDefenceController_1.TowerDefenseController.CheckInInstanceDungeon()) {
        return [TowerDefenceController_1.TowerDefenseController.TryGetReviveViewName(), undefined];
      } else {
        return ["MultiReviveView", undefined];
      }
    } else if (ModelManager_1.ModelManager.DeadReviveModel.IsShowRevive) {
      if ((e = ModelManager_1.ModelManager.BabelTowerModel).CheckInBattleBabelTower() && e.CheckCanRevive()) {
        return ["BabelTowerReviveView", {
          LevelId: (e = e.CurrentChallengeInstData).LevelId,
          StarNum: e.CurStarNum
        }];
      } else {
        return ["ReviveView", undefined];
      }
    } else {
      return [undefined, undefined];
    }
  }
  static g51() {
    return ModelManager_1.ModelManager.DangoAbyssModel.CheckInAbyss() && ModelManager_1.ModelManager.DangoAbyssModel.IsChallengeFinish();
  }
  static i0a() {
    var e = ModelManager_1.ModelManager.DeadReviveModel.OpenedViewName;
    if (e && UiManager_1.UiManager.IsViewOpen(e)) {
      UiManager_1.UiManager.CloseView(e);
    }
    ModelManager_1.ModelManager.DeadReviveModel.OpenedViewName = undefined;
  }
  static fFn(e, r, o, a) {
    ControllerHolder_1.ControllerHolder.TeleportController.TeleportPlayer({
      ClientReason: a,
      TargetPosition: e,
      TargetRotation: r,
      TargetGravityDirect: o,
      TeleportMode: 2
    }).finally(() => {
      SceneTeamController_1.SceneTeamController.ShowControlledRole(ModelManager_1.ModelManager.PlayerInfoModel.GetId());
      var e = new Protocol_1.Aki.Protocol.pCs();
      Net_1.Net.Call(21130, e, () => {});
      var e = ModelManager_1.ModelManager.DeadReviveModel.ChangeRoleIdAfterRevive;
      if (e && (e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
        ParamType: 0,
        OnlyMyRole: true
      }), ModelManager_1.ModelManager.DeadReviveModel.ChangeRoleIdAfterRevive = 0, e)) {
        SceneTeamController_1.SceneTeamController.RequestChangeRole(e.GetCreatureDataId());
      }
    });
  }
  static TryReviveCurrentRoleByShare() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    if (e) {
      DeadReviveController.DLc(e.GetConfigId);
    }
  }
  static xLc(e, r) {
    var o;
    var a;
    var t;
    if (ModelManager_1.ModelManager.DeadReviveModel.CurrentShareReviveTimes <= 0) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(DeadReviveDefine_1.SHARE_REVIVE_NO_TIMES);
    } else {
      (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(282)).FunctionMap.set(2, () => {
        if (r) {
          ModelManager_1.ModelManager.DeadReviveModel.ChangeRoleIdAfterRevive = e;
        }
        DeadReviveController.DLc(e);
      });
      a = ModelManager_1.ModelManager.DeadReviveModel.CurrentShareReviveTimes;
      t = ModelManager_1.ModelManager.DeadReviveModel.MaxShareReviveTimes;
      o.SetTextArgs(a.toString(), t.toString());
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
    }
  }
  static DLc(e) {
    var r = new Protocol_1.Aki.Protocol.Cec();
    r.Q6n = e;
    Net_1.Net.Call(16833, r, () => {});
  }
}
(exports.DeadReviveController = DeadReviveController).n0a = false;
DeadReviveController.s0a = () => {
  EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, DeadReviveController.s0a);
  ModelManager_1.ModelManager.DeadReviveModel.DeadDelayTimer = TimerSystem_1.GameplayTimerSystem.Delay(DeadReviveController.a0a, LOGIN_REVIVE);
};
DeadReviveController.a0a = () => {
  ModelManager_1.ModelManager.DeadReviveModel.DeadDelayTimer = undefined;
  if (ModelManager_1.ModelManager.DeadReviveModel.IsAutoRevive) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 48, "自动复活");
    }
    DeadReviveController.ReviveRequest(false);
  } else {
    DeadReviveController.l0a();
  }
};
DeadReviveController.hWe = e => {
  var r = ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId;
  if (r && e.FlowIncId === r) {
    DeadReviveController.fFn(ModelManager_1.ModelManager.DeadReviveModel.RevivePosition, ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator, ModelManager_1.ModelManager.DeadReviveModel.ReviveGravity, "RevivePerform");
    ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0, undefined, CLOSE_FADE_DURATION);
    ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId = 0;
  }
};
DeadReviveController.PlayerReviveEnded = () => {
  SceneTeamController_1.SceneTeamController.ShowControlledRole(ModelManager_1.ModelManager.PlayerInfoModel.GetId());
  let e = undefined;
  var r = ModelManager_1.ModelManager.DeadReviveModel.ChangeRoleIdAfterRevive;
  if (r) {
    e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(r, {
      ParamType: 0,
      OnlyMyRole: true
    });
  }
  ModelManager_1.ModelManager.DeadReviveModel.ChangeRoleIdAfterRevive = 0;
  if (e = e || ModelManager_1.ModelManager.GameModeModel.IsMulti ? e : ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)[0]) {
    SceneTeamController_1.SceneTeamController.RequestChangeRole(e.GetCreatureDataId());
  }
};
DeadReviveController.PLc = e => {
  var r = ModelManager_1.ModelManager.DeadReviveModel;
  r.CurrentShareReviveTimes = e.aAc;
  r.MaxShareReviveTimes = e.Sec;
  if (r.MaxShareReviveTimes > 0) {
    r.ReviveMode = 1;
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShareReviveTimesChange);
};
DeadReviveController.RBc = e => {
  for (const a of e.gxc) {
    var r = MathUtils_1.MathUtils.LongToNumber(a.F4n);
    var o = MathUtils_1.MathUtils.LongToNumber(a.ZM_);
    ModelManager_1.ModelManager.DeadReviveModel.RegisterCooldown(r, o);
  }
};
DeadReviveController.g7r = e => {
  e = e.GetComponent(0)?.GetCreatureDataId() ?? 0;
  ModelManager_1.ModelManager.DeadReviveModel.UnRegisterCooldown(e);
}; //# sourceMappingURL=DeadReviveController.js.map