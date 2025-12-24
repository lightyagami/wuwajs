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
  OnGetSuitableNavigationListenerList(i) {
    if (!i && (i = this.GetNavigationGroup("GroupTab2"), UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(i))) {
      i = this.GetNavigationGroup("Group2");
      if (UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(i)) {
        if (!this.aBo) {
          this.aBo = [...this.DefaultNavigationListener];
          if (this.aBo.length >= 2) {
            i = this.aBo[0];
            this.aBo[0] = this.aBo[1];
            this.aBo[1] = i;
          }
        }
        return this.aBo;
      } else {
        if ((i = this.DefaultNavigationListener[0]).GetNavigationGroup().LastSelectListener) {
          i = i.GetNavigationGroup().LastSelectListener;
          this.DefaultNavigationListener[0] = i;
        }
        return this.DefaultNavigationListener;
      }
    } else {
      return this.DefaultNavigationListener;
    }
  }
}
exports.RouletteViewPanelHandle = RouletteViewPanelHandle;
//# sourceMappingURL=RouletteViewPanelHandle.js.map