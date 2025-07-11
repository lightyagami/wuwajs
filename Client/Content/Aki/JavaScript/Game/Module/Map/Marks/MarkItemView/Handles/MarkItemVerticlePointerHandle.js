"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemVerticalPointerHandle = undefined;
const MarkVerticalPointerComponent_1 = require("../Components/MarkVerticalPointerComponent");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
const POINTER_RANGE = 2000;
class MarkItemVerticalPointerHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  constructor() {
    super(...arguments);
    this.ComponentInternal = undefined;
  }
  UpdateVerticalPointerType(t, e) {
    if (this.Context.MarkItemEntity.ViewLifeCircle.EnableVerticalPointer) {
      t = this.qRi(t, e);
      this.Context.MarkItemEntity.ViewLifeCircle.VerticalPointerType = t;
      this.SetVisible(t !== 0);
    } else {
      this.SetVisible(false);
    }
  }
  qRi(t, e) {
    if (this.Context.MarkItem.MapType === 2 || (t = t.Z - e.Z, Math.abs(t) < POINTER_RANGE)) {
      return 0;
    } else if (t < 0) {
      return 1;
    } else {
      return 2;
    }
  }
  async LoadComponentAsync() {
    if (this.ComponentInternal === undefined) {
      this.ComponentInternal = new MarkVerticalPointerComponent_1.MarkVerticalPointerComponent();
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkArrow_Prefab", this.Context.MarkRootItem);
    }
    return this.ComponentInternal;
  }
  GetOrCreateComponent() {
    if (this.ComponentInternal === undefined) {
      this.LoadComponentAsync().then(() => {
        var t;
        if (this.ComponentInternal !== undefined) {
          t = this.Context.MarkItem;
          this.ComponentInternal.GetRootItem().SetUIRelativeScale3D(t.CornerScaleVector);
          this.ApplyModified();
        }
      });
    }
    return this.ComponentInternal;
  }
  OnSetVisible(t) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(8, t);
  }
  OnApplyModified() {
    var t = this.Context.MarkItemEntity.ViewLifeCircle;
    var e = t.IsChildViewStateDirty(8);
    var i = t.IsVerticalPointerTypeDirty;
    if ((e || i) && (e = this.GetOrCreateComponent(), this.IsComponentValid(e))) {
      i = t.IsChildViewVisible(8);
      t.SetChildViewVisibleClean(8);
      t.SetVerticalPointerTypeClean();
      e.SetPointerType(t.VerticalPointerType);
      e.SetActive(i);
    }
  }
  OnDispose() {
    this.DestroyComponent();
    super.OnDispose();
  }
}
exports.MarkItemVerticalPointerHandle = MarkItemVerticalPointerHandle;
//# sourceMappingURL=MarkItemVerticlePointerHandle.js.map