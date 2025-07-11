"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiTweenAnimPlayer = undefined;
const UE = require("ue");
class BattleUiTweenAnimPlayer {
  constructor() {
    this.TweenAnimMap = new Map();
  }
  Clear() {
    this.TweenAnimMap.clear();
  }
  InitTweenAnim(e, t) {
    var i = [];
    var s = t.GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var n = s.Num();
    for (let e = 0; e < n; e++) {
      i.push(s.Get(e));
    }
    this.TweenAnimMap ||= new Map();
    this.TweenAnimMap.set(e, i);
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
  SetTweenTimeScale(e, t) {
    e = this.TweenAnimMap.get(e);
    if (e) {
      for (const s of e) {
        var i = s.GetPlayTween()?.GetTweener();
        if (i) {
          i.SetSpeed(t);
        }
      }
    }
  }
}
exports.BattleUiTweenAnimPlayer = BattleUiTweenAnimPlayer;
//# sourceMappingURL=BattleUiTweenAnimPlayer.js.map