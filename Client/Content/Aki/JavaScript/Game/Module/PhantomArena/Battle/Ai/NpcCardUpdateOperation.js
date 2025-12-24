"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcCardUpdateOperation = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class NpcCardUpdateOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  ExecuteAiOperation(e) {
    var r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetCardDataByFightId(this.Info.uC1);
    if (r) {
      r.NotifyRefreshCardData(this.Info.YM1, this.Info.rhf, this.Info.__u);
    }
  }
}
exports.NpcCardUpdateOperation = NpcCardUpdateOperation;
//# sourceMappingURL=NpcCardUpdateOperation.js.map