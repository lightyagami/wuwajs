"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTouchUiEditContainer = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonTouchUiEditContainer {
  constructor() {
    this.Z9u = undefined;
    this.Kot = new Map();
  }
  async LoadPanel(t, e) {
    this.Z9u = new UiPanelBase_1.UiPanelBase();
    await this.Z9u.CreateThenShowByResourceIdAsync("UiView_DynFightEdit", t);
    var i = this.eHu(this.Z9u, 0);
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
      t = this.tHu(t);
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
    var e = this.tHu(t);
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
    return this.Z9u.GetRootItem();
  }
  OnViewDestroy() {
    this.Kot.forEach(t => {
      t.Destroy();
    });
    this.Kot.clear();
    if (this.Z9u) {
      this.Z9u.Destroy();
    }
  }
  tHu(t) {
    t = t.GetRootActor();
    if (t) {
      return t.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
    }
  }
  eHu(t, e) {
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