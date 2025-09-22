"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarYouNuo = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarYouNuoSlot_1 = require("./SpecialEnergyBarYouNuoSlot");
const EFFECT_BASE_PERCENT = 18 / 41;
const quarterMoonTag = 543551426;
const newMoonTag = -2010155753;
const normalSkillEnableTag = 1155792662;
class SpecialEnergyBarYouNuo extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Rdt = undefined;
    this.DP_ = false;
    this.zEd = false;
    this.JEd = false;
    this.cLd = false;
    this.ac = 0;
    this.ZEd = -1;
    this.eId = (t, s) => {
      this.zEd = s;
      this._Oe();
    };
    this.tId = (t, s) => {
      this.JEd = s;
      this._Oe();
    };
    this.dLd = (t, s) => {
      this.cLd = s;
      this.Rdt.SetKeyItemEnable(0, this.cLd, true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UINiagara], [10, UE.UINiagara]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarYouNuoSlot_1.SpecialEnergyBarYouNuoSlot();
    this.Rdt.ForceHideBottomLine = true;
    this.Rdt.ForceEffectBasePercent = EFFECT_BASE_PERCENT;
    this.Rdt.InitData(this.RoleData, this.Config, true);
    await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(5);
    this.InitTweenAnim(6);
    this.InitTweenAnim(7);
    this.InitTweenAnim(8);
    this.zEd = this.TagComponent?.HasTag(quarterMoonTag) ?? false;
    this.JEd = this.TagComponent?.HasTag(newMoonTag) ?? false;
    this.cLd = this.TagComponent?.HasTag(normalSkillEnableTag) ?? false;
    this.Gdl(true);
    this.Rdt.SetKeyItemEnable(0, this.cLd, true);
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(quarterMoonTag, this.eId);
    this.ListenForTagAddOrRemoveChanged(newMoonTag, this.tId);
    this.ListenForTagAddOrRemoveChanged(normalSkillEnableTag, this.dLd);
  }
  OnBarPercentChanged() {
    this.Gdl();
  }
  OnKeyEnableChanged() {
    this.Gdl();
  }
  Gdl(t = false) {
    var s = this.PercentMachine.GetCurPercent();
    this.DP_ = s >= 1;
    this.$xd(s);
    this._Oe(t);
  }
  $xd(t) {
    if (this.ac === 3) {
      this.GetUiNiagara(9).SetNiagaraVarFloat("Dissolve", Math.min(t * 2, 1));
      this.GetUiNiagara(10).SetNiagaraVarFloat("Dissolve", Math.max(t * 2 - 1, 0));
    }
  }
  _Oe(t = false) {
    let e = 0;
    if (this.zEd) {
      e = 2;
    } else if (this.JEd) {
      e = 3;
    } else if (this.DP_) {
      e = 1;
    }
    if (this.ac !== e || t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "尤诺能量条状态改变", ["[1满,2弦月,3新月]", e]);
      }
      this.ac = e;
      if (this.ZEd >= 0) {
        this.StopTweenAnim(this.ZEd);
        this.ZEd = -1;
      }
      let t = 1.1;
      let s = 0;
      let i = 0;
      switch (this.ac) {
        case 0:
          this.ZEd = 8;
          break;
        case 1:
          this.ZEd = 5;
          break;
        case 2:
          s = 1;
          i = 1;
          this.ZEd = 6;
          break;
        case 3:
          s = 2;
          i = 2;
          this.ZEd = 7;
          t = 0;
          this.$xd(this.PercentMachine.GetCurPercent());
      }
      if (this.ZEd >= 0) {
        this.PlayTweenAnim(this.ZEd);
      }
      if (this.Rdt) {
        this.Rdt.SetKeyItemType(s);
        this.Rdt.SetFullEffectPercent(t);
        this.Rdt.SetBarColor(i);
      }
    }
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
  }
}
exports.SpecialEnergyBarYouNuo = SpecialEnergyBarYouNuo;
//# sourceMappingURL=SpecialEnergyBarYouNuo.js.map