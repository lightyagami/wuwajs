"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcquireView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid");
const NumberSelectComponent_1 = require("../Common/NumberSelect/NumberSelectComponent");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollView_1 = require("../Util/ScrollView/GenericScrollView");
class AcquireView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OGe = undefined;
    this.kGe = undefined;
    this.FGe = undefined;
    this.VGe = undefined;
    this.HGe = undefined;
    this.jGe = undefined;
    this.WGe = undefined;
    this.KGe = i => {
      var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("UseCount");
      return new LguiUtil_1.TableTextArgNew(t, i);
    };
    this.QGe = i => {
      if (this.jGe.GetRemainItemCount() > 0) {
        this.jGe.SetAmount(i);
      } else {
        this.jGe.SetAmount(0);
      }
    };
    this.XGe = () => {
      this.ChildPopView?.HidePopView();
    };
    this.$Ge = i => {
      if (i === "CommonRewardView" || i === "CompositeRewardView" || i === "ExploreRewardView") {
        this.ChildPopView?.ShowPopView();
      }
    };
    this.bl = i => {
      if (i.GetRemainItemCount() <= 0) {
        this.CloseMe();
      } else {
        this.jGe = i;
        i = this.jGe.GetItemData();
        this.kGe.RefreshByData(i);
        this.RefreshButtonState();
        this.YGe();
        this.WGe.Refresh(this.jGe.GetRemainItemCount());
      }
    };
    this.JGe = (i, t, e) => {
      var s = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      s.Initialize(t.GetOwner());
      s.Refresh(i);
      return {
        Key: e,
        Value: s
      };
    };
    this.YGe = () => {
      this.zGe();
      this.ZGe();
    };
    this.eNe = () => {
      this.CloseMe();
    };
    this.tNe = () => {
      var i = this.jGe.GetLeftButtonFunction();
      if (i) {
        i();
      } else {
        this.eNe();
      }
    };
    this.iNe = () => {
      var i = this.jGe.GetRightButtonFunction();
      if (i) {
        i();
      } else {
        this.eNe();
      }
    };
    this.oNe = () => {
      this.eNe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UIItem]];
    this.BtnBindInfo = [[4, this.iNe], [3, this.tNe], [8, this.oNe], [9, this.tNe]];
  }
  rNe() {
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(this.GetItem(10));
    var i = {
      MaxNumber: this.jGe.GetMaxAmount(),
      GetExchangeTableText: this.KGe,
      ValueChangeFunction: this.QGe
    };
    if (this.x$d()) {
      this.WGe.SetLimitMaxValue(ConfigManager_1.ConfigManager.CommonConfig.GetGiftMaxNineNineNine());
    }
    this.WGe.Init(i);
  }
  x$d() {
    var i = this.jGe.GetConfigId();
    return i !== 0 && ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i).ItemType === 11;
  }
  OnStart() {
    this.jGe = this.OpenParam;
    this.OGe = this.GetText(5);
    this.VGe = this.GetText(7);
    this.HGe = this.GetText(2);
    this.rNe();
    this.kGe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.JGe);
    var i = this.jGe.GetItemData();
    this.kGe.RefreshByData(i);
    this.RefreshButtonState();
    this.YGe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshAcquireView, this.bl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnShowRewardView, this.XGe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshAcquireView, this.bl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnShowRewardView, this.XGe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  RefreshButtonState() {
    var i = this.jGe.GetLeftButtonFunction();
    var t = this.jGe.GetRightButtonFunction();
    var e = this.GetButton(3);
    var s = this.GetButton(4);
    var h = this.GetButton(8);
    var r = this.GetButton(9);
    if (i || t) {
      i = this.jGe.GetAcquireViewType();
      s.RootUIComp.SetUIActive(true);
      h.RootUIComp.SetUIActive(false);
      if (i === 2) {
        r.RootUIComp.SetUIActive(true);
        e.RootUIComp.SetUIActive(false);
      } else {
        r.RootUIComp.SetUIActive(false);
        e.RootUIComp.SetUIActive(true);
      }
      s.RootUIComp.SetUIActive(true);
      h.RootUIComp.SetUIActive(false);
    } else {
      e.RootUIComp.SetUIActive(false);
      s.RootUIComp.SetUIActive(false);
      r.RootUIComp.SetUIActive(false);
      h.RootUIComp.SetUIActive(true);
    }
  }
  zGe() {
    var i = this.jGe.GetAcquireViewType() === 0;
    this.OGe.SetUIActive(i);
    if (i) {
      this.OGe.SetText(this.jGe.GetNameText());
      LguiUtil_1.LguiUtil.SetLocalText(this.HGe, "AcquireOpenCount");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.HGe, "AcquireGetReward");
    }
  }
  ZGe() {
    var i = this.jGe.GetLeftButtonTextTableId();
    LguiUtil_1.LguiUtil.SetLocalText(this.FGe, i ?? "AcquireCancel");
    var i = this.jGe.GetRightButtonTextTableId();
    LguiUtil_1.LguiUtil.SetLocalText(this.VGe, i ?? "AcquireConfirm");
  }
  OnBeforeDestroy() {
    var i = this.jGe.GetMidButtonFunction();
    if (i) {
      i();
    }
    ModelManager_1.ModelManager.InventoryModel.SetAcquireData(undefined);
    this.OGe = undefined;
    this.kGe.ClearChildren();
    this.kGe = undefined;
    this.FGe = undefined;
    this.VGe = undefined;
    this.HGe = undefined;
    this.jGe = undefined;
  }
}
exports.AcquireView = AcquireView;
//# sourceMappingURL=AcquireView.js.map