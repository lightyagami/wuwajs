"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const CommonItemSelectView_1 = require("./CommonItemSelectView");
const FilterEntrance_1 = require("./FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("./FilterSort/Sort/View/SortEntrance");
const ItemTipsComponent_1 = require("./ItemTips/ItemTipsComponent");
const ItemTipsUtilTool_1 = require("./ItemTips/ItemTipsUtilTool");
class ItemSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Fvt = undefined;
    this.GXs = undefined;
    this.Mpt = undefined;
    this.vpt = undefined;
    this.OnClickMask = () => {
      this.GetItem(3).SetUIActive(false);
      this.CloseMe();
    };
    this.Wvt = (e, t) => {
      e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e, t);
      this.GXs.Refresh(e);
      this.GetItem(3).SetUIActive(true);
    };
    this.Qvt = e => {
      this.Fvt.UpdateByDataList(e);
    };
    this.I3a = t => {
      var e;
      var i;
      var s = this.OpenParam;
      if (s !== undefined && s.ItemDataBaseList !== undefined && !((e = s.ItemDataBaseList.findIndex(e => e.GetUniqueId() === t)) < 0)) {
        i = s.ItemDataBaseList[e].GetIsLock();
        if (s.SelectedDataList !== undefined && i && (i = s.SelectedDataList.findIndex(e => e.IncId === t)) >= 0) {
          s.SelectedDataList.splice(i, 1);
        }
        this.Fvt.UpdateSelectableComponent(s.SelectableComponentType, s.ItemDataBaseList, s.SelectedDataList, s.SelectableComponentData, s.ExpData);
        this.Fvt.RefreshPartByIndex(e);
        this.Fvt.UpdateChangeItemSelectList();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[2, this.OnClickMask]];
  }
  async OnBeforeStartAsync() {
    this.GXs = new ItemTipsComponent_1.ItemTipsComponentContentComponent();
    await this.GXs.CreateByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    this.Fvt = new CommonItemSelectView_1.CommonItemSelectView(this.GetItem(0));
    this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(5), this.Qvt);
    this.vpt = new FilterEntrance_1.FilterEntrance(this.GetItem(4), this.Qvt);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectItemAdd, this.Wvt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectItemAdd, this.Wvt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.Fvt.UpdateSelectableComponent(e.SelectableComponentType, e.ItemDataBaseList, e.SelectedDataList, e.SelectableComponentData, e.ExpData);
    this.Mpt.SetSortToggleState(e.InitSortToggleState);
    this.UpdateFilterComponent(e.UseWayId, e.ItemDataBaseList);
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
  OnBeforeDestroy() {
    this.Fvt.Destroy();
    this.GXs.Destroy();
  }
}
exports.ItemSelectView = ItemSelectView;
//# sourceMappingURL=ItemSelectView.js.map