"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkWeaponModelHandle = undefined;
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
class DreamLinkWeaponModelHandle {
  constructor(t) {
    this.Actor = t;
    this.nBr = 0;
    this.Rxe = false;
    this.hwe = undefined;
    this.sBr = undefined;
    this.aBr = false;
    this.hwe = Rotator_1.Rotator.Create();
  }
  SetRotateParam(t, i = 1, s = true) {
    this.nBr = t !== 0 ? MathCommon_1.MathCommon.RoundAngle / t : 0;
    this.sBr = i;
    this.aBr = s;
  }
  StartRotate() {
    this.Rxe = true;
  }
  StopRotate() {
    this.Rxe = false;
  }
  Tick(t) {
    this.OnRotate(t);
  }
  OnRotate(t) {
    var i;
    if (!!this.Rxe && !(this.nBr <= 0)) {
      if (this.Actor) {
        i = this.aBr ? 1 : -1;
        t = this.nBr * t * i;
        if (this.sBr === 0) {
          this.hwe.Pitch = t;
        } else if (this.sBr === 1) {
          this.hwe.Yaw = t;
        } else if (this.sBr === 2) {
          this.hwe.Roll = t;
        }
        this.Actor.K2_AddActorLocalRotation(this.hwe.ToUeRotator(), false, undefined, false);
      }
    }
  }
  Destroy() {
    this.Actor = undefined;
  }
}
exports.DreamLinkWeaponModelHandle = DreamLinkWeaponModelHandle;
//# sourceMappingURL=DreamLinkWeaponModelHandle.js.map