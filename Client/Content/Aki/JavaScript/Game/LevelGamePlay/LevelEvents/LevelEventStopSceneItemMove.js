"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventStopSceneItemMove = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneItemMoveComponent_1 = require("../../NewWorld/SceneItem/Common/Component/SceneItemMoveComponent");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventStopSceneItemMove extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
  }
  ExecuteNew(e, o) {
    if (e) {
      this.OPt = e;
      e = this.OPt.EntityIds;
      this.CreateWaitEntityTask(e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 31, "参数配置错误");
      }
      this.FinishExecute(false);
    }
  }
  ExecuteWhenEntitiesReady() {
    if (this.OPt) {
      var e = this.OPt.EntityIds;
      var o = [];
      var t = Protocol_1.Aki.Protocol.hta.create();
      t.uta = [];
      var r = this.OPt.StopType === IAction_1.EStopSceneItemMoveType.StopAtNextPos;
      for (const v of e) {
        var n = Protocol_1.Aki.Protocol.Sta.create();
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(v);
        if (i?.Valid) {
          var l = i.Entity.GetComponent(132);
          if (l?.Valid) {
            let e = undefined;
            if (r) {
              e = l.GetNextTarget();
            }
            var s = i.Entity.GetComponent(0);
            var c = i.Entity.GetComponent(1);
            n.F4n = MathUtils_1.MathUtils.NumberToLong(s.GetCreatureDataId());
            n.P5n = c.ActorLocationProxy;
            var s = {
              Entity: i.Entity,
              Location: Vector_1.Vector.Create(c.ActorLocationProxy),
              Velocity: e?.HasTarget ? e?.Velocity : undefined
            };
            if (r && e.HasTarget) {
              n.P5n = e.Target;
              s.Location = Vector_1.Vector.Create(e.Target);
              s.Velocity = e.Velocity;
            }
            if (l.IsMoving) {
              t.uta.push(n);
            }
            o.push(s);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 31, "Entity找不到SceneItemMoveComponent", ["entityId", v]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 31, "实体不合法", ["entityId", v]);
        }
      }
      Net_1.Net.Call(23742, t, e => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16562);
        }
      });
      for (const M of o) {
        var _ = M.Entity.GetComponent(132);
        _.StopMove();
        var a = Vector_1.Vector.Create(M.Entity.GetComponent(1)?.ActorLocationProxy);
        if (M.Velocity) {
          a = Vector_1.Vector.Distance(a, M.Location) / M.Velocity.Size();
          _.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(M.Location, a));
        }
      }
    }
  }
  OnReset() {
    this.OPt = undefined;
  }
}
exports.LevelEventStopSceneItemMove = LevelEventStopSceneItemMove;
//# sourceMappingURL=LevelEventStopSceneItemMove.js.map