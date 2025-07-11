"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissionViewStepTextUtil = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController");
class MissionViewStepTextUtil {
  static GetStepTextByConfig(e, t) {
    switch (t.ShowSource) {
      case 0:
        return GeneralLogicTreeController_1.GeneralLogicTreeController.GetTitleText(e, t.TidTitle, t.QuestScheduleType, t.UsePreStateText ?? false);
      case 1:
        return MissionViewStepTextUtil.QU_(t);
      case 2:
        return MissionViewStepTextUtil.DF1(t);
    }
    return "";
  }
  static QU_(e) {
    var t = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TidTitle);
    var r = ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(e.ProgressTargetId);
    var e = MissionViewStepTextUtil.GetEntrustProgressTotalCount(e.ProgressTargetId);
    var r = r < e ? r : e;
    return `${t.replace("{0}", e.toString())}(${r}/${e})`;
  }
  static DF1(e) {
    return ConfigManager_1.ConfigManager.TextConfig.GetTextById(e.TidTitle);
  }
  static GetEntrustProgressTotalCount(e) {
    var t = ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust;
    if (!t || (t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(t)).EntrustType === 2) {
      return 0;
    } else {
      return t.EntrustTarget.get(e) ?? 0;
    }
  }
  static CheckStepTextSame(e, t) {
    return e?.TidTitle === t?.TidTitle;
  }
  static CheckTextEqual(t, r) {
    if (t !== r) {
      if (!t || !r) {
        return false;
      }
      if (!MissionViewStepTextUtil.CheckStepTextSame(t.MainStepInfo, r.MainStepInfo)) {
        return false;
      }
      if (t.SubStepInfos !== r.SubStepInfos) {
        if (!t.SubStepInfos || !r.SubStepInfos) {
          return false;
        }
        if (t.SubStepInfos?.length !== r.SubStepInfos?.length) {
          return false;
        }
        for (let e = 0; e < t.SubStepInfos.length; e++) {
          var i = t.SubStepInfos[e];
          if (!MissionViewStepTextUtil.CheckStepTextSame(i, r.SubStepInfos[e])) {
            return false;
          }
        }
      }
    }
    return true;
  }
  static CheckShowConfigEmpty(e) {
    if (e.TitleTextKey) {
      var t = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.TitleTextKey);
      if (!StringUtils_1.StringUtils.IsBlank(t)) {
        return false;
      }
    }
    if (e.MainStepInfo) {
      t = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.MainStepInfo.TidTitle);
      if (!StringUtils_1.StringUtils.IsBlank(t)) {
        return false;
      }
    }
    if (e.SubStepInfos) {
      for (const i of e.SubStepInfos) {
        var r = PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TidTitle);
        if (!StringUtils_1.StringUtils.IsBlank(r)) {
          return false;
        }
      }
    }
    return true;
  }
}
exports.MissionViewStepTextUtil = MissionViewStepTextUtil;
//# sourceMappingURL=MissionViewStepTextUtil.js.map