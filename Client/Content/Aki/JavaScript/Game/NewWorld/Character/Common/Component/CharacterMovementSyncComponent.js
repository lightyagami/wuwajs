"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var r = arguments.length;
  var o = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (h = t[a]) {
        o = (r < 3 ? h(o) : r > 3 ? h(e, i, o) : h(e, i)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterMovementSyncComponent = undefined;
const Cpp = require("cpp");
const puerts_1 = require("puerts");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const BasePlatform_1 = require("../../../Common/BasePlatform");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const BaseMovementSyncComponent_1 = require("./BaseMovementSyncComponent");
class FastMoveSample {
  constructor() {
    this.Location = Vector_1.Vector.Create();
    this.Rotation = Rotator_1.Rotator.Create();
    this.LinearVelocity = Vector_1.Vector.Create();
    this.MovementMode = 0;
  }
  ClearObject() {
    return true;
  }
}
class ReadOnlyFastMoveSample {
  constructor() {
    this.Location = Vector_1.Vector.Create();
    this.Rotation = Rotator_1.Rotator.Create();
    this.LinearVelocity = Vector_1.Vector.Create();
    this.MovementMode = 0;
    this.IsInit = false;
  }
  ClearObject() {
    this.IsInit = false;
    this.Location = Vector_1.Vector.Create();
    this.Rotation = Rotator_1.Rotator.Create();
    this.LinearVelocity = Vector_1.Vector.Create();
    return true;
  }
}
let CharacterMovementSyncComponent = class CharacterMovementSyncComponent extends BaseMovementSyncComponent_1.BaseMovementSyncComponent {
  constructor() {
    super(...arguments);
    this.LastMovementMode = 0;
    this.LastReceivedMovementMode = 0;
    this.LastTimeScale = 1;
    this.yHr = 255;
    this.IHr = 65535;
    this.Nce = undefined;
    this.MHr = undefined;
    this.rJo = undefined;
    this.uwl = undefined;
    this.LY1 = undefined;
    this.QHr = new FastMoveSample();
    this.XHr = new ReadOnlyFastMoveSample();
    this.$Hr = this.XHr;
    this.Kha = 0;
    this.ene = (t, e) => {
      this.Kha = e;
    };
  }
  get isn() {
    return this.ActorComp;
  }
  DefaultEnableMovementSync() {
    return true;
  }
  GetIsMoving() {
    var t = this.$Hr.MovementMode;
    var e = this.Entity.TimeDilation * (this.TimeScaleComp?.CurrentTimeScale ?? 1);
    return this.LastMovementMode !== t || this.rJo?.DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection || this.LastHasBaseMovement || !this.$Hr.LinearVelocity.IsZero() || !this.LastLocation.Equals(this.$Hr.Location) || !this.LastRotation.Equals(this.$Hr.Rotation) || this.LastTimeScale !== e;
  }
  GetImportantMove(t) {
    var e = this.$Hr.MovementMode;
    var i = this.Entity.TimeDilation * (this.TimeScaleComp?.CurrentTimeScale ?? 1);
    var e = this.LastMovementMode !== e || this.LastHasBaseMovement !== this.MoveComp.HasBaseMovement || this.LastTimeScale !== i;
    return e ||= !t && this.LastMove;
  }
  GetSecondaryImportantMove() {
    return this.Kha > 0 ?? this.LastMoveSample?.DWn !== this.rJo.MoveState;
  }
  CustomAfterTickInternal(t) {
    this.YHr(t);
    var e = this.uwl && (this.uwl.Seat >= 0 || this.uwl.IsAttachToMoveSceneItem);
    if (this.CacheBaseEntityHandle && this.TransformFromRelativeMove(this.CacheBaseEntityHandle, this.CacheRelativeLocation, this.CacheRelativeRotator, this.CacheFinalLocation, this.CacheFinalRotator) && !this.ActorComp?.IsMoveAutonomousProxy && !e) {
      this.ActorComp.SetActorLocationAndRotation(this.CacheFinalLocation.ToUeVector(), this.CacheFinalRotator.ToUeRotator(), "角色移动同步.添加简单位移(帧末修正相对位置)", false);
      this.LastRelativeMove = true;
    }
    super.CustomAfterTickInternal(t);
  }
  TickReplaySamples() {
    if (!this.uwl || !(this.uwl.Seat >= 0)) {
      super.TickReplaySamples();
    }
  }
  YHr(t) {
    if (this.isn?.IsActorMoveInfoCache) {
      if (!this.XHr.IsInit) {
        this.XHr.IsInit = true;
        this.XHr.Location = this.isn?.ActorLocationProxy;
        this.XHr.Rotation = this.isn?.ActorRotationProxy;
        this.XHr.LinearVelocity = this.isn?.ActorVelocityProxy;
      }
      this.XHr.MovementMode = this.MoveComp.CharacterMovement.MovementMode;
      this.$Hr = this.XHr;
    } else {
      Cpp.FFastMoveReplaySample.UpdateFastMoveSampleBase(this.QHr, this.QHr.Location, this.QHr.Rotation, this.QHr.LinearVelocity, this.isn.Actor, this.MoveComp.CharacterMovement);
      this.$Hr = this.QHr;
    }
  }
  OnStart() {
    return !!super.OnStart() && (this.Nce = this.Entity.GetComponent(62), this.MHr = this.Entity.GetComponent(35), this.rJo = this.Entity.GetComponent(101), this.uwl = this.Entity.GetComponent(229), this.LY1 = this.Entity.GetComponent(47), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene), true);
  }
  OnEnd() {
    return !!super.OnEnd() && (EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene), true);
  }
  ApplyInput(t, e) {
    var i;
    if (this.Nce) {
      if (t !== this.IHr) {
        i = t & this.yHr;
        this.tjr(t >> 8, this.TmpVector);
        this.tjr(i, this.TmpVector2);
        this.Nce.SetMoveVectorCache(this.TmpVector, this.TmpVector2);
        this.isn?.SetInputRotatorByNumber(0, i / this.yHr * 360, 0);
      } else {
        this.Nce.ResetMoveVectorCache();
        this.isn?.SetInputRotator(e);
      }
    }
  }
  tjr(t, e) {
    if (t === this.yHr) {
      e.Reset();
    } else {
      t = MathUtils_1.MathUtils.RangeClamp(t, 0, this.yHr, 0, Math.PI * 2);
      e.X = Math.cos(t);
      e.Y = Math.sin(t);
    }
  }
  GetCurrentMoveSample() {
    var t = Protocol_1.Aki.Protocol.Wks.create();
    t.P5n = {
      X: 0,
      Y: 0,
      Z: 0
    };
    t.f8n = {
      X: 0,
      Y: 0,
      Z: 0
    };
    t.g8n = {
      Pitch: 0,
      Roll: 0,
      Yaw: 0
    };
    var e = this.Nce?.QueryInputAxis(InputEnums_1.EInputAxis.MoveForward) ?? 0;
    var i = this.Nce?.QueryInputAxis(InputEnums_1.EInputAxis.MoveRight) ?? 0;
    Cpp.FFastMoveReplaySample.UpdateFastMoveSampleInput(t, t.P5n, t.g8n, t.f8n, this.isn?.Actor, this.MoveComp.CharacterMovement, e, i, this.yHr, CameraController_1.CameraController.CameraRotator.Yaw);
    if (ModelManager_1.ModelManager.GameModeModel?.InstanceType === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance && t.P5n.X === 0 && t.P5n.Y === 0 && t.P5n.Z === 0) {
      CombatLog_1.CombatLog.Warn("Move", this.Entity, "移动坐标点为0", ["Component", !!this.isn], ["Actor", !!this.isn?.Actor], ["Location", t.P5n], ["LinearVelocity", t.f8n], ["Rotation", t.g8n]);
    }
    t.DWn = this.rJo?.MoveState ?? 0;
    t.GWn = Time_1.Time.CombatServerTime;
    t.J8n = Time_1.Time.NowSeconds;
    if (this.Entity.GetTickInterval() > 1 && this.LastLogicTickTime > 0 && this.NowLogicTickTime > 0) {
      t.jWn = (this.NowLogicTickTime - this.LastLogicTickTime) * 1000;
    }
    t.NWn = Net_1.Net.RttMs;
    t.qWn = this.Entity.TimeDilation * (this.TimeScaleComp?.CurrentTimeScale ?? 1);
    if (this.MHr) {
      e = this.MHr.SlideForward;
      t.PWn = {
        X: e.X,
        Y: e.Y,
        Z: e.Z
      };
    }
    if (this.MoveComp?.BasePlatform) {
      t.kWn = this.GetRelativeMoveSample(this.MoveComp.BasePlatform);
    } else if (this.LastHasBaseMovement) {
      if (this.LastBasePlatform) {
        t.kWn = this.GetRelativeMoveSample(this.LastBasePlatform, true);
      } else {
        this.LastHasBaseMovement = false;
      }
    }
    t.r5n = this.Kha;
    this.Kha = 0;
    this.LastMoveSample = t;
    this.CompressData(t);
    return t;
  }
  GetRelativeMoveSample(t, e = false) {
    var i;
    var s;
    var h;
    if (t.EntityHandle?.Valid && (!e || !t.CheckLeave(this.Entity, this.$Hr.Location))) {
      e = this.ActorComp.ActorRotation;
      h = this.isn.ScaledHalfHeight;
      (s = this.isn.Actor.D_K2_GetActorLocation()).Z -= h;
      h = (0, puerts_1.$ref)(undefined);
      i = (0, puerts_1.$ref)(undefined);
      t.TransformToRelativeSpace(s, e, h, i);
      s = (0, puerts_1.$unref)(h);
      e = (0, puerts_1.$unref)(i);
      (h = Protocol_1.Aki.Protocol.kWn.create()).FWn = MathUtils_1.MathUtils.NumberToLong(t.EntityHandle.CreatureDataId);
      h.HWn = {
        X: s.X,
        Y: s.Y,
        Z: s.Z
      };
      h.VWn = {
        Pitch: e.Pitch,
        Roll: e.Roll,
        Yaw: e.Yaw
      };
      return h;
    }
    this.LastHasBaseMovement = false;
    this.LastBasePlatform = undefined;
  }
  RecordLastData(t = false) {
    this.LastMovementMode = this.$Hr.MovementMode;
    if (this.MoveComp?.HasBaseMovement && this.MoveComp?.BasePlatform && (this.LastHasBaseMovement = this.MoveComp.HasBaseMovement, this.MoveComp.BasePlatform !== this.LastBasePlatform)) {
      this.LastBasePlatform = this.MoveComp.BasePlatform;
      this.LastBasePlatform.OnCharacterEnter(this.Entity, this.MoveComp.CharacterMovement);
    }
    this.LastLocation.DeepCopy(this.$Hr.Location);
    this.LastRotation.DeepCopy(this.$Hr.Rotation);
    this.LastMoveAutonomousProxy = this.ActorComp.IsMoveAutonomousProxy;
    this.LastMove = t;
    t = this.Entity.TimeDilation * (this.TimeScaleComp?.CurrentTimeScale ?? 1);
    this.LastTimeScale = t;
  }
  CalcRelativeMove(t, e, i, s, h) {
    if (!t.wWn || !e.wWn) {
      return false;
    }
    let r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.wWn.BaseMovementEntityId);
    if (!(r = r || ModelManager_1.ModelManager.CreatureModel.GetEntityWithDelayRemoveContainer(t.wWn.BaseMovementEntityId))) {
      return false;
    }
    var o = BasePlatform_1.BasePlatformController.GetBasePlatformByEntity(r);
    if (!o) {
      return false;
    }
    Vector_1.Vector.Lerp(t.wWn.RelativeLocation, e.wWn.RelativeLocation, i, s);
    Rotator_1.Rotator.Lerp(t.wWn.RelativeRotation, e.wWn.RelativeRotation, i, h);
    t = (0, puerts_1.$ref)(undefined);
    e = (0, puerts_1.$ref)(undefined);
    o.TransformFromRelativeSpace(s.ToUeVector(), h.ToUeRotator(), t, e);
    s.DeepCopy((0, puerts_1.$unref)(t));
    i = this.isn.ScaledHalfHeight;
    s.Z += i;
    h.DeepCopy((0, puerts_1.$unref)(e));
    return true;
  }
  CheckRelativeMove(e, i, s, h, r) {
    if (e.wWn && i.wWn) {
      let t = ModelManager_1.ModelManager.CreatureModel.GetEntity(e.wWn.BaseMovementEntityId);
      if (t = t || ModelManager_1.ModelManager.CreatureModel.GetEntityWithDelayRemoveContainer(e.wWn.BaseMovementEntityId)) {
        if (BasePlatform_1.BasePlatformController.GetBasePlatformByEntity(t)) {
          Vector_1.Vector.Lerp(e.wWn.RelativeLocation, i.wWn.RelativeLocation, s, h);
          Rotator_1.Rotator.Lerp(e.wWn.RelativeRotation, i.wWn.RelativeRotation, s, r);
          return t;
        }
      }
    }
  }
  TransformFromRelativeMove(t, e, i, s, h) {
    var r;
    var o;
    var t = BasePlatform_1.BasePlatformController.GetBasePlatformByEntity(t);
    return !!t && (r = (0, puerts_1.$ref)(undefined), o = (0, puerts_1.$ref)(undefined), t.TransformFromRelativeSpace(e.ToUeVector(), i.ToUeRotator(), r, o), s.DeepCopy((0, puerts_1.$unref)(r)), t = this.isn.ScaledHalfHeight, s.Z += t, h.DeepCopy((0, puerts_1.$unref)(o)), true);
  }
  ApplyMoveSample(t, e, i, s, h, r, o, a, n, _, l) {
    super.ApplyMoveSample(t, e, i, s, h, r, o, a, n, _, l);
    this.MoveComp?.SetForceSpeed(s);
    this.ControllerPlayerId = r;
    this.MHr?.SlideForward.DeepCopy(h);
    if (this.LY1?.AiController?.IsWaitingReceiveControl()) {
      this.LastReceivedMovementMode = t;
    } else {
      this.isn?.Actor.KuroSetMovementMode({
        Mode: t,
        Context: "[CharacterMovementSyncComponent.ApplyMoveSample]"
      });
    }
    this.ApplyInput(o, i);
    this.CacheFinalRotator.Reset();
    this.CacheFinalRotator.Pitch = a;
    this.isn.Actor.Controller?.SetControlRotation(this.CacheFinalRotator.ToUeRotator());
    this.TimeScaleComp?.SetMoveSyncTimeScale(n);
    let p = 0;
    if (this.LastReceiveMoveSample) {
      p = (this.LastReceiveMoveSample.J8n - Time_1.Time.NowSeconds) * 1000;
    }
    this.ReportMoveDataApplyInfo(Time_1.Time.CombatServerTime - _, p, l);
  }
  ClearBasePlatform() {
    this.LastHasBaseMovement = false;
    this.LastBasePlatform = undefined;
  }
};
CharacterMovementSyncComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(68)], CharacterMovementSyncComponent);
exports.CharacterMovementSyncComponent = CharacterMovementSyncComponent; //# sourceMappingURL=CharacterMovementSyncComponent.js.map