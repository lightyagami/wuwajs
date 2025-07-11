"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageDot = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
class PageDot extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.UpdateShow(false);
  }
  Refresh(t) {}
  UpdateShow(t) {
    this.GetItem(0).SetUIActive(t);
  }
}
exports.PageDot = PageDot;
//# sourceMappingURL=PageDot.js.map