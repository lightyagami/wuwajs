"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueSelectTokenView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const RoguelikeDefine_1 = require("../../Roguelike/Define/RoguelikeDefine");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const WeeklyRogueTokenItem_1 = require("../Components/WeeklyRogueTokenItem");
const WeeklyRogueController_1 = require("../WeeklyRogueController");
class WeeklyRogueSelectTokenView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lV_ = undefined;
    this.lqe = undefined;
    this.tV_ = () => {
      var e = new WeeklyRogueTokenItem_1.WeeklyRogueTokenItem();
      e.OnSelectedChange = this.ELt;
      return e;
    };
    this.ELt = e => {
      if (e === undefined) {
        this.lV_?.DeselectCurrentGridProxy();
        this.GetButton(1).SetSelfInteractive(false);
      } else {
        this.lV_?.SelectGridProxy(e);
        this.GetButton(1).SetSelfInteractive(true);
      }
    };
    this.ilo = () => {
      WeeklyRogueController_1.WeeklyRogueController.Instance?.SelectOptionRequest();
      this.CloseMe();
    };
    this.tlo = () => {
      this.CloseMe();
    };
    this.Mlo = () => {
      UiManager_1.UiManager.OpenView("WeeklyRogueInfo");
    };
    this._V_ = () => {
      ModelManager_1.ModelManager.WeeklyRogueModel.ChangeDescMode();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIExtendToggle], [5, UE.UIText], [6, UE.UIItem]];
    this.BtnBindInfo = [[1, this.ilo], [2, this.tlo], [3, this.Mlo], [4, this._V_]];
  }
  async OnBeforeStartAsync() {
    this.lV_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.tV_);
    var e = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()), this.lV_.RefreshByDataAsync(e.UN_)]);
    await this.lqe.SetCurrencyItemList([RoguelikeDefine_1.INSIDE_CURRENCY_ID]);
    this.GetButton(1).SetSelfInteractive(false);
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.DescMode === 0 ? 1 : 0;
    this.GetExtendToggle(4).SetToggleState(e);
  }
}
exports.WeeklyRogueSelectTokenView = WeeklyRogueSelectTokenView;
//# sourceMappingURL=WeeklyRogueSelectTokenView.js.map