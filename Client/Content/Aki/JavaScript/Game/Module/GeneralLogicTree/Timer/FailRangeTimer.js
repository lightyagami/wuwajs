"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FailRangeTimer = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../Ui/UiManager");
const LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
class PendingProcess {
  constructor(e) {
    this.ProcessType = e;
    this.ProcessId = 0;
    this.Finished = false;
    this.ProcessId = ++PendingProcess.Id;
  }
}
PendingProcess.Id = 0;
class StartShowProcess extends PendingProcess {
  constructor(e) {
    super(0);
    this.EndTime = e;
  }
}
class EndShowProcess extends PendingProcess {
  constructor() {
    super(1);
  }
}
class FailRangeTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor(e, s, i) {
    super(e, s, true, i);
    this.UYt = [];
    this.QZe = undefined;
    this.OnTick = e => {
      if (this.UYt.length !== 0 && !this.QZe) {
        this.QZe = this.UYt[0];
        switch (this.QZe.ProcessType) {
          case 0:
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FailRangeTimerStartShow);
            UiManager_1.UiManager.OpenView("QuestFailRangeTipsView", this.QZe.EndTime, this.HDe);
            break;
          case 1:
            UiManager_1.UiManager.CloseView("QuestFailRangeTipsView", this.HDe);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FailRangeTimerEndShow);
        }
      }
    };
    this.HDe = e => {
      this.QZe.Finished = true;
      this.UYt.shift();
      this.QZe = undefined;
    };
    this.QZe = undefined;
  }
  Destroy() {
    this.UYt.length = 0;
    UiManager_1.UiManager.CloseView("QuestFailRangeTipsView", this.HDe);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FailRangeTimerEndShow);
    super.Destroy();
  }
  StartShowTimer(e, s) {
    this.UYt.push(new StartShowProcess(e));
  }
  EndShowTimer() {
    this.UYt.push(new EndShowProcess());
  }
}
exports.FailRangeTimer = FailRangeTimer;
//# sourceMappingURL=FailRangeTimer.js.map