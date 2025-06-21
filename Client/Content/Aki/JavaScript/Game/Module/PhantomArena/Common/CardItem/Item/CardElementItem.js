"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardElementItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class CardElementItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UITexture]
    ]
  }
  Refresh(e, t = 0, r) {
    this.RefreshElement(e)
  }
  RefreshElement(e) {
    var t, r;
    0 === e ? this.SetActive(!1) : (this.SetActive(!0), (t = this.GetTexture(1)) && (e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e)) && (r = UE.Color.FromHex(e.TabElementColor), this.GetSprite(0).SetColor(r), this.SetTextureByPath(e.CardElementIcon, t)))
  }
  RefreshElementTabIcon(e) {
    var t, r;
    0 === e ? this.SetActive(!1) : (this.SetActive(!0), (t = this.GetTexture(1)) && (e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e)) && (r = UE.Color.FromHex(e.TabElementColor), this.GetSprite(0).SetColor(r), this.SetTextureByPath(e.TabIcon, t)))
  }
}
exports.CardElementItem = CardElementItem;
//# sourceMappingURL=CardElementItem.js.map