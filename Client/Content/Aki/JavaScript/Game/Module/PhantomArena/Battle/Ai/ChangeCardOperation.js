"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ChangeCardOperation = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class ChangeCardOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  async ExecuteAiOperation(e) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "测试代码，执行交互卡牌操作", ["交换索引", [this.Info.Hg1, this.Info.$g1]]), ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.ExchangeBattleCard(this.Info.Hg1, this.Info.$g1), await e.OpponentArea.FunctionalArea.TryChangeCard(this.Info.Hg1, this.Info.$g1)
  }
}
exports.ChangeCardOperation = ChangeCardOperation;
//# sourceMappingURL=ChangeCardOperation.js.map