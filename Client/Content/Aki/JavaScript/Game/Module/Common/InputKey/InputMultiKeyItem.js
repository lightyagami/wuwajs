"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputMultiKeyItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputKeyDefine_1 = require("./InputKeyDefine");
const InputKeyItem_1 = require("./InputKeyItem");
class InputMultiKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor(e = true, s = true, t) {
    super();
    this._At = undefined;
    this.uAt = undefined;
    this.cAt = undefined;
    this.mAt = undefined;
    this.vq = false;
    this.dAt = true;
    this.CAt = true;
    this.wTt = undefined;
    this.XBo = () => {
      if (this.mAt) {
        this.gAt(this.mAt);
      }
    };
    this.Dut = e => {
      if (this.mAt && this.mAt.ActionOrAxisName === e) {
        this.gAt(this.mAt);
      }
    };
    this.Rut = e => {
      if (this.mAt && this.mAt.ActionOrAxisName === e) {
        this.gAt(this.mAt);
      }
    };
    this.dAt = e;
    this.CAt = s;
    this.wTt = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this._At = new InputKeyItem_1.InputKeyItem(this.wTt !== undefined ? this.wTt + "_1" : undefined);
    this.uAt = new InputKeyItem_1.InputKeyItem(this.wTt !== undefined ? this.wTt + "_2" : undefined);
    await Promise.all([this._At.CreateByActorAsync(this.GetItem(1).GetOwner(), true), this.uAt.CreateByActorAsync(this.GetItem(2).GetOwner(), true)]);
  }
  OnStart() {
    this.cAt = new InputKeyDisplayData_1.InputKeyDisplayData();
  }
  OnBeforeDestroy() {
    this.cAt?.Reset();
    this._At = undefined;
    this.uAt = undefined;
  }
  OnBeforeShow() {
    if (this.dAt) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    }
    if (this.CAt) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActionKeyChanged, this.Dut);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAxisKeyChanged, this.Rut);
    }
    if (this.mAt) {
      this.gAt(this.mAt);
    }
  }
  OnAfterHide() {
    if (this.dAt) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    }
    if (this.CAt) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActionKeyChanged, this.Dut);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAxisKeyChanged, this.Rut);
    }
  }
  RefreshByKeyList(e, s) {
    this.fAt(e, s);
    this.mAt = undefined;
  }
  fAt(e, s, t) {
    if (e) {
      this._At?.Refresh(e);
      this._At?.SetActive(true);
    }
    e = this.GetText(0);
    if (s) {
      this.uAt?.Refresh(s);
      this.uAt?.SetActive(true);
      e.SetText(t ?? "+");
      e.SetUIActive(true);
    } else {
      e.SetUIActive(false);
      this.uAt?.SetActive(false);
    }
  }
  RefreshByKey(e) {
    this.pAt(e);
    this.mAt = undefined;
  }
  pAt(e) {
    this._At?.Refresh(e);
    this.GetText(0)?.SetUIActive(false);
    this.uAt?.SetActive(false);
  }
  RefreshByActionOrAxis(e) {
    this.mAt = e;
    this.gAt(e);
  }
  gAt(s) {
    if (this.cAt) {
      var t;
      var i = s.ActionOrAxisName;
      this.cAt.Reset();
      let e = InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(this.cAt, i);
      if (e = e || InputSettingsManager_1.InputSettingsManager.GetAxisKeyDisplayData(this.cAt, i)) {
        i = s.Index ?? 0;
        if (!!(i = this.cAt.GetDisplayKeyNameList(i)) && !(i.length <= 0)) {
          if (i.length === 1) {
            t = {
              KeyName: i[0],
              IsLongPressDisable: s.IsLongPressDisable,
              LongPressTime: s.LongPressTime,
              DelayPressTime: s.DelayPressTime,
              IsLongPressProcessVisible: s.IsLongPressProcessVisible,
              IsShowLongPressWhenPress: s.IsShowLongPressWhenPress,
              IsShowLongPressWhenRelease: s.IsShowLongPressWhenRelease,
              IsTextArrowVisible: s.IsTextArrowVisible,
              IsUpArrowVisible: s.IsUpArrowVisible,
              IsDownArrowVisible: s.IsDownArrowVisible,
              IsShowTextArrowWhenPress: s.IsShowTextArrowWhenPress,
              IsShowTextArrowWhenRelease: s.IsShowTextArrowWhenRelease,
              DescriptionId: s.DescriptionId
            };
            this.fAt(t);
          }
          if (i.length === 2) {
            t = {
              KeyName: i[0]
            };
            i = {
              KeyName: i[1],
              LongPressTime: s.LongPressTime,
              IsLongPressProcessVisible: s.IsLongPressProcessVisible,
              IsShowLongPressWhenPress: s.IsShowLongPressWhenPress,
              IsShowLongPressWhenRelease: s.IsShowLongPressWhenRelease,
              IsTextArrowVisible: s.IsTextArrowVisible,
              IsUpArrowVisible: s.IsUpArrowVisible,
              IsDownArrowVisible: s.IsDownArrowVisible,
              IsShowTextArrowWhenPress: s.IsShowTextArrowWhenPress,
              IsShowTextArrowWhenRelease: s.IsShowTextArrowWhenRelease,
              DescriptionId: s.DescriptionId
            };
            this.fAt(t, i, s.LinkString);
          }
        }
      }
    }
  }
  SetEnable(e, s = false) {
    if (this.vq !== e || !!s) {
      if (e) {
        this.RootItem.SetAlpha(1);
      } else {
        this.RootItem.SetAlpha(InputKeyDefine_1.DISABLE_ALPHA);
      }
      this.vq = e;
    }
  }
  SetLongPressDisable(e) {
    if (this.mAt) {
      this.mAt.IsLongPressDisable = e;
    }
    this._At?.SetLongPressDisable(e);
    this.uAt?.SetLongPressDisable(e);
  }
  SetLongPressTime(e) {
    this._At?.SetLongPressTime(e);
    this.uAt?.SetLongPressTime(e);
    if (this.mAt) {
      this.mAt.LongPressTime = e;
    }
  }
  ResetLongPress() {
    this._At?.ResetLongPress();
    this.uAt?.ResetLongPress();
  }
}
exports.InputMultiKeyItem = InputMultiKeyItem;
//# sourceMappingURL=InputMultiKeyItem.js.map