"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraGuideController = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const CameraUtility_1 = require("../CameraUtility");
const CameraControllerBase_1 = require("./CameraControllerBase");
const IS_DEBUG = false;
const DEFAULT_VALUE = -1;
class CameraGuideController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments);
    this.CheckAdjustYawAngleMin = 0;
    this.CheckAdjustYawAngleMax = 0;
    this.CameraArmLengthRateHorizontal = 0;
    this.CameraArmLengthRateVertical = 0;
    this.CameraArmLengthAdditionMax = 0;
    this.CameraArmOffsetHorizontalLengthRate = 0;
    this.CameraArmOffsetHorizontalLengthMax = 0;
    this.CameraArmOffsetVerticalLengthRate = 0;
    this.CameraArmOffsetVerticalLengthMax = 0;
    this.DefaultPitchInRangeMin = 0;
    this.DefaultPitchInRangeMax = 0;
    this.DefaultPitchOutRangeMin = 0;
    this.DefaultPitchOutRangeMax = 0;
    this.CameraPitchMin = 0;
    this.CameraPitchMax = 0;
    this.CameraPitchOffset = 0;
    this.NearerRange = 0;
    this.j1e = -0;
    this.c_e = -0;
    this.W1e = -0;
    this.m_e = false;
    this.CurrentCameraArmLengthAddition = 0;
    this.d_e = 0;
    this.C_e = 0;
    this.CurrentCameraSpecificArmLength = 0;
    this.IsCameraSpecificArmLengthEnabled = false;
    this.StartCameraSpecificArmLength = 0;
    this.DesiredCameraSpecificArmLength = 0;
    this.CurrentCameraArmOffset = Vector_1.Vector.Create();
    this.B1e = Vector_1.Vector.Create();
    this.g_e = Vector_1.Vector.Create();
    this.GN1 = Vector_1.Vector.Create();
    this.f_e = 0;
    this.ole = 0;
    this.rle = 0;
    this.sle = 0;
    this.ale = 0;
    this.H6 = 0;
    this.p_e = 0;
    this.FN1 = false;
    this.NXd = false;
    this.v_e = Vector_1.Vector.Create();
    this.Ldc = Vector_1.Vector.Create();
    this.M_e = DEFAULT_VALUE;
    this.E_e = 0;
    this.S_e = false;
    this.Lz = Vector_1.Vector.Create();
    this.Ctc = true;
  }
  get IsBlending() {
    return this.f_e !== 0;
  }
  Name() {
    return "GuideController";
  }
  OnInit() {
    this.SetConfigMap(1, "CheckAdjustYawAngleMin");
    this.SetConfigMap(2, "CheckAdjustYawAngleMax");
    this.SetConfigMap(3, "CameraArmLengthRateHorizontal");
    this.SetConfigMap(4, "CameraArmLengthRateVertical");
    this.SetConfigMap(5, "CameraArmLengthAdditionMax");
    this.SetConfigMap(6, "CameraArmOffsetHorizontalLengthRate");
    this.SetConfigMap(7, "CameraArmOffsetHorizontalLengthMax");
    this.SetConfigMap(8, "CameraArmOffsetVerticalLengthRate");
    this.SetConfigMap(9, "CameraArmOffsetVerticalLengthMax");
    this.SetConfigMap(10, "DefaultPitchInRangeMin");
    this.SetConfigMap(11, "DefaultPitchInRangeMax");
    this.SetConfigMap(12, "DefaultPitchOutRangeMin");
    this.SetConfigMap(13, "DefaultPitchOutRangeMax");
    this.SetConfigMap(17, "NearerRange");
    this.SetConfigMap(14, "CameraPitchMin");
    this.SetConfigMap(15, "CameraPitchMax");
    this.SetConfigMap(16, "CameraPitchOffset");
  }
  ExitCameraGuide() {
    if (this.Ctc && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraLookAt] OnExitGuide ExitCameraGuide");
    }
    this.y_e();
  }
  ExitCameraGuideAtOnce() {
    if (this.Ctc && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 45, "[CameraLookAt] OnExitGuide ExitCameraGuideAtOnce");
    }
    this.nWc();
  }
  SetConfigs(t, i) {
    super.SetConfigs(t, i);
    this.S_e = true;
  }
  ApplyCameraGuide(t, i, s, h, a, e, r, o = false, _ = false, l = 0, n = false) {
    if (this.Ctc && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraLookAt] ApplyCameraGuide", ["lookAt", t], ["fadeInTime", i], ["stayTime", s], ["fadeOutTime", h], ["lockCameraInput", a], ["endPosition", e], ["fov", r], ["ignoreAdjustYaw", o], ["staticCamera", _], ["disableArmOffset", n]);
    }
    if (this.IsActivate && this.S_e) {
      this.v_e.FromUeVector(t);
      CameraUtility_1.CameraUtility.GetVectorInGravity(t, this.Ldc);
      this.j1e = i;
      this.c_e = s;
      this.W1e = h;
      this.m_e = a;
      this.FN1 = _;
      this.I_e(l);
      t = this.Camera.PlayerLocation;
      i = this.Camera.CurrentCamera.ArmRotation;
      s = Vector_1.Vector.Create();
      i.Vector(s);
      (h = Vector_1.Vector.Create()).DeepCopy(this.v_e);
      h.SubtractionEqual(e ?? t);
      CameraUtility_1.CameraUtility.GetVectorInGravity(h, h);
      CameraUtility_1.CameraUtility.GetVectorInGravity(s, s);
      a = Rotator_1.Rotator.Create();
      h.Rotation(a);
      this.ale = a.Yaw;
      this.sle = this.Camera.CameraRotationInGravity.Yaw;
      if (!this.FN1 && !o) {
        _ = h.CosineAngle2D(s);
        if (h.SineAngle2D(s) < 0) {
          if (_ > Math.cos(this.CheckAdjustYawAngleMin * MathUtils_1.MathUtils.DegToRad)) {
            this.ale += this.CheckAdjustYawAngleMin;
          } else if (_ < Math.cos(this.CheckAdjustYawAngleMax * MathUtils_1.MathUtils.DegToRad)) {
            this.ale += this.CheckAdjustYawAngleMax;
          } else {
            this.ale = this.sle;
          }
        } else if (_ > Math.cos(this.CheckAdjustYawAngleMin * MathUtils_1.MathUtils.DegToRad)) {
          this.ale -= this.CheckAdjustYawAngleMin;
        } else if (_ < Math.cos(this.CheckAdjustYawAngleMax * MathUtils_1.MathUtils.DegToRad)) {
          this.ale -= this.CheckAdjustYawAngleMax;
        } else {
          this.ale = this.sle;
        }
      }
      if (this.sle - this.ale > 180) {
        this.ale += 360;
      } else if (this.ale - this.sle > 180) {
        this.ale -= 360;
      }
      if (this.FN1) {
        this.ole = this.Camera.CameraRotationInGravity.Pitch;
        this.rle = a.Pitch;
      } else {
        i = Rotator_1.Rotator.Create();
        h.Rotation(i);
        this.ole = this.Camera.CameraRotationInGravity.Pitch;
        if (h.Size() > this.NearerRange) {
          o = i.Pitch + this.CameraPitchOffset;
          this.rle = MathUtils_1.MathUtils.Clamp(o, this.CameraPitchMin, this.CameraPitchMax);
        } else {
          this.rle = MathUtils_1.MathUtils.RangeClamp(h.Z, this.DefaultPitchInRangeMin, this.DefaultPitchInRangeMax, this.DefaultPitchOutRangeMin, this.DefaultPitchOutRangeMax);
        }
      }
      s = h.Size2D();
      if (l > 0) {
        this.C_e = 0;
        this.DesiredCameraSpecificArmLength = l;
        this.IsCameraSpecificArmLengthEnabled = true;
      } else {
        this.C_e = s * this.CameraArmLengthRateHorizontal + Math.abs(h.Z) * this.CameraArmLengthRateVertical;
        this.C_e = MathUtils_1.MathUtils.Clamp(this.C_e, 0, this.CameraArmLengthAdditionMax);
        this.DesiredCameraSpecificArmLength = 0;
        this.IsCameraSpecificArmLengthEnabled = false;
      }
      this.GN1.DeepCopy(t);
      this.NXd = n;
      if (this.NXd) {
        this.g_e.Reset();
      } else if (e) {
        this.g_e.DeepCopy(e);
        this.g_e.SubtractionEqual(t);
      } else {
        (_ = Vector_1.Vector.Create()).DeepCopy(this.v_e);
        _.SubtractionEqual(t);
        CameraUtility_1.CameraUtility.SetZnInGravity(_, 0, _);
        if (s * this.CameraArmOffsetHorizontalLengthRate > this.CameraArmOffsetHorizontalLengthMax) {
          _.Normalize(MathUtils_1.MathUtils.KindaSmallNumber);
          this.g_e.DeepCopy(_);
          this.g_e.MultiplyEqual(this.CameraArmOffsetHorizontalLengthMax);
        } else {
          this.g_e.DeepCopy(_);
          this.g_e.MultiplyEqual(this.CameraArmOffsetHorizontalLengthRate);
        }
        a = (this.Ldc.Z - this.Camera.PlayerLocationInGravity.Z) * this.CameraArmOffsetVerticalLengthRate;
        a = MathUtils_1.MathUtils.Clamp(a, -this.CameraArmOffsetVerticalLengthMax, this.CameraArmOffsetVerticalLengthMax);
        CameraUtility_1.CameraUtility.SetZnInGravity(this.g_e, a, this.g_e);
      }
      this.E_e = this.Camera.CurrentCamera.Fov;
      this.M_e = r !== undefined && r > 0 && r !== this.M_e ? r : DEFAULT_VALUE;
    } else if (this.Ctc) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Camera", 57, "[CameraLookAt] ApplyCameraGuide Fail", ["this.IsActivate", this.IsActivate], ["this.Initialized", this.S_e]);
      }
      this.ShowBlockSetInfo("CameraLookAt");
    }
  }
  T_e(t) {
    var i = MathUtils_1.MathUtils.LerpSin(this.sle, this.ale, t);
    var s = MathUtils_1.MathUtils.LerpSin(this.ole, this.rle, t);
    CameraUtility_1.CameraUtility.SetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, Rotator_1.Rotator.Create(s, i, 0));
    this.Camera.IsModifiedArmRotationPitch = true;
    this.Camera.IsModifiedArmRotationYaw = true;
    if (this.M_e && DEFAULT_VALUE !== this.M_e) {
      s = MathUtils_1.MathUtils.LerpSin(this.E_e, this.M_e, t);
      this.Camera.DesiredCamera.Fov = s;
    }
  }
  L_e(t) {
    var i;
    var s;
    if (this.IsCameraSpecificArmLengthEnabled) {
      this.CurrentCameraSpecificArmLength = MathUtils_1.MathUtils.LerpSin(this.StartCameraSpecificArmLength, this.DesiredCameraSpecificArmLength, t);
    } else {
      this.CurrentCameraArmLengthAddition = MathUtils_1.MathUtils.LerpSin(this.d_e, this.C_e, t);
    }
    Vector_1.Vector.LerpSin(this.B1e, this.g_e, t, this.CurrentCameraArmOffset);
    if (this.FN1 && !this.NXd) {
      this.Lz.DeepCopy(this.Camera.PlayerLocation);
      this.Lz.SubtractionEqual(this.GN1);
      this.CurrentCameraArmOffset.SubtractionEqual(this.Lz);
    }
    if (IS_DEBUG && (t = Vector_1.Vector.Create(this.Camera.PlayerLocation), (i = Vector_1.Vector.Create()).AdditionEqual(t).AdditionEqual(this.CurrentCameraArmOffset), (s = Vector_1.Vector.Create()).AdditionEqual(t).AdditionEqual(this.g_e), UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, this.Camera.PlayerLocation.ToUeVector(), i.ToUeVector(), new UE.LinearColor(0, 1, 0, 1), 0, 5), UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, i.ToUeVector(), s.ToUeVector(), new UE.LinearColor(1, 1, 0, 1), 0, 5), this.f_e !== 0)) {
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, this.v_e.ToUeVector(), s.ToUeVector(), new UE.LinearColor(1, 0, 0, 1), 0, 5);
    }
  }
  D_e(t) {
    if (t >= 1) {
      this.CurrentCameraArmLengthAddition = this.d_e;
      this.CurrentCameraSpecificArmLength = this.StartCameraSpecificArmLength;
      this.B1e.DeepCopy(this.CurrentCameraArmOffset);
    }
    if (this.IsCameraSpecificArmLengthEnabled) {
      this.CurrentCameraSpecificArmLength = MathUtils_1.MathUtils.LerpSin(this.StartCameraSpecificArmLength, this.Camera.GetRawArmLength(), t);
    } else {
      this.CurrentCameraArmLengthAddition = MathUtils_1.MathUtils.LerpSin(this.d_e, 0, t);
    }
    this.Lz.DeepCopy(this.B1e);
    if (this.FN1 && !this.NXd) {
      this.Lz.AdditionEqual(this.GN1);
      this.Lz.SubtractionEqual(this.Camera.PlayerLocation);
    }
    Vector_1.Vector.LerpSin(this.Lz, Vector_1.Vector.ZeroVectorProxy, t, this.CurrentCameraArmOffset);
    if (this.M_e && DEFAULT_VALUE !== this.M_e) {
      t = MathUtils_1.MathUtils.LerpSin(this.E_e, this.Camera.Fov, t);
      this.Camera.DesiredCamera.Fov = t;
    }
  }
  UpdateInternal(t) {
    this.H6 += t;
    if (!this.m_e && this.Hqc()) {
      this.y_e();
    }
    switch (this.f_e) {
      case 1:
        var i = this.j1e > 0 ? this.H6 / this.j1e : 1;
        var i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
        this.T_e(i);
        this.L_e(i);
        if (this.H6 > this.j1e) {
          this.R_e();
        }
        break;
      case 2:
        if (this.FN1 && !this.NXd) {
          this.Lz.DeepCopy(this.Camera.PlayerLocation);
          this.Lz.SubtractionEqual(this.GN1);
          this.CurrentCameraArmOffset.DeepCopy(this.g_e);
          this.CurrentCameraArmOffset.SubtractionEqual(this.Lz);
        }
        if (this.c_e >= 0 && this.H6 > this.j1e + this.c_e) {
          if (this.Ctc && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Camera", 57, "[CameraLookAt] OnExitGuide EBlendState.Staying");
          }
          this.y_e();
        }
        break;
      case 3:
        this.p_e += t;
        i = this.W1e > 0 ? this.p_e / this.W1e : 1;
        i = MathUtils_1.MathUtils.Clamp(i, 0, 1);
        this.D_e(i);
        if (this.p_e > this.W1e) {
          this.f_e = 0;
          this.IsCameraSpecificArmLengthEnabled = false;
        }
    }
  }
  OnDisable() {
    if (this.Ctc && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraLookAt] OnExitGuide OnDisable");
    }
    this.y_e();
  }
  UpdateDeactivateInternal(t) {
    if (this.f_e === 3 && (this.p_e += t, t = this.W1e > 0 ? this.p_e / this.W1e : 1, t = MathUtils_1.MathUtils.Clamp(t, 0, 1), this.D_e(t), this.p_e > this.W1e)) {
      this.f_e = 0;
      this.IsCameraSpecificArmLengthEnabled = false;
    }
  }
  I_e(t) {
    if (this.Ctc && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraLookAt] ApplyCameraGuide OnEnterGuide", ["this.StartCameraArmLengthAddition", this.CurrentCameraArmLengthAddition], ["this.StartCameraArmOffset", this.CurrentCameraArmOffset]);
    }
    this.f_e = 1;
    this.H6 = 0;
    if ((this.p_e = 0) < t) {
      this.StartCameraSpecificArmLength = this.Camera.GetRawArmLength();
      this.d_e = 0;
      this.CurrentCameraArmLengthAddition = 0;
    } else {
      this.d_e = this.CurrentCameraArmLengthAddition;
      this.StartCameraSpecificArmLength = 0;
    }
    this.B1e.Set(this.CurrentCameraArmOffset.X, this.CurrentCameraArmOffset.Y, this.CurrentCameraArmOffset.Z);
    if (this.m_e) {
      this.Camera.CameraInputController.Lock(this);
    }
    this.Camera.CameraRotationZone.Lock(this);
  }
  R_e() {
    this.f_e = 2;
  }
  y_e() {
    if (this.f_e === 1 || this.f_e === 2) {
      if (this.Ctc && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Camera", 57, "[CameraLookAt] ApplyCameraGuide OnExitGuide", ["this.FadeInTime", this.j1e], ["this.ElapsedTime", this.H6], ["this.FadeOutElapsedTime", this.p_e], ["this.BlendState", this.f_e]);
      }
      this.f_e = 3;
      this.p_e = 0;
      this.d_e = this.CurrentCameraArmLengthAddition;
      this.StartCameraSpecificArmLength = this.CurrentCameraSpecificArmLength;
      this.B1e.DeepCopy(this.CurrentCameraArmOffset);
      this.GN1.DeepCopy(this.Camera.PlayerLocation);
      this.Camera.CameraInputController.Unlock(this);
      if (this.M_e && DEFAULT_VALUE !== this.M_e) {
        this.E_e = this.Camera.CurrentCamera.Fov;
      }
    }
    this.Camera.CameraRotationZone.Unlock(this);
  }
  nWc() {
    if (this.f_e === 1 || this.f_e === 2) {
      if (this.Ctc && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Camera", 45, "[CameraLookAt] 立马退出Guide", ["this.FadeInTime", this.j1e], ["this.ElapsedTime", this.H6], ["this.FadeOutElapsedTime", this.p_e], ["this.BlendState", this.f_e]);
      }
      this.p_e = 0;
      this.d_e = this.CurrentCameraArmLengthAddition;
      this.StartCameraSpecificArmLength = this.CurrentCameraSpecificArmLength;
      this.B1e.DeepCopy(this.CurrentCameraArmOffset);
      this.GN1.DeepCopy(this.Camera.PlayerLocation);
      this.Camera.CameraInputController.Unlock(this);
      if (this.M_e && DEFAULT_VALUE !== this.M_e) {
        this.E_e = this.Camera.CurrentCamera.Fov;
      }
    }
    this.Camera.CameraRotationZone.Unlock(this);
    this.D_e(1);
    this.f_e = 0;
    this.IsCameraSpecificArmLengthEnabled = false;
  }
  IsLockCameraInput() {
    return this.m_e;
  }
  Hqc() {
    var t;
    return !!this.Camera.CharacterEntityHandle?.Valid && !!(t = this.Camera.CharacterEntityHandle.Entity.GetComponent(62))?.Valid && t.HasCameraInput();
  }
}
exports.CameraGuideController = CameraGuideController;
//# sourceMappingURL=CameraGuideController.js.map