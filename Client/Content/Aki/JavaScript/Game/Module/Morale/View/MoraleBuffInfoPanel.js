"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBuffInfoPanel = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MoraleBuffInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.BuffData = void 0
  }
  async Init(t) {
    await this.CreateThenShowByActorAsync(t.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UINiagara],
      [6, UE.UIItem],
      [7, UE.UINiagara],
      [8, UE.UINiagara],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UISprite],
      [12, UE.UIText]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.GetItem(0)?.SetUIActive(!1)
  }
  UpdateData(t) {
    this.BuffData = t, this.UpdateState(), this.GetText(2)?.ShowTextNew(t.Config.BuffName), this.GetText(3)?.ShowTextNew(t.Config.BuffDescDetail)
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
        this.SetStateNotActive()
    }
  }
  SetStateActive() {
    this.az1("Morale_title_11"), this.hz1("SP_FrameActivated"), this.Ost(this.BuffData.Config.IconPathActive), this.vOe(!0), this.lz1("T_MoraleBuffBgActivate"), this._z1(7), this.uz1()
  }
  SetStateTempActive() {
    this.az1("Morale_title_10"), this.hz1("SP_FrameActivated"), this.Ost(this.BuffData.Config.IconPathActive), this.vOe(!0), this.lz1("T_MoraleBuffBgActivateTemp"), this._z1(8), this.uz1(9)
  }
  SetStateNotActive() {
    this.az1("Morale_title_12", !0), this.hz1("SP_FrameUnactivated"), this.Ost(this.BuffData.Config.IconPathNormal), this.vOe(!1), this.lz1("T_MoraleBuffBgUnactivated"), this._z1(5), this.uz1(6)
  }
  az1(t, e = !1) {
    var i = this.GetText(12);
    i?.ShowTextNew(t), i?.SetChangeColor(e, i.changeColor)
  }
  hz1(t) {
    var e = this.GetSprite(11),
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetSpriteByPath(t, e, !1)
  }
  Ost(t) {
    var e = this.GetTexture(4);
    this.SetTextureByPath(t, e)
  }
  vOe(t) {
    var e = this.GetTexture(4);
    e.SetChangeColor(t, e.changeColor)
  }
  lz1(t) {
    var e = this.GetTexture(1),
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t);
    this.SetTextureByPath(t, e)
  }
  _z1(t) {
    for (const e of [7, 8, 5]) this.GetUiNiagara(e)?.SetUIActive(t === e)
  }
  uz1(t) {
    for (const e of [9, 6]) this.GetItem(e)?.SetUIActive(t === e)
  }
}
exports.MoraleBuffInfoPanel = MoraleBuffInfoPanel;
//# sourceMappingURL=MoraleBuffInfoPanel.js.map