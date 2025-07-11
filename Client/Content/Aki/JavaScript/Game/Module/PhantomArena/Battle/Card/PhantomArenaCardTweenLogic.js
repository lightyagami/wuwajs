"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCardTweenLogic = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../../GlobalData");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class LguiFloatTween {
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
    this.Ztu = () => {
      this.StartTween?.();
    };
    this.eiu = () => {
      this.IsFinished = true;
      this.KillTween();
      this.CompleteTween?.();
    };
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn);
  }
  PlayTween(t, i, s, h) {
    this.IsFinished = false;
    this.KillTween();
    this.Tweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, t, i, s);
    if (this.Tweener) {
      if (h) {
        this.Tweener.SetEase(28);
        this.Tweener.SetCurveFloat(h);
      }
      this.Tweener.OnStartCallBack.Bind(this.Ztu);
      this.Tweener.OnCompleteCallBack.Bind(this.eiu);
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
class PhantomArenaCardTweenLogic {
  constructor() {
    this.eVi = undefined;
    this.FromPos = Vector_1.Vector.Create(0, 0, 0);
    this.ToPos = Vector_1.Vector.Create(0, 0, 0);
    this.CardWorldPos = Vector_1.Vector.Create(0, 0, 0);
    this.LocationXTween = undefined;
    this.LocationYTween = undefined;
    this.kAn = undefined;
  }
  riu() {
    this.LocationXTween = new LguiFloatTween();
    this.LocationXTween.UpdateTween = t => {
      this.CardWorldPos.X = t;
      this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld());
    };
    this.LocationXTween.CompleteTween = () => {
      this.CardWorldPos.X = this.ToPos.X;
      this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld());
      this.gwu();
    };
    this.LocationYTween = new LguiFloatTween();
    this.LocationYTween.UpdateTween = t => {
      this.CardWorldPos.Z = t;
      this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld());
    };
    this.LocationYTween.CompleteTween = () => {
      this.CardWorldPos.Z = this.ToPos.Z;
      this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld());
      this.gwu();
    };
  }
  gwu() {
    if (this.LocationXTween.IsFinished && this.LocationYTween.IsFinished) {
      this.kAn?.();
    }
  }
  Init(t) {
    this.eVi = t;
    this.riu();
  }
  Destroy() {
    this.LocationXTween.Destroy();
    this.LocationYTween.Destroy();
  }
  PlayLocationByItem(t, i, s) {
    this.FromPos.DeepCopy(t.D_K2_GetComponentLocation());
    this.ToPos.DeepCopy(i.D_K2_GetComponentLocation());
    this.CardWorldPos.DeepCopy(this.FromPos);
    this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld());
    this.LocationXTween.StartTween = s?.StartCallback;
    this.kAn = s?.CompleteCallback;
    t = s?.DurationTime ?? PhantomArenaDefine_1.PLAY_TWEEN_DURATION;
    this.LocationXTween.PlayTween(this.FromPos.X, this.ToPos.X, t, s?.LocationCurveX);
    this.LocationYTween.PlayTween(this.FromPos.Z, this.ToPos.Z, t, s?.LocationCurveY);
  }
}
exports.PhantomArenaCardTweenLogic = PhantomArenaCardTweenLogic;
//# sourceMappingURL=PhantomArenaCardTweenLogic.js.map