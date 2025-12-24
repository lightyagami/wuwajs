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
    this.ijf = true;
    this.le = 0;
    this.rjf = [];
    this.Vfn = 0;
    this.ojf = 1;
    this.kJf = 1;
  }
  SetTargetMode(t) {
    this.ijf = t;
  }
  ResetTarget(t, i) {
    this.Vfn = 0;
    this.rjf.length = 0;
    this.rjf.push(t);
    if (i !== undefined) {
      this.rjf.push(i);
    }
    this.ojf = Math.abs(this.ojf);
  }
  get Speed() {
    return this.ojf;
  }
  SetSpeed(t, i = false) {
    if (this.ijf) {
      t = Math.abs(t);
    }
    this.kJf = t;
    if (i || !this.ijf || this.ijf && (this.IsDone() || t !== 0)) {
      this.ojf = t;
    }
  }
  SetCurrent(t) {
    this.le = t;
  }
  Restart() {
    if (!this.ijf) {
      this.le = MathUtils_1.MathUtils.Clamp(this.le, 0, 1);
    }
  }
  IsDone() {
    if (this.ijf) {
      return this.Vfn >= this.rjf.length;
    } else {
      return this.ojf === 0 || this.le < 0 || this.le > 1;
    }
  }
  Tick(t) {
    var i;
    var s;
    if (this.ijf) {
      if (!(this.Vfn >= this.rjf.length)) {
        i = this.rjf[this.Vfn];
        s = Math.sign(i - this.le);
        this.le += s * this.ojf * t;
        if (s > 0 && this.le >= i || s < 0 && this.le <= i) {
          this.le = i;
          this.ojf = this.kJf;
          this.Vfn++;
        }
      }
    } else {
      this.le += this.ojf * t;
    }
  }
  Get() {
    return this.le;
  }
}
const PAINT_ATTR_ID = CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2;
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
    this.t3f = undefined;
    this._ii = 0;
    this.wZt = [];
    this.x7f = 300;
    this.B7f = (t, i, s) => {
      this.k7f(i);
      var h = this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID);
      if (Math.abs(i - s) / h > 0.3) {
        this.W7f.SetCurrent(i / h);
      } else if (this._ii === 1 && Math.abs(this.W7f.Get() - i / h) > 0.2 || this._ii === 2 && Math.abs(this.W7f.Get() - i / h) > 0.1) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 96, "琳奈能量条 速度值修正", ["n", i], ["c", this.W7f.Get()]);
        }
        this.W7f.SetCurrent(i / h);
      }
    };
    this.q7f = (t, i, s) => {
      this.O7f(i);
    };
    this.UWi = (t, i) => {
      this._Oe();
    };
    this.A9f = (t, i) => {
      this.z7f();
    };
    this.G7f = (t, i) => {
      this.z7f();
    };
    this.eZf = (t, i) => {
      this._eg(true);
    };
    this.ueg = false;
    this.V7f = undefined;
    this.D9f = false;
    this.j7f = 0;
    this.njf = 0;
    this.W7f = new NeedleNumber();
    this.Gue = new UE.Rotator(0, 0, 0);
    this.sjf = false;
    this.bKf = false;
    this.RKf = undefined;
    this.ajf = (t, i) => {
      if (t === 661078136) {
        if (i) {
          this.bKf = false;
        } else {
          this.bKf = true;
          this.RKf = TimerSystem_1.TimerSystem.Delay(() => {
            this.RKf = undefined;
            this.bKf = false;
            this.sjf = true;
          }, CHECK_LOST_MOVETAG, undefined, undefined, true, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
        }
      }
      this.sjf = true;
    };
    this.Q7f = new Map();
    this.K7f = new Map([[1, 27], [2, 28], [3, 29]]);
    this.X7f = new Map([[1, 33], [2, 34], [3, 35]]);
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
    this.ListenForAttributeChanged(ENERGY_ATTR_ID, this.B7f);
    this.ListenForAttributeChanged(JUMP_ATTR_ID, this.q7f);
    this.ListenForTagAddOrRemoveChanged(35512583, this.UWi);
    this.ListenForTagAddOrRemoveChanged(1078757575, this.UWi);
    this.ListenForTagAddOrRemoveChanged(141014932, this.ajf);
    this.ListenForTagAddOrRemoveChanged(-1046527165, this.ajf);
    this.ListenForTagAddOrRemoveChanged(906443840, this.ajf);
    this.ListenForTagAddOrRemoveChanged(661078136, this.ajf);
    this.ListenForTagAddOrRemoveChanged(958328631, this.ajf);
    this.ListenForTagAddOrRemoveChanged(-922579053, this.eZf);
    this.ListenForTagAddOrRemoveChanged(-1718607820, this.G7f);
    this.ListenForTagAddOrRemoveChanged(-1459213240, this.G7f);
    this.ListenForTagAddOrRemoveChanged(-405886070, this.A9f);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.t3f = new SpecialEnergyBarLinNaiSlot_1.SpecialEnergyBarLinNaiSlot();
    this.t3f.InitData(this.RoleData, this.Config);
    (this.t3f.OwnerLogic = this).t3f.ForceHideBottomLine = true;
    await this.t3f.InitByActorAsync(this.GetItem(5).GetOwner());
  }
  OnStart() {
    super.OnStart();
    for (let t = 24; t <= 38; t++) {
      this.InitTweenAnim(t);
    }
    this.x7f = (this.TweenAnimPlayer?.GetDuration(30) ?? 0.3) * 1000;
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    this._Oe(true);
    this._eg(true);
    if (this._ii === 0) {
      this.OnBarPercentChanged();
    } else {
      this.O7f();
      this.hjf();
      this.t9f(0);
    }
  }
  ClearAllTweenAnim() {
    this.TweenAnimPlayer?.Clear(true);
    super.ClearAllTweenAnim();
  }
  OnBarPercentChanged() {
    var t = this.PercentMachine.GetCurPercent();
    this.Y7f(t);
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
      this.j7f = 0;
      var h = this.AttributeComponent.GetCurrentValue(ENERGY_ATTR_ID);
      var e = this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 96, "琳奈能量条改变状态", ["new", t], ["old", s]);
      }
      this.TweenAnimPlayer?.StopAll();
      var i = t === 0;
      this.GetArtText(2).SetUIActive(!i);
      switch (t) {
        case 0:
          this.D9f = false;
          var r = this.AttributeComponent.GetCurrentValue(PAINT_ATTR_ID);
          this.GetSlider(6).SetValue(r);
          this.GetArtText(1).SetText("000");
          if (s === 2) {
            this.PlayTweenAnim(30);
            if (r > 0) {
              this.V7f = TimerSystem_1.TimerSystem.Delay(() => {
                this.V7f = undefined;
                this.D9f = true;
                this.PlayTweenAnim(24);
              }, this.x7f, undefined, undefined, true, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
            }
          } else if (r > 0) {
            this.PlayTweenAnim(24);
          }
          break;
        case 1:
          this.W7f.SetCurrent(h / e);
          this.sjf = true;
          this.PlayTweenAnim(25);
          break;
        case 2:
          this.W7f.SetCurrent(h / e);
          this.sjf = true;
          this.PlayTweenAnim(s === 0 ? 36 : 26);
      }
      this._tg();
      this._eg();
      this.z7f();
    }
  }
  _eg(t = false) {
    var i = this.TagComponent?.HasTag(-922579053) ?? false;
    if (!!t || this.ueg !== i) {
      this.PlayTweenAnim(i ? 38 : 37);
    }
    this.ueg = i;
  }
  GetKeyEnable() {
    if (this._ii === 0) {
      return super.GetKeyEnable();
    } else {
      return this._ii === 1 || this.TagComponent.HasTag(-405886070) || this.TagComponent.HasTag(-1718607820) || this.TagComponent.HasTag(-1459213240);
    }
  }
  z7f() {
    if (this._ii === 2) {
      if (this.TagComponent.HasTag(-1718607820) || this.TagComponent.HasTag(-1459213240)) {
        this.t3f?.SwitchKeyItem(this.wZt[2], true);
        this.t3f?.RefreshKeyEnable(true, true);
      } else {
        this.t3f?.SwitchKeyItem(this.wZt[1], true);
        this.t3f?.RefreshKeyEnable(this.TagComponent.HasTag(-405886070), true);
      }
    } else {
      this.t3f?.SwitchKeyItem(this.wZt[0]);
      if (this._ii === 1) {
        this.t3f?.RefreshKeyEnable(true, true);
      }
    }
  }
  Y7f(t) {
    if (this._ii !== 1 || t === 0) {
      this.GetSlider(6).SetValue(t);
    }
    if (this._ii === 0) {
      if (this.j7f < 1 && t >= 1) {
        this.PlayTweenAnim(32);
      } else if (!this.D9f && !this.V7f) {
        this.D9f = true;
        this.PlayTweenAnim(24);
      }
    }
    this.j7f = t;
  }
  hjf() {
    this.sjf = false;
    if (this._ii === 1) {
      var i = this.TagComponent.HasTag(958328631) ? 15090000129 : 15090000104;
      var i = BuffById_1.configBuffById.GetConfig(i)?.ModifierMagnitude[0] ?? 0;
      if (i) {
        s = this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID);
        this.W7f.SetSpeed(i / s / ENERGY_DELTA_SEC, true);
      } else {
        this.W7f.SetSpeed(14 / ENERGY_DELTA_SEC / 100, true);
      }
      this.ljf();
    } else if (this._ii === 2) {
      let t = 0;
      var i = this.TagComponent.HasTag(661078136) || this.bKf;
      var s = this.TagComponent.HasTag(906443840);
      if (i && s) {
        this.ljf();
        this.W7f.SetSpeed(0);
      } else if (i) {
        t = this.TagComponent.HasTag(958328631) ? 15090000149 : 15090000142;
      } else if (s) {
        t = this.TagComponent.HasTag(958328631) ? 15090000148 : 15090000141;
      } else {
        this.ljf();
        this.W7f.SetSpeed(0);
      }
      if (t) {
        if (i = BuffById_1.configBuffById.GetConfig(t)?.ModifierMagnitude[0] ?? 0) {
          s = i / ENERGY_DELTA_SEC / this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID);
          this.W7f.SetTargetMode(false);
          this.W7f.SetSpeed(s);
        } else {
          this.ljf();
        }
      }
    }
  }
  ljf() {
    var t = this.njf;
    this.W7f.SetTargetMode(true);
    this.W7f.ResetTarget(t);
  }
  k7f(t) {
    t /= this.AttributeComponent.GetCurrentValue(ENERGY_MAX_ATTR_ID);
    if (this.W7f.IsDone()) {
      this.W7f.Restart();
    }
    this.njf = t;
    if (this._ii === 1) {
      this.ljf();
    }
  }
  t9f(s) {
    if (this._ii !== 0 && (this.sjf && this.hjf(), !this.W7f.IsDone())) {
      this.W7f.Tick(s * 0.001);
      let t = this.W7f.Get();
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
      var s = Math.floor(s * t);
      this.GetArtText(1).SetText(s.toString().padStart(3, "0"));
      this.GetArtText(2).SetText(s.toString());
      var s = this.njf >= 1 && this.W7f.IsDone();
      if (s && this._ii === 1) {
        this.PlayTweenAnim(31);
      }
      if (this._ii === 1) {
        t = 1 - t;
        s = this.PercentMachine.GetCurPercent();
        if (Math.abs(t - s) > 0.2) {
          t = MathUtils_1.MathUtils.Clamp(t, s - 0.2, s + 0.2);
        }
        this.GetSlider(6).SetValue(t);
      }
    }
  }
  O7f(i) {
    i = i ?? this.AttributeComponent.GetCurrentValue(JUMP_ATTR_ID);
    if (this._ii === 2) {
      for (let t = 1; t <= 3; t++) {
        if (t <= i) {
          if (this.Q7f.get(t) !== 1) {
            this.Q7f.set(t, 1);
            this.PlayTweenAnim(this.K7f.get(t));
          }
        } else if (this.Q7f.get(t) !== -1) {
          this.Q7f.set(t, -1);
          this.PlayTweenAnim(this.X7f.get(t));
        }
      }
    } else {
      for (let t = 1; t <= 3; t++) {
        if (this.Q7f.get(t) !== -1) {
          this.Q7f.set(t, -1);
          this.PlayTweenAnim(this.X7f.get(t));
        }
      }
    }
  }
  _tg() {
    this.O7f();
    this.GetItem(10)?.SetUIActive(this._ii === 2);
    this.GetItem(12)?.SetUIActive(this._ii === 2);
    this.GetItem(14)?.SetUIActive(this._ii === 2);
  }
  Tick(t) {
    super.Tick(t);
    this.t3f?.Tick(t);
    this.t9f(t);
  }
  OnBeforeDestroy() {
    if (this.V7f) {
      TimerSystem_1.TimerSystem.Remove(this.V7f);
      this.V7f = undefined;
    }
    if (this.RKf) {
      TimerSystem_1.TimerSystem.Remove(this.RKf);
      this.RKf = undefined;
    }
    super.OnBeforeDestroy();
  }
}
exports.SpecialEnergyBarLinNai = SpecialEnergyBarLinNai;
//# sourceMappingURL=SpecialEnergyBarLinNai.js.map