"use strict";

var __decorate = this && this.__decorate || function (t, e, o, s) {
  var i;
  var n = arguments.length;
  var r = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, o) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, o, s);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (i = t[a]) {
        r = (n < 3 ? i(r) : n > 3 ? i(e, o, r) : i(e, o)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(e, o, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLockConditionClickLogData = exports.ActivityViewJumpClickLogData = exports.ActivityTabViewOpenLogData = exports.ActivityViewOpenLogData = exports.ExploreToolGeneralUseLogData = exports.FollowShooterUseLogData = exports.ScanSkillUseLogData = exports.ManipulateSkillUseLogData = exports.HookSkillUseLogData = exports.ExploreToolItemUseLogData = exports.ExploreToolEquipLogData = exports.ExploreToolSwitchLogData = exports.ExploreToolUseLogData = exports.ExploreToolAssemblyLogData = exports.SettingMenuLogData = exports.PlayFlowLogData = exports.DefaultFilterLogEvent = exports.SettingMenuLogEvent = exports.PhotographerLogData = exports.AdviceWatchLogData = exports.QuestDiscoverLogData = exports.ReconvProcessLink = exports.LoginProcessLink = exports.DeathRecord = exports.ElevatorUsedRecord = exports.TriggerBuffDamageRecord = exports.InstMonsterSkillReportLog = exports.InstReactionLogRecord = exports.InstRoleSkillReportLog = exports.InstMonsterStateRecord = exports.InstRoleStateRecord = exports.InstFightEndRecord = exports.InstFightStartRecord = exports.ReactionRecord = exports.ReactionLogRecord = exports.MonsterSkillRecord = exports.MonsterSkillReportLog = exports.RoleSkillRecord = exports.RoleSkillReportLog = exports.MonsterStateRecord = exports.RoleStateRecord = exports.BattleEndLogData = exports.MonsterInfoLogData = exports.TeamCharacterLogData = exports.BattleStartLogData = exports.HangUpTimeLogData = exports.AssemblyLogData = exports.PlayerCommonLogData = exports.CommonLogData = exports.PresetProperties = undefined;
exports.UiInteractChatLogEvent = exports.UiInteractRouletteLogEvent = exports.UiInteractSpaceKeyLogEvent = exports.ParallelDownloadConfirmBoxOperation = exports.AutoShowParallelDownloadConfirmBox = exports.MotorSummonGetOnLogEvent = exports.MotorDriftLogEvent = exports.MotorFirstSightLogEvent = exports.MotorSkillLogEvent = exports.HoldHandSitDownLogEvent = exports.HoldHandExitLogEvent = exports.HoldHandEnterLogEvent = exports.ShipTowerSwitch = exports.KingShipLogEvent = exports.LifePointDrawLogEvent = exports.ClickTermExplanationEvent = exports.EnterViewWithTermsEvent = exports.PhantomArenaDeckUpdateEvent = exports.GachaRecordClickLogEvent = exports.NoticeClickLogEvent = exports.GameInformationClickLogEvent = exports.SubPackageClearSpaceFinishLogEvent = exports.SubPackageClearSpaceLogEvent = exports.SubPackageOutOfSpaceLogEvent = exports.SubPackageDownLoadLogEvent = exports.SubPackageKeySubPackageLogEvent = exports.DownloadVideoResNotEnoughSpaceLogData = exports.DownloadVideoResLogData = exports.CiacconaEnterMainViewLogEvent = exports.PreDownloadDownloadNoSpaceBeforeStartRecord = exports.PreDownloadDownloadModeSuccessRecord = exports.PreDownloadPauseRecord = exports.PreDownloadDownloadModeSwitchRecord = exports.PreDownloadEntranceRecord = exports.BirthdayRepeatEnterEvent = exports.BirthdaySelectRoleEvent = exports.LinkageClickGoEvent = exports.LinkageSwitchModuleEvent = exports.SdkStartReview = exports.ShareEvent = exports.MailBindJumpToWebViewEvent = exports.MailBindClickEvent = exports.GamepadActiveEvent = exports.SdkPayGetServerBillEvent = exports.FailSdkPayEvent = exports.SuccessSdkPayEvent = exports.StartSdkPayEvent = exports.ActivityPreheatLogData = exports.ActivityRegressLogData = exports.ActivityRecallLogData = undefined;
exports.GuessJokerExitSaveReport = exports.FurnitureSaveLogEvent = exports.FurniturePlaceDiffLogData = exports.FurniturePlaceLogData = exports.FurnitureDesignLogEvent = exports.DrinksGameplayResultLogEvent = exports.DrinksGameplayInviteLogEvent = exports.OnBattlePassOperationLogEvent = exports.OnClickBattlePassTabViewLogEvent = exports.OnClickRechargeItemLogEvent = exports.OnClickPayShopItemLogEvent = exports.OnOpenGiftPackageDetailsViewLogEvent = exports.OnClickRecommendSkinButtonLogEvent = exports.OnClickPayShopTabLogEvent = exports.OnClickFunctionViewButtonLogEvent = exports.OnClickGachaTryRoleLogEvent = exports.OnClickGachaOperationLogEvent = exports.OnClickGachaScrollLogEvent = exports.OnClickAddCurrencyLogEvent = exports.FindSunSpiritFinishLogEvent = exports.FindSunSpiritStartLogEvent = exports.ExploreEntityLogEvent = exports.MotorcycleMusicPlayLogEvent = exports.PhonographPlayLogEvent = exports.OnClickActivityCategorytab = exports.OnJumpInShortMessageLogEvent = exports.OnSelectShortMessageLogEvent = exports.OnOpenPhoneViewLogEvent = exports.ArtemisLevelUnlockLogEvent = exports.NextVersionContentLogEvent = exports.ActivityPreWarmStayLogEvent = exports.ActivityPreWarmOpenLogEvent = exports.CustomServiceLogEvent = exports.QuestTreeEnterLogEvent = exports.QuestViewEnterLogEvent = exports.FightPhotoTimeDilationLogEvent = exports.FightPhotoTakePhotoLogEvent = exports.RoleSkillInputLogEvent = exports.RoleSkillTreeLogEvent = exports.RoleDevLogEvent = undefined;
const UE = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const TimeUtil_1 = require("../../Common/TimeUtil");
const PROJECT_ID = "Aki";
const EVENT_ID_REGISTRY = new Map();
function CheckEventIdUnique(...s) {
  return function (t) {
    for (const o of s) {
      var e = EVENT_ID_REGISTRY.get(o);
      if (e && e.length > 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LogReport", 10, "检测到LogReport事件id重复", ["事件id", o], ["已有事件名", e], ["新增事件名", t.name]);
        }
        e.push(t.name);
      } else {
        EVENT_ID_REGISTRY.set(o, [t.name]);
      }
    }
    return t;
  };
}
class PresetProperties extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.system_language = "";
    this.os_version = "";
    this.device_id = "";
    this.screen_height = "";
    this.screen_width = "";
  }
}
exports.PresetProperties = PresetProperties;
class CommonLogData extends Json_1.JsonObjBase {
  constructor() {
    super();
    this.event_id = "";
    this.event_uuid = "";
    this.client_version = "";
    this.project_id = PROJECT_ID;
    this.platform = "";
    this.event_uuid = UE.KismetGuidLibrary.NewGuid().ToString();
  }
}
class PlayerCommonLogData extends (exports.CommonLogData = CommonLogData) {
  constructor() {
    super();
    this.player_id = "";
    this.unique_id = "";
    this.world_level = "";
    this.player_level = "";
    this.region = "";
    this.client_platform = "";
    this.net_status = "";
    this.device_id = "";
    this.world_own_id = "";
  }
}
exports.PlayerCommonLogData = PlayerCommonLogData;
class AssemblyLogData {
  constructor() {
    this.SendTimePeriod = 0;
    this.SendTimeAccumulate = 0;
  }
}
exports.AssemblyLogData = AssemblyLogData;
let HangUpTimeLogData = class HangUpTimeLogData extends PlayerCommonLogData {
  constructor() {
    super();
    this.f_hang_up_time = "";
    this.event_id = "7";
  }
};
HangUpTimeLogData = __decorate([CheckEventIdUnique("7")], HangUpTimeLogData);
exports.HangUpTimeLogData = HangUpTimeLogData;
let BattleStartLogData = class BattleStartLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "102704";
    this.i_area_id = 0;
    this.f_x = 0;
    this.f_y = 0;
    this.f_z = 0;
    this.s_battle_id = "";
    this.s_team_character = undefined;
    this.s_team_hp_per = undefined;
  }
};
BattleStartLogData = __decorate([CheckEventIdUnique("102704")], BattleStartLogData);
exports.BattleStartLogData = BattleStartLogData;
class TeamCharacterLogData {}
exports.TeamCharacterLogData = TeamCharacterLogData;
class MonsterInfoLogData {
  constructor(t) {
    this.pbdata_id = 0;
    this.config_type = 0;
    if (t) {
      this.pbdata_id = t.pbdata_id;
      this.config_type = t.config_type;
    }
  }
}
exports.MonsterInfoLogData = MonsterInfoLogData;
let BattleEndLogData = class BattleEndLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "102705";
    this.i_area_id = 0;
    this.f_x = 0;
    this.f_y = 0;
    this.f_z = 0;
    this.s_battle_id = "";
    this.s_team_character = new Array();
    this.s_team_hp_per = new Array();
    this.s_monster_hate = new Array();
    this.s_death_monster = new Array();
    this.s_run_monster = new Array();
    this.i_result = 0;
    this.i_death_role_count = 0;
    this.i_revive_times = 0;
    this.i_change_character_times = 0;
    this.i_qte_times = 0;
    this.l_acc_damage = 0;
    this.l_acc_shield_damage = 0;
    this.l_acc_self_damage = 0;
    this.l_acc_skill_heal = 0;
    this.l_acc_item_heal = 0;
    this.i_stop_times = 0;
    this.i_damage_max = 0;
    this.i_acc_dodge_times = 0;
    this.i_dodge_succ_times = 0;
    this.i_non_character_damage = 0;
    this.i_non_character_shield_damage = 0;
    this.i_cost_time = 0;
    this.i_counter_attack_times = 0;
    this.i_bullet_rebound_times = 0;
    this.i_move_duration = -0;
    this.i_swim_duration = -0;
    this.i_glide_duration = -0;
    this.i_climb_duration = -0;
    this.i_behit_duration = -0;
    this.i_skill_duration = -0;
    this.i_dash_duration = -0;
    this.i_other_duration = -0;
  }
};
BattleEndLogData = __decorate([CheckEventIdUnique("102705")], BattleEndLogData);
exports.BattleEndLogData = BattleEndLogData;
let RoleStateRecord = class RoleStateRecord extends PlayerCommonLogData {
  constructor(t) {
    super();
    this.event_id = "102700";
    this.s_battle_id = "";
    this.i_role_id = 0;
    this.i_role_type = 0;
    this.i_role_level = 0;
    this.i_role_quality = 0;
    this.i_role_reson = 0;
    this.i_vision_skill_id = 0;
    this.i_vision_skill_level = 0;
    this.i_weapon_id = 0;
    this.i_weapon_type = 0;
    this.i_weapon_quality = 0;
    this.i_weapon_level = 0;
    this.i_hp_max = 0;
    this.i_begin_hp = 0;
    this.i_end_hp = 0;
    this.i_death_times = 0;
    this.i_revive_times = 0;
    this.l_acc_damage = 0;
    this.l_acc_shield_damage = 0;
    this.TotalGetDamage = 0;
    this.TotalGetDamageTimes = 0;
    this.l_acc_heal_self = 0;
    this.l_acc_heal_other = 0;
    this.l_acc_item_heal = 0;
    this.i_acc_dodge_times = 0;
    this.i_dodge_succ_times = 0;
    this.i_enter_times = 0;
    this.i_leave_times = 0;
    this.LastGoToBattleTimePoint = 0;
    this.i_acc_time = 0;
    this.i_use_item_count = 0;
    this.i_counter_attack_times = 0;
    this.i_bullet_rebound_times = 0;
    this.i_full_element_times = 0;
    this.l_acc_element = 0;
    this.i_full_energy_times = 0;
    this.l_acc_energy = 0;
    this.i_team_position = 0;
    this.i_enter_battle_score = 0;
    this.s_role_skill = undefined;
    this.s_phantom_battle_data = undefined;
    this.s_phantom_fetter_list = undefined;
    this.i_main_page = 0;
    this.i_sub_page = 0;
    this.i_role_id = t;
  }
};
RoleStateRecord = __decorate([CheckEventIdUnique("102700")], RoleStateRecord);
exports.RoleStateRecord = RoleStateRecord;
let MonsterStateRecord = class MonsterStateRecord extends PlayerCommonLogData {
  constructor(t, e) {
    super();
    this.event_id = "102701";
    this.s_battle_id = "";
    this.i_monster_id = 0;
    this.i_monster_level = 0;
    this.i_kill_role_times = 0;
    this.l_acc_damage = 0;
    this.l_acc_shield_damage = 0;
    this.l_acc_heal_other = 0;
    this.l_acc_heal_self = 0;
    this.i_monster_result = Protocol_1.Aki.Protocol.x4s.Proto_MonsterResultRun;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
    this.InitTime = 0;
    this.i_acc_time = 0;
    this.i_counter_attack_times = 0;
    this.i_monster_score = 0;
    this.l_acc_hardness = 0;
    this.l_acc_rage = 0;
    this.l_acc_rage_normal = 0;
    this.l_acc_rage_counter = 0;
    this.l_acc_rage_vision = 0;
    this.l_acc_rage_other = 0;
    this.s_pb_model_config_id = "";
    this.i_paralysis_times = 0;
    this.i_bullet_rebound_times = 0;
    this.l_acc_be_damaged = 0;
    this.l_acc_part_destroy = 0;
    this.l_acc_weakness = 0;
    this.i_from_quest = 0;
    this.i_from_play = 0;
    this.i_monster_id = t;
    this.s_pb_model_config_id = e;
  }
};
MonsterStateRecord = __decorate([CheckEventIdUnique("102701")], MonsterStateRecord);
exports.MonsterStateRecord = MonsterStateRecord;
let RoleSkillReportLog = class RoleSkillReportLog extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "102702";
    this.s_battle_id = "";
    this.i_role_id = 0;
    this.i_role_level = 0;
    this.i_role_quality = 0;
    this.s_reports = "";
  }
};
RoleSkillReportLog = __decorate([CheckEventIdUnique("102702")], RoleSkillReportLog);
exports.RoleSkillReportLog = RoleSkillReportLog;
class RoleSkillRecord extends Json_1.JsonObjBase {
  constructor(t) {
    super();
    this.skill_id = 0;
    this.use_count = 0;
    this.hit_count = 0;
    this.real_hit_count = 0;
    this.damage = 0;
    this.skill_type = 0;
    this.acc_energy = 0;
    this.skill_id = t;
  }
}
exports.RoleSkillRecord = RoleSkillRecord;
let MonsterSkillReportLog = class MonsterSkillReportLog extends PlayerCommonLogData {
  constructor(t, e) {
    super();
    this.event_id = "102803";
    this.s_battle_id = "";
    this.i_monster_id = 0;
    this.i_monster_level = 0;
    this.s_pb_model_config_id = "";
    this.s_reports = "";
    this.i_monster_id = t;
    this.s_pb_model_config_id = e;
  }
};
MonsterSkillReportLog = __decorate([CheckEventIdUnique("102803")], MonsterSkillReportLog);
exports.MonsterSkillReportLog = MonsterSkillReportLog;
class MonsterSkillRecord extends Json_1.JsonObjBase {
  constructor(t) {
    super();
    this.skill_id = 0;
    this.use_count = 0;
    this.hit_count = 0;
    this.real_hit_count = 0;
    this.damage = 0;
    this.counter_attack_times = 0;
    this.bullet_rebound_times = 0;
    this.dodge_succ_times = 0;
    this.skill_id = t;
  }
}
exports.MonsterSkillRecord = MonsterSkillRecord;
let ReactionLogRecord = class ReactionLogRecord extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "102703";
    this.s_battle_id = "";
    this.s_reports = "";
  }
};
ReactionLogRecord = __decorate([CheckEventIdUnique("102703")], ReactionLogRecord);
exports.ReactionLogRecord = ReactionLogRecord;
class ReactionRecord extends Json_1.JsonObjBase {
  constructor(t, e) {
    super();
    this.role_id = 0;
    this.reaction = 0;
    this.trigger_count = 0;
    this.damage = 0;
    this.role_id = t;
    this.reaction = e;
  }
}
exports.ReactionRecord = ReactionRecord;
let InstFightStartRecord = class InstFightStartRecord extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "102800";
    this.i_inst_id = 0;
    this.s_fight_id = "";
    this.s_fight_roles = "";
    this.i_start_time = 0;
    this.i_area_index = 0;
  }
  Clear() {
    this.i_start_time = 0;
    this.i_area_index = 0;
  }
};
InstFightStartRecord = __decorate([CheckEventIdUnique("102800")], InstFightStartRecord);
exports.InstFightStartRecord = InstFightStartRecord;
let InstFightEndRecord = class InstFightEndRecord extends PlayerCommonLogData {
  constructor() {
    super();
    this.event_id = "102801";
    this.i_inst_id = 0;
    this.s_fight_roles = "";
    this.s_fight_id = "";
    this.i_result = 0;
    this.i_reason = 0;
    this.i_inst_use_time = 0;
    this.i_fight_use_time = 0;
    this.l_acc_damage = 0;
    this.l_acc_shield_damage = 0;
    this.l_acc_self_damage = 0;
    this.l_acc_skill_heal = 0;
    this.l_acc_item_heal = 0;
    this.i_stop_times = 0;
    this.i_damage_max = 0;
    this.i_acc_dodge_times = 0;
    this.i_dodge_succ_times = 0;
    this.i_death_role_count = 0;
    this.i_revive_times = 0;
    this.i_counter_attack_times = 0;
    this.i_bullet_rebound_times = 0;
    this.i_move_duration = 0;
    this.i_swim_duration = 0;
    this.i_glide_duration = 0;
    this.i_climb_duration = 0;
    this.i_behit_duration = 0;
    this.i_skill_duration = 0;
    this.i_dash_duration = 0;
    this.i_other_duration = 0;
    this.i_area_index = 0;
    this.i_inst_id = 0;
    this.s_fight_roles = "";
    this.s_fight_id = "";
    this.i_result = 0;
    this.i_reason = 0;
    this.i_inst_use_time = 0;
    this.i_fight_use_time = 0;
    this.l_acc_self_damage = 0;
    this.l_acc_damage = 0;
    this.l_acc_shield_damage = 0;
    this.l_acc_skill_heal = 0;
    this.l_acc_item_heal = 0;
    this.i_acc_dodge_times = 0;
    this.i_dodge_succ_times = 0;
    this.i_stop_times = 0;
    this.i_damage_max = 0;
    this.i_death_role_count = 0;
    this.i_revive_times = 0;
    this.i_counter_attack_times = 0;
    this.i_bullet_rebound_times = 0;
  }
  Clear() {
    this.i_inst_id = 0;
    this.s_fight_roles = "";
    this.s_fight_id = "";
    this.i_result = 0;
    this.i_reason = 0;
    this.i_inst_use_time = 0;
    this.i_fight_use_time = 0;
    this.l_acc_self_damage = 0;
    this.l_acc_damage = 0;
    this.l_acc_shield_damage = 0;
    this.l_acc_skill_heal = 0;
    this.l_acc_item_heal = 0;
    this.i_acc_dodge_times = 0;
    this.i_dodge_succ_times = 0;
    this.i_stop_times = 0;
    this.i_damage_max = 0;
    this.i_death_role_count = 0;
    this.i_revive_times = 0;
    this.i_counter_attack_times = 0;
    this.i_bullet_rebound_times = 0;
    this.i_move_duration = 0;
    this.i_swim_duration = 0;
    this.i_glide_duration = 0;
    this.i_climb_duration = 0;
    this.i_behit_duration = 0;
    this.i_skill_duration = 0;
    this.i_dash_duration = 0;
    this.i_other_duration = 0;
    this.i_area_index = 0;
  }
};
InstFightEndRecord = __decorate([CheckEventIdUnique("102801")], InstFightEndRecord);
exports.InstFightEndRecord = InstFightEndRecord;
let InstRoleStateRecord = class InstRoleStateRecord extends RoleStateRecord {
  constructor(t, e, o) {
    super(t);
    this.event_id = "102804";
    this.i_inst_id = 0;
    this.s_fight_id = "";
    this.i_inst_id = e;
    this.s_fight_id = o;
  }
};
InstRoleStateRecord = __decorate([CheckEventIdUnique("102804")], InstRoleStateRecord);
exports.InstRoleStateRecord = InstRoleStateRecord;
let InstMonsterStateRecord = class InstMonsterStateRecord extends MonsterStateRecord {
  constructor(t, e, o, s) {
    super(t, e);
    this.event_id = "102805";
    this.i_inst_id = 0;
    this.s_fight_id = "";
    this.i_inst_id = o;
    this.s_fight_id = s;
  }
};
InstMonsterStateRecord = __decorate([CheckEventIdUnique("102805")], InstMonsterStateRecord);
exports.InstMonsterStateRecord = InstMonsterStateRecord;
let InstRoleSkillReportLog = class InstRoleSkillReportLog extends RoleSkillReportLog {
  constructor(t, e) {
    super();
    this.event_id = "102806";
    this.i_inst_id = 0;
    this.s_fight_id = "";
    this.i_inst_id = t;
    this.s_fight_id = e;
  }
};
InstRoleSkillReportLog = __decorate([CheckEventIdUnique("102806")], InstRoleSkillReportLog);
exports.InstRoleSkillReportLog = InstRoleSkillReportLog;
let InstReactionLogRecord = class InstReactionLogRecord extends ReactionLogRecord {
  constructor(t, e) {
    super();
    this.event_id = "102807";
    this.i_inst_id = 0;
    this.s_fight_id = "";
    this.i_inst_id = t;
    this.s_fight_id = e;
  }
};
InstReactionLogRecord = __decorate([CheckEventIdUnique("102807")], InstReactionLogRecord);
exports.InstReactionLogRecord = InstReactionLogRecord;
let InstMonsterSkillReportLog = class InstMonsterSkillReportLog extends MonsterSkillReportLog {
  constructor(t, e, o, s) {
    super(t, e);
    this.event_id = "102808";
    this.i_inst_id = 0;
    this.s_fight_id = "";
    this.i_inst_id = o;
    this.s_fight_id = s;
  }
};
InstMonsterSkillReportLog = __decorate([CheckEventIdUnique("102808")], InstMonsterSkillReportLog);
exports.InstMonsterSkillReportLog = InstMonsterSkillReportLog;
let TriggerBuffDamageRecord = class TriggerBuffDamageRecord extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "6";
    this.i_area_id = "";
    this.s_buff_id = "";
    this.f_time = "";
    this.f_player_pos_x = "";
    this.f_player_pos_y = "";
    this.f_player_pos_z = "";
    this.i_damage = "";
  }
};
TriggerBuffDamageRecord = __decorate([CheckEventIdUnique("6")], TriggerBuffDamageRecord);
exports.TriggerBuffDamageRecord = TriggerBuffDamageRecord;
let ElevatorUsedRecord = class ElevatorUsedRecord extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "11";
    this.i_area_id = "";
    this.i_config_id = "";
    this.i_state_id = "";
    this.f_player_pos_x = "";
    this.f_player_pos_y = "";
    this.f_player_pos_z = "";
  }
};
ElevatorUsedRecord = __decorate([CheckEventIdUnique("11")], ElevatorUsedRecord);
exports.ElevatorUsedRecord = ElevatorUsedRecord;
let DeathRecord = class DeathRecord extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "102706";
    this.i_area_id = 0;
    this.i_area_level = 0;
    this.f_x = 0;
    this.f_y = 0;
    this.f_z = 0;
    this.i_death_role_id = 0;
    this.i_death_reason = 0;
  }
};
DeathRecord = __decorate([CheckEventIdUnique("102706")], DeathRecord);
exports.DeathRecord = DeathRecord;
let LoginProcessLink = class LoginProcessLink extends CommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "18000";
    this.s_trace_id = "";
    this.s_user_id = "";
    this.s_user_name = "";
    this.s_login_step = "";
    this.s_app_version = "";
    this.s_launcher_version = "";
    this.s_resource_version = "";
    this.s_client_version = "";
    this.i_error_code = 0;
    this.s_cpu_info = "";
    this.s_device_info = "";
    this.s_driver_date = "";
    this.s_device_id = "";
    this.s_command_line = "";
    this.s_os = "";
    this.s_os_version = "";
  }
};
LoginProcessLink = __decorate([CheckEventIdUnique("18000")], LoginProcessLink);
exports.LoginProcessLink = LoginProcessLink;
let ReconvProcessLink = class ReconvProcessLink extends CommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "18001";
    this.s_trace_id = "";
    this.s_player_id = "";
    this.s_user_id = "";
    this.s_user_name = "";
    this.s_reconv_step = "";
    this.s_app_version = "";
    this.s_launcher_version = "";
    this.s_resource_version = "";
    this.s_client_version = "";
    this.i_error_code = 0;
  }
};
ReconvProcessLink = __decorate([CheckEventIdUnique("18001")], ReconvProcessLink);
exports.ReconvProcessLink = ReconvProcessLink;
let QuestDiscoverLogData = class QuestDiscoverLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1007";
    this.i_quest_id = 0;
    this.i_quest_type = 0;
    this.i_icon_distance = 0;
    this.i_area_id = 0;
    this.i_father_area_id = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
  }
};
QuestDiscoverLogData = __decorate([CheckEventIdUnique("1007")], QuestDiscoverLogData);
exports.QuestDiscoverLogData = QuestDiscoverLogData;
let AdviceWatchLogData = class AdviceWatchLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1008";
    this.l_advice_id = " ";
    this.o_content = undefined;
    this.i_creator_id = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
    this.i_area_id = 0;
    this.i_father_area_id = 0;
    this.i_expression = 0;
    this.i_motion = 0;
  }
};
AdviceWatchLogData = __decorate([CheckEventIdUnique("1008")], AdviceWatchLogData);
exports.AdviceWatchLogData = AdviceWatchLogData;
let PhotographerLogData = class PhotographerLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.i_area_id = 0;
    this.i_father_area_id = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
    this.i_motion = 0;
    this.i_expression = 0;
    this.i_role_id = 0;
    this.i_shot_option = 0;
    this.i_self_option = 0;
    this.i_info_option = 0;
    this.i_dof_option = 0;
    this.i_filter_id = 0;
  }
};
PhotographerLogData = __decorate([CheckEventIdUnique("1009")], PhotographerLogData);
exports.PhotographerLogData = PhotographerLogData;
let SettingMenuLogEvent = class SettingMenuLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1017";
    this.i_image_quality = 0;
    this.i_display_mode = 0;
    this.s_resolution = "";
    this.i_brightness = 0;
    this.i_highest_fps = 0;
    this.i_shadow_quality = 0;
    this.i_niagara_quality = 0;
    this.i_fsr = 0;
    this.i_image_detail = 0;
    this.i_scene_ao = 0;
    this.i_volume_Fog = 0;
    this.i_volume_light = 0;
    this.i_motion_blur = 0;
    this.i_anti_aliasing = 0;
    this.i_pcv_sync = 0;
    this.i_horizontal_view_sensitivity = 0;
    this.i_vertical_view_sensitivity = 0;
    this.i_aim_horizontal_view_sensitivity = 0;
    this.i_aim_vertical_view_sensitivity = 0;
    this.f_camera_shake_strength = 0;
    this.i_common_spring_arm_length = 0;
    this.i_fight_spring_arm_length = 0;
    this.i_reset_focus_enable = 0;
    this.i_side_step_camera_enable = 0;
    this.i_soft_lock_camera_enable = 0;
    this.i_joystick_shake_strength = 0;
    this.i_joystick_shake_type = 0;
    this.f_walk_or_run_rate = 0;
    this.i_advice_setting = 0;
    this.i_enemy_id = 0;
    this.i_filter_list = "";
    this.i_image_mode = 0;
    this.eyeprotect_mode = 0;
    this.eyeprotect_list = "";
    this.i_crowd_density = 0;
    this.i_hit_material_effects = 0;
    this.i_auto_adjust = 0;
    this.i_damage_numbers = 0;
    this.i_fluttering_animation = 0;
    this.i_cinematic_quality = 0;
    this.i_teammate_effects = 0;
    this.i_injury_effects = 0;
    this.i_environment_interaction = 0;
    this.i_foliage_blur = 0;
    this.i_auto_exposure = 0;
    this.i_hdr = 0;
    this.i_ui_Brightness = 0;
    this.i_peak_Brightness = 0;
  }
};
SettingMenuLogEvent = __decorate([CheckEventIdUnique("1017")], SettingMenuLogEvent);
exports.SettingMenuLogEvent = SettingMenuLogEvent;
let DefaultFilterLogEvent = class DefaultFilterLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1805";
  }
};
DefaultFilterLogEvent = __decorate([CheckEventIdUnique("1805")], DefaultFilterLogEvent);
exports.DefaultFilterLogEvent = DefaultFilterLogEvent;
let PlayFlowLogData = class PlayFlowLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1010";
    this.i_bubble_type = 0;
    this.s_flow_file = "";
    this.i_flow_id = 0;
    this.i_flow_status_id = 0;
    this.i_config_id = 0;
    this.i_area_id = 0;
    this.i_father_area_id = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
  }
};
PlayFlowLogData = __decorate([CheckEventIdUnique("1010")], PlayFlowLogData);
exports.PlayFlowLogData = PlayFlowLogData;
class SettingMenuLogData extends PlayerCommonLogData {}
exports.SettingMenuLogData = SettingMenuLogData;
class ExploreToolAssemblyLogData extends AssemblyLogData {
  constructor(t) {
    super();
    this.AssemblyId = "";
    this.AssemblyLogData = new ExploreToolUseLogData();
    this.SetLogDataToAssembly = t => {
      this.AssemblyLogData.o_report.push(t);
    };
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("LogReportPeriod_ExploreTool");
    this.SendTimePeriod = e * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.AssemblyLogData.i_tool_id = t;
    this.AssemblyId = "1026_" + t;
  }
  CheckIsSend() {
    return this.AssemblyLogData.o_report.length !== 0;
  }
  AfterSend() {
    this.AssemblyLogData.o_report.length = 0;
  }
}
exports.ExploreToolAssemblyLogData = ExploreToolAssemblyLogData;
let ExploreToolUseLogData = class ExploreToolUseLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1026";
    this.i_tool_id = "";
    this.o_report = [];
  }
};
ExploreToolUseLogData = __decorate([CheckEventIdUnique("1026")], ExploreToolUseLogData);
exports.ExploreToolUseLogData = ExploreToolUseLogData;
let ExploreToolSwitchLogData = class ExploreToolSwitchLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1011";
    this.i_explore_tool_id = 0;
    this.o_authorization = [];
  }
};
ExploreToolSwitchLogData = __decorate([CheckEventIdUnique("1011")], ExploreToolSwitchLogData);
exports.ExploreToolSwitchLogData = ExploreToolSwitchLogData;
let ExploreToolEquipLogData = class ExploreToolEquipLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1018";
    this.i_explore_tool_id = 0;
    this.o_authorization = [];
    this.i_item_id = 0;
    this.i_operation = 0;
    this.i_roulette_id = 0;
  }
};
ExploreToolEquipLogData = __decorate([CheckEventIdUnique("1018")], ExploreToolEquipLogData);
exports.ExploreToolEquipLogData = ExploreToolEquipLogData;
let ExploreToolItemUseLogData = class ExploreToolItemUseLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1015";
    this.i_father_area_id = 0;
    this.i_area_id = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
    this.i_item_id = 0;
  }
};
ExploreToolItemUseLogData = __decorate([CheckEventIdUnique("1015")], ExploreToolItemUseLogData);
exports.ExploreToolItemUseLogData = ExploreToolItemUseLogData;
let HookSkillUseLogData = class HookSkillUseLogData {
  constructor() {
    this.event_id = "1012";
    this.i_father_area_id = 0;
    this.i_area_id = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
    this.i_has_target = 0;
  }
};
HookSkillUseLogData = __decorate([CheckEventIdUnique("1012")], HookSkillUseLogData);
exports.HookSkillUseLogData = HookSkillUseLogData;
let ManipulateSkillUseLogData = class ManipulateSkillUseLogData {
  constructor() {
    this.event_id = "1013";
    this.i_father_area_id = 0;
    this.i_area_id = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
    this.i_has_target = 0;
  }
};
ManipulateSkillUseLogData = __decorate([CheckEventIdUnique("1013")], ManipulateSkillUseLogData);
exports.ManipulateSkillUseLogData = ManipulateSkillUseLogData;
let ScanSkillUseLogData = class ScanSkillUseLogData {
  constructor() {
    this.event_id = "1014";
    this.i_father_area_id = 0;
    this.i_area_id = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
    this.i_has_target = 0;
  }
};
ScanSkillUseLogData = __decorate([CheckEventIdUnique("1014")], ScanSkillUseLogData);
exports.ScanSkillUseLogData = ScanSkillUseLogData;
let FollowShooterUseLogData = class FollowShooterUseLogData {
  constructor() {
    this.event_id = "1025";
    this.i_father_area_id = 0;
    this.i_area_id = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
    this.i_has_target = 0;
  }
};
FollowShooterUseLogData = __decorate([CheckEventIdUnique("1025")], FollowShooterUseLogData);
exports.FollowShooterUseLogData = FollowShooterUseLogData;
class ExploreToolGeneralUseLogData {
  constructor() {
    this.event_id = "";
    this.i_father_area_id = 0;
    this.i_area_id = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
    this.i_skill_id = 0;
    this.i_entity_configId = 0;
  }
}
exports.ExploreToolGeneralUseLogData = ExploreToolGeneralUseLogData;
let ActivityViewOpenLogData = class ActivityViewOpenLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1019";
    this.i_open_way = 0;
  }
};
ActivityViewOpenLogData = __decorate([CheckEventIdUnique("1019")], ActivityViewOpenLogData);
exports.ActivityViewOpenLogData = ActivityViewOpenLogData;
let ActivityTabViewOpenLogData = class ActivityTabViewOpenLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1020";
    this.i_activity_id = 0;
    this.i_activity_type = 0;
    this.i_time_left = 0;
    this.i_unlock = 0;
    this.i_type = 0;
  }
};
ActivityTabViewOpenLogData = __decorate([CheckEventIdUnique("1020")], ActivityTabViewOpenLogData);
exports.ActivityTabViewOpenLogData = ActivityTabViewOpenLogData;
let ActivityViewJumpClickLogData = class ActivityViewJumpClickLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1021";
    this.i_activity_id = 0;
    this.i_activity_type = 0;
    this.i_unlock = 0;
  }
};
ActivityViewJumpClickLogData = __decorate([CheckEventIdUnique("1021")], ActivityViewJumpClickLogData);
exports.ActivityViewJumpClickLogData = ActivityViewJumpClickLogData;
let ActivityLockConditionClickLogData = class ActivityLockConditionClickLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1029";
    this.i_activity_id = 0;
    this.i_activity_type = 0;
  }
};
ActivityLockConditionClickLogData = __decorate([CheckEventIdUnique("1029")], ActivityLockConditionClickLogData);
exports.ActivityLockConditionClickLogData = ActivityLockConditionClickLogData;
let ActivityRecallLogData = class ActivityRecallLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.i_activity_id = 0;
    this.i_activity_type = 0;
    this.i_time_left = 0;
    this.i_type = 0;
    this.i_quest_id = 0;
    this.i_grade_id = 0;
  }
};
ActivityRecallLogData = __decorate([CheckEventIdUnique("1023", "1024")], ActivityRecallLogData);
exports.ActivityRecallLogData = ActivityRecallLogData;
let ActivityRegressLogData = class ActivityRegressLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.i_activity_id = 0;
    this.i_grade_id = 0;
    this.i_question_id = 0;
  }
};
ActivityRegressLogData = __decorate([CheckEventIdUnique("1060", "1061")], ActivityRegressLogData);
exports.ActivityRegressLogData = ActivityRegressLogData;
let ActivityPreheatLogData = class ActivityPreheatLogData extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1030";
    this.i_activity_id = 0;
    this.i_activity_type = 0;
    this.i_time_left = 0;
    this.i_type = 0;
  }
};
ActivityPreheatLogData = __decorate([CheckEventIdUnique("1030")], ActivityPreheatLogData);
exports.ActivityPreheatLogData = ActivityPreheatLogData;
let StartSdkPayEvent = class StartSdkPayEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1040";
    this.s_sdk_pay_order = "";
    this.s_sdk_callback_url = "";
  }
};
StartSdkPayEvent = __decorate([CheckEventIdUnique("1040")], StartSdkPayEvent);
exports.StartSdkPayEvent = StartSdkPayEvent;
let SuccessSdkPayEvent = class SuccessSdkPayEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1041";
    this.s_sdk_pay_order = "";
  }
};
SuccessSdkPayEvent = __decorate([CheckEventIdUnique("1041")], SuccessSdkPayEvent);
exports.SuccessSdkPayEvent = SuccessSdkPayEvent;
let FailSdkPayEvent = class FailSdkPayEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1042";
    this.s_sdk_pay_order = "";
    this.s_reason = "";
  }
};
FailSdkPayEvent = __decorate([CheckEventIdUnique("1042")], FailSdkPayEvent);
exports.FailSdkPayEvent = FailSdkPayEvent;
let SdkPayGetServerBillEvent = class SdkPayGetServerBillEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1043";
    this.s_sdk_pay_order = "";
  }
};
SdkPayGetServerBillEvent = __decorate([CheckEventIdUnique("1043")], SdkPayGetServerBillEvent);
exports.SdkPayGetServerBillEvent = SdkPayGetServerBillEvent;
let GamepadActiveEvent = class GamepadActiveEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1050";
    this.i_gamepad_count = 0;
    this.i_gamepad_time = 0;
  }
};
GamepadActiveEvent = __decorate([CheckEventIdUnique("1050")], GamepadActiveEvent);
exports.GamepadActiveEvent = GamepadActiveEvent;
let MailBindClickEvent = class MailBindClickEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1051";
    this.i_language = 0;
    this.i_if_binded = 0;
  }
};
MailBindClickEvent = __decorate([CheckEventIdUnique("1051")], MailBindClickEvent);
exports.MailBindClickEvent = MailBindClickEvent;
let MailBindJumpToWebViewEvent = class MailBindJumpToWebViewEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1052";
    this.i_language = 0;
  }
};
MailBindJumpToWebViewEvent = __decorate([CheckEventIdUnique("1052")], MailBindJumpToWebViewEvent);
exports.MailBindJumpToWebViewEvent = MailBindJumpToWebViewEvent;
let ShareEvent = class ShareEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1053";
    this.i_share_channel = 0;
    this.i_share_result = 0;
    this.i_share_scene = 0;
  }
};
ShareEvent = __decorate([CheckEventIdUnique("1053")], ShareEvent);
exports.ShareEvent = ShareEvent;
let SdkStartReview = class SdkStartReview extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1044";
    this.s_channel = "";
    this.i_id = 0;
  }
};
SdkStartReview = __decorate([CheckEventIdUnique("1044")], SdkStartReview);
exports.SdkStartReview = SdkStartReview;
let LinkageSwitchModuleEvent = class LinkageSwitchModuleEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1058";
    this.i_activity_id = 0;
    this.i_activity_type = 0;
    this.i_id = 0;
    this.i_if_finish = 0;
  }
};
LinkageSwitchModuleEvent = __decorate([CheckEventIdUnique("1058")], LinkageSwitchModuleEvent);
exports.LinkageSwitchModuleEvent = LinkageSwitchModuleEvent;
let LinkageClickGoEvent = class LinkageClickGoEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1059";
    this.i_activity_id = 0;
    this.i_activity_type = 0;
    this.i_id = 0;
  }
};
LinkageClickGoEvent = __decorate([CheckEventIdUnique("1059")], LinkageClickGoEvent);
exports.LinkageClickGoEvent = LinkageClickGoEvent;
let BirthdaySelectRoleEvent = class BirthdaySelectRoleEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1062";
    this.i_role_id = 0;
    this.b_if_selected_role = false;
    this.i_birthday_count = 0;
    this.i_trigger_type = 0;
    this.bird_round_id = 0;
  }
};
BirthdaySelectRoleEvent = __decorate([CheckEventIdUnique("1062")], BirthdaySelectRoleEvent);
exports.BirthdaySelectRoleEvent = BirthdaySelectRoleEvent;
let BirthdayRepeatEnterEvent = class BirthdayRepeatEnterEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1063";
    this.i_item_id = 0;
    this.i_trigger_type = 0;
    this.bird_round_id = 0;
  }
};
BirthdayRepeatEnterEvent = __decorate([CheckEventIdUnique("1063")], BirthdayRepeatEnterEvent);
exports.BirthdayRepeatEnterEvent = BirthdayRepeatEnterEvent;
let PreDownloadEntranceRecord = class PreDownloadEntranceRecord extends PlayerCommonLogData {
  constructor(t) {
    super();
    this.event_id = "1054";
    this.i_entrance_id = 0;
    this.i_entrance_id = t;
  }
};
PreDownloadEntranceRecord = __decorate([CheckEventIdUnique("1054")], PreDownloadEntranceRecord);
exports.PreDownloadEntranceRecord = PreDownloadEntranceRecord;
let PreDownloadDownloadModeSwitchRecord = class PreDownloadDownloadModeSwitchRecord extends PlayerCommonLogData {
  constructor(t) {
    super();
    this.event_id = "1055";
    this.i_download_mode = 0;
    this.i_download_mode = t;
  }
};
PreDownloadDownloadModeSwitchRecord = __decorate([CheckEventIdUnique("1055")], PreDownloadDownloadModeSwitchRecord);
exports.PreDownloadDownloadModeSwitchRecord = PreDownloadDownloadModeSwitchRecord;
let PreDownloadPauseRecord = class PreDownloadPauseRecord extends PlayerCommonLogData {
  constructor(t) {
    super();
    this.event_id = "1056";
    this.i_pause_reason = 0;
    this.i_pause_reason = t;
  }
};
PreDownloadPauseRecord = __decorate([CheckEventIdUnique("1056")], PreDownloadPauseRecord);
exports.PreDownloadPauseRecord = PreDownloadPauseRecord;
let PreDownloadDownloadModeSuccessRecord = class PreDownloadDownloadModeSuccessRecord extends PlayerCommonLogData {
  constructor(t) {
    super();
    this.event_id = "1057";
    this.i_download_mode = 0;
    this.i_download_mode = t;
  }
};
PreDownloadDownloadModeSuccessRecord = __decorate([CheckEventIdUnique("1057")], PreDownloadDownloadModeSuccessRecord);
exports.PreDownloadDownloadModeSuccessRecord = PreDownloadDownloadModeSuccessRecord;
let PreDownloadDownloadNoSpaceBeforeStartRecord = class PreDownloadDownloadNoSpaceBeforeStartRecord extends PlayerCommonLogData {
  constructor(t) {
    super();
    this.event_id = "1708";
    this.i_required_space = 0;
    this.i_required_space = Number(t);
  }
};
PreDownloadDownloadNoSpaceBeforeStartRecord = __decorate([CheckEventIdUnique("1708")], PreDownloadDownloadNoSpaceBeforeStartRecord);
exports.PreDownloadDownloadNoSpaceBeforeStartRecord = PreDownloadDownloadNoSpaceBeforeStartRecord;
let CiacconaEnterMainViewLogEvent = class CiacconaEnterMainViewLogEvent extends PlayerCommonLogData {
  constructor(t) {
    super();
    this.event_id = "156003";
    this.i_trigger_type = 0;
    this.i_trigger_type = t;
  }
};
CiacconaEnterMainViewLogEvent = __decorate([CheckEventIdUnique("156003")], CiacconaEnterMainViewLogEvent);
exports.CiacconaEnterMainViewLogEvent = CiacconaEnterMainViewLogEvent;
let DownloadVideoResLogData = class DownloadVideoResLogData extends CommonLogData {
  constructor() {
    super();
    this.event_id = "1701";
    this.i_task_id = 0;
    this.b_if_storage_alert = false;
    this.i_peak_speed = 0;
    this.i_download_time = 0;
    this.i_download_status = 0;
    this.i_role_id = 0;
    this.i_resource_type = 0;
    this.i_resource_size = 0;
  }
};
DownloadVideoResLogData = __decorate([CheckEventIdUnique("1701")], DownloadVideoResLogData);
exports.DownloadVideoResLogData = DownloadVideoResLogData;
let DownloadVideoResNotEnoughSpaceLogData = class DownloadVideoResNotEnoughSpaceLogData extends CommonLogData {
  constructor() {
    super();
    this.event_id = "1702";
    this.i_popup_type = 0;
    this.b_if_storage_alert = false;
    this.i_required_space = 0;
    this.i_remaining_space = 0;
  }
};
DownloadVideoResNotEnoughSpaceLogData = __decorate([CheckEventIdUnique("1702")], DownloadVideoResNotEnoughSpaceLogData);
exports.DownloadVideoResNotEnoughSpaceLogData = DownloadVideoResNotEnoughSpaceLogData;
let SubPackageKeySubPackageLogEvent = class SubPackageKeySubPackageLogEvent extends CommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1705";
    this.i_download_time = 0;
    this.i_download_status = 0;
    this.o_phantoms = [];
  }
};
SubPackageKeySubPackageLogEvent = __decorate([CheckEventIdUnique("1705")], SubPackageKeySubPackageLogEvent);
exports.SubPackageKeySubPackageLogEvent = SubPackageKeySubPackageLogEvent;
let SubPackageDownLoadLogEvent = class SubPackageDownLoadLogEvent extends CommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1706";
    this.s_suit_name = "";
    this.b_if_storage_alert = false;
    this.i_peak_speed = 0;
    this.i_download_time = 0;
    this.i_download_status = 0;
    this.i_resource_type = 0;
    this.i_resource_size = 0;
    this.i_state = 0;
    this.i_role_id = 0;
  }
};
SubPackageDownLoadLogEvent = __decorate([CheckEventIdUnique("1706")], SubPackageDownLoadLogEvent);
exports.SubPackageDownLoadLogEvent = SubPackageDownLoadLogEvent;
let SubPackageOutOfSpaceLogEvent = class SubPackageOutOfSpaceLogEvent extends CommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1707";
    this.s_suit_name = "";
    this.i_resource_type = 0;
    this.b_if_storage_alert = false;
    this.i_required_space = 0;
    this.i_remaining_space = 0;
    this.i_role_id = 0;
  }
};
SubPackageOutOfSpaceLogEvent = __decorate([CheckEventIdUnique("1707")], SubPackageOutOfSpaceLogEvent);
exports.SubPackageOutOfSpaceLogEvent = SubPackageOutOfSpaceLogEvent;
let SubPackageClearSpaceLogEvent = class SubPackageClearSpaceLogEvent extends CommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1710";
    this.i_task_id = 0;
    this.b_if_storage_alert = false;
    this.i_required_space = 0;
  }
};
SubPackageClearSpaceLogEvent = __decorate([CheckEventIdUnique("1710")], SubPackageClearSpaceLogEvent);
exports.SubPackageClearSpaceLogEvent = SubPackageClearSpaceLogEvent;
let SubPackageClearSpaceFinishLogEvent = class SubPackageClearSpaceFinishLogEvent extends CommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1709";
    this.i_task_id = 0;
    this.i_required_space = 0;
    this.i_remaining_space = 0;
    this.b_if_storage_alert = false;
  }
};
SubPackageClearSpaceFinishLogEvent = __decorate([CheckEventIdUnique("1709")], SubPackageClearSpaceFinishLogEvent);
exports.SubPackageClearSpaceFinishLogEvent = SubPackageClearSpaceFinishLogEvent;
let GameInformationClickLogEvent = class GameInformationClickLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "69001";
  }
};
GameInformationClickLogEvent = __decorate([CheckEventIdUnique("69001")], GameInformationClickLogEvent);
exports.GameInformationClickLogEvent = GameInformationClickLogEvent;
let NoticeClickLogEvent = class NoticeClickLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "69002";
  }
};
NoticeClickLogEvent = __decorate([CheckEventIdUnique("69002")], NoticeClickLogEvent);
exports.NoticeClickLogEvent = NoticeClickLogEvent;
let GachaRecordClickLogEvent = class GachaRecordClickLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "69003";
  }
};
GachaRecordClickLogEvent = __decorate([CheckEventIdUnique("69003")], GachaRecordClickLogEvent);
exports.GachaRecordClickLogEvent = GachaRecordClickLogEvent;
let PhantomArenaDeckUpdateEvent = class PhantomArenaDeckUpdateEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1703";
    this.i_activity_id = 0;
    this.i_deck_order = 0;
    this.s_deck_name = "";
    this.i_operation = 0;
    this.o_deck_info = [];
    this.o_build_click = "";
    this.i_build_id = 0;
    this.i_deck_status = 0;
    this.i_special_effect = 0;
  }
};
PhantomArenaDeckUpdateEvent = __decorate([CheckEventIdUnique("1703")], PhantomArenaDeckUpdateEvent);
exports.PhantomArenaDeckUpdateEvent = PhantomArenaDeckUpdateEvent;
let EnterViewWithTermsEvent = class EnterViewWithTermsEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1067";
    this.i_scene = 0;
  }
};
EnterViewWithTermsEvent = __decorate([CheckEventIdUnique("1067")], EnterViewWithTermsEvent);
exports.EnterViewWithTermsEvent = EnterViewWithTermsEvent;
let ClickTermExplanationEvent = class ClickTermExplanationEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1068";
    this.i_scene = 0;
  }
};
ClickTermExplanationEvent = __decorate([CheckEventIdUnique("1068")], ClickTermExplanationEvent);
exports.ClickTermExplanationEvent = ClickTermExplanationEvent;
let LifePointDrawLogEvent = class LifePointDrawLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1704";
    this.i_config_id = 0;
    this.i_group_entity_id = 0;
    this.s_type_name = "";
    this.i_result = 0;
    this.i_try_count = 0;
  }
};
LifePointDrawLogEvent = __decorate([CheckEventIdUnique("1704")], LifePointDrawLogEvent);
exports.LifePointDrawLogEvent = LifePointDrawLogEvent;
let KingShipLogEvent = class KingShipLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1801";
    this.i_step_id = 0;
  }
};
KingShipLogEvent = __decorate([CheckEventIdUnique("1801")], KingShipLogEvent);
exports.KingShipLogEvent = KingShipLogEvent;
let ShipTowerSwitch = class ShipTowerSwitch extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1802";
    this.i_inst_id = 0;
  }
};
ShipTowerSwitch = __decorate([CheckEventIdUnique("1802")], ShipTowerSwitch);
exports.ShipTowerSwitch = ShipTowerSwitch;
let HoldHandEnterLogEvent = class HoldHandEnterLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "160301";
    this.reason = "";
  }
};
HoldHandEnterLogEvent = __decorate([CheckEventIdUnique("160301")], HoldHandEnterLogEvent);
exports.HoldHandEnterLogEvent = HoldHandEnterLogEvent;
let HoldHandExitLogEvent = class HoldHandExitLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "160302";
    this.reason = "";
  }
};
HoldHandExitLogEvent = __decorate([CheckEventIdUnique("160302")], HoldHandExitLogEvent);
exports.HoldHandExitLogEvent = HoldHandExitLogEvent;
let HoldHandSitDownLogEvent = class HoldHandSitDownLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "160303";
  }
};
HoldHandSitDownLogEvent = __decorate([CheckEventIdUnique("160303")], HoldHandSitDownLogEvent);
exports.HoldHandSitDownLogEvent = HoldHandSitDownLogEvent;
let MotorSkillLogEvent = class MotorSkillLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "2000";
    this.i_skill_id = "";
  }
};
MotorSkillLogEvent = __decorate([CheckEventIdUnique("2000")], MotorSkillLogEvent);
exports.MotorSkillLogEvent = MotorSkillLogEvent;
let MotorFirstSightLogEvent = class MotorFirstSightLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "2001";
    this.i_view_switching = 0;
  }
};
MotorFirstSightLogEvent = __decorate([CheckEventIdUnique("2001")], MotorFirstSightLogEvent);
exports.MotorFirstSightLogEvent = MotorFirstSightLogEvent;
let MotorDriftLogEvent = class MotorDriftLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "2002";
    this.i_drift_distance = 0;
    this.i_drift_time = 0;
  }
};
MotorDriftLogEvent = __decorate([CheckEventIdUnique("2002")], MotorDriftLogEvent);
exports.MotorDriftLogEvent = MotorDriftLogEvent;
let MotorSummonGetOnLogEvent = class MotorSummonGetOnLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "2003";
    this.pos_x = 0;
    this.pos_y = 0;
    this.pos_z = 0;
    this.operation_type = 0;
  }
};
MotorSummonGetOnLogEvent = __decorate([CheckEventIdUnique("2003")], MotorSummonGetOnLogEvent);
exports.MotorSummonGetOnLogEvent = MotorSummonGetOnLogEvent;
let AutoShowParallelDownloadConfirmBox = class AutoShowParallelDownloadConfirmBox extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1851";
  }
};
AutoShowParallelDownloadConfirmBox = __decorate([CheckEventIdUnique("1851")], AutoShowParallelDownloadConfirmBox);
exports.AutoShowParallelDownloadConfirmBox = AutoShowParallelDownloadConfirmBox;
let ParallelDownloadConfirmBoxOperation = class ParallelDownloadConfirmBoxOperation extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1852";
    this.i_type = 0;
  }
};
ParallelDownloadConfirmBoxOperation = __decorate([CheckEventIdUnique("1852")], ParallelDownloadConfirmBoxOperation);
exports.ParallelDownloadConfirmBoxOperation = ParallelDownloadConfirmBoxOperation;
let UiInteractSpaceKeyLogEvent = class UiInteractSpaceKeyLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1806";
    this.i_type = 0;
    this.i_status = 0;
  }
};
UiInteractSpaceKeyLogEvent = __decorate([CheckEventIdUnique("1806")], UiInteractSpaceKeyLogEvent);
exports.UiInteractSpaceKeyLogEvent = UiInteractSpaceKeyLogEvent;
let UiInteractRouletteLogEvent = class UiInteractRouletteLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1808";
    this.i_old_count = 0;
    this.i_new_count = 0;
    this.i_inst_id = 0;
    this.i_cost_time = 0;
    this.i_skill_id = 0;
  }
};
UiInteractRouletteLogEvent = __decorate([CheckEventIdUnique("1808")], UiInteractRouletteLogEvent);
exports.UiInteractRouletteLogEvent = UiInteractRouletteLogEvent;
let UiInteractChatLogEvent = class UiInteractChatLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1809";
    this.i_old_count = 0;
    this.i_new_count = 0;
    this.i_inst_id = 0;
    this.i_cost_time = 0;
    this.i_skill_id = 0;
  }
};
UiInteractChatLogEvent = __decorate([CheckEventIdUnique("1809")], UiInteractChatLogEvent);
exports.UiInteractChatLogEvent = UiInteractChatLogEvent;
let RoleDevLogEvent = class RoleDevLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1807";
    this.i_role_id = 0;
    this.i_role_type = 0;
    this.i_main_page = 0;
    this.i_sub_page = 0;
  }
};
RoleDevLogEvent = __decorate([CheckEventIdUnique("1807")], RoleDevLogEvent);
exports.RoleDevLogEvent = RoleDevLogEvent;
let RoleSkillTreeLogEvent = class RoleSkillTreeLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1900";
  }
};
RoleSkillTreeLogEvent = __decorate([CheckEventIdUnique("1900")], RoleSkillTreeLogEvent);
exports.RoleSkillTreeLogEvent = RoleSkillTreeLogEvent;
let RoleSkillInputLogEvent = class RoleSkillInputLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1901";
  }
};
RoleSkillInputLogEvent = __decorate([CheckEventIdUnique("1901")], RoleSkillInputLogEvent);
exports.RoleSkillInputLogEvent = RoleSkillInputLogEvent;
let FightPhotoTakePhotoLogEvent = class FightPhotoTakePhotoLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1803";
    this.inst_id = 0;
    this.inst_diff = 0;
    this.trace_id = "";
    this.filter_id = 0;
    this.photo_num = 0;
    this.photo_status = 0;
  }
};
FightPhotoTakePhotoLogEvent = __decorate([CheckEventIdUnique("1803")], FightPhotoTakePhotoLogEvent);
exports.FightPhotoTakePhotoLogEvent = FightPhotoTakePhotoLogEvent;
let FightPhotoTimeDilationLogEvent = class FightPhotoTimeDilationLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1804";
    this.inst_id = 0;
    this.inst_diff = 0;
    this.trace_id = "";
  }
};
FightPhotoTimeDilationLogEvent = __decorate([CheckEventIdUnique("1804")], FightPhotoTimeDilationLogEvent);
exports.FightPhotoTimeDilationLogEvent = FightPhotoTimeDilationLogEvent;
let QuestViewEnterLogEvent = class QuestViewEnterLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1910";
  }
};
QuestViewEnterLogEvent = __decorate([CheckEventIdUnique("1910")], QuestViewEnterLogEvent);
exports.QuestViewEnterLogEvent = QuestViewEnterLogEvent;
let QuestTreeEnterLogEvent = class QuestTreeEnterLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1911";
  }
};
QuestTreeEnterLogEvent = __decorate([CheckEventIdUnique("1911")], QuestTreeEnterLogEvent);
exports.QuestTreeEnterLogEvent = QuestTreeEnterLogEvent;
let CustomServiceLogEvent = class CustomServiceLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1810";
    this.s_trace_id = "";
    this.log_status = 0;
  }
};
CustomServiceLogEvent = __decorate([CheckEventIdUnique("1810")], CustomServiceLogEvent);
exports.CustomServiceLogEvent = CustomServiceLogEvent;
let ActivityPreWarmOpenLogEvent = class ActivityPreWarmOpenLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1811";
    this.i_activity_id = 0;
    this.i_chapter_id = 0;
  }
};
ActivityPreWarmOpenLogEvent = __decorate([CheckEventIdUnique("1811")], ActivityPreWarmOpenLogEvent);
exports.ActivityPreWarmOpenLogEvent = ActivityPreWarmOpenLogEvent;
let ActivityPreWarmStayLogEvent = class ActivityPreWarmStayLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1812";
    this.i_activity_id = 0;
    this.i_chapter_id = 0;
    this.i_cost_time = 0;
  }
};
ActivityPreWarmStayLogEvent = __decorate([CheckEventIdUnique("1812")], ActivityPreWarmStayLogEvent);
exports.ActivityPreWarmStayLogEvent = ActivityPreWarmStayLogEvent;
let NextVersionContentLogEvent = class NextVersionContentLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1813";
    this.i_activity_id = 0;
    this.i_second_tab = 0;
    this.i_third_tab = 0;
  }
};
NextVersionContentLogEvent = __decorate([CheckEventIdUnique("1813")], NextVersionContentLogEvent);
exports.NextVersionContentLogEvent = NextVersionContentLogEvent;
let ArtemisLevelUnlockLogEvent = class ArtemisLevelUnlockLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1814";
    this.i_id = 0;
  }
};
ArtemisLevelUnlockLogEvent = __decorate([CheckEventIdUnique("1814")], ArtemisLevelUnlockLogEvent);
exports.ArtemisLevelUnlockLogEvent = ArtemisLevelUnlockLogEvent;
let OnOpenPhoneViewLogEvent = class OnOpenPhoneViewLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1815";
    this.i_open_way = 0;
    this.i_reason = 0;
  }
};
OnOpenPhoneViewLogEvent = __decorate([CheckEventIdUnique("1815")], OnOpenPhoneViewLogEvent);
exports.OnOpenPhoneViewLogEvent = OnOpenPhoneViewLogEvent;
let OnSelectShortMessageLogEvent = class OnSelectShortMessageLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1816";
    this.i_id = 0;
    this.i_type = 0;
    this.i_reason = 0;
    this.l_received_time = 0;
    this.i_role_id = 0;
  }
};
OnSelectShortMessageLogEvent = __decorate([CheckEventIdUnique("1816")], OnSelectShortMessageLogEvent);
exports.OnSelectShortMessageLogEvent = OnSelectShortMessageLogEvent;
let OnJumpInShortMessageLogEvent = class OnJumpInShortMessageLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1817";
    this.i_id = 0;
    this.i_type = 0;
    this.i_role_id = 0;
    this.l_received_time = 0;
    this.i_trigger_type = 0;
    this.i_config_id = 0;
  }
};
OnJumpInShortMessageLogEvent = __decorate([CheckEventIdUnique("1817")], OnJumpInShortMessageLogEvent);
exports.OnJumpInShortMessageLogEvent = OnJumpInShortMessageLogEvent;
let OnClickActivityCategorytab = class OnClickActivityCategorytab extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1818";
    this.i_type = 0;
    this.o_content = [];
  }
};
OnClickActivityCategorytab = __decorate([CheckEventIdUnique("1818")], OnClickActivityCategorytab);
exports.OnClickActivityCategorytab = OnClickActivityCategorytab;
let PhonographPlayLogEvent = class PhonographPlayLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "101701";
    this.i_item_id = 0;
    this.i_album_id = 0;
  }
};
PhonographPlayLogEvent = __decorate([CheckEventIdUnique("101701")], PhonographPlayLogEvent);
exports.PhonographPlayLogEvent = PhonographPlayLogEvent;
let MotorcycleMusicPlayLogEvent = class MotorcycleMusicPlayLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "101702";
    this.i_item_id = 0;
    this.i_album_id = 0;
  }
};
MotorcycleMusicPlayLogEvent = __decorate([CheckEventIdUnique("101702")], MotorcycleMusicPlayLogEvent);
exports.MotorcycleMusicPlayLogEvent = MotorcycleMusicPlayLogEvent;
let ExploreEntityLogEvent = class ExploreEntityLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1172";
    this.i_config_id = 0;
    this.i_type = 0;
    this.interaction = 0;
    this.i_status = 0;
    this.i_result = 0;
    this.f_pos_x = 0;
    this.f_pos_y = 0;
    this.f_pos_z = 0;
    this.i_area_id = 0;
    this.i_father_area_id = 0;
  }
};
ExploreEntityLogEvent = __decorate([CheckEventIdUnique("1172")], ExploreEntityLogEvent);
exports.ExploreEntityLogEvent = ExploreEntityLogEvent;
let FindSunSpiritStartLogEvent = class FindSunSpiritStartLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1819";
    this.i_config_id = 0;
    this.i_id = 0;
    this.s_type_name = "";
    this.i_paint_count = 0;
  }
};
FindSunSpiritStartLogEvent = __decorate([CheckEventIdUnique("1819")], FindSunSpiritStartLogEvent);
exports.FindSunSpiritStartLogEvent = FindSunSpiritStartLogEvent;
let FindSunSpiritFinishLogEvent = class FindSunSpiritFinishLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1820";
    this.i_config_id = 0;
    this.i_id = 0;
    this.s_type_name = "";
    this.i_paint_count = 0;
    this.i_count = 0;
  }
};
FindSunSpiritFinishLogEvent = __decorate([CheckEventIdUnique("1820")], FindSunSpiritFinishLogEvent);
exports.FindSunSpiritFinishLogEvent = FindSunSpiritFinishLogEvent;
let OnClickAddCurrencyLogEvent = class OnClickAddCurrencyLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1821";
    this.i_id = 0;
  }
};
OnClickAddCurrencyLogEvent = __decorate([CheckEventIdUnique("1821")], OnClickAddCurrencyLogEvent);
exports.OnClickAddCurrencyLogEvent = OnClickAddCurrencyLogEvent;
let OnClickGachaScrollLogEvent = class OnClickGachaScrollLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1822";
    this.i_gacha_id = 0;
  }
};
OnClickGachaScrollLogEvent = __decorate([CheckEventIdUnique("1822")], OnClickGachaScrollLogEvent);
exports.OnClickGachaScrollLogEvent = OnClickGachaScrollLogEvent;
let OnClickGachaOperationLogEvent = class OnClickGachaOperationLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1823";
    this.i_gacha_id = 0;
    this.i_operation_type = 0;
  }
};
OnClickGachaOperationLogEvent = __decorate([CheckEventIdUnique("1823")], OnClickGachaOperationLogEvent);
exports.OnClickGachaOperationLogEvent = OnClickGachaOperationLogEvent;
let OnClickGachaTryRoleLogEvent = class OnClickGachaTryRoleLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1824";
    this.i_gacha_id = 0;
    this.i_role_id = 0;
  }
};
OnClickGachaTryRoleLogEvent = __decorate([CheckEventIdUnique("1824")], OnClickGachaTryRoleLogEvent);
exports.OnClickGachaTryRoleLogEvent = OnClickGachaTryRoleLogEvent;
let OnClickFunctionViewButtonLogEvent = class OnClickFunctionViewButtonLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1825";
    this.i_id = 0;
  }
};
OnClickFunctionViewButtonLogEvent = __decorate([CheckEventIdUnique("1825")], OnClickFunctionViewButtonLogEvent);
exports.OnClickFunctionViewButtonLogEvent = OnClickFunctionViewButtonLogEvent;
let OnClickPayShopTabLogEvent = class OnClickPayShopTabLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1826";
    this.i_shop_id = 0;
    this.i_tab_id = 0;
  }
};
OnClickPayShopTabLogEvent = __decorate([CheckEventIdUnique("1826")], OnClickPayShopTabLogEvent);
exports.OnClickPayShopTabLogEvent = OnClickPayShopTabLogEvent;
let OnClickRecommendSkinButtonLogEvent = class OnClickRecommendSkinButtonLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1827";
    this.i_operation_type = 0;
    this.i_item_id = 0;
  }
};
OnClickRecommendSkinButtonLogEvent = __decorate([CheckEventIdUnique("1827")], OnClickRecommendSkinButtonLogEvent);
exports.OnClickRecommendSkinButtonLogEvent = OnClickRecommendSkinButtonLogEvent;
let OnOpenGiftPackageDetailsViewLogEvent = class OnOpenGiftPackageDetailsViewLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1828";
    this.i_id = 0;
    this.i_shop_id = 0;
    this.i_tab_id = 0;
    this.i_buy_through_third_party = 0;
  }
};
OnOpenGiftPackageDetailsViewLogEvent = __decorate([CheckEventIdUnique("1828")], OnOpenGiftPackageDetailsViewLogEvent);
exports.OnOpenGiftPackageDetailsViewLogEvent = OnOpenGiftPackageDetailsViewLogEvent;
let OnClickPayShopItemLogEvent = class OnClickPayShopItemLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1829";
    this.i_id = 0;
    this.i_shop_id = 0;
    this.i_tab_id = 0;
  }
};
OnClickPayShopItemLogEvent = __decorate([CheckEventIdUnique("1829")], OnClickPayShopItemLogEvent);
exports.OnClickPayShopItemLogEvent = OnClickPayShopItemLogEvent;
let OnClickRechargeItemLogEvent = class OnClickRechargeItemLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1830";
    this.i_id = 0;
    this.i_shop_id = 0;
  }
};
OnClickRechargeItemLogEvent = __decorate([CheckEventIdUnique("1830")], OnClickRechargeItemLogEvent);
exports.OnClickRechargeItemLogEvent = OnClickRechargeItemLogEvent;
let OnClickBattlePassTabViewLogEvent = class OnClickBattlePassTabViewLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1831";
    this.i_tabIndex = 0;
  }
};
OnClickBattlePassTabViewLogEvent = __decorate([CheckEventIdUnique("1831")], OnClickBattlePassTabViewLogEvent);
exports.OnClickBattlePassTabViewLogEvent = OnClickBattlePassTabViewLogEvent;
let OnBattlePassOperationLogEvent = class OnBattlePassOperationLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1832";
    this.i_operation_type = 0;
  }
};
OnBattlePassOperationLogEvent = __decorate([CheckEventIdUnique("1832")], OnBattlePassOperationLogEvent);
exports.OnBattlePassOperationLogEvent = OnBattlePassOperationLogEvent;
let DrinksGameplayInviteLogEvent = class DrinksGameplayInviteLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1833";
    this.i_activity_id = 0;
    this.i_role_id = 0;
    this.i_inst_id = 0;
    this.i_first_pass = 0;
    this.s_trace_id = "";
  }
};
DrinksGameplayInviteLogEvent = __decorate([CheckEventIdUnique("1833")], DrinksGameplayInviteLogEvent);
exports.DrinksGameplayInviteLogEvent = DrinksGameplayInviteLogEvent;
let DrinksGameplayResultLogEvent = class DrinksGameplayResultLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1834";
    this.i_activity_id = 0;
    this.i_role_id = 0;
    this.i_inst_id = 0;
    this.i_first_pass = 0;
    this.i_result = 0;
    this.i_first_tab = 0;
    this.i_first_count = 0;
    this.i_second_tab = 0;
    this.i_second_count = 0;
    this.i_third_tab = -1;
    this.i_fourth_tab = -1;
    this.i_fifth_tab = -1;
    this.i_cost_time = 0;
    this.i_require_id = 0;
    this.o_score_buff = [];
    this.s_trace_id = "";
  }
};
DrinksGameplayResultLogEvent = __decorate([CheckEventIdUnique("1834")], DrinksGameplayResultLogEvent);
exports.DrinksGameplayResultLogEvent = DrinksGameplayResultLogEvent;
let FurnitureDesignLogEvent = class FurnitureDesignLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1835";
    this.i_area_id = 0;
    this.i_slot_id = 0;
    this.i_sub_slot_index = 0;
    this.i_new_furniture_id = 0;
    this.i_old_furniture_id = 0;
    this.i_type = 0;
    this.i_if_finish = 0;
    this.s_trace_id = "";
  }
};
FurnitureDesignLogEvent = __decorate([CheckEventIdUnique("1835")], FurnitureDesignLogEvent);
exports.FurnitureDesignLogEvent = FurnitureDesignLogEvent;
class FurniturePlaceLogData {
  constructor() {
    this.i_slot_id = 0;
    this.i_sub_slot_index = 0;
    this.i_furniture_id = 0;
  }
}
exports.FurniturePlaceLogData = FurniturePlaceLogData;
class FurniturePlaceDiffLogData {
  constructor() {
    this.i_slot_id = 0;
    this.i_sub_slot_index = 0;
    this.i_new_furniture_id = 0;
    this.i_old_furniture_id = 0;
  }
}
exports.FurniturePlaceDiffLogData = FurniturePlaceDiffLogData;
let FurnitureSaveLogEvent = class FurnitureSaveLogEvent extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1836";
    this.i_area_id = 0;
    this.o_old_place = undefined;
    this.o_new_place = undefined;
    this.o_diff = undefined;
    this.i_old_atmosphere = 0;
    this.i_new_atmosphere = 0;
    this.i_is_save = 0;
    this.s_trace_id = "";
  }
};
FurnitureSaveLogEvent = __decorate([CheckEventIdUnique("1836")], FurnitureSaveLogEvent);
exports.FurnitureSaveLogEvent = FurnitureSaveLogEvent;
let GuessJokerExitSaveReport = class GuessJokerExitSaveReport extends PlayerCommonLogData {
  constructor() {
    super(...arguments);
    this.event_id = "1837";
    this.i_level_id = 0;
    this.s_trace_id = "";
    this.i_turn_id = 0;
    this.i_role_hp = 0;
    this.i_enemy_hp = 0;
  }
};
GuessJokerExitSaveReport = __decorate([CheckEventIdUnique("1837")], GuessJokerExitSaveReport);
exports.GuessJokerExitSaveReport = GuessJokerExitSaveReport; //# sourceMappingURL=LogReportDefine.js.map