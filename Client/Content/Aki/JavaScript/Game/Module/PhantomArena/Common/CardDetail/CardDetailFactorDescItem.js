"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardDetailFactorDescItem = exports.CardDetailFactorDescItemData = void 0;
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class CardDetailFactorDescItemData {
  constructor() {
    this.FactorConfigId = 0, this.IsActive = !0
  }
}
exports.CardDetailFactorDescItemData = CardDetailFactorDescItemData;
class CardDetailFactorDescItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Data = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite]
    ]
  }
  Refresh(t) {
    this.Data = t;
    let e = "";
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleFactorConfig(t.FactorConfigId),
      i = r.EntryId,
      i = (0 < i && (i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEntryConfig(i), i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name), e = i + e), t.IsActive ? r.Description : r.DeActiveDescription),
      r = t.IsActive ? r.DescriptionParams : r.DeActiveDescriptionParams,
      i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i), ...r),
      r = (e += i, this.GetText(0));
    r.SetText(e), r.SetAlpha(t.IsActive ? 1 : .5), this.GetSprite(1).SetUIActive(!t.IsActive)
  }
}
exports.CardDetailFactorDescItem = CardDetailFactorDescItem;
//# sourceMappingURL=CardDetailFactorDescItem.js.map