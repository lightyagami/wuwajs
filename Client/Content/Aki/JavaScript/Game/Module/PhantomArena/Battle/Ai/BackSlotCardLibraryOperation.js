"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BackSlotCardLibraryOperation = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class BackSlotCardLibraryOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  async ExecuteAiOperation(e) {
    var r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetBattleCardIndexByCardId(this.Info.jg1);
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行场上卡牌回收操作", ["SlotIndex", r], ["CardId", this.Info.jg1]), ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.BackSlotCardToLibrary(r, this.Info.OM1), await e.OpponentArea.FunctionalArea.BackToRecycle(r)
  }
}
exports.BackSlotCardLibraryOperation = BackSlotCardLibraryOperation;
//# sourceMappingURL=BackSlotCardLibraryOperation.js.map