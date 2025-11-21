"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropVisionRecoveryItemGrid = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SelectablePropMediumItemGrid_1 = require("./SelectablePropMediumItemGrid");
class SelectablePropVisionRecoveryItemGrid extends SelectablePropMediumItemGrid_1.SelectablePropMediumItemGrid {
  RefreshUi(e) {
    this.SelectablePropData = e;
    var r;
    var i = ModelManager_1.ModelManager.InventoryModel;
    var t = e.IncId;
    var o = e.ItemId;
    var a = e.ItemDataType;
    var n = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(o);
    let s = undefined;
    if (s = t > 0 ? i.GetAttributeItemData(t) : i.GetCommonItemData(o)) {
      i = this.SelectablePropData.SelectedCount;
      r = this.SelectablePropData.Count;
      e = {
        Type: 4,
        Data: e,
        ItemConfigId: o,
        StarLevel: n.QualityId,
        ReduceButtonInfo: {
          IsVisible: i > 0,
          LongPressConfigId: 1
        }
      };
      if (a === 3) {
        n = (o = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t)).GetPhantomLevel();
        a = o.GetExp();
        e.ItemConfigId = o.GetConfigId(true);
        e.Level = o.GetCost();
        e.IsLevelTextUseChangeColor = true;
        e.BottomTextId = "VisionLevel";
        e.IsDisable = n > 1 || a > 0;
        e.BottomTextParameter = [o.GetPhantomLevel()];
        e.VisionFetterGroupId = o.GetFetterGroupId();
        e.IsOmitBottomText = true;
        e.IsLockVisible = o.GetIsLock();
        e.IsDeprecate = o.GetIsDeprecated();
      } else if (i > 0) {
        e.BottomTextId = "Text_ItemEnoughText_Text";
        e.BottomTextParameter = [i, r];
      } else {
        e.BottomText = r.toString();
      }
      this.Apply(e);
    }
  }
}
exports.SelectablePropVisionRecoveryItemGrid = SelectablePropVisionRecoveryItemGrid;
//# sourceMappingURL=SelectablePropVisionRecoveryItemGrid.js.map