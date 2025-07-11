"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullScreenEffectController = undefined;
const PriorityQueue_1 = require("../../../Core/Container/PriorityQueue");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const FullScreenEffectView_1 = require("./FullScreenEffectView");
class FullScreenEffectController extends UiControllerBase_1.UiControllerBase {
  static async BeginEffect(t, e) {
    var i;
    if (!this.b9t.has(t)) {
      await (i = new FullScreenEffectView_1.FullScreenEffectView()).Init(t, e);
      this.b9t.add(t);
      if (this.q9t) {
        if (e >= this.q9t.Priority) {
          this.q9t.SetEffectVisibility(false, true);
          this.G9t.Push(this.q9t);
          (this.q9t = i).SetEffectVisibility(true, true);
        } else {
          i.SetEffectVisibility(false, false);
          this.G9t.Push(i);
        }
      } else {
        this.q9t = i;
        this.q9t.SetEffectVisibility(true, true);
      }
    }
  }
  static EndEffect(t) {
    if (t === this.q9t.Path) {
      this.q9t.DeActive();
    } else if (this.b9t.has(t)) {
      this.b9t.delete(t);
    }
  }
  static EndCurView() {
    var t;
    if (this.q9t && (this.b9t.delete(this.q9t.Path), this.q9t.SetEffectVisibility(false, true), this.q9t.Destroy(), this.q9t = undefined, t = this.N9t())) {
      this.q9t = t;
      this.q9t.SetEffectVisibility(true, true);
    }
  }
  static OnClear() {
    this.b9t.clear();
    if (this.q9t) {
      this.q9t.SetEffectVisibility(false, true);
      this.q9t.Destroy();
    }
    while (!this.G9t.Empty) {
      this.G9t.Pop().Destroy();
    }
    return true;
  }
  static N9t() {
    while (!this.G9t.Empty) {
      var t = this.G9t.Pop();
      if (this.b9t.has(t.Path) && (this.b9t.delete(t.Path), t.IsEffectPlay())) {
        return t;
      }
      t.Destroy();
    }
  }
}
(exports.FullScreenEffectController = FullScreenEffectController).q9t = undefined;
FullScreenEffectController.b9t = new Set();
FullScreenEffectController.G9t = new PriorityQueue_1.PriorityQueue(FullScreenEffectView_1.FullScreenEffectView.Compare); //# sourceMappingURL=FullScreenEffectController.js.map