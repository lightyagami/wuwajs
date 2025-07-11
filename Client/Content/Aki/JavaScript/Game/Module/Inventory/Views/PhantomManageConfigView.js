"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigView = undefined;
const UE = require("ue");
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
    this.Bqu = undefined;
    this.kqu = undefined;
    this.Oqu = undefined;
    this.XAu = undefined;
    this.qqu = undefined;
    this.Gqu = undefined;
    this.Vxe = undefined;
    this.rTu = t => {
      if (t === 0) {
        this.iw1();
        this.Fqu();
      } else if (t === 1) {
        this.Fwi();
        this.mGe();
        this.Bgt();
      } else if (t === 2) {
        this.Nqu();
        this.X$c();
        this.Vqu();
        this.jqu();
        this.Bgt();
        this.Fwi();
        if (!this.yil.GetEditState()) {
          this.mGe();
        }
      } else if (t === 4) {
        this.mGe();
      }
    };
    this.Hqu = t => {
      var i = this.yil.GetSelectConfig();
      if (i.GetIndex() !== t.GetIndex() || t.GetType() !== i.GetType()) {
        this.Fqu(t);
      }
    };
    this.$qu = () => {
      var t = this.yil.GetSelectConfig();
      CommonInputViewController_1.CommonInputViewController.OpenSetPhantomManageConfigName(t.GetName(), this.Wqu);
    };
    this.Qqu = () => {
      if (this.yil.GetEditState()) {
        this.Kqu();
      } else {
        this.Wn();
      }
    };
    this.DFu = t => {
      var i = this.yil.GetEditState();
      let e = this.yil.GetSelectConfig().IsEmpty();
      if (i) {
        i = this.yil.GetEditData();
        e = this._2u(i);
      }
      return t !== 0 || !e || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID), false);
    };
    this.Z2u = t => {
      if (this.yil.GetEditState()) {
        i = this.yil.GetEditData();
        if (t === 1 && this._2u(i)) {
          this.eGu();
          return;
        } else {
          this.yil.SetEditSwitch(t === 1);
          return;
        }
      }
      var i = this.yil.GetSelectConfig();
      if (t === 1 && i.IsEmpty()) {
        this.eGu();
      } else {
        this.Yqu(t);
      }
    };
    this.zqu = () => {
      if (this.yil.GetEditState()) {
        this.Jqu();
      } else {
        this.yil.SetEditState(true);
      }
    };
    this.Zqu = (t, i) => {
      if (t && (this.yil.SetEditState(false), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomProject_Warning11"), i)) {
        this.e2u();
      }
    };
    this.t2u = () => {
      if (this.yil.GetEditState()) {
        this.i2u();
      } else {
        this.r2u();
      }
    };
    this.o2u = t => {
      if (t) {
        UiManager_1.UiManager.OpenView("PhantomManageView");
      }
    };
    this.W9c = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(InventoryDefine_1.MANAGE_CONFIG_HELP_ID);
    };
    this.Q9c = () => {
      var t = this.yil.GetSelectConfig();
      var i = this.yil.GetEditData();
      var e = this.yil.GetEditSwitch();
      if (t.IsEqual(e, i)) {
        this.K9c();
      } else {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(346)).FunctionMap.set(2, () => {
          this.K9c();
        });
        t.IsEscViewTriggerCallBack = false;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
    this.Y$c = () => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(347);
      t.FunctionMap.set(2, () => {
        var t = [];
        for (const s of PhantomManagePlanConfigAll_1.configPhantomManagePlanConfigAll.GetConfigList()) {
          var i;
          var e;
          var o = new Protocol_1.Aki.Protocol.a$c();
          o.oxu = s.Type;
          var r = [];
          for ([i, e] of s.RuleMap) {
            r.push({
              hxu: i,
              lxu: e.ArrayInt
            });
          }
          var n = {
            c5n: s.SlotIndex,
            qjn: s.IsEnable,
            H8n: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s.Name),
            axu: r
          };
          o.rxu = n;
          t.push(o);
        }
        ControllerHolder_1.ControllerHolder.InventoryController.PhantomSettingBatchUpdateRequestAsync(t).then(t => {
          if (t) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomProject_Warning12");
            this.Fwi();
            this.mGe();
            this.Bgt();
            this.Fqu();
          }
        });
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.n2u = () => {
      this.CloseMe();
    };
    this.Wqu = async t => {
      var i = this.yil.GetSelectConfig();
      var e = i.Clone();
      e.SetName(t);
      var t = await ControllerHolder_1.ControllerHolder.InventoryController.PhantomManageConfigUpdateRequest(i.GetType(), e.Integrate());
      if (t === Protocol_1.Aki.Protocol.Q4n.KRs) {
        this.yil.RefreshSelectConfig();
      }
      return t;
    };
    this.Yqu = async t => {
      UiLayer_1.UiLayer.SetShowMaskLayer("ManageConfigSwitchClick", true);
      var i = this.yil.GetSelectConfig();
      var t = t === 1;
      var e = i.Clone();
      e.SetIsOn(t);
      var i = await ControllerHolder_1.ControllerHolder.InventoryController.PhantomManageConfigUpdateRequest(i.GetType(), e.Integrate());
      if (i === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(t ? "PhantomProject_Warning09" : "PhantomProject_Warning10");
        this.yil.RefreshSelectConfig();
      } else {
        this.Vxe.SetConfigState(!t);
        (e = this.GetTexture(13)).SetChangeColor(!t, e.changeColor);
      }
      UiLayer_1.UiLayer.SetShowMaskLayer("ManageConfigSwitchClick", false);
    };
    this.s2u = () => {
      return new PhantomManageConfigTypeItem_1.PhantomManageConfigTypeItem();
    };
    this.a2u = () => {
      return new PhantomManageConfigItem_1.PhantomManageConfigItem();
    };
    this.h2u = () => {
      return new PhantomManageSettingTitleItem_1.PhantomManageSettingTitleItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UITexture], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.$qu], [10, this.Qqu], [14, this.Q9c], [15, this.Y$c]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.qqu = new ButtonItem_1.ButtonItem();
    t.push(this.qqu.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()));
    this.qqu.SetFunction(this.zqu);
    this.qqu.SetLocalTextNew("PhantomProject_EditButton");
    this.Gqu = new ButtonItem_1.ButtonItem();
    t.push(this.Gqu.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()));
    this.Gqu.SetFunction(this.t2u);
    this.Gqu.SetLocalTextNew("PhantomProject_SiftButton");
    this.Vxe = new ToggleSwitch();
    t.push(this.Vxe.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.Vxe.OnClickedSwitch = this.Z2u;
    this.Vxe.OnCheckCanChange = this.DFu;
    await Promise.all(t);
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpCallBack(this.W9c);
    this.lqe.SetCloseCallBack(this.n2u);
    this.yil = new PhantomManageConfigViewModel_1.PhantomManageConfigViewModel();
    this.yil.Bind(this.rTu);
    this.Bqu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.s2u);
    PhantomManageConfigTypeItem_1.PhantomManageConfigTypeItem.ViewModel = this.yil;
    this.kqu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.a2u);
    PhantomManageConfigItem_1.PhantomManageConfigItem.CallbackBtnSelect = this.Hqu;
    PhantomManageConfigItem_1.PhantomManageConfigItem.ViewModel = this.yil;
    this.Oqu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.h2u, undefined, true);
    PhantomManageSettingTitleItem_1.PhantomManageSettingTitleItem.ViewModel = this.yil;
    this.XAu = this.GetScrollViewWithScrollbar(8).GetContent().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    this.yil.SetSelectType(Protocol_1.Aki.Protocol._xu.Proto_AutoLock);
  }
  async OnPlayingStartSequenceAsync() {
    this.XAu?.Play();
  }
  OnBeforeDestroy() {
    this.yil.UnBind(this.rTu);
  }
  iw1() {
    var t = [];
    var i = {
      Type: Protocol_1.Aki.Protocol._xu.Proto_AutoLock,
      Name: "PhantomProject_LockProject"
    };
    var e = {
      Type: Protocol_1.Aki.Protocol._xu.Proto_AutoDisuse,
      Name: "PhantomProject_DiscardProject"
    };
    t.push(i);
    t.push(e);
    this.Bqu.RefreshByData(t);
  }
  async Fwi() {
    var t = this.yil.GetSelectType();
    var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomManageConfigByType(t);
    await this.kqu.RefreshByDataAsync(t);
    var t = this.yil.GetSelectConfig();
    this.kqu.ScrollToItemByKey(t.GetIndex());
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
    this.Oqu.RefreshByDataAsync(t);
  }
  Vqu() {
    var t = this.yil.GetEditState();
    this.qqu.SetLocalTextNew(t ? "PhantomProject_SaveButton02" : "PhantomProject_EditButton");
  }
  Nqu() {
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
  X$c() {
    var t = this.yil.GetEditState();
    this.SetButtonUiActive(15, !t);
  }
  jqu() {
    var t = this.yil.GetSelectConfig();
    if (this.yil.GetEditState()) {
      this.yil.InitEditDataSwitch(t);
    }
  }
  Fqu(t) {
    if (t) {
      this.yil.SetSelectConfig(t);
    } else {
      t = this.yil.GetSelectType();
      t = ModelManager_1.ModelManager.InventoryModel.GetPhantomManageConfigByType(t);
      this.yil.SetSelectConfig(t[0]);
    }
  }
  Kqu() {
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
    i.Reset(false, true);
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(336);
    e.FunctionMap.set(2, () => {
      this.l2u(t, i, false, this.Zqu);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  eGu() {
    this.Vxe.SetConfigState(false);
    var t = this.GetTexture(13);
    t.SetChangeColor(false, t.changeColor);
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID);
  }
  Jqu() {
    const t = this.yil.GetEditSwitch();
    var i = this.yil.GetEditData();
    const e = this.yil.GetSelectType();
    var o = this.yil.GetSelectConfig();
    var r = this._2u(i);
    const n = this.Zqu;
    const s = o.Clone();
    s.SetRuleIdMapValueList(i);
    if (r) {
      this.l2u(e, s, false, n);
    } else {
      if (!r && t) {
        this.l2u(e, s, t, n);
      }
      if (!r && !t) {
        (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(335)).FunctionMap.set(2, () => {
          this.l2u(e, s, true, n);
        });
        o.FunctionMap.set(1, () => {
          this.l2u(e, s, t, n);
        });
        o.IsEscViewTriggerCallBack = false;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
      }
    }
  }
  async l2u(t, i, e, o) {
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
  _2u(t) {
    for (const i of t.values()) {
      if (i.length !== 0) {
        return false;
      }
    }
    return true;
  }
  u2u() {
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
  i2u() {
    var t = this.yil.GetEditData();
    if (this._2u(t)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID);
    } else {
      this.c2u();
      this.e2u();
    }
  }
  r2u() {
    var t = this.yil.GetSelectConfig();
    if (this._2u(t.GetRuleIdMapValueList())) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(InventoryDefine_1.EMPTY_CHECK_TEXT_ID);
    } else {
      this.c2u();
      this.e2u();
    }
  }
  c2u() {
    var t = {
      ConfigId: ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst(),
      SelectRuleMap: this.u2u()
    };
    ModelManager_1.ModelManager.FilterModel.SetFilterConfigData(4, 43, t, "");
  }
  K9c() {
    var t = this.yil.GetSelectConfig();
    this.yil.InitEditDataSwitch(t, true);
    this.yil.SetEditState(false);
  }
  e2u() {
    if (UiManager_1.UiManager.IsViewOpen("PhantomManageView") || UiManager_1.UiManager.IsViewHide("PhantomManageView")) {
      UiManager_1.UiManager.CloseView("PhantomManageView", this.o2u);
    } else {
      this.o2u(true);
    }
  }
}
exports.PhantomManageConfigView = PhantomManageConfigView;
class ToggleSwitch extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickedSwitch = undefined;
    this.OnCheckCanChange = undefined;
    this.BFu = () => {
      var t;
      return !this.OnCheckCanChange || (t = this.GetExtendToggle(0).GetToggleState(), this.OnCheckCanChange(t));
    };
    this.Xqu = () => {
      var t;
      if (this.OnClickedSwitch) {
        t = this.GetExtendToggle(0).GetToggleState();
        this.OnClickedSwitch(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.Xqu]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.BFu);
  }
  SetConfigType(t) {
    t = t === Protocol_1.Aki.Protocol._xu.Proto_AutoLock ? "PhantomProject_LockProjectTip" : "PhantomProject_DiscardProjectTip";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
  }
  SetConfigState(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t);
  }
}
//# sourceMappingURL=PhantomManageConfigView.js.map