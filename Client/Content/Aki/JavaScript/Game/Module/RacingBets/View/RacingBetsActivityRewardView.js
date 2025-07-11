"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsActivityRewardView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RacingBetsActivityRewardItem_1 = require("./Item/RacingBetsActivityRewardItem");
const RacingBetsRewardTabItem_1 = require("./Item/RacingBetsRewardTabItem");
class RacingBetsActivityRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.HTc = undefined;
    this.$Tc = undefined;
    this.B7t = undefined;
    this.H3e = undefined;
    this.Og = () => {
      if (this.HTc) {
        for (const t of this.B7t.GetLayoutItemList()) {
          t.RefreshItem();
        }
        var e = this.HTc.GetRewardDataList();
        this.H3e.RefreshByData(e);
      }
    };
    this.WTc = () => new RacingBetsActivityRewardItem_1.RacingBetsActivityRewardItem();
    this.fqe = () => {
      var e = new RacingBetsRewardTabItem_1.RacingBetsRewardTabItem();
      e.BindClickToggleCallBack(this.onl);
      return e;
    };
    this.onl = t => {
      var e;
      if (this.HTc !== t) {
        this.HTc = t;
        e = this.$Tc.findIndex(e => e === t);
        this.B7t.SelectGridProxy(e);
        e = t.GetRewardDataList();
        this.H3e.RefreshByData(e);
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
  async OnBeforeStartAsync() {
    var e;
    this.$Tc = this.OpenParam;
    if (this.$Tc === undefined || this.$Tc.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 58, "RacingBetsActivityRewardView invalid OpenParam");
      }
    } else {
      this.H3e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), this.WTc);
      this.B7t = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.fqe);
      await this.B7t.RefreshByDataAsync(this.$Tc);
      this.B7t.SelectGridProxy(0);
      this.HTc = this.$Tc[0];
      e = this.HTc.GetRewardDataList();
      await this.H3e.RefreshByDataAsync(e);
      this.GetText(4).SetUIActive(false);
    }
  }
}
exports.RacingBetsActivityRewardView = RacingBetsActivityRewardView;
//# sourceMappingURL=RacingBetsActivityRewardView.js.map