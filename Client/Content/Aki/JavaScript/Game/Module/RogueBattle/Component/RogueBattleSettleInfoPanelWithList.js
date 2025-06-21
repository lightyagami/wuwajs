"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleSettleInfoPanelWithList = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueBattleSettleInfoPanelWithList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.UN1 = void 0, this.tU1 = !1, this.hai = 0, this.CreateItem = void 0, this.Data = [], this.rU1 = () => {
      this.tU1 ? (this.tU1 = !1, this.GetSprite(6).SetUIRelativeRotation(new UE.Rotator(0, -90, 0)), this.GetVerticalLayout(5).SetHeightFitToChildren(!1), this.GetVerticalLayout(5).RootUIComp.SetHeight(this.hai)) : (this.tU1 = !0, this.GetSprite(6).SetUIRelativeRotation(new UE.Rotator(0, 90, 0)), this.GetVerticalLayout(5).SetHeightFitToChildren(!0))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIGridLayout],
      [5, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [6, UE.UISprite]
    ], this.BtnBindInfo = [
      [4, this.rU1]
    ]
  }
  async OnBeforeStartAsync() {
    this.UN1 = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.CreateItem), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "PrefabTextItem_2729256217_Text", this.Data.length.toString()), this.hai = this.GetVerticalLayout(5).RootUIComp.GetHeight();
    var t = this.GetGridLayout(2),
      i = t.RootUIComp.GetWidth(),
      t = this.Data.length * this.GetItem(3).GetWidth() + (this.Data.length - 1) * t.GetSpacing().X;
    this.GetButton(4).RootUIComp.SetUIActive(i < t), await this.UN1.RefreshByDataAsync(this.Data)
  }
}
exports.RogueBattleSettleInfoPanelWithList = RogueBattleSettleInfoPanelWithList;
//# sourceMappingURL=RogueBattleSettleInfoPanelWithList.js.map