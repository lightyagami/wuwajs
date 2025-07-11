"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssSelectableComponent = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const DangoAbyssItemMediumItemGrid_1 = require("./DangoAbyssItemMediumItemGrid");
class DangoAbyssSelectableComponent extends SelectableComponent_1.SelectableComponent {
  constructor(e) {
    super();
    this.Sh1 = true;
    this.InitItem = () => {
      var e = new DangoAbyssItemMediumItemGrid_1.DangoAbyssItemPropMediumItemGrid();
      e.StateForEquip = this.Sh1;
      e.BindLongPress(1, this.AddFunction, this.CanItemLongPress);
      e.BindReduceLongPress(this.ReduceFunction);
      e.BindOnCanExecuteChange(this.OnCanExecuteChange);
      return e;
    };
    this.Sh1 = e;
  }
  CanAddMaterial(e, t = false) {
    var o = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e.IncId);
    if (o.GetIsLock() && !this.Sh1) {
      if (t) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponLockTipsText");
      }
      return false;
    } else if (o.GetCanRecovery() || this.Sh1) {
      return (!(o = this.GetSelectedData(e))?.SelectedCount || o.SelectedCount !== e.Count) && !(!o && this.SelectedDataList.length >= this.MaxSize && !this.Data.IsSingleSelected ? (t && ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponFullMaterialText"), 1) : this.Data.CheckIfCanAddFunction && !this.Data.CheckIfCanAddFunction(this.SelectedDataList, e.IncId, e.ItemId, 1));
    } else {
      if (t) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("EquipLockTipsText");
      }
      return false;
    }
  }
  RemoveAndRefresh(e) {
    var t = this.GetLoopScrollViewIndex(e, -1);
    var o = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e);
    if (!(t < 0) && !!o) {
      if (o.GetIsLock()) {
        this.RemoveSelectedDataByIncId(e);
      }
      this.RefreshAllByDisplay();
      this.UpdateChangeItemSelectList();
    }
  }
}
exports.DangoAbyssSelectableComponent = DangoAbyssSelectableComponent;
//# sourceMappingURL=DangoAbyssSelectableComponent.js.map