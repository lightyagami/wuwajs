"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NpcCardUpdateOperation = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class NpcCardUpdateOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  ExecuteAiOperation(e) {
    var r = ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.GetCardDataByFightId(this.Info.jg1);
    r && r.NotifyRefreshCardData(this.Info.bM1, this.Info.cnu)
  }
}
exports.NpcCardUpdateOperation = NpcCardUpdateOperation;
//# sourceMappingURL=NpcCardUpdateOperation.js.map