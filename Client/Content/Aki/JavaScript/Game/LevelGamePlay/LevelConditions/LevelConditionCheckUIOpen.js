"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckUIOpen = undefined;
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckUIOpen extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    e = e.LimitParams.get("UIName");
    return !!e && UiManager_1.UiManager.IsViewOpen(e);
  }
}
exports.LevelConditionCheckUIOpen = LevelConditionCheckUIOpen;
//# sourceMappingURL=LevelConditionCheckUIOpen.js.map