"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotInviteNewbie = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotInviteNewbie extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.InviteNewbieEntered];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.InviteNewbieModel.HasRedDot;
  }
}
exports.RedDotInviteNewbie = RedDotInviteNewbie;
//# sourceMappingURL=RedDotInviteNewbie.js.map