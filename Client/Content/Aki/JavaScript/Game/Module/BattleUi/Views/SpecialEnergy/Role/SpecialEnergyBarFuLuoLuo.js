"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarFuLuoLuo = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase");
const SpecialEnergyBarKeyItem_1 = require("../SpecialEnergyBarKeyItem");
const SpecialEnergyBarFuLuoLuoNoteItem_1 = require("./SpecialEnergyBarFuLuoLuoNoteItem");
const SPECIAL_ENERGY_COUNT = 6;
const lockTag = -686337478;
const burstTag = -968551115;
const disableTag = -1521033040;
const FIRST_NOTE_TIME = 1250;
const NOTE_INTERVAL_TIME = 4000;
const BURST_CONFIG_ID = 160801;
class SpecialEnergyBarFuLuoLuo extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.Rju = undefined;
    this.wju = undefined;
    this.ewu = [];
    this.Lju = [];
    this.Gwc = [];
    this.Aju = [];
    this.Wdt = [];
    this.Pju = [];
    this.Dxt = false;
    this.xju = false;
    this._0d = false;
    this.Dju = false;
    this.Uju = undefined;
    this.kju = 0;
    this.bge = -1;
    this.Oju = (t, i) => {
      this.Euo(i);
    };
    this.qju = (t, i) => {
      this.Gju(i);
    };
    this.Nia = (t, i) => {
      this.u0d(i);
    };
    this.Tfe = () => {
      if (this.Dju) {
        this.AYc();
      }
    };
    this.r1d = () => {
      if (!(this.ewu.length < SPECIAL_ENERGY_COUNT)) {
        let i = -1;
        let e = 0;
        for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
          if ((e = this.ewu[t]) !== 3) {
            i = t;
            break;
          }
        }
        if (e !== 0) {
          for (let t = i + 1; t < SPECIAL_ENERGY_COUNT; t++) {
            if (this.ewu[t] !== e) {
              return;
            }
          }
          this.o1d(i, SPECIAL_ENERGY_COUNT);
        }
      }
    };
    this.aBd = () => {
      this.Fju();
      this.kju++;
      this.Uju = TimerSystem_1.TimerSystem.Loop(this.q7e, NOTE_INTERVAL_TIME, SPECIAL_ENERGY_COUNT - 1, this.bge);
    };
    this.q7e = () => {
      this.Fju();
      this.kju++;
      if (!(this.kju < SPECIAL_ENERGY_COUNT)) {
        this.$ju();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem]];
  }
  OnInitData() {
    this.Rju = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(BURST_CONFIG_ID);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitKeyItem(this.GetItem(0)));
    t.push(this.InitBurstKeyItem(this.GetItem(0)));
    t.push(this.Nju());
    await Promise.all(t);
  }
  async InitBurstKeyItem(t) {
    if (!Info_1.Info.IsInTouch() && !(this.Rju.KeyInfoList.length <= 0)) {
      this.wju = new SpecialEnergyBarKeyItem_1.SpecialEnergyBarKeyItem();
      this.wju.SetConfig(this.Rju);
      await this.wju.CreateThenShowByResourceIdAsync("UiItem_EnergyBarHotKey", t);
    }
  }
  async Nju() {
    var e = [];
    var s = this.GetItem(18).GetOwner();
    for (let i = 0; i < SPECIAL_ENERGY_COUNT + 1; i++) {
      let t = s;
      if (i !== 0) {
        t = LguiUtil_1.LguiUtil.DuplicateActor(s, this.RootItem);
      }
      var h = new SpecialEnergyBarFuLuoLuoNoteItem_1.SpecialEnergyBarFuLuoLuoNoteItem();
      this.Aju.push(h);
      e.push(h.CreateThenShowByActorAsync(t));
    }
    await Promise.all(e);
  }
  OnStart() {
    var t;
    super.OnStart();
    this.Jh = this.RoleData?.EntityHandle?.Entity;
    if (this.Config?.EffectColor) {
      t = UE.Color.FromHex(this.Config.EffectColor);
      this.Gwc.push(t);
    }
    if (this.Config?.OtherEffectColorList) {
      for (const s of this.Config.OtherEffectColorList) {
        var i = UE.Color.FromHex(s);
        this.Gwc.push(i);
      }
    }
    this.InitTweenAnim(13);
    this.InitTweenAnim(14);
    this.InitTweenAnim(15);
    this.InitTweenAnim(16);
    this.InitTweenAnim(17);
    for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
      var e = this.GetItem(7 + t);
      this.Pju.push(e);
      var e = this.GetItem(1 + t);
      this.Wdt.push(e);
    }
    this.n4l(true);
    this.AYc();
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(lockTag, this.Oju);
    this.ListenForTagAddOrRemoveChanged(burstTag, this.qju);
    this.ListenForTagAddOrRemoveChanged(disableTag, this.Nia);
    if (this.Jh) {
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharBeHitTimeScale, this.Tfe);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.Tfe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FuLuoLuoAddDuplicatedEnergy, this.r1d);
  }
  RemoveEvents() {
    super.RemoveEvents();
    if (this.Jh) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharBeHitTimeScale, this.Tfe);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.Tfe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FuLuoLuoAddDuplicatedEnergy, this.r1d);
  }
  OnBeforeDestroy() {
    if (this.wju) {
      this.wju?.Destroy();
      this.wju = undefined;
    }
    super.OnBeforeDestroy();
  }
  AYc() {
    let t = 1;
    var i;
    if (this.BuffComponent) {
      t = this.BuffComponent.GetTimeScale();
    }
    if (this.bge !== t && (this.bge = t, this.Uju && TimerSystem_1.TimerSystem.Has(this.Uju) && (this.bge <= 0 ? TimerSystem_1.TimerSystem.IsPause(this.Uju) || TimerSystem_1.TimerSystem.Pause(this.Uju) : (TimerSystem_1.TimerSystem.IsPause(this.Uju) && TimerSystem_1.TimerSystem.Resume(this.Uju), TimerSystem_1.TimerSystem.ChangeDilation(this.Uju, this.bge))), i = t / Time_1.Time.InverseSelfCenteredTimeDilation, this.SetTweenTimeScale(17, i), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarFuLuoLuo]弗洛洛能量条时停刷新", ["timeScale", this.bge], ["tweenTimeScale", i]);
    }
  }
  OnAttributeChanged() {
    this.n4l();
  }
  OnMaxAttributeChanged() {}
  n4l(t = false) {
    if (!t) {
      r = this.Lju;
      this.Lju = this.ewu;
      this.ewu = r;
    }
    this.ewu.length = 0;
    var i = this.AttributeComponent.GetCurrentValue(this.AttributeId);
    for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
      var e = (SPECIAL_ENERGY_COUNT - t - 1) * 2;
      var e = (i & 3 << e) >> e;
      if (e > 0) {
        this.ewu.push(e);
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "SpecialEnergyBarFuLuoLuo", ["弗洛洛特殊能量", this.ewu], ["", i]);
    }
    if (t) {
      for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
        var s = this.Aju[t];
        var h = this.ewu[t] ?? 0;
        s.SetEnergyType(h);
        s.SetParent(this.Wdt[t]);
      }
      this.Aju[SPECIAL_ENERGY_COUNT].SetEnergyType(0);
      this.Euo(this.TagComponent?.HasTag(lockTag) ?? false, t);
      this.Gju(this.TagComponent?.HasTag(burstTag) ?? false, t);
      this.u0d(this.TagComponent?.HasTag(disableTag) ?? false);
    } else {
      var r = this.Lju.length;
      var _ = this.ewu.length;
      if (r < _) {
        this.Vju();
      } else if (_ === r) {
        let i = -1;
        for (let t = 0; t < _; t++) {
          if (this.Lju[t] !== 3) {
            i = t;
            break;
          }
        }
        if (i >= 0) {
          this.o1d(i, _);
        }
      } else if (!this.xju) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "SpecialEnergyBarFuLuoLuo 弗洛洛不在大招期间特殊能量被清除");
        }
        this.Vju();
      }
    }
    this.eht(t);
    this.Odl(t);
  }
  o1d(i, e) {
    var t = this.Aju.splice(i, 1)[0];
    this.Aju.push(t);
    this.StopTweenAnim(13);
    this.Pju[5].SetAlpha(1);
    t.SetParent(this.Wdt[i]);
    for (let t = 0; t < i; t++) {
      this.Aju[t].SetParent(this.Wdt[t]);
    }
    for (let t = i; t < e; t++) {
      this.Aju[t].SetParent(this.Pju[t]);
    }
    this.Vju();
    this.PlayTweenAnim(13);
  }
  eht(t) {
    if (this.xju) {
      this.KeyItem?.SetUiActive(false);
      this.wju?.SetUiActive(false);
    } else if (this.Dxt) {
      this.KeyItem?.SetUiActive(false);
      this.wju?.SetUiActive(true);
      this.wju?.RefreshKeyEnable(true, t);
    } else {
      this.KeyItem?.SetUiActive(true);
      this.wju?.SetUiActive(false);
    }
  }
  Odl(t) {
    var i = this.GetKeyEnable();
    this.KeyItem?.RefreshKeyEnable(i, t);
  }
  GetKeyEnable() {
    return !(this.ewu.length < SPECIAL_ENERGY_COUNT) && !this._0d;
  }
  u0d(t) {
    if (this._0d !== t) {
      this._0d = t;
      this.Odl(false);
    }
  }
  Vju() {
    for (let t = 0; t < this.Aju.length; t++) {
      var i = this.Aju[t];
      var e = this.ewu[t] ?? 0;
      i.SetEnergyType(e);
    }
  }
  Euo(t, i = false) {
    if (this.Dxt !== t) {
      this.Dxt = t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarFuLuoLuo]弗洛洛锁定状态", ["", t]);
      }
      if (t) {
        this.StopTweenAnim(16);
        this.PlayTweenAnim(15);
      } else {
        this.StopTweenAnim(15);
        this.PlayTweenAnim(16);
      }
      for (const e of this.Aju) {
        e.SetLockState(t);
      }
      if (!i) {
        this.eht(i);
      }
    }
  }
  Gju(t, i = false) {
    if (this.xju !== t && !(this.xju = t, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarFuLuoLuo]弗洛洛大招演奏状态", ["", t]), t ? this.jju() : this.Hju(), i)) {
      this.eht(i);
    }
  }
  jju() {
    if (!this.Dju) {
      this.Dju = true;
      for (let t = this.kju = 0; t < SPECIAL_ENERGY_COUNT; t++) {
        this.Aju[t].SetParent(this.Wdt[t]);
      }
      this.StopTweenAnim(16);
      this.PlayTweenAnim(17);
      this.AYc();
      this.Uju = TimerSystem_1.TimerSystem.Delay(this.aBd, FIRST_NOTE_TIME, undefined, undefined, true);
      if (this.Uju && this.bge !== 1) {
        if (this.bge <= 0) {
          TimerSystem_1.TimerSystem.Pause(this.Uju);
        } else {
          TimerSystem_1.TimerSystem.ChangeDilation(this.Uju, this.bge);
        }
      }
    }
  }
  Hju() {
    this.Dju = false;
    this.StopTweenAnim(17);
    this.PlayTweenAnim(16);
    this.Vju();
    for (const t of this.Wdt) {
      t.SetAlpha(1);
    }
    for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
      var i = this.Aju[t];
      i.SetParent(this.Wdt[t]);
      i.SetPerformState(false);
    }
    this.Aju[SPECIAL_ENERGY_COUNT].SetPerformState(false);
    this.$ju();
    this.AYc();
  }
  Fju() {
    var t = this.Aju.shift();
    this.Aju.push(t);
    t.SetPerformState(true);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarFuLuoLuo]弗洛洛演奏消耗音符", ["index", this.kju]);
    }
  }
  $ju() {
    if (this.Uju && TimerSystem_1.TimerSystem.Has(this.Uju)) {
      TimerSystem_1.TimerSystem.Remove(this.Uju);
      this.Uju = undefined;
    }
  }
}
exports.SpecialEnergyBarFuLuoLuo = SpecialEnergyBarFuLuoLuo;
//# sourceMappingURL=SpecialEnergyBarFuLuoLuo.js.map