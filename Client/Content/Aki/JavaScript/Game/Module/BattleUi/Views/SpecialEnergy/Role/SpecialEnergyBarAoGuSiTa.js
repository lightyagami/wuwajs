"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarAoGuSiTa = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const BattleUiNiagaraItem_1 = require("../../BattleUiNiagaraItem");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarKeyItem_1 = require("../SpecialEnergyBarKeyItem");
const SpecialEnergyBarAoGuSiTaSlot_1 = require("./SpecialEnergyBarAoGuSiTaSlot");
const EFFECT_BASE_PERCENT = 18 / 41;
const ultraTag = 1519720150;
const energyTag = -2009755465;
const CURVE_PATH = "/Game/Aki/UI/UIResources/UiFight/Curve/Ani_UiItem_BarAogusita/Curve_UiItem_BarAogusita_Y.Curve_UiItem_BarAogusita_Y";
const X_MIN = -207;
const X_MAX = 221;
class SpecialEnergyBarAoGuSiTa extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.wZt = [];
    this.Rdt = undefined;
    this.gUd = undefined;
    this.CUd = undefined;
    this.EIu = false;
    this.pUd = false;
    this.vUd = false;
    this.yUd = 0;
    this.TDe = undefined;
    this.Nml = false;
    this.SUd = 0;
    this.l3d = undefined;
    this.Jh = undefined;
    this.Zyn = (t, i) => {
      this.MUd(i);
    };
    this.EUd = t => {
      this.OnEnergyTagChangedC(t);
    };
    this.IUd = (t, i, e) => {
      this.OnAttributeChangedB();
    };
    this.TUd = (t, i, e) => {
      this.OnAttributeChangedB();
    };
    this.fGr = (t, i) => {
      if (t) {
        this.TDe = TimerSystem_1.TimerSystem.Delay(() => {
          this.TDe = undefined;
        }, i * TimeUtil_1.TimeUtil.InverseMillisecond);
      } else if (TimerSystem_1.TimerSystem.Has(this.TDe)) {
        TimerSystem_1.TimerSystem.Remove(this.TDe);
        this.TDe = undefined;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UISliderComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UINiagara], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UINiagara]];
  }
  OnInitData() {
    this.wZt.push(this.Config);
    this.wZt.push(ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(130601));
    this.wZt.push(ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(130602));
    this.gUd = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(130603);
    this.AttributeId = this.gUd.AttributeId;
    this.MaxAttributeId = this.gUd.MaxAttributeId;
    this.SUd = this.gUd.ExtraFloatParams[0] * TimeUtil_1.TimeUtil.InverseMillisecond;
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitBarItem());
    t.push(this.InitKeyItem(this.GetItem(13)));
    t.push(this.NWr());
    await Promise.all(t);
  }
  async InitBarItem() {
    this.Rdt = new SpecialEnergyBarAoGuSiTaSlot_1.SpecialEnergyBarAoGuSiTaSlot();
    this.Rdt.ForceHideBottomLine = true;
    this.Rdt.ForceEffectBasePercent = EFFECT_BASE_PERCENT;
    this.Rdt.InitData(this.RoleData, this.Config, true);
    await this.Rdt.InitByActorAsync(this.GetItem(4).GetOwner());
  }
  async InitKeyItem(t) {
    if (!Info_1.Info.IsInTouch()) {
      this.KeyItem = new SpecialEnergyBarKeyItem_1.SpecialEnergyBarKeyItem();
      this.KeyItem.SetConfig(this.gUd);
      await this.KeyItem.CreateThenShowByResourceIdAsync("UiItem_EnergyBarHotKey", t);
    }
  }
  async NWr() {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(CURVE_PATH, UE.CurveFloat, t => {
      if (t) {
        this.CUd = t;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "[SpecialEnergyBarAoGuSiTa]加载曲线失败", ["path", CURVE_PATH]);
      }
      i.SetResult();
    }, 103);
    return i.Promise;
  }
  OnStart() {
    this.InitTweenAnim(14);
    this.InitTweenAnim(15);
    this.InitTweenAnim(16);
    this.l3d = new BattleUiNiagaraItem_1.BattleUiNiagaraItem(this.GetUiNiagara(17));
    this.l3d.Duration = 500;
    this.GetItem(10)?.SetAlpha(1);
    var t = this.TagComponent?.HasTag(ultraTag) ?? false;
    this.MUd(t, true);
    this.OnAttributeChangedB(true);
    var t = this.TagComponent?.GetTagCount(energyTag) ?? 0;
    this.OnEnergyTagChangedC(t, true);
    this.Gdl(true);
    this.eht();
    this.Jh = this.RoleData?.EntityHandle?.Entity;
  }
  OnBeforeDestroy() {
    if (this.l3d) {
      this.l3d.Stop();
      this.l3d = undefined;
    }
    super.OnBeforeDestroy();
  }
  ClearAllTweenAnim() {
    this.StopTweenAnim(16);
    super.ClearAllTweenAnim();
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(ultraTag, this.Zyn);
    this.ListenForTagCountChanged(energyTag, this.EUd);
    this.ListenForAttributeChanged(this.wZt[1].AttributeId, this.IUd);
    this.ListenForAttributeChanged(this.wZt[1].MaxAttributeId, this.TUd);
    if (this.Jh) {
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.OnAbsoluteTimeStop, this.fGr);
    }
  }
  RemoveEvents() {
    super.RemoveEvents();
    this.RemoveListenAttributeChanged(this.wZt[1].AttributeId, this.IUd);
    this.RemoveListenAttributeChanged(this.wZt[1].MaxAttributeId, this.TUd);
    if (this.Jh) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.OnAbsoluteTimeStop, this.fGr);
    }
  }
  OnAttributeChangedB(t = false) {
    var i = this.AttributeComponent.GetCurrentValue(this.wZt[1].AttributeId);
    var e = this.AttributeComponent.GetCurrentValue(this.wZt[1].MaxAttributeId);
    let s = 0;
    if (e > 0) {
      s = i / e;
    }
    var h = this.GetTexture(3);
    h?.SetFillAmount(s);
    var e = e <= i;
    if ((this.vUd !== e || !!t) && !(this.vUd = e, h?.SetUIActive(!e), this.GetItem(9)?.SetUIActive(e), e ? (this.StopTweenAnim(15), this.PlayTweenAnim(14)) : (this.StopTweenAnim(14), this.PlayTweenAnim(15)), t)) {
      this.eht();
    }
  }
  OnEnergyTagChangedC(t, i = false) {
    this.bUd(Math.min(t, 2), i);
  }
  bUd(t, i = false) {
    if ((this.yUd !== t || !!i) && !(this.yUd = t, this.GetItem(1)?.SetUIActive(t > 0), this.GetItem(2)?.SetUIActive(t > 1), i)) {
      this.eht();
    }
  }
  OnAttributeChanged() {
    super.OnAttributeChanged();
    if (this.PercentMachine.GetTargetPercent() > 0) {
      this.l3d?.Play();
    }
  }
  OnBarPercentChanged() {
    this.Gdl();
  }
  Gdl(t = false) {
    var i = this.PercentMachine.GetCurPercent();
    this.GetTexture(5).SetFillAmount(i);
    this.GetSlider(8).SetValue(i);
    var e = X_MIN + (X_MAX - X_MIN) * i;
    var s = this.CUd?.GetFloatValue(e) ?? i;
    var h = this.GetUiNiagara(12);
    h.SetAnchorOffsetX(e);
    h.SetAnchorOffsetY(s);
    this.RUd(i >= 1, t);
    var e = this.GetKeyEnable();
    this.KeyItem?.RefreshKeyEnable(e, t);
  }
  RUd(t, i = false) {
    if (this.pUd !== t || !!i) {
      this.pUd = t;
      this.GetTexture(5).SetUIActive(!t);
      this.GetItem(7).SetUIActive(!t);
      this.GetUiNiagara(12).SetUIActive(!t);
      this.GetItem(11).SetUIActive(t);
    }
  }
  eht() {
    if (this.yUd > 1) {
      this.Rdt?.SetKeyItemType(2);
    } else if (this.vUd) {
      this.Rdt?.SetKeyItemType(1);
    } else {
      this.Rdt?.SetKeyItemType(0);
    }
  }
  MUd(t, i = false) {
    if (this.EIu !== t || !!i) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "奥古斯塔能量条状态改变", ["[false普通,true大招]", t]);
      }
      this.EIu = t;
      this.GetItem(0)?.SetUIActive(!t);
      this.GetItem(10)?.SetUIActive(t);
    }
  }
  bMc(t) {
    if (this.Nml !== t) {
      if (this.Nml = t) {
        this.PlayTweenAnim(16);
      } else {
        this.StopTweenAnim(16);
        this.GetItem(10)?.SetAlpha(1);
      }
    }
  }
  Tick(t) {
    super.Tick(t);
    this.Rdt?.Tick(t);
    if (!this.EIu || !TimerSystem_1.TimerSystem.Has(this.TDe) || (t = TimerSystem_1.TimerSystem.GetNextRemainTime(this.TDe)) <= 0) {
      this.bMc(false);
    } else {
      this.bMc(t < this.SUd);
    }
  }
}
exports.SpecialEnergyBarAoGuSiTa = SpecialEnergyBarAoGuSiTa;
//# sourceMappingURL=SpecialEnergyBarAoGuSiTa.js.map