"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityManager = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const DreamLinkController_1 = require("../DreamLink/DreamLinkController");
const FloroRanchController_1 = require("../FloroBranch/FloroRanchController");
const FragmentMemoryActivityController_1 = require("../FragmentMemory/FragmentMemoryActivityController");
const HonamiStoryController_1 = require("../HonamiStory/HonamiStoryController");
const ActivityPermanentRogueController_1 = require("../PermanentRogue/ActivityPermanentRogueController");
const PhantomArenaController_1 = require("../PhantomArena/PhantomArenaController");
const RacingBetsController_1 = require("../RacingBets/RacingBetsController");
const SurvivorsActivityController_1 = require("../SurvivorsRogue/Activity/SurvivorsActivityController");
const TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController");
const WeeklyRogueController_1 = require("../WeeklyRogue/WeeklyRogueController");
const ActivityLinkageController_1 = require("./ActivityContent/ActivityLinkPage/ActivityLinkageController");
const AdvanceNoticeController_1 = require("./ActivityContent/AdvanceNotice/AdvanceNoticeController");
const AvignonController_1 = require("./ActivityContent/Avignon/Controller/AvignonController");
const BabelTowerController_1 = require("./ActivityContent/BabelTower/BabelTowerController");
const ActivityBeginnerBookController_1 = require("./ActivityContent/BeginnerBook/ActivityBeginnerBookController");
const BeginnerCarnivalController_1 = require("./ActivityContent/BeginnerCarnival/BeginnerCarnivalController");
const ActivityBlackCoastController_1 = require("./ActivityContent/BlackCoast/ActivityBlackCoastController");
const BossRushController_1 = require("./ActivityContent/BossRush/BossRushController");
const CiacconaActivityController_1 = require("./ActivityContent/Ciaccona/CiacconaActivityController");
const ActivityCollectionController_1 = require("./ActivityContent/Collection/ActivityCollectionController");
const ActivityCorniceMeetingController_1 = require("./ActivityContent/CorniceMeeting/ActivityCorniceMeetingController");
const CumulativeShopController_1 = require("./ActivityContent/CumulativeShop/CumulativeShopController");
const ActivityDailyAdventureController_1 = require("./ActivityContent/DailyAdventure/ActivityDailyAdventureController");
const DangoAbyssActivityController_1 = require("./ActivityContent/DangoAbyss/DangoAbyssActivityController");
const ActivityDangoMonopolyController_1 = require("./ActivityContent/DangoMonopoly/ActivityDangoMonopolyController");
const ActivityDirectTrainController_1 = require("./ActivityContent/DirectTrain/ActivityDirectTrainController");
const ActivityDoubleRewardController_1 = require("./ActivityContent/DoubleReward/ActivityDoubleRewardController");
const FarmGoldController_1 = require("./ActivityContent/FarmGold/FarmGoldController");
const FightPhotoController_1 = require("./ActivityContent/FightPhoto/FightPhotoController");
const ActivityFishingController_1 = require("./ActivityContent/Fishing/Activity/ActivityFishingController");
const ActivityFunPlayController_1 = require("./ActivityContent/FunPlay/ActivityFunPlayController");
const ActivityInviteNewbieController_1 = require("./ActivityContent/InviteNewbie/Controller/ActivityInviteNewbieController");
const LifePointDrawActivityController_1 = require("./ActivityContent/LifePoint/LifePointDrawActivityController");
const LineCrossActivityController_1 = require("./ActivityContent/LineCross/LineCrossActivityController");
const ActivityLongShanController_1 = require("./ActivityContent/LongShan/ActivityLongShanController");
const ActivityLoopTowerController_1 = require("./ActivityContent/LoopTower/ActivityLoopTowerController");
const ActivityLordGymController_1 = require("./ActivityContent/LordGym/ActivityLordGymController");
const ActivityMapExploreController_1 = require("./ActivityContent/MapExplore/ActivityMapExploreController");
const ActivityMapTravelController_1 = require("./ActivityContent/MapTravel/ActivityMapTravelController");
const ActivityMoonChasingController_1 = require("./ActivityContent/MoonChasing/Activity/ActivityMoonChasingController");
const MoonSignInController_1 = require("./ActivityContent/MoonSignIn/MoonSignInController");
const ActivityMoraleController_1 = require("./ActivityContent/Morale/ActivityMoraleController");
const ActivityMowingController_1 = require("./ActivityContent/Mowing/ActivityMowingController");
const ActivityMowingRiskController_1 = require("./ActivityContent/MowingRisk/Controller/ActivityMowingRiskController");
const MowingTowerController_1 = require("./ActivityContent/MowingTower/MowingTowerController");
const ActivityNoviceJourneyController_1 = require("./ActivityContent/NoviceJourney/ActivityNoviceJourneyController");
const ActivityPhantomCollectController_1 = require("./ActivityContent/PhantomCollect/ActivityPhantomCollectController");
const ActivityPreWarmController_1 = require("./ActivityContent/PreWarm/ActivityPreWarmController");
const ActivityPrizeDrawingController_1 = require("./ActivityContent/PrizeDrawing/ActivityPrizeDrawingController");
const ActivityRegressController_1 = require("./ActivityContent/Regress/ActivityRegressController");
const ActivityRoleGiveController_1 = require("./ActivityContent/RoleGive/ActivityRoleGiveController");
const ActivityRoleGuideController_1 = require("./ActivityContent/RoleGuide/ActivityRoleGuideController");
const RoleSkinTrialController_1 = require("./ActivityContent/RoleSkinTrail/RoleSkinTrialController");
const ActivityRoleTrialController_1 = require("./ActivityContent/RoleTrial/ActivityRoleTrialController");
const ActivityRogueController_1 = require("./ActivityContent/RougeActivity/ActivityRogueController");
const ActivityRunController_1 = require("./ActivityContent/Run/ActivityRunController");
const ActivityScratchTicketController_1 = require("./ActivityContent/ScratchTicket/ActivityScratchTicketController");
const ActivitySevenDaySignController_1 = require("./ActivityContent/SevenDaySign/ActivitySevenDaySignController");
const ActivityShipTowerController_1 = require("./ActivityContent/ShipTower/ActivityShipTowerController");
const ActivitySoarController_1 = require("./ActivityContent/Soar/ActivitySoarController");
const ActivitySolarSpeedController_1 = require("./ActivityContent/SolarisSpeed/Controller/ActivitySolarSpeedController");
const ActivitySpring25Controller_1 = require("./ActivityContent/Spring25/Controller/ActivitySpring25Controller");
const ActivityTimePointRewardController_1 = require("./ActivityContent/TimePointReward/ActivityTimePointRewardController");
const ActivityTowerGuideController_1 = require("./ActivityContent/TowerGuide/ActivityTowerGuideController");
const ActivityTrapDefenseController_1 = require("./ActivityContent/TrapDefense/ActivityTrapDefenseController");
const ActivityTurntableController_1 = require("./ActivityContent/Turntable/ActivityTurntableController");
const ActivityUniversalController_1 = require("./ActivityContent/UniversalActivity/ActivityUniversalController");
const ActivityVersionPreheatController_1 = require("./ActivityContent/VersionPreheat/Controller/ActivityVersionPreheatController");
const ActivityControllerHolder_1 = require("./ActivityControllerHolder");
class ActivityManager {
  constructor() {}
  static Init() {
    this.G4e();
    for (const o in Protocol_1.Aki.Protocol.uks) {
      var t = Number(o);
      if (!isNaN(t) && !(t = this.N4e.get(t))) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Activity", 27, "没有注册活动类型", ["type", t]);
        }
      }
    }
    this.O4e();
  }
  static G4e() {
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_Parkour, new ActivityRunController_1.ActivityRunController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_GatherActivity, new ActivityCollectionController_1.ActivityCollectionController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_Sign, new ActivitySevenDaySignController_1.ActivitySevenDaySignController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_NewBieCourse, new ActivityNoviceJourneyController_1.ActivityNoviceJourneyController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_PureUIActivity, new ActivityUniversalController_1.ActivityUniversalController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_TowerGuide, new ActivityTowerGuideController_1.ActivityTowerGuideController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_WorldNewJourney, new ActivityBeginnerBookController_1.ActivityBeginnerBookController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_RougeActivity, new ActivityRogueController_1.ActivityRogueController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_RoleTrialActivity, new ActivityRoleTrialController_1.ActivityRoleTrialController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_Harvest, new ActivityMowingController_1.ActivityMowingController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_DoubleInstanceRewardActivity, new ActivityDoubleRewardController_1.ActivityDoubleRewardController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_NewRoleGuideActivity, new ActivityRoleGuideController_1.ActivityRoleGuideController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_PhantomCollect, new ActivityPhantomCollectController_1.ActivityPhantomCollectController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_DailyAdventureActivity, new ActivityDailyAdventureController_1.ActivityDailyAdventureController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_LongShanMainActivity, new ActivityLongShanController_1.ActivityLongShanController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_BossRushActivity, new BossRushController_1.BossRushController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_TurnTableActivity, new ActivityTurntableController_1.ActivityTurntableController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_TimePointRewardActivity, new ActivityTimePointRewardController_1.ActivityTimePointRewardController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_PhotoMemoryActivity, new FragmentMemoryActivityController_1.FragmentMemoryActivityController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_TowerDefenceActivity, new TowerDefenceController_1.TowerDefenseController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_TrackMoonActivity, new ActivityMoonChasingController_1.ActivityMoonChasingController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_TowerGuideNew, new ActivityLoopTowerController_1.ActivityLoopTowerController());
    var t = new ActivityShipTowerController_1.ActivityShipTowerController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_SlashAndTowerLevelPlay, t);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityShipTowerController = t;
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_DangoMonopoly, new ActivityDangoMonopolyController_1.ActivityDangoMonopolyController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_MoraleActivity, new ActivityMoraleController_1.ActivityMoraleController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_Explore, new ActivityMapExploreController_1.ActivityMapExploreController());
    var t = new ActivityRegressController_1.ActivityRegressController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_RegressActivity, t);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController = t;
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_TrackMoonPhase, new ActivityRoleGiveController_1.ActivityRoleGiveController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_CorniceMeeting, new ActivityCorniceMeetingController_1.ActivityCorniceMeetingController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_RiskHarvest, new ActivityMowingRiskController_1.ActivityMowingRiskController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_BlackCoastTheme, new ActivityBlackCoastController_1.ActivityBlackCoastController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_RogueWhiteCat, new DreamLinkController_1.DreamLinkController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_ScratchCard, new ActivityScratchTicketController_1.ActivityScratchTicketController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_PreheatSign, new ActivityVersionPreheatController_1.ActivityVersionPreheatController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_MowTower, new MowingTowerController_1.MowingTowerController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_ThroughTrain, new ActivityDirectTrainController_1.ActivityDirectTrainController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_MapTravelActivity, new ActivityMapTravelController_1.ActivityMapTravelController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_FarmGold, new FarmGoldController_1.FarmGoldController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_SprintSign, new ActivitySpring25Controller_1.ActivitySpring25Controller());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_NewLordGym, new ActivityLordGymController_1.ActivityLordGymController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_RoleSkinTrialActivity, new RoleSkinTrialController_1.RoleSkinTrialController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_RogueWeekly, new WeeklyRogueController_1.WeeklyRogueController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_FishingActivity, new ActivityFishingController_1.ActivityFishingController());
    var t = new ActivitySolarSpeedController_1.ActivitySolarSpeedController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_TeamParkOurActivity, t);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivitySolarSpeedController = t;
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_BabelTower, new BabelTowerController_1.BabelTowerController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_BetHorses, new RacingBetsController_1.RacingBetsController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_FloroRanchActivity, new FloroRanchController_1.FloroRanchController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_RogueRes, new ActivityPermanentRogueController_1.ActivityPermanentRogueController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_NewbieCarnival, new BeginnerCarnivalController_1.BeginnerCarnivalController());
    var t = new DangoAbyssActivityController_1.DangoAbyssActivityController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_Abyss, t);
    ActivityControllerHolder_1.ActivityControllerHolder.DangoAbyssActivityController = t;
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_Avignon, new AvignonController_1.AvignonController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_CiacconaActivity, new CiacconaActivityController_1.CiacconaActivityController());
    var t = new ActivityInviteNewbieController_1.ActivityInviteNewbieController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_H5CircumFluence, t);
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_ActivityLinkage, new ActivityLinkageController_1.ActivityLinkageController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_ConsumptiveActivity, new CumulativeShopController_1.CumulativeShopController());
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_PhantomBattle, new PhantomArenaController_1.PhantomArenaController());
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityInviteNewbieController = t;
    var t = new HonamiStoryController_1.HonamiStoryController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_HonamiStory, t);
    ActivityControllerHolder_1.ActivityControllerHolder.HonamiStoryController = t;
    var t = new LifePointDrawActivityController_1.LifePointDrawActivityController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.iAu, t);
    ActivityControllerHolder_1.ActivityControllerHolder.LifePointDrawActivityController = t;
    var t = new ActivityTrapDefenseController_1.ActivityTrapDefenseController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_TrapDefense, t);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityTrapDefenseController = t;
    var t = new ActivityFunPlayController_1.ActivityFunPlayController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_FunPlay, t);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityFunPlayController = t;
    var t = new ActivitySoarController_1.ActivitySoarController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_JinzhouFlyActivity, t);
    var t = new LineCrossActivityController_1.LineCrossActivityController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_LineCross, t);
    ActivityControllerHolder_1.ActivityControllerHolder.LineCrossActivityController = t;
    var t = new SurvivorsActivityController_1.SurvivorsActivityController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_Survivors, t);
    var t = new MoonSignInController_1.MoonSignInController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_MoonPhase, t);
    var t = new FightPhotoController_1.FightPhotoController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_PhotoFight, t);
    ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController = t;
    var t = new ActivityPrizeDrawingController_1.ActivityPrizeDrawingController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_WuWuKuji, t);
    ActivityControllerHolder_1.ActivityControllerHolder.PrizeDrawingController = t;
    var t = new ActivityPreWarmController_1.ActivityPreWarmController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_PreHeatTaskActivity, t);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityPreWarmController = t;
    var t = new AdvanceNoticeController_1.AdvanceNoticeController();
    this.N4e.set(Protocol_1.Aki.Protocol.uks.Proto_AdvanceNoticeActivity, t);
    ActivityControllerHolder_1.ActivityControllerHolder.AdvanceNoticeController = t;
  }
  static O4e() {
    this.N4e.forEach((t, o) => {
      t.Init();
    });
  }
  static GetActivityController(t) {
    return this.N4e.get(t);
  }
  static Clear() {
    this.N4e.forEach((t, o) => {
      t.Clear();
    });
    this.N4e.clear();
    ActivityControllerHolder_1.ActivityControllerHolder.Clear();
  }
}
(exports.ActivityManager = ActivityManager).N4e = new Map();
//# sourceMappingURL=ActivityManager.js.map