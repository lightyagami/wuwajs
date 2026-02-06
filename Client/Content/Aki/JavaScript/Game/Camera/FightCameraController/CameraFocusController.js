"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraFocusController = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const CameraUtility_1 = require("../CameraUtility");
const CameraControllerBase_1 = require("./CameraControllerBase");
const ARM_OFFSET_Y_SPEED = 100;
const DEFAULT_FPS = 60;
const FIRST_THRESHOLD = 0.5;
const FIRST_THRESHOLD_SQUARED = FIRST_THRESHOLD * FIRST_THRESHOLD;
class CameraFocusController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments);
    this.RelativeRotationLagYawSpeedMin = 0;
    this.RelativeRotationLagYawSpeedMax = 0;
    this.RelativeRotationLagYawAngleRange = 0;
    this.RelativeRotationLagYawCurve = undefined;
    this.RelativeRotationLagPitchSpeedMin = 0;
    this.RelativeRotationLagPitchSpeedMax = 0;
    this.RelativeRotationLagPitchAngleRange = 0;
    this.RelativeRotationLagPitchCurve = undefined;
    this.RelativeRotationLagRatioMin = 0;
    this.RelativeRotationLagRatioMax = 0;
    this.RelativeRotationLagDistanceRangeMin = 0;
    this.RelativeRotationLagDistanceRangeMax = 0;
    this.RelativeRotationLagRatioCurve = undefined;
    this.YawSignAdaptionOn = 0;
    this.YawSignAdaptionThreshold = 0;
    this.YawSignAdaptionCooldown = 0;
    this.YawSignAdaptionDistanceThreshold = 0;
    this.RelativeYawSoftMin = 0;
    this.RelativeYawSoftMax = 0;
    this.CameraOffsetSoft = 0;
    this.CameraOffset = 0;
    this.HardLockInputYawSensitivity = 0;
    this.HardLockInputPitchSensitivity = 0;
    this.HardLockInputYawSensitivityGamepad = 0;
    this.HardLockInputPitchSensitivityGamepad = 0;
    this.SoftLockInputYawSensitivity = 0;
    this.SoftLockInputPitchSensitivity = 0;
    this.SoftLockInputYawSensitivityGamepad = 0;
    this.SoftLockInputPitchSensitivityGamepad = 0;
    this.ChangeShowTargetDamping = 0;
    this.ChangeShowTargetAngleCoefficient = 0;
    this.ChangeShowTargetDistCoefficient = 0;
    this.ChangeShowTargetSensitivity = 0;
    this.ChangeShowTargetSensitivityGamepad = 0;
    this.RelativeYawHardMax = 0;
    this.RelativeYawHardMin = 0;
    this.RelativePitchHardMax = 0;
    this.RelativePitchHardMin = 0;
    this.SoftUnlockYawSpeed = 0;
    this.SoftUnlockPitchSpeed = 0;
    this.SoftUnlockInputTime = 0;
    this.SoftUnlockInputYawMinSpeed = 0;
    this.SoftUnlockInputPitchMinSpeed = 0;
    this.YKa = 0;
    this.Gue = Rotator_1.Rotator.Create();
    this.xzi = Vector_1.Vector.Create();
    this.Ele = Rotator_1.Rotator.Create();
    this.h_e = 0;
    this.AddCameraOffsetY = undefined;
    this.l_e = Vector2D_1.Vector2D.Create();
    this.dTn = true;
    this.Iic = 0;
    this.BJe = (t, i, s) => {
      var h = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
      if (t === h?.Id && (t = h.GetComponent(43))?.Valid && t.CurrentSkill?.SkillInfo.IsLockOn) {
        this.KJa();
      }
    };
  }
  Name() {
    return "FocusController";
  }
  OnInit() {
    this.SetConfigMap(1, "RelativeRotationLagYawSpeedMin");
    this.SetConfigMap(2, "RelativeRotationLagYawSpeedMax");
    this.SetConfigMap(3, "RelativeRotationLagYawAngleRange");
    this.SetCurveConfigMap(3, "RelativeRotationLagYawCurve");
    this.SetConfigMap(34, "RelativeRotationLagPitchSpeedMin");
    this.SetConfigMap(35, "RelativeRotationLagPitchSpeedMax");
    this.SetConfigMap(36, "RelativeRotationLagPitchAngleRange");
    this.SetCurveConfigMap(36, "RelativeRotationLagPitchCurve");
    this.SetConfigMap(28, "RelativeRotationLagRatioMin");
    this.SetConfigMap(29, "RelativeRotationLagRatioMax");
    this.SetConfigMap(31, "RelativeRotationLagDistanceRangeMin");
    this.SetConfigMap(30, "RelativeRotationLagDistanceRangeMax");
    this.SetCurveConfigMap(30, "RelativeRotationLagRatioCurve");
    this.SetConfigMap(4, "YawSignAdaptionOn");
    this.SetConfigMap(5, "YawSignAdaptionThreshold");
    this.SetConfigMap(6, "YawSignAdaptionCooldown");
    this.SetConfigMap(40, "YawSignAdaptionDistanceThreshold");
    this.SetConfigMap(7, "RelativeYawSoftMin");
    this.SetConfigMap(8, "RelativeYawSoftMax");
    this.SetConfigMap(37, "SoftUnlockInputTime");
    this.SetConfigMap(38, "SoftUnlockInputYawMinSpeed");
    this.SetConfigMap(39, "SoftUnlockInputPitchMinSpeed");
    this.SetConfigMap(9, "CameraOffsetSoft");
    this.SetConfigMap(10, "CameraOffset");
    this.SetConfigMap(11, "HardLockInputYawSensitivity");
    this.SetConfigMap(12, "HardLockInputPitchSensitivity");
    this.SetConfigMap(13, "HardLockInputYawSensitivityGamepad");
    this.SetConfigMap(14, "HardLockInputPitchSensitivityGamepad");
    this.SetConfigMap(24, "SoftLockInputYawSensitivity");
    this.SetConfigMap(25, "SoftLockInputPitchSensitivity");
    this.SetConfigMap(26, "SoftLockInputYawSensitivityGamepad");
    this.SetConfigMap(27, "SoftLockInputPitchSensitivityGamepad");
    this.SetConfigMap(15, "ChangeShowTargetDamping");
    this.SetConfigMap(16, "ChangeShowTargetAngleCoefficient");
    this.SetConfigMap(17, "ChangeShowTargetDistCoefficient");
    this.SetConfigMap(18, "RelativeYawHardMin");
    this.SetConfigMap(19, "RelativeYawHardMax");
    this.SetConfigMap(20, "RelativePitchHardMin");
    this.SetConfigMap(21, "RelativePitchHardMax");
    this.SetConfigMap(22, "SoftUnlockYawSpeed");
    this.SetConfigMap(23, "SoftUnlockPitchSpeed");
    this.SetConfigMap(32, "ChangeShowTargetSensitivity");
    this.SetConfigMap(33, "ChangeShowTargetSensitivityGamepad");
  }
  OnEnable() {
    if ((this.RelativeYawHardMin < 0 || this.RelativeYawHardMin > 180 || this.RelativeYawHardMin > this.RelativeYawHardMax) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Controller", 57, `锁定镜头配置错误，强锁定-镜头偏角最小值${this.RelativeYawHardMin}不在0-180之间或者大于强锁定-镜头偏角最大值${this.RelativeYawHardMax}`, ["Tag", this.Camera.CameraConfigController.GetCameraConfigTagsContent()]);
    }
    if ((this.RelativeYawHardMax < 0 || this.RelativeYawHardMax > 180 || this.RelativeYawHardMax < this.RelativeYawHardMin) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Controller", 57, `锁定镜头配置错误，强锁定-镜头偏角最大值${this.RelativeYawHardMax}不在0-180之间或者小于强锁定-镜头偏角最小值${this.RelativeYawHardMin}`, ["Tag", this.Camera.CameraConfigController.GetCameraConfigTagsContent()]);
    }
    if ((this.RelativePitchHardMin < 0 || this.RelativePitchHardMin > 180 || this.RelativePitchHardMin > this.RelativePitchHardMax) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Controller", 57, `锁定镜头配置错误，强锁定-镜头俯仰角最小值${this.RelativePitchHardMin}不在0-180之间或者大于强锁定-镜头俯仰角最大值${this.RelativePitchHardMax}`, ["Tag", this.Camera.CameraConfigController.GetCameraConfigTagsContent()]);
    }
    if ((this.RelativePitchHardMax < 0 || this.RelativePitchHardMax > 180 || this.RelativePitchHardMax < this.RelativePitchHardMin) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Controller", 57, `锁定镜头配置错误，强锁定-镜头俯仰角最大值${this.RelativePitchHardMax}不在0-180之间或者小于强锁定-镜头俯仰角最小值${this.RelativePitchHardMin}`, ["Tag", this.Camera.CameraConfigController.GetCameraConfigTagsContent()]);
    }
    this.Camera.CameraAutoController.EnableForce(this);
    this.Camera.CameraSidestepController.Lock(this);
    this.AddCameraOffsetY = 0;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.BJe);
  }
  OnDisable() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.BJe);
    this.Camera.CameraAutoController.DisableForce(this);
    this.Camera.CameraSidestepController.Unlock(this);
    this.h_e = 0;
    this.Iic = 0;
    this.l_e.Reset();
  }
  UpdateCustomEnableCondition() {
    return this.FQd() && this.Camera.CharacterEntityHandle.IsInit;
  }
  FQd() {
    return !!this.Camera.TargetEntity || this.Camera.IsSpecificLockTarget && this.Camera.SpecificLockTargetType === 1;
  }
  UpdateInternal(t) {
    this.iza(t);
    this.rza(t);
    this.oza(t);
  }
  iza(t) {
    var i;
    var s;
    if (this.FQd() && this.Camera.IsTargetLocationValid) {
      [i, s] = this.Camera.CharacterEntityHandle.Entity.GetComponent(67).GetCameraInput();
      i *= Info_1.Info.IsInGamepad() ? this.SoftLockInputYawSensitivityGamepad : this.SoftLockInputYawSensitivity;
      s *= Info_1.Info.IsInGamepad() ? this.SoftLockInputPitchSensitivityGamepad : this.SoftLockInputPitchSensitivity;
      if (Math.abs(i) > this.SoftUnlockInputYawMinSpeed || Math.abs(s) > this.SoftUnlockInputPitchMinSpeed) {
        this.YKa = this.SoftUnlockInputTime;
      }
      if (!(this.YKa <= 0)) {
        this.YKa -= t;
      }
    }
  }
  rza(t) {
    var i;
    var s;
    var h;
    var e;
    var a;
    if (this.FQd() && this.Camera.IsTargetLocationValid) {
      if (!this.Camera.IsModifiedArmRotationPitch || !this.Camera.IsModifiedArmRotationYaw) {
        [i, s] = this.Camera.CharacterEntityHandle.Entity.GetComponent(67).GetCameraInput();
        e = !(h = this.Camera.ContainsAnyTag([-1150819426, 1260125908])) && ModelManager_1.ModelManager.CameraModel.IsSoftLockEnable() && !this.ShouldSoftUnlock() && !this.CanMoveCameraInSoftLock();
        a = this.Camera.PlayerLocation;
        this.Camera.TargetLocation.Subtraction(a, this.xzi);
        this.Mtl(t, h || this.Camera.IsSpecificLockTarget, e, i);
        this.Stl(t, h || this.Camera.IsSpecificLockTarget, e, s);
      }
    }
  }
  Mtl(t, l, i, _) {
    if (!this.Camera.IsModifiedArmRotationYaw) {
      this.Camera.IsModifiedArmRotationYaw = true;
      if (this.AddCameraOffsetY === undefined) {
        this.AddCameraOffsetY = 0;
      }
      let h = 0;
      let e = false;
      let a = 0;
      let o = 0;
      this.Ele.Yaw = Math.atan2(this.xzi.Y, this.xzi.X) * MathUtils_1.MathUtils.RadToDeg;
      let n = MathUtils_1.MathUtils.WrapAngle(this.Camera.CameraRotation.Yaw - this.Ele.Yaw);
      let r = n >= 0 ? 1 : -1;
      this.xzi.Rotation(this.Gue);
      var M = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Gue, this.Camera.GravityInverseQuat, this.Gue).Yaw;
      var s = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.CameraRotation, this.Camera.GravityInverseQuat, this.Gue).Yaw;
      var v = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.CurrentCamera.ArmRotation, this.Camera.GravityInverseQuat, this.Gue).Yaw;
      if (!this.Camera.IsInNormalGravityMode()) {
        this.Ele.Yaw = M;
        n = MathUtils_1.MathUtils.WrapAngle(s - M);
        r = n >= 0 ? 1 : -1;
      }
      if (l) {
        if (this.YawSignAdaptionOn) {
          let t = 0;
          var M = _;
          var l = (M *= Info_1.Info.IsInGamepad() ? this.HardLockInputYawSensitivityGamepad : this.HardLockInputYawSensitivity) >= 0 ? 1 : -1;
          if (this.h_e === 0) {
            this.h_e = r;
            this.Iic = Time_1.Time.Now;
          }
          if (Time_1.Time.Now > this.Iic + this.YawSignAdaptionCooldown && this.h_e !== r) {
            this.h_e = r;
            this.Iic = Time_1.Time.Now;
          }
          let i = 0;
          let s = 180;
          if (MathUtils_1.MathUtils.Square(this.YawSignAdaptionDistanceThreshold) < this.xzi.SizeSquared()) {
            i = this.RelativeYawHardMin;
            s = this.RelativeYawHardMax;
          }
          if (Math.abs(n) < i) {
            t += this.h_e * i;
            if (l === r) {
              t += M;
            }
          } else if (Math.abs(n) > s) {
            t += this.h_e * s;
            if (l !== r) {
              t += M;
            }
          } else {
            const S = n + M;
            if (r * S < 0 && (r === l && s !== 180 && (_ = MathUtils_1.MathUtils.WrapAngle(this.Ele.Yaw + this.h_e * s), M = MathUtils_1.MathUtils.WrapAngle(this.Ele.Yaw + this.h_e * i), o = Math.max(M, _), a = Math.min(M, _), e = true), r !== l) && i !== 0) {
              M = MathUtils_1.MathUtils.WrapAngle(this.Ele.Yaw + this.h_e * s);
              _ = MathUtils_1.MathUtils.WrapAngle(this.Ele.Yaw + this.h_e * i);
              o = Math.max(_, M);
              a = Math.min(_, M);
              e = true;
            }
            t += S;
          }
          t = MathUtils_1.MathUtils.Clamp(t, n - 179, n + 179);
          this.Ele.Yaw = MathUtils_1.MathUtils.WrapAngle(this.Ele.Yaw + t);
          h = r * this.CameraOffset;
        }
      } else {
        if (i) {
          if ((l = this.Camera.CharacterEntityHandle.Entity.GetComponent(34)) && l?.ShowTarget?.Valid) {
            if (Math.abs(n) < this.RelativeYawSoftMin) {
              this.Ele.Yaw += r * this.RelativeYawSoftMin;
            } else if (Math.abs(n) > this.RelativeYawSoftMax) {
              this.Ele.Yaw += r * this.RelativeYawSoftMax;
            } else {
              this.Ele.Yaw = s;
            }
          }
        } else {
          this.Ele.Yaw = v;
        }
        h = r * this.CameraOffsetSoft;
      }
      const S = Math.abs(h - this.AddCameraOffsetY);
      if (S > ARM_OFFSET_Y_SPEED * t) {
        this.AddCameraOffsetY = MathUtils_1.MathUtils.Lerp(this.AddCameraOffsetY, h, ARM_OFFSET_Y_SPEED * t / S);
      } else {
        this.AddCameraOffsetY = h;
      }
      _ = MathUtils_1.MathUtils.Lerp(this.RelativeRotationLagRatioMin, this.RelativeRotationLagRatioMax, this.RelativeRotationLagRatioCurve.GetCurrentValue((this.xzi.Size2D() - this.RelativeRotationLagDistanceRangeMin) / (this.RelativeRotationLagDistanceRangeMax - this.RelativeRotationLagDistanceRangeMin)));
      M = MathUtils_1.MathUtils.Lerp(this.RelativeRotationLagYawSpeedMin, this.RelativeRotationLagYawSpeedMax, this.RelativeRotationLagYawCurve.GetCurrentValue(Math.abs(n) / this.RelativeRotationLagYawAngleRange));
      if (this.Camera.IsInNormalGravityMode()) {
        this.Camera.DesiredCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.RotatorAxisInterpTo(this.Camera.CurrentCamera.ArmRotation.Yaw, this.Ele.Yaw, t, _ * M);
      } else {
        CameraUtility_1.CameraUtility.SetYawInGravity(this.Camera.DesiredCamera.ArmRotation, MathUtils_1.MathUtils.RotatorAxisInterpTo(v, this.Ele.Yaw, t, _ * M), this.Camera.DesiredCamera.ArmRotation);
      }
      if (e) {
        this.Camera.DesiredCamera.ArmRotation.Yaw = MathUtils_1.MathUtils.Clamp(this.Camera.DesiredCamera.ArmRotation.Yaw, a, o);
      }
    }
  }
  Stl(t, h, e, a) {
    if (!this.Camera.IsModifiedArmRotationPitch) {
      this.Camera.IsModifiedArmRotationPitch = true;
      this.Ele.Pitch = this.Camera.AdjustPitch(this.xzi);
      let i = MathUtils_1.MathUtils.WrapAngle(this.Camera.CameraRotation.Pitch - this.Ele.Pitch);
      let s = i >= 0 ? 1 : -1;
      var o = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.CameraRotation, this.Camera.GravityInverseQuat, this.Gue).Pitch;
      var n = GravityUtils_1.GravityUtils.GetRotatorInGravity(this.Camera.CurrentCamera.ArmRotation, this.Camera.GravityInverseQuat, this.Gue).Pitch;
      if (!this.Camera.IsInNormalGravityMode()) {
        i = MathUtils_1.MathUtils.WrapAngle(o - this.Ele.Pitch);
        s = i >= 0 ? 1 : -1;
      }
      if (h) {
        if (this.YawSignAdaptionOn) {
          let t = 0;
          o = a;
          h = (o = -(o *= Info_1.Info.IsInGamepad() ? this.HardLockInputPitchSensitivityGamepad : this.HardLockInputPitchSensitivity)) >= 0 ? 1 : -1;
          if (Math.abs(i) < this.RelativePitchHardMin) {
            t += s * this.RelativePitchHardMin;
            if (h === s) {
              t += o;
            }
          } else if (Math.abs(i) > this.RelativePitchHardMax) {
            t += s * this.RelativePitchHardMax;
            if (h !== s) {
              t += o;
            }
          } else {
            a = i + o;
            t += a;
          }
          t = MathUtils_1.MathUtils.Clamp(t, i - 179, i + 179);
          this.Ele.Pitch = MathUtils_1.MathUtils.WrapAngle(this.Ele.Pitch + t);
        }
      } else if (!e) {
        if (this.Camera.IsInNormalGravityMode()) {
          this.Ele.Pitch = this.Camera.CurrentCamera.ArmRotation.Pitch;
        } else {
          this.Ele.Pitch = n;
        }
      }
      h = MathUtils_1.MathUtils.Lerp(this.RelativeRotationLagPitchSpeedMin, this.RelativeRotationLagPitchSpeedMax, this.RelativeRotationLagPitchCurve.GetCurrentValue(Math.abs(i) / this.RelativeRotationLagPitchAngleRange));
      if (this.Camera.IsInNormalGravityMode()) {
        this.Camera.DesiredCamera.ArmRotation.Pitch = MathUtils_1.MathUtils.RotatorAxisInterpTo(this.Camera.CurrentCamera.ArmRotation.Pitch, this.Ele.Pitch, t, h);
      } else {
        CameraUtility_1.CameraUtility.SetPitchInGravity(this.Camera.DesiredCamera.ArmRotation, MathUtils_1.MathUtils.RotatorAxisInterpTo(n, this.Ele.Pitch, t, h), this.Camera.DesiredCamera.ArmRotation);
      }
    }
  }
  oza(t) {
    var i;
    var s;
    var h;
    if (!this.Camera.ContainsTag(-1150819426) || ([s, h] = this.Camera.CharacterEntityHandle.Entity.GetComponent(67).GetCameraInput(), s === 0 && h === 0)) {
      this.l_e.Reset();
      this.dTn = true;
    } else {
      h = -h;
      i = (Info_1.Info.IsInGamepad() ? this.ChangeShowTargetSensitivityGamepad : this.ChangeShowTargetSensitivity) * t;
      if (s * this.l_e.X + h * this.l_e.Y <= 0) {
        this.dTn = true;
        this.l_e.Set(s * i, h * i);
      } else {
        this.l_e.X += s * i;
        this.l_e.Y += h * i;
      }
      if ((s = this.l_e.SizeSquared()) > (this.dTn ? FIRST_THRESHOLD_SQUARED : 1)) {
        h = Math.sqrt(s);
        this.l_e.DivisionEqual(h);
        this.Camera.CharacterEntityHandle.Entity.GetComponent(34).ChangeShowTarget(this.l_e, this.ChangeShowTargetAngleCoefficient, this.ChangeShowTargetDistCoefficient);
        this.l_e.MultiplyEqual(h - (this.dTn ? FIRST_THRESHOLD : 1));
        this.dTn = false;
      }
      this.l_e.MultiplyEqual(Math.pow(1 - this.ChangeShowTargetDamping, t * DEFAULT_FPS));
    }
  }
  UpdateDeactivateInternal(t) {
    var i;
    this.KJa();
    if (this.AddCameraOffsetY !== undefined) {
      if ((i = Math.abs(0 - this.AddCameraOffsetY)) > ARM_OFFSET_Y_SPEED * t) {
        this.AddCameraOffsetY = MathUtils_1.MathUtils.Lerp(this.AddCameraOffsetY, 0, ARM_OFFSET_Y_SPEED * t / i);
      } else {
        this.AddCameraOffsetY = undefined;
      }
    }
  }
  ShouldSoftUnlock() {
    var [t, i] = this.Camera.CharacterEntityHandle.Entity.GetComponent(67).GetCameraInput();
    t *= Info_1.Info.IsInGamepad() ? this.SoftLockInputYawSensitivityGamepad : this.SoftLockInputYawSensitivity;
    i *= Info_1.Info.IsInGamepad() ? this.SoftLockInputPitchSensitivityGamepad : this.SoftLockInputPitchSensitivity;
    return Math.abs(t) > this.SoftUnlockYawSpeed || Math.abs(i) > this.SoftUnlockPitchSpeed;
  }
  CanMoveCameraInSoftLock() {
    return this.YKa > 0;
  }
  KJa() {
    this.YKa = 0;
  }
}
exports.CameraFocusController = CameraFocusController;
//# sourceMappingURL=CameraFocusController.js.map