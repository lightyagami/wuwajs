"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiComponentsTween = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
class UiComponentsTween {
  constructor(t) {
    this.B_r = undefined;
    this.b_r = undefined;
    this.xTt = t;
  }
  q_r(t = false) {
    var e = this.B_r.Time;
    var s = this.B_r.TargetAlpha;
    var i = t ? s : 1;
    var o = t ? 1 : s;
    for (const r of this.b_r) {
      r.PlayUIItemAlphaTween(i, o, e);
    }
    var s = this.B_r.TargetSize;
    var n = t ? s : 1;
    var h = t ? 1 : s;
    for (const a of this.b_r) {
      a.PlayUIItemScaleTween(n, h, e);
    }
  }
  CollectUnSafeItem() {
    if (!this.b_r) {
      let s = !(this.b_r = []);
      var i = this.xTt.GetAttachUIChildren();
      for (let t = 0, e = i.Num(); t < e; ++t) {
        var o = i.Get(t);
        if (!s) {
          if (o.GetOwner().GetComponentByClass(UE.UISafeZone.StaticClass())) {
            s = true;
            continue;
          }
        }
        this.b_r.push(o);
      }
      if (!s) {
        this.b_r.length = 0;
        this.b_r.push(this.xTt);
      }
    }
  }
  SetUiComponentsTweenData(t) {
    if (t) {
      this.B_r = new UiComponentsTweenData(t.GetTweenAlpha(), t.GetTweenSize(), t.GetTweenTime());
    }
  }
  PlayStartTween() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 10, "关卡序列:播放界面间的Tween");
    }
    this.CollectUnSafeItem();
    this.q_r();
  }
  PlayCloseTween() {
    this.q_r(true);
  }
  Destroy() {
    this.B_r = undefined;
    this.xTt = undefined;
    this.b_r = [];
  }
}
exports.UiComponentsTween = UiComponentsTween;
class UiComponentsTweenData {
  constructor(t, e, s) {
    this.TargetAlpha = t;
    this.TargetSize = e;
    this.Time = s;
  }
}
//# sourceMappingURL=UiComponentsTween.js.map