"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var s = arguments.length;
  var i = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, n);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (r = e[l]) {
        i = (s < 3 ? r(i) : s > 3 ? r(t, o, i) : r(t, o)) || i;
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
exports.RbBaseComponent = undefined;
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
let RbBaseComponent = class RbBaseComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.IncId = undefined;
    this.OriginForward = undefined;
    this.OriginRight = undefined;
    this.IsMainController = false;
    this.OccupiedCellIndex = [];
  }
  RegisterToGameplay(e) {
    this.IncId = e;
    this.OriginForward = ControllerHolder_1.ControllerHolder.RollBlockController.GetForwardVector(this.IncId);
    this.OriginRight = ControllerHolder_1.ControllerHolder.RollBlockController.GetRightVector(this.IncId);
  }
  IsMoving() {
    return false;
  }
  OnActualShow() {}
};
RbBaseComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(330)], RbBaseComponent);
exports.RbBaseComponent = RbBaseComponent; //# sourceMappingURL=RbBaseComponent.js.map