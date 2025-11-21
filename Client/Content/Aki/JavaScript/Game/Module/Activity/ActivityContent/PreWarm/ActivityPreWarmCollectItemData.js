"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPreWarmCollectItemData = undefined;
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
const ActivityPreWarmDefine_1 = require("./ActivityPreWarmDefine");
class ActivityPreWarmCollectItemData extends ActivityData_1.ActivityExData {
  constructor() {
    super(...arguments);
    this.xe = 0;
  }
  SetId(e) {
    this.xe = e;
  }
  GetId() {
    return this.xe;
  }
  GetPreviewReward() {
    var e = ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe);
    if (e) {
      e = ModelManager_1.ModelManager.QuestNewModel?.GetQuestConfig(e.QuestId)?.RewardId;
      if (e) {
        e = ConfigManager_1.ConfigManager.RewardConfig?.GetDropPackage(e)?.DropPreview;
        if (e) {
          var t;
          var r;
          var a = [];
          for ([t, r] of e) {
            var i = [{
              IncId: 0,
              ItemId: t
            }, r];
            a.push(i);
          }
          return a;
        }
      }
    }
  }
  GetTitleNumIconPath() {
    return ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(ActivityPreWarmDefine_1.titleNumIcons[this.xe]);
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe)?.Title;
  }
  GetDesc() {
    return ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe)?.Desc;
  }
  GetIconPath() {
    return ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe)?.IconPath;
  }
  GetShadowIconPath() {
    return ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe)?.ShadowIconPath;
  }
  GetBgPath() {
    return ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe)?.BgPath;
  }
  GetQuestId() {
    return ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe)?.QuestId;
  }
  GetQuestState() {
    var e = ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe);
    if (e) {
      return ModelManager_1.ModelManager.QuestNewModel?.GetQuestState(e.QuestId);
    }
  }
  GetItemIconPath() {
    return ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe)?.ItemIconPath;
  }
  GetShadowItemIconPath() {
    return ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe)?.ShadowItemIconPath;
  }
  TNe() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.ActivityId).BeginOpenTime;
    var e = new Date(e * TimeUtil_1.TimeUtil.InverseMillisecond);
    e.setHours(TimeUtil_1.TimeUtil.CrossDayHour);
    var e = e.getTime() * TimeUtil_1.TimeUtil.Millisecond;
    return e + this.GetOpenDay() * TimeUtil_1.TimeUtil.OneDaySeconds;
  }
  GetIsUnlock() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    var t = this.TNe();
    if (t <= e) {
      return {
        IsUnlock: true
      };
    } else {
      t = Math.max(t - e, 1);
      return {
        IsUnlock: false,
        CdTime: TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(t).CountDownText ?? ""
      };
    }
  }
  GetOpenDay() {
    return ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe)?.OpenDay ?? 0;
  }
  GetParsingMatPath() {
    return ConfigManager_1.ConfigManager.ActivityPreWarmConfig?.GetPreWarmConfig(this.xe)?.ParsingMatPath;
  }
}
exports.ActivityPreWarmCollectItemData = ActivityPreWarmCollectItemData;
//# sourceMappingURL=ActivityPreWarmCollectItemData.js.map