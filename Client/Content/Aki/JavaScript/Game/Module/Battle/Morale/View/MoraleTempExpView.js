"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleTempExpView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  BattleVisibleChildView_1 = require("../../../BattleUi/Views/BattleChildView/BattleVisibleChildView"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  EXP_UNIT_COUNT = 10,
  EXP_PROGRESS_STEP = 1 / EXP_UNIT_COUNT,
  EXP_UNIT_TWEEN_INTERVAL = 20,
  CROSS_LEVEL_DIFF = 3;
class MoraleTempExpView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments), this.tL1 = void 0, this.sH1 = void 0, this.aH1 = void 0, this.Vhu = void 0, this.hH1 = [], this.SPe = void 0, this.Wft = 1, this.iki = 1, this.UQ = 1, this.aL1 = 0, this.lL1 = !0, this.lH1 = -1, this._H1 = void 0, this.U0n = 0, this.jhu = !1, this.Hhu = EXP_UNIT_TWEEN_INTERVAL, this.mdu = CROSS_LEVEL_DIFF, this.uH1 = (i, s, e, h) => {
      if (this.GetVisible() && (i !== s || e !== h)) {
        var r, a = ModelManager_1.ModelManager.MoraleBattleModel;
        if (h === e ? this.lL1 = i < s : (this.lL1 = e < h, this.UQ = a.GetTempMoraleMaxLevel()), this.lL1) {
          let t = !1;
          2 !== this.U0n && h - e >= this.mdu && (t = !0), 0 !== this.U0n || t ? 2 === this.U0n || t ? (this.aL1 = a.GetTempMoraleExpProgress(), this.Wft = h, this.iki = h, t && this.$hu()) : 1 === this.U0n ? (this.aL1 = a.GetTempMoraleExpProgress(), this.iki = h) : 4 !== this.U0n && 3 !== this.U0n || (this.aL1 = a.GetTempMoraleExpProgress(), this.iki = h, this.jhu = !0) : (s = a.GetTempLevelExpRange(e), r = a.GetTempMoraleLevelUpExp(e), i = (i - s[0]) / r, this.aL1 = a.GetTempMoraleExpProgress(), this.Wft = e, this.iki = h, this.aW1(e), this.cH1(i), this.dH1(!0))
        } else this.aL1 = a.GetTempMoraleExpProgress(), this.Wft = h, this.iki = h, this.cH1(this.aL1, 3), this.aW1(h), e === h ? this.R1u() : this.Whu()
      }
    }, this.$xt = t => {
      "YJ" === t && 2 === this.U0n ? (this.U0n = 0, this.mL1(), this.cH1(this.aL1), this.aW1(this.iki), this.Vhu?.SetUIActive(!1), this.iki === this.UQ && this.Qhu()) : ("Decline" === t && 4 === this.U0n || "Decline01" === t && 3 === this.U0n) && (this.U0n = 0, this.jhu) && (this.dH1(), this.jhu = !1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIArtText],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ]
  }
  async OnCreateAsync() {
    var i = [];
    for (let t = 0; t < EXP_UNIT_COUNT; t++) i.push(this.mH1());
    await Promise.all(i)
  }
  OnStart() {
    super.OnStart(), this.InitChildType(11), this.Ore(), this.UQ = ModelManager_1.ModelManager.MoraleBattleModel.GetTempMoraleMaxLevel(), this.Hhu = Math.max(EXP_UNIT_TWEEN_INTERVAL, CommonParamById_1.configCommonParamById.GetIntConfig("MoraleTempExpUnitInterval") ?? EXP_UNIT_TWEEN_INTERVAL), this.mdu = CommonParamById_1.configCommonParamById.GetIntConfig("MoraleTempExpCrossLevel") ?? CROSS_LEVEL_DIFF, this.tL1 = this.GetArtText(0), this.sH1 = this.GetItem(2), this.aH1 = this.GetSprite(1), this.aH1?.SetUIActive(!1), this.GetItem(3)?.SetUIActive(!1), this.Vhu = this.GetItem(4), this.Vhu?.SetUIActive(!1);
    var i = new Rotator_1.Rotator(0, 180, 0);
    for (let t = 0; t < this.hH1.length; t++) {
      var s = this.hH1[t];
      s.SetIndex(t), t % 2 == 1 && s.GetRootItem().SetUIRelativeRotation(i.ToUeRotator()), s.GetRootItem().SetUIParent(this.sH1)
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.SPe.BindSequenceCloseEvent(this.$xt)
  }
  OnBeforeDestroy() {
    for (const t of this.hH1) t.Clean();
    this.hH1.length = 0, super.OnBeforeDestroy()
  }
  Reset() {
    this.kre(), super.Reset()
  }
  async mH1() {
    var t = new MoraleTempExpUnit;
    this.hH1.push(t), await t.CreateByResourceIdAsync("UiItem_MoraleFightBarArrow")
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleTempExpChanged, this.uH1)
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleTempExpChanged, this.uH1)
  }
  OnShowBattleChildView() {
    this.dL1()
  }
  OnHideBattleChildView() {
    this.Khu(), this.U0n = 0
  }
  dL1() {
    var t = ModelManager_1.ModelManager.MoraleBattleModel,
      t = (this.Wft = t.GetTempMoraleLevel(), this.iki = this.Wft, this.aL1 = t.GetTempMoraleExpProgress(), this.UQ = t.GetTempMoraleMaxLevel(), this.cH1(this.aL1), this.aW1(this.iki), this.iki === this.UQ);
    this.Vhu?.SetUIActive(t), this.aH1?.SetUIActive(t)
  }
  aW1(t) {
    t = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel() + t;
    this.tL1?.SetText(t.toString())
  }
  mL1() {
    this.SPe?.PlaySequencePurely("Up")
  }
  $hu() {
    this.Khu(), this.SPe?.PlaySequencePurely("YJ"), this.Vhu?.SetUIActive(!0), this.U0n = 2
  }
  R1u() {
    this.Khu(), this.SPe?.PlaySequencePurely("Decline01"), this.sH1?.SetUIActive(!0), this.Vhu?.SetUIActive(!1), this.aH1?.SetUIActive(!1), this.U0n = 3
  }
  Whu() {
    this.Khu(), this.SPe?.PlaySequencePurely("Decline"), this.sH1?.SetUIActive(!0), this.Vhu?.SetUIActive(!1), this.aH1?.SetUIActive(!1), this.U0n = 4
  }
  Qhu() {
    this.Khu(), this.SPe?.PlaySequencePurely("MaxStart"), this.Vhu?.SetUIActive(!0), this.aH1?.SetUIActive(!0), this.U0n = 5
  }
  Khu() {
    switch (this.U0n) {
      case 2:
        this.SPe?.IsPlayingSequence("YJ") && this.SPe?.StopSequenceByKey("YJ", !1, !0);
        break;
      case 3:
        this.SPe?.IsPlayingSequence("Decline01") && this.SPe?.StopSequenceByKey("Decline01", !1, !0);
        break;
      case 4:
        this.SPe?.IsPlayingSequence("Decline") && this.SPe?.StopSequenceByKey("Decline", !1, !0);
        break;
      case 5:
        this.SPe?.IsPlayingSequence("MaxStart") && this.SPe?.StopSequenceByKey("MaxStart", !1, !0), this.RootActor?.StopSequenceByKey("MaxLoop")
    }
  }
  cH1(t, i) {
    this.lH1 = -1;
    for (const s of this.hH1) s.Reset(), s.IsShowUnit(t) ? (this.lH1 = s.Index, s.ShowUnit(), i && s.PlayTweenAnim(i)) : s.HideUnit()
  }
  dH1(i = !1) {
    let s = this.lL1 ? this.lH1 + 1 : this.lH1 - 1;
    if (i && !this.lL1 && (s += 1), s >= EXP_UNIT_COUNT) this.Wft !== this.iki ? (this.Wft += 1, this.aW1(this.Wft), this.cH1(0), this.mL1(), this.Wft === this.UQ ? this.Qhu() : this.dH1()) : this.Wft === this.UQ - 1 && 1 === this.aL1 ? this.Qhu() : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[MoraleTempExpView]进度动画播放有问题"), this.U0n = 0);
    else if (s < 0) this.Wft !== this.iki ? (--this.Wft, this.aW1(this.Wft), this.cH1(1), this.dH1(!0)) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[MoraleTempExpView]进度动画播放有问题"), this.U0n = 0);
    else {
      i = this.hH1[s];
      let t = this.aL1;
      this.Wft < this.iki ? t = 1 : this.Wft > this.iki && (t = 0), this.lL1 ? i.IsShowUnit(t) ? (this.lH1 = s, i.ShowUnit(), i.PlayTweenIn(), this.fH1(), this.U0n = 1) : this.U0n = 0 : i.IsHideUnit(t) && (this.lH1 = s, i.HideUnit(), this.fH1())
    }
  }
  fH1() {
    this.Xhu(), this._H1 = TimerSystem_1.TimerSystem.Delay(() => {
      this._H1 = void 0, this.dH1()
    }, Math.max(TimerSystem_1.MIN_TIME, this.Hhu))
  }
  Xhu() {
    this._H1 && TimerSystem_1.TimerSystem.Remove(this._H1), this._H1 = void 0
  }
  ShowBattleVisibleChildView() {
    super.ShowBattleVisibleChildView(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleTempExpViewVisibleChanged, !0)
  }
  HideBattleVisibleChildView() {
    super.HideBattleVisibleChildView(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleTempExpViewVisibleChanged, !1)
  }
}
exports.MoraleTempExpView = MoraleTempExpView;
class MoraleTempExpUnit extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.gH1 = void 0, this.CH1 = void 0, this.Yhu = void 0, this.hW1 = void 0, this.Index = 0, this.cvl = 0, this.pH1 = !1, this.vH1 = !1, this.zhu = !1
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ]
  }
  OnStart() {
    super.OnStart(), this.SetUiActive(!1);
    var i = this.GetItem(1)?.GetOwner()?.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (i)
      for (let t = 0; t < i?.Num(); t++) {
        var s = i.Get(t);
        this.gH1 || (this.gH1 = []), this.gH1.push(s)
      }
    var e = this.GetItem(2)?.GetOwner()?.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (e)
      for (let t = 0; t < e?.Num(); t++) {
        var h = e.Get(t);
        this.CH1 || (this.CH1 = []), this.CH1.push(h)
      }
    var r = this.GetItem(4)?.GetOwner()?.K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    if (r)
      for (let t = 0; t < r?.Num(); t++) {
        var a = r.Get(t);
        this.Yhu || (this.Yhu = []), this.Yhu.push(a)
      }
    this.hW1 = this.GetSprite(0)
  }
  Clean() {
    this.gH1 = void 0, this.CH1 = void 0
  }
  SetIndex(t) {
    this.Index = t, this.cvl = t * EXP_PROGRESS_STEP
  }
  IsShowUnit(t) {
    return t > this.cvl
  }
  IsHideUnit(t) {
    return t <= this.cvl
  }
  Reset() {
    this.vH1 && (this.StopTweenOut(), this.hW1?.SetAlpha(1)), this.zhu, this.pH1 = !1, this.vH1 = !1, this.zhu = !1
  }
  ShowUnit() {
    this.SetUiActive(!0)
  }
  HideUnit(t = 0) {
    this.SetUiActive(!1)
  }
  PlayTweenIn() {
    if (this.gH1 && !this.pH1) {
      this.pH1 = !0;
      for (const t of this.gH1) t.Play()
    }
  }
  PlayTweenOut() {
    if (this.CH1 && !this.vH1) {
      this.vH1 = !0;
      for (const t of this.CH1) t.Play()
    }
  }
  PlayTweenRed() {
    if (this.Yhu) {
      this.zhu = !0;
      for (const t of this.Yhu) t.Play()
    }
  }
  StopTweenOut() {
    if (this.CH1 && this.vH1) {
      this.vH1 = !1;
      for (const t of this.CH1) t.Stop()
    }
  }
  PlayTweenAnim(t) {
    switch (t) {
      case 0:
        this.PlayTweenIn();
        break;
      case 1:
        this.PlayTweenOut();
        break;
      case 3:
        this.PlayTweenRed()
    }
  }
}
//# sourceMappingURL=MoraleTempExpView.js.map