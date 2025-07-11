"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteAssemblyGridItem = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RouletteAssemblyGridItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRefresh(e, t, r) {
    var s = {
      Type: 4,
      QualityType: "MediumItemGridQualitySpritePath",
      Data: e,
      IsOmitBottomText: false
    };
    if (e.GridType === 2) {
      s.QualityId = e.QualityId;
    } else {
      s.QualityId = 1;
    }
    var i = e.RelativeIndex !== 0;
    if (i) {
      s.SortIndex = e.RelativeIndex;
    }
    switch (e.GridType) {
      case 0:
        var o = e;
        s.SpriteIconPath = o.IconPath;
        s.BottomTextId = o.Name;
        s.IsNewVisible = o.HasRedDot;
        break;
      case 1:
        o = e;
        if (o.IconPath.includes("Atlas")) {
          s.SpriteIconPath = o.IconPath;
        } else {
          s.IconPath = o.IconPath;
        }
        s.BottomTextId = e.Name;
        break;
      case 2:
        var o = e;
        s.ItemConfigId = o.Id;
        s.BottomText = o.ItemNum.toString();
        var o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e.Id);
        if (o) {
          o = o.GetConfig();
          s.BuffIconType = o.ItemBuffType;
        }
    }
    this.Apply(s);
    this.Data.Index = r;
    this.SetSelected(t);
  }
  RefreshRedDot() {
    var e;
    if (this.Data.GridType === 0) {
      e = this.Data;
      this.SetNewVisible(e.HasRedDot);
    }
  }
  OnSelected(e) {
    this.GetItemGridExtendToggle().SetToggleState(1, e);
  }
  OnDeselected(e) {
    this.GetItemGridExtendToggle().SetToggleState(0, e);
  }
}
exports.RouletteAssemblyGridItem = RouletteAssemblyGridItem;
//# sourceMappingURL=RouletteAssemblyGridItem.js.map