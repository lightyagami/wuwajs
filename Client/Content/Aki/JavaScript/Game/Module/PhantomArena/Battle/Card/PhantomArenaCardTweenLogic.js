"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCardTweenLogic = undefined;
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const LguiFloatTween_1 = require("../../../Util/Lgui/LguiFloatTween");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
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
  wiu() {
    this.LocationXTween = new LguiFloatTween_1.LguiFloatTween();
    this.LocationXTween.BindUpdateTween(t => {
      this.CardWorldPos.X = t;
      this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld());
    });
    this.LocationXTween.BindCompleteTween(() => {
      this.CardWorldPos.X = this.ToPos.X;
      this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld());
      this.bwu();
    });
    this.LocationYTween = new LguiFloatTween_1.LguiFloatTween();
    this.LocationYTween.BindUpdateTween(t => {
      this.CardWorldPos.Z = t;
      this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld());
    });
    this.LocationYTween.BindCompleteTween(() => {
      this.CardWorldPos.Z = this.ToPos.Z;
      this.eVi.SetUIWorldLocation(this.CardWorldPos.ToUeVectorOld());
      this.bwu();
    });
  }
  bwu() {
    if (this.LocationXTween.IsFinished && this.LocationYTween.IsFinished) {
      this.kAn?.();
    }
  }
  Init(t) {
    this.eVi = t;
    this.wiu();
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
    this.LocationXTween.BindStartTween(s?.StartCallback);
    this.kAn = s?.CompleteCallback;
    t = s?.DurationTime ?? PhantomArenaDefine_1.PLAY_TWEEN_DURATION;
    this.LocationXTween.PlayTween(this.FromPos.X, this.ToPos.X, t, s?.LocationCurveX);
    this.LocationYTween.PlayTween(this.FromPos.Z, this.ToPos.Z, t, s?.LocationCurveY);
  }
}
exports.PhantomArenaCardTweenLogic = PhantomArenaCardTweenLogic;
//# sourceMappingURL=PhantomArenaCardTweenLogic.js.map