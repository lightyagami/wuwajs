"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueCaptionItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine");
class WeeklyRogueCaptionItem extends UiPanelBase_1.UiPanelBase {
  constructor(e = true) {
    super();
    this.NeedCurrency = e;
    this.lqe = undefined;
    this.W$c = () => {};
    this.tlo = () => {
      if (this.W$c) {
        this.W$c();
      }
    };
    this.Mlo = () => {
      UiManager_1.UiManager.OpenView("WeeklyRogueInfo");
    };
    this._V_ = () => {
      ModelManager_1.ModelManager.WeeklyRogueModel.ChangeDescMode();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIExtendToggle], [3, UE.UIText], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.tlo], [2, this._V_], [4, this.Mlo]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    if (this.NeedCurrency) {
      await this.lqe.SetCurrencyItemList([RoguelikeDefine_1.INSIDE_CURRENCY_ID]);
    }
    this.Oqe();
  }
  SetCloseCallBack(e) {
    this.W$c = e;
  }
  Oqe() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.DescMode === 0 ? 1 : 0;
    this.GetExtendToggle(2).SetToggleState(e, false);
  }
}
exports.WeeklyRogueCaptionItem = WeeklyRogueCaptionItem;
//# sourceMappingURL=WeeklyRogueCaptionItem.js.map