"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionNpcLeisureInteract = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionNpcLeisureInteract extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (e) {
      switch (e.Option.Type) {
        case IAction_1.ENpcLeisureInteract.SitDown:
          break;
        case IAction_1.ENpcLeisureInteract.SwingGetUp:
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.Option.TargetNpcId)?.Entity?.GetComponent(327)?.ExitLoopSwing();
          break;
        case IAction_1.ENpcLeisureInteract.Swing:
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.Option.TargetNpcId)?.Entity?.GetComponent(327)?.StartSwing(e.Option.SwingDa, e.Option.EntityId, e.Option.SkipSitDown);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 42, " LevelEventNpcLeisureInteract, 坐下参数为空");
    }
  }
}
exports.FlowActionNpcLeisureInteract = FlowActionNpcLeisureInteract;
//# sourceMappingURL=FlowActionNpcLeisureInteract.js.map