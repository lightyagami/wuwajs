"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraRotatorController = undefined;
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const CameraUtility_1 = require("../CameraUtility");
const CameraControllerBase_1 = require("./CameraControllerBase");
class CameraRotatorController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments);
    this.StartRotator = Rotator_1.Rotator.Create();
    this.DesRotator = Rotator_1.Rotator.Create();
    this.CurrentRotator = Rotator_1.Rotator.Create();
    this.dce = false;
    this.Ql = -0;
    this.c_e = -0;
    this.Cce = -0;
    this.Alpha = 0;
    this.fce = 0;
    this.pce = 0;
    this.vce = undefined;
    this.nQ_ = true;
    this.vcm = Vector_1.Vector.Create();
    this.ycm = Vector_1.Vector.Create();
    this.Scm = false;
    this.HDe = undefined;
  }
  Name() {
    return "RotatorController";
  }
  PlayCameraRotator(t, i, s, h, a = true, r = 0) {
    this.Mce(t, i, s, h, r, 0, 1, a);
  }
  PlayCameraRotatorWithCurve(t, i, s, h, a, r, e, o = true, l = 0, _) {
    this.vce = e;
    this.Mce(t, i, s, h, l, a, r, o, _);
  }
  PlayCameraEulerRotator(t, i, s = true, h = 0) {
    this.Ece(t, i, h, 0, 1, s);
  }
  PlayCameraEulerRotatorWithCurve(t, i, s, h, a, r = true, e = 0) {
    this.vce = a;
    this.Ece(t, i, e, s, h, r);
  }
  nce(t) {
    var i;
    var s;
    if (this.dce) {
      [s, i] = this.Camera.CharacterEntityHandle.Entity.GetComponent(65).GetCameraInput();
      if (this.nQ_ && (Math.abs(s) > 0 || Math.abs(i) > 0)) {
        this.Sce();
      } else {
        s = this.Cce / this.Ql;
        if (this.vce) {
          this.Alpha = this.vce.GetCurrentValue(s);
        } else {
          this.Alpha = s;
        }
        this.Alpha = MathUtils_1.MathUtils.Clamp(this.Alpha, this.fce, this.pce);
        if (this.Scm) {
          this.vcm.Subtraction(this.Camera.PlayerLocation, this.ycm);
          this.ycm.Rotation(this.DesRotator);
          if (!this.Camera.IsInNormalGravityMode()) {
            CameraUtility_1.CameraUtility.GetRotatorInGravity(this.DesRotator, this.DesRotator);
          }
        }
        Rotator_1.Rotator.Lerp(this.StartRotator, this.DesRotator, this.Alpha, this.CurrentRotator);
        if (this.Camera.IsInNormalGravityMode()) {
          this.Camera.DesiredCamera.ArmRotation = Rotator_1.Rotator.Create(this.CurrentRotator);
        } else {
          CameraUtility_1.CameraUtility.SetRotatorInGravity(this.Camera.DesiredCamera.ArmRotation, this.CurrentRotator);
        }
        if (this.Cce >= this.Ql + this.c_e) {
          this.Sce();
        }
        this.Cce += t;
      }
    }
  }
  Mce(t, i, s, h, a, r, e, o, l) {
    this.dce = true;
    if (this.Camera.IsInNormalGravityMode()) {
      this.StartRotator.FromUeRotator(this.Camera.CurrentCamera.ArmRotation);
    } else {
      CameraUtility_1.CameraUtility.GetRotatorInGravity(this.Camera.CurrentCamera.ArmRotation, this.StartRotator);
    }
    var _ = Vector_1.Vector.Create();
    i.Subtraction(t, _);
    _.Rotation(this.DesRotator);
    if (!this.Camera.IsInNormalGravityMode()) {
      CameraUtility_1.CameraUtility.GetRotatorInGravity(this.DesRotator, this.DesRotator);
    }
    this.Ql = h;
    this.c_e = a;
    this.Cce = 0;
    this.Alpha = 0;
    this.fce = r;
    this.pce = e;
    this.nQ_ = o;
    this.HDe = l;
    MathUtils_1.MathUtils.ComposeRotator(this.DesRotator, s, this.DesRotator);
    this.sQ_();
  }
  BeginCameraSustainingRotator(t, i, s, h, a, r, e) {
    this.dce = true;
    this.Scm = true;
    if (this.Camera.IsInNormalGravityMode()) {
      this.StartRotator.FromUeRotator(this.Camera.CurrentCamera.ArmRotation);
    } else {
      CameraUtility_1.CameraUtility.GetRotatorInGravity(this.Camera.CurrentCamera.ArmRotation, this.StartRotator);
    }
    this.vcm.DeepCopy(t);
    this.Ql = i;
    this.c_e = s;
    this.Cce = 0;
    this.Alpha = 0;
    this.fce = h;
    this.pce = a;
    this.nQ_ = r;
    this.HDe = e;
    this.sQ_();
  }
  Ece(t, i, s, h, a, r) {
    this.dce = true;
    if (this.Camera.IsInNormalGravityMode()) {
      this.StartRotator.FromUeRotator(this.Camera.CurrentCamera.ArmRotation);
      this.DesRotator.Set(t.Pitch, t.Yaw, t.Roll);
    } else {
      CameraUtility_1.CameraUtility.GetRotatorInGravity(this.Camera.CurrentCamera.ArmRotation, this.StartRotator);
      CameraUtility_1.CameraUtility.GetRotatorInGravity(t, this.DesRotator);
    }
    this.Ql = i;
    this.c_e = s;
    this.Cce = 0;
    this.Alpha = 0;
    this.fce = h;
    this.pce = a;
    this.nQ_ = r;
    this.sQ_();
  }
  Sce() {
    this.dce = false;
    this.Scm = false;
    this.vce = undefined;
    this.Camera.CameraInputController.Unlock(this);
    this.Camera.CameraRotationZone.Unlock(this);
    this.HDe?.();
    this.HDe = undefined;
  }
  sQ_() {
    if (this.nQ_) {
      this.Camera.CameraInputController.Unlock(this);
    } else {
      this.Camera.CameraInputController.Lock(this);
    }
    this.Camera.CameraRotationZone.Lock(this);
  }
  UpdateInternal(t) {
    this.nce(t);
  }
}
exports.CameraRotatorController = CameraRotatorController;
//# sourceMappingURL=CameraRotatorController.js.map