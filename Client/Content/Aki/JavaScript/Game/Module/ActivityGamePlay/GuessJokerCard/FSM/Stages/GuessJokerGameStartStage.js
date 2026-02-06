"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerGameStartStage = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerStageBase_1 = require("../GuessJokerStageBase");
class GuessJokerGameStartStage extends GuessJokerStageBase_1.GuessJokerStageBase {
  OnEnter() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelId();
    var e = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerLevelById(e);
    if (e &&= ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByRoleId(e.AiRole)) {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShowOnlyGuessJokerNpc(e.NpcId);
    }
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.OpenGamePlayView(() => {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.ChangeState(2);
    });
  }
}
exports.GuessJokerGameStartStage = GuessJokerGameStartStage;
//# sourceMappingURL=GuessJokerGameStartStage.js.map