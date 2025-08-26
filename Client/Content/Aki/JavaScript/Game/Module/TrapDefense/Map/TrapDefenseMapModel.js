"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMapModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const KscEnv_1 = require("../../../KuroSimpleCombat/KscEnv");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TrapDefenseDefine_1 = require("../TrapDefenseDefine");
const TrapDefenseCampMarkItem_1 = require("./Mark/TrapDefenseCampMarkItem");
const TrapDefenseMonsterMarkItem_1 = require("./Mark/TrapDefenseMonsterMarkItem");
const TrapDefensePhantomPointMarkItem_1 = require("./Mark/TrapDefensePhantomPointMarkItem");
const TrapDefensePlayerMarkItem_1 = require("./Mark/TrapDefensePlayerMarkItem");
const towerMapMarkConstructors = {
  [1]: TrapDefensePlayerMarkItem_1.TrapDefensePlayerMarkItem,
  2: TrapDefensePhantomPointMarkItem_1.TrapDefensePhantomPointMarkItem,
  3: TrapDefenseMonsterMarkItem_1.TrapDefenseMonsterMarkItem,
  4: TrapDefenseCampMarkItem_1.TrapDefenseCampMarkItem
};
class TrapDefenseMapModel {
  constructor() {
    this.Z3_ = 0;
    this.EDi = new Map();
    this.Q9c = new Map();
    this.PhantomRoutes = new Map();
    this.SplineComMap = new Map();
    this.iYu = new Map();
    this.rYu = 0;
  }
  get MapId() {
    return this.Z3_;
  }
  set MapId(e) {
    this.Z3_ = e;
  }
  get CampPosition() {
    var e;
    if (this.PhantomRoutes.size === 0 || (e = Array.from(this.PhantomRoutes.values())[0]).length === 0) {
      return Vector_1.Vector.Create(0, 0, 0);
    } else {
      return e[e.length - 1];
    }
  }
  static Create() {
    return new TrapDefenseMapModel();
  }
  GetDynamicMarkInfoByMarkId(e) {
    return this.EDi.get(e);
  }
  GetDynamicMarksByMarkType(e) {
    return this.Q9c.get(e) ?? [];
  }
  GetAllDynamicMarkInfo() {
    return this.EDi;
  }
  SetDynamicMarkInfoByMarkId(e) {
    this.EDi.set(e.MarkId, e);
    if (!this.Q9c.has(e.MarkType)) {
      this.Q9c.set(e.MarkType, []);
    }
    this.Q9c.get(e.MarkType)?.push(e);
  }
  RemoveDynamicMarkInfoByMarkId(e) {
    var r;
    var t = this.EDi.get(e);
    if (t) {
      this.EDi.delete(e);
      if ((r = this.Q9c.get(t.MarkType)) && (t = r.indexOf(t)) !== -1) {
        r.splice(t, 1);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseMapMarkRemoved, e);
    }
  }
  ClearDynamicMarks() {
    this.EDi.clear();
    this.Q9c.clear();
  }
  AddMark(e) {
    var r = towerMapMarkConstructors[e.MarkType];
    if (!this.EDi.has(e.MarkId)) {
      r = new r(e.MarkId, e.ExtraParam);
      this.EDi.set(e.MarkId, r);
      if (!this.Q9c.has(e.MarkType)) {
        this.Q9c.set(e.MarkType, []);
      }
      this.Q9c.get(e.MarkType)?.push(r);
    }
  }
  CreateMarks() {
    [{
      MarkId: TrapDefenseDefine_1.PLAYER_MARK_ID,
      MarkType: 1
    }, {
      MarkId: TrapDefenseDefine_1.CAMP_MARK_ID,
      MarkType: 4
    }, ...Array.from(this.PhantomRoutes.entries()).map(([e, r]) => ({
      MarkId: e + TrapDefenseDefine_1.PHANTOM_POINT_MARK_ID,
      MarkType: 2,
      ExtraParam: [e, r]
    }))].forEach(e => {
      this.AddMark(e);
    });
  }
  InitMapData() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData();
    if (e !== undefined) {
      if (e.Config.WorldKillZ) {
        if (KscEnv_1.KscEnv.KscWorld) {
          KscEnv_1.KscEnv.KscWorld?.SetWorldAttr(1, e.Config.WorldKillZ);
        } else {
          KscEnv_1.KscEnv.CacheWorldKillZ(e.Config.WorldKillZ);
        }
      }
      if (e.Config.ObstacleSegments) {
        var r = UE.NewArray(UE.KSC_Segment);
        for (const a of e.Config.ObstacleSegments) {
          if (a.ArrayInt && a.ArrayInt.length === 4) {
            r.Add(new UE.KSC_Segment(new UE.Vector(a.ArrayInt[0], a.ArrayInt[1], 0), new UE.Vector(a.ArrayInt[2], a.ArrayInt[3], 0)));
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("TowerDefense", 38, "[塔防地图] 初始化障碍物配置错误", ["Name", e.Config.Name]);
          }
        }
        if (KscEnv_1.KscEnv.KscWorld) {
          KscEnv_1.KscEnv.KscWorld?.SetObstacleSegments(r);
        } else {
          KscEnv_1.KscEnv.CacheObstacleSegments(r);
        }
      }
      this.InitSplineData();
      var t = ModelManager_1.ModelManager.TrapDefenseModel.GetCurrentBatchData();
      this.MapId = t.MapId;
      this.ClearDynamicMarks();
      this.CreateMarks();
    }
  }
  ChangeMap(e) {
    this.MapId = e;
  }
  InitSplineData() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData()?.Config.SplineList ?? [];
    this.PhantomRoutes.clear();
    this.ClearAllSpline();
    e.forEach(e => {
      var r = this.GetSplineComponent(e);
      var t = [];
      var a = r.GetSplineLength();
      var s = r.D_GetLocationAtDistanceAlongSpline(0, 1);
      var r = r.D_GetLocationAtDistanceAlongSpline(a, 1);
      t.push(Vector_1.Vector.Create(s.X, s.Y, s.Z));
      t.push(Vector_1.Vector.Create(r.X, r.Y, r.Z));
      this.PhantomRoutes.set(e, t);
    });
  }
  UpdateEnemyPositions(r) {
    var t;
    var a = this.GetDynamicMarksByMarkType(3);
    for (let e = 0; e < r.length; e++) {
      if (e < a.length) {
        t = r[e].Location;
        a[e].SetWorldPosition(t.X, t.Y, t.Z);
        a[e].EnemyType = r[e].EnemyType;
      } else {
        this.AddMark({
          MarkId: this.EDi.size + TrapDefenseDefine_1.PHANTOM_MARK_ID,
          MarkType: 3,
          ExtraParam: r[e].EnemyType
        });
      }
    }
    a.slice(r.length).forEach(e => {
      this.RemoveDynamicMarkInfoByMarkId(e.MarkId);
    });
  }
  GetSplineComponent(e) {
    if (!this.SplineComMap.has(e)) {
      this.gYu(e);
    }
    return this.SplineComMap.get(e);
  }
  GetAllSplineComponent() {
    return this.SplineComMap;
  }
  gYu(e) {
    var r;
    if (!this.SplineComMap.has(e)) {
      r = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(e, this.rYu, 3);
      this.SplineComMap.set(e, r);
      this.iYu.set(e, this.rYu);
      this.rYu++;
    }
  }
  ClearAllSpline() {
    this.SplineComMap.forEach((e, r) => {
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(r, this.iYu.get(r) ?? 0, 3);
    });
    this.SplineComMap.clear();
    this.iYu.clear();
    this.rYu = 0;
  }
}
exports.TrapDefenseMapModel = TrapDefenseMapModel;
//# sourceMappingURL=TrapDefenseMapModel.js.map