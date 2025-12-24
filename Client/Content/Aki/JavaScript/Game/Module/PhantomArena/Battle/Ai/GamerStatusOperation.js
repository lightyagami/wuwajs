"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamerStatusOperation = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class GamerStatusOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  ExecuteAiOperation(e) {
    if (this.Info.Fg1 === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterNpc) {
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OpponentData.RefreshBattleStatus(this.Info.Vg1);
    } else if (this.Info.Fg1 === Protocol_1.Aki.Protocol.$xm.Proto_GamerFighterPlayer) {
      ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.RefreshBattleStatus(this.Info.Vg1);
    }
  }
}
exports.GamerStatusOperation = GamerStatusOperation;
//# sourceMappingURL=GamerStatusOperation.js.map