"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BaseBehaviorTree = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  GuaranteeController_1 = require("../../../LevelGamePlay/Guarantee/GuaranteeController"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralController_1 = require("../../../LevelGamePlay/LevelGeneralController"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
  NodeTypeDefine_1 = require("../Define/NodeTypeDefine"),
  GeneralLogicTreeController_1 = require("../GeneralLogicTreeController"),
  BehaviorTreeSuspendComponent_1 = require("./BehaviorTreeSuspendComponent"),
  BehaviorTreeTimerComponent_1 = require("./BehaviorTreeTimerComponent"),
  BlackBoard_1 = require("./BlackBoard"),
  BehaviorTreeExpressionComponent_1 = require("./Express/BehaviorTreeExpressionComponent");
class BaseBehaviorTree {
  constructor(e, t, r, i, s, o, n, h, a) {
    this.BlackBoard = new BlackBoard_1.Blackboard, this.FlowInfo = void 0, this.Expression = void 0, this.TimerCenter = void 0, this.Suspend = void 0, this.YKt = [], this.JKt = new Queue_1.Queue, this.InnerFailNodeId = 0, this.IsPendingDestroy = !1, this.t$s = (e, t, r) => {
      e && 1 === t && 1 === r && (EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s), this.ZKt(Protocol_1.Aki.Protocol.NEs.Proto_CharacterDieFail))
    }, this.ZKt = e => {
      this.BlackBoard.ContainTag(6) && GeneralLogicTreeController_1.GeneralLogicTreeController.RequestRollback(this.TreeIncId, e)
    }, this.BlackBoard.Init(r, e, t, i, s, o, n, a ?? !1), h && this.BlackBoard.AddTag(8)
  }
  get BtType() {
    return this.BlackBoard.BtType
  }
  get TreeIncId() {
    return this.BlackBoard.TreeIncId
  }
  get TreeConfigId() {
    return this.BlackBoard.TreeConfigId
  }
  get DungeonId() {
    return this.BlackBoard.DungeonId
  }
  get FailNodeId() {
    return this.InnerFailNodeId
  }
  ClearFailNodeId() {
    this.InnerFailNodeId = 0
  }
  InitTree(e, t = !1) {
    this.eQt(), this.SetSleep(t), this.Recover(e), this.tQt()
  }
  Destroy() {
    this.iQt(), this.Expression?.Dispose(), this.FlowInfo?.Dispose(), this.TimerCenter?.Dispose(), this.BlackBoard.Dispose()
  }
  CreateNode(e, t) {
    if (this.BlackBoard.IsSleeping) this.oQt({
      ProcessType: 0,
      Reason: e,
      NodeInfo: t
    });
    else if (t) {
      var r = this.BlackBoard.GetNodeConfig(t.NodeId),
        i = (0, NodeTypeDefine_1.newNodeObj)(r);
      if (i) return this.BlackBoard.AddNode(t.NodeId, i), this.BlackBoard.AddNodeToStatusGroup(i, t.H6n), i.Init(this.BlackBoard, e, t, r, this.BtType), i
    }
  }
  oQt(e) {
    this.JKt.Push(e)
  }
  eQt() {
    this.FlowInfo = new DynamicFlowInfo, this.TimerCenter = new BehaviorTreeTimerComponent_1.BehaviorTreeTimerCenter(this.TreeIncId, this.BlackBoard), this.Suspend = new BehaviorTreeSuspendComponent_1.BehaviorTreeSuspendComponent(this.TreeIncId, this.BlackBoard), this.BlackBoard.NoExpression || (this.Expression = new BehaviorTreeExpressionComponent_1.BehaviorTreeExpressionComponent(this.BlackBoard), this.Expression.Init())
  }
  Recover(e) {
    e && (this.rQt(e.aEs), this.nQt(e.lEs), this.sQt(e.hEs), this.UpdateOccupations(e.f61, e._Es, e.uEs), ControllerHolder_1.ControllerHolder.PerformController.RecoverTreeInfo(e.hK_))
  }
  rQt(e) {
    if (e)
      for (const i of Object.keys(e)) {
        var t = e[i],
          r = (t.NodeId = Number(i), this.GetNode(t.NodeId));
        r ? Log_1.Log.CheckWarn() && Log_1.Log.Warn("GeneralLogicTree", 18, "创建节点时：节点已存在", ["节点Id", t.NodeId]) : this.CreateNode(1, t)
      }
  }
  nQt(e) {
    if (e)
      for (const t of e) this.UpdateTimer(t)
  }
  sQt(e) {
    for (const r of Object.keys(e)) {
      var t = e[r];
      this.BlackBoard.UpdateTreeVar(r, t)
    }
  }
  tQt() {
    EventSystem_1.EventSystem.AddWithTarget(this.BlackBoard, EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate, this.ZKt)
  }
  iQt() {
    EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s), EventSystem_1.EventSystem.HasWithTarget(this.BlackBoard, EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate, this.ZKt) && EventSystem_1.EventSystem.RemoveWithTarget(this.BlackBoard, EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate, this.ZKt)
  }
  SetSleep(e) {
    if (this.BlackBoard.IsSleeping = e, !this.BlackBoard.IsSleeping && 0 !== this.JKt.Size) {
      let e = this.JKt.Pop();
      for (; void 0 !== e;) {
        switch (e.ProcessType) {
          case 0:
            this.CreateNode(e.Reason, e.NodeInfo);
            break;
          case 1:
            this.UpdateNodeState(e.Reason, e.NodeId, e.NodeStatus);
            break;
          case 2:
            this.UpdateNodeProgress(e.NodeId, e.NodeInfo);
            break;
          case 3:
            this.UpdateChildQuestNodeState(e.NodeId, e.NodeStatus, e.Reason);
            break;
          case 4:
            this.SetTrack(e.Value);
            break;
          case 5:
            this.DoAction(e.ContextType, e.NodeId, e.PlayerId, e.SessionId, e.StartIndex, e.EndIndex, e.NeedFinishReq);
            break;
          case 6:
            this.UpdateTimer(e.TimerInfo);
            break;
          case 7:
            this.UpdateOccupations(e.SuspendNodeId, e.SuspendType, e.OccupationInfo);
            break;
          case 8:
            this.UpdateTreeVars(e.Notify)
        }
        e = 0 < this.JKt.Size ? this.JKt.Pop() : void 0
      }
    }
  }
  UpdateNodeState(e, t, r) {
    var i;
    this.BlackBoard.IsSleeping ? this.oQt({
      ProcessType: 1,
      Reason: e,
      NodeId: t,
      NodeStatus: r
    }) : (i = this.GetNode(t)) ? (this.BlackBoard.UpdateNodeInStatusGroup(i, i.Status, r), i.UpdateStatus(e, r)) : ((i = new GeneralLogicTreeDefine_1.NodeInfo).NodeId = t, i.H6n = r, this.CreateNode(e, i))
  }
  UpdateNodeProgress(e, t) {
    this.BlackBoard.IsSleeping ? this.oQt({
      ProcessType: 2,
      NodeId: e,
      NodeInfo: t
    }) : t && (e = this.GetNode(e)) && e.UpdateProgress(t)
  }
  UpdateChildQuestNodeState(e, t, r) {
    this.BlackBoard.IsSleeping ? this.oQt({
      ProcessType: 3,
      NodeId: e,
      NodeStatus: t,
      Reason: r
    }) : (e = this.GetNode(e)) && "ChildQuest" === e.NodeType && e.UpdateChildQuestStatus(t, r)
  }
  GetNode(e) {
    return this.BlackBoard.GetNode(e)
  }
  GetNodesByGroupId(e) {
    return this.BlackBoard.GetNodesByGroupId(e)
  }
  GetTreeVarByKey(e) {
    return this.BlackBoard.GetTreeVar(e)
  }
  CheckCanGiveUp() {
    if (!ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) return !1;
    var e = this.GetProcessingCanGiveupFailedNode();
    if (!e) return !1;
    if (!e.CanGiveUp) return !1;
    var t, e = this.GetNodesByGroupId(1);
    if (!e) return !1;
    let r = !0;
    for ([, t] of e)
      if ("ChildQuest" === t.NodeType && !t.CanGiveUp) {
        r = !1;
        break
      } return r
  }
  GetProcessingCanGiveupFailedNode() {
    var t = this.GetNodesByGroupId(1);
    if (t) {
      let e = void 0;
      for (var [, r] of t)
        if ("QuestFailed" === r.NodeType && r.CanGiveUp) {
          e = r;
          break
        } return e
    }
  }
  GetProcessingFailedNode() {
    var t = this.GetNodesByGroupId(1);
    if (t) {
      let e = void 0;
      for (var [, r] of t)
        if ("QuestFailed" === r.NodeType) {
          e = r;
          break
        } return e
    }
  }
  GetCurrentActiveChildQuestNode(e = !0) {
    return this.BlackBoard.GetCurrentActiveChildQuestNode(e)
  }
  GetActiveChildQuestNodesId() {
    return this.BlackBoard.GetActiveChildQuestNodesId()
  }
  GetCurrentActiveChildQuestNodes() {
    return this.BlackBoard.GetActiveChildQuestNodes()
  }
  GetCurrentCorrelativeEntities() {
    var e = this.GetNodesByGroupId(1);
    if (e) {
      this.YKt.splice(0, this.YKt.length);
      for (var [, t] of e)
        if ("ChildQuest" === t.NodeType) {
          t = t.GetCorrelativeEntities();
          if (t)
            for (const r of t) this.YKt.push(r)
        } return this.YKt
    }
  }
  ContainTag(e) {
    return this.BlackBoard.ContainTag(e)
  }
  GetBlackBoard() {
    return this.BlackBoard
  }
  AddDynamicFlowNpc(e) {
    this.FlowInfo.AddDynamicFlowNpc(e)
  }
  PrepareRollback(e, t) {
    this.SetRollbackWaiting(!0), this.InnerFailNodeId = t ?? 0;
    for (const r of this.BlackBoard.GetCurrentExecuteActions()) LevelGeneralController_1.LevelGeneralController.StopActionsExecute(r);
    t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), t = ModelManager_1.ModelManager.SceneTeamModel.GetGroupLivingState(t, 1);
    e === Protocol_1.Aki.Protocol.NEs.Proto_CharacterDieFail && 2 === t ? EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s) : this.ZKt(e)
  }
  StopCurrentActions() {
    for (const e of this.BlackBoard.GetCurrentExecuteActions()) LevelGeneralController_1.LevelGeneralController.StopActionsExecute(e)
  }
  ExecuteTreeGuaranteeActions() {
    var e = this.BlackBoard.GetGuaranteeActions();
    0 !== e.length && (e = e.reverse(), GuaranteeController_1.GuaranteeController.ExecuteActions(e, LevelGeneralContextDefine_1.GuaranteeContext.Create()), Log_1.Log.CheckInfo()) && Log_1.Log.Info("LevelEvent", 39, "树保底行为已全部完成", ["treeIncId", this.BlackBoard.TreeConfigId], ["保底行为列表", e])
  }
  SetRollbackWaiting(e) {
    e && !this.BlackBoard.ContainTag(6) ? this.BlackBoard.AddTag(6) : !e && this.BlackBoard.ContainTag(6) && this.BlackBoard.RemoveTag(6)
  }
  IsTracking() {
    return this.BlackBoard.IsTracking
  }
  SetTrack(e, t = 0) {
    e && this.BlackBoard.IsSuspend() || (this.BlackBoard.NoExpression ? Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "没有表现的行为树设置了追踪", ["btType", this.BtType], ["treeConfigId", this.TreeConfigId], ["treeIncId", this.TreeIncId]) : this.BlackBoard.IsSleeping ? this.oQt({
      ProcessType: 4,
      Value: e
    }) : this.BlackBoard.IsTracking !== e && (this.BlackBoard.IsTracking = e, this.Expression.EnableTrack(e, t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.BtType, this.TreeIncId)))
  }
  SetMapMarkResident(e) {
    this.BlackBoard.SetMapMarkResident(e)
  }
  GetMapMarkResident() {
    return this.BlackBoard.GetMapMarkResident()
  }
  SetUseInnerTrackIconId(e) {
    this.BlackBoard.SetUseInnerTrackIconId(e)
  }
  StartTextExpress(e = 0) {
    this.Expression?.StartTextExpress(e)
  }
  EndTextExpress(e = 0) {
    this.Expression?.EndTextExpress(e)
  }
  GetSilentAreaShowInfo() {
    return this.BlackBoard.GetSilentAreaShowInfo()
  }
  GetTrackIconId() {
    return this.BlackBoard.TaskMarkTableId
  }
  CheckCanShow() {
    return this.Expression?.CheckCanShow() ?? !1
  }
  CanShowTrackExpression() {
    return this.Expression?.CheckCanShowTrackExpression() ?? !1
  }
  GetNodeTrackPosition(e) {
    return this.Expression?.GetNodeTrackPosition(e)
  }
  GetClosestMapMarkId() {
    return this.Expression?.GetClosestMapMarkId() ?? 0
  }
  GetTrackAreaInfo(e) {
    return this.Expression?.GetTrackAreaInfo(e)
  }
  GetTrackDistance(e) {
    return this.Expression?.GetTrackDistance(e) ?? 0
  }
  GetDefaultMark(e) {
    return this.Expression?.GetDefaultMark(e)
  }
  IsInTrackRange() {
    return this.BlackBoard.ContainTag(13)
  }
  IsRangeTrack(e) {
    return 0 !== this.GetRangeMarkSize(e)
  }
  GetRangeMarkSize(e) {
    return this.Expression?.GetRangeMarkSize(e) ?? 0
  }
  GetRangeMarkShowDis(e) {
    return this.Expression?.GetRangeMarkShowDis(e) ?? 0
  }
  GetGuideLineHideDistance(e) {
    return this.IsInTrackRange() ? this.GetRangeMarkSize(e) : 0
  }
  GetCurrentNodeShortcutShow() {
    return this.BlackBoard.ContainTag(7) ? 2 : this.BlackBoard.ContainTag(15) ? 3 : this.CheckCanGiveUp() ? 1 : 0
  }
  GetGiveUpText() {
    var e = this.GetProcessingCanGiveupFailedNode();
    return e && e.GiveUpText ? PublicUtil_1.PublicUtil.GetConfigTextByKey(e.GiveUpText) : ""
  }
  CreateMapMarks() {
    this.Expression?.CreateMapMarks()
  }
  DoAction(t, r, i, s, o, n, h) {
    if (this.BlackBoard.IsSleeping) this.oQt({
      ProcessType: 5,
      ContextType: t,
      NodeId: r,
      PlayerId: i,
      SessionId: s,
      StartIndex: o,
      EndIndex: n,
      NeedFinishReq: h
    });
    else {
      var a = this.BlackBoard.GetNodeConfig(r);
      if (a) {
        let e = void 0;
        switch (t) {
          case Protocol_1.Aki.Protocol.TOs.qvs:
            "QuestSucceed" === a.Type && (e = a.FinishActions);
            break;
          case Protocol_1.Aki.Protocol.TOs.$vs:
            "Action" === a.Type && (e = a.Actions);
            break;
          case Protocol_1.Aki.Protocol.TOs.Ovs:
            "ConditionSelector" !== a.Type && "ParallelSelect" !== a.Type && "Select" !== a.Type && "Sequence" !== a.Type || (e = a.SaveConfig?.EnterActions);
            break;
          case Protocol_1.Aki.Protocol.TOs.Gvs:
            "QuestFailed" === a.Type && (e = a.FinishActions);
            break;
          case Protocol_1.Aki.Protocol.TOs.bvs:
            "ChildQuest" === a.Type && (e = a.EnterActions);
            break;
          case Protocol_1.Aki.Protocol.TOs.Bvs:
            "ChildQuest" === a.Type && (e = a.FinishActions)
        }
        e && 0 !== e.length ? (this.BlackBoard.AddCurrentExecuteActions(s), ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(this.BtType, this.TreeIncId, this.TreeConfigId, r, t), i, s, o, n, h, () => {
          this.BlackBoard.RemoveCurrentExecuteActions(s)
        })) : Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "服务器推送执行行为时，没有找到行为配置", ["contextType", t], ["treeConfigId", this.TreeConfigId], ["nodeId", r])
      } else Log_1.Log.CheckError() && Log_1.Log.Error("GeneralLogicTree", 18, "服务器推送执行行为时，没有找到节点配置", ["contextType", t], ["treeConfigId", this.TreeConfigId], ["nodeId", r])
    }
  }
  UpdateTimer(e) {
    this.BlackBoard.IsSleeping ? this.oQt({
      ProcessType: 6,
      TimerInfo: e
    }) : this.TimerCenter.UpdateTimerInfo(e)
  }
  GetChallengeRemainTime(e = "CountDownChallenge") {
    return this.TimerCenter.GetRemainTime(e)
  }
  UpdateTreeVars(e) {
    this.BlackBoard.IsSleeping ? this.oQt({
      ProcessType: 8,
      Notify: e
    }) : (this.BlackBoard.UpdateTreeVar(e.jEs, e.WEs), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh, this.TreeIncId))
  }
  IsSuspend() {
    return this.BlackBoard.IsSuspend()
  }
  GetSuspendType() {
    return this.Suspend.GetSuspendType()
  }
  GetSuspendText() {
    return this.Suspend.GetSuspendText()
  }
  GetOccupations() {
    return this.Suspend.GetOccupations()
  }
  UpdateOccupations(e, t, r) {
    this.BlackBoard.IsSleeping ? this.oQt({
      ProcessType: 7,
      SuspendNodeId: e,
      SuspendType: t,
      OccupationInfo: r
    }) : this.Suspend.UpdateOccupations(e, t, r)
  }
  HasRefOccupiedEntity() {
    return this.BlackBoard.HasRefOccupiedEntity()
  }
  GetRefOccupiedEntityText() {
    return this.BlackBoard.GetRefOccupiedEntityText()
  }
  GetNodeConfig(e) {
    return this.BlackBoard.GetNodeConfig(e)
  }
  AddGuaranteeActionInfo(e, t, r, i) {
    this.BlackBoard.AddGuaranteeActionInfo(e, t, r, i)
  }
  PopGuaranteeActionInfo(e, t) {
    return this.BlackBoard.PopGuaranteeActionInfo(e, t)
  }
  ClearGuaranteeActions(e) {
    this.BlackBoard.ClearGuaranteeActions(e)
  }
  GetRollbackPoint() {
    return this.BlackBoard.RollbackPoint
  }
}
exports.BaseBehaviorTree = BaseBehaviorTree;
class DynamicFlowInfo {
  constructor() {
    this.hQt = void 0, this.hQt = []
  }
  Dispose() {
    this.ClearDynamicFlowNpcList()
  }
  AddDynamicFlowNpc(e) {
    this.hQt.push(e)
  }
  ClearDynamicFlowNpcList() {
    for (const t of this.hQt) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      e && (e = e.Entity.GetComponent(185)) && e.PlayDynamicFlowEnd()
    }
    this.hQt.splice(0, this.hQt.length)
  }
}
//# sourceMappingURL=BaseBehaviorTree.js.map