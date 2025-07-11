"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionAccountSettingOpen = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionAccountSettingOpen extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return !!e.LimitParams && (e = Number(e.LimitParams.get("Id"))) !== undefined && ControllerHolder_1.ControllerHolder.ChannelController.CheckAccountSettingOpen(e);
  }
}
exports.LevelConditionAccountSettingOpen = LevelConditionAccountSettingOpen;
//# sourceMappingURL=LevelConditionAccountSettingOpen.js.map