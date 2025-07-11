"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const ComposeController_1 = require("../ComposeController");
class ComposeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.oft = undefined;
    this.BTt = s => {
      if (this.oft) {
        this.oft(this.fGt);
        this.bGt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[6, UE.UIExtendToggle], [10, UE.UISprite], [11, UE.UITexture], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [12, UE.UIText]];
    this.BtnBindInfo = [[6, this.BTt]];
  }
  Refresh(s, i, t) {
    this.fGt = s;
    this.P5e();
    this.BGt();
    this.Kbe();
    this.Rxt();
    this.qGt();
    this.bGt();
    this.N6e(i, false);
  }
  P5e() {
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId);
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(s.Name);
    this.GetText(12).SetText(s);
  }
  BGt() {
    switch (this.fGt.MainType) {
      case 1:
        if (this.fGt.SubType === 35) {
          this.SetItemQualityIcon(this.GetSprite(10), this.fGt.ConfigId);
          return;
        }
        break;
      case 2:
        if (this.fGt.SubType === 37) {
          this.SetItemQualityIcon(this.GetSprite(10), this.fGt.ConfigId);
          return;
        }
    }
    var s = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId);
    this.SetItemQualityIcon(this.GetSprite(10), s.ItemId);
  }
  Kbe() {
    switch (this.fGt.MainType) {
      case 1:
        if (this.fGt.SubType === 0) {
          s = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId);
          this.SetItemIcon(this.GetTexture(11), s.ItemId);
          return;
        }
        this.SetItemIcon(this.GetTexture(11), this.fGt.ConfigId);
        break;
      case 2:
        if (this.fGt.SubType === 0) {
          s = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId);
          this.SetItemIcon(this.GetTexture(11), s.ItemId);
          return;
        }
        this.SetItemIcon(this.GetTexture(11), this.fGt.ConfigId);
        break;
      case 3:
        var s = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId);
        this.SetItemIcon(this.GetTexture(11), s.ItemId);
    }
  }
  Rxt() {
    switch (this.fGt.MainType) {
      case 1:
      case 2:
        this.GetItem(7).SetUIActive(false);
        break;
      case 3:
        var s = this.fGt;
        this.GetItem(7).SetUIActive(!s.IsUnlock);
    }
  }
  qGt() {
    switch (this.fGt.MainType) {
      case 1:
        var s = this.fGt;
        if (s.SubType === 35) {
          this.GetItem(8).SetUIActive(false);
        } else {
          s = ComposeController_1.ComposeController.CheckCanReagentProduction(s.ConfigId);
          this.GetItem(8).SetUIActive(!s);
        }
        break;
      case 2:
        var s = this.fGt;
        if (s.SubType === 37) {
          this.GetItem(8).SetUIActive(false);
        } else {
          s = ComposeController_1.ComposeController.CheckCanStructure(s.ConfigId);
          this.GetItem(8).SetUIActive(!s);
        }
        break;
      case 3:
        s = this.fGt;
        if (ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(s.ConfigId).IsUnlock !== 0) {
          s = ComposeController_1.ComposeController.CheckCanPurification(s.ConfigId);
          this.GetItem(8).SetUIActive(!s);
        } else {
          this.GetItem(8).SetUIActive(true);
        }
    }
  }
  bGt() {
    this.GetItem(9).SetUIActive(this.fGt.IsNew);
  }
  BindOnClickedCallback(s) {
    this.oft = s;
  }
  OnSelected(s) {
    this.N6e(true);
  }
  OnDeselected(s) {
    this.N6e(false);
  }
  N6e(s, i = true) {
    var t = this.GetExtendToggle(6);
    if (s) {
      t.SetToggleState(1, i);
    } else {
      t.SetToggleState(0, false);
    }
  }
}
exports.ComposeItem = ComposeItem;
//# sourceMappingURL=ComposeItem.js.map