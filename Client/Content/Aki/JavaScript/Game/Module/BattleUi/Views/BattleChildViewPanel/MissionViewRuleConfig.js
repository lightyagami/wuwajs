"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specialDungeonRules = exports.SpringManorTrackingRule = exports.DefaultTrackingRule = exports.TrackingDisplayRuleBase = undefined;
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
  CustomTypeCheck(r, e) {
    let o = undefined;
    switch (r.DataSource) {
      case 0:
        var a = r.Id;
        var a = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(a);
        if (!a || a.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid) {
          return;
        }
        o = a.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && !a.GetBlackBoard().IsTrackBoundToParent || e === 1 ? 1 : 0;
        break;
      case 1:
        o = 1;
    }
    return o;
  }
  SortShowData(r) {
    r.sort((r, e) => r.DataSource !== e.DataSource ? r.DataSource - e.DataSource : r.ShowPriority - e.ShowPriority);
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
  CustomTypeCheck(r, e) {
    if (r.DataSource === 0) {
      var o = r.Id;
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      var r = r.TreeConfigId;
      if (o && o.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid && o.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        o = ModelManager_1.ModelManager.HonamiStoryModel.CurAreaId;
        if ((ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryAreaConfig(o)?.MainBTId ?? 0) === r) {
          return 1;
        } else {
          return 2;
        }
      }
    }
  }
  SortShowData(r) {
    const o = ModelManager_1.ModelManager.HonamiStoryModel.CurTrackTaskData?.GetLevelPlayInfo()?.TreeConfigId;
    r.sort((r, e) => r.DataSource !== e.DataSource ? r.DataSource - e.DataSource : r.DataSource === 0 && r.TreeConfigId === o || e.DataSource === 0 && e.TreeConfigId === o ? 1 : r.ShowPriority - e.ShowPriority);
  }
}
class SpringManorTrackingRule extends TrackingDisplayRuleBase {
  constructor() {
    super(...arguments);
    this.Id = "springManor";
  }
  get Enabled() {
    return ModelManager_1.ModelManager.SpringManorModel.CheckInInstance();
  }
  get Priority() {
    return 1;
  }
  CustomTypeCheck(r, e) {
    if (r.DataSource === 0) {
      var o = r.Id;
      var o = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(o);
      if (o && o.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid) {
        if (o.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest || o.GetBlackBoard().IsTrackBoundToParent) {
          if (ModelManager_1.ModelManager.SpringManorModel.IsSubQuest(r.TreeConfigId)) {
            return 1;
          } else if (e === 1) {
            return 2;
          } else {
            return 0;
          }
        } else {
          return 2;
        }
      }
    }
  }
  SortShowData(r) {
    r.sort((r, e) => r.DataSource !== e.DataSource ? r.DataSource - e.DataSource : r.ShowPriority - e.ShowPriority);
  }
}
exports.SpringManorTrackingRule = SpringManorTrackingRule;
exports.specialDungeonRules = [new HonamiStoryTrackingRule(), new SpringManorTrackingRule()]; //# sourceMappingURL=MissionViewRuleConfig.js.map