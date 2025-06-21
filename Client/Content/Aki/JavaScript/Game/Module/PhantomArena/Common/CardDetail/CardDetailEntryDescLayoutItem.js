"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardDetailEntryDescLayoutItem = void 0;
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  CardDetailEntryDescItem_1 = require("./CardDetailEntryDescItem");
class CardDetailEntryDescLayoutItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(), this.Nw1 = void 0, this.Vw1 = () => new CardDetailEntryDescItem_1.CardDetailEntryDescItem, this.Nw1 = new GenericLayout_1.GenericLayout(e, this.Vw1, t?.GetOwner())
  }
  Refresh(e) {
    this.Nw1.RefreshByData(e)
  }
  RefreshByCardConfig(e) {
    var t = [];
    t.push(...e.EntryIdList);
    for (const a of e.CardFactorId) {
      var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(a).EntryId;
      0 < r && !t.includes(r) && t.push(r)
    }
    this.Refresh(t)
  }
}
exports.CardDetailEntryDescLayoutItem = CardDetailEntryDescLayoutItem;
//# sourceMappingURL=CardDetailEntryDescLayoutItem.js.map