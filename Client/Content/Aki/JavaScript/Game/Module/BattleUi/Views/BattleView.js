"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BattleView = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  DangoWorldMainPanel_1 = require("../../Dango/DangoAbyss/View/DangoWorldMainPanel"),
  BattleLinkEnergyButton_1 = require("./BattleChildView/BattleLinkEnergyButton"),
  BottomPanel_1 = require("./BattleChildViewPanel/BottomPanel"),
  CenterPanel_1 = require("./BattleChildViewPanel/CenterPanel"),
  ChatPanel_1 = require("./BattleChildViewPanel/ChatPanel"),
  FormationPanel_1 = require("./BattleChildViewPanel/FormationPanel"),
  GamepadSkillButtonPanel_1 = require("./BattleChildViewPanel/GamepadSkillButtonPanel"),
  MissionPanel_1 = require("./BattleChildViewPanel/MissionPanel"),
  PositionPanel_1 = require("./BattleChildViewPanel/PositionPanel"),
  ScorePanel_1 = require("./BattleChildViewPanel/ScorePanel"),
  SkillButtonPanel_1 = require("./BattleChildViewPanel/SkillButtonPanel"),
  TopPanel_1 = require("./BattleChildViewPanel/TopPanel"),
  BattleViewProxy_1 = require("./BattleViewProxy"),
  BossStatePanel_1 = require("./BossState/BossStatePanel"),
  FullScreenPanel_1 = require("./FullScreenPanel"),
  BattleHeadStatePanel_1 = require("./HeadState/BattleHeadStatePanel"),
  PartStatePanel_1 = require("./PartStatePanel"),
  CHECK_DESTROY_TIME = 5e3;
