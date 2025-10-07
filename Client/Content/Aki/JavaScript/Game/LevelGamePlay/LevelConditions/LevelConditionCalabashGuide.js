"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnVisionIntensifyViewShow = exports.LevelConditionCheckCalabashChildFunctionOpen = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCalabashChildFunctionOpen extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    const a = e.LimitParams?.get("ChildViewName");
    return !!a && !!ModelManager_1.ModelManager.CalabashModel.GetViewTabList().some(e => e.ChildViewName === a) && !!(e = UiManager_1.UiManager.GetViewByName("VisionIntensifyView")) && (e = e.GetCurrentUniqueId(), ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e)?.GetVisionIfCanRefine() ?? false);
  }
}
exports.LevelConditionCheckCalabashChildFunctionOpen = LevelConditionCheckCalabashChildFunctionOpen;
class LevelConditionOnVisionIntensifyViewShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...a) {
    var [a] = a;
    return a;
  }
}
exports.LevelConditionOnVisionIntensifyViewShow = LevelConditionOnVisionIntensifyViewShow;
//# sourceMappingURL=LevelConditionCalabashGuide.js.map