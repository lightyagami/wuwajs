"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardDetailFactorDescItem = exports.CardDetailFactorDescItemData = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class CardDetailFactorDescItemData {
  constructor() {
    this.FactorConfigId = 0;
    this.IsActive = true;
  }
}
exports.CardDetailFactorDescItemData = CardDetailFactorDescItemData;
class CardDetailFactorDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite]];
  }
  Refresh(t) {
    this.Data = t;
    let e = "";
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(t.FactorConfigId);
    var i = r.EntryId;
    if (i > 0) {
      i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEntryConfig(i);
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
      e = i + e;
    }
    var i = t.IsActive ? r.Description : r.DeActiveDescription;
    var r = t.IsActive ? r.DescriptionParams : r.DeActiveDescriptionParams;
    var i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i), ...r);
    e += i;
    var r = this.GetText(0);
    r.SetText(e);
    r.SetAlpha(t.IsActive ? 1 : 0.5);
    this.GetSprite(1).SetUIActive(!t.IsActive);
  }
}
exports.CardDetailFactorDescItem = CardDetailFactorDescItem;
//# sourceMappingURL=CardDetailFactorDescItem.js.map