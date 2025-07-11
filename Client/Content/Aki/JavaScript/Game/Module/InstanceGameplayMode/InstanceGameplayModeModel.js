"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceGameplayModeModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class InstanceGameplayModeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.DefaultCameraMode = 0;
    this.DisabledCreatureSet = new Set();
  }
  OnClear() {
    this.qFt();
    return true;
  }
  OnLeaveLevel() {
    this.qFt();
    return true;
  }
  OnChangeMode() {
    this.qFt();
    return true;
  }
  qFt() {
    this.DisabledCreatureSet.clear();
  }
}
exports.InstanceGameplayModeModel = InstanceGameplayModeModel;
//# sourceMappingURL=InstanceGameplayModeModel.js.map