"use strict";

var CharacterCatapultComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var o;
  var a = arguments.length;
  var r = a < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, n);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (o = t[s]) {
        r = (a < 3 ? o(r) : a > 3 ? o(e, i, r) : o(e, i)) || r;
      }
    }
  }
  if (a > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterCatapultComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const BigJumpUnit_1 = require("./BigJumpUnit");
const CustomMovementDefine_1 = require("./CustomMovementDefine");
const MODEL_BUFFER_TIME_LENGTH = 200;
const SUPER_CATAPULT_SKILL_ID = 400107;
let CharacterCatapultComponent = CharacterCatapultComponent_1 = class CharacterCatapultComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Gce = undefined;
    this.P$r = -0;
    this.x$r = undefined;
    this.LockRotator = false;
    this.w$r = false;
    this.B$r = t => {
      if (!(t < MathUtils_1.MathUtils.SmallNumber)) {
        this.x$r.GetOffset(this.P$r, t, CharacterCatapultComponent_1.Lz);
        this.P$r += t;
        this.Gce.MoveCharacter(CharacterCatapultComponent_1.Lz, t);
        if (this.LockRotator) {
          this.Hte?.SetInputRotator(this.x$r.Rotator);
        }
        if (this.P$r > this.x$r.TimeLength) {
          this.Hte?.Actor.KuroSetMovementMode({
            Mode: 3,
            Context: "[CharacterCatapultComponent.OnCustomMoveCatapult]"
          });
          this.x$r.GetSpeed(this.P$r, CharacterCatapultComponent_1.Lz);
          this.Gce.SetForceSpeed(CharacterCatapultComponent_1.Lz);
        }
      }
    };
  }
  static get Dependencies() {
    return [3, 179];
  }
  OnInitData() {
    this.x$r = new BigJumpUnit_1.BigJumpUnit();
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.Gce = this.Entity.GetComponent(179);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveCatapult, this.B$r);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMoveCatapult, this.B$r);
    return true;
  }
  SetConfig(t, e, i, n, o = "", a = BigJumpUnit_1.DEFAULT_GRAVITY, r = undefined, s, C = false) {
    this.w$r = C;
    this.LockRotator = a > 0;
    this.x$r.SetAll(t, e, i, n, o, a, r, s);
  }
  StartCatapult() {
    this.x$r.SetStartPoint(this.Hte.ActorLocationProxy);
    this.x$r.Init();
    this.P$r = 0;
    this.Hte?.Actor.KuroSetMovementMode({
      Mode: 6,
      CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE,
      Context: "[CharacterCatapultComponent.StartCatapult]"
    });
    var t;
    var e;
    var i = this.Entity.GetComponent(178);
    if (i) {
      i.SetLocationAndRotatorWithModelBuffer(this.Hte.ActorLocationProxy.ToUeVector(), this.x$r.Rotator.ToUeRotator(), MODEL_BUFFER_TIME_LENGTH, "Catapult Start");
    }
    if (this.w$r && (t = this.Entity.GetComponent(40).GetSkillMontageInstance(Number(SUPER_CATAPULT_SKILL_ID), 0), i?.MainAnimInstance) && t?.IsValid()) {
      e = i.MainAnimInstance.Montage_GetPosition(t);
      e = (t.SequenceLength - e) / this.x$r.RisingTime;
      i.MainAnimInstance.Montage_SetPlayRate(t, e);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 6, "StartCatapult", ["Actor", this.Hte.Actor.GetName()], ["CatapultUnit", this.x$r], ["IsSuperCatapult", this.w$r]);
    }
  }
};
CharacterCatapultComponent.Lz = Vector_1.Vector.Create();
CharacterCatapultComponent = CharacterCatapultComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(33)], CharacterCatapultComponent);
exports.CharacterCatapultComponent = CharacterCatapultComponent; //# sourceMappingURL=CharacterCatapultComponent.js.map