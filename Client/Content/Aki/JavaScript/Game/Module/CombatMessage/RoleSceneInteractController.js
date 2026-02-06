"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var a;
  var l = arguments.length;
  var s = l < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, r);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (a = e[i]) {
        s = (l < 3 ? a(s) : l > 3 ? a(t, o, s) : a(t, o)) || s;
      }
    }
  }
  if (l > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSceneInteractController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatMessage_1 = require("./CombatMessage");
class RoleSceneInteractController extends ControllerBase_1.ControllerBase {
  static OnHookMoveNotify(e, t) {
    var o = e?.GetComponent(107);
    if (o?.Valid) {
      if (t.j6n === "CIl") {
        o.SimulateHookTargetEntity = undefined;
        o.SimulateHookTargetLocation ||= Vector_1.Vector.Create();
        o.SimulateHookTargetLocation.X = t.CIl.X;
        o.SimulateHookTargetLocation.Y = t.CIl.Y;
        o.SimulateHookTargetLocation.Z = t.CIl.Z;
      } else if (t.j6n === "TVn") {
        o.SimulateHookTargetLocation = undefined;
        const e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(t.TVn));
        o.SimulateHookTargetEntity = e;
      }
    } else {
      o = e?.GetComponent(57);
      if (o?.Valid) {
        if (t.j6n === "CIl") {
          o.SimulateInteractingTarget = undefined;
          o.SimulateInteractingTargetLocation ||= Vector_1.Vector.Create();
          o.SimulateInteractingTargetLocation.X = t.CIl.X;
          o.SimulateInteractingTargetLocation.Y = t.CIl.Y;
          o.SimulateInteractingTargetLocation.Z = t.CIl.Z;
        } else if (t.j6n === "TVn") {
          if (t.HBg === Protocol_1.Aki.Protocol.jBg.Proto_Pull) {
            var r = o;
            const e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(t.TVn));
            r.SimulatePullingTarget = e?.Entity?.GetComponent(90);
          } else {
            o.SimulateInteractingTargetLocation = undefined;
            const e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(t.TVn));
            o.SimulateInteractingTarget = e?.Entity?.GetComponent(90);
          }
        }
      }
    }
  }
  static SendHookMovePush(e, t) {
    var o;
    if (e?.GetComponent(1)?.IsAutonomousProxy) {
      (o = Protocol_1.Aki.Protocol.Ae_.create()).F4n = MathUtils_1.MathUtils.NumberToLong(e.GetComponent(0).GetCreatureDataId());
      if (t.IsMovable()) {
        o.j6n = "TVn";
        o.TVn = MathUtils_1.MathUtils.NumberToLong(t.Entity.GetComponent(0).GetCreatureDataId());
      } else {
        o.j6n = "CIl";
        o.CIl = Protocol_1.Aki.Protocol.Gks.create();
        o.CIl.X = t.HookLocation.X;
        o.CIl.Y = t.HookLocation.Y;
        o.CIl.Z = t.HookLocation.Z;
      }
      CombatMessage_1.CombatNet.Send(25892, e, o);
    }
  }
  static SendPullCollectionPush(e, t) {
    var o;
    if (e?.GetComponent(1)?.IsAutonomousProxy) {
      (o = Protocol_1.Aki.Protocol.Ae_.create()).F4n = MathUtils_1.MathUtils.NumberToLong(e.GetComponent(0).GetCreatureDataId());
      o.HBg = Protocol_1.Aki.Protocol.jBg.Proto_Pull;
      o.j6n = "TVn";
      o.TVn = MathUtils_1.MathUtils.NumberToLong(t.Entity.GetComponent(0).GetCreatureDataId());
      CombatMessage_1.CombatNet.Send(25892, e, o);
    }
  }
}
__decorate([CombatMessage_1.CombatNet.Listen("ZFn", false)], RoleSceneInteractController, "OnHookMoveNotify", null);
exports.RoleSceneInteractController = RoleSceneInteractController; //# sourceMappingURL=RoleSceneInteractController.js.map