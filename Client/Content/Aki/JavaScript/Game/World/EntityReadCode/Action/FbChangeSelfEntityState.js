"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeSelfEntityState = undefined;
class FbChangeSelfEntityState {
  constructor(t) {
    this.FbDataInternal = t;
    this._vh = false;
    this.cvh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeSelfEntityState(t);
    }
  }
  get EntityState() {
    if (!this._vh) {
      this._vh = true;
      this.cvh = this.FbDataInternal.entityState();
    }
    return this.cvh;
  }
}
exports.FbChangeSelfEntityState = FbChangeSelfEntityState;
//# sourceMappingURL=FbChangeSelfEntityState.js.map