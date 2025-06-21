"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FourCostTaskOperation = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class FourCostTaskOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  async ExecuteAiOperation(e) {
    var r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
    r.RefreshHandCardNum(this.Info.Sg1, !1), r.RefreshLibraryNum(this.Info.OM1), r.TaskData.IsExecuteFourCostLogic = !0, await e.OpponentArea.HandArea.RefreshHandCardNum(this.Info.Sg1)
  }
}
exports.FourCostTaskOperation = FourCostTaskOperation;
//# sourceMappingURL=FourCostTaskOperation.js.map