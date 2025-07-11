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
const FIRST_NOTE_TIME = 2000;
const NOTE_INTERVAL_TIME = 4000;
const BURST_CONFIG_ID = 160801;
class SpecialEnergyBarFuLuoLuo extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.Gjc = undefined;
    this.Fjc = undefined;
    this.KRu = [];
    this.Njc = [];
    this.Gwc = [];
    this.Vjc = [];
    this.Wdt = [];
    this.jjc = [];
    this.Dxt = false;
    this.Hjc = false;
    this.$jc = false;
    this.Wjc = undefined;
    this.Qjc = 0;
    this.Kjc = 0;
    this.bge = -1;
    this.Xjc = (t, i) => {
      this.Euo(i);
    };
    this.Yjc = (t, i) => {
      this.zjc(i);
    };
    this.Tfe = () => {
      if (this.$jc) {
        this.sQc();
      }
    };
    this.q7e = () => {
      if (this.Qjc !== 0 && !(Time_1.Time.PlayerWorldTime < this.Qjc)) {
        this.Jjc();
        this.Kjc++;
        if (this.Kjc < SPECIAL_ENERGY_COUNT) {
          this.Qjc += NOTE_INTERVAL_TIME;
        } else {
          this.Qjc = 0;
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem]];
  }
  OnInitData() {
    this.Gjc = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(BURST_CONFIG_ID);
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.InitKeyItem(this.GetItem(0)));
    t.push(this.InitBurstKeyItem(this.GetItem(0)));
    t.push(this.Zjc());
    await Promise.all(t);
  }
  async InitBurstKeyItem(t) {
    if (!Info_1.Info.IsInTouch() && !(this.Gjc.KeyInfoList.length <= 0)) {
      this.Fjc = new SpecialEnergyBarKeyItem_1.SpecialEnergyBarKeyItem();
      this.Fjc.SetConfig(this.Gjc);
      await this.Fjc.CreateThenShowByResourceIdAsync("UiItem_EnergyBarHotKey", t);
    }
  }
  async Zjc() {
    var e = [];
    var s = this.GetItem(18).GetOwner();
    for (let i = 0; i < SPECIAL_ENERGY_COUNT + 1; i++) {
      let t = s;
      if (i !== 0) {
        t = LguiUtil_1.LguiUtil.DuplicateActor(s, this.RootItem);
      }
      var h = new SpecialEnergyBarFuLuoLuoNoteItem_1.SpecialEnergyBarFuLuoLuoNoteItem();
      this.Vjc.push(h);
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
      this.jjc.push(e);
      var e = this.GetItem(1 + t);
      this.Wdt.push(e);
    }
    this.n4l(true);
    this.sQc();
  }
  AddEvents() {
    super.AddEvents();
    this.ListenForTagAddOrRemoveChanged(lockTag, this.Xjc);
    this.ListenForTagAddOrRemoveChanged(burstTag, this.Yjc);
    if (this.Jh) {
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharBeHitTimeScale, this.Tfe);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.Tfe);
  }
  RemoveEvents() {
    super.RemoveEvents();
    if (this.Jh) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharBeHitTimeScale, this.Tfe);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.Tfe);
  }
  OnBeforeDestroy() {
    if (this.Fjc) {
      this.Fjc?.Destroy();
      this.Fjc = undefined;
    }
    super.OnBeforeDestroy();
  }
  sQc() {
    let t = 1;
    if (this.BuffComponent) {
      t = this.BuffComponent.GetTimeScale();
    }
    if (this.bge !== t && (this.bge = t, this.Wjc && TimerSystem_1.GameplayTimerSystem.Has(this.Wjc) && TimerSystem_1.GameplayTimerSystem.ChangeDilation(this.Wjc, this.bge), this.SetTweenTimeScale(17, t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarFuLuoLuo]弗洛洛能量条时停刷新", ["timeScale", this.bge]);
    }
  }
  OnAttributeChanged() {
    this.n4l();
  }
  OnMaxAttributeChanged() {}
  n4l(t = false) {
    if (!t) {
      r = this.Njc;
      this.Njc = this.KRu;
      this.KRu = r;
    }
    this.KRu.length = 0;
    var i = this.AttributeComponent.GetCurrentValue(this.AttributeId);
    for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
      var e = (SPECIAL_ENERGY_COUNT - t - 1) * 2;
      var e = (i & 3 << e) >> e;
      if (e > 0) {
        this.KRu.push(e);
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "SpecialEnergyBarFuLuoLuo", ["弗洛洛特殊能量", this.KRu], ["", i]);
    }
    if (t) {
      for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
        var s = this.Vjc[t];
        var h = this.KRu[t] ?? 0;
        s.SetEnergyType(h);
        s.SetParent(this.Wdt[t]);
      }
      this.Vjc[SPECIAL_ENERGY_COUNT].SetEnergyType(0);
      this.Euo(this.TagComponent?.HasTag(lockTag) ?? false, t);
      this.zjc(this.TagComponent?.HasTag(burstTag) ?? false, t);
    } else {
      var r = this.Njc.length;
      var o = this.KRu.length;
      if (r < o) {
        this.e9c();
      } else if (o === r) {
        let i = -1;
        for (let t = 0; t < o; t++) {
          if (this.Njc[t] !== 3) {
            i = t;
            break;
          }
        }
        if (i >= 0) {
          r = this.Vjc.splice(i, 1)[0];
          this.Vjc.push(r);
          this.StopTweenAnim(13);
          this.jjc[5].SetAlpha(1);
          r.SetParent(this.Wdt[i]);
          for (let t = 0; t < i; t++) {
            this.Vjc[t].SetParent(this.Wdt[t]);
          }
          for (let t = i; t < o; t++) {
            this.Vjc[t].SetParent(this.jjc[t]);
          }
          this.e9c();
          this.PlayTweenAnim(13);
        }
      } else if (!this.Hjc) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "SpecialEnergyBarFuLuoLuo 弗洛洛不在大招期间特殊能量被清除");
        }
        this.e9c();
      }
    }
    this.eht(t);
  }
  eht(t) {
    var i;
    if (this.Hjc) {
      this.KeyItem?.SetUiActive(false);
      this.Fjc?.SetUiActive(false);
    } else if (this.Dxt) {
      this.KeyItem?.SetUiActive(false);
      this.Fjc?.SetUiActive(true);
      this.Fjc?.RefreshKeyEnable(true, t);
    } else {
      this.KeyItem?.SetUiActive(true);
      this.Fjc?.SetUiActive(false);
      i = this.KRu.length >= SPECIAL_ENERGY_COUNT;
      this.KeyItem?.RefreshKeyEnable(i, t);
    }
  }
  e9c() {
    for (let t = 0; t < this.Vjc.length; t++) {
      var i = this.Vjc[t];
      var e = this.KRu[t] ?? 0;
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
      for (const e of this.Vjc) {
        e.SetLockState(t);
      }
      if (!i) {
        this.eht(i);
      }
    }
  }
  zjc(t, i = false) {
    if (this.Hjc !== t && !(this.Hjc = t, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarFuLuoLuo]弗洛洛大招演奏状态", ["", t]), t ? this.t9c() : this.i9c(), i)) {
      this.eht(i);
    }
  }
  t9c() {
    if (!this.$jc) {
      this.$jc = true;
      this.Qjc = Time_1.Time.PlayerWorldTime + FIRST_NOTE_TIME;
      for (let t = this.Kjc = 0; t < SPECIAL_ENERGY_COUNT; t++) {
        this.Vjc[t].SetParent(this.Wdt[t]);
      }
      this.StopTweenAnim(16);
      this.PlayTweenAnim(17);
      this.Wjc = TimerSystem_1.GameplayTimerSystem.Forever(this.q7e, 500);
      this.sQc();
    }
  }
  i9c() {
    this.$jc = false;
    this.StopTweenAnim(17);
    this.PlayTweenAnim(16);
    this.e9c();
    for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
      var i = this.Vjc[t];
      i.SetParent(this.Wdt[t]);
      i.SetPerformState(false);
    }
    this.Vjc[SPECIAL_ENERGY_COUNT].SetPerformState(false);
    for (const t of this.Wdt) {
      t.SetAlpha(1);
    }
    this.r9c();
    this.sQc();
  }
  Jjc() {
    var t = this.Vjc.shift();
    this.Vjc.push(t);
    t.SetPerformState(true);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[SpecialEnergyBarFuLuoLuo]弗洛洛演奏消耗音符", ["index", this.Kjc]);
    }
  }
  r9c() {
    if (this.Wjc && TimerSystem_1.GameplayTimerSystem.Has(this.Wjc)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Wjc);
      this.Wjc = undefined;
    }
  }
}
exports.SpecialEnergyBarFuLuoLuo = SpecialEnergyBarFuLuoLuo;
//# sourceMappingURL=SpecialEnergyBarFuLuoLuo.js.map