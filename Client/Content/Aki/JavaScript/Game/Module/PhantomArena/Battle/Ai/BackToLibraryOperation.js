"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackToLibraryOperation = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class BackToLibraryOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    await e.OpponentArea.HandArea.BackToRecycle(1);
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.BackToLibrary(this.Info);
  }
}
exports.BackToLibraryOperation = BackToLibraryOperation;
//# sourceMappingURL=BackToLibraryOperation.js.map