"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalHeadPhotoComponent = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalRoleSmallItemGrid_1 = require("./PersonalRoleSmallItemGrid");
class PersonalHeadPhotoComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.PlayerHeadDataList = [];
    this.P7e = undefined;
    this.OnClickConfirm = () => {
      PersonalController_1.PersonalController.SendChangeHeadPhotoRequest(this.p3l.Id);
      UiManager_1.UiManager.CloseView("PersonalEditView");
      UiManager_1.UiManager.CloseView("PersonalOptionView");
    };
    this.Y5i = () => {
      var e = new PersonalRoleSmallItemGrid_1.PersonalRoleSmallItemGrid();
      e.BindToggleClickCallBack(this.sVi);
      return e;
    };
    this.sVi = e => {
      this.aVi(e);
    };
  }
  get p3l() {
    var e = this.xqe.GetGenericLayout().GetSelectedGridIndex();
    if (!(e < 0) && !(e >= this.PlayerHeadDataList.length)) {
      return this.PlayerHeadDataList[e];
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText]];
  }
  OnStart() {
    this.PlayerHeadDataList = ModelManager_1.ModelManager.PersonalModel.GetPlayerShowHeadDataList();
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.Y5i);
  }
  async OnBeforeShowAsyncImplement() {
    this.PlayerHeadDataList = ModelManager_1.ModelManager.PersonalModel.GetPlayerShowHeadDataList();
    if (this.PlayerHeadDataList.length > 0) {
      await this.xqe.RefreshByDataAsync(this.PlayerHeadDataList);
      const i = ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId();
      var e = this.PlayerHeadDataList.findIndex(e => e.Id === i);
      this.xqe.ScrollTo(this.xqe.GetItemByIndex(e));
      this.aVi(this.PlayerHeadDataList[e]);
    }
  }
  SetRefreshConfirmBtn(e) {
    this.P7e = e;
  }
  aVi(i) {
    var e = this.PlayerHeadDataList.findIndex(e => e === i);
    this.xqe?.GetGenericLayout()?.SelectGridProxy(e);
    var e = ModelManager_1.ModelManager.PersonalModel.GetHeadPhotoId();
    var t = !i.Lock && e !== i.Id;
    if (this.P7e) {
      this.P7e(t, e === i.Id);
    }
    const r = this.GetTexture(1);
    r.SetUIActive(false);
    this.SetTextureShowUntilLoaded(i.GetRoleHeadIconCircle(), r, () => {
      r.SetUIActive(true);
    });
    this.GetText(2).ShowTextNew(i.GetName());
    t = this.GetText(3);
    t.SetUIActive(i.Lock);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, i.Config.Tips);
  }
}
exports.PersonalHeadPhotoComponent = PersonalHeadPhotoComponent;
//# sourceMappingURL=PersonalHeadPhotoComponent.js.map