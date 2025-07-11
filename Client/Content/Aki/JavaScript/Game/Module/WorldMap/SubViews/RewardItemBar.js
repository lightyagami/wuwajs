"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardItemBar = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RewardItemBar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.JGe = (e, t, i) => {
      var r = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      r.Initialize(t.GetOwner());
      r.Refresh(e);
      return {
        Key: i,
        Value: r
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.H3e = new GenericLayoutNew_1.GenericLayoutNew(this.GetGridLayout(1), this.JGe);
    this.GetText(0).SetText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PassReward") ?? "");
  }
  RebuildRewardsByData(e) {
    this.H3e.RebuildLayoutByDataNew(e);
  }
  SetTitleNewTxt(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
exports.RewardItemBar = RewardItemBar;
//# sourceMappingURL=RewardItemBar.js.map