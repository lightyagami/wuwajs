"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsLegMatchResultItem = undefined;
const UE = require("ue");
const DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsLegMatchResultItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText]];
  }
  Refresh(e) {
    this.GetText(0).SetText(e.Rank.toString());
    this.GetItem(3).SetUIActive(e.LegMatchType === 2 && e.HasAdvanced);
    var t = DangoManager_1.DangoManager.GetDangoData(e.DangoId);
    this.GetText(2).ShowTextNew(t.NameKey);
    this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(1));
    var t = e.IsChampion ? "Dango_MainPage_Champion" : "Dango_MainPage_Advanced";
    this.GetText(4).ShowTextNew(t);
  }
}
exports.RacingBetsLegMatchResultItem = RacingBetsLegMatchResultItem;
//# sourceMappingURL=RacingBetsLegMatchResultItem.js.map