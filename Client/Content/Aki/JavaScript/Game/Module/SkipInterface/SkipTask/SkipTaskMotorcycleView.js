"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskMotorcycleView = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const SkipTask_1 = require("./SkipTask");
class SkipTaskMotorcycleView extends SkipTask_1.SkipTask {
  OnRun() {
    ControllerHolder_1.ControllerHolder.FunctionController.OpenFunctionRelateView(10098);
  }
}
exports.SkipTaskMotorcycleView = SkipTaskMotorcycleView;
//# sourceMappingURL=SkipTaskMotorcycleView.js.map