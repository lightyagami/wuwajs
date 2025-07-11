"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteViewPanelHandle = undefined;
const UiNavigationLogic_1 = require("../UiNavigationLogic");
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class RouletteViewPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments);
    this.aBo = undefined;
  }
  OnGetSuitableNavigationListenerList(e) {
    if (e) {
      return this.DefaultNavigationListener;
    } else {
      e = this.GetNavigationGroup("Group2");
      if (UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(e)) {
        if (!this.aBo) {
          this.aBo = [...this.DefaultNavigationListener];
          if (this.aBo.length >= 2) {
            e = this.aBo[0];
            this.aBo[0] = this.aBo[1];
            this.aBo[1] = e;
          }
        }
        return this.aBo;
      } else {
        if ((e = this.DefaultNavigationListener[0]).GetNavigationGroup().LastSelectListener) {
          e = e.GetNavigationGroup().LastSelectListener;
          this.DefaultNavigationListener[0] = e;
        }
        return this.DefaultNavigationListener;
      }
    }
  }
}
exports.RouletteViewPanelHandle = RouletteViewPanelHandle;
//# sourceMappingURL=RouletteViewPanelHandle.js.map