"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CostTabItem = undefined;
const UE = require("ue");
const CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
class CostTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor(t) {
    super();
    this.wqe = undefined;
    this.Bke = t => {
      if (t === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
    this.wqe = t;
  }
  Init() {
    this.SetRootActor(this.wqe.GetOwner(), true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Bke]];
  }
  OnStart() {
    super.OnStart();
    this.GetExtendToggle(1).SetToggleState(0);
  }
  OnUpdateTabIcon(t) {
    this.SetSpriteByPath(t, this.GetSprite(0), false, undefined);
  }
  OnSetToggleState(t, e) {
    this.GetExtendToggle(1).SetToggleState(t, e);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
}
exports.CostTabItem = CostTabItem;
//# sourceMappingURL=CostTabItem.js.map