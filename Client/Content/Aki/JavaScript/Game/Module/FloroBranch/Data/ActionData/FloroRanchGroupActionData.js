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
    this.aCu = [];
    this.CPu = undefined;
  }
  InitActionData(t) {
    this.aCu.length = 0;
    for (const s of t) {
      var o = FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.CreateActionData(s);
      this.aCu.push(o);
    }
  }
  async OnExecute() {
    for (const t of this.aCu) {
      this.CPu = t;
      await this.WaitIfPause();
      if (this.CPu.IsExit()) {
        return;
      }
      await t.ExecuteAction();
      await this.WaitIfPause();
      if (this.CPu.IsExit()) {
        return;
      }
    }
  }
  OnPause() {
    if (this.CPu) {
      this.CPu.Pause();
    }
  }
  OnResume() {
    if (this.CPu) {
      this.CPu.Resume();
    }
  }
  OnExit() {
    if (this.CPu) {
      this.CPu.Exit();
    }
    for (const t of this.aCu) {
      t.Exit();
    }
    this.aCu.length = 0;
  }
  SetIgnoreCasterEntityAnim(t) {
    for (const o of this.aCu) {
      if (o instanceof FloroRanchActionBase_1.FloroRanchActionDataBase) {
        o.SetIgnoreCasterEntityAnim(t);
      }
    }
  }
}
exports.FloroRanchGroupActionData = FloroRanchGroupActionData;
//# sourceMappingURL=FloroRanchGroupActionData.js.map