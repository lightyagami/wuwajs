"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraHookController = undefined;
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const CameraControllerBase_1 = require("./CameraControllerBase");
class GazeParams {
  constructor(t, s = false) {
    this.LockCamera = false;
    this.FadeInTime = 0;
    this.FadeOutTime = 0;
    this.StayTime = 0;
    if (s) {
      this.LockCamera = t.GazeNextPointAfterInteract?.GazePerformance.LockCamera ?? false;
      this.FadeInTime = t.GazeNextPointAfterInteract?.GazePerformance.FadeInTime ?? 1;
      this.FadeOutTime = t.GazeNextPointAfterInteract?.GazePerformance.FadeOutTime || 1;
      this.StayTime = t.GazeNextPointAfterInteract?.GazePerformance.StayTime ?? 1;
    } else {
      this.LockCamera = t.CameraGaze?.LockCamera ?? false;
      this.FadeInTime = t.CameraGaze?.FadeInTime ?? 0;
      this.FadeOutTime = t.CameraGaze?.FadeOutTime;
      this.StayTime = t.CameraGaze?.StayTime ?? 0;
    }
  }
}
class CameraHookController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments);
    this.U_e = undefined;
    this.wpl = undefined;
    this.f_e = 0;
    this.H6 = 0;
    this.p_e = 0;
    this.A_e = Vector_1.Vector.Create();
    this.P_e = Vector_1.Vector.Create();
    this.x_e = Vector_1.Vector.Create();
    this.WI = false;
  }
  Name() {
    return "HookController";
  }
  ApplyCameraHook(t, s = undefined) {
    this.U_e = t;
    this.wpl = s ? new GazeParams(s, true) : new GazeParams(t);
    this.WI = true;
    this.w_e();
  }
  ExitCameraHook(t = true) {
    this.WI = false;
    if (this.f_e !== 0) {
      this.B_e(t);
    }
  }
  w_e() {
    this.f_e = 1;
    this.H6 = 0;
    this.p_e = 0;
    this.A_e.DeepCopy(this.Camera.CameraForward);
    if (this.wpl.LockCamera) {
      ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraInputController.Lock(this);
      ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraFocusController.Lock(this);
    }
  }
  UpdateCustomEnableCondition() {
    return this.WI;
  }
  UpdateInternal(t) {
    if (this.U_e.Valid) {
      this.H6 += t;
      if (this.Camera.IsModifiedArmRotationPitch || this.Camera.IsModifiedArmRotationYaw || this.Camera.IsModifiedArmLength) {
        this.B_e();
      }
      this.b_e();
      switch (this.f_e) {
        case 1:
          var s = this.wpl.FadeInTime > 0 ? this.H6 / this.wpl.FadeInTime : 1;
          var s = MathUtils_1.MathUtils.Clamp(s, 0, 1);
          this.q_e(s);
          if (this.H6 > this.wpl.FadeInTime) {
            this.f_e = 2;
          }
          break;
        case 2:
          this.G_e();
          if (this.wpl.StayTime >= 0 && this.H6 > this.wpl.FadeInTime + this.wpl.StayTime) {
            if (this.wpl.FadeOutTime === undefined) {
              this.f_e = 0;
              this.B_e();
            } else {
              this.f_e = 3;
              this.P_e.DeepCopy(this.Camera.CameraForward);
            }
          }
          break;
        case 3:
          this.p_e += t;
          s = this.wpl.FadeOutTime > 0 ? this.p_e / this.wpl.FadeOutTime : 1;
          s = MathUtils_1.MathUtils.Clamp(s, 0, 1);
          this.D_e(s);
          if (this.p_e > this.wpl.FadeOutTime) {
            this.f_e = 0;
            this.B_e();
          }
      }
    } else {
      this.ExitCameraHook();
    }
  }
  UpdateDeactivateInternal(t) {
    if (this.f_e === 3 && (this.p_e += t, t = this.wpl.FadeOutTime > 0 ? this.p_e / this.wpl.FadeOutTime : 1, t = MathUtils_1.MathUtils.Clamp(t, 0, 1), this.D_e(t), this.p_e > this.wpl.FadeOutTime)) {
      this.f_e = 0;
      this.B_e();
    }
  }
  q_e(t) {
    var s = Vector_1.Vector.Create();
    Vector_1.Vector.LerpSin(this.A_e, this.x_e, t, s);
    var t = s.ToUeVector().Rotation();
    this.Camera.DesiredCamera.ArmRotation.DeepCopy(t);
    this.Camera.IsModifiedArmRotationPitch = true;
    this.Camera.IsModifiedArmRotationYaw = true;
  }
  G_e() {
    var t = this.x_e.ToUeVector().Rotation();
    this.Camera.DesiredCamera.ArmRotation.DeepCopy(t);
    this.Camera.IsModifiedArmRotationPitch = true;
    this.Camera.IsModifiedArmRotationYaw = true;
  }
  D_e(t) {
    var s = Vector_1.Vector.Create();
    Vector_1.Vector.LerpSin(this.P_e, this.A_e, t, s);
    var t = s.ToUeVector().Rotation();
    this.Camera.DesiredCamera.ArmRotation.DeepCopy(t);
    this.Camera.IsModifiedArmRotationPitch = true;
    this.Camera.IsModifiedArmRotationYaw = true;
  }
  b_e() {
    var t = this.U_e.HookLocation;
    var s = this.Camera.PlayerLocation;
    t.Subtraction(s, this.x_e);
    this.x_e.Normalize();
    if (Math.abs(this.x_e.X) < MathUtils_1.MathUtils.SmallNumber && Math.abs(this.x_e.Y) < MathUtils_1.MathUtils.SmallNumber) {
      this.x_e = Vector_1.Vector.ZeroVectorProxy;
    }
  }
  B_e(t = true) {
    this.WI = false;
    if (this.f_e !== 1 && this.f_e !== 2 || !this.U_e?.Valid || this.wpl?.FadeOutTime === undefined) {
      ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraInputController.Unlock(this);
      ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraFocusController.Unlock(this);
    } else {
      this.f_e = 3;
      this.p_e = t ? 0 : this.wpl.FadeOutTime;
      this.P_e.DeepCopy(this.Camera.CameraForward);
    }
  }
}
exports.CameraHookController = CameraHookController;
//# sourceMappingURL=CameraHookController.js.map