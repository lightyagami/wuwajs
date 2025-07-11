"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionDungeonEventTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbRecordTimeStampType_1 = require("./FbRecordTimeStampType");
class UnionDungeonEventTypeHelper {
  static GetUnionDungeonEventTypeObject(e) {
    if (e === fb_action_1.UnionDungeonEventType.RecordTimeStampType) {
      return new fb_action_1.RecordTimeStampType();
    }
  }
  static ReadUnionDungeonEventType(e, n) {
    if (n !== undefined && e === fb_action_1.UnionDungeonEventType.RecordTimeStampType) {
      return FbRecordTimeStampType_1.FbRecordTimeStampType.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionDungeonEventTypeHelper = UnionDungeonEventTypeHelper;
//# sourceMappingURL=UnionDungeonEventTypeHelper.js.map