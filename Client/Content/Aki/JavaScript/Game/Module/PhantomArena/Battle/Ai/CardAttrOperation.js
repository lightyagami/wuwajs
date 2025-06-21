"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardAttrOperation = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  NpcAiOperation_1 = require("./NpcAiOperation");
class CardAttrOperation extends NpcAiOperation_1.NpcAiOperation {
  constructor(e) {
    super(), this.Info = e
  }
  ExecuteAiOperation(e) {
    ModelManager_1.ModelManager.PhantomArenaBattleModel.RefreshFighterAttr(this.Info.Qg1, this.Info.vg1)
  }
}
exports.CardAttrOperation = CardAttrOperation;
//# sourceMappingURL=CardAttrOperation.js.map