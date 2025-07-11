"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeCardOperation = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class ChangeCardOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "测试代码，执行交互卡牌操作", ["交换索引", [this.Info.dC1, this.Info.mC1]]);
    }
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.ExchangeBattleCard(this.Info.dC1, this.Info.mC1);
    await e.OpponentArea.FunctionalArea.TryChangeCard(this.Info.dC1, this.Info.mC1);
  }
}
exports.ChangeCardOperation = ChangeCardOperation;
//# sourceMappingURL=ChangeCardOperation.js.map