"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDirectTrainModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityController_1 = require("../../ActivityController");
const ActivityModel_1 = require("../../ActivityModel");
class ActivityDirectTrainModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.aU_ = 0;
    this.f9m = new Map();
    this.ActivityDataList = [];
    this.ForceRemindIndex = undefined;
    this.HasValidDirectTrainProData = false;
    this.AlreadyStartView = false;
    this.P4l = false;
  }
  HasInitData() {
    return this.P4l;
  }
  LoadDataFromInfoProto(t) {
    this.P4l = true;
    this.f9m.clear();
    this.ActivityDataList.length = 0;
    this.HasValidDirectTrainProData = false;
    if (t) {
      var e = t.t9m;
      if (!e || e.length <= 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityDirectTrain", 95, "[剧情直通车]ActivityDirectTrainModel.LoadDataFromProto()->活动数据为空", ["proto.Proto_Activitys", t.t9m]);
        }
      } else {
        for (const o of e) {
          var i = ActivityController_1.ActivityController.CreateActivityData(o);
          this.f9m.set(i.Id, i);
          this.ActivityDataList.push(i);
        }
        this.HasValidDirectTrainProData = this.ActivityDataList.length > 0;
        t = ActivityModel_1.ActivityModel.SortFunc;
        this.ActivityDataList.sort(t);
        if (!this.ForceRemindIndex) {
          for (let t = 0; t < this.ActivityDataList.length; t++) {
            var r = this.ActivityDataList[t];
            var r = ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(r.Id);
            if (r && r.IsForceRemind) {
              this.ForceRemindIndex = t;
              break;
            }
          }
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityDirectTrain", 95, "[剧情直通车]ActivityDirectTrainModel.LoadDataFromProto()->加载直通车数据完成", ["ForceRemindIndex", this.ForceRemindIndex]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate, 0);
      }
    }
  }
  SetServerRemindActivityId(t) {
    this.aU_ = t;
  }
  GetDirectTrainServerRemindId() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ActivityDirectTrain", 95, "[直通车活动] 检查是否有需要提醒的活动Id", ["ServerRemindActivityId", this.aU_]);
    }
    return this.aU_;
  }
  GetRecommendQuestId(t) {
    return ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(t).RecommendQuestId;
  }
  GetRecommendQuestTipsTextId(t) {
    return ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(t).RecommendQuestLabel;
  }
  GetSkipTipTitleTextId(t) {
    return ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(t).SkipTipTitle;
  }
  GetSkipTipContentTextId(t) {
    return ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(t).SkipTipContent;
  }
  GetPrefabResource(t) {
    return ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(t).PrefabResource;
  }
  GetSkipQuestId(t) {
    return ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(t).SkipQuestId;
  }
  CheckDirectTrainProRedDotById(t) {
    t = this.f9m.get(t);
    return !!t && !!t.IsUnLock() && !t.FinishShowState && t.IsShowRedDot();
  }
  CheckDirectTrainProEntryRedDot() {
    for (const t of this.ActivityDataList) {
      if (this.CheckDirectTrainProRedDotById(t.Id)) {
        return true;
      }
    }
    return false;
  }
}
exports.ActivityDirectTrainModel = ActivityDirectTrainModel;
//# sourceMappingURL=ActivityDirectTrainModel.js.map