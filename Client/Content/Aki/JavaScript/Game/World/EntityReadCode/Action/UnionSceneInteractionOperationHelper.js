"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSceneInteractionOperationHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbDisableSceneInteractionOperation_1 = require("./FbDisableSceneInteractionOperation");
const FbEnableSceneInteractionOperation_1 = require("./FbEnableSceneInteractionOperation");
class UnionSceneInteractionOperationHelper {
  static GetUnionSceneInteractionOperationObject(e) {
    switch (e) {
      case fb_action_1.UnionSceneInteractionOperation.DisableSceneInteractionOperation:
        return new fb_action_1.DisableSceneInteractionOperation();
      case fb_action_1.UnionSceneInteractionOperation.EnableSceneInteractionOperation:
        return new fb_action_1.EnableSceneInteractionOperation();
      default:
        return;
    }
  }
  static ReadUnionSceneInteractionOperation(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_action_1.UnionSceneInteractionOperation.DisableSceneInteractionOperation:
          return FbDisableSceneInteractionOperation_1.FbDisableSceneInteractionOperation.Create(n);
        case fb_action_1.UnionSceneInteractionOperation.EnableSceneInteractionOperation:
          return FbEnableSceneInteractionOperation_1.FbEnableSceneInteractionOperation.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionSceneInteractionOperationHelper = UnionSceneInteractionOperationHelper;
//# sourceMappingURL=UnionSceneInteractionOperationHelper.js.map