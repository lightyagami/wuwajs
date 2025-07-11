"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchGroupActionData = undefined;
const FloroRanchEntityActionSystem_1 = require("../../Entity/FloroRanchEntityActionSystem");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
const FloroRanchAsyncActionBase_1 = require("./FloroRanchAsyncActionBase");
class FloroRanchGroupActionData extends FloroRanchAsyncActionBase_1.FloroRanchAsyncActionBase {
  constructor() {
    super(...arguments);
    this._gu = [];
    this.HAu = undefined;
  }
  InitActionData(t) {
    this._gu.length = 0;
    for (const n of t) {
      var o = FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.CreateActionData(n);
      this._gu.push(o);
    }
  }
  async OnExecute() {
    for (const t of this._gu) {
      this.HAu = t;
      await this.WaitIfPause();
      if (this.HAu.IsExit()) {
        return;
      }
      await t.ExecuteAction();
      await this.WaitIfPause();
      if (this.HAu.IsExit()) {
        return;
      }
    }
  }
  OnPause() {
    if (this.HAu) {
      this.HAu.Pause();
    }
  }
  OnResume() {
    if (this.HAu) {
      this.HAu.Resume();
    }
  }
  SetIgnoreCasterEntityAnim(t) {
    for (const o of this._gu) {
      if (o instanceof FloroRanchActionBase_1.FloroRanchActionDataBase) {
        o.SetIgnoreCasterEntityAnim(t);
      }
    }
  }
}
exports.FloroRanchGroupActionData = FloroRanchGroupActionData;
//# sourceMappingURL=FloroRanchGroupActionData.js.map