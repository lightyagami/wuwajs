"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarDengDeng = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const CharacterAttributeTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarPercentMachine_1 = require("../SpecialEnergyBarPercentMachine");
const SpecialEnergyBarSlotItem_1 = require("../SpecialEnergyBarSlotItem");
const WIDTH = 190;
const EFFECT_BASE_PERCENT = 20 / 41;
const tagRed = 1783680056;
class SpecialEnergyBarDengDeng extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.ydl = undefined;
    this.Edl = undefined;
    this.Idl = new SpecialEnergyBarPercentMachine_1.SpecialEnergyBarPercentMachine();
    this.Tdl = 0;
    this.Ldl = 0;
    this.Rdl = false;
    this.ACl = false;
    this.xCl = false;
    this.Udl = (t, i, e) => {
      this.Idl.SetTargetPercent(this.Ddl());
      this.Adl();
    };
    this.xdl = (t, i, e) => {
      this.Idl.SetTargetPercent(this.Ddl());
      this.Adl();
    };
    this.Pdl = (t, i) => {
      if (i !== this.Rdl) {
        this.Rdl = i;
        this.wdl();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UINiagara], [6, UE.UINiagara]];
  }
  OnInitData() {
    super.OnInitData();
    this.Tdl = CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2;
    this.Ldl = CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2Max;
    this.Rdl = this.TagComponent.HasTag(tagRed);
    this.Idl.Init(this.Ddl());
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.Bdl(this.GetItem(0)));
    t.push(this.bdl(this.GetItem(1)));
    t.push(this.LoadEffects());
    t.push(this.InitKeyItem(this.GetItem(2)));
    await Promise.all(t);
  }
  async Bdl(t) {
    this.ydl = new SpecialEnergyBarSlotItem_1.SpecialEnergyBarSlotItem();
    await this.ydl.CreateThenShowByActorAsync(t.GetOwner());
  }
  async bdl(t) {
    this.Edl = new SpecialEnergyBarSlotItem_1.SpecialEnergyBarSlotItem();
    await this.Edl.CreateThenShowByActorAsync(t.GetOwner());
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForAttributeChanged(this.Tdl, this.Udl);
    this.ListenForAttributeChanged(this.Ldl, this.xdl);
    this.ListenForTagAddOrRemoveChanged(tagRed, this.Pdl);
  }
  RemoveEvents() {
    super.RemoveEvents();
    this.RemoveListenAttributeChanged(this.Tdl, this.Udl);
    this.RemoveListenAttributeChanged(this.Ldl, this.xdl);
  }
  OnStart() {
    if (this.Config) {
      this.ydl.SetEffectBasePercent(EFFECT_BASE_PERCENT);
      this.Edl.SetEffectBasePercent(EFFECT_BASE_PERCENT);
      this.qdl(this.ydl, this.Config.PointColorList[0], this.Config.PointColorList[1], this.Config.EffectColor);
      this.qdl(this.Edl, this.Config.PointColorList[2], this.Config.PointColorList[3], this.Config.OtherEffectColorList[0]);
      this.ydl.ReplaceFullEffect(this.NiagaraList[0]);
      this.Edl.ReplaceFullEffect(this.NiagaraList[1]);
      this.wdl(true);
      this.Gdl(true);
      this.kdl(true);
      this.Odl(true);
    }
  }
  qdl(t, i, e, s) {
    i = UE.Color.FromHex(i);
    e = UE.Color.FromHex(e);
    s = new UE.LinearColor(UE.Color.FromHex(s));
    t.SetPointBgColor(i);
    t.SetBarColor(e);
    t.SetPointColor(e);
    t.SetBgAndUseEffectColor(s);
  }
  wdl(t = false) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "灯灯能量条改变状态", ["isRed", this.Rdl]);
    }
    this.GetItem(3)?.SetUIActive(!this.Rdl);
    this.GetItem(4)?.SetUIActive(this.Rdl);
    if (!t) {
      this.Odl();
    }
  }
  Gdl(t = false) {
    var i = this.PercentMachine.GetCurPercent();
    this.ydl.UpdatePercent(i, i >= this.Config.DisableKeyOnPercent);
    this.GetItem(3)?.SetAnchorOffsetX(-i * WIDTH);
    if (!this.Rdl && !t) {
      this.Odl();
    }
    var i = i > 0;
    if (!!t || i !== this.ACl) {
      this.ACl = i;
      this.GetUiNiagara(5)?.SetUIActive(i);
    }
  }
  kdl(t = false) {
    var i = this.Idl.GetCurPercent();
    this.Edl.UpdatePercent(i, i >= this.Config.DisableKeyOnPercent);
    this.GetItem(4)?.SetAnchorOffsetX(i * WIDTH);
    if (this.Rdl && !t) {
      this.Odl(t);
    }
    var i = i > 0;
    if (!!t || i !== this.xCl) {
      this.xCl = i;
      this.GetUiNiagara(6)?.SetUIActive(i);
    }
  }
  Odl(t = false) {
    this.KeyItem?.RefreshKeyEnable(this.GetKeyEnable(), t);
  }
  GetKeyEnable() {
    let t = 0;
    return (t = (this.Rdl ? this.Idl : this.PercentMachine).GetCurPercent()) >= this.Config.DisableKeyOnPercent;
  }
  OnBarPercentChanged() {
    this.Gdl();
  }
  Adl() {
    this.kdl();
  }
  Tick(t) {
    super.Tick(t);
    if (this.Idl.Update(t)) {
      this.Adl();
    }
    this.ydl?.Tick(t);
    this.Edl?.Tick(t);
  }
  Ddl() {
    var t = this.AttributeComponent.GetCurrentValue(this.Tdl);
    var i = this.AttributeComponent.GetCurrentValue(this.Ldl);
    let e = i > 0 ? t / i : 0;
    return e;
  }
}
exports.SpecialEnergyBarDengDeng = SpecialEnergyBarDengDeng;
//# sourceMappingURL=SpecialEnergyBarDengDeng.js.map