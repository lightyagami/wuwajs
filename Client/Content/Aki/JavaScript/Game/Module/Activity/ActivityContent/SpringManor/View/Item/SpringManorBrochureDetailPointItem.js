"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorBrochureDetailPointItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class SpringManorBrochureDetailPointItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite]];
  }
  Refresh(e, t, r) {
    this.Pyg(t);
  }
  Pyg(e) {
    this.GetSprite(1)?.SetUIActive(e);
  }
  OnSelected(e) {
    this.Pyg(true);
  }
  OnDeselected(e) {
    this.Pyg(false);
  }
}
exports.SpringManorBrochureDetailPointItem = SpringManorBrochureDetailPointItem;
//# sourceMappingURL=SpringManorBrochureDetailPointItem.js.map