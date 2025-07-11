"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotFunctionPhotograph = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionPhotograph extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotFilter];
  }
  OnCheck() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterRedPoint, true);
  }
}
exports.RedDotFunctionPhotograph = RedDotFunctionPhotograph;
//# sourceMappingURL=RedDotFunctionPhotograph.js.map