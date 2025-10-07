"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueEntityRedirectFilter = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Pool_1 = require("../../../Core/Container/Pool");
const SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId_1 = require("../../../Core/Define/ConfigQuery/SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId");
const SurvivorsTemplateById_1 = require("../../../Core/Define/ConfigQuery/SurvivorsTemplateById");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KscSubControllerBase_1 = require("../KscSubControllerBase");
const SurvivorsRogueEntityModel_1 = require("./SurvivorsRogueEntityModel");
const ENTITY_POOL_SIZE = 100;
class SurvivorsRogueWorldEntityModel {
  constructor() {
    this.Uid = 0;
    this.CombatId = 0;
    this.PropertyId = 0;
    this.AssetPath = undefined;
    this.SplineId = undefined;
    this.BuffIdLayers = undefined;
    this.AttributeMap = undefined;
  }
}
class SurvivorsRogueEntityRedirectFilter extends KscSubControllerBase_1.KscEntityRedirectFilter {
  constructor() {
    super(...arguments);
    this.Bed = [];
    this.JNu = [];
    this.IYc = new Map();
  }
  OnCreateEntity(e, r) {
    e = SurvivorsRogueEntityModel_1.SurvivorsRogueEntityModelBuilder.Get(e, r);
    return !!e && ((r = this.FillUpModelInfo(e)) ? (Log_1.Log.CheckError() && Log_1.Log.Error("SurvivorsRogue", 60, "创建幸存者实体失败: " + r, ["creatureId", e.Uid], ["templateId", e.TemplateId], ["combatId", e.CombatId], ["subTypeId", e.SubTypeId]), e.Release()) : this.YNu(e), true);
  }
  YNu(e) {
    let r = e;
    var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.GetSubModel(1);
    var t = e.GetEntity(r.Uid);
    if (t) {
      t.Update(r);
      r.Release();
      r = t;
    } else {
      t = e.TryAddEntity(r);
      if (t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SurvivorsRogue", 60, "创建幸存者实体失败: " + t, ["creatureId", r.Uid], ["templateId", r.TemplateId], ["subTypeId", r.SubTypeId]);
        }
        r.Release();
        return;
      }
    }
    if (ModelManager_1.ModelManager.GameModeModel.MapDone) {
      this.ZNu(r);
    } else {
      this.Bed.push(r);
    }
  }
  OnInstantiateEntities() {
    for (const e of this.Bed) {
      this.ZNu(e);
    }
    this.Bed.length = 0;
  }
  ZNu(l) {
    const s = l.Uid;
    var e = new UE.TransformDouble(l.Rotation.ToUeRotator(), l.Position.ToUeVector(), Vector_1.Vector.OneVectorDouble);
    var r = this.IYc.get(l.Uid);
    if (r) {
      if (r.CombatId === l.CombatId && r.PropertyId === l.PropertyId && r.SplineId === l.SplineId) {
        return;
      }
      if (r.SplineId) {
        ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(r.SplineId, l.Uid, 2);
      }
      r.CombatId = l.CombatId;
      r.PropertyId = l.PropertyId;
      r.SplineId = l.SplineId;
      r.AssetPath = l.AssetPath;
      r.BuffIdLayers = l.BuffIdLayers;
      r.AttributeMap = l.AttributeMap;
      ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.RemoveEntityByReasonType(l.Uid, 3);
    } else {
      let e = SurvivorsRogueEntityRedirectFilter.TYc.Get();
      (e = e || SurvivorsRogueEntityRedirectFilter.TYc.Create()).Uid = l.Uid;
      e.CombatId = l.CombatId;
      e.PropertyId = l.PropertyId;
      e.AssetPath = l.AssetPath;
      e.SplineId = l.SplineId;
      e.BuffIdLayers = l.BuffIdLayers;
      e.AttributeMap = l.AttributeMap;
      this.IYc.set(l.Uid, e);
    }
    let t = undefined;
    if (l.SplineId) {
      t = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(l.SplineId, l.Uid, 2);
    }
    ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AsyncAddEntity({
      CreatureId: l.Uid,
      SimpleCombatId: l.CombatId,
      AssetPath: l.AssetPath,
      PropertyId: l.PropertyId,
      Transform: e,
      Spline: t,
      Buffs: l.BuffIdLayers,
      AttributeMap: l.AttributeMap,
      Faction: undefined,
      RenderActor: undefined,
      FinishCallback: e => {
        var r;
        var t;
        var o;
        var i;
        var n = l;
        if (s === l.Uid) {
          if (n.EntityType === 2) {
            ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.SetKscPlayerEntity(e, n.Uid);
            ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubController.OnPlayerEntityCreated();
            for ([, r] of ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.KscEntities) {
              if (r.Valid && (t = r.KscEntity?.GetMoveComponent()) && t.IsA(UE.KSC_Move_Approach.StaticClass()) && (o = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.KscPlayerEntity)) {
                t.SetTargetEntity(o);
              }
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRoguePlayerEntityCreated);
          } else if (n.EntityType === 3) {
            ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubController.OnWeaponCreated(e);
          } else if (n.EntityType === 1 && ((n = e.GetMoveComponent()) && n.IsA(UE.KSC_Move_Approach.StaticClass()) && (i = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.KscPlayerEntity) && n.SetTargetEntity(i), ConfigManager_1.ConfigManager.SurvivorsRogueConfig.IsBoss(l.TemplateId))) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueBossTrackedMarkerUpdate, e.EntityId_, true);
          }
        }
      }
    });
  }
  OnRemoveEntity(e) {
    var r = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.GetSubModel(1);
    var t = r?.RemoveEntity(e);
    if (t) {
      if (t.EntityType === 1) {
        if (ConfigManager_1.ConfigManager.SurvivorsRogueConfig.IsBoss(t.TemplateId) && (r = r.GetLogicProxy(e))) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueBossTrackedMarkerUpdate, r, false);
        }
        this.HDr(t, 0);
      } else {
        this.HDr(t, 4);
      }
      t.Release();
    }
    return true;
  }
  HDr(e, r) {
    var t = this.IYc.get(e.Uid);
    if (t && (this.IYc.delete(e.Uid), SurvivorsRogueEntityRedirectFilter.TYc.Put(t), ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.RemoveEntityByReasonType(e.Uid, r), t.SplineId)) {
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(t.SplineId, e.Uid, 2);
    }
  }
  Reset() {
    ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.GetSubModel(1).GetAllEntities(this.JNu);
    for (const e of this.JNu) {
      this.TryRemoveEntity(e.Uid);
    }
    this.JNu.length = 0;
    SurvivorsRogueEntityModel_1.SurvivorsRogueEntityModelBuilder.Clear();
    super.Reset();
    for (const r of this.IYc.values()) {
      SurvivorsRogueEntityRedirectFilter.TYc.Put(r);
    }
    this.IYc.clear();
    SurvivorsRogueEntityRedirectFilter.TYc.Clear();
    this.Bed.length = 0;
  }
  FillUpModelInfo(e) {
    var r = e;
    if (r.EntityType === 1 && !SurvivorsTemplateById_1.configSurvivorsTemplateById.GetConfig(r.ConfigId)) {
      return "怪物配置不存在";
    }
    r = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e.TemplateId);
    if (!r) {
      return "实体模板不存在";
    }
    r = (0, IComponent_1.getComponent)(r.ComponentsData, "SimpleCombatComponent");
    if (!r) {
      return "战斗组件不存在";
    }
    e.CombatId = r.Id;
    r = SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId_1.configSimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId.GetConfig(e.CombatId, e.SubTypeId);
    if (!r) {
      return "战斗配置不存在";
    }
    e.PrefabPath = r.PrefabPath;
    e.AssetPath = r.DaPath;
    e.PropertyId = r.PropertyId;
  }
}
(exports.SurvivorsRogueEntityRedirectFilter = SurvivorsRogueEntityRedirectFilter).TYc = new Pool_1.Pool(ENTITY_POOL_SIZE, () => new SurvivorsRogueWorldEntityModel());
//# sourceMappingURL=SurvivorsRogueEntityRedirectFilter.js.map