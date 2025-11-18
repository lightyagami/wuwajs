"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldNavigation = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const DEBUG_SPHERE_DEFAULT_RADIUS = 30;
const DEBUG_SPHERE_DEFAULT_SEGMENTS = 30;
const DEBUG_SPHERE_DEFAULT_DURATION = 180;
class WorldNavigation {
  static SetEnableDebug(o) {
    WorldNavigation.EnableDebug = o;
  }
  static FindPath(e) {
    var o = Protocol_1.Aki.Protocol.JU1.create();
    o.R71 = {
      X: e.SourcePosition.X,
      Y: e.SourcePosition.Y,
      Z: e.SourcePosition.Z
    };
    o.L71 = {
      X: e.DestPosition.X,
      Y: e.DestPosition.Y,
      Z: e.DestPosition.Z
    };
    o.w7n = e.MapId;
    Net_1.Net.Call(27173, o, o => {
      var a = o?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs;
      if (a) {
        WorldNavigation.OQ1(o, e);
      }
      if (e.Callback) {
        e.Callback(a);
      }
    });
  }
  static qQ1(a, e, o, t) {
    let i = undefined;
    o = {
      Points: i = t >= e.length - 1 ? e.slice(o) : e.slice(o, t),
      Navigation: true,
      ReturnFalseWhenNavigationFailed: true,
      IsFly: false,
      DebugMode: true,
      Loop: false,
      Callback: o => {
        if (t >= e.length) {
          WorldNavigation.GQ1(a);
        } else {
          WorldNavigation.qQ1(a, e, t, t + 3);
        }
      }
    };
    a.MoveComponent?.MoveAlongPath(o);
  }
  static GQ1(o) {
    var a;
    if (!!o.DistanceThreshold && !!o.TryFindPathTimes && !(o.TryFindPathTimes <= 0)) {
      o.TryFindPathTimes--;
      if ((a = o.MoveComponent?.ActorComp?.ActorLocation) && UE.VectorDouble.Dist(a, o.DestPosition.ToUeVector()) > o.DistanceThreshold) {
        o.SourcePosition = Vector_1.Vector.Create(a.X, a.Y, a.Z);
        WorldNavigation.FindPath(o);
      }
    }
  }
  static TestFindPath(o, a) {
    var e;
    var t;
    if (WorldNavigation.EnableDebug && (e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(45), t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(3)?.ActorLocation)) {
      t = {
        SourcePosition: Vector_1.Vector.Create(t.X, t.Y, t.Z),
        DestPosition: o,
        MapId: ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId,
        MoveComponent: e,
        DistanceThreshold: 2000,
        TryFindPathTimes: 5,
        Callback: a
      };
      WorldNavigation.FindPath(t);
    }
  }
  static FQ1(o) {
    var a = DEBUG_SPHERE_DEFAULT_RADIUS;
    var e = DEBUG_SPHERE_DEFAULT_DURATION;
    var t = new UE.LinearColor(1, 0, 0, 0);
    for (const i of o) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, i.ToUeVector(true), a, DEBUG_SPHERE_DEFAULT_SEGMENTS, t, e);
    }
  }
}
(exports.WorldNavigation = WorldNavigation).EnableDebug = false;
WorldNavigation.OQ1 = (a, o) => {
  var e = [];
  var t = [];
  if (a) {
    for (let o = 0; o < a.rS_.length; o++) {
      var i = a.rS_[o];
      var i = Vector_1.Vector.Create(i.X, i.Y, i.Z);
      var r = {
        Index: o,
        Position: i
      };
      e.push(r);
      t.push(i);
    }
    WorldNavigation.FQ1(t);
    WorldNavigation.qQ1(o, e, 0, 3);
  }
}; //# sourceMappingURL=WorldNavigation.js.map