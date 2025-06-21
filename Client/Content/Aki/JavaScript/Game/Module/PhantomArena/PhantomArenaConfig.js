"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaConfig = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  PhantomBattleActivityByActivityId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleActivityByActivityId"),
  PhantomBattleBadgeAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeAll"),
  PhantomBattleBadgeById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeById"),
  PhantomBattleBadgeGroupByGroupId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeGroupByGroupId"),
  PhantomBattleBadgeRewardByActivityId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeRewardByActivityId"),
  PhantomBattleBadgeRewardById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeRewardById"),
  PhantomBattleBuffById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBuffById"),
  PhantomBattleCardAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardAll"),
  PhantomBattleCardById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardById"),
  PhantomBattleCardElementById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardElementById"),
  PhantomBattleCardFilterAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardFilterAll"),
  PhantomBattleCardFilterById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardFilterById"),
  PhantomBattleCardGroupByGroupId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardGroupByGroupId"),
  PhantomBattleCardGroupInfoById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardGroupInfoById"),
  PhantomBattleCardRewardByActivityId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardRewardByActivityId"),
  PhantomBattleCardRewardById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardRewardById"),
  PhantomBattleCardRoleAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardRoleAll"),
  PhantomBattleCardRoleById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardRoleById"),
  PhantomBattleCardSlotSortAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardSlotSortAll"),
  PhantomBattleCardSlotSortById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardSlotSortById"),
  PhantomBattleChallengeByActivityGymId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleChallengeByActivityGymId"),
  PhantomBattleChallengeById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleChallengeById"),
  PhantomBattleDialogById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleDialogById"),
  PhantomBattleEntryById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleEntryById"),
  PhantomBattleFactorAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleFactorAll"),
  PhantomBattleFactorById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleFactorById"),
  PhantomBattleFourCTaskByCardId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleFourCTaskByCardId"),
  PhantomBattleGymByActivityId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleGymByActivityId"),
  PhantomBattleMasterLevelAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleMasterLevelAll"),
  PhantomBattleMasterLevelById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleMasterLevelById"),
  PhantomBattleMasterTitleById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleMasterTitleById"),
  PhantomBattleNPCByGroupId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleNPCByGroupId"),
  PhantomBattleNPCById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleNPCById"),
  PhantomBattleSkillById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleSkillById"),
  PhantomBattleTaskByTaskId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleTaskByTaskId"),
  PhantomBattleTaskTabById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleTaskTabById"),
  PhantomBattleWeekExpById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleWeekExpById"),
  PhantomBattleWinSeqById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleWinSeqById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PhantomArenaConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), this.DZ1 = (t, e) => {
      return t.BitFlagId - e.BitFlagId
    }
  }
  GetPhantomBattleCardConfig(t) {
    return PhantomBattleCardById_1.configPhantomBattleCardById.GetConfig(t)
  }
  GetAllPhantomBattleCard() {
    return PhantomBattleCardAll_1.configPhantomBattleCardAll.GetConfigList()
  }
  GetPhantomBattleSkillConfig(t) {
    return PhantomBattleSkillById_1.configPhantomBattleSkillById.GetConfig(t)
  }
  GetPhantomBattleBuffConfig(t) {
    return PhantomBattleBuffById_1.configPhantomBattleBuffById.GetConfig(t)
  }
  GetPhantomBattleFactorConfig(t) {
    return PhantomBattleFactorById_1.configPhantomBattleFactorById.GetConfig(t)
  }
  GetPhantomBattleAllFactor() {
    return PhantomBattleFactorAll_1.configPhantomBattleFactorAll.GetConfigList()
  }
  GetPhantomBattleEntryConfig(t) {
    return PhantomBattleEntryById_1.configPhantomBattleEntryById.GetConfig(t)
  }
  GetPhantomBattleElementConfig(t) {
    return PhantomBattleCardElementById_1.configPhantomBattleCardElementById.GetConfig(t)
  }
  GetAllPhantomBattleCardFilter() {
    return PhantomBattleCardFilterAll_1.configPhantomBattleCardFilterAll.GetConfigList()
  }
  GetPhantomBattleCardFilter(t) {
    return PhantomBattleCardFilterById_1.configPhantomBattleCardFilterById.GetConfig(t)
  }
  GetAllPhantomBattleCardSlotSort() {
    return PhantomBattleCardSlotSortAll_1.configPhantomBattleCardSlotSortAll.GetConfigList()
  }
  GetPhantomBattleCardSlotSort(t) {
    return PhantomBattleCardSlotSortById_1.configPhantomBattleCardSlotSortById.GetConfig(t)
  }
  GetPhantomBattleActivityConfig(t) {
    return PhantomBattleActivityByActivityId_1.configPhantomBattleActivityByActivityId.GetConfig(t)
  }
  GetPhantomBattleChallenge(t) {
    return PhantomBattleChallengeById_1.configPhantomBattleChallengeById.GetConfig(t)
  }
  GetAllPhantomBattleBadge() {
    return PhantomBattleBadgeAll_1.configPhantomBattleBadgeAll.GetConfigList()
  }
  GetPhantomBattleBadgeById(t) {
    return PhantomBattleBadgeById_1.configPhantomBattleBadgeById.GetConfig(t)
  }
  GetPhantomBattleBadgeGroupIdById(t) {
    return this.GetPhantomBattleBadgeById(t).GroupId
  }
  GetPhantomBattleBadgeGroupById(t) {
    return PhantomBattleBadgeGroupByGroupId_1.configPhantomBattleBadgeGroupByGroupId.GetConfig(t)
  }
  GetPhantomBattleMasterTitleById(t) {
    return PhantomBattleMasterTitleById_1.configPhantomBattleMasterTitleById.GetConfig(t)
  }
  GetCardSkillList(t, e, a) {
    var r = [];
    return e && 0 < (e = t.ActiveSkillId) && r.push(e), a && r.push(...t.PassiveSkillId), r
  }
  GetPhantomBattleCardRole(t) {
    return PhantomBattleCardRoleById_1.configPhantomBattleCardRoleById.GetConfig(t)
  }
  GetAllPhantomBattleCardRole() {
    return PhantomBattleCardRoleAll_1.configPhantomBattleCardRoleAll.GetConfigList()
  }
  GetDeckDefaultName() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PhantomBattle_1038")
  }
  GetPhantomBattleNpc(t) {
    return PhantomBattleNPCById_1.configPhantomBattleNPCById.GetConfig(t)
  }
  GetPhantomBattleNpcList(t) {
    return PhantomBattleNPCByGroupId_1.configPhantomBattleNPCByGroupId.GetConfigList(t)
  }
  GetCardListByDeckConfigId(t) {
    return PhantomBattleCardGroupByGroupId_1.configPhantomBattleCardGroupByGroupId.GetConfigList(t)
  }
  GetDeckConfigInfo(t) {
    return PhantomBattleCardGroupInfoById_1.configPhantomBattleCardGroupInfoById.GetConfig(t)
  }
  GetPhantomBattleChallengeConfig(t) {
    return PhantomBattleChallengeById_1.configPhantomBattleChallengeById.GetConfig(t)
  }
  GetPhantomBattleGymConfig(t) {
    return PhantomBattleGymByActivityId_1.configPhantomBattleGymByActivityId.GetConfigList(t)
  }
  GetRepeatGymExpWeekLimitByLevel(t) {
    return PhantomBattleWeekExpById_1.configPhantomBattleWeekExpById.GetConfig(t)?.MaxWeekExp ?? 0
  }
  GetPhantomBattleGymConfigByLevel(t, e) {
    for (const a of this.GetPhantomBattleGymConfig(t))
      if (a.Level === e) return a
  }
  GetPhantomBattleMasterLevelConfigById(t) {
    var e = PhantomBattleMasterLevelById_1.configPhantomBattleMasterLevelById.GetConfig(t);
    return e || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取召唤师等级配置失败", ["ConfigId", t]), e
  }
  GetPhantomBattleMasterLevelConfigByActivityId(t) {
    var e = [];
    for (const a of PhantomBattleMasterLevelAll_1.configPhantomBattleMasterLevelAll.GetConfigList()) a.ActivityId === t && e.push(a);
    return e
  }
  GetPhantomBattleMasterLevelConfigByLevel(t, e) {
    for (const a of PhantomBattleMasterLevelAll_1.configPhantomBattleMasterLevelAll.GetConfigList())
      if (a.ActivityId === t && a.Level === e) return a;
    Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取召唤师等级配置失败", ["ActivityId", t], ["Level", e])
  }
  GetPhantomBattleChallengeIdListByGymId(t, e) {
    var a = PhantomBattleChallengeByActivityGymId_1.configPhantomBattleChallengeByActivityGymId.GetConfigList(t, e);
    if (!a || a.length <= 0) return Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取道馆的挑战列表失败，请检查PhantomBattleChallenge表", ["ActivityId", t], ["GymId", e]), [];
    var r = [];
    for (const o of a) r.push(o.Id);
    return r
  }
  GetPhantomBattleCardRewardById(t) {
    t = PhantomBattleCardRewardById_1.configPhantomBattleCardRewardById.GetConfig(t);
    return t || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取卡牌奖励列表失败，请检查PhantomBattleCardReward表", ["ConfigId", t]), t
  }
  GetPhantomBattleBadgeRewardById(t) {
    t = PhantomBattleBadgeRewardById_1.configPhantomBattleBadgeRewardById.GetConfig(t);
    return t || Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取卡牌奖励列表失败，请检查PhantomBattleBadgeReward表", ["ConfigId", t]), t
  }
  GetPhantomBattleCardRewardIdList(t) {
    var e = PhantomBattleCardRewardByActivityId_1.configPhantomBattleCardRewardByActivityId.GetConfigList(t);
    if (!e || e.length <= 0) return Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取卡牌奖励列表失败，请检查PhantomBattleCardReward表", ["ActivityId", t]), [];
    var a = [];
    for (const r of e.slice().sort(this.DZ1)) a.push(r.Id);
    return a
  }
  GetPhantomBattleBadgeRewardIdList(t) {
    var e = PhantomBattleBadgeRewardByActivityId_1.configPhantomBattleBadgeRewardByActivityId.GetConfigList(t);
    if (!e || e.length <= 0) return Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 75, "获取卡牌奖励列表失败，请检查PhantomBattleBadgeReward表", ["ActivityId", t]), [];
    var a = [];
    for (const r of e.slice().sort(this.DZ1)) a.push(r.Id);
    return a
  }
  GetQuicklyBuildDeckList(t) {
    return this.GetPhantomBattleActivityConfig(t).QuicklyBuild
  }
  GetSlotLongPressTime(t) {
    return this.GetPhantomBattleActivityConfig(t).SlotLongPressTime
  }
  GetPhantomBattleDialog(t) {
    return PhantomBattleDialogById_1.configPhantomBattleDialogById.GetConfig(t)
  }
  GetPhantomArenaOwnSpeakerId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomArenaOwnSpeakerId")
  }
  GetPhantomArenaOpponentSpeakerId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomArenaOpponentSpeakerId")
  }
  GetPhantomArenaCardCoreCost() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomBattleKeyCost")
  }
  GetPhantomArenaRoundOverCheck() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomArenaRoundOverCheck")
  }
  GetPhantomArenaFourTask(t) {
    return PhantomBattleFourCTaskByCardId_1.configPhantomBattleFourCTaskByCardId.GetConfig(t)
  }
  GetTaskConfigById(t) {
    return PhantomBattleTaskByTaskId_1.configPhantomBattleTaskByTaskId.GetConfig(t)
  }
  GetSeqConfig(t) {
    return PhantomBattleWinSeqById_1.configPhantomBattleWinSeqById.GetConfig(t)
  }
  GetTaskTabConfigById(t) {
    return PhantomBattleTaskTabById_1.configPhantomBattleTaskTabById.GetConfig(t)
  }
}
exports.PhantomArenaConfig = PhantomArenaConfig;
//# sourceMappingURL=PhantomArenaConfig.js.map