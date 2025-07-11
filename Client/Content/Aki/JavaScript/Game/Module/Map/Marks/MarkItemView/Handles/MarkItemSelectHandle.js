"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemSelectHandle = undefined;
const MarkSelectComponent_1 = require("../Components/MarkSelectComponent");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemSelectHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    if (this.ComponentInternal === undefined) {
      this.ComponentInternal = new MarkSelectComponent_1.MarkSelectComponent();
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkChoose_Prefab", this.Context.MarkComponentContainer);
    }
    return this.ComponentInternal;
  }
  GetOrCreateComponent() {
    if (this.ComponentInternal === undefined) {
      this.LoadComponentAsync().then(() => {
        this.ApplyModified();
      });
    }
    return this.ComponentInternal;
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(5, e);
  }
  OnApplyModified() {
    var e;
    var t;
    var n = this.Context.MarkItemEntity.ViewLifeCircle;
    if (n.IsChildViewStateDirty(5) && (e = this.GetOrCreateComponent(), this.IsComponentValid(e))) {
      t = n.IsChildViewVisible(5);
      n.SetChildViewVisibleClean(5);
      e.SetActive(t);
    }
  }
}
exports.MarkItemSelectHandle = MarkItemSelectHandle;
//# sourceMappingURL=MarkItemSelectHandle.js.map