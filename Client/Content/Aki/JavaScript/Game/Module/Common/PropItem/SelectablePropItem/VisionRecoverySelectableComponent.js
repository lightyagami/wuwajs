"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoverySelectableComponent = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CalabashDefine_1 = require("../../../Calabash/CalabashDefine");
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
    var r;
    var l = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e.IncId);
    if (l.GetPhantomLevel() > 0 || l.GetExp() > 0) {
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
      return (!(r = this.GetSelectedData(e))?.SelectedCount || r.SelectedCount !== e.Count) && !(!r && this.SelectedDataList.length >= this.MaxSize ? (o && ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Text_EchoLimit_Text"), 1) : e.OnlyGold && l.GetQuality() < CalabashDefine_1.VISION_GOLD_QUALITY ? (o && ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("DirectionalFusion_OnlyGold"), 1) : this.Data.CheckIfCanAddFunction && !this.Data.CheckIfCanAddFunction(this.SelectedDataList, e.IncId, e.ItemId, 1));
    }
  }
}
exports.VisionRecoverySelectableComponent = VisionRecoverySelectableComponent;
//# sourceMappingURL=VisionRecoverySelectableComponent.js.map