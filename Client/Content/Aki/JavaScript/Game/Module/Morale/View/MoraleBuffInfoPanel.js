"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleBuffInfoPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MoraleBuffInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.BuffData = undefined;
  }
  async Init(t) {
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UINiagara], [6, UE.UIItem], [7, UE.UINiagara], [8, UE.UINiagara], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UISprite], [12, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.GetItem(0)?.SetUIActive(false);
  }
  UpdateData(t) {
    this.BuffData = t;
    this.UpdateState();
    this.GetText(2)?.ShowTextNew(t.Config.BuffName);
    this.GetText(3)?.ShowTextNew(t.Config.BuffDescDetail);
  }
  UpdateState() {
    switch (this.BuffData.GetActiveState()) {
      case 1:
        this.SetStateActive();
        break;
      case 0:
        this.SetStateTempActive();
        break;
      case 2:
        this.SetStateNotActive();
    }
  }
  SetStateActive() {
    this.eJ1("Morale_title_11");
    this.tJ1("SP_FrameActivated");
    this.Ost(this.BuffData.Config.IconPathActive);
    this.vOe(true);
    this.iJ1("T_MoraleBuffBgActivate");
    this.rJ1(7);
    this.oJ1();
  }
  SetStateTempActive() {
    this.eJ1("Morale_title_10");
    this.tJ1("SP_FrameActivated");
    this.Ost(this.BuffData.Config.IconPathActive);
    this.vOe(true);
    this.iJ1("T_MoraleBuffBgActivateTemp");
    this.rJ1(8);
    this.oJ1(9);
  }
  SetStateNotActive() {
    this.eJ1("Morale_title_12", true);
    this.tJ1("SP_FrameUnactivated");
    this.Ost(this.BuffData.Config.IconPathNormal);
    this.vOe(false);
    this.iJ1("T_MoraleBuffBgUnactivated");
    this.rJ1(5);
    this.oJ1(6);
  }
  eJ1(t, e = false) {
    var i = this.GetText(12);
    i?.ShowTextNew(t);
    i?.SetChangeColor(e, i.changeColor);
  }
  tJ1(t) {
    var e = this.GetSprite(11);
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSpriteByPath(t, e, false);
  }
  Ost(t) {
    var e = this.GetTexture(4);
    this.SetTextureByPath(t, e);
  }
  vOe(t) {
    var e = this.GetTexture(4);
    e.SetChangeColor(t, e.changeColor);
  }
  iJ1(t) {
    var e = this.GetTexture(1);
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(t, e);
  }
  rJ1(t) {
    for (const e of [7, 8, 5]) {
      this.GetUiNiagara(e)?.SetUIActive(t === e);
    }
  }
  oJ1(t) {
    for (const e of [9, 6]) {
      this.GetItem(e)?.SetUIActive(t === e);
    }
  }
}
exports.MoraleBuffInfoPanel = MoraleBuffInfoPanel;
//# sourceMappingURL=MoraleBuffInfoPanel.js.map