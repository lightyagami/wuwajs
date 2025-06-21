"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RedDotRoleChange = void 0;
const LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  ActivityDirectTrainHelper_1 = require("../../../../Module/Activity/ActivityContent/DirectTrain/ActivityDirectTrainHelper"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotRoleChange extends RedDotBase_1.RedDotBase {
  OnCheck(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainMakeRoleChange) ?? !1;
    return ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen && !t
  }
}
exports.RedDotRoleChange = RedDotRoleChange;
//# sourceMappingURL=RedDotRoleChange.js.map