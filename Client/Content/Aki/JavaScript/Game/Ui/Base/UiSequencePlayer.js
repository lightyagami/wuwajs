"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSequencePlayer = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
class UiSequencePlayer {
  constructor(e) {
    this.rur = new Map();
    this.SPe = undefined;
    this.$xt = undefined;
    this.Yxt = undefined;
    this.K3t = t => {
      this.rur.set(t, 2);
      this.$xt?.forEach(e => {
        e(t);
      });
    };
    this.nur = t => {
      this.rur.set(t, 1);
      this.Yxt?.forEach(e => {
        e(t);
      });
    };
    this.a$a = undefined;
    this.hFl = undefined;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(e);
    this.SPe.BindSequenceCloseEvent(this.K3t);
    this.SPe.BindSequenceStartEvent(this.nur);
  }
  sur(e) {
    this.rur.delete(e);
  }
  aur(e) {
    this.rur.set(e, 0);
  }
  BindOnEndSequenceEvent(e) {
    this.$xt ||= new Array();
    this.$xt.push(e);
  }
  BindOnStartSequenceEvent(e) {
    this.Yxt ||= new Array();
    this.Yxt.push(e);
  }
  IsInSequence() {
    let t = false;
    var i = Array.from(this.rur.keys());
    var s = i.length;
    for (let e = 0; e < s; e++) {
      if (this.rur.get(i[e]) !== 2) {
        t = true;
        break;
      }
    }
    return t;
  }
  IsSequenceInPlaying(e) {
    return !!this.rur.has(e) && this.rur.get(e) === 1;
  }
  IsSequenceFinish(e) {
    return !this.rur.has(e) || this.rur.get(e) === 2;
  }
  IsStartSequenceFinish(e) {
    return !this.rur.has(e) || this.rur.get(e) > 0;
  }
  GetCurrentSequence() {
    return this.SPe.GetCurrentSequence();
  }
  PlaySequencePurely(e, t = false, i = false) {
    this.SPe.PlaySequencePurely(e, t, i);
  }
  StopPrevSequence(e, t = false) {
    var i = this.SPe.GetCurrentSequence();
    this.SPe.StopCurrentSequence(e, t);
    this.sur(i);
  }
  StopCurrentSequenceByName(e, t, i = false) {
    var s = this.SPe.GetCurrentSequence();
    if (s === e) {
      this.SPe.StopCurrentSequence(t, i);
      this.sur(s);
    }
  }
  PlaySequence(e, t = false, i = undefined) {
    this.hur();
    this.aur(e);
    this.SPe.PlayLevelSequenceByName(e, t, i);
  }
  async PlaySequenceAsync(e, t, i = false, s = false, h = undefined) {
    this.hur();
    this.aur(e);
    await this.SPe.PlaySequenceAsync(e, t, i, s, h);
  }
  async PlaySequenceAsyncNoStopRunning(e, t, i = false, s = false, h = undefined) {
    await this.SPe.PlaySequenceAsync(e, t, i, s, h);
  }
  ReplaySequence(e) {
    this.SPe.ReplaySequenceByKey(e);
  }
  hur() {
    var e;
    if (this.IsInSequence()) {
      e = Array.from(this.rur.keys())[0];
      this.sur(e);
    }
  }
  StopSequenceByKey(e, t = false, i = false) {
    this.SPe.StopSequenceByKey(e, t, i);
  }
  SequencePlayReverseByKey(e, t) {
    this.SPe.PlaySequencePurely(e, t, true);
  }
  PauseSequence() {
    this.SPe.PauseSequence();
  }
  ResumeSequence() {
    this.SPe.ResumeSequence();
  }
  ChangePlaybackDirection(e) {
    this.SPe.ChangePlaybackDirection(e);
  }
  SetActorTag(e, t, i) {
    this.SPe.SetActorTag(e, t, i);
  }
  SetRelativeTransform(e, t) {
    this.SPe.SetRelativeTransform(e, t);
  }
  Clear() {
    this.SPe.Clear();
    this.SPe = undefined;
  }
  async LitePlayAsync(e, t = false, i = false) {
    var s;
    return !this.a$a && (s = new CustomPromise_1.CustomPromise(), !!this.SPe) && (this.a$a = e, this.hFl = s, this.SPe.PlaySequencePurely(e, t, i, s), e = await s.Promise, this.a$a = undefined, this.hFl = undefined, e);
  }
  async LiteReplayAsync(e, t = false, i = false) {
    var s;
    if (this.a$a !== undefined && this.hFl !== undefined) {
      this.SPe?.SequenceJumpToStartWhenPlaying(this.a$a);
      s = await this.hFl.Promise;
      this.a$a = undefined;
      this.hFl = undefined;
      return s;
    } else {
      return this.LitePlayAsync(e, t, i);
    }
  }
  LiteStop() {
    if (this.SPe && this.a$a && this.hFl) {
      this.SPe.StopSequenceByKey(this.a$a, false, false);
    }
    this.a$a = undefined;
    this.hFl = undefined;
  }
  LiteExit() {
    this.LiteStop();
    this.Clear();
  }
  LiteJumpToEnd(e) {
    if (this.SPe) {
      this.LitePlayAsync(e, true, false);
      this.SPe.EndSequenceLastFrame(e);
      this.LiteStop();
    }
  }
  async LiteWaitFor(e) {
    return this.SPe !== undefined && (e = this.SPe.GetCurrentStopPromise(e)) !== undefined && e.Promise;
  }
}
exports.UiSequencePlayer = UiSequencePlayer;
//# sourceMappingURL=UiSequencePlayer.js.map