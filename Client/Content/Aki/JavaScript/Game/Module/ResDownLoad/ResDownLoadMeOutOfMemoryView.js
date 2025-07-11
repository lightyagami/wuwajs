"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResDownLoadMeOutOfMemoryView = undefined;
const UE = require("ue");
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const HotFixManager_1 = require("../../../Launcher/Ui/HotFix/HotFixManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class ResDownLoadMeOutOfMemoryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.L3e = () => {
      ModelManager_1.ModelManager.QuestResourceModel.UserClickOutOfMemoryView(true);
    };
    this.uHe = () => {
      this.CloseMe();
      ModelManager_1.ModelManager.QuestResourceModel.UserClickOutOfMemoryView(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[4, UE.UIText], [5, UE.UIText], [0, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[2, this.uHe], [3, this.L3e]];
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    var e = Number(VideoResUpdate_1.VideoResUpdate.GetVideoResSize(5));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "DownLoadText_NeedSpace", HotFixManager_1.HotFixManager.ByteConverter(e));
    var e = VideoResUpdate_1.VideoResUpdate.GetFreeSpace();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "DownLoadText_LeftSpace", `<color=#c25757>${HotFixManager_1.HotFixManager.ByteConverter(e)}</color>`);
  }
}
exports.ResDownLoadMeOutOfMemoryView = ResDownLoadMeOutOfMemoryView;
//# sourceMappingURL=ResDownLoadMeOutOfMemoryView.js.map