"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashSkinGridItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class CalabashSkinGridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnSelected(e) {
    if (e) {
      this.SetSelected(true, true);
    }
    e = this.Data;
    if (e.IsNew) {
      ModelManager_1.ModelManager.CalabashSkinModel.RemoveCalabashSkinRedDot(e.SkinId);
      this.SetNewFlagVisible(false);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  OnRefresh(e, i, a) {
    var t = {
      Type: 4,
      Data: this.Data = e,
      IconPath: e.IsEmptyData ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultCalabashSkinIconPath() : undefined,
      ItemConfigId: e.IsEmptyData ? undefined : e.SkinId,
      IsNewVisible: e.IsNew,
      QualityId: e.IsEmptyData ? 5 : undefined
    };
    this.Apply(t);
    this.SetSelected(i);
    this.SetLockBlackVisible(e.GetIsLock());
    this.RefreshVisible();
    if (e.IsEmptyData) {
      this.SetSkinQualityByParameters(t);
      this.RefreshSkinByDefault(t.QualityId, 17);
    }
  }
  RefreshVisible() {
    var e = this.Data;
    this.SetSelectVisible(e.IsCurrentEquipSkinId());
  }
}
exports.CalabashSkinGridItem = CalabashSkinGridItem;
//# sourceMappingURL=CalabashSkinGridItem.js.map