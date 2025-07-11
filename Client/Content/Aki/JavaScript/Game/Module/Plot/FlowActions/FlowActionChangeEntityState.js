"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionChangeEntityState = undefined;
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeEntityState extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    let a = undefined;
    let o = [];
    switch (e.Type) {
      case IAction_1.EChangeEntityState.Directly:
        a = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.State);
        o = [e.EntityId];
        break;
      case IAction_1.EChangeEntityState.BatchDirectly:
        a = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.State);
        o = e.EntityIds;
        break;
      case IAction_1.EChangeEntityState.Loop:
        ControllerHolder_1.ControllerHolder.FlowController.LogError("不支持的切换实体状态");
    }
    if (a !== undefined) {
      WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId("FlowActionChangeEntityState.OnExecute", o, e => {
        for (const t of o) {
          if (ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.IsInit) {
            LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(t, a, "ShowInPlotSequence");
          }
        }
        this.FinishExecute(true);
      });
    } else {
      this.FinishExecute(true);
    }
  }
}
exports.FlowActionChangeEntityState = FlowActionChangeEntityState;
//# sourceMappingURL=FlowActionChangeEntityState.js.map