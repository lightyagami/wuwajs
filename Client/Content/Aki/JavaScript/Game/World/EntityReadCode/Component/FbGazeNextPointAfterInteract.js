"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGazeNextPointAfterInteract = undefined;
const FbGazeCondition_1 = require("./FbGazeCondition");
const FbGazePerformance_1 = require("./FbGazePerformance");
class FbGazeNextPointAfterInteract {
  constructor(t) {
    this.FbDataInternal = t;
    this.LGh = false;
    this.AGh = undefined;
    this.xGh = false;
    this.RGh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGazeNextPointAfterInteract(t);
    }
  }
  get GazeCondition() {
    if (!this.LGh) {
      this.LGh = true;
      this.AGh = FbGazeCondition_1.FbGazeCondition.Create(this.FbDataInternal.gazeCondition());
    }
    return this.AGh;
  }
  get GazePerformance() {
    if (!this.xGh) {
      this.xGh = true;
      this.RGh = FbGazePerformance_1.FbGazePerformance.Create(this.FbDataInternal.gazePerformance());
    }
    return this.RGh;
  }
}
exports.FbGazeNextPointAfterInteract = FbGazeNextPointAfterInteract;
//# sourceMappingURL=FbGazeNextPointAfterInteract.js.map