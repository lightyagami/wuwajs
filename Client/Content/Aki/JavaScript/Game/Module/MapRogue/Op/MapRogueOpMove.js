"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOpMove = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MapRogueOp_1 = require("./MapRogueOp");
const THOUSANDTH_RATIO = 1000;
const FOCUS_PLAYER_TWEEN_TIME = 0.25;
const MIN_FOCUS_PATH_COUNT = 3;
class MapRogueOpMove extends MapRogueOp_1.MapRogueOp {
  constructor(t) {
    super();
    this.LastGridIndex = t;
    this.StepSize = 1;
    this.ExecuteInMapView = true;
    this.ExecuteAfterMapViewShow = true;
    this.n8 = [];
    this.ZGc = [];
    this.CornerIndex = [];
    this.CornerSingleLength = [];
    this.CurrentFocusGridIndex = -1;
  }
  ToString() {
    return `[Move] IncId:${this.IncId} Step:${this.CurrentStep} StepSize:${this.StepSize}`;
  }
  OnUpdate() {
    var t = this.Data.DEc?.NEc;
    var s = this.Data.DEc?.VEc;
    if (t) {
      this.n8 = t;
      this.StepSize = this.n8.length;
      this.rUu();
    }
    if (s) {
      for (const i of s) {
        this.ZGc.push(i.jEc);
      }
    }
  }
  OnStartExecute(t) {
    var s = this.n8[this.n8.length - 1];
    t.SetMoveTimeGap(this.n8.length);
    if (t.CurSelectedIndex >= 0 && t.CurSelectedIndex !== s) {
      t.SetMapGridBgStateProxy(t.CurSelectedIndex, false);
      t.SetMapGridBgStateProxy(s, true);
    }
    this.rhd(t);
  }
  async rhd(t) {
    t.FocusOnGrid(this.LastGridIndex, true, undefined, FOCUS_PLAYER_TWEEN_TIME);
    const s = new CustomPromise_1.CustomPromise();
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      s.SetResult();
    }, Math.max(FOCUS_PLAYER_TWEEN_TIME * THOUSANDTH_RATIO, TimerSystem_1.MIN_TIME));
    await s.Promise;
    await t.CreateGridPathAsync(this.oUu());
    (t.CurOp = this).nUu(t);
    this.Execute(t);
  }
  OnExecute(t) {
    var s = this.n8[this.CurrentStep - 1];
    for (const i of this.ZGc[this.CurrentStep - 1]) {
      t.SetGridVisionProxy(i, true);
    }
    if (this.CurrentFocusGridIndex === s) {
      this.nUu(t);
    }
    t.MoveOneStep(this.LastGridIndex, s);
    this.LastGridIndex = s;
    t.GameStage = 3;
  }
  nUu(t) {
    var s;
    if (this.CornerIndex.length !== 0) {
      this.CurrentFocusGridIndex = this.CornerIndex.shift();
      s = this.CornerSingleLength.shift();
      t.FocusOnGrid(this.CurrentFocusGridIndex, true, undefined, t.MoveTimeGap * s / THOUSANDTH_RATIO);
    }
  }
  oUu() {
    var t = [];
    t.push(this.LastGridIndex);
    t.push(...this.n8);
    return t;
  }
  rUu() {
    let s = 0;
    var i = this.oUu();
    for (let t = 1; t < i.length - 1; t++) {
      s++;
      var e = i[t];
      var h = i[t - 1];
      var r = i[t + 1];
      if (s >= MIN_FOCUS_PATH_COUNT && this.IsShapeCorner(e, h, r)) {
        this.CornerIndex.push(e);
        this.CornerSingleLength.push(s);
        s = 0;
      }
    }
    this.CornerIndex.push(i.at(-1));
    this.CornerSingleLength.push(s + 1);
  }
  IsShapeCorner(t, s, i) {
    var e = (t, s) => t + 1 === s || t - 1 === s ? 0 : 1;
    return e(t, s) !== e(t, i);
  }
  OnFinish(t) {
    t.SetInteractAvailable(3, false);
    t.EndMove();
  }
}
exports.MapRogueOpMove = MapRogueOpMove;
//# sourceMappingURL=MapRogueOpMove.js.map