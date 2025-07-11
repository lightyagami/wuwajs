"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionMoveOperationHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbDisableMoveOperation_1 = require("./FbDisableMoveOperation");
const FbEnableMoveOperation_1 = require("./FbEnableMoveOperation");
class UnionMoveOperationHelper {
  static GetUnionMoveOperationObject(e) {
    switch (e) {
      case fb_action_1.UnionMoveOperation.DisableMoveOperation:
        return new fb_action_1.DisableMoveOperation();
      case fb_action_1.UnionMoveOperation.EnableMoveOperation:
        return new fb_action_1.EnableMoveOperation();
      default:
        return;
    }
  }
  static ReadUnionMoveOperation(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionMoveOperation.DisableMoveOperation:
          return FbDisableMoveOperation_1.FbDisableMoveOperation.Create(t);
        case fb_action_1.UnionMoveOperation.EnableMoveOperation:
          return FbEnableMoveOperation_1.FbEnableMoveOperation.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionMoveOperationHelper = UnionMoveOperationHelper;
//# sourceMappingURL=UnionMoveOperationHelper.js.map