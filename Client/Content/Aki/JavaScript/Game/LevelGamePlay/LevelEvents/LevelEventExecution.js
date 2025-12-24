"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventExecution = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExecution extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
  }
  ExecuteNew(e, t) {
    if (t.Type === 1 && EntitySystem_1.EntitySystem.Get(t.EntityId)?.Valid) {
      this.E0 = t.EntityId;
      this.MDe();
      this.FinishExecute(true);
    } else {
      this.FinishExecute(false);
    }
  }
  MDe() {
    var e = EntitySystem_1.EntitySystem.Get(this.E0);
    if (e) {
      if (e = e.GetComponent(91)) {
        e.StartExecution();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "Can not find ExecutionComponent");
      }
    }
  }
  OnReset() {
    this.E0 = 0;
  }
}
exports.LevelEventExecution = LevelEventExecution;
//# sourceMappingURL=LevelEventExecution.js.map