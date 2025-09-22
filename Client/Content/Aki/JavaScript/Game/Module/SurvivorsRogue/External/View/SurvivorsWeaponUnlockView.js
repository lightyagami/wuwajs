"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsWeaponUnlockView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const SurvivorsRogueCardDataFactory_1 = require("../../Card/SurvivorsRogueCardDataFactory");
const SurvivorsRogueCardScrollItemBase_1 = require("../../Card/SurvivorsRogueCardScrollItemBase");
class SurvivorsWeaponUnlockView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.I5t = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[0, this.I5t]];
  }
  OnStart() {
    var e;
    if (ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData) {
      e = this.OpenParam;
      this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), () => new CardScrollItem(), undefined, true);
      this.xqe.RefreshByData(e);
    } else {
      this.CloseMe();
    }
  }
}
exports.SurvivorsWeaponUnlockView = SurvivorsWeaponUnlockView;
class CardScrollItem extends SurvivorsRogueCardScrollItemBase_1.SurvivorsRogueCardScrollItemBase {
  async RefreshAsync(e, r, i) {
    e = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralWeapon(e);
    await this.Apply(e);
  }
}
//# sourceMappingURL=SurvivorsWeaponUnlockView.js.map