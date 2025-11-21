"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specialDungeonRules = exports.DefaultTrackingRule = exports.TrackingDisplayRuleBase = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HonamiStoryUtil_1 = require("../../../HonamiStory/HonamiStoryUtil");
class TrackingDisplayRuleBase {}
class DefaultTrackingRule extends (exports.TrackingDisplayRuleBase = TrackingDisplayRuleBase) {
  constructor() {
    super(...arguments);
    this.Id = "default";
  }
  get Enabled() {
    return true;
  }
  get Priority() {
    return 0;
  }
  CustomTypeCheck(e, r) {
    let o = undefined;
    switch (e.DataSource) {
      case 0:
        var t = e.Id;
        var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
        if (!t || t.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid) {
          return;
        }
        o = t.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest || r === 1 ? 1 : 0;
        break;
      case 1:
        o = 1;
    }
    return o;
  }
  SortShowData(e) {
    e.sort((e, r) => e.DataSource !== r.DataSource ? e.DataSource - r.DataSource : e.ShowPriority - r.ShowPriority);
  }
}
exports.DefaultTrackingRule = DefaultTrackingRule;
class HonamiStoryTrackingRule extends TrackingDisplayRuleBase {
  constructor() {
    super(...arguments);
    this.Id = "honamiStory";
  }
  get Enabled() {
    return HonamiStoryUtil_1.HonamiStoryUtil.CheckHonamiQuestOpen();
  }
  get Priority() {
    return 1;
  }
  CustomTypeCheck(e, r) {
    if (e.DataSource === 0) {
      var o = e.Id;
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      var e = e.TreeConfigId;
      if (o && o.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid && o.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        o = ModelManager_1.ModelManager.HonamiStoryModel.CurAreaId;
        if ((ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryAreaConfig(o)?.MainBTId ?? 0) === e) {
          return 1;
        } else {
          return 2;
        }
      }
    }
  }
  SortShowData(e) {
    const o = ModelManager_1.ModelManager.HonamiStoryModel.CurTrackTaskData?.GetLevelPlayInfo()?.TreeConfigId;
    e.sort((e, r) => e.DataSource !== r.DataSource ? e.DataSource - r.DataSource : e.DataSource === 0 && e.TreeConfigId === o || r.DataSource === 0 && r.TreeConfigId === o ? 1 : e.ShowPriority - r.ShowPriority);
  }
}
exports.specialDungeonRules = [new HonamiStoryTrackingRule()];
//# sourceMappingURL=MissionViewRuleConfig.js.map