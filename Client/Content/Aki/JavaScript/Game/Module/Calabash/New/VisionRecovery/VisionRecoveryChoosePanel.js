"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoveryChoosePanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent");
const ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool");
class VisionRecoveryChoosePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.UiViewSequence = undefined;
    this.Fvt = undefined;
    this.Vvt = undefined;
    this.Mpt = undefined;
    this.vpt = undefined;
    this.Hvt = undefined;
    this.jvt = undefined;
    this.d3a = undefined;
    this.OnClickMask = () => {
      this.GetItem(3).SetUIActive(false);
      this.GetButton(2).RootUIComp.SetUIActive(false);
    };
    this.OnClickCloseBtn = () => {
      if (this.Hvt) {
        this.Hvt();
      } else {
        this.SetActive(false);
      }
    };
    this.OnClickSelectAllToggle = e => {
      if (this.d3a) {
        this.d3a(e);
      }
    };
    this.Wvt = (e, t) => {
      e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e, t);
      this.ShowTipsComponent(e);
    };
    this.Qvt = e => {
      this.Fvt.UpdateByDataList(e);
      this.Vvt.SetActive(false);
      if (this.jvt) {
        this.jvt(e);
      }
    };
    this.$2u = () => {
      UiManager_1.UiManager.OpenView("PhantomManageView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIExtendToggle], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.OnClickMask], [6, this.OnClickCloseBtn], [7, this.OnClickSelectAllToggle], [9, this.$2u]];
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  async OnBeforeStartAsync() {
    this.Vvt = new ItemTipsComponent_1.ItemTipsComponentContentComponent();
    await this.Vvt.CreateByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    this.SetButtonUiActive(9, true);
    this.Fvt = new CommonItemSelectView_1.CommonItemSelectView(this.GetItem(0));
    this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(5), this.Qvt);
    this.vpt = new FilterEntrance_1.FilterEntrance(this.GetItem(4), this.Qvt);
  }
  OnAfterShow() {
    this.OnAddEventListener();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectItemAdd, this.Wvt);
  }
  RefreshUi(e) {
    this.Fvt.UpdateSelectableComponent(e.SelectableComponentType, e.ItemDataBaseList, e.SelectedDataList, e.SelectableComponentData, e.ExpData);
    this.Mpt.SetSortToggleState(e.InitSortToggleState);
    this.UpdateFilterComponent(e.UseWayId, e.ItemDataBaseList);
    if (e.SelectedDataList.length <= 0) {
      this.GetExtendToggle(7).SetToggleStateForce(0);
    }
  }
  UpdateFilterComponent(e, t) {
    let i = false;
    let s = false;
    var n;
    if (e && ((n = ConfigManager_1.ConfigManager.SortConfig.GetSortId(e)) && n > 0 && (i = true), n = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(e)) && n > 0) {
      s = true;
    }
    this.Mpt.GetRootItem().SetUIActive(i);
    this.vpt.GetRootItem().SetUIActive(s);
    if (i || s) {
      if (i) {
        this.Mpt.UpdateData(e, t);
      }
      if (s) {
        this.vpt.UpdateData(e, t);
      }
    } else {
      this.Fvt.UpdateByDataList(t);
    }
  }
  SetAllSelectToggleVisible(e) {
    this.GetExtendToggle(7).RootUIComp.SetUIActive(e);
  }
  UpdatePartByIndex(e) {
    this.Fvt.RefreshPartByIndex(e);
  }
  BindClickCloseCallBack(e) {
    this.Hvt = e;
  }
  BindClickSelectAllToggleCallback(e) {
    this.d3a = e;
  }
  BindFilterSortRefresh(e) {
    this.jvt = e;
  }
  ShowTipsComponent(e) {
    this.Vvt.Refresh(e);
    this.GetItem(3).SetUIActive(true);
    this.GetButton(2).RootUIComp.SetUIActive(true);
  }
  OnBeforeHide() {
    this.OnRemoveEventListener();
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectItemAdd, this.Wvt);
  }
  OnBeforeDestroy() {
    this.Fvt.Destroy();
    this.Vvt.Destroy();
  }
}
exports.VisionRecoveryChoosePanel = VisionRecoveryChoosePanel;
//# sourceMappingURL=VisionRecoveryChoosePanel.js.map