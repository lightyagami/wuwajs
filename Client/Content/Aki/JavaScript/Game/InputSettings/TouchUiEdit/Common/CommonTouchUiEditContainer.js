"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTouchUiEditContainer = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonTouchUiEditContainer {
  constructor() {
    this.P$u = undefined;
    this.Kot = new Map();
  }
  async LoadPanel(t, e) {
    this.P$u = new UiPanelBase_1.UiPanelBase();
    await this.P$u.CreateThenShowByResourceIdAsync("UiView_DynFightEdit", t);
    var i = this.x$u(this.P$u, 0);
    var r = [];
    for (const n of e) {
      var s = new UiPanelBase_1.UiPanelBase();
      this.Kot.set(n, s);
      r.push(s.CreateThenShowByResourceIdAsync(n, i));
    }
    await Promise.all(r);
  }
  GetItem(t, e) {
    t = this.Kot.get(t);
    if (t) {
      if (e === -1) {
        return t.GetRootItem();
      }
      t = this.D$u(t);
      if (t) {
        t = t.Components.Get(e);
        if (t) {
          return t.GetComponentByClass(UE.UIItem.StaticClass());
        }
      }
    }
  }
  GetItemList(t) {
    t = this.Kot.get(t);
    if (!t) {
      return [];
    }
    var e = this.D$u(t);
    if (!e) {
      return [];
    }
    var i = [];
    for (let t = 0; t < e.Components.Num(); t++) {
      var r = e.Components.Get(t);
      if (r &&= r.GetComponentByClass(UE.UIItem.StaticClass())) {
        i.push(r);
      }
    }
    return i;
  }
  GetRootItem() {
    return this.P$u.GetRootItem();
  }
  OnViewDestroy() {
    this.Kot.forEach(t => {
      t.Destroy();
    });
    this.Kot.clear();
    if (this.P$u) {
      this.P$u.Destroy();
    }
  }
  D$u(t) {
    t = t.GetRootActor();
    if (t) {
      return t.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
    }
  }
  x$u(t, e) {
    t = t.GetRootActor();
    if (t) {
      t = t.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
      if (t) {
        t = t.Components.Get(e);
        if (t) {
          return t.GetComponentByClass(UE.UIItem.StaticClass());
        }
      }
    }
  }
}
exports.CommonTouchUiEditContainer = CommonTouchUiEditContainer;
//# sourceMappingURL=CommonTouchUiEditContainer.js.map