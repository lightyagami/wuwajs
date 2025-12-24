"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsPhotographer = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const PhotographController_1 = require("./PhotographController");
const PhotographDefine_1 = require("./PhotographDefine");
const CONFIG_PATH = "/Game/Aki/Data/Camera/DA_PhotographCameraConfig.DA_PhotographCameraConfig";
const MOBILE_CONFIG_PATH = "/Game/Aki/Data/Camera/DA_PhotographCameraConfig_Mobile.DA_PhotographCameraConfig_Mobile";
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
    this.CameraInitializeFov = -1;
    this.CameraArmInitializeSocketOffset = new UE.Vector();
    this.SourceMaxPitch = 0;
    this.SourceMinPitch = 0;
    this.Character = undefined;
    this.StartDitherValue = 0;
    this.NpcStartDitherValue = 0;
    this.StartHidePitch = 0;
    this.CompleteHidePitch = 0;
    this.IsLoadingConfigCompleted = false;
    this.CurrentDither = 0;
    this.PlayerLocation = undefined;
    this.CameraLocation = undefined;
    this.StartHideDistance = 0;
    this.CompleteHideDistance = 0;
    this.StartHideSizeInFrame = 0;
    this.CompleteHideSizeInFrame = 0;
    this.NpcStartHideDistance = 0;
    this.NpcCompleteHideDistance = 0;
    this.CameraUpAndDownMaxDistance = 0;
    this.CameraLeftAndRightMaxDistance = 0;
    this.CameraUpAndDownSpeed = 1;
    this.CameraLeftAndRightSpeed = 1;
    this.MinFov = 0;
    this.MaxFov = 0;
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
    this.CameraNpcSphereTrace = undefined;
    this.DitheredNpcDistanceMap = new Map();
    this.CurrentCameraDitherFov = 0;
    this.CameraCollisionRadius = 0;
    this.CameraCollisionLocation = Vector_1.Vector.Create();
    this.DitheredNpcSet = new Set();
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
    this.NpcStartDitherValue = 0;
    this.StartHidePitch = 0;
    this.CompleteHidePitch = 0;
    this.IsLoadingConfigCompleted = false;
    this.CurrentDither = 0;
    this.PlayerLocation = undefined;
    this.CameraLocation = undefined;
    this.StartHideDistance = 0;
    this.CompleteHideDistance = 0;
    this.StartHideSizeInFrame = 0;
    this.CompleteHideSizeInFrame = 0;
    this.NpcStartHideDistance = 0;
    this.NpcCompleteHideDistance = 0;
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
    this.CameraNpcSphereTrace = undefined;
    this.DitheredNpcDistanceMap = new Map();
    this.CurrentCameraDitherFov = 0;
    this.CameraCollisionRadius = 0;
    this.CameraCollisionLocation = Vector_1.Vector.Create();
    this.DitheredNpcSet = new Set();
  }
  Initialize() {
    this.RelativeVectorCache = new UE.Vector();
    this.DefaultRotation = new UE.Rotator(0, 0, 0);
    this.CameraLocation = Vector_1.Vector.Create();
    this.PlayerLocation = Vector_1.Vector.Create();
    this.SourceMaxPitch = CommonParamById_1.configCommonParamById.GetIntConfig("CameraSourceMaxPitch");
    this.SourceMinPitch = CommonParamById_1.configCommonParamById.GetIntConfig("CameraSourceMinPitch");
    this.CameraUpAndDownSpeed = 1;
    this.CameraLeftAndRightSpeed = 1;
    this.MaxFov = PhotographDefine_1.MAX_FOV;
    this.MinFov = PhotographDefine_1.MIN_FOV;
    this.CameraUpAndDownSpeed = 1;
    this.CameraLeftAndRightSpeed = 1;
    this.CameraInitializeFov = -1;
    const s = ControllerHolder_1.ControllerHolder.PhotographController.CheckIfInFightPhotographCamera();
    this.CameraUpAndDownMaxDistance = s ? CommonParamById_1.configCommonParamById.GetIntConfig("FightCameraUpAndDownDistance") : CommonParamById_1.configCommonParamById.GetIntConfig("CameraUpAndDownDistance");
    this.CameraLeftAndRightMaxDistance = s ? CommonParamById_1.configCommonParamById.GetIntConfig("FightCameraLeftAndRightDistance") : CommonParamById_1.configCommonParamById.GetIntConfig("CameraLeftAndRightDistance");
    if (s) {
      this.MinFov = CommonParamById_1.configCommonParamById.GetIntConfig("FightCameraMinFov");
      this.MaxFov = CommonParamById_1.configCommonParamById.GetIntConfig("FightCameraMaxFov");
      this.CameraUpAndDownSpeed = CommonParamById_1.configCommonParamById.GetIntConfig("FightCameraUpAndDownSpeed");
      this.CameraLeftAndRightSpeed = CommonParamById_1.configCommonParamById.GetIntConfig("FightCameraLeftAndRightSpeed");
    }
    this.CurCameraUpAndDownDistance = 0;
    this.CurCameraLeftAndRightDistance = 0;
    this.CurrentDither = 0;
    this.Character = Global_1.Global.BaseCharacter;
    this.PlayerLocation.FromUeVector(this.Character.D_K2_GetActorLocation());
    GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(this.Character.CharacterActorComponent, this.GravityQuat);
    this.GravityQuat.Inverse(this.InverseGravityQuat);
    this.CurrentCameraDitherFov = 0;
    this.CameraCollisionRadius = 0;
    this.DitheredNpcSet = new Set();
    this.DitheredNpcDistanceMap = new Map();
    this.InitCameraNpcSphereTrace();
    this.IsLoadingConfigCompleted = false;
    var t = Info_1.Info.IsMobilePlatform() ? MOBILE_CONFIG_PATH : CONFIG_PATH;
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.BP_PhotographCameraConfig_C, t => {
      var t = t.基础;
      this.StartHidePitch = s ? t.Get(15) : t.Get(10);
      var i = s ? t.Get(2) : t.Get(8);
      var h = s ? t.Get(3) : t.Get(9);
      this.StartHideDistance = Math.max(i, h) + HIDE_DISTANCE_OFFSET;
      this.CompleteHideDistance = Math.min(i, h) + HIDE_DISTANCE_OFFSET;
      var i = t.Get(5);
      var h = t.Get(6);
      this.NpcStartHideDistance = Math.max(i, h) + HIDE_DISTANCE_OFFSET;
      this.NpcCompleteHideDistance = Math.min(i, h) + HIDE_DISTANCE_OFFSET;
      this.NpcStartDitherValue = t.Get(7);
      this.CompleteHidePitch = s ? t.Get(1) : t.Get(11);
      this.StartHideSizeInFrame = t.Get(13);
      this.CompleteHideSizeInFrame = t.Get(14);
      this.StartDitherValue = s ? t.Get(4) : t.Get(12);
      this.IsLoadingConfigCompleted = true;
    }, 100, "Ui.PhotographUi");
    this.RefreshDitherEffect();
  }
  InitCameraNpcSphereTrace() {
    this.CameraNpcSphereTrace = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.CameraNpcSphereTrace.bIsSingle = false;
    this.CameraNpcSphereTrace.bTraceComplex = false;
    this.CameraNpcSphereTrace.bIgnoreSelf = true;
    this.CameraNpcSphereTrace.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
    this.CameraNpcSphereTrace.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
    this.CameraNpcSphereTrace.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer);
    this.CameraNpcSphereTrace.ActorsToIgnore.Add(this.Character);
  }
  ReceiveDestroyed() {
    this.Character = undefined;
    this.IsLoadingConfigCompleted = false;
    if (this.CameraNpcSphereTrace) {
      this.CameraNpcSphereTrace.Dispose();
      this.CameraNpcSphereTrace = undefined;
    }
  }
  ReceiveTick(t) {
    this.RefreshPlayerLocation();
    this.RefreshDitherEffect();
    if (ControllerHolder_1.ControllerHolder.PhotographController.CheckIfInFightPhotographCamera()) {
      this.UpdateNpcDither();
      this.RefreshCameraPosition();
    }
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
  RefreshCameraPosition() {
    var t = ModelManager_1.ModelManager.PhotographModel.RightValue;
    var i = ModelManager_1.ModelManager.PhotographModel.UpValue;
    if (t !== 0 || i !== 0) {
      this.MoveRight(t);
      this.MoveUp(i);
    }
  }
  GetArmPitch() {
    var t = GravityUtils_1.GravityUtils.GetGravityUpForActor(Global_1.Global.BaseCharacter?.CharacterActorComponent);
    this.TmpVector.DeepCopy(this.CapsuleCollision.GetForwardVector());
    return Math.asin(this.TmpVector.DotProduct(t)) * MathUtils_1.MathUtils.RadToDeg;
  }
  GetPlayerDither(t, i) {
    var h = [1];
    if (ControllerHolder_1.ControllerHolder.PhotographController.CheckIfInFightPhotographCamera() && this.Character?.CharacterActorComponent && (s = this.Character.CharacterActorComponent.HalfHeight, (s = Math.atan(s / t) * MathUtils_1.MathUtils.RadToDeg * 2 / this.GetFov()) > this.StartHideSizeInFrame)) {
      h.push(MathUtils_1.MathUtils.RangeClamp(s, this.StartHideSizeInFrame, this.CompleteHideSizeInFrame, this.StartDitherValue, MIN_DITHER));
    }
    if (t < this.StartHideDistance) {
      h.push(MathUtils_1.MathUtils.RangeClamp(t, this.StartHideDistance, this.CompleteHideDistance, this.StartDitherValue, MIN_DITHER));
    }
    var s = MathUtils_1.MathUtils.WrapAngle(i);
    if (s > this.StartHidePitch) {
      h.push(MathUtils_1.MathUtils.RangeClamp(s, this.StartHidePitch, this.CompleteHidePitch, this.StartDitherValue, MIN_DITHER));
    }
    return Math.min(...h);
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
  SetCameraInitializeFov(t) {
    this.CameraInitializeFov = t;
  }
  GetCameraInitializeFov() {
    if (this.CameraInitializeFov === -1) {
      return PhotographDefine_1.DEFAULT_FOV;
    } else {
      return this.CameraInitializeFov;
    }
  }
  ActivateCamera(t) {
    t.K2_AttachToComponent(this.CameraArm, FNameUtil_1.FNameUtil.NONE, 2, 2, 2, false);
    this.CameraActor = t;
    if (!ControllerHolder_1.ControllerHolder.PhotographController.CheckIfInFightPhotographCamera()) {
      this.SetFov(PhotographDefine_1.DEFAULT_FOV);
    }
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
  SetCameraArmTargetOffset(t, i = false) {
    var h = this.CameraArm.K2_GetComponentRotation();
    var s = this.D_K2_GetActorLocation().op_Addition(h.RotateVectorDouble(new UE.VectorDouble(-this.CameraArm.TargetArmLength, 0, 0)));
    var t = t.op_Subtraction(s);
    var s = h.Quaternion().Inverse().RotateVectorDouble(t).op_ToVector();
    this.CameraArm.SocketOffset = s;
    if (i) {
      this.CameraArmInitializeSocketOffset = s;
    }
  }
  MoveUp(t) {
    var i;
    var t = t * this.CameraUpAndDownSpeed;
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
    var t = t * this.CameraLeftAndRightSpeed;
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
    i = PhotographController_1.PhotographController.CheckIfInEntityCamera() ? MathUtils_1.MathUtils.Clamp(t, PhotographController_1.PhotographController.MinFov ? PhotographController_1.PhotographController.MinFov.Value : PhotographDefine_1.MIN_FOV, PhotographController_1.PhotographController.MaxFov ? PhotographController_1.PhotographController.MaxFov.Value : PhotographDefine_1.MAX_FOV) : MathUtils_1.MathUtils.Clamp(t, this.MinFov, this.MaxFov);
    this.CameraActor.CameraComponent.SetFieldOfView(i);
  }
  GetFov() {
    return this.CameraActor.CameraComponent.FieldOfView;
  }
  ResetCamera() {
    this.CapsuleCollision.K2_SetRelativeRotation(this.DefaultRotation, true, undefined, false);
    this.D_K2_SetActorTransform(this.CameraInitializeTransform, true, undefined, false);
    this.D_K2_SetActorLocation(this.PlayerSourceLocation, true, undefined, false);
    var t = this.GetCameraInitializeFov();
    this.SetFov(t);
    this.CameraArm.SocketOffset = this.CameraArmInitializeSocketOffset ?? Vector_1.Vector.ZeroVector;
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
        }, 100, "Ui.PhotographUi");
      }
    }
  }
  UpdateNpcDither() {
    this.UpdateCameraCollisionRadius();
    this.UpdateCameraCollisionLocation();
    this.CameraNpcSphereTrace.HitResult?.Clear();
    this.CameraNpcSphereTrace.WorldContextObject = GlobalData_1.GlobalData.World;
    this.CameraNpcSphereTrace.Radius = this.CameraCollisionRadius;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.CameraNpcSphereTrace, this.CameraLocation);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.CameraNpcSphereTrace, this.CameraCollisionLocation);
    var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.CameraNpcSphereTrace, "TsPhotographer_CheckCollision_Npc");
    var i = this.CameraNpcSphereTrace.HitResult.GetHitCount();
    if (t) {
      this.UpdateDitheredNpcDistance(this.CameraNpcSphereTrace.HitResult);
      for (var [h, s] of this.DitheredNpcDistanceMap) {
        if (this.IsCharacterIgnoreNpcDither(h)) {
          h.SetDitherEffect(1, 3);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Camera", 57, `[NPC Dither] 存在忽略Tag,恢复Npc'${h?.GetName()}'Dither`);
          }
        } else {
          h.SetDitherEffect(this.GetNpcDitherValue(h, s), 3);
          if (s = this.DitheredNpcSet.has(h)) {
            this.DitheredNpcSet.delete(h);
          }
          this.DitheredNpcSet.add(h);
          if (!s) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Camera", 57, "[NPC Dither] 应用Npc Dither", ["actor?.GetName()", h?.GetName()]);
            }
          }
        }
      }
    }
    var e = this.DitheredNpcSet.values();
    for (let t = 0; t < this.DitheredNpcSet.size - i; t++) {
      var r = e.next().value;
      if (this.IsCharacterRenderingType(r) && (r.SetDitherEffect(1, 3), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Camera", 57, `[NPC Dither] 恢复Npc'${r?.GetName()}'Dither`);
      }
      this.DitheredNpcSet.delete(r);
    }
  }
  UpdateCameraCollisionRadius() {
    var t;
    var i;
    if (!MathUtils_1.MathUtils.IsNearlyEqual(this.CurrentCameraDitherFov, this.GetFov())) {
      this.CurrentCameraDitherFov = this.GetFov();
      t = this.StartHideDistance;
      i = this.CameraActor.CameraComponent.AspectRatio;
      i = MathUtils_1.MathUtils.VerticalFovToHorizontally(this.CurrentCameraDitherFov, i);
      i = Math.sin(i / 2 * MathUtils_1.MathUtils.DegToRad) * t * 2;
      this.CameraCollisionRadius = MathUtils_1.MathUtils.GetTriangleCircumradius(t, t, i);
    }
  }
  UpdateCameraCollisionLocation() {
    var t = this.CameraActor.D_GetActorForwardVector();
    t.Normalize(MathCommon_1.MathCommon.SmallNumber);
    t.op_Multiply(this.CameraCollisionRadius);
    this.CameraLocation.Addition(this.TmpVector, this.CameraCollisionLocation);
  }
  IsCharacterIgnoreNpcDither(t) {
    return !!t.GetEntityNoBlueprint()?.GetComponent(215)?.HasTag(-1151151013);
  }
  UpdateDitheredNpcDistance(i) {
    var h = i.GetHitCount();
    this.DitheredNpcDistanceMap.clear();
    for (let t = 0; t < h; ++t) {
      var s;
      var e = i.Actors.Get(t);
      if (e && e instanceof UE.Object && e.IsValid() && this.IsCharacterRenderingType(e)) {
        TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i, t, this.TmpVector);
        if (!((this.DitheredNpcDistanceMap.get(e) ?? PhotographDefine_1.MAX_DISTANCE_VALUE) <= (s = Vector_1.Vector.Dist(this.TmpVector, this.CameraLocation)))) {
          this.DitheredNpcDistanceMap.set(e, s);
        }
      }
    }
  }
  IsCharacterRenderingType(t) {
    return !!t?.IsValid() && t instanceof TsBaseCharacter_1.default && !!ModelManager_1.ModelManager.CharacterModel.GetHandle(t.GetEntityIdNoBlueprint())?.Valid;
  }
  GetNpcDitherValue(t, i) {
    if (!t?.IsValid() || !t.CapsuleComponent) {
      return 1;
    }
    let h = 1;
    return h = i < this.NpcStartHideDistance ? MathUtils_1.MathUtils.RangeClamp(i, this.NpcStartHideDistance, this.NpcCompleteHideDistance, this.NpcStartDitherValue, MIN_DITHER) : h;
  }
}
exports.TsPhotographer = TsPhotographer;
exports.default = TsPhotographer; //# sourceMappingURL=TsPhotographer.js.map