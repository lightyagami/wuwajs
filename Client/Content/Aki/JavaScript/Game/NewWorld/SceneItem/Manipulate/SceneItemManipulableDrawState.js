"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableDrawState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const PortalUtils_1 = require("../../../Utils/PortalUtils");
const SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableDrawState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor(t, e, i) {
    super(t);
    this.pYi = undefined;
    this.esr = undefined;
    this.tsr = undefined;
    this.Znr = undefined;
    this.bga = false;
    this.pYi = e;
    this.Znr = i;
  }
  SetEnterCallback(t) {
    this.EnterCallback = t;
  }
  OnEnter() {
    this.SceneItem.NeedRemoveControllerId = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 31, "[CharacterManipulateComp] DrawState OnEnter", ["PbDataId", this.SceneItem?.ActorComp?.CreatureData.GetPbDataId()], ["ActivatedOutlet", this.SceneItem.ActivatedOutlet?.Valid]);
    }
    if (this.SceneItem.ActivatedOutlet?.Valid && this.SceneItem.MatchSequence) {
      this.SceneItem.PlayingMatchSequence = true;
      this.SceneItem.PlayMatchSequence(() => {
        this.isr();
        this.SceneItem.PlayingMatchSequence = false;
        this.SceneItem.MatchSequence = undefined;
      }, true);
    }
    if (this.SceneItem.MatchSequence === undefined) {
      this.isr();
    }
    if (!FNameUtil_1.FNameUtil.IsNothing(this.SceneItem.ManipulateBaseConfig.吸取状态碰撞预设)) {
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(this.SceneItem.ManipulateBaseConfig.吸取状态碰撞预设);
    }
  }
  isr() {
    if (this.SceneItem.ActivatedOutlet?.Valid) {
      this.SceneItem.ClearAttachOutletInfo();
    }
    this.StartCameraShake(this.pYi);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddSubCameraTag, this.Znr);
    this.SceneItem.ActorComp.PhysicsMode = 0;
    this.Timer = 0;
    this.esr = this.SceneItem.GetDrawStartLocation().ToUeVector();
    this.tsr = this.SceneItem.ActorComp.ActorRotation;
    this.bga = false;
    if (this.EnterCallback) {
      this.EnterCallback();
    }
  }
  OnTick(t) {
    if (!this.SceneItem.PlayingMatchSequence) {
      this.Timer += t;
      t = this.osr();
      this.SceneItem.ActorComp.SetActorLocationAndRotation(t.Loc, t.Rot, "[ManipulableDrawState.Tick]", true);
    }
    return true;
  }
  OnExit() {
    this.StopCameraShake();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveSubCameraTag, this.Znr);
  }
  osr() {
    var t = this.SceneItem.ManipulateBaseConfig;
    let e = 1;
    let i = 1;
    if (this.Timer < t.对齐时间) {
      e = MathUtils_1.MathUtils.Clamp(this.Timer / t.对齐时间, 0, 1);
      e = UE.KismetMathLibrary.Ease(0, 1, e, 5);
    }
    if (this.Timer < t.吸取时间) {
      i = MathUtils_1.MathUtils.Clamp((this.Timer - t.吸取延迟) / (t.吸取时间 - t.吸取延迟), 0, 1);
      i = UE.KismetMathLibrary.Ease(0, 1, i, 7);
    }
    var t = Vector_1.Vector.Create(0, 0, t.牵引高度 * e);
    GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(this.SceneItem.ActorComp, t);
    var t = new UE.VectorDouble(this.esr.X + t.X, this.esr.Y + t.Y, this.esr.Z + t.Z);
    var s = this.tsr;
    var r = this.SceneItem.UsingAssistantHoldOffset ? this.SceneItem.ConfigAssistantHoldOffset : this.SceneItem.ConfigHoldOffset;
    var a = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorTransform;
    var r = a.TransformPositionNoScale(r);
    let h = UE.KismetMathLibrary.ComposeRotators(this.SceneItem.ConfigHoldRotator, a.Rotator());
    var a = this.SceneItem.Entity.GetComponent(147);
    if (a?.Valid) {
      a = new UE.Rotator(0, -a.Rotation, 0);
      h = UE.KismetMathLibrary.ComposeRotators(a, h);
    }
    let o = r;
    let l = h;
    var n;
    var a = this.SceneItem.GetPassThroughPortalType() !== 0;
    let _ = 0;
    let c = [];
    if (a) {
      if ((c = this.Bga(this.esr, r)).length !== 4) {
        return {
          Loc: o,
          Rot: l
        };
      }
      n = Vector_1.Vector.Dist(c[0], c[1]);
      n += Vector_1.Vector.Dist(c[2], c[3]);
      _ = Vector_1.Vector.Dist(c[0], c[1]) / n;
    }
    if (i < 1) {
      if (a) {
        if (i < _) {
          o = UE.KismetMathLibrary.D_VLerp(c[0].ToUeVector(), c[1].ToUeVector(), i / _);
        } else {
          o = UE.KismetMathLibrary.D_VLerp(c[2].ToUeVector(), c[3].ToUeVector(), (i - _) / (1 - _));
          if (!this.bga) {
            this.bga = true;
            this.SceneItem.ActorComp.SetActorLocation(o, "[ManipulableDrawState.PassThroughPortal]", false);
          }
        }
      } else {
        o = UE.KismetMathLibrary.D_VLerp(t, r, i);
      }
      l = UE.KismetMathLibrary.RLerp(s, h, i, true);
    }
    return {
      Loc: o,
      Rot: l
    };
  }
  Bga(t, e) {
    var i = [];
    var s = this.SceneItem.GetPassThroughPortalType() === 1;
    var r = Vector_1.Vector.Create(e);
    var a = Vector_1.Vector.Create();
    PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(r, this.SceneItem.GetPassThroughPortalId(), s, a);
    var h = ModelManager_1.ModelManager.PortalModel?.GetPortal(this.SceneItem.GetPassThroughPortalId());
    var o = Vector_1.Vector.Create();
    var l = Vector_1.Vector.Create((s ? h?.PortalWorldTransform2 : h?.PortalWorldTransform1).GetLocation());
    var n = Vector_1.Vector.Create((s ? h?.PortalWorldTransform2 : h?.PortalWorldTransform1).GetRotation().GetForwardVector());
    MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(a, Vector_1.Vector.Create(t), l, n, o);
    if (!o.IsZero()) {
      i.push(Vector_1.Vector.Create(t));
      i.push(Vector_1.Vector.Create(o));
    }
    r.DeepCopy(t);
    PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(r, this.SceneItem.GetPassThroughPortalId(), !s, a);
    l = Vector_1.Vector.Create((s ? h?.PortalWorldTransform1 : h?.PortalWorldTransform2).GetLocation());
    n = Vector_1.Vector.Create((s ? h?.PortalWorldTransform1 : h?.PortalWorldTransform2).GetRotation().GetForwardVector());
    MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(a, Vector_1.Vector.Create(e), l, n, o);
    if (!o.IsZero()) {
      i.push(o);
      i.push(Vector_1.Vector.Create(e));
    }
    return i;
  }
}
exports.SceneItemManipulableDrawState = SceneItemManipulableDrawState;
//# sourceMappingURL=SceneItemManipulableDrawState.js.map