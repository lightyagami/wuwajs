"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.StackableChessItem = void 0;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  ChessItem_1 = require("../ChessBase/ChessItem");
class StackableChessItem extends ChessItem_1.ChessItem {
  constructor() {
    super(...arguments), this.Agent = void 0, this._dc = void 0
  }
  OnClear() {
    this.SetNextItem(void 0)
  }
  SetNextItem(t) {
    this._dc !== t && this.Agent && this._dc?.Agent?.DetachFromTarget(this.Agent), this.Agent && t?.Agent?.AttachToTarget(this.Agent), this._dc = t
  }
  GetNextItem() {
    return this._dc
  }
  GetStackableLocation() {
    return this.Agent?.GetStackableLocation()
  }
  async MoveAsync(t, s) {
    var e = this.Agent;
    if (0 === this.CurrentState && e) {
      const i = new CustomPromise_1.CustomPromise;
      this.CurrentState = 1, e.Move(t, s, () => {
        i.SetResult()
      }), this.bpc(e, !0), await i.Promise, this.CurrentState = 0, this.bpc(e, !1)
    }
  }
  async PerformAsync(t) {
    var s = this.Agent;
    if (0 === this.CurrentState && s) {
      var e = s.IsPerformRecursion(t);
      const i = new CustomPromise_1.CustomPromise;
      this.CurrentState = 2, s.Perform(t, this.CurrentPoint?.GetPointLocation(), () => {
        i.SetResult()
      }), e && this.$o1(s, t, !0), await i.Promise, this.CurrentState = 0, e && this.$o1(s, t, !1)
    }
  }
  bpc(t, s) {
    var e = new Set;
    let i = this._dc;
    for (; i && !e.has(i.GetId());) e.add(i.GetId()), i?.Agent?.OnPreviousMoveStateChange(t, s), i = i._dc
  }
  $o1(t, s, e) {
    var i = new Set;
    let h = this._dc;
    for (; h && !i.has(h.GetId());) i.add(h.GetId()), h?.Agent?.OnPreviousPerformStateChange(t, s, e), h = h._dc
  }
}
exports.StackableChessItem = StackableChessItem;
//# sourceMappingURL=StackableChessItem.js.map