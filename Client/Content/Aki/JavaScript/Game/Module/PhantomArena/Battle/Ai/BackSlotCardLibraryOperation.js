"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackSlotCardLibraryOperation = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class BackSlotCardLibraryOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    var r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleCardIndexByCardId(this.Info.uC1);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "执行场上卡牌回收操作", ["SlotIndex", r], ["CardId", this.Info.uC1]);
    }
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.BackSlotCardToLibrary(r, this.Info.aE1);
    await e.OpponentArea.FunctionalArea.BackToRecycle(r);
  }
}
exports.BackSlotCardLibraryOperation = BackSlotCardLibraryOperation;
//# sourceMappingURL=BackSlotCardLibraryOperation.js.map