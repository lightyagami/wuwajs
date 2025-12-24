"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTouchUiEditContainer = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const CommonTouchUiEditRootPanel_1 = require("./CommonTouchUiEditRootPanel");
class CommonTouchUiEditContainer {
  constructor() {
    this.P$u = undefined;
    this.Kot = new Map();
  }
  async LoadPanel(t, i, e) {
    this.P$u = new CommonTouchUiEditRootPanel_1.CommonTouchUiEditRootPanel();
    await this.P$u.CreateThenShowByResourceIdAsync("UiView_DynFightEdit", t);
    var o = this.P$u.GetItemAttachRoot();
    this.P$u.SetBackgroundTexture(e.BgTexturePath);
    var r = [];
    for (const n of i) {
      var s = new UiPanelBase_1.UiPanelBase();
      this.Kot.set(n, s);
      r.push(s.CreateThenShowByResourceIdAsync(n, o));
    }
    await Promise.all(r);
  }
  GetItem(e, o, r) {
    e = this.Kot.get(e);
    if (e) {
      let t = e.GetRootActor();
      let i = this.D$u(e);
      if (i) {
        if (r > -1) {
          e = i.Components.Get(r);
          if (!e) {
            return;
          }
          var r = e.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass());
          if (!r) {
            return;
          }
          i = r;
          t = e;
        }
        if (o === -1) {
          return t?.GetComponentByClass(UE.UIItem.StaticClass());
        } else if (r = i.Components.Get(o)) {
          return r.GetComponentByClass(UE.UIItem.StaticClass());
        } else {
          return undefined;
        }
      }
    }
  }
  GetRegistryItemList(t) {
    t = this.Kot.get(t);
    if (!t) {
      return [];
    }
    var i = this.D$u(t);
    if (!i) {
      return [];
    }
    var e = [];
    for (let t = 0; t < i.Components.Num(); t++) {
      var o = i.Components.Get(t);
      if (o &&= o.GetComponentByClass(UE.UIItem.StaticClass())) {
        e.push(o);
      }
    }
    return e;
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
}
exports.CommonTouchUiEditContainer = CommonTouchUiEditContainer;
//# sourceMappingURL=CommonTouchUiEditContainer.js.map