"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckSystemFunction = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckSystemFunction extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, n) {
    var r = e.SystemId;
    var r = ModelManager_1.ModelManager.FunctionModel.IsOpen(r);
    if (e.Compare === "Eq") {
      return r;
    } else {
      return !r;
    }
  }
}
exports.LevelConditionCheckSystemFunction = LevelConditionCheckSystemFunction;
//# sourceMappingURL=LevelConditionCheckSystemFunction.js.map