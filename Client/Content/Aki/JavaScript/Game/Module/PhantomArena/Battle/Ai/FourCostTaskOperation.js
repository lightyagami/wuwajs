"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FourCostTaskOperation = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class FourCostTaskOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    var r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
    r.RefreshHandCardNum(this.Info.Hg1, false);
    r.RefreshCardLibraryNum(this.Info.aE1);
    r.TaskData.IsExecuteFourCostLogic = true;
    await e.OpponentArea.HandArea.RefreshHandCardNum(this.Info.Hg1);
  }
}
exports.FourCostTaskOperation = FourCostTaskOperation;
//# sourceMappingURL=FourCostTaskOperation.js.map