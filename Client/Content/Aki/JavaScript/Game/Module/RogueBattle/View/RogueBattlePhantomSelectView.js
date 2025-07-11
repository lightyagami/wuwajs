"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattlePhantomSelectView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RogueBattleElementPanel_1 = require("../Component/RogueBattleElementPanel");
const RogueBattlePhantomItem_1 = require("../Component/RogueBattlePhantomItem");
const RogueBattleTopPanel_1 = require("../Component/RogueBattleTopPanel");
class RogueBattlePhantomSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PhantomLayout = undefined;
    this.ElementInfoPanel = undefined;
    this.CaptionItem = undefined;
    this.ilo = () => {
      var e = this.PhantomLayout?.GetSelectedGridIndex();
      if (!e || !(e > 0)) {
        ControllerHolder_1.ControllerHolder.RogueBattleController.SelectTokenRequest(e).then(() => {
          this.CloseMe();
        });
      }
    };
    this.m5c = () => {
      var e = new RogueBattlePhantomItem_1.RogueBattlePhantomItem();
      e.SelectCallBack = this.f5c;
      return e;
    };
    this.f5c = e => {
      if (e === undefined) {
        this.PhantomLayout?.DeselectCurrentGridProxy();
        this.GetButton(2).SetSelfInteractive(false);
      } else {
        this.GetButton(2).SetSelfInteractive(true);
        this.PhantomLayout?.SelectGridProxy(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIButtonComponent], [3, UE.UIItem]];
    this.BtnBindInfo = [[2, this.ilo]];
  }
  async OnBeforeStartAsync() {
    this.PhantomLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.m5c);
    this.ElementInfoPanel = new RogueBattleElementPanel_1.RogueBattleElementPanel();
    this.CaptionItem = new RogueBattleTopPanel_1.RogueBattleTopPanel();
    this.CaptionItem.CloseCallback = () => {
      this.CloseMe();
    };
    var e = ModelManager_1.ModelManager.RogueBattleModel?.GetOptionDataById(this.OpenParam);
    await Promise.all([this.PhantomLayout.RefreshByDataAsync(e.fIc), this.ElementInfoPanel.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]);
  }
}
exports.RogueBattlePhantomSelectView = RogueBattlePhantomSelectView;
//# sourceMappingURL=RogueBattlePhantomSelectView.js.map