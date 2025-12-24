"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaConfig = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const PhantomBattleActivityByActivityId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleActivityByActivityId");
const PhantomBattleBadgeAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeAll");
const PhantomBattleBadgeById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeById");
const PhantomBattleBadgeGroupByGroupId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeGroupByGroupId");
const PhantomBattleBadgeRewardByActivityId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeRewardByActivityId");
const PhantomBattleBadgeRewardById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeRewardById");
const PhantomBattleBuffById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBuffById");
const PhantomBattleCardAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardAll");
const PhantomBattleCardByActivityId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardByActivityId");
const PhantomBattleCardById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardById");
const PhantomBattleCardEffectById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardEffectById");
const PhantomBattleCardElementById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardElementById");
const PhantomBattleCardFilterAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardFilterAll");
const PhantomBattleCardFilterById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardFilterById");
const PhantomBattleCardGroupByGroupId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardGroupByGroupId");
const PhantomBattleCardGroupInfoById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardGroupInfoById");
const PhantomBattleCardRewardByActivityId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardRewardByActivityId");
const PhantomBattleCardRewardById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardRewardById");
const PhantomBattleCardRoleByActivityId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardRoleByActivityId");
const PhantomBattleCardRoleById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardRoleById");
const PhantomBattleCardSlotSortAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardSlotSortAll");
const PhantomBattleCardSlotSortById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardSlotSortById");
const PhantomBattleChallengeByActivityGymId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleChallengeByActivityGymId");
const PhantomBattleChallengeById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleChallengeById");
const PhantomBattleChallengeByMarkId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleChallengeByMarkId");
const PhantomBattleDialogById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleDialogById");
const PhantomBattleEntryById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleEntryById");
const PhantomBattleFactorAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleFactorAll");
const PhantomBattleFactorById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleFactorById");
const PhantomBattleFourCTaskByCardId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleFourCTaskByCardId");
const PhantomBattleGymByActivityId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleGymByActivityId");
const PhantomBattleMapParamByMapId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleMapParamByMapId");
const PhantomBattleMasterLevelAll_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleMasterLevelAll");
const PhantomBattleMasterLevelById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleMasterLevelById");
const PhantomBattleMasterTitleById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleMasterTitleById");
const PhantomBattleNPCByGroupId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleNPCByGroupId");
const PhantomBattleNPCById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleNPCById");
const PhantomBattleSkillById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleSkillById");
const PhantomBattleTaskByTaskId_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleTaskByTaskId");
const PhantomBattleTaskTabById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleTaskTabById");
const PhantomBattleWeekExpById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleWeekExpById");
const PhantomBattleWinSeqById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleWinSeqById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PhantomArenaConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.ttu = (t, e) => {
      return t.BitFlagId - e.BitFlagId;
    };
  }
  GetPhantomBattleCardConfig(t) {
    return PhantomBattleCardById_1.configPhantomBattleCardById.GetConfig(t);
  }
  GetPhantomBattleCardByActivityId(t) {
    return PhantomBattleCardByActivityId_1.configPhantomBattleCardByActivityId.GetConfigList(t);
  }
  GetAllPhantomBattleCard() {
    return PhantomBattleCardAll_1.configPhantomBattleCardAll.GetConfigList();
  }
  GetPhantomBattleSkillConfig(t) {
    return PhantomBattleSkillById_1.configPhantomBattleSkillById.GetConfig(t);
  }
  GetPhantomBattleBuffConfig(t) {
    return PhantomBattleBuffById_1.configPhantomBattleBuffById.GetConfig(t);
  }
  GetPhantomBattleFactorConfig(t) {
    return PhantomBattleFactorById_1.configPhantomBattleFactorById.GetConfig(t);
  }
  GetPhantomBattleAllFactor() {
    return PhantomBattleFactorAll_1.configPhantomBattleFactorAll.GetConfigList();
  }
  GetPhantomBattleEntryConfig(t) {
    return PhantomBattleEntryById_1.configPhantomBattleEntryById.GetConfig(t);
  }
  GetPhantomBattleElementConfig(t) {
    return PhantomBattleCardElementById_1.configPhantomBattleCardElementById.GetConfig(t);
  }
  GetPhantomBattleEffectConfig(t) {
    return PhantomBattleCardEffectById_1.configPhantomBattleCardEffectById.GetConfig(t);
  }
  GetAllPhantomBattleCardFilter() {
    return PhantomBattleCardFilterAll_1.configPhantomBattleCardFilterAll.GetConfigList();
  }
  GetPhantomBattleCardFilter(t) {
    return PhantomBattleCardFilterById_1.configPhantomBattleCardFilterById.GetConfig(t);
  }
  GetAllPhantomBattleCardSlotSort() {
    return PhantomBattleCardSlotSortAll_1.configPhantomBattleCardSlotSortAll.GetConfigList();
  }
  GetPhantomBattleCardSlotSort(t) {
    return PhantomBattleCardSlotSortById_1.configPhantomBattleCardSlotSortById.GetConfig(t);
  }
  GetPhantomBattleActivityConfig(t) {
    return PhantomBattleActivityByActivityId_1.configPhantomBattleActivityByActivityId.GetConfig(t);
  }
  GetPhantomBattleChallenge(t) {
    return PhantomBattleChallengeById_1.configPhantomBattleChallengeById.GetConfig(t);
  }
  GetAllPhantomBattleBadge() {
    return PhantomBattleBadgeAll_1.configPhantomBattleBadgeAll.GetConfigList();
  }
  GetPhantomBattleBadgeById(t) {
    return PhantomBattleBadgeById_1.configPhantomBattleBadgeById.GetConfig(t);
  }
  GetPhantomBattleBadgeGroupIdById(t) {
    return this.GetPhantomBattleBadgeById(t).GroupId;
  }
  GetPhantomBattleBadgeGroupById(t) {
    return PhantomBattleBadgeGroupByGroupId_1.configPhantomBattleBadgeGroupByGroupId.GetConfig(t);
  }
  GetPhantomBattleMasterTitleById(t) {
    return PhantomBattleMasterTitleById_1.configPhantomBattleMasterTitleById.GetConfig(t);
  }
  GetCardSkillList(t, e, a) {
    var r = [];
    if (e && (e = t.ActiveSkillId) > 0) {
      r.push(e);
    }
    if (a) {
      r.push(...t.PassiveSkillId);
    }
    return r;
  }
  GetPhantomBattleCardRole(t) {
    return PhantomBattleCardRoleById_1.configPhantomBattleCardRoleById.GetConfig(t);
  }
  GetPhantomBattleCardRoleByActivityId(t) {
    return PhantomBattleCardRoleByActivityId_1.configPhantomBattleCardRoleByActivityId.GetConfigList(t);
  }
  GetDeckDefaultName() {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PhantomBattle_1038");
  }
  GetPhantomBattleNpc(t) {
    return PhantomBattleNPCById_1.configPhantomBattleNPCById.GetConfig(t);
  }
  GetPhantomBattleNpcList(t) {
    return PhantomBattleNPCByGroupId_1.configPhantomBattleNPCByGroupId.GetConfigList(t);
  }
  GetCardListByDeckConfigId(t) {
    return PhantomBattleCardGroupByGroupId_1.configPhantomBattleCardGroupByGroupId.GetConfigList(t);
  }
  GetDeckConfigInfo(t) {
    return PhantomBattleCardGroupInfoById_1.configPhantomBattleCardGroupInfoById.GetConfig(t);
  }
  GetPhantomBattleChallengeConfig(t) {
    return PhantomBattleChallengeById_1.configPhantomBattleChallengeById.GetConfig(t);
  }
  GetPhantomBattleGymConfig(t) {
    return PhantomBattleGymByActivityId_1.configPhantomBattleGymByActivityId.GetConfigList(t);
  }
  GetRepeatGymExpWeekLimitByLevel(t) {
    return PhantomBattleWeekExpById_1.configPhantomBattleWeekExpById.GetConfig(t)?.MaxWeekExp ?? 0;
  }
  GetPhantomBattleGymConfigByLevel(t, e) {
    for (const a of this.GetPhantomBattleGymConfig(t)) {
      if (a.Level === e) {
        return a;
      }
    }
  }
  GetPhantomBattleMasterLevelConfigById(t) {
    var e = PhantomBattleMasterLevelById_1.configPhantomBattleMasterLevelById.GetConfig(t);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 75, "获取召唤师等级配置失败", ["ConfigId", t]);
      }
    }
    return e;
  }
  GetPhantomBattleMasterLevelByLevelAndActivityId(t, e) {
    for (const a of PhantomBattleMasterLevelAll_1.configPhantomBattleMasterLevelAll.GetConfigList()) {
      if (a.Level === t && a.ActivityId === e) {
        return a;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 71, "获取召唤师等级配置失败", ["level", t], ["activityId", e]);
    }
  }
  GetPhantomBattleMasterLevelConfigByActivityId(t) {
    var e = [];
    for (const a of PhantomBattleMasterLevelAll_1.configPhantomBattleMasterLevelAll.GetConfigList()) {
      if (a.ActivityId === t) {
        e.push(a);
      }
    }
    return e;
  }
  GetPhantomBattleMasterLevelConfigByLevel(t, e) {
    for (const a of PhantomBattleMasterLevelAll_1.configPhantomBattleMasterLevelAll.GetConfigList()) {
      if (a.ActivityId === t && a.Level === e) {
        return a;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 75, "获取召唤师等级配置失败", ["ActivityId", t], ["Level", e]);
    }
  }
  GetPhantomBattleChallengeIdListByGymId(t, e) {
    var a = PhantomBattleChallengeByActivityGymId_1.configPhantomBattleChallengeByActivityGymId.GetConfigList(t, e);
    if (!a || a.length <= 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("PhantomArena", 75, "获取道馆的挑战列表失败，请检查PhantomBattleChallenge表", ["ActivityId", t], ["GymId", e]);
      }
      return [];
    }
    var r = [];
    for (const o of a) {
      r.push(o.Id);
    }
    return r;
  }
  GetPhantomBattleCardRewardById(t) {
    t = PhantomBattleCardRewardById_1.configPhantomBattleCardRewardById.GetConfig(t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 75, "获取卡牌奖励列表失败，请检查PhantomBattleCardReward表", ["ConfigId", t]);
      }
    }
    return t;
  }
  GetPhantomBattleBadgeRewardById(t) {
    t = PhantomBattleBadgeRewardById_1.configPhantomBattleBadgeRewardById.GetConfig(t);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 75, "获取卡牌奖励列表失败，请检查PhantomBattleBadgeReward表", ["ConfigId", t]);
      }
    }
    return t;
  }
  GetPhantomBattleCardRewardIdList(t) {
    var e = PhantomBattleCardRewardByActivityId_1.configPhantomBattleCardRewardByActivityId.GetConfigList(t);
    if (!e || e.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 75, "获取卡牌奖励列表失败，请检查PhantomBattleCardReward表", ["ActivityId", t]);
      }
      return [];
    }
    var a = [];
    for (const r of e.slice().sort(this.ttu)) {
      a.push(r.Id);
    }
    return a;
  }
  GetPhantomBattleBadgeRewardIdList(t) {
    var e = PhantomBattleBadgeRewardByActivityId_1.configPhantomBattleBadgeRewardByActivityId.GetConfigList(t);
    if (!e || e.length <= 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("PhantomArena", 75, "获取卡牌奖励列表失败，请检查PhantomBattleBadgeReward表", ["ActivityId", t]);
      }
      return [];
    }
    var a = [];
    for (const r of e.slice().sort(this.ttu)) {
      a.push(r.Id);
    }
    return a;
  }
  GetQuicklyBuildDeckList(t) {
    return this.GetPhantomBattleActivityConfig(t).QuicklyBuild;
  }
  GetSlotLongPressTime(t) {
    return this.GetPhantomBattleActivityConfig(t).SlotLongPressTime;
  }
  GetSlotLongPressStartTime(t) {
    return this.GetPhantomBattleActivityConfig(t).SlotLongPressStartTime;
  }
  GetSlotLongPressEndTime(t) {
    return this.GetPhantomBattleActivityConfig(t).SlotLongPressEndTime;
  }
  GetPhantomBattleDialog(t) {
    return PhantomBattleDialogById_1.configPhantomBattleDialogById.GetConfig(t);
  }
  GetPhantomArenaOwnSpeakerId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomArenaOwnSpeakerId");
  }
  GetPhantomArenaOpponentSpeakerId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomArenaOpponentSpeakerId");
  }
  GetPhantomArenaCardCoreCost() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomBattleKeyCost");
  }
  GetPhantomArenaRoundOverCheck() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PhantomArenaRoundOverCheck");
  }
  GetPhantomArenaFourTask(t) {
    return PhantomBattleFourCTaskByCardId_1.configPhantomBattleFourCTaskByCardId.GetConfig(t);
  }
  GetTaskConfigById(t) {
    return PhantomBattleTaskByTaskId_1.configPhantomBattleTaskByTaskId.GetConfig(t);
  }
  GetSeqConfig(t) {
    return PhantomBattleWinSeqById_1.configPhantomBattleWinSeqById.GetConfig(t);
  }
  GetTaskTabConfigById(t) {
    return PhantomBattleTaskTabById_1.configPhantomBattleTaskTabById.GetConfig(t);
  }
  GetCardSlotItemLongPressOffsetX() {
    if (Info_1.Info.IsInTouch()) {
      return CommonParamById_1.configCommonParamById.GetFloatConfig("BvbVisionScrollerOffsetX");
    } else {
      return 0;
    }
  }
  GetCardSlotItemLongPressOffsetY() {
    if (Info_1.Info.IsInTouch()) {
      return CommonParamById_1.configCommonParamById.GetFloatConfig("BvbVisionScrollerOffsetY");
    } else {
      return 0;
    }
  }
  GetPhantomBattleChallengeByMarkId(t) {
    return PhantomBattleChallengeByMarkId_1.configPhantomBattleChallengeByMarkId.GetConfig(t);
  }
  GetPhantomBattleMapParamByMapId(t) {
    return PhantomBattleMapParamByMapId_1.configPhantomBattleMapParamByMapId.GetConfig(t);
  }
}
exports.PhantomArenaConfig = PhantomArenaConfig;
//# sourceMappingURL=PhantomArenaConfig.js.map