"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeTeamPosition = undefined;
class FbChangeTeamPosition {
  constructor(t) {
    this.FbDataInternal = t;
    this._0h = false;
    this.c0h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbChangeTeamPosition(t);
    }
  }
  get PositionId() {
    if (!this._0h) {
      this._0h = true;
      this.c0h = this.FbDataInternal.positionId();
    }
    return this.c0h;
  }
}
exports.FbChangeTeamPosition = FbChangeTeamPosition;
//# sourceMappingURL=FbChangeTeamPosition.js.map