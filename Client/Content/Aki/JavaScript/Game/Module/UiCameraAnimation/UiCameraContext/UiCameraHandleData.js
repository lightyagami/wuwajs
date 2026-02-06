"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraHandleData = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const CameraUtility_1 = require("../../../Camera/CameraUtility");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiCameraAnimationManager_1 = require("../UiCameraAnimationManager");
class UiCameraHandleData {
  constructor() {
    this.DPo = undefined;
    this.RPo = undefined;
    this.UPo = undefined;
    this.XAo = undefined;
    this.APo = undefined;
    this.PPo = undefined;
    this.xPo = new UE.Vector();
    this.wPo = new Map();
    this.BPo = UE.NewArray(UE.Actor);
    this.bPo = undefined;
    this.qPo = undefined;
    this.GPo = new UE.TransformDouble();
    this.NPo = Vector_1.Vector.Create();
    this.OPo = Vector_1.Vector.Create();
    this.kPo = Vector_1.Vector.Create();
    this.FPo = undefined;
    this.VPo = undefined;
    this.IsEmptyState = false;
    this.ReplaceCameraTag = undefined;
  }
  ToString() {
    return `UniqueId:${this.DPo},HandleName:${this.PPo},ViewName:${this.RPo}`;
  }
  static NewByHandleName(t, i) {
    var e = UiCameraAnimationManager_1.UiCameraAnimationManager.GenerateHandleDataUniqueId();
    var r = new UiCameraHandleData();
    r.UniqueId = e;
    r.HandleName = t;
    if (i?.IsValid()) {
      r.APo = i;
    }
    r.Refresh();
    return r;
  }
  static NewByView(t, i, e) {
    var r;
    var a = UiCameraAnimationManager_1.UiCameraAnimationManager.GetCameraMappingData(t);
    if (a) {
      (r = new UiCameraHandleData()).UniqueId = i || UiCameraAnimationManager_1.UiCameraAnimationManager.GenerateHandleDataUniqueId();
      r.HandleName = a.GetSourceHandleName();
      r.ViewName = t;
      r.UiCameraMappingConfig = a.GetUiCameraMappingConfig();
      r.APo = e;
      r.Refresh();
      return r;
    }
  }
  Reset() {
    this.DPo = undefined;
    this.RPo = undefined;
    this.UPo = undefined;
    this.PPo = undefined;
    this.xPo = undefined;
    this.wPo.clear();
    this.bPo = undefined;
    this.qPo = undefined;
    this.FPo = undefined;
    this.VPo = undefined;
    this.BPo.Empty();
    this.XAo = undefined;
  }
  Refresh() {
    var t;
    this.XAo = ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraAnimationConfig(this.HandleName);
    if (this.XAo) {
      t = this.XAo.TargetType;
      this.IsEmptyState = this.XAo.IsEmptyState;
      this.FPo = UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetActor(t, this.XAo);
      this.VPo = UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetActorSkeletalMesh(t, this.XAo);
      this.ReplaceCameraTag = this.XAo.ReplaceCameraTag;
      this.bPo = this.vDc(this.ReplaceCameraTag);
      this.qPo = this.bPo?.GetCineCameraComponent();
    }
  }
  set UniqueId(t) {
    this.DPo = t;
  }
  get UniqueId() {
    return this.DPo;
  }
  set HandleName(t) {
    this.PPo = t;
  }
  get HandleName() {
    return this.PPo;
  }
  set ViewName(t) {
    this.RPo = t;
  }
  get ViewName() {
    return this.RPo;
  }
  set UiCameraMappingConfig(t) {
    this.UPo = t;
  }
  get UiCameraMappingConfig() {
    return this.UPo;
  }
  get ExternalTransform() {
    return this.APo;
  }
  GetHandleName() {
    return this.PPo;
  }
  IsEqual(t) {
    return this.HandleName === t.HandleName && this.ReplaceCameraTag === t.ReplaceCameraTag && this.ViewName === t.ViewName && this.UniqueId === t.UniqueId;
  }
  GetUiCameraAnimationConfig() {
    return this.XAo;
  }
  GetTargetActor() {
    return this.FPo;
  }
  GetTargetSkeletalMesh() {
    return this.VPo;
  }
  GetTargetSkeletalMeshTransform() {
    var t = this.GetTargetSkeletalMesh();
    if (t) {
      this.GPo.SetLocation(t.D_K2_GetComponentLocation());
      this.GPo.SetRotation(t.K2_GetComponentQuaternion());
      this.GPo.SetScale3D(t.D_K2_GetComponentScale());
      return this.GPo;
    }
  }
  GetTargetSkeletalMeshSocketTransform() {
    var t = this.GetUiCameraAnimationConfig();
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName);
    var i = this.GetTargetSkeletalMesh();
    if (i) {
      return i.D_GetSocketTransform(t);
    }
  }
  GetTargetArmLength() {
    var t;
    var i;
    if (ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings()) {
      return 0;
    } else if (this.bPo?.IsValid()) {
      if ((t = this.GetTargetActor())?.IsValid() && this.XAo.bTargetActorAsCenter) {
        t = Vector_1.Vector.Create(t.D_K2_GetActorLocation());
        i = Vector_1.Vector.Create(this.bPo.D_K2_GetActorLocation());
        return Vector_1.Vector.Dist2D(t, i);
      } else {
        return 0;
      }
    } else {
      return this.GetUiCameraAnimationConfig().ArmLength;
    }
  }
  GetTargetArmOffsetLocation() {
    var t;
    if (ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings() || this.qPo?.IsValid()) {
      return Vector_1.Vector.ZeroVectorDouble;
    } else {
      t = this.GetUiCameraAnimationConfig();
      return new UE.VectorDouble(t.ArmOffsetLocation);
    }
  }
  GetTargetArmOffsetRotation() {
    if (ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings()) {
      return Rotator_1.Rotator.ZeroRotator;
    }
    if (this.bPo && this.XAo.bTargetActorAsCenter) {
      var t = this.GetTargetActor();
      if (t) {
        t = this.HPo(t.D_K2_GetActorLocation(), this.bPo.D_K2_GetActorLocation(), this.bPo.K2_GetActorRotation());
        return UE.KismetMathLibrary.D_FindLookAtRotation(this.bPo.D_K2_GetActorLocation(), t);
      }
    }
    return this.GetUiCameraAnimationConfig().ArmOffsetRotation;
  }
  GetTargetArmCollisionTest() {
    return !ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings() && !this.bPo?.IsValid() && this.GetUiCameraAnimationConfig().ArmCollisionTest;
  }
  GetTargetFieldOfView() {
    var t = ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings();
    if (t) {
      return t.FieldOfView;
    } else if (this.qPo?.IsValid()) {
      if (this.XAo.IsDynamicFov) {
        return this.yDc(this.qPo.FieldOfView, this.qPo.AspectRatio);
      } else {
        return this.qPo.FieldOfView;
      }
    } else {
      return this.GetUiCameraAnimationConfig().CameraFieldOfView;
    }
  }
  yDc(t, i) {
    var e = UiLayer_1.UiLayer.GetViewportSize();
    var t = MathCommon_1.MathCommon.DegreeToRadian(t);
    var e = e.X / e.Y;
    var i = Math.atan(i / e * Math.tan(t / 2)) * 2;
    return MathCommon_1.MathCommon.RadianToDegree(i);
  }
  GetTargetFocalDistance() {
    var t = ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings();
    if (t) {
      return t.FocusSettings.ManualFocusDistance;
    } else if (this.qPo?.IsValid()) {
      return this.qPo.FocusSettings.ManualFocusDistance;
    } else {
      return this.GetUiCameraAnimationConfig().FocalDistance;
    }
  }
  GetTargetAperture() {
    var t = ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings();
    if (t) {
      return t.CurrentAperture;
    } else if (this.qPo?.IsValid()) {
      return this.qPo.CurrentAperture;
    } else {
      return this.GetUiCameraAnimationConfig().Aperture;
    }
  }
  GetTargetFocalRegion() {
    if (ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings()) {
      return 0;
    } else if (this.qPo?.IsValid()) {
      return this.qPo.CurrentFocalRegion;
    } else {
      return this.GetUiCameraAnimationConfig().FocalRegion;
    }
  }
  GetDefaultLocation() {
    if (this.ExternalTransform) {
      return this.ExternalTransform.GetLocation();
    }
    var t = this.GetUiCameraAnimationConfig();
    if (t) {
      var i = t.TargetType;
      if (i !== 3 && i !== 4 && i !== 5) {
        const e = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.Location);
        return e;
      }
      if (RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow && RenderModuleController_1.RenderModuleController.DebugInUiSceneRendering) {
        (i = new UE.VectorDouble()).X = t.Location.X + RenderModuleController_1.RenderModuleController.DebugUiSceneLoadOffset.X;
        i.Y = t.Location.Y + RenderModuleController_1.RenderModuleController.DebugUiSceneLoadOffset.Y;
        i.Z = t.Location.Z + RenderModuleController_1.RenderModuleController.DebugUiSceneLoadOffset.Z;
        return i;
      }
      const e = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.Location);
      return e;
    }
  }
  HPo(t, i, e) {
    this.NPo.DeepCopy(t);
    this.OPo.DeepCopy(i);
    t = Vector_1.Vector.Dist2D(this.NPo, this.OPo);
    i = e.Pitch;
    e = MathCommon_1.MathCommon.WrapAngle(i);
    i = MathCommon_1.MathCommon.DegreeToRadian(e);
    e = t * Math.tan(i) + this.OPo.Z;
    this.kPo.Set(this.NPo.X, this.NPo.Y, e);
    return this.kPo.ToUeVector();
  }
  GetTargetLocation() {
    var t = ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings();
    if (t) {
      return t.CameraLocation;
    }
    if (this.ExternalTransform) {
      return this.ExternalTransform.GetLocation();
    }
    var t = this.XAo.LocationType;
    var i = this.XAo?.ReplaceCameraTag;
    if (!StringUtils_1.StringUtils.IsEmpty(i)) {
      if (this.bPo?.IsValid()) {
        if ((i = this.GetTargetActor())?.IsValid() && this.XAo.bTargetActorAsCenter) {
          return this.HPo(i.D_K2_GetActorLocation(), this.bPo.D_K2_GetActorLocation(), this.bPo.K2_GetActorRotation());
        } else {
          return this.bPo.D_K2_GetActorLocation();
        }
      } else {
        return undefined;
      }
    }
    var e = this.GetDefaultLocation();
    switch (t) {
      case 0:
        return e;
      case 1:
        var r;
        var a = this.GetTargetSkeletalMeshTransform();
        if (a) {
          if ((s = (r = this.GetTargetSkeletalMesh()).GetOwner())?.IsValid()) {
            if (s.D_K2_GetActorLocation().Equals(r.D_K2_GetComponentLocation(), MathUtils_1.MathUtils.SmallNumber)) {
              return e;
            } else {
              return UE.KismetMathLibrary.D_TransformLocation(a, e);
            }
          } else {
            return undefined;
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("CameraAnimation", 58, "播放Ui镜头获得对应相机位置时，拿不到对应的Actor骨骼，不播放镜头动画");
          }
          return;
        }
      case 2:
        var s = this.GetTargetSkeletalMeshSocketTransform();
        if (s) {
          return UE.KismetMathLibrary.D_TransformLocation(s, e);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("CameraAnimation", 58, "播放Ui镜头获得对应相机位置时，拿不到对应的Actor骨骼，不播放镜头动画");
          }
          return;
        }
    }
  }
  GetDefaultRotation() {
    var t = this.ExternalTransform;
    if (t) {
      return t.GetRotation().Rotator();
    }
    t = this.GetUiCameraAnimationConfig();
    if (t) {
      if (this.bPo?.IsValid()) {
        return this.bPo.K2_GetActorRotation();
      }
      if (!t.IsTrack) {
        return t.Rotation;
      }
      var i = CameraController_1.CameraController.CameraLocation;
      if (t.IsTrackWorldLocation) {
        var e = t.TrackLocation;
        const a = UE.KismetMathLibrary.FindLookAtRotation(i.ToUeVectorOld(), e);
        if (t.bOverrideTrackPitch) {
          a.Pitch = t.TrackPitchOverride;
        }
        return a;
      }
      e = this.GetTargetActor();
      if (!e) {
        return t.Rotation;
      }
      if (this.xPo) {
        var r = t.TrackLocation;
        var e = e.D_K2_GetActorLocation();
        this.xPo.X = e.X + r.X;
        this.xPo.Y = e.Y + r.Y;
        this.xPo.Z = e.Z + r.Z;
        const a = UE.KismetMathLibrary.FindLookAtRotation(i.ToUeVectorOld(), this.xPo);
        if (t.bOverrideTrackPitch) {
          a.Pitch = t.TrackPitchOverride;
        }
        return a;
      }
    }
  }
  GetTargetRotation() {
    var t = ModelManager_1.ModelManager.CameraModel.GetSavedSeqCameraThings();
    if (t) {
      return t.CameraRotation;
    }
    t = this.ExternalTransform;
    if (t) {
      return t.GetRotation().Rotator();
    }
    t = this.XAo?.ReplaceCameraTag;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if (this.bPo?.IsValid()) {
        if (this.GetTargetActor()?.IsValid() && this.XAo.bTargetActorAsCenter) {
          return Rotator_1.Rotator.ZeroRotator;
        } else {
          return this.bPo.K2_GetActorRotation();
        }
      } else {
        return undefined;
      }
    }
    var i = this.GetDefaultRotation();
    switch (this.XAo.RotationType) {
      case 0:
        return i;
      case 2:
        var e = this.GetTargetActor();
        if (e) {
          e = e.D_GetTransform();
          r = Rotator_1.Rotator.Create(0, i.Yaw, 0);
          return UE.KismetMathLibrary.D_TransformRotation(e, r.ToUeRotator());
        } else {
          return i;
        }
      case 1:
        var e = CameraController_1.CameraController.FightCamera.GetComponent(5).CameraRotationInGravity.Yaw;
        var r = Rotator_1.Rotator.Create(0, e, 0);
        CameraUtility_1.CameraUtility.GetRotatorInNormal(r, r);
        return r.ToUeRotator();
      case 3:
        var e = this.GetTargetActor();
        if (e) {
          r = e.D_GetTransform();
          if (e = this.GetTargetSkeletalMesh()) {
            e = e.RelativeRotation;
            e = Rotator_1.Rotator.Create(e.Pitch + i.Pitch, e.Yaw + i.Yaw, e.Roll + i.Roll);
            return UE.KismetMathLibrary.D_TransformRotation(r, e.ToUeRotator());
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("CameraAnimation", 58, "播放Ui镜头获得对应相机旋转时，拿不到对应的Actor骨骼，不播放镜头动画");
            }
            return;
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("CameraAnimation", 58, "播放Ui镜头获得对应相机旋转时，拿不到对应的Actor，不播放镜头动画");
          }
          return;
        }
    }
  }
  GetTargetPostProcessBlendWeight() {
    return (this.qPo?.IsValid() ? this.qPo : this.GetUiCameraAnimationConfig()).PostProcessBlendWeight;
  }
  vDc(t) {
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      var t = FNameUtil_1.FNameUtil.GetDynamicFName(this.ReplaceCameraTag);
      var i = (0, puerts_1.$ref)(this.BPo);
      UE.GameplayStatics.GetAllActorsOfClassWithTag(GlobalData_1.GlobalData.World, UE.CineCameraActor.StaticClass(), t, i);
      var t = (0, puerts_1.$unref)(i);
      if (t && !(t.Num() < 1)) {
        return t.Get(0);
      }
    }
  }
  GetReplaceCameraActor() {
    return this.bPo;
  }
  GetReplaceCameraComponent() {
    return this.qPo;
  }
  CanApplyAnimationHandle() {
    var t = this.GetUiCameraAnimationConfig();
    if (!t) {
      return false;
    }
    var i = t.TargetType;
    var e = FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName);
    var t = t.LocationType === 2;
    if (i === 2 || i === 1) {
      if (!this.VPo) {
        return false;
      }
      if (t) {
        if (FNameUtil_1.FNameUtil.IsEmpty(e)) {
          return false;
        }
        if (!this.VPo.DoesSocketExist(e)) {
          return false;
        }
      }
    }
    return true;
  }
}
exports.UiCameraHandleData = UiCameraHandleData;
//# sourceMappingURL=UiCameraHandleData.js.map