"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemNameHandle = undefined;
const MarkNameComponent_1 = require("../Components/MarkNameComponent");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemNameHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  constructor() {
    super(...arguments);
    this.pDe = undefined;
  }
  async LoadComponentAsync() {
    if (this.ComponentInternal === undefined) {
      this.ComponentInternal = new MarkNameComponent_1.MarkNameComponent();
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkMapName_Prefab", this.Context.MarkComponentContainer);
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
  SetName(e) {
    this.pDe = e;
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(3, e);
  }
  OnApplyModified() {
    var e;
    var t;
    var n = this.Context.MarkItemEntity.ViewLifeCircle;
    if (n.IsChildViewStateDirty(3) && (e = this.GetOrCreateComponent(), this.IsComponentValid(e))) {
      t = n.IsChildViewVisible(3);
      n.SetChildViewVisibleClean(3);
      if (this.pDe !== undefined) {
        e.SetNameParam(this.pDe);
      }
      e.SetActive(t);
    }
  }
}
exports.MarkItemNameHandle = MarkItemNameHandle;
//# sourceMappingURL=MarkItemNameHandle.js.map