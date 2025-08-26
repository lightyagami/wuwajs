"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMainViewProxy = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GameMainViewProxy_1 = require("../GameMainViewProxy");
const TrapDefenseBuildTipsPanel_1 = require("./ChildPanel/TrapDefenseBuildTipsPanel");
const TrapDefenseCampsiteHpPanel_1 = require("./ChildPanel/TrapDefenseCampsiteHpPanel");
const TrapDefenseComboPanel_1 = require("./ChildPanel/TrapDefenseComboPanel");
const TrapDefenseDesktopSkillPanel_1 = require("./ChildPanel/TrapDefenseDesktopSkillPanel");
const TrapDefenseFunctionalPanel_1 = require("./ChildPanel/TrapDefenseFunctionalPanel");
const TrapDefenseMachineSelectPanel_1 = require("./ChildPanel/TrapDefenseMachineSelectPanel");
const TrapDefenseMachineTipsPanel_1 = require("./ChildPanel/TrapDefenseMachineTipsPanel");
const TrapDefenseMiniMapPanel_1 = require("./ChildPanel/TrapDefenseMiniMapPanel");
const TrapDefenseMissionPanel_1 = require("./ChildPanel/TrapDefenseMissionPanel");
const TrapDefenseMobileSkillPanel_1 = require("./ChildPanel/TrapDefenseMobileSkillPanel");
const TrapDefensePreparationPanel_1 = require("./ChildPanel/TrapDefensePreparationPanel");
const TrapDefenseInterfaceLogic_1 = require("./TrapDefenseInterfaceLogic");
class TrapDefenseMainViewProxy extends GameMainViewProxy_1.GameMainViewProxy {
  constructor() {
    super(...arguments);
    this.wYu = new TrapDefenseInterfaceLogic_1.TrapDefenseInterfaceLogic(this);
    this.MiniMap = undefined;
    this.MissionPanel = undefined;
    this.MachineSelectPanel = undefined;
    this.PreparationPanel = undefined;
    this.FunctionalPanel = undefined;
    this.CampsiteHpPanel = undefined;
    this.BuildTipsPanel = undefined;
    this.ComboPanel = undefined;
    this.MobileSkillPanel = undefined;
    this.DesktopSkillPanel = undefined;
    this.MachineTipsPanel = undefined;
    this.LYu = 0;
    this.TouchUiEditGroup = 1;
    this.AYu = e => {
      if (e === 1) {
        this.DYu();
        this.xYu();
      } else if (e === 2) {
        this.PreparationPanel.HideBattleChildViewPanel();
        this.HJc();
        ControllerHolder_1.ControllerHolder.TrapDefenseController.StartChallengeRoundTips();
      }
      if (e !== 2) {
        this.ComboPanel.HideComboPanel();
      }
      this.MiniMap.OnTowerDefenseStepUpdate(e);
      this.MachineSelectPanel.OnTowerDefenseStepUpdate(e);
    };
    this.UYu = e => {
      this.BuildTipsPanel.SetTipsType(e);
      this.MobileSkillPanel?.RefreshButtonByTipsType(e);
    };
    this.$cd = e => {
      if (e !== undefined) {
        this.BuildTipsPanel.SetRecyclePrice(e);
        this.MobileSkillPanel?.SetRecyclePrice(e);
      }
    };
    this.BYu = e => {
      this.ComboPanel.RefreshComboNum(e);
    };
    this.kYu = () => {
      this.FunctionalPanel.UpdateBdSumState();
    };
    this.iJc = e => {
      this.MachineSelectPanel?.RefreshMachineCdState(e);
      this.MobileSkillPanel?.RefreshMachineCdState();
    };
    this.wto = (e, i) => {
      if (e === "PlotViewHUD") {
        this.MachineSelectPanel.SetMachineSelectCollapse(i);
      }
    };
    this.bmd = () => {
      this.MachineSelectPanel.RefreshSlotState();
    };
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.OYu(), this.lXu(), this.qYu(), this.GYu(), this.FYu(), this.NYu(), this.VYu(), this.jYu(), this.HYu(), this.$Yu(), this.Pad()]);
  }
  OnStart() {
    this.LYu = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseWarningDistance();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefenseEventStepUpdate, this.AYu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefenseEventNotifyType, this.UYu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefenseRecycleRaycastNotify, this.$cd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseComboNumChange, this.BYu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseActivityDataUpdate, this.kYu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapFollowerSkillCd, this.iJc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotViewChange, this.wto);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseOnSlotUpdate, this.bmd);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefenseEventStepUpdate, this.AYu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefenseEventNotifyType, this.UYu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefenseRecycleRaycastNotify, this.$cd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseComboNumChange, this.BYu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseActivityDataUpdate, this.kYu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapFollowerSkillCd, this.iJc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotViewChange, this.wto);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseOnSlotUpdate, this.bmd);
  }
  OnBeforeShow(e) {
    if (e) {
      e = ControllerHolder_1.ControllerHolder.TowerDefenseEventController.ProcessStatus;
      this.AYu(e);
      this.DesktopSkillPanel?.RefreshButtonByIsInBuild(false);
      e = ControllerHolder_1.ControllerHolder.TowerDefenseEventController.BuildTipsType;
      this.MobileSkillPanel?.RefreshButtonByTipsType(e);
    }
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddBattleUiCommonChildVisibleReason(2);
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveBattleUiCommonChildVisibleReason(2);
  }
  OnTick(e) {
    var i = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.GetEntityPositions();
    this.WYu(i);
  }
  WYu(e) {
    let i = false;
    if (e && e.length > 0) {
      for (const t of e) {
        if (t.Distance <= this.LYu) {
          i = true;
          break;
        }
      }
    }
    this.CampsiteHpPanel.SetWarningItemActive(i);
  }
  OnRouletteViewVisibleChangedInner(e) {
    if (Info_1.Info.IsInTouch()) {
      if (e) {
        this.BuildTipsPanel.HideBattleChildViewPanel();
        this.MissionPanel.HideBattleChildViewPanel();
      } else {
        this.BuildTipsPanel.ShowBattleChildViewPanel();
        this.MissionPanel.ShowBattleChildViewPanel();
      }
      this.MachineTipsPanel.RefreshMachineStateByRoulette(e);
    }
  }
  async OYu() {
    ModelManager_1.ModelManager.TrapDefenseModel?.MapData.InitMapData();
    this.MiniMap = await this.CreateChildPanel("DynActivityTowerMap", this.View.GetContentPanel(), TrapDefenseMiniMapPanel_1.TrapDefenseMiniMapPanel, true, true, 4);
  }
  async lXu() {
    this.MissionPanel = await this.CreateChildPanel("DynActivityTowerMission", this.View.GetContentPanel(), TrapDefenseMissionPanel_1.TrapDefenseMissionPanel, true, true, 5);
  }
  async qYu() {
    this.MachineSelectPanel = await this.CreateChildPanel("DynActivityTower", this.View.GetContentPanel(), TrapDefenseMachineSelectPanel_1.TrapDefenseMachineSelectPanel, true, true, 28);
    this.MachineSelectPanel.SetInterface(this.wYu);
  }
  async GYu() {
    this.PreparationPanel = await this.CreateChildPanel("DynActivityTowerEntrance", this.View.GetContentPanel(), TrapDefensePreparationPanel_1.TrapDefensePreparationPanel, false, false, 29);
  }
  async FYu() {
    this.FunctionalPanel = await this.CreateChildPanel("DynTowerTop", this.View.GetContentPanel(), TrapDefenseFunctionalPanel_1.TrapDefenseFunctionalPanel, true, false, 30);
  }
  async NYu() {
    this.CampsiteHpPanel = await this.CreateChildPanel("UiItem_TowerDefenseTips", this.View.GetContentPanel(), TrapDefenseCampsiteHpPanel_1.TrapDefenseCampsiteHpPanel, true, false, 31);
  }
  async VYu() {
    this.BuildTipsPanel = await this.CreateChildPanel("DynActivityTowerOperate", this.View.GetContentPanel(), TrapDefenseBuildTipsPanel_1.TrapDefenseBuildTipsPanel, true, true, 32);
  }
  async jYu() {
    this.ComboPanel = await this.CreateChildPanel("UiItem_TowerDefenseCombo", this.View.GetContentPanel(), TrapDefenseComboPanel_1.TrapDefenseComboPanel, false, true, 33);
  }
  async HYu() {
    if (!!Info_1.Info.IsInTouch() && !this.MobileSkillPanel) {
      await this.QYu();
    }
  }
  async $Yu() {
    if (!Info_1.Info.IsInTouch() && !this.DesktopSkillPanel) {
      await this.KYu();
    }
  }
  async QYu() {
    this.MobileSkillPanel = await this.CreateChildPanel("DynTowerDefenseSkill", this.View.GetContentPanel(), TrapDefenseMobileSkillPanel_1.TrapDefenseMobileSkillPanel, true, true, 36);
  }
  async KYu() {
    this.DesktopSkillPanel = await this.CreateChildPanel("DynTowerDefenseSkill", this.View.GetContentPanel(), TrapDefenseDesktopSkillPanel_1.TrapDefenseDesktopSkillPanel, true, true, 35);
  }
  async Pad() {
    this.MachineTipsPanel = await this.CreateChildPanel("UiItem_InsideIllustrationsPopup", this.View.GetContentPanel(), TrapDefenseMachineTipsPanel_1.TrapDefenseMachineTipsPanel, false, false, 34);
  }
  DYu() {
    if (ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsShopOpen) {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.OpenTrapDefenseShopOpenTips(() => {
        this.PreparationPanel.ShowBattleChildViewPanel();
      });
    } else {
      this.PreparationPanel.ShowBattleChildViewPanel();
    }
  }
  xYu() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurrentBatchData();
    if (e && !StringUtils_1.StringUtils.IsBlank(e.ReadStageEnhanceTips)) {
      this.FunctionalPanel.SetTips(e.ReadStageEnhanceTips);
    }
    var e = ModelManager_1.ModelManager.TrapDefenseModel?.GetCurInstToLevelData();
    var i = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetBatch();
    if (e?.IsBossWave(i)) {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.OpenTrapDefenseBossComingTips();
    }
  }
  HJc() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurrentBatchData();
    if (e && !StringUtils_1.StringUtils.IsBlank(e.ReadStageEnhanceTips)) {
      this.FunctionalPanel.HideTips();
    }
  }
  RefreshSelectPanel() {
    this.MachineSelectPanel.RefreshMachineState();
  }
}
exports.TrapDefenseMainViewProxy = TrapDefenseMainViewProxy;
//# sourceMappingURL=TrapDefenseMainViewProxy.js.map