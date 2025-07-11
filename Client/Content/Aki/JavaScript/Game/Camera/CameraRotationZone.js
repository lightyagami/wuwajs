"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraRotationZone = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const MathCommon_1 = require("../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const GlobalData_1 = require("../GlobalData");
const CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const ColorUtils_1 = require("../Utils/ColorUtils");
const CameraUtility_1 = require("./CameraUtility");
const CAMERA_DIRECTION_LENGTH = 500;
const CAMERA_DIRECTION_ARROW_SIZE = 2000;
class CameraRotationZone {
  constructor() {
    this.Hh = undefined;
    this.e1h = undefined;
    this.t1h = undefined;
    this.i1h = undefined;
    this.Whl = undefined;
    this.Qhl = undefined;
    this.Khl = 0;
    this.r1h = 0;
    this.$hl = 0;
    this.Xhl = 0;
    this.Yhl = 0;
    this.zhl = 0;
    this.az = Quat_1.Quat.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.c1e = new Set();
    this.m6c = false;
  }
  Init(t) {
    this.Hh = t;
  }
  SetCharacter(t) {
    this.e1h = t;
    if (this.e1h?.Valid && (this.t1h = this.e1h.Entity.GetComponent(62), this.i1h = this.e1h.Entity.GetComponent(3), this.Whl = this.e1h.Entity.GetComponent(59), this.Qhl = this.e1h.Entity.GetComponent(177), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Camera", 57, "CameraRotationZone init");
    }
  }
  UpdateInputState(t) {
    var i;
    var s;
    var h;
    if (this.Hh.CameraZoneMode !== 0 && !(this.c1e.size > 0)) {
      i = this.i1h.InputDirectProxy;
      [s, h] = (this.IsHasPitchMovement() ? this.Yhl += t : this.Yhl = 0, this.t1h.GetCameraInput());
      if (MathUtils_1.MathUtils.IsNearlyZero(h, MathUtils_1.MathUtils.KindaSmallNumber)) {
        this.zhl += t;
      } else {
        this.zhl = 0;
      }
      if (MathUtils_1.MathUtils.IsNearlyZero(i.Y, MathUtils_1.MathUtils.KindaSmallNumber)) {
        this.$hl = 0;
      } else {
        this.$hl += t;
      }
      if (MathUtils_1.MathUtils.IsNearlyZero(s, MathUtils_1.MathUtils.KindaSmallNumber)) {
        this.Xhl += t;
      } else {
        this.Xhl = 0;
      }
    }
  }
  UpdatePitchZone(i) {
    if (this.o1h() && this.Hh.CameraZoneMode !== 0) {
      let t = this.Hh.PlayerRotatorInGravity.Pitch;
      if (this.Hh.CameraZoneMode === 1) {
        s = this.i1h.ActorVelocityProxy;
        if (this.Hh.IsInNormalGravityMode()) {
          MathUtils_1.MathUtils.LookRotationForwardFirst(s, Vector_1.Vector.UpVectorProxy, this.az);
          this.az.Rotator(this.Gue);
        } else {
          s.Rotation(this.Gue);
          CameraUtility_1.CameraUtility.GetRotatorInGravity(this.Gue, this.Gue);
        }
        t = this.Gue.Pitch;
      }
      var s = CameraUtility_1.CameraUtility.GetPitchInGravity(this.Hh.DesiredCamera.ArmRotation);
      var h = MathUtils_1.MathUtils.WrapAngle(t - s);
      this.Jhl(h, s);
      var s = this.Zhl(t, s, h, i);
      CameraUtility_1.CameraUtility.SetPitchInGravity(this.Hh.DesiredCamera.ArmRotation, s, this.Hh.DesiredCamera.ArmRotation);
    }
  }
  Jhl(t, i) {
    if (t >= this.Hh.PitchSoftZoneMin && t <= this.Hh.PitchSoftZoneMax) {
      this.Khl = 2;
    }
    if (this.e1l()) {
      this.Khl = 0;
    } else if (this.t1h.HasCameraInput() || this.c1e.size > 0) {
      this.Khl = 1;
    } else if (this.t1l()) {
      if (this.Khl !== 2 && this.l1h()) {
        this.Khl = 3;
      }
    } else if (this.i1l()) {
      this.Khl = 4;
    }
    if (this.m6c && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[PitchZone stage1]", ["State", this.Khl], ["targetPitch", i.toFixed(2)], ["autoFlight", this.t1h.IsInCameraDrivenAutoFlightMode()], ["rollback", this.zhl > 0 && !this.IsPitchRollback()]);
    }
  }
  Zhl(t, i, s, h) {
    if (this.Khl === 0) {
      return i;
    }
    var a = MathUtils_1.MathUtils.Lerp(this.Hh.PitchZoneSpeedMin, this.Hh.PitchZoneSpeedMax, MathUtils_1.MathUtils.Clamp(Math.abs(s) / this.Hh.PitchSoftZoneMax, 0, 1));
    var h = h * a;
    let e = i;
    if (this.Khl !== 1 && (e = this.pQl(i, t, h, s), (i = MathUtils_1.MathUtils.WrapAngle(t - e)) >= this.Hh.PitchSoftZoneMin) && i <= this.Hh.PitchSoftZoneMax) {
      this.Khl = 2;
    }
    if (this.m6c && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[PitchZone stage2]", ["State", this.Khl], ["actorPitch", t.toFixed(2)], ["targetPitch", e.toFixed(2)], ["speed", a.toFixed(2)], ["deltaPitch", s.toFixed(2)], ["targetDeltaPitch", h.toFixed(2)]);
    }
    e = this.vQl(this.Khl === 2, t, e, this.Hh.PitchSoftZoneMin, this.Hh.PitchSoftZoneMax, this.Hh.PitchDeadZoneMin, this.Hh.PitchDeadZoneMax);
    if (this.m6c && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[PitchZone stage3]", ["State", this.Khl], ["targetPitch", e.toFixed(2)]);
    }
    return e;
  }
  UpdateYawZone(t) {
    if (this.o1h() && this.Hh.CameraZoneMode !== 0) {
      this.n1h();
      t = this.s1h(t);
      CameraUtility_1.CameraUtility.SetYawInGravity(this.Hh.DesiredCamera.ArmRotation, t, this.Hh.DesiredCamera.ArmRotation);
    }
  }
  n1h() {
    var t = this.Hh.PlayerRotatorInGravity.Yaw;
    var i = CameraUtility_1.CameraUtility.GetYawInGravity(this.Hh.DesiredCamera.ArmRotation);
    var t = MathUtils_1.MathUtils.WrapAngle(t - i);
    if (t >= this.Hh.YawSoftZoneMin && t <= this.Hh.YawSoftZoneMax) {
      this.r1h = 2;
    }
    if (this.o1l()) {
      this.r1h = 0;
    } else if (this.a1h() && this.t1h.HasCameraInput() || this.c1e.size > 0) {
      this.r1h = 1;
    } else if (this.h1h()) {
      if (this.r1h !== 2 && this.l1h()) {
        this.r1h = 3;
      }
    } else if (this.n1l()) {
      if (this.r1h === 2) {
        this.r1h = 5;
      } else if (this.r1h !== 5) {
        this.r1h = 4;
      }
    }
  }
  s1h(t) {
    if (this.r1h === 0) {
      return CameraUtility_1.CameraUtility.GetYawInGravity(this.Hh.DesiredCamera.ArmRotation);
    }
    var i;
    var s;
    var h = this.Hh.PlayerRotatorInGravity.Yaw;
    var a = CameraUtility_1.CameraUtility.GetYawInGravity(this.Hh.DesiredCamera.ArmRotation);
    var e = MathUtils_1.MathUtils.WrapAngle(h - a);
    var t = t * MathUtils_1.MathUtils.Lerp(this.Hh.YawZoneSpeedMin, this.Hh.YawZoneSpeedMax, MathUtils_1.MathUtils.Clamp(Math.abs(e) / this.Hh.YawDeadZoneMax, 0, 1));
    let r = a;
    if (this.r1h === 2) {
      r = this.u1h(a, t);
    } else if (this.r1h === 3) {
      r = this.c1h(a, t, e, r);
      i = this.m1h() ? this.Hh.YawSoftZoneMin : this.Hh.YawSoftZoneMax;
      s = MathUtils_1.MathUtils.WrapAngle(h - r);
      if (e < 0 && i < s || e > 0 && s < i) {
        this.r1h = 2;
      }
    } else if (this.r1h === 4 || this.r1h === 5) {
      r = this.d1h(a, h, t, e);
      if ((s = MathUtils_1.MathUtils.WrapAngle(h - r)) >= this.Hh.YawSoftZoneMin && s <= this.Hh.YawSoftZoneMax) {
        this.r1h = 2;
      }
    }
    return r = this.vQl(this.r1h === 2 || this.r1h === 5, h, r, this.Hh.YawSoftZoneMin, this.Hh.YawSoftZoneMax, this.Hh.YawDeadZoneMin, this.Hh.YawDeadZoneMax);
  }
  u1h(t, i) {
    return MathUtils_1.MathUtils.WrapAngle(t + (this.oQ_() ? this.m1h() ? i : -i : 0));
  }
  c1h(t, i, s, h) {
    if (this.g1h(s)) {
      return MathUtils_1.MathUtils.WrapAngle(t + i * this.Hh.YawDeadZoneTransToSoftZoneSpeedRatio);
    } else if (this.p1h(s)) {
      return MathUtils_1.MathUtils.WrapAngle(t - i * this.Hh.YawDeadZoneTransToSoftZoneSpeedRatio);
    } else {
      return h;
    }
  }
  d1h(t, i, s, h) {
    if (h < 0) {
      const a = MathUtils_1.MathUtils.WrapAngle(t - s * this.Hh.YawTransToForwardSpeedRatio);
      const e = MathUtils_1.MathUtils.WrapAngle(i - a);
      if (e > 0) {
        return i;
      } else {
        return a;
      }
    }
    const a = MathUtils_1.MathUtils.WrapAngle(t + s * this.Hh.YawTransToForwardSpeedRatio);
    const e = MathUtils_1.MathUtils.WrapAngle(i - a);
    if (e < 0) {
      return i;
    } else {
      return a;
    }
  }
  pQl(t, i, s, h) {
    if (h < 0) {
      const a = MathUtils_1.MathUtils.WrapAngle(t - s);
      const e = MathUtils_1.MathUtils.WrapAngle(i - a);
      if (e > 0) {
        return i;
      } else {
        return a;
      }
    }
    const a = MathUtils_1.MathUtils.WrapAngle(t + s);
    const e = MathUtils_1.MathUtils.WrapAngle(i - a);
    if (e < 0) {
      return i;
    } else {
      return a;
    }
  }
  vQl(t, i, s, h, a, e, r) {
    var o = MathUtils_1.MathUtils.WrapAngle(i - s);
    var h = t ? h : e;
    var e = t ? a : r;
    if (o < h) {
      return MathUtils_1.MathUtils.WrapAngle(i - h);
    } else if (e < o) {
      return MathUtils_1.MathUtils.WrapAngle(i - e);
    } else {
      return s;
    }
  }
  o1l() {
    return !(this.c1e.size > 0) && (this.Hh.CameraZoneMode === 1 ? this.Hh.CharacterMoveEnterState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar || this.Qhl.HasKuroRootMotion || this.t1h.IsInCameraDrivenAutoFlightMode() || this.$hl > 0 && this.Xhl > 0 && !this.IsYawRollback() : this.Hh.CameraZoneMode === 2 && this.$hl > 0 && this.Xhl > 0 && !this.IsYawRollback());
  }
  e1l() {
    return !(this.c1e.size > 0) && (this.Hh.CameraZoneMode === 1 ? this.Hh.CharacterMoveEnterState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar || this.Qhl.HasKuroRootMotion || this.t1h.IsInCameraDrivenAutoFlightMode() || this.zhl > 0 && !this.IsPitchRollback() : this.Hh.CameraZoneMode === 2 && this.zhl > 0 && !this.IsPitchRollback());
  }
  a1h() {
    return this.Hh.CameraZoneMode !== 1 || !this.t1h.IsInCameraDrivenAutoFlightMode();
  }
  h1h() {
    return this.Hh.CameraZoneMode === 1 && this.IsYawInputEnable() && this.IsYawRollback();
  }
  t1l() {
    return this.Hh.CameraZoneMode === 1 && !this.Qhl.HasKuroRootMotion && this.IsPitchInputEnable() && this.IsPitchRollback();
  }
  oQ_() {
    return this.Hh.CameraZoneMode === 1;
  }
  m1h() {
    return this.Hh.CameraZoneMode === 1 && this.i1h.InputDirectProxy.Y < 0;
  }
  l1h() {
    return this.Hh.CameraZoneMode === 1 || (this.Hh.CameraZoneMode, false);
  }
  g1h(t) {
    return this.Hh.CameraZoneMode === 1 && this.i1h.InputDirectProxy.Y > 0 && t > 0;
  }
  p1h(t) {
    return this.Hh.CameraZoneMode === 1 && this.i1h.InputDirectProxy.Y < 0 && t < 0;
  }
  n1l() {
    return (this.Hh.CameraZoneMode === 1 || this.Hh.CameraZoneMode === 2) && this.IsYawRollback();
  }
  i1l() {
    if (this.Hh.CameraZoneMode === 1) {
      return this.Qhl.HasKuroRootMotion || this.IsPitchRollback();
    } else {
      return this.Hh.CameraZoneMode === 2 && this.IsPitchRollback();
    }
  }
  o1h() {
    return !!this.e1h?.Valid && !!this.t1h?.Valid && !!this.i1h?.Valid && !!this.Whl?.Valid && !!this.Qhl?.Valid;
  }
  IsPitchRollback() {
    return this.zhl >= this.Hh.PitchRollbackEnableTime;
  }
  IsPitchInputEnable() {
    return this.Yhl >= this.Hh.PitchInputEnableTime;
  }
  IsYawRollback() {
    return this.Xhl >= this.Hh.YawRollbackEnableTime;
  }
  IsYawInputEnable() {
    return this.$hl >= this.Hh.YawInputEnableTime;
  }
  IsHasPitchMovement() {
    return !!this.Whl?.Valid && !!this.i1h?.Valid && (this.Whl.SoarBoostOn || !this.i1h.InputDirectProxy.IsNearlyZero());
  }
  IsHasPitchUpMovement() {
    return !!this.Whl?.Valid && this.i1h.InputDirectProxy.X < 0;
  }
  IsHasPitchHorizontalMovement() {
    return !!this.Whl?.Valid && !!this.i1h?.Valid && this.Whl.SoarBalanceOn;
  }
  Lock(t) {
    this.c1e.add(t);
  }
  Unlock(t) {
    this.c1e.delete(t);
  }
  Clear() {
    this.Hh = undefined;
    this.e1h = undefined;
    this.t1h = undefined;
    this.i1h = undefined;
    this.Whl = undefined;
    this.Qhl = undefined;
  }
}
exports.CameraRotationZone = CameraRotationZone;
//# sourceMappingURL=CameraRotationZone.js.map