"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadConfig = undefined;
const PsFeedbackById_1 = require("../../../Core/Define/ConfigQuery/PsFeedbackById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class GamepadConfig extends ConfigBase_1.ConfigBase {
  GetPsFeedbackReason(e) {
    return PsFeedbackById_1.configPsFeedbackById.GetConfig(e);
  }
}
exports.GamepadConfig = GamepadConfig;
//# sourceMappingURL=GamepadConfig.js.map