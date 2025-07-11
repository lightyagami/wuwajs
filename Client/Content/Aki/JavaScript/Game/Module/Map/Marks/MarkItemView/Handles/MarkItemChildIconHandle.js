"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemChildIconHandle = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const WorldMapDefine_1 = require("../../../../WorldMap/WorldMapDefine");
const MarkChildIconComponent_1 = require("../Components/MarkChildIconComponent");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemChildIconHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  OnUpdate() {
    var e = this.Context.MarkItem;
    if (e.ShowSecondaryUiMultiMapIcon()) {
      this.SetVisible(true);
      this.Context.MarkItemEntity.Resource.ChildIconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.IsSelectThisFloor ? WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH : WorldMapDefine_1.MULTI_MAP_ICON_PATH);
    } else if (this.A$1()) {
      this.SetVisible(true);
    } else {
      this.SetVisible(false);
    }
  }
  A$1() {
    var e = this.Context.MarkItemEntity.GetComponent(15);
    return e?.MapMarkConfig?.RelativeSubType === 6 && !!ModelManager_1.ModelManager.MoraleModel?.GetFlagDataByMarkId(e.MapMarkConfig.MarkId)?.HasBoxCanGet() && (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(WorldMapDefine_1.MORALE_FLAG_BOX_ICON_PATH), this.Context.MarkItemEntity.Resource.ChildIconPath = e, true);
  }
  async LoadComponentAsync() {
    if (this.ComponentInternal === undefined) {
      this.ComponentInternal = new MarkChildIconComponent_1.MarkChildIconComponent();
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkChildNode_Prefab", this.Context.MarkComponentContainer);
    }
    return this.ComponentInternal;
  }
  GetOrCreateComponent() {
    if (this.ComponentInternal === undefined) {
      this.LoadComponentAsync().then(() => {
        this.ComponentInternal?.GetRootItem().SetUIRelativeScale3D(this.Context.MarkItem.CornerScaleVector);
        this.ApplyModified();
      });
    }
    return this.ComponentInternal;
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(7, e);
  }
  OnApplyModified() {
    var e = this.Context.MarkItemEntity.ViewLifeCircle;
    var i = e.IsChildViewVisible(7);
    var t = this.Context.MarkItemEntity.Resource.IsChildIconPathDirty;
    if (i && t) {
      var t = this.GetOrCreateComponent();
      if (!this.IsComponentValid(t)) {
        return;
      }
      t.Icon = this.Context.MarkItemEntity.Resource.ChildIconPath;
    }
    if (e.IsChildViewStateDirty(7) && (t = this.GetOrCreateComponent(), this.IsComponentValid(t))) {
      e.SetChildViewVisibleClean(7);
      t.SetActive(i);
    }
  }
}
exports.MarkItemChildIconHandle = MarkItemChildIconHandle;
//# sourceMappingURL=MarkItemChildIconHandle.js.map