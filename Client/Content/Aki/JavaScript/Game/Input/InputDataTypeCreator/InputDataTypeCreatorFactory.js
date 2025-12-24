"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputDataTypeCreatorFactory = undefined;
const NormalWorldInputDataTypeCreator_1 = require("./NormalWorldInputDataTypeCreator");
const SurvivorsRogueInputDataTypeCreator_1 = require("./SurvivorsRogueInputDataTypeCreator");
const TrapDefenseInputDataTypeCreator_1 = require("./TrapDefenseInputDataTypeCreator");
class InputDataTypeCreatorFactory {
  static Initialize() {
    this.lzm.set(37, new TrapDefenseInputDataTypeCreator_1.TrapDefenseInputDataTypeCreator());
    this.lzm.set(41, new SurvivorsRogueInputDataTypeCreator_1.SurvivorsRogueInputDataTypeCreator());
  }
  static GetInputDataCreator(t) {
    t = this.lzm.get(t);
    return t || this._zm;
  }
}
(exports.InputDataTypeCreatorFactory = InputDataTypeCreatorFactory).lzm = new Map();
InputDataTypeCreatorFactory._zm = new NormalWorldInputDataTypeCreator_1.NormalWorldInputDataTypeCreator(); //# sourceMappingURL=InputDataTypeCreatorFactory.js.map