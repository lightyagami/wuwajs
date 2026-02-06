"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarMoNing = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarMoNingSlot_1 = require("./SpecialEnergyBarMoNingSlot");
const DOMAIN_CONFIG = 120901;
class SpecialEnergyBarMoNing extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Rtg = undefined;
    this.Ltg = undefined;
    this._ii = 0;
    this.rdt = -1;
    this.UWi = (t, i) => {
      this.Owt(i ? 1 : 0, false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [];
    for (let t = 0; t < 12; ++t) {
      this.ComponentRegisterInfos.push([t, UE.UIItem]);
    }
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(527772422, this.UWi);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem1());
    t.push(this.InitBarItem2());
    await Promise.all(t);
  }
  async InitBarItem1() {
    this.Rtg = new SpecialEnergyBarMoNingSlot_1.SpecialEnergyBarMoNingSlot();
    this.Rtg.InitData(this.RoleData, this.Config);
    this.Rtg.ForceHideBottomLine = true;
    await this.Rtg.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  async InitBarItem2() {
    this.Ltg = new SpecialEnergyBarMoNingSlot_1.SpecialEnergyBarMoNingSlot();
    var t = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(DOMAIN_CONFIG);
    this.Ltg.InitData(this.RoleData, t);
    this.Ltg.ForceHideBottomLine = true;
    await this.Ltg.InitByActorAsync(this.GetItem(11).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(5);
    this.InitTweenAnim(8);
    this.InitTweenAnim(10);
    this.InitTweenAnim(9);
    this.InitTweenAnim(6);
    this.InitTweenAnim(7);
    this._Oe(true);
    this.OnBarPercentChanged();
  }
  ClearAllTweenAnim() {
    this.TweenAnimPlayer?.Clear(true);
    super.ClearAllTweenAnim();
  }
  OnBarPercentChanged() {
    var t = this.PercentMachine.GetCurPercent();
    var i = this.rdt >= 1 && t < 1;
    var s = this.rdt < 1 && t >= 1;
    let e = 0;
    if (t <= MathUtils_1.MathUtils.SmallNumber) {
      e = -1;
    } else if (t >= 1 - MathUtils_1.MathUtils.SmallNumber) {
      e = 1;
    }
    if (this._ii === 1) {
      if (i) {
        this.PlayTweenAnim(8);
      } else if (s) {
        this.PlayTweenAnim(7);
      }
    } else {
      if (e !== 1) {
        this.GetItem(3).SetUIActive(true);
      }
      this.GetItem(4).SetUIActive(e === 1);
      if (s) {
        this.PlayTweenAnim(5);
      }
    }
    this.rdt = t;
  }
  _Oe(t = false) {
    if (this.TagComponent?.HasTag(527772422)) {
      this.Owt(1, t);
    } else {
      this.Owt(0, t);
    }
  }
  Owt(t, i = false) {
    if (t !== this._ii || i) {
      this._ii = t;
      this.rdt = -1;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 96, "莫宁能量条改变状态", ["", t]);
      }
      switch (this._ii) {
        case 0:
          this.GetItem(1)?.SetUIActive(false);
          this.GetItem(2)?.SetUIActive(true);
          this.PlayTweenAnim(9);
          break;
        case 1:
          this.GetItem(1)?.SetUIActive(true);
          this.GetItem(2)?.SetUIActive(false);
          this.PlayTweenAnim(6);
      }
      this.GetItem(0).SetUIActive(t === 0);
      this.GetItem(11).SetUIActive(t === 1);
    }
  }
  Tick(t) {
    super.Tick(t);
    this.Rtg?.Tick(t);
    this.Ltg?.Tick(t);
  }
}
exports.SpecialEnergyBarMoNing = SpecialEnergyBarMoNing;
//# sourceMappingURL=SpecialEnergyBarMoNing.js.map