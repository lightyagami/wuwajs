"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbJumpState = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const RollBlockDefind_1 = require("../RollBlockDefind");
const RbBaseMoveState_1 = require("./RbBaseMoveState");
class RbJumpState extends RbBaseMoveState_1.RbBaseMoveState {
  constructor() {
    super(...arguments);
    this.Info = undefined;
    this.upn = undefined;
  }
  Enter(t) {
    var e;
    var o;
    var i;
    if ((0, RollBlockDefind_1.isRbBlockJumpState)(t)) {
      this.StateName = 2;
      this.Info = t;
      if (this.upn === undefined) {
        this.Qpn();
      }
      if (this.upn === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "RbJumpState Enter DirectorActor create failed");
        }
      } else if (this.upn.SequencePlayer.IsPlaying()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "RbJumpState Enter but DirectorActor is playing");
        }
      } else {
        t = this.upn.DefaultInstanceData;
        e = this.Owner.Transform;
        o = this.Owner.PbDirToVector(this.Info.Nfu);
        i = Rotator_1.Rotator.Create();
        o.Rotation(i);
        e.SetRotation(new UE.Quat(i.ToUeRotator()));
        t.TransformOrigin = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(e);
        t.ApplyWorldOrigin = true;
        ResourceSystem_1.ResourceSystem.LoadAsync(RollBlockDefind_1.RB_JUMP_SEQ_PATH, UE.LevelSequence, t => {
          var e = this.Owner.GetActor();
          if (e === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RollBlock", 31, "RbJumpState Enter without Owner Actor");
            }
          } else {
            this.upn.SetActorTickEnabled(true);
            this.upn.SetSequence(t);
            this.upn.SequencePlayer.OnFinished.Clear();
            this.upn.AddBindingByTag(RollBlockDefind_1.RB_SEQ_BINDING_TAG, e);
            if (this.upn.SequencePlayer.IsValid()) {
              this.upn.SequencePlayer.SetPlayRate(1);
              this.upn.SequencePlayer.Play();
              this.upn.SequencePlayer.OnFinished.Add(() => {
                this.Dlu(true);
              });
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("RollBlock", 31, "RbJumpState Enter without SequencePlayer");
              }
              this.Dlu();
            }
          }
        });
        this.IsFinishedInternal = false;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RollBlock", 31, "RbJumpState Enter without JumpState info");
    }
  }
  Qpn() {
    if (this.upn === undefined) {
      this.upn = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined, false);
      this.upn.bOverrideInstanceData = true;
    }
  }
  Dlu(t = false) {
    this.upn.SetActorTickEnabled(false);
    this.upn.SetSequence(undefined);
    this.upn.RemoveBindingByTag(RollBlockDefind_1.RB_SEQ_BINDING_TAG, this.Owner.GetActor());
    this.upn.SequencePlayer.OnFinished.Clear();
    if (t && ControllerHolder_1.ControllerHolder.RollBlockController.IsCurrentIncId(this.Owner.IncId)) {
      this.NotifyServerMovementFinish();
    }
    this.IsFinishedInternal = true;
  }
}
exports.RbJumpState = RbJumpState;
//# sourceMappingURL=RbJumpState.js.map