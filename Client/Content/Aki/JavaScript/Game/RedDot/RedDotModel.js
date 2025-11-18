"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotModel = undefined;
const Log_1 = require("../../Core/Common/Log");
const Tree_1 = require("../../Core/Container/Tree");
const ModelBase_1 = require("../../Core/Framework/ModelBase");
const StringBuilder_1 = require("../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const RedDotBase_1 = require("../../Game/RedDot/RedDotBase");
const ConfigManager_1 = require("../Manager/ConfigManager");
const RedDotAchievement_1 = require("../Module/Achievement/RedDotAchievement");
const RedDotAchievementCategory_1 = require("../Module/Achievement/RedDotAchievementCategory");
const RedDotActivityCorniceMeeting_1 = require("../Module/Activity/ActivityContent/CorniceMeeting/RedDotActivityCorniceMeeting");
const RedDotActivityFunPlay_1 = require("../Module/Activity/ActivityContent/FunPlay/RedDotActivityFunPlay");
const LifePointDrawChallengeRedDot_1 = require("../Module/Activity/ActivityContent/LifePoint/LifePointDrawChallengeRedDot");
const LifePointDrawGroupRedDot_1 = require("../Module/Activity/ActivityContent/LifePoint/LifePointDrawGroupRedDot");
const LineCrossChallengeRedDot_1 = require("../Module/Activity/ActivityContent/LineCross/LineCrossChallengeRedDot");
const LineCrossGroupRedDot_1 = require("../Module/Activity/ActivityContent/LineCross/LineCrossGroupRedDot");
const RedDotActivityRun_1 = require("../Module/Activity/ActivityContent/Run/RedDotActivityRun");
const RedDotActivityEntrance_1 = require("../Module/Activity/RedDotActivityEntrance");
const RedDotCommonActivityPage_1 = require("../Module/Activity/RedDotCommonActivityPage");
const RedDotItemHandBook_1 = require("../Module/HandBook/RedDotItemHandBook");
const RedDotPhantomHandBook_1 = require("../Module/HandBook/RedDotPhantomHandBook");
const RedDotDirectTrain_1 = require("./RedDots/Activity/DirectTrain/RedDotDirectTrain");
const RedDotActivityRecallSignEntryButton_1 = require("./RedDots/Activity/Recall/RedDotActivityRecallSignEntryButton");
const RedDotActivityRecallTaskEntryButton_1 = require("./RedDots/Activity/Recall/RedDotActivityRecallTaskEntryButton");
const RedDotActivityRegressConstantTask_1 = require("./RedDots/Activity/Recall/RedDotActivityRegressConstantTask");
const RedDotActivityRegressCultivate_1 = require("./RedDots/Activity/Recall/RedDotActivityRegressCultivate");
const RedDotActivityRegressDoubleDrop_1 = require("./RedDots/Activity/Recall/RedDotActivityRegressDoubleDrop");
const RedDotActivityRegressQuestionnaire_1 = require("./RedDots/Activity/Recall/RedDotActivityRegressQuestionnaire");
const RedDotActivityRegressShopDiscount_1 = require("./RedDots/Activity/Recall/RedDotActivityRegressShopDiscount");
const AdventurePeriodicityTab_1 = require("./RedDots/AdventureGuideSystem/AdventurePeriodicityTab");
const RedDotAdventureBattleButton_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureBattleButton");
const RedDotAdventureChallengeTab_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureChallengeTab");
const RedDotAdventureDailyActivityTab_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureDailyActivityTab");
const RedDotAdventureFirstAward_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureFirstAward");
const RedDotAdventureFirstAwardCategory_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureFirstAwardCategory");
const RedDotAdventureFirstAwardResult_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureFirstAwardResult");
const RedDotAdventureManual_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureManual");
const RedDotAdventureNewSoundAreaGeneral_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureNewSoundAreaGeneral");
const RedDotAdventureNewSoundAreaTab_1 = require("./RedDots/AdventureGuideSystem/RedDotAdventureNewSoundAreaTab");
const BabelTowerDifficultyRedDot_1 = require("./RedDots/BabelTower/BabelTowerDifficultyRedDot");
const BabelTowerLevelRedDot_1 = require("./RedDots/BabelTower/BabelTowerLevelRedDot");
const BabelTowerQuestRedDot_1 = require("./RedDots/BabelTower/BabelTowerQuestRedDot");
const RedDotBattlePass_1 = require("./RedDots/BattlePass/RedDotBattlePass");
const RedDotBattlePassAlwaysTaskTab_1 = require("./RedDots/BattlePass/RedDotBattlePassAlwaysTaskTab");
const RedDotBattlePassDayTaskTab_1 = require("./RedDots/BattlePass/RedDotBattlePassDayTaskTab");
const RedDotBattlePassPayButton_1 = require("./RedDots/BattlePass/RedDotBattlePassPayButton");
const RedDotBattlePassReward_1 = require("./RedDots/BattlePass/RedDotBattlePassReward");
const RedDotBattlePassTask_1 = require("./RedDots/BattlePass/RedDotBattlePassTask");
const RedDotBattlePassWeekTaskTab_1 = require("./RedDots/BattlePass/RedDotBattlePassWeekTaskTab");
const RedDotBattleViewGachaButton_1 = require("./RedDots/BattleUiSystem/RedDotBattleViewGachaButton");
const RedDotBattleViewResonanceButton_1 = require("./RedDots/BattleUiSystem/RedDotBattleViewResonanceButton");
const RedDotBattleViewShopButton_1 = require("./RedDots/BattleUiSystem/RedDotBattleViewShopButton");
const BeginnerCarnivalTaskTabRedDot_1 = require("./RedDots/BeginnerCarnival/BeginnerCarnivalTaskTabRedDot");
const BossRushRewardRedDot_1 = require("./RedDots/BossRush/BossRushRewardRedDot");
const RedDotCalabash_1 = require("./RedDots/CalabashSystem/RedDotCalabash");
const RedDotCalabashTab_1 = require("./RedDots/CalabashSystem/RedDotCalabashTab");
const RedDotVisionRecovery_1 = require("./RedDots/CalabashSystem/RedDotVisionRecovery");
const RedDotVisionRefine_1 = require("./RedDots/CalabashSystem/RedDotVisionRefine");
const RedDotChatRoom_1 = require("./RedDots/Chat/RedDotChatRoom");
const RedDotChatView_1 = require("./RedDots/Chat/RedDotChatView");
const RedDotCiacconaActivity_1 = require("./RedDots/CiacconaActivity/RedDotCiacconaActivity");
const RedDotComposeLevel_1 = require("./RedDots/ComposeSystem/RedDotComposeLevel");
const RedDotCookerLevel_1 = require("./RedDots/CookSystem/RedDotCookerLevel");
const CumulativeShopTaskTabRedDot_1 = require("./RedDots/CumulativeShop/CumulativeShopTaskTabRedDot");
const RedDotDangoCommonReward_1 = require("./RedDots/DangoAbyss/RedDotDangoCommonReward");
const RedDotDangoDevelop_1 = require("./RedDots/DangoAbyss/RedDotDangoDevelop");
const RedDotDangoFormation_1 = require("./RedDots/DangoAbyss/RedDotDangoFormation");
const RedDotDangoFormationRole_1 = require("./RedDots/DangoAbyss/RedDotDangoFormationRole");
const RedDotDangoLimitReward_1 = require("./RedDots/DangoAbyss/RedDotDangoLimitReward");
const RedDotDangoPayShop_1 = require("./RedDots/DangoAbyss/RedDotDangoPayShop");
const RedDotDangoRole_1 = require("./RedDots/DangoAbyss/RedDotDangoRole");
const RedDotDangoMonopoly_1 = require("./RedDots/DangoMonopoly/RedDotDangoMonopoly");
const RedDotDangoMonopolyDiceNum_1 = require("./RedDots/DangoMonopoly/RedDotDangoMonopolyDiceNum");
const RedDotDangoMonopolyDiceRound_1 = require("./RedDots/DangoMonopoly/RedDotDangoMonopolyDiceRound");
const RedDotDangoMonopolyTask_1 = require("./RedDots/DangoMonopoly/RedDotDangoMonopolyTask");
const FarmGoldRewardRedDot_1 = require("./RedDots/FarmGold/FarmGoldRewardRedDot");
const FishingNormalTechNodeRedDot_1 = require("./RedDots/Fishing/FishingNormalTechNodeRedDot");
const FishingRoleTechNodeRedDot_1 = require("./RedDots/Fishing/FishingRoleTechNodeRedDot");
const FishingRoleToggleTechRedDot_1 = require("./RedDots/Fishing/FishingRoleToggleTechRedDot");
const FishingTechNormalRedDot_1 = require("./RedDots/Fishing/FishingTechNormalRedDot");
const FishingTechRedDot_1 = require("./RedDots/Fishing/FishingTechRedDot");
const FishingTechRoleRedDot_1 = require("./RedDots/Fishing/FishingTechRoleRedDot");
const FragmentMemoryCollectRewardRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryCollectRewardRedDot");
const FragmentMemoryEntranceRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryEntranceRedDot");
const FragmentMemoryTopicCollectRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryTopicCollectRedDot");
const FragmentMemoryTopicRedDot_1 = require("./RedDots/FragmentMemory/FragmentMemoryTopicRedDot");
const RedDotFriendNewApplication_1 = require("./RedDots/FriendSystem/RedDotFriendNewApplication");
const RedDotFunctionAdventureGuide_1 = require("./RedDots/FunctionMenu/RedDotFunctionAdventureGuide");
const RedDotFunctionFriend_1 = require("./RedDots/FunctionMenu/RedDotFunctionFriend");
const RedDotFunctionInventory_1 = require("./RedDots/FunctionMenu/RedDotFunctionInventory");
const RedDotFunctionKuroStreet_1 = require("./RedDots/FunctionMenu/RedDotFunctionKuroStreet");
const RedDotFunctionMail_1 = require("./RedDots/FunctionMenu/RedDotFunctionMail");
const RedDotFunctionMailBind_1 = require("./RedDots/FunctionMenu/RedDotFunctionMailBind");
const RedDotFunctionMap_1 = require("./RedDots/FunctionMenu/RedDotFunctionMap");
const RedDotFunctionNotice_1 = require("./RedDots/FunctionMenu/RedDotFunctionNotice");
const RedDotFunctionPayShop_1 = require("./RedDots/FunctionMenu/RedDotFunctionPayShop");
const RedDotFunctionPhantom_1 = require("./RedDots/FunctionMenu/RedDotFunctionPhantom");
const RedDotFunctionPhantomExploreSet_1 = require("./RedDots/FunctionMenu/RedDotFunctionPhantomExploreSet");
const RedDotFunctionPhotograph_1 = require("./RedDots/FunctionMenu/RedDotFunctionPhotograph");
const RedDotFunctionRole_1 = require("./RedDots/FunctionMenu/RedDotFunctionRole");
const RedDotFunctionSetting_1 = require("./RedDots/FunctionMenu/RedDotFunctionSetting");
const RedDotFunctionTutorial_1 = require("./RedDots/FunctionMenu/RedDotFunctionTutorial");
const RedDotInfluenceReputation_1 = require("./RedDots/Influence/RedDotInfluenceReputation");
const RedDotInfluenceReward_1 = require("./RedDots/Influence/RedDotInfluenceReward");
const RedDotInventoryCard_1 = require("./RedDots/Inventory/RedDotInventoryCard");
const RedDotInventoryCollection_1 = require("./RedDots/Inventory/RedDotInventoryCollection");
const RedDotInventoryCommon_1 = require("./RedDots/Inventory/RedDotInventoryCommon");
const RedDotInventoryMaterial_1 = require("./RedDots/Inventory/RedDotInventoryMaterial");
const RedDotInventoryMissionItem_1 = require("./RedDots/Inventory/RedDotInventoryMissionItem");
const RedDotInventoryPhantom_1 = require("./RedDots/Inventory/RedDotInventoryPhantom");
const RedDotInventorySpecialItem_1 = require("./RedDots/Inventory/RedDotInventorySpecialItem");
const RedDotInventoryVirtual_1 = require("./RedDots/Inventory/RedDotInventoryVirtual");
const RedDotInventoryWeapon_1 = require("./RedDots/Inventory/RedDotInventoryWeapon");
const RedDotInviteNewbie_1 = require("./RedDots/InviteNewbie/RedDotInviteNewbie");
const RedDotMailBoxFilter_1 = require("./RedDots/Mail/RedDotMailBoxFilter");
const RedDotMailBoxImportantFilter_1 = require("./RedDots/Mail/RedDotMailBoxImportantFilter");
const RedDotMailBoxUnScannedFilter_1 = require("./RedDots/Mail/RedDotMailBoxUnScannedFilter");
const RedDotMapAreaBoxReward_1 = require("./RedDots/Map/RedDotMapAreaBoxReward");
const RedDotMapAreaExplore_1 = require("./RedDots/Map/RedDotMapAreaExplore");
const RedDotMoonChasingAllQuest_1 = require("./RedDots/MoonChasing/RedDotMoonChasingAllQuest");
const RedDotMoonChasingBranchTab_1 = require("./RedDots/MoonChasing/RedDotMoonChasingBranchTab");
const RedDotMoonChasingBuilding_1 = require("./RedDots/MoonChasing/RedDotMoonChasingBuilding");
const RedDotMoonChasingDelegation_1 = require("./RedDots/MoonChasing/RedDotMoonChasingDelegation");
const RedDotMoonChasingHandbook_1 = require("./RedDots/MoonChasing/RedDotMoonChasingHandbook");
const RedDotMoonChasingMainlineTab_1 = require("./RedDots/MoonChasing/RedDotMoonChasingMainlineTab");
const RedDotMoonChasingReward_1 = require("./RedDots/MoonChasing/RedDotMoonChasingReward");
const RedDotMoonChasingRewardAndShop_1 = require("./RedDots/MoonChasing/RedDotMoonChasingRewardAndShop");
const RedDotMoonChasingRole_1 = require("./RedDots/MoonChasing/RedDotMoonChasingRole");
const RedDotMoonChasingShop_1 = require("./RedDots/MoonChasing/RedDotMoonChasingShop");
const RedDotMorale_1 = require("./RedDots/Morale/RedDotMorale");
const RedDotMoraleAreaBuff_1 = require("./RedDots/Morale/RedDotMoraleAreaBuff");
const RedDotMoraleBuff_1 = require("./RedDots/Morale/RedDotMoraleBuff");
const RedDotMoraleFlagBox_1 = require("./RedDots/Morale/RedDotMoraleFlagBox");
const RedDotMoraleScoreBox_1 = require("./RedDots/Morale/RedDotMoraleScoreBox");
const MowingRiskRedDot_1 = require("./RedDots/MowingRisk/MowingRiskRedDot");
const MowingTowerRewardRedDot_1 = require("./RedDots/MowingTower/MowingTowerRewardRedDot");
const PersonalBirthdayRedDot_1 = require("./RedDots/Personal/PersonalBirthdayRedDot");
const PersonalCardRedDot_1 = require("./RedDots/Personal/PersonalCardRedDot");
const PersonalImageBookRedDot_1 = require("./RedDots/Personal/PersonalImageBookRedDot");
const PersonalizeInfoRedDot_1 = require("./RedDots/Personal/PersonalizeInfoRedDot");
const PersonalTitleRedDot_1 = require("./RedDots/Personal/PersonalTitleRedDot");
const RedDotPhantomArenaActivity_1 = require("./RedDots/PhantomArena/RedDotPhantomArenaActivity");
const RedDotPhantomArenaBadgeReward_1 = require("./RedDots/PhantomArena/RedDotPhantomArenaBadgeReward");
const RedDotPhantomArenaCardReward_1 = require("./RedDots/PhantomArena/RedDotPhantomArenaCardReward");
const RedDotPhantomArenaCollect_1 = require("./RedDots/PhantomArena/RedDotPhantomArenaCollect");
const RedDotPhantomArenaGym_1 = require("./RedDots/PhantomArena/RedDotPhantomArenaGym");
const RedDotPhantomArenaLevelReward_1 = require("./RedDots/PhantomArena/RedDotPhantomArenaLevelReward");
const RedDotPhantomArenaLimitReward_1 = require("./RedDots/PhantomArena/RedDotPhantomArenaLimitReward");
const RedDotPhantomArenaRole_1 = require("./RedDots/PhantomArena/RedDotPhantomArenaRole");
const RedDotPhantomArenaShopUpdate_1 = require("./RedDots/PhantomArena/RedDotPhantomArenaShopUpdate");
const RedDotPhantomArenaTaskReward_1 = require("./RedDots/PhantomArena/RedDotPhantomArenaTaskReward");
const PreDownloadRedDot_1 = require("./RedDots/PreDownload/PreDownloadRedDot");
const RedDotBattleViewQuestBtn_1 = require("./RedDots/Quest/RedDotBattleViewQuestBtn");
const RedDotFunctionViewQuestBtn_1 = require("./RedDots/Quest/RedDotFunctionViewQuestBtn");
const RedDotQuestViewItem_1 = require("./RedDots/Quest/RedDotQuestViewItem");
const RedDotQuestViewTab_1 = require("./RedDots/Quest/RedDotQuestViewTab");
const RedDotRacingBetsActivityInternalReward_1 = require("./RedDots/RacingBets/RedDotRacingBetsActivityInternalReward");
const RedDotRacingBetsActivityReward_1 = require("./RedDots/RacingBets/RedDotRacingBetsActivityReward");
const RedDotBattleViewMenu_1 = require("./RedDots/RedDotBattleViewMenu");
const RedDotTest_1 = require("./RedDots/RedDotTest");
const RedDotVersionCheck_1 = require("./RedDots/RedDotVersionCheck");
const RedDotRoguelikeAchievement_1 = require("./RedDots/Roguelike/RedDotRoguelikeAchievement");
const RedDotRoguelikeAchievementGroup_1 = require("./RedDots/Roguelike/RedDotRoguelikeAchievementGroup");
const RedDotRoguelikeShop_1 = require("./RedDots/Roguelike/RedDotRoguelikeShop");
const RedDotRoguelikeSkillCanUnlock_1 = require("./RedDots/Roguelike/RedDotRoguelikeSkillCanUnlock");
const RedDotRogueResEnding_1 = require("./RedDots/RogueRes/RedDotRogueResEnding");
const RedDotRogueResIllustrated_1 = require("./RedDots/RogueRes/RedDotRogueResIllustrated");
const RedDotRogueResIllustratedMap_1 = require("./RedDots/RogueRes/RedDotRogueResIllustratedMap");
const RedDotRogueResIllustratedNormal_1 = require("./RedDots/RogueRes/RedDotRogueResIllustratedNormal");
const RedDotRogueResIllustratedTokenTab_1 = require("./RedDots/RogueRes/RedDotRogueResIllustratedTokenTab");
const RedDotRogueResInst_1 = require("./RedDots/RogueRes/RedDotRogueResInst");
const RedDotRogueResShop_1 = require("./RedDots/RogueRes/RedDotRogueResShop");
const RedDotRogueResSkillTree_1 = require("./RedDots/RogueRes/RedDotRogueResSkillTree");
const RedDotRogueResTask_1 = require("./RedDots/RogueRes/RedDotRogueResTask");
const RedDotRoleHandBook_1 = require("./RedDots/RoleHandBook/RedDotRoleHandBook");
const RedDotRoleSelectionList_1 = require("./RedDots/RoleSystem/RedDotRoleSelectionList");
const RedDotRoleSystemRoleList_1 = require("./RedDots/RoleSystem/RedDotRoleSystemRoleList");
const RedDotAttributeTab_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotAttributeTab");
const RedDotRoleBreakUp_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotRoleBreakUp");
const RedDotRoleChange_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotRoleChange");
const RedDotRoleLevelUp_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotRoleLevelUp");
const RedDotRoleSkin_1 = require("./RedDots/RoleSystem/RoleAttribute/RedDotRoleSkin");
const RedDotResonanceTab_1 = require("./RedDots/RoleSystem/RoleResonance/RedDotResonanceTab");
const RedDotRoleWeaponBreakUp_1 = require("./RedDots/RoleSystem/RoleWeapon/RedDotRoleWeaponBreakUp");
const RedDotFlySkinChildTab_1 = require("./RedDots/RoleSystem/Skin/RedDotFlySkinChildTab");
const RedDotFlySkinTab_1 = require("./RedDots/RoleSystem/Skin/RedDotFlySkinTab");
const RedDotHuluSkinTab_1 = require("./RedDots/RoleSystem/Skin/RedDotHuluSkinTab");
const CustomerServerRedDot_1 = require("./RedDots/Sdk/CustomerServerRedDot");
const IntroductionRedDot_1 = require("./RedDots/Sdk/IntroductionRedDot");
const RedDotShipTower_1 = require("./RedDots/ShipTower/RedDotShipTower");
const RedDotShipTowerReward_1 = require("./RedDots/ShipTower/RedDotShipTowerReward");
const PayShopInstanceRedDot_1 = require("./RedDots/Shop/PayShopInstanceRedDot");
const PayShopTabRedDot_1 = require("./RedDots/Shop/PayShopTabRedDot");
const RedDotSpring25_1 = require("./RedDots/Spring25/RedDotSpring25");
const TowerDefenceRewardRedDot_1 = require("./RedDots/TowerDefence/TowerDefenceRewardRedDot");
const RedDotTowerReward_1 = require("./RedDots/TowerRewrad/RedDotTowerReward");
const RedDotTowerRewardByDifficulties_1 = require("./RedDots/TowerRewrad/RedDotTowerRewardByDifficulties");
const RedDotTrapDefense_1 = require("./RedDots/TrapDefense/RedDotTrapDefense");
const RedDotTrapDefenseBdBuffNewUnlock_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseBdBuffNewUnlock");
const RedDotTrapDefenseBdSum_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseBdSum");
const RedDotTrapDefenseDevelopBranchAll_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseDevelopBranchAll");
const RedDotTrapDefenseDevelopBranchAuxiliary_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseDevelopBranchAuxiliary");
const RedDotTrapDefenseDevelopBranchBuilding_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseDevelopBranchBuilding");
const RedDotTrapDefenseLevelModeLevelReachOpenTime_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseLevelModeLevelReachOpenTime");
const RedDotTrapDefenseMainLevel_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseMainLevel");
const RedDotTrapDefenseRougeLevel_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseRougeLevel");
const RedDotTrapDefenseRougeModeLevelReachOpenTime_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseRougeModeLevelReachOpenTime");
const RedDotTrapDefenseRougeModeOpen_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseRougeModeOpen");
const RedDotTrapDefenseTalentTree_1 = require("./RedDots/TrapDefense/RedDotTrapDefenseTalentTree");
const RedDotTrapDefensFixedReward_1 = require("./RedDots/TrapDefense/RedDotTrapDefensFixedReward");
const RedDotTrapDefensLimitReward_1 = require("./RedDots/TrapDefense/RedDotTrapDefensLimitReward");
const RedDotTutorialType_1 = require("./RedDots/Tutorial/RedDotTutorialType");
const VisionGridRedDot_1 = require("./RedDots/Vision/VisionGridRedDot");
const VisionIdentifyRedDot_1 = require("./RedDots/Vision/VisionIdentifyRedDot");
const VisionLevelUpSettingRedDot_1 = require("./RedDots/Vision/VisionLevelUpSettingRedDot");
const VisionOneKeyEquipRedDot_1 = require("./RedDots/Vision/VisionOneKeyEquipRedDot");
const VisionTabRedDot_1 = require("./RedDots/Vision/VisionTabRedDot");
const RedDotWeaponResonanceTab_1 = require("./RedDots/Weapon/RedDotWeaponResonanceTab");
const RedDotWeeklyRogueScoreReward_1 = require("./RedDots/WeeklyRogue/RedDotWeeklyRogueScoreReward");
class RedDotModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.jar = new Map();
  }
  OnInit() {
    this.qp("Test", new RedDotTest_1.RedDotTest());
    this.qp("BattleViewMenu", new RedDotBattleViewMenu_1.RedDotBattleViewMenu());
    this.qp("BattleViewResonanceButton", new RedDotBattleViewResonanceButton_1.RedDotBattleViewResonanceButton());
    this.qp("BattleViewShopButton", new RedDotBattleViewShopButton_1.RedDotBattleViewShopButton());
    this.qp("BattleViewGachaButton", new RedDotBattleViewGachaButton_1.RedDotBattleViewGachaButton());
    this.qp("MailFilterAll", new RedDotMailBoxFilter_1.RedDotMailBoxFilter());
    this.qp("FilterImportant", new RedDotMailBoxImportantFilter_1.RedDotMailBoxImportantFilter());
    this.qp("FilterUnScanned", new RedDotMailBoxUnScannedFilter_1.RedDotMailBoxUnScannedFilter());
    this.qp("RoleSystemRoleList", new RedDotRoleSystemRoleList_1.RedDotRoleSystemRoleList());
    this.qp("RoleAttributeTab", new RedDotAttributeTab_1.RedDotAttributeTab());
    this.qp("RoleAttributeTabLevelUp", new RedDotRoleLevelUp_1.RedDotRoleLevelUp());
    this.qp("RoleSkin", new RedDotRoleSkin_1.RedDotRoleSkin());
    this.qp("RoleChange", new RedDotRoleChange_1.RedDotRoleChange());
    this.qp("FlySkinTab", new RedDotFlySkinTab_1.RedDotFlySkinTab());
    this.qp("FlySkinChildTab", new RedDotFlySkinChildTab_1.RedDotFlySkinChildTab());
    this.qp("HuluSkinTab", new RedDotHuluSkinTab_1.RedDotHuluSkinTab());
    this.qp("RoleAttributeTabBreakUp", new RedDotRoleBreakUp_1.RedDotRoleBreakUp());
    this.qp("RoleWeaponTabBreakUp", new RedDotRoleWeaponBreakUp_1.RedDotRoleWeaponBreakUp());
    this.qp("RoleResonanceTab", new RedDotResonanceTab_1.RedDotResonanceTab());
    this.qp("FunctionRole", new RedDotFunctionRole_1.RedDotFunctionRole());
    this.qp("FunctionPhantom", new RedDotFunctionPhantom_1.RedDotFunctionPhantom());
    this.qp("FunctionGacha", new RedDotBattleViewGachaButton_1.RedDotBattleViewGachaButton());
    this.qp("FunctionTutorial", new RedDotFunctionTutorial_1.RedDotFunctionTutorial());
    this.qp("FunctionAdventure", new RedDotFunctionAdventureGuide_1.RedDotFunctionAdventureGuide());
    this.qp("FunctionInventory", new RedDotFunctionInventory_1.RedDotFunctionInventory());
    this.qp("FunctionMail", new RedDotFunctionMail_1.RedDotFunctionMail());
    this.qp("FunctionNotice", new RedDotFunctionNotice_1.RedDotFunctionNotice());
    this.qp("FunctionPayShop", new RedDotFunctionPayShop_1.RedDotFunctionPayShop());
    this.qp("FunctionPhantomExploreSet", new RedDotFunctionPhantomExploreSet_1.RedDotFunctionPhantomExploreSet());
    this.qp("FunctionPhotograph", new RedDotFunctionPhotograph_1.RedDotFunctionPhotograph());
    this.qp("FunctionSetting", new RedDotFunctionSetting_1.RedDotFunctionSetting());
    this.qp("AdventureManual", new RedDotAdventureManual_1.RedDotAdventureManual());
    this.qp("AdventureBattleButton", new RedDotAdventureBattleButton_1.RedDotAdventureBattleButtonItem());
    this.qp("AdventureFirstAward", new RedDotAdventureFirstAward_1.RedDotAdventureFirstAward());
    this.qp("AdventureFirstAwardCategory", new RedDotAdventureFirstAwardCategory_1.RedDotAdventureFirstAwardCategory());
    this.qp("AdventureFirstAwardResult", new RedDotAdventureFirstAwardResult_1.RedDotAdventureFirstAwardResult());
    this.qp("AdventureDailyActivityTab", new RedDotAdventureDailyActivityTab_1.RedDotAdventureDailyActivityTab());
    this.qp("AdventureNewSoundAreaTab", new RedDotAdventureNewSoundAreaTab_1.RedDotAdventureNewSoundAreaTab());
    this.qp("AdventureChallengeTab", new RedDotAdventureChallengeTab_1.RedDotAdventureChallengeTab());
    this.qp("AdventurePeriodicityTab", new AdventurePeriodicityTab_1.AdventurePeriodicityTab());
    this.qp("AdventureNewSoundAreaGeneral", new RedDotAdventureNewSoundAreaGeneral_1.RedDotAdventureNewSoundAreaGeneral());
    this.qp("FunctionCalabash", new RedDotCalabash_1.RedDotCalabashUpdate());
    this.qp("CalabashTab", new RedDotCalabashTab_1.RedDotCalabashTab());
    this.qp("VisionRecovery", new RedDotVisionRecovery_1.RedDotVisionRecovery());
    this.qp("VisionRefine", new RedDotVisionRefine_1.RedDotVisionRefine());
    this.qp("FunctionFriend", new RedDotFunctionFriend_1.RedDotFunctionFriend());
    this.qp("FriendNewApplication", new RedDotFriendNewApplication_1.RedDotFriendNewApplication());
    this.qp("ChatView", new RedDotChatView_1.RedDotChatView());
    this.qp("ChatRoom", new RedDotChatRoom_1.RedDotChatRoom());
    this.qp("TutorialTypeNew", new RedDotTutorialType_1.RedDotTutorialType());
    this.qp("RoleSelectionList", new RedDotRoleSelectionList_1.RedDotRoleSelectionList());
    this.qp("InfluenceReputation", new RedDotInfluenceReputation_1.RedDotInfluenceReputation());
    this.qp("InfluenceReward", new RedDotInfluenceReward_1.RedDotInfluenceReward());
    this.qp("CookerLevel", new RedDotCookerLevel_1.RedDotCookerLevel());
    this.qp("CookerLevelMain", new RedDotCookerLevel_1.RedDotCookerLevel());
    this.qp("BattlePass", new RedDotBattlePass_1.RedDotBattlePass());
    this.qp("BattlePassTask", new RedDotBattlePassTask_1.RedDotBattlePassTask());
    this.qp("BattlePassReward", new RedDotBattlePassReward_1.RedDotBattlePassReward());
    this.qp("BattlePassDayTaskTab", new RedDotBattlePassDayTaskTab_1.RedDotBattlePassDayTaskTab());
    this.qp("BattlePassWeekTaskTab", new RedDotBattlePassWeekTaskTab_1.RedDotBattlePassWeekTaskTab());
    this.qp("BattlePassAlwaysTaskTab", new RedDotBattlePassAlwaysTaskTab_1.RedDotBattlePassAlwaysTaskTab());
    this.qp("RoleHandBook", new RedDotRoleHandBook_1.RedDotRoleHandBook());
    this.qp("ComposeReagentProduction", new RedDotComposeLevel_1.RedDotComposeLevel());
    this.qp("ItemHandBook", new RedDotItemHandBook_1.RedDotItemHandBook());
    this.qp("PhantomHandBook", new RedDotPhantomHandBook_1.RedDotPhantomHandBook());
    this.qp("Achievement", new RedDotAchievement_1.RedDotAchievement());
    this.qp("AchievementCategory", new RedDotAchievementCategory_1.RedDotAchievementCategory());
    this.qp("ActivityEntrance", new RedDotActivityEntrance_1.RedDotActivityEntrance());
    this.qp("CommonActivityPage", new RedDotCommonActivityPage_1.RedDotCommonActivityPage());
    this.qp("ActivityRun", new RedDotActivityRun_1.RedDotActivityRun());
    this.qp("BattleViewQuestButton", new RedDotBattleViewQuestBtn_1.RedDotBattleViewQuestBtn());
    this.qp("QuestViewItem", new RedDotQuestViewItem_1.RedDotQuestViewItem());
    this.qp("QuestTab", new RedDotQuestViewTab_1.RedDotQuestViewTab());
    this.qp("FunctionViewQuestBtn", new RedDotFunctionViewQuestBtn_1.RedDotFunctionViewQuestBtn());
    this.qp("InventoryVirtual", new RedDotInventoryVirtual_1.RedDotInventoryVirtual());
    this.qp("InventoryCommon", new RedDotInventoryCommon_1.RedDotInventoryCommon());
    this.qp("InventoryWeapon", new RedDotInventoryWeapon_1.RedDotInventoryWeapon());
    this.qp("InventoryPhantom", new RedDotInventoryPhantom_1.RedDotInventoryPhantom());
    this.qp("InventoryCollection", new RedDotInventoryCollection_1.RedDotInventoryCollection());
    this.qp("InventoryMaterial", new RedDotInventoryMaterial_1.RedDotInventoryMaterial());
    this.qp("InventoryMission", new RedDotInventoryMissionItem_1.RedDotInventoryMissionItem());
    this.qp("InventorySpecial", new RedDotInventorySpecialItem_1.RedDotInventorySpecialItem());
    this.qp("InventoryCard", new RedDotInventoryCard_1.RedDotInventoryCard());
    this.qp("TowerReward", new RedDotTowerReward_1.RedDotTowerReward());
    this.qp("TowerRewardByDifficulties", new RedDotTowerRewardByDifficulties_1.RedDotTowerRewardByDifficulties());
    this.qp("IdentifyTab", new VisionIdentifyRedDot_1.VisionIdentifyRedDot());
    this.qp("VisionOneKeyEquip", new VisionOneKeyEquipRedDot_1.VisionOneKeyEquipRedDot());
    this.qp("VisionTabRedDot", new VisionTabRedDot_1.VisionTabRedDot());
    this.qp("VisionGridRedDot", new VisionGridRedDot_1.VisionGridRedDot());
    this.qp("PayShopInstance", new PayShopInstanceRedDot_1.PayShopInstanceRedDot());
    this.qp("PayShopTab", new PayShopTabRedDot_1.PayShopTabRedDot());
    this.qp("RogueSkillUnlock", new RedDotRoguelikeSkillCanUnlock_1.RedDotRoguelikeSkillCanUnlock());
    this.qp("RoguelikeAchievement", new RedDotRoguelikeAchievement_1.RedDotRoguelikeAchievement());
    this.qp("RoguelikeShop", new RedDotRoguelikeShop_1.RedDotRoguelikeShop());
    this.qp("RoguelikeAchievementGroup", new RedDotRoguelikeAchievementGroup_1.RedDotRoguelikeAchievementGroup());
    this.qp("BossRushReward", new BossRushRewardRedDot_1.BossRushRewardRedDot());
    this.qp("MowingTowerReward", new MowingTowerRewardRedDot_1.MowingTowerRewardRedDot());
    this.qp("TowerDefenseReward", new TowerDefenceRewardRedDot_1.TowerDefenseRewardRedDot());
    this.qp("TowerDefenseInstance", new TowerDefenceRewardRedDot_1.TowerDefenseInstanceRedDot());
    this.qp("RedDotMowingRiskReward", new MowingRiskRedDot_1.RedDotMowingRiskReward());
    this.qp("RedDotMowingRiskBuffAll", new MowingRiskRedDot_1.RedDotMowingRiskBuffAll());
    this.qp("CustomerService", new CustomerServerRedDot_1.CustomerServerRedDot());
    this.qp("Introduction", new IntroductionRedDot_1.IntroductionRedDot());
    this.qp("FragmentMemoryReward", new FragmentMemoryCollectRewardRedDot_1.FragmentMemoryCollectRewardRedDot());
    this.qp("FragmentMemoryEntrance", new FragmentMemoryEntranceRedDot_1.FragmentMemoryEntranceRedDot());
    this.qp("FragmentMemoryTopic", new FragmentMemoryTopicRedDot_1.FragmentMemoryTopicRedDot());
    this.qp("FragmentMemoryTopicCollectRedDot", new FragmentMemoryTopicCollectRedDot_1.FragmentMemoryTopicCollectRedDot());
    this.qp("BattlePassPayButton", new RedDotBattlePassPayButton_1.RedDotBattlePassPayButton());
    this.qp("PersonalInfo", new PersonalizeInfoRedDot_1.PersonalizeInfoRedDot());
    this.qp("PersonalCard", new PersonalCardRedDot_1.PersonalCardRedDot());
    this.qp("PersonalTitle", new PersonalTitleRedDot_1.PersonalTitleRedDot());
    this.qp("PersonalBirthday", new PersonalBirthdayRedDot_1.PersonalBirthdayRedDot());
    this.qp("PersonalImageBook", new PersonalImageBookRedDot_1.PersonalImageBookRedDot());
    this.qp("ActivityRecallSignEntry", new RedDotActivityRecallSignEntryButton_1.RedDotActivityRecallSignEntryButton());
    this.qp("ActivityRecallTask", new RedDotActivityRecallTaskEntryButton_1.RedDotActivityRecallTaskEntryButton());
    this.qp("ActivityRegressQuestionnaire", new RedDotActivityRegressQuestionnaire_1.RedDotActivityRegressQuestionnaire());
    this.qp("ActivityRegressShopDiscount", new RedDotActivityRegressShopDiscount_1.RedDotActivityRegressShopDiscount());
    this.qp("ActivityRegressDoubleDrop", new RedDotActivityRegressDoubleDrop_1.RedDotActivityRegressDoubleDrop());
    this.qp("ActivityRegressCultivate", new RedDotActivityRegressCultivate_1.RedDotActivityRegressCultivate());
    this.qp("ActivityRegressConstantTask", new RedDotActivityRegressConstantTask_1.RedDotActivityRegressConstantTask());
    this.qp("VisionLevelUpSetting", new VisionLevelUpSettingRedDot_1.VisionLevelUpSettingRedDot());
    this.qp("MoonChasingAllQuest", new RedDotMoonChasingAllQuest_1.RedDotMoonChasingAllQuest());
    this.qp("MoonChasingBranchTab", new RedDotMoonChasingBranchTab_1.RedDotMoonChasingBranchTab());
    this.qp("MoonChasingMainlineTab", new RedDotMoonChasingMainlineTab_1.RedDotMoonChasingMainlineTab());
    this.qp("MoonChasingHandbook", new RedDotMoonChasingHandbook_1.RedDotMoonChasingHandbook());
    this.qp("MoonChasingReward", new RedDotMoonChasingReward_1.RedDotMoonChasingReward());
    this.qp("MoonChasingShop", new RedDotMoonChasingShop_1.RedDotMoonChasingShop());
    this.qp("MoonChasingRewardAndShop", new RedDotMoonChasingRewardAndShop_1.RedDotMoonChasingRewardAndShop());
    this.qp("MoonChasingDelegation", new RedDotMoonChasingDelegation_1.RedDotMoonChasingDelegation());
    this.qp("MoonChasingRole", new RedDotMoonChasingRole_1.RedDotMoonChasingRole());
    this.qp("MoonChasingBuilding", new RedDotMoonChasingBuilding_1.RedDotMoonChasingBuilding());
    this.qp("Spring25AllLetter", new RedDotSpring25_1.RedDotSpring25AllLetter());
    this.qp("Spring25Reward", new RedDotSpring25_1.RedDotSpring25Reward());
    this.qp("Spring25Invite", new RedDotSpring25_1.RedDotSpring25Invite());
    this.qp("Spring25Enter", new RedDotSpring25_1.RedDotSpring25Enter());
    this.qp("ActivityCorniceMeeting", new RedDotActivityCorniceMeeting_1.RedDotActivityCorniceMeeting());
    this.qp("FunctionMailBind", new RedDotFunctionMailBind_1.RedDotFunctionMailBind());
    this.qp("FunctionKuroStreet", new RedDotFunctionKuroStreet_1.RedDotFunctionKuroStreet());
    this.qp("ActivityDirectTrain", new RedDotDirectTrain_1.RedDotDirectTrain());
    this.qp("ActivityDirectTrainPro", new RedDotDirectTrain_1.RedDotDirectTrainPro());
    this.qp("FunctionMap", new RedDotFunctionMap_1.RedDotFunctionMap());
    this.qp("MapAreaExplore", new RedDotMapAreaExplore_1.RedDotMapAreaExplore());
    this.qp("MapAreaBoxReward", new RedDotMapAreaBoxReward_1.RedDotMapAreaBoxReward());
    this.qp("WeeklyRogueScoreReward", new RedDotWeeklyRogueScoreReward_1.RedDotWeeklyRogueScoreReward());
    this.qp("FarmGoldReward", new FarmGoldRewardRedDot_1.FarmGoldRewardRedDot());
    this.qp("FishingTech", new FishingTechRedDot_1.FishingTechRedDot());
    this.qp("FishingNormalTechNode", new FishingNormalTechNodeRedDot_1.FishingNormalTechNodeRedDot());
    this.qp("FishingRoleTechNode", new FishingRoleTechNodeRedDot_1.FishingRoleTechNodeRedDot());
    this.qp("FishingRoleToggleTech", new FishingRoleToggleTechRedDot_1.FishingRoleToggleTechRedDot());
    this.qp("FishingRoleTech", new FishingTechRoleRedDot_1.FishingTechRoleRedDot());
    this.qp("FishingNormalTech", new FishingTechNormalRedDot_1.FishingTechNormalRedDot());
    this.qp("ShipTower", new RedDotShipTower_1.RedDotShipTower());
    this.qp("ShipTowerReward", new RedDotShipTowerReward_1.RedDotShipTowerReward());
    this.qp("PreDownload", new PreDownloadRedDot_1.RedDotPreDownload());
    this.qp("PreDownloadComplete", new PreDownloadRedDot_1.RedDotPreDownloadComplete());
    this.qp("InviteNewbie", new RedDotInviteNewbie_1.RedDotInviteNewbie());
    this.qp("BabelTowerQuestRedDot", new BabelTowerQuestRedDot_1.BabelTowerQuestRedDot());
    this.qp("BabelTowerNewLevelDifficulty", new BabelTowerDifficultyRedDot_1.BabelTowerDifficultyRedDot());
    this.qp("BabelTowerNewLevel", new BabelTowerLevelRedDot_1.BabelTowerLevelRedDot());
    this.qp("CiacconaProgressReward", new RedDotCiacconaActivity_1.RedDotCiacconaProgressReward());
    this.qp("CiacconaEndingReward", new RedDotCiacconaActivity_1.RedDotCiacconaEndingReward());
    this.qp("CiacconaSubEndingReward", new RedDotCiacconaActivity_1.RedDotCiacconaSubEndingReward());
    this.qp("RogueResIllustratedTokenTab", new RedDotRogueResIllustratedTokenTab_1.RedDotRogueResIllustratedTokenTab());
    this.qp("RogueResIllustratedNormalTab", new RedDotRogueResIllustratedNormal_1.RedDotRogueResIllustratedNormal());
    this.qp("RogueResIllustratedMapTab", new RedDotRogueResIllustratedMap_1.RedDotRogueResIllustratedMap());
    this.qp("RogueResIllustrated", new RedDotRogueResIllustrated_1.RedDotRogueResIllustrated());
    this.qp("RogueResTask", new RedDotRogueResTask_1.RedDotRogueResTask());
    this.qp("RogueResShop", new RedDotRogueResShop_1.RedDotRogueResShop());
    this.qp("RogueResInst", new RedDotRogueResInst_1.RedDotRogueResInst());
    this.qp("RogueResSkillTree", new RedDotRogueResSkillTree_1.RedDotRogueResSkillTree());
    this.qp("RogueResEnding", new RedDotRogueResEnding_1.RedDotRogueResEnding());
    this.qp("DangoMonopoly", new RedDotDangoMonopoly_1.RedDotDangoMonopoly());
    this.qp("DangoMonopolyTask", new RedDotDangoMonopolyTask_1.RedDotDangoMonopolyTask());
    this.qp("DangoMonopolyDiceNum", new RedDotDangoMonopolyDiceNum_1.RedDotDangoMonopolyDiceNum());
    this.qp("DangoMonopolyRound", new RedDotDangoMonopolyDiceRound_1.RedDotDangoMonopolyRound());
    this.qp("Morale", new RedDotMorale_1.RedDotMorale());
    this.qp("MoraleScoreBox", new RedDotMoraleScoreBox_1.RedDotMoraleScoreBox());
    this.qp("MoraleFlagBox", new RedDotMoraleFlagBox_1.RedDotMoraleFlagBox());
    this.qp("MoraleBuff", new RedDotMoraleBuff_1.RedDotMoraleBuff());
    this.qp("MoraleAreaBuff", new RedDotMoraleAreaBuff_1.RedDotMoraleAreaBuff());
    this.qp("TrapDefense", new RedDotTrapDefense_1.RedDotTrapDefense());
    this.qp("TrapDefenseMainLevel", new RedDotTrapDefenseMainLevel_1.RedDotTrapDefenseMainLevel());
    this.qp("TrapDefenseRougeLevel", new RedDotTrapDefenseRougeLevel_1.RedDotTrapDefenseRougeLevel());
    this.qp("TrapDefenseFixedReward", new RedDotTrapDefensFixedReward_1.RedDotTrapDefenseFixedReward());
    this.qp("TrapDefenseLimitReward", new RedDotTrapDefensLimitReward_1.RedDotTrapDefenseLimitReward());
    this.qp("TrapDefenseTalentTree", new RedDotTrapDefenseTalentTree_1.RedDotTrapDefenseTalentTree());
    this.qp("TrapDefenseDevelopBranchAll", new RedDotTrapDefenseDevelopBranchAll_1.RedDotTrapDefenseDevelopBranchAll());
    this.qp("TrapDefenseDevelopBranchAuxiliary", new RedDotTrapDefenseDevelopBranchAuxiliary_1.RedDotTrapDefenseDevelopBranchAuxiliary());
    this.qp("TrapDefenseDevelopBranchBuilding", new RedDotTrapDefenseDevelopBranchBuilding_1.RedDotTrapDefenseDevelopBranchBuilding());
    this.qp("TrapDefenseBdSum", new RedDotTrapDefenseBdSum_1.RedDotTrapDefenseBdSum());
    this.qp("TrapDefenseBdBuffNewUnlock", new RedDotTrapDefenseBdBuffNewUnlock_1.RedDotTrapDefenseBdBuffNewUnlock());
    this.qp("TrapDefenseLevelModeLevelReachOpenTime", new RedDotTrapDefenseLevelModeLevelReachOpenTime_1.RedDotTrapDefenseLevelModeLevelReachOpenTime());
    this.qp("TrapDefenseRougeModeLevelReachOpenTime", new RedDotTrapDefenseRougeModeLevelReachOpenTime_1.RedDotTrapDefenseRougeModeLevelReachOpenTime());
    this.qp("TrapDefenseRougeModeOpen", new RedDotTrapDefenseRougeModeOpen_1.RedDotTrapDefenseRougeModeOpen());
    this.qp("RedDotDangoCommonReward", new RedDotDangoCommonReward_1.RedDotDangoCommonReward());
    this.qp("RedDotDangoLimitReward", new RedDotDangoLimitReward_1.RedDotDangoLimitReward());
    this.qp("RedDotDangoPayShop", new RedDotDangoPayShop_1.RedDotDangoPayShop());
    this.qp("RedDotDangoDevelop", new RedDotDangoDevelop_1.RedDotDangoDevelop());
    this.qp("RedDotDangoRole", new RedDotDangoRole_1.RedDotDangoRole());
    this.qp("RedDotDangoFormation", new RedDotDangoFormation_1.RedDotDangoFormation());
    this.qp("RedDotDangoFormationRole", new RedDotDangoFormationRole_1.RedDotDangoFormationRole());
    this.qp("RedDotVersionCheck", new RedDotVersionCheck_1.RedDotVersionCheck());
    this.qp("RedDotRacingBetsActivityReward", new RedDotRacingBetsActivityReward_1.RedDotRacingBetsActivityReward());
    this.qp("RedDotRacingBetsActivityInternalReward", new RedDotRacingBetsActivityInternalReward_1.RedDotRacingBetsActivityInternalReward());
    this.qp("CumulativeShopTaskTabRedDot", new CumulativeShopTaskTabRedDot_1.CumulativeShopTaskTabRedDot());
    this.qp("RedDotPhantomArenaLimitReward", new RedDotPhantomArenaLimitReward_1.RedDotPhantomArenaLimitReward());
    this.qp("RedDotPhantomArenaTaskReward", new RedDotPhantomArenaTaskReward_1.RedDotPhantomArenaTaskReward());
    this.qp("RedDotPhantomArenaShopUpdate", new RedDotPhantomArenaShopUpdate_1.RedDotPhantomArenaShopUpdate());
    this.qp("RedDotPhantomArenaCardReward", new RedDotPhantomArenaCardReward_1.RedDotPhantomArenaCardReward());
    this.qp("RedDotPhantomArenaCollect", new RedDotPhantomArenaCollect_1.RedDotPhantomArenaCollect());
    this.qp("RedDotPhantomArenaRole", new RedDotPhantomArenaRole_1.RedDotPhantomArenaRole());
    this.qp("RedDotPhantomArenaBadgeReward", new RedDotPhantomArenaBadgeReward_1.RedDotPhantomArenaBadgeReward());
    this.qp("RedDotPhantomArenaLevelReward", new RedDotPhantomArenaLevelReward_1.RedDotPhantomArenaLevelReward());
    this.qp("RedDotPhantomArenaGym", new RedDotPhantomArenaGym_1.RedDotPhantomArenaGym());
    this.qp("RedDotPhantomArenaActivity", new RedDotPhantomArenaActivity_1.RedDotPhantomArenaActivity());
    this.qp("BeginnerCarnivalTaskTabRedDot", new BeginnerCarnivalTaskTabRedDot_1.BeginnerCarnivalTaskTabRedDot());
    this.qp("LifePointDrawChallengeRedDot", new LifePointDrawChallengeRedDot_1.LifePointDrawChallengeRedDot());
    this.qp("LifePointDrawGroupRedDot", new LifePointDrawGroupRedDot_1.LifePointDrawGroupRedDot());
    this.qp("ActivityFunPlay", new RedDotActivityFunPlay_1.RedDotActivityFunPlay());
    this.qp("LineCrossChallengeRedDot", new LineCrossChallengeRedDot_1.LineCrossChallengeRedDot());
    this.qp("LineCrossGroupRedDot", new LineCrossGroupRedDot_1.LineCrossGroupRedDot());
    this.qp("RedDotWeaponResonanceTab", new RedDotWeaponResonanceTab_1.RedDotWeaponResonanceTab());
    this.War();
    return true;
  }
  qp(e, t) {
    t.Init(e);
    this.Kar(e, t);
  }
  War() {
    var e;
    var t;
    var o = ConfigManager_1.ConfigManager.RedDotConfig.GetRelativeNameMap();
    for ([e, t] of this.jar) {
      var n = t.Element.GetParentName() ?? o.get(e);
      if (n !== undefined && !StringUtils_1.StringUtils.IsEmpty(n)) {
        if (n = this.jar.get(n)) {
          n.AddChild(t);
        }
      }
    }
  }
  Kar(e, t) {
    let o = this.jar.get(e);
    if (!o) {
      o = new Tree_1.Tree(t);
      this.jar.set(e, o);
    }
    return o;
  }
  GetRedDotTree(e) {
    var t = this.jar.get(e);
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RedDot", 16, "获取红点树失败，当前红点未注册！", ["红点名称", e]);
    }
  }
  GetRedDot(e) {
    var t = this.jar.get(e)?.Element;
    if (t) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RedDot", 16, "获取红点失败，当前红点未注册！", ["红点名称", e]);
    }
  }
  Qar(e, t) {
    var o;
    t.add(e);
    for ([o] of this.GetRedDotTree(e.Name).ChildMap) {
      this.Qar(o, t);
    }
  }
  LogAllRedDotTree(e) {
    e = this.GetRedDot(e);
    if (e) {
      var t = new Set();
      this.Qar(e, t);
      var o = new StringBuilder_1.StringBuilder();
      for (const n of t) {
        o.Append(n.ToRedDotString());
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RedDot", 10, o.ToString());
      }
    }
  }
  LogAllRedDotState(e) {
    var t = this.GetRedDot(e);
    if (t) {
      var o = new Set();
      this.Qar(t, o);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RedDot", 69, "===========开始打印红点状态===========", ["Name", e]);
      }
      for (const n of o) {
        n.PrintStateDebugString();
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RedDot", 69, "===========结束打印红点状态===========", ["Name", e]);
      }
    }
  }
  SwitchAllRedDot(e) {
    RedDotBase_1.RedDotData.StateByGm = e;
    var t = new Set();
    for (const n of this.jar.values()) {
      var o = n.Element;
      t.add(o);
    }
    for (const i of t) {
      i.SetRedDotActiveByGm(e);
    }
  }
}
exports.RedDotModel = RedDotModel;
//# sourceMappingURL=RedDotModel.js.map