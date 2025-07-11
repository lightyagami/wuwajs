"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEnableSplineMoveModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const CHECK_BASE_CHARACTER_INTERVAL = 500;
class LevelEventEnableSplineMoveModel extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.Wwu = undefined;
    this.dea = undefined;
    this.Cea = new Array();
    this.gea = () => {
      if (Global_1.Global.BaseCharacter?.IsValid()) {
        TimerSystem_1.TimerSystem.Remove(this.dea);
        this.dea = undefined;
        for (var [e, t] of this.Cea) {
          this.ExecuteNew(e, t);
        }
        this.Cea.length = 0;
      }
    };
  }
  ExecuteNew(t, i) {
    if (t) {
      this.Wwu = t;
      var n;
      var s = this.Wwu.Config;
      if (i instanceof LevelGeneralContextDefine_1.TriggerContext && (o = i.TriggerEntityId ? EntitySystem_1.EntitySystem.Get(i.TriggerEntityId) : undefined, n = i.OtherEntityId ? EntitySystem_1.EntitySystem.Get(i.OtherEntityId) : undefined, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("LevelEvent", 39, "EnableSplineMoveModel: Trigger触发", ["TargetType", s.Target.Type], ["SplineMoveType", s.Type], ["SplineEntityId", s.SplineEntityId], ["TriggerEntity", o?.GetComponent(0)?.GetPbDataId()], ["OtherEntity", n?.GetComponent(0)?.GetPbDataId()]);
      }
      let e = undefined;
      switch (s.Target.Type) {
        case "Triggered":
          if (i instanceof LevelGeneralContextDefine_1.TriggerContext) {
            if ((e = EntitySystem_1.EntitySystem.Get(i.OtherEntityId))?.Valid) {
              break;
            }
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 6, "EnableSplineMoveModel: 未找到合法的触发者实体", ["Type", s.Target.Type], ["ContextType", i.Type]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 6, "EnableSplineMoveModel: Triggered类型必须对应TriggerContext", ["Type", s.Target.Type], ["ContextType", i.Type]);
          }
          this.FinishExecute(false);
          return;
        case "Player":
          if (!Global_1.Global.BaseCharacter?.IsValid()) {
            this.Cea.push([t, i]);
            this.dea ||= TimerSystem_1.TimerSystem.Forever(this.gea, CHECK_BASE_CHARACTER_INTERVAL);
            return;
          }
          e = Global_1.Global.BaseCharacter.GetEntityNoBlueprint();
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 6, "EnableSplineMoveModel不接受此对象类型", ["Type", s.Target.Type]);
          }
          this.FinishExecute(false);
          return;
      }
      var o = e?.GetComponent(107);
      if (o?.Valid) {
        if (s.Type === "Open") {
          o.StartSplineMove(s.SplineEntityId, s.Pattern);
        } else {
          o.EndSplineMove(s.SplineEntityId);
        }
        this.FinishExecute(true);
      } else {
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  OnReset() {
    this.Wwu = undefined;
  }
  OnUpdateGuarantee() {
    if (this.Wwu) {
      var e = {
        Name: "DisableSplineMoveModel",
        Params: {
          Config: {
            Type: "Close",
            Target: this.Wwu.Config.Target,
            SplineEntityId: this.Wwu.Config.SplineEntityId
          }
        }
      };
      switch (this.Wwu.Config.Type) {
        case "Open":
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, this.Type, this.BaseContext, e, true);
          break;
        case "Close":
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemGuaranteeAction, this.Type, this.BaseContext, e, true);
      }
    }
  }
}
exports.LevelEventEnableSplineMoveModel = LevelEventEnableSplineMoveModel;
//# sourceMappingURL=LevelEventEnableSplineMoveModel.js.map