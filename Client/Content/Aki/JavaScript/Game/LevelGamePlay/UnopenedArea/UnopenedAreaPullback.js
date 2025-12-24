"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnopenedAreaPullback = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const SceneEffectStateManager_1 = require("../../Render/Effect/PostProcess/SceneEffectStateManager");
const UiManager_1 = require("../../Ui/UiManager");
const DISTANCE_FACOR = 100;
const TOLERANCE_DISTANCE = 5;
const TELEPORT_DELAY_TIME = 20000;
const TELEPORT_DELAY_TIME_GONDOLA = 5000;
const END_DISTANCE = 250;
const TIPS_NAME = "NotOpenArea";
class UnopenedAreaPullback {
  constructor() {
    this.pLe = "Input Limited Action";
    this.rBe = TOLERANCE_DISTANCE * DISTANCE_FACOR;
    this.nBe = false;
    this.sBe = false;
    this.aBe = false;
    this.hBe = false;
    this.lBe = undefined;
    this._Be = Vector_1.Vector.Create();
    this.uBe = Vector_1.Vector.Create();
    this.jye = Vector_1.Vector.Create();
    this.RTe = Vector_1.Vector.Create();
    this.Hte = undefined;
    this.cBe = undefined;
    this.mBe = undefined;
    this.dBe = undefined;
    this.xie = (t, e) => {
      if (this.hBe && (this.CBe(t), this.sBe)) {
        if (e?.Valid) {
          e.Entity.GetComponent(187).StopMoveToLocation();
          this.gBe(e, false);
        }
        this.gBe(t, true);
        this.fBe(t);
      }
    };
  }
  Tick(t) {
    var e;
    var i;
    if (this.hBe && this.dBe?.Valid) {
      if (ModelManager_1.ModelManager.TeleportModel.IsTeleport || ModelManager_1.ModelManager.PlotModel.IsInPlot) {
        this.wBm(true);
      } else {
        this.wBm(false);
        e = Vector_1.Vector.Dist2D(this._Be, this.Hte.ActorLocationProxy);
        if (this.aBe) {
          i = MathUtils_1.MathUtils.SafeDivide(e, this.rBe);
          i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
          SceneEffectStateManager_1.default.SetSceneEffectState(0, i);
        }
        if (!this.sBe && e > this.rBe) {
          this.pBe();
          this.vBe();
        } else if (this.sBe && e < END_DISTANCE && this.MBe()) {
          this.EBe();
        }
      }
    }
  }
  MBe() {
    return !!ModelManager_1.ModelManager.MapModel.IsInMapPolygon(this.Hte.ActorLocationProxy) || (this.jye.DeepCopy(this.Hte.ActorLocationProxy), this.jye.Subtraction(this._Be, this.jye), this.jye.Z = 0, this.RTe.DeepCopy(this.uBe), this.RTe.Z = 0, this.RTe.DotProduct(this.jye) < 0);
  }
  pBe() {
    var t = ControllerHolder_1.ControllerHolder.GenericPromptController.GetViewNameByPromptId(TIPS_NAME);
    if (t && !UiManager_1.UiManager.IsViewOpen(t)) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(TIPS_NAME);
    }
  }
  vBe() {
    this.sBe = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 42, "开始执行拉回移动操作,禁用玩家输入");
    }
    this.SBe(true);
    this.yBe(false);
    this.IBe();
    this.fBe(this.dBe);
  }
  EBe() {
    this.sBe = false;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 42, "退出拉回移动操作,恢复玩家控制");
    }
    this.SBe(false);
    this.yBe(true);
    this.TBe(this.dBe);
  }
  Clear() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.xie)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    }
    return true;
  }
  OnEnterUnopenedArea() {
    var t;
    if (!this.hBe) {
      this._Be.DeepCopy(ModelManager_1.ModelManager.MapModel.GetLastSafeLocation());
      if (!this._Be.IsNearlyZero() && (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.xie) || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie), this.hBe = true, this.lBe = undefined, this.CBe(), this.LBe(true), Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 42, "--------进入了未开放区域--------", ["EnterLoc", this._Be]), t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint())) {
        EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnEnterOrExitUnopenedArea, true);
      }
    }
  }
  OnExitUnopenedArea() {
    var t;
    if (this.hBe && (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.xie) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie), this.hBe = false, Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 42, "- - - - 离开了未开放区域- - - - "), this.LBe(false), this.sBe && this.EBe(), t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint())) {
      EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnEnterOrExitUnopenedArea, false);
    }
  }
  fBe(t) {
    this.DBe(t);
    var t = t.Entity.GetComponent(187);
    var e = {
      Index: 0,
      Position: this._Be
    };
    t.MoveAlongPath({
      Points: e,
      Navigation: false,
      IsFly: false,
      DebugMode: true,
      Loop: false,
      Distance: 0,
      Callback: t => {
        if (this.sBe) {
          this.EBe();
        }
      },
      ReturnFalseWhenNavigationFailed: false
    });
  }
  DBe(t) {
    if (t.Entity?.CheckGetComponent(184)?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
      t.Entity?.GetComponent(35)?.ClimbPress(true);
    }
  }
  RBe() {
    if (!ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()) {
      if (this.sBe) {
        this.EBe();
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Map", 42, "在未开放区域待太久，开始传送");
      }
      this.UBe();
    }
  }
  UBe() {
    Net_1.Net.Call(16437, Protocol_1.Aki.Protocol.ECs.create(), t => {
      if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrPlayerIsTeleportCanNotDoTeleport && t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 26433);
      }
    });
  }
  TBe(t) {
    var e = t.Entity.GetComponent(187);
    e.StopMove(false);
    e.MoveToLocationEnd(1);
    var e = t.Entity.GetComponent(65);
    e.ClearMoveVectorCache();
    e.SetActive(true);
    this.gBe(t, false);
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
  }
  IBe() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, this.pLe);
    if (this.mBe.DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) {
      this.mBe.ExitAimStatus();
    } else {
      this.mBe.SetDirectionState(this.mBe.DirectionState);
    }
    if (this.cBe && this.cBe.CurrentSkill) {
      this.cBe.EndOwnerAndFollowSkills();
      this.ABe(0, 0);
    }
    this.Hte.ClearInput();
    var t = this.dBe.Entity.GetComponent(65);
    t.ClearMoveVectorCache();
    t.SetActive(false);
    this.gBe(this.dBe, true);
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
  }
  CBe(t) {
    if (t && t.Valid) {
      this.dBe = t;
    } else {
      this.dBe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId);
    }
    this.Hte = this.dBe.Entity.GetComponent(3);
    this.cBe = this.dBe.Entity.GetComponent(41);
    this.mBe = this.dBe.Entity.GetComponent(184);
  }
  ABe(t, e) {
    var i = this.Hte.Entity.GetComponent(215);
    if (t === 0 || i?.HasTag(-2100129479)) {
      this.Hte.Actor.KuroSetMovementMode({
        Mode: 1,
        CustomMode: e,
        Context: "[UnopenedAreaPullback.ResetCharacterState] if true"
      });
    } else {
      this.Hte.Actor.KuroSetMovementMode({
        Mode: t,
        CustomMode: e,
        Context: "[UnopenedAreaPullback.ResetCharacterState]"
      });
    }
  }
  yBe(t) {
    if (t && this.nBe) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(11);
      this.nBe = false;
    }
    if (!t && !this.nBe) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(11, [18]);
      this.nBe = true;
    }
  }
  LBe(t) {
    if (!(this.aBe = t)) {
      SceneEffectStateManager_1.default.SetSceneEffectState(0, 0);
    }
  }
  SBe(t) {
    if (t) {
      if (!this.lBe) {
        t = this.dBe?.Entity?.GetComponent(243)?.IsOnVehicle ?? false;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Map", 42, "开启定时器传送", ["Time", TELEPORT_DELAY_TIME]);
        }
        this.lBe = TimerSystem_1.TimerSystem.Delay(() => {
          this.RBe();
          this.lBe = undefined;
        }, t ? TELEPORT_DELAY_TIME_GONDOLA : TELEPORT_DELAY_TIME);
      }
    } else {
      if (this.lBe && TimerSystem_1.TimerSystem.Has(this.lBe)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Map", 42, "移除定时器传送");
        }
        TimerSystem_1.TimerSystem.Remove(this.lBe);
      }
      this.lBe = undefined;
    }
  }
  wBm(t) {
    if (this.lBe && TimerSystem_1.TimerSystem.Has(this.lBe)) {
      if (t) {
        if (!this.lBe.IsPause()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Map", 39, "暂停传送定时器");
          }
          this.lBe.Pause();
        }
      } else if (this.lBe.IsPause()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Map", 39, "恢复传送定时器");
        }
        this.lBe.Resume();
      }
    }
  }
  gBe(t, e) {
    var i;
    if (t && t.Valid) {
      if (e) {
        (i = t.Entity.GetComponent(215))?.AddTag(-1697149502);
        i?.AddTag(-541178966);
        i?.AddTag(-542518289);
      }
      if (!e) {
        (i = t.Entity.GetComponent(215))?.RemoveTag(-1697149502);
        i?.RemoveTag(-541178966);
        i?.RemoveTag(-542518289);
      }
    }
  }
  get GetInPullback() {
    return this.sBe;
  }
}
exports.UnopenedAreaPullback = UnopenedAreaPullback;
//# sourceMappingURL=UnopenedAreaPullback.js.map