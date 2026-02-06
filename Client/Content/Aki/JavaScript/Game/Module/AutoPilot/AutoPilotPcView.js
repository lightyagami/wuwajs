"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotPcView = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const AutoPilotView_1 = require("./AutoPilotView");
class AutoPilotPcView extends AutoPilotView_1.AutoPilotView {
  constructor() {
    super(...arguments);
    this.n7m = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UITexture], [3, UE.UISpriteTransition], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIItem]];
  }
  GetSkipBtnCompId() {
    return 4;
  }
  GetRideShareBtnCompId() {
    return 6;
  }
  GetExitBtnCompId() {
    return 7;
  }
  GetPhotoBtnCompId() {
    return 0;
  }
  GetMovieBtnCompId() {
    return 1;
  }
  GetMovieBtnProgressCompId() {
    return 2;
  }
  InitUi() {
    super.InitUi();
    this.xkf();
  }
  InitUiItemAspectOffsetConfig() {
    var e = this.GetItem(8);
    if (e) {
      e = {
        UiItem: e,
        OriginalOffset: Vector2D_1.Vector2D.Create(e.GetAnchorOffsetX(), e.GetAnchorOffsetY()),
        OffsetWidthDirection: -1,
        OffsetHeightDirection: 1
      };
      this.UiItemOffsetConfig.push(e);
    }
  }
  HandleClickSkipBtn() {
    ControllerHolder_1.ControllerHolder.AutoPilotController.SkipToTarget();
  }
  xkf() {
    this.n7m = this.GetButton(5);
    this.n7m?.OnClickCallBack.Bind(this.OnClickPhotoBtn);
  }
  RefreshUiVisible() {
    super.RefreshUiVisible();
    this.Bkf();
  }
  RefreshUiByIsMovieModeHideUi() {
    super.RefreshUiByIsMovieModeHideUi();
    this.Bkf();
  }
  RefreshUiByIsInMovieMode() {
    super.RefreshUiByIsInMovieMode();
    this.RefreshPhotoBtnVisible();
    this.Bkf();
  }
  Bkf() {
    var e = ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode();
    this.n7m?.RootUIComp?.SetUIActive(e && !this.IsMovieModeHideUi);
  }
  RefreshPhotoBtnVisible() {
    var e = ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode();
    this.PhotoBtn?.RootUIComp?.SetUIActive(!e);
  }
}
exports.AutoPilotPcView = AutoPilotPcView;
//# sourceMappingURL=AutoPilotPcView.js.map