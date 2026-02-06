"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorBrochureCompletedView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const BlackScreenController_1 = require("../../../../BlackScreen/BlackScreenController");
class SpringManorBrochureCompletedView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Mne = 0;
    this.LFg = 0;
    this.Xyg = () => {
      var e;
      if (!(this.LFg <= 0)) {
        if ((e = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(this.LFg)) && e.TeleportEntityId > 0) {
          this.L3g(this.LFg);
        }
      }
    };
    this.FAg = () => {
      UiManager_1.UiManager.OpenView("Spring26BrochureView");
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [1, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.FAg], [5, this.Xyg]];
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.Mne = e.ConfigId;
    this.Wyg();
  }
  Wyg() {
    var e;
    var i = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(this.Mne);
    if (i) {
      this.GetText(1)?.ShowTextNew(i.DescriptionTitle);
      this.GetText(3)?.ShowTextNew(i.DescriptionText);
      this.LFg = 0;
      if (e = ModelManager_1.ModelManager.SpringManorModel?.ActivityData) {
        this.LFg = e.GetNextLockBookItemId(this.Mne);
      }
      this.GetButton(5)?.RootUIComp?.SetUIActive(this.LFg > 0);
      this.SetTextureByPath(i.ScreenIconDonePath, this.GetTexture(2));
      this.lqe?.SetTitle(i.DescriptionTitle);
    }
  }
  async L3g(e) {
    await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("None", "SpringManorBrochureCompletedView");
    await ModelManager_1.ModelManager.SpringManorModel?.TeleportPlayerToEntity(e);
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "SpringManorBrochureCompletedView");
    UiManager_1.UiManager.ResetToBattleView();
  }
}
exports.SpringManorBrochureCompletedView = SpringManorBrochureCompletedView;
//# sourceMappingURL=SpringManorBrochureCompletedView.js.map