"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialGameplayCamera = undefined;
const AiShengGuYangCamera_1 = require("./AiShengGuYangCamera");
const PilotThrowCamera_1 = require("./PilotThrowCamera");
class SpecialGameplayCamera {}
(exports.SpecialGameplayCamera = SpecialGameplayCamera).GameplayMap = new Map([[0, () => new AiShengGuYangCamera_1.AiShengGuYangCamera()], [1, () => new PilotThrowCamera_1.PilotThrowCamera()]]);
//# sourceMappingURL=ISpecialGameplayCamera.js.map