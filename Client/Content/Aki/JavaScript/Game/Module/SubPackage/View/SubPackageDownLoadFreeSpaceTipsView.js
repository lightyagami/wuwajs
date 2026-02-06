"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubPackageDownLoadFreeSpaceTipsView = undefined;
const UE = require("ue");
const VideoResUpdate_1 = require("../../../../Launcher/DiffPatch/Update/VideoResUpdate");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class SubPackageDownLoadFreeSpaceTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.KFm = 0;
    this.uHe = () => {
      this.CloseMe();
    };
    this.L3e = () => {
      var e = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
      if (ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageSpace(this.KFm) - ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageHaveDownLoadSpace(this.KFm) < e) {
        ControllerHolder_1.ControllerHolder.SubPackageController.PrioritySubPackageDownLoading([this.KFm]);
        this.CloseMe();
      } else {
        this.Og();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIText]];
    this.BtnBindInfo = [[2, this.uHe], [3, this.L3e]];
  }
  OnStart() {
    this.KFm = this.OpenParam;
    if (this.KFm) {
      this.Og();
    }
    ModelManager_1.ModelManager.SubPackageDownLoadModel.HaveTipsOutOfSpaceList.push(this.KFm);
    var e = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageSpace(this.KFm) - ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageHaveDownLoadSpace(this.KFm);
    ControllerHolder_1.ControllerHolder.SubPackageController.ReportSubPackageOutOfSpaceLogEvent(this.KFm, e, VideoResUpdate_1.VideoResUpdate.GetFreeSpace());
  }
  OnBeforeShow() {
    this.ChildPopView?.PopItem?.SetBackBtnShowState(false);
  }
  Og() {
    var e = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageSpace(this.KFm) - ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageHaveDownLoadSpace(this.KFm);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "DownLoadText_NeedSpace", ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(e));
    var e = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "DownLoadText_LeftSpace", `<color=#c25757>${ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(e)}</color>`);
  }
}
exports.SubPackageDownLoadFreeSpaceTipsView = SubPackageDownLoadFreeSpaceTipsView;
//# sourceMappingURL=SubPackageDownLoadFreeSpaceTipsView.js.map