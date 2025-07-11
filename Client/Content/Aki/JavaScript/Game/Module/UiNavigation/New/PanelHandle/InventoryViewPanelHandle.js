"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryViewPanelHandle = undefined;
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class InventoryViewPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments);
    this.oBo = false;
  }
  get IsInDestroyMode() {
    return this.oBo;
  }
  rBo() {
    let e = "";
    for (const t of this.DefaultNavigationListener) {
      if (t.GetNavigationComponent().GetType() === "InventoryItemGridToggle") {
        e = t.GroupName;
        break;
      }
    }
    return this.GetNavigationGroup(e);
  }
  SetItemGridDestroyMode(r) {
    this.oBo = r;
    var n = this.rBo();
    if (n) {
      for (let e = 0, t = n.ListenerList.length; e < t; ++e) {
        n.ListenerList[e].GetBehaviorComponent().bToggleOnSelect = !r;
      }
    }
  }
}
exports.InventoryViewPanelHandle = InventoryViewPanelHandle;
//# sourceMappingURL=InventoryViewPanelHandle.js.map