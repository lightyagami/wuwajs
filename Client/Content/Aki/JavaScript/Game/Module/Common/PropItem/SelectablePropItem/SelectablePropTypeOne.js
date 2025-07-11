"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropTypeOne = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SelectablePropComponentBase_1 = require("./SelectablePropComponentBase");
class SelectablePropTypeOne extends SelectablePropComponentBase_1.SelectablePropComponentBase {
  constructor() {
    super(...arguments);
    this.PropData = undefined;
    this.OnClickBtnBtnCall = t => {};
    this.Bke = t => {
      this.OnClickBtnBtnCall?.(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIExtendToggle], [13, UE.UIButtonComponent], [14, UE.UIItem], [15, UE.UIItem]];
    this.BtnBindInfo = [[12, t => {
      this.Bke(t);
    }]];
  }
  SetToggleClick(t) {
    this.OnClickBtnBtnCall = t;
  }
  tbt() {
    this.SetItemIcon(this.GetTexture(1), this.PropData.ItemId);
    this.SetItemQualityIcon(this.GetSprite(2), this.PropData.ItemId);
    var t = this.GetSprite(0);
    if (this.PropData.ChipPath) {
      t.SetUIActive(true);
      this.SetSpriteByPath(this.PropData.ChipPath, t, false);
    } else {
      t.SetUIActive(false);
    }
  }
  SetRoleIconState() {
    var t;
    var e = this.GetItem(3);
    if (this.PropData.RoleId !== 0) {
      e.SetUIActive(true);
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.PropData.RoleId);
      this.SetRoleIcon(t.RoleHeadIcon, this.GetTexture(4), this.PropData.RoleId);
    } else {
      e.SetUIActive(false);
    }
  }
  ibt() {
    this.GetItem(7).SetUIActive(this.PropData.GetIsLock());
  }
  obt() {
    var t = this.GetItem(5);
    if (this.PropData.ResonanceLevel) {
      t.SetUIActive(true);
      this.GetText(6).SetText(this.PropData.ResonanceLevel.toString());
    } else {
      t.SetUIActive(false);
    }
  }
  kTt() {
    this.GetText(8).SetText(this.PropData.LevelText);
  }
  Refresh(t, e, s) {
    this.PropData = t;
    this.tbt();
    this.kTt();
    this.SetRoleIconState();
    this.obt();
    this.ibt();
  }
  GetSelectItem() {
    return this.GetItem(15);
  }
  GetReduceButton() {
    return this.GetButton(13);
  }
  GetControlItem() {
    return this.GetItem(9);
  }
  GetFinishSelectItem() {
    return this.GetItem(10);
  }
  GetSelectNumberText() {
    return this.GetText(11);
  }
  GetSelectableToggle() {
    return this.GetExtendToggle(12);
  }
}
exports.SelectablePropTypeOne = SelectablePropTypeOne;
//# sourceMappingURL=SelectablePropTypeOne.js.map