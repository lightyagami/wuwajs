"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropVisionRecoveryItemGrid = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CalabashDefine_1 = require("../../../Calabash/CalabashDefine");
const SelectablePropMediumItemGrid_1 = require("./SelectablePropMediumItemGrid");
class SelectablePropVisionRecoveryItemGrid extends SelectablePropMediumItemGrid_1.SelectablePropMediumItemGrid {
  RefreshUi(e) {
    this.SelectablePropData = e;
    var a;
    var i = ModelManager_1.ModelManager.InventoryModel;
    var r = e.IncId;
    var t = e.ItemId;
    var o = e.ItemDataType;
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    let n = undefined;
    if (n = r > 0 ? i.GetAttributeItemData(r) : i.GetCommonItemData(t)) {
      i = this.SelectablePropData.SelectedCount;
      a = this.SelectablePropData.Count;
      e = {
        Type: 4,
        Data: e,
        ItemConfigId: t,
        StarLevel: s.QualityId,
        ReduceButtonInfo: {
          IsVisible: i > 0,
          LongPressConfigId: 1
        }
      };
      if (o === 3) {
        s = (t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(r)).GetPhantomLevel();
        o = t.GetExp();
        e.ItemConfigId = t.GetConfigId(true);
        e.QualityId = t.GetQuality();
        e.Level = t.GetCost();
        e.IsLevelTextUseChangeColor = true;
        e.BottomTextId = "VisionLevel";
        e.IsDisable = s > 1 || o > 0 || this.SelectablePropData.OnlyGold && t.GetQuality() < CalabashDefine_1.VISION_GOLD_QUALITY;
        e.BottomTextParameter = [t.GetPhantomLevel()];
        e.VisionFetterGroupId = t.GetFetterGroupId();
        e.IsOmitBottomText = true;
        e.IsLockVisible = t.GetIsLock();
        e.IsDeprecate = t.GetIsDeprecated();
      } else if (i > 0) {
        e.BottomTextId = "Text_ItemEnoughText_Text";
        e.BottomTextParameter = [i, a];
      } else {
        e.BottomText = a.toString();
      }
      this.Apply(e);
    }
  }
}
exports.SelectablePropVisionRecoveryItemGrid = SelectablePropVisionRecoveryItemGrid;
//# sourceMappingURL=SelectablePropVisionRecoveryItemGrid.js.map