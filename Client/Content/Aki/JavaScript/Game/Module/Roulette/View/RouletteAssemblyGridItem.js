"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteAssemblyGridItem = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const MediumItemGridRedDotComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridRedDotComponent");
const gridRedDotInfoList = [{
  Id: 1007,
  RedDotName: "RedDotPhantomInteractRouletteGrid"
}];
class RouletteAssemblyGridItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.CurrentRedDotName = undefined;
    this.RedDotItem = undefined;
    this.CurrentShowNew = false;
    this.CurrentShowRedDot = false;
  }
  OnStart() {
    this.SetUseFixedAsync(true);
  }
  OnRefresh(t, e, i) {
    var s = {
      Type: 4,
      QualityType: "MediumItemGridQualitySpritePath",
      Data: t,
      IsOmitBottomText: false
    };
    this.JLf(t.Id);
    if (t.GridType === 2) {
      s.QualityId = t.QualityId;
    } else {
      s.QualityId = 1;
    }
    var o = t.RelativeIndex !== 0;
    if (o) {
      s.SortIndex = t.RelativeIndex;
    }
    switch (t.GridType) {
      case 0:
        var r = t;
        s.SpriteIconPath = r.IconPath;
        s.BottomTextId = r.Name;
        s.IsNewVisible = r.HasNew;
        this.CurrentShowNew = r.HasNew;
        break;
      case 1:
        r = t;
        if (r.IconPath.includes("Atlas")) {
          s.SpriteIconPath = r.IconPath;
        } else {
          s.IconPath = r.IconPath;
        }
        s.BottomTextId = t.Name;
        break;
      case 2:
        var r = t;
        s.ItemConfigId = r.Id;
        s.BottomText = r.ItemNum.toString();
        var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(t.Id);
        if (r) {
          r = r.GetConfig();
          s.BuffIconType = r.ItemBuffType;
        }
    }
    this.Apply(s);
    this.Data.Index = i;
    this.SetSelected(e);
    this.RefreshNewAndRedDot();
  }
  RefreshNewAndRedDot() {
    var t;
    if (this.Data.GridType === 0 && (t = this.Data, this.CurrentShowNew = t.HasNew, this.SetNewVisible(t.HasNew), this.RedDotItem?.SetUIActive(this.CurrentShowRedDot && !this.CurrentShowNew), t = t?.RelativeIndex) && t !== 0) {
      if (this.CurrentShowRedDot) {
        this.SetSortIndex(undefined);
      } else {
        this.SetSortIndex(t);
      }
    }
  }
  OnSelected(t) {
    this.GetItemGridExtendToggle().SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetItemGridExtendToggle().SetToggleState(0, t);
  }
  async JLf(e) {
    var t;
    var i = gridRedDotInfoList.find(t => t.Id === e);
    if (!!this.CurrentRedDotName && (!i || this.CurrentRedDotName !== i.RedDotName)) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.CurrentRedDotName, this.RedDotItem);
      this.RedDotItem?.SetUIActive(false);
      this.CurrentRedDotName = undefined;
      this.CurrentShowRedDot = false;
      this.RefreshNewAndRedDot();
    }
    if (i && this.CurrentRedDotName !== i?.RedDotName) {
      this.CurrentRedDotName = i.RedDotName;
      if (this.RedDotItem === undefined) {
        this.SetUseFixedAsync(true);
        this.SetRedDotVisible(true);
        this.SetRedDotVisible(false);
        t = await this.GetItemGridComponent(MediumItemGridRedDotComponent_1.MediumItemGridRedDotComponent)?.GetAsync();
        this.RedDotItem = t?.GetRootItem();
      }
      RedDotController_1.RedDotController.BindRedDot(i.RedDotName, this.RedDotItem, t => {
        this.CurrentShowRedDot = t;
        this.RefreshNewAndRedDot();
      });
    }
  }
}
exports.RouletteAssemblyGridItem = RouletteAssemblyGridItem;
//# sourceMappingURL=RouletteAssemblyGridItem.js.map