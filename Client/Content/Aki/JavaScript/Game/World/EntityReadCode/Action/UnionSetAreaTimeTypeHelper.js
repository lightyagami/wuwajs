"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSetAreaTimeTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbSetAreaTimeLock_1 = require("./FbSetAreaTimeLock");
const FbSetAreaTimeUnLock_1 = require("./FbSetAreaTimeUnLock");
class UnionSetAreaTimeTypeHelper {
  static GetUnionSetAreaTimeTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionSetAreaTimeType.SetAreaTimeLock:
        return new fb_action_1.SetAreaTimeLock();
      case fb_action_1.UnionSetAreaTimeType.SetAreaTimeUnLock:
        return new fb_action_1.SetAreaTimeUnLock();
      default:
        return;
    }
  }
  static ReadUnionSetAreaTimeType(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionSetAreaTimeType.SetAreaTimeLock:
          return FbSetAreaTimeLock_1.FbSetAreaTimeLock.Create(t);
        case fb_action_1.UnionSetAreaTimeType.SetAreaTimeUnLock:
          return FbSetAreaTimeUnLock_1.FbSetAreaTimeUnLock.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionSetAreaTimeTypeHelper = UnionSetAreaTimeTypeHelper;
//# sourceMappingURL=UnionSetAreaTimeTypeHelper.js.map