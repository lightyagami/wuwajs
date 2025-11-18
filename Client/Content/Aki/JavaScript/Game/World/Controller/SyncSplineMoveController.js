"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncSplineMoveController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTask_1 = require("../Define/WaitEntityTask");
const splineMoveStatusLogString = {
  [Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusInterrupt]: "中断",
  [Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusMoving]: "运行",
  [Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusStop]: "停止"
};
const WAIT_ENTITY_TIMEOUT = 60000;
class SyncSplineMoveController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(20124, this.OnMoveSplineStatusNotify);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(20124);
    return true;
  }
  static RecvSyncSplineMoveStatus(e, o) {
    switch (e.GetComponent(0)?.GetEntityType()) {
      case Protocol_1.Aki.Protocol.kks.HI_:
        this.RecvSyncVehicleSplineMoveStatus(e, o);
        break;
      case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
        this.RecvSyncSceneItemSplineMoveStatus(e, o);
    }
  }
  static RecvSyncSceneItemSplineMoveStatus(e, o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[SyncSplineMoveController.RecvSyncSceneItemSplineMoveStatus] 接收同步场景物件样条移动信息", ["CreatureDataId", o.F4n], ["SplineId", o.dTs], ["Status", splineMoveStatusLogString[o.bAc]], ["RuntimeData", o.yAc], ["Config", o.vAc]);
    }
    var t = e.GetComponent(132);
    if (t?.Valid) {
      switch (o.bAc) {
        case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusMoving:
          t.OnRecvSyncSplineMoving(o.dTs, o.vAc, o.yAc);
          break;
        case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusStop:
          t.OnRecvSyncSplineStop(o.dTs, o.vAc, o.yAc);
          break;
        case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusInterrupt:
          t.OnRecvSyncSplineInterrupt(o.dTs, o.vAc, o.yAc);
      }
    }
  }
  static SendSyncSceneItemSplineMoveRunning(o, t, e, n, r) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[SyncSplineMoveController.SendSyncSceneItemSplineMoveRunning] 发送同步场景物件样条移动运行中信息", ["CreatureDataId", o], ["SplineId", t], ["CurDistanceAlongSpline", e], ["CurPos", n], ["CurRot", r]);
    }
    var l = Protocol_1.Aki.Protocol.uAc.create();
    l.F4n = o;
    l.dTs = t;
    l.bAc = Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusMoving;
    l.wAc = Protocol_1.Aki.Protocol.PAc.create();
    l.wAc.RAc = e ?? -1;
    l.wAc.AAc = Protocol_1.Aki.Protocol.Gks.create();
    l.wAc.AAc.X = n.X;
    l.wAc.AAc.Y = n.Y;
    l.wAc.AAc.Z = n.Z;
    if (r) {
      l.wAc.hXu = Protocol_1.Aki.Protocol.D2s.create();
      l.wAc.hXu.Roll = r.Roll;
      l.wAc.hXu.Pitch = r.Pitch;
      l.wAc.hXu.Yaw = r.Yaw;
    }
    Net_1.Net.Call(27600, l, e => {
      if (!e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "[SyncSplineMoveController.SendSyncSceneItemSplineMoveRunning] 发送同步场景物件样条移动运行中信息: 失败", ["CreatureDataId", o], ["SplineId", t], ["ErrorCode", e?.Q4n]);
        }
      }
    });
  }
  static SendSyncSceneItemSplineMoveEnd(o, t, e, n, r, l) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[SyncSplineMoveController.SendSyncSceneItemSplineMoveEnd] 发送同步场景物件样条移动中断/结束信息", ["CreatureDataId", o], ["SplineId", t], ["CurDistanceAlongSpline", e], ["CurPos", n], ["CurRot", r], ["IsInterrupt", l]);
    }
    var i = Protocol_1.Aki.Protocol.uAc.create();
    i.F4n = o;
    i.dTs = t;
    i.bAc = l ? Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusInterrupt : Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusStop;
    i.wAc = Protocol_1.Aki.Protocol.PAc.create();
    i.wAc.RAc = e ?? -1;
    i.wAc.AAc = Protocol_1.Aki.Protocol.Gks.create();
    i.wAc.AAc.X = n.X;
    i.wAc.AAc.Y = n.Y;
    i.wAc.AAc.Z = n.Z;
    if (r) {
      i.wAc.hXu = Protocol_1.Aki.Protocol.D2s.create();
      i.wAc.hXu.Roll = r.Roll;
      i.wAc.hXu.Pitch = r.Pitch;
      i.wAc.hXu.Yaw = r.Yaw;
    }
    Net_1.Net.Call(27600, i, e => {
      if (!e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "[SyncSplineMoveController.SendSyncSceneItemSplineMoveEnd] 发送同步场景物件样条移动中断/结束信息: 失败", ["CreatureDataId", o], ["SplineId", t], ["ErrorCode", e?.Q4n]);
        }
      }
    });
  }
  static RecvSyncVehicleSplineMoveStatus(e, o) {
    switch (o.bAc) {
      case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusMoving:
        this.SyncVehicleMoveAlongPath(e, o.dTs);
        break;
      case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusStop:
      case Protocol_1.Aki.Protocol.bAc.Proto_MoveStatusInterrupt:
        this.SyncVehicleStopMove(e);
    }
  }
  static SendSyncVehicleSplineMoveEndRequest(e, o, t) {
    var n;
    var r = e.GetComponent(0);
    if (r) {
      r = r.GetCreatureDataId();
      (n = Protocol_1.Aki.Protocol.gAc.create()).F4n = MathUtils_1.MathUtils.NumberToLong(r);
      n.dTs = o;
      n.LAc = t;
      Net_1.Net.Call(27859, n, () => {});
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 50, "[SyncSplineMoveController.MoveSplineStatusNotify] 结束时无法获取对应实体CreatureData", ["EntityId", e.Id], ["SplineId", o], ["IsInterrupt", t]);
    }
  }
  static SyncVehicleMoveAlongPath(o, t) {
    var e;
    var n = o.GetComponent(240);
    if (n) {
      if ((e = n.GetMovingSplineId()) && e !== t) {
        n.StopMove();
      }
      n.MoveAlongPath({
        SplineId: t,
        StartFromNearest: true,
        OnMoveEndHandle: e => {
          if (e) {
            this.SendSyncVehicleSplineMoveEndRequest(o, t, false);
          }
        }
      });
    }
  }
  static SyncVehicleStopMove(e) {
    e = e.GetComponent(240);
    if (e) {
      e.StopMove();
    }
  }
}
exports.SyncSplineMoveController = SyncSplineMoveController;
(_a = SyncSplineMoveController).OnMoveSplineStatusNotify = o => {
  const t = MathUtils_1.MathUtils.LongToNumber(o.F4n);
  WaitEntityTask_1.WaitEntityTask.Create("MoveSplineStatusNotify", t, e => {
    if (e) {
      if ((e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t))?.Valid) {
        if (e?.IsInit) {
          _a.RecvSyncSplineMoveStatus(e.Entity, o);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Movement", 39, "[MoveSplineStatusNotify] 实体未初始化", ["CreatureId", t], ["SplineId", o.dTs], ["Status", splineMoveStatusLogString[o.bAc]]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 39, "[MoveSplineStatusNotify] 无法获取对应实体", ["CreatureId", t], ["SplineId", o.dTs], ["Status", splineMoveStatusLogString[o.bAc]]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 39, "[MoveSplineStatusNotify] 实体等待出错", ["CreatureId", t], ["SplineId", o.dTs], ["Status", splineMoveStatusLogString[o.bAc]]);
    }
  }, WAIT_ENTITY_TIMEOUT, true, true);
}; //# sourceMappingURL=SyncSplineMoveController.js.map