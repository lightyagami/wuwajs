"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MarkItemChildIconHandle = void 0;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine"),
  MarkChildIconComponent_1 = require("../Components/MarkChildIconComponent"),
  MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemChildIconHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  OnUpdate() {
    var e = this.Context.MarkItem;
    e.ShowSecondaryUiMultiMapIcon() ? (this.SetVisible(!0), this.Context.MarkItemEntity.Resource.ChildIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.IsSelectThisFloor ? WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH : WorldMapDefine_1.MULTI_MAP_ICON_PATH)) : this.QH1() ? this.SetVisible(!0) : this.SetVisible(!1)
  }
  QH1() {
    var e = this.Context.MarkItemEntity.GetComponent(15);
    return 6 === e?.MapMarkConfig?.RelativeSubType && !!(ModelManager_1.ModelManager.MoraleModel?.GetFlagDataByMarkId(e.MapMarkConfig.MarkId))?.HasBoxCanGet() && (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.MORALE_FLAG_BOX_ICON_PATH), this.Context.MarkItemEntity.Resource.ChildIconPath = e, !0)
  }
  async LoadComponentAsync() {
    return void 0 === this.ComponentInternal && (this.ComponentInternal = new MarkChildIconComponent_1.MarkChildIconComponent, await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkChildNode_Prefab", this.Context.MarkComponentContainer)), this.ComponentInternal
  }
  GetOrCreateComponent() {
    return void 0 === this.ComponentInternal && this.LoadComponentAsync().then(() => {
      this.ComponentInternal?.GetRootItem().SetUIRelativeScale3D(this.Context.MarkItem.CornerScaleVector), this.ApplyModified()
    }), this.ComponentInternal
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(7, e)
  }
  OnApplyModified() {
    var e = this.Context.MarkItemEntity.ViewLifeCircle,
      i = e.IsChildViewVisible(7),
      t = this.Context.MarkItemEntity.Resource.IsChildIconPathDirty;
    if (i && t) {
      var t = this.GetOrCreateComponent();
      if (!this.IsComponentValid(t)) return;
      t.Icon = this.Context.MarkItemEntity.Resource.ChildIconPath
    }
    e.IsChildViewStateDirty(7) && (t = this.GetOrCreateComponent(), this.IsComponentValid(t)) && (e.SetChildViewVisibleClean(7), t.SetActive(i))
  }
}
exports.MarkItemChildIconHandle = MarkItemChildIconHandle;
//# sourceMappingURL=MarkItemChildIconHandle.js.map