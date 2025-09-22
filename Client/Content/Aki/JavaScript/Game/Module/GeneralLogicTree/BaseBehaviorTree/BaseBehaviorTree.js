"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseBehaviorTree = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Queue_1 = require("../../../../Core/Container/Queue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const GuaranteeController_1 = require("../../../LevelGamePlay/Guarantee/GuaranteeController");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralController_1 = require("../../../LevelGamePlay/LevelGeneralController");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine");
const NodeTypeDefine_1 = require("../Define/NodeTypeDefine");
const GeneralLogicTreeController_1 = require("../GeneralLogicTreeController");
const BehaviorTreeSuspendComponent_1 = require("./BehaviorTreeSuspendComponent");
const BehaviorTreeTimerComponent_1 = require("./BehaviorTreeTimerComponent");
const BlackBoard_1 = require("./BlackBoard");
const BehaviorTreeExpressionComponent_1 = require("./Express/BehaviorTreeExpressionComponent");
class BaseBehaviorTree {
  constructor(e, t, r, i, s, o, n, a, h) {
    this.BlackBoard = new BlackBoard_1.Blackboard();
    this.FlowInfo = undefined;
    this.Expression = undefined;
    this.TimerCenter = undefined;
    this.Suspend = undefined;
    this.YKt = [];
    this.JKt = new Queue_1.Queue();
    this.InnerFailNodeId = 0;
    this.IsPendingDestroy = false;
    this.t$s = (e, t, r) => {
      if (e && t === 1 && r === 1) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s);
        this.ZKt(Protocol_1.Aki.Protocol.NEs.Proto_CharacterDieFail);
      }
    };
    this.ZKt = e => {
      if (this.BlackBoard.ContainTag(6)) {
        GeneralLogicTreeController_1.GeneralLogicTreeController.RequestRollback(this.TreeIncId, e);
      }
    };
    this.BlackBoard.Init(r, e, t, i, s, o, n, h ?? false);
    if (a) {
      this.BlackBoard.AddTag(8);
    }
  }
  get BtType() {
    return this.BlackBoard.BtType;
  }
  get TreeIncId() {
    return this.BlackBoard.TreeIncId;
  }
  get TreeConfigId() {
    return this.BlackBoard.TreeConfigId;
  }
  get DungeonId() {
    return this.BlackBoard.DungeonId;
  }
  get FailNodeId() {
    return this.InnerFailNodeId;
  }
  ClearFailNodeId() {
    this.InnerFailNodeId = 0;
  }
  InitTree(e, t = false) {
    this.eQt();
    this.SetSleep(t);
    this.Recover(e);
    this.tQt();
  }
  Destroy() {
    this.iQt();
    this.BlackBoard.Dispose();
    this.Expression?.Dispose();
    this.FlowInfo?.Dispose();
    this.TimerCenter?.Dispose();
  }
  CreateNode(e, t) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 0,
        Reason: e,
        NodeInfo: t
      });
    } else if (t) {
      var r = this.BlackBoard.GetNodeConfig(t.NodeId);
      var i = (0, NodeTypeDefine_1.newNodeObj)(r);
      if (i) {
        this.BlackBoard.AddNode(t.NodeId, i);
        this.BlackBoard.AddNodeToStatusGroup(i, t.H6n);
        i.Init(this.BlackBoard, e, t, r, this.BtType);
        return i;
      }
    }
  }
  oQt(e) {
    this.JKt.Push(e);
  }
  eQt() {
    this.FlowInfo = new DynamicFlowInfo();
    this.TimerCenter = new BehaviorTreeTimerComponent_1.BehaviorTreeTimerCenter(this.TreeIncId, this.BlackBoard);
    this.Suspend = new BehaviorTreeSuspendComponent_1.BehaviorTreeSuspendComponent(this.TreeIncId, this.BlackBoard);
    if (!this.BlackBoard.NoExpression) {
      this.Expression = new BehaviorTreeExpressionComponent_1.BehaviorTreeExpressionComponent(this.BlackBoard);
      this.Expression.Init();
    }
  }
  Recover(e) {
    if (e) {
      this.rQt(e.aEs);
      this.nQt(e.lEs);
      this.sQt(e.hEs);
      this.UpdateOccupations(e.J61, e._Es, e.uEs);
      ControllerHolder_1.ControllerHolder.PerformController.RecoverTreeInfo(e.hK_);
    }
  }
  rQt(e) {
    if (e) {
      for (const i of Object.keys(e)) {
        var t = e[i];
        t.NodeId = Number(i);
        var r = this.GetNode(t.NodeId);
        if (r) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("GeneralLogicTree", 18, "创建节点时：节点已存在", ["节点Id", t.NodeId]);
          }
        } else {
          this.CreateNode(1, t);
        }
      }
    }
  }
  nQt(e) {
    if (e) {
      for (const t of e) {
        this.UpdateTimer(t);
      }
    }
  }
  sQt(e) {
    for (const r of Object.keys(e)) {
      var t = e[r];
      this.BlackBoard.UpdateTreeVar(r, t);
    }
  }
  tQt() {
    EventSystem_1.EventSystem.AddWithTarget(this.BlackBoard, EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate, this.ZKt);
  }
  iQt() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.BlackBoard, EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate, this.ZKt)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.BlackBoard, EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate, this.ZKt);
    }
  }
  SetSleep(e) {
    this.BlackBoard.IsSleeping = e;
    if (!this.BlackBoard.IsSleeping && this.JKt.Size !== 0) {
      let e = this.JKt.Pop();
      while (e !== undefined) {
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
            this.DoAction(e.Context, e.NodeId, e.PlayerId, e.SessionId, e.StartIndex, e.EndIndex, e.NeedFinishReq);
            break;
          case 6:
            this.UpdateTimer(e.TimerInfo);
            break;
          case 7:
            this.UpdateOccupations(e.SuspendNodeId, e.SuspendType, e.OccupationInfo);
            break;
          case 8:
            this.UpdateTreeVars(e.Notify);
        }
        e = this.JKt.Size > 0 ? this.JKt.Pop() : undefined;
      }
    }
  }
  UpdateNodeState(e, t, r) {
    var i;
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 1,
        Reason: e,
        NodeId: t,
        NodeStatus: r
      });
    } else if (i = this.GetNode(t)) {
      this.BlackBoard.UpdateNodeInStatusGroup(i, i.Status, r);
      i.UpdateStatus(e, r);
    } else {
      (i = new GeneralLogicTreeDefine_1.NodeInfo()).NodeId = t;
      i.H6n = r;
      this.CreateNode(e, i);
    }
  }
  UpdateNodeProgress(e, t) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 2,
        NodeId: e,
        NodeInfo: t
      });
    } else if (t && (e = this.GetNode(e))) {
      e.UpdateProgress(t);
    }
  }
  UpdateChildQuestNodeState(e, t, r) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 3,
        NodeId: e,
        NodeStatus: t,
        Reason: r
      });
    } else if ((e = this.GetNode(e)) && e.NodeType === "ChildQuest") {
      e.UpdateChildQuestStatus(t, r);
    }
  }
  GetNode(e) {
    return this.BlackBoard.GetNode(e);
  }
  GetNodesByGroupId(e) {
    return this.BlackBoard.GetNodesByGroupId(e);
  }
  GetTreeVarByKey(e) {
    return this.BlackBoard.GetTreeVar(e);
  }
  AddTreeVarUpdateDelegate(e, t) {
    this.BlackBoard.AddTreeVarUpdateDelegate(e, t);
  }
  RemoveTreeVarUpdateDelegate(e, t) {
    this.BlackBoard.RemoveTreeVarUpdateDelegate(e, t);
  }
  CheckCanGiveUp() {
    if (!ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) {
      return false;
    }
    var e = this.GetProcessingCanGiveupFailedNode();
    if (!e) {
      return false;
    }
    if (!e.CanGiveUp) {
      return false;
    }
    var t;
    var e = this.GetNodesByGroupId(1);
    if (!e) {
      return false;
    }
    let r = true;
    for ([, t] of e) {
      if (t.NodeType === "ChildQuest" && !t.CanGiveUp) {
        r = false;
        break;
      }
    }
    return r;
  }
  GetProcessingCanGiveupFailedNode() {
    var t = this.GetNodesByGroupId(1);
    if (t) {
      let e = undefined;
      for (var [, r] of t) {
        if (r.NodeType === "QuestFailed" && r.CanGiveUp) {
          e = r;
          break;
        }
      }
      return e;
    }
  }
  GetProcessingFailedNode() {
    var t = this.GetNodesByGroupId(1);
    if (t) {
      let e = undefined;
      for (var [, r] of t) {
        if (r.NodeType === "QuestFailed") {
          e = r;
          break;
        }
      }
      return e;
    }
  }
  GetCurrentActiveChildQuestNode(e = true) {
    return this.BlackBoard.GetCurrentActiveChildQuestNode(e);
  }
  GetActiveChildQuestNodesId() {
    return this.BlackBoard.GetActiveChildQuestNodesId();
  }
  GetCurrentActiveChildQuestNodes() {
    return this.BlackBoard.GetActiveChildQuestNodes();
  }
  GetCurrentCorrelativeEntities() {
    var e = this.GetNodesByGroupId(1);
    if (e) {
      this.YKt.splice(0, this.YKt.length);
      for (var [, t] of e) {
        if (t.NodeType === "ChildQuest") {
          t = t.GetCorrelativeEntities();
          if (t) {
            for (const r of t) {
              this.YKt.push(r);
            }
          }
        }
      }
      return this.YKt;
    }
  }
  ContainTag(e) {
    return this.BlackBoard.ContainTag(e);
  }
  GetBlackBoard() {
    return this.BlackBoard;
  }
  AddDynamicFlowNpc(e) {
    this.FlowInfo.AddDynamicFlowNpc(e);
  }
  PrepareRollback(e, t) {
    this.SetRollbackWaiting(true);
    this.InnerFailNodeId = t ?? 0;
    for (const r of this.BlackBoard.GetCurrentExecuteActions()) {
      LevelGeneralController_1.LevelGeneralController.StopActionsExecute(r);
    }
    t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    t = ModelManager_1.ModelManager.SceneTeamModel.GetGroupLivingState(t, 1);
    if (e === Protocol_1.Aki.Protocol.NEs.Proto_CharacterDieFail && t === 2) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s);
    } else {
      this.ZKt(e);
    }
  }
  StopCurrentActions() {
    for (const e of this.BlackBoard.GetCurrentExecuteActions()) {
      LevelGeneralController_1.LevelGeneralController.StopActionsExecute(e);
    }
  }
  ExecuteTreeGuaranteeActions(e = 0) {
    var t = this.BlackBoard.GetGuaranteeActions();
    if (t.length !== 0 && (t = t.reverse(), e = e === 1 ? LevelGeneralContextDefine_1.GuaranteeContext.Create(undefined, 1) : LevelGeneralContextDefine_1.GuaranteeContext.Create(undefined, 2), GuaranteeController_1.GuaranteeController.ExecuteActions(t, e), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("LevelEvent", 39, "树保底行为已全部完成", ["treeIncId", this.BlackBoard.TreeConfigId], ["保底行为列表", t]);
    }
  }
  SetRollbackWaiting(e) {
    if (e && !this.BlackBoard.ContainTag(6)) {
      this.BlackBoard.AddTag(6);
    } else if (!e && this.BlackBoard.ContainTag(6)) {
      this.BlackBoard.RemoveTag(6);
    }
  }
  IsTracking() {
    return this.BlackBoard.IsTracking;
  }
  SetTrack(e, t = 0) {
    if (!e || !this.BlackBoard.IsSuspend()) {
      if (this.BlackBoard.NoExpression) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "没有表现的行为树设置了追踪", ["btType", this.BtType], ["treeConfigId", this.TreeConfigId], ["treeIncId", this.TreeIncId]);
        }
      } else if (this.BlackBoard.IsSleeping) {
        this.oQt({
          ProcessType: 4,
          Value: e
        });
      } else if (this.BlackBoard.IsTracking !== e) {
        this.BlackBoard.IsTracking = e;
        this.Expression.EnableTrack(e, t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.BtType, this.TreeIncId);
      }
    }
  }
  SetMapMarkResident(e) {
    this.BlackBoard.SetMapMarkResident(e);
  }
  GetMapMarkResident() {
    return this.BlackBoard.GetMapMarkResident();
  }
  SetUseInnerTrackIconId(e) {
    this.BlackBoard.SetUseInnerTrackIconId(e);
  }
  StartTextExpress(e = 0) {
    this.Expression?.StartTextExpress(e);
  }
  EndTextExpress(e = 0) {
    this.Expression?.EndTextExpress(e);
  }
  GetSilentAreaShowInfo() {
    return this.BlackBoard.GetSilentAreaShowInfo();
  }
  GetTrackIconId() {
    return this.BlackBoard.TaskMarkTableId;
  }
  CheckCanShow() {
    return this.Expression?.CheckCanShow() ?? false;
  }
  CanShowTrackExpression() {
    return this.Expression?.CheckCanShowTrackExpression() ?? false;
  }
  GetNodeTrackPosition(e) {
    return this.Expression?.GetNodeTrackPosition(e);
  }
  GetClosestMapMarkId() {
    return this.Expression?.GetClosestMapMarkId() ?? 0;
  }
  GetTrackAreaInfo(e) {
    return this.Expression?.GetTrackAreaInfo(e);
  }
  GetTrackDistance(e) {
    return this.Expression?.GetTrackDistance(e) ?? 0;
  }
  GetDefaultMark(e) {
    return this.Expression?.GetDefaultMark(e);
  }
  IsInTrackRange() {
    return this.BlackBoard.ContainTag(13);
  }
  IsRangeTrack(e) {
    return this.GetRangeMarkSize(e) !== 0;
  }
  GetRangeMarkSize(e) {
    return this.Expression?.GetRangeMarkSize(e) ?? 0;
  }
  GetRangeMarkShowDis(e) {
    return this.Expression?.GetRangeMarkShowDis(e) ?? 0;
  }
  GetGuideLineHideDistance(e) {
    if (this.IsInTrackRange()) {
      return this.GetRangeMarkSize(e);
    } else {
      return 0;
    }
  }
  GetCurrentNodeShortcutShow() {
    if (this.BlackBoard.ContainTag(7)) {
      return 2;
    } else if (this.BlackBoard.ContainTag(15)) {
      return 3;
    } else if (this.CheckCanGiveUp()) {
      return 1;
    } else {
      return 0;
    }
  }
  GetGiveUpText() {
    var e = this.GetProcessingCanGiveupFailedNode();
    if (e && e.GiveUpText) {
      return PublicUtil_1.PublicUtil.GetConfigTextByKey(e.GiveUpText);
    } else {
      return "";
    }
  }
  CreateMapMarks() {
    this.Expression?.CreateMapMarks();
  }
  DoAction(t, r, i, s, o, n, a) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 5,
        Context: t,
        NodeId: r,
        PlayerId: i,
        SessionId: s,
        StartIndex: o,
        EndIndex: n,
        NeedFinishReq: a
      });
    } else {
      var h;
      var l = this.BlackBoard.GetNodeConfig(r);
      if (l) {
        let e = undefined;
        switch (t.fvs) {
          case Protocol_1.Aki.Protocol.TOs.qvs:
            if (l.Type === "QuestSucceed") {
              e = l.FinishActions;
            }
            break;
          case Protocol_1.Aki.Protocol.TOs.$vs:
            if (l.Type === "Action") {
              e = l.Actions;
            }
            break;
          case Protocol_1.Aki.Protocol.TOs.Ovs:
            if (l.Type === "ConditionSelector" || l.Type === "ParallelSelect" || l.Type === "Select" || l.Type === "Sequence") {
              e = l.SaveConfig?.EnterActions;
            }
            break;
          case Protocol_1.Aki.Protocol.TOs.R3u:
            if (l.Type === "ConditionSelector" || l.Type === "ParallelSelect" || l.Type === "Select" || l.Type === "Sequence") {
              h = t.R3u.t5n;
              e = l.SaveConfig?.InitConditionActions?.[h].Action;
            }
            break;
          case Protocol_1.Aki.Protocol.TOs.Gvs:
            if (l.Type === "QuestFailed") {
              e = l.FinishActions;
            }
            break;
          case Protocol_1.Aki.Protocol.TOs.bvs:
            if (l.Type === "ChildQuest") {
              e = l.EnterActions;
            }
            break;
          case Protocol_1.Aki.Protocol.TOs.Bvs:
            if (l.Type === "ChildQuest") {
              e = l.FinishActions;
            }
            break;
          case Protocol_1.Aki.Protocol.TOs.Proto_ChildQuestNodeStuckCheckAction:
            if (l.Type === "ChildQuest") {
              e = l.StuckCheck[t.tfd.c5n].Actions;
            }
        }
        if (e && e.length !== 0) {
          this.BlackBoard.AddCurrentExecuteActions(s);
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(this.BtType, this.TreeIncId, this.TreeConfigId, r, t.fvs), i, s, o, n, a, () => {
            this.BlackBoard.RemoveCurrentExecuteActions(s);
          });
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "服务器推送执行行为时，没有找到行为配置", ["contextType", t.fvs], ["treeConfigId", this.TreeConfigId], ["nodeId", r]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "服务器推送执行行为时，没有找到节点配置", ["context", t], ["treeConfigId", this.TreeConfigId], ["nodeId", r]);
      }
    }
  }
  UpdateTimer(e) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 6,
        TimerInfo: e
      });
    } else {
      this.TimerCenter.UpdateTimerInfo(e);
    }
  }
  GetChallengeRemainTime(e = "CountDownChallenge") {
    return this.TimerCenter.GetRemainTime(e);
  }
  UpdateTreeVars(e) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 8,
        Notify: e
      });
    } else {
      this.BlackBoard.UpdateTreeVar(e.jEs, e.WEs);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh, this.TreeIncId);
    }
  }
  IsSuspend() {
    return this.BlackBoard.IsSuspend();
  }
  GetSuspendType() {
    return this.Suspend.GetSuspendType();
  }
  GetSuspendText() {
    return this.Suspend.GetSuspendText();
  }
  GetOccupations() {
    return this.Suspend.GetOccupations();
  }
  UpdateOccupations(e, t, r) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 7,
        SuspendNodeId: e,
        SuspendType: t,
        OccupationInfo: r
      });
    } else {
      this.Suspend.UpdateOccupations(e, t, r);
    }
  }
  HasRefOccupiedEntity() {
    return this.BlackBoard.HasRefOccupiedEntity();
  }
  GetRefOccupiedEntityText() {
    return this.BlackBoard.GetRefOccupiedEntityText();
  }
  GetNodeConfig(e) {
    return this.BlackBoard.GetNodeConfig(e);
  }
  AddGuaranteeActionInfo(e, t, r, i) {
    this.BlackBoard.AddGuaranteeActionInfo(e, t, r, i);
  }
  PopGuaranteeActionInfo(e, t, r = 2) {
    return this.BlackBoard.PopGuaranteeActionInfo(e, t, r);
  }
  ClearGuaranteeActions(e) {
    this.BlackBoard.ClearGuaranteeActions(e);
  }
  GetRollbackPoint() {
    return this.BlackBoard.RollbackPoint;
  }
}
exports.BaseBehaviorTree = BaseBehaviorTree;
class DynamicFlowInfo {
  constructor() {
    this.hQt = undefined;
    this.hQt = [];
  }
  Dispose() {
    this.ClearDynamicFlowNpcList();
  }
  AddDynamicFlowNpc(e) {
    this.hQt.push(e);
  }
  ClearDynamicFlowNpcList() {
    for (const t of this.hQt) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      if (e &&= e.Entity.GetComponent(186)) {
        e.PlayDynamicFlowEnd();
      }
    }
    this.hQt.splice(0, this.hQt.length);
  }
}
//# sourceMappingURL=BaseBehaviorTree.js.map