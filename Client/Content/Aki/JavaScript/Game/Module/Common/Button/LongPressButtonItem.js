"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongPressButtonItem = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiComponentUtil_1 = require("../../Util/UiComponentUtil");
const DRAG_TOLERANCE = 200;
const ONE_SECOND_TO_MILLISECOND = 1000;
const LONG_PRESS_AUDIO_EVENT = "play_ui_com_slider_tick";
class LongPressButtonItem {
  constructor(i, t, s = undefined) {
    this.tTt = undefined;
    this.Lo = undefined;
    this.wut = false;
    this.sKe = TickSystem_1.TickSystem.InvalidId;
    this.rut = 0;
    this.e8 = 0;
    this.dz_ = 0;
    this.iTt = false;
    this.OverriddenLongPressAudioEvent = undefined;
    this.ShouldPlayLongPressSound = false;
    this.oTt = undefined;
    this.rTt = undefined;
    this.nTt = undefined;
    this.sTt = undefined;
    this.aTt = undefined;
    this.hTt = Vector_1.Vector.Create();
    this.lTt = Vector_1.Vector.Create();
    this._Tt = undefined;
    this.uTt = i => {
      if (!i) {
        this.wut = false;
      }
    };
    this.r6 = i => {
      if (!this.mz_(i)) {
        this.fz_(i);
        this.gz_(i);
      }
    };
    if (i) {
      this.Initialize(i, s);
    }
    if (t) {
      this.Activate(t);
    }
  }
  Initialize(i, t = undefined, s = undefined, h = undefined, e = undefined) {
    this.tTt = i;
    this.tTt.OnPointDownCallBack.Bind(() => {
      this.iTt = true;
      this.wut = true;
      this.hTt.DeepCopy(LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0));
      if (this.rTt) {
        this.rTt();
      }
    });
    this.tTt.OnPointCancelCallBack.Bind(() => {
      this.wut = false;
      this.rut = 0;
      this.e8 = 0;
      if (this.sTt) {
        this.sTt();
      }
    });
    this.tTt.OnPointUpCallBack.Bind(() => {
      this.wut = false;
      if (this.nTt) {
        this.nTt();
      }
    });
    this.tTt.OnSelfInteractiveChanged.Bind(this.uTt);
    this.oTt = t;
    this.rTt = s;
    this.nTt = h;
    this.sTt = e;
    this.CTt();
  }
  Activate(i) {
    this.Lo = ConfigManager_1.ConfigManager.CommonConfig.GetLongPressConfig(i);
    this.sKe = TickSystem_1.TickSystem.Add(this.r6, "LongPressComponent", 0, true, undefined, true).Id;
    this.wut = false;
  }
  Deactivate() {
    this.wut = false;
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
  }
  IsActivate() {
    return this.sKe !== TickSystem_1.TickSystem.InvalidId && TickSystem_1.TickSystem.Has(this.sKe);
  }
  CTt() {
    this._Tt = this.tTt.GetOwner().GetName();
    UiComponentUtil_1.UiComponentUtil.BindAudioEvent(this.tTt);
  }
  gTt() {
    if (!StringUtils_1.StringUtils.IsBlank(this._Tt ?? "")) {
      UiComponentUtil_1.UiComponentUtil.UnBindAudioEventByName(this._Tt);
    }
  }
  cTt() {
    return this.aTt?.() ?? true;
  }
  mTt() {
    this.lTt.DeepCopy(LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(0));
    this.hTt.Subtraction(this.lTt, this.lTt);
    return this.lTt.SizeSquared() >= DRAG_TOLERANCE * DRAG_TOLERANCE;
  }
  mz_(i) {
    if (this.wut) {
      if (this.cTt()) {
        if (this.mTt()) {
          this.wut = false;
          this.rut = 0;
          this.e8 = 0;
          return !(this.dz_ = 0);
        } else {
          this.rut += i;
          return this.rut < this.Lo.PressTime[0] || !!this.iTt && (this.iTt = false, this.oTt?.(true), true);
        }
      } else {
        this.rut = 1;
        return true;
      }
    } else {
      if (this.rut < this.Lo.PressTime[0] && this.rut > 0) {
        this.oTt?.(true);
      }
      this.rut = 0;
      this.e8 = 0;
      return !(this.dz_ = 0);
    }
  }
  fz_(i) {
    this.e8 += i;
    i = this.dTt();
    if (!(this.e8 < i)) {
      this.e8 -= i;
      this.oTt?.(false);
    }
  }
  gz_(i) {
    if (this.ShouldPlayLongPressSound && (this.dz_ += i, i = this.dTt(), i = Math.max(i, this.Lo.AudioIntervalLimit), this.dz_ >= i)) {
      AudioSystem_1.AudioSystem.PostEvent(this.OverriddenLongPressAudioEvent ?? LONG_PRESS_AUDIO_EVENT);
      this.dz_ -= i;
    }
  }
  dTt() {
    var t = this.Lo.PressTime.length;
    for (let i = 1; i < t; ++i) {
      if (this.rut < this.Lo.PressTime[i]) {
        const s = this.Lo.TriggerTime[i - 1];
        return ONE_SECOND_TO_MILLISECOND / s;
      }
    }
    const s = this.Lo.TriggerTime[t - 1];
    return ONE_SECOND_TO_MILLISECOND / s;
  }
  SetTickConditionDelegate(i) {
    this.aTt = i;
  }
  SetInteractive(i) {
    this.tTt.SetSelfInteractive(i);
  }
  SetActive(i) {
    this.tTt.RootUIComp.SetUIActive(i);
  }
  Clear() {
    this.Deactivate();
    if (this.tTt) {
      this.tTt.OnPointDownCallBack.Unbind();
      this.tTt.OnPointCancelCallBack.Unbind();
      this.tTt.OnPointUpCallBack.Unbind();
      this.tTt.OnSelfInteractiveChanged.Unbind();
    }
    this.gTt();
    this.tTt = undefined;
    this.oTt = undefined;
    this.rTt = undefined;
    this.nTt = undefined;
  }
}
exports.LongPressButtonItem = LongPressButtonItem;
//# sourceMappingURL=LongPressButtonItem.js.map