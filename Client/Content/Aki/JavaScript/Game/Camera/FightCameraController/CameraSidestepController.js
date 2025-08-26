"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraSidestepController = undefined;
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const CameraUtility_1 = require("../CameraUtility");
const FightCameraLogicComponent_1 = require("../FightCameraLogicComponent");
const CameraControllerBase_1 = require("./CameraControllerBase");
class CameraSidestepController extends CameraControllerBase_1.CameraControllerBase {
  constructor() {
    super(...arguments);
    this.YawInterpSpeed = 0;
    this.PitchInterpSpeed = 0;
    this.PitchAccelerate = 0;
    this.yce = 0;
    this.PitchOffset = 0;
    this.MaxYawSpeed = 0;
    this.MaxPitch = 0;
    this.MinPitch = 0;
    this.MoveDurationThreshold = 1;
    this.Tce = 0;
    this.Lce = -0;
    this.InputRecoverArmLengthMin = 0;
    this.InputRecoverArmLengthMax = 0;
    this.InputRecoverArmLengthSpeedMin = 0;
    this.InputRecoverArmLengthSpeedMax = 0;
    this.InputRecoverArmLengthLimit = 0;
    this.InputRecoverArmLengthCurve = undefined;
    this.Dce = Vector_1.Vector.Create();
    this.Rce = Vector_1.Vector.Create();
    this.y6l = Vector_1.Vector.Create();
    this.S6l = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.pme = Rotator_1.Rotator.Create();
    this.cz = Vector_1.Vector.Create();
  }
  Name() {
    return "SidestepController";
  }
  OnInit() {
    this.SetConfigMap(1, "YawInterpSpeed");
    this.SetConfigMap(2, "PitchInterpSpeed");
    this.SetConfigMap(7, "PitchAccelerate");
    this.SetConfigMap(5, "MaxPitch");
    this.SetConfigMap(4, "MinPitch");
    this.SetConfigMap(3, "PitchOffset");
    this.SetConfigMap(6, "MoveDurationThreshold");
    this.SetConfigMap(8, "MaxYawSpeed");
    this.SetConfigMap(9, "InputRecoverArmLengthMin");
    this.SetConfigMap(10, "InputRecoverArmLengthMax");
    this.SetConfigMap(11, "InputRecoverArmLengthSpeedMin");
    this.SetConfigMap(12, "InputRecoverArmLengthSpeedMax");
    this.SetConfigMap(13, "InputRecoverArmLengthLimit");
    this.SetCurveConfigMap(13, "InputRecoverArmLengthCurve");
  }
  UpdateInternal(t) {
    if (ModelManager_1.ModelManager.CameraModel.IsEnableSidestepCamera && this.Camera.Character) {
      this.Uce(t);
      if (!(this.Lce <= 0)) {
        this.Ace(t);
        this.Pce(t);
        this.xce(t);
      }
    }
  }
  Uce(t) {
    this.Camera.GetCameraTargetRotator(this.cie);
    CameraUtility_1.CameraUtility.GetRotatorInGravity(this.cie, this.cie);
    CameraUtility_1.CameraUtility.GetRotatorInGravity(this.Camera.CurrentCamera.ArmRotation, this.pme);
    var i = Rotator_1.Rotator.Create(0, this.cie.Yaw, 0);
    var h = Rotator_1.Rotator.Create(0, this.pme.Yaw, 0);
    i.Vector(this.Rce);
    h.Vector(this.Dce);
    if (this.Camera.IsModifiedArmRotationPitch || this.Camera.IsModifiedArmRotationYaw || this.Camera.IsModifiedArmLength || !this.IsCharacterMoving()) {
      this.Lce = 0;
      this.Tce = 0;
    } else {
      this.Lce += t;
      this.Tce = MathUtils_1.MathUtils.InterpTo(this.Tce, this.MaxYawSpeed, t, this.YawInterpSpeed);
    }
  }
  Ace(t) {
    var i;
    var t = this.Dce.SineAngle2D(this.Rce) * t * this.Tce;
    if (this.Camera.IsInNormalGravityMode()) {
      (i = this.Camera.DesiredCamera.ArmRotation).Yaw = (i.Yaw + t) % 360;
    } else {
      CameraUtility_1.CameraUtility.AddYawInGravity(this.Camera.DesiredCamera.ArmRotation, t, this.Camera.DesiredCamera.ArmRotation);
    }
    this.Camera.IsModifiedArmRotationYaw = true;
  }
  Pce(t) {
    var i;
    var h;
    var s;
    if (!(this.Lce < this.MoveDurationThreshold)) {
      if ((i = this.Camera.CharacterEntityHandle?.Entity?.GetComponent(178))?.Valid && (s = this.Camera.CharacterEntityHandle?.Entity?.GetComponent(179))?.Valid) {
        if (this.Camera.CharacterDriveVehicleComponent?.IsOnVehicle && this.Camera.VehicleAnimationComponent?.Valid) {
          this.y6l.FromUeVector(this.Camera.VehicleMoveComponent.GravityUp);
          this.S6l.FromUeVector(this.Camera.VehicleAnimationComponent.MovementNormal);
        } else {
          this.y6l.FromUeVector(s.GravityUp);
          this.S6l.FromUeVector(i.MovementTerrainNormal);
        }
        CameraUtility_1.CameraUtility.GetVectorInGravity(this.y6l, this.y6l);
        CameraUtility_1.CameraUtility.GetVectorInGravity(this.S6l, this.S6l);
        s = this.cz;
        this.y6l.CrossProduct(this.Dce, s);
        s.CrossProduct(this.S6l, s);
        i = this.Camera.CameraRotationInGravity.Pitch;
        s = MathUtils_1.MathUtils.Clamp(Math.atan2(s.Z, s.Size2D() + MathCommon_1.MathCommon.KindaSmallNumber) * MathCommon_1.MathCommon.RadToDeg - this.PitchOffset, this.MinPitch, this.MaxPitch) - i;
        h = Math.abs(s);
        s = this.PitchInterpSpeed * s;
        this.yce = MathUtils_1.MathUtils.InterpConstantTo(this.yce, s, t, this.PitchAccelerate);
        if (this.Camera.IsInNormalGravityMode()) {
          this.Camera.DesiredCamera.ArmRotation.Pitch = i + MathUtils_1.MathUtils.Clamp(this.yce * t, -h, h);
        } else {
          CameraUtility_1.CameraUtility.AddPitchInGravity(this.Camera.DesiredCamera.ArmRotation, MathUtils_1.MathUtils.Clamp(this.yce * t, -h, h), this.Camera.DesiredCamera.ArmRotation);
        }
        this.Camera.IsModifiedArmRotationPitch = true;
      }
    }
  }
  IsCharacterMoving() {
    var t;
    return !!this.Camera.Character && !this.Camera.ContainsTag(-1371021686) && !this.Camera.ContainsTag(1008164187) && (this.Camera.CharacterDriveVehicleComponent?.IsOnVehicle && this.Camera.VehicleMoveComponent?.Valid ? this.Camera.VehicleMoveComponent.Speed > FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD : !!(t = this.Camera.CharacterEntityHandle.Entity.GetComponent(179))?.Valid && t.Speed > FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD);
  }
  xce(i) {
    if (this.Camera.Character?.CharacterActorComponent.Entity.GetComponent(179)?.HasMoveInput || !this.Camera.CharacterDriveVehicleComponent?.IsOnVehicle || this.Camera.VehicleMoveComponent?.HasMoveInput) {
      let t = 0;
      var h;
      var s = this.Camera.GetArmLengthWithSettingAndZoom(this.Camera.CurrentCamera);
      var e = this.Camera.GetArmLengthWithSetting(this.Camera.CurrentCamera);
      var r = e - this.Camera.CurrentCamera.ArmLength;
      var r = this.InputRecoverArmLengthMin + r;
      var e = Math.max(e, this.InputRecoverArmLengthMax);
      if (s < r) {
        r = r - s;
        h = MathUtils_1.MathUtils.Lerp(this.InputRecoverArmLengthSpeedMin, this.InputRecoverArmLengthSpeedMax, this.InputRecoverArmLengthCurve.GetCurrentValue(r / this.InputRecoverArmLengthLimit));
        t = Math.min(h * i, r);
      } else if (e < s) {
        h = s - e;
        r = MathUtils_1.MathUtils.Lerp(this.InputRecoverArmLengthSpeedMin, this.InputRecoverArmLengthSpeedMax, this.InputRecoverArmLengthCurve.GetCurrentValue(h / this.InputRecoverArmLengthLimit));
        t = -Math.min(r * i, h);
      }
      var e = s + t;
      var r = s / this.Camera.DesiredCamera.ZoomModifier;
      this.Camera.DesiredCamera.ZoomModifier = e / r;
    }
  }
}
exports.CameraSidestepController = CameraSidestepController;
//# sourceMappingURL=CameraSidestepController.js.map