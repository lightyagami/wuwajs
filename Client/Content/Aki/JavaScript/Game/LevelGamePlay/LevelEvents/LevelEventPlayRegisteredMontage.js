"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPlayRegisteredMontage = undefined;
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const KEY = "LevelEventPlayRegisteredMontage";
class LevelEventPlayRegisteredMontage extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.gLe = undefined;
    this.sDe = undefined;
    this.zpe = (e, t) => {
      if (this.sDe === t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 26, "实体被移除，PlayRegisteredMontaged保底结束", ["PbDataId", t.PbDataId]);
        }
        if (EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
        }
        this.FinishExecute(true);
      }
    };
    this.ej_ = () => {
      if (EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
      this.sDe?.Entity?.GetComponent(187)?.ResumeAi(KEY);
      this.FinishExecute(true);
    };
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, t) {
    this.gLe = e;
    this.CreateWaitEntityTask(e.EntityId);
  }
  ExecuteWhenEntitiesReady() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.gLe.EntityId);
    if (t) {
      if ((this.sDe = t).Entity.GetComponent(47)?.IsAiDriver && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 26, "NpcAi与行为并行，将停止Ai，注意表现", ["PbDataId", t.PbDataId]);
      }
      let e = undefined;
      var i = (e = this.gLe.IsAbpMontage ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(this.gLe.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(this.gLe.MontageId))?.ActionMontage;
      if (StringUtils_1.StringUtils.IsEmpty(i)) {
        this.FinishExecute(true);
      } else {
        var s = t.Entity?.GetComponent(46);
        if (s) {
          var n = {
            InitStateName: e?.InitState,
            EndStateName: e?.EndState
          };
          const v = t.Entity?.GetComponent(187);
          v?.PauseAi(KEY);
          if (this.IsAsync) {
            s.VolatileMontagePlayByLoad(2, i, n, undefined, () => {
              v?.ResumeAi(KEY);
            }, this.gLe?.LoopDuration, this.gLe?.RepeatTimes, this.gLe?.KeepMontageAfterFlow);
            this.FinishExecute(true);
          } else {
            EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.zpe);
            s.VolatileMontagePlayByLoad(2, i, n, undefined, this.ej_, this.gLe?.LoopDuration, this.gLe?.RepeatTimes, this.gLe?.KeepMontageAfterFlow);
          }
        } else {
          this.FinishExecute(true);
        }
      }
    } else {
      this.FinishExecute(true);
    }
  }
  OnReset() {
    this.gLe = undefined;
    this.sDe = undefined;
  }
}
exports.LevelEventPlayRegisteredMontage = LevelEventPlayRegisteredMontage;
//# sourceMappingURL=LevelEventPlayRegisteredMontage.js.map