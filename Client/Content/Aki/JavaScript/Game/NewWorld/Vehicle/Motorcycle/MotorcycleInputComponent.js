"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var o = arguments.length;
  var r = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (n = t[h]) {
        r = (o < 3 ? n(r) : o > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleInputComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const CharacterBuffIds_1 = require("../../Character/Common/Component/Abilities/CharacterBuffIds");
const VehicleInputComponent_1 = require("../Common/VehicleInputComponent");
const MOTOR_SPRINT_BUFF_ID = CharacterBuffIds_1.buffId.MotorSprintBuff;
let MotorcycleInputComponent = class MotorcycleInputComponent extends VehicleInputComponent_1.VehicleInputComponent {
  constructor() {
    super(...arguments);
    this.MoveComp = undefined;
    this.TmpVector1 = Vector_1.Vector.Create();
    this.BackBraking = false;
    this.PressingSprint = false;
    this.InSprintInternal = false;
  }
  get InSprint() {
    return this.InSprintInternal;
  }
  set InSprint(t) {
    if (this.InSprintInternal !== t) {
      if (this.InSprintInternal = t) {
        this.TagComp?.AddTag(-595765206);
        if (this.PerformComp?.Driver) {
          this.PerformComp.Driver.GetComponent(213)?.AddBuff(MOTOR_SPRINT_BUFF_ID, {
            InstigatorId: this.ActorComp.CreatureData.GetCreatureDataId(),
            Reason: "MotorInput.Sprint"
          });
        }
      } else {
        this.TagComp?.RemoveTag(-595765206);
        if (this.PerformComp?.Driver) {
          this.PerformComp.Driver.GetComponent(213)?.RemoveBuff(MOTOR_SPRINT_BUFF_ID, -1, "MotorInput.Sprint");
        }
      }
    }
  }
  OnStart() {
    super.OnStart();
    this.MoveComp = this.Entity.GetComponent(253);
    return true;
  }
  UpdateVehicleInputDirectAndFacing() {
    this.UpdateMoveCache();
    this.InputAdjusted(this.TmpVector1);
    this.ActorComp.SetInputDirect(this.TmpVector1, true);
    this.SetInputFacingFromInputDirect();
  }
  SetInputFacingFromInputDirect(t = 0) {
    this.ActorComp.SetInputFacing(this.ActorComp.ActorForwardProxy);
  }
  InputAdjusted(t) {
    var e = this.MoveVectorCache.Size();
    if (e <= MathUtils_1.MathUtils.KindaSmallNumber) {
      t.DeepCopy(this.MoveVectorCache);
    } else {
      this.MoveVectorCache.Multiply(e / Math.max(Math.abs(this.MoveVectorCache.X), Math.abs(this.MoveVectorCache.Y)), t);
    }
  }
  ExecuteInputCommand(t, e) {
    var i = t.Command;
    switch (i.CommandType) {
      case 4:
        this.ExecuteSprint(i);
        break;
      case 2:
        this.ExecuteJump(i);
        break;
      case 1:
        this.ExecuteSkill(i);
    }
  }
  ExecuteSprint(t) {
    this.PressingSprint = !!t.IntValue;
    this.InSprint = this.PressingSprint && !this.BackBraking;
  }
  ExecuteJump(t) {
    this.BackBraking = !!t.IntValue;
    this.MoveComp.BackBraking = this.BackBraking;
    this.InSprint = this.PressingSprint && !this.BackBraking;
  }
  ExecuteSkill(t) {
    var e;
    if (t.IntValue === 210012) {
      if ((e = this.Entity.GetComponent(237))?.Driver) {
        e.TryLeave(e.Driver);
      }
    } else {
      this.WZo(t.IntValue);
    }
  }
  WZo(t) {
    this.Entity.GetComponent(39).BeginSkill(t, {
      Reason: "FishingBoatInputComponent.ExecuteSkill"
    });
  }
};
MotorcycleInputComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(252)], MotorcycleInputComponent);
exports.MotorcycleInputComponent = MotorcycleInputComponent; //# sourceMappingURL=MotorcycleInputComponent.js.map