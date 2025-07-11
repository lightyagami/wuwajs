"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionHookInteractConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbChargeSlashHook_1 = require("./FbChargeSlashHook");
const FbFixedPointHook_1 = require("./FbFixedPointHook");
const FbKiteHook_1 = require("./FbKiteHook");
const FbMovementPointHook_1 = require("./FbMovementPointHook");
const FbRagDollClimbingPoint_1 = require("./FbRagDollClimbingPoint");
const FbRagDollJumpingPoint_1 = require("./FbRagDollJumpingPoint");
const FbSlashHook_1 = require("./FbSlashHook");
const FbSuiGuangHook_1 = require("./FbSuiGuangHook");
class UnionHookInteractConfigHelper {
  static GetUnionHookInteractConfigObject(o) {
    switch (o) {
      case fb_component_1.UnionHookInteractConfig.ChargeSlashHook:
        return new fb_component_1.ChargeSlashHook();
      case fb_component_1.UnionHookInteractConfig.FixedPointHook:
        return new fb_component_1.FixedPointHook();
      case fb_component_1.UnionHookInteractConfig.KiteHook:
        return new fb_component_1.KiteHook();
      case fb_component_1.UnionHookInteractConfig.MovementPointHook:
        return new fb_component_1.MovementPointHook();
      case fb_component_1.UnionHookInteractConfig.RagDollClimbingPoint:
        return new fb_component_1.RagDollClimbingPoint();
      case fb_component_1.UnionHookInteractConfig.RagDollJumpingPoint:
        return new fb_component_1.RagDollJumpingPoint();
      case fb_component_1.UnionHookInteractConfig.SlashHook:
        return new fb_component_1.SlashHook();
      case fb_component_1.UnionHookInteractConfig.SuiGuangHook:
        return new fb_component_1.SuiGuangHook();
      default:
        return;
    }
  }
  static ReadUnionHookInteractConfig(o, e) {
    if (e !== undefined) {
      switch (o) {
        case fb_component_1.UnionHookInteractConfig.ChargeSlashHook:
          return FbChargeSlashHook_1.FbChargeSlashHook.Create(e);
        case fb_component_1.UnionHookInteractConfig.FixedPointHook:
          return FbFixedPointHook_1.FbFixedPointHook.Create(e);
        case fb_component_1.UnionHookInteractConfig.KiteHook:
          return FbKiteHook_1.FbKiteHook.Create(e);
        case fb_component_1.UnionHookInteractConfig.MovementPointHook:
          return FbMovementPointHook_1.FbMovementPointHook.Create(e);
        case fb_component_1.UnionHookInteractConfig.RagDollClimbingPoint:
          return FbRagDollClimbingPoint_1.FbRagDollClimbingPoint.Create(e);
        case fb_component_1.UnionHookInteractConfig.RagDollJumpingPoint:
          return FbRagDollJumpingPoint_1.FbRagDollJumpingPoint.Create(e);
        case fb_component_1.UnionHookInteractConfig.SlashHook:
          return FbSlashHook_1.FbSlashHook.Create(e);
        case fb_component_1.UnionHookInteractConfig.SuiGuangHook:
          return FbSuiGuangHook_1.FbSuiGuangHook.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionHookInteractConfigHelper = UnionHookInteractConfigHelper;
//# sourceMappingURL=UnionHookInteractConfigHelper.js.map