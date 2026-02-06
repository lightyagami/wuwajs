"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityMoveAction = undefined;
const GameplayAction_1 = require("../GameplayAction");
class EntityMoveAction extends GameplayAction_1.GameplayAction {
  constructor() {
    super(...arguments);
    this.NeedTickInner = true;
    this.Config = undefined;
    this.MoveEntityHandle = undefined;
    this.TargetLocation = undefined;
    this.TargetRotator = undefined;
  }
  Init(t, i, s, o) {
    this.MoveEntityHandle = t;
    this.Config = i;
    this.TargetLocation = s;
    this.TargetRotator = o;
  }
  GetMoveActorComp() {
    if (this.MoveEntityHandle?.IsInit) {
      return this.MoveEntityHandle.Entity.GetComponent(1);
    }
  }
}
exports.EntityMoveAction = EntityMoveAction;
//# sourceMappingURL=EntityBaseMoveAction.js.map