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
    this.OptionMap = new Map();
    this.CurrentLayer = 0;
    this.MaxLayer = 0;
    this.CurrentBindId = 0;
    this.CurrentRoomTypeId = "";
    this.CurrentRoomId = 0;
    this.CurrentRoomType = 0;
    this.DescMode = 0;
    this.SelectEntry = undefined;
    this.CurrentActivityId = 0;
    this.lec = new StateRef_1.StateRef("game_rogue_room_type", "none");
  }
  get CycleId() {
    if (this.CurrentActivityId === 0) {
      return 0;
    } else {
      return this.ActivityData.CycleId;
    }
  }
  get CurrentRoomMusicState() {
    return this.lec.State;
  }
  set CurrentRoomMusicState(e) {
    this.lec.State = e ?? "none";
  }
  get ActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.CurrentActivityId);
    return e || (Log_1.Log.CheckError() && Log_1.Log.Error("WeeklyRogue", 37, "周常肉鸽数据未创建,请检查调用时机", ["Id", this.CurrentActivityId]), new WeeklyRogueData_1.WeeklyRogueData());
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
  GetInsideCurrencyId() {
    return ConfigManager_1.ConfigManager.WeeklyRogueConfig?.GetWeeklyRogueParam(this.ActivityData.Id)?.InsideCurrency ?? 0;
  }
  UpdateInstInfo(e) {
    this.BuffList = e.PN_;
    this.OptionMap.clear();
    for (const t of Object.keys(e.xN_)) {
      this.OptionMap.set(Number(t), e.xN_[t]);
    }
  }
  CheckIsInWeeklyRogue() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId())?.InstSubType === 29 && ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
  }
  IsWeeklyRogueOpen() {
    var e = ModelManager_1.ModelManager.EditBattleTeamModel.GetInstanceDungeonId;
    return !!e && !!(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) && e.InstSubType === 29;
  }
  CheckIsRecommendRole(e) {
    var t = this.ActivityData.GetCycleConfig();
    return !!t && t.RecommendedRole.includes(e);
  }
  GetScoreRewardData() {
    const a = [];
    var e = {
      TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_WeeklyRogue_ScoreReward_Title"),
      DataList: a
    };
    this.ActivityData.AwardsInfoList?.forEach(e => {
      var t = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyRewardConfig(e.v9n);
      if (t) {
        var r = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(t.TargetReward, this.ActivityData.WorldLevel);
        var o = this.ActivityData.GetScoreRewardStateById(e.v9n);
        const n = e.v9n;
        e = {
          Id: n,
          NameText: "",
          NameTextId: "Text_WeeklyRogue_ScoreReward_ItemName",
          NameTextArgs: [t.Score.toString()],
          RewardList: r,
          RewardState: this.ActivityData.GetScoreRewardStateById(n),
          RewardButtonText: this.Vea(o),
          RewardButtonRedDot: o === 1,
          ClickFunction: () => {
            WeeklyRogueController_1.WeeklyRogueController.Instance?.RogueWeeklyScoreRewardRequest(n);
          }
        };
        a.push(e);
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
}
exports.WeeklyRogueModel = WeeklyRogueModel;
//# sourceMappingURL=WeeklyRogueModel.js.map