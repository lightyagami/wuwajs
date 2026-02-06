"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerActionBase = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
class GuessJokerActionBase {
  constructor() {
    this.ActionId = 0;
    this.Done = false;
    this.JRf = 0;
    this.Duration = 0;
    this.ActionId = GuessJokerActionBase.f_r++;
  }
  Start() {
    this.Done = false;
    this.JRf = 0;
    this.OnAddEventListener();
    this.OnStart();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GuessJokerCard", 78, "GuessJokerActionBase：Start", ["ActionType", this.constructor.name], ["ActionId", this.ActionId]);
    }
  }
  Tick(s) {
    if (!this.Done && !(this.OnTick(s), this.Duration <= 0)) {
      this.JRf += s;
      if (this.JRf >= this.Duration) {
        this.Done = true;
      }
    }
  }
  Finish() {
    this.OnFinish();
    this.OnRemoveEventListener();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GuessJokerCard", 78, "GuessJokerActionBase：Finish", ["ActionType", this.constructor.name], ["ActionId", this.ActionId]);
    }
  }
  IsDone() {
    return this.Done;
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnStart() {}
  OnTick(s) {}
  OnFinish() {}
  AnimateCardsToTarget(s, e, t) {
    if (e) {
      var i = e.CardItemList;
      if (i.length === 0) {
        t();
      } else {
        var o = GuessJokerUtils_1.GuessJokerUtils.CalculateCardLayoutInfo(i.length, s);
        const c = new Array(i.length).fill(false);
        for (let s = 0; s < i.length; s++) {
          var r = i[s];
          var n = o[s];
          var h = Vector2D_1.Vector2D.Create(n.X, n.Y);
          r.SetAlpha(n.Alpha);
          r.SmoothMoveTo(h, () => {
            c[s] = true;
            if (c.every(s => s)) {
              t();
            }
          }, n.Scale, n.Rotation);
        }
      }
    } else {
      t();
    }
  }
}
(exports.GuessJokerActionBase = GuessJokerActionBase).f_r = 0;
//# sourceMappingURL=GuessJokerActionBase.js.map