"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var i;
  var n = arguments.length;
  var s = n < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, r);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (i = e[l]) {
        s = (n < 3 ? i(s) : n > 3 ? i(t, o, s) : i(t, o)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterRoleTransitionComponent = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CHECK_CHANGE_ROLE_TIME = 1000;
let CharacterRoleTransitionComponent = class CharacterRoleTransitionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.kjr = 800;
    this.Fjr = false;
    this.Vjr = 0;
    this.Hjr = false;
  }
  OnStart() {
    this.Vjr = CHECK_CHANGE_ROLE_TIME;
    this.Hte = this.Entity.CheckGetComponent(3);
    return true;
  }
  OnTick(e) {
    var t;
    if (this.Hjr) {
      this.Vjr -= e;
      if (!(this.Vjr > 0)) {
        this.Vjr = CHECK_CHANGE_ROLE_TIME;
        if (Global_1.Global.BaseCharacter) {
          e = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocation;
          t = this.Hte.ActorLocation;
          e = Vector_1.Vector.DistSquared(Vector_1.Vector.Create(e), Vector_1.Vector.Create(t));
          this.Fjr = e < this.kjr * this.kjr;
          if (this.Hte.IsAutonomousProxy) {
            if (!this.Fjr) {
              if ((t = this.jjr())?.Valid) {
                e = t.GetComponent(0);
                this.Wjr(t.Id, e.GetPlayerId());
              }
            }
          } else if (this.Fjr) {
            t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
            this.Wjr(this.Entity.Id, t);
          }
        }
      }
    }
  }
  jjr() {
    for (const o of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
      if (o?.IsInit) {
        var e = o.Entity.GetComponent(0);
        if (e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
          e = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(o.Id);
          if (e && e.Actor !== Global_1.Global.BaseCharacter && e !== this.Hte) {
            var t = this.Hte.ActorLocation;
            var e = e.ActorLocation;
            if (UE.KismetMathLibrary.D_Vector_DistanceSquared(t, e) < this.kjr * this.kjr) {
              return o.Entity;
            }
          }
        }
      }
    }
  }
  Wjr(e, t) {
    ControllerHolder_1.ControllerHolder.CreatureController.ChangeEntityRoleRequest(e, t);
  }
};
CharacterRoleTransitionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(74)], CharacterRoleTransitionComponent);
exports.CharacterRoleTransitionComponent = CharacterRoleTransitionComponent; //# sourceMappingURL=CharacterRoleTransitionComponent.js.map