"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEntityTurnTo = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEntityTurnTo extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.pDe = undefined;
    this.sDe = undefined;
    this.zpe = (e, t) => {
      if (this.sDe === t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 26, "实体被移除 LevelEventEntityTurnTo保底结束", ["PbDataId", t.PbDataId]);
        }
        this.ej_();
      }
    };
    this.ej_ = () => {
      if (EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
      this.FinishExecute(true);
    };
  }
  ExecuteNew(e, t, o) {
    this.pDe = e;
    this.CreateWaitEntityTask(this.pDe.EntityId);
  }
  ExecuteWhenEntitiesReady() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.pDe.EntityId);
    if (t?.IsInit) {
      var o = t.Entity.GetComponent(46);
      if (o) {
        let e = undefined;
        switch (this.pDe.Target.Type) {
          case 2:
            {
              const n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.pDe.Target.EntityId)?.Entity?.GetComponent(1);
              if (n) {
                e = Vector_1.Vector.Create(n.ActorLocationProxy);
              }
              break;
            }
          case 3:
            (e = Vector_1.Vector.Create()).FromConfigVector(this.pDe.Target.Pos);
            break;
          case 4:
            {
              const n = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(1);
              if (n) {
                e = Vector_1.Vector.Create(n.ActorLocationProxy);
              }
              break;
            }
        }
        if (e) {
          const n = t.Entity.GetComponent(1);
          var r = Vector_1.Vector.Create();
          var i = Rotator_1.Rotator.Create();
          e.Subtraction(n.ActorLocationProxy, r);
          r.ToOrientationRotator(i);
          i.Pitch = 0;
          i.Roll = 0;
          var r = Protocol_1.Aki.Protocol.ecs.create();
          var s = Protocol_1.Aki.Protocol.Zks.create();
          s.F4n = t.CreatureDataId;
          s.P5n = n.ActorLocationProxy;
          s.g8n = i;
          r.iVn = [s];
          Net_1.Net.Send(17569, r);
          if (this.IsAsync) {
            o.PerformTurn(2, {
              TargetLocation: e
            });
            this.FinishExecute(true);
          } else {
            this.sDe = t;
            EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.zpe);
            o.PerformTurn(2, {
              TargetLocation: e
            }, undefined, this.ej_);
          }
        } else {
          this.FinishExecute(true);
        }
      } else {
        this.FinishExecute(true);
      }
    } else {
      this.FinishExecute(true);
    }
  }
}
exports.LevelEventEntityTurnTo = LevelEventEntityTurnTo;
//# sourceMappingURL=LevelEventEntityTurnTo.js.map