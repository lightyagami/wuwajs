"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigPanelHandle = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class PhantomManageConfigPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments);
    this.Ord = new Map();
    this.qrd = (t, a, n, r) => {
      for (let e = a; e !== n; e += r) {
        if (t[e]?.IsCanFocus()) {
          return t[e];
        }
      }
    };
    this.Jo1 = (e, t) => {
      let a = 0;
      let n = 0;
      if (e.IsValid()) {
        a = e.RootUIComp.hierarchyIndex;
      }
      if (t.IsValid()) {
        n = t.RootUIComp.hierarchyIndex;
      }
      if (a !== n) {
        return a - n;
      } else {
        return -1;
      }
    };
  }
  AddNavigationListener(e, t, a) {
    var n = this.Ord.get(e) ?? [];
    if (!n.includes(t)) {
      n.push(t);
      n.sort(this.Jo1);
      this.Ord.set(e, n);
    }
  }
  FindNextFocusListener(t, a) {
    t = this.Ord.get(t) ?? [];
    a = t.indexOf(a);
    if (t.length !== 0 && !(a <= 0)) {
      let e = this.qrd(t, a + 1, t.length, 1);
      if (e = e || this.qrd(t, a - 1, -1, -1)) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(e.RootUIComp, true);
      }
    }
  }
}
exports.PhantomManageConfigPanelHandle = PhantomManageConfigPanelHandle;
//# sourceMappingURL=PhantomManageConfigPanelHandle.js.map