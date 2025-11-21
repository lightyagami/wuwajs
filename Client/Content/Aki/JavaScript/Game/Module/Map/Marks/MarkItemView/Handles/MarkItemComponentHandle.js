"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemComponentHandle = undefined;
const MapDefine_1 = require("../../../MapDefine");
class MarkItemComponentHandle {
  constructor(t) {
    this.Context = undefined;
    this.ComponentInternal = undefined;
    this.Context = t;
  }
  Init() {
    this.OnInit();
  }
  Update() {
    if (this.Context.MarkItemEntity !== undefined && (!this.Context.MarkItem.IsDestroy || !!MapDefine_1.hasSingleComponentMarkType.has(this.Context.MarkItem.MarkType))) {
      this.OnUpdate();
    }
  }
  SetVisible(t) {
    if (this.Context.MarkItemEntity !== undefined && (!this.Context.MarkItem.IsDestroy || !!MapDefine_1.hasSingleComponentMarkType.has(this.Context.MarkItem.MarkType))) {
      this.OnSetVisible(t);
    }
  }
  ApplyModified() {
    if (this.Context.MarkItemEntity !== undefined && (!this.Context.MarkItem.IsDestroy || !!MapDefine_1.hasSingleComponentMarkType.has(this.Context.MarkItem.MarkType))) {
      this.OnApplyModified();
    }
  }
  Dispose() {
    this.OnDispose();
  }
  OnInit() {}
  OnUpdate() {}
  OnDispose() {
    this.DestroyComponent();
  }
  OnSetVisible(t) {}
  OnApplyModified() {}
  async PreloadComponentAsync() {
    await this.LoadComponentAsync();
  }
  async LoadComponentAsync() {
    return new Promise(t => {
      t(this.ComponentInternal);
    });
  }
  GetOrCreateComponent() {
    return this.ComponentInternal;
  }
  DestroyComponent() {
    if (this.ComponentInternal !== undefined) {
      this.ComponentInternal.RecycleToPool();
      this.ComponentInternal = undefined;
    }
  }
  IsComponentValid(t) {
    return !!t.IsStart || !!t.IsShowOrShowing || !!t.IsHideOrHiding;
  }
}
exports.MarkItemComponentHandle = MarkItemComponentHandle;
//# sourceMappingURL=MarkItemComponentHandle.js.map