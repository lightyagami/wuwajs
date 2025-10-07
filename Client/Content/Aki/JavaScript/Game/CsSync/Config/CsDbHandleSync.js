"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CsDbHandleSync = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class CsDbHandleSync {
  constructor() {
    this._zd = e => {
      CsDbHandleSync.uzd.add(e);
    };
    this.czd = e => {
      e.forEach(e => {
        CsDbHandleSync.uzd.add(e);
      });
    };
  }
  IsHolding(e) {
    return CsDbHandleSync.uzd.has(e);
  }
  Init() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyDbHandle, this._zd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyAllDbHandles, this.czd);
  }
  Clear() {
    CsDbHandleSync.uzd.clear();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyDbHandle, this._zd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyAllDbHandles, this.czd);
  }
}
(exports.CsDbHandleSync = CsDbHandleSync).uzd = new Set();
//# sourceMappingURL=CsDbHandleSync.js.map