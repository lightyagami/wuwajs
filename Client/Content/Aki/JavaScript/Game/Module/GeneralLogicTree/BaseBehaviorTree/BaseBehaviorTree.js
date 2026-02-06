"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseBehaviorTree = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Queue_1 = require("../../../../Core/Container/Queue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
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
const BindingExpressionComponentHolder_1 = require("./Express/BindingExpressionComponentHolder");
class BaseBehaviorTree {
  constructor(e, t, i, r, s, o, n, h, a) {
    this.BlackBoard = new BlackBoard_1.Blackboard();
    this.FlowInfo = undefined;
    this.Expression = undefined;
    this.BindingExpressionHolder = undefined;
    this.TimerCenter = undefined;
    this.Suspend = undefined;
    this.YKt = [];
    this.JKt = new Queue_1.Queue();
    this.InnerFailNodeId = 0;
    this.IsPendingDestroy = false;
    this.t$s = (e, t, i) => {
      if (e && t === 1 && i === 1) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s);
        this.ZKt(Protocol_1.Aki.Protocol.NEs.Proto_CharacterDieFail);
      }
    };
    this.ZKt = e => {
      if (this.BlackBoard.ContainTag(6)) {
        GeneralLogicTreeController_1.GeneralLogicTreeController.RequestRollback(this.TreeIncId, e);
      }
    };
    this.BlackBoard.Init(i, e, t, r, s, o, n, a ?? false);
    if (h) {
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
    this.BindingExpressionHolder?.Destroy();
  }
  CreateNode(e, t) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 0,
        Reason: e,
        NodeInfo: t
      });
    } else if (t) {
      var i = this.BlackBoard.GetNodeConfig(t.NodeId);
      var r = (0, NodeTypeDefine_1.newNodeObj)(i);
      if (r) {
        this.BlackBoard.AddNode(t.NodeId, r);
        this.BlackBoard.AddNodeToStatusGroup(r, t.H6n);
        r.Init(this.BlackBoard, e, t, i, this.BtType);
        return r;
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
      this.BindingExpressionHolder = new BindingExpressionComponentHolder_1.BindingExpressionComponentHolder(this.BlackBoard);
      this.BindingExpressionHolder.Init();
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
      for (const r of Object.keys(e)) {
        var t = e[r];
        t.NodeId = Number(r);
        var i = this.GetNode(t.NodeId);
        if (i) {
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
    for (const i of Object.keys(e)) {
      var t = e[i];
      this.BlackBoard.UpdateTreeVar(i, t);
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
  UpdateNodeState(e, t, i) {
    var r;
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 1,
        Reason: e,
        NodeId: t,
        NodeStatus: i
      });
    } else if (r = this.GetNode(t)) {
      this.BlackBoard.UpdateNodeInStatusGroup(r, r.Status, i);
      r.UpdateStatus(e, i);
    } else {
      (r = new GeneralLogicTreeDefine_1.NodeInfo()).NodeId = t;
      r.H6n = i;
      this.CreateNode(e, r);
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
  UpdateChildQuestNodeState(e, t, i) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 3,
        NodeId: e,
        NodeStatus: t,
        Reason: i
      });
    } else if ((e = this.GetNode(e)) && e.NodeType === "ChildQuest") {
      e.UpdateChildQuestStatus(t, i);
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
    let i = true;
    for ([, t] of e) {
      if (t.NodeType === "ChildQuest" && !t.CanGiveUp) {
        i = false;
        break;
      }
    }
    return i;
  }
  GetProcessingCanGiveupFailedNode() {
    var t = this.GetNodesByGroupId(1);
    if (t) {
      let e = undefined;
      for (var [, i] of t) {
        if (i.NodeType === "QuestFailed" && i.CanGiveUp) {
          e = i;
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
      for (var [, i] of t) {
        if (i.NodeType === "QuestFailed") {
          e = i;
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
            for (const i of t) {
              this.YKt.push(i);
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
    for (const i of this.BlackBoard.GetCurrentExecuteActions()) {
      LevelGeneralController_1.LevelGeneralController.StopActionsExecute(i);
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
        if (!!this.BindingExpressionHolder?.IsValid() || !e) {
          this.BindingExpressionHolder?.EnableTrack(e, t);
        }
        if (!this.BindingExpressionHolder?.IsValid() || !e) {
          this.Expression.UpdateLevelPlayConditionalMarks();
          this.Expression.EnableTrack(e, t);
        }
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
  GetModifyTrackAreaConfig() {
    return this.BlackBoard.GetModifyTrackAreaConfig();
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
    if (this.BindingExpressionHolder?.IsValid()) {
      return this.BindingExpressionHolder.GetNodeTrackPosition();
    } else {
      return this.Expression?.GetNodeTrackPosition(e);
    }
  }
  GetClosestMapMarkId() {
    return this.Expression?.GetClosestMapMarkId() ?? 0;
  }
  GetTrackAreaInfo(e) {
    return this.Expression?.GetTrackAreaInfo(e);
  }
  GetTrackDistance(e) {
    if (this.BindingExpressionHolder?.IsValid()) {
      return this.BindingExpressionHolder.GetTrackDistance();
    } else {
      return this.Expression?.GetTrackDistance(e) ?? 0;
    }
  }
  GetDefaultMark(e) {
    if (this.BindingExpressionHolder?.IsValid()) {
      return this.BindingExpressionHolder.GetDefaultMark();
    } else {
      return this.Expression?.GetDefaultMark(e);
    }
  }
  IsInTrackRange() {
    return this.BlackBoard.ContainTag(13);
  }
  IsRangeTrack(e) {
    return this.GetRangeMarkSize(e) !== 0;
  }
  GetRangeMarkSize(e) {
    if (this.BindingExpressionHolder?.IsValid()) {
      return this.BindingExpressionHolder.GetRangeMarkSize();
    } else {
      return this.Expression?.GetRangeMarkSize(e) ?? 0;
    }
  }
  GetRangeMarkShowDis(e) {
    if (this.BindingExpressionHolder?.IsValid()) {
      return this.BindingExpressionHolder.GetRangeMarkShowDis();
    } else {
      return this.Expression?.GetRangeMarkShowDis(e) ?? 0;
    }
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
    } else if (this.GetCurrentNodeCustomTrackBoard()?.TrackPhoneMessageBoard) {
      return 5;
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
  GetCurrentNodeCustomTrackBoard() {
    for (const e of this.GetCurrentActiveChildQuestNodes()) {
      if (e.NodeType === "ChildQuest" && e.TrackCustomBoard) {
        return e.TrackCustomBoard;
      }
    }
  }
  DoAction(t, i, r, s, o, n, h) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 5,
        Context: t,
        NodeId: i,
        PlayerId: r,
        SessionId: s,
        StartIndex: o,
        EndIndex: n,
        NeedFinishReq: h
      });
    } else {
      var a;
      var l = this.BlackBoard.GetNodeConfig(i);
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
              a = t.R3u.t5n;
              a = l.SaveConfig?.InitConditionActions?.[a];
              e = a?.Action;
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
              e = l.StuckCheck[t.IId.c5n].Actions;
            }
            break;
          case Protocol_1.Aki.Protocol.TOs.Proto_RollBlockGamePlayActionCtx:
            if (l.Type === "ChildQuest" && l.Condition.Type === IQuest_1.EChildQuest.FinishRollBlock) {
              if (t.WMf?.h5n === Protocol_1.Aki.Protocol.QMf.Proto_RbEnter) {
                e = l.Condition.EnterActions;
              } else if (t.WMf?.h5n === Protocol_1.Aki.Protocol.QMf.Proto_RbMidWayExit) {
                e = l.Condition.ExitActions;
              } else if (t.WMf?.h5n === Protocol_1.Aki.Protocol.QMf.Proto_RbPass) {
                e = l.Condition.CompleteActions;
              }
            }
        }
        if (e && e.length !== 0) {
          this.BlackBoard.AddCurrentExecuteActions(s);
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(e, LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(this.BtType, this.TreeIncId, this.TreeConfigId, i, t.fvs), r, s, o, n, h, () => {
            this.BlackBoard.RemoveCurrentExecuteActions(s);
          });
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GeneralLogicTree", 18, "服务器推送执行行为时，没有找到行为配置", ["contextType", t.fvs], ["treeConfigId", this.TreeConfigId], ["nodeId", i]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "服务器推送执行行为时，没有找到节点配置", ["context", t], ["treeConfigId", this.TreeConfigId], ["nodeId", i]);
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
  UpdateOccupations(e, t, i) {
    if (this.BlackBoard.IsSleeping) {
      this.oQt({
        ProcessType: 7,
        SuspendNodeId: e,
        SuspendType: t,
        OccupationInfo: i
      });
    } else {
      this.Suspend.UpdateOccupations(e, t, i);
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
  AddGuaranteeActionInfo(e, t, i, r) {
    this.BlackBoard.AddGuaranteeActionInfo(e, t, i, r);
  }
  PopGuaranteeActionInfo(e, t, i = 2) {
    return this.BlackBoard.PopGuaranteeActionInfo(e, t, i);
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
      if (e &&= e.Entity.GetComponent(197)) {
        e.PlayDynamicFlowEnd();
      }
    }
    this.hQt.splice(0, this.hQt.length);
  }
}
//# sourceMappingURL=BaseBehaviorTree.js.map