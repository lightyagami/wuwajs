"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryComponentBase = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HotKeyComponent_1 = require("../HotKeyComponent");
class HonamiStoryComponentBase extends HotKeyComponent_1.HotKeyComponent {
  get Logic() {
    return ModelManager_1.ModelManager.HonamiStoryModel.GetGamepadLogic();
  }
}
exports.HonamiStoryComponentBase = HonamiStoryComponentBase;
//# sourceMappingURL=HonamiStoryComponentBase.js.map