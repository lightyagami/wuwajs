"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubPackageDownLoadClearTipsView = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class SubPackageDownLoadClearTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.uHe = () => {
      this.CloseMe();
    };
    this.L3e = () => {
      ControllerHolder_1.ControllerHolder.SubPackageController.DeleteUnneededResource(true);
      this.CloseMe();
    };
    this.kqe = e => {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadClearOnLogin, e === 1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [0, UE.UIText], [6, UE.UIExtendToggle], [7, UE.UIText], [8, UE.UIText]];
    this.BtnBindInfo = [[4, this.uHe], [5, this.L3e], [6, this.kqe]];
  }
  OnStart() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SubDownLoadClearOnLogin);
    this.GetExtendToggle(6).SetToggleState(e ? 1 : 0);
    var e = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageCanClearSpace();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "SubPackageDownLoad_Clear_Des", ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(e).toString());
    if (e > 0) {
      this.GetItem(3).SetUIActive(true);
      this.GetText(8).SetUIActive(false);
    } else {
      this.GetItem(3).SetUIActive(false);
      this.GetText(8).SetUIActive(true);
    }
  }
}
exports.SubPackageDownLoadClearTipsView = SubPackageDownLoadClearTipsView;
//# sourceMappingURL=SubPackageDownLoadClearTipsView.js.map