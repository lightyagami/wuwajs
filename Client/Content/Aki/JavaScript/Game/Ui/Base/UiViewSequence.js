"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBehaviorLevelSequence = undefined;
const Log_1 = require("../../../Core/Common/Log");
const UiSequencePlayer_1 = require("./UiSequencePlayer");
class UiBehaviorLevelSequence {
  constructor(e) {
    this.rcr = undefined;
    this.ncr = "Start";
    this.scr = "Close";
    this.dva = "ShowView";
    this.mva = "HideView";
    this.acr = new Map();
    this.hcr = new Map();
    this.lcr = "";
    this.OQt = undefined;
    this.owt = e => {
      var t = this.hcr?.get(e);
      if (t) {
        for (const i of t) {
          i?.(e);
        }
      }
    };
    this._cr = e => {
      var t = this.acr?.get(e);
      if (t) {
        for (const i of t) {
          i?.(e);
        }
      }
    };
    this.OQt = e;
  }
  get StartSequenceName() {
    return this.ncr;
  }
  set StartSequenceName(e) {
    this.ncr = e;
  }
  set CloseSequenceName(e) {
    this.scr = e;
  }
  get CloseSequenceName() {
    return this.scr;
  }
  get ShowSequenceName() {
    return this.dva;
  }
  set ShowSequenceName(e) {
    this.dva = e;
  }
  get HideSequenceName() {
    return this.mva;
  }
  set HideSequenceName(e) {
    this.mva = e;
  }
  OnAfterUiStart() {
    this.rcr = new UiSequencePlayer_1.UiSequencePlayer(this.OQt.GetRootItem());
    this.rcr.BindOnStartSequenceEvent(this.owt);
    this.rcr.BindOnEndSequenceEvent(this._cr);
  }
  IsInSequence() {
    return this.rcr.IsInSequence();
  }
  HasSequenceNameInPlaying(e) {
    return this.rcr?.IsSequenceInPlaying(e) ?? false;
  }
  SetSequenceName(e) {
    if (e) {
      this.ncr = e.StartSequenceName ?? "Start";
      this.scr = e.CloseSequenceName ?? "Close";
    }
  }
  AddSequenceFinishEvent(e, t, i = false) {
    let s = this.acr.get(e);
    if (s) {
      if (i) {
        s.clear();
      }
    } else {
      s = new Set();
      this.acr.set(e, s);
    }
    if (s.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 3, "SequenceFinishEvent重复添加。");
      }
    } else {
      s.add(t);
    }
  }
  RemoveSequenceFinishEvent(e, t) {
    if (this.acr && t && (e = this.acr.get(e)) && e.has(t)) {
      e.delete(t);
    }
  }
  AddSequenceStartEvent(e, t) {
    let i = this.hcr.get(e);
    if (!i) {
      i = new Set();
      this.hcr.set(e, i);
    }
    if (i.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 27, "AddSequenceStartEvent重复添加。");
      }
    } else {
      i.add(t);
    }
  }
  StopSequenceByKey(e, t = false, i = false) {
    this.rcr.StopSequenceByKey(e, t, i);
  }
  SequencePlayReverseByKey(e, t) {
    this.rcr.PlaySequencePurely(e, t, true);
  }
  PlaySequence(e, t = false, i = undefined) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 27, "开始PlaySequence", ["Name", e]);
    }
    this.lcr = e;
    this.rcr.PlaySequence(e, t, i);
  }
  get CurrentSequenceName() {
    return this.lcr;
  }
  async PlaySequenceAsync(e, t, i = false, s = false, n = undefined) {
    this.lcr = e;
    await this.rcr?.PlaySequenceAsync(e, t, i, s, n);
  }
  async PlaySequenceAsyncNoStopRunning(e, t, i = false, s = false, n = undefined) {
    this.lcr = e;
    await this.rcr?.PlaySequenceAsyncNoStopRunning(e, t, i, s, n);
  }
  PlaySequencePurely(e, t = false, i = false) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 27, "开始PurePlaySequence", ["Name", e]);
    }
    this.lcr = e;
    this.rcr?.PlaySequencePurely(e, t, i);
  }
  PauseSequence() {
    this.rcr.PauseSequence();
  }
  ResumeSequence() {
    this.rcr.ResumeSequence();
  }
  StopPrevSequence(e, t = false) {
    if (this.IsInSequence()) {
      this.rcr.StopCurrentSequenceByName(this.lcr, e, t);
    }
  }
  ReplaySequence(e) {
    if (this.IsInSequence()) {
      this.rcr.ReplaySequence(e);
    }
  }
  ChangePlaybackDirection(e) {
    if (this.HasSequenceNameInPlaying(e)) {
      this.rcr.ChangePlaybackDirection(e);
    }
  }
  SetActorTag(e, t, i) {
    this.rcr.SetActorTag(e, t, i);
  }
  SetRelativeTransform(e, t) {
    this.rcr.SetRelativeTransform(e, t);
  }
  OnBeforeDestroy() {
    if (this.rcr) {
      this.rcr.Clear();
      this.rcr = undefined;
    }
    this.acr.clear();
    this.hcr.clear();
  }
}
exports.UiBehaviorLevelSequence = UiBehaviorLevelSequence;
//# sourceMappingURL=UiViewSequence.js.map