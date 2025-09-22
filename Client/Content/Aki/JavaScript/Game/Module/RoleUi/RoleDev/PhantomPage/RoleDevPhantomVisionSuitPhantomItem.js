"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomVisionSuitPhantomItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevPhantomVisionSuitPhantomDisplayItem_1 = require("./RoleDevPhantomVisionSuitPhantomDisplayItem");
class RoleDevPhantomVisionSuitPhantomItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.nhd = undefined;
    this.Pe = undefined;
    this.DLu = undefined;
    this.p5t = () => {
      if (this.Pe && this.Pe.FetterGroupId > 0) {
        ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe.RoleId, 3, 18);
        this.Vad(this.Pe.FetterGroupId, this.Pe.RoleId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.P1d();
    await this.uCd();
  }
  P1d() {
    this.nhd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), () => new RoleDevPhantomVisionSuitPhantomDisplayItem_1.RoleDevPhantomVisionSuitPhantomDisplayItem());
  }
  async uCd() {
    this.DLu = new ButtonItem_1.ButtonItem();
    await this.DLu.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  Refresh(t) {
    this.Pe = t;
    this.DLu.SetFunction(this.p5t);
    this.DLu.SetLocalTextNew(this.Pe.ButtonName);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
    this.shd(t);
  }
  shd(t) {
    if (this.nhd && t.MonsterDataList) {
      this.nhd.RefreshByData(t.MonsterDataList);
    }
  }
  Vad(t, i) {
    UiManager_1.UiManager.OpenView("PhantomBattleFettersView", [t, i]);
  }
}
exports.RoleDevPhantomVisionSuitPhantomItem = RoleDevPhantomVisionSuitPhantomItem;
//# sourceMappingURL=RoleDevPhantomVisionSuitPhantomItem.js.map