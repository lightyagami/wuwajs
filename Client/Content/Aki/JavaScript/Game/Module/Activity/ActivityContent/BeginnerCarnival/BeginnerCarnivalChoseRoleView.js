"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BeginnerCarnivalChoseRoleView = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid"),
  RoleController_1 = require("../../../RoleUi/RoleController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  BeginnerCarnivalController_1 = require("./BeginnerCarnivalController");
class BeginnerCarnivalChoseRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.dFe = 0, this.zjt = void 0, this.eWt = void 0, this.L3e = () => {
      this.dFe !== BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().ChoseRoleId && BeginnerCarnivalController_1.BeginnerCarnivalController.NewbieCarnivalSwitchRoleRequest(this.dFe), this.CloseMe()
    }, this.nWt = () => {
      var i = new RoleSelectItem;
      return i.ToggleCallBack = this.sWt, i.CanToggleChange = this.Bpt, i
    }, this.sWt = (i, e) => {
      this.zjt?.GetGenericLayout()?.SelectGridProxy(i), this.aWt(e), this.dFe = e
    }, this.Bpt = i => {
      return i !== this.zjt?.GetGenericLayout()?.GetSelectedGridIndex()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [5, this.L3e]
    ]
  }
  async OnBeforeStartAsync() {
    this.eWt = new SmallItemGrid_1.SmallItemGrid, await this.eWt.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.zjt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.nWt)
  }
  OnStart() {
    const t = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalParam(BeginnerCarnivalController_1.BeginnerCarnivalController.ActivityId)?.Roles ?? [];
    this.zjt?.RefreshByData(t, () => {
      var i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().ChoseRoleId,
        i = t.indexOf(i),
        e = this.zjt.GetGenericLayout(),
        i = Math.max(i, 0);
      e.SelectGridProxy(i), this.aWt(t[i]), this.dFe = t[i]
    }), BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().SetChoseRoleViewEnter()
  }
  aWt(i) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i),
      e = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Name), {
        Data: void 0,
        Type: 2,
        ItemConfigId: i
      });
    this.eWt?.Apply(e)
  }
}
exports.BeginnerCarnivalChoseRoleView = BeginnerCarnivalChoseRoleView;
class RoleSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.dFe = 0, this.$be = void 0, this.ToggleCallBack = void 0, this.CanToggleChange = void 0, this.N8e = () => {
      this.ToggleCallBack?.(this.GridIndex, this.dFe)
    }, this.Ijt = () => {
      var i = [ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalRole(this.dFe)?.TrialRoleId ?? 0];
      RoleController_1.RoleController.OpenRoleMainView(1, 0, i)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [4, UE.UIHorizontalLayout],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem]
    ], this.BtnBindInfo = [
      [8, this.Ijt],
      [0, this.N8e]
    ]
  }
  OnStart() {
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(4)), this.GetExtendToggle(0)?.CanExecuteChange.Bind(() => !this.CanToggleChange || this.CanToggleChange(this.GridIndex)), this.GetText(6).SetUIActive(!1)
  }
  Refresh(i, e, t) {
    this.dFe = i, this.GetItem(9)?.SetUIActive(this.dFe === BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().ChoseRoleId);
    var i = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalRole(this.dFe),
      r = (this.SetTextureByPath(i.HeadCard, this.GetTexture(1)), ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe)),
      s = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), r.Name), this.GetItem(2)?.SetUIActive(!0), ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(r.ElementId)),
      s = s.Icon5,
      s = (this.SetElementIcon(s, this.GetTexture(3), r.ElementId), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.DesText), r.QualityId);
    this.$be?.RebuildLayout(s), e ? this.GetExtendToggle(0)?.SetToggleState(1) : this.GetExtendToggle(0)?.SetToggleState(0)
  }
  OnSelected(i) {
    this.GetExtendToggle(0)?.SetToggleState(1)
  }
  OnDeselected(i) {
    this.GetExtendToggle(0)?.SetToggleState(0)
  }
}
//# sourceMappingURL=BeginnerCarnivalChoseRoleView.js.map