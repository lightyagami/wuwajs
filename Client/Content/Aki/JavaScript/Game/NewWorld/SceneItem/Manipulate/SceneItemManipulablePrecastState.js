"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulablePrecastState = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulablePrecastState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor() {
    super(...arguments);
    this.fgt = 0;
    this.Tsr = "";
    this.Lsr = undefined;
    this.Dsr = Vector_1.Vector.Create();
  }
  SetDirection(e) {
    this.fgt = e;
  }
  OnEnter() {
    this.Tsr = ConfigManager_1.ConfigManager.ManipulateConfig.ManipulatePrecastLines[this.fgt];
  }
  OnTick(e) {
    this.Timer += e * 1000;
    var e = ConfigManager_1.ConfigManager.ManipulateConfig.GetPrecastLineValue(this.Tsr, this.Timer / ConfigManager_1.ConfigManager.ManipulateConfig.PrecastTime);
    var t = Vector_1.Vector.Create();
    var a = Vector_1.Vector.Create();
    var i = this.ari();
    this.Rsr();
    this.Lsr.Multiply(e.X, t);
    this.Dsr.Multiply(e.Z, a);
    a.AdditionEqual(t);
    a.AdditionEqual(i);
    this.SceneItem.ActorComp.SetActorLocation(a.ToUeVector());
    return true;
  }
  ari() {
    var e = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorTransform;
    var t = this.SceneItem.UsingAssistantHoldOffset ? this.SceneItem.ConfigAssistantHoldOffset : this.SceneItem.ConfigHoldOffset;
    var e = e.TransformPositionNoScale(t);
    return Vector_1.Vector.Create(e);
  }
  Rsr() {
    var e = Vector_1.Vector.Create();
    this.Lsr = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorForwardProxy;
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorUpProxy;
    this.Lsr.CrossProduct(t, e);
    e.CrossProduct(this.Lsr, this.Dsr);
    this.Dsr.Normalize();
  }
}
exports.SceneItemManipulablePrecastState = SceneItemManipulablePrecastState;
//# sourceMappingURL=SceneItemManipulablePrecastState.js.map