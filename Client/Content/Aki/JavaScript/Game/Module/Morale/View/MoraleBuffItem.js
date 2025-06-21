"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBuffItem = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MoraleBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.BuffData = void 0, this.ClickCallback = void 0, this.cz1 = () => {
      this.ClickCallback?.(this.BuffData)
    }
  }
  async Init(t, s) {
    this.BuffData = s, await this.CreateThenShowByActorAsync(t.GetOwner())
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIItem]
    ], this.BtnBindInfo = [
      [1, this.cz1]
    ]
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync()
  }
  UpdateData() {
    this.GetText(6)?.SetText(this.BuffData.Config.LvStage.toString()), this.UpdateToggleState(), this.UpdateState()
  }
  UpdateToggleState() {
    var t = this.BuffData.IsSelect ? 1 : 0;
    this.GetExtendToggle(1)?.SetToggleStateForce(t)
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
    this.dz1(!0), this.Euo(!1), this.uz1(3), this.Ost(this.BuffData.Config.IconPathActive), this.Htu(!0)
  }
  SetStateTempActive() {
    this.dz1(!0), this.Euo(!1), this.uz1(2), this.Ost(this.BuffData.Config.IconPathActive), this.Htu(!0)
  }
  SetStateNotActive() {
    this.dz1(!1), this.Euo(!0), this.uz1(4), this.Ost(this.BuffData.Config.IconPathNormal), this.Htu(!1)
  }
  dz1(t) {
    this.GetSprite(0)?.SetUIActive(t)
  }
  Euo(t) {
    this.GetItem(7)?.SetUIActive(t)
  }
  uz1(t) {
    for (const s of [3, 2, 4]) this.GetItem(s)?.SetUIActive(t === s)
  }
  Ost(t) {
    var s = this.GetTexture(5);
    this.SetTextureByPath(t, s)
  }
  Htu(t) {
    var s = this.GetTexture(5);
    s.SetChangeColor(t, s.changeColor)
  }
}
exports.MoraleBuffItem = MoraleBuffItem;
//# sourceMappingURL=MoraleBuffItem.js.map