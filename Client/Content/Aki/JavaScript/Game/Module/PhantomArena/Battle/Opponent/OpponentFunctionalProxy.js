"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpponentFunctionalProxy = void 0;
const OpponentFunctionAreaProxy_1 = require("./OpponentFunctionAreaProxy");
class OpponentFunctionalProxy extends OpponentFunctionAreaProxy_1.OpponentFunctionAreaProxy {
  constructor() {
    super(...arguments), this.AreaItem = void 0, this.IsMonster = !1
  }
  GetCardAttachItem() {
    return this.AreaItem.GetRootItem()
  }
  async UseCardSkill(t) {
    this.Card = await this.AddCardByCardData(t);
    t = this.ParentArea.ParentArea.HandArea.GetLayoutItem();
    await this.PlaySetBattleTween(t), await this.Card.MagicUse(), this.Card = void 0
  }
}
exports.OpponentFunctionalProxy = OpponentFunctionalProxy;
//# sourceMappingURL=OpponentFunctionalProxy.js.map