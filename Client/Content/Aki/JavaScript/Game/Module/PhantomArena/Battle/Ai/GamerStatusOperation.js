"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GamerStatusOperation = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class GamerStatusOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  ExecuteAiOperation(e) {
    ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RefreshBattleStatus(this.Info.vg1)
  }
}
exports.GamerStatusOperation = GamerStatusOperation;
//# sourceMappingURL=GamerStatusOperation.js.map