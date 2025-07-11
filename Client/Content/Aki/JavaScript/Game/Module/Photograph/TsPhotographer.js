"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsPhotographer = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const Global_1 = require("../../Global");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const PhotographController_1 = require("./PhotographController");
const PhotographDefine_1 = require("./PhotographDefine");
const CONFIG_PATH = "/Game/Aki/Data/Camera/DA_FightCameraConfig.DA_FightCameraConfig";
const MOBILE_CONFIG_PATH = "/Game/Aki/Data/Camera/DA_FightCameraConfig_Mobile.DA_FightCameraConfig_Mobile";
const MIN_DITHER = 0.01;
const HIDE_DISTANCE_OFFSET = 50;
class TsPhotographer extends UE.Actor {
  constructor() {
    super(...arguments);
    this.CapsuleCollision = undefined;
    this.CameraArm = undefined;
    this.CameraActor = undefined;
    this.RelativeVectorCache = undefined;
    this.PlayerSourceLocation = undefined;
    this.CameraInitializeTransform = undefined;
    this.DefaultRotation = undefined;
    this.SourceMaxPitch = 0;
    this.SourceMinPitch = 0;
    this.Character = undefined;
    this.StartDitherValue = 0;
    this.StartHidePitch = 0;
    this.CompleteHidePitch = 0;
    this.IsLoadingConfigCompleted = false;
    this.CurrentDither = 0;
    this.PlayerLocation = undefined;
    this.CameraLocation = undefined;
    this.StartHideDistance = 0;
    this.CompleteHideDistance = 0;
    this.CameraUpAndDownMaxDistance = 0;
    this.CameraLeftAndRightMaxDistance = 0;
    this.CurCameraUpAndDownDistance = 0;
    this.CurCameraLeftAndRightDistance = 0;
    this.PitchInput = 0;
    this.YawInput = 0;
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.TmpRotator2 = Rotator_1.Rotator.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TmpQuat2 = Quat_1.Quat.Create();
    this.TmpQuat3 = Quat_1.Quat.Create();
    this.GravityQuat = Quat_1.Quat.Create();
    this.InverseGravityQuat = Quat_1.Quat.Create();
  }
  Constructor() {
    this.CameraActor = undefined;
    this.RelativeVectorCache = undefined;
    this.PlayerSourceLocation = undefined;
    this.CameraInitializeTransform = undefined;
    this.DefaultRotation = undefined;
    this.SourceMaxPitch = 0;
    this.SourceMinPitch = 0;
    this.Character = undefined;
    this.StartDitherValue = 0;
    this.StartHidePitch = 0;
    this.CompleteHidePitch = 0;
    this.IsLoadingConfigCompleted = false;
    this.CurrentDither = 0;
    this.PlayerLocation = undefined;
    this.CameraLocation = undefined;
    this.StartHideDistance = 0;
    this.CompleteHideDistance = 0;
    this.PitchInput = 0;
    this.YawInput = 0;
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.TmpRotator2 = Rotator_1.Rotator.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TmpQuat2 = Quat_1.Quat.Create();
    this.TmpQuat3 = Quat_1.Quat.Create();
    this.GravityQuat = Quat_1.Quat.Create();
    this.InverseGravityQuat = Quat_1.Quat.Create();
  }
  Initialize() {
    this.RelativeVectorCache = new UE.Vector();
    this.DefaultRotation = new UE.Rotator(0, 0, 0);
    this.CameraLocation = Vector_1.Vector.Create();
    this.PlayerLocation = Vector_1.Vector.Create();
    this.SourceMaxPitch = CommonParamById_1.configCommonParamById.GetIntConfig("CameraSourceMaxPitch");
    this.SourceMinPitch = CommonParamById_1.configCommonParamById.GetIntConfig("CameraSourceMinPitch");
    this.CameraUpAndDownMaxDistance = CommonParamById_1.configCommonParamById.GetIntConfig("CameraUpAndDownDistance");
    this.CameraLeftAndRightMaxDistance = CommonParamById_1.configCommonParamById.GetIntConfig("CameraLeftAndRightDistance");
    this.CurCameraUpAndDownDistance = 0;
    this.CurCameraLeftAndRightDistance = 0;
    this.CurrentDither = 0;
    this.Character = Global_1.Global.BaseCharacter;
    this.PlayerLocation.FromUeVector(this.Character.D_K2_GetActorLocation());
    GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(this.Character.CharacterActorComponent, this.GravityQuat);
    this.GravityQuat.Inverse(this.InverseGravityQuat);
    this.IsLoadingConfigCompleted = false;
    var t = Info_1.Info.IsMobilePlatform() ? MOBILE_CONFIG_PATH : CONFIG_PATH;
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_FightCameraConfig_C, t => {
      var t = t.基础;
      this.StartHidePitch = t.Get(42);
      var i = t.Get(40);
      var h = t.Get(41);
      this.StartHideDistance = Math.max(i, h) + HIDE_DISTANCE_OFFSET;
      this.CompleteHideDistance = Math.min(i, h) + HIDE_DISTANCE_OFFSET;
      this.CompleteHidePitch = t.Get(43);
      this.StartDitherValue = t.Get(44);
      this.IsLoadingConfigCompleted = true;
    });
    this.RefreshDitherEffect();
  }
  ReceiveDestroyed() {
    this.Character = undefined;
    this.IsLoadingConfigCompleted = false;
  }
  ReceiveTick(t) {
    this.RefreshPlayerLocation();
    this.RefreshDitherEffect();
    this.RefreshCameraArm();
  }
  RefreshPlayerLocation() {
    if (this.PlayerLocation && this.PlayerLocation.ToUeVector().Equals(this.Character.D_K2_GetActorLocation(), 0.01)) {
      this.PlayerLocation.FromUeVector(this.Character.D_K2_GetActorLocation());
    }
  }
  RefreshDitherEffect() {
    var t;
    if (this.IsLoadingConfigCompleted && this.CameraActor && this.CameraArm && (t = this.CameraActor.D_K2_GetActorLocation(), this.CameraLocation.FromUeVector(t), t = Vector_1.Vector.Dist(this.PlayerLocation, this.CameraLocation), t = this.GetPlayerDither(t, this.GetArmPitch()), this.CurrentDither !== t)) {
      this.CurrentDither = t;
      this.Character.SetDitherEffect(t, 1);
    }
  }
  RefreshCameraArm() {
    var t;
    if (this.PitchInput !== 0 || this.YawInput !== 0) {
      this.TmpRotator.DeepCopy(this.CapsuleCollision.K2_GetComponentRotation());
      this.TmpRotator.Quaternion(this.TmpQuat);
      t = GravityUtils_1.GravityUtils.GetGravityUpForActor(Global_1.Global.BaseCharacter?.CharacterActorComponent);
      Quat_1.Quat.ConstructorByAxisAngle(t, this.YawInput * MathUtils_1.MathUtils.DegToRad, this.TmpQuat2);
      this.TmpQuat2.Multiply(this.TmpQuat, this.TmpQuat3);
      this.TmpQuat.DeepCopy(this.TmpQuat3);
      t = this.GetArmPitch();
      t = MathUtils_1.MathUtils.Clamp(this.PitchInput + t, this.SourceMinPitch, this.SourceMaxPitch) - t;
      if (Math.abs(t) > MathUtils_1.MathUtils.SmallNumber) {
        this.TmpRotator2.Set(t, 0, 0);
        this.TmpRotator2.Quaternion(this.TmpQuat2);
        this.TmpQuat.Multiply(this.TmpQuat2, this.TmpQuat3);
        this.TmpQuat.DeepCopy(this.TmpQuat3);
      }
      this.TmpQuat.Rotator(this.TmpRotator);
      this.CapsuleCollision.K2_SetRelativeRotation(this.TmpRotator.ToUeRotator(), false, undefined, false);
      this.PitchInput = 0;
      this.YawInput = 0;
    }
  }
  GetArmPitch() {
    var t = GravityUtils_1.GravityUtils.GetGravityUpForActor(Global_1.Global.BaseCharacter?.CharacterActorComponent);
    this.TmpVector.DeepCopy(this.CapsuleCollision.GetForwardVector());
    return Math.asin(this.TmpVector.DotProduct(t)) * MathUtils_1.MathUtils.RadToDeg;
  }
  GetPlayerDither(t, i) {
    let h = 1;
    if (t < this.StartHideDistance) {
      h = MathUtils_1.MathUtils.RangeClamp(t, this.StartHideDistance, this.CompleteHideDistance, this.StartDitherValue, MIN_DITHER);
    }
    t = MathUtils_1.MathUtils.WrapAngle(i);
    let s = 1;
    if (t > this.StartHidePitch) {
      s = MathUtils_1.MathUtils.RangeClamp(t, this.StartHidePitch, this.CompleteHidePitch, this.StartDitherValue, MIN_DITHER);
    }
    return Math.min(h, s);
  }
  SetPlayerSourceLocation(t) {
    this.PlayerSourceLocation = t;
  }
  SetCameraInitializeTransform(t) {
    this.CameraInitializeTransform = t;
  }
  GetCameraInitializeTransform() {
    return this.CameraInitializeTransform;
  }
  ActivateCamera(t) {
    t.K2_AttachToComponent(this.CameraArm, FNameUtil_1.FNameUtil.NONE, 2, 2, 2, false);
    this.CameraActor = t;
    this.SetFov(PhotographDefine_1.DEFAULT_FOV);
  }
  DeactivateCamera() {
    if (this.CameraActor?.IsValid()) {
      this.CameraActor.K2_DetachFromActor(1, 1, 1);
    }
    this.CameraActor = undefined;
  }
  SetCameraTransform(t) {
    var t = t.GetTranslation();
    var i = this.CameraActor.D_K2_GetActorLocation();
    this.RelativeVectorCache.X = t.X - i.X;
    this.RelativeVectorCache.Y = t.Y - i.Y;
    this.RelativeVectorCache.Z = t.Z - i.Z;
    this.K2_AddActorWorldOffset(this.RelativeVectorCache, false, undefined, false);
  }
  MoveUp(t) {
    var i;
    if (Math.abs(this.CurCameraUpAndDownDistance + t) < this.CameraUpAndDownMaxDistance) {
      i = GravityUtils_1.GravityUtils.GetVectorInGravity(Vector_1.Vector.UpVectorProxy, this.GravityQuat, this.TmpVector);
      this.CurCameraUpAndDownDistance += t;
      i = i.Multiply(t, this.TmpVector);
      GravityUtils_1.GravityUtils.GetVectorInNormal(i, this.InverseGravityQuat, this.TmpVector2);
      this.CameraArm.SocketOffset = this.CameraArm.SocketOffset.op_Addition(this.TmpVector2.ToUeVectorOld());
    }
  }
  MoveRight(t) {
    var i;
    if (Math.abs(this.CurCameraLeftAndRightDistance + t) < this.CameraLeftAndRightMaxDistance) {
      i = GravityUtils_1.GravityUtils.GetVectorInGravity(Vector_1.Vector.RightVectorProxy, this.GravityQuat, this.TmpVector);
      this.CurCameraLeftAndRightDistance += t;
      i = i.Multiply(t, this.TmpVector);
      GravityUtils_1.GravityUtils.GetVectorInNormal(i, this.InverseGravityQuat, this.TmpVector2);
      this.CameraArm.SocketOffset = this.CameraArm.SocketOffset.op_Addition(this.TmpVector2.ToUeVectorOld());
    }
  }
  AddCameraArmPitchInput(t) {
    var i;
    if (t !== 0 && !(i = this.CameraArm.GetTargetRotation().Pitch, t > 0 && i <= this.SourceMinPitch) && (!(t < 0) || !(i >= this.SourceMaxPitch))) {
      this.PitchInput = t;
    }
  }
  AddCameraArmYawInput(t) {
    if (t !== 0) {
      this.YawInput = t;
    }
  }
  SetFov(t) {
    let i = 50;
    i = PhotographController_1.PhotographController.CheckIfInEntityCamera() ? MathUtils_1.MathUtils.Clamp(t, PhotographController_1.PhotographController.MinFov ? PhotographController_1.PhotographController.MinFov.Value : PhotographDefine_1.MIN_FOV, PhotographController_1.PhotographController.MaxFov ? PhotographController_1.PhotographController.MaxFov.Value : PhotographDefine_1.MAX_FOV) : MathUtils_1.MathUtils.Clamp(t, PhotographDefine_1.MIN_FOV, PhotographDefine_1.MAX_FOV);
    this.CameraActor.CameraComponent.SetFieldOfView(i);
  }
  GetFov() {
    return this.CameraActor.CameraComponent.FieldOfView;
  }
  ResetCamera() {
    this.CapsuleCollision.K2_SetRelativeRotation(this.DefaultRotation, true, undefined, false);
    this.D_K2_SetActorTransform(this.CameraInitializeTransform, true, undefined, false);
    this.D_K2_SetActorLocation(this.PlayerSourceLocation, true, undefined, false);
    this.SetFov(PhotographDefine_1.DEFAULT_FOV);
    this.CameraArm.SocketOffset = Vector_1.Vector.ZeroVector;
    this.CurCameraUpAndDownDistance = 0;
    this.CurCameraLeftAndRightDistance = 0;
    this.CurrentDither = 0;
    this.PitchInput = 0;
    this.YawInput = 0;
  }
  SetCameraLUT(t) {
    if (this.CameraActor) {
      if (t.length === 0) {
        this.CameraActor.CameraComponent.PostProcessSettings.bOverride_ColorGradingLUT = false;
      } else {
        this.CameraActor.CameraComponent.PostProcessSettings.bOverride_ColorGradingLUT = true;
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, t => {
          this.CameraActor.CameraComponent.PostProcessSettings.ColorGradingLUT = t;
        });
      }
    }
  }
}
exports.TsPhotographer = TsPhotographer;
exports.default = TsPhotographer; //# sourceMappingURL=TsPhotographer.js.map