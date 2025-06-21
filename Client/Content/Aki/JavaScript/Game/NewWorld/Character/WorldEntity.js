"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.WorldEntity = void 0;
const Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../Core/Entity/Entity"),
  PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil"),
  GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator"),
  WorldEntityHelper_1 = require("./WorldEntityHelper");
class WorldEntity extends Entity_1.Entity {
  constructor() {
    super(...arguments), this.UsePool = !0
  }
  static StaticGameBudgetConfig(r) {
    let t = -1,
      e = -1,
      o = -1,
      a = -1;
    if (r instanceof WorldEntity) {
      var n = r.GetComponent(0);
      if (t = n.GetEntityType(), e = n.GetSubEntityType(), o = n.GetSummonerId(), n.IsHighFrequencyUpdateStrategy()) return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTickHotFixConfig;
      if (n.IsLowFrequencyUpdateStrategy()) return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsStabilizeLowEntityGroupConfig;
      var l = r.GetComponent(128),
        i = r.GetComponent(271);
      if (l && i) return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsMoveSceneItemEntityConfig;
      l = n.GetBaseInfo();
      l && void 0 !== l.Category.MonsterMatchType && (a = l?.Category.MonsterMatchType)
    }
    switch (t) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
      case Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity:
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        var u = r.GetComponent(0).GetVisionComponent();
        if (u)
          if (4 === PhantomUtil_1.PhantomUtil.GetVisionData(u.VisionId)?.类型) return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterRenderConfig;
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        if (r instanceof WorldEntity) {
          u = r.GetComponent(0);
          if (0 < o) return 652000002 === u.GetPbDataId() ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsBossEntityGroupConfig : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
          if (r.GetComponent(222)) return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig;
          u = u.GetMonsterComponent()?.FightConfigId;
          if (77069 === u || 7706901 === u) return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsBossEntityGroupConfig
        }
        return 2 <= a ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsBossEntityGroupConfig : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Npc:
        return 2 === e ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig : 1 === e ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsSimpleNpcEntityGroupConfig : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalNpcEntityGroupConfig;
      case Protocol_1.Aki.Protocol.kks.Proto_Animal:
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterEntityGroupConfig;
      default:
        return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNormalEntityGroupConfig
    }
  }
  OnRespawn(r) {
    return !0
  }
  OnCreate(r) {
    for (const e of r.Components) {
      var t = WorldEntityHelper_1.WorldEntityHelper.ComponentPriority.get(e);
      this.AddComponent(e, t)
    }
    return !0
  }
  OnInitData(r) {
    for (const o of this.Components)
      if (!o.InitData(r)) return !1;
    var t, e;
    return r.RegisterToGameBudgetController && this.RegisterToGameBudgetController(void 0, this), PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity && (t = this.GetComponent(0)) && t.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.F6n && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t.GetPbDataId())) && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e.BlueprintType)) && (this.TickStatTdType = Stats_1.Stat.CreateNoFlameGraph(`PbDataId: ${t.GetPbDataId()}, PrefabId: ${t.GetPrefabId()} ,BlueprintType: ` + e.BlueprintType), this.AfterTickStatTdType = this.TickStatTdType), !0
  }
}
exports.WorldEntity = WorldEntity;
//# sourceMappingURL=WorldEntity.js.map