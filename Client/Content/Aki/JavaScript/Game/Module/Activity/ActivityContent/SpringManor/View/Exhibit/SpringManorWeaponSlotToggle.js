"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorWeaponSlotToggle = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer");
class SpringManorWeaponSlotToggle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.wVi = -1;
    this.q6e = undefined;
    this.sfg = 0;
    this.$pt = undefined;
    this.ixg = undefined;
    this.afg = () => {
      if (!(this.wVi < 0)) {
        this.q6e?.(this.wVi);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.afg]];
  }
  async OnBeforeStartAsync() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem());
  }
  OnBeforeDestroy() {
    this.$pt?.Clear();
    this.$pt = undefined;
  }
  Setup(e, t) {
    this.wVi = e;
    this.q6e = t;
  }
  SetSelected(e) {
    var t = this.GetExtendToggle(0);
    if (t) {
      t.SetToggleStateForce(e ? 1 : 0, false);
    }
  }
  SetWeaponItemId(e) {
    this.sfg = e;
    this.hfg();
  }
  GetWeaponItemId() {
    return this.sfg;
  }
  hfg() {
    var e = this.sfg !== 0;
    if (this.ixg !== undefined && this.$pt) {
      if (!this.ixg && e) {
        this.$pt.PlaySequence("Assembled");
      } else if (this.ixg && !e) {
        this.$pt.PlaySequence("Unassembled");
      }
    }
    this.ixg = e;
    this.GetItem(1)?.SetUIActive(!e);
    this.GetItem(2)?.SetUIActive(e);
  }
}
exports.SpringManorWeaponSlotToggle = SpringManorWeaponSlotToggle;
//# sourceMappingURL=SpringManorWeaponSlotToggle.js.map