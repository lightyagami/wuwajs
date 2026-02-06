"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarMotorcycle = undefined;
const UE = require("ue");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarMotorcycleSlot_1 = require("./SpecialEnergyBarMotorcycleSlot");
const countTag = -1680267849;
class SpecialEnergyBarMotorcycle extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.sDe = undefined;
    this.Rdt = undefined;
    this.DP_ = false;
    this.q7o = 100;
    this.xBf = t => {
      this.PercentMachine.SetTargetPercent(Math.min(1, t / this.q7o));
      this.RefreshBarPercent();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  InitMotorcycleData(t, e) {
    this.sDe = t;
    this.Config = e;
    this.TagComponent = t.Entity.GetComponent(217);
    this.OnInitData();
    this.PercentMachine.Init(0);
    this.InitKeyEnableTag();
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarMotorcycleSlot_1.SpecialEnergyBarMotorcycleSlot();
    this.Rdt.ForceHideBottomLine = true;
    this.Rdt.InitMotorcycleData(this.sDe, this.Config, true);
    await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  OnInitData() {
    this.q7o = this.Config.ExtraFloatParams[0];
  }
  OnStart() {
    var t = this.TagComponent.GetTagCount(countTag);
    this.PercentMachine.SetTargetPercent(Math.min(1, t / this.q7o));
    super.OnStart();
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagCountChanged(countTag, this.xBf);
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
  }
  OnBarPercentChanged() {
    this.RefreshBarPercent();
  }
  RefreshBarPercent(t = false) {
    var e = this.PercentMachine.GetCurPercent();
    var s = this.GetKeyEnable();
    this.Rdt?.UpdatePercent(e, s, t);
    this.BBf(s, t);
  }
  BBf(t, e = false) {
    if (this.DP_ !== t || !!e) {
      this.DP_ = t;
      this.GetItem(2).SetUIActive(t);
      this.GetItem(1).SetUIActive(!t);
    }
  }
}
exports.SpecialEnergyBarMotorcycle = SpecialEnergyBarMotorcycle;
//# sourceMappingURL=SpecialEnergyBarMotorcycle.js.map