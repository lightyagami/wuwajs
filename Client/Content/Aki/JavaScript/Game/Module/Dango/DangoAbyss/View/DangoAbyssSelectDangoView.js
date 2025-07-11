"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssSelectDangoView = exports.DangoSelectViewData = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const AbyssDangoItem_1 = require("./AbyssDangoItem");
const DangoAbyssRootView_1 = require("./DangoAbyssRootView");
class DangoSelectViewData {
  constructor() {
    this.Index = 0;
    this.RoleConfigId = 0;
    this.CurrentSelectDangoId = 0;
    this.GroupIndex = 0;
  }
}
exports.DangoSelectViewData = DangoSelectViewData;
class DangoAbyssSelectDangoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.NRc = 0;
    this.pwc = 0;
    this.vVt = undefined;
    this.vwc = undefined;
    this.ywc = undefined;
    this.Swc = undefined;
    this.Mwc = undefined;
    this.Ewc = undefined;
    this.ucc = undefined;
    this.sGe = () => {
      return new AbyssDangoItem_1.AbyssDangoItem();
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.Cwc = e => {
      this.pwc = e.DangoId;
      if (this.pwc > 0) {
        ModelManager_1.ModelManager.DangoAbyssModel.SetDangoFormationIfNew(this.pwc, false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAbyssDangoRedDot, this.pwc);
      }
      this.Iwc();
      this.nOe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.AMo]];
  }
  async OnBeforeStartAsync() {
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.sGe);
    var e = [];
    this.vwc = new RoleInfoPanel();
    e.push(this.vwc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.ywc = new BuffPanel();
    e.push(this.ywc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.Swc = new SkillPanel();
    e.push(this.Swc.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.Mwc = new SkillPanel();
    e.push(this.Mwc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.Mwc.SkillType = 1;
    this.Ewc = new ButtonItem_1.ButtonItem();
    e.push(this.Ewc.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
    this.Ewc.SetFunction(() => {
      var e;
      var t = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentOpenAbyssActivityData();
      if (t) {
        (e = new DangoAbyssRootView_1.DangoRootViewData()).ActivityId = t.Id;
        e.DangoId = this.pwc;
        UiManager_1.UiManager.OpenView("DangoAbyssRootView", e);
      }
    });
    this.ucc = new ButtonItem_1.ButtonItem();
    e.push(this.ucc.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    this.ucc.SetFunction(() => {
      if (this.pwc > 0) {
        if (ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(this.pwc)?.GetIfLock()) {
          return;
        }
        var e = ModelManager_1.ModelManager.DangoAbyssModel.CacheDangoSelect(ModelManager_1.ModelManager.PlayerInfoModel.GetId(), this.NRc, this.pwc);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssDangoSelect, e);
      }
      this.CloseMe();
    });
    await Promise.all(e);
  }
  OnStart() {
    var e = this.OpenParam;
    this.NRc = e.RoleConfigId;
    this.pwc = e.CurrentSelectDangoId;
    if (this.pwc > 0) {
      ModelManager_1.ModelManager.DangoAbyssModel.SetDangoFormationIfNew(this.pwc, false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAbyssDangoRedDot, this.pwc);
    }
  }
  OnBeforeShow() {
    this.Iwc();
    this.nOe();
  }
  Jc1(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoUpAvailable();
    this.Ewc?.SetActive(e !== undefined && t && !ModelManager_1.ModelManager.GameModeModel.IsMulti);
  }
  P7e(e) {
    this.ucc?.SetActive(e !== undefined);
  }
  Zc1(e) {
    if (e) {
      e = e.GetIfLock();
      this.GetItem(8)?.SetUIActive(e);
    } else {
      this.GetItem(8)?.SetUIActive(false);
    }
  }
  Iwc() {
    var e = [];
    for (const i of ModelManager_1.ModelManager.DangoAbyssModel.GetAllDangoList()) {
      var t = new AbyssDangoItem_1.AbyssDangoItemData();
      t.DangoId = i.GetId();
      t.PlayerId = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      t.RoleId = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoBelongRoleId(ModelManager_1.ModelManager.PlayerInfoModel.GetId(), i.GetId());
      t.SelectState = i.GetId() === this.pwc;
      t.OnSelectCallBack = this.Cwc;
      e.push(t);
    }
    this.vVt.RefreshByData(e);
  }
  nOe() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(this.pwc);
    this.U5t(e);
    this.tst(e);
    this.Twc(e);
    this.bwc(e);
    this.Zc1(e);
    this.Jc1(e);
    this.P7e(e);
  }
  U5t(e) {
    if (e) {
      this.vwc?.SetActive(true);
      this.vwc?.Refresh(e);
    } else {
      this.vwc?.SetActive(false);
    }
  }
  tst(e) {
    var t;
    if (e) {
      t = e.GetId();
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoTagData(t, 1);
      this.ywc?.SetActive(t.length > 0);
      this.ywc?.Refresh(e);
    } else {
      this.ywc?.SetActive(false);
    }
  }
  Twc(e) {
    if (e) {
      this.Swc?.SetActive(true);
      this.Swc?.Refresh(e);
    } else {
      this.Swc?.SetActive(false);
    }
  }
  bwc(e) {
    if (e) {
      this.Mwc?.Refresh(e);
    } else {
      this.Mwc?.SetActive(false);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length === 2 && (e = Number(e[1])) !== undefined && !isNaN(e) && (e = this.vVt?.GetGridByDisplayIndex(e))) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.DangoAbyssSelectDangoView = DangoAbyssSelectDangoView;
class RoleInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.mvt = () => {
      return new AttributeItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIMultiTemplateLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetMultiTemplateLayout(1), this.mvt, this.GetItem(2).GetOwner());
  }
  Refresh(e) {
    var t = e.GetName();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t);
    this.fvt(e);
  }
  fvt(e) {
    var t = new AttributeItemData();
    t.DangoRoleData = e;
    this.eGe?.RefreshByData([t]);
  }
}
class BuffPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.vSc = undefined;
    this.ije = () => {
      var e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoShowAttributeList(this.$8i.GetId());
      UiManager_1.UiManager.OpenView("DangoAbyssAttributeDetailView", e);
    };
    this.ySc = () => {
      return new DangoAbyssTagItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIMultiTemplateLayout], [2, UE.UIItem], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.ije]];
  }
  OnStart() {
    this.vSc = new GenericLayout_1.GenericLayout(this.GetMultiTemplateLayout(1), this.ySc, this.GetItem(2).GetOwner());
  }
  Refresh(e) {
    this.$8i = e;
    this.qSo(e);
  }
  qSo(e) {
    e = e.GetId();
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoTagData(e, 1);
    e.sort((e, t) => t.Value - e.Value);
    this.vSc?.RefreshByData(e);
  }
}
class SkillPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SkillType = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  Refresh(e) {
    if (this.SkillType === 0) {
      var t = e.GetSkillDesc();
      var i = e.GetSkillDescAddition();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t, ...i);
      this.SetActive(true);
    } else {
      var s = e.GetEffectPassiveSkillDescList();
      let t = "";
      var r = s.length;
      for (let e = 0; e < r; e++) {
        t += s[e] + (e !== r - 1 ? "\n\n" : "");
      }
      this.GetText(1)?.SetText(t);
      this.SetActive(s.length > 0);
    }
  }
}
class AttributeItemData {
  constructor() {
    this.DangoRoleData = undefined;
  }
}
class AttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UITexture]];
  }
  Refresh(e, t, i) {
    var s;
    if (e.DangoRoleData) {
      s = (e = e.DangoRoleData).GetSkillCastTypeName();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s);
      s = e.GetSkillCastTypeIconPath();
      this.SetTextureByPath(s, this.GetTexture(2));
    }
  }
}
class DangoAbyssTagItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem]];
  }
  Refresh(e, t, i) {
    var s = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(e.TagId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name);
    this.bSc(s.BgColor);
    this.Iwn(e);
    this.OR1(e);
  }
  Iwn(e) {
    e = ModelManager_1.ModelManager.DangoAbyssModel.GetFormatAttributeValueByTagId(e.Value, e.TagId, true);
    this.GetText(2).SetText(e);
    this.GetText(2).SetUIActive(true);
  }
  bSc(e) {
    e = UE.Color.FromHex(e);
    this.GetSprite(0).SetColor(e);
  }
  OR1(e) {
    this.GetItem(3).SetUIActive(true);
  }
}
//# sourceMappingURL=DangoAbyssSelectDangoView.js.map