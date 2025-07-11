"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPasserbyNpcSpline = undefined;
const FbPasserbyNpcMoveState_1 = require("./FbPasserbyNpcMoveState");
class FbPasserbyNpcSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.kuh = false;
    this.Guh = 0;
    this.PQh = false;
    this.UQh = 0;
    this.Dfh = false;
    this.Bfh = false;
    this.Nuh = false;
    this.Vuh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPasserbyNpcSpline(t);
    }
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get SpawnWeight() {
    if (!this.PQh) {
      this.PQh = true;
      this.UQh = this.FbDataInternal.spawnWeight();
    }
    return this.UQh;
  }
  get IsLoop() {
    if (!this.Dfh) {
      this.Dfh = true;
      this.Bfh = this.FbDataInternal.isLoop();
    }
    return this.Bfh;
  }
  get MoveState() {
    if (!this.Nuh) {
      this.Nuh = true;
      this.Vuh = FbPasserbyNpcMoveState_1.FbPasserbyNpcMoveState.Create(this.FbDataInternal.moveState());
    }
    return this.Vuh;
  }
}
exports.FbPasserbyNpcSpline = FbPasserbyNpcSpline;
//# sourceMappingURL=FbPasserbyNpcSpline.js.map