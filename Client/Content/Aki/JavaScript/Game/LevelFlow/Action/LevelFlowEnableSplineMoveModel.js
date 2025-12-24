"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowEnableSplineMoveModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Global_1 = require("../../Global");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
const CHECK_BASE_CHARACTER_INTERVAL = 500;
class LevelFlowEnableSplineMoveModel extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.jwu = undefined;
    this.nx = undefined;
    this.dea = undefined;
    this.gea = () => {
      if (Global_1.Global.BaseCharacter?.IsValid()) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.dea);
        this.Execute();
      }
    };
  }
  Init(e, t) {
    this.jwu = e;
    this.nx = t;
    return this;
  }
  OnExecute() {
    var e;
    var t = this.jwu.Config;
    var i = this.nx;
    if (i instanceof LevelGeneralContextDefine_1.TriggerContext && (l = i.TriggerEntityId ? EntitySystem_1.EntitySystem.Get(i.TriggerEntityId) : undefined, e = i.OtherEntityId ? EntitySystem_1.EntitySystem.Get(i.OtherEntityId) : undefined, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("LevelEvent", 39, "EnableSplineMoveModel: Trigger触发", ["TargetType", t.Target.Type], ["SplineMoveType", t.Type], ["SplineEntityId", t.SplineEntityId], ["TriggerEntity", l?.GetComponent(0)?.GetPbDataId()], ["OtherEntity", e?.GetComponent(0)?.GetPbDataId()]);
    }
    let o = undefined;
    switch (t.Target.Type) {
      case "Triggered":
        if (i instanceof LevelGeneralContextDefine_1.TriggerContext) {
          if ((o = EntitySystem_1.EntitySystem.Get(i.OtherEntityId))?.Valid) {
            break;
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 6, "EnableSplineMoveModel: 未找到合法的触发者实体", ["Type", t.Target.Type], ["ContextType", i.Type]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 6, "EnableSplineMoveModel: Triggered类型必须对应TriggerContext", ["Type", t.Target.Type], ["ContextType", i.Type]);
        }
        this.FinishExecute(false);
        return;
      case "Player":
        if (!Global_1.Global.BaseCharacter?.IsValid()) {
          this.dea ||= TimerSystem_1.GameplayTimerSystem.Forever(this.gea, CHECK_BASE_CHARACTER_INTERVAL);
          return;
        }
        o = Global_1.Global.BaseCharacter.GetEntityNoBlueprint();
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 6, "EnableSplineMoveModel不接受此对象类型", ["Type", t.Target.Type]);
        }
        this.FinishExecute(false);
        return;
    }
    var l = o?.GetComponent(115);
    if (l?.Valid) {
      if (t.Type === "Open") {
        l.StartSplineMove(t.SplineEntityId, t.Pattern);
      } else {
        l.EndSplineMove(t.SplineEntityId);
      }
      this.FinishExecute(true);
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelFlowEnableSplineMoveModel = LevelFlowEnableSplineMoveModel;
//# sourceMappingURL=LevelFlowEnableSplineMoveModel.js.map