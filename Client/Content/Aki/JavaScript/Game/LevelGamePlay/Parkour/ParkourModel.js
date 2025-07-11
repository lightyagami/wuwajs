"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParkourModel = exports.ParkourConfig = exports.ParkourPointInfo = undefined;
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class ParkourPointInfo {
  constructor(r) {
    this.Point = undefined;
    this.IsRecycled = false;
    this.Point = r;
    this.IsRecycled = false;
  }
}
exports.ParkourPointInfo = ParkourPointInfo;
class ParkourConfig {
  constructor() {
    this.TAe = 0;
    this.LAe = undefined;
    this.DAe = undefined;
    this.RAe = 0;
    this.nx = undefined;
    this.UAe = undefined;
    this.mC = undefined;
    this.AAe = undefined;
    this.PAe = undefined;
  }
  set ConfigId(r) {
    this.TAe = r;
  }
  get ConfigId() {
    return this.TAe;
  }
  set ParkourActorList(r) {
    this.DAe = r;
  }
  get ParkourActorList() {
    return this.DAe;
  }
  set ParkourContext(r) {
    this.nx = r;
  }
  get ParkourContext() {
    return this.nx;
  }
  get ParkourInfo() {
    return this.LAe;
  }
  set ParkourInfo(r) {
    this.LAe = r;
  }
  set CurCheckPointCount(r) {
    this.RAe = r;
  }
  get CurCheckPointCount() {
    return this.RAe;
  }
  set OriginLocation(r) {
    this.UAe = r;
  }
  get OriginLocation() {
    return this.UAe;
  }
  set OriginRotation(r) {
    this.mC = r;
  }
  get OriginRotation() {
    return this.mC;
  }
  get TotalScore() {
    return this.AAe;
  }
  get MatchRoleOption() {
    return this.PAe;
  }
  set MatchRoleOption(r) {
    this.PAe = r;
  }
  ClearTotalScore() {
    this.AAe = new Map();
  }
  ClearParkourActorList() {
    if (this.DAe?.length) {
      for (const o of this.DAe) {
        if (o?.length > 0) {
          for (const t of o) {
            var r = t.Point;
            if (!t.IsRecycled && r?.IsValid()) {
              r.ReceiveEndPlay(0);
              ActorSystem_1.ActorSystem.Put("ParkourConfig.ClearParkourActorList", r);
            }
          }
        }
      }
      this.DAe.length = 0;
    }
  }
}
exports.ParkourConfig = ParkourConfig;
class ParkourModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.xAe = new Map();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.xAe.clear();
    return true;
  }
  AddParkour(r, o, t) {
    var e;
    var i;
    var n;
    var s;
    if (this.xAe.get(r)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 7, "[ParkourModel.AddParkour] 添加相同跑酷路线", ["ParkourConfigId", r]);
      }
      return false;
    } else if (n = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(r)) {
      e = Vector_1.Vector.Create(n.Transform?.Pos.X ?? 0, n.Transform?.Pos.Y ?? 0, n.Transform?.Pos.Z ?? 0);
      i = Rotator_1.Rotator.Create(n.Transform?.Rot?.Y ?? 0, n.Transform?.Rot?.Z ?? 0, n.Transform?.Rot?.X ?? 0);
      if (n = (0, IComponent_1.getComponent)(n.ComponentsData, "SplineComponent")) {
        if (n.Option.Type !== IComponent_1.ESplineType.Parkour) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Level", 7, "[ParkourModel.AddParkour] SplineComponent配置类型不是parkour", ["ParkourConfigId", r]);
          }
          return false;
        } else {
          (s = new ParkourConfig()).OriginLocation = e;
          s.OriginRotation = i;
          s.ParkourContext = LevelGeneralContextDefine_1.GeneralContext.Copy(o);
          s.ConfigId = r;
          s.ParkourInfo = n.Option;
          s.CurCheckPointCount = n.Option.CheckPointsRequire;
          s.MatchRoleOption = t;
          this.xAe.set(r, s);
          return true;
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Level", 7, "[ParkourModel.AddParkour] 无法找到SplineComponent配置", ["ParkourConfigId", r]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 7, "[ParkourModel.AddParkour] 无法找到spline entity", ["ParkourConfigId", r]);
      }
      return false;
    }
  }
  RemoveParkour(r) {
    var o = this.xAe.get(r);
    if (o) {
      o.ClearParkourActorList();
      o.ParkourContext?.Release();
      this.xAe.delete(r);
    }
  }
  GetParkour(r) {
    return this.xAe.get(r);
  }
}
exports.ParkourModel = ParkourModel;
//# sourceMappingURL=ParkourModel.js.map