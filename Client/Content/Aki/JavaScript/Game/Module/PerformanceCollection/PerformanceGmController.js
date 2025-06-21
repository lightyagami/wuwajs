"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PerformanceGmController = void 0;
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
  WorldFunctionLibrary_1 = require("../../World/Bridge/WorldFunctionLibrary");
class EntityPerformanceResult extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments), this.BlueprintType = "", this.EntityName = "", this.Score = 0
  }
}
const ENTITY_PERFORMANCE_TEST_NUM = 5;
class PerformanceGmController {
  static NewEntityPerformanceTestPromise() {
    this.EntityPerformanceTestPromise = new CustomPromise_1.CustomPromise
  }
  static ClearEntityPerformanceTestPromise() {
    this.EntityPerformanceTestPromise = void 0
  }
  static s5i() {
    let r = 0,
      t = 0;
    var o = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (let e = o.length - 1; 0 <= e; e--) {
      var a = o[e],
        n = a.Entity.GetComponent(3)?.Owner;
      if (n !== Global_1.Global.BaseCharacter) {
        ++t, r += PerformanceController_1.PerformanceController.ConsumeTickTime("EntityTick" + a.Id);
        n = a.Entity.GetComponent(0);
        if (!ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(n.GetCreatureDataId(), "EntityPerformanceTest")) return -1
      }
    }
    return 0 < t ? r / t : 0
  }
  static ClearEntityButRole() {
    var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (let e = r.length - 1; 0 <= e; e--) {
      var t, o = r[e];
      o.Entity.GetComponent(3)?.Owner !== Global_1.Global.BaseCharacter && (o = o.Entity.GetComponent(0).GetCreatureDataId(), (t = new Protocol_1.Aki.Protocol.Gzn).VVn = 0, t.P8n = "@GmRemoveMonster " + o, Net_1.Net.Call(22424, t, () => {}))
    }
    return !0
  }
  static lfu(e) {
    switch (e) {
      case 0:
        return;
      case 1:
        return "Item";
      case 2:
        return "Monster";
      case 3:
        return "Npc";
      case 4:
        return "Animal"
    }
  }
  static IgnoreBattle() {
    var e = Global_1.Global.BaseCharacter;
    return !!e && !!(e = e.CharacterActorComponent.Entity.GetComponent(174)) && (e.AddBuff(CharacterBuffIds_1.buffId.IgnoreHateBuff, {
      InstigatorId: e.CreatureDataId,
      Reason: "IgnoreBattle"
    }), !0)
  }
  static KillAllEntityButRole() {
    this.ClearEntityButRole();
    var e = (0, puerts_1.$ref)(void 0),
      r = (UE.GameplayStatics.GetAllActorsOfClass(GlobalData_1.GlobalData.World, UE.TsSimpleNpc_C.StaticClass(), e), (0, puerts_1.$unref)(e));
    for (let e = 0; e < r.Num(); e++) r.Get(e).K2_DestroyActor();
    return !0
  }
  static OpenWorldEntityCatchMode(e) {
    PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity = "0" !== e[0], Log_1.Log.CheckInfo() && Log_1.Log.Info("Performance", 35, "捕捉WorldEntityName " + PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity)
  }
  static EntityPerformanceTestSingle(e) {
    this.IgnoreBattle() || Log_1.Log.CheckInfo() && Log_1.Log.Info("Performance", 35, "忽略战斗失效");
    var r = Global_1.Global.BaseCharacter.D_GetTransform();
    const t = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(Number(e[0]));
    if (!t) return !1;
    this.ClearEntityButRole(), cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(0), PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(!0);
    var o = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(r);
    for (let e = 0; e < ENTITY_PERFORMANCE_TEST_NUM; e++) WorldFunctionLibrary_1.default.TestSpawnTemplateEntityPush(BigInt(ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId()), t.Id, 1, o, 0);
    e = 10 * TimeUtil_1.TimeUtil.InverseMillisecond;
    return TimerSystem_1.TimerSystem.Delay(() => {
      var e = this.s5i();
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Performance", 35, "EntityPerformanceTestSingle", ["CId", t.Id], ["Name", t.Name], ["Score", 100 * e]), PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(!1), cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(1)
    }, e), !0
  }
  static OTn(e) {
    return "SimpleNPc" !== e
  }
  static async EntityPerformanceTestAll(e) {
    var e = Number(e[0]),
      r = this.lfu(e);
    this.IgnoreBattle() || Log_1.Log.CheckInfo() && Log_1.Log.Info("Performance", 35, "忽略战斗失效"), cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(0), PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(!0);
    const t = [];
    var o = Global_1.Global.BaseCharacter.GetTransform();
    for (const n of ModelManager_1.ModelManager.CreatureModel.GetAllEntityTemplate(!0).values()) {
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(n.BlueprintType)?.EntityLogic;
      if (a === r && this.OTn(n.EntityType)) {
        this.ClearEntityPerformanceTestPromise(), this.NewEntityPerformanceTestPromise();
        for (let e = 0; e < ENTITY_PERFORMANCE_TEST_NUM; e++) WorldFunctionLibrary_1.default.TestSpawnTemplateEntityPush(BigInt(ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId()), n.Id, 1, o, 0);
        Log_1.Log.CheckInfo() && Log_1.Log.Info("Performance", 35, "EntityPerformanceTestAll Born", ["CId", n.Id], ["Name", n.Name]);
        a = 5 * TimeUtil_1.TimeUtil.InverseMillisecond;
        TimerSystem_1.TimerSystem.Delay(() => {
          var e, r = this.s5i(); - 1 === r ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Performance", 35, "EntityPerformanceTestAll ClearEntityButRole Error", ["CId", n.Id], ["Name", n.Name]), this.EntityPerformanceTestPromise.SetResult(!1)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Performance", 35, "EntityPerformanceTestAll", ["CId", n.Id], ["Name", n.Name], ["EntityTickTime(ms)", r.toFixed(3)]), (e = new EntityPerformanceResult).BlueprintType = n.BlueprintType, e.EntityName = n.Name, e.Score = Math.floor(r * TimeUtil_1.TimeUtil.InverseMillisecond) / 10, t.push(e), this.EntityPerformanceTestPromise.SetResult(!0))
        }, a), await this.EntityPerformanceTestPromise.Promise
      }
    }
    return PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(!1), t.sort((e, r) => e.Score - r.Score), cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TestManuallyGarbageCollection), Log_1.Log.CheckInfo() && Log_1.Log.Info("Performance", 35, Json_1.Json.Stringify(t, 2)), Log_1.Log.CheckInfo() && Log_1.Log.Info("Performance", 35, "EntityPerformanceTestAll Finish"), !0
  }
  static SetPlayerPerformanceTestMode(e) {
    PerformanceController_1.PerformanceController.SetPlayerTickPerformanceTest(e)
  }
  static EntityPerformanceTestMode(e) {
    PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(e);
    var e = e ? 0 : 1,
      r = (UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.ParallelAnimEvaluation " + e), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.ParallelAnimUpdate " + e), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.ParallelAnimInterpolation " + e), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "fx.Niagara.SystemSimulation.AllowASync " + e), ModelManager_1.ModelManager.CreatureModel.GetAllEntities());
    for (let e = r.length - 1; 0 <= e; e--) r[e].Entity.GetComponent(114)?.SetTakeOverTick(!0);
    return !0
  }
}(exports.PerformanceGmController = PerformanceGmController).EntityPerformanceTestPromise = void 0;
//# sourceMappingURL=PerformanceGmController.js.map