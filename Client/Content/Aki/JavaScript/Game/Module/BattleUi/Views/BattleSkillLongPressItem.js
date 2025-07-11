"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillLongPressItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillLongPressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TargetActive = false;
    this.hvl = undefined;
    this._vl = false;
    this.IO = undefined;
    this.r1t = 0;
    this.j3 = undefined;
    this.ae = 0;
    this.UOt = true;
    this.uvl = t => {
      if (this.IO === t) {
        if (this.r1t <= 0) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 67, "技能按钮长按提示播放失败, 长按时间不合法", ["duration", this.r1t]);
          }
        } else {
          this.StartProgress();
        }
      }
    };
    this.mvl = t => {
      if (this.IO === t) {
        this.dvl();
        this.hvl?.SetFillAmount(0);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnStart() {
    this.hvl = this.GetTexture(0);
    this.hvl?.SetFillAmount(0);
    this.SetComponentActive(this.TargetActive);
  }
  OnBeforeShow() {
    this.yWe();
  }
  OnAfterHide() {
    this.Nmt();
    this.jm();
  }
  OnBeforeDestroy() {
    this.Nmt();
    this.jm();
  }
  yWe() {
    if (!this._vl) {
      this._vl = true;
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SkillLongPressStart, this.uvl);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SkillLongPressEnd, this.mvl);
    }
  }
  Nmt() {
    if (this._vl) {
      this._vl = false;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillLongPressStart, this.uvl);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SkillLongPressEnd, this.mvl);
    }
  }
  jm() {
    if (this.j3) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
  }
  SetComponentActive(t) {
    if ((this.TargetActive !== t || !!this.UOt) && !(this.TargetActive = t, this.InAsyncLoading())) {
      this.UOt = false;
      this.SetActive(t);
      this.hvl?.SetFillAmount(0);
    }
  }
  SetAction(t) {
    this.IO = t;
  }
  SetDuration(t) {
    this.r1t = t * TimeUtil_1.TimeUtil.InverseMillisecond;
  }
  StartProgress() {
    this.jm();
    this.ae = Time_1.Time.WorldTime;
    var t = TimerSystem_1.MIN_TIME;
    this.j3 = TimerSystem_1.TimerSystem.Forever(() => {
      var t = Time_1.Time.WorldTime - this.ae;
      var t = Math.min(1, t / this.r1t);
      this.hvl?.SetFillAmount(t);
      if (t === 1) {
        this.dvl();
      }
    }, t);
  }
  dvl() {
    this.jm();
  }
}
exports.BattleSkillLongPressItem = BattleSkillLongPressItem;
//# sourceMappingURL=BattleSkillLongPressItem.js.map