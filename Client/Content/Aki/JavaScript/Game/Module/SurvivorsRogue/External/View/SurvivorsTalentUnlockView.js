"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsTalentUnlockView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SurvivorsTalentTreeMediumItemGrid_1 = require("./SurvivorsTalentTreeMediumItemGrid");
class SurvivorsTalentUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.s4e = undefined;
    this.L1d = () => new SurvivorsTalentTreeMediumItemGrid_1.SurvivorsTalentTreeMediumItemGrid();
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.Jvt]];
  }
  async OnBeforeStartAsync() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.L1d);
    var e;
    var i;
    var t = this.OpenParam;
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title);
      e = this.GetHorizontalLayout(2).GetRootComponent();
      i = this.GetText(4);
      e.SetUIActive(false);
      i.SetUIActive(false);
      if (t.ShowType === 3) {
        e.SetUIActive(true);
        await this.s4e.RefreshByDataAsync(t.UnlockItem);
      } else {
        i.SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.Desc, t.DescParams);
      }
    }
  }
}
exports.SurvivorsTalentUnlockView = SurvivorsTalentUnlockView;
//# sourceMappingURL=SurvivorsTalentUnlockView.js.map