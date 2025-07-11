"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsRewardItem = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const RacingBetsController_1 = require("../../RacingBetsController");
class RacingBetsRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
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
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[3, this.IOe], [4, this.qOe]];
  }
  async OnBeforeShowAsyncImplement() {
    this.TTc = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    await this.TTc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  Refresh(t, e, r) {
    this.$Tt = t;
    t = this.$Tt.GetRewardList();
    if (t.length > 0) {
      this.TTc.Refresh(t[0]);
    }
    this.GetText(1).ShowTextNew(this.$Tt.GetRewardName());
    this.GetText(2).SetText(this.$Tt.GetProgressText());
    t = this.$Tt.GetTaskStatus();
    this._Oe(t);
    this.GetText(7).ShowTextNew("Dango_CurrencyPage_Status_1");
    this.GetText(5).ShowTextNew("Dango_CurrencyPage_Status_2");
    this.GetText(8).ShowTextNew("Dango_CurrencyPage_Status_3");
  }
  _Oe(t) {
    this.GetButton(4).RootUIComp.SetUIActive(t === Protocol_1.Aki.Protocol.$J_.Proto_TaskFinish);
    this.GetButton(3).RootUIComp.SetUIActive(false);
    this.GetText(5).SetUIActive(t === Protocol_1.Aki.Protocol.$J_.Proto_Undone);
    this.GetSprite(6).SetUIActive(t === Protocol_1.Aki.Protocol.$J_.Proto_Received);
    this.GetItem(9).SetUIActive(t === Protocol_1.Aki.Protocol.$J_.Proto_TaskFinish);
  }
}
exports.RacingBetsRewardItem = RacingBetsRewardItem;
//# sourceMappingURL=RacingBetsRewardItem.js.map