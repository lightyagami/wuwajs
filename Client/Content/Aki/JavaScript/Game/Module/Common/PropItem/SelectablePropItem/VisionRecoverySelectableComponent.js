"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoverySelectableComponent = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const SelectableComponent_1 = require("./SelectableComponent");
const SelectablePropVisionRecoveryItemGrid_1 = require("./SelectablePropVisionRecoveryItemGrid");
class VisionRecoverySelectableComponent extends SelectableComponent_1.SelectableComponent {
  constructor() {
    super(...arguments);
    this.InitItem = () => {
      var e = new SelectablePropVisionRecoveryItemGrid_1.SelectablePropVisionRecoveryItemGrid();
      e.BindLongPress(1, this.AddFunction, this.CanItemLongPress);
      e.BindReduceLongPress(this.ReduceFunction);
      e.BindAfterApply(this.OnAfterApplyMediumItemGrid);
      e.BindOnCanExecuteChange(this.OnCanExecuteChange);
      return e;
    };
  }
  CanAddMaterial(e, o = false) {
    var r = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e.IncId);
    if (r.GetPhantomLevel() > 0 || r.GetExp() > 0) {
      if (o) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Text_EchoFull_Text");
      }
      return false;
    } else if (e.GetIsLock()) {
      if (o) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponLockTipsText");
      }
      return false;
    } else {
      return (!(r = this.GetSelectedData(e))?.SelectedCount || r.SelectedCount !== e.Count) && !(!r && this.SelectedDataList.length >= this.MaxSize ? (o && ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Text_EchoLimit_Text"), 1) : this.Data.CheckIfCanAddFunction && !this.Data.CheckIfCanAddFunction(this.SelectedDataList, e.IncId, e.ItemId, 1));
    }
  }
}
exports.VisionRecoverySelectableComponent = VisionRecoverySelectableComponent;
//# sourceMappingURL=VisionRecoverySelectableComponent.js.map