"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableBaseState = undefined;
const UE = require("ue");
const Global_1 = require("../../../Global");
class SceneItemManipulableBaseState {
  constructor(e) {
    this.SceneItem = undefined;
    this.PropComp = undefined;
    this.Unr = undefined;
    this.EnterCallback = undefined;
    this.ExitCallback = undefined;
    this.Timer = 0;
    this.UeActorComp = undefined;
    this.SceneItem = e;
    this.PropComp = e.PropComp;
    this.UeActorComp = e.ActorComp?.Owner?.GetComponentByClass(UE.ActorComponent.StaticClass());
  }
  ChangeMoveController(e) {
    this.OnChangeMoveController(e);
  }
  OnChangeMoveController(e) {
    if (e) {
      switch (this.SceneItem?.GetState()) {
        case 8:
        case 7:
        case 6:
        case 4:
        case 11:
        case 3:
          this.SceneItem?.SetState(9, "OnChangeMoveController");
      }
    } else {
      this.OnExit();
    }
  }
  Enter(e) {
    if (e) {
      if (this.OnEnter !== SceneItemManipulableBaseState.prototype.OnEnter) {
        this.OnEnter();
      }
    } else if (this.OnSimulateEnter !== SceneItemManipulableBaseState.prototype.OnSimulateEnter) {
      this.OnSimulateEnter();
    }
  }
  OnEnter() {}
  OnSimulateEnter() {}
  Tick(e, t) {
    if (t) {
      if (this.OnTick !== SceneItemManipulableBaseState.prototype.OnTick) {
        this.OnTick(e);
      }
    } else if (this.OnSimulateTick !== SceneItemManipulableBaseState.prototype.OnSimulateTick) {
      this.OnSimulateTick(e);
    }
  }
  OnTick(e) {}
  OnSimulateTick(e) {}
  Exit(e) {
    if (e) {
      if (this.OnExit !== SceneItemManipulableBaseState.prototype.OnExit) {
        this.OnExit();
      }
    } else if (this.OnSimulateExit !== SceneItemManipulableBaseState.prototype.OnSimulateExit) {
      this.OnSimulateExit();
    }
  }
  OnExit() {}
  OnSimulateExit() {}
  StartCameraShake(e) {
    var t = Global_1.Global.CharacterCameraManager;
    if (t?.IsValid() && e?.IsValid()) {
      this.Unr = t.StartMatineeCameraShake(e);
    }
  }
  StopCameraShake() {
    var e = Global_1.Global.CharacterCameraManager;
    if (e?.IsValid() && this.Unr?.IsValid()) {
      e.StopCameraShake(this.Unr);
    }
  }
  OpenPhysicsSplit() {
    if (this.UeActorComp?.IsValid()) {
      this.UeActorComp.bEnableAutoPhysicsSplit = true;
    }
  }
  ClosePhysicsSplit() {
    if (this.UeActorComp?.IsValid()) {
      this.UeActorComp.bEnableAutoPhysicsSplit = false;
      this.UeActorComp.KuroCreatePhysicsState();
    }
  }
  IsNoLockCasting() {
    return false;
  }
}
exports.SceneItemManipulableBaseState = SceneItemManipulableBaseState;
//# sourceMappingURL=SceneItemManipulableBaseState.js.map