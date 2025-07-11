"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassWeaponView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WeaponController_1 = require("../../../../Module/Weapon/WeaponController");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const WeaponSkinDefine_1 = require("../../../Skin/Tab/Weapon/WeaponSkinDefine");
const WeaponDetailTipsComponent_1 = require("../../../Weapon/WeaponDetailTipsComponent");
const WeaponListComponent_1 = require("../../../Weapon/WeaponListComponent");
class BattlePassWeaponView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.q2i = undefined;
    this.G2i = undefined;
    this.N2i = undefined;
    this.O2i = undefined;
    this.Eya = 1;
    this.k2i = () => {
      let e = this.G2i.GetCurSelectedData();
      var i;
      var t = e.GetFullLevelWeaponData();
      if (t !== undefined) {
        i = this.Eya === 1;
        e = i ? t : e;
      }
      this.q2i.UpdateComponent(e);
      WeaponController_1.WeaponController.OnSelectedWeaponChange(e, this.N2i, this.O2i, WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID, true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent]];
  }
  async OnBeforeStartAsync() {
    this.q2i = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent();
    this.G2i = new WeaponListComponent_1.WeaponListComponent();
    this.G2i.Init(this.GetScrollViewWithScrollbar(1));
    this.G2i.SetWeaponChangeCallBack(this.k2i);
    var e = ModelManager_1.ModelManager.BattlePassModel.GetWeaponDataList();
    await Promise.all([this.q2i.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.G2i.UpdateDataList(e)]);
    this.q2i.SetCanShowEquip(false);
    var e = this.ExtraParams;
    this.N2i = e.WeaponObserver;
    this.O2i = e.WeaponScabbardObserver;
  }
  OnBeforeShow() {
    this.G2i?.SetCurSelect(0);
  }
  OnAfterHide() {
    this.G2i?.CancelSelect();
  }
  OnClickFullLevelToggle(e) {
    this.RefreshToggleState(e);
  }
  RefreshToggleState(i) {
    if (i !== this.Eya && (this.Eya = i, this.IsShowOrShowing)) {
      let e = this.G2i.GetCurSelectedData();
      var t = e.GetFullLevelWeaponData();
      if (i === 1 && t) {
        e = t;
      }
      this.q2i.UpdateComponent(e);
      WeaponController_1.WeaponController.OnSelectedWeaponChange(e, this.N2i, this.O2i, WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID, true);
    }
  }
}
exports.BattlePassWeaponView = BattlePassWeaponView;
//# sourceMappingURL=BattlePassWeaponView.js.map