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
const vehicleStandbyZone = [-971155539];
class CameraRotationZone {
  constructor() {
    this.Hh = undefined;
    this.e1h = undefined;
    this.t1h = undefined;
    this.i1h = undefined;
    this.Whl = undefined;
    this.Qhl = undefined;
    this.Ogm = undefined;
    this.Ggm = undefined;
    this.Fgm = undefined;
    this.Khl = 0;
    this.r1h = 0;
    this.$hl = 0;
    this.Xhl = 0;
    this.gqf = 0;
    this.Cqf = 0;
    this.pqf = 0;
    this.vqf = 0;
    this.Yhl = 0;
    this.zhl = 0;
    this.yqf = 0;
    this.Sqf = 0;
    this.Mqf = 0;
    this.Eqf = 0;
    this.glm = Vector_1.Vector.Create();
    this.Lz = Vector_1.Vector.Create();
    this.az = Quat_1.Quat.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.H1g = Rotator_1.Rotator.Create();
    this.c1e = new Set();
    this.m6c = false;
  }
  Init(t) {
    this.Hh = t;
  }
  SetCharacter(t) {
    this.e1h = t;
    if (this.e1h?.Valid && (this.t1h = this.e1h.Entity.GetComponent(67), this.i1h = this.e1h.Entity.GetComponent(3), this.Whl = this.e1h.Entity.GetComponent(64), this.Qhl = this.e1h.Entity.GetComponent(188), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Camera", 57, "CameraRotationZone init Character");
    }
  }
  SetVehicle(t) {
    this.Ogm = t;
    if (this.Ogm?.Valid) {
      this.Ggm = this.Ogm.Entity.GetComponent(247);
      this.Fgm = this.Ogm.Entity.GetComponent(254);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "CameraRotationZone init Vehicle");
      }
    } else {
      this.Ggm = undefined;
      this.Fgm = undefined;
    }
  }
  UpdateInputState(t) {
    var i;
    var s;
    if (this.Hh.CameraZoneMode !== 0 && !(this.c1e.size > 0)) {
      this.Hh.GetCameraTargetInput(this.glm);
      if (this.IsHasPitchMovement()) {
        this.Yhl += t;
      } else {
        this.Yhl = 0;
      }
      [i, s] = this.t1h.GetCameraInput();
      if (MathUtils_1.MathUtils.IsNearlyZero(s, MathUtils_1.MathUtils.KindaSmallNumber)) {
        this.zhl += t;
      } else {
        this.zhl = 0;
      }
      if (MathUtils_1.MathUtils.IsNearlyZero(this.glm.Y, MathUtils_1.MathUtils.KindaSmallNumber)) {
        this.$hl = 0;
      } else {
        this.$hl += t;
      }
      if (MathUtils_1.MathUtils.IsNearlyZero(i, MathUtils_1.MathUtils.KindaSmallNumber)) {
        this.Xhl += t;
      } else {
        this.Xhl = 0;
      }
    }
  }
  UpdatePitchZone(i) {
    if (this.o1h() && this.uug()) {
      this.Iqf();
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
      t += this.Hh.PitchBasis;
      var s = CameraUtility_1.CameraUtility.GetPitchInGravity(this.Hh.DesiredCamera.ArmRotation);
      var h = MathUtils_1.MathUtils.WrapAngle(t - s);
      this.Jhl(h, s);
      var s = this.Zhl(t, s, h, i);
      CameraUtility_1.CameraUtility.SetPitchInGravity(this.Hh.DesiredCamera.ArmRotation, s, this.Hh.DesiredCamera.ArmRotation);
    }
  }
  Iqf() {
    this.yqf = this.Hh.PitchSoftZoneMin;
    this.Sqf = this.Hh.PitchSoftZoneMax;
    this.Mqf = this.Hh.PitchDeadZoneMin;
    this.Eqf = this.Hh.PitchDeadZoneMax;
    if (this.Hh.CameraZoneMode === 3) {
      this.yqf += Math.max(0, this.Hh.PlayerRotatorInGravity.Pitch);
    }
  }
  Jhl(t, i) {
    if (t >= this.yqf && t <= this.Sqf) {
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
    if (this.Khl === 0 && this.Tqf()) {
      return i;
    }
    var a = MathUtils_1.MathUtils.Lerp(this.Hh.PitchZoneSpeedMin, this.Hh.PitchZoneSpeedMax, MathUtils_1.MathUtils.Clamp(Math.abs(s) / this.Sqf, 0, 1));
    var h = h * a;
    let e = i;
    if (this.Khl !== 0 && this.Khl !== 1 && (e = this.pQl(i, t, h, s), (i = MathUtils_1.MathUtils.WrapAngle(t - e)) >= this.yqf) && i <= this.Sqf) {
      this.Khl = 2;
    }
    if (this.m6c && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[PitchZone stage2]", ["State", this.Khl], ["actorPitch", t.toFixed(2)], ["targetPitch", e.toFixed(2)], ["speed", a.toFixed(2)], ["deltaPitch", s.toFixed(2)], ["targetDeltaPitch", h.toFixed(2)]);
    }
    return e = this.Hh.CameraZoneMode === 1 || this.Hh.CameraZoneMode === 2 ? this.vQl(this.Khl === 2, t, e, this.yqf, this.Sqf, this.Mqf, this.Eqf) : this.j1g(this.Khl === 2, t, e, this.yqf, this.Sqf, this.Mqf, this.Eqf);
  }
  UpdateYawZone(t) {
    if (this.o1h() && this.cug()) {
      this.bqf();
      this.n1h();
      t = this.s1h(t);
      CameraUtility_1.CameraUtility.SetYawInGravity(this.Hh.DesiredCamera.ArmRotation, t, this.Hh.DesiredCamera.ArmRotation);
    }
  }
  bqf() {
    this.gqf = this.Hh.YawSoftZoneMin;
    this.Cqf = this.Hh.YawSoftZoneMax;
    this.pqf = this.Hh.YawDeadZoneMin;
    this.vqf = this.Hh.YawDeadZoneMax;
  }
  n1h() {
    var t = this.Hh.PlayerRotatorInGravity.Yaw;
    var i = CameraUtility_1.CameraUtility.GetYawInGravity(this.Hh.DesiredCamera.ArmRotation);
    var t = MathUtils_1.MathUtils.WrapAngle(t - i);
    if (t >= this.gqf && t <= this.Cqf) {
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
    if (this.m6c && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[YawZone stage1]", ["State", this.r1h], ["targetYaw", i.toFixed(2)]);
    }
  }
  s1h(t) {
    if (this.r1h === 0 && this.Rqf()) {
      return CameraUtility_1.CameraUtility.GetYawInGravity(this.Hh.DesiredCamera.ArmRotation);
    }
    var i;
    var s;
    var h = this.Hh.PlayerRotatorInGravity.Yaw;
    var a = CameraUtility_1.CameraUtility.GetYawInGravity(this.Hh.DesiredCamera.ArmRotation);
    var e = MathUtils_1.MathUtils.WrapAngle(h - a);
    var t = t * this.Ngm();
    let r = a;
    if (this.r1h === 2) {
      r = this.u1h(a, t);
    } else if (this.r1h === 3) {
      r = this.c1h(a, t, e, r);
      i = this.m1h() ? this.gqf : this.Cqf;
      s = MathUtils_1.MathUtils.WrapAngle(h - r);
      if (e < 0 && i < s || e > 0 && s < i) {
        this.r1h = 2;
      }
    } else if (this.r1h === 4 || this.r1h === 5) {
      r = this.d1h(a, h, t, e);
      if ((s = MathUtils_1.MathUtils.WrapAngle(h - r)) >= this.gqf && s <= this.Cqf) {
        this.r1h = 2;
      }
    }
    if (this.m6c && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[YawZone stage2]", ["State", this.r1h], ["actorYaw", h.toFixed(2)], ["targetYaw", r.toFixed(2)], ["deltaYaw", e.toFixed(2)]);
    }
    r = this.vQl(this.r1h === 2 || this.r1h === 5, h, r, this.gqf, this.Cqf, this.pqf, this.vqf);
    if (this.m6c && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[YawZone stage3]", ["State", this.r1h], ["targetYaw", r.toFixed(2)]);
    }
    return r;
  }
  u1h(t, i) {
    if (this.Hh.CameraZoneMode === 3 && this.oQ_() && !MathUtils_1.MathUtils.IsNearlyZero(this.glm.Y, MathUtils_1.MathUtils.KindaSmallNumber)) {
      if (this.m1h()) {
        return MathUtils_1.MathUtils.WrapAngle(t + i * this.Hh.YawSoftZoneSpeedRatio);
      } else {
        return MathUtils_1.MathUtils.WrapAngle(t - i * this.Hh.YawSoftZoneSpeedRatio);
      }
    } else {
      return MathUtils_1.MathUtils.WrapAngle(t + (this.oQ_() ? this.m1h() ? i : -i : 0));
    }
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
  j1g(t, i, s, h, a, e, r) {
    var o = this.Gue;
    var _ = this.Lz;
    CameraUtility_1.CameraUtility.GetRotatorInGravity(this.Hh.DesiredCamera.ArmRotation, this.Gue);
    o.Pitch = s;
    o.Vector(_);
    var s = this.H1g;
    s.DeepCopy(this.Hh.PlayerRotatorInGravity);
    s.Roll = 0;
    s.Quaternion(this.az);
    this.az.UnRotateVector(_, _);
    _.Rotation(o);
    o.Pitch = this.$1g(t, i, o.Pitch, h, a, e, r);
    o.Vector(_);
    this.az.RotateVector(_, _);
    _.Rotation(o);
    return o.Pitch;
  }
  $1g(t, i, s, h, a, e, r) {
    h = t ? h : e;
    e = t ? a : r;
    if (s < -e) {
      return -e;
    } else if (-h < s) {
      return -h;
    } else {
      return s;
    }
  }
  uug() {
    return this.Hh.CameraZoneMode !== 0 && this.Hh.CameraZoneMode !== 4;
  }
  cug() {
    return this.Hh.CameraZoneMode !== 0 && this.Hh.CameraZoneMode !== 4;
  }
  o1l() {
    return !(this.c1e.size > 0) && (this.Hh.CameraZoneMode === 1 ? this.Hh.CharacterMoveEnterState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar || this.Qhl.HasKuroRootMotion || this.t1h.IsInCameraDrivenAutoFlightMode() || this.$hl > 0 && this.Xhl > 0 && !this.IsYawRollback() : this.Hh.CameraZoneMode === 2 ? this.$hl > 0 && this.Xhl > 0 && !this.IsYawRollback() : this.Hh.CameraZoneMode === 3 && (this.Fgm.HasAnyTag(vehicleStandbyZone) || this.Ggm.ActorVelocityProxy.Size() <= 5 || this.$hl > 0 && this.Xhl > 0 && !this.IsYawRollback()));
  }
  e1l() {
    return !(this.c1e.size > 0) && (this.Hh.CameraZoneMode === 1 ? this.Hh.CharacterMoveEnterState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar || this.Qhl.HasKuroRootMotion || this.t1h.IsInCameraDrivenAutoFlightMode() || this.zhl > 0 && !this.IsPitchRollback() : this.Hh.CameraZoneMode === 2 ? this.zhl > 0 && !this.IsPitchRollback() : this.Hh.CameraZoneMode === 3 && (this.Fgm.HasAnyTag(vehicleStandbyZone) || this.Ggm.ActorVelocityProxy.Size() <= 5 || this.zhl > 0 && !this.IsPitchRollback()));
  }
  a1h() {
    return this.Hh.CameraZoneMode !== 1 || !this.t1h.IsInCameraDrivenAutoFlightMode();
  }
  h1h() {
    return (this.Hh.CameraZoneMode === 1 || this.Hh.CameraZoneMode === 3) && this.IsYawInputEnable() && this.IsYawRollback();
  }
  t1l() {
    if (this.Hh.CameraZoneMode === 1) {
      return !this.Qhl.HasKuroRootMotion && this.IsPitchInputEnable() && this.IsPitchRollback();
    } else {
      return this.Hh.CameraZoneMode === 3 && this.IsPitchInputEnable() && this.IsPitchRollback();
    }
  }
  oQ_() {
    return this.Hh.CameraZoneMode === 1 || this.Hh.CameraZoneMode === 3;
  }
  m1h() {
    if (this.Hh.CameraZoneMode === 1) {
      return this.glm.Y < 0;
    } else {
      return this.Hh.CameraZoneMode === 3 && this.glm.Y > 0;
    }
  }
  l1h() {
    return this.Hh.CameraZoneMode === 1 || this.Hh.CameraZoneMode === 3 || (this.Hh.CameraZoneMode, false);
  }
  g1h(t) {
    return (this.Hh.CameraZoneMode === 1 || this.Hh.CameraZoneMode === 3) && this.glm.Y > 0 && t > 0;
  }
  p1h(t) {
    return (this.Hh.CameraZoneMode === 1 || this.Hh.CameraZoneMode === 3) && this.glm.Y < 0 && t < 0;
  }
  n1l() {
    if (this.Hh.CameraZoneMode === 1 || this.Hh.CameraZoneMode === 2) {
      return this.IsYawRollback();
    } else {
      return this.Hh.CameraZoneMode === 3 && (this.IsYawRollback() || this.r1h === 2 && !MathUtils_1.MathUtils.IsNearlyZero(this.glm.Y, MathUtils_1.MathUtils.KindaSmallNumber));
    }
  }
  i1l() {
    if (this.Hh.CameraZoneMode === 1) {
      return this.Qhl.HasKuroRootMotion || this.IsPitchRollback();
    } else if (this.Hh.CameraZoneMode === 2) {
      return this.IsPitchRollback();
    } else {
      return this.Hh.CameraZoneMode === 3 && (this.IsPitchRollback() || this.r1h === 2 && !MathUtils_1.MathUtils.IsNearlyZero(this.glm.X, MathUtils_1.MathUtils.KindaSmallNumber));
    }
  }
  Ngm() {
    var t = this.Hh.PlayerRotatorInGravity.Yaw;
    var i = CameraUtility_1.CameraUtility.GetYawInGravity(this.Hh.DesiredCamera.ArmRotation);
    var t = MathUtils_1.MathUtils.WrapAngle(t - i);
    return MathUtils_1.MathUtils.Lerp(this.Hh.YawZoneSpeedMin, this.Hh.YawZoneSpeedMax, MathUtils_1.MathUtils.Clamp(Math.abs(t) / this.vqf, 0, 1));
  }
  Tqf() {
    return this.Hh.CameraZoneMode !== 3;
  }
  Rqf() {
    return this.Hh.CameraZoneMode !== 3;
  }
  o1h() {
    return !!this.e1h?.Valid && !!this.t1h?.Valid && !!this.i1h?.Valid && !!this.Whl?.Valid && !!this.Qhl?.Valid && (this.Hh.CameraZoneMode !== 3 || !!this.Vgm());
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
    return !!this.Whl?.Valid && !!this.i1h?.Valid && (this.Whl.SoarBoostOn || !this.glm.IsNearlyZero());
  }
  IsHasPitchUpMovement() {
    return !!this.Whl?.Valid && this.glm.X < 0;
  }
  IsHasPitchHorizontalMovement() {
    return !!this.Whl?.Valid && !!this.i1h?.Valid && this.Whl.SoarBalanceOn;
  }
  IsHasYawHorizontalMovement() {
    return (this.Hh.CameraZoneMode !== 3 || !this.Vgm() || !MathUtils_1.MathUtils.IsNearlyZero(this.Ggm.ActorVelocityProxy.Size(), 5)) && !MathUtils_1.MathUtils.IsNearlyZero(this.glm.Y, MathUtils_1.MathUtils.KindaSmallNumber);
  }
  Lock(t) {
    this.c1e.add(t);
  }
  Unlock(t) {
    this.c1e.delete(t);
  }
  Vgm() {
    return !!this.Ogm?.Valid;
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