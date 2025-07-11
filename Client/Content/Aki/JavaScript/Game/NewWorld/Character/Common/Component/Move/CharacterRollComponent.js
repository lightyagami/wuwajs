"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var i;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, o);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (i = e[h]) {
        r = (s < 3 ? i(r) : s > 3 ? i(t, n, r) : i(t, n)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterRollComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const CustomMovementDefine_1 = require("./CustomMovementDefine");
let CharacterRollComponent = class CharacterRollComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Gce = undefined;
    this.Ixa = (0, puerts_1.$ref)(undefined);
    this.Txa = 1200;
    this.Lxa = 0.1;
    this.Dxa = 1000;
    this.Axa = 1960;
    this.Rxa = 100;
    this.nun = 4000;
    this.Uxa = e => {
      UE.KuroMovementBPLibrary.KuroRoll(e, this.Gce.CharacterMovement, this.Txa, this.Lxa, this.Dxa, this.Ixa, this.Axa, this.Rxa, this.nun);
    };
  }
  static get Dependencies() {
    return [178];
  }
  OnInit(e) {
    return true;
  }
  OnStart() {
    this.Gce = this.Entity.GetComponent(178);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveRoll, this.Uxa);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveRoll, this.Uxa);
    return true;
  }
  EnterRoll(e, t, n, o, i, s) {
    this.Txa = e;
    this.Lxa = t;
    this.Dxa = n;
    this.Axa = o;
    this.Rxa = i;
    this.nun = s;
    this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL,
      Context: "[CharacterRollComponent.EnterRoll]"
    });
  }
  LeaveRoll() {
    this.Gce?.ActorComp?.Actor.KuroSetMovementMode({
      Mode: 3,
      Context: "[CharacterRollComponent.LeaveRoll]"
    });
  }
};
CharacterRollComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(37)], CharacterRollComponent);
exports.CharacterRollComponent = CharacterRollComponent; //# sourceMappingURL=CharacterRollComponent.js.map