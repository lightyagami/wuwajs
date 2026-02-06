"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteAssemblyGridItem = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const gridRedDotInfoList = [{
  Id: 1007,
  CheckFunction: e => ModelManager_1.ModelManager.PhantomInteractModel.CheckAnyPhantomInteractUnlockRedDot()
}, {
  Id: 6008,
  CheckFunction: e => ModelManager_1.ModelManager.PhantomInteractModel.CheckAnyPhantomInteractUnlockRedDot()
}];
class RouletteAssemblyGridItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnStart() {
    this.SetUseFixedAsync(true);
  }
  OnRefresh(t, e, r) {
    var o = {
      Type: 4,
      QualityType: "MediumItemGridQualitySpritePath",
      Data: t,
      IsOmitBottomText: false,
      IsNewOverRedDot: true
    };
    if (t.GridType === 2) {
      o.QualityId = t.QualityId;
    } else {
      o.QualityId = 1;
    }
    var i = t.RelativeIndex !== 0;
    if (i) {
      o.SortIndex = t.RelativeIndex;
    }
    var i = gridRedDotInfoList.find(e => e.Id === t.Id);
    if (i) {
      o.IsRedDotVisible = i.CheckFunction(t);
    }
    switch (t.GridType) {
      case 0:
        var s = t;
        o.SpriteIconPath = s.IconPath;
        o.BottomTextId = s.Name;
        o.IsNewVisible = s.HasNew;
        break;
      case 1:
        s = t;
        if (s.IconPath.includes("Atlas")) {
          o.SpriteIconPath = s.IconPath;
        } else {
          o.IconPath = s.IconPath;
        }
        o.BottomTextId = t.Name;
        break;
      case 2:
        var s = t;
        o.ItemConfigId = s.Id;
        o.BottomText = s.ItemNum.toString();
        var s = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(t.Id);
        if (s) {
          s = s.GetConfig();
          o.BuffIconType = s.ItemBuffType;
        }
    }
    this.Apply(o);
    this.Data.Index = r;
    this.SetSelected(e);
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