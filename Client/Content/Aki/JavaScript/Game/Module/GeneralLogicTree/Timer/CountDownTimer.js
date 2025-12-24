"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountDownTimer = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine");
const GeneralLogicTreeController_1 = require("../GeneralLogicTreeController");
const LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
const GENERAL_TIP_ID = 19;
const ONE_HUNDRED = 100;
class CountDownTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor(e, i, t, r, n) {
    super(e, i, true, n);
    this.MYt = -0;
    this.GP_ = -0;
    this.EYt = -0;
    this.SYt = -0;
    this.yYt = false;
    this.IYt = 0;
    this.I$t = 0;
    this.wqa = undefined;
    this.bJd = false;
    this.DYt = (e, i, t, r) => {
      if (e && e === this.TreeId && this.InnerTimerType === i) {
        var n = r * 1000;
        switch (t) {
          case Protocol_1.Aki.Protocol.s3s.TNm:
            this.MYt += n;
            break;
          case Protocol_1.Aki.Protocol.s3s.Proto_Sub:
            this.MYt -= n;
            break;
          case Protocol_1.Aki.Protocol.s3s.Proto_Set:
            this.MYt = TimeUtil_1.TimeUtil.GetServerTimeStamp() + n;
        }
        this.LYt(this.GetRemainTime());
      }
    };
    this.OnTick = e => {
      var i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
      var t = i - this.IYt;
      this.IYt = i;
      if (Time_1.Time.FlowTimeDilation !== 0) {
        this.SYt += t * Time_1.Time.TimeDilation;
        if ((i = this.GetRemainTime()) < 0) {
          this.TYt();
        } else if (this.I$t !== 2) {
          this.LYt(i);
        }
      }
    };
    this.GKa = () => {
      this.LYt(0);
    };
    this.kKa = () => {
      this.Bqa();
    };
    this.I$t = t;
    this.wqa = r;
    this.MYt = 0;
  }
  Destroy() {
    this.EndShowTimer();
    this.bJd = false;
    super.Destroy();
  }
  OnAddEvents() {
    if (!this.bJd) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged, this.DYt);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FailRangeTimerStartShow, this.GKa);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FailRangeTimerEndShow, this.kKa);
      this.bJd = true;
    }
  }
  OnRemoveEvents() {
    if (this.bJd) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GeneralLogicTreeTimerInfoChanged, this.DYt);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FailRangeTimerStartShow, this.GKa);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FailRangeTimerEndShow, this.kKa);
      this.bJd = false;
    }
  }
  TYt() {
    if (!this.yYt) {
      this.yYt = true;
      this.EndShowTimer();
      GeneralLogicTreeController_1.GeneralLogicTreeController.RequestTimerEnd(this.TreeId, this.TimerType);
    }
  }
  StartShowTimer(e, i) {
    if (e) {
      this.MYt = e;
      this.GP_ = i;
      this.EYt = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
      this.SYt = 0;
      this.IYt = TimeUtil_1.TimeUtil.GetServerTimeStamp();
      ModelManager_1.ModelManager.GeneralLogicTreeModel.SetTimerUiOwnerId(this.TreeId);
      if (this.I$t !== 2) {
        this.Bqa();
      }
      this.OnAddEvents();
    }
  }
  EndShowTimer() {
    this.OnRemoveEvents();
    this.LYt(0);
  }
  Bqa() {
    var e = this.GetRemainTime();
    if (e <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GamePlayTimer", 18, "倒计时剩余时间不足", ["开始时间", this.EYt], ["结束时间", this.MYt], ["treeIncId", this.TreeId]);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GamePlayTimer", 18, "倒计时开始", ["开始时间", this.EYt], ["结束时间", this.MYt], ["treeIncId", this.TreeId]);
      }
      switch (this.I$t) {
        case 0:
          this.bqa(e);
          break;
        case 1:
          this.qqa(e);
          break;
        case 3:
          this.Zk_(e);
          break;
        case 4:
          this.HWc(e);
          break;
        case 5:
          this.Wdf(e);
      }
    }
  }
  bqa(e) {
    var i = ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(GENERAL_TIP_ID);
    var t = [];
    var r = Math.floor(e % TimeUtil_1.TimeUtil.Hour / TimeUtil_1.TimeUtil.Minute);
    var n = Math.floor(e % TimeUtil_1.TimeUtil.Minute);
    var o = Math.floor((e - Math.floor(e)) * ONE_HUNDRED);
    t.push((r < 10 ? "0" : "") + r);
    t.push((n < 10 ? "0" : "") + n);
    t.push((o < 10 ? "0" : "") + o);
    var r = UiManager_1.UiManager.GetViewByName("CountDownFloatTips");
    if (!r || !!ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(i.TypeId, undefined, undefined, undefined, t, GENERAL_TIP_ID);
    }
    this.LYt(e);
  }
  qqa(e) {
    var i;
    if (!UiManager_1.UiManager.GetViewByName("CountDownChallenge") || !!ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing) {
      i = new GeneralLogicTreeDefine_1.ChallengeCountDownViewParams(this.MYt, this.wqa);
      UiManager_1.UiManager.OpenView("CountDownChallenge", i);
    }
    this.LYt(e);
  }
  Zk_(e) {
    if (!UiManager_1.UiManager.GetViewByName("ShipTowerCountDownView") || !!ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing) {
      UiManager_1.UiManager.OpenView("ShipTowerCountDownView", {
        EndTime: this.MYt
      });
    }
    this.LYt(e);
  }
  HWc(e) {
    var i;
    if (!UiManager_1.UiManager.GetViewByName("GreatSwordCountDownView") || !!ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing) {
      i = new GeneralLogicTreeDefine_1.ChallengeCountDownViewParams(this.MYt, this.wqa);
      UiManager_1.UiManager.OpenView("GreatSwordCountDownView", i);
    }
    this.LYt(e);
  }
  Wdf(e) {
    if (!UiManager_1.UiManager.GetViewByName("MotorcycleCountDownView") || !!ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing) {
      UiManager_1.UiManager.OpenView("MotorcycleCountDownView");
    }
    this.LYt(e);
  }
  GetRemainTime() {
    var e = (this.MYt - (this.EYt + this.SYt)) / 1000;
    var i = this.GP_ !== 0 ? (this.MYt - this.GP_) / 1000 : -1;
    return Math.max(e, 0, i);
  }
  LYt(i) {
    if (ModelManager_1.ModelManager.GeneralLogicTreeModel.IsTimerUiOwner(this.TreeId)) {
      let e = "CountDownFloatTips";
      switch (this.I$t) {
        case 0:
          e = "CountDownFloatTips";
          break;
        case 1:
          e = "CountDownChallenge";
          break;
        case 3:
          e = "ShipTowerCountDownView";
          break;
        case 4:
          e = "GreatSwordCountDownView";
          break;
        case 5:
          e = "MotorcycleCountDownView";
      }
      if (UiManager_1.UiManager.GetViewByName(e) && !ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing) {
        if (i) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGamePlayCdChanged, i, this.MYt);
        } else {
          ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing = true;
          UiManager_1.UiManager.CloseView(e, e => {
            if (e) {
              ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing = false;
            }
          });
        }
      }
    }
  }
}
exports.CountDownTimer = CountDownTimer;
//# sourceMappingURL=CountDownTimer.js.map