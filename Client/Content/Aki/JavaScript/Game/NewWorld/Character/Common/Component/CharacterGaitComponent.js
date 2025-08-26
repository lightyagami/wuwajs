"use strict";

var __decorate = this && this.__decorate || function (e, t, i, a) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? t : a === null ? a = Object.getOwnPropertyDescriptor(t, i) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, a);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        n = (r < 3 ? s(n) : r > 3 ? s(t, i, n) : s(t, i)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterGaitComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TsBaseRoleConfig_1 = require("../../../../Character/TsBaseRoleConfig");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const STOP_SPEED = 5;
let CharacterGaitComponent = class CharacterGaitComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Gce = undefined;
    this.HBr = undefined;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.Gce = this.Entity.GetComponent(179);
    this.HBr = this.Entity.GetComponent(176);
    return !!this.Hte && !!this.Gce && !!this.HBr;
  }
  OnTick(e) {
    var t;
    var i;
    if (this.Hte.IsAutonomousProxy) {
      t = this.HBr.MoveState;
      i = this.HBr.PositionState;
      if (!this.Gce.HasMoveInput) {
        this.UpdateMoveReleasing(i, t);
      }
    }
  }
  UpdateMoveReleasing(e, t) {
    if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      switch (t) {
        case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
        case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
          if (this.Gce.Speed < STOP_SPEED) {
            this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
          }
          break;
        default:
          if (this.Gce.Speed > STOP_SPEED) {
            this.SetRunStop();
          }
      }
    }
  }
  SetRunStop() {
    switch (this.HBr.MoveState) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
        this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop);
        break;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Dodge:
      case CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll:
        if (this.Gce.Speed < this.Gce.MovementData.FaceDirection.Standing.SprintSpeed - TsBaseRoleConfig_1.tsBaseRoleConfig.MaxRunStopSpeed) {
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.RunStop);
        } else {
          this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop);
        }
    }
  }
};
CharacterGaitComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(58)], CharacterGaitComponent);
exports.CharacterGaitComponent = CharacterGaitComponent; //# sourceMappingURL=CharacterGaitComponent.js.map