"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraClimbController = undefined;
const UE = require("ue");
const Time_1 = require("../../../Core/Common/Time");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StateBase_1 = require("../../../Core/Utils/StateMachine/StateBase");
const StateMachine_1 = require("../../../Core/Utils/StateMachine/StateMachine");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GlobalData_1 = require("../../GlobalData");
const CameraUtility_1 = require("../CameraUtility");
const CameraControllerBase_1 = require("./CameraControllerBase");
const IS_DEBUG = false;
class DefaultState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.gle = 0;
  }
  OnEnter() {
    this.gle = 0;
  }
  OnUpdate(t) {
    this.gle += t * this.Owner.ElapseTimeScale;
    if (this.gle > this.Owner.PrepTime) {
      this.StateMachine.Switch(2);
    }
  }
}
class CenterState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.fle = Rotator_1.Rotator.Create();
    this.ple = Rotator_1.Rotator.Create();
    this.gle = 0;
    this.Gue = Rotator_1.Rotator.Create();
  }
  CanReEnter() {
    return true;
  }
  OnReEnter() {
    this.OnEnter();
  }
  OnEnter() {
    if (this.Owner.Camera.IsInNormalGravityMode()) {
      this.fle.DeepCopy(this.Owner.Camera.CurrentCamera.ArmRotation);
      this.ple.DeepCopy(this.Owner.Camera.PlayerRotator);
    } else {
      CameraUtility_1.CameraUtility.GetRotatorInGravity(this.Owner.Camera.CurrentCamera.ArmRotation, this.fle);
      this.ple.DeepCopy(this.Owner.Camera.PlayerRotatorInGravity);
    }
    this.gle = 0;
  }
  OnUpdate(t) {
    var i;
    if (this.Owner.Camera.IsModifiedArmRotationPitch || this.Owner.Camera.IsModifiedArmRotationYaw) {
      this.StateMachine.Switch(0);
    } else {
      i = t / this.Owner.FadeInCenterTime * this.Owner.AdditionalArmLength * this.Owner.ElapseTimeScale;
      this.Owner.Camera.DesiredCamera.ArmLength = this.Owner.Camera.CurrentCamera.ArmLength + i;
      this.Owner.Camera.IsModifiedArmLength = true;
      this.gle += t;
      i = this.gle / this.Owner.FadeInCenterTime;
      i = MathUtils_1.MathUtils.BlendEaseIn(0, 1, i, this.Owner.CenterStateBlendInExp);
      Rotator_1.Rotator.Lerp(this.fle, this.ple, i, this.Gue);
      if (this.Owner.Camera.IsInNormalGravityMode()) {
        this.Owner.Camera.DesiredCamera.ArmRotation.DeepCopy(this.Gue);
      } else {
        CameraUtility_1.CameraUtility.SetRotatorInGravity(this.Owner.Camera.DesiredCamera.ArmRotation, this.Gue);
      }
      this.Owner.Camera.IsModifiedArmRotationPitch = true;
      this.Owner.Camera.IsModifiedArmRotationYaw = true;
      if (this.gle > this.Owner.FadeInCenterTime) {
        this.StateMachine.Switch(2);
      }
    }
  }
}
class ReadyState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.gle = 0;
  }
  OnEnter() {
    this.gle = 0;
  }
  OnUpdate(t) {
    if (this.Owner.Camera.IsModifiedArmRotationPitch || this.Owner.Camera.IsModifiedArmRotationYaw) {
      this.StateMachine.Switch(0);
    } else if (this.Owner.IsMoving) {
      this.gle += t * this.Owner.ElapseTimeScale;
      if (this.gle > this.Owner.MoveDelayTime) {
        this.StateMachine.Switch(3);
      }
    } else {
      this.gle = 0;
    }
  }
}
class AdjustState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.vle = false;
    this.DRc = Vector_1.Vector.Create();
    this.Dce = Vector_1.Vector.Create();
  }
  OnEnter() {
    this.vle = false;
  }
  OnUpdate(t) {
    var i;
    var s;
    var h;
    if (this.Owner.Camera.IsModifiedArmRotationPitch || this.Owner.Camera.IsModifiedArmRotationYaw) {
      this.StateMachine.Switch(0);
    } else if (this.Owner.IsMoving) {
      this.Owner.Camera.PlayerRotator.Vector(this.DRc);
      this.Owner.UpdateInterp(t, this.Owner.DefaultInterpSpeed, this.Owner.MoveDirection);
      this.Owner.Camera.DesiredCamera.ArmRotation.Vector(this.Dce);
      if (!this.Owner.Camera.IsInNormalGravityMode()) {
        CameraUtility_1.CameraUtility.GetVectorInGravity(this.DRc, this.DRc);
        CameraUtility_1.CameraUtility.GetVectorInGravity(this.Dce, this.Dce);
      }
      if (!(i = Math.abs(Math.acos(Vector_1.Vector.DotProduct(this.DRc, this.Dce)) * MathUtils_1.MathUtils.RadToDeg) <= this.Owner.ApplicableAngleWithCharacter) && this.vle) {
        s = Vector_1.Vector.Create();
        this.DRc.CrossProduct(this.Dce, s);
        h = Vector_1.Vector.Create();
        if (s.Normalize()) {
          this.DRc.RotateAngleAxis(this.Owner.ApplicableAngleWithCharacter, s, h);
        } else {
          h.DeepCopy(this.DRc);
        }
        h.Rotation(this.Owner.Camera.DesiredCamera.ArmRotation);
        this.Owner.Camera.IsModifiedArmRotationPitch = true;
        this.Owner.Camera.IsModifiedArmRotationYaw = true;
        this.vle = true;
      } else {
        this.vle = i;
      }
      if (!MathUtils_1.MathUtils.IsNearlyEqual(this.Owner.Camera.CurrentCamera.ArmLength, this.Owner.DefaultArmLength)) {
        s = this.Owner.DefaultArmLength - this.Owner.Camera.CurrentCamera.ArmLength;
        h = this.Owner.ArmLengthSpeed * t;
        if (Math.abs(h) > Math.abs(s)) {
          this.Owner.Camera.DesiredCamera.ArmLength = this.Owner.DefaultArmLength;
        } else {
          this.Owner.Camera.DesiredCamera.ArmLength = this.Owner.Camera.CurrentCamera.ArmLength + (h = s > 0 ? h : -h);
        }
        this.Owner.Camera.IsModifiedArmLength = true;
      }
    } else {
      this.StateMachine.Switch(4);
    }
  }
}
class FadeOutState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.gle = 0;
  }
  OnEnter() {
    this.gle = 0;
  }
  OnUpdate(t) {
    var i;
    if (this.Owner.Camera.IsModifiedArmRotationPitch || this.Owner.Camera.IsModifiedArmRotationYaw) {
      this.StateMachine.Switch(0);
    } else if (this.Owner.IsMoving) {
      this.StateMachine.Switch(3);
    } else if (this.gle >= this.Owner.FadeOutDuration) {
      this.StateMachine.Switch(2);
    } else {
      this.gle += t;
      i = MathUtils_1.MathUtils.RangeClamp(this.gle, 0, this.Owner.FadeOutDuration, this.Owner.DefaultInterpSpeed, 0);
      this.Owner.UpdateInterp(t, i, this.Owner.MoveDirection);
    }
  }
}
class ReachThePeakState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments);
    this.Mle = Vector_1.Vector.Create();
    this.Ele = Rotator_1.Rotator.Create();
  }
  OnEnter() {
    this.Ele.DeepCopy(this.Owner.Camera.PlayerRotator);
    this.Ele.Pitch = this.Owner.ReachThePeakPitch;
    this.Ele.Vector(this.Mle);
  }
  OnUpdate(t) {
    if (this.Owner.Camera.IsModifiedArmRotationPitch || this.Owner.Camera.IsModifiedArmRotationYaw) {
      this.StateMachine.Switch(0);
    } else {
      this.Owner.UpdateInterp(t, this.Owner.ReachThePeakSpeed, this.Mle);
    }
  }
}
class CameraClimbController extends CameraControllerBase_1.CameraControllerBase {
  constructor(t) {
    super(t);
    this.FadeOutDuration = -0;
    this.PrepTime = -0;
    this.MoveDelayTime = -0;
    this.DefaultInterpSpeed = 0;
    this.ReferToMoveSpeed = 0;
    this.AdditionalArmLength = 0;
    this.FadeInCenterTime = -0;
    this.CenterStateBlendInExp = 0;
    this.DefaultArmLength = 0;
    this.ArmLengthSpeed = 0;
    this.DesiredAngle = 0;
    this.PitchUpRate = 0;
    this.PitchDownRate = 0;
    this.ApplicableAngleWithCharacter = 0;
    this.StopInputDelay = 0;
    this.ReachThePeakSpeed = 0;
    this.ReachThePeakPitch = 0;
    this.LargeAngleTurnThreshold = 0;
    this.LargeAngleTurnDelay = 0;
    this.StartInputDelay = 0;
    this.ElapseTimeScale = 1;
    this.IsMoving = false;
    this.Sle = Vector_1.Vector.Create();
    this.yle = 0;
    this.Ile = 0;
    this.MoveDirection = Vector_1.Vector.Create();
    this.URc = Vector_1.Vector.Create();
    this.BRc = Vector_1.Vector.Create();
    this.Lz = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.OnCharClimbStartExit = (t, i) => {
      if (this.Camera.CharacterEntityHandle.Id === t && this.Tle(i)) {
        if (this.Lle.CurrentState === 3) {
          this.Lle.Switch(5);
        } else if (this.Lle.CurrentState === 1) {
          this.Lle.Switch(0);
        }
      }
    };
    this.Lle = new StateMachine_1.StateMachine(this);
    this.Lle.AddState(0, DefaultState);
    this.Lle.AddState(1, CenterState);
    this.Lle.AddState(2, ReadyState);
    this.Lle.AddState(3, AdjustState);
    this.Lle.AddState(4, FadeOutState);
    this.Lle.AddState(5, ReachThePeakState);
    this.Lle.Start(0);
  }
  Name() {
    return "ClimbController";
  }
  OnInit() {
    this.SetConfigMap(1, "FadeOutDuration");
    this.SetConfigMap(2, "PrepTime");
    this.SetConfigMap(3, "MoveDelayTime");
    this.SetConfigMap(4, "DefaultInterpSpeed");
    this.SetConfigMap(5, "ReferToMoveSpeed");
    this.SetConfigMap(6, "AdditionalArmLength");
    this.SetConfigMap(7, "FadeInCenterTime");
    this.SetConfigMap(8, "CenterStateBlendInExp");
    this.SetConfigMap(9, "DefaultArmLength");
    this.SetConfigMap(10, "ArmLengthSpeed");
    this.SetConfigMap(11, "DesiredAngle");
    this.SetConfigMap(13, "PitchUpRate");
    this.SetConfigMap(12, "PitchDownRate");
    this.SetConfigMap(14, "ApplicableAngleWithCharacter");
    this.SetConfigMap(16, "ReachThePeakSpeed");
    this.SetConfigMap(17, "ReachThePeakPitch");
    this.SetConfigMap(18, "LargeAngleTurnThreshold");
    this.SetConfigMap(19, "LargeAngleTurnDelay");
    this.SetConfigMap(15, "StopInputDelay");
    this.SetConfigMap(20, "StartInputDelay");
  }
  OnEnable() {
    var t = this.Camera.CharacterEntityHandle.Entity.GetComponent(34).GetExitClimbType();
    if (this.Tle(t)) {
      this.Lle.Switch(0);
    } else {
      this.Lle.Switch(1);
    }
    this.Camera.CameraAdjustController.Lock(this);
    this.Camera.CameraAutoController.Lock(this);
    this.Camera.CameraSidestepController.Lock(this);
    this.Sle.Reset();
    this.yle = Time_1.Time.Now + this.StartInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.Ile = 0;
    this.IsMoving = false;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharClimbStartExit, this.OnCharClimbStartExit);
  }
  OnDisable() {
    this.Camera.CameraAdjustController.Unlock(this);
    this.Camera.CameraAutoController.Unlock(this);
    this.Camera.CameraSidestepController.Unlock(this);
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharClimbStartExit, this.OnCharClimbStartExit)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharClimbStartExit, this.OnCharClimbStartExit);
    }
  }
  UpdateCustomEnableCondition() {
    return this.Camera.ContainsTag(504239013);
  }
  UpdateInternal(t) {
    var i;
    this.Camera.CharacterEntityHandle.Entity.GetComponent(62).GetMoveVector(this.Lz);
    if (this.Dle(this.Lz)) {
      if (Time_1.Time.Now > this.yle) {
        this.Sle.DeepCopy(this.Lz);
        this.Lz.Set(0, this.Sle.Y, this.Sle.X);
        this.Camera.Character.CharacterActorComponent.ActorQuatProxy.RotateVector(this.Lz, this.MoveDirection);
        this.IsMoving = true;
        i = this.Camera.CharacterEntityHandle.Entity.GetComponent(178).Speed;
        this.ElapseTimeScale = i > this.ReferToMoveSpeed ? i / this.ReferToMoveSpeed : 1;
        this.yle = Time_1.Time.Now + this.LargeAngleTurnDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
      } else if (this.IsMoving && Time_1.Time.Now > this.Ile) {
        this.IsMoving = false;
        this.yle = Time_1.Time.Now + this.StartInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
      }
    } else if (this.IsMoving) {
      i = this.Camera.CharacterEntityHandle.Entity.GetComponent(178).Speed;
      this.ElapseTimeScale = i > this.ReferToMoveSpeed ? i / this.ReferToMoveSpeed : 1;
    }
    this.Lle.Update(t);
  }
  Dle(t) {
    var i = t.X || t.Y;
    if (this.IsMoving) {
      if (i) {
        this.Ile = Time_1.Time.Now + this.StopInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
        if (this.Sle.X * t.X + this.Sle.Y * t.Y > Math.cos(this.LargeAngleTurnThreshold * MathUtils_1.MathUtils.DegToRad)) {
          this.yle = Time_1.Time.Now + this.LargeAngleTurnDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
          t = this.Camera.CharacterEntityHandle.Entity.GetComponent(178).Speed;
          this.ElapseTimeScale = t > this.ReferToMoveSpeed ? t / this.ReferToMoveSpeed : 1;
          return false;
        }
      } else {
        this.yle = Time_1.Time.Now + this.LargeAngleTurnDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
      }
    } else {
      this.Ile = Time_1.Time.Now + this.StopInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
      if (!i) {
        this.yle = Time_1.Time.Now + this.StartInputDelay * TimeUtil_1.TimeUtil.InverseMillisecond;
        return false;
      }
    }
    return true;
  }
  UpdateInterp(t, i, s) {
    var h = this.Camera.Character.CharacterActorComponent.ActorForwardProxy;
    CameraUtility_1.CameraUtility.GetVectorInGravity(h, this.URc);
    CameraUtility_1.CameraUtility.GetVectorInGravity(s, this.BRc);
    this.Lz.DeepCopy(this.URc);
    this.Tz.DeepCopy(this.BRc);
    var h = Math.abs(Math.acos(this.Lz.DotProduct(this.Tz)) * MathUtils_1.MathUtils.RadToDeg);
    if (h > this.DesiredAngle) {
      this.Lz.CrossProduct(this.Tz, this.Tz);
      this.Tz.CrossProduct(this.Lz, this.Tz);
      h = this.DesiredAngle * MathUtils_1.MathUtils.DegToRad;
      this.Lz.MultiplyEqual(Math.cos(h));
      this.Tz.MultiplyEqual(Math.sin(h));
      this.Lz.AdditionEqual(this.Tz);
    } else {
      this.Lz.DeepCopy(this.BRc);
    }
    if (IS_DEBUG) {
      h = Vector_1.Vector.Create();
      this.Camera.Character.CharacterActorComponent.ActorForwardProxy.CrossProduct(s, h);
      e = Vector_1.Vector.Create();
      s.RotateAngleAxis(-this.DesiredAngle, h, e);
      (s = Vector_1.Vector.Create(this.Camera.PlayerLocation)).AdditionEqual(h.Multiply(100, Vector_1.Vector.Create()));
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, this.Camera.PlayerLocation.ToUeVector(), s.ToUeVector(), new UE.LinearColor(1, 0, 0, 1), 0, 5);
      (h = Vector_1.Vector.Create(this.Camera.PlayerLocation)).AdditionEqual(e.Multiply(100, Vector_1.Vector.Create()));
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, this.Camera.PlayerLocation.ToUeVector(), h.ToUeVector(), new UE.LinearColor(0, 1, 0, 1), 0, 5);
    }
    (this.Camera.IsInNormalGravityMode() ? this.Camera.CurrentCamera.ArmRotation : (CameraUtility_1.CameraUtility.GetRotatorInGravity(this.Camera.CurrentCamera.ArmRotation, this.Gue), this.Gue)).Vector(this.Tz);
    var s = this.Tz.X * this.URc.Y - this.Tz.Y * this.URc.X;
    var e = this.Tz.X * this.Lz.Y - this.Tz.Y * this.Lz.X;
    var h = this.Lz.X * this.URc.Y - this.Lz.Y * this.URc.X;
    var e = s * e < 0 && s * h < 0;
    MathUtils_1.MathUtils.LerpDirect2dByMaxAngle(this.Tz, this.Lz, this.Lz.Z < 0 ? this.PitchDownRate : this.PitchUpRate, t * i * this.ElapseTimeScale, e, this.Lz);
    if (this.Camera.IsInNormalGravityMode()) {
      s = this.Camera.DesiredCamera.ArmRotation;
      MathUtils_1.MathUtils.LookRotationForwardFirst(this.Lz, Vector_1.Vector.UpVectorProxy, s);
    } else {
      this.Lz.Rotation(this.Gue);
      CameraUtility_1.CameraUtility.SetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Gue);
    }
    this.Camera.IsModifiedArmRotationPitch = true;
    this.Camera.IsModifiedArmRotationYaw = true;
  }
  Tle(t) {
    return t === 2 || t === 7 || t === 8 || t === 9;
  }
}
exports.CameraClimbController = CameraClimbController;
//# sourceMappingURL=CameraClimbController.js.map