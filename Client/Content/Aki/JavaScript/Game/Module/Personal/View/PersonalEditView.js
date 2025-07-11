"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalEditView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PersonalCardComponent_1 = require("./PersonalCardComponent");
const PersonalEditTabItem_1 = require("./PersonalEditTabItem");
const PersonalHeadPhotoComponent_1 = require("./PersonalHeadPhotoComponent");
const PersonalPlayerTitleComponent_1 = require("./PersonalPlayerTitleComponent");
class PersonalEditView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.tVi = 0;
    this.B7t = undefined;
    this.z5i = undefined;
    this.Z5i = undefined;
    this.Yac = undefined;
    this.p5i = undefined;
    this.m8t = undefined;
    this.zac = () => {
      var t = new PersonalEditTabItem_1.PersonalEditTabItem();
      t.SetToggleCallBack(this.TabItemToggleClick);
      return t;
    };
    this.TabItemToggleClick = (t, e) => {
      this.B7t.SelectGridProxy(t);
      this.ShowContent(e);
    };
    this.RefreshBtnConfirm = (t, e) => {
      this.GetInteractionGroup(5).SetInteractable(t);
      let i = "";
      i = this.tVi === 2 ? e ? "Text_PhantomTakeOff_Text" : "ConfirmBox_173_ButtonText_1" : e ? "Text_InUse_Text" : "ConfirmBox_173_ButtonText_1";
      this.m8t.SetLocalTextNew(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIInteractionGroup]];
  }
  async OnBeforeStartAsync() {
    this.tVi = this.OpenParam;
    this.p5i = ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData();
    this.m8t = new ButtonItem_1.ButtonItem(this.GetButton(3).RootUIComp);
    this.B7t = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.zac);
    var t = [];
    t.push(0);
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10061);
    if (e) {
      t.push(1);
    }
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10082);
    if (e) {
      t.push(2);
    }
    await this.B7t.RefreshByDataAsync(t);
    var e = t.findIndex(t => t === this.tVi);
    this.B7t.SelectGridProxy(e = e < 0 ? 0 : e);
    await this.ShowContent(this.tVi);
  }
  async ShowContent(t) {
    this.tVi = t;
    this.Z5i?.SetActive(false);
    this.z5i?.SetActive(false);
    this.Yac?.SetActive(false);
    switch (t) {
      case 0:
        if (this.Z5i) {
          this.Z5i.SetActive(true);
        } else {
          this.Z5i = new PersonalHeadPhotoComponent_1.PersonalHeadPhotoComponent();
          this.Z5i.SetRefreshConfirmBtn(this.RefreshBtnConfirm);
          await this.Z5i.CreateThenShowByResourceIdAsync("UiItem_EditHead", this.GetItem(4));
        }
        this.m8t?.SetFunction(this.Z5i.OnClickConfirm);
        break;
      case 1:
        if (this.z5i) {
          this.z5i.SetActive(true);
        } else {
          this.z5i = new PersonalCardComponent_1.PersonalCardComponent(undefined, false, this.p5i);
          this.z5i.SetRefreshConfirmBtn(this.RefreshBtnConfirm);
          await this.z5i.CreateThenShowByResourceIdAsync("UiItem_EditCard", this.GetItem(4));
        }
        this.m8t?.SetFunction(this.z5i.OnClickConfirm);
        break;
      case 2:
        if (this.Yac) {
          this.Yac.SetActive(true);
        } else {
          this.Yac = new PersonalPlayerTitleComponent_1.PersonalPlayerTitleComponent();
          this.Yac.SetPersonalInfoData(this.p5i);
          this.Yac.SetRefreshConfirmBtn(this.RefreshBtnConfirm);
          await this.Yac.CreateThenShowByResourceIdAsync("UiItem_EditTitles", this.GetItem(4));
        }
        this.m8t?.SetFunction(this.Yac.OnClickConfirm);
    }
    this.UpdateCollectNum();
  }
  UpdateCollectNum() {
    let t = 0;
    switch (this.tVi) {
      case 0:
        t = ModelManager_1.ModelManager.PersonalModel.GetUnlockHeadNum();
        break;
      case 1:
        t = this.p5i.GetUnlockCardDataCount();
        break;
      case 2:
        t = ModelManager_1.ModelManager.PersonalModel.GetUnlockTitleDataCount();
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "Collected", t);
  }
  OnClickedConfirm() {}
  OnBeforeDestroy() {
    this.Z5i?.Destroy();
    this.Z5i = undefined;
    this.z5i?.Destroy();
    this.z5i = undefined;
    this.Yac?.Destroy();
    this.Yac = undefined;
  }
}
exports.PersonalEditView = PersonalEditView;
//# sourceMappingURL=PersonalEditView.js.map