"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderCardDeleteFilterItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class DeckBuilderCardDeleteFilterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Data = void 0, this.OnItemToggleStateChange = void 0, this.H41 = e => {
      this.OnItemToggleStateChange?.(this.GridIndex, e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UISprite],
      [4, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.H41]
    ]
  }
  Refresh(e, t, i) {
    this.Data = e;
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e.Element);
    this.SetTextureByPath(r.DeleteFilterIcon, this.GetTexture(2)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r.Name), e.Enabled ? (r = e.Selected ? 1 : 0, this.GetExtendToggle(0).SetToggleState(r)) : this.GetExtendToggle(0).SetToggleState(2)
  }
}
exports.DeckBuilderCardDeleteFilterItem = DeckBuilderCardDeleteFilterItem;
//# sourceMappingURL=DeckBuilderCardDeleteFilterItem.js.map