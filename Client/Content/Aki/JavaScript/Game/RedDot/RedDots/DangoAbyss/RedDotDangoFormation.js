"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotDangoFormation = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoFormation extends RedDotBase_1.RedDotBase {
  IsAllEventParamAsUId() {
    return false;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshAbyssDangoRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.DangoAbyssModel.GetDangoFormationNewRedDot();
  }
}
exports.RedDotDangoFormation = RedDotDangoFormation;
//# sourceMappingURL=RedDotDangoFormation.js.map