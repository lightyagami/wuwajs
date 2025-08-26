"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReserveCardOperation = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class ReserveCardOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    await e.OpponentArea.HandArea.BackToRecycle(this.Info.Yau);
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.ReverseCard(this.Info);
  }
}
exports.ReserveCardOperation = ReserveCardOperation;
//# sourceMappingURL=ReserveCardOperation.js.map