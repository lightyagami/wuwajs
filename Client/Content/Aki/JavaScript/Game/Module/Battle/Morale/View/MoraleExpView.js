"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleExpView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  FormationDataController_1 = require("../../../Abilities/FormationDataController"),
  BattleVisibleChildView_1 = require("../../../BattleUi/Views/BattleChildView/BattleVisibleChildView"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  UI_BAR_MIN_PERCENT = 0,
  UI_BAR_MAX_PERCENT = .3,
  PROGRESS_ANIM_DURATION = 1e3,
  EXP_TEXT_STAY_DURATION = 2e3;
class MoraleExpView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments), this.ZR1 = void 0, this.pN1 = void 0, this.tL1 = void 0, this.rL1 = void 0, this.oL1 = void 0, this.nL1 = void 0, this.qlu = void 0, this.Wft = 0, this.sL1 = 0, this.iki = 0, this.aL1 = 0, this.hL1 = 0, this.lL1 = !0, this.WMt = !1, this.UQ = 0, this.Flu = !1, this.g1u = !0, this.gfu = !1, this.SPe = void 0, this._L1 = void 0, this._cr = t => {
      "Close" !== t || ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive() || this.SetVisible(1, !1)
    }, this.uL1 = (i, s, e, h) => {
      if (this.GetVisible())
        if (h < e || s < i) this.Flu = !0;
        else {
          let t = h - e;
          0 !== t && (h === this.UQ ? --t : e === this.UQ && (t += 1));
          var a = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleCurrentExpProgress(),
            _ = +t + a - this.sL1,
            _ = (this.hL1 = _ / PROGRESS_ANIM_DURATION, this.Wft = e, this.iki = h, this.aL1 = a, this.lL1 = 0 <= this.hL1, this.WMt = e < h && this.g1u, ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevelUpExp(e)),
            a = (this.nL1?.SetText(i + " / " + _), s - i);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.oL1, "PrefabTextItem_147616326_Text", Math.abs(a)), this.rL1?.SetUIActive(this.g1u && 0 !== this.hL1), this.qlu?.SetUiActive(!1)
        }
    }, this.Zpe = t => {
      this.gfu && (this.GetTexture(8)?.SetUIActive(!t), this.ZR1?.SetChangeColor(t, this.ZR1.changeColor), this.tL1?.SetChangeColor(t, this.tL1.changeColor), this.GetTexture(9)?.SetChangeColor(t, this.GetTexture(9).changeColor), this.GetTexture(10)?.SetChangeColor(t, this.GetTexture(10).changeColor), this.GetTexture(11)?.SetChangeColor(t, this.GetTexture(11).changeColor), this.GetSprite(12)?.SetChangeColor(t, this.GetSprite(12).changeColor))
    }, this.$lu = () => {
      this.Wlu()
    }, this.C1u = () => {
      this.Flu && (this.dL1(), this.Flu = !1)
    }, this.eCu = () => {
      this.Flu = !0
    }, this.p1u = () => {
      var t = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel();
      1 < t && this.iki < t && (this.g1u = !1, this.uL1(0, 0, 1, t), this.g1u = !0)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIArtText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UITexture],
      [9, UE.UITexture],
      [10, UE.UITexture],
      [11, UE.UITexture],
      [12, UE.UISprite]
    ]
  }
  async OnBeforeStartAsync() {
    var t = new MoraleAnimItem,
      i = this.GetItem(6);
    i && (await t.CreateByActorAsync(i.GetOwner()), this.qlu = t)
  }
  OnStart() {
    this.ZR1 = this.GetSprite(0), this.pN1 = this.GetSprite(1), this.tL1 = this.GetArtText(2), this.rL1 = this.GetItem(3), this.oL1 = this.GetText(4), this.nL1 = this.GetText(5), this.ZR1?.SetFillAmount(0), this.pN1?.SetFillAmount(0), this.tL1?.SetText("1"), this.rL1?.SetUIActive(!1), this.pN1?.SetUIActive(!1), this.qlu?.SetUiActive(!1), this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.SPe?.BindSequenceCloseEvent(this._cr)
  }
  Initialize(t) {
    super.Initialize(t), this.InitChildType(4), this.SetVisible(1, !1), this.Ore()
  }
  Reset() {
    this.kre(), this.SPe?.Clear(), this.Flu = !1, this.qlu?.Clear(), super.Reset()
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleExpChanged, this.uL1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoralePromptShow, this.$lu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoralePlayIndomitableLevelAnim, this.p1u), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoadingViewOnAfterShow, this.C1u), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleBattleFail, this.eCu)
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleExpChanged, this.uL1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoralePromptShow, this.$lu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoralePlayIndomitableLevelAnim, this.p1u), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoadingViewOnAfterShow, this.C1u), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleBattleFail, this.eCu)
  }
  StartShow() {
    this.gfu = !0, this.dL1(), this.SetVisible(1, !0), this.Wlu(), this.Zpe(FormationDataController_1.FormationDataController.GlobalIsInFight)
  }
  EndShow() {
    this.gfu = !1, this.Qlu()
  }
  Wlu() {
    this.SPe?.StopCurrentSequence(), this.SPe?.PlaySequencePurely("Start"), this.qlu?.PlayStartShowAnim(), this.qlu?.SetUiActive(!0)
  }
  Qlu() {
    this.SPe?.StopCurrentSequence(), this.SPe?.PlaySequencePurely("Close"), this.qlu?.PlayEndShowAnim(), this.qlu?.SetUiActive(!0)
  }
  mL1() {
    this.SPe?.IsPlayingSequence("Up") && this.SPe?.StopSequenceByKey("Up", !1, !0), this.SPe?.PlaySequencePurely("Up")
  }
  Tick(i) {
    if (this.GetVisible() && this.hL1) {
      MoraleExpView.Ult.Start();
      var i = i * this.hL1;
      this.sL1 += i;
      let t = 0;
      this.Wft === this.iki ? (t = this.aL1, this.lL1 ? this.sL1 = Math.min(this.aL1, this.sL1) : this.sL1 = Math.max(this.aL1, this.sL1), this.sL1 === this.aL1 && (t = 0, this.hL1 = 0, this.cL1())) : (this.lL1 && (t = 1), this.lL1 && 1 < this.sL1 ? (i = Math.floor(this.sL1), this.Wft = Math.min(this.UQ, Math.min(this.iki, this.Wft + i)), this.tL1?.SetText(this.Wft.toString()), this.mL1(), this.Wft === this.iki ? this.Wft === this.UQ ? (this.sL1 = 1, this.sZ1()) : this.sL1 = Math.min(this.aL1, this.sL1 - 1) : this.sL1 -= i) : !this.lL1 && this.sL1 < 0 ? (i = Math.abs(Math.floor(this.sL1)), this.Wft = Math.min(this.UQ, Math.max(this.iki, this.Wft - i)), this.tL1?.SetText(this.Wft.toString()), this.Wft === this.iki ? this.sL1 = Math.max(this.aL1, this.sL1 + 1) : this.sL1 += i) : this.lL1 || this.Wft !== this.UQ || (this.Wft = Math.max(this.iki, this.Wft - 1), this.tL1?.SetText(this.Wft.toString()), this.sZ1()));
      i = MathUtils_1.MathUtils.RangeClamp(this.sL1, 0, 1, UI_BAR_MIN_PERCENT, UI_BAR_MAX_PERCENT), i = (this.ZR1?.SetFillAmount(i), 0 < t && this.lL1 ? (i = MathUtils_1.MathUtils.RangeClamp(t, 0, 1, UI_BAR_MIN_PERCENT, UI_BAR_MAX_PERCENT), this.pN1?.SetFillAmount(i), this.pN1?.SetUIActive(!0)) : this.pN1?.SetUIActive(!1), this.Wft === this.UQ ? this.Wft - 1 : this.Wft), i = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevelUpExp(i);
      this.nL1?.SetText(Math.floor(i * this.sL1) + " / " + i), MoraleExpView.Ult.Stop()
    }
  }
  dL1() {
    let t = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel(),
      i = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleCurrentExpProgress();
    var s = this.Flu && 1 < ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleIndomitableLevel(),
      s = (s && (t = 1, i = 0), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[MoraleExpView]士气值界面更新", ["level", t], ["expProgress", i], ["needPlayIndomitableLevelAnim", s]), this.Wft = t, this.iki = t, this.tL1?.SetText(t.toString()), this.sL1 = i, MathUtils_1.MathUtils.RangeClamp(i, 0, 1, UI_BAR_MIN_PERCENT, UI_BAR_MAX_PERCENT));
    this.ZR1?.SetFillAmount(s), this.pN1?.SetUIActive(!1), this.UQ = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleMaxLevel(), this.sZ1()
  }
  cL1() {
    this._L1 && TimerSystem_1.TimerSystem.Remove(this._L1), this._L1 = TimerSystem_1.TimerSystem.Delay(() => {
      this.WMt && (this.qlu?.PlayLevelUpAnim(), this.qlu?.SetUiActive(!0)), this.rL1?.SetUIActive(!1), this._L1 = void 0
    }, EXP_TEXT_STAY_DURATION)
  }
  sZ1() {
    this.Wft === this.UQ ? this.GetItem(7)?.SetUIActive(!0) : this.GetItem(7)?.SetUIActive(!1)
  }
}(exports.MoraleExpView = MoraleExpView).Ult = Stats_1.Stat.Create("[BattleView]MoraleExpView");
class MoraleAnimItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.SPe = void 0, this._cr = t => {
      this.SetUiActive(!1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UIText]
    ]
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.SPe?.BindSequenceCloseEvent(this._cr)
  }
  Clear() {
    this.SPe?.Clear()
  }
  PlayStartShowAnim() {
    this.SPe?.StopCurrentSequence(!1, !0), this.SPe?.PlaySequencePurely("Start"), this.SetUiActive(!0), this.qti(!1), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Morale_title_41")
  }
  PlayEndShowAnim() {
    this.SPe?.StopCurrentSequence(!1, !0), this.SPe?.PlaySequencePurely("StartR"), this.qti(!1), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Morale_title_42")
  }
  PlayLevelUpAnim() {
    this.SPe?.StopCurrentSequence(!1, !0), this.SPe?.PlayLevelSequenceByName("Start"), this.qti(!0), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Morale_title_40")
  }
  SetText(t) {
    this.GetText(2)?.SetText(t)
  }
  qti(t) {
    this.GetTexture(0)?.SetUIActive(t)
  }
}
//# sourceMappingURL=MoraleExpView.js.map