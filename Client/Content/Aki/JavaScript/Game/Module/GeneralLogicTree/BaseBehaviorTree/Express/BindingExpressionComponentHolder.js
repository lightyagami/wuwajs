"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BindingExpressionComponentHolder = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MissionViewDefine_1 = require("../../../BattleUi/Views/MissionView/MissionViewDefine");
const QuestUtil_1 = require("../../../QuestNew/QuestUtil");
const TrackDefine_1 = require("../../../Track/TrackDefine");
const TICK_INTERVAL = 100;
class BindingExpressionComponentHolder {
  constructor(t) {
    this.Yre = t;
    this.Shg = new Map();
    this.Mhg = new Set();
    this.Ehg = new Map();
    this.Ihg = new Map();
    this.Thg = new Map();
    this.jwg = new Map();
    this.bhg = false;
    this.Rhg = false;
    this.e8 = 0;
    this.Rqe = undefined;
    this.Lhg = 0;
    this.BindingMapTrackDataCache = new Map();
    this.whg = t => {
      var e;
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
      if (t?.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay && this.Mhg.has(t.TreeConfigId)) {
        if (!this.Mhg.has(this.Lhg)) {
          this.Lhg = t.TreeConfigId;
        }
        e = this.jwg.get(t.TreeConfigId) ?? 0;
        this.AddBindingExpression(e, t.TreeConfigId);
      }
    };
    this.Phg = (t, e) => {
      var i;
      var s;
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
      if (t?.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay && this.Mhg.has(t.TreeConfigId)) {
        if (!t?.GetBlackBoard()?.GetCurrentActiveChildQuestNode()) {
          i = this.Yre.ContainTag(16) || ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled";
          s = this.qhg();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, s, i);
        }
        this.RemoveBindingExpression(t.TreeConfigId);
      }
    };
    this.kFg = t => {
      var e;
      var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeByConfigId(Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay, t);
      if (t?.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay && this.Mhg.has(t.TreeConfigId)) {
        if (!this.Mhg.has(this.Lhg)) {
          this.Lhg = t.TreeConfigId;
        }
        e = this.jwg.get(t.TreeConfigId) ?? 0;
        this.AddBindingExpression(e, t.TreeConfigId);
      }
    };
    this.qFg = t => {
      t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeByConfigId(Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay, t);
      if (t?.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay && this.Mhg.has(t.TreeConfigId)) {
        this.RemoveBindingExpression(t.TreeConfigId);
      }
    };
    this.J_ = t => {
      this.Dhg(t);
      this.Ahg(t);
    };
  }
  Init() {
    this.Mhg.clear();
    this.Ore();
    this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "BindingExpressionComponentHolder");
  }
  Destroy() {
    this.Shg?.clear();
    this.Mhg.clear();
    this.BindingMapTrackDataCache.clear();
    this.Ehg.clear();
    this.Ihg.clear();
    this.Thg.clear();
    this.jwg.clear();
    this.kre();
    if (this.Rqe) {
      TickSystem_1.TickSystem.Remove(this.Rqe.Id);
      this.Rqe = undefined;
    }
    ModelManager_1.ModelManager.LevelPlayModel.EverBoundLevelPlayIds?.get(this.Yre.TreeConfigId)?.clear();
  }
  AddBindingExpression(t, e) {
    this.jwg.set(e, t);
    var i;
    var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeByConfigId(Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay, e);
    if (t?.Expression?.IsValid === true && ((i = ModelManager_1.ModelManager.LevelPlayModel.EverBoundLevelPlayIds)?.has(this.Yre.TreeConfigId) || i?.set(this.Yre.TreeConfigId, new Set()), i?.get(this.Yre.TreeConfigId)?.add(e), t.SetTrack(false), t.Expression.BoundParentTreeId = this.Yre.TreeIncId, this.Shg?.set(e, t.Expression), this.Lhg === e)) {
      this.Uhg();
    }
  }
  RemoveBindingExpression(t) {
    var e = this.Shg?.get(t);
    if (e) {
      e.BoundParentTreeId = undefined;
    }
    this.Shg?.delete(t);
    this.BindingMapTrackDataCache.delete(t);
    if (this.Lhg === t) {
      this.Uhg();
    }
  }
  AddWatchingLevelPlay(t) {
    this.Mhg.add(t);
  }
  RemoveWatchingLevelPlay(t) {
    this.Mhg.delete(t);
  }
  EnableTrack(t, e = 0) {
    if (this.IsBinding()) {
      for (var [i, s] of this.Shg) {
        s.EnableTrack(t && i === this.Lhg, e, true);
      }
      this.Bhg(t, e);
      this.khg(t, e);
      var r = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.Yre.TreeIncId)?.Expression;
      if (r) {
        r.ForceSetAllMapMarksVisible(!this.IsValid());
      }
    }
  }
  IsValid() {
    for (var [t] of this.Shg ?? []) {
      if (this.xhg(t)) {
        return true;
      }
    }
    return false;
  }
  IsBinding() {
    for (var [, t] of this.Shg ?? []) {
      if (t?.IsValid) {
        return true;
      }
    }
    return false;
  }
  OnBindingNodeUpdate() {
    this.Rhg = true;
  }
  GetShowData(t) {
    return this.qhg();
  }
  GetNodeIdByLevelPlayConfigId(t) {
    return this.jwg.get(t) ?? 0;
  }
  GetCurFocusLevelPlayId() {
    return this.Lhg;
  }
  xhg(t) {
    var e;
    return !!this.Shg?.get(t)?.IsValid && !(e = this.jwg.get(t) ?? 0, e = this.Yre.GetNode(e)?.TrackTarget?.TrackType, !ModelManager_1.ModelManager.LevelPlayModel?.GetLevelPlayInfo(t)?.IsInTrackRange() && e?.TrackSwitchRule === "SwitchByLevelPlayTrack");
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCreateBehaviorTree, this.whg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGeneralLogicTreeRemove, this.Phg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterLevelPlayNotify, this.kFg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveLevelPlayNotify, this.qFg);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCreateBehaviorTree, this.whg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGeneralLogicTreeRemove, this.Phg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterLevelPlayNotify, this.kFg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveLevelPlayNotify, this.qFg);
  }
  Bhg(t, e) {
    let i = 0;
    if (e === 1) {
      i = 2;
    }
    e = this.Yre.ContainTag(16) || ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() !== "Disabled";
    if (t) {
      if ((t = this.qhg()).MainStepInfo || t.SubStepInfos && t.SubStepInfos.length !== 0) {
        if (this.bhg) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText, t, e);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("GeneralLogicTree", 74, "更新追踪文本显示", ["showData", t]);
          }
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText, t, i, e);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("GeneralLogicTree", 74, "开始追踪文本显示", ["showData", t]);
          }
          this.bhg = true;
        }
      }
    } else if (this.bhg && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText, this.Yre.TreeIncId, i, e), this.bhg = false, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("GeneralLogicTree", 74, "结束追踪文本显示");
    }
  }
  khg(t, e) {
    if (t) {
      for (const i of this.Ohg()) {
        ControllerHolder_1.ControllerHolder.TrackController.StartTrack(i);
      }
    }
  }
  qhg(t = true) {
    t = this.Yre.CreateOriginalShowData(t);
    let e = t.BtType;
    let i = t.Id;
    let s = t.TreeConfigId;
    let r = 0n;
    var h = t.TrackIconConfigId;
    var n = t.TitleTextKey;
    let o = t.IsInChallenge;
    let a = t.ShowPriority;
    let _ = t.MainStepInfo;
    let v = [];
    var l = this.Shg.get(this.Lhg);
    if (l) {
      if ((l = l.CreateShowData()).MainStepInfo || (l.SubStepInfos?.length ?? 0) > 0) {
        e = l.BtType;
        i = l.Id;
        s = l.TreeConfigId;
        o = l.IsInChallenge || o;
        a = Math.max(l.ShowPriority, a);
        _ = l.MainStepInfo;
        v = l.SubStepInfos ?? [];
      }
      r = t.Id;
    }
    return MissionViewDefine_1.BehaviorTreeViewShowData.Create(e, i, s, o, h, a, n, _, v, r);
  }
  Ohg() {
    var t;
    var e;
    var i = QuestUtil_1.QuestUtil.GetQuestMarkIconPathByQuestId(this.Yre.TreeConfigId);
    var s = [];
    for ([t] of this.Shg) {
      if (this.xhg(t)) {
        if (t === this.Lhg) {
          for ([, e] of this.BindingMapTrackDataCache.get(t) ?? []) {
            for (const r of e) {
              r.IconPath = i;
              s.push(r);
            }
          }
        }
      }
    }
    return s;
  }
  Uhg() {
    var t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.Yre.TreeIncId);
    if (t && this.Yre.IsTracking) {
      t.SetTrack(false);
      t.SetTrack(true);
    }
  }
  Ahg(t) {
    if (this.IsValid()) {
      this.e8 += t;
      if (!(this.e8 < TICK_INTERVAL)) {
        this.e8 = 0;
        if (this.Rhg && this.Yre.IsTracking) {
          this.Rhg = false;
          this.EnableTrack(true);
        }
      }
    }
  }
  Dhg(t) {
    var e = this.Lhg;
    var i = ModelManager_1.ModelManager.LevelPlayModel.GetTrackBoundLevelPlayId();
    if (e !== i) {
      this.Lhg = i;
      if (this.Lhg && e) {
        if (this.xhg(i) && this.Yre.IsTracking) {
          this.EnableTrack(true);
        }
      } else {
        this.Uhg();
      }
    }
  }
  GetTrackDistance() {
    var t = this.OFg();
    return this.Shg.get(this.Lhg)?.GetTrackDistance(t?.NodeId ?? 0) ?? TrackDefine_1.INVALID_TRACKDISTANCE;
  }
  GetDefaultMark() {
    var t = this.OFg();
    return this.Shg.get(this.Lhg)?.GetDefaultMark(t?.NodeId ?? 0) ?? 0;
  }
  GetRangeMarkSize() {
    var t = this.OFg();
    return this.Shg.get(this.Lhg)?.GetRangeMarkSize(t?.NodeId ?? 0) ?? 0;
  }
  GetRangeMarkShowDis() {
    var t = this.OFg();
    return this.Shg.get(this.Lhg)?.GetRangeMarkShowDis(t?.NodeId ?? 0) ?? 0;
  }
  GetNodeTrackPosition() {
    var t = this.OFg();
    return this.Shg.get(this.Lhg)?.GetNodeTrackPosition(t?.NodeId ?? 0);
  }
  OFg() {
    var t = this.qhg();
    var t = ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.GetTitleTrackNodeId(t.MainStepInfo?.QuestScheduleType);
    var e = this.Shg.get(this.Lhg);
    if (t) {
      return e?.GetBlackBoard().GetNode(t);
    } else {
      return e?.GetBlackBoard().GetCurrentActiveChildQuestNode();
    }
  }
}
exports.BindingExpressionComponentHolder = BindingExpressionComponentHolder;
//# sourceMappingURL=BindingExpressionComponentHolder.js.map