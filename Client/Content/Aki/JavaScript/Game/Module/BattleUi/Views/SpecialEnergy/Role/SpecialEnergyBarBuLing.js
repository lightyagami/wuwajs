"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarBuLing = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarBuLingSlot_1 = require("./SpecialEnergyBarBuLingSlot");
const tagLeft = -1756217109;
const tagRight = 980520580;
const tagAll = -359492818;
const EFFECT_BASE_PERCENT = 17 / 41;
class SpecialEnergyBarBuLing extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.hTm = false;
    this.lTm = false;
    this._Tm = false;
    this.ac = 0;
    this.uTm = -1;
    this.Rdt = undefined;
    this.cTm = (t, i) => {
      this.hTm = i;
      this._Oe();
    };
    this.dTm = (t, i) => {
      this.lTm = i;
      this._Oe();
    };
    this.mTm = (t, i) => {
      this._Tm = i;
      this._Oe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [3, UE.UIItem], [2, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
  }
  OnInitData() {
    super.OnInitData();
    this.ListenForTagAddOrRemoveChanged(tagLeft, this.cTm);
    this.ListenForTagAddOrRemoveChanged(tagRight, this.dTm);
    this.ListenForTagAddOrRemoveChanged(tagAll, this.mTm);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarBuLingSlot_1.SpecialEnergyBarBuLingSlot();
    this.Rdt.InitData(this.RoleData, this.Config);
    this.Rdt.ForceEffectBasePercent = EFFECT_BASE_PERCENT;
    this.Rdt.ForceHideBottomLine = true;
    await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(7);
    this.InitTweenAnim(9);
    this.InitTweenAnim(8);
    this.InitTweenAnim(10);
    this.InitTweenAnim(11);
    this.InitTweenAnim(12);
    this.hTm = this.TagComponent?.HasTag(tagLeft) ?? false;
    this.lTm = this.TagComponent?.HasTag(tagRight) ?? false;
    this._Tm = this.TagComponent?.HasTag(tagAll) ?? false;
    this._Oe(true);
  }
  _Oe(t = false) {
    this.Rdt.SetState(this.hTm || this._Tm, this.lTm || this._Tm);
    let i = 0;
    var s;
    if (this._Tm) {
      i = 3;
    } else if (this.hTm) {
      i = 1;
    } else if (this.lTm) {
      i = 2;
    }
    if ((i !== this.ac || !!t) && !(s = this.ac, this.ac = i, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "卜灵能量条改变状态", ["state", i]), this.GetItem(1)?.SetUIActive(this.ac === 0), this.GetItem(3)?.SetUIActive(this.ac === 1), this.GetItem(2)?.SetUIActive(this.ac === 2), this.GetItem(4)?.SetUIActive(this.ac === 3), this.GetItem(5)?.SetUIActive(this.hTm || this._Tm), this.GetItem(6)?.SetUIActive(this.lTm || this._Tm), t)) {
      if (this.ac === 0) {
        if (s === 3) {
          this.PlayTweenAnimOnly(10);
        } else if (s === 1) {
          this.PlayTweenAnimOnly(11);
        } else if (s === 2) {
          this.PlayTweenAnimOnly(12);
        }
      } else if (this.ac === 3) {
        this.PlayTweenAnimOnly(9);
      } else if (this.ac === 1) {
        if (s === 0) {
          this.PlayTweenAnimOnly(7);
        }
      } else if (this.ac === 2 && s === 0) {
        this.PlayTweenAnimOnly(8);
      }
    }
  }
  PlayTweenAnimOnly(t) {
    if (this.uTm >= 0) {
      this.StopTweenAnim(this.uTm);
    }
    this.uTm = t;
    this.PlayTweenAnim(t);
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
  }
}
exports.SpecialEnergyBarBuLing = SpecialEnergyBarBuLing;
//# sourceMappingURL=SpecialEnergyBarBuLing.js.map