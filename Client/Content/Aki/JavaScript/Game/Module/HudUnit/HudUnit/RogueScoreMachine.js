"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueScoreMachine = undefined;
const Time_1 = require("../../../../Core/Common/Time");
const SERVER_SCORE_UP_INTERVAL = 300;
const SERVER_SCORE_DOWN_INTERVAL = 1000;
const MAX_SCORE_DIFF = 1000;
class RogueScoreMachine {
  constructor() {
    this.SIn = undefined;
    this.yIn = undefined;
    this.oAn = 0;
    this.IIn = 0;
    this.rvo = 0;
    this.TIn = undefined;
    this.LIn = undefined;
    this.Ist = 0;
  }
  SetUpdateCallback(i, t) {
    this.SIn = i;
    this.yIn = t;
  }
  UpdateTargetScore(t, s) {
    if (s && t >= s.LowerUpperLimits[1]) {
      this.rvo = s.LowerUpperLimits[1];
    } else {
      this.rvo = t;
    }
    this.LIn = s;
    if (this.IIn !== this.rvo) {
      s = this.rvo > this.IIn;
      if (s) {
        this.yIn?.();
      }
      if (this.TIn || this.LIn) {
        var i = this.TIn?.Level ?? 0;
        var h = this.LIn?.Level ?? 0;
        if (Math.abs(h - i) > 1) {
          this.DIn();
        } else {
          let i = false;
          if (!this.TIn) {
            this.IIn = this.LIn.LowerUpperLimits[0];
            this.TIn = this.LIn;
            if (this.IIn === this.rvo) {
              this.Ist = 0;
              this.SIn?.(this.IIn, this.TIn);
              return;
            }
            i = true;
          }
          if (Math.abs(t - this.IIn) >= MAX_SCORE_DIFF) {
            this.DIn();
          } else {
            this.Ist = s ? (this.rvo - this.IIn) / SERVER_SCORE_UP_INTERVAL : (this.rvo - this.IIn) / SERVER_SCORE_DOWN_INTERVAL;
            if (i) {
              this.SIn?.(this.IIn, this.TIn);
              this.oAn = Time_1.Time.Frame;
            }
          }
        }
      }
    }
  }
  DIn() {
    this.IIn = this.rvo;
    this.TIn = this.LIn;
    this.Ist = 0;
    this.SIn?.(this.IIn, this.TIn);
  }
  Tick(i) {
    var t;
    if (this.Ist !== 0 && this.oAn !== Time_1.Time.Frame) {
      this.IIn += this.Ist * i;
      if (this.TIn !== this.LIn) {
        i = this.TIn.LowerUpperLimits[0];
        t = this.TIn.LowerUpperLimits[1];
        if (this.Ist > 0) {
          if (this.IIn >= t) {
            this.TIn = this.LIn;
          }
        } else if (this.IIn < i) {
          this.TIn = this.LIn;
        }
      }
      if (this.Ist > 0) {
        if (this.IIn >= this.rvo) {
          this.IIn = this.rvo;
          this.Ist = 0;
        }
      } else if (this.IIn <= this.rvo) {
        this.IIn = this.rvo;
        this.Ist = 0;
      }
      this.SIn?.(this.IIn, this.TIn);
    }
  }
  ResetScore() {
    this.IIn = 0;
    this.rvo = 0;
    this.TIn = undefined;
    this.LIn = undefined;
  }
}
exports.RogueScoreMachine = RogueScoreMachine;
//# sourceMappingURL=RogueScoreMachine.js.map