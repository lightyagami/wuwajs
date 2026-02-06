"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerNpcPerformAction = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
const GuessJokerPlotAction_1 = require("./GuessJokerPlotAction");
class GuessJokerNpcPerformAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e, s = 0, t = GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerMaxPerformTime")) {
    super();
    this.eLf = 0;
    this.tLf = 0;
    this.ac = 0;
    this.Pag = e => {
      if (e !== this.ac) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GuessJokerCard", 78, "OnGuessJokerFinishPokerPerformAction state is not match", ["notify state", e], ["this.State", this.ac]);
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("GuessJokerCard", 78, "OnGuessJokerFinishPokerPerformAction!!");
        }
        this.Done = true;
      }
    };
    this.eLf = e;
    this.tLf = s;
    this.Duration = t;
  }
  OnStart() {
    var e;
    if (ModelManager_1.ModelManager.GuessJokerGamePlayModel) {
      e = GuessJokerUtils_1.GuessJokerUtils.CalculateNpcState(this.eLf, this.tLf);
      this.ac = e;
      this.T_g();
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.SetNpcPokerState(e);
    } else {
      this.Done = true;
    }
  }
  T_g() {
    let e = undefined;
    switch (this.ac) {
      case 6:
        e = new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 6);
        break;
      case 5:
        e = new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 7);
        break;
      case 7:
        e = new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 10);
        break;
      case 8:
        e = new GuessJokerPlotAction_1.GuessJokerPlotAction(1, 11);
    }
    if (e) {
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.PushPlotActions([e]);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuessJokerFinishPokerPerformAction, this.Pag);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuessJokerFinishPokerPerformAction, this.Pag);
  }
}
exports.GuessJokerNpcPerformAction = GuessJokerNpcPerformAction;
//# sourceMappingURL=GuessJokerNpcPerformAction.js.map