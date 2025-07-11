"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTeamEditFetterIconItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const ZERO_LV_COLOR = "FFFFFF7F";
class RogueBattleTeamEditFetterIconItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem]];
  }
  Refresh(e, t, r) {
    var i;
    var e = e.NewRoleBondInfo;
    var s = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBond(e.v9n);
    var a = ConfigManager_1.ConfigManager.RogueBattleConfig.GetBondLvConfigByLv(e.F6n);
    if (s && a) {
      (i = this.GetTexture(1)).SetChangeColor(e.F6n === 0, i.changeColor);
      this.SetTextureShowUntilLoaded(s.Icon, i);
      s = this.GetSprite(0);
      i = e.F6n > 0 ? a.LvColor : ZERO_LV_COLOR;
      e = UE.Color.FromHex(i);
      s.SetColor(e);
      this.SetLinkEffectOn(false);
    }
  }
  SetLinkEffectOn(e) {
    this.GetItem(2).SetUIActive(e);
    this.GetItem(3).SetUIActive(e);
  }
  GetKey(e, t) {
    return e.NewRoleBondInfo.v9n;
  }
}
exports.RogueBattleTeamEditFetterIconItem = RogueBattleTeamEditFetterIconItem;
//# sourceMappingURL=RogueBattleTeamEditFetterIconItem.js.map