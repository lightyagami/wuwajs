"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const StateRef_1 = require("../../../Core/Utils/Audio/StateRef");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const WeeklyRogueController_1 = require("./WeeklyRogueController");
const WeeklyRogueData_1 = require("./WeeklyRogueData");
class WeeklyRogueModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.BuffList = [];
    this.I2u = new Map();
    this.ModifierIdInForce = 0;
    this.OptionMap = new Map();
    this.CurrentLayer = 0;
    this.MaxLayer = 0;
    this.CurrentBindId = 0;
    this.CurrentRoomTypeId = "";
    this.CurrentRoomId = 0;
    this.CurrentRoomType = 0;
    this.DescMode = 0;
    this.SelectRoleIdList = [];
    this.SelectEntry = undefined;
    this.CurrentActivityId = 0;
    this.lec = new StateRef_1.StateRef("game_rogue_room_type", "none");
  }
  get CycleId() {
    return this.ActivityDataNew?.CycleId ?? 0;
  }
  get CurrentRoomMusicState() {
    return this.lec.State;
  }
  set CurrentRoomMusicState(e) {
    this.lec.State = e ?? "none";
  }
  get ActivityDataNew() {
    if (this.CurrentActivityId !== 0) {
      var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.CurrentActivityId);
      if (e.CheckIfInShowTime()) {
        return e;
      }
    }
  }
  get ActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.CurrentActivityId);
    return e || (Log_1.Log.CheckError() && Log_1.Log.Error("WeeklyRogue", 37, "周常肉鸽数据未创建,请检查调用时机", ["Id", this.CurrentActivityId]), new WeeklyRogueData_1.WeeklyRogueData());
  }
  HasLastInfo() {
    var e = this.ActivityDataNew?.LastInstInfo;
    return !!e && e.r6n !== 0;
  }
  ChangeDescMode() {
    this.DescMode = this.DescMode === 0 ? 1 : 0;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeeklyRogueDescModeChange);
  }
  GetCurrentOption() {
    return this.GetOptionByBindId(this.CurrentBindId);
  }
  GetOptionByBindId(e) {
    return this.OptionMap.get(e);
  }
  UpdateInstInfo(e) {
    this.I2u.clear();
    this.BuffList = e.PN_;
    this.ModifierIdInForce = e.v9n;
    for (const r of e.PN_) {
      var t = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(r);
      if (t) {
        let e = this.I2u.get(t.BuffType);
        if (!e) {
          e = new Array();
          this.I2u.set(t.BuffType, e);
        }
        e.push(r);
      }
    }
    this.OptionMap.clear();
    for (const a of Object.keys(e.xN_)) {
      this.OptionMap.set(Number(a), e.xN_[a]);
    }
  }
  GetBuffIdListByType(e) {
    e = this.I2u.get(e);
    if (e) {
      return [...e];
    } else {
      return [];
    }
  }
  GetArtifactBuffId() {
    var e = this.I2u.get(1);
    if (e) {
      return e[0];
    } else {
      return 0;
    }
  }
  GetCoreTokenIdListByArtifactId(e) {
    return ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPoolByRelatedArtifactId(e)?.map(e => e.Id) ?? [];
  }
  GetRogueWeeklyBuffTagIdList(e) {
    var t;
    var r = [];
    var e = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(e);
    if (e) {
      if (e.BuffType === 1 && this.ModifierIdInForce !== 0) {
        if ((t = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(this.ModifierIdInForce))?.BuffTriggerTagId !== 0) {
          r.push(t.BuffTriggerTagId);
        }
      } else if (e.BuffTriggerTagId !== 0) {
        r.push(e.BuffTriggerTagId);
      }
      r.push(...e.BuffTagId);
    }
    return r;
  }
  GetRogueWeeklyBuffDescParam(t) {
    var r = [];
    var a = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(t);
    if (a) {
      if (t === this.GetArtifactBuffId()) {
        let e = a.BuffTriggerTagId;
        if (this.ModifierIdInForce !== 0) {
          t = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(this.ModifierIdInForce);
          e = t.BuffTriggerTagId;
        }
        t = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeekTagConfig(e);
        r.push(t.Name);
      } else {
        r.push(...a.BuffDescParam);
      }
    }
    return r;
  }
  CheckIsInWeeklyRogue() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId())?.InstSubType === 29 && ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
  }
  IsWeeklyRogueOpen() {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetInstanceDungeonId;
    return !!e && !!(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) && e.InstSubType === 29;
  }
  CheckIsRecommendRole(e) {
    var t = this.ActivityDataNew?.GetCycleConfig();
    return !!t && t.RecommendedRole.includes(e);
  }
  GetAllRecommendRole() {
    var e = this.ActivityDataNew?.GetCycleConfig();
    if (e) {
      return e.RecommendedRole;
    } else {
      return [];
    }
  }
  GetScoreRewardData() {
    const o = [];
    var e = {
      TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_WeeklyRogue_ScoreReward_Title"),
      DataList: o
    };
    this.ActivityDataNew?.AwardsInfoList?.forEach(e => {
      var t;
      var r;
      var a = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyRewardConfig(e.v9n);
      if (a) {
        t = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(a.TargetReward, this.ActivityData.WorldLevel);
        r = this.ActivityData.GetScoreRewardStateById(e.v9n);
        a = {
          Id: e = e.v9n,
          NameText: "",
          NameTextId: "Text_WeeklyRogue_ScoreReward_ItemName",
          NameTextArgs: [a.Score.toString()],
          RewardList: t,
          RewardState: this.ActivityData.GetScoreRewardStateById(e),
          RewardButtonText: this.Vea(r),
          RewardButtonRedDot: r === 1,
          ClickFunction: () => {
            WeeklyRogueController_1.WeeklyRogueController.Instance?.MultiRogueWeeklyRewardRequest();
          }
        };
        o.push(a);
      }
    });
    var e = {
      DataPageList: [e],
      Source: "WeeklyRogue"
    };
    return e;
  }
  Vea(e) {
    switch (e) {
      case 2:
      case 1:
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerDefence_Getbt1") ?? "";
      case 0:
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("TowerDefence_Getbt3") ?? "";
      default:
        return "";
    }
  }
  GetMapNoteShowState() {
    var e = this.ActivityDataNew;
    return !!e && !!e.IsUnLock() && !e.IsScoreRewardAllDone();
  }
}
exports.WeeklyRogueModel = WeeklyRogueModel;
//# sourceMappingURL=WeeklyRogueModel.js.map