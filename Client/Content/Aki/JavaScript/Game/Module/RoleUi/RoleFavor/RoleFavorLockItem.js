"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleFavorLockItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleFavorLockItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.huo = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText]];
  }
  Refresh(t, e, s) {
    this.huo = t;
    this.Og();
  }
  Og() {
    var t;
    var e;
    if (this.huo) {
      t = this.huo.Desc;
      e = this.huo.IsLock;
      this.GetText(3).SetText(t);
      this.GetText(2).SetText(t);
      this.GetItem(1).SetUIActive(e);
      this.GetItem(0).SetUIActive(!e);
    }
  }
  OnBeforeDestroy() {
    this.huo = undefined;
  }
}
exports.RoleFavorLockItem = RoleFavorLockItem;
//# sourceMappingURL=RoleFavorLockItem.js.map