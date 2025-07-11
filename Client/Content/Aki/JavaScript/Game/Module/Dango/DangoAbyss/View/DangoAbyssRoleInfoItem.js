"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssRoleInfoItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const InActiveRedItem_1 = require("../../../Common/InActiveRedItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DangoAbyssDefine_1 = require("../DangoAbyssDefine");
const DangoAbyssPluginItem_1 = require("./DangoAbyssPluginItem");
const DangoAbyssRoleAttributeItem_1 = require("./DangoAbyssRoleAttributeItem");
const DangoAbyssTagItem_1 = require("./DangoAbyssTagItem");
class DangoAbyssRoleInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.uSc = 0;
    this.ViewModel = undefined;
    this.G1c = undefined;
    this.iSc = undefined;
    this.$a_ = undefined;
    this.Mko = undefined;
    this.Yyc = undefined;
    this.AOe = t => {
      if (t === 0) {
        this.EGc();
      }
    };
    this.dSc = () => {
      this.uSc = 1;
      this.RefreshView();
    };
    this._Sc = () => {
      this.uSc = 0;
      this.RefreshView();
    };
    this.RGc = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Activity", 75, "点击升级按钮");
      }
      var t = this.ViewModel.GetDangoId();
      UiManager_1.UiManager.OpenView("DangoAbyssLevelUpView", t);
    };
    this.tw1 = () => {
      this.ViewModel.SetSlotIndex(1);
      UiManager_1.UiManager.OpenView("DangoAbyssPluginEquipView", this.ViewModel);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIExtendToggle], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText]];
    this.BtnBindInfo = [[1, this._Sc], [2, this.dSc]];
  }
  OnAfterDestroy() {
    this.ViewModel.UnBind(this.AOe);
  }
  async OnBeforeStartAsync() {
    this.GetItem(5).SetUIActive(false);
    var t = [];
    this.G1c = new AttributePanel();
    this.G1c.ViewModel = this.ViewModel;
    t.push(this.G1c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.iSc = new PluginPanel();
    this.iSc.ViewModel = this.ViewModel;
    t.push(this.iSc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.$a_ = new ButtonItem_1.ButtonItem();
    t.push(this.$a_.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.$a_.SetFunction(this.RGc);
    this.Mko = new ButtonItem_1.ButtonItem();
    t.push(this.Mko.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.Mko.SetFunction(this.tw1);
    this.Yyc = new InActiveRedItem_1.InActiveRedItem();
    t.push(this.Yyc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    await Promise.all(t);
  }
  OnBeforeShow() {
    this.ViewModel.Bind(this.AOe);
    this.RefreshView();
  }
  mSc() {
    var t = this.uSc === 0 ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(t);
    var t = this.uSc === 1;
    var t = t ? 1 : 0;
    this.GetExtendToggle(2).SetToggleState(t);
  }
  OnDangoInfoUpdate() {
    this.RefreshView();
  }
  EGc() {
    if (this.ViewModel.GetDangoId() !== 0) {
      this.RefreshView();
    }
  }
  RefreshView() {
    var t = this.ViewModel.GetDangoId();
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t);
    this.P5e(t);
    this.Sil(t);
    this.Zyc(t);
    this.tSc(t);
    this.mSc();
    this.fSc();
  }
  P5e(t) {
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.GetName());
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(9), DangoAbyssDefine_1.TEXT_DANGO_LEVEL, t.GetLevel().toString(), t.GetMaxLevel().toString());
      this.GetText(9).SetUIActive(!t.GetIfLock());
    }
  }
  fSc() {
    switch (this.uSc) {
      case 0:
        this.gSc();
        break;
      case 1:
        this.CSc();
    }
  }
  gSc() {
    this.GetItem(4).SetUIActive(true);
    this.GetItem(3).SetUIActive(false);
    this.iSc.Refresh();
  }
  CSc() {
    this.GetItem(4).SetUIActive(false);
    this.GetItem(3).SetUIActive(true);
    this.G1c.Refresh();
  }
  Sil(t) {
    if (t) {
      t = t.GetIfLock();
      this.Mko.SetActive(!t);
      this.Mko?.SetRedDotVisible(false);
    } else {
      this.Mko?.SetActive(false);
    }
  }
  Zyc(t) {
    var e;
    if (t) {
      e = t.GetConfig();
      t = t.GetIfLock();
      this.Yyc?.SetActive(t);
      this.Yyc?.SetDetailButtonVisible(false);
      this.Yyc?.SetText(e.UnlockDesc);
    } else {
      this.Yyc?.SetActive(false);
    }
  }
  tSc(t) {
    var e;
    var i;
    if (t) {
      e = t.GetIfCanLevelUp();
      i = t.GetIfLock();
      this.$a_?.SetActive(!i);
      i = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoLevelUpRedDotById(t.GetId(), false);
      this.$a_?.SetRedDotVisible(e && i);
    } else {
      this.$a_?.SetActive(false);
    }
  }
}
exports.DangoAbyssRoleInfoItem = DangoAbyssRoleInfoItem;
class AttributePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CurrentData = undefined;
    this.pSc = undefined;
    this.vSc = undefined;
    this.ViewModel = undefined;
    this.AOe = t => {
      if (t === 0) {
        this.EGc();
      }
    };
    this.ySc = () => {
      return new DangoAbyssTagItem_1.DangoAbyssTagItem();
    };
    this.Bqe = () => {
      return new DangoAbyssRoleAttributeItem_1.DangoAbyssRoleAttributeItem();
    };
    this.SSc = () => {
      var t = this.ViewModel.GetDangoId();
      var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoShowAttributeList(t);
      UiManager_1.UiManager.OpenView("DangoAbyssAttributeDetailView", t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIVerticalLayout], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.SSc]];
  }
  OnBeforeCreate() {
    this.ViewModel.Bind(this.AOe);
  }
  OnAfterDestroy() {
    this.ViewModel.UnBind(this.AOe);
  }
  OnStart() {
    this.pSc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.Bqe, this.GetItem(1).GetOwner());
    this.vSc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.ySc, this.GetItem(4).GetOwner());
  }
  Refresh() {
    var t = this.ViewModel.GetDangoId();
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t);
    if (e) {
      this.CurrentData = e;
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoTagData(t, 1);
      this.vSc.RefreshByData(e);
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoShowAttributeList(t);
      this.pSc.RefreshByData(e.slice(0, DangoAbyssDefine_1.ROLE_ATTRIBUTE_LENGTH));
    }
  }
  EGc() {
    this.Refresh();
  }
}
class PluginPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.hSc = new Map();
    this.ESc = undefined;
    this.ViewModel = undefined;
    this.ySc = () => {
      return new TagItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIText], [12, UE.UIMultiTemplateLayout], [13, UE.UIItem], [14, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) {
      var i = new DangoAbyssPluginItem_1.DangoAbyssPluginItem(t, false);
      i.ViewModel = this.ViewModel;
      e.push(i.CreateThenShowByActorAsync(this.GetItem(0 + t).GetOwner()));
      this.hSc.set(t, i);
    }
    await Promise.all(e);
    var t = this.GetMultiTemplateLayout(12);
    var s = this.GetItem(13).GetOwner();
    this.ESc = new GenericLayout_1.GenericLayout(t, this.ySc, s);
  }
  Refresh() {
    var t = this.ViewModel.GetDangoId();
    if (!(t <= 0)) {
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t);
      this.aSc(t);
      this.ISc();
      this.TSc(t);
      this.GetItem(14).SetAnchorOffsetY(0);
    }
  }
  aSc(i) {
    this.hSc.forEach((t, e) => {
      e = i.GetPluginSlotData(e);
      t.Refresh(e);
    });
  }
  ISc() {
    var t = this.ViewModel.GetDangoId();
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoTagData(t, 1);
    this.ESc.RefreshByData(t);
  }
  TSc(t) {
    var e = t.GetSkillCastTypeName();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e);
    var e = t.GetSkillCastTypeIconPath();
    this.SetTextureByPath(e, this.GetTexture(10));
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetSkillDescByDangoId(t.GetId());
    this.GetText(11).SetText(e);
  }
}
class TagItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  Refresh(t, e, i) {
    var t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(t.TagId);
    var s = t.Name;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s);
    var s = UE.Color.FromHex(t.BgColor);
    this.GetSprite(0).SetColor(s);
  }
}
//# sourceMappingURL=DangoAbyssRoleInfoItem.js.map