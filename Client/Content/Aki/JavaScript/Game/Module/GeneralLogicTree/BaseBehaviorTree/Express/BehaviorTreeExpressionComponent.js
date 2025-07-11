"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorTreeExpressionComponent = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const MapDefine_1 = require("../../../Map/MapDefine");
const TrackDefine_1 = require("../../../Track/TrackDefine");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil");
const CheckPointEffectController_1 = require("./CheckPointEffectController");
const TrackEffectExpressController_1 = require("./TrackEffectExpressController");
const TrackMarkExpressController_1 = require("./TrackMarkExpressController");
const TrackTextExpressController_1 = require("./TrackTextExpressController");
class BehaviorTreeExpressionComponent {
  constructor(e) {
    this.Yre = e;
    this.yQt = undefined;
    this.IQt = undefined;
    this.TQt = undefined;
    this.LQt = undefined;
    this.DQt = (e, t, i, s) => {
      if (e.Type === 6 && (e = this.Yre.GetNode(e.NodeId)) && !e.ContainTag(1)) {
        this.yQt?.UpdateOnNodeStatusChange(e, i, s);
        this.TQt?.UpdateOnNodeStatusChange(this.Yre, e, i);
      }
    };
    this.RSe = (t, e, i, s) => {
      if (t.Type === 6) {
        t = this.Yre.GetNode(t.NodeId);
        if (t && t.NodeType === "ChildQuest" && t.ContainTag(0) && !t.ContainTag(1)) {
          let e = false;
          e = s === 1 ? i === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_EnterAction || i === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress : t.ShowTipBeforeEnterActions && i === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_EnterAction || !t.ShowTipBeforeEnterActions && i === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress;
          s = i === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Finished;
          this.TQt?.UpdateOnChildQuestNodeStatusChange(t, e, s);
          this.LQt?.UpdateOnChildQuestNodeStatusChange(t, e, s);
          this.IQt?.UpdateOnChildQuestNodeStatusChange(t, e, s);
        }
      }
    };
    this.UQt = (e, t, i) => {
      if (this.Yre.TreeIncId === e) {
        this.yQt?.OnSuspend(t, i);
        this.TQt?.OnSuspend(i);
      }
    };
    this.AQt = e => {
      if (this.Yre.TreeIncId === e) {
        this.yQt?.OnCancelSuspend();
        this.TQt?.OnCancelSuspend();
      }
    };
    this.PQt = () => {
      this.IQt?.OnBattleViewActive();
    };
    this.xQt = () => {
      this.IQt?.OnBattleViewHide();
    };
    this.wQt = (t, i) => {
      if (t && t.Type === 6 && i && t.TreeIncId === this.Yre.TreeIncId) {
        let e = undefined;
        switch (i.nvs) {
          case "vEs":
            e = i.vEs.TEs;
            break;
          case "mEs":
            e = i.mEs.SEs;
            break;
          case "gEs":
            e = [];
            for (const s of i.gEs.DEs) {
              e.concat(s.PEs);
            }
            break;
          case "MEs":
            e = i.MEs.F4n;
        }
        this.TQt?.GetNodeTrackMarkCreator(t.NodeId)?.OnNodeProgressChanged(e);
      }
    };
    this.BQt = e => {
      e = this.Yre.TreeIncId === e;
      this.yQt?.OnBtApplyExpressionOccupation(e);
      this.TQt?.OnBtApplyExpressionOccupation(e);
      this.IQt?.OnBtApplyExpressionOccupation(e);
      this.LQt?.OnBtApplyExpressionOccupation(e);
    };
    this.bQt = e => {
      e = this.Yre.TreeIncId === e;
      this.yQt?.OnBtReleaseExpressionOccupation(e);
      this.TQt?.OnBtReleaseExpressionOccupation(e);
      this.IQt?.OnBtReleaseExpressionOccupation(e);
      this.LQt?.OnBtReleaseExpressionOccupation(e);
    };
    this.yQt = new TrackTextExpressController_1.TrackTextExpressController(e);
    this.TQt = new TrackMarkExpressController_1.TrackMarkExpressController(e);
    this.IQt = new TrackEffectExpressController_1.TrackEffectExpressController(this, e);
    this.LQt = new CheckPointEffectController_1.CheckPointEffectController(e);
  }
  Init() {
    this.tQt();
  }
  Dispose() {
    this.EnableTrack(false, 2);
    this.yQt?.Clear();
    this.TQt?.Clear();
    this.IQt?.Clear();
    this.LQt?.EnableAllEffects(false);
    this.iQt();
  }
  EnableTrack(e, t = 0) {
    this.yQt?.EnableTrack(e, t);
    this.TQt?.EnableTrack(e);
    this.IQt?.EnableTrack(e);
    this.LQt?.EnableAllEffects(e);
  }
  RefreshMapMark(e) {
    this.TQt?.EnableTrack(e);
  }
  StartTextExpress(e = 0) {
    this.yQt?.StartTextExpress(e);
  }
  EndTextExpress(e = 0) {
    this.yQt?.EndTextExpress(e);
  }
  GetNodeTrackPosition(e) {
    return this.TQt?.GetNodeTrackMarkCreator(e)?.GetDefaultTrackPosition();
  }
  GetClosestMapMarkId() {
    if (!this.TQt) {
      return 0;
    }
    var e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (!e) {
      return 0;
    }
    var t;
    var i = this.TQt?.GetAllTrackMarkCreator();
    let s = MathUtils_1.MathUtils.MaxFloat;
    let r = 0;
    for ([, t] of i) {
      var n = t.GetWorldMapTrackPositions();
      if (n) {
        for (var [h, o] of n) {
          o = this.pW1(e, o);
          if (o < s) {
            s = o;
            r = h;
          }
        }
      }
    }
    return r;
  }
  GetTrackAreaInfo(e) {
    return this.TQt?.GetNodeTrackMarkCreator(e)?.GetTrackAreaInfo();
  }
  GetDefaultMark(e) {
    return this.TQt?.GetNodeTrackMarkCreator(e)?.DefaultMapMarkId;
  }
  GetTrackDistance(e) {
    var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (t && (e = this.GetNodeTrackPosition(e))) {
      return this.pW1(t, e);
    } else {
      return TrackDefine_1.INVALID_TRACKDISTANCE;
    }
  }
  GetRangeMarkSize(e) {
    e = this.TQt?.GetNodeTrackMarkCreator(e);
    if (e) {
      return e.MarkRange;
    } else {
      return 0;
    }
  }
  GetRangeMarkShowDis(e) {
    return (this.TQt?.GetNodeTrackMarkCreator(e)).RangeMarkShowDis;
  }
  CheckCanShow(e) {
    if (this.Yre.ContainTag(10)) {
      return true;
    }
    var t = this.Yre.GetAllNodes();
    if (t && t.size !== 0) {
      for (var [, i] of t) {
        if (!i.ContainTag(3) && i.ContainTag(0) && (!e || e(i))) {
          return true;
        }
      }
    }
    return false;
  }
  CheckCanShowTrackExpression() {
    return this.CheckCanShow(e => !e.ContainTag(1));
  }
  CreateMapMarks() {
    this.TQt?.CreateMapMarks();
  }
  tQt() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.PQt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DisActiveBattleView, this.xQt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation, this.BQt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation, this.bQt);
    EventSystem_1.EventSystem.AddWithTarget(this.Yre, EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange, this.RSe);
    EventSystem_1.EventSystem.AddWithTarget(this.Yre, EventDefine_1.EEventName.OnLogicTreeNodeProgressChange, this.wQt);
    EventSystem_1.EventSystem.AddWithTarget(this.Yre, EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.DQt);
    EventSystem_1.EventSystem.AddWithTarget(this.Yre, EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.UQt);
    EventSystem_1.EventSystem.AddWithTarget(this.Yre, EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend, this.AQt);
  }
  iQt() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.PQt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DisActiveBattleView, this.xQt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation, this.BQt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation, this.bQt);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Yre, EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange, this.RSe);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Yre, EventDefine_1.EEventName.OnLogicTreeNodeProgressChange, this.wQt);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Yre, EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.DQt);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Yre, EventDefine_1.EEventName.GeneralLogicTreeSuspend, this.UQt);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Yre, EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend, this.AQt);
  }
  pW1(e, t) {
    return Math.round(Vector_1.Vector.Distance(t, e) * MapDefine_1.FLOAT_0_01);
  }
}
exports.BehaviorTreeExpressionComponent = BehaviorTreeExpressionComponent;
//# sourceMappingURL=BehaviorTreeExpressionComponent.js.map