"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneBattleInteractController = undefined;
const Time_1 = require("../../../Core/Common/Time");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class SceneBattleInteractController extends ControllerBase_1.ControllerBase {
  static OnTick(e) {
    if (ModelManager_1.ModelManager.SceneBattleInteractModel.Open) {
      for (const r of ModelManager_1.ModelManager.SceneBattleInteractModel.EffectMap.values()) {
        r.OnTick(e * Time_1.Time.TimeDilation);
      }
    }
  }
}
exports.SceneBattleInteractController = SceneBattleInteractController;
//# sourceMappingURL=SceneBattleInteractController.js.map