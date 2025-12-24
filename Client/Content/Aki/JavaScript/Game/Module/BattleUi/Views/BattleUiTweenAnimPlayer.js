"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiTweenAnimPlayer = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
class BattleUiTweenAnimPlayer {
  constructor() {
    this.TweenAnimMap = new Map();
  }
  Clear(e = false) {
    if (e) {
      this.StopAll();
    }
    this.TweenAnimMap.clear();
  }
  InitTweenAnim(e, t, i = false) {
    if (t) {
      var o = [];
      var s = t.GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
      var n = s.Num();
      for (let e = 0; e < n; e++) {
        o.push(s.Get(e));
      }
      this.TweenAnimMap ||= new Map();
      this.TweenAnimMap.set(e, o);
      if (i) {
        this.StopTweenAnim(e);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 17, "BattleUiTweenAnimPlayer.InitTweenAnim : 参数item不能为空");
    }
  }
  PlayTweenAnim(e) {
    e = this.TweenAnimMap.get(e);
    if (e) {
      for (const t of e) {
        t.Play();
      }
    }
  }
  StopTweenAnim(e) {
    e = this.TweenAnimMap.get(e);
    if (e) {
      for (const t of e) {
        t.Stop();
      }
    }
  }
  StopAll() {
    for (var [, e] of this.TweenAnimMap) {
      for (const t of e) {
        t.Stop();
      }
    }
  }
  Active(e, t) {
    if (t) {
      this.PlayTweenAnim(e);
    } else {
      this.StopTweenAnim(e);
    }
  }
  GetDuration(e) {
    let t = 0;
    e = this.TweenAnimMap.get(e);
    if (e) {
      for (const i of e) {
        t = Math.max(i.playTween?.duration ?? 0, t);
      }
    }
    return t;
  }
  SetTweenTimeScale(e, t) {
    e = this.TweenAnimMap.get(e);
    if (e) {
      for (const o of e) {
        var i = o.GetPlayTween()?.GetTweener();
        if (i) {
          i.SetSpeed(t);
        }
      }
    }
  }
}
exports.BattleUiTweenAnimPlayer = BattleUiTweenAnimPlayer;
//# sourceMappingURL=BattleUiTweenAnimPlayer.js.map