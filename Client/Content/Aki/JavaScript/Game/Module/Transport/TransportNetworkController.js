"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransportNetworkController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const GameSplineUtils_1 = require("../../LevelGamePlay/Common/GameSplineUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const TransportDefine_1 = require("./TransportDefine");
class TransportNetworkController extends ControllerBase_1.ControllerBase {
  static GetTransportSystem() {
    return UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroTransportNetworkSubsystem.StaticClass());
  }
  static OnInit() {
    Net_1.Net.Register(27271, TransportNetworkController.nhm);
    Net_1.Net.Register(21292, TransportNetworkController.shm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InitStaticEntity, this.bYf);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(27271);
    Net_1.Net.UnRegister(21292);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InitStaticEntity, this.bYf);
    return true;
  }
  static OnLeaveLevel() {
    TransportNetworkController.GetTransportSystem().CleanUpTransportNetwork();
    return !(this.IsLoadRoadway = false);
  }
  static SetKuroRoadwayEnable(r, e) {
    if (!(r.length <= 0)) {
      var t = TransportNetworkController.GetTransportSystem();
      var o = [];
      var a = UE.NewArray(UE.BuiltinInt);
      for (const n of r) {
        a.Add(n);
        if (!t.GetRoadWay(n)) {
          o.push(n);
        }
      }
      if (o.length > 0) {
        TransportNetworkController.CreateKuroRoadwayData(t, o);
      }
      t.SetRoadwayEnable(a, e);
    }
  }
  static CreateKuroRoadwayData(r, e) {
    for (const a of e) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(a);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 61, "[AddKuroRoadwayEntityData] 找不到pdDataId对应的数据", ["pbDataId", a]);
        }
        return;
      }
      var o = (0, puerts_1.$ref)(undefined);
      var t = TransportNetworkController.PackRoadWayCreateParamByEntity(t);
      if (t && ((0, puerts_1.$set)(o, t), o)) {
        r.AddRoadwayData(o);
      }
    }
  }
  static PackRoadWayCreateParamByEntity(e) {
    var t = Vector_1.Vector.Create(e.Transform?.Pos?.X ?? 0, e.Transform?.Pos?.Y ?? 0, e.Transform?.Pos?.Z ?? 0);
    var o = Rotator_1.Rotator.Create(e.Transform?.Rot?.Y ?? 0, e.Transform?.Rot?.Z ?? 0, e.Transform?.Rot?.X ?? 0);
    var a = (0, IComponent_1.getComponent)(e.ComponentsData, "SplineComponent");
    var n = (0, IComponent_1.getComponent)(e.ComponentsData, "BaseInfoComponent")?.PackId;
    if (a && n !== undefined) {
      a = a.Option;
      let r = false;
      for (const i of this.EntityLevelIds) {
        if (n === i) {
          r = true;
          break;
        }
      }
      if (r) {
        var s = UE.NewArray(UE.Vector);
        let r = 0;
        if (a.PavedWayConfig) {
          r = a.PavedWayConfig.AutoSprint ? 2 : 1;
        }
        var l = GameSplineUtils_1.GameSplineUtils.CreateCommonPoints(a.Points);
        if (t) {
          return new UE.RoadwayCreateParam(t.ToUeVectorOld(), o.ToUeRotator(), l, e.Id, a.Width, !!a.NoEntry, a.Opposite ?? 0, a.Last?.[0] ?? 0, a.Next?.[0] ?? 0, r, s);
        } else {
          return undefined;
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 61, "[AddKuroRoadwayEntityData] 找不到pdDataId对应的ComponentsData找不到SplineComponent", ["pbDataId", e.Id], ["pbDataId", n]);
    }
  }
  static FindPath(e, t, o = false, a = false, n = false) {
    var s = TransportNetworkController.GetTransportSystem();
    if (s) {
      var l = (0, puerts_1.$ref)(undefined);
      var i = (0, puerts_1.$ref)(undefined);
      var _ = (0, puerts_1.$ref)(undefined);
      let r = undefined;
      if (o) {
        r = s.D_FindPathForAutopilotRoute(e.ToUeVector(), t.ToUeVector(), l, i, _, n);
      } else {
        s.D_FindPath(e.ToUeVector(), t.ToUeVector(), l, i, _, n);
      }
      o = (0, puerts_1.$unref)(l);
      s = (0, puerts_1.$unref)(i);
      e = {
        RoadStartPoint: o,
        RoadEndPoint: s,
        Roadways: (0, puerts_1.$unref)(_),
        AutopilotRoute: undefined,
        RouteLength: r
      };
      if (a) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TransportFindPath, e);
      }
      if (n) {
        0;
        t = new UE.LinearColor(1, 0, 0, 0);
        l = Vector_1.Vector.Create(o);
        i = Vector_1.Vector.Create(s);
        UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, l.ToUeVector(), 30, 30, t, 30);
        UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, i.ToUeVector(), 30, 30, t, 30);
      }
      return e;
    }
  }
  static GetAssembleAutopilotRoute(r, e = true, t = false) {
    var o = UE.NewArray(UE.BuiltinInt);
    for (const a of r) {
      o.Add(a);
    }
    return TransportNetworkController.GetTransportSystem().GetAssembleAutopilotRoute(o, e, t, 60);
  }
  static TestAddData(r) {
    var e = TransportNetworkController.GetTransportSystem();
    var t = [];
    for (let r = 36000034; r <= 36000048; r++) {
      t.push(r);
    }
    for (let r = 36000002; r <= 36000031; r++) {
      t.push(r);
    }
    TransportNetworkController.CreateKuroRoadwayData(e, t);
  }
  static DebugDrawRoadWay(r) {
    var e = TransportNetworkController.GetTransportSystem();
    if (e) {
      for (const o of r) {
        var t = e.GetRoadWay(o);
        if (t) {
          t.DebugDraw(new UE.LinearColor(67, 255, 20, 1), 30, 0);
        }
      }
    }
  }
  static DebugDrawRoadwaysAtSameIntersection(r) {
    var e = TransportNetworkController.GetTransportSystem();
    if (e) {
      var t = (0, puerts_1.$ref)(undefined);
      if (e.GetRoadwaysAtSameIntersection(r, t)) {
        var o = (0, puerts_1.$unref)(t);
        var a = [];
        for (let r = 0; r < o.Num(); r++) {
          a.push(o.Get(r));
        }
        TransportNetworkController.DebugDrawRoadWay(a);
      }
    }
  }
  static DebugDrawCrossingRoads(r) {
    var e = TransportNetworkController.GetTransportSystem();
    if (e) {
      var t = (0, puerts_1.$ref)(undefined);
      if (e.GetCrossingRoads(r, t)) {
        var o = (0, puerts_1.$unref)(t);
        var a = [];
        for (let r = 0; r < o.Num(); r++) {
          a.push(o.Get(r));
        }
        TransportNetworkController.DebugDrawRoadWay(a);
      }
    }
  }
}
exports.TransportNetworkController = TransportNetworkController;
(_a = TransportNetworkController).IsLoadRoadway = false;
TransportNetworkController.RoadwayEnableCache = [];
TransportNetworkController.EntityLevelIds = [];
TransportNetworkController.bYf = r => {
  var r = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(r.d5n);
  if (r && r.MapConfigId && (_a.EntityLevelIds = r.EntityLevelIds, (r = (0, TransportDefine_1.getRoadZoneData)(r.MapConfigId)).length >= 1)) {
    TransportNetworkController.SetKuroRoadwayEnable(r, false);
  }
  _a.IsLoadRoadway = true;
  if (_a.RoadwayEnableCache.length > 0) {
    TransportNetworkController.SetKuroRoadwayEnable(_a.RoadwayEnableCache, true);
    _a.RoadwayEnableCache = [];
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TransportSystemInitDone);
  }
};
TransportNetworkController.shm = r => {
  if (!_a.IsLoadRoadway && r.Hnm.length > 0) {
    _a.RoadwayEnableCache = r.Hnm;
  } else {
    TransportNetworkController.SetKuroRoadwayEnable(r.Hnm, true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TransportSystemInitDone);
  }
};
TransportNetworkController.nhm = r => {
  TransportNetworkController.SetKuroRoadwayEnable(r.Hnm, r.yIs);
}; //# sourceMappingURL=TransportNetworkController.js.map