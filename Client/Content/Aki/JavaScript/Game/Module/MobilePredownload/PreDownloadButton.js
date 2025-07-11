"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreDownloadButtonItemB = exports.PreDownloadButtonItemA = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotController_1 = require("../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class PreDownloadButtonItemA extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.YP = () => {
      ControllerHolder_1.ControllerHolder.PreDownloadController.OnPreDownloadBtnClick(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  Refresh(e = false) {
    if (e && (ModelManager_1.ModelManager.PreDownloadModel.IsPreDownloadAvailable() || ModelManager_1.ModelManager.PreDownloadModel.IsComplete())) {
      this.SetUiActive(true);
      e = ModelManager_1.ModelManager.PreDownloadModel.IsComplete() ? "PreDownload_Complete_Btn_Text" : "PreDownload_Downloading_Btn_Text";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
    } else {
      this.SetUiActive(false);
    }
  }
  RefreshDot() {
    var e = ModelManager_1.ModelManager.PreDownloadModel.HasClickBtnCheck() && !ModelManager_1.ModelManager.PreDownloadModel.IsComplete();
    var o = ModelManager_1.ModelManager.PreDownloadModel.IsComplete();
    this.GetItem(2)?.SetUIActive(e);
    this.GetItem(3)?.SetUIActive(o);
  }
}
exports.PreDownloadButtonItemA = PreDownloadButtonItemA;
class PreDownloadButtonItemB extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Xxt = e;
    this.CreateThenShowByActor(this.Xxt.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  BindRedDot() {
    var e = this.GetItem(0);
    RedDotController_1.RedDotController.BindRedDot("PreDownload", e);
    var e = this.GetItem(1);
    RedDotController_1.RedDotController.BindRedDot("PreDownloadComplete", e);
  }
  UnBindRedDot() {
    var e = this.GetItem(0);
    RedDotController_1.RedDotController.UnBindGivenUi("PreDownload", e);
    var e = this.GetItem(1);
    RedDotController_1.RedDotController.UnBindGivenUi("PreDownloadComplete", e);
  }
}
exports.PreDownloadButtonItemB = PreDownloadButtonItemB;
//# sourceMappingURL=PreDownloadButton.js.map