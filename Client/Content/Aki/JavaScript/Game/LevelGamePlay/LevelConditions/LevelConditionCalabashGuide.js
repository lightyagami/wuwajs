"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckCalabashChildFunctionOpen = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCalabashChildFunctionOpen extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    const n = e.LimitParams?.get("ChildViewName");
    return !!n && ModelManager_1.ModelManager.CalabashModel.GetViewTabList().some(e => e.ChildViewName === n);
  }
}
exports.LevelConditionCheckCalabashChildFunctionOpen = LevelConditionCheckCalabashChildFunctionOpen;
//# sourceMappingURL=LevelConditionCalabashGuide.js.map