"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayAttachmentBigImgView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class InfoDisplayAttachmentBigImgView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.QKf = "Image";
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIButtonComponent], [2, UE.SpineSkeletonAnimationComponent], [3, UE.UIItem], [4, UE.UITexture]];
    this.BtnBindInfo = [[1, this.Jvt]];
  }
  async OnBeforeStartAsync() {
    this.QKf = ModelManager_1.ModelManager.InfoDisplayModel.GetCurrentShowAttachmentType();
    this.GetTexture(0).SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    this.GetTexture(4).SetUIActive(false);
    switch (this.QKf) {
      case "Image":
        this.GetTexture(0).SetUIActive(true);
        this.GetTexture(4).SetUIActive(true);
        var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentCurrentInformationTexture();
        var s = this.GetTexture(0);
        this.SetTextureByPath(e, s);
        break;
      case "Spine":
        this.GetItem(3).SetUIActive(true);
        e = ModelManager_1.ModelManager.InfoDisplayModel.GetCurrentShowSpineAtlasPath();
        s = ModelManager_1.ModelManager.InfoDisplayModel.GetCurrentShowSpineDataPath();
        await this.SetSpineAssetByPath(e, s, this.GetSpine(2)).then(() => {
          var e = ModelManager_1.ModelManager.InfoDisplayModel.GetAnimName();
          var s = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinString));
          this.GetSpine(2)?.GetAnimations(s);
          var s = (0, puerts_1.$unref)(s);
          if (s && s.Num() > 0) {
            if (s.Contains(e)) {
              this.GetSpine(2).SetAnimation(0, e, true);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("PhoneSystem", 43, `[Spine异常]Spine骨骼资源中不支持该动画名： ${e}, 
                            请检查资源是否为通用资源（通用资源强制使用"idle"）,
                            请检查男女查分是否正确`);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhoneSystem", 43, "[Spine异常]Spine骨骼资源中动画名列表无法获取，或为空列表，请检查！");
          }
        });
    }
  }
}
exports.InfoDisplayAttachmentBigImgView = InfoDisplayAttachmentBigImgView;
//# sourceMappingURL=InfoDisplayAttachmentBigImgView.js.map