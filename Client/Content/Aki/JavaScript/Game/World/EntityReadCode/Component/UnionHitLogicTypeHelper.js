"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionHitLogicTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbHitLogicChangeCountDownState_1 = require("./FbHitLogicChangeCountDownState");
const FbHitLogicChangeLockState_1 = require("./FbHitLogicChangeLockState");
const FbHitLogicChangeNextAndLockTargetState_1 = require("./FbHitLogicChangeNextAndLockTargetState");
const FbHitLogicChangeNextState_1 = require("./FbHitLogicChangeNextState");
const FbHitLogicChangeTargetState_1 = require("./FbHitLogicChangeTargetState");
class UnionHitLogicTypeHelper {
  static GetUnionHitLogicTypeObject(e) {
    switch (e) {
      case fb_component_1.UnionHitLogicType.HitLogicChangeCountDownState:
        return new fb_component_1.HitLogicChangeCountDownState();
      case fb_component_1.UnionHitLogicType.HitLogicChangeLockState:
        return new fb_component_1.HitLogicChangeLockState();
      case fb_component_1.UnionHitLogicType.HitLogicChangeNextAndLockTargetState:
        return new fb_component_1.HitLogicChangeNextAndLockTargetState();
      case fb_component_1.UnionHitLogicType.HitLogicChangeNextState:
        return new fb_component_1.HitLogicChangeNextState();
      case fb_component_1.UnionHitLogicType.HitLogicChangeTargetState:
        return new fb_component_1.HitLogicChangeTargetState();
      default:
        return;
    }
  }
  static ReadUnionHitLogicType(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_component_1.UnionHitLogicType.HitLogicChangeCountDownState:
          return FbHitLogicChangeCountDownState_1.FbHitLogicChangeCountDownState.Create(t);
        case fb_component_1.UnionHitLogicType.HitLogicChangeLockState:
          return FbHitLogicChangeLockState_1.FbHitLogicChangeLockState.Create(t);
        case fb_component_1.UnionHitLogicType.HitLogicChangeNextAndLockTargetState:
          return FbHitLogicChangeNextAndLockTargetState_1.FbHitLogicChangeNextAndLockTargetState.Create(t);
        case fb_component_1.UnionHitLogicType.HitLogicChangeNextState:
          return FbHitLogicChangeNextState_1.FbHitLogicChangeNextState.Create(t);
        case fb_component_1.UnionHitLogicType.HitLogicChangeTargetState:
          return FbHitLogicChangeTargetState_1.FbHitLogicChangeTargetState.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionHitLogicTypeHelper = UnionHitLogicTypeHelper;
//# sourceMappingURL=UnionHitLogicTypeHelper.js.map