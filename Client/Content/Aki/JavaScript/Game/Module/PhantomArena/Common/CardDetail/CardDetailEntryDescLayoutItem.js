"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDetailEntryDescLayoutItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const CardDetailEntryDescItem_1 = require("./CardDetailEntryDescItem");
class CardDetailEntryDescLayoutItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.fA1 = undefined;
    this.gA1 = () => new CardDetailEntryDescItem_1.CardDetailEntryDescItem();
    this.fA1 = new GenericLayout_1.GenericLayout(e, this.gA1, t?.GetOwner());
  }
  Refresh(e) {
    this.fA1.RefreshByData(e);
  }
  RefreshByCardConfig(e) {
    var t = [];
    t.push(...e.EntryIdList);
    for (const a of e.CardFactorId) {
      var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(a).EntryId;
      if (r > 0 && !t.includes(r)) {
        t.push(r);
      }
    }
    this.Refresh(t);
  }
}
exports.CardDetailEntryDescLayoutItem = CardDetailEntryDescLayoutItem;
//# sourceMappingURL=CardDetailEntryDescLayoutItem.js.map