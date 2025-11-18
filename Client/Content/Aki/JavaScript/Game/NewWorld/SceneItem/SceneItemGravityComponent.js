"use strict";

var SceneItemGravityComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var h = arguments.length;
  var a = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (n = t[o]) {
        a = (h < 3 ? n(a) : h > 3 ? n(e, i, a) : n(e, i)) || a;
      }
    }
  }
  if (h > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemGravityComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../Manager/ModelManager");
const RangeComponentMessageManager_1 = require("../Character/Custom/RangeComponentMessageManager");
const CHECK_DISTANCE_INTERVAL = 100;
let SceneItemGravityComponent = SceneItemGravityComponent_1 = class SceneItemGravityComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this.mBe = undefined;
    this._un = undefined;
    this.R0n = undefined;
    this.U0n = 0;
    this.P0n = 0;
    this.pFn = 0;
    this.B0n = undefined;
    this.nxe = 1;
    this.q0n = -1;
    this.G0n = -1;
    this.N0n = false;
    this.O0n = undefined;
    this.g_n = () => {
      this.k0n();
    };
    this.F0n = () => {
      this.V0n("[SceneItemGravityComponent] 锁定属性改变");
    };
    this.Rnn = () => {
      this.V0n("[SceneItemGravityComponent] 场景交互物加载完毕");
      if (this.mBe.State !== 0) {
        this.g_n();
      }
    };
    this.ful = (t, e, i, s) => {
      if (s === Protocol_1.Aki.Protocol.Q4n.Proto_ErrOnlineInteractNotOpen || s === Protocol_1.Aki.Protocol.Q4n.Proto_ErrOnlineInteractNoPermission || s === Protocol_1.Aki.Protocol.Q4n.Proto_ErrInteractMultiGameMode) {
        LevelGamePlayController_1.LevelGamePlayController.ShowFakeErrorCodeTips();
      }
    };
    this.H0n = (t, e) => {
      var e = e.Entity;
      if (!(e?.GetComponent(3) ?? !t)) {
        if (this.R0n.StopTeleControlMove !== false && (t = e?.GetComponent(160), e = e?.GetComponent(206), t) && e?.IsAutonomousProxy) {
          t.ForceStopDropping();
        }
      }
    };
    this.j0n = () => {
      var t = Global_1.Global.BaseCharacter;
      if (t) {
        t = t.GetDistanceTo(this.Hte?.Owner);
        if (this.N0n && t > this.G0n) {
          this.N0n = false;
          ModelManager_1.ModelManager.ManipulaterModel?.RemoveShowLandTipsCount(this.Entity);
        } else if (!this.N0n && t < this.q0n) {
          this.N0n = true;
          ModelManager_1.ModelManager.ManipulaterModel?.AddShowLandTipsCount(this.Entity);
        }
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemGravityComponent_1)[0];
    return !!t && (this.EIe = this.Entity.CheckGetComponent(0), this.R0n = t, this.P0n = this.R0n.DownTime / MathUtils_1.MathUtils.MillisecondToSecond, this.R0n.ShowLandTipRadius && (this.q0n = this.R0n.ShowLandTipRadius.EnterRadius, this.G0n = this.R0n.ShowLandTipRadius.LeaveRadius), true);
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(206);
    this.Lie = this.Entity.CheckGetComponent(200);
    this.mBe = this.Entity.CheckGetComponent(137);
    this._un = this.Entity.CheckGetComponent(134);
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n);
    }
    if (!RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.HasMessage(this.Entity, Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter, Protocol_1.Aki.Protocol.WR_.Proto_Trample, this.ful)) {
      RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.RegisterMessage(this.Entity, Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter, Protocol_1.Aki.Protocol.WR_.Proto_Trample, this.ful);
    }
    return true;
  }
  OnActivate() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Temp", 31, "SceneItemGravityComponent.OnActivate: 重复添加事件", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
    } else {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.F0n);
    if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    if (this.Hte.GetIsSceneInteractionLoadCompleted()) {
      this.Rnn();
    }
    if (this.R0n?.ShowLandTipRadius) {
      this.O0n = TimerSystem_1.TimerSystem.Forever(this.j0n, CHECK_DISTANCE_INTERVAL);
    }
    return true;
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, this.H0n);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.F0n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemLockPropChange, this.F0n);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.g_n);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    if (RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.HasMessage(this.Entity, Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter, Protocol_1.Aki.Protocol.WR_.Proto_Trample, this.ful)) {
      RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.UnRegisterMessage(this.Entity, Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter, Protocol_1.Aki.Protocol.WR_.Proto_Trample, this.ful);
    }
    if (this.O0n !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.O0n);
      this.O0n = undefined;
    }
    return true;
  }
  OnTick(t) {
    this.W0n(t * this.nxe);
  }
  OnChangeTimeDilation(t) {
    var e = this.Entity.GetComponent(126);
    this.nxe = e ? t * e.CurrentTimeScale : 1;
  }
  k0n() {
    switch (this.mBe.State) {
      case 1:
        this.ChangeTransition(true);
        break;
      case 2:
        this.vFn(1);
        break;
      case 4:
        this.K0n("[SceneItemGravityComponent] 重力机关处于完成态");
        break;
      case 5:
        if (this.Lie?.HasTag(-709838471)) {
          this.K0n("[SceneItemGravityComponent] 重力机关处于静默态");
        }
    }
  }
  ChangeTransition(t) {
    switch (this.U0n) {
      case 2:
      case 0:
        if (!t) {
          this.vFn(3);
        }
        break;
      case 3:
      case 1:
        if (t) {
          this.vFn(2);
        }
    }
  }
  vFn(t) {
    if (this.Q0n() && this.U0n !== t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "[SceneItemGravityComponent] ChangeAnimState", ["PbDataId", this.EIe?.GetPbDataId()], ["FromAnimState", this.U0n], ["ToAnimState", t]);
      }
      this.MLn(this.U0n, t);
      this.U0n = t;
      this.W0n(0);
    }
  }
  W0n(t = 0) {
    if (this.Q0n()) {
      if (this.X0n()) {
        switch (this.U0n) {
          case 0:
            this.$0n(t);
            break;
          case 1:
            this.Y0n(t);
            break;
          case 2:
            this.J0n(t);
            break;
          case 3:
            this.z0n(t);
        }
      } else {
        this.K0n("[SceneItemGravityComponent] 重力机关被停用(完成态或被锁定或静默)");
      }
    } else {
      this.K0n("[SceneItemGravityComponent] 场景交互物未初始化");
    }
  }
  $0n(t) {
    this.pFn = 0;
    this.K0n("[SceneItemGravityComponent] 到达顶部");
  }
  Y0n(t) {
    this.pFn = this.P0n;
    this.K0n("[SceneItemGravityComponent] 到达底部");
  }
  J0n(t) {
    this.pFn = MathUtils_1.MathUtils.Clamp(this.pFn - t, 0, this.P0n);
    this.V0n("[SceneItemGravityComponent] 上升中");
    if (this.pFn <= 0) {
      this.vFn(0);
    }
  }
  z0n(t) {
    this.pFn = MathUtils_1.MathUtils.Clamp(this.pFn + t, 0, this.P0n);
    this.V0n("[SceneItemGravityComponent] 下降中");
  }
  MLn(t, e) {
    this.Z0n(e);
    this.ELn(t, e);
  }
  Z0n(s) {
    if (this.Lie) {
      let e = undefined;
      let i = undefined;
      switch (s) {
        case 3:
        case 2:
          {
            e = s === 3 ? (i = -223738243, 232332034) : (i = 232332034, -223738243);
            var n = this.Lie.HasTag(i);
            var h = !this.Lie.HasTag(e);
            if (!n && !h) {
              break;
            }
            let t = undefined;
            if (n) {
              t = this.Hte.GetActiveTagSequencePlaybackProgress(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i));
              this.Lie.RemoveTag(i);
            }
            if (h) {
              this.Lie.AddTag(e);
              if (t && t < 1) {
                n = MathUtils_1.MathUtils.Clamp(1 - t, 0, 1);
                this.Hte.SetActiveTagSequencePlaybackProgress(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e), n);
              }
              this.Hte.SetActiveTagSequenceDurationTime(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e), this.R0n.DownTime);
            }
            break;
          }
        case 0:
        case 1:
          i = s === 0 ? -223738243 : 232332034;
          if (!this.Lie.HasTag(i)) {
            for (const t of [-223738243, 232332034]) {
              if (this.Lie.HasTag(t)) {
                this.Lie.RemoveTag(t);
              }
            }
            this.Lie.AddTag(i);
          }
          this.Hte.SetActiveTagSequencePlaybackProgress(GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(i), 1);
          this.Lie.RemoveTag(i);
      }
    }
  }
  ELn(i, s) {
    if (this.Lie) {
      let t = undefined;
      let e = undefined;
      switch (i) {
        case 3:
          e = -724436488;
          if (s === 1) {
            t = -1498653671;
          }
          break;
        case 2:
          e = 1750799296;
          if (s === 0) {
            t = -741524141;
          }
          break;
        case 0:
          e = -741524141;
          if (s === 3) {
            t = -724436488;
          }
          break;
        case 1:
          e = -1498653671;
          if (s === 2) {
            t = 1750799296;
          }
      }
      if (e && this.Lie.HasTag(e)) {
        this.Lie.RemoveTag(e);
      }
      if (t && !this.Lie.HasTag(t)) {
        this.Lie.AddTag(t);
      }
    }
  }
  Q0n() {
    return !!this.Hte?.GetIsSceneInteractionLoadCompleted();
  }
  X0n() {
    return !!this.mBe && !!this._un && !!this.Lie && !this.mBe.IsInState(4) && !this._un.IsLocked && !this.Lie.HasTag(-709838471);
  }
  efn() {
    return this.B0n === undefined;
  }
  V0n(t) {
    if (!this.efn() && this.Enable(this.B0n, t)) {
      this.B0n = undefined;
    }
  }
  K0n(t) {
    if (this.efn()) {
      this.B0n = this.Disable(t);
    }
  }
  get ActivateActions() {
    return this.R0n?.EnterActions;
  }
  get DeactivateActions() {
    return this.R0n?.ExitActions;
  }
};
SceneItemGravityComponent = SceneItemGravityComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(156)], SceneItemGravityComponent);
exports.SceneItemGravityComponent = SceneItemGravityComponent; //# sourceMappingURL=SceneItemGravityComponent.js.map