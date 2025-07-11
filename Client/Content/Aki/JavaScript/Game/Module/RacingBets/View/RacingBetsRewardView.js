"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsRewardView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RacingBetsRewardItem_1 = require("./Item/RacingBetsRewardItem");
const RacingBetsRewardTabItem_1 = require("./Item/RacingBetsRewardTabItem");
class RacingBetsRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.HTc = undefined;
    this.$Tc = undefined;
    this.B7t = undefined;
    this.H3e = undefined;
    this.Og = () => {
      if (this.HTc) {
        for (const e of this.B7t.GetLayoutItemList()) {
          e.RefreshItem();
        }
        var i = this.HTc.GetRewardDataList();
        this.H3e.RefreshByData(i);
      }
    };
    this.sSt = () => {
      var i;
      var e = this.GetText(4);
      if (this.HTc) {
        i = TimeUtil_1.TimeUtil.SetTimeSecond(TimeUtil_1.TimeUtil.GetNextDayTimeStamp()) - TimeUtil_1.TimeUtil.GetServerTime();
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Dango_DailyTask_Countdown", TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(i)?.CountDownText ?? "");
        e.SetUIActive(true);
      } else {
        e.SetUIActive(false);
      }
    };
    this.WTc = () => new RacingBetsRewardItem_1.RacingBetsRewardItem();
    this.fqe = () => {
      var i = new RacingBetsRewardTabItem_1.RacingBetsRewardTabItem();
      i.BindClickToggleCallBack(this.onl);
      return i;
    };
    this.onl = e => {
      var i;
      if (this.HTc !== e) {
        this.HTc = e;
        i = this.$Tc.findIndex(i => i === e);
        this.B7t.SelectGridProxy(i);
        i = e.GetRewardDataList();
        this.H3e.RefreshByData(i);
        this.sSt();
      }
    };
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIHorizontalLayout], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIText]];
    this.BtnBindInfo = [[0, this.Jvt], [5, this.Jvt]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsRewardRefresh, this.Og);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDataRefresh, this.Og);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsRewardRefresh, this.Og);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDataRefresh, this.Og);
  }
  OnTick() {
    this.sSt();
  }
  async OnBeforeStartAsync() {
    var i;
    this.$Tc = this.OpenParam;
    if (this.$Tc === undefined || this.$Tc.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 58, "RacingBetsRewardView invalid OpenParam");
      }
    } else {
      this.H3e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.WTc);
      this.B7t = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.fqe);
      await this.B7t.RefreshByDataAsync(this.$Tc);
      this.B7t.SelectGridProxy(0);
      this.HTc = this.$Tc[0];
      i = this.HTc.GetRewardDataList();
      await this.H3e.RefreshByDataAsync(i);
    }
  }
  OnStart() {
    var i = TimeUtil_1.TimeUtil.SetTimeSecond(TimeUtil_1.TimeUtil.GetNextDayTimeStamp()) - TimeUtil_1.TimeUtil.GetServerTime();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "Dango_DailyTask_Countdown", TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(i)?.CountDownText ?? "");
  }
}
exports.RacingBetsRewardView = RacingBetsRewardView;
//# sourceMappingURL=RacingBetsRewardView.js.map