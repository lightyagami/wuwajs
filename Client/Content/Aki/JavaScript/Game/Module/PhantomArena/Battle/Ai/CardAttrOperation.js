"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardAttrOperation = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const NpcAiOperation_1 = require("./NpcAiOperation");
class CardAttrOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super();
    this.Info = e;
  }
  ExecuteAiOperation(e) {
    ModelManager_1.ModelManager.PhantomArenaBattleModel.RefreshFighterAttr(this.Info.gC1, this.Info.Vg1);
  }
}
exports.CardAttrOperation = CardAttrOperation;
//# sourceMappingURL=CardAttrOperation.js.map