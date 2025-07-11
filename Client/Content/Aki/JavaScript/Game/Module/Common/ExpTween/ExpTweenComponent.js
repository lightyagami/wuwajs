"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpTweenComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const GlobalData_1 = require("../../../GlobalData");
const UiLayer_1 = require("../../../Ui/UiLayer");
class ExpTweenComponent {
  constructor(t, i, s, h, e = undefined) {
    this.TweenFinishFunction = e;
    this.ExpTweener = undefined;
    this.TweenTime = 1;
    this.StartCount = 1;
    this.FinalFillAmount = 0;
    this.PreviewExpTweener = undefined;
    this.PreviewTweenTime = 0.5;
    this.PreviewFinalFillAmount = 0;
    this.CurrentLevel = 0;
    this.ArrivedLevel = 0;
    this.TargetLevel = 0;
    this.InCurrent = false;
    this.kLt = undefined;
    this.FLt = undefined;
    this.PlayFillAmount = t => {
      this.SetCurrentFillAmount(t);
    };
    this.PlayPreviewFillAmount = t => {
      if (this.InCurrent) {
        this.SetAddFillAmount(t);
      } else {
        this.SetNextFillAmount(t);
        if (this.AddSprite.GetFillAmount() !== 1) {
          this.SetAddFillAmount(1);
        }
      }
    };
    this.AddSprite = i;
    this.CurrentSprite = t;
    this.NextSprite = s;
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.PlayFillAmount);
    this.PreviewDelegate = (0, puerts_1.toManualReleaseDelegate)(this.PlayPreviewFillAmount);
  }
  PlayTween(t, i, s, h, e) {
    var o = t === 1 ? this.CurrentSprite.GetFillAmount() : 0;
    var r = t === i ? this.FinalFillAmount : 1;
    if (t === i) {
      this.AddSprite.SetFillAmount(r);
    }
    UiLayer_1.UiLayer.SetShowMaskLayer("ExpTweenComponent", true);
    this.ExpTweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, o, r, s, h, e);
    this.ExpTweener.OnCompleteCallBack.Bind(() => {
      this.TweenCompleteCallBack(t, i, s, h, e);
    });
  }
  TweenCompleteCallBack(t, i, s, h, e) {
    this.KillExpTweener();
    if (this.FLt) {
      this.FLt(t === i);
    }
    if (t < i) {
      this.PlayTween(t + 1, i, s, h, e);
    } else {
      UiLayer_1.UiLayer.SetShowMaskLayer("ExpTweenComponent", false);
      if (this.TweenFinishFunction) {
        this.TweenFinishFunction();
      }
    }
  }
  KillExpTweener() {
    if (this.ExpTweener) {
      this.ExpTweener.Kill();
      this.ExpTweener = undefined;
    }
  }
  PlayPreviewTween(t, i, s, h) {
    this.PreviewExpTweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.PreviewDelegate, t, i, s);
    this.PreviewExpTweener.OnCompleteCallBack.Bind(() => {
      this.PreviewTweenCompleteCallBack(s, h);
    });
  }
  PreviewTweenCompleteCallBack(t, i) {
    this.KillPreviewExpTweener();
    if (i) {
      this.PreviewTweenPlayAgainState(t);
    } else {
      this.PreviewTweenStopState();
    }
  }
  PreviewTweenStopState() {
    if (this.PreviewFinalFillAmount === 1) {
      this.SetCurrentSpriteActive(false);
      this.SetNextSpriteActive(true);
      this.SetNextFillAmount(this.PreviewFinalFillAmount);
    } else if (this.TargetLevel === this.CurrentLevel) {
      this.SetCurrentSpriteActive(true);
      this.SetAddFillAmount(this.PreviewFinalFillAmount);
      this.SetNextSpriteActive(false);
    }
  }
  PreviewTweenPlayAgainState(t) {
    if (this.ArrivedLevel > this.TargetLevel) {
      this.InCurrent = this.TargetLevel === this.CurrentLevel;
      if (this.InCurrent) {
        this.SetCurrentSpriteActive(true);
        this.SetNextSpriteActive(false);
      }
      this.PlayPreviewTween(1, this.PreviewFinalFillAmount, t, false);
    } else if (this.ArrivedLevel < this.TargetLevel) {
      this.InCurrent = false;
      this.SetCurrentSpriteActive(false);
      this.SetNextSpriteActive(true);
      this.PlayPreviewTween(0, this.PreviewFinalFillAmount, t, false);
    }
  }
  KillPreviewExpTweener(t = false) {
    this.PreviewExpTweener?.Kill();
    this.PreviewExpTweener = undefined;
    if (t) {
      this.PreviewTweenStopState();
    }
  }
  BindPlayCompleteCallBack(t) {
    this.FLt = t;
  }
  BindPlayCurrentFillAmountCallback(t) {
    this.kLt = t;
  }
  SetCurrentFillAmount(t) {
    this.CurrentSprite.SetFillAmount(t);
    if (this.kLt) {
      this.kLt(t);
    }
  }
  SetNextFillAmount(t) {
    this.NextSprite.SetFillAmount(t);
  }
  SetAddFillAmount(t) {
    this.AddSprite.SetFillAmount(t);
  }
  SetCurrentSpriteActive(t) {
    this.CurrentSprite.SetUIActive(t);
  }
  SetNextSpriteActive(t) {
    this.NextSprite.SetUIActive(t);
  }
  PlayExpTween(t, i, s, h) {
    this.SetCurrentSpriteActive(true);
    this.SetNextSpriteActive(false);
    this.AddSprite.SetFillAmount(0);
    this.FinalFillAmount = i;
    i = this.TweenTime / t;
    this.PlayTween(this.StartCount, t, i, s, h);
  }
  PlayPreviewExpTween(t, i, s, h, e) {
    this.KillPreviewExpTweener(true);
    this.PreviewFinalFillAmount = e;
    var o = (i !== t ? this.NextSprite : this.AddSprite).GetFillAmount();
    let r = undefined;
    r = s < i && i !== h ? 0 : i < s || s === h ? 1 : e;
    this.InCurrent = i === t;
    this.CurrentLevel = t;
    this.ArrivedLevel = i;
    this.TargetLevel = s;
    e = this.ArrivedLevel !== this.TargetLevel && this.ArrivedLevel !== h && this.TargetLevel !== h;
    t = e ? this.PreviewTweenTime / 2 : this.PreviewTweenTime;
    this.PlayPreviewTween(o, r, t, e);
  }
  Destroy() {
    UiLayer_1.UiLayer.SetShowMaskLayer("ExpTweenComponent", false);
    (0, puerts_1.releaseManualReleaseDelegate)(this.PlayFillAmount);
    (0, puerts_1.releaseManualReleaseDelegate)(this.PlayPreviewFillAmount);
    this.Delegate = undefined;
    this.PreviewDelegate = undefined;
    this.KillExpTweener();
    this.KillPreviewExpTweener();
    this.CurrentSprite = undefined;
    this.AddSprite = undefined;
    this.NextSprite = undefined;
  }
}
exports.ExpTweenComponent = ExpTweenComponent;
//# sourceMappingURL=ExpTweenComponent.js.map