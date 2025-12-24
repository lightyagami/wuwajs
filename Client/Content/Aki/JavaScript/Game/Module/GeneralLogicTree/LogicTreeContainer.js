"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogicTreeContainer = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class LogicTreeContainer {
  constructor() {
    this.BehaviorTree = undefined;
    this.vYt = false;
  }
  get Tree() {
    if (this.BehaviorTree) {
      return this.BehaviorTree;
    }
  }
  get TreeId() {
    return this.Tree?.TreeIncId;
  }
  get TreeConfigId() {
    return this.Tree?.TreeConfigId;
  }
  Destroy() {
    this.d$1();
  }
  get IsBelongPlayer() {
    return this.vYt;
  }
  SetUpBehaviorTree(e) {
    if (this.BehaviorTree = e) {
      this.vYt = true;
    }
  }
  d$1() {
    if (this.BehaviorTree) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TearDownGeneralLogicTree, this.TreeId, this.TreeConfigId);
      this.BehaviorTree = undefined;
    }
  }
  GetNode(e) {
    return this.Tree?.GetNode(e);
  }
  GetCurrentActiveChildQuestNode() {
    return this.Tree?.GetCurrentActiveChildQuestNode();
  }
  GetCurrentActiveChildQuestNodes() {
    return this.Tree?.GetCurrentActiveChildQuestNodes();
  }
  GetActiveChildQuestNodesId() {
    return this.Tree?.GetActiveChildQuestNodesId();
  }
  GetCurrentCorrelativeEntities() {
    return this.Tree?.GetCurrentCorrelativeEntities();
  }
  GetCurrentTrackCustomBoard() {
    return this.Tree?.GetCurrentNodeCustomTrackBoard();
  }
  SetTrack(e, t = 0) {
    this.Tree?.SetTrack(e, t);
  }
  GetNodeTrackPosition(e) {
    return this.Tree?.GetNodeTrackPosition(e);
  }
  GetTrackDistance(e) {
    return this.Tree?.GetTrackDistance(e);
  }
  GetDefaultMark(e) {
    return this.Tree?.GetDefaultMark(e);
  }
  GetGuideLineHideDistance(e) {
    return this.Tree?.GetGuideLineHideDistance(e);
  }
  IsInTrackRange() {
    return this.Tree.IsInTrackRange();
  }
  IsRangeTrack(e) {
    return this.Tree.IsRangeTrack(e);
  }
  CreateMapMarks() {
    this.Tree.CreateMapMarks();
  }
  GetUiPriority() {
    return 0;
  }
  CanShowInUiPanel() {
    return this.Tree?.CheckCanShow() ?? false;
  }
  CanShowTrackExpression() {
    return this.Tree?.CanShowTrackExpression() ?? false;
  }
  StartTextExpress(e = 0) {
    this.Tree?.StartTextExpress(e);
  }
  EndTextExpress(e = 0) {
    this.Tree?.EndTextExpress(e);
  }
  IsSuspend() {
    return this.Tree?.IsSuspend() ?? false;
  }
  GetSuspendType() {
    return this.Tree?.GetSuspendType() ?? 0;
  }
  GetSuspendText() {
    return this.Tree?.GetSuspendText();
  }
  GetOccupations() {
    return this.Tree?.GetOccupations();
  }
  HasRefOccupiedEntity() {
    return this.Tree?.HasRefOccupiedEntity() ?? false;
  }
  GetRefOccupiedEntityText() {
    return this.Tree?.GetRefOccupiedEntityText();
  }
  HasBehaviorTree() {
    return this.BehaviorTree !== undefined;
  }
  CanShowGuideLine() {
    var e = this.GetCurrentActiveChildQuestNodes();
    if (e) {
      for (const t of e) {
        if (t?.ContainTag(4)) {
          return true;
        }
      }
    }
    return false;
  }
  IsAlwaysShowGuideLine() {
    var e = this.GetCurrentActiveChildQuestNodes();
    if (e) {
      for (const t of e) {
        if (t?.ContainTag(5)) {
          return true;
        }
      }
    }
    return false;
  }
  GetShowGuideLineNode() {
    var e = this.GetCurrentActiveChildQuestNodes();
    if (e) {
      for (const t of e) {
        if (t?.ContainTag(4)) {
          return t;
        }
      }
    }
  }
}
exports.LogicTreeContainer = LogicTreeContainer;
//# sourceMappingURL=LogicTreeContainer.js.map