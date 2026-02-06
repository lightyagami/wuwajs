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
    this.DGf = false;
    this.UGf = 0;
    this.ZKf = 0;
    this.BGf = Vector_1.Vector.Create();
    this.eXf = Vector_1.Vector.Create();
    this.tXf = FNameUtil_1.FNameUtil.EMPTY;
    this.iXf = FNameUtil_1.FNameUtil.EMPTY;
    this.rXf = false;
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.pz = Vector_1.Vector.Create();
  }
  Init(t) {
    this.Camera = t;
  }
  IsValid() {
    return !!this.Camera?.BaseVehiclePerformComponent?.Valid && this.Camera.BaseVehiclePerformComponent.VehicleType === "Motorcycle" || this.oXf() || this.nXf();
  }
  IsNeedBufferPlayerLocation() {
    return !!this.Camera && this.Camera.LastFrameAttachToVehicle !== this.Camera.AttachToVehicle;
  }
  sXf() {
    return !!this.Camera && !!this.Camera.VehicleAnimationComponent?.Valid && this.Camera.LastFrameCameraArmLocationSocketName !== this.Camera.CameraArmLocationSocketName;
  }
  oXf() {
    return this.DGf || this.IsNeedBufferPlayerLocation();
  }
  nXf() {
    return this.rXf || this.sXf();
  }
  BufferPlayerLocation(t, i) {
    if (!this.oXf() || !this.aXf(t, i)) {
      if (this.nXf()) {
        this.hXf(t, i);
      }
    }
  }
  aXf(t, i) {
    return !!this.Camera && (this.Camera.AttachToVehicle || (this.IsNeedBufferPlayerLocation() && (this.DGf = true, this.UGf = 0, this.BGf.DeepCopy(this.Camera.LastFramePlayerLocation), this.Camera.VehicleAnimationComponent?.Valid ? this.Camera.VehicleAnimationComponent.GetCameraPosition(this.pz, VehicleAnimationComponent_1.VehicleAnimationComponent.SeatProp01) : this.pz.DeepCopy(this.Camera.PlayerLocation), this.Camera.GetPlayerLocation(this.fz), this.pz.Subtraction(this.fz, this.eXf), this.ZKf = this.eXf.Size(), this.eXf.Normalize()), this.UGf += t, t = (t = this.W1g()) > 0 ? MathUtils_1.MathUtils.Clamp(this.UGf / t, 0, 1) : 1, this.DGf = t < 1, this.cz.DeepCopy(this.eXf), this.cz.MultiplyEqual(this.ZKf * (1 - t)), i.AdditionEqual(this.cz)), true);
  }
  hXf(t, i) {
    if (!this.Camera || !this.Camera.VehicleAnimationComponent?.Valid) {
      return false;
    }
    var s = this.sXf();
    if (!this.sXf() && !this.rXf) {
      return false;
    }
    if (s) {
      this.rXf = true;
      this.UGf = 0;
      this.tXf = this.Camera.LastFrameCameraArmLocationSocketName;
      this.iXf = this.Camera.CameraArmLocationSocketName;
    }
    this.Camera.VehicleAnimationComponent.GetCameraPosition(this.cz, this.tXf);
    this.Camera.VehicleAnimationComponent.GetCameraPosition(this.fz, this.iXf);
    this.UGf += t;
    s = MathUtils_1.MathUtils.Clamp(this.UGf / Math.max(0.5), 0, 1);
    this.rXf = s < 1;
    Vector_1.Vector.Lerp(this.cz, this.fz, s, i);
    return true;
  }
  StopBufferPlayerLocation() {
    this.DGf = false;
  }
  W1g() {
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
    this.lXf = new Map();
  }
  Init(t) {
    this.Hh = t;
    var i = new MotorCycleTransformBuffer();
    i.Init(t);
    this.lXf.set(1, i);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 57, "[CameraTransformBuffer] Init");
    }
  }
  BufferPlayerLocation(t, i) {
    if (this.Hh) {
      for (var [, s] of this.lXf) {
        if (s.IsValid()) {
          s.BufferPlayerLocation(t, i);
          return;
        }
      }
    }
  }
  StopBufferPlayerLocation() {
    for (var [, t] of this.lXf) {
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