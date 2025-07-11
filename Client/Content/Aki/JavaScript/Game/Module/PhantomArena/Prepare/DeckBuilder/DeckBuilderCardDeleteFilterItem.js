"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderCardDeleteFilterItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class DeckBuilderCardDeleteFilterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OnItemToggleStateChange = undefined;
    this.SV1 = e => {
      this.OnItemToggleStateChange?.(this.GridIndex, e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UISprite], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.SV1]];
  }
  Refresh(e, t, i) {
    this.Data = e;
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e.Element);
    this.SetTextureByPath(r.DeleteFilterIcon, this.GetTexture(2));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r.Name);
    if (e.Enabled) {
      r = e.Selected ? 1 : 0;
      this.GetExtendToggle(0).SetToggleState(r);
    } else {
      this.GetExtendToggle(0).SetToggleState(2);
    }
  }
}
exports.DeckBuilderCardDeleteFilterItem = DeckBuilderCardDeleteFilterItem;
//# sourceMappingURL=DeckBuilderCardDeleteFilterItem.js.map