"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldEntity = undefined;
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Entity_1 = require("../../../Core/Entity/Entity");
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
  static StaticGameBudgetConfig(r) {
    let o = -1;
    let t = -1;
    let e = -1;
    let a = -1;
    if (r instanceof WorldEntity) {
      var l = r.GetComponent(0);
      o = l.GetEntityType();
      t = l.GetSubEntityType();
      e = l.GetSummonerId();
      if (l.IsHighFrequencyUpdateStrategy()) {
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
      if (l.IsLowFrequencyUpdateStrategy()) {
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsStabilizeLowEntityGroupConfig;
      }
      var n = r.GetComponent(129);
      var i = r.GetComponent(275);
      if (n && i) {
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsMoveSceneItemEntityConfig;
      }
      n = l.GetBaseInfo();
      if (n && n.Category.MonsterMatchType !== undefined) {
        a = n?.Category.MonsterMatchType;
      }
    }
    switch (o) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
      case Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity:
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        var c = r.GetComponent(0).GetVisionComponent();
        if (c) {
          if (PhantomUtil_1.PhantomUtil.GetVisionData(c.VisionId)?.类型 === 4) {
            return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterRenderConfig;
          }
        }
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        if (r instanceof WorldEntity) {
          if (e > 0) {
            if (r.GetComponent(0).GetPbDataId() === 652000002) {
              return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsBossEntityGroupConfig;
            } else {
              return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
            }
          }
          if (r.GetComponent(223)) {
            return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
          }
        }
        if (a >= 2) {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsBossEntityGroupConfig;
        } else {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
        }
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        if (t === 2) {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
        } else if (t === 1) {
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
  OnRespawn(r) {
    return true;
  }
  OnCreate(r) {
    for (const t of r.Components) {
      var o = WorldEntityHelper_1.WorldEntityHelper.ComponentPriority.get(t);
      this.AddComponent(t, o);
    }
    return true;
  }
  OnInitData(r) {
    for (const e of this.Components) {
      if (!e.InitData(r)) {
        return false;
      }
    }
    var o;
    var t;
    if (r.RegisterToGameBudgetController) {
      this.RegisterToGameBudgetController(undefined, this);
    }
    if (PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity && (o = this.GetComponent(0)) && o.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.F6n && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(o.GetPbDataId())) && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t.BlueprintType))) {
      this.TickStatTdType = Stats_1.Stat.CreateNoFlameGraph(`PbDataId: ${o.GetPbDataId()}, PrefabId: ${o.GetPrefabId()} ,BlueprintType: ${t.BlueprintType}`);
      this.AfterTickStatTdType = this.TickStatTdType;
    }
    return true;
  }
}
exports.WorldEntity = WorldEntity;
//# sourceMappingURL=WorldEntity.js.map