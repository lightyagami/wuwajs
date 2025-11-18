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
    this.jwu = undefined;
    this.dea = undefined;
    this.Cea = new Array();
    this.gea = () => {
      if (Global_1.Global.BaseCharacter?.IsValid()) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.dea);
        this.dea = undefined;
        for (var [e, t] of this.Cea) {
          this.ExecuteNew(e, t);
        }
        this.Cea.length = 0;
      }
    };
  }
  ExecuteNew(i, n) {
    if (i) {
      this.jwu = i;
      var s;
      var o = this.jwu.Config;
      if (n instanceof LevelGeneralContextDefine_1.TriggerContext && (r = n.TriggerEntityId ? EntitySystem_1.EntitySystem.Get(n.TriggerEntityId) : undefined, s = n.OtherEntityId ? EntitySystem_1.EntitySystem.Get(n.OtherEntityId) : undefined, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("LevelEvent", 39, "EnableSplineMoveModel: Trigger触发", ["TargetType", o.Target.Type], ["SplineMoveType", o.Type], ["SplineEntityId", o.SplineEntityId], ["TriggerEntity", r?.GetComponent(0)?.GetPbDataId()], ["OtherEntity", s?.GetComponent(0)?.GetPbDataId()]);
      }
      let e = undefined;
      let t = false;
      switch (o.Target.Type) {
        case "Triggered":
          if (n instanceof LevelGeneralContextDefine_1.TriggerContext) {
            if ((e = EntitySystem_1.EntitySystem.Get(n.OtherEntityId))?.Valid) {
              break;
            }
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 6, "EnableSplineMoveModel: 未找到合法的触发者实体", ["Type", o.Target.Type], ["ContextType", n.Type]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 6, "EnableSplineMoveModel: Triggered类型必须对应TriggerContext", ["Type", o.Target.Type], ["ContextType", n.Type]);
          }
          this.FinishExecute(false);
          return;
        case "Player":
          if (!Global_1.Global.BaseCharacter?.IsValid()) {
            this.Cea.push([i, n]);
            this.dea ||= TimerSystem_1.GameplayTimerSystem.Forever(this.gea, CHECK_BASE_CHARACTER_INTERVAL);
            return;
          }
          e = Global_1.Global.BaseCharacter.GetEntityNoBlueprint();
          t = o.Target.PlayerTargetType === 1;
          break;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 6, "EnableSplineMoveModel不接受此对象类型", ["Type", o.Target.Type]);
          }
          this.FinishExecute(false);
          return;
      }
      var r = e?.GetComponent(110);
      if (r?.Valid) {
        if (o.Type === "Open") {
          r.StartSplineMove(o.SplineEntityId, o.Pattern, t);
        } else {
          r.EndSplineMove(o.SplineEntityId);
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
    this.jwu = undefined;
  }
  OnUpdateGuarantee() {
    if (this.jwu) {
      var e = {
        Name: "DisableSplineMoveModel",
        Params: {
          Config: {
            Type: "Close",
            Target: this.jwu.Config.Target,
            SplineEntityId: this.jwu.Config.SplineEntityId
          }
        }
      };
      switch (this.jwu.Config.Type) {
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