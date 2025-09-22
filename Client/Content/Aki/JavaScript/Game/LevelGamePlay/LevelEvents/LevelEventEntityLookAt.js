"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEntityLookAt = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const AiContollerLibrary_1 = require("../../AI/Controller/AiContollerLibrary");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const TURN_SPEED = 200;
const TOLERANCE = 10;
class LevelEventEntityLookAt extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.sDe = undefined;
    this.pDe = undefined;
    this.vDe = false;
    this.WTe = 0;
  }
  ExecuteNew(e, t) {
    if (e) {
      this.pDe = e;
      this.vDe = false;
      this.CreateWaitEntityTask(this.pDe.EntityId);
    } else {
      this.FinishExecute(false);
    }
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  ExecuteWhenEntitiesReady() {
    var e;
    var t;
    var i;
    var r;
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.pDe.EntityId);
    if (o) {
      e = (this.sDe = o).Entity.GetComponent(3);
      i = o.Entity.GetComponent(45)?.CharacterMovement;
      if (ObjectUtils_1.ObjectUtils.IsValid(i)) {
        this.WTe = i.MovementMode;
        i.MovementMode = 1;
        i = Vector_1.Vector.Create(this.pDe.Pos.X ?? 0, this.pDe.Pos.Y ?? 0, this.pDe.Pos.Z ?? 0);
        AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(e, i, TURN_SPEED);
        r = Vector_1.Vector.Create();
        t = Rotator_1.Rotator.Create();
        i.Subtraction(e.ActorLocationProxy, r);
        r.ToOrientationRotator(t);
        t.Pitch = 0;
        t.Roll = 0;
        i = Protocol_1.Aki.Protocol.ecs.create();
        (r = Protocol_1.Aki.Protocol.Zks.create()).F4n = o.CreatureDataId;
        r.P5n = e.ActorLocationProxy;
        r.g8n = t;
        i.iVn = [r];
        Net_1.Net.Send(18020, i);
        if (this.IsAsync) {
          this.FinishExecute(true);
        } else {
          this.vDe = true;
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 26, "执行转向动作时实体不存在:", ["PbDataId", this.pDe.EntityId]);
      }
      this.FinishExecute(true);
    }
  }
  OnTick(e) {
    var t;
    if (this.vDe) {
      if (this.sDe?.IsInit) {
        if ((t = this.sDe.Entity?.GetComponent(3)).InputRotatorProxy.Equals(t.ActorRotationProxy, TOLERANCE)) {
          t.Entity.GetComponent(45).CharacterMovement.MovementMode = this.WTe;
          this.FinishExecute(true);
        }
      } else {
        this.FinishExecute(true);
      }
    }
  }
  OnReset() {
    this.sDe = undefined;
    this.vDe = false;
    this.WTe = 0;
  }
}
exports.LevelEventEntityLookAt = LevelEventEntityLookAt;
//# sourceMappingURL=LevelEventEntityLookAt.js.map