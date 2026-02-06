"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const BaseConfigController_1 = require("../../../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const BabelTowerBattleTopPanel_1 = require("../../../Activity/ActivityContent/BabelTower/BabelTowerBattleTopPanel");
const ActivityDirectTrainHelper_1 = require("../../../Activity/ActivityContent/DirectTrain/ActivityDirectTrainHelper");
const ActivityMowingRiskController_1 = require("../../../Activity/ActivityContent/MowingRisk/Controller/ActivityMowingRiskController");
const MowingRiskInBattleView_1 = require("../../../Activity/ActivityContent/MowingRisk/View/MowingRiskInBattleView");
const ActivityController_1 = require("../../../Activity/ActivityController");
const MoraleExpView_1 = require("../../../Battle/Morale/View/MoraleExpView");
const FunctionController_1 = require("../../../Functional/FunctionController");
const HonamiStoryUtil_1 = require("../../../HonamiStory/HonamiStoryUtil");
const InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController");
const InstanceDungeonGuideController_1 = require("../../../InstanceDungeon/InstanceDungeonGuideController");
const MapRogueController_1 = require("../../../MapRogue/MapRogueController");
const OnlineController_1 = require("../../../Online/OnlineController");
const PhoneMsgController_1 = require("../../../PhoneMessage/PhoneMsgController");
const ResDownLoadTopPanel_1 = require("../../../ResDownLoad/ResDownLoadTopPanel");
const RoguelikeController_1 = require("../../../Roguelike/RoguelikeController");
const TowerDefenceController_1 = require("../../../TowerDefence/TowerDefenceController");
const TowerDefenceInBattleView_1 = require("../../../TowerDefence/View/TowerDefenceInBattleView");
const TowerController_1 = require("../../../TowerDetailUi/TowerController");
const AlertAreaInfoView_1 = require("../AlertAreaView/AlertAreaInfoView");
const BattleDungeonGuideButton_1 = require("../BattleChildView/BattleDungeonGuideButton");
const BattleEntranceButton_1 = require("../BattleChildView/BattleEntranceButton");
const BattleFishingView_1 = require("../BattleChildView/BattleFishingView");
const BattleFormationButton_1 = require("../BattleChildView/BattleFormationButton");
const BattleOnlineButton_1 = require("../BattleChildView/BattleOnlineButton");
const BattlePhoneMessageButton_1 = require("../BattleChildView/BattlePhoneMessageButton");
const BattleQuestButton_1 = require("../BattleChildView/BattleQuestButton");
const BattleTowerButton_1 = require("../BattleChildView/BattleTowerButton");
const BattleHonamiStoryLeaveButton_1 = require("../HonamiStory/BattleHonamiStoryLeaveButton");
const BattleHonamiStoryMapLevelView_1 = require("../HonamiStory/BattleHonamiStoryMapLevelView");
const BattleHonamiStoryPlayerStateView_1 = require("../HonamiStory/BattleHonamiStoryPlayerStateView");
const MiniMapView_1 = require("../MiniMapView");
const MoraleBuffBattleView_1 = require("../Morale/MoraleBuffBattleView");
const ShipTowerBuffBattleView_1 = require("../ShipTower/ShipTowerBuffBattleView");
const SilentAreaInfoView_1 = require("../SilentAreaView/SilentAreaInfoView");
const TopPanelWavePlateTip_1 = require("../Tips/TopPanelWavePlateTip");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
const CommonTopButtonPanel_1 = require("./CommonTopButtonPanel");
const GamepadTopPanel_1 = require("./GamepadTopPanel");
const battleUiChildren = [4, 3, 2, 1];
class TopPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.Vet = undefined;
    this.Het = undefined;
    this.jet = undefined;
    this.Wet = undefined;
    this.Ket = undefined;
    this.ZB1 = undefined;
    this.dau = undefined;
    this.Qet = undefined;
    this.JOm = undefined;
    this.Xet = undefined;
    this.$et = undefined;
    this.Yet = undefined;
    this.Jet = undefined;
    this.zet = undefined;
    this.pCa = undefined;
    this.bG_ = undefined;
    this.SJ1 = undefined;
    this.H9a = undefined;
    this.w_c = undefined;
    this.wF1 = undefined;
    this.Zet = undefined;
    this.fDn = undefined;
    this.Sml = undefined;
    this.XWl = undefined;
    this.BMl = undefined;
    this.YWl = undefined;
    this.sQd = undefined;
    this.Rim = undefined;
    this.zom = undefined;
    this.bqm = undefined;
    this.pO_ = undefined;
    this.NL1 = undefined;
    this.Oze = false;
    this.Wot = false;
    this.eet = t => {
      var e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t.Id);
      if (e && e.GetSilentAreaShowInfo()) {
        this.zet.StartShow(t.Id, e);
      }
    };
    this.oet = (t, e) => {
      if (this.zet?.Id === t) {
        this.zet.EndShow();
      }
    };
    this.ett = () => {
      this.Zet?.SetOtherHide(false);
      this.zet.EndShow();
    };
    this.vCa = t => {
      if (t) {
        this.pCa?.StartShow();
      } else {
        this.pCa?.EndShow();
      }
    };
    this.j9a = t => {
      this.H9a?.CustomSetActive(t);
      if (t) {
        t = ModelManager_1.ModelManager.MowingRiskModel.BuildInBattleRootData();
        this.H9a?.RefreshByCustomData(t);
      }
    };
    this.ttt = t => {
      for (const e of this.Het) {
        e.SetGmHide(!t);
      }
      this.jet.SetGmHide(!t);
      this.Ket.SetGmHide(!t);
    };
    this.XBo = () => {
      this.Oze = Info_1.Info.IsInGamepad();
      if (this.Vet) {
        this.Vet.RefreshOnPlatformChanged();
      }
      for (const t of this.Het) {
        t.SetGamepadHide(this.Oze);
      }
      this.Qet.RefreshButtonState();
      if (this.Oze) {
        this.GetItem(39).SetUIActive(false);
        this.zWl();
      } else if (!Info_1.Info.IsInTouch()) {
        this.GetItem(39).SetUIActive(true);
      }
    };
    this.itt = () => {
      this.ott();
      this.rkd();
    };
    this.ntt = () => {
      var t = ModelManager_1.ModelManager.InstanceDungeonGuideModel.GetHaveGuide();
      if (t) {
        this.Xet.SetOtherHide(true);
        this.$et.SetOtherHide(false);
      } else {
        this.Xet.SetOtherHide(false);
        this.$et.SetOtherHide(true);
      }
      var e = this.Gv1();
      if (e) {
        this.Xet.SetOtherHide(true);
        this.$et.SetOtherHide(true);
      }
      var i = ModelManager_1.ModelManager.BattleLinkModel.CheckInDreamLink();
      if (i) {
        this.Xet.SetOtherHide(true);
      }
      var i = ModelManager_1.ModelManager.ShipTowerModel.CheckInBattleShipTower();
      if (i) {
        this.Xet.SetOtherHide(true);
      }
      ModelManager_1.ModelManager.BattleUiModel.EnvironmentKeyData.SetEnvironmentKeyVisible(3, t && !e);
    };
    this.xie = () => {
      this.Qet.RefreshButtonState();
    };
    this.RQe = (t, e) => {
      for (const i of this.Het) {
        i.SetFunctionOpen(t, e);
      }
    };
    this.QF_ = () => {
      var t = ModelManager_1.ModelManager.AlertAreaModel?.GetAlertUiVisibleAreaId();
      if (t === undefined) {
        this.BMl?.EndShow();
      } else {
        this.BMl?.StartShow(t);
      }
    };
    this.VL1 = () => {
      if (ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive()) {
        this.NL1?.StartShow();
      } else {
        this.NL1?.EndShow();
      }
    };
    this.h$1 = t => {
      this.VL1();
      this.MJ1();
      this.dau?.SetOtherHide(!t);
      ModelManager_1.ModelManager.BattleUiModel?.EnvironmentKeyData?.SetEnvironmentKeyVisible(9, t);
    };
    this.T5u = (t, e, i, s) => {
      var n;
      if (e.Parameters[0] === "1" && (n = Number(e.Parameters[1]), ModelManager_1.ModelManager.MoraleModel?.GamePlayFinishTeamBuffId === n)) {
        this.MJ1();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Morale", 69, "TopPanel - OnCharOnBuffAddShowMoraleBuffTips", ["cue", e.Parameters], ["isAdd", i]);
      }
    };
    this.stt = () => {
      UiManager_1.UiManager.OpenView("FunctionView");
    };
    this.att = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10009);
    };
    this.htt = () => !ModelManager_1.ModelManager.ActivityModel.GetIfShowActivity();
    this.ltt = () => {
      InstanceDungeonController_1.InstanceDungeonController.OnClickInstanceDungeonExitButton();
    };
    this.KYe = () => {
      var t = ModelManager_1.ModelManager.GameModeModel.IsMulti;
      var e = ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled();
      if (!t && e) {
        OnlineController_1.OnlineController.ShowTipsWhenOnlineDisabled();
      } else {
        UiManager_1.UiManager.OpenView("OnlineWorldHallView");
      }
    };
    this._tt = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10002);
    };
    this.ZOm = () => {
      PhoneMsgController_1.PhoneMsgController.OpenAndJumpShowTipShortMessage(1, 1);
    };
    this.Omt = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10010);
    };
    this.utt = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10040);
    };
    this.ctt = () => {
      ActivityController_1.ActivityController.OpenActivityById(0, 1);
    };
    this.mtt = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10001);
    };
    this.dtt = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10023);
    };
    this.Ctt = () => {
      if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryAreaDungeon()) {
        UiManager_1.UiManager.OpenView("HonamiStoryQuestView");
      } else {
        UiManager_1.UiManager.OpenView("QuestView");
      }
    };
    this.gtt = () => {
      InstanceDungeonGuideController_1.InstanceDungeonGuideController.StartReplayGuide();
    };
    this.ftt = () => {
      TowerController_1.TowerController.OpenTowerGuide();
    };
    this.ptt = () => {
      if (ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()) {
        UiManager_1.UiManager.OpenView("WeeklyRogueInfo");
      } else if (MapRogueController_1.MapRogueController.CheckInMapRogueInstance()) {
        UiManager_1.UiManager.OpenView("RogueBattleSummary");
      } else {
        RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
      }
    };
    this.vtt = () => ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() || ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue();
    this.pDn = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10019);
    };
    this.vDn = () => ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() && !ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue();
    this.Mtt = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10007);
    };
    this.Ett = () => {
      var t = this.GetExtendToggle(18).ToggleState;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BattleUiSet", 27, "当前背景播放音乐按钮 ToggleState", ["currentToggleState", t]);
      }
      if (t === 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BattleUiSet", 27, "停止背景音乐");
        }
        UE.KuroBgPlayerStatic.Stop();
      } else if (t === 1) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("BattleUiSet", 27, "背景播放音乐");
        }
        UE.KuroBgPlayerStatic.Play();
      }
    };
    this.ek1 = () => {
      ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.TryOpenPro(false);
    };
    this.tk1 = () => !ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen || !ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsInValidInstance;
    this.ik1 = t => {
      this.ZB1?.SetOtherHide(!t);
    };
    this.mau = () => {
      if (ModelManager_1.ModelManager.MoraleModel?.IsInitData) {
        UiManager_1.UiManager.OpenView("MoraleAreaSumView");
      }
    };
    this.fau = () => !ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive();
    this.Gd_ = t => {
      this.pO_?.SetDriveFishingShipVisible(t);
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(7, 7, !t);
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(7, 8, !t);
    };
    this.AF1 = () => {
      this.PF1();
    };
    this.aQd = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10102);
    };
    this.hQd = () => !HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [17, UE.UIItem], [16, UE.UIItem], [15, UE.UIItem], [18, UE.UIExtendToggle], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UIItem], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UIItem], [35, UE.UIItem], [36, UE.UIItem], [38, UE.UIItem]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([39, UE.UIItem]);
      this.ComponentRegisterInfos.push([40, UE.UIItem]);
      this.ComponentRegisterInfos.push([41, UE.UIItem]);
    }
    this.BtnBindInfo = [[18, this.Ett]];
  }
  async InitializeAsync() {
    this.Het = [];
    await Promise.all([this.Stt(), this.ytt(), this.Itt(), this.Ttt(), this.Ltt(), this.Dtt(), this.gau(), this.v2c(), this.Rtt(), this.Utt(), this.Att(), this.Ptt(), this.xtt(), this.wtt(), this.Btt(), this.MDn(), this.u8c(), this.btt(), this.rk1(), this.qtt(), this.Gtt(), this.MCa(), this.LG_(), this.EJ1(), this.R_c(), this.xF1(), this.W9a(), this.yml(), this.qMl(), this.vO_(), this.jL1(), this.art(), this.Jom(), this.eGm()]);
    this.Ntt();
  }
  OnSeamlessTravelFinish() {
    this.Vet.RefreshMiniMap();
    this.Ntt();
  }
  OnShowBattleChildViewPanel() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(0, battleUiChildren, true);
    this.Vet.ShowBattleVisibleChildView();
    for (const t of this.Het) {
      t.ShowBattleVisibleChildView();
    }
    this.zet.ShowBattleVisibleChildView();
    this.Zet.ShowBattleVisibleChildView();
    this.pCa.ShowBattleVisibleChildView();
    this.bG_.ShowBattleVisibleChildView();
    this.SJ1.ShowBattleVisibleChildView();
    this.H9a.ShowBattleVisibleChildView();
    this.w_c.ShowBattleVisibleChildView();
    this.wF1.ShowBattleVisibleChildView();
    this.BMl.ShowBattleVisibleChildView();
    this.Sml.ShowBattleVisibleChildView();
    this.pO_.ShowBattleVisibleChildView();
    this.NL1.ShowBattleVisibleChildView();
    this.zom?.ShowBattleVisibleChildView();
    this.bqm?.ShowBattleVisibleChildView();
    if (this.Oze && !this.Qet.GetActive()) {
      this.Qet.RefreshButtonState();
    }
  }
  OnHideBattleChildViewPanel() {
    ModelManager_1.ModelManager.BattleUiModel?.ChildViewData.SetChildrenVisible(0, battleUiChildren, false);
    this.Vet.HideBattleVisibleChildView();
    for (const t of this.Het) {
      t.HideBattleVisibleChildView();
    }
    this.zet.HideBattleVisibleChildView();
    this.pCa.HideBattleVisibleChildView();
    this.bG_.HideBattleVisibleChildView();
    this.SJ1.HideBattleVisibleChildView();
    this.H9a.HideBattleVisibleChildView();
    this.w_c.HideBattleVisibleChildView();
    this.wF1.HideBattleVisibleChildView();
    this.Sml.HideBattleVisibleChildView();
    this.BMl.HideBattleVisibleChildView();
    this.pO_.HideBattleVisibleChildView();
    this.NL1.HideBattleVisibleChildView();
    this.zom?.HideBattleVisibleChildView();
    this.bqm?.HideBattleVisibleChildView();
  }
  Ntt() {
    this.Oze = Info_1.Info.IsInGamepad();
    for (const t of this.Het) {
      t.SetGamepadHide(this.Oze);
    }
    this.Ott();
    this.ott();
    this.Gvu();
    this.ktt();
    this.SCa();
    this.wG_();
    this.MJ1();
    this.A_c();
    this.zXu();
    this.PF1();
    this.Q9a();
    this.v7a();
    this.ntt();
    this.ln_();
    this.QF_();
    this.VL1();
    this.rkd();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("BattleUiSet", 27, "IOS 审核音乐Toggle", [" BaseConfigController.GetIosAuditFirstDownloadTip()", BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip()]);
    }
    if (Info_1.Info.PlatformType === 1 && BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip() && (this.GetExtendToggle(18)?.RootUIComp.SetUIActive(true), this.GetExtendToggle(18)?.SetToggleState(0), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("BattleUiSet", 27, "初始化IOS 背景播放按钮");
    }
    if (this.Oze) {
      this.GetItem(39).SetUIActive(false);
      this.zWl();
    } else if (!Info_1.Info.IsInTouch()) {
      this.GetItem(39).SetUIActive(true);
    }
  }
  Reset() {
    this.Vet.Reset();
    this.Vet = undefined;
    this.Het = undefined;
    super.Reset();
  }
  OnTickBattleChildViewPanel(t) {
    TopPanel.vJe.Start();
    this.Vet.RefreshShow();
    this.BMl?.Tick(t);
    this.NL1?.Tick(t);
    TopPanel.vJe.Stop();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityUpdate, this.itt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DungeonGuideChange, this.ntt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GmOnlyShowMiniMap, this.ttt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.eet);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.oet);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnShowTowerGuideButton, this.ett);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefenseShowInBattleView, this.vCa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MowingRiskInBattleViewSetActive, this.j9a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateAreaAlertUiVisible, this.QF_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.AF1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority, this.AF1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleActiveChanged, this.h$1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips, this.T5u);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityDirectTrainProSetActive, this.ik1);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityUpdate, this.itt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DungeonGuideChange, this.ntt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.RQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GmOnlyShowMiniMap, this.ttt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, this.eet);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.oet);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnShowTowerGuideButton, this.ett);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefenseShowInBattleView, this.vCa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MowingRiskInBattleViewSetActive, this.j9a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateAreaAlertUiVisible, this.QF_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackDownLoadState, this.AF1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority, this.AF1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleActiveChanged, this.h$1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips, this.T5u);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityDirectTrainProSetActive, this.ik1);
  }
  ln_() {
    var t = ModelManager_1.ModelManager.BattleUiModel.TreeHandle;
    var e = ModelManager_1.ModelManager.BattleUiModel.TreeIncIdHandle;
    if (t && e) {
      this.zet.StartShow(e, t);
    } else {
      this.zet.EndShow();
    }
  }
  zWl() {
    if (this.Wot) {
      this.YWl.ShowBattleVisibleChildView();
      this.XWl.ShowBattleVisibleChildView();
    } else {
      this.lza().then(() => {
        if (!this.IsDestroyOrDestroying) {
          this.YWl.ShowBattleVisibleChildView();
          this.XWl.ShowBattleVisibleChildView();
        }
      });
    }
  }
  async art() {
    if (Info_1.Info.IsInGamepad()) {
      if (!this.Wot) {
        await this.lza();
      }
    } else {
      this.GetItem(40)?.SetUIActive(false);
    }
  }
  async lza() {
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RefreshButtonData();
    this.Wot = true;
    await this.JWl();
    await this.ZWl();
  }
  Gv1() {
    return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() || ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue() || ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance();
  }
  Ott() {
    this.jet.SetOtherHide(!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance());
  }
  ott() {
    if (this.Gv1()) {
      this.Ket.SetOtherHide(true);
    } else {
      this.Ket.SetOtherHide(!ModelManager_1.ModelManager.ActivityModel.GetIfShowActivity());
    }
  }
  Gvu() {
    this.ZB1?.SetOtherHide(!ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen || !ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsInValidInstance);
  }
  ktt() {
    this.Zet.SetOtherHide(!ModelManager_1.ModelManager.TowerModel.CheckInTower());
  }
  SCa() {
    if (TowerDefenceController_1.TowerDefenseController.CheckInInstanceDungeon()) {
      this.pCa?.StartShow();
    } else {
      this.pCa?.EndShow();
    }
  }
  wG_() {
    var t = ModelManager_1.ModelManager.ShipTowerModel.CheckInBattleShipTower();
    var e = ModelManager_1.ModelManager.ShipTowerModel.CheckIsScoreBattle();
    if (t && !e) {
      this.bG_?.StartShow();
    } else {
      this.bG_?.EndShow();
    }
  }
  MJ1() {
    if (ModelManager_1.ModelManager.MoraleModel.GetBattleIsShowBuff()) {
      this.SJ1?.StartShow();
    } else {
      this.SJ1?.EndShow();
    }
  }
  A_c() {
    if (ModelManager_1.ModelManager.BabelTowerModel.CheckInBattleBabelTower()) {
      this.w_c?.StartShow();
    } else {
      this.w_c?.EndShow();
    }
  }
  zXu() {
    var t = ModelManager_1.ModelManager.ShipTowerModel.CheckInBattleShipTower();
    var e = ModelManager_1.ModelManager.ShipTowerModel.CheckIsScoreBattle();
    this.Vet.SetShipTowerVisible(!t || !e);
  }
  PF1() {
    if (ModelManager_1.ModelManager.SubPackageDownLoadModel.NeedShowBattleViewButton()) {
      this.wF1?.StartShow();
    } else {
      this.wF1?.EndShow();
    }
  }
  Q9a() {
    var t = ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.CheckInInstanceDungeon();
    this.j9a(t);
  }
  v7a() {
    var t = ModelManager_1.ModelManager.BattleLinkModel.CheckInDreamLink();
    if (t) {
      this.Het.forEach(t => {
        t.SetOtherHide(true);
      });
      this.jet.SetOtherHide(false);
    }
    this.Vet.SetBattleLinkVisible(!t);
  }
  rkd() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) {
      this._Qd();
    } else {
      this.Ftt();
    }
  }
  _Qd() {
    this.Het.forEach(t => {
      t.SetOtherHide(true);
    });
    this.sQd?.SetOtherHide(false);
    this.fDn.SetOtherHide(false);
    this.Xet.SetOtherHide(false);
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryMainDungeon()) {
      this.jet.SetOtherHide(false);
    } else {
      this.Rim?.SetOtherHide(false);
      this.wF1?.EndShow();
      this.wF1?.SetOtherHide(true);
    }
  }
  Ftt() {
    var t = this.Gv1();
    var e = t || ModelManager_1.ModelManager.BabelTowerModel.CheckInBattleBabelTower();
    if (e) {
      this.Het.forEach(t => {
        t.SetOtherHide(true);
      });
      this.jet.SetOtherHide(false);
    }
    this.Vet.SetRoguelikeVisible(!e);
    this.Yet.SetOtherHide(!t);
    this.fDn.SetOtherHide(!t);
  }
  async Stt() {
    var t = this.GetItem(1);
    this.Wet = await this.Vtt(t, "BattleViewMenu", undefined, false, true, 2);
    this.Wet.BindOnClicked(this.stt);
  }
  async ytt() {
    var t = this.GetItem(3);
    (await this.Vtt(t, "BattleViewGachaButton", 10009)).BindOnClicked(this.att);
  }
  async Itt() {
    var t = this.GetItem(2);
    this.jet = await this.Vtt(t, undefined, undefined, true, false, 1);
    this.jet.BindOnClicked(this.ltt);
  }
  async Ptt() {
    var t = this.GetItem(10);
    this.Ket = await this.Vtt(t, "ActivityEntrance", 10053);
    this.Ket.SetGetOtherHideCallCall(this.htt);
    this.Ket.BindOnClicked(this.ctt);
  }
  async Ttt() {
    var t = this.GetItem(4);
    var e = {
      RedDotName: undefined,
      FunctionType: 10021,
      ChildType: 3,
      HideInGamepad: false,
      HideByRoleConfig: true
    };
    this.Qet = await this.NewStaticChildViewAsync(t.GetOwner(), BattleOnlineButton_1.BattleOnlineButton, e);
    this.Het.push(this.Qet);
    this.Qet.BindOnClicked(this.KYe);
  }
  async Dtt() {
    var t = this.GetItem(6);
    (await this.Vtt(t, "FunctionInventory", undefined, true)).BindOnClicked(this._tt);
  }
  async eGm() {
    var t;
    if (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()) {
      this.GetItem(38).SetUIActive(false);
    } else {
      t = this.GetItem(38);
      this.JOm = await this.NewStaticChildViewAsync(t.GetOwner(), BattlePhoneMessageButton_1.BattlePhoneMessageButton, {
        RedDotName: "FunctionPhoneMsg",
        FunctionType: 10130,
        ChildType: 3,
        HideInGamepad: true,
        HideByRoleConfig: true
      });
      this.Het.push(this.JOm);
      this.JOm.BindOnClicked(this.ZOm);
    }
  }
  async v2c() {
    var t;
    if (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("BattleUiSet", 5, "初始化IOS 商店按钮");
      }
      t = this.GetItem(5);
      (await this.Vtt(t, "FunctionPayShop", 10010, true)).BindOnClicked(this.Omt);
    } else {
      this.GetItem(5).SetUIActive(false);
    }
  }
  async Rtt() {
    var t = this.GetItem(7);
    (await this.Vtt(t, "BattlePass", 10040)).BindOnClicked(this.utt);
  }
  async Utt() {
    var t = this.GetItem(8);
    (await this.Vtt(t, "FunctionRole", 10001, true)).BindOnClicked(this.mtt);
  }
  async Att() {
    var t = this.GetItem(9);
    (await this.Vtt(t, "AdventureBattleButton", 10023, false)).BindOnClicked(this.dtt);
  }
  async Ltt() {
    var t = this.GetItem(0);
    this.Vet = await this.NewStaticChildViewAsync(t.GetOwner(), MiniMapView_1.MiniMapView);
  }
  async qtt() {
    var t = this.GetItem(15);
    this.zet = await this.NewDynamicChildViewAsync(t.GetOwner(), SilentAreaInfoView_1.SilentAreaView);
  }
  async MCa() {
    var t = this.GetItem(20);
    this.pCa = await this.NewDynamicChildViewAsync(t.GetOwner(), TowerDefenceInBattleView_1.TowerDefenseInBattleView);
  }
  async LG_() {
    var t = this.GetItem(27);
    this.bG_ = await this.NewDynamicChildViewAsync(t.GetOwner(), ShipTowerBuffBattleView_1.ShipTowerBuffBattleView);
  }
  async EJ1() {
    var t = this.GetItem(33);
    this.SJ1 = await this.NewDynamicChildViewAsync(t.GetOwner(), MoraleBuffBattleView_1.MoraleBuffBattleView);
  }
  async R_c() {
    var t = this.GetItem(28);
    this.w_c = await this.NewDynamicChildViewByResourceId(t, "UiItem_BabelTowerBattleTopPanel", BabelTowerBattleTopPanel_1.BabelTowerBattleTopPanel);
  }
  async xF1() {
    var t = this.GetItem(30);
    this.wF1 = await this.NewDynamicChildViewByResourceId(t, "BtnDownload", ResDownLoadTopPanel_1.ResDownLoadTopPanel);
  }
  async W9a() {
    var t = this.GetItem(21);
    this.H9a = await this.NewDynamicChildViewAsync(t.GetOwner(), MowingRiskInBattleView_1.MowingRiskInBattleView);
  }
  async Gtt() {
    var t = this.GetItem(16);
    var e = {
      RedDotName: undefined,
      FunctionType: undefined,
      ChildType: 3,
      HideInGamepad: false,
      HideByRoleConfig: true
    };
    this.Zet = await this.NewStaticChildViewAsync(t.GetOwner(), BattleTowerButton_1.BattleTowerButton, e);
    this.Zet.BindOnClicked(this.ftt);
  }
  async Vtt(t, e = undefined, i = undefined, s = false, n = true, a = 3) {
    e = {
      RedDotName: e,
      FunctionType: i,
      ChildType: a,
      HideInGamepad: s,
      HideByRoleConfig: n
    };
    i = await this.NewStaticChildViewAsync(t.GetOwner(), BattleEntranceButton_1.BattleEntranceButton, e);
    this.Het.push(i);
    return i;
  }
  async hkd(t, e = undefined, i = undefined, s = undefined, n = false, a = true, o = 3) {
    i = {
      RedDotName: i,
      FunctionType: s,
      ChildType: o,
      HideInGamepad: n,
      HideByRoleConfig: a,
      IconPath: e
    };
    s = await this.NewDynamicChildViewByResourceId(t, "BtnEnter", CommonTopButtonPanel_1.CommonTopButtonPanel, false, i);
    this.Het.push(s);
    return s;
  }
  async xtt() {
    var t = this.GetItem(11);
    let e = "BattleViewQuestButton";
    var i = {
      RedDotName: e = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryAreaDungeon() ? undefined : e,
      FunctionType: 10004,
      ChildType: 3,
      HideInGamepad: false,
      HideByRoleConfig: true
    };
    this.Xet = await this.NewStaticChildViewAsync(t.GetOwner(), BattleQuestButton_1.BattleQuestButton, i);
    this.Het.push(this.Xet);
    this.Xet.BindOnClicked(this.Ctt);
  }
  async wtt() {
    var t = this.GetItem(12);
    var e = {
      RedDotName: undefined,
      FunctionType: undefined,
      HideInGamepad: false,
      HideByRoleConfig: true,
      ChildType: 3
    };
    this.$et = await this.NewStaticChildViewAsync(t.GetOwner(), BattleDungeonGuideButton_1.BattleDungeonGuideButton, e);
    this.Het.push(this.$et);
    this.$et.BindOnClicked(this.gtt);
    this.$et.SetOtherHide(true);
  }
  async Btt() {
    var t = this.GetItem(13);
    this.Yet = await this.Vtt(t, undefined, undefined);
    this.Yet.BindOnClicked(this.ptt);
    this.Yet.SetGetOtherHideCallCall(this.vtt);
  }
  async MDn() {
    var t = this.GetItem(19);
    this.fDn = await this.Vtt(t, undefined, undefined);
    this.fDn.BindOnClicked(this.pDn);
    this.fDn.SetGetOtherHideCallCall(this.vDn);
  }
  async u8c() {
    var t;
    if (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip()) {
      t = this.GetItem(29);
      (await this.Vtt(t, undefined, undefined)).BindOnClicked(this.pDn);
    } else {
      this.GetItem(29)?.SetUIActive(false);
    }
  }
  async btt() {
    var t = this.GetItem(17);
    var e = {
      RedDotName: undefined,
      FunctionType: 10007,
      ChildType: 3,
      HideInGamepad: true,
      HideByRoleConfig: true
    };
    this.Jet = await this.NewStaticChildViewAsync(t.GetOwner(), BattleFormationButton_1.BattleFormationButton, e);
    this.Het.push(this.Jet);
    this.Jet.BindOnClicked(this.Mtt);
  }
  async rk1() {
    var t = this.GetItem(31);
    var t = await this.Vtt(t, "ActivityDirectTrainProEntry", 10095);
    t.BindOnClicked(this.ek1);
    t.SetGetOtherHideCallCall(this.tk1);
    this.ZB1 = t;
  }
  async gau() {
    var t = this.GetItem(34);
    var t = await this.Vtt(t, "Morale", undefined);
    t.BindOnClicked(this.mau);
    t.SetGetOtherHideCallCall(this.fau);
    t.SetOtherHide(this.fau());
    this.dau = t;
  }
  async yml() {
    this.Sml = await this.NewStaticChildViewAsync(this.GetItem(23).GetOwner(), TopPanelWavePlateTip_1.TopPanelWavePlateTip);
  }
  async ZWl() {
    this.XWl = await this.NewStaticChildViewAsync(this.GetItem(41).GetOwner(), TopPanelWavePlateTip_1.TopPanelWavePlateTip);
  }
  async qMl() {
    var t = this.GetItem(24);
    this.BMl = await this.NewDynamicChildViewByResourceId(t, "UiItem_TipWarn", AlertAreaInfoView_1.AlertAreaInfoView);
  }
  async JWl() {
    this.YWl = await this.NewStaticChildViewAsync(this.GetItem(40).GetOwner(), GamepadTopPanel_1.GamepadTopPanel);
  }
  async vO_() {
    this.pO_ = await this.NewDynamicChildViewByResourceId(this.GetItem(25), "UiItem_FishingEnter", BattleFishingView_1.BattleFishingView);
    this.Gd_(ControllerHolder_1.ControllerHolder.FishingController.IsInFishingShip());
  }
  async jL1() {
    var t = this.GetItem(32);
    this.NL1 = await this.NewDynamicChildViewByResourceId(t, "UiItem_Morale", MoraleExpView_1.MoraleExpView);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    var i;
    var s;
    if (t && t.length !== 0) {
      if ((e = t[0]) === "MoraleExp") {
        if (i = this.NL1?.GetGuideUiItem("0")) {
          return [i, i];
        } else {
          return undefined;
        }
      } else if (e === "HonamiStoryPlayerLevel") {
        if (i = this.bqm?.GetGuideUiItem("0")) {
          return [i, i];
        } else {
          return undefined;
        }
      } else if (e === "HonamiStoryMapLevel") {
        i = this.zom?.GetGuideUiItem("0");
        s = this.zom.GetRootItem();
        if (i) {
          return [s, i];
        } else {
          return undefined;
        }
      } else if (e === "HonamiStoryLeaveBtn") {
        if (s = this.Rim?.GetGuideUiItem("0")) {
          return [s, s];
        } else {
          return undefined;
        }
      } else {
        return this.pO_?.GetGuideUiItemAndUiItemForShowEx(t);
      }
    }
  }
  async Jom() {
    var t;
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon()) {
      t = this.GetItem(30);
      this.sQd = await this.hkd(t, "/Game/Aki/UI/UIResources/UiFight/Atlas/SP_FightIconBag.SP_FightIconBag", undefined, 10102);
      this.sQd.BindOnClicked(this.aQd);
      this.sQd.SetGetOtherHideCallCall(this.hQd);
      this.sQd.SetOtherHide(this.hQd());
      this.Rim = await this.NewDynamicChildViewByResourceId(this.GetItem(35), "UiItem_HonamiStoryBtnLeave", BattleHonamiStoryLeaveButton_1.BattleHonamiStoryLeaveButton);
      this.Het.push(this.Rim);
      this.zom = await this.NewDynamicChildViewByResourceId(this.GetItem(32), "UiItem_HonamiStoryMapLevel", BattleHonamiStoryMapLevelView_1.BattleHonamiStoryMapLevelView);
      if (!HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryMainDungeon()) {
        this.bqm = await this.NewDynamicChildViewByResourceId(t, "UiItem_HonamiStoryMainStateTip", BattleHonamiStoryPlayerStateView_1.BattleHonamiStoryPlayerStateView);
      }
    }
  }
  GetPanelItem(t) {
    if (t === "PhoneMsgButton") {
      if (Info_1.Info.IsInGamepad()) {
        return this.YWl.GetPanelItem(t);
      } else {
        return this.GetItem(38);
      }
    }
  }
  GetPhoneMsgButton() {
    if (Info_1.Info.IsInGamepad()) {
      return this.YWl.GetPhoneMsgButton();
    } else {
      return this.JOm;
    }
  }
}
(exports.TopPanel = TopPanel).vJe = Stats_1.Stat.Create("[BattleView]TopPanelTick");
//# sourceMappingURL=TopPanel.js.map