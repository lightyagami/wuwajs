"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeginnerCarnivalChoseRoleView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const RoleController_1 = require("../../../RoleUi/RoleController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const SimpleGenericLayout_1 = require("../../../Util/Layout/SimpleGenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const BeginnerCarnivalController_1 = require("./BeginnerCarnivalController");
class BeginnerCarnivalChoseRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.zjt = undefined;
    this.eWt = undefined;
    this.L3e = () => {
      if (this.dFe !== BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().ChoseRoleId) {
        BeginnerCarnivalController_1.BeginnerCarnivalController.NewbieCarnivalSwitchRoleRequest(this.dFe);
      }
      this.CloseMe();
    };
    this.nWt = () => {
      var i = new RoleSelectItem();
      i.ToggleCallBack = this.sWt;
      i.CanToggleChange = this.Bpt;
      return i;
    };
    this.sWt = (i, e) => {
      this.zjt?.GetGenericLayout()?.SelectGridProxy(i);
      this.aWt(e);
      this.dFe = e;
    };
    this.Bpt = i => {
      return i !== this.zjt?.GetGenericLayout()?.GetSelectedGridIndex();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.L3e]];
  }
  async OnBeforeStartAsync() {
    this.eWt = new SmallItemGrid_1.SmallItemGrid();
    await this.eWt.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.zjt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.nWt);
  }
  OnStart() {
    const t = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalParam(BeginnerCarnivalController_1.BeginnerCarnivalController.ActivityId)?.Roles ?? [];
    this.zjt?.RefreshByData(t, () => {
      var i = BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().ChoseRoleId;
      var i = t.indexOf(i);
      var e = this.zjt.GetGenericLayout();
      var i = Math.max(i, 0);
      e.SelectGridProxy(i);
      this.aWt(t[i]);
      this.dFe = t[i];
    });
    BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().SetChoseRoleViewEnter();
  }
  aWt(i) {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Name);
    var e = {
      Data: undefined,
      Type: 2,
      ItemConfigId: i
    };
    this.eWt?.Apply(e);
  }
}
exports.BeginnerCarnivalChoseRoleView = BeginnerCarnivalChoseRoleView;
class RoleSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.$be = undefined;
    this.ToggleCallBack = undefined;
    this.CanToggleChange = undefined;
    this.N8e = () => {
      this.ToggleCallBack?.(this.GridIndex, this.dFe);
    };
    this.Ijt = () => {
      var i = [ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalRole(this.dFe)?.TrialRoleId ?? 0];
      RoleController_1.RoleController.OpenRoleMainView(1, 0, i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIHorizontalLayout], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem]];
    this.BtnBindInfo = [[8, this.Ijt], [0, this.N8e]];
  }
  OnStart() {
    this.$be = new SimpleGenericLayout_1.SimpleGenericLayout(this.GetHorizontalLayout(4));
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(() => !this.CanToggleChange || this.CanToggleChange(this.GridIndex));
    this.GetText(6).SetUIActive(false);
  }
  Refresh(i, e, t) {
    this.dFe = i;
    this.GetItem(9)?.SetUIActive(this.dFe === BeginnerCarnivalController_1.BeginnerCarnivalController.GetBeginnerCarnivalData().ChoseRoleId);
    var i = ConfigManager_1.ConfigManager.BeginnerCarnivalConfig.GetNewbieCarnivalRole(this.dFe);
    this.SetTextureByPath(i.HeadCard, this.GetTexture(1));
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), r.Name);
    this.GetItem(2)?.SetUIActive(true);
    var s = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(r.ElementId);
    var s = s.Icon5;
    this.SetElementIcon(s, this.GetTexture(3), r.ElementId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.DesText);
    var s = r.QualityId;
    this.$be?.RebuildLayout(s);
    if (e) {
      this.GetExtendToggle(0)?.SetToggleState(1);
    } else {
      this.GetExtendToggle(0)?.SetToggleState(0);
    }
  }
  OnSelected(i) {
    this.GetExtendToggle(0)?.SetToggleState(1);
  }
  OnDeselected(i) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
}
//# sourceMappingURL=BeginnerCarnivalChoseRoleView.js.map