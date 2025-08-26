"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableDropState = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const Global_1 = require("../../../Global");
const LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController");
const SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableDropState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor() {
    super(...arguments);
    this.HitCallbackFlag = false;
    this.HitCallback = undefined;
    this.HitCallbackWrapper = (e, t) => {
      if (t !== Global_1.Global.BaseCharacter.CharacterActorComponent.Owner && (this.SceneItem.ForceMoving = false, this.HitCallback) && !this.HitCallbackFlag) {
        this.HitCallback(e, t);
        this.HitCallbackFlag = true;
      }
    };
  }
  SetHitCallback(e) {
    this.HitCallback = e;
  }
  SetEnterCallback(e) {
    this.EnterCallback = e;
  }
  OnEnter() {
    this.SceneItem.ForceMoving = true;
    this.SceneItem.TryEnableTick(true);
    this.SceneItem.ActorComp.Owner.OnActorHit.Add(this.HitCallbackWrapper);
    var e = this.SceneItem.ActorComp.GetPrimitiveComponent();
    var t = this.SceneItem.Config.ThrowCfg.MotionConfig;
    if (t.Type === IComponent_1.EThrowMotion.FreeFall) {
      this.RQc(e, t);
      this.wQc(e, t);
    }
    this.SceneItem.NeedRemoveControllerId = true;
    LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(this.SceneItem.Entity.Id, Protocol_1.Aki.Protocol.Zw_.Proto_EControlStateLetGo);
    if (!FNameUtil_1.FNameUtil.IsNothing(this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设)) {
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设);
    }
    if (this.EnterCallback) {
      this.EnterCallback();
    }
  }
  RQc(e, t) {
    t = t?.Velocity;
    if (t) {
      e.SetPhysicsLinearVelocity(Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0).ToUeVectorOld());
    }
  }
  wQc(e, t) {
    var t = t?.AngularVelocity;
    if (t) {
      t = Vector_1.Vector.Create(MathUtils_1.MathUtils.GetRandomRange(t.X?.Left ?? 0, t.X?.Right ?? 0), MathUtils_1.MathUtils.GetRandomRange(t.Y?.Left ?? 0, t.Y?.Right ?? 0), MathUtils_1.MathUtils.GetRandomRange(t.Z?.Left ?? 0, t.Z?.Right ?? 0));
      e.SetPhysicsAngularVelocity(t.ToUeVectorOld());
    }
  }
  OnExit() {
    this.SceneItem.ForceMoving = false;
    this.SceneItem.ActorComp.Owner.OnActorHit.Clear();
  }
}
exports.SceneItemManipulableDropState = SceneItemManipulableDropState;
//# sourceMappingURL=SceneItemManipulableDropState.js.map