class BattleView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.Vot = void 0, this.sza = void 0, this.aza = void 0, this.Hot = void 0, this.jot = void 0, this.W01 = void 0, this.hza = !1, this.Wot = !1, this.Kot = new Map, this.Qot = [], this.Xot = new UE.Vector, this.Yot = void 0, this.Jot = !1, this.EEl = !1, this.O8c = void 0, this.Proxy = new BattleViewProxy_1.BattleViewProxy, this.zot = void 0, this.Zot = () => {
      this.Proxy.HeadStatePanel.RefreshCurrentRole()
    }, this.ert = () => {
      var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      t?.RoleConfig && this.trt(2 === t.RoleConfig.RoleType)
    }, this.IEl = () => {
      ControllerHolder_1.ControllerHolder.BattleUiControl.TryClosePureMode()
    }, this.fHe = () => {
      this.Proxy.HeadStatePanel.RefreshCurrentRole()
    }, this.irt = () => {
      this.IsShow && this.SetActive(!0)
    }, this.Jpe = (t, e, i) => {
      e?.Valid && (this.Proxy.HeadStatePanel.OnCreateEntity(e.Entity), this.Vot.OnCreateEntity(e.Entity))
    }, this.zpe = (t, e) => {
      e?.Valid && (this.Proxy.HeadStatePanel.OnRemoveEntity(e.Entity), this.Vot.DestroyPartStateFromRole(e.Entity))
    }, this.FJe = t => {
      var e = this.ort(6).GetRootItem(),
        i = (Info_1.Info.IsInTouch() ? this.ort(5) : this.ort(7)).GetRootItem(),
        s = e.GetHierarchyIndex(),
        i = i.GetHierarchyIndex();
      t && s <= i ? (this.Yot = s, e.SetHierarchyIndex(i)) : void 0 !== this.Yot && (e.SetHierarchyIndex(this.Yot), this.Yot = void 0), Log_1.Log.CheckInfo() && Log_1.Log.Info("BattleUiSet", 37, "轮盘界面显隐，调整摇杆面板层级", ["bVisible", t])
    }, this.Yoh = () => {
      for (const t of this.Kot.values()) void 0 !== t && t.OnSeamlessTravelFinish()
    }, this.rrt = t => {
      AudioSystem_1.AudioSystem.PostEvent(t)
    }, this.KHa = t => {
      this.RootItem?.SetAlpha(t)
    }, this.TEl = () => {
      this.LEl()
    }, this.fIl = (t, e) => {
      0 === e && (this.EEl ? ControllerHolder_1.ControllerHolder.BattleUiControl.TryClosePureMode() : ControllerHolder_1.ControllerHolder.BattleUiControl.TryOpenPureMode())
    }, this.XBo = () => {
      Info_1.Info.IsInGamepad() ? this.Wot ? this.O8c && this.Hot.AddChildToRoleHeadPanel(this.O8c.GetRootItem()) : this.lza().then(() => {
        this.IsDestroyOrDestroying || (this.Hot.ShowBattleChildViewPanel(), this.Hot.RefreshOnDelayShow(), this.jot.ShowBattleChildViewPanel(), this.O8c && Info_1.Info.IsInGamepad() && this.Hot.AddChildToRoleHeadPanel(this.O8c.GetRootItem()))
      }) : Info_1.Info.IsInKeyBoard() && (this.hza ? this.O8c && this.sza.AddChildToRoleHeadPanel(this.O8c.GetRootItem()) : this._za().then(() => {
        this.IsDestroyOrDestroying || (this.sza.ShowBattleChildViewPanel(), this.sza.RefreshOnDelayShow(), this.aza.ShowBattleChildViewPanel(), this.O8c && Info_1.Info.IsInKeyBoard() && this.sza.AddChildToRoleHeadPanel(this.O8c.GetRootItem()))
      }))
    }, this.ttt = t => {
      for (var [e, i] of this.Kot) 5 !== e && (t ? i.GetVisible() && i.GetRootItem().SetUIActive(!0) : i.GetRootItem().SetUIActive(!1))
    }, this.HJe = t => {
      for (var [e, i] of this.Kot) 6 !== e && (t ? i.GetVisible() && i.GetRootItem().SetUIActive(!0) : i.GetRootItem().SetUIActive(!1))
    }, this._F_ = t => {
      this.GetItem(1)?.SetUIActive(t), ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible = t
    }, this.Tla = () => {
      var t = this.Kot.get(6);
      return (t = t && t.GetExecutionItem()) ? [t, t] : void 0
    }, this.Lla = t => {
      var e = this.Kot.get(3);
      if (e) return e.GetBattleSkillItemByButtonType(Number(t[1]))?.GetGuideItem()
    }, this.Dla = e => {
      var i = this.Kot.get(Number(e[0]))?.GetUiActorForGuide()?.GetComponentByClass(UE.GuideHookRegistry.StaticClass());
      if (i) {
        var s = e[2],
          n = i.GuideHookComponents.Get(s),
          n = (n || Log_1.Log.CheckError() && Log_1.Log.Error("Guide", 16, "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点名称，请检查聚焦引导配置或挂接组件"), n.GetUIItem());
        let t = e[1];
        StringUtils_1.StringUtils.IsEmpty(t) && (t = s);
        e = i.GuideHookComponents.Get(t), s = (e || Log_1.Log.CheckError() && Log_1.Log.Error("Guide", 16, "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点（展示用）名称，请检查聚焦引导配置或挂接组件"), e.GetUIItem());
        return [n, s]
      }
      Log_1.Log.CheckError() && Log_1.Log.Error("Guide", 16, "战斗界面挂接组件(GuideHookRegistry)缺失")
    }, this.Ala = () => {
      var t, e = this.ort(2);
      if (e)
        for (const i of e.GetFormationItemList())
          if (!i.IsMyRole) return (t = i.GetRootItem()) ? [t, t] : void 0
    }, this.MF_ = t => {
      return this.ort(5)?.GetGuideUiItemAndUiItemForShowEx(t)
    }, this.xU1 = t => this.W01?.GetGuideUiItemAndUiItemForShowEx(t), this.zO1 = t => {
      var e = this.O8c?.GetRootItem();
      return e ? [e, e] : void 0
    }, this.OQ1 = t => {
      return this.ort(1)?.GetGuideUiItemAndUiItemForShowEx(t)
    }, this.hgu = t => {
      return this.ort(4)?.GetGuideUiItemAndUiItemForShowEx(t)
    }, this.lgu = t => {
      return this.ort(5)?.GetGuideUiItemAndUiItemForShowEx(t)
    }, this.Ula = new Map([
      ["Execution", this.Tla],
      ["Skill", this.Lla],
      ["Default", this.Dla],
      ["Teammate", this.Ala],
      ["FishingViewBtn", this.MF_],
      ["DangoViewBtn", this.xU1],
      ["LinkBtn", this.zO1],
      ["DangoMissionButton", this.OQ1],
      ["MoraleTempExp", this.hgu],
      ["MoraleExp", this.lgu]
    ]), this.cah = (t, e, i, s) => {
      this.Hot?.RefreshFormationCooldownExternal(t, e, i, s), this.sza?.RefreshFormationCooldownExternal(t, e, i, s)
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
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIButtonComponent]
    ], Info_1.Info.IsInTouch() || (this.ComponentRegisterInfos.push([12, UE.UIItem]), this.ComponentRegisterInfos.push([13, UE.UIItem])), this.BtnBindInfo = [
      [16, this.IEl]
    ]
  }
  async OnBeforeStartAsync() {
    this.OpenParam = this.Proxy, await Promise.all([this.uza(), this.art(), this.hrt(0, BossStatePanel_1.BossStatePanel, !0, 13), this.hrt(5, TopPanel_1.TopPanel, !0, 25), this.hrt(4, BottomPanel_1.BottomPanel, !0, 11), this.hrt(1, MissionPanel_1.MissionPanel, !0, 5), this.hrt(6, CenterPanel_1.CenterPanel, !0, 25), this.hrt(7, ChatPanel_1.ChatPanel, !1, 6), this.hrt(8, FullScreenPanel_1.FullScreenPanel, !0, 23), this.hrt(9, PositionPanel_1.PositionPanel, !0, 25), this.hrt(11, ScorePanel_1.ScorePanel, !0, 24), this.xFc(), this.lrt()]), this._rt(), this.q8c(), this.Ore(), this.UiViewSequence.AddSequenceStartEvent("ShowView", this.irt), ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize(), this.LEl()
  }
  async xFc() {
    var t, e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    1 === ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.WorldDungeonSubType && (e = this.GetItem(14), this.W01 = new DangoWorldMainPanel_1.DangoWorldMainPanel, t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiView_CelebrationPark"), await this.W01.CreateByPathAsync(t, e), this.Qot.push(this.W01))
  }
  Q01() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    1 === ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)?.WorldDungeonSubType && (this.GetItem(4)?.SetUIActive(!1), ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 5, !1), ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 7, !1), ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(9, 8, !1))
  }
  async uza() {
    Info_1.Info.IsInGamepad() ? (this.GetItem(2)?.SetUIActive(!1), this.GetItem(3)?.SetUIActive(!1)) : this.hza || await this._za()
  }
  async _za() {
    this.hza = !0, this.sza = await this.hrt(2, FormationPanel_1.FormationPanel, !0, 7), this.aza = await this.hrt(3, SkillButtonPanel_1.SkillButtonPanel, !0, 9)
  }
  async art() {
    Info_1.Info.IsInGamepad() ? this.Wot || await this.lza() : (this.GetItem(12)?.SetUIActive(!1), this.GetItem(13)?.SetUIActive(!1))
  }
  async lza() {
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RefreshButtonData(), this.Wot = !0, this.Hot = await this.hrt(12, FormationPanel_1.FormationPanel, !0, 8), this.Hot.SetIsGamepad(), this.jot = await this.hrt(13, GamepadSkillButtonPanel_1.GamepadSkillButtonPanel, !0, 10), this.EEl && (this.Hot.RefreshPureMode(!0), this.jot.RefreshPureMode(!0))
  }
  OnTick(t) {
    BattleView.vJe.Start();
    for (const e of this.Qot) e.GetVisible() && e.OnTickBattleChildViewPanel(t);
    this.Proxy.HeadStatePanel.Tick(t), this.Vot.Tick(t), this.O8c?.Tick(t), BattleView.vJe.Stop()
  }
  OnAfterTick(t) {
    for (const e of this.Qot) e.GetVisible() && e.OnAfterTickBattleChildViewPanel(t)
  }
  OnBeforeShow() {
    if (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeShow"), this.IsDestroyOrDestroying) Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeShow Cancel Because Destroy");
    else {
      this.REl(), this.crt();
      for (const t of this.Kot.values()) this.h01(t) ? t.ShowBattleChildViewPanel() : t.HideBattleChildViewPanel();
      this.Q01()
    }
  }
  OnAfterShow() {
    var t;
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterShow"), this.IsDestroyOrDestroying ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterShow Cancel Because Destroy") : (this.UEl(), ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddBattleUiCommonChildVisibleReason(0), (t = ModelManager_1.ModelManager.BattleUiModel).TryBroadcastCacheRoleLevelUpData(), t.TryBroadcastCacheRevive(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleViewActiveSequenceFinish), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActiveBattleView), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotStart))
  }
  OnBeforeHide() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeHide"), this.DEl(), ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveBattleUiCommonChildVisibleReason(0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DisActiveBattleView)
  }
  OnAfterHide() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterHide");
    for (const t of this.Kot.values()) t.HideBattleChildViewPanel()
  }
  OnBeforeDestroy() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeDestroy"), this.kre(), this.mrt(), this.drt(), this.Crt(), this.ResetFormationCooldownExternal(), this.G8c(), this.Xot = void 0, Info_1.Info.IsBuildDevelopmentOrDebug && (this.zot = TimerSystem_1.TimerSystem.Forever(() => {
      ModelManager_1.ModelManager.GameModeModel.WorldDone && (TimerSystem_1.TimerSystem.Remove(this.zot), this.zot = void 0, Log_1.Log.CheckError()) && Log_1.Log.Error("Battle", 17, "[battleView]主界面销毁超时，请将本次日志提交给测试")
    }, CHECK_DESTROY_TIME))
  }
  OnAfterDestroy() {
    this.zot && (TimerSystem_1.TimerSystem.Remove(this.zot), this.zot = void 0), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterDestroy")
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.Zot), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.ert), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Jpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmOnlyShowMiniMap, this.ttt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmOnlyShowJoyStick, this.HJe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmHideMissionAndBossName, this._F_), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, this.cah), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI, this.Yoh), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPlayAudio, this.rrt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiAlphaChanged, this.KHa), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPureModeChanged, this.TEl), InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.退出精简模式, this.fIl), InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.退出精简模式PC触摸板, this.fIl), Info_1.Info.IsInTouch() || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo)
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.Zot), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiAllRoleDataChanged, this.ert), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Jpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmOnlyShowMiniMap, this.ttt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmOnlyShowJoyStick, this.HJe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmHideMissionAndBossName, this._F_), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRouletteViewVisibleChanged, this.FJe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView, this.cah), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI, this.Yoh), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPlayAudio, this.rrt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiAlphaChanged, this.KHa), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPureModeChanged, this.TEl), InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.退出精简模式, this.fIl), InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.退出精简模式PC触摸板, this.fIl), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.InputControllerChange, this.XBo) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo)
  }
  trt(t) {
    this.Jot !== t && (this.Jot = t, this.IsShow) && !this.EEl && this.UiViewSequence?.PlaySequencePurely("Switch")
  }
  async lrt() {
    this.Proxy.HeadStatePanel = new BattleHeadStatePanel_1.BattleHeadStatePanel, await this.Proxy.HeadStatePanel.Preload(), this.Proxy.HeadStatePanel.Init()
  }
  drt() {
    this.Proxy.HeadStatePanel && (this.Proxy.HeadStatePanel.ResetAllHeadStates(), this.Proxy.HeadStatePanel = void 0)
  }
  _rt() {
    this.Vot = new PartStatePanel_1.PartStatePanel, this.Vot.InitializePartStatePanel()
  }
  Crt() {
    this.Vot && (this.Vot.ResetPartStatePanel(), this.Vot = void 0)
  }
  q8c() {
    this.O8c || ModelManager_1.ModelManager.BattleLinkModel?.CheckInNewBattleLink() && (this.O8c = new BattleLinkEnergyButton_1.BattleLinkEnergyButton, this.O8c.CreateByResourceIdAsync("UiItem_RogueScoreE").then(() => {
      (Info_1.Info.IsInGamepad() ? this.Hot : this.sza)?.AddChildToRoleHeadPanel(this.O8c.GetRootItem())
    }))
  }
  G8c() {
    this.O8c && (this.O8c.Destroy(), this.O8c = void 0)
  }
  ShowLinkButton(t) {
    t ? this.O8c ? (this.sza?.AddChildToRoleHeadPanel(this.O8c.GetRootItem()), this.O8c?.SetUiActive(!0)) : (this.O8c = new BattleLinkEnergyButton_1.BattleLinkEnergyButton, this.O8c.CreateThenShowByResourceIdAsync("UiItem_RogueScoreE").then(() => {
      this.sza?.AddChildToRoleHeadPanel(this.O8c.GetRootItem()), this.O8c?.SetUiActive(!0)
    })) : (this.O8c?.GetRootItem().DetachFromParent(), this.O8c?.SetUiActive(!1))
  }
  async hrt(t, e, i = !1, s = 0) {
    var n = this.GetItem(t),
      e = new e;
    return await e.CreateThenShowByActorAsync(n.GetOwner(), s), this.Kot.set(t, e), i && this.Qot.push(e), e
  }
  ort(t) {
    return this.Kot.get(t)
  }
  LEl() {
    this.EEl = ModelManager_1.ModelManager.BattleUiModel.PureModeData?.IsOpen ?? !1, this.GetItem(15)?.SetUIActive(this.EEl);
    for (const t of this.Kot.values()) t?.RefreshPureMode(this.EEl);
    this.EEl || this.GetItem(14)?.SetUIActive(!0)
  }
  REl() {
    this.EEl && this.GetItem(14)?.SetUIActive(!1)
  }
  UEl() {
    if (this.EEl) {
      this.GetItem(14)?.SetUIActive(!0);
      for (const t of this.Kot.values()) t?.RefreshPureMode(this.EEl)
    }
  }
  DEl() {
    this.EEl && this.GetItem(14)?.SetUIActive(!1)
  }
  mrt() {
    for (const t of this.Kot.values()) void 0 !== t && t.Reset();
    this.Kot.clear(), this.Qot.length = 0
  }
  crt() {
    if (Info_1.Info.IsInTouch()) {
      var t = ModelManager_1.ModelManager.BattleUiSetModel.GetPanelDataMap();
      if (t)
        for (var [e, i] of t) {
          var s = this.ort(e);
          if (s) {
            var n, a, h, r, i = i.GetPanelItemDataMap();
            if (i)
              for (var [o, _] of i)
                if (_.IsInitialized()) {
                  let t = s.GetItem(o);
                  (t = -1 === o ? s.GetRootItem() : t) ? (n = _.Size, a = _.Alpha, h = _.OffsetX, r = _.OffsetY, _ = _.HierarchyIndex, this.Xot.X = n, this.Xot.Y = n, this.Xot.Z = n, t.SetUIItemScale(this.Xot), t.SetAnchorOffsetX(h), t.SetAnchorOffsetY(r), t.SetUIItemAlpha(a), t.SetHierarchyIndex(_)) : Log_1.Log.CheckError() && Log_1.Log.Error("BattleUiSet", 17, "刷新移动端主界面设置时，找不到对应按钮", ["panelIndex", e], ["panelItemIndex", o])
                }
          }
        }
    }
  }
  h01(t) {
    return !(t.IsChildType(5) && !ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible)
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (0 !== t.length) return (this.Ula.get(t[0]) || this.Ula.get("Default"))(t);
    Log_1.Log.CheckError() && Log_1.Log.Error("Guide", 64, "BattleView相关的引导Extra参数设置错误，不能为空")
  }
  ResetFormationCooldownExternal() {
    this.Hot?.ResetFormationCooldownExternal(), this.sza?.ResetFormationCooldownExternal()
  }
}(exports.BattleView = BattleView).vJe = Stats_1.Stat.Create("[BattleView]BattleViewTick");
//# sourceMappingURL=BattleView.js.map