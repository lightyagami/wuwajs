"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraModifyController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CurveBase_1 = require("../../../Core/Utils/Curve/CurveBase");
const CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TsBaseVehicle_1 = require("../../NewWorld/Vehicle/TsBaseVehicle");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const CameraUtility_1 = require("../CameraUtility");
const FightCameraLogicComponent_1 = require("../FightCameraLogicComponent");
const CameraControllerBase_1 = require("./CameraControllerBase");
const MODIFY_SMALL_LENGTH = 1;
const INVALID_MODIFY_INSTANCE = -1;
class CameraFadeOutData {
  constructor() {
    this.ModifyArmLength = false;
    this.StartArmLength = 0;
    this.ArmLength = 0;
    this.ModifyArmOffset = false;
    this.StartArmOffset = Vector_1.Vector.Create();
    this.ArmOffset = Vector_1.Vector.Create();
    this.ModifyCameraOffset = false;
    this.StartCameraOffset = Vector_1.Vector.Create();
    this.CameraOffset = Vector_1.Vector.Create();
    this.ModifyZoomModifier = false;
    this.StartFinalArmLength = 0;
    this.FinalArmLength = 0;
    this.ModifyFov = false;
    this.StartFov = 0;
    this.Fov = 0;
    this.ModifyArmRotationPitch = false;
    this.ModifyArmRotationYaw = false;
    this.ModifyArmRotationRoll = false;
    this.StartArmRotationPitch = 0;
    this.StartArmRotationYaw = 0;
    this.StartArmRotationRoll = 0;
    this.ArmRotationPitch = 0;
    this.ArmRotationYaw = 0;
    this.ArmRotationRoll = 0;
    this.ModifyPlayerLocation = false;
    this.StartPlayerLocation = Vector_1.Vector.Create();
    this.PlayerLocation = Vector_1.Vector.Create();
    this.ElapsedTime = 0;
    this.FadeOutTotalTime = 0;
    this.UseFadeOutTimeLerp = false;
  }
}
class CameraModify {
  constructor(t) {
    this.Name = StringUtils_1.EMPTY_STRING;
    this.ArmLength = 0;
    this.ArmLengthAdditional = 0;
    this.ArmRotation = Rotator_1.Rotator.Create();
    this.ArmRotationAdditional = Rotator_1.Rotator.Create();
    this.CameraFov = 0;
    this.CameraOffset = Vector_1.Vector.Create();
    this.CameraOffsetAdditional = Vector_1.Vector.Create();
    this.IsLockInput = false;
    this.IsModifiedArmLength = false;
    this.IsModifiedArmRotation = false;
    this.IsModifiedArmRotationPitch = false;
    this.IsModifiedArmRotationRoll = false;
    this.IsModifiedArmRotationYaw = false;
    this.IsModifiedCameraFov = false;
    this.IsModifiedCameraOffset = false;
    this.IsModifiedCameraOffsetX = false;
    this.IsModifiedCameraOffsetY = false;
    this.IsModifiedCameraOffsetZ = false;
    this.IsModifiedCameraLens = false;
    this.OverrideCameraInput = false;
    this.ResetFinalArmLength = false;
    this.IsResetFinalArmLengthToSpecificValue = false;
    this.ResetFinalArmLengthToSpecificValue = 0;
    this.ResetFinalArmRotation = false;
    this.IsResetFinalArmRotationToSpecificPitch = false;
    this.ResetFinalArmRotationToSpecificPitch = 0;
    this.IsResetFinalArmRotationToSpecificYaw = false;
    this.ResetFinalArmRotationToSpecificYaw = 0;
    this.StopModifyOnMontageEnd = false;
    this.StopModifyOnZoomInput = false;
    this.IsLerpArmLocation = false;
    this.IsSwitchModifier = false;
    this.IsUseArmLengthFloatCurve = false;
    this.ArmLengthFloatCurve = undefined;
    this.IsUseArmRotationFloatCurve = false;
    this.ArmRotationFloatCurve = undefined;
    this.IsUseFovFloatCurve = false;
    this.FovFloatCurve = undefined;
    this.IsUseLensFloatCurve = false;
    this.LensFloatCurve = undefined;
    this.CameraLens = undefined;
    this.IsForcePlayModify = false;
    this.IsUseCameraOffsetFloatCurve = false;
    this.CameraOffsetFloatCurve = undefined;
    this.IsModifiedArmOffset = false;
    this.ArmOffset = Vector_1.Vector.Create();
    this.IsUseArmOffsetFloatCurve = false;
    this.ArmOffsetFloatCurve = undefined;
    this.Name = t.ModifySettingsAdditional.Name;
    this.ArmLength = t.ArmLength;
    this.ArmLengthAdditional = t.ArmLengthAdditional;
    this.ArmRotation = Rotator_1.Rotator.Create(t.ArmRotation);
    this.ArmRotationAdditional = Rotator_1.Rotator.Create(t.ArmRotationAdditional);
    this.CameraFov = t.CameraFov;
    this.CameraOffset = Vector_1.Vector.Create(t.CameraOffset);
    this.CameraOffsetAdditional = Vector_1.Vector.Create(t.CameraOffsetAdditional);
    this.IsLockInput = t.IsLockInput;
    this.IsModifiedArmLength = t.IsModifiedArmLength;
    this.IsModifiedArmRotation = t.IsModifiedArmRotation;
    this.IsModifiedArmRotationPitch = t.IsModifiedArmRotationPitch;
    this.IsModifiedArmRotationRoll = t.IsModifiedArmRotationRoll;
    this.IsModifiedArmRotationYaw = t.IsModifiedArmRotationYaw;
    this.IsModifiedCameraFov = t.IsModifiedCameraFov;
    this.IsModifiedCameraOffset = t.IsModifiedCameraOffset;
    this.IsModifiedCameraOffsetX = t.IsModifiedCameraOffsetX;
    this.IsModifiedCameraOffsetY = t.IsModifiedCameraOffsetY;
    this.IsModifiedCameraOffsetZ = t.IsModifiedCameraOffsetZ;
    this.IsModifiedCameraLens = t.ModifySettingsAdditional.IsModifiedCameraLens;
    this.OverrideCameraInput = t.OverrideCameraInput;
    this.ResetFinalArmLength = t.ResetFinalArmLength;
    this.IsResetFinalArmLengthToSpecificValue = t.IsResetFinalArmLengthToSpecificValue;
    this.ResetFinalArmLengthToSpecificValue = t.ResetFinalArmLengthToSpecificValue;
    this.ResetFinalArmRotation = t.ResetFinalArmRotation;
    this.IsResetFinalArmRotationToSpecificPitch = t.IsResetFinalArmRotationToSpecificPitch;
    this.ResetFinalArmRotationToSpecificPitch = t.ResetFinalArmRotationToSpecificPitch;
    this.IsResetFinalArmRotationToSpecificYaw = t.IsResetFinalArmRotationToSpecificYaw;
    this.ResetFinalArmRotationToSpecificYaw = t.ResetFinalArmRotationToSpecificYaw;
    this.StopModifyOnMontageEnd = t.StopModifyOnMontageEnd;
    this.StopModifyOnZoomInput = t.StopModifyOnZoomInput;
    this.IsLerpArmLocation = t.IsLerpArmLocation;
    this.IsSwitchModifier = t.IsSwitchModifier;
    this.IsUseArmLengthFloatCurve = t.ModifySettingsAdditional.IsUseArmLengthFloatCurve;
    if (this.IsUseArmLengthFloatCurve) {
      this.ArmLengthFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.ModifySettingsAdditional.ArmLengthFloatCurve);
    }
    this.IsUseArmRotationFloatCurve = t.ModifySettingsAdditional.IsUseArmRotationFloatCurve;
    if (this.IsUseArmRotationFloatCurve) {
      this.ArmRotationFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.ModifySettingsAdditional.ArmRotationFloatCurve);
    }
    this.IsUseFovFloatCurve = t.ModifySettingsAdditional.IsUseFovFloatCurve;
    if (this.IsUseFovFloatCurve) {
      this.FovFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.ModifySettingsAdditional.FovFloatCurve);
    }
    this.IsUseLensFloatCurve = t.ModifySettingsAdditional.IsUseLensFloatCurve;
    if (this.IsUseLensFloatCurve) {
      this.LensFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.ModifySettingsAdditional.LensFloatCurve);
    }
    this.CameraLens = t.ModifySettingsAdditional.CameraLens;
    this.IsForcePlayModify = t.IsForcePlayModify;
    this.IsUseCameraOffsetFloatCurve = t.ModifySettingsAdditional.IsUseCameraOffsetFloatCurve;
    if (this.IsUseCameraOffsetFloatCurve) {
      this.CameraOffsetFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.ModifySettingsAdditional.CameraOffsetFloatCurve);
    }
    this.IsModifiedArmOffset = t.ModifySettingsAdditional.IsModifiedArmOffset;
    this.ArmOffset.DeepCopy(t.ModifySettingsAdditional.ArmOffset);
    this.IsUseArmOffsetFloatCurve = t.ModifySettingsAdditional.IsUseArmOffsetFloatCurve;
    if (this.IsUseArmOffsetFloatCurve) {
      this.ArmOffsetFloatCurve = CurveUtils_1.CurveUtils.CreateCurveByStruct(t.ModifySettingsAdditional.ArmOffsetFloatCurve);
    }
  }
}
class CameraModifyController extends CameraControllerBase_1.CameraControllerBase {
  constructor(t) {
    super(t);
    this.ModifyArmLengthLagSpeed = 0;
    this.ModifyArmOffsetLagSpeed = 0;
    this.ModifyCameraOffsetLagSpeed = 0;
    this.ModifyArmRotationLagSpeed = 0;
    this.ModifyFovLagSpeed = 0;
    this.ModifyInstance = 0;
    this._ue = -0;
    this.uue = undefined;
    this.cue = -0;
    this.mue = -0;
    this.due = -0;
    this.Cue = -0;
    this.gue = false;
    this.fue = undefined;
    this.pue = undefined;
    this.vue = false;
    this.IsModifyFadeOut = false;
    this.CurrentBlendState = 0;
    this.ModifyFadeOutData = new CameraFadeOutData();
    this.ModifySettings = undefined;
    this.j1_ = undefined;
    this.ModifyMontage = undefined;
    this.Eue = undefined;
    this.ModifyArmLength = false;
    this.ModifyArmOffset = false;
    this.Sue = false;
    this.cpa = false;
    this.mpa = false;
    this.dpa = false;
    this.Iue = false;
    this.Tue = undefined;
    this.Lue = "";
    this.Due = Vector_1.Vector.Create();
    this.Rue = Vector_1.Vector.Create();
    this.Uue = false;
    this.Aue = false;
    this.Pue = false;
    this.Cpa = true;
    this.gpa = true;
    this.fpa = true;
    this.wue = Quat_1.Quat.Create();
    this.ppa = 0;
    this.vpa = 0;
    this.Mpa = 0;
    this.bue = Rotator_1.Rotator.Create();
    this.que = Rotator_1.Rotator.Create();
    this.wdc = Rotator_1.Rotator.Create();
    this.Fra = Vector_1.Vector.Create();
    this.Nue = Rotator_1.Rotator.Create();
    this.Rdc = Rotator_1.Rotator.Create();
    this.Vue = new FightCameraLogicComponent_1.VirtualCamera();
    this.Hue = new FightCameraLogicComponent_1.VirtualCamera();
    this.jue = 0;
    this.Wue = Vector_1.Vector.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.EPn = Rotator_1.Rotator.Create();
    this.Adc = Rotator_1.Rotator.Create();
    this.Pdc = Rotator_1.Rotator.Create();
    this.az = Quat_1.Quat.Create();
    this.KJ = Quat_1.Quat.Create();
    this.Lz = Vector_1.Vector.Create();
    this.Dkm = true;
    this.Ukm = true;
    this.Gjs = () => {
      if (this.ModifyMontage && this.ModifyMontage !== this.Eue?.GetCurrentActiveMontage()) {
        this.EndModify(true, true);
      }
    };
    this.Kue = (t, i) => {
      if (this.ModifyMontage && this.ModifyMontage !== this.Eue?.GetCurrentActiveMontage()) {
        this.EndModify(true, true);
      }
    };
    this.Xue = t => {
      if (this.ModifyMontage && this.ModifyMontage !== t) {
        this.EndModify(true, true);
      }
    };
    this.$ue = t => {
      if (t === this.Tue?.EntityId) {
        this.EndModify(true, false);
      }
    };
    this.Yue = false;
    this.OnChangeRole = (t, i) => {
      if (!this.ModifySettings?.IsSwitchModifier) {
        this.EndModify(true, true);
      }
    };
    this.Jue = 0;
  }
  get yue() {
    return this.cpa || this.mpa || this.dpa;
  }
  get IsAiming() {
    return this.Yue;
  }
  set IsAiming(t) {
    if (this.Yue !== t) {
      this.Yue = t;
      if (this.Yue) {
        this.Lock(this);
      } else {
        this.Unlock(this);
      }
    }
  }
  Name() {
    return "ModifyController";
  }
  OnInit() {
    this.SetConfigMap(1, "ModifyArmLengthLagSpeed");
    this.SetConfigMap(2, "ModifyCameraOffsetLagSpeed");
    this.SetConfigMap(3, "ModifyArmRotationLagSpeed");
    this.SetConfigMap(4, "ModifyFovLagSpeed");
    this.SetConfigMap(5, "ModifyArmOffsetLagSpeed");
  }
  OnDisable() {
    if (this.IsModified) {
      this.EndModify(true, false);
    }
    if (this.IsModifyFadeOut) {
      this.EndModifyFadeOut();
    }
  }
  UpdateInternal(t) {
    this.IsAiming = this.Camera.ContainsTag(428837378);
    if (!this.IsAiming) {
      this.zue(t);
      this.Zue(t);
    }
  }
  UpdateDeactivateInternal(t) {
    this.IsAiming = this.Camera.ContainsTag(428837378);
    if (!this.IsAiming) {
      this.zue(t);
    }
  }
  get IsActivate() {
    return super.IsActivate || !!this.ModifySettings?.IsForcePlayModify;
  }
  get IsModified() {
    return !!this.ModifySettings;
  }
  ApplyCameraModify(t, i, s, h, e, r, a, o, _, l, M, n) {
    if (!super.IsActivate && !r.IsForcePlayModify) {
      return INVALID_MODIFY_INSTANCE;
    }
    if (t && t.TagName !== "None" && !this.Camera.ContainsTag(t.TagId)) {
      return INVALID_MODIFY_INSTANCE;
    }
    if (r.Priority < this.Jue) {
      return INVALID_MODIFY_INSTANCE;
    }
    ++this.ModifyInstance;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "ApplyCameraModify", ["tag", t?.TagName], ["montage", a?.GetName()], ["ArmLengthAddition", r.CameraOffsetAdditional], ["ModifyInstance", this.ModifyInstance]);
    }
    var v = this.IsModified || this.IsModifyFadeOut;
    var U = this.IsModified && (this.ModifyArmLength || !!this.ModifySettings?.IsModifiedArmLength);
    var c = this.IsModified && (this.ModifyArmOffset || !!this.ModifySettings?.IsModifiedArmOffset);
    var d = v && this.Iue;
    var L = this.IsModified && (this.Uue || !!this.ModifySettings?.IsModifiedCameraFov);
    var u = this.IsModified && (this.Sue || !!this.ModifySettings?.IsModifiedCameraOffset);
    this.EndModify(!v, false);
    this.gue = d;
    this.Jue = r.Priority;
    if (t && t.TagName !== "None") {
      this.uue = t;
    }
    this.Camera.CameraAdjustController.Lock(this);
    this.Camera.CameraGuideController.Lock(this);
    this.Camera.CopyVirtualCamera(this.Hue, this.Camera.CurrentCamera);
    if (!v) {
      this.Camera.CopyVirtualCamera(this.Vue, this.Hue);
    }
    this.cue = i;
    this.mue = s;
    this.due = h;
    this.Cue = e;
    this.fue = o instanceof CurveBase_1.CurveBase ? o : CurveUtils_1.CurveUtils.CreateCurveByStruct(o);
    this.pue = _ instanceof CurveBase_1.CurveBase ? _ : CurveUtils_1.CurveUtils.CreateCurveByStruct(_);
    this._ue = 0;
    this.ModifySettings = new CameraModify(r);
    this.j1_ = a;
    if (this.ModifySettings.StopModifyOnMontageEnd && a instanceof UE.AnimMontage) {
      this.ModifyMontage = a;
      this.Eue = this.Gqn(l, n);
      this.Eue?.OnMontageStarted.Add(this.Xue);
      this.Eue?.OnMontageEnded.Add(this.Kue);
      this.Eue?.OnAllMontageInstancesEnded.Add(this.Gjs);
    }
    this.ModifyArmLength = U || !MathUtils_1.MathUtils.IsNearlyEqual(this.ModifySettings.ArmLengthAdditional, 0);
    this.ModifyArmOffset = c;
    this.Sue = u || !this.ModifySettings.CameraOffsetAdditional.IsNearlyZero(MathUtils_1.MathUtils.KindaSmallNumber);
    this.cpa = !MathUtils_1.MathUtils.IsNearlyZero(this.ModifySettings.ArmRotationAdditional.Pitch, MathUtils_1.MathUtils.KindaSmallNumber);
    this.mpa = !MathUtils_1.MathUtils.IsNearlyZero(this.ModifySettings.ArmRotationAdditional.Yaw, MathUtils_1.MathUtils.KindaSmallNumber);
    this.dpa = !MathUtils_1.MathUtils.IsNearlyZero(this.ModifySettings.ArmRotationAdditional.Roll, MathUtils_1.MathUtils.KindaSmallNumber);
    this.Iue = !!l;
    this.Tue = l;
    this.Lue = M;
    if (this.Iue) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.$ue);
    }
    this.jue = this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition;
    this.Wue.DeepCopy(this.Camera.CameraAutoController.CurrentAutoCameraArmOffset);
    this.Uue = L || this.ModifySettings.IsModifiedCameraFov;
    this.Aue = this.ModifySettings.IsModifiedCameraLens;
    if (this.ModifySettings.OverrideCameraInput && ((this.cpa || this.ModifySettings.IsModifiedArmRotation && this.ModifySettings.IsModifiedArmRotationPitch) && this.Camera.CameraInputController.LockArmRotationPitch(this), (this.mpa || this.ModifySettings.IsModifiedArmRotation && this.ModifySettings.IsModifiedArmRotationYaw) && this.Camera.CameraInputController.LockArmRotationYaw(this), this.ModifyArmLength || this.ModifySettings.IsModifiedArmLength)) {
      this.Camera.CameraInputController.LockArmLength(this);
    }
    if (this.ModifySettings.IsLockInput) {
      this.Camera.CameraInputController.Lock(this);
    }
    if (this.yue || this.ModifySettings.IsModifiedArmRotation) {
      this.Camera.CameraInputController.ResetCameraInput();
    }
    this.wue.Reset();
    this.Cpa = true;
    this.gpa = true;
    this.fpa = true;
    return this.ModifyInstance;
  }
  Zue(e) {
    if (this.IsModified) {
      this._ue += e;
      if (this.uue && !this.vue) {
        if (this.Camera.ContainsTag(this.uue.TagId)) {
          if (this._ue > this.mue) {
            this._ue = this.mue;
          }
        } else if (this._ue < this.mue + this.cue) {
          this.EndModify(true, true);
        }
      }
      let t = undefined;
      let i = 0;
      let s = 0;
      let h = 0;
      var r;
      if (this._ue < this.mue) {
        t = 1;
        h = this._ue / this.mue;
        i = this.mue > 0 ? this.fue.GetCurrentValue(this._ue / this.mue) : 1;
        s = this.mue > 0 ? this.fue.GetOffsetRate((this._ue - e) / this.mue, e / this.mue) : 1;
      } else if (this._ue < this.mue + this.cue) {
        t = 2;
        i = 1;
        s = 1;
      } else {
        t = 3;
        r = this._ue - this.mue - this.cue;
        i = this.due > 0 ? this.pue.GetCurrentValue(r / this.due) : 1;
        s = this.due > 0 ? this.pue.GetOffsetRate((r - e) / this.due, e / this.due) : 1;
        this.Jue = 0;
      }
      this.CurrentBlendState = t;
      this.ece();
      this.tce(t, i, s);
      this.ice(t, i, s);
      this.oce(t, i, h);
      this.Vra(t, i, h);
      this.rce(t, i, h);
      this.nce(t, i, h);
      this.sce(t, i, h);
      this.ace(t, i, h);
      if (this._ue > this.mue + this.cue + this.due) {
        this.EndModify(true, false);
      } else if (this.ModifySettings.StopModifyOnZoomInput && (this.ModifyArmLength || this.ModifySettings.IsModifiedArmLength) && this._q1()) {
        this.EndModify(true, true);
      }
    }
  }
  tce(t, i, s) {
    if (this.Iue) {
      if (this.Tue?.Mesh?.IsValid()) {
        this.Due.FromUeVector(this.Tue.Mesh.D_GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(this.Lue)));
        switch (t) {
          case 1:
            this.Lz.DeepCopy(this.gue ? this.Rue : this.Camera.PlayerLocation);
            Vector_1.Vector.Lerp(this.Lz, this.Due, i, this.Camera.PlayerLocation);
            this.Rue.DeepCopy(this.Camera.PlayerLocation);
            this.Iue = true;
            break;
          case 2:
            this.Camera.PlayerLocation.DeepCopy(this.Due);
            this.Rue.DeepCopy(this.Camera.PlayerLocation);
            this.Iue = true;
            break;
          case 3:
            Vector_1.Vector.Lerp(this.Rue, this.Camera.PlayerLocation, i, this.Camera.PlayerLocation);
            this.Rue.DeepCopy(this.Camera.PlayerLocation);
            this.Iue = true;
            break;
          default:
            this.Iue = false;
        }
      } else {
        this.EndModify(true, false);
      }
    }
  }
  ice(t, i, s) {
    if (this.ModifySettings.IsLerpArmLocation) {
      switch (t) {
        case 1:
          Vector_1.Vector.Lerp(this.Camera.CurrentCamera.ArmLocation, this.Camera.PlayerLocation, s, this.Camera.DesiredCamera.ArmLocation);
          Vector_1.Vector.Lerp(this.Wue, Vector_1.Vector.Create(0, 0, 0), s, this.Camera.CameraAutoController.CurrentAutoCameraArmOffset);
          break;
        case 3:
          Vector_1.Vector.Lerp(this.Camera.CurrentCamera.ArmLocation, this.Camera.TmpArmLocation, s, this.Camera.DesiredCamera.ArmLocation);
          Vector_1.Vector.Lerp(Vector_1.Vector.Create(0, 0, 0), this.Wue, s, this.Camera.CameraAutoController.CurrentAutoCameraArmOffset);
          break;
        default:
          this.Camera.DesiredCamera.ArmLocation.DeepCopy(this.Camera.PlayerLocation);
          this.Camera.CameraAutoController.CurrentAutoCameraArmOffset.Set(0, 0, 0);
      }
      this.Camera.IsModifiedArmLocation = true;
    }
  }
  oce(s, h, e) {
    if (this.ModifySettings.IsModifiedArmLength || this.ModifyArmLength) {
      let t = h;
      let i = 0;
      var r = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera);
      i = this.ModifySettings.IsModifiedArmLength ? this.ModifySettings.ArmLength / r : this.Camera.GetArmLengthWithSettingAndZoom(this.Vue) / r;
      if (this.ModifyArmLength) {
        i += this.ModifySettings.ArmLengthAdditional / r;
        i = Math.max(i, this.Camera.CurrentCamera.MinArmLength / r);
      }
      switch (s) {
        case 1:
          if (this.ModifySettings.IsUseArmLengthFloatCurve) {
            t = this.ModifySettings.ArmLengthFloatCurve.GetCurrentValue(e);
          }
          this.Camera.DesiredCamera.ZoomModifier = MathUtils_1.MathUtils.Lerp(this.Hue.ZoomModifier, i, t);
          if (this.ModifySettings.IsModifiedArmLength) {
            this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition = MathUtils_1.MathUtils.Lerp(this.jue, 0, t);
          }
          break;
        case 2:
          this.Camera.DesiredCamera.ZoomModifier = i;
          if (this.ModifySettings.IsModifiedArmLength) {
            this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition = 0;
          }
          break;
        case 3:
          this.Camera.DesiredCamera.ZoomModifier = MathUtils_1.MathUtils.Lerp(i, MathUtils_1.MathUtils.Clamp(this.Fl1(), this.Camera.CurrentCamera.MinArmLength, this.Camera.CurrentCamera.MaxArmLength) / this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera), h);
          if (this.ModifySettings.IsModifiedArmLength) {
            this.Camera.CameraAutoController.CurrentAutoCameraArmLengthAddition = MathUtils_1.MathUtils.Lerp(0, this.jue, h);
          }
      }
      this.Camera.IsModifiedArmLength = true;
      this.Camera.IsModifiedZoomModifier = true;
      if (this.Camera.DesiredCamera.ZoomModifier <= MathUtils_1.MathUtils.SmallNumber && this.Dkm && (this.Dkm = false, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Camera", 57, "[DebugZoomModifier UpdateArmLengthModifier]", ["state", s], ["DesiredCamera.ZoomModifier", this.Camera.DesiredCamera.ZoomModifier], ["this.StartVirtualCamera.ZoomModifier", this.Hue.ZoomModifier], ["targetZoomModifier", i], ["ratio", t], ["Anim", this.j1_?.GetName() ?? "None"], ["CameraConfigTags", this.Camera.CameraConfigController.GetCameraConfigTagsContent()]);
      }
    }
  }
  Vra(i, s, h) {
    if (this.ModifySettings.IsModifiedArmOffset || this.ModifyArmOffset) {
      this.Fra.DeepCopy(this.ModifySettings.ArmOffset);
      let t = s;
      switch (i) {
        case 1:
          if (this.ModifySettings.IsUseArmOffsetFloatCurve) {
            t = this.ModifySettings.ArmOffsetFloatCurve.GetCurrentValue(h);
          }
          Vector_1.Vector.Lerp(this.Hue.ArmOffset, this.Fra, t, this.Camera.DesiredCamera.ArmOffset);
          break;
        case 2:
          this.Camera.DesiredCamera.ArmOffset.DeepCopy(this.Fra);
          break;
        case 3:
          var e = Vector_1.Vector.Create(this.Camera.ArmOffsetX, this.Camera.ArmOffsetY, this.Camera.ArmOffsetZ);
          Vector_1.Vector.Lerp(this.Fra, e, t, this.Camera.DesiredCamera.ArmOffset);
      }
      this.Camera.IsModifiedCameraOffset = true;
    }
  }
  rce(i, s, h) {
    if (this.ModifySettings.IsModifiedCameraOffset || this.Sue) {
      var e = Vector_1.Vector.Create();
      if (this.ModifySettings.IsModifiedCameraOffset) {
        e.FromUeVector(this.ModifySettings.CameraOffset);
        e.Set(this.ModifySettings.IsModifiedCameraOffsetX ? this.ModifySettings.CameraOffset.X : this.Camera.CameraOffsetX, this.ModifySettings.IsModifiedCameraOffsetY ? this.ModifySettings.CameraOffset.Y : this.Camera.CameraOffsetY, this.ModifySettings.IsModifiedCameraOffsetZ ? this.ModifySettings.CameraOffset.Z : this.Camera.CameraOffsetZ);
      } else {
        e.X = this.Camera.CameraOffsetX;
        e.Y = this.Camera.CameraOffsetY;
        e.Z = this.Camera.CameraOffsetZ;
      }
      if (this.Sue) {
        e.AdditionEqual(Vector_1.Vector.Create(this.ModifySettings.CameraOffsetAdditional));
      }
      let t = s;
      switch (i) {
        case 1:
          if (this.ModifySettings.IsUseCameraOffsetFloatCurve) {
            t = this.ModifySettings.CameraOffsetFloatCurve.GetCurrentValue(h);
          }
          Vector_1.Vector.Lerp(this.Hue.CameraOffset, e, t, this.Camera.DesiredCamera.CameraOffset);
          break;
        case 2:
          this.Camera.DesiredCamera.CameraOffset.DeepCopy(e);
          break;
        case 3:
          var r = Vector_1.Vector.Create(this.Camera.CameraOffsetX, this.Camera.CameraOffsetY, this.Camera.CameraOffsetZ);
          Vector_1.Vector.Lerp(e, r, t, this.Camera.DesiredCamera.CameraOffset);
      }
      this.Camera.IsModifiedCameraOffset = true;
    }
  }
  nce(t, i, s) {
    this.bue.FromUeRotator(this.Camera.PlayerRotator);
    if (this.Iue) {
      if (this.Tue instanceof TsBaseCharacter_1.default && this.Tue.CharacterActorComponent?.Valid) {
        this.bue.FromUeRotator(this.Tue.CharacterActorComponent.ActorRotationProxy);
      } else if (this.Tue instanceof TsBaseVehicle_1.default && this.Tue.VehicleActorComponent?.Valid) {
        this.bue.FromUeRotator(this.Tue.VehicleActorComponent.ActorRotationProxy);
      }
    }
    if (this.Camera.IsInNormalGravityMode()) {
      this.Nue.DeepCopy(this.lce());
    } else {
      this.Nue.DeepCopy(this.xdc());
    }
    this.bue.Quaternion(this.az);
    this.Camera.GravityInverseQuat.Multiply(this.az, this.KJ);
    this.KJ.Rotator(this.Gue);
    this.bue.DeepCopy(this.Gue);
    GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Nue, this.Camera.GravityInverseQuat, this.Rdc);
    this.Spa(t, i, s, this.bue.Pitch, this.Rdc.Pitch);
    this.Epa(t, i, s, this.bue.Yaw, this.Rdc.Yaw);
    this.ypa(t, i, s, this.bue.Roll, this.Rdc.Roll);
  }
  Spa(i, s, h, e, r) {
    if (!this.Camera.IsModifiedArmRotationPitch && (this.ModifySettings.IsModifiedArmRotation && this.ModifySettings.IsModifiedArmRotationPitch || this.cpa) && (this.ModifySettings.IsLockInput || !this.Pue)) {
      if (this.Camera.IsInNormalGravityMode()) {
        this.ppa = this.Hue.ArmRotation.Pitch;
      } else {
        this.ppa = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Hue.ArmRotation, this.Camera.GravityInverseQuat, this.Gue).Pitch;
      }
      if (this.ModifySettings.IsModifiedArmRotationPitch) {
        if (this.Cpa) {
          this.que.Pitch = e + this.ModifySettings.ArmRotation.Pitch;
          this.Cpa = false;
        }
        this.ppa = this.que.Pitch;
      }
      if (this.cpa) {
        this.ppa += this.ModifySettings.ArmRotationAdditional.Pitch;
      }
      this.Camera.IsModifiedArmRotationPitch = this.ModifySettings.IsModifiedArmRotationPitch || this.cpa;
      let t = s;
      this.Gue.DeepCopy(this.Camera.DesiredCamera.ArmRotation);
      this.Gue.Quaternion(this.az);
      switch (i) {
        case 1:
          var a;
          if (this.ModifySettings.IsUseArmRotationFloatCurve) {
            t = this.ModifySettings.ArmRotationFloatCurve.GetCurrentValue(h);
          }
          if (this.Camera.IsInNormalGravityMode()) {
            this.Camera.DesiredCamera.ArmRotation.Pitch = Rotator_1.Rotator.AxisLerp(this.Hue.ArmRotation.Pitch, this.ppa, t);
          } else {
            a = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Hue.ArmRotation, this.Camera.GravityInverseQuat, this.Gue).Pitch;
            GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
            this.EPn.Pitch = Rotator_1.Rotator.AxisLerp(a, this.ppa, t);
            GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
          }
          break;
        case 2:
          if (this.Camera.IsInNormalGravityMode()) {
            this.Camera.DesiredCamera.ArmRotation.Pitch = this.ppa;
          } else {
            GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
            this.EPn.Pitch = this.ppa;
            GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
          }
          break;
        case 3:
          if (this.Camera.IsInNormalGravityMode()) {
            this.Camera.DesiredCamera.ArmRotation.Pitch = Rotator_1.Rotator.AxisLerp(this.ppa, r, t);
          } else {
            GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
            this.EPn.Pitch = Rotator_1.Rotator.AxisLerp(this.ppa, r, t);
            GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
          }
      }
    }
  }
  Epa(i, s, h, e, r) {
    if (!this.Camera.IsModifiedArmRotationYaw && (this.ModifySettings.IsModifiedArmRotation && this.ModifySettings.IsModifiedArmRotationYaw || this.mpa) && (this.ModifySettings.IsLockInput || !this.Pue)) {
      if (this.Camera.IsInNormalGravityMode()) {
        this.vpa = this.Hue.ArmRotation.Yaw;
      } else {
        this.vpa = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Hue.ArmRotation, this.Camera.GravityInverseQuat, this.Gue).Yaw;
      }
      if (this.ModifySettings.IsModifiedArmRotationYaw) {
        if (this.gpa) {
          this.que.Yaw = e + this.ModifySettings.ArmRotation.Yaw;
          this.gpa = false;
        }
        this.vpa = this.que.Yaw;
      }
      if (this.mpa) {
        this.vpa += this.ModifySettings.ArmRotationAdditional.Yaw;
      }
      this.Camera.IsModifiedArmRotationYaw = this.ModifySettings.IsModifiedArmRotationYaw || this.mpa;
      let t = s;
      switch (i) {
        case 1:
          var a;
          if (this.ModifySettings.IsUseArmRotationFloatCurve) {
            t = this.ModifySettings.ArmRotationFloatCurve.GetCurrentValue(h);
          }
          if (this.Camera.IsInNormalGravityMode()) {
            this.Camera.DesiredCamera.ArmRotation.Yaw = Rotator_1.Rotator.AxisLerp(this.Hue.ArmRotation.Yaw, this.vpa, t);
          } else {
            a = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Hue.ArmRotation, this.Camera.GravityInverseQuat, this.Gue).Yaw;
            GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
            this.EPn.Yaw = Rotator_1.Rotator.AxisLerp(a, this.vpa, t);
            GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
          }
          break;
        case 2:
          if (this.Camera.IsInNormalGravityMode()) {
            this.Camera.DesiredCamera.ArmRotation.Yaw = this.vpa;
          } else {
            GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
            this.EPn.Yaw = this.vpa;
            GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
          }
          break;
        case 3:
          if (this.Camera.IsInNormalGravityMode()) {
            this.Camera.DesiredCamera.ArmRotation.Yaw = Rotator_1.Rotator.AxisLerp(this.vpa, r, t);
          } else {
            GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
            this.EPn.Yaw = Rotator_1.Rotator.AxisLerp(this.vpa, r, t);
            GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
          }
      }
    }
  }
  ypa(i, s, h, e, r) {
    if (!this.Camera.IsModifiedArmRotationRoll && (this.ModifySettings.IsModifiedArmRotation && this.ModifySettings.IsModifiedArmRotationRoll || this.dpa)) {
      if (this.Camera.IsInNormalGravityMode()) {
        this.Mpa = this.Hue.ArmRotation.Roll;
      } else {
        this.Mpa = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Hue.ArmRotation, this.Camera.GravityInverseQuat, this.Gue).Roll;
      }
      if (this.ModifySettings.IsModifiedArmRotationRoll) {
        if (this.fpa) {
          this.que.Roll = e + this.ModifySettings.ArmRotation.Roll;
          this.fpa = false;
        }
        this.Mpa = this.que.Roll;
      }
      if (this.dpa) {
        this.Mpa += this.ModifySettings.ArmRotationAdditional.Roll;
      }
      this.Camera.IsModifiedArmRotationRoll = this.ModifySettings.IsModifiedArmRotationRoll || this.dpa;
      let t = s;
      switch (i) {
        case 1:
          var a;
          if (this.ModifySettings.IsUseArmRotationFloatCurve) {
            t = this.ModifySettings.ArmRotationFloatCurve.GetCurrentValue(h);
          }
          if (this.Camera.IsInNormalGravityMode()) {
            this.Camera.DesiredCamera.ArmRotation.Roll = Rotator_1.Rotator.AxisLerp(this.Hue.ArmRotation.Roll, this.Mpa, t);
          } else {
            a = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Hue.ArmRotation, this.Camera.GravityInverseQuat, this.Gue).Roll;
            GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
            this.EPn.Roll = Rotator_1.Rotator.AxisLerp(a, this.Mpa, t);
            GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
          }
          break;
        case 2:
          if (this.Camera.IsInNormalGravityMode()) {
            this.Camera.DesiredCamera.ArmRotation.Roll = this.Mpa;
          } else {
            GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
            this.EPn.Roll = this.Mpa;
            GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
          }
          break;
        case 3:
          if (this.Camera.IsInNormalGravityMode()) {
            this.Camera.DesiredCamera.ArmRotation.Roll = Rotator_1.Rotator.AxisLerp(this.Mpa, r, t);
          } else {
            GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
            this.EPn.Roll = Rotator_1.Rotator.AxisLerp(this.Mpa, r, t);
            GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
          }
      }
    }
  }
  ece() {
    var t;
    var i;
    if (this.Camera.CharacterInputComponent?.Valid && ([t, i] = this.Camera.CharacterInputComponent.GetCameraInput(), Math.abs(t) > MathUtils_1.MathUtils.KindaSmallNumber || Math.abs(i) > MathUtils_1.MathUtils.KindaSmallNumber)) {
      this.Pue = true;
    }
  }
  _q1() {
    return !!this.Camera.CharacterInputComponent?.Valid && !MathUtils_1.MathUtils.IsNearlyZero(this.Camera.CharacterInputComponent.GetZoomInput(), MathUtils_1.MathUtils.KindaSmallNumber);
  }
  lce() {
    if (this.ModifySettings.ResetFinalArmRotation) {
      if (this.ModifySettings.IsResetFinalArmRotationToSpecificPitch) {
        this.Nue.Pitch = this.ModifySettings.ResetFinalArmRotationToSpecificPitch;
      } else {
        this.Nue.Pitch = this.Camera.DesiredCamera.ArmRotation.Pitch;
      }
      if (this.ModifySettings.IsResetFinalArmRotationToSpecificYaw) {
        CameraUtility_1.CameraUtility.GetCameraCharacterRotation(this.Gue);
        this.Nue.Yaw = this.Gue.Yaw + this.ModifySettings.ResetFinalArmRotationToSpecificYaw;
      } else {
        this.Nue.Yaw = this.Camera.DesiredCamera.ArmRotation.Yaw;
      }
      this.Nue.Roll = 0;
      return this.Nue;
    } else {
      return this.Vue.ArmRotation;
    }
  }
  xdc() {
    this.Nue.Reset();
    this.Gue.Reset();
    if (this.ModifySettings.ResetFinalArmRotation) {
      if (!this.ModifySettings.IsResetFinalArmRotationToSpecificPitch) {
        this.Nue.Pitch = this.Camera.DesiredCamera.ArmRotation.Pitch;
      }
      if (!this.ModifySettings.IsResetFinalArmRotationToSpecificYaw) {
        this.Nue.Yaw = this.Camera.DesiredCamera.ArmRotation.Yaw;
      }
      this.Nue.Roll = 0;
      GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Nue, this.Camera.GravityInverseQuat, this.EPn);
      if (this.ModifySettings.IsResetFinalArmRotationToSpecificPitch) {
        this.EPn.Pitch = this.ModifySettings.ResetFinalArmRotationToSpecificPitch;
      }
      if (this.ModifySettings.IsResetFinalArmRotationToSpecificYaw) {
        CameraUtility_1.CameraUtility.GetCameraCharacterRotation(this.Adc);
        GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Adc, this.Camera.GravityInverseQuat, this.Pdc);
        this.EPn.Yaw = this.Pdc.Yaw + this.ModifySettings.ResetFinalArmRotationToSpecificYaw;
      }
      this.EPn.Roll = 0;
      GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Nue);
      return this.Nue;
    } else {
      return this.Vue.ArmRotation;
    }
  }
  hce() {
    return (this.ModifySettings.ResetFinalArmLength ? this.Camera.DesiredCamera : this.Vue).ArmLength;
  }
  Fl1() {
    if (this.ModifySettings.ResetFinalArmLength && this.ModifySettings.IsModifiedArmLength) {
      const t = MathUtils_1.MathUtils.Clamp(this.ModifySettings.IsResetFinalArmLengthToSpecificValue ? this.ModifySettings.ResetFinalArmLengthToSpecificValue : this.ModifySettings.ArmLength + (this.ModifyArmLength ? this.ModifySettings.ArmLengthAdditional : 0), this.Camera.CurrentCamera.MinArmLength, this.Camera.CurrentCamera.MaxArmLength);
      return t;
    }
    const t = MathUtils_1.MathUtils.Clamp(this.Vue.ZoomModifier * this.Camera.GetArmLengthWithSetting(this.Vue), this.Camera.CurrentCamera.MinArmLength, this.Camera.CurrentCamera.MaxArmLength);
    return t;
  }
  sce(i, s, h) {
    if (this.Uue) {
      let t = s;
      var e = this.ModifySettings.IsModifiedCameraFov ? this.ModifySettings.CameraFov : this.Vue.Fov;
      switch (i) {
        case 1:
          if (this.ModifySettings.IsUseFovFloatCurve) {
            t = this.ModifySettings.FovFloatCurve.GetCurrentValue(h);
          }
          this.Camera.DesiredCamera.Fov = MathUtils_1.MathUtils.Lerp(this.Hue.Fov, e, t);
          break;
        case 2:
          this.Camera.DesiredCamera.Fov = e;
          break;
        case 3:
          this.Camera.DesiredCamera.Fov = MathUtils_1.MathUtils.Lerp(e, this.Camera.Fov, t);
      }
      this.Camera.IsModifiedFov = true;
    }
  }
  ace(h, e, r) {
    if (this.Aue) {
      let t = e;
      let i = undefined;
      let s = 0;
      var a = this.ModifySettings.CameraLens;
      switch (h) {
        case 1:
          if (this.ModifySettings.IsUseLensFloatCurve) {
            t = this.ModifySettings.LensFloatCurve.GetCurrentValue(r);
          }
          i = MathUtils_1.MathUtils.Lerp(a.StartFStop, a.EndFStop, t);
          s = MathUtils_1.MathUtils.Lerp(a.RadialBlurStartIntensity, a.RadialBlurEndIntensity, t);
          break;
        case 2:
          i = a.EndFStop;
          s = a.RadialBlurEndIntensity;
          break;
        case 3:
          i = MathUtils_1.MathUtils.Lerp(a.EndFStop, a.StartFStop, t);
          s = MathUtils_1.MathUtils.Lerp(a.RadialBlurEndIntensity, a.RadialBlurStartIntensity, t);
      }
      this.Camera.ApplyDepthOfField(i, undefined, undefined, undefined);
      this.Camera.ApplyRadialBlur(s, a.RadialBlurCenter, a.RadialBlurRadius, a.RadialBlurHardness, a.RadialBlurPassNumber, a.RadialBlurSampleNumber);
    }
  }
  EndModify(t, i) {
    if (this.IsModified) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Camera", 6, "EndModify", ["withFadeOut", t]);
      }
      this.Jue = 0;
      this.Camera.CameraAdjustController.Unlock(this);
      this.Camera.CameraGuideController.Unlock(this);
      if (this.ModifySettings.OverrideCameraInput && ((this.cpa || this.ModifySettings.IsModifiedArmRotation && this.ModifySettings.IsModifiedArmRotationPitch) && this.Camera.CameraInputController.UnlockArmRotationPitch(this), (this.mpa || this.ModifySettings.IsModifiedArmRotation && this.ModifySettings.IsModifiedArmRotationYaw) && this.Camera.CameraInputController.UnlockArmRotationYaw(this), this.ModifyArmLength || this.ModifySettings.IsModifiedArmLength)) {
        this.Camera.CameraInputController.UnlockArmLength(this);
      }
      if (t) {
        this.uce(i);
      } else {
        this.EndModifyFadeOut();
      }
      this.ModifyMontage = undefined;
      this.j1_ = undefined;
      if (this.Eue?.IsValid()) {
        this.Eue.OnMontageStarted.Remove(this.Xue);
        this.Eue.OnMontageEnded.Remove(this.Kue);
        this.Eue.OnAllMontageInstancesEnded.Remove(this.Gjs);
        this.Eue = undefined;
      }
      this.ModifyArmLength = false;
      this.ModifyArmOffset = false;
      if (this.ModifySettings.IsModifiedCameraOffset || this.Sue) {
        this.Sue = false;
      }
      if (this.yue) {
        this.cpa = false;
        this.mpa = false;
        this.dpa = false;
      }
      this.Uue &&= false;
      if (this.uue) {
        this.uue = undefined;
        this.vue = false;
      }
      if (this.Aue) {
        this.Aue = false;
        this.Camera.ExitDepthOfField();
        this.Camera.ExitRadialBlur();
      }
      this.Pue = false;
      this.ModifySettings = undefined;
      this.Camera.CameraInputController.Unlock(this);
      if (this.Tue) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.$ue);
      }
      this.Tue = undefined;
      this.Iue = false;
      this.gue = false;
    }
  }
  uce(t = false) {
    this.ModifyFadeOutData.ModifyArmLength = this.ModifySettings.IsModifiedArmLength || this.ModifyArmLength;
    if (this.ModifyFadeOutData.ModifyArmLength) {
      this.ModifyFadeOutData.StartArmLength = this.Camera.CurrentCamera.ArmLength;
      this.ModifyFadeOutData.ArmLength = this.hce();
    }
    this.ModifyFadeOutData.ModifyZoomModifier = this.ModifyFadeOutData.ModifyArmLength;
    if (this.ModifyFadeOutData.ModifyZoomModifier) {
      this.ModifyFadeOutData.StartFinalArmLength = this.Camera.GetArmLengthWithSettingAndZoom(this.Camera.CurrentCamera, false);
      this.ModifyFadeOutData.FinalArmLength = this.Fl1();
    }
    this.ModifyFadeOutData.ModifyArmOffset = this.ModifySettings.IsModifiedArmOffset || this.ModifyArmOffset;
    if (this.ModifyFadeOutData.ModifyArmOffset) {
      this.ModifyFadeOutData.StartArmOffset = this.Camera.CurrentCamera.ArmOffset;
      this.ModifyFadeOutData.ArmOffset.DeepCopy(this.Vue.ArmOffset);
    }
    GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.CurrentCamera.ArmRotation, this.Camera.GravityInverseQuat, this.wdc);
    if (this.Camera.IsInNormalGravityMode()) {
      this.Nue.DeepCopy(this.lce());
    } else {
      this.Nue.DeepCopy(this.xdc());
    }
    GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Nue, this.Camera.GravityInverseQuat, this.Rdc);
    this.ModifyFadeOutData.ModifyArmRotationPitch = (this.cpa || this.ModifySettings.IsModifiedArmRotation && this.ModifySettings.IsModifiedArmRotationPitch) && (this.ModifySettings.IsLockInput || !this.Pue);
    if (this.ModifyFadeOutData.ModifyArmRotationPitch) {
      this.ModifyFadeOutData.StartArmRotationPitch = this.wdc.Pitch;
      this.ModifyFadeOutData.ArmRotationPitch = this.Rdc.Pitch;
    }
    this.ModifyFadeOutData.ModifyArmRotationYaw = (this.mpa || this.ModifySettings.IsModifiedArmRotation && this.ModifySettings.IsModifiedArmRotationYaw) && (this.ModifySettings.IsLockInput || !this.Pue);
    if (this.ModifyFadeOutData.ModifyArmRotationYaw) {
      this.ModifyFadeOutData.StartArmRotationYaw = this.wdc.Yaw;
      this.ModifyFadeOutData.ArmRotationYaw = this.Rdc.Yaw;
    }
    this.ModifyFadeOutData.ModifyArmRotationRoll = (this.dpa || this.ModifySettings.IsModifiedArmRotation && this.ModifySettings.IsModifiedArmRotationRoll) && !MathUtils_1.MathUtils.IsNearlyZero(this.Camera.DesiredCamera.ArmRotation.Roll, MathUtils_1.MathUtils.KindaSmallNumber);
    if (this.ModifyFadeOutData.ModifyArmRotationRoll) {
      this.ModifyFadeOutData.StartArmRotationRoll = this.wdc.Roll;
      this.ModifyFadeOutData.ArmRotationRoll = 0;
    }
    this.ModifyFadeOutData.ModifyCameraOffset = this.ModifySettings.IsModifiedCameraOffset || this.Sue;
    if (this.ModifyFadeOutData.ModifyCameraOffset) {
      this.ModifyFadeOutData.StartCameraOffset.DeepCopy(this.Camera.CurrentCamera.CameraOffset);
    }
    this.ModifyFadeOutData.ModifyFov = this.Uue;
    if (this.ModifyFadeOutData.ModifyFov) {
      this.ModifyFadeOutData.StartFov = this.Camera.CurrentCamera.Fov;
      this.ModifyFadeOutData.Fov = this.Camera.Fov;
    }
    this.ModifyFadeOutData.ModifyPlayerLocation = this.Iue;
    if (this.ModifyFadeOutData.ModifyPlayerLocation) {
      this.ModifyFadeOutData.StartPlayerLocation.DeepCopy(this.Camera.PlayerLocation);
      this.ModifyFadeOutData.PlayerLocation.DeepCopy(this.Rue);
    }
    this.ModifyFadeOutData.ElapsedTime = 0;
    this.ModifyFadeOutData.FadeOutTotalTime = this.Cue;
    this.ModifyFadeOutData.UseFadeOutTimeLerp = t;
    this.IsModifyFadeOut = this.ModifyFadeOutData.ModifyArmLength || this.ModifyFadeOutData.ModifyArmOffset || this.ModifyFadeOutData.ModifyArmRotationPitch || this.ModifyFadeOutData.ModifyArmRotationYaw || this.ModifyFadeOutData.ModifyArmRotationRoll || this.ModifyFadeOutData.ModifyCameraOffset || this.ModifyFadeOutData.ModifyFov || this.ModifyFadeOutData.ModifyPlayerLocation;
  }
  EndModifyFadeOut() {
    this.IsModifyFadeOut = false;
    this.ModifyFadeOutData.ModifyArmLength = false;
    this.ModifyFadeOutData.ModifyArmOffset = false;
    this.ModifyFadeOutData.ModifyArmRotationPitch = false;
    this.ModifyFadeOutData.ModifyArmRotationYaw = false;
    this.ModifyFadeOutData.ModifyArmRotationRoll = false;
    this.ModifyFadeOutData.ModifyCameraOffset = false;
    this.ModifyFadeOutData.ModifyFov = false;
    this.ModifyFadeOutData.ModifyPlayerLocation = false;
  }
  zue(t) {
    var i;
    var s;
    var h;
    var e;
    var r;
    if (this.IsModifyFadeOut) {
      i = this.ModifyFadeOutData;
      s = this.Camera.CurrentCamera;
      h = this.Camera.DesiredCamera;
      this.ModifyFadeOutData.ElapsedTime += t;
      e = i.FadeOutTotalTime <= 0 ? 1 : MathUtils_1.MathUtils.Clamp(i.ElapsedTime / i.FadeOutTotalTime, 0, 1);
      if (i.ModifyArmLength) {
        if (this.Camera.IsModifiedArmLength) {
          i.ModifyArmLength = false;
        } else {
          [i.ModifyArmLength, h.ArmLength] = i.UseFadeOutTimeLerp ? this.FloatLerp(i.StartArmLength, i.ArmLength, e, MODIFY_SMALL_LENGTH) : this.FloatInterpTo(s.ArmLength, i.ArmLength, t, this.ModifyArmLengthLagSpeed, MODIFY_SMALL_LENGTH);
          this.Camera.IsModifiedArmLength = true;
        }
      }
      if (i.ModifyZoomModifier) {
        if (this.Camera.IsModifiedZoomModifier) {
          i.ModifyZoomModifier = false;
        } else {
          i.FinalArmLength = MathUtils_1.MathUtils.Clamp(i.FinalArmLength, this.Camera.CurrentCamera.MinArmLength, this.Camera.CurrentCamera.MaxArmLength);
          r = 0;
          [i.ModifyZoomModifier, r] = i.UseFadeOutTimeLerp ? this.FloatLerp(i.StartFinalArmLength, i.FinalArmLength, e, MathUtils_1.MathUtils.KindaSmallNumber) : this.FloatInterpTo(this.Camera.GetArmLengthWithSettingAndZoom(this.Camera.CurrentCamera, false), i.FinalArmLength, t, this.ModifyArmLengthLagSpeed, MODIFY_SMALL_LENGTH);
          h.ZoomModifier = r / this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera);
          this.Camera.IsModifiedZoomModifier = true;
          if (this.Camera.DesiredCamera.ZoomModifier <= MathUtils_1.MathUtils.SmallNumber && this.Ukm && (this.Ukm = false, Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("Camera", 57, "[DebugZoomModifier UpdateModifyFadeOut]", ["DesiredCamera.ZoomModifier", this.Camera.DesiredCamera.ZoomModifier], ["finalArmLength", r], ["ArmLength", this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera)], ["Anim", this.j1_?.GetName() ?? "None"], ["CameraConfigTags", this.Camera.CameraConfigController.GetCameraConfigTagsContent()]);
          }
        }
      }
      if (i.ModifyArmOffset) {
        if (this.Camera.IsModifiedArmOffset) {
          i.ModifyArmOffset = false;
        } else {
          [i.ModifyArmOffset, h.ArmOffset] = i.UseFadeOutTimeLerp ? this.VectorLerp(i.StartArmOffset, i.ArmOffset, e, MODIFY_SMALL_LENGTH) : this.VectorInterpTo(s.ArmOffset, i.ArmOffset, t, this.ModifyArmOffsetLagSpeed, MODIFY_SMALL_LENGTH);
          this.Camera.IsModifiedArmOffset = true;
        }
      }
      if (i.ModifyCameraOffset) {
        if (this.Camera.IsModifiedCameraOffset) {
          i.ModifyCameraOffset = false;
        } else {
          i.CameraOffset.X = this.Camera.CameraOffsetX;
          i.CameraOffset.Y = this.Camera.CameraOffsetY;
          i.CameraOffset.Z = this.Camera.CameraOffsetZ;
          [i.ModifyCameraOffset, h.CameraOffset] = i.UseFadeOutTimeLerp ? this.VectorLerp(i.StartCameraOffset, i.CameraOffset, e, MODIFY_SMALL_LENGTH) : this.VectorInterpTo(s.CameraOffset, i.CameraOffset, t, this.ModifyCameraOffsetLagSpeed, MODIFY_SMALL_LENGTH);
          this.Camera.IsModifiedCameraOffset = true;
        }
      }
      this.ece();
      GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.CurrentCamera.ArmRotation, this.Camera.GravityInverseQuat, this.wdc);
      if (i.ModifyArmRotationPitch) {
        if (this.Camera.IsModifiedArmRotationPitch || this.Pue) {
          i.ModifyArmRotationPitch = false;
        } else if (this.Camera.IsInNormalGravityMode()) {
          [i.ModifyArmRotationPitch, h.ArmRotation.Pitch] = i.UseFadeOutTimeLerp ? this.RotationAxisLerp(i.StartArmRotationPitch, i.ArmRotationPitch, e, MODIFY_SMALL_LENGTH) : this.RotationAxisInterpTo(s.ArmRotation.Pitch, i.ArmRotationPitch, t, this.ModifyArmRotationLagSpeed, MODIFY_SMALL_LENGTH);
        } else {
          r = 0;
          [i.ModifyArmRotationPitch, r] = i.UseFadeOutTimeLerp ? this.RotationAxisLerp(i.StartArmRotationPitch, i.ArmRotationPitch, e, MODIFY_SMALL_LENGTH) : this.RotationAxisInterpTo(this.wdc.Pitch, i.ArmRotationPitch, t, this.ModifyArmRotationLagSpeed, MODIFY_SMALL_LENGTH);
          GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
          this.EPn.Pitch = r;
          GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
        }
      }
      if (i.ModifyArmRotationYaw) {
        if (this.Camera.IsModifiedArmRotationYaw || this.Pue) {
          i.ModifyArmRotationYaw = false;
        } else if (this.Camera.IsInNormalGravityMode()) {
          [i.ModifyArmRotationYaw, h.ArmRotation.Yaw] = i.UseFadeOutTimeLerp ? this.RotationAxisLerp(i.StartArmRotationYaw, i.ArmRotationYaw, e, MODIFY_SMALL_LENGTH) : this.RotationAxisInterpTo(s.ArmRotation.Yaw, i.ArmRotationYaw, t, this.ModifyArmRotationLagSpeed, MODIFY_SMALL_LENGTH);
        } else {
          r = 0;
          [i.ModifyArmRotationYaw, r] = i.UseFadeOutTimeLerp ? this.RotationAxisLerp(i.StartArmRotationYaw, i.ArmRotationYaw, e, MODIFY_SMALL_LENGTH) : this.RotationAxisInterpTo(this.wdc.Yaw, i.ArmRotationYaw, t, this.ModifyArmRotationLagSpeed, MODIFY_SMALL_LENGTH);
          GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
          this.EPn.Yaw = r;
          GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
        }
      }
      if (i.ModifyArmRotationRoll) {
        if (this.Camera.IsModifiedArmRotationRoll) {
          i.ModifyArmRotationRoll = false;
        } else if (this.Camera.IsInNormalGravityMode()) {
          [i.ModifyArmRotationRoll, h.ArmRotation.Roll] = i.UseFadeOutTimeLerp ? this.RotationAxisLerp(i.StartArmRotationRoll, i.ArmRotationRoll, e, MODIFY_SMALL_LENGTH) : this.RotationAxisInterpTo(s.ArmRotation.Roll, i.ArmRotationRoll, t, this.ModifyArmRotationLagSpeed, MODIFY_SMALL_LENGTH);
        } else {
          r = 0;
          [i.ModifyArmRotationRoll, r] = i.UseFadeOutTimeLerp ? this.RotationAxisLerp(i.StartArmRotationRoll, i.ArmRotationRoll, e, MODIFY_SMALL_LENGTH) : this.RotationAxisInterpTo(this.wdc.Roll, i.ArmRotationRoll, t, this.ModifyArmRotationLagSpeed, MODIFY_SMALL_LENGTH);
          GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.Camera.GravityInverseQuat, this.EPn);
          this.EPn.Roll = r;
          GravityUtils_1.GravityUtils.GetRotatorInNormal(this.EPn, this.Camera.GravityQuat, this.Camera.DesiredCamera.ArmRotation);
        }
      }
      if (i.ModifyFov) {
        if (this.Camera.IsModifiedFov) {
          i.ModifyFov = false;
        } else {
          [i.ModifyFov, h.Fov] = i.UseFadeOutTimeLerp ? this.FloatLerp(i.StartFov, i.Fov, e, MODIFY_SMALL_LENGTH) : this.FloatInterpTo(s.Fov, i.Fov, t, this.ModifyFovLagSpeed, MODIFY_SMALL_LENGTH);
          this.Camera.IsModifiedFov = true;
        }
      }
      if (i.ModifyPlayerLocation) {
        [i.ModifyPlayerLocation, i.PlayerLocation] = i.UseFadeOutTimeLerp ? this.VectorLerp(i.PlayerLocation, this.Camera.PlayerLocation, e, MODIFY_SMALL_LENGTH) : this.VectorInterpTo(i.PlayerLocation, this.Camera.PlayerLocation, t, this.ModifyCameraOffsetLagSpeed, MODIFY_SMALL_LENGTH);
        this.Camera.PlayerLocation.DeepCopy(i.PlayerLocation);
      }
      if (i.UseFadeOutTimeLerp && i.ElapsedTime > i.FadeOutTotalTime) {
        this.IsModifyFadeOut = false;
        this.EndModifyFadeOut();
      } else {
        this.IsModifyFadeOut = i.ModifyArmLength || i.ModifyArmOffset || i.ModifyZoomModifier || i.ModifyCameraOffset || i.ModifyArmRotationPitch || i.ModifyArmRotationYaw || i.ModifyArmRotationRoll || i.ModifyFov || i.ModifyPlayerLocation;
      }
    }
  }
  Gqn(t, i) {
    let s = undefined;
    return (s = t ? t.GetEntityNoBlueprint() : (t = i?.GetEntityNoBlueprint()?.GetComponent(0))?.IsVision() || t?.IsMonster() ? i?.GetEntityNoBlueprint() : this.Camera.CharacterEntityHandle.Entity)?.GetComponent(186)?.MainAnimInstance;
  }
  FloatInterpTo(t, i, s, h, e) {
    s = MathUtils_1.MathUtils.InterpTo(t, i, s, h);
    if (Math.abs(t - i) < e) {
      return [false, i];
    } else {
      return [true, s];
    }
  }
  VectorInterpTo(t, i, s, h, e) {
    var r = Vector_1.Vector.Create();
    MathUtils_1.MathUtils.VectorInterpTo(t, i, s, h, r);
    var s = Vector_1.Vector.Create();
    t.Subtraction(i, s);
    if (s.GetAbsMax() < e) {
      r.DeepCopy(i);
      return [false, r];
    } else {
      return [true, r];
    }
  }
  RotationInterpTo(t, i, s, h, e) {
    var r = Rotator_1.Rotator.Create();
    MathUtils_1.MathUtils.RotatorInterpTo(t, i, s, h, r);
    if (t.Equals(i, e)) {
      r.DeepCopy(i);
      return [false, r];
    } else {
      return [true, r];
    }
  }
  RotationAxisInterpTo(t, i, s, h, e) {
    s = MathUtils_1.MathUtils.RotatorAxisInterpTo(t, i, s, h);
    if (MathUtils_1.MathUtils.IsAngleNearEqual(t, i, e)) {
      return [false, s];
    } else {
      return [true, s];
    }
  }
  FloatLerp(t, i, s, h) {
    s = MathUtils_1.MathUtils.Lerp(t, i, s);
    if (Math.abs(t - i) < h) {
      return [false, i];
    } else {
      return [true, s];
    }
  }
  VectorLerp(t, i, s, h) {
    var e = Vector_1.Vector.Create();
    Vector_1.Vector.Lerp(t, i, s, e);
    if (t.Equals(i, h)) {
      e.DeepCopy(i);
      return [false, e];
    } else {
      return [true, e];
    }
  }
  RotationLerp(t, i, s, h) {
    var e = Rotator_1.Rotator.Create();
    Rotator_1.Rotator.Lerp(t, i, s, e);
    if (t.Equals(i, h)) {
      e.DeepCopy(i);
      return [false, e];
    } else {
      return [true, e];
    }
  }
  RotationAxisLerp(t, i, s, h) {
    s = Rotator_1.Rotator.AxisLerp(t, i, s);
    if (MathUtils_1.MathUtils.IsAngleNearEqual(t, i, h)) {
      return [false, s];
    } else {
      return [true, s];
    }
  }
  StopCameraModify(t, i) {
    if (this.j1_ === t && this.ModifyInstance === i) {
      this.EndModify(true, true);
    }
  }
}
exports.CameraModifyController = CameraModifyController;
//# sourceMappingURL=CameraModifyController.js.map