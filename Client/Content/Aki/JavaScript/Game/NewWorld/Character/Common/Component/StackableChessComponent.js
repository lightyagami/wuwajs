"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var n;
  var s = arguments.length;
  var i = s < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, r);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        i = (s < 3 ? n(i) : s > 3 ? n(t, o, i) : n(t, o)) || i;
      }
    }
  }
  if (s > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StackableChessComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let StackableChessComponent = class StackableChessComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
  }
  OnStart() {
    this.ActorComp = this.Entity.CheckGetComponent(1);
    return true;
  }
  GetStackableLocation() {
    return this.ActorComp?.ActorLocationProxy;
  }
  AttachToTarget(e) {
    var t;
    var e = e.ActorComp;
    if (this.ActorComp?.Valid && e?.Valid && (t = this.GetAttachSocketName())) {
      this.ActorComp.Owner?.K2_AttachToComponent(e.SkeletalMesh, t, 1, 1, 1, false);
    }
  }
  DetachFromTarget(e) {
    if (this.ActorComp?.Valid) {
      this.ActorComp.Owner?.K2_DetachFromActor(1, 1, 1);
    }
  }
  Move(e, t, o) {
    this.ActorComp?.SetActorLocationAndRotation(e.ToUeVector(), t.ToUeRotator(), "ChessMove", false);
    o();
  }
  Teleport(e, t) {
    this.ActorComp?.SetActorLocationAndRotation(e.ToUeVector(), t.ToUeRotator(), "ChessTeleport", false);
  }
  OnPreviousMoveStateChange(e, t) {}
  IsPerformRecursion(e) {
    return false;
  }
  Perform(e, t, o) {
    o();
  }
  OnPreviousPerformStateChange(e, t, o) {}
  GetLocation() {
    return this.ActorComp?.ActorLocationProxy;
  }
  GetAttachSocketName() {}
};
StackableChessComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(290)], StackableChessComponent);
exports.StackableChessComponent = StackableChessComponent; //# sourceMappingURL=StackableChessComponent.js.map