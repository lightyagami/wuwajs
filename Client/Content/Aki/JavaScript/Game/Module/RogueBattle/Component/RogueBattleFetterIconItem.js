"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleFetterIconItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const ZERO_LV_COLOR = "FFFFFF7F";
class RogueBattleFetterIconItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  Refresh(e, t, r) {
    this.Pe = e;
    this.RefreshSelectState(false);
  }
  RefreshSelectState(e) {
    var t;
    var e = e ? this.Pe.NewRoleBondInfo : this.Pe.OldRoleBondInfo;
    var r = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBond(e.v9n);
    var s = ConfigManager_1.ConfigManager.RogueBattleConfig.GetBondLvConfigByLv(e.F6n);
    if (r && s) {
      (t = this.GetTexture(1)).SetChangeColor(e.F6n === 0, t.changeColor);
      this.SetTextureShowUntilLoaded(r.Icon, t);
      r = this.GetSprite(0);
      t = e.F6n > 0 ? s.LvColor : ZERO_LV_COLOR;
      e = UE.Color.FromHex(t);
      r.SetColor(e);
    }
  }
}
exports.RogueBattleFetterIconItem = RogueBattleFetterIconItem;
//# sourceMappingURL=RogueBattleFetterIconItem.js.map