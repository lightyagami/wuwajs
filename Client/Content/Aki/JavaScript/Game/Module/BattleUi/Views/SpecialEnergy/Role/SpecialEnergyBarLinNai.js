"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarLinNai = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const BuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BuffById");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarLinNaiSlot_1 = require("./SpecialEnergyBarLinNaiSlot");
class NeedleNumber {
  constructor() {
    this.Cig = true;
    this.le = 0;
    this.pig = [];
    this.Vfn = 0;
    this.vig = 1;
    this.n0g = 1;
    this.HGg = false;
  }
  SetTargetMode(t) {
    this.Cig = t;
  }
  ResetTarget(t, i) {
    this.Vfn = 0;
    this.pig.length = 0;
    this.pig.push(t);
    if (i !== undefined) {
      this.pig.push(i);
    }
    this.vig = Math.abs(this.vig);
  }
  get Speed() {
    return this.vig;
  }
  SetSpeed(t, i = false) {
    if (this.Cig) {
      t = Math.abs(t);
    }
    this.n0g = t;
    if (i || !this.Cig || this.Cig && (this.IsDone() || t !== 0)) {
      this.vig = t;
    }
  }
  SetCurrent(t) {
    this.HGg = this.le !== t;
    this.le = t;
  }
  ForceTo(t) {
    this.SetCurrent(t);
    if (this.Cig) {
      this.ResetTarget(t);
    }
  }
  Restart() {
    if (!this.Cig) {
      this.SetCurrent(MathUtils_1.MathUtils.Clamp(this.le, 0, 1));
    }
  }
  IsDone() {
    if (this.Cig) {
      return !this.HGg && this.Vfn >= this.pig.length;
    } else {
      return !this.HGg && (this.vig === 0 || this.le < 0 || this.le > 1);
    }
  }
  Tick(t) {
    if (this.Cig) {
      if (this.Vfn >= this.pig.length) {
        return;
      }
      var i = this.pig[this.Vfn];
      var s = Math.sign(i - this.le);
      this.le += s * this.vig * t;
      if (s > 0 && this.le >= i || s < 0 && this.le <= i) {
        this.le = i;
        this.vig = this.n0g;
        this.Vfn++;
      }
    } else {
      this.le += this.vig * t;
    }
    this.HGg = false;
  }
  Get() {
    return this.le;
  }
}
const PAINT_ATTR_ID = CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2;
const PAINT_MAX_ATTR_ID = CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2Max;
const ENERGY_ATTR_ID = CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1;
const ENERGY_MAX_ATTR_ID = CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1Max;
const JUMP_ATTR_ID = CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy3;
const SPACEBTN_CONFIG = 150901;
const E_SPACEBTN_CONFIG = 150902;
const ENERGY_DELTA_SEC = 0.2;
const CHECK_LOST_MOVETAG = 50;
class SpecialEnergyBarLinNai extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.jHf = undefined;
    this._ii = 0;
    this.wZt = [];
    this.OJf = 300;
    this.GJf = (t, i, s) => {
      this.FJf(i);
      var h = this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID);
      if (Math.abs(i - s) / h > 0.3) {
        this.YJf.ForceTo(i / h);
        this.Sig = true;
      } else if (this._ii === 1 && Math.abs(this.YJf.Get() - i / h) > 0.2 || this._ii === 2 && Math.abs(this.YJf.Get() - i / h) > 0.1) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 96, "琳奈能量条 速度值修正", ["n", i], ["c", this.YJf.Get()]);
        }
        this.YJf.ForceTo(i / h);
        this.Sig = true;
      }
    };
    this.NJf = (t, i, s) => {
      this.VJf(i);
    };
    this.UWi = (t, i) => {
      this._Oe();
    };
    this.UZf = (t, i) => {
      this.tZf();
    };
    this.HJf = (t, i) => {
      this.tZf();
    };
    this.uvg = (t, i) => {
      this.JIg(true);
    };
    this.zIg = false;
    this.WJf = undefined;
    this.xZf = false;
    this.KJf = 0;
    this.yig = 0;
    this.YJf = new NeedleNumber();
    this.Gue = new UE.Rotator(0, 0, 0);
    this.Sig = false;
    this.Plg = false;
    this.Alg = undefined;
    this.Mig = (t, i) => {
      if (t === 661078136 && this.TagComponent.HasTag(1781274524)) {
        if (i) {
          this.Plg = false;
        } else {
          this.Plg = true;
          this.Alg = TimerSystem_1.TimerSystem.Delay(() => {
            this.Alg = undefined;
            this.Plg = false;
            this.Sig = true;
          }, CHECK_LOST_MOVETAG, undefined, undefined, true, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
        }
      }
      this.Sig = true;
    };
    this.zJf = new Map();
    this.JJf = new Map([[1, 27], [2, 28], [3, 29]]);
    this.ZJf = new Map([[1, 33], [2, 34], [3, 35]]);
  }
  OnRegisterComponent() {
    var i = new Map([[0, UE.UITexture], [23, UE.UITexture], [1, UE.UIArtText], [2, UE.UIArtText], [6, UE.UISliderComponent]]);
    this.ComponentRegisterInfos = [];
    for (let t = 0; t < 39; ++t) {
      this.ComponentRegisterInfos.push([t, i.get(t) ?? UE.UIItem]);
    }
  }
  OnInitData() {
    super.OnInitData();
    this.wZt.push(this.Config);
    this.wZt.push(ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(SPACEBTN_CONFIG));
    this.wZt.push(ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(E_SPACEBTN_CONFIG));
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForAttributeChanged(ENERGY_ATTR_ID, this.GJf);
    this.ListenForAttributeChanged(JUMP_ATTR_ID, this.NJf);
    this.ListenForTagAddOrRemoveChanged(35512583, this.UWi);
    this.ListenForTagAddOrRemoveChanged(1078757575, this.UWi);
    this.ListenForTagAddOrRemoveChanged(906443840, this.Mig);
    this.ListenForTagAddOrRemoveChanged(661078136, this.Mig);
    this.ListenForTagAddOrRemoveChanged(958328631, this.Mig);
    this.ListenForTagAddOrRemoveChanged(-922579053, this.uvg);
    this.ListenForTagAddOrRemoveChanged(-1718607820, this.HJf);
    this.ListenForTagAddOrRemoveChanged(-1459213240, this.HJf);
    this.ListenForTagAddOrRemoveChanged(-405886070, this.UZf);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.jHf = new SpecialEnergyBarLinNaiSlot_1.SpecialEnergyBarLinNaiSlot();
    this.jHf.InitData(this.RoleData, this.Config);
    (this.jHf.OwnerLogic = this).jHf.ForceHideBottomLine = true;
    await this.jHf.InitByActorAsync(this.GetItem(5).GetOwner());
  }
  OnStart() {
    super.OnStart();
    for (let t = 24; t <= 38; t++) {
      this.InitTweenAnim(t);
    }
    this.OJf = (this.TweenAnimPlayer?.GetDuration(30) ?? 0.3) * 1000;
  }
  OnBeforeShow() {
    var t;
    super.OnBeforeShow();
    this._Oe(true);
    this.JIg(true);
    if (this._ii === 0) {
      t = this.AttributeComponent.GetCurrentValue(PAINT_ATTR_ID) / this.AttributeComponent.GetCurrentValue(PAINT_MAX_ATTR_ID);
      this.f3g(t);
    } else {
      this.VJf();
      this.Eig();
      this.nZf(0);
    }
  }
  ClearAllTweenAnim() {
    this.TweenAnimPlayer?.Clear(true);
    super.ClearAllTweenAnim();
  }
  OnBarPercentChanged() {
    var t = this.PercentMachine.GetCurPercent();
    this.f3g(t);
  }
  _Oe(t = false) {
    if (this.TagComponent.HasTag(1078757575)) {
      this.Owt(1, t);
    } else if (this.TagComponent.HasTag(35512583)) {
      this.Owt(2, t);
    } else {
      this.Owt(0, t);
    }
  }
  Owt(t, i = false) {
    if (t !== this._ii || i) {
      var s = this._ii;
      this._ii = t;
      this.KJf = 0;
      var h = this.AttributeComponent.GetCurrentValue(ENERGY_ATTR_ID);
      var e = this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 96, "琳奈能量条改变状态", ["new", t], ["old", s], ["a64", this.AttributeComponent.GetCurrentValue(PAINT_ATTR_ID)], ["a62", h], ["a66", this.AttributeComponent.GetCurrentValue(JUMP_ATTR_ID)]);
      }
      this.TweenAnimPlayer?.StopAll();
      var i = t === 0;
      this.GetArtText(2).SetUIActive(!i);
      switch (t) {
        case 0:
          this.xZf = false;
          var r = this.AttributeComponent.GetCurrentValue(PAINT_ATTR_ID);
          var a = r / this.AttributeComponent.GetCurrentValue(PAINT_MAX_ATTR_ID);
          this.GetSlider(6).SetValue(a);
          this.GetArtText(1).SetText("000");
          if (s === 2) {
            this.PlayTweenAnim(30);
            if (r > 0) {
              this.WJf = TimerSystem_1.TimerSystem.Delay(() => {
                this.WJf = undefined;
                if (t === 0) {
                  this.xZf = true;
                  this.PlayTweenAnim(24);
                }
              }, this.OJf, undefined, undefined, true, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
            }
          } else if (r > 0) {
            this.xZf = true;
            this.PlayTweenAnim(24);
          }
          break;
        case 1:
          this.YJf.SetCurrent(h / e);
          this.Sig = true;
          this.PlayTweenAnim(25);
          break;
        case 2:
          this.YJf.SetCurrent(h / e);
          this.Sig = true;
          this.PlayTweenAnim(s === 0 ? 36 : 26);
      }
      this.RAg();
      this.JIg();
      this.tZf();
    }
  }
  JIg(t = false) {
    var i = this.TagComponent?.HasTag(-922579053) ?? false;
    if (!!t || this.zIg !== i) {
      this.PlayTweenAnim(i ? 38 : 37);
    }
    this.zIg = i;
  }
  GetKeyEnable() {
    if (this._ii === 0) {
      return super.GetKeyEnable();
    } else {
      return this._ii === 1 || this.TagComponent.HasTag(-405886070) || this.TagComponent.HasTag(-1718607820) || this.TagComponent.HasTag(-1459213240);
    }
  }
  tZf() {
    if (this._ii === 2) {
      if (this.TagComponent.HasTag(-1718607820) || this.TagComponent.HasTag(-1459213240)) {
        this.jHf?.SwitchKeyItem(this.wZt[2], true);
        this.jHf?.RefreshKeyEnable(true, true);
      } else {
        this.jHf?.SwitchKeyItem(this.wZt[1], true);
        this.jHf?.RefreshKeyEnable(this.TagComponent.HasTag(-405886070), true);
      }
    } else {
      this.jHf?.SwitchKeyItem(this.wZt[0]);
      if (this._ii === 1) {
        this.jHf?.RefreshKeyEnable(true, true);
      }
    }
  }
  f3g(t) {
    if (this._ii !== 1 || t === 0) {
      this.GetSlider(6).SetValue(t);
    }
    if (this._ii === 0) {
      if (this.KJf < 1 && t >= 1) {
        this.PlayTweenAnim(32);
      } else if (!this.xZf && !this.WJf) {
        this.xZf = true;
        this.PlayTweenAnim(24);
      }
    }
    this.KJf = t;
  }
  Eig() {
    this.Sig = false;
    if (this._ii === 1) {
      var i = this.TagComponent.HasTag(958328631) ? 15090000129 : 15090000104;
      var i = BuffById_1.configBuffById.GetConfig(i)?.ModifierMagnitude[0] ?? 0;
      if (i) {
        s = this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID);
        this.YJf.SetSpeed(i / s / ENERGY_DELTA_SEC, true);
      } else {
        this.YJf.SetSpeed(14 / ENERGY_DELTA_SEC / 100, true);
      }
      this.Iig();
    } else if (this._ii === 2) {
      let t = 0;
      var i = this.TagComponent.HasTag(661078136) || this.Plg;
      var s = this.TagComponent.HasTag(906443840);
      if (i && s) {
        this.Iig();
        this.YJf.SetSpeed(0);
      } else if (i) {
        t = this.TagComponent.HasTag(958328631) ? 15090000149 : 15090000142;
      } else if (s) {
        t = this.TagComponent.HasTag(958328631) ? 15090000148 : 15090000141;
      } else {
        this.Iig();
        this.YJf.SetSpeed(0);
      }
      if (t) {
        if (i = BuffById_1.configBuffById.GetConfig(t)?.ModifierMagnitude[0] ?? 0) {
          s = i / ENERGY_DELTA_SEC / this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID);
          this.YJf.SetTargetMode(false);
          this.YJf.SetSpeed(s);
        } else {
          this.Iig();
        }
      }
    }
  }
  Iig() {
    var t = this.yig;
    this.YJf.SetTargetMode(true);
    this.YJf.ResetTarget(t);
  }
  FJf(t) {
    t /= this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID);
    if (this.YJf.IsDone()) {
      this.YJf.Restart();
    }
    this.yig = t;
    if (this._ii === 1) {
      this.Iig();
    }
  }
  nZf(s) {
    if (this._ii !== 0 && (this.Sig && this.Eig(), !this.YJf.IsDone())) {
      var h = this.BuffComponent?.GetTimeScale() ?? 1;
      this.YJf.Tick(s * 0.001 * h);
      let t = this.YJf.Get();
      t = MathUtils_1.MathUtils.Clamp(t, 0, 1);
      let i = MathUtils_1.MathUtils.Lerp(0.437, 0.562, t);
      if (i >= 0.562) {
        i = 0.58;
      }
      this.GetTexture(0).SetFillAmount(i);
      this.GetTexture(23).SetFillAmount(i);
      this.Gue.Yaw = MathUtils_1.MathUtils.Lerp(15, -15, t);
      this.GetItem(18).SetUIRelativeRotation(this.Gue);
      var s = this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID) / 100;
      var h = Math.floor(s * t);
      this.GetArtText(1).SetText(h.toString().padStart(3, "0"));
      this.GetArtText(2).SetText(h.toString());
      var s = this.yig >= 1 && this.YJf.IsDone();
      if (s && this._ii === 1) {
        this.PlayTweenAnim(31);
      }
      if (this._ii === 1) {
        t = 1 - t;
        h = this.PercentMachine.GetCurPercent();
        if (Math.abs(t - h) > 0.2) {
          t = MathUtils_1.MathUtils.Clamp(t, h - 0.2, h + 0.2);
        }
        this.GetSlider(6).SetValue(t);
      }
    }
  }
  VJf(i) {
    i = i ?? this.AttributeComponent.GetCurrentValue(JUMP_ATTR_ID);
    if (this._ii === 2) {
      for (let t = 1; t <= 3; t++) {
        if (t <= i) {
          if (this.zJf.get(t) !== 1) {
            this.zJf.set(t, 1);
            this.PlayTweenAnim(this.JJf.get(t));
          }
        } else if (this.zJf.get(t) !== -1) {
          this.zJf.set(t, -1);
          this.PlayTweenAnim(this.ZJf.get(t));
        }
      }
    } else {
      for (let t = 1; t <= 3; t++) {
        if (this.zJf.get(t) !== -1) {
          this.zJf.set(t, -1);
          this.PlayTweenAnim(this.ZJf.get(t));
        }
      }
    }
  }
  RAg() {
    this.VJf();
    this.GetItem(10)?.SetUIActive(this._ii === 2);
    this.GetItem(12)?.SetUIActive(this._ii === 2);
    this.GetItem(14)?.SetUIActive(this._ii === 2);
  }
  Tick(t) {
    super.Tick(t);
    this.jHf?.Tick(t);
    this.nZf(t);
  }
  OnBeforeDestroy() {
    if (this.WJf) {
      TimerSystem_1.TimerSystem.Remove(this.WJf);
      this.WJf = undefined;
    }
    if (this.Alg) {
      TimerSystem_1.TimerSystem.Remove(this.Alg);
      this.Alg = undefined;
    }
    super.OnBeforeDestroy();
  }
}
exports.SpecialEnergyBarLinNai = SpecialEnergyBarLinNai;
//# sourceMappingURL=SpecialEnergyBarLinNai.js.map