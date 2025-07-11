"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueExploreListItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class RogueExploreListItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText]];
  }
  Refresh(t, e, r) {
    var i = this.GetSprite(1);
    i.SetChangeColor(r % 2 != 0, i.changeColor);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.TitleId);
    this.GetText(3).SetText(t.ValueTxt);
  }
}
exports.RogueExploreListItem = RogueExploreListItem;
//# sourceMappingURL=RogueExploreListItem.js.map