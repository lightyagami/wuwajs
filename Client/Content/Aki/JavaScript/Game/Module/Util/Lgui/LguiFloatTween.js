"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LguiFloatTween = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../../GlobalData");
const LguiTweenBase_1 = require("./LguiTweenBase");
class LguiFloatTween extends LguiTweenBase_1.LguiTweenBase {
  CreateTween(e, a, t) {
    return UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, e, a, t);
  }
}
exports.LguiFloatTween = LguiFloatTween;
//# sourceMappingURL=LguiFloatTween.js.map