"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardItemBar = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RewardItemBar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this._Vf = false;
    this.JGe = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = e => this._Vf;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.JGe);
    this.GetText(0).SetText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PassReward") ?? "");
  }
  RebuildRewardsByData(e) {
    this.H3e.RefreshByData(e ?? []);
  }
  RebuildRewardsByLevelRewardData(e) {
    this._Vf = e.FinishRecord;
    this.H3e.RefreshByData(e.ItemList);
  }
  SetTitleNewTxt(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
exports.RewardItemBar = RewardItemBar;
//# sourceMappingURL=RewardItemBar.js.map