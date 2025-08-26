"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PhantomManagePlanConfigAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomManagePlanConfigAll");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const CommonInputViewController_1 = require("../../Common/InputView/Controller/CommonInputViewController");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const InventoryDefine_1 = require("../InventoryDefine");
const PhantomManageConfigItem_1 = require("../Items/PhantomManageConfigItem");
const PhantomManageConfigTypeItem_1 = require("../Items/PhantomManageConfigTypeItem");
const PhantomManageSettingTitleItem_1 = require("../Items/PhantomManageSettingTitleItem");
const PhantomManageConfigViewModel_1 = require("./PhantomManageConfigViewModel");
class PhantomManageConfigView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yil = undefined;
    this.lqe = undefined;
    this.cGu = undefined;
    this.dGu = undefined;
    this.mGu = undefined;
    this.ytd = undefined;
    this.Std = undefined;
    this.fGu = undefined;
    this.gGu = undefined;
    this.Vxe = undefined;
    this.Nhd = false;
    this.gmd = true;
    this.fTu = t => {
      if (t === 0) {
        this.iw1();
        var i = this.yil.GetSelectType();
        var e = this.yil.GetSelectIndex(i);
        const t = ModelManager_1.ModelManager.InventoryModel.GetPhantomManageConfigByTypeAndIndex(i, e);
        this.CGu(true, t);
      } else if (t === 2) {
        this.Fwi();
        this.mGe();
        this.Bgt();
      } else if (t === 3) {
        this.pGu();
        this.Bzu();
        this.vGu();
        this.yGu();
        this.Bgt();
        this.Fwi();
        if (!this.yil.GetEditState()) {
          this.mGe();
        }
      } else if (t === 5) {
        this.mGe();
      }
    };
    this.SGu = t => {
      var i = this.yil.GetSelectConfig();
      if (i.GetIndex() !== t.GetIndex() || t.GetType() !== i.GetType()) {
        this.Nhd = true;
        this.CGu(false, t);
      }
    };
    this.MGu = () => {
      var t = this.yil.GetSelectConfig();
      CommonInputViewController_1.CommonInputViewController.OpenSetPhantomManageConfigName(t.GetName(), this.EGu);
    };
    this.IGu = () => {
      if (this.yil.GetEditState()) {
        this.TGu();
      } else {
        this.Wn();
      }
    };
    this.bGu = t => {
      var i = this.yil.GetEditState();
      let e = this.yil.GetSelectConfig().IsEmpty();
      if (i) {
        i = this.yil.GetEditData();
        e = this.RGu(i);
      }
      return t !== 0 || !e || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID), false);
    };
    this.wGu = t => {
      if (this.yil.GetEditState()) {
        i = this.yil.GetEditData();
        if (t === 1 && this.RGu(i)) {
          this.LGu();
          return;
        } else {
          this.yil.SetEditSwitch(t === 1);
          return;
        }
      }
      var i = this.yil.GetSelectConfig();
      if (t === 1 && i.IsEmpty()) {
        this.LGu();
      } else {
        this.AGu(t);
      }
    };
    this.PGu = () => {
      if (this.yil.GetEditState()) {
        this.xGu();
      } else {
        this.yil.SetEditState(true);
      }
    };
    this.DGu = (t, i) => {
      if (t && (this.yil.SetEditState(false), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomProject_Warning11"), i)) {
        this.UGu();
      }
    };
    this.BGu = () => {
      if (this.yil.GetEditState()) {
        this.kGu();
      } else {
        this.OGu();
      }
    };
    this.qGu = t => {
      if (t) {
        UiManager_1.UiManager.OpenView("PhantomManageView");
      }
    };
    this.kzu = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(InventoryDefine_1.MANAGE_CONFIG_HELP_ID);
    };
    this.Ozu = () => {
      var t = this.yil.GetSelectConfig();
      var i = this.yil.GetEditData();
      var e = this.yil.GetEditSwitch();
      if (t.IsEqual(e, i)) {
        this.qzu();
      } else {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(346)).FunctionMap.set(2, () => {
          this.qzu();
        });
        t.IsEscViewTriggerCallBack = false;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
    this.Gzu = () => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(347);
      t.FunctionMap.set(2, () => {
        var t = [];
        for (const s of PhantomManagePlanConfigAll_1.configPhantomManagePlanConfigAll.GetConfigList()) {
          var i;
          var e;
          var o = new Protocol_1.Aki.Protocol.U9u();
          o.Pxu = s.Type;
          var r = [];
          for ([i, e] of s.RuleMap) {
            r.push({
              Bxu: i,
              kxu: e.ArrayInt
            });
          }
          var n = {
            c5n: s.SlotIndex,
            qjn: s.IsEnable,
            H8n: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s.Name),
            Dxu: r
          };
          o.Axu = n;
          t.push(o);
        }
        ControllerHolder_1.ControllerHolder.InventoryController.PhantomSettingBatchUpdateRequestAsync(t).then(t => {
          if (t) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomProject_Warning12");
            this.Fwi();
            this.mGe();
            this.Bgt();
            this.CGu(true);
          }
        });
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.GGu = () => {
      this.CloseMe();
    };
    this.EGu = async t => {
      var i = this.yil.GetSelectConfig();
      var e = i.Clone();
      e.SetName(t);
      var t = await ControllerHolder_1.ControllerHolder.InventoryController.PhantomManageConfigUpdateRequest(i.GetType(), e.Integrate());
      if (t === Protocol_1.Aki.Protocol.Q4n.KRs) {
        this.CGu(false, e);
      }
      return t;
    };
    this.AGu = async t => {
      UiLayer_1.UiLayer.SetShowMaskLayer("ManageConfigSwitchClick", true);
      var i = this.yil.GetSelectConfig();
      var t = t === 1;
      var e = i.Clone();
      e.SetIsOn(t);
      var i = await ControllerHolder_1.ControllerHolder.InventoryController.PhantomManageConfigUpdateRequest(i.GetType(), e.Integrate());
      if (i === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(t ? "PhantomProject_Warning09" : "PhantomProject_Warning10");
        this.CGu(false, e);
      } else {
        this.Vxe.SetConfigState(!t);
        (i = this.GetTexture(13)).SetChangeColor(!t, i.changeColor);
      }
      UiLayer_1.UiLayer.SetShowMaskLayer("ManageConfigSwitchClick", false);
    };
    this.FGu = () => {
      return new PhantomManageConfigTypeItem_1.PhantomManageConfigTypeItem();
    };
    this.NGu = () => {
      return new PhantomManageConfigItem_1.PhantomManageConfigItem();
    };
    this.VGu = () => {
      return new PhantomManageSettingTitleItem_1.PhantomManageSettingTitleItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UITexture], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.MGu], [10, this.IGu], [14, this.Ozu], [15, this.Gzu]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.fGu = new ButtonItem_1.ButtonItem();
    t.push(this.fGu.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()));
    this.fGu.SetFunction(this.PGu);
    this.fGu.SetLocalTextNew("PhantomProject_EditButton");
    this.gGu = new ButtonItem_1.ButtonItem();
    t.push(this.gGu.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()));
    this.gGu.SetFunction(this.BGu);
    this.gGu.SetLocalTextNew("PhantomProject_SiftButton");
    this.Vxe = new ToggleSwitch();
    t.push(this.Vxe.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.Vxe.OnClickedSwitch = this.wGu;
    this.Vxe.OnCheckCanChange = this.bGu;
    await Promise.all(t);
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpCallBack(this.kzu);
    this.lqe.SetCloseCallBack(this.GGu);
    this.yil = new PhantomManageConfigViewModel_1.PhantomManageConfigViewModel();
    this.yil.Bind(this.fTu);
    this.cGu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.FGu);
    PhantomManageConfigTypeItem_1.PhantomManageConfigTypeItem.ViewModel = this.yil;
    this.dGu = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.NGu);
    PhantomManageConfigItem_1.PhantomManageConfigItem.CallbackBtnSelect = this.SGu;
    PhantomManageConfigItem_1.PhantomManageConfigItem.ViewModel = this.yil;
    this.mGu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.VGu, undefined, true);
    PhantomManageSettingTitleItem_1.PhantomManageSettingTitleItem.ViewModel = this.yil;
    this.ytd = this.dGu.GetUiAnimController();
    this.Std = this.GetScrollViewWithScrollbar(8).GetContent().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    this.yil.SetSelectType(Protocol_1.Aki.Protocol.Oxu.Proto_AutoLock);
  }
  async OnPlayingStartSequenceAsync() {
    this.ytd?.Play();
    this.Std?.Play();
  }
  OnBeforeDestroy() {
    this.yil.UnBind(this.fTu);
  }
  iw1() {
    var t = [];
    var i = {
      Type: Protocol_1.Aki.Protocol.Oxu.Proto_AutoLock,
      Name: "PhantomProject_LockProject"
    };
    var e = {
      Type: Protocol_1.Aki.Protocol.Oxu.Proto_AutoDisuse,
      Name: "PhantomProject_DiscardProject"
    };
    t.push(i);
    t.push(e);
    this.cGu.RefreshByData(t);
  }
  async Fwi() {
    var t = this.yil.GetSelectType();
    var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomManageConfigByType(t);
    await this.dGu?.RefreshByDataAsync(t);
    var t = this.yil.GetSelectConfig();
    if (this.Nhd) {
      if (!Info_1.Info.IsInGamepad()) {
        this.dGu?.ScrollToDisplayingIndex(t.GetDisplayIndex());
      }
      this.Nhd = false;
    } else if (this.gmd) {
      this.dGu?.ScrollToGridIndex(t.GetIndex(), false);
    }
  }
  mGe() {
    var t = this.yil.GetSelectType();
    var i = this.yil.GetSelectConfig();
    this.Vxe.SetConfigType(t);
    var t = this.yil.GetEditState();
    var t = t ? this.yil.GetEditSwitch() : i.GetIsOn();
    this.Vxe.SetConfigState(t);
    var e = this.GetTexture(13);
    e.SetChangeColor(t, e.changeColor);
    this.GetText(5).SetText(i.GetName());
  }
  Bgt() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetSettingTitleItemDataList();
    this.mGu.RefreshByDataAsync(t);
  }
  vGu() {
    var t = this.yil.GetEditState();
    this.fGu.SetLocalTextNew(t ? "PhantomProject_SaveButton02" : "PhantomProject_EditButton");
  }
  pGu() {
    const t = this.yil.GetEditState();
    if (t) {
      this.GetItem(4).SetUIActive(true);
    }
    this.SetButtonUiActive(14, t);
    var i = t ? "Select" : "UnSelect";
    this.PlaySequence(i, () => {
      if (!t) {
        this.GetItem(4).SetUIActive(false);
      }
    });
  }
  Bzu() {
    var t = this.yil.GetEditState();
    this.SetButtonUiActive(15, !t);
  }
  yGu() {
    var t = this.yil.GetSelectConfig();
    if (this.yil.GetEditState()) {
      this.yil.InitEditDataSwitch(t);
    }
  }
  CGu(t, i) {
    var e = this.yil.GetSelectType();
    if (i) {
      this.yil.SetSelectConfig(i);
      this.yil.SetSelectIndex(e, i.GetIndex());
    } else {
      i = ModelManager_1.ModelManager.InventoryModel.GetPhantomManageConfigByType(e);
      this.yil.SetSelectConfig(i[0]);
      this.yil.SetSelectIndex(e, 0);
    }
    this.gmd = t;
  }
  TGu() {
    const t = this.yil.GetSelectConfig();
    var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(337);
    i.FunctionMap.set(2, () => {
      t.Reset(false, false);
      this.yil.InitEditDataSwitch(t);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
  }
  Wn() {
    const t = this.yil.GetSelectType();
    const i = this.yil.GetSelectConfig();
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(336);
    e.FunctionMap.set(2, () => {
      i.Reset(false, true);
      this.jGu(t, i, false, this.DGu);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  LGu() {
    this.Vxe.SetConfigState(false);
    var t = this.GetTexture(13);
    t.SetChangeColor(false, t.changeColor);
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID);
  }
  xGu() {
    const t = this.yil.GetEditSwitch();
    var i = this.yil.GetEditData();
    const e = this.yil.GetSelectType();
    var o = this.yil.GetSelectConfig();
    var r = this.RGu(i);
    const n = this.DGu;
    const s = o.Clone();
    s.SetRuleIdMapValueList(i);
    if (r) {
      this.jGu(e, s, false, n);
    } else {
      if (!r && t) {
        this.jGu(e, s, t, n);
      }
      if (!r && !t) {
        (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(335)).FunctionMap.set(2, () => {
          this.jGu(e, s, true, n);
        });
        o.FunctionMap.set(1, () => {
          this.jGu(e, s, t, n);
        });
        o.IsEscViewTriggerCallBack = false;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
      }
    }
  }
  async jGu(t, i, e, o) {
    UiLayer_1.UiLayer.SetShowMaskLayer("ManageConfigRequestUpdate", true);
    i = i.Integrate();
    if (e !== undefined) {
      i.qjn = e;
    }
    e = await ControllerHolder_1.ControllerHolder.InventoryController.PhantomManageConfigUpdateRequest(t, i);
    if (o) {
      o(e === Protocol_1.Aki.Protocol.Q4n.KRs);
    }
    UiLayer_1.UiLayer.SetShowMaskLayer("ManageConfigRequestUpdate", false);
  }
  RGu(t) {
    for (const i of t.values()) {
      if (i.length !== 0) {
        return false;
      }
    }
    return true;
  }
  HGu() {
    var t;
    var i;
    var e = this.yil.GetEditState();
    var o = new Map();
    let r = this.yil.GetSelectConfig().GetRuleIdMapValueList();
    for ([t, i] of r = e ? this.yil.GetEditData() : r) {
      var n = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(t).FilterType;
      o.set(n, i);
    }
    return o;
  }
  kGu() {
    var t = this.yil.GetEditData();
    if (this.RGu(t)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID);
    } else {
      this.$Gu();
      this.UGu();
    }
  }
  OGu() {
    var t = this.yil.GetSelectConfig();
    if (this.RGu(t.GetRuleIdMapValueList())) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID);
    } else {
      this.$Gu();
      this.UGu();
    }
  }
  $Gu() {
    var t = {
      ConfigId: ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst(),
      SelectRuleMap: this.HGu()
    };
    ModelManager_1.ModelManager.FilterModel.SetFilterConfigData(4, 43, t, "");
  }
  qzu() {
    var t = this.yil.GetSelectConfig();
    this.yil.InitEditDataSwitch(t, true);
    this.yil.SetEditState(false);
  }
  UGu() {
    if (UiManager_1.UiManager.IsViewOpen("PhantomManageView") || UiManager_1.UiManager.IsViewHide("PhantomManageView")) {
      UiManager_1.UiManager.CloseView("PhantomManageView", this.qGu);
    } else {
      this.qGu(true);
    }
  }
}
exports.PhantomManageConfigView = PhantomManageConfigView;
class ToggleSwitch extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickedSwitch = undefined;
    this.OnCheckCanChange = undefined;
    this.WGu = () => {
      var t;
      return !this.OnCheckCanChange || (t = this.GetExtendToggle(0).GetToggleState(), this.OnCheckCanChange(t));
    };
    this.QGu = () => {
      var t;
      if (this.OnClickedSwitch) {
        t = this.GetExtendToggle(0).GetToggleState();
        this.OnClickedSwitch(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.QGu]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.WGu);
  }
  SetConfigType(t) {
    t = t === Protocol_1.Aki.Protocol.Oxu.Proto_AutoLock ? "PhantomProject_LockProjectTip" : "PhantomProject_DiscardProjectTip";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
  }
  SetConfigState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
}
//# sourceMappingURL=PhantomManageConfigView.js.map