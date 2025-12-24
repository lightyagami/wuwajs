"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalWorldInputDataTypeCreator = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDataTypeCreator_1 = require("./InputDataTypeCreator");
class NormalWorldInputDataTypeCreator extends InputDataTypeCreator_1.InputDataTypeCreator {
  GetInputDataType() {
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData?.IsDriving) {
      return 3;
    } else {
      return 0;
    }
  }
}
exports.NormalWorldInputDataTypeCreator = NormalWorldInputDataTypeCreator;
//# sourceMappingURL=NormalWorldInputDataTypeCreator.js.map