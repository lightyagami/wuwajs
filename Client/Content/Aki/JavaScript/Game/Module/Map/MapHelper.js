"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapHelper = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const MapUtil_1 = require("./MapUtil");
class MapHelper {
  static CheckAndShowCrossMapTips(e, r, i, a) {
    e = ModelManager_1.ModelManager.MapModel.GetMarkMapConfigId(e, r);
    r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (MapUtil_1.MapUtil.IsDungeonDiffWorld(e, r)) {
      if (i !== undefined && i > 0) {
        r = this.GetLevelOneAreaNameLocalTextId(i);
        if (!StringUtils_1.StringUtils.IsBlank(r)) {
          i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(r);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("CrossMapMainTips", i);
          return;
        }
      }
      r = MapUtil_1.MapUtil.GetMapNameByInstanceId(e, a);
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("CrossMapMainTips", r);
    }
  }
  static GetLevelOneAreaNameLocalTextId(e) {
    var r = ConfigManager_1.ConfigManager.AreaConfig.GetLevelOneAreaId(e);
    var r = r !== 0 ? r : e;
    return ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r)?.Title ?? "";
  }
  static GetDoubleRestAndMaxTimes(e) {
    if (e.MarkConfig.RelativeSubType === 1) {
      var i = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity([3], false);
      var a = i !== undefined;
      let e = 0;
      let r = 0;
      if (i) {
        i = i.GetNumTxtAndParam();
        e = i[1];
        r = i[2];
      }
      if (a) {
        return [a, e, r, e > 0 ? "Reward_doubling_time" : "Reward_doubling_end", "Double_reward_tips_02"];
      }
    }
    i = (i = e.MarkConfig.RelativeId) !== 0 ? i : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(e.MarkConfigId);
    if (ModelManager_1.ModelManager.ActivityRegressModel.DungeonHasDoubleDropTimes(i, 21) || ModelManager_1.ModelManager.ActivityRegressModel.LevelPlayHasDoubleDropTimes(i, 21)) {
      return ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(21);
    } else if (ModelManager_1.ModelManager.ActivityRegressModel.DungeonHasDoubleDropTimes(i, 7) || ModelManager_1.ModelManager.ActivityRegressModel.LevelPlayHasDoubleDropTimes(i, 7)) {
      return ModelManager_1.ModelManager.ActivityRegressModel.GetDetectionDoubleDropTuple(7);
    } else {
      return [false, 0, 0, "", ""];
    }
  }
}
exports.MapHelper = MapHelper;
//# sourceMappingURL=MapHelper.js.map