"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvolveCardOperation = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class EvolveCardOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  async ExecuteAiOperation(e) {
    var r = this.Info.cC1.Gg1;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "执行进化卡牌操作", ["进化索引", r.Qg1], ["CardId", r.$g1]);
    }
    var o = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData;
    o.RefreshCanEvolveNum(this.Info.eC1);
    o.SetBattleCardData(this.Info.cC1);
    o.RefreshHandCardNum(this.Info.Hg1);
    o.RefreshCardLibraryNum(this.Info.jg1);
    await e.OpponentArea.FunctionalArea.TryEvolveCard(r.$g1, r.Qg1);
  }
}
exports.EvolveCardOperation = EvolveCardOperation;
//# sourceMappingURL=EvolveCardOperation.js.map