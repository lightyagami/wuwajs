"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildingDevelopBottomGrid = exports.TrapDefenseBuildingDevelopBottomItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonDragLogic_1 = require("../../../../Ui/Common/CommonDragLogic");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TrapDefenseBuildingDevelopBottomInfoItem_1 = require("./TrapDefenseBuildingDevelopBottomInfoItem");
const TrapDefenseBuildingDevelopDragDataItem_1 = require("./TrapDefenseBuildingDevelopDragDataItem");
class TrapDefenseBuildingDevelopBottomItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.IsInDungeon = e;
    this.Layout = undefined;
    this.DataList = [];
    this.MenuData = undefined;
    this.CurSelectedIndex = 0;
    this.HasInit = false;
    this.ezc = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.EquipOrgan(this.CurSelectedIndex, this.MenuData);
    };
    this.B0d = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.QuickEquipOrgan();
    };
    this.Kwi = e => {
      var t = e.GetSlotData();
      if (t) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseBuildingBottomSelectUpdate, t);
      }
      this.CurSelectedIndex = e.GetIndex();
      if (t === this.MenuData) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "TowerDefense_Battle_Unload");
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.uKd(t));
      }
      this.Layout.DeselectCurrentGridProxy();
      this.Layout?.SelectGridProxy(this.CurSelectedIndex);
    };
    this.Lke = e => this.HasInit ? this.CurSelectedIndex !== e.GetIndex() : this.HasInit = true;
    this.Bqe = () => {
      var e = new TrapDefenseBuildingDevelopBottomGrid();
      e.OnClickCb = this.Kwi;
      e.CanExecuteChangeCb = this.Lke;
      return e;
    };
    this.xtd = () => new TrapDefenseBuildingDevelopDragDataItem_1.TrapDefenseBuildingDevelopDragDataItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.B0d], [5, this.ezc]];
  }
  async OnBeforeStartAsync() {
    var e;
    this.GetItem(0)?.SetUIActive(this.IsInDungeon);
    if (this.IsInDungeon) {
      this.Layout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.Bqe);
      this.DataList = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetSlotData();
      await this.Layout.RefreshByDataAsync(this.DataList, true);
      this.Layout.SelectGridProxy(0, true);
      e = (e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData()).Config.RecommendBuildingType.length > 0 || e.Config.RecommendAuxiliaryType.length > 0;
      this.GetButton(3)?.RootUIComp.SetUIActive(e);
    }
  }
  CheckCurSlotEmpty() {
    return this.DataList[this.CurSelectedIndex].GetSlotData();
  }
  SetMenuSelectedData(e) {
    if ((this.MenuData = e) === this.DataList[this.CurSelectedIndex].GetSlotData()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "TowerDefense_Battle_Unload");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.uKd(e));
    }
  }
  UpdateSlot() {
    for (const e of this.Layout.GetLayoutItemList()) {
      e.UpdateData();
    }
  }
  UpdateEquipTxt() {
    if (this.DataList[this.CurSelectedIndex].GetSlotData() === this.MenuData) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "TowerDefense_Battle_Unload");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.uKd(this.MenuData));
    }
  }
  uKd(e) {
    if (!e || e.IsBuilding) {
      return "TowerDefense_Battle_Equip";
    } else {
      return "TowerDefense_Battle_Equip_Auxiliary";
    }
  }
  InitBottomDragLogic() {
    var e = [];
    for (const s of this.Layout.GetLayoutItemList()) {
      var t = s.GetDataItem();
      var i = new CommonDragLogic_1.CommonDragItemLogic(t.GetRootItem(), t.GetDragComp(), s.GridIndex, this.xtd);
      t.SetDragLogic(i);
      e.push(i);
    }
    return e;
  }
  InitBottomDragItem() {
    var e = [];
    for (const t of this.Layout.GetLayoutItemList()) {
      e.push(t.GetDataItem());
    }
    return e;
  }
}
exports.TrapDefenseBuildingDevelopBottomItem = TrapDefenseBuildingDevelopBottomItem;
class TrapDefenseBuildingDevelopBottomGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnClickCb = undefined;
    this.CanExecuteChangeCb = undefined;
    this.Data = undefined;
    this.DataItem = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.DataItem = new TrapDefenseBuildingDevelopBottomInfoItem_1.TrapDefenseBuildingDevelopBottomInfoItem();
    this.DataItem.OnClickCb = this.OnClickCb;
    this.DataItem.CanExecuteChangeCb = this.CanExecuteChangeCb;
    await this.DataItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnBeforeDestroy() {
    this.DataItem = undefined;
  }
  Refresh(e, t, i) {
    this.Data = e;
    this.UpdateData();
  }
  UpdateData() {
    this.DataItem.Refresh(this.Data);
  }
  OnSelected(e) {
    this.DataItem?.SetSelected(true);
    if (e) {
      this.OnClickCb?.(this.Data);
    }
  }
  OnDeselected(e) {
    this.DataItem?.SetSelected(false);
  }
  GetDataItem() {
    return this.DataItem;
  }
}
exports.TrapDefenseBuildingDevelopBottomGrid = TrapDefenseBuildingDevelopBottomGrid;
//# sourceMappingURL=TrapDefenseBuildingDevelopBottomItem.js.map