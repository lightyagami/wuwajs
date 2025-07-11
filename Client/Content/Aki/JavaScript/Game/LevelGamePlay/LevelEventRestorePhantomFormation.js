"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventRestorePhantomFormation = undefined;
const Log_1 = require("../../Core/Common/Log");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const LevelGeneralBase_1 = require("./LevelGeneralBase");
class LevelEventRestorePhantomFormation extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.dLe = () => {
      var e = !ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 48, "[RestorePhantomFormation] 队伍更新完成", ["isRole", e]);
      }
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
      this.FinishExecute(e);
    };
  }
  ExecuteInGm(e, t, o) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, t, o) {
    if (!e) {
      this.FinishExecute(false);
    }
    e = ModelManager_1.ModelManager.SceneTeamModel;
    if (!e.IsPhantomTeam && e.IsTeamReady) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 48, "[RestorePhantomFormation] 当前已是角色队伍");
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 48, "[RestorePhantomFormation] 开始等待队伍更新");
      }
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
    }
  }
}
exports.LevelEventRestorePhantomFormation = LevelEventRestorePhantomFormation;
//# sourceMappingURL=LevelEventRestorePhantomFormation.js.map