"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiComponentUtil = undefined;
const UE = require("ue");
const AudioController_1 = require("../../../Core/Audio/AudioController");
class UiComponentUtil {
  static SetStarActiveNew(o, e, t = undefined, i = true) {
    var r = o.length;
    var n = t ?? r;
    let l = undefined;
    for (let t = 0; t < r; ++t) {
      var u = o[t];
      u.SetActive(t + 1 <= n);
      if (!(t + 1 > n)) {
        u.SetImgStarOnActive(t < e);
        if (i) {
          u.SetImgStarNextActive(t === e);
          if (t === e) {
            l = u;
          }
          u.SetImgStarOffActive(t > e);
        } else {
          u.SetImgStarNextActive(false);
          u.SetImgStarOffActive(t >= e);
          if (t === e - 1) {
            l = u;
          }
        }
      }
    }
    return l;
  }
  static SetMoneyState(t, o, e, i) {
    t.SetText(e.toString());
    e = e <= i;
    o.SetText(i.toString());
    o.SetChangeColor(e, o.changeColor);
    t.useChangeColor = !e;
    return e;
  }
  static BindAudioEvent(e) {
    if (e instanceof UE.UIButtonComponent) {
      e.OnPostAudioStateEvent.Bind((t, o) => {
        AudioController_1.AudioController.PostSelectableAudioEvent(o, e.GetOwner());
      });
    } else if (e instanceof UE.UIExtendToggle) {
      e.OnPostAudioStateEvent.Bind((t, o) => {
        AudioController_1.AudioController.PostSelectableAudioEvent(o, e.GetOwner());
      });
    }
  }
  static UnBindAudioEventByName(t) {
    AudioController_1.AudioController.StopSelectableAudioEventByName(t);
  }
  static UnBindAudioEvent(t) {
    AudioController_1.AudioController.StopSelectableAudioEvent(t.GetOwner());
  }
}
exports.UiComponentUtil = UiComponentUtil;
//# sourceMappingURL=UiComponentUtil.js.map