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
    this.nGu = undefined;
    this.sGu = undefined;
    this.aGu = undefined;
    this.Drd = undefined;
    this.xrd = undefined;
    this.hGu = undefined;
    this.lGu = undefined;
    this.Vxe = undefined;
    this.Gdd = false;
    this.fFd = true;
    this.fTu = t => {
      if (t === 0) {
        this.iw1();
        var i = this.yil.GetSelectType();
        var e = this.yil.GetSelectIndex(i);
        const t = ModelManager_1.ModelManager.InventoryModel.GetPhantomManageConfigByTypeAndIndex(i, e);
        this._Gu(true, t);
      } else if (t === 2) {
        this.Fwi();
        this.mGe();
        this.Bgt();
      } else if (t === 3) {
        this.uGu();
        this.cjc();
        this.cGu();
        this.dGu();
        this.Bgt();
        this.Fwi();
        if (!this.yil.GetEditState()) {
          this.mGe();
        }
      } else if (t === 5) {
        this.mGe();
      }
    };
    this.mGu = t => {
      var i = this.yil.GetSelectConfig();
      if (i.GetIndex() !== t.GetIndex() || t.GetType() !== i.GetType()) {
        this.Gdd = true;
        this._Gu(false, t);
      }
    };
    this.fGu = () => {
      var t = this.yil.GetSelectConfig();
      CommonInputViewController_1.CommonInputViewController.OpenSetPhantomManageConfigName(t.GetName(), this.gGu);
    };
    this.CGu = () => {
      if (this.yil.GetEditState()) {
        this.pGu();
      } else {
        this.Wn();
      }
    };
    this.X4u = t => {
      var i = this.yil.GetEditState();
      let e = this.yil.GetSelectConfig().IsEmpty();
      if (i) {
        i = this.yil.GetEditData();
        e = this.DGu(i);
      }
      return t !== 0 || !e || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID), false);
    };
    this.UNu = t => {
      if (this.yil.GetEditState()) {
        i = this.yil.GetEditData();
        if (t === 1 && this.DGu(i)) {
          this.DNu();
          return;
        } else {
          this.yil.SetEditSwitch(t === 1);
          return;
        }
      }
      var i = this.yil.GetSelectConfig();
      if (t === 1 && i.IsEmpty()) {
        this.DNu();
      } else {
        this.yGu(t);
      }
    };
    this.SGu = () => {
      if (this.yil.GetEditState()) {
        this.MGu();
      } else {
        this.yil.SetEditState(true);
      }
    };
    this.EGu = (t, i) => {
      if (t && (this.yil.SetEditState(false), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomProject_Warning11"), i)) {
        this.IGu();
      }
    };
    this.TGu = () => {
      if (this.yil.GetEditState()) {
        this.bGu();
      } else {
        this.RGu();
      }
    };
    this.wGu = t => {
      if (t) {
        UiManager_1.UiManager.OpenView("PhantomManageView");
      }
    };
    this.RWu = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(InventoryDefine_1.MANAGE_CONFIG_HELP_ID);
    };
    this.wWu = () => {
      var t = this.yil.GetSelectConfig();
      var i = this.yil.GetEditData();
      var e = this.yil.GetEditSwitch();
      if (t.IsEqual(e, i)) {
        this.LWu();
      } else {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(346)).FunctionMap.set(2, () => {
          this.LWu();
        });
        t.IsEscViewTriggerCallBack = false;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
    this.djc = () => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(347);
      t.FunctionMap.set(2, () => {
        var t = [];
        for (const s of PhantomManagePlanConfigAll_1.configPhantomManagePlanConfigAll.GetConfigList()) {
          var i;
          var e;
          var o = new Protocol_1.Aki.Protocol.tZu();
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
            this._Gu(true);
          }
        });
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.LGu = () => {
      this.CloseMe();
    };
    this.gGu = async t => {
      var i = this.yil.GetSelectConfig();
      var e = i.Clone();
      e.SetName(t);
      var t = await ControllerHolder_1.ControllerHolder.InventoryController.PhantomManageConfigUpdateRequest(i.GetType(), e.Integrate());
      if (t === Protocol_1.Aki.Protocol.Q4n.KRs) {
        this._Gu(false, i);
      }
      return t;
    };
    this.yGu = async t => {
      UiLayer_1.UiLayer.SetShowMaskLayer("ManageConfigSwitchClick", true);
      var i = this.yil.GetSelectConfig();
      var t = t === 1;
      var e = i.Clone();
      e.SetIsOn(t);
      var e = await ControllerHolder_1.ControllerHolder.InventoryController.PhantomManageConfigUpdateRequest(i.GetType(), e.Integrate());
      if (e === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(t ? "PhantomProject_Warning09" : "PhantomProject_Warning10");
        this._Gu(false, i);
      } else {
        this.Vxe.SetConfigState(!t);
        (e = this.GetTexture(13)).SetChangeColor(!t, e.changeColor);
      }
      UiLayer_1.UiLayer.SetShowMaskLayer("ManageConfigSwitchClick", false);
    };
    this.AGu = () => {
      return new PhantomManageConfigTypeItem_1.PhantomManageConfigTypeItem();
    };
    this.PGu = () => {
      return new PhantomManageConfigItem_1.PhantomManageConfigItem();
    };
    this.xGu = () => {
      return new PhantomManageSettingTitleItem_1.PhantomManageSettingTitleItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UITexture], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.fGu], [10, this.CGu], [14, this.wWu], [15, this.djc]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.hGu = new ButtonItem_1.ButtonItem();
    t.push(this.hGu.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()));
    this.hGu.SetFunction(this.SGu);
    this.hGu.SetLocalTextNew("PhantomProject_EditButton");
    this.lGu = new ButtonItem_1.ButtonItem();
    t.push(this.lGu.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()));
    this.lGu.SetFunction(this.TGu);
    this.lGu.SetLocalTextNew("PhantomProject_SiftButton");
    this.Vxe = new ToggleSwitch();
    t.push(this.Vxe.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.Vxe.OnClickedSwitch = this.UNu;
    this.Vxe.OnCheckCanChange = this.X4u;
    await Promise.all(t);
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpCallBack(this.RWu);
    this.lqe.SetCloseCallBack(this.LGu);
    this.yil = new PhantomManageConfigViewModel_1.PhantomManageConfigViewModel();
    this.yil.Bind(this.fTu);
    this.nGu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.AGu);
    PhantomManageConfigTypeItem_1.PhantomManageConfigTypeItem.ViewModel = this.yil;
    this.sGu = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.PGu);
    PhantomManageConfigItem_1.PhantomManageConfigItem.CallbackBtnSelect = this.mGu;
    PhantomManageConfigItem_1.PhantomManageConfigItem.ViewModel = this.yil;
    this.aGu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.xGu, undefined, true);
    PhantomManageSettingTitleItem_1.PhantomManageSettingTitleItem.ViewModel = this.yil;
    this.Drd = this.sGu.GetUiAnimController();
    this.xrd = this.GetScrollViewWithScrollbar(8).GetContent().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    this.yil.SetSelectType(Protocol_1.Aki.Protocol.Oxu.Proto_AutoLock);
  }
  async OnPlayingStartSequenceAsync() {
    this.Drd?.Play();
    this.xrd?.Play();
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
    this.nGu.RefreshByData(t);
  }
  async Fwi() {
    var t = this.yil.GetSelectType();
    var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomManageConfigByType(t);
    await this.sGu?.RefreshByDataAsync(t);
    var t = this.yil.GetSelectConfig();
    if (this.Gdd) {
      if (!Info_1.Info.IsInGamepad()) {
        this.sGu?.ScrollToDisplayingIndex(t.GetDisplayIndex());
      }
      this.Gdd = false;
    } else if (this.fFd) {
      this.sGu?.ScrollToGridIndex(t.GetIndex(), false);
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
    this.aGu.RefreshByDataAsync(t);
  }
  cGu() {
    var t = this.yil.GetEditState();
    this.hGu.SetLocalTextNew(t ? "PhantomProject_SaveButton02" : "PhantomProject_EditButton");
  }
  uGu() {
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
  cjc() {
    var t = this.yil.GetEditState();
    this.SetButtonUiActive(15, !t);
  }
  dGu() {
    var t = this.yil.GetSelectConfig();
    if (this.yil.GetEditState()) {
      this.yil.InitEditDataSwitch(t);
    }
  }
  _Gu(t, i) {
    var e = this.yil.GetSelectType();
    if (i) {
      this.yil.SetSelectConfig(i);
      this.yil.SetSelectIndex(e, i.GetIndex());
    } else {
      i = ModelManager_1.ModelManager.InventoryModel.GetPhantomManageConfigByType(e);
      this.yil.SetSelectConfig(i[0]);
      this.yil.SetSelectIndex(e, 0);
    }
    this.fFd = t;
  }
  pGu() {
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
      this.UGu(t, i, false, this.EGu);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  DNu() {
    this.Vxe.SetConfigState(false);
    var t = this.GetTexture(13);
    t.SetChangeColor(false, t.changeColor);
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID);
  }
  MGu() {
    const t = this.yil.GetEditSwitch();
    var i = this.yil.GetEditData();
    const e = this.yil.GetSelectType();
    var o = this.yil.GetSelectConfig();
    var r = this.DGu(i);
    const n = this.EGu;
    const s = o.Clone();
    s.SetRuleIdMapValueList(i);
    if (r) {
      this.UGu(e, s, false, n);
    } else {
      if (!r && t) {
        this.UGu(e, s, t, n);
      }
      if (!r && !t) {
        (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(335)).FunctionMap.set(2, () => {
          this.UGu(e, s, true, n);
        });
        o.FunctionMap.set(1, () => {
          this.UGu(e, s, t, n);
        });
        o.IsEscViewTriggerCallBack = false;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
      }
    }
  }
  async UGu(t, i, e, o) {
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
  DGu(t) {
    for (const i of t.values()) {
      if (i.length !== 0) {
        return false;
      }
    }
    return true;
  }
  BGu() {
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
  bGu() {
    var t = this.yil.GetEditData();
    if (this.DGu(t)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID);
    } else {
      this.kGu();
      this.IGu();
    }
  }
  RGu() {
    var t = this.yil.GetSelectConfig();
    if (this.DGu(t.GetRuleIdMapValueList())) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID);
    } else {
      this.kGu();
      this.IGu();
    }
  }
  kGu() {
    var t = {
      ConfigId: ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst(),
      SelectRuleMap: this.BGu()
    };
    ModelManager_1.ModelManager.FilterModel.SetFilterConfigData(4, 43, t, "");
  }
  LWu() {
    var t = this.yil.GetSelectConfig();
    this.yil.InitEditDataSwitch(t, true);
    this.yil.SetEditState(false);
  }
  IGu() {
    if (UiManager_1.UiManager.IsViewOpen("PhantomManageView") || UiManager_1.UiManager.IsViewHide("PhantomManageView")) {
      UiManager_1.UiManager.CloseView("PhantomManageView", this.wGu);
    } else {
      this.wGu(true);
    }
  }
}
exports.PhantomManageConfigView = PhantomManageConfigView;
class ToggleSwitch extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickedSwitch = undefined;
    this.OnCheckCanChange = undefined;
    this.Y4u = () => {
      var t;
      return !this.OnCheckCanChange || (t = this.GetExtendToggle(0).GetToggleState(), this.OnCheckCanChange(t));
    };
    this.vGu = () => {
      var t;
      if (this.OnClickedSwitch) {
        t = this.GetExtendToggle(0).GetToggleState();
        this.OnClickedSwitch(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.vGu]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.Y4u);
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