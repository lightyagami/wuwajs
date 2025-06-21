"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DiscardCardOperation = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class DiscardCardOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  async ExecuteAiOperation(e) {
    var r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
    r.RefreshHandCardNum(this.Info.Sg1, !1), await e.OpponentArea.HandArea.DiscardCard(this.Info.E21), r.RefreshLibraryNum(this.Info.OM1)
  }
}
exports.DiscardCardOperation = DiscardCardOperation;
//# sourceMappingURL=DiscardCardOperation.js.map