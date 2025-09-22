"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemGridComponent = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class ItemGridComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.sit = undefined;
    this.NPt = undefined;
    this.OPt = undefined;
    this.kPt = false;
    this.FPt = false;
    this.VPt = undefined;
    this.OnComponentVisibleChanged = undefined;
    this.wYu = false;
  }
  Initialize(t, i) {
    if (!this.kPt) {
      this.sit = t;
      this.NPt = this.GetResourceId();
      this.wYu = i;
      this.OnInitialize();
      this.kPt = true;
    }
  }
  async Load() {
    this.VPt = new CustomPromise_1.CustomPromise();
    if (this.wYu) {
      await this.CreateByResourceIdAsync(this.NPt, this.sit);
    } else {
      await this.CreateThenShowByResourceIdAsync(this.NPt, this.sit);
    }
    this.VPt.SetResult(this);
    return this;
  }
  async GetAsync() {
    if (this.IsCreating) {
      return this.VPt.Promise;
    } else {
      return this;
    }
  }
  OnStartImplement() {
    this.FPt = true;
    this.OnActivate();
    if (this.OPt !== undefined) {
      this.OnRefresh(this.OPt);
    }
  }
  Refresh(t) {
    this.OPt = t;
    if (!this.InAsyncLoading()) {
      this.OnRefresh(t);
    }
  }
  OnBeforeDestroyImplement() {
    if (this.FPt) {
      this.OnDeactivate();
    }
    this.FPt = false;
    this.kPt = false;
    this.OPt = undefined;
  }
  OnInitialize() {}
  OnActivate() {}
  OnDeactivate() {}
  OnRefresh(t) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 37, "没有实现 OnRefresh", ["ComponentName", this.constructor.name]);
    }
  }
  GetResourceId() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 37, "没有实现 GetResourceId", ["ComponentName", this.constructor.name]);
    }
  }
  GetLayoutLevel() {
    return 0;
  }
  SetActive(t) {
    if (this.wYu) {
      super.SetActive(t);
      this.OnComponentVisibleChanged?.(this, t);
    } else if (!t || !this.IsShowOrShowing) {
      super.SetActive(t);
    }
  }
  SetHierarchyIndex(t) {
    if (this.RootItem.GetHierarchyIndex() !== t) {
      this.RootItem.SetHierarchyIndex(t);
    }
  }
}
exports.ItemGridComponent = ItemGridComponent;
//# sourceMappingURL=ItemGridComponent.js.map