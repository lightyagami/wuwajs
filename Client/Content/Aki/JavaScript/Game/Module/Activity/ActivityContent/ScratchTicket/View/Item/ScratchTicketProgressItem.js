"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScratchTicketProgressItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class ScratchTicketProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite]];
  }
  Refresh(t, s, r) {
    var e = t.GetRoundState();
    this.GetItem(0).SetUIActive(e === 1);
    var i = this.GetSprite(1);
    i.SetChangeColor(e !== 1, i.changeColor);
    this.GetItem(2).SetUIActive(e === 0);
    this.GetItem(3).SetUIActive(e === 2);
    var i = this.GetSprite(4);
    var o = this.GetSprite(5);
    i.SetUIActive(e === 1);
    this.SetSpriteByPath(t.Config.YellowRoundIcon, i, false, undefined);
    o.SetUIActive(e !== 1);
    this.SetSpriteByPath(t.Config.BlackRoundIcon, o, false, undefined);
  }
}
exports.ScratchTicketProgressItem = ScratchTicketProgressItem;
//# sourceMappingURL=ScratchTicketProgressItem.js.map