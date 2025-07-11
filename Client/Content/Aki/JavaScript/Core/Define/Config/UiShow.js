"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiShow = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const BlackScreen_1 = require("./SubType/BlackScreen");
class UiShow {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ViewName() {
    return this.viewname();
  }
  get Type() {
    return this.type();
  }
  get LoadAsync() {
    return this.loadasync();
  }
  get ShowCursorType() {
    return this.showcursortype();
  }
  get ObstructUi() {
    return GameUtils_1.GameUtils.ConvertToArray(this.obstructuiLength(), this.obstructui, this);
  }
  get EffectStart() {
    return this.effectstart();
  }
  get EffectBone() {
    return this.effectbone();
  }
  get MontageStart() {
    return this.montagestart();
  }
  get AudioEvent() {
    return this.audioevent();
  }
  get OpenAudioEvent() {
    return this.openaudioevent();
  }
  get LoopAudioEvent() {
    return this.loopaudioevent();
  }
  get CloseAudioEvent() {
    return this.closeaudioevent();
  }
  get DelayTime() {
    return this.delaytime();
  }
  get EffectDelayTime() {
    return this.effectdelaytime();
  }
  get SetMaskActive() {
    return this.setmaskactive();
  }
  get TimeDilation() {
    return this.timedilation();
  }
  get IsAllowFightInput() {
    return this.isallowfightinput();
  }
  get CanOpenViewByShortcutKey() {
    return this.canopenviewbyshortcutkey();
  }
  get IsShortKeysExitView() {
    return this.isshortkeysexitview();
  }
  get ScenePointTag() {
    return this.scenepointtag();
  }
  get NeedGC() {
    return this.needgc();
  }
  get IsFullScreen() {
    return this.isfullscreen();
  }
  get CommonPopBg() {
    return this.commonpopbg();
  }
  get CommonPopBgKey() {
    return this.commonpopbgkey();
  }
  get ScenePath() {
    return this.scenepath();
  }
  get IsPermanent() {
    return this.ispermanent();
  }
  get StartBlackScreen() {
    return this.startblackscreen();
  }
  get CloseBlackScreen() {
    return this.closeblackscreen();
  }
  get SkipAnim() {
    return this.skipanim();
  }
  get PartialBlur() {
    return this.partialblur();
  }
  get AudioFilter() {
    return this.audiofilter();
  }
  get AllowAutoMoving() {
    return this.allowautomoving();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsUiShow(t, i) {
    return (i || new UiShow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  viewname(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  type(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  loadasync() {
    var t = this.J7.__offset(this.z7, 8);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  showcursortype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetObstructuiAt(t) {
    return this.obstructui(t);
  }
  obstructui(t, i) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, i) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  obstructuiLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectstart(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  effectbone(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  montagestart(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  audioevent(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  openaudioevent(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  loopaudioevent(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  closeaudioevent(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  delaytime() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectdelaytime() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  setmaskactive() {
    var t = this.J7.__offset(this.z7, 32);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  timedilation() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  isallowfightinput() {
    var t = this.J7.__offset(this.z7, 36);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  canopenviewbyshortcutkey() {
    var t = this.J7.__offset(this.z7, 38);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isshortkeysexitview() {
    var t = this.J7.__offset(this.z7, 40);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  scenepointtag(t) {
    var i = this.J7.__offset(this.z7, 42);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  needgc() {
    var t = this.J7.__offset(this.z7, 44);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isfullscreen() {
    var t = this.J7.__offset(this.z7, 46);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  commonpopbg() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
    }
  }
  commonpopbgkey(t) {
    var i = this.J7.__offset(this.z7, 50);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  scenepath(t) {
    var i = this.J7.__offset(this.z7, 52);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  ispermanent() {
    var t = this.J7.__offset(this.z7, 54);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  startblackscreen(t) {
    var i = this.J7.__offset(this.z7, 56);
    if (i) {
      return (t || new BlackScreen_1.BlackScreen()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  closeblackscreen(t) {
    var i = this.J7.__offset(this.z7, 58);
    if (i) {
      return (t || new BlackScreen_1.BlackScreen()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  skipanim() {
    var t = this.J7.__offset(this.z7, 60);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  partialblur() {
    var t = this.J7.__offset(this.z7, 62);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  audiofilter(t) {
    var i = this.J7.__offset(this.z7, 64);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  allowautomoving() {
    var t = this.J7.__offset(this.z7, 66);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.UiShow = UiShow;
//# sourceMappingURL=UiShow.js.map