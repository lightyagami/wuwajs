"use strict";

var __decorate = this && this.__decorate || function (t, e, r, i) {
  var o;
  var n = arguments.length;
  var s = n < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, r, i);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        s = (n < 3 ? o(s) : n > 3 ? o(e, r, s) : o(e, r)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(e, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingBoatPerformComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../Character/Common/Component/Abilities/CharacterAttributeTypes");
const GongduolaPerformComponent_1 = require("../Gongduola/GongduolaPerformComponent");
const FishingBoatConfig_1 = require("./FishingBoatConfig");
let FishingBoatPerformComponent = class FishingBoatPerformComponent extends GongduolaPerformComponent_1.GongduolaPerformComponent {
  constructor() {
    super(...arguments);
    this.osn = undefined;
    this.fh_ = Vector_1.Vector.Create();
    this.Vc_ = () => {
      if (!this.IsSprint) {
        this.Config.SetBaseStateMoveConfig(this.ActorComp.Actor.VehicleMovementComponent);
      }
    };
  }
  OnInit() {
    return !!super.OnInit() && (this.IsHidePassenger = true);
  }
  OnStart() {
    return !!super.OnStart() && (this.osn = this.Entity.GetComponent(176), this.osn && this.osn.AddListener(CharacterAttributeTypes_1.EAttributeId.vVn, this.Vc_, "FishingBoatPerformComponent"), true);
  }
  OnActivate() {
    super.OnActivate();
    var t = this.ActorComp?.CreatureData?.GetCreatureDataId() ?? 0;
    ModelManager_1.ModelManager.FishingModel.GetShipData().RefreshShipEntity(t);
  }
  OnEnd() {
    if (this.osn) {
      this.osn.RemoveListener(CharacterAttributeTypes_1.EAttributeId.vVn, this.Vc_);
    }
    return super.OnEnd();
  }
  InitVehicleConfig() {
    var t = this.LoadVehicleConfigAsset();
    return !!t?.IsValid() && (this.Config = new FishingBoatConfig_1.FishingBoatConfig(this.Entity, t), this.ConfigInternal = this.Config.DeepCopy(), this.Config.Init());
  }
  CheckCanPerformHit() {
    for (const t of this.PassengerInfoMap.values()) {
      if (t.IsDriver && t.IsRolePassenger()) {
        return true;
      }
    }
    return false;
  }
  OnBulletHit(t, e) {
    if (this.ActorComp) {
      if (!(e = e.AttackerActorComp)?.Valid || !(this.ActorComp.ActorLocationProxy.Subtraction(e.ActorLocationProxy, this.fh_), this.fh_.Normalize())) {
        this.ActorComp.ActorForwardProxy.Multiply(-1, this.fh_);
      }
      this.CollisionStrength = 1;
      this.fh_.GetSafeNormal2D(this.fh_);
      e = Math.acos(this.fh_.CosineAngle2D(this.ActorComp.ActorForwardProxy)) * MathUtils_1.MathUtils.RadToDeg;
      this.CollisionDirection = e * Math.sign(this.fh_.DotProduct(this.ActorComp.ActorRightProxy));
      this.BeginCollisionPerform();
    }
  }
  FishingBoatEnterSprint(t, e, r) {
    this.Config.RefreshSprintConfig(t, e, r);
    this.TryEnterSprint();
  }
  CheckCanSprint() {
    return !this.IsInSprintStartAction && !(this.ActorComp.InputDirectProxy.X < 0);
  }
  TryEnterSprint() {
    return !!this.CheckCanSprint() && (this.IsEnterSprint = true);
  }
  HandlePendingDestroy() {
    ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
  }
};
FishingBoatPerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(282)], FishingBoatPerformComponent);
exports.FishingBoatPerformComponent = FishingBoatPerformComponent; //# sourceMappingURL=FishingBoatPerformComponent.js.map