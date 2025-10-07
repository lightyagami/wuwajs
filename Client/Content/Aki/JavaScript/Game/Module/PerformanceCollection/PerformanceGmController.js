"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformanceGmController = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const PerformanceController_1 = require("../../../Core/Performance/PerformanceController");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
const WorldFunctionLibrary_1 = require("../../World/Bridge/WorldFunctionLibrary");
class EntityPerformanceResult extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.BlueprintType = "";
    this.EntityName = "";
    this.Score = 0;
  }
}
const ENTITY_PERFORMANCE_TEST_NUM = 5;
class PerformanceGmController {
  static NewEntityPerformanceTestPromise() {
    this.EntityPerformanceTestPromise = new CustomPromise_1.CustomPromise();
  }
  static ClearEntityPerformanceTestPromise() {
    this.EntityPerformanceTestPromise = undefined;
  }
  static s5i() {
    let r = 0;
    let t = 0;
    var o = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (let e = o.length - 1; e >= 0; e--) {
      var a = o[e];
      var n = a.Entity.GetComponent(3)?.Owner;
      if (n !== Global_1.Global.BaseCharacter) {
        ++t;
        r += PerformanceController_1.PerformanceController.ConsumeTickTime("EntityTick" + a.Id);
        n = a.Entity.GetComponent(0);
        if (!ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(n.GetCreatureDataId(), "EntityPerformanceTest")) {
          return -1;
        }
      }
    }
    if (t > 0) {
      return r / t;
    } else {
      return 0;
    }
  }
  static ClearEntityButRole() {
    var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (let e = r.length - 1; e >= 0; e--) {
      var t;
      var o = r[e];
      if (o.Entity.GetComponent(3)?.Owner !== Global_1.Global.BaseCharacter) {
        o = o.Entity.GetComponent(0).GetCreatureDataId();
        (t = new Protocol_1.Aki.Protocol.Gzn()).VVn = 0;
        t.P8n = "@GmRemoveMonster " + o;
        Net_1.Net.Call(29900, t, () => {});
      }
    }
    return true;
  }
  static n2u(e) {
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
        return "Animal";
    }
  }
  static IgnoreBattle() {
    var e = Global_1.Global.BaseCharacter;
    return !!e && !!(e = e.CharacterActorComponent.Entity.GetComponent(175)) && (e.AddBuff(CharacterBuffIds_1.buffId.IgnoreHateBuff, {
      InstigatorId: e.CreatureDataId,
      Reason: "IgnoreBattle"
    }), true);
  }
  static KillAllEntityButRole() {
    this.ClearEntityButRole();
    var e = (0, puerts_1.$ref)(undefined);
    UE.GameplayStatics.GetAllActorsOfClass(GlobalData_1.GlobalData.World, UE.TsSimpleNpc_C.StaticClass(), e);
    var r = (0, puerts_1.$unref)(e);
    for (let e = 0; e < r.Num(); e++) {
      r.Get(e).K2_DestroyActor();
    }
    return true;
  }
  static OpenWorldEntityCatchMode(e) {
    PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity = e[0] !== "0";
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Performance", 35, "捕捉WorldEntityName " + PerformanceController_1.PerformanceController.IsOpenCatchWorldEntity);
    }
  }
  static EntityPerformanceTestSingle(e) {
    if (!this.IgnoreBattle()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Performance", 35, "忽略战斗失效");
      }
    }
    var r = Global_1.Global.BaseCharacter.D_GetTransform();
    const t = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(Number(e[0]));
    if (!t) {
      return false;
    }
    this.ClearEntityButRole();
    cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(0);
    PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(true);
    var o = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(r);
    for (let e = 0; e < ENTITY_PERFORMANCE_TEST_NUM; e++) {
      WorldFunctionLibrary_1.default.TestSpawnTemplateEntityPush(BigInt(ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId()), t.Id, 1, o, 0);
    }
    e = TimeUtil_1.TimeUtil.InverseMillisecond * 10;
    TimerSystem_1.TimerSystem.Delay(() => {
      var e = this.s5i();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Performance", 35, "EntityPerformanceTestSingle", ["CId", t.Id], ["Name", t.Name], ["Score", e * 100]);
      }
      PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(false);
      cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(1);
    }, e);
    return true;
  }
  static OTn(e) {
    return e !== "SimpleNPc";
  }
  static async EntityPerformanceTestAll(e) {
    var e = Number(e[0]);
    var r = this.n2u(e);
    if (!this.IgnoreBattle()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Performance", 35, "忽略战斗失效");
      }
    }
    cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(0);
    PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(true);
    const t = [];
    var o = Global_1.Global.BaseCharacter.GetTransform();
    for (const n of ModelManager_1.ModelManager.CreatureModel.GetAllEntityTemplate(true).values()) {
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(n.BlueprintType)?.EntityLogic;
      if (a === r && this.OTn(n.EntityType)) {
        this.ClearEntityPerformanceTestPromise();
        this.NewEntityPerformanceTestPromise();
        for (let e = 0; e < ENTITY_PERFORMANCE_TEST_NUM; e++) {
          WorldFunctionLibrary_1.default.TestSpawnTemplateEntityPush(BigInt(ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId()), n.Id, 1, o, 0);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Performance", 35, "EntityPerformanceTestAll Born", ["CId", n.Id], ["Name", n.Name]);
        }
        a = TimeUtil_1.TimeUtil.InverseMillisecond * 5;
        TimerSystem_1.TimerSystem.Delay(() => {
          var e;
          var r = this.s5i();
          if (r === -1) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Performance", 35, "EntityPerformanceTestAll ClearEntityButRole Error", ["CId", n.Id], ["Name", n.Name]);
            }
            this.EntityPerformanceTestPromise.SetResult(false);
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Performance", 35, "EntityPerformanceTestAll", ["CId", n.Id], ["Name", n.Name], ["EntityTickTime(ms)", r.toFixed(3)]);
            }
            (e = new EntityPerformanceResult()).BlueprintType = n.BlueprintType;
            e.EntityName = n.Name;
            e.Score = Math.floor(r * TimeUtil_1.TimeUtil.InverseMillisecond) / 10;
            t.push(e);
            this.EntityPerformanceTestPromise.SetResult(true);
          }
        }, a);
        await this.EntityPerformanceTestPromise.Promise;
      }
    }
    PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(false);
    t.sort((e, r) => e.Score - r.Score);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetUpdateCompensateEnable(1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TestManuallyGarbageCollection);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Performance", 35, Json_1.Json.Stringify(t, 2));
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Performance", 35, "EntityPerformanceTestAll Finish");
    }
    return true;
  }
  static SetPlayerPerformanceTestMode(e) {
    PerformanceController_1.PerformanceController.SetPlayerTickPerformanceTest(e);
  }
  static EntityPerformanceTestMode(e) {
    PerformanceController_1.PerformanceController.SetEntityTickPerformanceTest(e);
    var e = e ? 0 : 1;
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.ParallelAnimEvaluation " + e);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.ParallelAnimUpdate " + e);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "a.ParallelAnimInterpolation " + e);
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "fx.Niagara.SystemSimulation.AllowASync " + e);
    var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (let e = r.length - 1; e >= 0; e--) {
      r[e].Entity.GetComponent(115)?.SetTakeOverTick(true);
    }
    return true;
  }
}
(exports.PerformanceGmController = PerformanceGmController).EntityPerformanceTestPromise = undefined;
//# sourceMappingURL=PerformanceGmController.js.map