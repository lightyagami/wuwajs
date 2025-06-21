"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCardTweenLogic = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../../GlobalData"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class LguiFloatTween {
  constructor() {
    this.Delegate = void 0, this.IsFinished = !1, this.Tweener = void 0, this.UpdateTween = void 0, this.StartTween = void 0, this.CompleteTween = void 0, this.OAn = t => {
      this.UpdateTween?.(t)
    }, this.otu = () => {
      this.StartTween?.()
    }, this.ntu = () => {
      this.IsFinished = !0, this.KillTween(), this.CompleteTween?.()
    }, this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.OAn)
  }
  PlayTween(t, i, s, h) {
    this.IsFinished = !1, this.KillTween(), this.Tweener = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, t, i, s), this.Tweener && (h && (this.Tweener.SetEase(28), this.Tweener.SetCurveFloat(h)), this.Tweener.OnStartCallBack.Bind(this.otu), this.Tweener.OnCompleteCallBack.Bind(this.ntu))
  }
  KillTween() {
    this.Tweener && (this.Tweener.Kill(), this.Tweener.OnStartCallBack.Unbind(), this.Tweener.OnCompleteCallBack.Unbind(), this.Tweener = void 0)
  }
  Destroy() {
    this.KillTween(), (0, puerts_1.releaseManualReleaseDelegate)(this.OAn)
  }
}
class PhantomArenaCardTweenLogic {
  constructor() {
    this.eVi = void 0, this.FromPos = Vector_1.Vector.Create(0, 0, 0), this.ToPos = Vector_1.Vector.Create(0, 0, 0), this.CardWorldPos = Vector_1.Vector.Create(0, 0, 0), this.LocationXTween = void 0, this.LocationYTween = void 0, this.kAn = void 0
  }
  htu() {
    this.LocationXTween = new LguiFloatTween, this.LocationXTween.UpdateTween = t => {
      this.CardWorldPos.X = t, this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld())
    }, this.LocationXTween.CompleteTween = () => {
      this.CardWorldPos.X = this.ToPos.X, this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld()), this.Udu()
    }, this.LocationYTween = new LguiFloatTween, this.LocationYTween.UpdateTween = t => {
      this.CardWorldPos.Z = t, this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld())
    }, this.LocationYTween.CompleteTween = () => {
      this.CardWorldPos.Z = this.ToPos.Z, this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld()), this.Udu()
    }
  }
  Udu() {
    this.LocationXTween.IsFinished && this.LocationYTween.IsFinished && this.kAn?.()
  }
  Init(t) {
    this.eVi = t, this.htu()
  }
  Destroy() {
    this.LocationXTween.Destroy(), this.LocationYTween.Destroy()
  }
  PlayLocationByItem(t, i, s) {
    this.FromPos.DeepCopy(t.D_K2_GetComponentLocation()), this.ToPos.DeepCopy(i.D_K2_GetComponentLocation()), this.CardWorldPos.DeepCopy(this.FromPos), this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld()), this.LocationXTween.StartTween = s?.StartCallback, this.kAn = s?.CompleteCallback;
    t = s?.DurationTime ?? PhantomArenaDefine_1.PLAY_TWEEN_DURATION;
    this.LocationXTween.PlayTween(this.FromPos.X, this.ToPos.X, t, s?.LocationCurveX), this.LocationYTween.PlayTween(this.FromPos.Z, this.ToPos.Z, t, s?.LocationCurveY)
  }
}
exports.PhantomArenaCardTweenLogic = PhantomArenaCardTweenLogic;
//# sourceMappingURL=PhantomArenaCardTweenLogic.js.map