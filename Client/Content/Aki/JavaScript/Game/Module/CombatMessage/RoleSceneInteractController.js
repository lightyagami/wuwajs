"use strict";

var __decorate = this && this.__decorate || function (e, o, t, r) {
  var a;
  var l = arguments.length;
  var s = l < 3 ? o : r === null ? r = Object.getOwnPropertyDescriptor(o, t) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, o, t, r);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (a = e[i]) {
        s = (l < 3 ? a(s) : l > 3 ? a(o, t, s) : a(o, t)) || s;
      }
    }
  }
  if (l > 3 && s) {
    Object.defineProperty(o, t, s);
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
  static OnHookMoveNotify(e, o) {
    var t = e?.GetComponent(99);
    if (t) {
      if (o.j6n === "CIl") {
        t.SimulateHookTargetEntity = undefined;
        t.SimulateHookTargetLocation ||= Vector_1.Vector.Create();
        t.SimulateHookTargetLocation.X = o.CIl.X;
        t.SimulateHookTargetLocation.Y = o.CIl.Y;
        t.SimulateHookTargetLocation.Z = o.CIl.Z;
      } else if (o.j6n === "TVn") {
        t.SimulateHookTargetLocation = undefined;
        const e = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(o.TVn));
        t.SimulateHookTargetEntity = e;
      }
    }
  }
  static SendHookMoveRequest(e, o) {
    var t;
    if (e?.GetComponent(1)?.IsAutonomousProxy) {
      (t = Protocol_1.Aki.Protocol.Ae_.create()).F4n = MathUtils_1.MathUtils.NumberToLong(e.GetComponent(0).GetCreatureDataId());
      if (o.IsMovable()) {
        t.j6n = "TVn";
        t.TVn = MathUtils_1.MathUtils.NumberToLong(o.Entity.GetComponent(0).GetCreatureDataId());
      } else {
        t.j6n = "CIl";
        t.CIl = Protocol_1.Aki.Protocol.Gks.create();
        t.CIl.X = o.HookLocation.X;
        t.CIl.Y = o.HookLocation.Y;
        t.CIl.Z = o.HookLocation.Z;
      }
      CombatMessage_1.CombatNet.Send(19537, e, t);
    }
  }
}
__decorate([CombatMessage_1.CombatNet.Listen("ZFn", false)], RoleSceneInteractController, "OnHookMoveNotify", null);
exports.RoleSceneInteractController = RoleSceneInteractController; //# sourceMappingURL=RoleSceneInteractController.js.map