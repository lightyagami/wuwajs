"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarQianXiao = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarQianXiaoSlot_1 = require("./SpecialEnergyBarQianXiaoSlot");
const CURVE_PATH = "/Game/Aki/UI/UIResources/UiFight/Curve/EnergyBar/Qianxiao/GearRollbackCurve.GearRollbackCurve";
class SpecialEnergyBarQianXiao extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Rdt = undefined;
    this._ii = 0;
    this.pOm = false;
    this.Nml = false;
    this.pqm = 0.5;
    this.vqm = -1373839165;
    this.yqm = -1284882786;
    this.Sqm = 1812379303;
    this.ppf = new UE.Color(255, 133, 246, 255);
    this.Mqm = (t, i) => {
      this.Owt(i ? 1 : 0, false);
    };
    this.Eqm = (t, i) => {
      this.Owt(i ? 2 : 0, false);
    };
    this.Iqm = (t, i) => {
      this.Tqm(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UITexture], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UISliderComponent], [23, UE.UITexture], [24, UE.UITexture]];
  }
  OnInitData() {
    this.AttributeId = 64;
    this.MaxAttributeId = 63;
    var t = this.Config?.ExtraFloatParams[0];
    if (t) {
      this.pqm = t;
    }
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(this.vqm, this.Mqm);
    this.ListenForTagAddOrRemoveChanged(this.yqm, this.Eqm);
    this.ListenForTagAddOrRemoveChanged(this.Sqm, this.Iqm);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarQianXiaoSlot_1.SpecialEnergyBarQianXiaoSlot();
    this.Rdt.InitData(this.RoleData, this.Config);
    this.Rdt.ForceHideBottomLine = true;
    this.Rdt.GlowItem = this.GetItem(21);
    this.Rdt.GlowSlider = this.GetSlider(22);
    this.Rdt.SetPointItem(this.GetItem(12));
    this.Rdt.SetGearItem(this.GetItem(11));
    await this.NWr(CURVE_PATH);
    await this.Rdt.InitByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    this.InitTweenAnim(13);
    this.InitTweenAnim(14);
    this.InitTweenAnim(15);
    this.InitTweenAnim(16);
    this.InitTweenAnim(17);
    this.InitTweenAnim(18);
    this.InitTweenAnim(19);
    this.InitTweenAnim(20);
    this.GetItem(21)?.SetUIActive(false);
    this._Oe(true);
    this.OnBarPercentChanged();
  }
  ClearAllTweenAnim() {
    this.StopTweenAnim(19);
    super.ClearAllTweenAnim();
  }
  OnBarPercentChanged() {
    var t = this.PercentMachine.GetCurPercent();
    switch (this._ii) {
      case 0:
        this.GetTexture(4)?.SetFillAmount(t);
        break;
      case 1:
        this.GetTexture(6)?.SetFillAmount(t);
        this.GetTexture(23)?.SetFillAmount(t);
        this.GetTexture(24)?.SetFillAmount(t);
        break;
      case 2:
        this.GetTexture(8)?.SetFillAmount(t);
        this.GetTexture(9)?.SetFillAmount(t);
    }
  }
  OnBeforeHide() {
    this.Rdt?.StopCoolDownState();
  }
  _Oe(t = false) {
    if (this.TagComponent?.HasTag(this.yqm)) {
      this.Owt(2, t);
    } else if (this.TagComponent?.HasTag(this.vqm)) {
      this.Owt(1, t);
    } else {
      this.Owt(0, t);
    }
    if (t && this.TagComponent?.HasTag(this.Sqm)) {
      this.Tqm(true);
    }
  }
  Owt(t, i = false) {
    if (t !== this._ii || i) {
      i = this._ii;
      this._ii = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "千咲能量条改变状态", ["状态", t]);
      }
      if (i === 2 && t !== 2) {
        this.StopTweenAnim(20);
        this.PlayTweenAnim(18);
        this.Rdt?.SetState(2);
        this.Tqm(false);
      }
      switch (this._ii) {
        case 0:
          this.GetItem(3)?.SetUIActive(true);
          this.GetItem(5)?.SetUIActive(false);
          this.GetItem(7)?.SetUIActive(false);
          this.PlayTweenAnim(16);
          break;
        case 1:
          this.GetItem(3)?.SetUIActive(false);
          this.GetItem(5)?.SetUIActive(true);
          this.GetItem(7)?.SetUIActive(false);
          this.PlayTweenAnim(15);
          break;
        case 2:
          this.GetItem(3)?.SetUIActive(false);
          this.GetItem(5)?.SetUIActive(false);
          this.GetItem(7)?.SetUIActive(true);
          this.PlayTweenAnim(17);
          this.PlayTweenAnim(20);
          this.Rdt?.SetState(1);
      }
      this.OnBarPercentChanged();
    }
  }
  Tqm(t) {
    if (this.pOm !== t) {
      if (t && !this.Rdt?.IsInSlotState(2)) {
        this.pOm = true;
        this.Rdt?.SetFullEffectEnable(true);
        this.PlayTweenAnim(13);
      } else if (!t && this._ii !== 2) {
        this.pOm = false;
        this.Rdt?.SetFullEffectEnable(false);
        this.PlayTweenAnim(14);
      }
    }
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
    if (this._ii === 1 && this.PercentMachine.GetCurPercent() < this.pqm) {
      this.bMc(true);
    } else {
      this.bMc(false);
    }
  }
  bMc(t) {
    if (this.Nml !== t) {
      if (this.Nml = t) {
        this.PlayTweenAnim(19);
      } else {
        this.StopTweenAnim(19);
        this.GetTexture(6)?.SetColor(this.ppf);
        this.GetTexture(24)?.SetAlpha(1);
      }
    }
  }
  async NWr(i) {
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      if (t) {
        this.Rdt?.SetGearRollbackCurve(t);
        s.SetResult(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 67, "千咲能量条曲线加载失败", ["Path", i]);
        }
        s.SetResult(false);
      }
    });
    return s.Promise;
  }
}
exports.SpecialEnergyBarQianXiao = SpecialEnergyBarQianXiao;
//# sourceMappingURL=SpecialEnergyBarQianXiao.js.map