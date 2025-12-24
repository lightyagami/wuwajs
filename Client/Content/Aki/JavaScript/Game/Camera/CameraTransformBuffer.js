"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraTransformBuffer = exports.MotorCycleTransformBuffer = undefined;
const Log_1 = require("../../Core/Common/Log");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const VehicleAnimationComponent_1 = require("../NewWorld/Vehicle/Common/VehicleAnimationComponent");
const MOTORCYCLE_BUFFER_OUT_TIME = 1;
const lerpTimeTagList = [1878618325];
class MotorCycleTransformBuffer {
  constructor() {
    this.Camera = undefined;
    this.QUf = false;
    this.KUf = 0;
    this.uVf = 0;
    this.YUf = Vector_1.Vector.Create();
    this.cVf = Vector_1.Vector.Create();
    this.dVf = FNameUtil_1.FNameUtil.EMPTY;
    this.mVf = FNameUtil_1.FNameUtil.EMPTY;
    this.fVf = false;
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.pz = Vector_1.Vector.Create();
  }
  Init(t) {
    this.Camera = t;
  }
  IsValid() {
    return !!this.Camera?.BaseVehiclePerformComponent?.Valid && this.Camera.BaseVehiclePerformComponent.VehicleType === "Motorcycle" || this.gVf() || this.CVf();
  }
  IsNeedBufferPlayerLocation() {
    return !!this.Camera && this.Camera.LastFrameAttachToVehicle !== this.Camera.AttachToVehicle;
  }
  pVf() {
    return !!this.Camera && !!this.Camera.VehicleAnimationComponent?.Valid && this.Camera.LastFrameCameraArmLocationSocketName !== this.Camera.CameraArmLocationSocketName;
  }
  gVf() {
    return this.QUf || this.IsNeedBufferPlayerLocation();
  }
  CVf() {
    return this.fVf || this.pVf();
  }
  BufferPlayerLocation(t, i) {
    if (!this.gVf() || !this.vVf(t, i)) {
      if (this.CVf()) {
        this.yVf(t, i);
      }
    }
  }
  vVf(t, i) {
    return !!this.Camera && (this.Camera.AttachToVehicle || (this.IsNeedBufferPlayerLocation() && (this.QUf = true, this.KUf = 0, this.YUf.DeepCopy(this.Camera.LastFramePlayerLocation), this.Camera.VehicleAnimationComponent?.Valid ? this.Camera.VehicleAnimationComponent.GetCameraPosition(this.pz, VehicleAnimationComponent_1.VehicleAnimationComponent.SeatProp01) : this.pz.DeepCopy(this.Camera.PlayerLocation), this.Camera.GetPlayerLocation(this.fz), this.pz.Subtraction(this.fz, this.cVf), this.uVf = this.cVf.Size(), this.cVf.Normalize()), this.KUf += t, t = (t = this.zKf()) > 0 ? MathUtils_1.MathUtils.Clamp(this.KUf / t, 0, 1) : 1, this.QUf = t < 1, this.cz.DeepCopy(this.cVf), this.cz.MultiplyEqual(this.uVf * (1 - t)), i.AdditionEqual(this.cz)), true);
  }
  yVf(t, i) {
    if (!this.Camera || !this.Camera.VehicleAnimationComponent?.Valid) {
      return false;
    }
    var s = this.pVf();
    if (!this.pVf() && !this.fVf) {
      return false;
    }
    if (s) {
      this.fVf = true;
      this.KUf = 0;
      this.dVf = this.Camera.LastFrameCameraArmLocationSocketName;
      this.mVf = this.Camera.CameraArmLocationSocketName;
    }
    this.Camera.VehicleAnimationComponent.GetCameraPosition(this.cz, this.dVf);
    this.Camera.VehicleAnimationComponent.GetCameraPosition(this.fz, this.mVf);
    this.KUf += t;
    s = MathUtils_1.MathUtils.Clamp(this.KUf / Math.max(0.5), 0, 1);
    this.fVf = s < 1;
    Vector_1.Vector.Lerp(this.cz, this.fz, s, i);
    return true;
  }
  StopBufferPlayerLocation() {
    this.QUf = false;
  }
  zKf() {
    if (this.Camera.ContainsAnyTag(lerpTimeTagList) && this.Camera.Fading) {
      return this.Camera.FadeDuration;
    } else {
      return MOTORCYCLE_BUFFER_OUT_TIME;
    }
  }
}
exports.MotorCycleTransformBuffer = MotorCycleTransformBuffer;
class CameraTransformBuffer {
  constructor() {
    this.Hh = undefined;
    this.SVf = new Map();
  }
  Init(t) {
    this.Hh = t;
    var i = new MotorCycleTransformBuffer();
    i.Init(t);
    this.SVf.set(1, i);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraTransformBuffer] Init");
    }
  }
  BufferPlayerLocation(t, i) {
    if (this.Hh) {
      for (var [, s] of this.SVf) {
        if (s.IsValid()) {
          s.BufferPlayerLocation(t, i);
          return;
        }
      }
    }
  }
  StopBufferPlayerLocation() {
    for (var [, t] of this.SVf) {
      t.StopBufferPlayerLocation();
    }
  }
  Clear() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraTransformBuffer] Clear");
    }
    this.Hh = undefined;
  }
}
exports.CameraTransformBuffer = CameraTransformBuffer;
//# sourceMappingURL=CameraTransformBuffer.js.map