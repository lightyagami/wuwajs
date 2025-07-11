"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFloorSettings = undefined;
const FbVector2_1 = require("../Var/FbVector2");
class FbFloorSettings {
  constructor(t) {
    this.FbDataInternal = t;
    this.Q0h = false;
    this.K0h = undefined;
    this.$0h = false;
    this.X0h = undefined;
    this.Rph = false;
    this.wph = undefined;
    this.Y0h = false;
    this.z0h = 0;
    this.J0h = false;
    this.Z0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFloorSettings(t);
    }
  }
  get MeshPath() {
    if (!this.Q0h) {
      this.Q0h = true;
      this.K0h = this.FbDataInternal.meshPath();
    }
    return this.K0h;
  }
  get MaterialPath() {
    if (!this.$0h) {
      this.$0h = true;
      this.X0h = this.FbDataInternal.materialPath();
    }
    return this.X0h;
  }
  get Scale() {
    if (!this.Rph) {
      this.Rph = true;
      this.wph = FbVector2_1.FbVector2.Create(this.FbDataInternal.scale());
    }
    return this.wph;
  }
  get ShowTime() {
    if (!this.Y0h) {
      this.Y0h = true;
      this.z0h = this.FbDataInternal.showTime();
    }
    return this.z0h;
  }
  get DisappearTime() {
    if (!this.J0h) {
      this.J0h = true;
      this.Z0h = this.FbDataInternal.disappearTime();
    }
    return this.Z0h;
  }
}
exports.FbFloorSettings = FbFloorSettings;
//# sourceMappingURL=FbFloorSettings.js.map