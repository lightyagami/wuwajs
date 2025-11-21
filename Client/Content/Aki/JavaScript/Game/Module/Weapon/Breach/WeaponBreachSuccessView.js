"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponBreachSuccessView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiInteractLogReport_1 = require("../../../Ui/LogReport/UiInteractLogReport");
const UiManager_1 = require("../../../Ui/UiManager");
const StarItem_1 = require("../../RoleUi/View/StarItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class WeaponBreachSuccessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.StarLayout = undefined;
    this.SuccessStarItem = undefined;
    this.DOo = 0;
    this.vke = () => {
      return new StarItem_1.StarItem();
    };
    this.qAt = () => {
      UiInteractLogReport_1.UiInteractLogReport.ReportSpaceKeyInteract(9);
      if (UiManager_1.UiManager.IsViewShow(this.Info.Name)) {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[1, this.qAt]];
  }
  async OnBeforeStartAsync() {
    this.DOo = this.OpenParam;
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
    this.StarLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.vke);
    var t = e.GetWeaponConfig();
    var t = t.BreachId;
    var i = e.GetBreachLevel();
    var r = i - 1;
    var i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t, i);
    var r = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t, r);
    this.GetText(2).SetText(r.LevelLimit.toString());
    this.GetText(3).SetText(i.LevelLimit.toString());
    var r = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(t);
    await this.UpdateStar(e.GetBreachLevel(), r);
  }
  OnAfterPlayStartSequence() {
    this.SuccessStarItem?.PlayActiveSequence();
    this.UiViewSequence.PlaySequencePurely("Loop");
  }
  async UpdateStar(e, t) {
    var i = e - 1;
    if (!(i < 0)) {
      var r = new Array(t);
      for (let e = 0; e < t; ++e) {
        var a = {
          StarOnActive: e < i,
          StarOffActive: e >= i,
          StarNextActive: false,
          StarLoopActive: false,
          PlayLoopSequence: false,
          PlayActivateSequence: false
        };
        r[e] = a;
      }
      await this.StarLayout.RefreshByDataAsync(r);
      this.SuccessStarItem = this.StarLayout.GetLayoutItemByIndex(i);
    }
  }
}
exports.WeaponBreachSuccessView = WeaponBreachSuccessView;
//# sourceMappingURL=WeaponBreachSuccessView.js.map