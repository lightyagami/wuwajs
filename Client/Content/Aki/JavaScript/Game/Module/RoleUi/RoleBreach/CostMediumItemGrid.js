"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CostMediumItemGrid = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class CostMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(t, e, o) {
    var r = t.ItemId;
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r);
    if (i) {
      var m = {
        Type: 4
      };
      if (t.OnlyTextFlag) {
        m.Type = 4;
        m.Data = t;
        m.ItemConfigId = r;
        m.StarLevel = i.QualityId;
        m.BottomText = t.Count.toString();
      } else {
        var d = t.SelectedCount;
        var s = t.Count;
        let e = "Text_ItemEnoughText_Text";
        if (d < s) {
          e = "Text_ItemNotEnoughText_Text";
        }
        d = [d, s];
        m.Data = t;
        m.ItemConfigId = r;
        m.StarLevel = i.QualityId;
        m.BottomTextId = e;
        m.BottomTextParameter = d;
      }
      m.IsOmitBottomText = false;
      this.Apply(m);
    }
  }
}
exports.CostMediumItemGrid = CostMediumItemGrid;
//# sourceMappingURL=CostMediumItemGrid.js.map