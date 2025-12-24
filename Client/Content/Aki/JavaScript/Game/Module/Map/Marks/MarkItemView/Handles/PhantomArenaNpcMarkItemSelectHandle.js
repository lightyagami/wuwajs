"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaNpcMarkItemSelectHandle = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const MarkSelectComponent_1 = require("../Components/MarkSelectComponent");
const PhantomArenaNpcMarkSelectComponent_1 = require("../Components/SubComponents/PhantomArenaNpcMarkSelectComponent");
const MarkItemSelectHandle_1 = require("./MarkItemSelectHandle");
class PhantomArenaNpcMarkItemSelectHandle extends MarkItemSelectHandle_1.MarkItemSelectHandle {
  constructor() {
    super(...arguments);
    this.PFf = undefined;
    this.AFf = undefined;
  }
  async LoadComponentAsync() {
    if (ModelManager_1.ModelManager.MapModel?.IsExtraUiMarkTypeVisible(2, 45)) {
      if (this.AFf === undefined) {
        this.AFf = new PhantomArenaNpcMarkSelectComponent_1.PhantomArenaNpcMarkSelectComponent();
        await this.AFf?.CreateByPoolResourceIdAsync("UiItem_SoundRemnantArenaNpc_Select", this.Context.MarkRootItem);
      }
      this.ComponentInternal = this.AFf;
    } else {
      if (this.PFf === undefined) {
        this.PFf = new MarkSelectComponent_1.MarkSelectComponent();
        await this.PFf.CreateByPoolResourceIdAsync("UiItem_MarkChoose_Prefab", this.Context.MarkComponentContainer);
      }
      this.ComponentInternal = this.PFf;
    }
    return this.ComponentInternal;
  }
  GetOrCreateComponent() {
    if (ModelManager_1.ModelManager.MapModel?.IsExtraUiMarkTypeVisible(2, 45)) {
      if (this.AFf === undefined) {
        this.LoadComponentAsync().then(() => {
          this.ApplyModified();
        });
      }
      this.ComponentInternal = this.AFf;
    } else {
      if (this.PFf === undefined) {
        this.LoadComponentAsync().then(() => {
          this.ApplyModified();
        });
      }
      this.ComponentInternal = this.PFf;
    }
    return this.ComponentInternal;
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
exports.PhantomArenaNpcMarkItemSelectHandle = PhantomArenaNpcMarkItemSelectHandle;
//# sourceMappingURL=PhantomArenaNpcMarkItemSelectHandle.js.map