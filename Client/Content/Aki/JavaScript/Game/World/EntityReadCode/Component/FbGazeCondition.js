"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGazeCondition = undefined;
const FbConeTriggerShape_1 = require("../Shape/FbConeTriggerShape");
class FbGazeCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.wGh = false;
    this.PGh = 0;
    this.UGh = false;
    this.DGh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGazeCondition(t);
    }
  }
  get GazeInDistance() {
    if (!this.wGh) {
      this.wGh = true;
      this.PGh = this.FbDataInternal.gazeInDistance();
    }
    return this.PGh;
  }
  get ScanRange() {
    if (!this.UGh) {
      this.UGh = true;
      this.DGh = FbConeTriggerShape_1.FbConeTriggerShape.Create(this.FbDataInternal.scanRange());
    }
    return this.DGh;
  }
}
exports.FbGazeCondition = FbGazeCondition;
//# sourceMappingURL=FbGazeCondition.js.map