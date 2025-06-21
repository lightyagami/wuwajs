"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EvolveCardOperation = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class EvolveCardOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  async ExecuteAiOperation(e) {
    var r = this.Info.Vg1.gg1,
      o = (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行进化卡牌操作", ["进化索引", r.Ig1], ["CardId", r.Mg1]), ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData);
    o.RefreshCanEvolveNum(this.Info.Pg1), o.SetBattleCardData(this.Info.Vg1), o.RefreshHandCardNum(this.Info.Sg1), o.RefreshLibraryNum(this.Info.yg1), await e.OpponentArea.FunctionalArea.TryEvolveCard(r.Mg1, r.Ig1)
  }
}
exports.EvolveCardOperation = EvolveCardOperation;
//# sourceMappingURL=EvolveCardOperation.js.map