"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultLevelSequencePlayParam = exports.FollowTargetSetting = exports.BindTargetSetting = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const CharacterNameDefines_1 = require("../../NewWorld/Character/Common/CharacterNameDefines");
const UiManager_1 = require("../../Ui/UiManager");
const CAMERA_TAG = new UE.FName("SequenceCamera");
const PROFILE_KEY = "SimpleLevelSequenceActor_CheckCollision_Camera";
class BindTargetSetting {
  constructor(t, i, s, h, e, r, o, a) {
    this.BindTargetType = t;
    this.AttachSocketName = i;
    this.AttachLocationOffset = s;
    this.AttachRotatorOffset = h;
    this.SpecificLocationOffset = e;
    this.SpecificRotatorOffset = r;
    this.WorldLocation = o;
    this.WorldRotation = a;
  }
  IsBindToTarget() {
    return this.BindTargetType === 0;
  }
  IsBindToTargetAndPutWorld() {
    return this.BindTargetType === 1;
  }
  IsBindToWorld() {
    return this.BindTargetType === 2;
  }
}
exports.BindTargetSetting = BindTargetSetting;
class FollowTargetSetting {
  constructor(t, i, s, h, e, r, o) {
    this.IsFollowTarget = t;
    this.IsFollowTargetPitch = i;
    this.PitchFollowSpeed = s;
    this.IsFollowTargetYaw = h;
    this.YawFollowSpeed = e;
    this.IsFollowTargetAngle = r;
    this.AngleFollowSpeed = o;
  }
}
exports.FollowTargetSetting = FollowTargetSetting;
class DefaultLevelSequencePlayParam {
  constructor(t, i, s, h, e) {
    this.InTime = t;
    this.OutTime = i;
    this.BindSetting = s;
    this.FollowSetting = h;
    this.Target = e;
    this.MaxDelayUpdateFrame = 4;
    this.InitPlayerRotator = Rotator_1.Rotator.Create();
    this.InitPlayerFloorLocation = Vector_1.Vector.Create();
    this.DelayUpdateFrame = 0;
    this.PlayedTime = 0;
    this.TimeLength = 0;
  }
}
exports.DefaultLevelSequencePlayParam = DefaultLevelSequencePlayParam;
class SimpleLevelSequenceActor {
  constructor(t) {
    this.bPe = undefined;
    this.qPe = undefined;
    this.Oxr = undefined;
    this.vrf = undefined;
    this.Tae = undefined;
    this.GPe = UE.NewArray(UE.Actor);
    this.NPe = 0;
    this.OPe = 0;
    this.kPe = 0;
    this.FPe = 0;
    this.VPe = 0;
    this.HPe = 0;
    this.jPe = 0;
    this.WPe = 0;
    this.KPe = false;
    this.QPe = false;
    this.XPe = false;
    this.$Pe = "";
    this.qQc = "";
    this.rT1 = false;
    this.oT1 = -1;
    this.nT1 = 1;
    this.sT1 = undefined;
    this.aT1 = 0;
    this.YPe = false;
    this.JPe = false;
    this.X2n = false;
    this.ZBf = false;
    this.zPe = 1;
    this.exe = undefined;
    this.txe = false;
    this.ixe = 0;
    this.oxe = 0;
    this.rxe = false;
    this.nxe = 1;
    this.sxe = false;
    this.yrf = undefined;
    this.Srf = TickSystem_1.TickSystem.InvalidId;
    this.zLf = false;
    this.Fse = undefined;
    this.fsf = Rotator_1.Rotator.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.e7o = Quat_1.Quat.Create();
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.pz = Vector_1.Vector.Create();
    this.tdc = Vector_1.Vector.Create();
    this.Mme = new UE.TransformDouble(new UE.Rotator(0, 0, 0), new UE.VectorDouble(0, 0, 0), new UE.VectorDouble(1, 1, 1));
    this.sZu = undefined;
    this.uIn = undefined;
    this.Otr = undefined;
    this.hT1 = () => {
      if (ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.GetComponent(10)?.GetIsInCinematic() || this.sxe) {
        this.PlayLevelSequence();
      } else if (this.XPe || !this.hxe) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 45, "DoPlayToMark为JumpToEnd或者没有camera轨道", ["CameraMode", ModelManager_1.ModelManager.CameraModel?.CameraMode]);
        }
        this.PlayLevelSequence();
      } else {
        if (this.YPe) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCore", 45, "DoPlayToMark非首次绑定", ["CameraMode", ModelManager_1.ModelManager.CameraModel?.CameraMode]);
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 45, "DoPlayToMark首次绑定", ["CameraMode", ModelManager_1.ModelManager.CameraModel?.CameraMode]);
        }
        if (this.jPe === 1) {
          this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
            this._xe();
          }, () => {
            this.PlayLevelSequence();
          });
        } else {
          this._xe(() => {
            this.PlayLevelSequence();
          });
        }
      }
    };
    this.B_e = () => {
      this.exe = undefined;
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(this);
      this.rxe = false;
      ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(8);
      if (this.Srf !== TickSystem_1.TickSystem.InvalidId) {
        TickSystem_1.TickSystem.Remove(this.Srf);
        this.Srf = TickSystem_1.TickSystem.InvalidId;
      }
      if (this.yrf && this.yrf.BindSetting.IsBindToTarget()) {
        this.Oxr?.K2_DetachFromActor(1, 1, 1);
      }
      this.yrf = undefined;
      if (!this.JPe && !ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi) {
        ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.SetUiActive(true);
      }
    };
    this.Mrf = t => {
      var i;
      var s;
      var h;
      if (!!this.qPe?.IsValid() && (!this.X2n || !!this.ZBf)) {
        this.ZBf = false;
        this.qPe.bOverrideInstanceData = true;
        h = this.qPe.SequencePlayer;
        this.Tae = Global_1.Global.BaseCharacter;
        if (h?.IsValid() && this.Tae?.IsValid() && this.yrf && ((s = this.yrf.BindSetting).IsBindToTarget() ? (this.cz.DeepCopy(s.AttachLocationOffset), (i = FNameUtil_1.FNameUtil.IsNothing(s.AttachSocketName) ? CharacterNameDefines_1.CharacterNameDefines.ROOT : s.AttachSocketName).op_Equality(CharacterNameDefines_1.CharacterNameDefines.ROOT) || (i = this.Tae.Mesh.D_GetSocketTransform(i, 2), i = this.Tae.Mesh.D_GetSocketTransform(CharacterNameDefines_1.CharacterNameDefines.ROOT, 2).TransformPosition(i.GetLocation()), this.fz.DeepCopy(i), this.cz.AdditionEqual(this.fz)), i = this.Tae.CharacterActorComponent, this.cie.DeepCopy(i.ActorRotationProxy), this.cie.Roll = 0, this.cie.Quaternion(this.e7o), this.e7o.RotateVector(this.cz, this.cz), this.cz.AdditionEqual(i.FloorLocation), this.cie.AdditionEqual(s.AttachRotatorOffset), this.cie.Quaternion(this.e7o), this.Mme.SetLocation(this.cz.ToUeVector()), this.Mme.SetRotation(this.e7o.ToUeQuat()), this.vrf.TransformOrigin = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(this.Mme)) : s.IsBindToTargetAndPutWorld() ? (this.cie.DeepCopy(this.yrf.InitPlayerRotator), this.cie.Roll = 0, this.cie.Quaternion(this.e7o), this.e7o.RotateVector(s.SpecificLocationOffset, this.cz), this.cz.AdditionEqual(this.yrf.InitPlayerFloorLocation), this.cie.AdditionEqual(s.SpecificRotatorOffset), this.cie.Quaternion(this.e7o), this.vrf.TransformOriginActor = undefined, this.Mme.SetLocation(this.cz.ToUeVector()), this.Mme.SetRotation(this.e7o.ToUeQuat()), this.vrf.TransformOrigin = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(this.Mme)) : s.IsBindToWorld() && (s.WorldRotation.Quaternion(this.e7o), this.Mme.SetLocation(s.WorldLocation.ToUeVector()), this.Mme.SetRotation(this.e7o.ToUeQuat()), this.vrf.TransformOrigin = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(this.Mme)), this.yrf.PlayedTime += t * MathUtils_1.MathUtils.MillisecondToSecond, h.PlayToSeconds(this.yrf.PlayedTime), this.yrf.DelayUpdateFrame === this.yrf.MaxDelayUpdateFrame && this.fsf.DeepCopy(this.exe.Camera.K2_GetActorRotation()), this.yrf.FollowSetting.IsFollowTarget && this.yrf.DelayUpdateFrame >= this.yrf.MaxDelayUpdateFrame && (this.fz.DeepCopy(this.Tae.CharacterActorComponent.FloorLocation), this.pz.DeepCopy(this.exe.Camera.D_K2_GetActorLocation()), this.fz.SubtractionEqual(this.pz), this.fz.Normalize(), this.fz.Rotation(this.cie), this.fsf.Vector(this.tdc), this.yrf.FollowSetting.IsFollowTargetAngle ? (Quat_1.Quat.FindBetween(this.fz, this.tdc, this.e7o), i = Math.acos(Vector_1.Vector.DotProduct(this.fz, this.tdc)) * MathUtils_1.MathUtils.RadToDeg, h = (s = this.yrf.FollowSetting.AngleFollowSpeed * t * MathUtils_1.MathUtils.MillisecondToSecond) > 1 || s < 0 ? i : i * s, s = MathUtils_1.MathUtils.Clamp(h / i, 0, 1), MathUtils_1.MathUtils.SqLerpVector(this.tdc, this.fz, s, this.fz), this.fz.Rotation(this.fsf)) : this.yrf.FollowSetting.IsFollowTargetPitch ? (h = this.cie.Pitch, i = this.fsf.Pitch, s = MathUtils_1.MathUtils.WrapAngle(h - i), s = (h = this.yrf.FollowSetting.PitchFollowSpeed * t * MathUtils_1.MathUtils.MillisecondToSecond) > 1 || h < 0 ? s : s * h, this.fsf.Pitch = MathUtils_1.MathUtils.WrapAngle(i + s)) : this.yrf.FollowSetting.IsFollowTargetYaw && (h = this.cie.Yaw, i = this.fsf.Yaw, s = MathUtils_1.MathUtils.WrapAngle(h - i), t = (h = this.yrf.FollowSetting.YawFollowSpeed * t * MathUtils_1.MathUtils.MillisecondToSecond) > 1 || h < 0 ? s : s * h, this.fsf.Yaw = MathUtils_1.MathUtils.WrapAngle(i + t)), this.exe.Camera.K2_SetActorRotation(this.fsf.ToUeRotator(), true)), this.yrf.DelayUpdateFrame++, this.xJf() && (this.zLf = true, this.StopSequence()), this.yrf.PlayedTime >= this.yrf.TimeLength)) {
          this.zLf = true;
          this.StopSequence();
        }
      }
    };
    if ((this.bPe = t).HasBindingTag(CAMERA_TAG, true)) {
      this.hxe = true;
    }
    this.mxe();
  }
  AddOnPauseCallback(t) {
    this.sZu = t;
  }
  ClearOnPausedCallback() {
    this.sZu = undefined;
  }
  AddOnStopCallback(t) {
    this.uIn = t;
  }
  ClearOnStopCallback() {
    this.uIn = undefined;
  }
  AddOnFinishedCallback(t) {
    this.Otr = t;
  }
  ClearOnFinishedCallback() {
    this.Otr = undefined;
  }
  UpdateSettings(t) {
    this.JPe = t ?? false;
  }
  GetPlayer() {
    return this.qPe?.SequencePlayer;
  }
  IsPlaying() {
    return !this.X2n && (this.zPe === 0 || (this.GetPlayer()?.IsPlaying() ?? false));
  }
  ForceSwitchSceneCamera(t) {
    if (this.qPe?.IsValid()) {
      if (this.hxe) {
        this.sxe = true;
        if (t) {
          this.txe = true;
          this._xe(() => {
            UiManager_1.UiManager.OpenView("TimeTrackControlView", undefined, t => {
              if (t) {
                if (!ControllerHolder_1.ControllerHolder.CameraController.Model.IsToSceneCameraMode()) {
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，IsToSceneCameraMode");
                  }
                  TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
                  ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
                  UiManager_1.UiManager.GetViewByName("TimeTrackControlView")?.CloseMe();
                  ControllerHolder_1.ControllerHolder.TimeTrackController.FinishCallback(false);
                }
              } else {
                if (Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，OpenView(EUiViewName.TimeTrackControlView");
                }
                TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
                ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
                ControllerHolder_1.ControllerHolder.TimeTrackController.FinishCallback(false);
              }
            });
          });
        } else {
          this.txe = false;
          this.dxe();
        }
        return true;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，!this.HasCameraTrack");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，!this.Director?.IsValid()");
      }
      return false;
    }
  }
  SetOriginTransform() {
    if (this.qPe) {
      let t = new UE.VectorDouble();
      var i = (0, puerts_1.$ref)(t);
      if (this.qPe.GetSequence()?.D_GetCenterOffset(i)) {
        t = (0, puerts_1.$unref)(i);
      } else {
        t.Set(0, 0, 0);
      }
      this.qPe.bOverrideInstanceData = true;
      if (this.qPe.DefaultInstanceData?.IsA(UE.DefaultLevelSequenceInstanceData.StaticClass())) {
        this.qPe.DefaultInstanceData.TransformOrigin = new UE.Transform(t.op_ToVector());
      }
    }
  }
  PlaySequence(t) {
    var i = this.qPe?.SequencePlayer?.GetEndTime();
    this.NPe = t.InTime;
    this.OPe = t.OutTime;
    this.Tae = t.Target;
    this.yrf = t;
    this.yrf.DelayUpdateFrame = 0;
    this.yrf.PlayedTime = 0;
    this.yrf.TimeLength = i ? (i.Time.FrameNumber.Value + i.Time.SubFrame) * i.Rate.Denominator / i.Rate.Numerator : 0;
    this.zPe = 0;
    this.JPe = true;
    this.ZBf = true;
    this.gxe();
  }
  PlayToMarkOld(t, i, s, h) {
    if (this.Cxe(t)) {
      this.$Pe = t;
      this.NPe = i;
      this.FPe = s;
      this.XPe = h;
      this.zPe = 1;
      this.gxe();
    }
  }
  PlayToMark(t, i, s, h, e) {
    if (this.Cxe(t)) {
      this.$Pe = t;
      if (i) {
        this.jPe = i.TransitType;
        switch (this.jPe) {
          case 0:
            this.VPe = i.Duration ?? 0;
            this.NPe = i.Duration ?? 0;
            this.OPe = 0;
            this.KPe = i.IsValid ?? false;
            break;
          case 1:
            this.VPe = i.Duration ?? 0;
            this.NPe = i.TransitFadeIn ?? 0;
            this.OPe = i.TransitFadeOut ?? 0;
            this.KPe = i.IsValid ?? false;
            this.ixe = i.Mask;
        }
      }
      if (s) {
        this.WPe = s.TransitType;
        switch (this.WPe) {
          case 0:
            this.HPe = s.Duration ?? 0;
            this.kPe = 0;
            this.FPe = s.Duration ?? 0;
            this.QPe = s.IsValid ?? false;
            break;
          case 1:
            this.HPe = s.Duration ?? 0;
            this.kPe = s.TransitFadeIn ?? 0;
            this.FPe = s.TransitFadeOut ?? 0;
            this.QPe = s.IsValid ?? false;
            this.oxe = s.Mask;
        }
      }
      this.XPe = e;
      this.sT1 = h;
      this.zPe = 1;
      this.gxe();
    }
  }
  PlayLoopBetweenMarks(t, i, s, h, e, r) {
    this.qQc = i ? t.RightMark : t.LeftMark;
    this.$Pe = i ? t.LeftMark : t.RightMark;
    if (s) {
      this.jPe = s.TransitType;
      switch (this.jPe) {
        case 0:
          this.VPe = s.Duration ?? 0;
          this.NPe = s.Duration ?? 0;
          this.OPe = 0;
          this.KPe = s.IsValid ?? false;
          break;
        case 1:
          this.VPe = s.Duration ?? 0;
          this.NPe = s.TransitFadeIn ?? 0;
          this.OPe = s.TransitFadeOut ?? 0;
          this.KPe = s.IsValid ?? false;
          this.ixe = s.Mask;
      }
    }
    if (h) {
      this.WPe = h.TransitType;
      switch (this.WPe) {
        case 0:
          this.HPe = h.Duration ?? 0;
          this.kPe = 0;
          this.FPe = h.Duration ?? 0;
          this.QPe = h.IsValid ?? false;
          break;
        case 1:
          this.HPe = h.Duration ?? 0;
          this.kPe = h.TransitFadeIn ?? 0;
          this.FPe = h.TransitFadeOut ?? 0;
          this.QPe = h.IsValid ?? false;
          this.oxe = h.Mask;
      }
    }
    this.sT1 = e;
    this.XPe = r;
    this.zPe = 4;
    this.gxe();
  }
  PlayLoop(t, i, s, h, e) {
    this.$Pe = "";
    if (s) {
      this.jPe = s.TransitType;
      switch (this.jPe) {
        case 0:
          this.VPe = s.Duration ?? 0;
          this.NPe = s.Duration ?? 0;
          this.OPe = 0;
          this.KPe = s.IsValid ?? false;
          break;
        case 1:
          this.VPe = s.Duration ?? 0;
          this.NPe = s.TransitFadeIn ?? 0;
          this.OPe = s.TransitFadeOut ?? 0;
          this.KPe = s.IsValid ?? false;
          this.ixe = s.Mask;
      }
    }
    if (h) {
      this.WPe = h.TransitType;
      switch (this.WPe) {
        case 0:
          this.HPe = h.Duration ?? 0;
          this.kPe = 0;
          this.FPe = h.Duration ?? 0;
          this.QPe = h.IsValid ?? false;
          break;
        case 1:
          this.HPe = h.Duration ?? 0;
          this.kPe = h.TransitFadeIn ?? 0;
          this.FPe = h.TransitFadeOut ?? 0;
          this.QPe = h.IsValid ?? false;
          this.oxe = h.Mask;
      }
    }
    this.sT1 = e;
    this.rT1 = t;
    this.oT1 = i;
    this.zPe = 3;
    this.gxe();
  }
  gxe() {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
      this.hT1();
    } else if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.hT1)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.hT1);
    }
  }
  PlayLevelSequence() {
    switch (this.zPe) {
      case 0:
        this.Erf();
        break;
      case 1:
      case 2:
        this.lT1(this.$Pe, this.XPe);
        break;
      case 3:
        this._T1(this.rT1, this.oT1);
        break;
      case 4:
        this.GQc(this.XPe);
    }
  }
  Erf() {
    var t;
    if (this.qPe?.IsValid() && (this.qPe.bOverrideInstanceData = true, (t = this.qPe.SequencePlayer)?.IsValid()) && this.Tae?.IsValid() && this.yrf && (this.Oxr || (this.Oxr = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.Oxr.D_AddComponentByClass(UE.SceneComponent.StaticClass(), false, this.Oxr.D_GetTransform(), false)), this.Srf = TickSystem_1.TickSystem.Add(this.Mrf, "SimpleLevelSequenceActor", 4, false).Id, this.yrf.InitPlayerRotator.DeepCopy(this.Tae.CharacterActorComponent.ActorRotationProxy), this.yrf.InitPlayerFloorLocation.DeepCopy(this.Tae.CharacterActorComponent.FloorLocation), t.Play(), t.SetPlayRate(0), t.Pause(), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Interaction", 57, "LevelSequence默认播放", ["levelSequence", this.bPe.GetName()]);
    }
  }
  lT1(t, i) {
    if (this.qPe?.IsValid()) {
      this.qPe.bOverrideInstanceData = true;
      var s = this.qPe.SequencePlayer;
      if (s?.IsValid()) {
        if (this.aT1) {
          UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(this.qPe, this.aT1);
          this.aT1 = 0;
        }
        if (i) {
          s.Play();
          s.SetPlaybackPosition(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, t, 2, 1));
          this.nT1 = this.sT1?.PlayRateAbs ?? 1;
          this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.nT1);
          s.Pause();
        } else {
          switch (this.zPe) {
            case 1:
              s.PlayTo(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, t, 2, 0));
              this.nT1 = this.sT1?.PlayRateAbs ?? 1;
              if (this.sT1?.EaseDuration) {
                this.aT1 = UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(this.qPe, this.nxe * this.nT1, this.sT1.EaseType, this.sT1.EaseDuration, this.sT1.EaseExponent);
              } else {
                this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.nT1);
              }
              break;
            case 2:
              s.PlayTo_Circle(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, t, 2, 0), true);
              this.nT1 = this.sT1?.PlayRateAbs ?? 1;
              if (this.sT1?.EaseDuration) {
                this.aT1 = UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(this.qPe, this.nxe * this.nT1, this.sT1.EaseType, this.sT1.EaseDuration, this.sT1.EaseExponent);
              } else {
                this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.nT1);
              }
          }
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Interaction", 33, "LevelSequence播放至对应mark", ["levelSequence", this.bPe.GetName()], ["mark", t]);
        }
      }
    }
  }
  _T1(t, i) {
    var s;
    if (this.qPe?.IsValid() && (this.qPe.bOverrideInstanceData = true, (s = this.qPe.SequencePlayer)?.IsValid()) && (this.aT1 && (UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(this.qPe, this.aT1), this.aT1 = 0), this.zPe === 3 && (t ? s.PlayReverseLooping(i) : s.PlayLooping(i), this.nT1 = this.sT1?.PlayRateAbs ?? 1, this.sT1?.EaseDuration ? this.aT1 = UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(this.qPe, this.nxe * this.nT1, this.sT1.EaseType, this.sT1.EaseDuration, this.sT1.EaseExponent) : this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.nT1)), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Interaction", 39, "LevelSequence循环播放", ["levelSequence", this.bPe.GetName()], ["bReverse", t], ["numLoops", i]);
    }
  }
  GQc(t) {
    if (this.qPe?.IsValid()) {
      this.qPe.bOverrideInstanceData = true;
      const e = this.qPe.SequencePlayer;
      var i;
      var s;
      var h;
      if (e?.IsValid() && (this.aT1 && (UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(this.qPe, this.aT1), this.aT1 = 0), this.nT1 = this.sT1?.PlayRateAbs ?? 1, this.sT1?.EaseDuration ? this.aT1 = UE.KuroSequenceRuntimeFunctionLibrary.EasePlayRateTo(this.qPe, this.nxe * this.nT1, this.sT1.EaseType, this.sT1.EaseDuration, this.sT1.EaseExponent) : this.qPe.SequencePlayer?.SetPlayRate(this.nxe * this.nT1), h = this.GetMarkValue(this.qQc), i = this.GetMarkValue(this.$Pe), h !== undefined) && i !== undefined && h !== i) {
        s = this.GetCurrentFrame();
        if (this.XPe || h < i && i < s || i < h && s < i) {
          this.AddOnPauseCallback(() => {
            this.ClearOnPausedCallback();
            e.PlayTo_Loop(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, this.$Pe, 2, 0), this.qQc);
          });
          h = new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, this.qQc, 2, 1);
          if (this.XPe) {
            e.Play();
            e.SetPlaybackPosition(h);
            e.Pause();
          } else {
            e.PlayTo(h);
          }
        } else {
          e.PlayTo_Loop(new UE.MovieSceneSequencePlaybackParams(new UE.FrameTime(), 0, this.$Pe, 2, 0), this.qQc);
        }
      }
    }
  }
  mxe() {
    var t = new UE.MovieSceneSequencePlaybackSettings();
    t.bDisableMovementInput = false;
    t.bDisableLookAtInput = false;
    this.qPe = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined, false);
    this.qPe.PlaybackSettings = t;
    this.qPe.SetSequence(this.bPe);
    this.vrf = this.qPe.DefaultInstanceData;
    var t = this.qPe.SequencePlayer;
    if (t?.IsValid()) {
      t.OnPause.Add(this.pxe.bind(this));
      t.OnStop.Add(this.vxe.bind(this));
      t.OnFinished.Add(this.Mxe.bind(this));
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 45, "SimpleLevelSequenceActor 没找到Player");
    }
  }
  BJf() {
    if (!this.Fse?.IsValid()) {
      this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass());
      this.Fse.bIsSingle = false;
      this.Fse.bTraceComplex = false;
      this.Fse.bIgnoreSelf = true;
      this.Fse.WorldContextObject = GlobalData_1.GlobalData.World;
      this.Fse.Radius = 10;
      this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
    }
  }
  vxe() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 33, "SimpleLevelSequenceActor OnSequenceStop", ["levelSequence", this.bPe.GetName()]);
    }
    this.uIn?.(this.zLf);
    if (this.qPe?.IsValid() && !this.XPe) {
      if (this.WPe !== 1 || this.sxe) {
        this.Exe();
      } else {
        this.lxe(this.oxe, this.HPe, this.kPe, this.FPe, () => {
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, undefined, this.WPe);
        }, () => {
          this.Exe();
        });
      }
    }
  }
  pxe() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 33, "SimpleLevelSequenceActor OnSequencePause", ["levelSequence", this.bPe.GetName()]);
    }
    this.sZu?.();
    if (!this.XPe && this.zPe !== 0) {
      if (this.WPe !== 1 || this.sxe) {
        this.Exe();
      } else {
        this.lxe(this.oxe, this.HPe, this.kPe, this.FPe, () => {
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, undefined, this.WPe);
        }, () => {
          this.Exe();
        });
      }
    }
  }
  Mxe() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 33, "SimpleLevelSequenceActor OnSequenceFinish", ["levelSequence", this.bPe.GetName()]);
    }
    this.Otr?.();
    if (!this.XPe) {
      if (this.WPe !== 1 || this.sxe) {
        this.Exe();
      } else {
        this.lxe(this.oxe, this.HPe, this.kPe, this.FPe, () => {
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, undefined, this.WPe);
        }, () => {
          this.Exe();
        });
      }
    }
  }
  Exe() {
    Global_1.Global.CharacterCameraManager.FadeAmount = 0;
    if (!!this.hxe && (!ModelManager_1.ModelManager.StaticSceneModel.IsNotAutoExitSceneCamera || !this.txe) && !this.sxe) {
      this.dxe();
    }
  }
  Cxe(i) {
    var s = this.bPe.GetMovieScene();
    let h = false;
    if (s) {
      for (let t = 0; t < s.MarkedFrames.Num(); t++) {
        if (s.MarkedFrames.Get(t).Label === i) {
          h = true;
          break;
        }
      }
    }
    return !!h || (Log_1.Log.CheckError() && Log_1.Log.Error("Interaction", 33, "mark配置不合法", ["levelSequence", this.bPe.GetName()], ["mark", i]), false);
  }
  _xe(t = () => {}) {
    if (this.qPe?.IsValid()) {
      if (ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Camera", 45, "SimpleLevelSeqeunce:演出中触发了场景镜头切换 请检查配置");
        }
        t();
      } else {
        if (!this.JPe && !ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi && !this.IsPlaying()) {
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.SetUiActive(false);
        }
        if (!this.exe?.IsBinding) {
          this.exe = ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.GetUnBoundSceneCamera(0);
          this.exe.IsKeepUi = this.JPe;
          if (this.KPe) {
            this.exe.FadeIn = this.NPe !== 0 ? this.NPe : this.VPe;
          } else {
            this.exe.FadeIn = 0;
          }
          if (this.QPe) {
            this.exe.FadeOut = this.FPe !== 0 ? this.FPe : this.HPe;
          } else {
            this.exe.FadeOut = 0;
          }
        }
        this.GPe.Empty();
        this.GPe.Add(this.exe.Camera);
        this.qPe.SetBindingByTag(CAMERA_TAG, this.GPe, true);
        if (ModelManager_1.ModelManager.CameraModel.CameraMode === 3) {
          this.YPe = true;
          this.exe.IsBinding = true;
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnterSceneSubCamera(this.exe);
          t();
        } else if (this.sxe) {
          if (this.jPe === 1) {
            this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
              ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(3, 0, 0, 0, () => {
                if (ControllerHolder_1.ControllerHolder.CameraController.Model.IsToSceneCameraMode()) {
                  t();
                } else {
                  TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
                  ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
                }
              }, true);
            });
          } else {
            ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(3, this.NPe ?? 1, 0, 0, () => {
              if (ControllerHolder_1.ControllerHolder.CameraController.Model.IsToSceneCameraMode()) {
                t();
              } else {
                TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
                ControllerHolder_1.ControllerHolder.TimeTrackController.HandleTimeTrackControlViewClose();
              }
            }, true);
          }
        } else {
          ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(3, this.jPe === 1 ? 0 : this.NPe ?? 1, 0, 0);
          t();
          this.YPe = true;
          this.exe.IsBinding = true;
        }
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 45, "SimpleLevelSeqeunce:EnterSceneCamera Director为空");
      }
      t();
    }
  }
  dxe() {
    this.qPe.ResetBindings();
    this.YPe = false;
    if (this.exe?.IsBinding) {
      if (this.sxe) {
        if (this.WPe === 1) {
          this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
            this.exe.FadeOut = 0;
            ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, this.B_e, this.WPe);
          });
        } else {
          this.exe.FadeOut = this.FPe !== 0 ? this.FPe : this.HPe;
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, this.B_e, this.WPe);
        }
      } else if (this.WPe === 1) {
        this.B_e();
      } else {
        ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe, this.B_e, this.WPe);
      }
    } else {
      this.B_e();
    }
  }
  lxe(t, i, s, h, e = () => {}, r = () => {}) {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Lock(this);
    this.rxe = true;
    ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(8, 3, () => {
      if (e) {
        e();
      }
      if (i <= 0) {
        if (r) {
          r();
        }
        ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(8, undefined, h ?? 0);
      } else {
        TimerSystem_1.TimerSystem.Delay(() => {
          if (r) {
            r();
          }
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(8, undefined, h ?? 0);
        }, (i ?? 0) * MathUtils_1.MathUtils.SecondToMillisecond);
      }
    }, s ?? 0, t === 0 ? IAction_1.EFadeInScreenShowType.Black : IAction_1.EFadeInScreenShowType.White);
  }
  SetSequenceData(t) {
    if (t !== this.bPe) {
      this.bPe = t;
      this.qPe.SetSequence(t);
    }
  }
  Clear() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.hT1)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.hT1);
    }
    if (this.exe) {
      if (this.exe.IsBinding) {
        if (!this.JPe && !ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi && !this.txe) {
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.SetUiActive(true);
        }
        ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(this.exe);
      }
      ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.DisplayComponent.RemoveBoundSceneCamera(this.exe);
    }
    if (this.aT1) {
      UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(this.qPe, this.aT1);
      this.aT1 = 0;
    }
    if (this.qPe?.IsValid()) {
      const t = this.qPe;
      t.SequencePlayer?.Stop();
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("SimpleLevelSequenceActor.Clear", t);
      });
      this.qPe = undefined;
    }
    if (this.Fse?.IsValid()) {
      this.Fse.Dispose();
      this.Fse = undefined;
    }
    if (this.rxe) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(this);
      this.rxe = false;
    }
    this.ClearOnPausedCallback();
  }
  PlayToMarkByCheckWay(t, i, s, h, e) {
    if (this.Cxe(t)) {
      this.$Pe = t;
      if (i) {
        this.jPe = i.TransitType;
        switch (this.jPe) {
          case 0:
            this.VPe = i.Duration ?? 0;
            this.NPe = i.Duration ?? 0;
            this.OPe = 0;
            this.KPe = i.IsValid ?? false;
            break;
          case 1:
            this.VPe = i.Duration ?? 0;
            this.NPe = i.TransitFadeIn ?? 0;
            this.OPe = i.TransitFadeOut ?? 0;
            this.KPe = i.IsValid ?? false;
            this.ixe = i.Mask;
        }
      }
      if (s) {
        this.WPe = s.TransitType;
        switch (this.WPe) {
          case 0:
            this.HPe = s.Duration ?? 0;
            this.kPe = 0;
            this.FPe = s.Duration ?? 0;
            this.QPe = s.IsValid ?? false;
            break;
          case 1:
            this.HPe = s.Duration ?? 0;
            this.kPe = s.TransitFadeIn ?? 0;
            this.FPe = s.TransitFadeOut ?? 0;
            this.QPe = s.IsValid ?? false;
            this.oxe = s.Mask;
        }
      }
      this.XPe = e;
      this.sT1 = h;
      this.CheckLatestWay();
      this.gxe();
    }
  }
  GetMarkValue(i) {
    var s = this.bPe.GetMovieScene();
    for (let t = 0; t < s.MarkedFrames.Num(); t++) {
      if (s.MarkedFrames.Get(t).Label === i) {
        return this.Sxe(s.MarkedFrames.Get(t).FrameNumber.Value);
      }
    }
  }
  CheckLatestWay() {
    var t;
    var i;
    var s;
    var h;
    if (this.bPe.GetMovieScene()) {
      h = this.qPe.SequencePlayer;
      t = this.GetMarkValue(this.$Pe);
      i = h.GetStartTime().Time.FrameNumber.Value;
      s = h.GetEndTime().Time.FrameNumber.Value;
      h = h.GetCurrentTime().Time.FrameNumber.Value;
      if (Math.abs(t - h) > Math.abs(s - i - Math.abs(t - h))) {
        this.zPe = 2;
      } else {
        this.zPe = 1;
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Interaction", 45, "检查最短路径，但movieScene为空");
    }
  }
  Sxe(t) {
    var i = this.bPe.GetMovieScene();
    return t * i.DisplayRate.Numerator / i.TickResolution.Numerator;
  }
  SetTimeDilation(t) {
    if (this.nxe !== t) {
      this.nxe = t;
      this.yxe();
    }
  }
  yxe() {
    if (this.aT1) {
      UE.KuroSequenceRuntimeFunctionLibrary.StopEasingPlayRate(this.qPe, this.aT1);
      this.aT1 = 0;
    }
    this.qPe.SequencePlayer.SetPlayRate(this.nxe * this.nT1);
  }
  GetCurrentFrame() {
    if (this.qPe) {
      return this.qPe.SequencePlayer.GetCurrentTime().Time.FrameNumber.Value;
    } else {
      return 0;
    }
  }
  IsReversePlay() {
    return this.rT1;
  }
  StopSequence() {
    if (this.qPe) {
      this.qPe.SequencePlayer.Stop();
    }
  }
  Pause() {
    if (this.qPe && (this.X2n = true, this.zPe !== 0)) {
      this.qPe.SequencePlayer.Pause();
    }
  }
  Resume() {
    if (this.qPe && (this.X2n = false, this.zPe !== 0)) {
      this.qPe.SequencePlayer.Play();
    }
  }
  xJf() {
    var t = Global_1.Global.BaseCharacter;
    return !!t?.IsValid() && !!t.CharacterActorComponent?.Valid && !!this.exe?.Camera?.IsValid() && (this.BJf(), this.Fse.ActorsToIgnore.Empty(), this.Fse.ActorsToIgnore.Add(t), this.cz.FromUeVector(this.exe.Camera.D_K2_GetActorLocation()), TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, t.CharacterActorComponent.ActorLocationProxy), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, this.cz), TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Fse, PROFILE_KEY));
  }
}
exports.default = SimpleLevelSequenceActor;
//# sourceMappingURL=SimpleLevelSequenceActor.js.map