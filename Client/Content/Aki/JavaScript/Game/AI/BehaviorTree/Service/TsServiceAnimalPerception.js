"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TsAiController_1 = require("../../Controller/TsAiController");
class TsServiceAnimalPerception extends UE.BTService_BlueprintBase {
  constructor() {
    super(...arguments);
    this.SenseRadius = undefined;
    this.IsInitTsVariables = false;
    this.VectorCache = undefined;
    this.MinRangeSquared = -0;
    this.MaxRangeSquared = -0;
    this.IsEnter = false;
    this.IsSetNearerPlayerId = false;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.VectorCache = undefined;
    this.MinRangeSquared = -0;
    this.MaxRangeSquared = -0;
    this.IsEnter = false;
    this.IsSetNearerPlayerId = false;
  }
  InitTsVariables() {
    var e;
    var r;
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      e = this.SenseRadius.LowerBound.Value;
      r = this.SenseRadius.UpperBound.Value;
      this.MinRangeSquared = e * e;
      this.MaxRangeSquared = r * r;
      this.VectorCache = Vector_1.Vector.Create();
      this.IsEnter = false;
      this.IsSetNearerPlayerId = false;
      this.IsInitTsVariables = true;
    }
  }
  ReceiveActivationAI(e, r) {
    if (e instanceof TsAiController_1.default) {
      this.InitTsVariables();
    }
  }
  ReceiveTickAI(e, r, t) {
    if (e instanceof TsAiController_1.default && (e = e.AiController)) {
      e = e.CharActorComp;
      this.HandlePerception(e);
    }
  }
  HandlePerception(r) {
    var t = r.Entity;
    let i = undefined;
    let o = MathUtils_1.MathUtils.MaxFloat;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var l = this.GetMinPlayerDistSquared(r.ActorLocationProxy);
      i = l.PlayerEntity;
      o = l.MinDistSquared;
    } else {
      l = Global_1.Global.BaseCharacter;
      if (!l?.IsValid()) {
        if (this.IsSetNearerPlayerId) {
          this.IsSetNearerPlayerId = false;
          ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(t.Id, "NearerPlayerId");
        }
        return;
      }
      i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(l.EntityId);
      l.CharacterActorComponent.ActorLocationProxy.Subtraction(r.ActorLocationProxy, this.VectorCache);
      o = this.VectorCache.SizeSquared();
    }
    if (i?.Valid) {
      l = i.Id;
      r = o;
      let e = 0;
      if (r > this.MaxRangeSquared) {
        e = 0;
        this.IsEnter &&= false;
      } else if (r > this.MinRangeSquared) {
        e = this.IsEnter ? l : 0;
      } else {
        e = l;
        this.IsEnter ||= true;
      }
      if (e === 0) {
        if (this.IsSetNearerPlayerId) {
          this.IsSetNearerPlayerId = false;
          ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(t.Id, "NearerPlayerId");
        }
      } else if (!PerformanceController_1.PerformanceController.IsEntityPerformanceTest) {
        ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(t.Id, "NearerPlayerId", e);
        this.IsSetNearerPlayerId = true;
      }
    } else if (this.IsSetNearerPlayerId) {
      this.IsSetNearerPlayerId = false;
      ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(t.Id, "NearerPlayerId");
    }
  }
  GetMinPlayerDistSquared(e) {
    var r = ModelManager_1.ModelManager.CreatureModel.ScenePlayerDataMap;
    var t = ModelManager_1.ModelManager.SceneTeamModel;
    let i = undefined;
    let o = MathUtils_1.MathUtils.MaxFloat;
    for (const a of r) {
      var l;
      var s = t.GetTeamItem(a[0], {
        ParamType: 2,
        IsControl: true
      })?.EntityHandle;
      if (s && (s.Entity.GetComponent(3).ActorLocationProxy.Subtraction(e, this.VectorCache), (l = this.VectorCache.SizeSquared()) < o)) {
        o = l;
        i = s;
      }
    }
    return {
      PlayerEntity: i,
      MinDistSquared: o
    };
  }
}
exports.default = TsServiceAnimalPerception;
//# sourceMappingURL=TsServiceAnimalPerception.js.map