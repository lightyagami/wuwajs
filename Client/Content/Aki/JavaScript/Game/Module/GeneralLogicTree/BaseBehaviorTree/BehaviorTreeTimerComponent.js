"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorTreeTimerCenter = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine");
const CountDownTimer_1 = require("../Timer/CountDownTimer");
const FailRangeTimer_1 = require("../Timer/FailRangeTimer");
const LevelPlayPrepareTimer_1 = require("../Timer/LevelPlayPrepareTimer");
const NoUiTimer_1 = require("../Timer/NoUiTimer");
const TICK_INTETVAL_TIME = 20;
const FAILEDRANGE_INTERTVAL = 100;
class BehaviorTreeTimerCenter {
  constructor(e, i) {
    this.$mt = BigInt(0);
    this.Yre = undefined;
    this.SJ = undefined;
    this.$mt = e;
    this.Yre = i;
    this.SJ = new Map();
  }
  Dispose() {
    for (var [, e] of this.SJ) {
      e.Destroy();
    }
    this.SJ.clear();
  }
  UpdateTimerInfo(e) {
    var i;
    var r;
    var t;
    if (e) {
      i = e.c9n;
      if (!e.dps || (r = MathUtils_1.MathUtils.LongToNumber(e.dps)) === 0) {
        this.dQt(i);
      } else {
        t = MathUtils_1.MathUtils.LongToNumber(e.QE_);
        this.CQt(i, r, t, e.b5n);
      }
    }
  }
  CQt(r, e, i, t) {
    let s = undefined;
    switch (r) {
      case "CountDownChallenge":
      case "PublicTime":
      case "BehaviorTreeTimer1":
      case "BehaviorTreeTimer2":
      case "BehaviorTreeTimer3":
      case "BehaviorTreeTimer4":
      case "BehaviorTreeTimer5":
        if (!(s = this.GetTimer(r))) {
          var a = this.Yre.GetNode(t);
          let e = 0;
          let i = "";
          if (a?.NodeType === "QuestFailed") {
            e = a.TimerUiConfig?.UiType ?? 0;
            i = a.TimerUiConfig?.TidTitle ? PublicUtil_1.PublicUtil.GetConfigTextByKey(a.TimerUiConfig?.TidTitle) ?? this.Yre.TreeConfigId + "-" + t : this.Yre.TreeConfigId + "-" + t;
          } else if (a?.NodeType === "ChildQuest" && a.ChildQuestType === IQuest_1.EChildQuest.Timer) {
            a = a.TimerUiConfig;
            e = a?.UiType ?? 0;
            i = a?.TidTitle ? PublicUtil_1.PublicUtil.GetConfigTextByKey(a?.TidTitle) ?? this.Yre.TreeConfigId + "-" + t : this.Yre.TreeConfigId + "-" + t;
          }
          s = new CountDownTimer_1.CountDownTimer(this.$mt, r, e, i, TICK_INTETVAL_TIME);
          this.SJ.set(r, s);
        }
        break;
      case "WaitTime":
        if (!(s = this.GetTimer(r))) {
          s = new NoUiTimer_1.NoUiTimer(this.$mt, r, true, TICK_INTETVAL_TIME);
          this.SJ.set(r, s);
        }
        break;
      case "GameStartCountDown":
        if (!(s = this.GetTimer(r))) {
          s = new LevelPlayPrepareTimer_1.LevelPlayPrepareTimer(this.$mt, r, false);
          this.SJ.set(r, s);
        }
        break;
      case GeneralLogicTreeDefine_1.OUTRANGEFAILED_TIMERTYPE:
        s = this.GetTimer("CountDownChallenge");
        a = this.GetRemainTime("CountDownChallenge");
        if ((s === undefined || !(a <= 10)) && !(s = this.GetTimer(r))) {
          s = new FailRangeTimer_1.FailRangeTimer(this.$mt, r, FAILEDRANGE_INTERTVAL);
          this.SJ.set(r, s);
        }
        break;
      case GeneralLogicTreeDefine_1.NPCFARAWAY_TIMERTYPE:
        s = this.GetTimer("CountDownChallenge");
        a = this.GetRemainTime("CountDownChallenge");
        if ((s === undefined || !(a <= 10)) && !(s = this.GetTimer(r))) {
          s = new FailRangeTimer_1.FailRangeTimer(this.$mt, r, FAILEDRANGE_INTERTVAL);
          this.SJ.set(r, s);
        }
    }
    s?.StartShowTimer(e, i);
  }
  dQt(e) {
    var i = this.GetTimer(e);
    if (i) {
      switch (e) {
        case GeneralLogicTreeDefine_1.OUTRANGEFAILED_TIMERTYPE:
        case GeneralLogicTreeDefine_1.NPCFARAWAY_TIMERTYPE:
        case "GameStartCountDown":
          i.EndShowTimer();
          break;
        default:
          i.Destroy();
          this.SJ.delete(e);
      }
    }
  }
  GetTimer(e) {
    return this.SJ.get(e);
  }
  GetRemainTime(e = "CountDownChallenge") {
    return this.GetTimer(e)?.GetRemainTime() ?? 0;
  }
}
exports.BehaviorTreeTimerCenter = BehaviorTreeTimerCenter;
//# sourceMappingURL=BehaviorTreeTimerComponent.js.map