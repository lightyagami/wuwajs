"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventHighlightExploreUi = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const leaveAreaItemInfoIds = new Map([[70140080, {
  QuestId: 172000001,
  NodeId: 37,
  LeaveAreaId: 3215,
  NodeState: Protocol_1.Aki.Protocol.BNs.Proto_BeforeActivate
}]]);
class LeaveAreaItemInfo {
  static TryLeave(e) {
    var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.QuestId);
    return !!r && !!r.IsProgressing && !!(r = r.GetNode(e.NodeId)) && r.Status === e.NodeState && ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId === e.LeaveAreaId && !(ControllerHolder_1.ControllerHolder.AreaController.EndOverlap(e.LeaveAreaId), 0);
  }
}
class LevelEventHighlightExploreUi extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (!e) {
      this.FinishExecute(false);
    }
    var a = ModelManager_1.ModelManager.ExploreModel.GetActiveExploreComponent();
    if (a) {
      var o = e;
      switch (o.Type) {
        case "Show":
          a.ShowHighlightExploreSkill(o.SkillType, o.Duration, o.IsSwitchBack, o.HighlightType);
          break;
        case "ToggleAndHighlightItem":
          var l = o;
          a.ShowHighlightExploreSkill(l.SkillType, -1, true, o.HighlightType, l.ItemId, l.IsShowTips);
          var l = leaveAreaItemInfoIds.get(l.ItemId);
          if (l) {
            LeaveAreaItemInfo.TryLeave(l);
          }
          break;
        case "Hide":
          a.HideHighlightExploreSkill();
      }
    }
  }
}
exports.LevelEventHighlightExploreUi = LevelEventHighlightExploreUi;
//# sourceMappingURL=LevelEventHighlightExploreUi.js.map