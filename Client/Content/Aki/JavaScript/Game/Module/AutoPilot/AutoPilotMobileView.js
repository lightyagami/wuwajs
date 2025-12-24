"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotMobileView = undefined;
const UE = require("ue");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const AutoPilotView_1 = require("./AutoPilotView");
class AutoPilotMobileView extends AutoPilotView_1.AutoPilotView {
  constructor() {
    super(...arguments);
    this.ORf = undefined;
    this.wIf = true;
    this.Cke = e => {
      this.wIf = !e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UITexture], [4, UE.UIButtonComponent], [5, UE.UISpriteTransition], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UITexture]];
  }
  GetSkipBtnCompId() {
    return 0;
  }
  GetRideShareBtnCompId() {
    return 6;
  }
  GetExitBtnCompId() {
    return 1;
  }
  GetPhotoBtnCompId() {
    return 4;
  }
  GetMovieBtnCompId() {
    return 2;
  }
  GetMovieBtnProgressCompId() {
    return 3;
  }
  InitUi() {
    super.InitUi();
    this.aPf();
  }
  InitUiItemAspectOffsetConfig() {
    var e = this.GetButton(0);
    if (ModelManager_1.ModelManager.AutoPilotModel.GetIsCanShowSkipBtn() && e) {
      this.UiItemOffsetConfig.push({
        UiItem: e.RootUIComp,
        OriginalOffset: Vector2D_1.Vector2D.Create(e.RootUIComp.GetAnchorOffsetX(), e.RootUIComp.GetAnchorOffsetY()),
        OffsetWidthDirection: -1,
        OffsetHeightDirection: -1
      });
    }
    var e = this.GetItem(7);
    if (e) {
      this.UiItemOffsetConfig.push({
        UiItem: e,
        OriginalOffset: Vector2D_1.Vector2D.Create(e.GetAnchorOffsetX(), e.GetAnchorOffsetY()),
        OffsetWidthDirection: -1,
        OffsetHeightDirection: 1
      });
    }
    var e = this.GetButton(1);
    if (e) {
      this.UiItemOffsetConfig.push({
        UiItem: e.RootUIComp,
        OriginalOffset: Vector2D_1.Vector2D.Create(e.RootUIComp.GetAnchorOffsetX(), e.RootUIComp.GetAnchorOffsetY()),
        OffsetWidthDirection: -1,
        OffsetHeightDirection: -1
      });
    }
  }
  HandleClickSkipBtn() {
    var e;
    if (ModelManager_1.ModelManager.AutoPilotModel?.IsSkipConfirmBoxShow) {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(180)).HasToggle = true;
      e.ToggleText = ConfigManager_1.ConfigManager.TextConfig.GetTextById("PlotSkipConfirmToggle");
      e.SetToggleFunction(this.Cke);
      e.FunctionMap.set(2, () => {
        ModelManager_1.ModelManager.AutoPilotModel.IsSkipConfirmBoxShow = this.wIf;
        ControllerHolder_1.ControllerHolder.AutoPilotController.SkipToTarget();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    } else {
      ControllerHolder_1.ControllerHolder.AutoPilotController.SkipToTarget();
    }
  }
  aPf() {
    this.ORf = this.GetTexture(8);
  }
  UpdateRideShareProgress(e) {
    this.ORf?.SetFillAmount(e);
  }
}
exports.AutoPilotMobileView = AutoPilotMobileView;
//# sourceMappingURL=AutoPilotMobileView.js.map