"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourLevelItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../../Common/TimeUtil");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class MotorParkourLevelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.TDe = undefined;
    this.OnToggleCallback = t => {};
    this.N8e = () => {
      if (!this.Pe.IsUnLock) {
        this.OnDeselected(false);
      }
      this.OnToggleCallback?.(this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIArtText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggleTextureTransition], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.GetExtendToggle(0).bLockStateOnSelect = true;
  }
  async RefreshAsync(t, e, i) {
    this.Pe = t;
    var s = this.GetUiExtendToggleTextureTransition(5);
    await this.SetExtendToggleTextureTransitionGroupByPath(t.SelectedSmallBgTexture, s, [3, 4, 5]);
    await this.SetExtendToggleTextureTransitionGroupByPath(t.SmallBgTexture, s, [0, 1, 2]);
    this.GetArtText(2)?.SetText(t.Id.toString());
    this.GetItem(3)?.SetUIActive(t.IsFinished);
    this.GetItem(4)?.SetUIActive(!t.IsUnLock);
    this.GetItem(6)?.SetUIActive(t.HasLevelRedDot);
    if (this.Pe && !this.Pe.IsUnLock) {
      this.kot();
    } else {
      this.xHe();
    }
  }
  hmd() {
    if (this.Pe && this.Pe.IsUnLock) {
      this.RefreshAsync(this.Pe, false, 0);
    }
  }
  kot() {
    this.xHe();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.hmd();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  xHe() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  OnSelected(t) {
    this.GetExtendToggle(0)?.SetToggleState(1);
    if (this.Pe.HasLevelRedDot) {
      this.Pe.ReadLevelRedDot();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Pe.ActivityId);
    }
    this.GetItem(6)?.SetUIActive(this.Pe.HasLevelRedDot);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
  GetKey(t, e) {
    return t.Id;
  }
}
exports.MotorParkourLevelItem = MotorParkourLevelItem;
//# sourceMappingURL=MotorParkourLevelItem.js.map