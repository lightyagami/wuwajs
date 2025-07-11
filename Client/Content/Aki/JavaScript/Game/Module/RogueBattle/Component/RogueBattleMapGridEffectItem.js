"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapGridEffectTabItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleMapGridEffectTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText]];
  }
  OnStart() {
    this.GetItem(1)?.SetUIActive(false);
  }
  Refresh(t, e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.TagKey);
    var r = t.IsRatio ? `+${t.Count}%` : "+" + t.Count;
    this.GetText(2)?.SetText(r);
    this.SetTextureByPath(t.Icon, this.GetTexture(0));
  }
}
exports.RogueBattleMapGridEffectTabItem = RogueBattleMapGridEffectTabItem;
//# sourceMappingURL=RogueBattleMapGridEffectItem.js.map