"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarJiaBeiLiNaSlot = undefined;
const CharacterAttributeTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const SpecialEnergyBarPercentMachine_1 = require("../SpecialEnergyBarPercentMachine");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
class SpecialEnergyBarJiaBeiLiNaSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.RedPercentMachine = new SpecialEnergyBarPercentMachine_1.SpecialEnergyBarPercentMachine();
    this.cQd = false;
    this.PercentCallback = undefined;
    this.dQd = (t, e, i) => {
      this.RedPercentMachine.SetTargetPercent(this.GetRedTargetAttributePercent());
      this.RefreshRedBarPercent();
    };
    this.mQd = (t, e, i) => {
      this.RedPercentMachine.SetTargetPercent(this.GetRedTargetAttributePercent());
      this.RefreshRedBarPercent();
    };
  }
  OnInitData() {
    super.OnInitData();
    this.RedPercentMachine.Init(this.GetRedTargetAttributePercent());
  }
  GetRedTargetAttributePercent() {
    var t = this.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2);
    var e = this.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2Max);
    let i = e > 0 ? t / e : 0;
    return i;
  }
  OnStart() {
    this.OverrideColor = true;
    super.OnStart();
    this.SlotItemList[0].SetEffectBasePercent(0.27);
    this.SlotItemList[0].SetFullEffectPercent(1);
    this.SlotItemList[1].SetEffectBasePercent(0.7);
    this.SlotItemList[1].SetFullEffectPercent(1);
    this.RefreshRedBarPercent(true);
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForAttributeChanged(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2, this.dQd);
    this.ListenForAttributeChanged(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2Max, this.mQd);
  }
  RefreshRedBarPercent(t = 0) {
    var e = this.RedPercentMachine.GetCurPercent();
    var i = this.GetKeyEnable();
    this.SlotItemList[0].UpdatePercent(e, i);
    this.PercentCallback?.(0, e);
  }
  RefreshBarPercent(t = false) {
    var e = this.PercentMachine.GetCurPercent();
    var i = this.GetKeyEnable();
    this.SlotItemList[1].UpdatePercent(e, i);
    this.PercentCallback?.(1, e);
    this.KeyItem?.RefreshKeyEnable(i, t);
    if (t) {
      this.cQd = i;
    } else if (this.cQd !== i) {
      this.cQd = i;
      this.RefreshRedBarPercent();
    }
  }
  GetKeyEnable() {
    return !(this.PercentMachine.GetCurPercent() < this.Config.DisableKeyOnPercent) && (this.Config.KeyEnableTagId === 0 || !!this.HasKeyEnableTag);
  }
  Tick(t) {
    super.Tick(t);
    if (this.RedPercentMachine.Update(t)) {
      this.RefreshRedBarPercent();
    }
  }
}
exports.SpecialEnergyBarJiaBeiLiNaSlot = SpecialEnergyBarJiaBeiLiNaSlot;
//# sourceMappingURL=SpecialEnergyBarJiaBeiLiNaSlot.js.map