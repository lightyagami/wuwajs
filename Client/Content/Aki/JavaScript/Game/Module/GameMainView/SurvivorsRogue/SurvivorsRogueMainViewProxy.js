"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueMainViewProxy = undefined;
const puerts_1 = require("puerts");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const SurvivorsWaveByLevel_1 = require("../../../../Core/Define/ConfigQuery/SurvivorsWaveByLevel");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const UiLayer_1 = require("../../../Ui/UiLayer");
const GameMainViewProxy_1 = require("../GameMainViewProxy");
const SurvivorsRogueBossTrackedMarker_1 = require("./ChildPanel/SurvivorsRogueBossTrackedMarker");
const SurvivorsRogueCountDownTipsPanel_1 = require("./ChildPanel/SurvivorsRogueCountDownTipsPanel");
const SurvivorsRogueFightInfoPanel_1 = require("./ChildPanel/SurvivorsRogueFightInfoPanel");
const SurvivorsRoguePlayerTrackerMarker_1 = require("./ChildPanel/SurvivorsRoguePlayerTrackerMarker");
const SurvivorsRoguePopUpWaveTipsPanel_1 = require("./ChildPanel/SurvivorsRoguePopUpWaveTipsPanel");
const SurvivorsRogueResidentWaveTipsPanel_1 = require("./ChildPanel/SurvivorsRogueResidentWaveTipsPanel");
const SurvivorsRogueRoleStatePanel_1 = require("./ChildPanel/SurvivorsRogueRoleStatePanel");
const SurvivorsRogueSkillPanel_1 = require("./ChildPanel/SurvivorsRogueSkillPanel");
const SurvivorsRogueTipsPanelBase_1 = require("./ChildPanel/SurvivorsRogueTipsPanelBase");
const SurvivorsRogueWaveCompleteTipsPanel_1 = require("./ChildPanel/SurvivorsRogueWaveCompleteTipsPanel");
class SurvivorsRogueMainViewProxy extends GameMainViewProxy_1.GameMainViewProxy {
  constructor() {
    super(...arguments);
    this.SurvivorsRogueChildPanelMap = new Map();
    this.RoleStatePanel = undefined;
    this.FightInfoPanel = undefined;
    this.BonusWaveTips = undefined;
    this.PopUpWaveTips = undefined;
    this.MobileSkillPanel = undefined;
    this.DesktopSkillPanel = undefined;
    this.ResidentWaveTips = undefined;
    this.EndlessWaveTips = undefined;
    this.CountDownTips = undefined;
    this.WaveCompleteTips = undefined;
    this.HNd = new Map();
    this.$Nd = undefined;
    this.Uht = undefined;
    this.frm = 0;
    this.jUd = (e, i) => {
      i = MathUtils_1.MathUtils.LongToNumber(i.oTs);
      this.FightInfoPanel.RefreshCurrencyNum(i);
    };
    this.HUd = (e, i) => {
      i = MathUtils_1.MathUtils.LongToNumber(i.oTs);
      this.FightInfoPanel.RefreshComboNum(i);
    };
    this.$Ud = (e, i) => {
      i = MathUtils_1.MathUtils.LongToNumber(i.oTs);
      this.FightInfoPanel.RefreshChestNum(i);
    };
    this.WUd = (e, i) => {
      i = MathUtils_1.MathUtils.LongToNumber(i.oTs);
      this.FightInfoPanel.RefreshPositiveArea(i);
    };
    this.rRd = e => {
      this.UpdateWaveTipsByState(e);
    };
    this.oRd = () => {
      this.BonusWaveTips.ShowTips();
    };
    this.TTm = () => {
      this.EndlessWaveTips.ShowTips();
    };
    this.WNd = (e, i) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SurvivorsRogue", 79, "OnBossTrackedMarkerUpdate", ["EntityId", e], ["IsAdd", i]);
      }
      if (i) {
        this.pRd(e);
      } else {
        i = this.HNd.get(e);
        this.HNd.delete(e);
        i?.DelayRecycle();
      }
    };
    this.jNd = () => {
      this.$Nd.ShowTips();
    };
  }
  async OnBeforeStartAsync() {
    this.Oht();
    await Promise.all([this._Rd(), this.uRd(), this.QUd(), this.KUd(), this.cRd(), this.dRd(), this.rXc(), this.oXc(), this.gRd(), this.CRd(), this.vRd()]);
  }
  OnBeforeDestroy() {
    this.kht();
    this.bsm();
  }
  OnAfterShow() {
    for (const e of this.SurvivorsRogueChildPanelMap.values()) {
      e.Show();
    }
    for (const i of this.HNd.values()) {
      i.Show();
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddBattleUiCommonChildVisibleReason(3);
    if (this.frm !== ModelManager_1.ModelManager.SurvivorsRogueModel.WaveTipsState) {
      this.UpdateWaveTipsByState(ModelManager_1.ModelManager.SurvivorsRogueModel.WaveTipsState);
    }
  }
  OnAfterHide() {
    for (const e of this.SurvivorsRogueChildPanelMap.values()) {
      e.Hide();
    }
    for (const i of this.HNd.values()) {
      i.Hide();
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveBattleUiCommonChildVisibleReason(3);
  }
  OnTick(e) {
    var i = e * (Time_1.Time.TimeDilation ?? 1);
    super.OnTick(i);
    if (this.frm === 2) {
      this.CountDownTips.OnTick(i);
    } else if (this.frm === 1) {
      this.PopUpWaveTips.OnTick(i);
    }
    this.FightInfoPanel.OnTick(i);
    this.$Nd.OnTick(i);
    this.RoleStatePanel.OnTick(i);
    for (const t of this.HNd) {
      t[1].OnTick(i);
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueSwitchWaveTipsState, this.rRd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueShowBonusWaveTips, this.oRd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueShowEndlessWaveTips, this.TTm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRogueBossTrackedMarkerUpdate, this.WNd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SurvivorsRoguePlayerEntityCreated, this.jNd);
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate;
    e.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.jUd);
    e.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.ConsecutiveKillCount, this.HUd);
    e.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.TreasureBoxCount, this.$Ud);
    e.AddTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.GoldGainEfficiency, this.WUd);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueSwitchWaveTipsState, this.rRd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueShowBonusWaveTips, this.oRd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueShowEndlessWaveTips, this.TTm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRogueBossTrackedMarkerUpdate, this.WNd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SurvivorsRoguePlayerEntityCreated, this.jNd);
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.BehaviorDelegate;
    e.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.Gold, this.jUd);
    e.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.ConsecutiveKillCount, this.HUd);
    e.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.TreasureBoxCount, this.$Ud);
    e.RemoveTreeVarUpdateDelegate(IQuest_1.ESurvivorsRougeSystemVarType.GoldGainEfficiency, this.WUd);
  }
  async CreateSurvivorsRogueChildPanel(e, i, t, s = true) {
    var r = new t();
    if (s) {
      await r.CreateThenShowByResourceIdAsync(e, i);
    } else {
      await r.CreateByResourceIdAsync(e, i);
    }
    this.SurvivorsRogueChildPanelMap.set(t, r);
    this.PanelResIdMap.set(e, r);
    return r;
  }
  Oht() {
    var e = (0, puerts_1.$ref)(undefined);
    var i = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    if (i?.IsValid()) {
      i.GetScreenEffectFightRoot(e);
      this.Uht = (0, puerts_1.$unref)(e);
      this.Uht?.K2_AttachRootComponentTo(this.View.GetContentPanel());
      ModelManager_1.ModelManager.ScreenEffectModel.SetFightRootInited(true);
    }
  }
  kht() {
    if (this.Uht?.IsValid()) {
      this.Uht.K2_DetachFromActor();
    }
    this.Uht = undefined;
    ModelManager_1.ModelManager.ScreenEffectModel?.SetFightRootInited(false);
  }
  async KUd() {
    var e = new SurvivorsRogueResidentWaveTipsPanel_1.SurvivorsRogueResidentWaveTipsPanel();
    await e.CreateByResourceIdAsync("DynSurvivorAround", this.View.GetContentPanel());
    this.ResidentWaveTips = e;
    this.PanelResIdMap.set("DynSurvivorAround", e);
  }
  async gRd() {
    var e = new SurvivorsRogueCountDownTipsPanel_1.SurvivorsRogueCountDownTipsPanel();
    await e.CreateByResourceIdAsync("UiView_CountDownChallenge", this.View.GetContentPanel());
    this.CountDownTips = e;
    this.PanelResIdMap.set("UiView_CountDownChallenge", e);
  }
  async cRd() {
    var e = new SurvivorsRogueTipsPanelBase_1.SurvivorsRogueTipsPanelBase();
    await e.CreateByResourceIdAsync("DynTreasureChestTips", this.View.GetContentPanel());
    this.BonusWaveTips = e;
    this.PanelResIdMap.set("DynTreasureChestTips", e);
  }
  async CRd() {
    var e = new SurvivorsRogueTipsPanelBase_1.SurvivorsRogueTipsPanelBase();
    await e.CreateByResourceIdAsync("DynInfinitelyOpenTips", this.View.GetContentPanel());
    this.EndlessWaveTips = e;
    this.PanelResIdMap.set("DynInfinitelyOpenTips", e);
  }
  async QUd() {
    var e = new SurvivorsRoguePopUpWaveTipsPanel_1.SurvivorsRoguePopUpWaveTipsPanel();
    await e.CreateByResourceIdAsync("DynSurvivorAround1", this.View.GetContentPanel());
    this.PopUpWaveTips = e;
    this.PanelResIdMap.set("DynSurvivorAround1", e);
  }
  async dRd() {
    var e = new SurvivorsRogueWaveCompleteTipsPanel_1.SurvivorsRogueWaveCompleteTipsPanel();
    await e.CreateByResourceIdAsync("UiView_Challenge_Success_Prefab", this.View.GetContentPanel());
    this.WaveCompleteTips = e;
    this.PanelResIdMap.set("UiView_Challenge_Success_Prefab", e);
  }
  async vRd() {
    this.$Nd = await this.CreateSurvivorsRogueChildPanel("DynRolePos", UiLayer_1.UiLayer.GetBattleViewUnit(1), SurvivorsRoguePlayerTrackerMarker_1.SurvivorsRoguePlayerTrackerMarker, false);
  }
  async _Rd() {
    this.RoleStatePanel = await this.CreateSurvivorsRogueChildPanel("UiItem_SurvivorFightInfo", this.View.GetContentPanel(), SurvivorsRogueRoleStatePanel_1.SurvivorsRogueRoleStatePanel, false);
  }
  async uRd() {
    this.FightInfoPanel = await this.CreateSurvivorsRogueChildPanel("DynSurvivorInfo", this.View.GetContentPanel(), SurvivorsRogueFightInfoPanel_1.SurvivorsRogueFightInfoPanel);
  }
  async rXc() {
    if (!!Info_1.Info.IsInTouch() && !this.MobileSkillPanel) {
      await this.nXc();
    }
  }
  async oXc() {
    if (!Info_1.Info.IsInTouch() && !this.DesktopSkillPanel) {
      await this.sXc();
    }
  }
  async nXc() {
    this.MobileSkillPanel = await this.CreateChildPanel("DynSurvivorSkill", this.View.GetContentPanel(), SurvivorsRogueSkillPanel_1.SurvivorsRogueSkillPanel, true, true, 36);
  }
  async sXc() {
    this.DesktopSkillPanel = await this.CreateChildPanel("PC_DynSurvivorSkill", UiLayer_1.UiLayer.GetBattleViewUnit(1), SurvivorsRogueSkillPanel_1.SurvivorsRogueSkillPanel, true, true, 35);
  }
  async pRd(e) {
    var i = new SurvivorsRogueBossTrackedMarker_1.SurvivorsRogueBossTrackedMarker(e);
    this.HNd.set(e, i);
    await i.CreateByPoolResourceIdAsync("DynBossPos", UiLayer_1.UiLayer.GetBattleViewUnit(1));
    if (this.HNd.has(e)) {
      await i.ShowAsync();
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SurvivorsRogue", 79, "创建BOSS追踪图标过程中实体就已经销毁, 停止创建图标", ["EntityId", e]);
      }
      i.Destroy();
    }
  }
  UpdateWaveTipsByState(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SurvivorsRogue", 79, "UpdateWaveTipsByState", ["CurTipsState", this.frm], ["TargetState", e]);
    }
    switch (this.frm = e) {
      case 0:
        this.PopUpWaveTips.Hide();
        this.ResidentWaveTips.HideTips();
        this.CountDownTips.HideTips();
        this.WaveCompleteTips.HideTips();
        this.BonusWaveTips.HideTips();
        this.EndlessWaveTips.HideTips();
        break;
      case 1:
        if (SurvivorsWaveByLevel_1.configSurvivorsWaveByLevel.GetConfigList(ModelManager_1.ModelManager.SurvivorsRogueModel.CurLevelId)) {
          this.PopUpWaveTips.ShowWaveTips();
          this.FightInfoPanel.SetChestActive(ModelManager_1.ModelManager.SurvivorsRogueModel.IsBonusWave);
          this.ResidentWaveTips.HideTips();
          this.CountDownTips.HideTips();
          this.WaveCompleteTips.HideTips();
          this.BonusWaveTips.HideTips();
          this.EndlessWaveTips.HideTips();
        }
        break;
      case 2:
        this.CountDownTips.InitCountDown(ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetWaveDuration(ModelManager_1.ModelManager.SurvivorsRogueModel.CurLevelId, ModelManager_1.ModelManager.SurvivorsRogueModel.CurWaveNum), ModelManager_1.ModelManager.SurvivorsRogueModel.IsEndlessWave);
        this.PopUpWaveTips.Hide();
        this.ResidentWaveTips.ShowTips();
        this.CountDownTips.ShowTips();
        this.WaveCompleteTips.HideTips();
        this.BonusWaveTips.HideTips();
        this.EndlessWaveTips.HideTips();
        break;
      case 3:
        this.bsm();
        this.PopUpWaveTips.Hide();
        this.ResidentWaveTips.HideTips();
        this.CountDownTips.HideTips();
        this.WaveCompleteTips.ShowTips();
        this.BonusWaveTips.HideTips();
        this.EndlessWaveTips.HideTips();
        this.FightInfoPanel.ResetFightInfo();
    }
  }
  bsm() {
    if (this.HNd.size !== 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SurvivorsRogue", 79, "结束战斗阶段时有BOSS追踪图标残留, 强制清除");
      }
      for (const e of this.HNd.values()) {
        e.Recycle();
      }
      this.HNd.clear();
    }
  }
}
exports.SurvivorsRogueMainViewProxy = SurvivorsRogueMainViewProxy;
//# sourceMappingURL=SurvivorsRogueMainViewProxy.js.map