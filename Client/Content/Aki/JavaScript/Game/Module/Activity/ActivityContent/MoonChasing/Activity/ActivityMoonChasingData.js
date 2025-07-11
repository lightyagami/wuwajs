"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMoonChasingData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager");
const ActivityCommonDefine_1 = require("../../../ActivityCommonDefine");
const ActivityData_1 = require("../../../ActivityData");
const ActivityMoonChasingController_1 = require("./ActivityMoonChasingController");
class ActivityMoonChasingData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.LimitTimeRewardOn = false;
    this.ZKs = new Map();
    this.PermanentTargetOn = false;
    this.ActivityFlowState = 0;
    this.SNe = (e, t) => {
      var i = this.ZKs.get(e.Id);
      var a = this.ZKs.get(t.Id);
      if (i === a) {
        return e.Id - t.Id;
      } else {
        return i - a;
      }
    };
  }
  PhraseEx(e) {
    this.LimitTimeRewardOn = false;
    this.PermanentTargetOn = false;
    this.ActivityFlowState = 0;
    var t = ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(this.Id);
    if (t) {
      this.LimitTimeRewardOn = t.ActivityReward;
      this.PermanentTargetOn = t.PermanentTarget;
      this.ActivityFlowState = t.ActivityButtonType === 0 ? 0 : 1;
      this.ZKs.clear();
      t = e.y$s;
      if (t) {
        for (const i of t.E$s) {
          this.ZKs.set(i.s5n, ActivityCommonDefine_1.taskStateResolver[i.H6n]);
        }
        if (this.LimitTimeRewardOn) {
          this.eQs();
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "[ActivityMoonChasing] 活动配置不存在", ["Id", this.Id]);
    }
  }
  NeedSelfControlFirstRedPoint() {
    return false;
  }
  GetExDataRedPointShowState() {
    return this.ActivityFlowState !== 1 && (this.IsHasLimitTimeReward() || this.ZLa() || this.eDa()) || this.IsHasMoonChasingRedDot();
  }
  IsPreStageQuestFinished() {
    var e = ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(this.Id);
    return !e || (e = e.StageQuestId) === undefined || e === 0 || ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e);
  }
  GetPreStageQuestId() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(1);
    if (e) {
      return e.Id;
    }
  }
  GetAllRewardData() {
    var e;
    var t;
    var i = [];
    for ([e, t] of this.ZKs) {
      var a = this.tQs(e, t);
      if (a) {
        i.push(a);
      }
    }
    if (i.length !== 0) {
      return {
        DataPageList: [{
          DataList: i.sort(this.SNe)
        }],
        Source: "MoonChasing"
      };
    }
  }
  tQs(e, n) {
    const s = ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingRewardConfigById(e);
    if (s) {
      let e = 0;
      let t = "";
      let i = () => {};
      let a = false;
      let r = false;
      switch (n) {
        case 1:
          if (s.TargetFunc) {
            i = () => {
              SkipTaskManager_1.SkipTaskManager.RunByConfigId(s.TargetFunc);
            };
            e = 1;
            t = "Moonfiesta_Skip";
            r = true;
          } else {
            e = 0;
            t = "Moonfiesta_Underway";
          }
          break;
        case 0:
          e = 1;
          t = "Moonfiesta_AwardGet";
          a = true;
          i = () => {
            ActivityMoonChasingController_1.ActivityMoonChasingController.TrackMoonActivityTargetRewardRequest(this.Id, s.Id);
          };
          break;
        case 2:
          e = 2;
      }
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
      }
      return {
        Id: s.Id,
        NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s.TargetName),
        RewardList: this.GetPreviewReward(s.TargetReward),
        RewardState: e,
        RewardButtonText: t,
        RewardButtonRedDot: a,
        ClickFunction: i,
        ClickFunctionAndCloseSelf: r
      };
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Activity", 37, "[ActivityMoonChasing] 活动限时奖励配置无配置", ["RewardId", e]);
    }
  }
  SetRewardState(e, t) {
    if (this.ZKs.has(e)) {
      this.ZKs.set(e, t);
      this.eQs();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Id);
    }
  }
  IsHasLimitTimeReward() {
    if (this.LimitTimeRewardOn) {
      for (const e of this.ZKs.values()) {
        if (e === 0) {
          return true;
        }
      }
    }
    return false;
  }
  eQs() {
    var e;
    if (UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") && (e = this.GetAllRewardData())) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, e);
    }
  }
  ZLa() {
    return !!this.IsUnLock() && !!this.GetPreGuideQuestFinishState() && (ModelManager_1.ModelManager.MoonChasingRewardModel.GetAllTaskDataRedDotState(true) || ModelManager_1.ModelManager.MoonChasingRewardModel.GetShopRedDotState());
  }
  eDa() {
    return ModelManager_1.ModelManager.MoonChasingModel.HasHandbookRewardRedDot();
  }
  IsHasMoonChasingRedDot() {
    return !!this.IsUnLock() && !!this.GetPreGuideQuestFinishState() && (this.ActivityFlowState === 1 ? ModelManager_1.ModelManager.MoonChasingModel.CheckMemoryRedDotState() : !!ModelManager_1.ModelManager.MoonChasingBuildingModel.CheckAllBuildingRedDotState() || !!ModelManager_1.ModelManager.MoonChasingModel?.CheckQuestRedDotState());
  }
}
exports.ActivityMoonChasingData = ActivityMoonChasingData;
//# sourceMappingURL=ActivityMoonChasingData.js.map