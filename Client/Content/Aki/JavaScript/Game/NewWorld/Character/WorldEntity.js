"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldEntity = undefined;
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Entity_1 = require("../../../Core/Entity/Entity");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const PerformanceController_1 = require("../../../Core/Performance/PerformanceController");
const ModelManager_1 = require("../../Manager/ModelManager");
const PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil");
const GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator");
const WorldEntityHelper_1 = require("./WorldEntityHelper");
class WorldEntity extends Entity_1.Entity {
  constructor() {
    super(...arguments);
    this.UsePool = true;
  }
  static StaticGameBudgetConfig(t) {
    let o = -1;
    let r = -1;
    let e = -1;
    let a = -1;
    if (t instanceof WorldEntity) {
      var n = t.GetComponent(0);
      o = n.GetEntityType();
      r = n.GetSubEntityType();
      e = n.GetSummonerId();
      if (n.IsHighFrequencyUpdateStrategy()) {
        switch (o) {
          case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
          case Protocol_1.Aki.Protocol.kks.Proto_Custom:
          case Protocol_1.Aki.Protocol.kks.HI_:
          case Protocol_1.Aki.Protocol.kks.Proto_SceneEntity:
          case Protocol_1.Aki.Protocol.kks.Proto_ClientOnly:
            return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalEntityAlwaysTickConfig;
        }
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTickHotFixConfig;
      }
      if (n.IsLowFrequencyUpdateStrategy()) {
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsStabilizeLowEntityGroupConfig;
      }
      var i = t.GetComponent(132);
      var l = t.GetComponent(279);
      if (i && l) {
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsMoveSceneItemEntityConfig;
      }
      i = n.GetBaseInfo();
      if (i && i.Category.MonsterMatchType !== undefined) {
        a = i?.Category.MonsterMatchType;
      }
    }
    switch (o) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
      case Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity:
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        var c = t.GetComponent(0).GetVisionComponent();
        if (c) {
          if (PhantomUtil_1.PhantomUtil.GetVisionData(c.VisionId)?.类型 === 4) {
            return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterRenderConfig;
          }
        }
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        if (t instanceof WorldEntity) {
          if (e > 0) {
            if (t.GetComponent(0).GetPbDataId() === 652000002) {
              return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsBossEntityGroupConfig;
            } else {
              return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
            }
          }
          if (t.GetComponent(226)) {
            return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
          }
        }
        if (a >= 2) {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsBossEntityGroupConfig;
        } else {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
        }
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        if (r === 2) {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
        } else if (r === 1) {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsSimpleNpcEntityGroupConfig;
        } else {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalNpcEntityGroupConfig;
        }
      case Protocol_1.Aki.Protocol.kks.Proto_Animal:
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
      default:
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig;
    }
  }
  OnRespawn(t) {
    return true;
  }
  OnCreate(t) {
    var t = t.Components;
    var r = WorldEntityHelper_1.WorldEntityHelper.ComponentPriority;
    for (const a of t) {
      if (WorldEntity.clm.has(a)) {
        this.AddComponent(a, undefined);
      } else {
        let o = r.get(a);
        if (o === undefined) {
          let t = Object.getPrototypeOf(a.prototype);
          while (t && t.constructor !== Object) {
            var e = t.constructor;
            if ((o = r.get(e)) !== undefined) {
              r.set(a, o);
              break;
            }
            if ((t = Object.getPrototypeOf(t)) === Object.prototype || t === EntityComponent_1.EntityComponent.prototype) {
              break;
            }
          }
        }
        if (o === undefined) {
          WorldEntity.clm.add(a);
        }
        this.AddComponent(a, o);
      }
    }
    return true;
  }
  OnInitData(t) {
    for (const e of this.Components) {
      if (!e.InitData(t)) {
        return false;
      }
    }
    var o;
    var r;
    if (t.RegisterToGameBudgetController) {
      this.RegisterToGameBudgetController(undefined, this);
    }
    if (PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity && (o = this.GetComponent(0)) && o.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.F6n && (r = ModelManager_1.ModelManager.CreatureModel.GetEntityData(o.GetPbDataId())) && (r = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(r.BlueprintType))) {
      this.TickStatTdType = Stats_1.Stat.CreateNoFlameGraph(`PbDataId: ${o.GetPbDataId()}, PrefabId: ${o.GetPrefabId()} ,BlueprintType: ${r.BlueprintType}`);
      this.AfterTickStatTdType = this.TickStatTdType;
    }
    return true;
  }
}
(exports.WorldEntity = WorldEntity).clm = new Set();
//# sourceMappingURL=WorldEntity.js.map