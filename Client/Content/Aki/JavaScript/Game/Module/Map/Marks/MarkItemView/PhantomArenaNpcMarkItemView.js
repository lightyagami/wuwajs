"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaNpcMarkItemView = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfigMarkItemView_1 = require("../../../Map/Marks/MarkItemView/ConfigMarkItemView");
const PhantomArenaMapNpcUi_1 = require("../SubPanel/PhantomArenaMapNpcUi");
const PhantomArenaNpcMarkItemSelectHandle_1 = require("./Handles/PhantomArenaNpcMarkItemSelectHandle");
class PhantomArenaNpcMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
    this.Wrf = undefined;
  }
  async OnBeforeStartAsync() {
    this.Wrf = new PhantomArenaMapNpcUi_1.PhantomArenaMapNpcUi();
    await this.Wrf.CreateThenShowByResourceIdAsync("UiItem_SoundRemnantArenaNpc", this.RootItem);
    this.GetItem(0)?.SetUIActive(true);
    this.Wrf?.SetActive(false);
  }
  OnSafeUpdate(e, t, a) {
    if (ModelManager_1.ModelManager.MapModel?.IsExtraUiMarkTypeVisible(this.Holder.MapType, this.Holder.MarkType) ?? false) {
      this.GetItem(0)?.SetUIActive(false);
      this.Wrf?.SetData(this.Holder.MarkId);
      this.Wrf?.SetActive(true);
    } else {
      this.GetItem(0)?.SetUIActive(true);
      this.Wrf?.SetActive(false);
    }
  }
  CreateSelectHandle(e) {
    return new PhantomArenaNpcMarkItemSelectHandle_1.PhantomArenaNpcMarkItemSelectHandle(e);
  }
  GetIconItem() {
    return this.Wrf?.GetRootItem();
  }
}
exports.PhantomArenaNpcMarkItemView = PhantomArenaNpcMarkItemView;
//# sourceMappingURL=PhantomArenaNpcMarkItemView.js.map