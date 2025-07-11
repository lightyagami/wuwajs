"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnChairController = exports.SubEntityInteractLogicController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../Manager/ModelManager");
class SubEntityInteractLogicController {
  constructor(t) {
    this.MasterEntity = undefined;
    this.Entity = undefined;
    this.CreatureDataComp = undefined;
    this.InteractComp = undefined;
    this.CreatureDataComp = t;
    this.Entity = t.Entity;
    this.InteractComp = this.Entity.GetComponent(197)?.GetInteractController();
  }
  Possess(t, r = 0) {
    return true;
  }
  UnPossess(t) {
    return true;
  }
  IsPossessed() {
    return this.MasterEntity !== undefined;
  }
  IsPossessedBy(t) {
    return this.MasterEntity !== undefined && this.MasterEntity === t;
  }
  Dispose() {
    this.MasterEntity = undefined;
    this.Entity = undefined;
    this.CreatureDataComp = undefined;
    this.InteractComp = undefined;
  }
}
(exports.SubEntityInteractLogicController = SubEntityInteractLogicController).TmpVector = Vector_1.Vector.Create();
SubEntityInteractLogicController.TmpVector2 = Vector_1.Vector.Create();
class PawnChairController extends SubEntityInteractLogicController {
  constructor() {
    super(...arguments);
    this.x4a = 40;
    this.mrr = undefined;
  }
  Possess(t, r) {
    this.MasterEntity = t;
    return true;
  }
  UnPossess(t) {
    return !(this.MasterEntity = undefined);
  }
  GetSitLocation() {
    var t = PawnChairController.TmpVector;
    t.Reset();
    var r = PawnChairController.TmpVector2;
    var s = this.Entity.GetComponent(1);
    r.DeepCopy(s.ActorLocationProxy);
    var i = this.MasterEntity.GetComponent(2);
    var e = i.ScaledHalfHeight;
    var i = i.ActorLocationProxy;
    (this.mrr || s).ActorRightProxy.Multiply(this.x4a, t);
    r.Z = this.mrr ? this.mrr.ActorLocationProxy.Z + e : i.Z;
    t.AdditionEqual(r);
    return t;
  }
  GetForwardDirection() {
    return this.Entity.GetComponent(1).ActorRightProxy;
  }
  drr(r) {
    if (this.mrr && this.MasterEntity && this.mrr.GetIsSceneInteractionLoadCompleted()) {
      var s = r ? 0 : 2;
      var i = this.MasterEntity.GetComponent(2);
      var t = (0, puerts_1.$ref)(undefined);
      this.mrr.Owner.GetAttachedActors(t);
      var e = (0, puerts_1.$unref)(t);
      var o = e.Num();
      if (o === 0 && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AI", 50, "[PawnChairController.IgnoreChairActorsCollision] 场景交互物体未加载完全", ["itemPbDataId", this.CreatureDataComp.GetPbDataId()], ["OwnerPbDataId", this.mrr.CreatureData.GetPbDataId()]);
      }
      for (let t = 0; t < o; ++t) {
        var n = e.Get(t);
        var h = (0, puerts_1.$ref)(undefined);
        n.GetAttachedActors(h);
        var a = (0, puerts_1.$unref)(h);
        var l = a.Num();
        for (let t = 0; t < l; ++t) {
          var u = a.Get(t);
          if (u.IsValid() && (i.Actor.IgnoreActorWhenMoving(a.Get(t), r, true), (u = u)?.IsValid())) {
            u.GetComponentByClass(UE.StaticMeshComponent.StaticClass())?.SetCollisionResponseToChannel(2, s);
          }
        }
      }
    }
  }
  ResetCollision() {
    if (this.Entity.GetComponent(202)) {
      this.drr(false);
    }
  }
  IgnoreCollision() {
    if (this.Entity.GetComponent(202)) {
      this.drr(true);
    }
  }
  IsSceneInteractionLoadCompleted() {
    var t;
    var r = this.Entity.GetComponent(202);
    return !!r && !!r.GetIsSceneInteractionLoadCompleted() && !(t = this.CreatureDataComp.GetPbDataId(), (t = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(t)) ? !(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t))?.Valid || (this.mrr = t.Entity.GetComponent(202), !this.mrr) || !this.mrr.GetIsSceneInteractionLoadCompleted() : (this.mrr = r, 0));
  }
}
exports.PawnChairController = PawnChairController;
//# sourceMappingURL=PawnChairController.js.map