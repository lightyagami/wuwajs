"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventClientPlayFlow = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const FlowController_1 = require("../../Module/Plot/Flow/FlowController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventClientPlayFlow extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.bIm = undefined;
    this.RIm = undefined;
    this.hWe = e => {
      if (this.bIm && this.RIm !== undefined) {
        if (e.FlowIncId === this.RIm && e.FlowListName === this.bIm.FlowListName && e.StateId === this.bIm.StateId && e.FlowId === this.bIm.FlowId) {
          EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
          this.FinishExecute(true);
        }
      } else {
        this.FinishExecute(true);
      }
    };
  }
  ExecuteNew(e, t) {
    this.bIm = e;
    if (this.bIm) {
      if (t.Type === 5) {
        if (t.IsClientTrigger) {
          if (this.IsAsync) {
            FlowController_1.FlowController.StartFlow(this.bIm.FlowListName, this.bIm.FlowId, this.bIm.StateId, t);
            this.FinishExecute(true);
          } else {
            this.RIm = FlowController_1.FlowController.StartFlow(this.bIm.FlowListName, this.bIm.FlowId, this.bIm.StateId, t);
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 7, "非客户端触发器触发了客户端剧情(不播放)，请检查配置", ["Params", e], ["Context", t]);
          }
          this.FinishExecute(true);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 7, "ClientPlayFlow 没有支持的类型 " + t.Type, ["Params", e], ["Context", t]);
        }
        this.FinishExecute(true);
      }
    } else {
      this.FinishExecute(true);
    }
  }
  OnReset() {
    this.bIm = undefined;
    this.RIm = undefined;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
    }
  }
}
exports.LevelEventClientPlayFlow = LevelEventClientPlayFlow;
//# sourceMappingURL=LevelEventClientPlayFlow.js.map