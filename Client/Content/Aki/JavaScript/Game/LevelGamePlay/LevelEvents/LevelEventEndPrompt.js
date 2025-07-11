"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEndPrompt = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEndPrompt extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (e) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.CancelPromptByPromptKey(e.Token);
    }
  }
}
exports.LevelEventEndPrompt = LevelEventEndPrompt;
//# sourceMappingURL=LevelEventEndPrompt.js.map