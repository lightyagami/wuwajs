"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseEventEntityRedirectFilter = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Pool_1 = require("../../../Core/Container/Pool");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const KscSubControllerBase_1 = require("../../KuroSimpleCombat/KscSubControllerBase");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TowerDefenseEventRemoveReason_1 = require("./Define/TowerDefenseEventRemoveReason");
const TsTowerDefenseEventActor_1 = require("./Item/TsTowerDefenseEventActor");
const TowerDefenseEventEntityModel_1 = require("./Model/TowerDefenseEventEntityModel");
const TowerDefenseEventConfig_1 = require("./TowerDefenseEventConfig");
const ENTITY_POOL_SIZE = 100;
class TowerDefenseEventWorldEntityModel {
  constructor() {
    this.Uid = 0;
    this.CombatId = 0;
    this.PropertyId = 0;
    this.AssetPath = undefined;
    this.SplineId = undefined;
    this.BuffIdLayers = undefined;
  }
}
class TowerDefenseEventEntityRedirectFilter extends KscSubControllerBase_1.KscEntityRedirectFilter {
  constructor() {
    super(...arguments);
    this.Bed = [];
    this.JNu = [];
    this.IYc = new Map();
  }
  OnCreateEntity(e, t) {
    e = TowerDefenseEventEntityModel_1.TowerDefenseEventEntityModelBuilder.Get(e, t);
    return !!e && ((t = TowerDefenseEventConfig_1.TowerDefenseEventConfig.FillUpModelInfo(e)) ? (Log_1.Log.CheckError() && Log_1.Log.Error("TowerDefenseEvent", 60, "创建塔防实体失败: " + t, ["creatureId", e.Uid], ["templateId", e.TemplateId], ["combatId", e.CombatId], ["subTypeId", e.SubTypeId]), e.Release()) : this.YNu(e), true);
  }
  YNu(e) {
    let t = e;
    var e = ModelManager_1.ModelManager.TowerDefenseEventModel;
    var r = e.GetEntity(t.Uid);
    if (r) {
      r.Update(t);
      t.Release();
      t = r;
    } else {
      r = e.TryAddEntity(t);
      if (r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefenseEvent", 60, "创建塔防实体失败: " + r, ["creatureId", t.Uid], ["templateId", t.TemplateId], ["subTypeId", t.SubTypeId]);
        }
        t.Release();
        return;
      }
    }
    if (ModelManager_1.ModelManager.GameModeModel.MapDone) {
      this.ZNu(t);
    } else {
      this.Bed.push(t);
    }
  }
  OnInstantiateEntities() {
    for (const e of this.Bed) {
      this.ZNu(e);
    }
    this.Bed.length = 0;
  }
  ZNu(t) {
    let r = undefined;
    let o = undefined;
    let n = undefined;
    let e = undefined;
    var i = t;
    if ((0, TowerDefenseEventEntityModel_1.isTypeOfTrapInfo)(i)) {
      var s = UE.KuroBuildingGridSubsystem.K2_FindBuildingGrid(GlobalData_1.GlobalData.World, i.GridId);
      if (!s?.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefenseEvent", 60, "创建陷阱失败，找不到目标网格", ["creatureId", i.Uid], ["templateId", i.TemplateId], ["gridId", i.GridId], ["coords", i.Coords]);
        }
        return;
      }
      let e = TsTowerDefenseEventActor_1.default.GetTrapActor(i.Uid);
      e = e || ActorSystem_1.ActorSystem.Get(UE.TsTowerDefenseEventActor_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
      o = e;
      n = 2;
      s = e.Init(i, s);
      if (s) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefenseEvent", 60, "创建陷阱失败: " + s, ["creatureId", i.Uid], ["templateId", i.TemplateId], ["gridId", i.GridId], ["coords", i.Coords]);
        }
        e.Destroy("TowerDefenseEventController.InstantiateEntity");
        return;
      }
      i.UpdateTransform(e.D_K2_GetActorLocation(), e.K2_GetActorRotation());
      r = e.D_GetTransform();
    } else {
      r = new UE.TransformDouble(t.Rotation.ToUeRotator(), t.Position.ToUeVector(), Vector_1.Vector.OneVectorDouble);
      var a;
      var s = t;
      if ((0, TowerDefenseEventEntityModel_1.isTypeOfSpecialCellBaseInfo)(s)) {
        if ((i = UE.KuroBuildingGridSubsystem.K2_FindBuildingGrid(GlobalData_1.GlobalData.World, s.GridId))?.IsValid()) {
          (l = new UE.KuroBuildingGridCellVector()).X = s.GridSize.X;
          l.Y = s.GridSize.Y;
          (a = new UE.KuroBuildingGridCellVector()).X = s.Coords.X;
          a.Y = s.Coords.Y;
          i = i.GetPosition(l, a);
          r.SetLocation(i);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefenseEvent", 31, "创建特殊地块失败，找不到目标网格", ["creatureId", s.Uid], ["templateId", s.TemplateId], ["gridId", s.GridId], ["coords", s.Coords]);
        }
        e = this.Zcd(t);
      }
    }
    var l = this.IYc.get(t.Uid);
    if (l) {
      if (l.CombatId === t.CombatId && l.PropertyId === t.PropertyId && l.SplineId === t.SplineId && l.AssetPath === t.AssetPath) {
        return;
      }
      if (l.SplineId) {
        ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(l.SplineId, t.Uid, 2);
      }
      l.CombatId = t.CombatId;
      l.PropertyId = t.PropertyId;
      l.SplineId = t.SplineId;
      l.AssetPath = t.AssetPath;
      l.BuffIdLayers = t.BuffIdLayers;
      ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.RemoveEntity(t.Uid, TowerDefenseEventRemoveReason_1.TowerDefenseEventRemoveReason.CombatDirty);
    } else {
      let e = TowerDefenseEventEntityRedirectFilter.TYc.Get();
      (e = e || TowerDefenseEventEntityRedirectFilter.TYc.Create()).Uid = t.Uid;
      e.CombatId = t.CombatId;
      e.PropertyId = t.PropertyId;
      e.AssetPath = t.AssetPath;
      e.SplineId = t.SplineId;
      e.BuffIdLayers = t.BuffIdLayers;
      this.IYc.set(t.Uid, e);
    }
    let d = undefined;
    if (t.SplineId) {
      d = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(t.SplineId, t.Uid, 2);
    }
    ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AsyncAddEntity({
      CreatureId: t.Uid,
      SimpleCombatId: t.CombatId,
      AssetPath: t.AssetPath,
      PropertyId: t.PropertyId,
      Transform: r,
      Spline: d,
      Buffs: t.BuffIdLayers,
      Faction: n,
      RenderActor: o,
      FinishCallback: e
    });
  }
  OnRemoveEntity(e) {
    e = ModelManager_1.ModelManager.TowerDefenseEventModel.RemoveEntity(e);
    if (e) {
      this.kpr(e);
      e.Release();
    }
    return true;
  }
  kpr(e) {
    var t = e;
    if ((0, TowerDefenseEventEntityModel_1.isTypeOfTrapInfo)(t) && (t = TsTowerDefenseEventActor_1.default.GetTrapActor(t.Uid))) {
      t.Destroy("TowerDefenseEventController.DestroyEntity");
    }
    var t = this.IYc.get(e.Uid);
    if (t && (this.IYc.delete(e.Uid), TowerDefenseEventEntityRedirectFilter.TYc.Put(t), ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.RemoveEntity(e.Uid, TowerDefenseEventRemoveReason_1.TowerDefenseEventRemoveReason.Destroy), t.SplineId)) {
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(t.SplineId, e.Uid, 2);
    }
  }
  Reset() {
    ModelManager_1.ModelManager.TowerDefenseEventModel.GetAllEntities(this.JNu);
    for (const e of this.JNu) {
      this.TryRemoveEntity(e.Uid);
    }
    this.JNu.length = 0;
    TowerDefenseEventEntityModel_1.TowerDefenseEventEntityModelBuilder.Clear();
    super.Reset();
    for (const t of this.IYc.values()) {
      TowerDefenseEventEntityRedirectFilter.TYc.Put(t);
    }
    this.IYc.clear();
    TowerDefenseEventEntityRedirectFilter.TYc.Clear();
    this.Bed.length = 0;
  }
  UpdateEntity(e) {
    var t;
    var r;
    var o;
    var n;
    var i = ModelManager_1.ModelManager.TowerDefenseEventModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e.F4n));
    if (i) {
      t = i;
      if ((0, TowerDefenseEventEntityModel_1.isTypeOfConfigInfo)(t)) {
        if (r = (t = e.Uzc).QVu?.v9n ?? t.SKu?.v9n ?? t.bWc?.v9n ?? t.nld?.v9n) {
          (o = i.Clone()).ConfigId = r;
          if (t.QVu && (0, TowerDefenseEventEntityModel_1.isTypeOfTrapBaseInfo)(o)) {
            (n = o).Level = t.QVu.wpd;
            n.DeconstructReturn = t.QVu.AJc;
          }
          if (n = TowerDefenseEventConfig_1.TowerDefenseEventConfig.FillUpModelInfo(o, true)) {
            o.Release();
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("TowerDefenseEvent", 60, "塔防实体数据变更失败: " + n, ["creatureDataId", i.Uid], ["configId", r]);
            }
          } else {
            i.Update(o);
            o.Release();
            if (ModelManager_1.ModelManager.GameModeModel.MapDone) {
              this.ZNu(i);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("TowerDefenseEvent", 60, "塔防实体数据变更失败: 未找到配置ID", ["entityId", e.F4n]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TowerDefenseEvent", 60, "塔防实体数据变更失败: 未找到实体模型", ["entityId", e.F4n]);
    }
  }
  Zcd(e) {
    var t = e;
    if ((0, TowerDefenseEventEntityModel_1.isTypeOfSpecialCellBaseInfo)(t) && t.CellType === 1) {
      return this.edd(e);
    } else {
      return undefined;
    }
  }
  edd(e) {
    var t = ModelManager_1.ModelManager.TowerDefenseEventModel?.GetEntity(e.OwnerId)?.ExtraInfo;
    e.ExtraInfo = t;
    return t => {
      if (e.ExtraInfo && e.ExtraInfo[1]) {
        var r = e.ExtraInfo[1];
        if (r && r.Params) {
          for (let e = 0; e < r.Params.Num(); e++) {
            var o = r.Params.GetKey(e);
            var n = r.Params.Get(o);
            if (o !== undefined && n !== undefined) {
              t.SetAttr(o, n);
            }
          }
        }
      }
    };
  }
}
(exports.TowerDefenseEventEntityRedirectFilter = TowerDefenseEventEntityRedirectFilter).TYc = new Pool_1.Pool(ENTITY_POOL_SIZE, () => new TowerDefenseEventWorldEntityModel());
//# sourceMappingURL=TowerDefenseEventEntityRedirectFilter.js.map