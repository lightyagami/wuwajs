"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchGachaTask = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDailyTaskBase_1 = require("./FloroRanchDailyTaskBase");
class FloroRanchGachaTask extends FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase {
  constructor(a) {
    super();
    this.umu = undefined;
    this.umu = a;
  }
  OnExecute() {
    var a = {
      GachaData: this.umu,
      CloseCallback: () => {
        this.Complete();
      }
    };
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.OpenAndRecordView("FloroRanchCardSelectView", a);
  }
}
exports.FloroRanchGachaTask = FloroRanchGachaTask;
//# sourceMappingURL=FloroRanchGachaTask.js.map