"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscardCardOperation = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class DiscardCardOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    var r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
    r.RefreshHandCardNum(this.Info.Hg1, false);
    await e.OpponentArea.HandArea.DiscardCard(this.Info.eG1);
    r.RefreshCardLibraryNum(this.Info.aE1);
  }
}
exports.DiscardCardOperation = DiscardCardOperation;
//# sourceMappingURL=DiscardCardOperation.js.map