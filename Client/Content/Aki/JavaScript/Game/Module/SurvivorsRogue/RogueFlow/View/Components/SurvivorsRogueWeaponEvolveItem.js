"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueWeaponEvolveItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class SurvivorsRogueWeaponEvolveItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UISprite], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {}
  Refresh(e, r, t) {
    var s;
    var i;
    var o = (this.Data = e).IsUnlock;
    this.GetItem(2).SetUIActive(o);
    this.GetItem(4).SetUIActive(e.ShowLine);
    this.GetItem(5).SetUIActive(e.ShowLine);
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponEvolve(e.EvolveId);
    if (e &&= ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetQualityConfig(e.Quality)) {
      s = this.GetSprite(1);
      i = this.GetSprite(3);
      if (o) {
        i.SetColor(UE.Color.FromHex(e.EvolveColor));
        s.SetUIActive(false);
        i.SetUIActive(true);
      } else {
        s.SetColor(UE.Color.FromHex(e.EvolveColor));
        s.SetUIActive(true);
        i.SetUIActive(false);
      }
    }
  }
}
exports.SurvivorsRogueWeaponEvolveItem = SurvivorsRogueWeaponEvolveItem;
//# sourceMappingURL=SurvivorsRogueWeaponEvolveItem.js.map