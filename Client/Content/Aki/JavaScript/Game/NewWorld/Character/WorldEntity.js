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
    let t = -1;
    let e = -1;
    let o = -1;
    let a = -1;
    if (r instanceof WorldEntity) {
      var n = r.GetComponent(0);
      t = n.GetEntityType();
      e = n.GetSubEntityType();
      o = n.GetSummonerId();
      if (n.IsHighFrequencyUpdateStrategy()) {
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTickHotFixConfig;
      }
      if (n.IsLowFrequencyUpdateStrategy()) {
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsStabilizeLowEntityGroupConfig;
      }
      var l = r.GetComponent(128);
      var i = r.GetComponent(271);
      if (l && i) {
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsMoveSceneItemEntityConfig;
      }
      l = n.GetBaseInfo();
      if (l && l.Category.MonsterMatchType !== undefined) {
        a = l?.Category.MonsterMatchType;
      }
    }
    switch (t) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
      case Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity:
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        var u = r.GetComponent(0).GetVisionComponent();
        if (u) {
          if (PhantomUtil_1.PhantomUtil.GetVisionData(u.VisionId)?.类型 === 4) {
            return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterRenderConfig;
          }
        }
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        if (r instanceof WorldEntity) {
          if (o > 0) {
            if (r.GetComponent(0).GetPbDataId() === 652000002) {
              return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsBossEntityGroupConfig;
            } else {
              return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
            }
          }
          if (r.GetComponent(222)) {
            return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
          }
        }
        if (a >= 2) {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsBossEntityGroupConfig;
        } else {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
        }
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        if (e === 2) {
          return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
        } else if (e === 1) {
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
    for (const e of r.Components) {
      var t = WorldEntityHelper_1.WorldEntityHelper.ComponentPriority.get(e);
      this.AddComponent(e, t);
    }
    return true;
  }
  OnInitData(r) {
    for (const o of this.Components) {
      if (!o.InitData(r)) {
        return false;
      }
    }
    var t;
    var e;
    if (r.RegisterToGameBudgetController) {
      this.RegisterToGameBudgetController(undefined, this);
    }
    if (PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity && (t = this.GetComponent(0)) && t.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.F6n && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t.GetPbDataId())) && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e.BlueprintType))) {
      this.TickStatTdType = Stats_1.Stat.CreateNoFlameGraph(`PbDataId: ${t.GetPbDataId()}, PrefabId: ${t.GetPrefabId()} ,BlueprintType: ${e.BlueprintType}`);
      this.AfterTickStatTdType = this.TickStatTdType;
    }
    return true;
  }
}
exports.WorldEntity = WorldEntity;
//# sourceMappingURL=WorldEntity.js.map