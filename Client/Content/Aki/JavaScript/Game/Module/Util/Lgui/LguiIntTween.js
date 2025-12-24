"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LguiIntTween = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../../GlobalData");
const LguiTweenBase_1 = require("./LguiTweenBase");
class LguiIntTween extends LguiTweenBase_1.LguiTweenBase {
  CreateTween(e, t, a) {
    return UE.LTweenBPLibrary.IntTo(GlobalData_1.GlobalData.World, this.Delegate, e, t, a);
  }
}
exports.LguiIntTween = LguiIntTween;
//# sourceMappingURL=LguiIntTween.js.map