"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventTrapDefenseChangeMiniMap = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTrapDefenseChangeMiniMap extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    ControllerHolder_1.ControllerHolder.TrapDefenseController.ChangeMap(e.MiniMapId);
    this.FinishExecute(true);
  }
}
exports.LevelEventTrapDefenseChangeMiniMap = LevelEventTrapDefenseChangeMiniMap;
//# sourceMappingURL=LevelEventTrapDefenseChangeMiniMap.js.map