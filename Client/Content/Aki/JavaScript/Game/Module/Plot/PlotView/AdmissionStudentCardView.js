"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdmissionStudentCardView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const VAR_TEXTURE = "3_0入学拍照头像";
const VAR_ADDRESS = "3_0入学联系地址";
const FEMALE = "_F";
const MALE = "_M";
const UNKNOWN_BIRTHDAY = "StudentCard_Birthday_Unknow";
class AdmissionStudentCardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = new Array();
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    var i = ModelManager_1.ModelManager.WorldModel.GetWorldStateGeneric(VAR_TEXTURE);
    if (i) {
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1 ? i + MALE : i + FEMALE;
      i = CommonParamById_1.configCommonParamById.GetStringConfig(i);
      if (i) {
        const o = new CustomPromise_1.CustomPromise();
        e.push(o.Promise);
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.Texture2D, e => {
          if (e) {
            this.GetTexture(2).SetTexture(e);
          }
          o.SetResult();
        });
      }
    }
    var i = ModelManager_1.ModelManager.WorldModel.GetWorldStateGeneric(VAR_ADDRESS);
    var i = i ? CommonParamById_1.configCommonParamById.GetStringConfig(i) : undefined;
    if (i) {
      this.GetText(6).ShowTextNew(i);
    }
    var i = ModelManager_1.ModelManager.PersonalModel.GetBirthday();
    if (i > 0) {
      r = Math.floor(i / 100);
      i = i % 100;
      r = ConfigManager_1.ConfigManager.PersonalConfig.GetBirthLocalText(r, 1);
      i = ConfigManager_1.ConfigManager.PersonalConfig.GetBirthLocalText(i, 0);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "BirthDay", r, i);
    } else {
      this.GetText(5).ShowTextNew(UNKNOWN_BIRTHDAY);
    }
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerName();
    this.GetText(3).SetText(r);
    await Promise.all(e);
  }
}
exports.AdmissionStudentCardView = AdmissionStudentCardView;
//# sourceMappingURL=AdmissionStudentCardView.js.map