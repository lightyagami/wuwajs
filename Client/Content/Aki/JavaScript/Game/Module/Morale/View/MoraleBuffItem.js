"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleBuffItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class MoraleBuffItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.BuffData = undefined;
    this.ClickCallback = undefined;
    this.PJ1 = () => {
      this.ClickCallback?.(this.BuffData);
    };
  }
  async Init(t, s) {
    this.BuffData = s;
    await this.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIItem]];
    this.BtnBindInfo = [[1, this.PJ1]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  UpdateData() {
    this.GetText(6)?.SetText(this.BuffData.Config.LvStage.toString());
    this.UpdateToggleState();
    this.UpdateState();
  }
  UpdateToggleState() {
    var t = this.BuffData.IsSelect ? 1 : 0;
    this.GetExtendToggle(1)?.SetToggleStateForce(t);
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
    this.xJ1(true);
    this.Euo(false);
    this.AJ1(3);
    this.Ost(this.BuffData.Config.IconPathActive);
    this.inu(true);
  }
  SetStateTempActive() {
    this.xJ1(true);
    this.Euo(false);
    this.AJ1(2);
    this.Ost(this.BuffData.Config.IconPathActive);
    this.inu(true);
  }
  SetStateNotActive() {
    this.xJ1(false);
    this.Euo(true);
    this.AJ1(4);
    this.Ost(this.BuffData.Config.IconPathNormal);
    this.inu(false);
  }
  xJ1(t) {
    this.GetSprite(0)?.SetUIActive(t);
  }
  Euo(t) {
    this.GetItem(7)?.SetUIActive(t);
  }
  AJ1(t) {
    for (const s of [3, 2, 4]) {
      this.GetItem(s)?.SetUIActive(t === s);
    }
  }
  Ost(t) {
    var s = this.GetTexture(5);
    this.SetTextureByPath(t, s);
  }
  inu(t) {
    var s = this.GetTexture(5);
    s.SetChangeColor(t, s.changeColor);
  }
}
exports.MoraleBuffItem = MoraleBuffItem;
//# sourceMappingURL=MoraleBuffItem.js.map