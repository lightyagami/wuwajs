"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiTweenAnimPlayer = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
class BattleUiTweenAnimPlayer {
  constructor() {
    this.TweenAnimMap = new Map();
    this.TweenCallbackMap = new Map();
    this.TweenDelegateWrapperMap = new Map();
    this.Wqg = false;
  }
  Clear(t = false) {
    if (t) {
      this.StopAll();
    }
    this.TweenAnimMap.clear();
    for (var [e, i] of this.TweenDelegateWrapperMap) {
      e.UnregisterOnComplete(i);
    }
    this.TweenDelegateWrapperMap.clear();
    for (var [, o] of this.TweenCallbackMap) {
      (0, puerts_1.releaseManualReleaseDelegate)(o);
    }
    this.TweenCallbackMap.clear();
  }
  InitTweenAnim(t, e, i = false) {
    if (e) {
      var o = [];
      var s = e.GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
      var r = s.Num();
      for (let t = 0; t < r; t++) {
        o.push(s.Get(t));
      }
      this.TweenAnimMap ||= new Map();
      this.TweenAnimMap.set(t, o);
      if (i) {
        this.StopTweenAnim(t);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 17, "BattleUiTweenAnimPlayer.InitTweenAnim : 参数item不能为空");
    }
  }
  PlayTweenAnim(t) {
    var e;
    var i = this.TweenAnimMap.get(t);
    if (i && i.length > 0) {
      for (const o of i) {
        o.Play();
      }
      if (this.Wqg && (e = (i = i[0]?.GetOwner())?.GetComponentByClass(UE.UIItem.StaticClass())?.GetDisplayName(), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Battle", 96, `PlayTweenAnim [${i?.GetName()}][${e}][${t}]`);
      }
    }
  }
  StopTweenAnim(t) {
    t = this.TweenAnimMap.get(t);
    if (t) {
      for (const e of t) {
        e.Stop();
      }
    }
  }
  StopAll() {
    for (var [, t] of this.TweenAnimMap) {
      for (const e of t) {
        e.Stop();
      }
    }
  }
  Active(t, e) {
    if (e) {
      this.PlayTweenAnim(t);
    } else {
      this.StopTweenAnim(t);
    }
  }
  CheckIsPlaying(t) {
    t = this.TweenAnimMap.get(t);
    if (t) {
      for (const e of t) {
        if (UE.LTweenBPLibrary.IsTweening(GlobalData_1.GlobalData.World, e.GetPlayTween()?.GetTweener())) {
          return true;
        }
      }
    }
    return false;
  }
  GetDuration(t) {
    let e = 0;
    t = this.TweenAnimMap.get(t);
    if (t) {
      for (const i of t) {
        e = Math.max(i.playTween?.duration ?? 0, e);
      }
    }
    return e;
  }
  SetTweenTimeScale(t, e) {
    t = this.TweenAnimMap.get(t);
    if (t) {
      for (const o of t) {
        var i = o.GetPlayTween()?.GetTweener();
        if (i) {
          i.SetSpeed(e);
        }
      }
    }
  }
  RegisterOnComplete(t, e) {
    var i;
    var o = this.TweenAnimMap.get(t);
    if (o &&= o[0].GetPlayTween()) {
      i = (0, puerts_1.toManualReleaseDelegate)(e);
      i = o.RegisterOnComplete(i);
      this.TweenCallbackMap.set(t, e);
      this.TweenDelegateWrapperMap.set(o, i);
    }
  }
}
exports.BattleUiTweenAnimPlayer = BattleUiTweenAnimPlayer;
//# sourceMappingURL=BattleUiTweenAnimPlayer.js.map