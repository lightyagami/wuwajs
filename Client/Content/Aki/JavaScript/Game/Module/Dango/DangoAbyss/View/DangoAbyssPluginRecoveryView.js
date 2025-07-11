"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssPluginRecoveryView = exports.RecoveryRewardItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const DangoAbyssActivityController_1 = require("../../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityController");
const FilterSortEntrance_1 = require("../../../Common/FilterSort/FilterSortEntrance");
const ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent");
const ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool");
const SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent");
const SelectablePropDataUtil_1 = require("../../../Common/PropItem/SelectablePropItem/SelectablePropDataUtil");
const LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DangoAbyssDefine_1 = require("../DangoAbyssDefine");
const DangoAbyssSelectableComponent_1 = require("./DangoAbyssSelectableComponent");
class RecoveryRewardItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnRefresh(e, t, i) {
    e = {
      Data: e,
      Type: 4,
      ItemConfigId: e.ItemId,
      BottomText: e.Count.toString()
    };
    this.Apply(e);
  }
  OnCanExecuteChange() {
    return false;
  }
  OnExtendToggleClicked() {
    var e = this.Data;
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.ItemId);
  }
}
exports.RecoveryRewardItem = RecoveryRewardItem;
class DangoAbyssPluginRecoveryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.gh1 = [];
    this.ypt = [];
    this.Vvt = undefined;
    this.adi = undefined;
    this.A1c = new DangoAbyssSelectableComponent_1.DangoAbyssSelectableComponent(false);
    this.qu1 = undefined;
    this.yil = undefined;
    this.X1c = e => {
      this.gh1 = e;
      this.ZO1();
    };
    this.Gu1 = () => {
      return new RecoveryRewardItem();
    };
    this.I5t = () => {
      this.CloseMe();
    };
    this.p5t = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 75, "OnClickConfirm");
      }
      this.GetItem(11).SetUIActive(false);
      this.GetButton(12).RootUIComp.SetUIActive(false);
      var e = ModelManager_1.ModelManager.DangoAbyssModel.GetRecoverySelectionCountMap(this.gh1);
      if (ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryTimesCountAll(e) <= 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Text_NotEnoughItem_Text");
      } else {
        var t = [];
        for (const i of this.gh1) {
          t.push(i.IncId);
        }
        DangoAbyssActivityController_1.DangoAbyssActivityController.RequestPluginRecovery(t);
      }
    };
    this.OnClickMask = () => {
      this.GetItem(11).SetUIActive(false);
      this.GetButton(12).RootUIComp.SetUIActive(false);
    };
    this.OnClickAll = e => {
      this.Ch1(e === 0);
    };
    this.ph1 = (e, t) => {
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemTipsData(e, t);
      t = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataByPram(e);
      this.ShowTipsComponent(t);
    };
    this.mh1 = t => {
      var e = this.gh1.findIndex(e => e.IncId === t);
      if (e >= 0) {
        this.gh1.splice(e, 1);
      }
      this.A1c.RemoveAndRefresh(t);
      this.ZO1();
    };
    this.vh1 = e => {
      if (!e || e.length <= 0) {
        this.gh1 = [];
        this.d4e();
        this.ZO1();
      } else {
        UiManager_1.UiManager.OpenView("DangoAbyssPluginRecoveryResultView", e, () => {
          this.gh1 = [];
          this.d4e();
          this.ZO1();
        });
      }
    };
    this.FNt = e => {
      this.ypt = e;
      this.A1c.UpdateDataList(this.ypt);
      this.GetItem(11).SetUIActive(false);
      this.GetButton(12).RootUIComp.SetUIActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIItem], [8, UE.UILoopScrollViewComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIExtendToggle]];
    this.BtnBindInfo = [[5, this.I5t], [4, this.p5t], [12, this.OnClickMask], [13, this.OnClickAll]];
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  async OnBeforeStartAsync() {
    this.yil = this.OpenParam;
    this.Vvt = new ItemTipsComponent_1.ItemTipsComponentContentComponent();
    await this.Vvt.CreateByActorAsync(this.GetItem(11).GetOwner());
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemPackageCapacity();
    var t = new SelectableComponent_1.SelectableComponentData();
    t.IsNumSelectable = true;
    t.OnChangeSelectedFunction = this.X1c;
    this.A1c.InitLoopScroller(this.GetLoopScrollViewComponent(8), this.GetItem(10), t);
    this.A1c.SetMaxSize(e);
    this.qu1 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.Gu1);
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(7), this.FNt);
  }
  OnBeforeShow() {
    this.d4e();
    this.ZO1();
    this.GetItem(0).SetUIActive(true);
  }
  d4e() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetAllPluginItemList();
    this.ypt = e;
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(6), DangoAbyssDefine_1.TEXT_PLUGIN_COUNT, e.length);
    this.GetItem(9).SetUIActive(e.length <= 0);
    this.A1c.UpdateComponent(e, this.gh1);
    var t = this.yil.GetDangoId();
    this.adi.UpdateData(42, e, t);
  }
  ZO1() {
    var e;
    var t;
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemPackageCapacity();
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), DangoAbyssDefine_1.TEXT_RECOVERY_SELECT, this.gh1.length, i);
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetRecoverySelectionCountMap(this.gh1);
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryTimesCountMap(i);
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryRewardItemMap(i);
    var s = new Array();
    for ([e, t] of i) {
      var o = {
        ItemId: e,
        Count: t
      };
      s.push(o);
    }
    i = i.get(DangoAbyssDefine_1.CURRENCY_ITEM_EXP_ID) ?? 0;
    this.qu1.RefreshByData(s);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(3), DangoAbyssDefine_1.TEXT_RECOVERY_TIMES, i);
  }
  ShowTipsComponent(e) {
    this.Vvt.Refresh(e);
    this.GetItem(11).SetUIActive(true);
    this.GetButton(12).RootUIComp.SetUIActive(true);
  }
  Ch1(e) {
    if (e) {
      this.gh1 = [];
    } else {
      for (const i of this.ypt) {
        const s = i.GetUniqueId();
        var t;
        if (i.GetCanRecovery() && this.gh1.find(e => e.IncId === s) === undefined) {
          (t = SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(i)).SelectedCount = 1;
          this.gh1.push(t);
        }
      }
    }
    this.A1c.UpdateComponent(this.ypt, this.gh1);
    this.A1c.UpdateDataList(this.ypt);
    this.ZO1();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectItemAdd, this.ph1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.mh1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssPluginRecovery, this.vh1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectItemAdd, this.ph1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.mh1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssPluginRecovery, this.vh1);
  }
}
exports.DangoAbyssPluginRecoveryView = DangoAbyssPluginRecoveryView;
//# sourceMappingURL=DangoAbyssPluginRecoveryView.js.map