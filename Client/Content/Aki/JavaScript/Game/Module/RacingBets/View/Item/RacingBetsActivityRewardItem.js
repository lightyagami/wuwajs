"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsActivityRewardItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const RacingBetsController_1 = require("../../RacingBetsController");
class RacingBetsActivityRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$Tt = undefined;
    this.TTc = undefined;
    this.IOe = () => {};
    this.qOe = () => {
      RacingBetsController_1.RacingBetsController.RacingBetsTaskRewardRequest(this.$Tt.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UISprite], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [10, UE.UIItem]];
    this.BtnBindInfo = [[2, this.IOe], [3, this.qOe]];
  }
  async OnBeforeShowAsyncImplement() {
    this.TTc = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    await this.TTc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
  }
  Refresh(t, e, i) {
    this.$Tt = t;
    t = this.$Tt.GetRewardList();
    if (t.length > 0) {
      this.TTc.Refresh(t[0]);
    }
    this.GetText(0).ShowTextNew(this.$Tt.GetRewardName());
    this.GetText(1).SetText(this.$Tt.GetProgressText());
    t = this.$Tt.GetTaskStatus();
    this.RefreshState(t);
    this.GetText(8).ShowTextNew("Dango_CurrencyPage_Status_1");
    this.GetText(4).ShowTextNew("Dango_CurrencyPage_Status_2");
    this.GetText(9).ShowTextNew("Dango_CurrencyPage_Status_3");
  }
  RefreshState(t) {
    this.GetButton(3).RootUIComp.SetUIActive(t === Protocol_1.Aki.Protocol.$J_.Proto_TaskFinish);
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.GetText(4).SetUIActive(t === Protocol_1.Aki.Protocol.$J_.Proto_Undone);
    this.GetSprite(5).SetUIActive(t === Protocol_1.Aki.Protocol.$J_.Proto_Received);
    this.GetItem(10).SetUIActive(t === Protocol_1.Aki.Protocol.$J_.Proto_TaskFinish);
  }
}
exports.RacingBetsActivityRewardItem = RacingBetsActivityRewardItem;
//# sourceMappingURL=RacingBetsActivityRewardItem.js.map