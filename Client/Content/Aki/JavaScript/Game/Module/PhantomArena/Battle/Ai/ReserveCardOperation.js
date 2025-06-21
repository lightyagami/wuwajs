"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ReserveCardOperation = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class ReserveCardOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  async ExecuteAiOperation(e) {
    await e.OpponentArea.HandArea.BackToRecycle(this.Info.kru), ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.ReverseCard(this.Info)
  }
}
exports.ReserveCardOperation = ReserveCardOperation;
//# sourceMappingURL=ReserveCardOperation.js.map