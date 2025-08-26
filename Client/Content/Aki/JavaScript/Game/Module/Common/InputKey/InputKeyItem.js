"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputKeyItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const PcAndGamepadProgressBar_1 = require("../../UiNavigation/KeyComponent/PcAndGamepadProgressBar");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InputKeyDefine_1 = require("./InputKeyDefine");
class InputKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.HEe = undefined;
    this.XUt = undefined;
    this.C1u = undefined;
    this.xut = undefined;
    this.$Ut = undefined;
    this.YUt = false;
    this.JUt = false;
    this.zUt = false;
    this.ZUt = false;
    this.eAt = undefined;
    this.git = undefined;
    this.tAt = 0;
    this.vq = false;
    this.iAt = undefined;
    this.oAt = false;
    this.UniqueId = undefined;
    this.rAt = (t, i) => {
      if (!this.oAt && !!this.xut && !(this.xut <= 0)) {
        if (this.HEe && (i = i.KeyName.toString(), this.HEe === i)) {
          if (t) {
            if (this.$Ut && this.$Ut > 0) {
              this.iAt = TimerSystem_1.GameplayTimerSystem.Delay(() => {
                this.nAt();
              }, this.$Ut);
            } else {
              this.nAt();
            }
          } else {
            this.sAt();
          }
        }
      }
    };
    this.aAt = () => {
      var t;
      if (!!this.xut && !(this.xut <= 0)) {
        t = this.tAt / this.xut;
        this.SetLongPressPercent(t);
        this.tAt += TimerSystem_1.MIN_TIME;
      }
    };
    this.UniqueId = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.eAt = new PcAndGamepadProgressBar_1.PcAndGamepadProgressBar();
    await this.eAt.Init(this.GetItem(3), this.GetItem(2));
  }
  OnBeforeShow() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnInputAnyKey, this.rAt)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    }
  }
  OnAfterHide() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnInputAnyKey, this.rAt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    }
  }
  OnBeforeDestroy() {
    this.eAt = undefined;
    this.DeactivateLongPress();
  }
  nAt() {
    if (this.YUt) {
      this.hAt();
    }
    this.SetLongPressProgressVisible(this.YUt);
    this.SetTextArrowVisible(this.zUt);
  }
  sAt() {
    this.DeactivateLongPress();
    this.SetLongPressProgressVisible(this.JUt);
    this.SetTextArrowVisible(this.ZUt);
  }
  lAt() {
    if (this.iAt && TimerSystem_1.GameplayTimerSystem.Has(this.iAt)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.iAt);
    }
  }
  Refresh(t) {
    this.HEe = t.KeyName;
    this.oAt = t.IsLongPressDisable === true;
    this.xut = t.LongPressTime;
    this.$Ut = t.DelayPressTime;
    this.YUt = t.IsShowLongPressWhenPress === true;
    this.JUt = t.IsShowLongPressWhenRelease === true;
    this.zUt = t.IsShowTextArrowWhenPress === true;
    this.ZUt = t.IsShowTextArrowWhenRelease === true;
    var i = t.IsLongPressProcessVisible === true;
    var s = t.IsTextArrowVisible === true;
    var e = t.IsUpArrowVisible === true;
    var h = t.IsDownArrowVisible === true;
    var t = t.DescriptionId;
    this.SetKeyTexture(this.HEe);
    this.SetTextArrowVisible(s);
    this.SetUpArrowVisible(e);
    this.SetDownArrowVisible(h);
    this.SetDescription(t);
    this.DeactivateLongPress();
    this.SetLongPressProgressVisible(i);
    if (i) {
      this.SetLongPressPercent(0);
    }
  }
  SetLongPressDisable(t) {
    this.oAt = t;
  }
  SetKeyTexture(t) {
    var i = InputSettings_1.InputSettings.GetKeyIconPath(t);
    if (this.XUt !== t || this.C1u !== i) {
      this.XUt = t;
      this.C1u = i;
      const s = this.GetTexture(0);
      if (i) {
        this.SetTextureByPath(i, s, undefined, () => {
          s.SetSizeFromTexture();
          s.SetUIActive(true);
        });
      } else {
        s?.SetUIActive(false);
      }
    }
  }
  SetLongPressTime(t) {
    this.xut = t;
  }
  SetLongPressPercent(t) {
    this.eAt?.SetPercent(Math.min(t, 1));
  }
  SetLongPressProgressVisible(t) {
    this.eAt?.SetProgressVisible(t);
  }
  SetTextArrowVisible(t) {
    this.GetTexture(5)?.SetUIActive(t);
  }
  SetUpArrowVisible(t) {
    this.GetTexture(6)?.SetUIActive(t);
  }
  SetDownArrowVisible(t) {
    this.GetTexture(7)?.SetUIActive(t);
  }
  SetDescription(t) {
    var i = this.GetText(4);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
      i?.SetUIActive(true);
    } else {
      i?.SetUIActive(false);
    }
  }
  hAt() {
    this.tAt = 0;
    this.git = TimerSystem_1.GameplayTimerSystem.Forever(this.aAt, TimerSystem_1.MIN_TIME);
  }
  DeactivateLongPress() {
    if (this.git && TimerSystem_1.GameplayTimerSystem.Has(this.git)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.git);
      this.git = undefined;
    }
    this.tAt = 0;
    this.lAt();
  }
  ResetLongPress() {
    this.DeactivateLongPress();
    this.SetLongPressPercent(0);
    this.SetLongPressProgressVisible(false);
  }
  SetEnable(t, i = false) {
    if (this.vq !== t || !!i) {
      if (t) {
        this.RootItem.SetAlpha(1);
      } else {
        this.RootItem.SetAlpha(InputKeyDefine_1.DISABLE_ALPHA);
      }
      this.vq = t;
    }
  }
}
exports.InputKeyItem = InputKeyItem;
//# sourceMappingURL=InputKeyItem.js.map