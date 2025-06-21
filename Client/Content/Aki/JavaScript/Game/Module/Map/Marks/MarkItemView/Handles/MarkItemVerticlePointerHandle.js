"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MarkItemVerticalPointerHandle = void 0;
const MarkVerticalPointerComponent_1 = require("../Components/MarkVerticalPointerComponent"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle"),
  POINTER_RANGE = 2e3;
class MarkItemVerticalPointerHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  constructor() {
    super(...arguments), this.ComponentInternal = void 0
  }
  UpdateVerticalPointerType(t, e) {
    this.Context.MarkItemEntity.ViewLifeCircle.EnableVerticalPointer ? (t = this.qRi(t, e), this.Context.MarkItemEntity.ViewLifeCircle.VerticalPointerType = t, this.SetVisible(0 !== t)) : this.SetVisible(!1)
  }
  qRi(t, e) {
    return 2 === this.Context.MarkItem.MapType || (t = t.Z - e.Z, Math.abs(t) < POINTER_RANGE) ? 0 : t < 0 ? 1 : 2
  }
  async LoadComponentAsync() {
    return void 0 === this.ComponentInternal && (this.ComponentInternal = new MarkVerticalPointerComponent_1.MarkVerticalPointerComponent, await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkArrow_Prefab", this.Context.MarkRootItem)), this.ComponentInternal
  }
  GetOrCreateComponent() {
    return void 0 === this.ComponentInternal && this.LoadComponentAsync().then(() => {
      var t;
      void 0 !== this.ComponentInternal && (t = this.Context.MarkItem, this.ComponentInternal.GetRootItem().SetUIRelativeScale3D(t.CornerScaleVector), this.ApplyModified())
    }), this.ComponentInternal
  }
  OnSetVisible(t) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(8, t)
  }
  OnApplyModified() {
    var t = this.Context.MarkItemEntity.ViewLifeCircle,
      e = t.IsChildViewStateDirty(8),
      i = t.IsVerticalPointerTypeDirty;
    (e || i) && (e = this.GetOrCreateComponent(), this.IsComponentValid(e)) && (i = t.IsChildViewVisible(8), t.SetChildViewVisibleClean(8), t.SetVerticalPointerTypeClean(), e.SetPointerType(t.VerticalPointerType), e.SetActive(i))
  }
  OnDispose() {
    this.DestroyComponent(), super.OnDispose()
  }
}
exports.MarkItemVerticalPointerHandle = MarkItemVerticalPointerHandle;
//# sourceMappingURL=MarkItemVerticlePointerHandle.js.map