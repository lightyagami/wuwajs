"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToGachaView = undefined;
const FunctionController_1 = require("../../Functional/FunctionController");
const SkipToMoonChasingBase_1 = require("./SkipToMoonChasingBase");
class SkipToGachaView extends SkipToMoonChasingBase_1.SkipToMoonChasingBase {
  OnRun() {
    FunctionController_1.FunctionController.OpenFunctionRelateView(10009);
  }
}
exports.SkipToGachaView = SkipToGachaView;
//# sourceMappingURL=SkipToGachaView.js.map