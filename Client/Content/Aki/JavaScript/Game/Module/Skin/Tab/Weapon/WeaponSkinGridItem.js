"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponSkinGridItem = undefined;
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class WeaponSkinGridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnSelected(e) {
    if (e) {
      this.SetSelected(true, true);
    }
    e = this.Data;
    if (e.IsNew) {
      ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.WeaponSkinRedDot, e.SkinId);
      this.SetNewFlagVisible(false);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  OnRefresh(e, i, o) {
    var a = {
      Type: 4,
      Data: this.Data = e,
      IconPath: e.IsEmptyData ? ConfigManager_1.ConfigManager.SkinConfig.GetDefaultWeaponSkinIconPath() : undefined,
      ItemConfigId: e.IsEmptyData ? undefined : e.SkinId,
      IsNewVisible: e.IsNew
    };
    this.Apply(a);
    this.SetSelected(i);
    this.SetLockBlackVisible(e.GetIsLock());
    this.RefreshVisible();
  }
  RefreshVisible() {
    var e = this.Data;
    this.SetSelectVisible(e.IsCurrentEquipSkinId());
    if (!e.IsCurrentEquipSkinId() && (e = ModelManager_1.ModelManager.WeaponSkinModel?.GetRoleIdBySkinId(e.SkinId))) {
      e = ModelManager_1.ModelManager.RoleSkinModel?.GetRoleSkinDataByRoleId(e);
      this.SetRoleHead(e?.GetItemId());
    } else {
      this.SetRoleHead(undefined);
    }
  }
}
exports.WeaponSkinGridItem = WeaponSkinGridItem;
//# sourceMappingURL=WeaponSkinGridItem.js.map