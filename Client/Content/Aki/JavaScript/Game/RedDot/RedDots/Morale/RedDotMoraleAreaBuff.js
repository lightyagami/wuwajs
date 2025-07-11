"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMoraleAreaBuff = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMoraleAreaBuff extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "MoraleBuff";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateMoraleAreaBuff];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MoraleModel.RedDotAreaBuff();
  }
}
exports.RedDotMoraleAreaBuff = RedDotMoraleAreaBuff;
//# sourceMappingURL=RedDotMoraleAreaBuff.js.map