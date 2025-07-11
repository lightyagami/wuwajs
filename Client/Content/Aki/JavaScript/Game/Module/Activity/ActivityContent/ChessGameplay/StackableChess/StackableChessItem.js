"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StackableChessItem = undefined;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const ChessItem_1 = require("../ChessBase/ChessItem");
class StackableChessItem extends ChessItem_1.ChessItem {
  constructor() {
    super(...arguments);
    this.Agent = undefined;
    this._dc = undefined;
  }
  OnClear() {
    this.SetNextItem(undefined);
  }
  SetNextItem(t) {
    if (this._dc !== t && this.Agent) {
      this._dc?.Agent?.DetachFromTarget(this.Agent);
    }
    if (this.Agent) {
      t?.Agent?.AttachToTarget(this.Agent);
    }
    this._dc = t;
  }
  GetNextItem() {
    return this._dc;
  }
  GetStackableLocation() {
    return this.Agent?.GetStackableLocation();
  }
  async MoveAsync(t, s) {
    var e = this.Agent;
    if (this.CurrentState === 0 && e) {
      const i = new CustomPromise_1.CustomPromise();
      this.CurrentState = 1;
      e.Move(t, s, () => {
        i.SetResult();
      });
      this.bpc(e, true);
      await i.Promise;
      this.CurrentState = 0;
      this.bpc(e, false);
    }
  }
  async PerformAsync(t) {
    var s = this.Agent;
    if (this.CurrentState === 0 && s) {
      var e = s.IsPerformRecursion(t);
      const i = new CustomPromise_1.CustomPromise();
      this.CurrentState = 2;
      s.Perform(t, this.CurrentPoint?.GetPointLocation(), () => {
        i.SetResult();
      });
      if (e) {
        this.un1(s, t, true);
      }
      await i.Promise;
      this.CurrentState = 0;
      if (e) {
        this.un1(s, t, false);
      }
    }
  }
  bpc(t, s) {
    var e = new Set();
    let i = this._dc;
    while (i && !e.has(i.GetId())) {
      e.add(i.GetId());
      i?.Agent?.OnPreviousMoveStateChange(t, s);
      i = i._dc;
    }
  }
  un1(t, s, e) {
    var i = new Set();
    let h = this._dc;
    while (h && !i.has(h.GetId())) {
      i.add(h.GetId());
      h?.Agent?.OnPreviousPerformStateChange(t, s, e);
      h = h._dc;
    }
  }
}
exports.StackableChessItem = StackableChessItem;
//# sourceMappingURL=StackableChessItem.js.map