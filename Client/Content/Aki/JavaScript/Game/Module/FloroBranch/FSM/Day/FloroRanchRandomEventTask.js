"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchRandomEventTask = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDailyTaskBase_1 = require("./FloroRanchDailyTaskBase");
class FloroRanchRandomEventTask extends FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase {
  constructor(a) {
    super();
    this.pIa = undefined;
    this.pIa = a;
  }
  OnExecute() {
    var a = {
      EventData: this.pIa,
      CloseCallback: () => {
        this.Complete();
      }
    };
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.OpenAndRecordView("FloroRanchRandomEventView", a);
  }
}
exports.FloroRanchRandomEventTask = FloroRanchRandomEventTask;
//# sourceMappingURL=FloroRanchRandomEventTask.js.map