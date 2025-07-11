"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueFetterStarLvItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class MapRogueFetterStarLvItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite]];
  }
  Refresh(t, e, r) {
    this.Data = t;
    var s = this.GetText(0);
    s.SetText(t.StageStarLv.toString());
    s.SetChangeColor(t.CurrentLv === t.StageLv, s.changeColor);
    this.GetSprite(1).SetUIActive(t.StageLv < t.MaxLv);
  }
}
exports.MapRogueFetterStarLvItem = MapRogueFetterStarLvItem;
//# sourceMappingURL=MapRogueFetterStarLvItem.js.map