"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleSettleInfoPanelWithList = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleSettleInfoPanelWithList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.u31 = undefined;
    this.AU1 = false;
    this.hai = 0;
    this.CreateItem = undefined;
    this.Data = [];
    this.xU1 = () => {
      if (this.AU1) {
        this.AU1 = false;
        this.GetSprite(6).SetUIRelativeRotation(new UE.Rotator(0, -90, 0));
        this.GetVerticalLayout(5).SetHeightFitToChildren(false);
        this.GetVerticalLayout(5).RootUIComp.SetHeight(this.hai);
      } else {
        this.AU1 = true;
        this.GetSprite(6).SetUIRelativeRotation(new UE.Rotator(0, 90, 0));
        this.GetVerticalLayout(5).SetHeightFitToChildren(true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIGridLayout], [5, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIButtonComponent], [6, UE.UISprite]];
    this.BtnBindInfo = [[4, this.xU1]];
  }
  async OnBeforeStartAsync() {
    this.u31 = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.CreateItem);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "PrefabTextItem_2729256217_Text", this.Data.length.toString());
    this.hai = this.GetVerticalLayout(5).RootUIComp.GetHeight();
    var t = this.GetGridLayout(2);
    var i = t.RootUIComp.GetWidth();
    var t = this.Data.length * this.GetItem(3).GetWidth() + (this.Data.length - 1) * t.GetSpacing().X;
    this.GetButton(4).RootUIComp.SetUIActive(i < t);
    await this.u31.RefreshByDataAsync(this.Data);
  }
}
exports.RogueBattleSettleInfoPanelWithList = RogueBattleSettleInfoPanelWithList;
//# sourceMappingURL=RogueBattleSettleInfoPanelWithList.js.map