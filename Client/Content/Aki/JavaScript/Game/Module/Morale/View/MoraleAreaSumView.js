"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaSumView = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LoadAsyncPromise_1 = require("../../UiComponent/LoadAsyncPromise"),
  MoraleDefine_1 = require("../MoraleDefine"),
  MoraleHighMonsterProgressPanel_1 = require("./MoraleHighMonsterProgressPanel"),
  MoraleScoreProgressPanel_1 = require("./MoraleScoreProgressPanel"),
  MoraleSumAreaMapPanel_1 = require("./MoraleSumAreaMapPanel"),
  MoraleSumLvInfoPanel_1 = require("./MoraleSumLvInfoPanel");
class MoraleAreaSumView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.PopupCaption = void 0, this.SumLvInfoPanel = void 0, this.ScoreProgressPanel = void 0, this.Model = void 0, this.AreaMapPanelList = [], this.EnterConfig = void 0, this.LoopConfig = void 0, this.IsPlayingEnterEffect = !1, this.IsPlayedEnterEffect = !1, this.LoopFlagNum = 0, this.HighMonsterProgressPanel = void 0, this.h$1 = () => {
      this.ScoreProgressPanel.UpdateData()
    }, this.V2i = () => {
      this.CloseMe()
    }, this.n9_ = e => {
      "Enter" === e && this.CheckPlayEnterEffect()
    }, this.JGn = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MoraleDefine_1.MORALE_AREA_SUM_HELP_ID)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UITexture],
      [10, UE.UITexture],
      [11, UE.UIItem]
    ]
  }
  OnBeforeCreate() {
    this.Model = ModelManager_1.ModelManager.MoraleModel
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)), this.PopupCaption.SetCloseCallBack(this.V2i), this.PopupCaption.SetHelpBtnActive(!0), this.PopupCaption.SetHelpCallBack(this.JGn);
    var e = this.GetItem(6);
    this.SumLvInfoPanel = new MoraleSumLvInfoPanel_1.MoraleSumLvInfoPanel, await this.SumLvInfoPanel.Init(e), this.ScoreProgressPanel = new MoraleScoreProgressPanel_1.MoraleScoreProgressPanel, await this.ScoreProgressPanel.Init(this.GetItem(7)), this.HighMonsterProgressPanel = new MoraleHighMonsterProgressPanel_1.MoraleHighMonsterProgressPanel, await this.HighMonsterProgressPanel.Init(this.GetItem(11)), await this.InitAreaSumMap(), await this.InitEnterConfig(), await this.CheckOccupyAllAreaState(), await ControllerHolder_1.ControllerHolder.MoraleController.RequestGetPlayerMoraleAreaId()
  }
  OnStart() {
    this.InitAreaSumMapData()
  }
  async InitAreaSumMap() {
    const s = [];
    this.Model.AreaDataList.forEach((e, t) => {
      var i, t = 1 + t;
      this.GetItem(t) && (i = new MoraleSumAreaMapPanel_1.MoraleSumAreaMapPanel, t = this.GetItem(t), s.push(i.Init(t, e)), this.AreaMapPanelList.push(i))
    }), await Promise.all(s)
  }
  async InitEnterConfig() {
    const e = new CustomPromise_1.CustomPromise;
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_MoraleEffectConfig_C", () => {
      e.SetResult()
    }), await e.Promise, this.EnterConfig = await this.Dvr("MoraleEffectConfig"), this.LoopConfig = await this.Dvr("MoraleLoopEffectConfig"), this.Model.UiEnterConfig = this.EnterConfig, this.Model.UiLoopConfig = this.LoopConfig
  }
  async Dvr(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    return new LoadAsyncPromise_1.LoadAsyncPromise(e, UE.BP_MoraleEffectConfig_C).Promise
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MoraleProgressRewardUpdate, this.h$1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.n9_)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MoraleProgressRewardUpdate, this.h$1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.n9_)
  }
  OnBeforeShow() {
    this.k1u(), this.UpdateData()
  }
  k1u() {
    this.AreaMapPanelList.forEach(e => {
      e.AreaPlotPanel.PlotList.forEach(e => {
        e.LoopTickPromise?.Stop()
      })
    })
  }
  OnAfterShow() {
    this.CheckPlayEnterEffect()
  }
  OnAfterHide() {
    this.Model.ClearAllFlagNewUnlockState(), this.Model.SaveLocalData()
  }
  UpdateData() {
    this.SumLvInfoPanel.UpdateData(), this.ScoreProgressPanel.UpdateData()
  }
  IsMoraleGameOver(e) {
    return !!e || "Occupy" === this.UiViewSequence?.StartSequenceName || this.Model.IsMoraleGameOver()
  }
  async CheckOccupyAllAreaState(e) {
    var e = this.IsMoraleGameOver(e);
    this.GetItem(8).SetUIActive(e), this.HighMonsterProgressPanel.SetActive(!e), e ? (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_MoraleMapBgFinished"), await this.SetTextureAsync(e, this.GetTexture(9)), e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_MoraleLightOccAll"), await this.SetTextureAsync(e, this.GetTexture(10))) : this.HighMonsterProgressPanel.UpdateProgress()
  }
  InitAreaSumMapData() {
    this.AreaMapPanelList.forEach(e => {
      e.InitData()
    })
  }
  async CheckPlayEnterEffect() {
    this.IsPlayedEnterEffect || (this.IsPlayedEnterEffect = !0, await this.PlayEnterEffect(), await this.CheckExistAreaActiveLight(), await this.CheckNextHighMonsterArea())
  }
  async PlayEnterEffect(e, t) {
    var i;
    this.IsPlayingEnterEffect || (this.IsPlayingEnterEffect = !0, i = this.EnterConfig.格子入场批次, e = e ?? this.Model.GetAllUnlockPlotList(), t = t ?? this.Model.GetAllNewUnlockPlotList(), await this.PlayAreaPanelEnterEffectTimes(Math.min(e.length, i), e), await this.PlayAreaPanelNewUnlockEffect(t), this.O1u([...e, ...t]), this.IsPlayingEnterEffect = !1)
  }
  TestPlayEnterEffectByFlag(e, t) {
    var i;
    this.IsPlayingEnterEffect || (e = (i = e => {
      e = e?.filter(e => this.Model.FlagMap.has(e)).flatMap(e => this.Model.FlagMap.get(e).AreaPlotDataList);
      return e?.length && MathUtils_1.MathUtils.Shuffle(e), e
    })(e), i = i(t), this.InitAreaSumMapData(), this.PlayEnterEffect(e, i))
  }
  async PlayAreaPanelEnterEffectTimes(t, i) {
    if (!(t <= 0)) {
      var s = [],
        a = this.EnterConfig.格子入场批次间隔时间;
      for (let e = 0; e < t; e++) {
        var r = Math.floor(i.length / t),
          o = e + 1 >= t ? i.length : (e + 1) * r,
          r = i.slice(e * r, o);
        s.push(this.PlayAreaPanelEnterEffect(r, a * e))
      }
      await Promise.all(s)
    }
  }
  async PlayAreaPanelEnterEffect(t, e) {
    if (!(t.length <= 0)) {
      await this._nu(e ?? 0);
      const i = [];
      this.AreaMapPanelList.forEach(e => {
        i.push(e.PlayEnterEffect(t))
      }), await Promise.all(i)
    }
  }
  async PlayAreaPanelLoopEffect(t, e) {
    if (!(t.length <= 0)) {
      await this._nu(e ?? 0);
      const i = [];
      this.AreaMapPanelList.forEach(e => {
        i.push(e.PlayLoopEffect(t))
      }), await Promise.all(i)
    }
  }
  async PlayAreaPanelNewUnlockEffect(t) {
    if (!(t.length <= 0)) {
      await this.PlayHighMonsterKillEffect(), await this._nu(this.EnterConfig.解锁新格子播放前间隔时间);
      const i = [];
      this.AreaMapPanelList.forEach(e => {
        i.push(e.PlayNewUnlockEffect(t))
      }), await Promise.all(i)
    }
  }
  async PlayHighMonsterKillEffect() {
    if (!ModelManager_1.ModelManager.MoraleModel?.IsMoraleGameOver()) {
      const t = [];
      this.AreaMapPanelList.forEach(e => {
        t.push(e.AreaTitle.CheckPlayHighMonsterKillEffect())
      }), await Promise.all(t)
    }
  }
  async _nu(e) {
    this.IsDestroyOrDestroying || e < TimerSystem_1.MIN_TIME || (e > TimerSystem_1.MAX_TIME ? (await TimerSystem_1.TimerSystem.Wait(TimerSystem_1.MAX_TIME), await this._nu(e - TimerSystem_1.MAX_TIME)) : await TimerSystem_1.TimerSystem.Wait(e))
  }
  OnTick(e) {
    this.TickAreaMapPanel(e)
  }
  TickAreaMapPanel(t) {
    this.AreaMapPanelList.forEach(e => {
      e.OnTick(t)
    })
  }
  async CheckExistAreaActiveLight() {
    var e;
    this.Model.AreaDataList.some(e => e.IsAllUiFlagActive() && e.HighDifficultyFlagSomeNewActive()) || this.Model.AreaDataList.some(e => e.IsAllUiFlagActive()) && (e = new CustomPromise_1.CustomPromise, await this.UiViewSequence?.PlaySequenceAsyncNoStopRunning("Light", e))
  }
  async CheckNextHighMonsterArea() {
    if (!ModelManager_1.ModelManager.MoraleModel?.IsMoraleGameOver() && this.Model.AreaDataList.some(e => e.HighDifficultyFlagSomeNewActive())) {
      const t = this.Model.GetRecommendHighFlagUnActiveArea();
      var e;
      t && (this.AreaMapPanelList.forEach(e => {
        e.SetRecommendLightActive(e.AreaData.Id === t.Id)
      }), e = new CustomPromise_1.CustomPromise, await this.UiViewSequence?.PlaySequenceAsyncNoStopRunning("PreRight", e))
    }
  }
  StopLoopEffect() {
    this.AreaMapPanelList.forEach(e => {
      e.AreaPlotPanel.PlotList.forEach(e => {
        e.LoopTickPromise?.Stop()
      })
    })
  }
  O1u(e) {
    var t;
    e.length <= 0 || (this.StopLoopEffect(), t = Math.min(e.length, this.LoopConfig.格子入场批次), this.LoopFlagNum++, this.q1u(t, e, this.LoopFlagNum))
  }
  async q1u(t, i, e) {
    if (!(this.IsDestroyOrDestroying || t <= 0 || this.LoopFlagNum !== e)) {
      var s = [],
        a = this.LoopConfig.格子入场批次间隔时间;
      for (let e = 0; e < t; e++) {
        var r = Math.floor(i.length / t),
          o = e + 1 >= t ? i.length : (e + 1) * r,
          r = i.slice(e * r, o);
        s.push(this.PlayAreaPanelLoopEffect(r, a * e))
      }
      await Promise.all(s), await this.q1u(t, i, e)
    }
  }
  OnAfterDestroy() {
    this.Model.UiEnterConfig = void 0, this.Model.UiLoopConfig = void 0
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e && 0 !== e.length) {
      var t = e[0];
      if ("FirstFinishedArea" === t)
        for (const a of this.AreaMapPanelList)
          if (a.AreaTitle.IsShowBoxProgress()) {
            var i = a.AreaTitle.GetGuideUiItem("0");
            if (i) return [i, i]
          } if ("FirstFinishedAreaBox" === t)
        for (const r of this.AreaMapPanelList)
          if (r.AreaTitle?.IsShowBoxProgress()) return r.AreaTitle?.GetGuideUiItemAndUiItemForShowEx(e);
      if ("FirstMoraleArea" === t) {
        var t = this.GetGuideUiItem("1"),
          s = this.AreaMapPanelList[0].GetRootItem();
        if (t && s) return [s, t]
      }
    }
  }
}
exports.MoraleAreaSumView = MoraleAreaSumView;
//# sourceMappingURL=MoraleAreaSumView.js.map