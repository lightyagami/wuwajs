"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const AiStateMachineFactory_1 = require("./AiStateMachineFactory");
class AiStateMachineModel extends ModelBase_1.ModelBase {
  OnInit() {
    this.AiStateMachineFactory = new AiStateMachineFactory_1.AiStateMachineFactory();
    return true;
  }
}
exports.AiStateMachineModel = AiStateMachineModel;
//# sourceMappingURL=AiStateMachineModel.js.map