"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponPreviewView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const WeaponController_1 = require("../WeaponController");
const WeaponDetailTipsComponent_1 = require("../WeaponDetailTipsComponent");
const WeaponListComponent_1 = require("../WeaponListComponent");
const WeaponSkinDefine_1 = require("../../Skin/Tab/Weapon/WeaponSkinDefine");
class WeaponPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.q2i = undefined;
    this.G2i = undefined;
    this.lqe = undefined;
    this.Vjs = true;
    this.AMo = () => {
      UiManager_1.UiManager.CloseView("WeaponPreviewView");
    };
    this.k2i = () => {
      let e = this.G2i.GetCurSelectedData();
      var i;
      var t = e.GetFullLevelWeaponData();
      if (t === undefined) {
        this.lqe.SetToggleVisible(false);
      } else {
        this.lqe.SetToggleVisible(true);
        i = this.lqe.GetToggleState() === 1;
        e = i ? t : e;
      }
      this.q2i.UpdateComponent(e);
      WeaponController_1.WeaponController.OnSelectedWeaponChange(e, this.N2i, this.O2i, WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID, this.Vjs);
    };
    this.N2i = undefined;
    this.O2i = undefined;
    this.cea = e => {
      let i = this.G2i.GetCurSelectedData();
      var t = i.GetFullLevelWeaponData();
      if (e === 1 && t) {
        i = t;
      }
      this.q2i.UpdateComponent(i);
      WeaponController_1.WeaponController.OnSelectedWeaponChange(i, this.N2i, this.O2i, WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID, this.Vjs);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent]];
  }
  async OnBeforeStartAsync() {
    this.q2i = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent();
    await this.q2i.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.q2i.SetCanShowEquip(false);
    this.G2i = new WeaponListComponent_1.WeaponListComponent();
    this.G2i.Init(this.GetScrollViewWithScrollbar(2));
    this.G2i.SetWeaponChangeCallBack(this.k2i);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1));
    await this.lqe.CreateToggleTab(this.cea);
    this.lqe.SetToggleName("PrefabTextItem_3652268202_Text");
    this.lqe.SetCloseCallBack(this.AMo);
    var e = this.OpenParam.WeaponDataList;
    if (e && e.length !== 0) {
      await this.G2i.UpdateDataList(e);
    }
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
    var e = this.OpenParam;
    this.G2i?.SetCurSelect(e.SelectedIndex);
  }
  OnAfterHide() {
    this.G2i?.CancelSelect();
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(0);
  }
  OnBeforeCreate() {
    var e = this.OpenParam?.WeaponObservers;
    if (e) {
      this.N2i = e.WeaponObserver;
      this.O2i = e.WeaponScabbardObserver;
    } else {
      this.N2i = UiSceneManager_1.UiSceneManager.InitWeaponObserver(this.Vjs);
      this.O2i = UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver();
    }
  }
  OnBeforeDestroy() {
    if (!this.OpenParam?.WeaponObservers) {
      UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.N2i);
      this.N2i = undefined;
      UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.O2i);
      this.O2i = undefined;
    }
  }
}
exports.WeaponPreviewView = WeaponPreviewView;
//# sourceMappingURL=WeaponPreviewView.js.map