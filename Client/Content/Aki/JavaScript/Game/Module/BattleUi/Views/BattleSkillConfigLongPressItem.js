"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillConfigLongPressItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const BattleSkillInputHandler_1 = require("./BattleSkillInputHandler");
class BattleSkillConfigLongPressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.HIt = undefined;
    this.TargetActive = false;
    this.hvl = undefined;
    this.IO = undefined;
    this.r1t = 0;
    this.ae = 0;
    this.UOt = true;
    this.uvl = t => {
      if (this.IO === t) {
        if (this.r1t <= 0) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "技能按钮长按提示播放失败, 长按时间不合法", ["duration", this.r1t]);
          }
        } else {
          this.cvl();
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
    this.HIt = new BattleSkillInputHandler_1.BattleSkillInputHandler();
    this.HIt.InitCallback(this.uvl, this.mvl);
    if (this.IO) {
      this.HIt.SetActionType(this.IO);
    }
  }
  OnBeforeShow() {
    if (this.HIt) {
      ControllerHolder_1.ControllerHolder.InputController.AddInputHandler(this.HIt);
    }
  }
  OnAfterHide() {
    if (this.HIt) {
      ControllerHolder_1.ControllerHolder.InputController.RemoveInputHandler(this.HIt);
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
    if (this.IO !== t) {
      this.IO = t;
      this.HIt?.SetActionType(t);
      this.dvl();
      this.hvl?.SetFillAmount(0);
    }
  }
  SetDuration(t) {
    this.r1t = t * TimeUtil_1.TimeUtil.InverseMillisecond;
  }
  cvl() {
    this.ae = Time_1.Time.WorldTime;
  }
  dvl() {
    this.ae = 0;
  }
  Tick(t) {
    var i;
    if (!(this.ae <= 0) && !(this.r1t <= 0)) {
      i = Time_1.Time.WorldTime - this.ae;
      i = Math.min(1, i / this.r1t);
      this.hvl?.SetFillAmount(i);
      if (i === 1) {
        this.dvl();
      }
    }
  }
}
exports.BattleSkillConfigLongPressItem = BattleSkillConfigLongPressItem;
//# sourceMappingURL=BattleSkillConfigLongPressItem.js.map