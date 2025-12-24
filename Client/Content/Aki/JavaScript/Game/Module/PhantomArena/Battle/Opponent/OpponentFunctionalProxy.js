"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpponentFunctionalProxy = undefined;
const OpponentFunctionAreaProxy_1 = require("./OpponentFunctionAreaProxy");
class OpponentFunctionalProxy extends OpponentFunctionAreaProxy_1.OpponentFunctionAreaProxy {
  constructor() {
    super(...arguments);
    this.AreaItem = undefined;
    this.IsMonster = false;
    this.IsNeedPreload = false;
  }
  GetCardAttachItem() {
    return this.AreaItem.GetRootItem();
  }
  async UseCardSkill(t) {
    this.Card = await this.AddCardByCardData(t);
    t = this.ParentArea.ParentArea.HandArea.GetLayoutItem();
    await this.PlaySetBattleTween(t);
    await this.Card.MagicUse();
    this.Card = undefined;
  }
}
exports.OpponentFunctionalProxy = OpponentFunctionalProxy;
//# sourceMappingURL=OpponentFunctionalProxy.js.map