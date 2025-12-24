"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LguiTweenBase = undefined;
const puerts_1 = require("puerts");
class LguiTweenBase {
  constructor() {
    this.Delegate = undefined;
    this.IsFinished = false;
    this.Tweener = undefined;
    this.UpdateTween = undefined;
    this.StartTween = undefined;
    this.CompleteTween = undefined;
    this.OAn = t => {
      this.UpdateTween?.(t);
    };
    this.Tiu = () => {
      this.StartTween?.();
    };
    this.biu = () => {
      this.IsFinished = true;
      this.KillTween();
      this.CompleteTween?.();
    };
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn);
  }
  PlayTween(t, s, i, h) {
    this.IsFinished = false;
    this.KillTween();
    this.Tweener = this.CreateTween(t, s, i);
    if (this.Tweener) {
      if (h) {
        this.Tweener.SetEase(28);
        this.Tweener.SetCurveFloat(h);
      }
      this.Tweener.OnStartCallBack.Bind(this.Tiu);
      this.Tweener.OnCompleteCallBack.Bind(this.biu);
    }
  }
  SetCurrentEase(t) {
    if (this.Tweener) {
      this.Tweener.SetEase(t);
    }
  }
  KillTween() {
    if (this.Tweener) {
      this.Tweener.Kill();
      this.Tweener.OnStartCallBack.Unbind();
      this.Tweener.OnCompleteCallBack.Unbind();
      this.Tweener = undefined;
    }
  }
  BindStartTween(t) {
    this.StartTween = t;
  }
  BindUpdateTween(t) {
    this.UpdateTween = t;
  }
  BindCompleteTween(t) {
    this.CompleteTween = t;
  }
  Destroy() {
    this.KillTween();
    (0, puerts_1.releaseManualReleaseDelegate)(this.OAn);
  }
}
exports.LguiTweenBase = LguiTweenBase;
//# sourceMappingURL=LguiTweenBase.js.map