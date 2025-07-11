"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneItemMovementComponent = undefined;
const UnionMovementModeHelper_1 = require("./UnionMovementModeHelper");
class FbSceneItemMovementComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.qRh = false;
    this.kRh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSceneItemMovementComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Patrol() {
    var e;
    var t;
    if (!this.qRh && (this.qRh = true, e = this.FbDataInternal.patrolType(), t = UnionMovementModeHelper_1.UnionMovementModeHelper.GetUnionMovementModeObject(e))) {
      this.kRh = UnionMovementModeHelper_1.UnionMovementModeHelper.ReadUnionMovementMode(e, this.FbDataInternal.patrol(t));
    }
    return this.kRh;
  }
}
exports.FbSceneItemMovementComponent = FbSceneItemMovementComponent;
//# sourceMappingURL=FbSceneItemMovementComponent.js.map