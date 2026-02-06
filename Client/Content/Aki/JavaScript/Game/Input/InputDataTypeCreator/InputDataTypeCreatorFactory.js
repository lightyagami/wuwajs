"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputDataTypeCreatorFactory = undefined;
const NormalWorldInputDataTypeCreator_1 = require("./NormalWorldInputDataTypeCreator");
const SpringManorInputDataTypeCreator_1 = require("./SpringManorInputDataTypeCreator");
const SurvivorsRogueInputDataTypeCreator_1 = require("./SurvivorsRogueInputDataTypeCreator");
const TrapDefenseInputDataTypeCreator_1 = require("./TrapDefenseInputDataTypeCreator");
class InputDataTypeCreatorFactory {
  static Initialize() {
    this.WZm.set(37, new TrapDefenseInputDataTypeCreator_1.TrapDefenseInputDataTypeCreator());
    this.WZm.set(41, new SurvivorsRogueInputDataTypeCreator_1.SurvivorsRogueInputDataTypeCreator());
    this.R0g.set(2, new SpringManorInputDataTypeCreator_1.SpringManorInputDataTypeCreator());
  }
  static GetInputDataCreator(t, r) {
    let a = undefined;
    return (a = t === 12 ? this.R0g.get(r) : this.WZm.get(t)) || this.QZm;
  }
}
(exports.InputDataTypeCreatorFactory = InputDataTypeCreatorFactory).WZm = new Map();
InputDataTypeCreatorFactory.R0g = new Map();
InputDataTypeCreatorFactory.QZm = new NormalWorldInputDataTypeCreator_1.NormalWorldInputDataTypeCreator(); //# sourceMappingURL=InputDataTypeCreatorFactory.js.map