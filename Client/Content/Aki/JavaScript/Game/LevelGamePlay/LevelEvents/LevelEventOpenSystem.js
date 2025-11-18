"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventOpenSystem = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const OpenSystemActivity_1 = require("./OpenSystem/OpenSystemActivity");
const OpenSystemActivityFunPlay_1 = require("./OpenSystem/OpenSystemActivityFunPlay");
const OpenSystemActivitySubView_1 = require("./OpenSystem/OpenSystemActivitySubView");
const OpenSystemBossRushBuff_1 = require("./OpenSystem/OpenSystemBossRushBuff");
const OpenSystemChasingMoonMain_1 = require("./OpenSystem/OpenSystemChasingMoonMain");
const OpenSystemCiacconaChapterEntry_1 = require("./OpenSystem/OpenSystemCiacconaChapterEntry");
const OpenSystemCiacconaChapterView_1 = require("./OpenSystem/OpenSystemCiacconaChapterView");
const OpenSystemConfirmBox_1 = require("./OpenSystem/OpenSystemConfirmBox");
const OpenSystemContributionLevel_1 = require("./OpenSystem/OpenSystemContributionLevel");
const OpenSystemCook_1 = require("./OpenSystem/OpenSystemCook");
const OpenSystemDangoAbyssView_1 = require("./OpenSystem/OpenSystemDangoAbyssView");
const OpenSystemDigitalScreen_1 = require("./OpenSystem/OpenSystemDigitalScreen");
const OpenSystemDreamLinkLevel_1 = require("./OpenSystem/OpenSystemDreamLinkLevel");
const OpenSystemExploreLevel_1 = require("./OpenSystem/OpenSystemExploreLevel");
const OpenSystemExpostulation_1 = require("./OpenSystem/OpenSystemExpostulation");
const OpenSystemFeed_1 = require("./OpenSystem/OpenSystemFeed");
const OpenSystemFishingCage_1 = require("./OpenSystem/OpenSystemFishingCage");
const OpenSystemFishingDock_1 = require("./OpenSystem/OpenSystemFishingDock");
const OpenSystemFixCook_1 = require("./OpenSystem/OpenSystemFixCook");
const OpenSystemForging_1 = require("./OpenSystem/OpenSystemForging");
const OpenSystemFragmentMemory_1 = require("./OpenSystem/OpenSystemFragmentMemory");
const OpenSystemGameSysOpen_1 = require("./OpenSystem/OpenSystemGameSysOpen");
const OpenSystemGreatSwordSelectView_1 = require("./OpenSystem/OpenSystemGreatSwordSelectView");
const OpenSystemHiddenBossWindow_1 = require("./OpenSystem/OpenSystemHiddenBossWindow");
const OpenSystemHonamiChooseLevelView_1 = require("./OpenSystem/OpenSystemHonamiChooseLevelView");
const OpenSystemHonamiInventoryView_1 = require("./OpenSystem/OpenSystemHonamiInventoryView");
const OpenSystemHonamiMainView_1 = require("./OpenSystem/OpenSystemHonamiMainView");
const OpenSystemHonamiMascotView_1 = require("./OpenSystem/OpenSystemHonamiMascotView");
const OpenSystemHonamiShop_1 = require("./OpenSystem/OpenSystemHonamiShop");
const OpenSystemHonamiTalentTreeView_1 = require("./OpenSystem/OpenSystemHonamiTalentTreeView");
const OpenSystemInformationView_1 = require("./OpenSystem/OpenSystemInformationView");
const OpenSystemInstanceEntrance_1 = require("./OpenSystem/OpenSystemInstanceEntrance");
const OpenSystemInstanceFailure_1 = require("./OpenSystem/OpenSystemInstanceFailure");
const OpenSystemLifePointDraw_1 = require("./OpenSystem/OpenSystemLifePointDraw");
const OpenSystemLordGym_1 = require("./OpenSystem/OpenSystemLordGym");
const OpenSystemLordGymLordEntranceSelectView_1 = require("./OpenSystem/OpenSystemLordGymLordEntranceSelectView");
const OpenSystemMingSuTi_1 = require("./OpenSystem/OpenSystemMingSuTi");
const OpenSystemMoraleAreaSum_1 = require("./OpenSystem/OpenSystemMoraleAreaSum");
const OpenSystemMowBuffDistribute_1 = require("./OpenSystem/OpenSystemMowBuffDistribute");
const OpenSystemMowingTower_1 = require("./OpenSystem/OpenSystemMowingTower");
const OpenSystemPhantomArenaChallengeView_1 = require("./OpenSystem/OpenSystemPhantomArenaChallengeView");
const OpenSystemPhonograph_1 = require("./OpenSystem/OpenSystemPhonograph");
const OpenSystemPhotographView_1 = require("./OpenSystem/OpenSystemPhotographView");
const OpenSystemPunishReportSettlement_1 = require("./OpenSystem/OpenSystemPunishReportSettlement");
const OpenSystemQuestReview_1 = require("./OpenSystem/OpenSystemQuestReview");
const OpenSystemRegionQuest_1 = require("./OpenSystem/OpenSystemRegionQuest");
const OpenSystemRogueAbilitySelect_1 = require("./OpenSystem/OpenSystemRogueAbilitySelect");
const OpenSystemRogueBattle_1 = require("./OpenSystem/OpenSystemRogueBattle");
const OpenSystemRoguelikeActivity_1 = require("./OpenSystem/OpenSystemRoguelikeActivity");
const OpenSystemRogueSettlement_1 = require("./OpenSystem/OpenSystemRogueSettlement");
const OpenSystemRogueShop_1 = require("./OpenSystem/OpenSystemRogueShop");
const OpenSystemRoleDescription_1 = require("./OpenSystem/OpenSystemRoleDescription");
const OpenSystemScratchTicketMain_1 = require("./OpenSystem/OpenSystemScratchTicketMain");
const OpenSystemShipTower_1 = require("./OpenSystem/OpenSystemShipTower");
const OpenSystemShopView_1 = require("./OpenSystem/OpenSystemShopView");
const OpenSystemShower_1 = require("./OpenSystem/OpenSystemShower");
const OpenSystemSoundAreaPlayInfo_1 = require("./OpenSystem/OpenSystemSoundAreaPlayInfo");
const OpenSystemSynthetic_1 = require("./OpenSystem/OpenSystemSynthetic");
const OpenSystemTransitionPopupView_1 = require("./OpenSystem/OpenSystemTransitionPopupView");
const OpenSystemTrapDefenseMapChange_1 = require("./OpenSystem/OpenSystemTrapDefenseMapChange");
const OpenSystemTrialRoleDescription_1 = require("./OpenSystem/OpenSystemTrialRoleDescription");
const OpenSystemTurntableControl_1 = require("./OpenSystem/OpenSystemTurntableControl");
const OpenSystemVersionPreheat_1 = require("./OpenSystem/OpenSystemVersionPreheat");
const OpenSystemWeeklyRogueTokenSelect_1 = require("./OpenSystem/OpenSystemWeeklyRogueTokenSelect");
class LevelEventOpenSystem extends LevelGeneralBase_1.LevelEventBase {
  constructor(e) {
    super(e);
    this.WDe = undefined;
    this.KDe = new Map();
    this.Sjl = undefined;
    this.FWe = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 87, "[LevelEventOpenSystem]设置LoadingPromise结果");
      }
      this.Sjl?.SetResult();
    };
    this.QDe = e => {
      if (e === this.WDe) {
        this.FinishExecute(true);
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.QDe);
      }
    };
    this.KDe = new Map();
    this.KDe.set("Shop", new OpenSystemShopView_1.OpenSystemShopView(this));
    this.KDe.set("InformationView", new OpenSystemInformationView_1.OpenSystemInformationView(this));
    this.KDe.set("InstanceEntrance", new OpenSystemInstanceEntrance_1.OpenSystemInstanceEntrance(this));
    this.KDe.set("MingSuTi", new OpenSystemMingSuTi_1.OpenSystemMingSuTi(this));
    this.KDe.set("Cook", new OpenSystemCook_1.OpenSystemCook(this));
    this.KDe.set("FixCook", new OpenSystemFixCook_1.OpenSystemFixCook(this));
    this.KDe.set("Synthetic", new OpenSystemSynthetic_1.OpenSystemSynthetic(this));
    this.KDe.set("Forging", new OpenSystemForging_1.OpenSystemForging(this));
    this.KDe.set("Expostulation", new OpenSystemExpostulation_1.OpenSystemExpostulation(this));
    this.KDe.set("RoleDescription", new OpenSystemRoleDescription_1.OpenSystemRoleDescription(this));
    this.KDe.set("TrialRoleDescription", new OpenSystemTrialRoleDescription_1.OpenSystemTrialRoleDescription(this));
    this.KDe.set("RogueAbilitySelect", new OpenSystemRogueAbilitySelect_1.OpenSystemRogueAbilitySelect(this));
    this.KDe.set("TurntableControl", new OpenSystemTurntableControl_1.OpenSystemTurntableControl(this));
    this.KDe.set("GameSysOpen", new OpenSystemGameSysOpen_1.OpenSystemGameSysOpen(this));
    this.KDe.set("InstanceFailure", new OpenSystemInstanceFailure_1.OpenSystemInstanceFailure(this));
    this.KDe.set("FeedingPets", new OpenSystemFeed_1.OpenSystemFeed(this));
    this.KDe.set("SoundAreaPlayInfo", new OpenSystemSoundAreaPlayInfo_1.OpenSystemSoundAreaPlayInfo(this));
    this.KDe.set("RogueShop", new OpenSystemRogueShop_1.OpenSystemRogueShop(this));
    this.KDe.set("PermanentRogueAbilitySelect", new OpenSystemRogueBattle_1.OpenSystemRogueBattleAbilitySelect(this));
    this.KDe.set("PermanentRogueShop", new OpenSystemRogueBattle_1.OpenSystemRogueBattleShop(this));
    this.KDe.set("ContributionLevel", new OpenSystemContributionLevel_1.OpenSystemContributionLevel(this));
    this.KDe.set("RegionQuest", new OpenSystemRegionQuest_1.OpenSystemRegionQuest(this));
    this.KDe.set("LordChallenge", new OpenSystemLordGym_1.OpenSystemLordGym(this));
    this.KDe.set("LordGymEntrance", new OpenSystemLordGymLordEntranceSelectView_1.OpenSystemLordGymLordEntranceSelectView(this));
    this.KDe.set("ExploreLevelView", new OpenSystemExploreLevel_1.OpenSystemExploreLevel(this));
    this.KDe.set("RogueActivityIntroduce", new OpenSystemRoguelikeActivity_1.OpenSystemRoguelikeActivity(this));
    this.KDe.set("RogueRandomEvent", new OpenSystemRogueAbilitySelect_1.OpenSystemRogueEventSelect(this));
    this.KDe.set("ConfirmBox", new OpenSystemConfirmBox_1.OpenSystemConfirmBox(this));
    this.KDe.set("ConfirmBox2", new OpenSystemConfirmBox_1.OpenSystemConfirmBox(this));
    this.KDe.set("ActivityIntroduce", new OpenSystemActivity_1.OpenSystemActivity(this));
    this.KDe.set("ActivitySubInterface", new OpenSystemActivitySubView_1.OpenSystemActivitySubView(this));
    this.KDe.set("Photograph", new OpenSystemPhotographView_1.OpenSystemPhotographView(this));
    this.KDe.set("RogueSettlement", new OpenSystemRogueSettlement_1.OpenSystemRogueSettlement(this));
    this.KDe.set("DigitalScreen", new OpenSystemDigitalScreen_1.OpenSystemDigitalScreen(this));
    this.KDe.set("ChasingMoonMain", new OpenSystemChasingMoonMain_1.OpenSystemChasingMoonMain(this));
    this.KDe.set("DreamLink", new OpenSystemDreamLinkLevel_1.OpenSystemDreamLinkLevel(this));
    this.KDe.set("Gramophone", new OpenSystemPhonograph_1.OpenSystemPhonograph(this));
    this.KDe.set("ScratchTicket", new OpenSystemScratchTicketMain_1.OpenSystemScratchTicketMain(this));
    this.KDe.set("MowBuffDistribute", new OpenSystemMowBuffDistribute_1.OpenSystemMowBuffDistribute(this));
    this.KDe.set("PreheatingCheckIn", new OpenSystemVersionPreheat_1.OpenSystemVersionPreheat(this));
    this.KDe.set("MowingTowerActivity", new OpenSystemMowingTower_1.OpenSystemMowingTower(this));
    this.KDe.set("RaidReportSettlement", new OpenSystemPunishReportSettlement_1.OpenSystemPunishReportSettlement(this));
    this.KDe.set("PhotoMemoryTopic", new OpenSystemFragmentMemory_1.OpenSystemFragmentMemory(this));
    this.KDe.set("HideLordOpen", new OpenSystemHiddenBossWindow_1.OpenSystemHiddenBossWindow(this));
    this.KDe.set("FishingDock", new OpenSystemFishingDock_1.OpenSystemFishingDock(this));
    this.KDe.set("FishingCage", new OpenSystemFishingCage_1.OpenSystemFishingCage(this));
    this.KDe.set("SlashAndTower", new OpenSystemShipTower_1.OpenSystemShipTower(this));
    this.KDe.set("RogueTokenSelect", new OpenSystemWeeklyRogueTokenSelect_1.OpenSystemWeeklyRogueToken(this));
    this.KDe.set("PermanentRogueTokenSelect", new OpenSystemRogueBattle_1.OpenSystemRogueBattleAbilitySelect(this));
    this.KDe.set("BossRushPlayInfo", new OpenSystemBossRushBuff_1.OpenSystemBossRushBuff(this));
    this.KDe.set("CiacconaAvgSystemBoard", new OpenSystemCiacconaChapterEntry_1.OpenSystemCiacconaChapterEntry(this));
    this.KDe.set("CiacconaAvgChapterBoard", new OpenSystemCiacconaChapterView_1.OpenSystemCiacconaChapterView(this));
    this.KDe.set("DangoAbyssActivity", new OpenSystemDangoAbyssView_1.OpenSystemDangoAbyssView(this));
    this.KDe.set("PhantomBattleChallenge", new OpenSystemPhantomArenaChallengeView_1.OpenSystemPhantomArenaChallengeView(this));
    this.KDe.set("CoBathing", new OpenSystemShower_1.OpenSystemShower(this));
    this.KDe.set("PlotReview", new OpenSystemQuestReview_1.OpenSystemQuestReviewMainView(this));
    this.KDe.set("PlotReviewJumpTips", new OpenSystemQuestReview_1.OpenSystemQuestReviewTipsView(this));
    this.KDe.set("MoraleSystem", new OpenSystemMoraleAreaSum_1.OpenSystemMoraleAreaSum(this));
    this.KDe.set("LifePointChallenge", new OpenSystemLifePointDraw_1.OpenSystemLifePointDraw(this));
    this.KDe.set("GreatSwordChallenge", new OpenSystemGreatSwordSelectView_1.OpenSystemGreatSwordSelectView(this));
    this.KDe.set("TrapDefenseMapChange", new OpenSystemTrapDefenseMapChange_1.OpenSystemTrapDefenseMapChange(this));
    this.KDe.set("FindBug", new OpenSystemActivityFunPlay_1.OpenSystemActivityFunPlay(this));
    this.KDe.set("HonamiStoryResourceStation", new OpenSystemHonamiShop_1.OpenSystemHonamiShopView(this));
    this.KDe.set("HonamiStoryFightPreparation", new OpenSystemHonamiMainView_1.OpenSystemHonamiMainView(this));
    this.KDe.set("HonamiStoryWareHouse", new OpenSystemHonamiInventoryView_1.OpenSystemHonamiInventoryView(this));
    this.KDe.set("HonamiStoryMascot", new OpenSystemHonamiMascotView_1.OpenSystemHonamiMascotView(this));
    this.KDe.set("HonamiStoryTalentTree", new OpenSystemHonamiTalentTreeView_1.OpenSystemHonamiTalentTreeView(this));
    this.KDe.set("HonamiStoryChooseLevel", new OpenSystemHonamiChooseLevelView_1.OpenSystemHonamiChooseLevelView(this));
    this.KDe.set("TransitionPopup", new OpenSystemTransitionPopupView_1.OpenSystemTransitionPopupView(this));
  }
  OnReset() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CloseView, this.QDe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.QDe);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    }
    this.Sjl = undefined;
  }
  async d2n(t, n) {
    var s = this.KDe.get(t.SystemType);
    if (s) {
      if (!ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
        if (!t.WaitLoading) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 36, "[LevelEventOpenSystem] 还未WorldDoneAndLoadingClosed算直接完成", ["OpenSystemType", t.SystemType]);
          }
          this.FinishExecute(true);
          return;
        }
        this.pbd();
        await this.Sjl.Promise;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 87, "[LevelEventOpenSystem]Loading完成继续往下执行");
        }
      }
      var i = s.GetViewName(t, n);
      let e = false;
      var o = n;
      if (o?.EntityId && i) {
        if (!EntitySystem_1.EntitySystem.GetComponent(o.EntityId, 201)?.CanInteraction) {
          TsInteractionUtils_1.TsInteractionUtils.RegisterWaitOpenViewName(i);
          e = true;
        }
      }
      if (this.IsAsync) {
        s.ExecuteOpenView(t, n);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 36, "[LevelEventOpenSystem]行为打开界面,异步", ["SystemType", t.SystemType]);
        }
      } else {
        o = await s.ExecuteOpenView(t, n);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 36, "[LevelEventOpenSystem]行为打开界面,同步", ["SystemType", t.SystemType], ["IsSuccess", o]);
        }
        if (!o) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 36, "[LevelEventOpenSystem] 执行打开界面失败算直接完成", ["OpenSystemType", t.SystemType]);
          }
          if (e) {
            TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
          }
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0);
          this.FinishExecute(true);
          return;
        }
      }
      this.WDe = i;
      if (this.WDe) {
        this.XDe(t, s, n);
        if (this.IsAsync) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 36, "[LevelEventOpenSystem] 节点行为配置为异步算直接完成", ["OpenSystemType", t.SystemType]);
          }
          if (e) {
            TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
          }
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0);
          this.FinishExecute(true);
        } else {
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0);
          if (t.SyncOpenSystemBoardFinishTiming === "OpenFinished") {
            this.FinishExecute(true);
          } else {
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.QDe);
          }
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 36, "[LevelEventOpenSystem] 没有对应界面名算直接完成", ["OpenSystemType", t.SystemType]);
        }
        if (e) {
          TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName();
        }
        ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0);
        this.FinishExecute(true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCommon", 10, "系统类型对应的处理方法未注册", ["OpenSystemType", t.SystemType]);
    }
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, t) {
    if (e) {
      this.d2n(e, t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 36, "[LevelEventOpenSystem]参数类型出错");
    }
  }
  pbd() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 87, "[LevelEventOpenSystem]创建LoadingPromise");
    }
    this.Sjl = new CustomPromise_1.CustomPromise();
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    }
  }
  XDe(t, n, s) {
    n = n.GetViewName(t, s);
    if (n) {
      if (t.SystemType === "Photograph") {
        TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(n);
      } else {
        let e = undefined;
        s = s?.EntityId;
        if (e = s ? EntitySystem_1.EntitySystem.Get(s)?.GetComponent(191) : e) {
          TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(n);
          e.SetUiOpenPerformance(n, t.BoardId);
        }
      }
    }
  }
}
exports.LevelEventOpenSystem = LevelEventOpenSystem;
//# sourceMappingURL=LevelEventOpenSystem.js.map