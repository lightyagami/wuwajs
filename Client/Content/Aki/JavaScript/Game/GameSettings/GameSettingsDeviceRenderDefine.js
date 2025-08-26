"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHOLE_SHADOW_CACHE_DELAY_TIME = exports.mainPlayerRealShadow = exports.maxDecalShadowDistanceWithGameGraphQualityMobile = exports.maxDecalShadowDistanceWithGameGraphQualityPc = exports.maxRoleShadowDistanceWithGameGraphQualityMobile = exports.maxRoleShadowDistanceWithGameGraphQualityPc = exports.maxRoleShadowNumWithGameGraphQualityMobile = exports.maxRoleShadowNumWithGameGraphQualityPc = exports.HD_SCREEN_HEIGHT = exports.HD_SCREEN_WIDTH = exports.performanceLimitConfigs = exports.PERFORMENCELIMIT_SEQ_TAIL = exports.frameRateListAndroidForRedMagic = exports.frameRateListAndroid = exports.frameRateListIos = exports.frameRateListPc = undefined;
exports.frameRateListPc = [30, 45, 60, 120];
exports.frameRateListIos = [30, 60, 120];
exports.frameRateListAndroid = [24, 30, 40, 60];
exports.frameRateListAndroidForRedMagic = [30, 60, 90];
exports.PERFORMENCELIMIT_SEQ_TAIL = "_Seq";
exports.performanceLimitConfigs = new Map([["RoleRootView", {
  FrameLimit: false,
  CacheWorldFrame: false
}], ["RoleLevelUpView", {
  FrameLimit: false,
  CacheWorldFrame: false
}], ["HandBookEntranceView", {
  FrameLimit: false,
  CacheWorldFrame: false
}], ["AchievementMainView", {
  FrameLimit: false,
  CacheWorldFrame: false
}], ["VideoView", {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["GachaScanView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: false
}], ["DrawMainView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: false
}], ["GachaResultView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: false
}], ["WorldMapView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["CalabashRootView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: false
}], ["BattlePassMainView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: false
}], ["GachaMainView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["PayShopRootView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["AdventureGuideView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["TutorialView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["QuestView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["FriendView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["TimeOfDaySecondView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["EditFormationView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["InventoryView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["MailBoxView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["MenuView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["FunctionView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["DreamLinkMainView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["FishingQteView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["ShipTowerView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["MapRogueMainView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["TuningStandView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["CommonActivityView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["FloroRanchMainView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["FloroRanchLimitRewardView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["FloroRanchPermanentRewardView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["FloroRanchGamePlayView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["FloroRanchDungeonSelectView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["FloroRanchComicView" + exports.PERFORMENCELIMIT_SEQ_TAIL, {
  FrameLimit: false,
  CacheWorldFrame: true
}], ["FunctionView_Special", {
  FrameLimit: false,
  CacheWorldFrame: true
}]]);
exports.HD_SCREEN_WIDTH = 2000;
exports.HD_SCREEN_HEIGHT = 1100;
exports.maxRoleShadowNumWithGameGraphQualityPc = [0, 0, 10, 15, 15];
exports.maxRoleShadowNumWithGameGraphQualityMobile = [0, 0, 3, 6];
exports.maxRoleShadowDistanceWithGameGraphQualityPc = [0, 0, 2500, 5000, 5000];
exports.maxRoleShadowDistanceWithGameGraphQualityMobile = [0, 0, 1500, 3000];
exports.maxDecalShadowDistanceWithGameGraphQualityPc = [2000, 2000, 4000, 6000, 6000];
exports.maxDecalShadowDistanceWithGameGraphQualityMobile = [1500, 1500, 2500, 3500];
exports.mainPlayerRealShadow = [0, 1, 1, 1];
exports.WHOLE_SHADOW_CACHE_DELAY_TIME = 1000; //# sourceMappingURL=GameSettingsDeviceRenderDefine.js.map