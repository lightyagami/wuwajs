"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevDetailSubItemList = undefined;
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
class RoleDevDetailSubItemList extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
  }
  OnStart() {}
  OnRefresh(e, t, r) {
    this.$8i = e;
    this.SetSelected(t);
    this.Pad(e);
  }
  Refresh(e) {
    this.OnRefresh(e, false, 0);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  Pad(e) {
    this.SetSelectVisible(false);
    this.SetExtendToggleEnable(false);
    var t;
    var r = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevStaticConfig();
    if (e.ItemId === r?.UnknownItemId) {
      this.SetIconByPath(r?.UnknownItemIcon ?? "");
      this.SetToggleInteractive(false);
      this.SetBottomTextVisible(false);
      this.SetQuality(undefined);
    } else {
      t = (r = ModelManager_1.ModelManager?.InventoryModel?.GetItemCountByConfigId(e.ItemId) ?? 0) >= e.RequiredCount ? CommonDefine_1.MATERIAL_ENOUGHT_TEXT_PATTERN : CommonDefine_1.MATERIAL_NOT_ENOUGHT_TEXT_PATTERN;
      t = StringUtils_1.StringUtils.Format(t, r.toString(), e.RequiredCount.toString());
      r = {
        Type: 4,
        ItemConfigId: e.ItemId,
        BottomText: t,
        Data: e
      };
      this.Apply(r);
      this.SetToggleInteractive(true);
    }
  }
  static CreateMaterialData(e, t) {
    return {
      ItemId: e,
      RequiredCount: t
    };
  }
  OnExtendToggleClicked() {
    var e = this.$8i;
    if (e && e.ItemId !== ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevStaticConfig()?.UnknownItemId) {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.ItemId);
    }
  }
  OnCanExecuteChange() {
    return false;
  }
}
exports.RoleDevDetailSubItemList = RoleDevDetailSubItemList;
//# sourceMappingURL=RoleDevDetailSubItemList.js.map