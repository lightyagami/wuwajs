"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectLifeTimeController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const EffectModelHelper_1 = require("./Data/EffectModelHelper");
class EffectLifeTimeController {
  constructor(t, i, s, h, e = () => {}, r = () => true, o = 0, a = 1) {
    this.DefaultPassTime = 0;
    this.PassTimeInternal = 0;
    this.TotalPassTimeInternal = 0;
    this.StartTimeInternal = -1;
    this.LoopTimeInternal = 0;
    this.EndTimeInternal = 0;
    this.LoopTimeStamp = 0;
    this.LifeTimeStamp = 0;
    this.StateInternal = 0;
    this.ReadyToFinish = () => true;
    this.FinishCallback = () => {};
    this.WillLoop = false;
    this.WillEverPlay = false;
    this.StateInternal = 1;
    if (h === 3) {
      this.DefaultPassTime = o;
    }
    this.PassTimeInternal = 0;
    this.TotalPassTimeInternal = 0;
    this.TypeInternal = h;
    this.ReadyToFinish = r;
    this.FinishCallback = e;
    this.ManualTarget = 0;
    this.ManualTarget = o;
    this.ManualSpeed = a;
    this.ReInit(t, i, s);
  }
  get LifeTime() {
    return this.LifeTimeStamp;
  }
  get PassTime() {
    return this.PassTimeInternal;
  }
  get TotalPassTime() {
    return this.TotalPassTimeInternal;
  }
  get State() {
    return this.StateInternal;
  }
  get IsFinish() {
    return this.StateInternal === 6;
  }
  get Type() {
    return this.TypeInternal;
  }
  SetPassTimeManual(t, i = undefined) {
    this.ManualTarget = t;
    if (i) {
      this.ManualSpeed = i;
    }
  }
  Reset() {
    this.PassTimeInternal = this.DefaultPassTime;
    this.TotalPassTimeInternal = 0;
  }
  JumpToEnd() {
    this.PassTimeInternal = this.LifeTimeStamp;
    this.TotalPassTimeInternal = this.LifeTimeStamp;
  }
  ReInit(t, i, s) {
    this.StartTimeInternal = t;
    this.LoopTimeInternal = i;
    this.EndTimeInternal = s;
    this.LoopTimeStamp = t + i;
    this.LifeTimeStamp = t + i + s;
    this.CalcLoopBehavior();
  }
  SetType(t) {
    this.TypeInternal = t;
    this.CalcLoopBehavior();
  }
  LifeTimeCheck(t) {
    return false;
  }
  CalcLoopBehavior() {
    this.WillLoop = this.TypeInternal === 1 || this.TypeInternal === 0 && this.LoopTimeInternal > 0;
    this.WillEverPlay = this.WillLoop || this.TypeInternal === 0 && this.LifeTimeStamp <= 0 || this.TypeInternal === 3;
  }
  SetStateBuild() {
    this.StateInternal = 3;
  }
  SetStateInit() {
    this.StateInternal = 2;
  }
  Play() {
    if (!(this.StateInternal < 1)) {
      this.StateInternal = 4;
      this.PassTimeInternal = this.DefaultPassTime;
      this.TotalPassTimeInternal = 0;
    }
  }
  Update(t) {
    this.TotalPassTimeInternal += t;
    if (this.TypeInternal === 3) {
      if (this.StateInternal === 5) {
        this.PrepareFinish();
      } else {
        EffectModelHelper_1.EffectTemp.Number = Math.min(t * this.ManualSpeed, Math.abs(this.ManualTarget - this.PassTimeInternal));
        this.SeekTo(this.PassTimeInternal + EffectModelHelper_1.EffectTemp.Number * Math.sign(this.ManualTarget - this.PassTimeInternal), false);
      }
    } else {
      this.SeekTo(this.PassTimeInternal + t, true);
    }
  }
  SeekTo(t, i = false) {
    this.PassTimeInternal = t;
    if (this.StateInternal === 4 && this.PassTimeInternal >= this.LoopTimeStamp && this.WillLoop) {
      this.Fge();
    }
    if (i && (!this.WillEverPlay || this.StateInternal >= 5) && this.PassTimeInternal >= this.LifeTimeStamp) {
      this.PrepareFinish();
    }
  }
  Fge() {
    var t;
    var i;
    if (this.LoopTimeInternal <= 0.01) {
      this.PassTimeInternal = this.StartTimeInternal;
    } else if (this.PassTimeInternal >= this.LoopTimeStamp + this.LoopTimeInternal) {
      t = this.PassTimeInternal - this.StartTimeInternal;
      i = (0, puerts_1.$ref)(0);
      UE.KismetMathLibrary.FMod(t, this.LoopTimeInternal, i);
      this.PassTimeInternal = this.StartTimeInternal + (0, puerts_1.$unref)(i);
    } else {
      this.PassTimeInternal -= this.LoopTimeInternal;
    }
  }
  Stop(t = false) {
    if (!(this.StateInternal >= 5)) {
      this.StateInternal = 5;
      if (t) {
        this.PassTimeInternal = this.LoopTimeStamp;
      }
    }
  }
  PrepareFinish() {
    if (!this.ReadyToFinish || !!this.ReadyToFinish()) {
      this.StateInternal = 6;
      if (this.FinishCallback) {
        this.FinishCallback();
      }
    }
  }
  SetStateFinish() {
    this.StateInternal = 6;
  }
}
exports.EffectLifeTimeController = EffectLifeTimeController;
//# sourceMappingURL=EffectLifeTimeController.js.map