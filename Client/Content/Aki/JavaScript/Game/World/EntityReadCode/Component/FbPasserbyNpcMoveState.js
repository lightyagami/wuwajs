"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPasserbyNpcMoveState = undefined;
class FbPasserbyNpcMoveState {
  constructor(t) {
    this.FbDataInternal = t;
    this.Nuh = false;
    this.Vuh = undefined;
    this.p9h = false;
    this.v9h = undefined;
    this.YHh = false;
    this.zHh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPasserbyNpcMoveState(t);
    }
  }
  get MoveState() {
    if (!this.Nuh) {
      this.Nuh = true;
      this.Vuh = this.FbDataInternal.moveState();
    }
    return this.Vuh;
  }
  get CharPositionState() {
    if (!this.p9h) {
      this.p9h = true;
      this.v9h = this.FbDataInternal.charPositionState();
    }
    return this.v9h;
  }
  get MoveSpeed() {
    if (!this.YHh) {
      this.YHh = true;
      this.zHh = this.FbDataInternal.moveSpeed();
    }
    return this.zHh;
  }
}
exports.FbPasserbyNpcMoveState = FbPasserbyNpcMoveState;
//# sourceMappingURL=FbPasserbyNpcMoveState.js.map