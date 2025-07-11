"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemMoveController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const SceneItemMoveComponent_1 = require("../Common/Component/SceneItemMoveComponent");
class MoveParam {
  constructor() {
    this.Points = [];
    this.IsLoop = false;
    this.MoveMotion = undefined;
    this.StopTime = undefined;
    this.Acceleration = undefined;
    this.MaxSpeed = undefined;
  }
}
class SceneItemMoveController extends ControllerBase_1.ControllerBase {
  static AddSceneItemMove(e, o, t, n, r = undefined) {
    var v = new MoveParam();
    v.Points = o;
    v.IsLoop = t;
    v.MoveMotion = n;
    v.StopTime = r;
    v.Acceleration = n.Type === IAction_1.EMoveMotion.VariableMotion ? n.Acceleration : -1;
    v.MaxSpeed = n.Type === IAction_1.EMoveMotion.VariableMotion ? n.MaxSpeed : -1;
    this._In.set(e, v);
    if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.OnSceneItemMoveBroken, this.OnStopCallback)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.OnSceneItemMoveBroken, this.OnStopCallback);
    }
    let i = -1;
    if (n.Type !== IAction_1.EMoveMotion.VariableMotion) {
      var c = e.GetComponent(1).ActorLocationProxy;
      var t = Vector_1.Vector.Create(o[o.length - 1].X ?? 0, o[o.length - 1].Y ?? 0, o[o.length - 1].Z ?? 0);
      if (Vector_1.Vector.Distance(c, t) < MathUtils_1.MathUtils.SmallNumber) {
        if (v.IsLoop) {
          this.mIn(e);
        }
        return;
      }
      var l = Vector_1.Vector.Create(o[o.length - 1].X ?? 0, o[o.length - 1].Y ?? 0, o[o.length - 1].Z ?? 0);
      l.SubtractionEqual(Vector_1.Vector.Create(o[0].X ?? 0, o[0].Y ?? 0, o[0].Z ?? 0));
      l.Normalize();
      for (let e = 1; e < o.length; e++) {
        var _ = Vector_1.Vector.Create(o[e].X ?? 0, o[e].Y ?? 0, o[e].Z ?? 0);
        _.SubtractionEqual(c);
        _.Normalize();
        if (_.DotProduct(l) > 0) {
          i = e;
          break;
        }
      }
      if (i === -1) {
        return;
      }
    } else {
      i = 0;
    }
    this.cIn(e, i);
  }
  static mIn(e, o = 1) {
    var t = this._In.get(e);
    if (t) {
      var n = e.GetComponent(128);
      if (n) {
        e = t.Points.slice();
        e.reverse();
        if (o > 0) {
          e.splice(0, o);
        }
        if (t.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion) {
          for (const i of e) {
            var r = Vector_1.Vector.Create(i.X ?? 0, i.Y ?? 0, i.Z ?? 0);
            n.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(r, -1, t.StopTime, t.MoveMotion.MaxSpeed ?? -1, t.MoveMotion.Acceleration ?? -1));
          }
        } else {
          for (const c of e) {
            var v = Vector_1.Vector.Create(c.X ?? 0, c.Y ?? 0, c.Z ?? 0);
            n.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(v, t.MoveMotion?.Time ?? -1, t.StopTime));
          }
        }
        if (t.IsLoop) {
          n.AddStopMoveCallbackWithEntity(SceneItemMoveController.dIn);
        } else {
          n.AddStopMoveCallbackWithEntity(SceneItemMoveController.OnStopCallback);
        }
      }
    }
  }
  static cIn(e, t = 1) {
    var n = this._In.get(e);
    if (n) {
      var r = e.GetComponent(128);
      if (r) {
        e = n.Points.slice();
        if (t > 0) {
          e.splice(0, t);
        }
        if (n.MoveMotion?.Type === IAction_1.EMoveMotion.VariableMotion) {
          let o = t > 0;
          for (const i of e) {
            var v = Vector_1.Vector.Create(i.X ?? 0, i.Y ?? 0, i.Z ?? 0);
            let e = n.StopTime;
            if (!o) {
              e = 0;
              o = true;
            }
            r.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(v, -1, e, n.MoveMotion.MaxSpeed ?? -1, n.MoveMotion.Acceleration ?? -1));
          }
        } else {
          for (const c of e) {
            var o = Vector_1.Vector.Create(c.X ?? 0, c.Y ?? 0, c.Z ?? 0);
            r.AddMoveTarget(new SceneItemMoveComponent_1.MoveTarget(o, n.MoveMotion?.Time ?? -1, n.StopTime));
          }
        }
        if (n.IsLoop) {
          r.AddStopMoveCallbackWithEntity(SceneItemMoveController.CIn);
        } else {
          r.AddStopMoveCallbackWithEntity(SceneItemMoveController.OnStopCallback);
        }
      }
    }
  }
}
exports.SceneItemMoveController = SceneItemMoveController;
(_a = SceneItemMoveController)._In = new Map();
SceneItemMoveController.CIn = e => {
  var o = e.GetComponent(128);
  if (o) {
    o?.RemoveStopMoveCallbackWithEntity(_a.CIn);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 31, "[LevelEventSceneItemMove] MoveToStartCallback");
    }
    SceneItemMoveController.mIn(e);
  }
};
SceneItemMoveController.dIn = e => {
  var o = e.GetComponent(128);
  if (o) {
    o?.RemoveStopMoveCallbackWithEntity(_a.dIn);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Event", 31, "[LevelEventSceneItemMove] MoveToEndCallback");
    }
    SceneItemMoveController.cIn(e);
  }
};
SceneItemMoveController.OnStopCallback = e => {
  var o = e.GetComponent(128);
  if (o) {
    o?.RemoveStopMoveCallbackWithEntity(_a.OnStopCallback);
    if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.OnSceneItemMoveBroken, _a.OnStopCallback)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnSceneItemMoveBroken, _a.OnStopCallback);
    }
    SceneItemMoveController._In.delete(e);
  }
}; //# sourceMappingURL=SecenItemMoveController.js.map