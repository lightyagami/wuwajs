"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneInteractionDebugActor = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const RenderModuleController_1 = require("../../Manager/RenderModuleController");
const SceneInteractionManager_1 = require("../Interaction/SceneInteractionManager");
class SceneInteractionDebugActor extends UE.Actor {
  constructor() {
    super(...arguments);
    this.HandleId = 0;
    this.EffectKey = undefined;
    this.DebugActorRef = undefined;
    this.DebugActorKey = "";
    this.NeedTransition = false;
    this.Force = false;
    this.LevelName = "";
    this.InitState = undefined;
    this.CountNumber = 1;
    this.BaseForce = 0;
    this.OriginOffset = new UE.Vector(0, 0, 0);
    this.DamageRadius = 0;
    this.ImpluseFactor = 0;
  }
  Constructor() {
    this.EffectKey = undefined;
    this.InitState = undefined;
  }
  ReceiveBeginPlay() {
    this.HandleId = -1;
  }
  ChangeState1() {
    if (RenderModuleController_1.RenderModuleController.IsRuntime() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 11, "change state1"), this.HandleId >= 0)) {
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.HandleId, 0, this.NeedTransition, this.Force);
    }
  }
  ChangeState2() {
    if (RenderModuleController_1.RenderModuleController.IsRuntime() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 11, "change state2"), this.HandleId >= 0)) {
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.HandleId, 1, this.NeedTransition, this.Force);
    }
  }
  ChangeState3() {
    if (RenderModuleController_1.RenderModuleController.IsRuntime() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 11, "change state3"), this.HandleId >= 0)) {
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.HandleId, 2, this.NeedTransition, this.Force);
    }
  }
  ChangeState4() {
    if (RenderModuleController_1.RenderModuleController.IsRuntime() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 11, "change state4"), this.HandleId >= 0)) {
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.HandleId, 3, this.NeedTransition, this.Force);
    }
  }
  ChangeState5() {
    if (RenderModuleController_1.RenderModuleController.IsRuntime() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 11, "change state5"), this.HandleId >= 0)) {
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.HandleId, 4, this.NeedTransition, this.Force);
    }
  }
  ChangeState6() {
    if (RenderModuleController_1.RenderModuleController.IsRuntime() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 11, "change state6"), this.HandleId >= 0)) {
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.HandleId, 5, this.NeedTransition, this.Force);
    }
  }
  ChangeState7() {
    if (RenderModuleController_1.RenderModuleController.IsRuntime() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 11, "change state7"), this.HandleId >= 0)) {
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.HandleId, 6, this.NeedTransition, this.Force);
    }
  }
  ChangeState8() {
    if (RenderModuleController_1.RenderModuleController.IsRuntime() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 11, "change state8"), this.HandleId >= 0)) {
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.HandleId, 7, this.NeedTransition, this.Force);
    }
  }
  Create() {
    if (RenderModuleController_1.RenderModuleController.IsRuntime()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderScene", 11, "create");
      }
      if (this.HandleId >= 0) {
        this.Remove();
      }
      let e = this.LevelName;
      if (e.startsWith("World'")) {
        e = (e = this.LevelName.replace("World'", "")).split(".")[0];
      }
      this.HandleId = SceneInteractionManager_1.SceneInteractionManager.Get().CreateSceneInteractionLevel(e, this.InitState, this.D_K2_GetActorLocation(), this.K2_GetActorRotation(), () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RenderScene", 11, "level streaming complete");
        }
      });
    }
  }
  Remove() {
    if (RenderModuleController_1.RenderModuleController.IsRuntime() && (Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderScene", 11, "remove"), this.HandleId >= 0)) {
      SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(this.HandleId);
      this.HandleId = -1;
      this.DebugActorRef = undefined;
    }
  }
  PrintState() {
    if (this.HandleId >= 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderScene", 13, "当前状态", ["状态", SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionCurrentState(this.HandleId) + 1], ["Actor", this.GetName()]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderScene", 13, "SceneInteractionActor未生成", ["Actor", this.GetName()]);
    }
  }
  PlaySceneEffect() {
    if (this.HandleId >= 0) {
      SceneInteractionManager_1.SceneInteractionManager.Get().PlaySceneInteractionEffect(this.HandleId, this.EffectKey);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderScene", 13, "SceneInteractionActor未生成", ["Actor", this.GetName()]);
    }
  }
  ChangeDirection() {
    if (this.HandleId >= 0) {
      this.CountNumber += 1;
      SceneInteractionManager_1.SceneInteractionManager.Get().ChangeSceneInteractionPlayDirection(this.HandleId, this.CountNumber % 2 == 0);
    }
  }
  GetDebugActorRefByKey() {
    var e;
    if (this.HandleId >= 0) {
      e = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(this.HandleId, this.DebugActorKey);
      this.HandleId = -1;
      this.DebugActorRef = e;
    }
  }
}
exports.SceneInteractionDebugActor = SceneInteractionDebugActor;
exports.default = SceneInteractionDebugActor; //# sourceMappingURL=SceneInteractionDebugActor.js.map