"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerTeamPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const EditFormationController_1 = require("../../EditFormation/EditFormationController");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ShipTowerRoleGrid_1 = require("./ShipTowerRoleGrid");
const ShipTowerRoleTeamItem_1 = require("./ShipTowerRoleTeamItem");
const ShipTowerTeamTabItem_1 = require("./ShipTowerTeamTabItem");
class ShipTowerTeamPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Ivt = undefined;
    this.I6e = 0;
    this.vNt = undefined;
    this.Flo = undefined;
    this.Ea_ = undefined;
    this.Vlo = [];
    this.Ia_ = undefined;
    this.Ns_ = undefined;
    this.os_ = undefined;
    this.RoleSelectCallBack = undefined;
    this.TeamSelectCallBack = undefined;
    this.e7_ = undefined;
    this.EmptyStateItem = undefined;
    this.RoleListUpdateCallback = undefined;
    this.fqe = () => {
      return new ShipTowerTeamTabItem_1.ShipTowerTeamTabItem();
    };
    this.KOl = e => {
      if (!this.IsStartOrStarting) {
        this.I6e = e;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("ShipTower", 69, "二级页签点击回调: " + this.I6e);
        }
        switch (this.I6e) {
          case 0:
            this.Hlo();
            break;
          case 1:
            this.Ta_();
        }
      }
    };
    this.Gua = (e, i, t) => {
      this.Vlo = e;
      this.Flo?.RefreshByData(this.Vlo);
      this.EmptyStateItem?.SetUIActive(this.Vlo.length <= 0);
      this.RoleListUpdateCallback?.();
    };
    this.cHe = () => {
      var e = new ShipTowerRoleGrid_1.ShipTowerRoleGrid();
      e.BindOnExtendToggleStateChanged(this.ToggleFunction);
      e.BindOnCanExecuteChange(this.CanExecuteChangeFunction);
      return e;
    };
    this.ba_ = () => {
      var e = new ShipTowerRoleTeamItem_1.ShipTowerRoleTeamItem();
      e.OnClickCallback = this.TeamSelectCallBack;
      e.StageData = this.Ns_;
      return e;
    };
    this.ToggleFunction = e => {
      var i = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      var t = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet;
      var r = e.Data;
      var e = e.State === 1;
      if (e) {
        for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
          const o = this.e7_.GetRoleIndexInAllTeam(e);
          if (!i.has(o)) {
            i.set(o, r);
            t.add(r.GetDataId());
            break;
          }
        }
      } else {
        for (const s of i) {
          if (s[1] === r) {
            i.delete(s[0]);
            t.delete(r.GetDataId());
            break;
          }
        }
      }
      const o = this.Vlo.indexOf(r);
      this.RoleSelectCallBack?.(r);
      this.Flo.GetScrollItemByIndex(o)?.Refresh(r, e, o);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, "ToggleFunction", ["", this.Ns_.Id]);
      }
    };
    this.CanExecuteChangeFunction = (e, i, t) => {
      return !!ModelManager_1.ModelManager.ShipTowerModel.IsOtherTeamRoleData(e.GetDataId()) || t !== 0 || !this.t7_() || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamRoleFull"), false);
    };
    this.bZc = () => {
      EditFormationController_1.EditFormationController.OpenEditFormationView(false);
    };
  }
  async Init(e, i) {
    this.Ns_ = i;
    await this.CreateByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.bZc]];
  }
  async OnBeforeStartAsync() {
    this.Ivt = new TabComponent_1.TabComponent(this.GetItem(0), this.fqe, this.KOl, undefined);
    this.Vlo = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    this.vNt = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(3), this.Gua);
    this.vNt?.UpdateData(38, this.Vlo);
    this.Flo = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.cHe);
    this.Ea_ = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.ba_);
    this.os_ = ModelManager_1.ModelManager.ShipTowerModel.GetTeamTabList();
    await this.Ivt.RefreshTabItemByLengthAsync(this.os_.length);
    this.La_();
  }
  La_() {
    var e;
    var i;
    for ([e, i] of this.Ivt.GetTabItemMap()) {
      i.UpdateName(this.os_[e].Title);
    }
    this.Ivt.SelectToggleByIndex(0, true);
  }
  OnBeforeShow() {
    this.KOl(this.I6e);
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerTeamPanelShown);
  }
  UpdateViewAndShow(e) {
    this.e7_ = e;
    if (this.GetActive()) {
      this.KOl(this.I6e);
    } else {
      this.SetActive(true);
    }
  }
  OnBeforeDestroy() {
    this.Ivt = undefined;
    this.vNt = undefined;
  }
  UpdateRoleListByMainRoleChange() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    this.vNt?.UpdateData(38, e);
    this.Ia_ &&= ModelManager_1.ModelManager.ShipTowerModel.GetPlayerTeamList();
  }
  Hlo() {
    this.GetScrollViewWithScrollbar(2).RootUIComp.SetUIActive(true);
    this.GetScrollViewWithScrollbar(1).RootUIComp.SetUIActive(false);
    this.vNt?.SetActive(true);
    this.GetButton(4).RootUIComp.SetUIActive(false);
    this.UpdateRoleListFilter();
  }
  UpdateRoleListFilter() {
    var e = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(38);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFilterDataUpdate, e);
  }
  Ta_() {
    this.GetScrollViewWithScrollbar(2).RootUIComp.SetUIActive(false);
    this.GetScrollViewWithScrollbar(1).RootUIComp.SetUIActive(true);
    this.vNt?.SetActive(false);
    this.GetButton(4).RootUIComp.SetUIActive(true);
    this.Ia_ = ModelManager_1.ModelManager.ShipTowerModel.GetPlayerTeamList();
    this.Ea_?.SelectGridProxy(-1);
    this.OnlyUpdateTeamList();
  }
  OnlyUpdateTeamList() {
    this.Ea_?.RefreshByData(this.Ia_);
    this.EmptyStateItem?.SetUIActive(false);
  }
  UpdateTeamListByIndex(e) {
    this.Ea_?.GetScrollItemByIndex(e)?.Refresh(this.Ia_[e]);
  }
  t7_() {
    for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      var i = this.e7_.GetRoleIndexInAllTeam(e);
      if (!ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.has(i)) {
        return false;
      }
    }
    return true;
  }
  GetRoleIdList() {
    return this.Vlo.map(e => e.GetDataId());
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i = this.Ivt?.GetTabItemByIndex(1)?.GetRootItem();
    if (i) {
      return [i, i];
    } else {
      return undefined;
    }
  }
}
exports.ShipTowerTeamPanel = ShipTowerTeamPanel;
//# sourceMappingURL=ShipTowerTeamPanel.js.map