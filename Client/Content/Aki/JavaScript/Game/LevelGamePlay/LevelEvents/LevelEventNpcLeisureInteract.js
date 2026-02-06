"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventNpcLeisureInteract = undefined;
const Log_1 = require("../../../Core/Common/Log");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventNpcLeisureInteract extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, a) {
    var t = e;
    if (t) {
      switch (t.Option.Type) {
        case IAction_1.ENpcLeisureInteract.SitDown:
          break;
        case IAction_1.ENpcLeisureInteract.SwingGetUp:
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.Option.TargetNpcId)?.Entity?.GetComponent(327)?.ExitLoopSwing();
          break;
        case IAction_1.ENpcLeisureInteract.Swing:
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t.Option.TargetNpcId)?.Entity?.GetComponent(327)?.StartSwing(t.Option.SwingDa, t.Option.EntityId, t.Option.SkipSitDown);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 42, " LevelEventNpcLeisureInteract, 坐下参数为空");
    }
  }
}
exports.LevelEventNpcLeisureInteract = LevelEventNpcLeisureInteract;
//# sourceMappingURL=LevelEventNpcLeisureInteract.js.map