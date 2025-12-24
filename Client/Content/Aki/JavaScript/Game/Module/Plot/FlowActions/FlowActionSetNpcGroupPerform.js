"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionSetNpcGroupPerform = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetNpcGroupPerform extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (!e || !e.PerformType) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 45, "FlowActionSetNpcGroupPerform");
      }
    }
    var o = e.PerformType.Key;
    var r = new UE.FName(o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "FlowActionSetNpcGroupPerform", ["key", o], ["keyName", r]);
    }
    let t = undefined;
    if (t = e.PerformType.Type === 0 ? ModelManager_1.ModelManager.HoldingHandsModel.GetRelation(o) : t) {
      ModelManager_1.ModelManager.SequenceModel.NpcGroupPerform.push(r);
      ModelManager_1.ModelManager.SequenceModel.NpcRelationMap.set(r, t);
    }
    this.FinishExecute(true);
  }
  OnInterruptExecute() {
    this.OnExecute();
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionSetNpcGroupPerform = FlowActionSetNpcGroupPerform;
//# sourceMappingURL=FlowActionSetNpcGroupPerform.js.map