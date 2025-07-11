"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleExitPathMove = undefined;
class FbVehicleExitPathMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbVehicleExitPathMove(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
}
exports.FbVehicleExitPathMove = FbVehicleExitPathMove;
//# sourceMappingURL=FbVehicleExitPathMove.js.map