"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRoleChange = undefined;
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ActivityDirectTrainHelper_1 = require("../../../../Module/Activity/ActivityContent/DirectTrain/ActivityDirectTrainHelper");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotRoleChange extends RedDotBase_1.RedDotBase {
  OnCheck(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainMakeRoleChange) ?? false;
    return ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen && !t;
  }
}
exports.RedDotRoleChange = RedDotRoleChange;
//# sourceMappingURL=RedDotRoleChange.js.map