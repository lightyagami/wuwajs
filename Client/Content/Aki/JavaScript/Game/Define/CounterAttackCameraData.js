"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class CounterAttackCameraData extends UE.KuroBpDataAsset {
  constructor() {
    super(...arguments);
    this.CameraData = undefined;
    this.AttackerTimeScale = undefined;
    this.VictimTimeScale = undefined;
    this.CameraShake = undefined;
  }
  Constructor() {}
}
exports.default = CounterAttackCameraData;
//# sourceMappingURL=CounterAttackCameraData.js.map