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
    this.csf = undefined;
  }
  async OnBeforeStartAsync() {
    this.csf = new PhantomArenaMapNpcUi_1.PhantomArenaMapNpcUi();
    await this.csf.CreateThenShowByResourceIdAsync("UiItem_SoundRemnantArenaNpc", this.RootItem);
    this.GetItem(0)?.SetUIActive(true);
    this.csf?.SetActive(false);
  }
  OnSafeUpdate(e, t, a) {
    if (ModelManager_1.ModelManager.MapModel?.IsExtraUiMarkTypeVisible(this.Holder.MapType, this.Holder.MarkType) ?? false) {
      this.GetItem(0)?.SetUIActive(false);
      this.csf?.SetData(this.Holder.MarkId);
      this.csf?.SetActive(true);
    } else {
      this.GetItem(0)?.SetUIActive(true);
      this.csf?.SetActive(false);
    }
  }
  CreateSelectHandle(e) {
    return new PhantomArenaNpcMarkItemSelectHandle_1.PhantomArenaNpcMarkItemSelectHandle(e);
  }
  GetIconItem() {
    return this.csf?.GetRootItem();
  }
}
exports.PhantomArenaNpcMarkItemView = PhantomArenaNpcMarkItemView;
//# sourceMappingURL=PhantomArenaNpcMarkItemView.js.map