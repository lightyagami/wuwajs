"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeMediumItemGrid = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const ComposeController_1 = require("../ComposeController");
class ComposeMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  OnRefresh(e, o, r) {
    var t = e.ConfigId;
    var a = e.IsUnlock > 0;
    let i = 0;
    let s = true;
    switch (e.MainType) {
      case 1:
        var m = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId);
        i = m?.ItemId ?? 0;
        var m = e;
        s = m.SubType === 35 || ComposeController_1.ComposeController.CheckCanReagentProduction(t);
        break;
      case 2:
        m = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId);
        i = m?.ItemId ?? 0;
        m = e;
        s = ComposeController_1.ComposeController.CheckCanStructure(m.ConfigId);
        break;
      case 3:
        m = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId);
        i = m?.ItemId ?? 0;
        m = e;
        if (ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(m.ConfigId).IsUnlock === 0) {
          s = false;
        } else {
          s = ComposeController_1.ComposeController.CheckCanPurification(m.ConfigId);
        }
        break;
      case 4:
        i = e.ConfigId;
        m = e;
        if (ModelManager_1.ModelManager.ComposeModel.GetExchangeDataById(m.ConfigId).IsUnlock !== 0) {
          s = ComposeController_1.ComposeController.CheckCanExchange(m.ConfigId);
        } else {
          s = false;
        }
    }
    var n;
    var l;
    var d = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
    if (d) {
      l = e.IsLimitForever;
      n = {
        IsLimitTimeItem: (n = e.TotalMakeCountInLimitTime > 0) && l,
        IsRefreshItem: n && !l,
        BuffItem: d.ItemBuffType
      };
      l = {
        Type: 4,
        Data: e,
        ItemConfigId: i,
        StarLevel: d.QualityId,
        BottomTextId: d.Name,
        IsProhibit: !a,
        IsNewVisible: e.IsNew,
        IsDisable: a && !s,
        IsOmitBottomText: true,
        ComposeIconTag: a ? n : undefined
      };
      this.Apply(l);
      this.SetSelected(o);
    }
  }
}
exports.ComposeMediumItemGrid = ComposeMediumItemGrid;
//# sourceMappingURL=ComposeMediumItemGrid.js.map