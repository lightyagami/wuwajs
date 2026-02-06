"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerGameExitStage = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerStageBase_1 = require("../GuessJokerStageBase");
class GuessJokerGameExitStage extends GuessJokerStageBase_1.GuessJokerStageBase {
  OnEnter() {
    ModelManager_1.ModelManager.GuessJokerGamePlayModel.CloseGamePlayViewAsync().then(() => {}).catch(e => {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, "GuessJoker关闭游戏界面失败", ["error", e]);
      }
    });
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelId();
    var r = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetRoleId();
    var r = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByRoleId(r)?.NpcId;
    var a = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetGuessJokerGameData(e).FirstPass;
    if (!ModelManager_1.ModelManager.GuessJokerGamePlayModel.IsFinish && a) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSpringManorGameplayFinish, 1, e);
    }
    if (r) {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShowOnlyGuessJokerNpc(r);
    }
  }
}
exports.GuessJokerGameExitStage = GuessJokerGameExitStage;
//# sourceMappingURL=GuessJokerGameExitStage.js.map