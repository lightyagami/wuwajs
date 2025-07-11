"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardElementItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class CardElementItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  Refresh(e, t = 0, r) {
    this.RefreshElement(e);
  }
  RefreshElement(e) {
    var t;
    var r;
    if (e === 0) {
      this.SetActive(false);
    } else {
      this.SetActive(true);
      if ((t = this.GetTexture(1)) && (e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e))) {
        r = UE.Color.FromHex(e.TabElementColor);
        this.GetSprite(0).SetColor(r);
        this.SetTextureByPath(e.CardElementIcon, t);
      }
    }
  }
  RefreshElementTabIcon(e) {
    var t;
    var r;
    if (e === 0) {
      this.SetActive(false);
    } else {
      this.SetActive(true);
      if ((t = this.GetTexture(1)) && (e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e))) {
        r = UE.Color.FromHex(e.TabElementColor);
        this.GetSprite(0).SetColor(r);
        this.SetTextureByPath(e.TabIcon, t);
      }
    }
  }
}
exports.CardElementItem = CardElementItem;
//# sourceMappingURL=CardElementItem.js.map