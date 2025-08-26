"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LguiIntTween = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const GlobalData_1 = require("../../GlobalData");
class LguiIntTween {
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
    this.Tweener = UE.LTweenBPLibrary.IntTo(GlobalData_1.GlobalData.World, this.Delegate, t, s, i);
    if (this.Tweener) {
      if (h) {
        this.Tweener.SetEase(28);
        this.Tweener.SetCurveFloat(h);
      }
      this.Tweener.OnStartCallBack.Bind(this.Tiu);
      this.Tweener.OnCompleteCallBack.Bind(this.biu);
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
  Destroy() {
    this.KillTween();
    (0, puerts_1.releaseManualReleaseDelegate)(this.OAn);
  }
}
exports.LguiIntTween = LguiIntTween;
//# sourceMappingURL=LguiIntTween.js.map