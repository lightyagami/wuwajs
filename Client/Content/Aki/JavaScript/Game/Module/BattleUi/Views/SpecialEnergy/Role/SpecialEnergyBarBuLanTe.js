"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarBuLanTe = undefined;
const UE = require("ue");
const SpecialEnergyBaIconHandle_1 = require("../SpecialEnergyBaIconHandle");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
const SpecialEnergyBarBuLanTeStarItem_1 = require("./SpecialEnergyBarBuLanTeStarItem");
const NUM = 3;
class SpecialEnergyBarBuLanTe extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Rdt = undefined;
    this.Ddt = new SpecialEnergyBaIconHandle_1.SpecialEnergyBaIconHandle();
    this.tqt = [];
    this.CN = false;
    this.DP_ = false;
    this.TGe = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    e.push(this.InitBarItem());
    for (let t = 0; t < NUM; t++) {
      e.push(this.BP_(t));
    }
    await Promise.all(e);
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarSlot_1.SpecialEnergyBarSlot();
    this.Rdt.ForceHideBottomLine = true;
    this.Rdt.InitData(this.RoleData, this.Config, true);
    await this.Rdt.InitByActorAsync(this.GetItem(0).GetOwner());
  }
  async BP_(t) {
    var e = new SpecialEnergyBarBuLanTeStarItem_1.SpecialEnergyBarBuLanTeStarItem();
    this.tqt.push(e);
    await e.CreateThenShowByActorAsync(this.GetItem(3 + t).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(6);
    this.InitTweenAnim(7);
    this.InitTweenAnim(8);
    this.InitTweenAnim(9);
    this.InitTweenAnim(10);
    this.InitTweenAnim(11);
    this.PlayTweenAnim(11);
    this.Ddt.Init([this.GetTexture(2)]);
    this.kP_(true);
    this.qP_(true);
    this.OP_(true);
  }
  OnBarPercentChanged() {
    this.kP_();
    this.qP_();
    this.OP_();
  }
  kP_(t = false) {
    var e = this.PercentMachine.GetCurPercent() >= this.Config.DisableKeyOnPercent;
    if (this.DP_ !== e || !!t) {
      this.DP_ = e;
      if (this.DP_) {
        this.StopTweenAnim(7);
        this.PlayTweenAnim(6);
      } else if (t) {
        this.StopTweenAnim(6);
        this.GetTexture(2)?.SetUIActive(true);
        this.GetTexture(2)?.SetAlpha(1);
      } else {
        this.StopTweenAnim(6);
        this.PlayTweenAnim(7);
      }
    }
  }
  qP_(t = false) {
    var e = this.PercentMachine.GetCurPercent();
    this.GetSprite(1)?.SetFillAmount(e);
    var i = e <= 0;
    if (this.CN !== i || t) {
      if (this.CN = i) {
        this.Ddt.SetIcon(this.Config?.IconPath);
      } else {
        this.Ddt.SetIcon(this.Config?.EnableIconPath);
      }
      for (const s of this.tqt) {
        s.SetIsEmpty(i);
      }
    }
  }
  OP_(t = 0) {
    var e = this.PercentMachine.GetCurPercent();
    var i = Math.min(Math.floor(e * 4), NUM);
    for (let t = this.TGe; t < i; t++) {
      this.PlayTweenAnim(8 + t);
    }
    for (let t = i; t < NUM; t++) {
      this.tqt[t].SetStarEnable(false);
    }
    this.TGe = i;
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
  }
  OnBeforeDestroy() {
    this.Ddt.OnBeforeDestroy();
    super.OnBeforeDestroy();
  }
}
exports.SpecialEnergyBarBuLanTe = SpecialEnergyBarBuLanTe;
//# sourceMappingURL=SpecialEnergyBarBuLanTe.js.map