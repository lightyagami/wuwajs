"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeaveSlotOperation = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class LeaveSlotOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
    t.RefreshHandCardNum(this.Info.Hg1);
    t.RemoveBattleCardDataByIndex(this.Info.Qg1);
    await e.OpponentArea.FunctionalArea.DestroyCardByIndex(this.Info.Qg1);
  }
}
exports.LeaveSlotOperation = LeaveSlotOperation;
//# sourceMappingURL=LeaveSlotOperation.js.map