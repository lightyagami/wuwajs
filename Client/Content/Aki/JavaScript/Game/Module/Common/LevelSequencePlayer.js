"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelSequencePlayer = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UiLayer_1 = require("../../Ui/UiLayer");
class SequenceData {
  constructor(e, t, i, s = undefined) {
    this.SequenceName = "";
    this.IsBlock = false;
    this.Tag = "";
    this.NeedFinishEvent = true;
    this.StopPromise = undefined;
    this.SequenceName = e;
    this.IsBlock = t;
    this.Tag = i;
    this.StopPromise = s;
  }
}
class LevelSequencePlayer {
  constructor(e) {
    this.Kxt = new Map();
    this.Qxt = undefined;
    this.Xxt = undefined;
    this.$xt = undefined;
    this.Yxt = undefined;
    this.Jxt = undefined;
    this.zxt = new Map();
    this.Xxt = e;
    this.Qxt = e.GetOwner();
  }
  BindSequenceCloseEvent(e) {
    this.$xt ||= new Array();
    this.$xt.push(e);
  }
  BindSequenceStartEvent(e) {
    this.Yxt ||= new Array();
    this.Yxt.push(e);
  }
  StopCurrentSequence(e = false, t = false) {
    if (this.Jxt) {
      this.StopSequenceByKey(this.Jxt, e, t);
      this.Jxt = undefined;
    }
  }
  StopSequenceByKey(e, t = false, i = false) {
    if (i) {
      this.EndSequenceLastFrame(e);
    }
    i = this.zxt.get(e);
    if (i) {
      i.NeedFinishEvent = t;
    }
    i = this.Kxt.get(e);
    if (i?.IsValid()) {
      i.TryStop();
    } else {
      this.vxe(e);
    }
  }
  ReplaySequenceByKey(e) {
    var t;
    var i = this.zxt.get(e);
    if (i && this.Kxt.get(e) && (t = this.Qxt.GetSequencePlayerByKey(e))?.IsValid() && (t = t.SequencePlayer)?.IsValid()) {
      if (t.IsStopped()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 10, "UI动画播放重播时已结束,重新调用播放逻辑", ["节点", this.Xxt.GetDisplayName()], ["关卡序列", this.Jxt]);
        }
        this.PlayLevelSequenceByName(e, i.IsBlock);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 10, "UI动画播放重播时在持续,修改播放帧", ["节点", this.Xxt.GetDisplayName()], ["关卡序列", this.Jxt]);
        }
        this.Qxt.SequenceJumpToSecondByKey(e, new UE.FrameTime());
      }
    }
  }
  SequenceJumpToStartWhenPlaying(e) {
    var t = this.Qxt.GetSequencePlayerByKey(e);
    if (t?.IsValid() && (t = t.SequencePlayer)?.IsValid() && !t.IsStopped()) {
      this.Qxt.SequenceJumpToSecondByKey(e, new UE.FrameTime());
    }
  }
  ChangePlaybackDirection(e) {
    if (this.zxt.get(e) && this.Kxt.get(e) && (e = this.Qxt.GetSequencePlayerByKey(e)) !== undefined && e.IsValid() && (e = e.GetSequencePlayer()) !== undefined && e.IsValid()) {
      e.ChangePlaybackDirection();
    }
  }
  GetCurrentSequence() {
    return this.Jxt;
  }
  PauseSequence() {
    var e;
    if (this.Jxt) {
      if (e = this.Zxt(this.Jxt)) {
        e.SequencePlayer.Pause();
      } else if (e = this.Kxt.get(this.Jxt)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 10, "异步加载暂停关卡序列", ["停止节点", this.Xxt.GetDisplayName()], ["关卡序列", this.Jxt]);
        }
        e.TryStop();
      }
    }
  }
  ResumeSequence() {
    var e;
    if (this.Jxt) {
      if (e = this.Zxt(this.Jxt)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 10, "恢复关卡序列动画", ["停止节点", this.Xxt.GetDisplayName()], ["关卡序列", this.Jxt]);
        }
        e.SequencePlayer.Play();
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 10, "异步恢复关卡序列动画", ["停止节点", this.Xxt.GetDisplayName()], ["关卡序列", this.Jxt]);
        }
        this.Kxt.get(this.Jxt).ExecutePlay();
      }
    }
  }
  Clear() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 10, "关卡序列动画 Clear", ["节点名称", this.Xxt.GetDisplayName()]);
    }
    for (const e of this.Kxt.values()) {
      e.OnStop.Unbind();
    }
    for (const t of this.zxt.keys()) {
      this.vxe(t);
    }
    this.Kxt.clear();
    this.zxt.clear();
    LevelSequencePlayer.ewt.delete(this);
    this.Qxt.ClearAllSequence();
    this.Qxt = undefined;
    this.Xxt = undefined;
  }
  StopPlayingSequence(e = false, t = true) {
    for (const i of this.zxt.keys()) {
      this.StopSequenceByKey(i, e, t);
    }
  }
  IsPlayingSequence(e) {
    return this.zxt.has(e);
  }
  EndSequenceLastFrame(e) {
    var t;
    if (this.Qxt.GetUIItem().LevelSequences.Get(e) && (t = this.Zxt(e))) {
      this.Qxt.SequenceJumpToSecondByKey(e, t.SequencePlayer.GetDuration().Time);
    }
  }
  CheckSeqActorIsSeqPlaying(e) {
    e = this.Zxt(e);
    if (e?.IsValid()) {
      e = e.SequencePlayer;
      if (e?.IsValid() && e.IsPlaying()) {
        return true;
      }
    }
    return false;
  }
  PlayOrReplaySequenceByName(e, t = false, i = undefined) {
    if (this.CheckSeqActorIsSeqPlaying(e)) {
      this.ReplaySequenceByKey(e);
    } else {
      this.PlaySequencePurely(e, t, undefined, undefined, i);
    }
  }
  PlayLevelSequenceByName(e, t = false, i = undefined) {
    this.PlaySequencePurely(e, t, undefined, undefined, i);
  }
  async PlaySequenceAsync(e, t, i = false, s = false, h = undefined) {
    this.PlaySequencePurely(e, i, s, t, h);
    await t?.Promise;
  }
  PlaySequencePurely(e, t = false, i = false, s = undefined, h = undefined) {
    var o = this.GetSequencePlayContext(e);
    var r = this.Xxt.displayName;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 10, "播放的关卡序列", ["播放节点", r], ["关卡序列", e]);
    }
    this.Jxt = e;
    var t = new SequenceData(e, t, r, s);
    this.zxt.set(e, t);
    LevelSequencePlayer.ewt.add(this);
    if (LevelSequencePlayer.iwt) {
      this.owt(e);
      this.vxe(e);
    } else if (o) {
      o.bReverse = i;
      if (h !== undefined) {
        o.PlayInfo.PlaySetting.PlayRate = h;
      }
      o.ExecutePlay();
      this.owt(e);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 10, "关卡序列不存在", ["播放节点", r], ["关卡序列", e]);
      }
      this.vxe(e);
    }
  }
  GetSequencePlayContext(e) {
    let t = this.Kxt.get(e);
    if (!t) {
      if (!(t = this.Qxt.GetSequencePlayContextOfKey(e))) {
        return;
      }
      t.bIsAsync = false;
      t.OnStop.Bind(() => {
        this.vxe(e);
      });
      this.Kxt.set(e, t);
    }
    return t;
  }
  GetCurrentStopPromise(e) {
    return this.zxt.get(e)?.StopPromise;
  }
  owt(t) {
    var e = this.zxt.get(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 16, "播放UI动画", ["动画名称", t], ["sequenceData.Tag", e?.Tag]);
    }
    if (e && e.IsBlock) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCore", 10, "打开动画遮罩", ["播放节点", e.Tag], ["关卡序列", t]);
      }
      UiLayer_1.UiLayer.SetShowMaskLayer(e.Tag, true);
    }
    this.Yxt?.forEach(e => {
      e(t);
    });
  }
  vxe(t) {
    var e = this.zxt.get(t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCore", 16, "UI动画播放完成", ["动画名称", t], ["sequenceData.Tag", e?.Tag]);
    }
    let i = true;
    if (e) {
      if (e.IsBlock) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 10, "关闭动画遮罩", ["播放节点", e.Tag], ["关卡序列", t]);
        }
        UiLayer_1.UiLayer.SetShowMaskLayer(e.Tag, false);
      }
      i = e.NeedFinishEvent;
      e.NeedFinishEvent = true;
      this.zxt.delete(t);
    }
    if (this.Jxt === t) {
      this.Jxt = undefined;
    }
    if (i) {
      this.$xt?.forEach(e => {
        e(t);
      });
    }
    if (this.zxt.size === 0) {
      LevelSequencePlayer.ewt.delete(this);
    }
    if (e?.StopPromise) {
      e.StopPromise?.SetResult(true);
      e.StopPromise = undefined;
    }
  }
  Zxt(e) {
    if (this.Qxt) {
      return this.Qxt.GetSequencePlayerByKey(e);
    }
  }
  SetActorTag(e, t, i) {
    e = this.Zxt(e);
    if (e) {
      e.AddBindingByTag(t, i);
    }
  }
  SetRelativeTransform(e, t) {
    var e = this.Zxt(e);
    if (e) {
      e.bOverrideInstanceData = true;
      e = e.DefaultInstanceData;
      t = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(t);
      e.TransformOrigin = t;
    }
  }
  IsValid() {
    return this.Qxt?.IsValid() ?? false;
  }
  static SetBanned(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "[LevelSequencePlayer.SetBanned] 设置禁用动画", ["value", e]);
    }
    if (e) {
      LevelSequencePlayer.iwt = true;
      for (const t of LevelSequencePlayer.ewt.values()) {
        if (t.IsValid()) {
          t.StopCurrentSequence(true);
        } else {
          LevelSequencePlayer.ewt.delete(t);
        }
      }
    } else {
      LevelSequencePlayer.iwt = false;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LevelSequencePlayerBandStateChange, e);
  }
}
(exports.LevelSequencePlayer = LevelSequencePlayer).ewt = new Set();
LevelSequencePlayer.iwt = false; //# sourceMappingURL=LevelSequencePlayer.js.map