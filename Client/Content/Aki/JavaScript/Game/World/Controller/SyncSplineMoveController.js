"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SyncSplineMoveController = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../Define/WaitEntityTask"),
  splineMoveStatusLogString = {
    [Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusInterrupt]: "中断",
    [Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusMoving]: "运行",
    [Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusStop]: "停止"
  },
  WAIT_ENTITY_TIMEOUT = 6e4;
class SyncSplineMoveController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return Net_1.Net.Register(20124, this.OnMoveSplineStatusNotify), !0
  }
  static OnClear() {
    return Net_1.Net.UnRegister(20124), !0
  }
  static RecvSyncSplineMoveStatus(e, t) {
    switch (e.GetComponent(0)?.GetEntityType()) {
      case Protocol_1.Aki.Protocol.kks.HI_:
        this.RecvSyncVehicleSplineMoveStatus(e, t);
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
        this.RecvSyncSceneItemSplineMoveStatus(e, t)
    }
  }
  static RecvSyncSceneItemSplineMoveStatus(e, t) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneItem", 39, "[SyncSplineMoveController.RecvSyncSceneItemSplineMoveStatus] 接收同步场景物件样条移动信息", ["CreatureDataId", t.F4n], ["SplineId", t.dTs], ["Status", splineMoveStatusLogString[t.bAc]], ["RuntimeData", t.yAc], ["Config", t.vAc]);
    var o = e.GetComponent(128);
    if (o?.Valid) switch (t.bAc) {
      case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusMoving:
        o.OnRecvSyncSplineMoving(t.dTs, t.vAc, t.yAc);
        break;
      case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusStop:
        o.OnRecvSyncSplineStop(t.dTs, t.vAc, t.yAc);
        break;
      case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusInterrupt:
        o.OnRecvSyncSplineInterrupt(t.dTs, t.vAc, t.yAc)
    }
  }
  static SendSyncSceneItemSplineMoveRunning(t, o, e, n) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneItem", 39, "[SyncSplineMoveController.SendSyncSceneItemSplineMoveRunning] 发送同步场景物件样条移动运行中信息", ["CreatureDataId", t], ["SplineId", o], ["CurDistanceAlongSpline", e], ["CurPos", n]);
    var r = Protocol_1.Aki.Protocol.uAc.create();
    r.F4n = t, r.dTs = o, r.bAc = Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusMoving, r.wAc = Protocol_1.Aki.Protocol.PAc.create(), r.wAc.RAc = e, r.wAc.AAc = Protocol_1.Aki.Protocol.Gks.create(), r.wAc.AAc.X = n.X, r.wAc.AAc.Y = n.Y, r.wAc.AAc.Z = n.Z, Net_1.Net.Call(27600, r, e => {
      e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[SyncSplineMoveController.SendSyncSceneItemSplineMoveRunning] 发送同步场景物件样条移动运行中信息: 失败", ["CreatureDataId", t], ["SplineId", o], ["ErrorCode", e?.Q4n])
    })
  }
  static SendSyncSceneItemSplineMoveEnd(t, o, e, n, r) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("SceneItem", 39, "[SyncSplineMoveController.SendSyncSceneItemSplineMoveEnd] 发送同步场景物件样条移动中断/结束信息", ["CreatureDataId", t], ["SplineId", o], ["CurDistanceAlongSpline", e], ["CurPos", n], ["IsInterrupt", r]);
    var l = Protocol_1.Aki.Protocol.uAc.create();
    l.F4n = t, l.dTs = o, l.bAc = r ? Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusInterrupt : Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusStop, l.wAc = Protocol_1.Aki.Protocol.PAc.create(), l.wAc.RAc = e, l.wAc.AAc = Protocol_1.Aki.Protocol.Gks.create(), l.wAc.AAc.X = n.X, l.wAc.AAc.Y = n.Y, l.wAc.AAc.Z = n.Z, Net_1.Net.Call(27600, l, e => {
      e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[SyncSplineMoveController.SendSyncSceneItemSplineMoveEnd] 发送同步场景物件样条移动中断/结束信息: 失败", ["CreatureDataId", t], ["SplineId", o], ["ErrorCode", e?.Q4n])
    })
  }
  static RecvSyncVehicleSplineMoveStatus(e, t) {
    switch (t.bAc) {
      case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusMoving:
        this.SyncVehicleMoveAlongPath(e, t.dTs);
        break;
      case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusStop:
      case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusInterrupt:
        this.SyncVehicleStopMove(e)
    }
  }
  static SendSyncVehicleSplineMoveEndRequest(e, t, o) {
    var n, r = e.GetComponent(0);
    r ? (r = r.GetCreatureDataId(), (n = Protocol_1.Aki.Protocol.gAc.create()).F4n = MathUtils_1.MathUtils.NumberToLong(r), n.dTs = t, n.LAc = o, Net_1.Net.Call(27859, n, () => {})) : Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 50, "[SyncSplineMoveController.MoveSplineStatusNotify] 结束时无法获取对应实体CreatureData", ["EntityId", e.Id], ["SplineId", t], ["IsInterrupt", o])
  }
  static SyncVehicleMoveAlongPath(t, o) {
    var e, n = t.GetComponent(236);
    n && ((e = n.GetMovingSplineId()) && e !== o && n.StopMove(), n.MoveAlongPath({
      SplineId: o,
      StartFromNearest: !0,
      OnMoveEndHandle: e => {
        e && this.SendSyncVehicleSplineMoveEndRequest(t, o, !1)
      }
    }))
  }
  static SyncVehicleStopMove(e) {
    e = e.GetComponent(236);
    e && e.StopMove()
  }
}
exports.SyncSplineMoveController = SyncSplineMoveController, (_a = SyncSplineMoveController).OnMoveSplineStatusNotify = t => {
  const o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
  WaitEntityTask_1.WaitEntityTask.Create("MoveSplineStatusNotify", o, e => {
    e ? (e = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid ? e?.IsInit ? _a.RecvSyncSplineMoveStatus(e.Entity, t) : Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 39, "[MoveSplineStatusNotify] 实体未初始化", ["CreatureId", o], ["SplineId", t.dTs], ["Status", splineMoveStatusLogString[t.bAc]]) : Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 39, "[MoveSplineStatusNotify] 无法获取对应实体", ["CreatureId", o], ["SplineId", t.dTs], ["Status", splineMoveStatusLogString[t.bAc]]) : Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 39, "[MoveSplineStatusNotify] 实体等待出错", ["CreatureId", o], ["SplineId", t.dTs], ["Status", splineMoveStatusLogString[t.bAc]])
  }, WAIT_ENTITY_TIMEOUT, !0, !0)
};
//# sourceMappingURL=SyncSplineMoveController.js.map