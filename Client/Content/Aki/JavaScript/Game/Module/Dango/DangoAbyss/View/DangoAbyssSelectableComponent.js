"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssSelectableComponent = void 0;
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  DangoAbyssItemMediumItemGrid_1 = require("./DangoAbyssItemMediumItemGrid");
class DangoAbyssSelectableComponent extends SelectableComponent_1.SelectableComponent {
  constructor(e) {
    super(), this.Ja1 = !0, this.InitItem = () => {
      var e = new DangoAbyssItemMediumItemGrid_1.DangoAbyssItemPropMediumItemGrid;
      return e.StateForEquip = this.Ja1, e.BindLongPress(1, this.AddFunction, this.CanItemLongPress), e.BindReduceLongPress(this.ReduceFunction), e.BindOnCanExecuteChange(this.OnCanExecuteChange), e
    }, this.Ja1 = e
  }
  CanAddMaterial(e, t = !1) {
    var o = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e.IncId);
    return o.GetIsLock() && !this.Ja1 ? (t && ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponLockTipsText"), !1) : o.GetCanRecovery() || this.Ja1 ? !((o = this.GetSelectedData(e))?.SelectedCount && o.SelectedCount === e.Count || (!o && this.SelectedDataList.length >= this.MaxSize && !this.Data.IsSingleSelected ? (t && ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponFullMaterialText"), 1) : this.Data.CheckIfCanAddFunction && !this.Data.CheckIfCanAddFunction(this.SelectedDataList, e.IncId, e.ItemId, 1))) : (t && ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("EquipLockTipsText"), !1)
  }
  RemoveAndRefresh(e) {
    var t = this.GetLoopScrollViewIndex(e, -1),
      o = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e);
    t < 0 || !o || (o.GetIsLock() && this.RemoveSelectedDataByIncId(e), this.RefreshAllByDisplay(), this.UpdateChangeItemSelectList())
  }
}
exports.DangoAbyssSelectableComponent = DangoAbyssSelectableComponent;
//# sourceMappingURL=DangoAbyssSelectableComponent.js.map