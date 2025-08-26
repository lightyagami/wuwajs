"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseEventPreviewMonsterSpawner = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Pool_1 = require("../../../Core/Container/Pool");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const TimeUtil_1 = require("../../Common/TimeUtil");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TowerDefenseEventRemoveReason_1 = require("./Define/TowerDefenseEventRemoveReason");
const TowerDefenseEventEntityModel_1 = require("./Model/TowerDefenseEventEntityModel");
const TowerDefenseEventConfig_1 = require("./TowerDefenseEventConfig");
const SPLINE_POOL_SIZE = 10;
const MAX_TICK_DELTA = 1000;
class TowerDefenseEventSplineMonsterSpawner {
  constructor() {
    this.OQt = undefined;
    this.Htn = 0;
    this.Hid = 0;
    this._0e = 0;
    this.Xjc = [];
    this.Yjc = new Map();
    this.Jjc = 0;
    this.Zjc = 0;
  }
  Init(e, t, r) {
    this.OQt = e;
    this.Htn = t;
    this.Hid = TimeUtil_1.TimeUtil.SetTimeMillisecond(r._ed);
    this._0e = TimeUtil_1.TimeUtil.SetTimeMillisecond(r.ued);
    this.Jjc = this.Hid;
    this.Zjc = 0;
    for (const o of r.T7u) {
      var s = TowerDefenseEventEntityModel_1.TowerDefenseEventMonsterModel.InitFromConfigId(o);
      var i = TowerDefenseEventConfig_1.TowerDefenseEventConfig.FillUpModelInfo(s);
      if (i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefenseEvent", 60, "初始化预览怪物失败: " + i, ["configId", s.ConfigId], ["templateId", s.TemplateId], ["combatId", s.CombatId], ["subTypeId", s.SubTypeId]);
        }
        s.Release();
      } else {
        this.Xjc.push(s);
      }
    }
  }
  OnTick(e) {
    if (this.Xjc.length !== 0 && !(e > MAX_TICK_DELTA) && !(this.Jjc -= e, this.Jjc > 0)) {
      this.Zjc %= this.Xjc.length;
      this.e9c();
      this.Jjc = this.Jjc % this._0e + this._0e;
      this.Zjc += 1;
    }
  }
  e9c() {
    var t = this.Xjc[this.Zjc];
    if (t) {
      var r;
      var s;
      var i = this.OQt.GetSpawnUid();
      let e = undefined;
      if (!!this.Htn && !(e = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.Htn, i, 3))) {
        ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(this.Htn, i, 3);
      }
      if (e) {
        r = e.D_GetLocationAtSplinePoint(0, 1);
        s = e.GetRotationAtSplinePoint(0, 1);
        s = new UE.TransformDouble(s, r, Vector_1.Vector.OneVectorDouble);
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AsyncAddEntity({
          CreatureId: i,
          SimpleCombatId: t.CombatId,
          AssetPath: t.AssetPath,
          PropertyId: t.PropertyId,
          Transform: s,
          Spline: e,
          IsPreview: true
        });
        this.Yjc.set(i, t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("TowerDefenseEvent", 60, "预览怪物生成失败，样条线组件未找到", ["configId", t.ConfigId], ["splineId", this.Htn]);
      }
    }
  }
  RemovePreviewMonster(e) {
    var t = this.Yjc.get(e);
    if (t) {
      if (t.SplineId) {
        ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(t.SplineId, e, 3);
      }
      this.Yjc.delete(e);
    }
  }
  BJc() {
    this.Yjc.forEach((e, t) => {
      ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.RemoveEntity(t, TowerDefenseEventRemoveReason_1.TowerDefenseEventRemoveReason.Preview);
      if (e.SplineId) {
        ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(e.SplineId, t, 3);
      }
    });
    this.Yjc.clear();
    for (const e of this.Xjc) {
      e.Release();
    }
    this.Xjc.length = 0;
  }
  Reset() {
    this.BJc();
  }
}
class TowerDefenseEventPreviewMonsterSpawner {
  constructor() {
    this.zjc = 0;
    this.$id = new Map();
    this.AJc = [];
    this.PJc = new Map();
  }
  Init(e) {
    this.Reset();
    this.DJc(e);
    this.xJc();
  }
  xJc() {
    ModelManager_1.ModelManager.TowerDefenseEventModel.GetWaveSplineIds(this.AJc);
    for (const r of this.AJc) {
      var e;
      var t;
      if (ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(r, 0, 3)) {
        if ((e = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(r)).SplineData?.Type !== IComponent_1.ESplineType.Effect) {
          ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(r, 0, 3);
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("TowerDefenseEvent", 60, "预览怪物组样条线类型错误", ["splineId", r], ["splineType", e.SplineData?.Type]);
          }
        } else {
          t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, e.SplineData.Effect, "TowerDefenseEventPreviewMonsterSpawner.PreviewSplines", new EffectContext_1.EffectContext(undefined, e));
          if (EffectSystem_1.EffectSystem.IsValid(t)) {
            EffectSystem_1.EffectSystem.GetEffectActor(t).K2_AttachToActor(e, undefined, 2, 2, 2, false);
            EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(t, true);
          }
          this.PJc.set(r, t);
        }
      } else {
        ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(r, 0, 3);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefenseEvent", 60, "预览怪物组样条线加载失败", ["splineId", r]);
        }
      }
    }
  }
  UJc() {
    for (var [e, t] of this.PJc.entries()) {
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(e, 0, 3);
      if (EffectSystem_1.EffectSystem.IsValid(t)) {
        EffectSystem_1.EffectSystem.StopEffectById(t, "TowerDefenseEventPreviewMonsterSpawner.ReleaseSplines", true);
      }
    }
    this.PJc.clear();
    this.AJc.length = 0;
  }
  DJc(e) {
    for (const s in e) {
      var t = e[s];
      if (t && t.T7u.length !== 0) {
        var r = Number(s);
        if (isNaN(r)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("TowerDefenseEvent", 60, "预览怪物组样条线ID无效", ["splineId", s]);
          }
        } else {
          let e = TowerDefenseEventPreviewMonsterSpawner.Wid.Get();
          (e = e || TowerDefenseEventPreviewMonsterSpawner.Wid.Create()).Init(this, r, t);
          this.$id.set(r, e);
        }
      }
    }
  }
  GetSpawnUid() {
    return ++this.zjc;
  }
  OnTick(e) {
    if (this.$id.size !== 0) {
      for (const t of this.$id.values()) {
        t.OnTick(e);
      }
    }
  }
  Qid() {
    this.$id.forEach(e => {
      e.Reset();
      TowerDefenseEventPreviewMonsterSpawner.Wid.Put(e);
    });
    this.$id.clear();
  }
  RemovePreviewMonster(e) {
    for (const t of this.$id.values()) {
      t.RemovePreviewMonster(e);
    }
  }
  Reset() {
    this.zjc = 0;
    this.UJc();
    this.Qid();
  }
  Clear() {
    this.Reset();
    TowerDefenseEventPreviewMonsterSpawner.Wid.Clear();
  }
}
(exports.TowerDefenseEventPreviewMonsterSpawner = TowerDefenseEventPreviewMonsterSpawner).Wid = new Pool_1.Pool(SPLINE_POOL_SIZE, () => new TowerDefenseEventSplineMonsterSpawner());
//# sourceMappingURL=TowerDefenseEventPreviewMonsterSpawner.js.map