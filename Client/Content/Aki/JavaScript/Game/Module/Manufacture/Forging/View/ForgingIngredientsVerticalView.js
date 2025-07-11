"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgingIngredientsVerticalView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const AttributeItem_1 = require("../../../Common/AttributeItem");
const MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid");
const NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const CommonManager_1 = require("../../Common/CommonManager");
const ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem");
const ComposeController_1 = require("../../Compose/ComposeController");
const ForgingController_1 = require("../ForgingController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dGt = undefined;
    this.OnChangeRoleClick = () => {
      if (this.dGt) {
        this.dGt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIButtonComponent], [3, UE.UIText]];
    this.BtnBindInfo = [[2, this.OnChangeRoleClick]];
  }
  BindChangeRoleClick(t) {
    this.dGt = t;
  }
  SetExpNumVisible(t) {
    this.GetText(0).SetUIActive(t);
  }
  SetExpNum(t, e, i, s) {
    var i = e * i;
    var t = t * e;
    if (t !== i) {
      e = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("AddProficiency"), "+" + e * s);
      s = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("CumulativeProficiency"), t.toString(), i.toString());
      t = e.concat(" ", "(", s, ")");
      this.GetText(0).SetText(t);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "Proficiency");
    }
  }
  SetRoleTexture(t) {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    this.SetRoleIcon(e.GetRoleConfig().RoleHeadIconLarge, this.GetTexture(1), t);
  }
}
class StarItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  Refresh(t, e, i) {
    if (t === 0) {
      this.GetSprite(0).SetUIActive(true);
      this.GetSprite(1).SetUIActive(false);
    } else {
      this.GetSprite(0).SetUIActive(false);
      this.GetSprite(1).SetUIActive(true);
    }
  }
  Clear() {}
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, e) {
    return t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    this.GetSprite(2).SetUIActive(false);
  }
  SetState(t) {}
}
class AttributeItemInternal extends AttributeItem_1.AttributeItem {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture]];
  }
  SetBgActive() {}
}
class WeaponAttributeView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this._Li = undefined;
    this.uLi = undefined;
    this.cLi = undefined;
    this.mLi = undefined;
    this.dLi = undefined;
    this.vke = () => {
      return new StarItem();
    };
    this.Wft = 1;
    this.CLi = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [4, UE.UIItem], [3, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    if (!this.mLi) {
      this.mLi = new AttributeItemInternal();
      this.mLi.CreateThenShowByActor(this.GetItem(5).GetOwner());
    }
    if (!this.dLi) {
      this.dLi = new AttributeItemInternal();
      this.dLi.CreateThenShowByActor(this.GetItem(6).GetOwner());
    }
    this.cLi = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.vke);
    var e = this.cLi.GetRootUiItem().GetAttachUIChildren();
    for (let t = 0; t < e.Num(); t++) {
      e.Get(t).SetUIActive(false);
    }
  }
  gLi() {
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(this._Li.ResonId, 1);
    if (t) {
      this.GetText(1).ShowTextNew(t.Name);
    }
  }
  aqe() {
    var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(this._Li.BreachId);
    var t = new Array(t);
    this.cLi.RefreshByData(t);
  }
  fLi() {
    var t = this.uLi.LevelLimit;
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "ForgingWeaponLevel", 1, t);
  }
  pLi() {
    this.mLi.UpdateParam(this._Li.FirstPropId.Id, this._Li.FirstPropId.IsRatio);
    var t = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(this._Li.FirstCurve, this._Li.FirstPropId.Value, this.Wft, this.CLi);
    this.mLi.SetCurrentValue(t);
    this.dLi.UpdateParam(this._Li.SecondPropId.Id, this._Li.SecondPropId.IsRatio);
    var t = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(this._Li.SecondCurve, this._Li.SecondPropId.Value, this.Wft, this.CLi);
    this.dLi.SetCurrentValue(t);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "WeaponResonanceItemLevelText", "1");
  }
  RefreshTips(t) {
    t = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(t.ItemId);
    this._Li = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(t.ItemId);
    this.uLi = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(this._Li.BreachId, 1);
    this.gLi();
    this.fLi();
    this.aqe();
    this.pLi();
  }
}
class SvInfo extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.vLi = undefined;
    this.ChangeRoleClickDelegate = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [1, UE.UIItem], [6, UE.UIVerticalLayout]];
    this.BtnBindInfo = [];
  }
  async OnBeforeStartAsync() {
    this.vLi = new WeaponAttributeView();
    await this.vLi.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    this.vLi.SetActive(true);
  }
  SetTypeName(t = undefined) {
    var e = this.GetText(0);
    if (t) {
      e.SetUIActive(true);
      e.SetText(t);
    } else {
      e.SetUIActive(false);
    }
  }
  SetTypeNameVisible(t) {
    this.GetText(0).SetUIActive(t);
  }
  SetDescVisible(t) {
    this.GetText(3).SetUIActive(t);
  }
  SetDescBgVisible(t) {
    this.GetText(5).SetUIActive(t);
  }
  SetDesc(t) {
    this.GetText(3).SetText(t);
  }
  SetDescBg(t) {
    this.GetText(5).SetText(t);
  }
  SetWeaponAttribute(t) {
    this.vLi.RefreshTips(t);
  }
}
class ForgingIngredientsVerticalView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.t6 = 1;
    this.MGt = undefined;
    this.WGe = undefined;
    this.fGt = undefined;
    this.IGt = undefined;
    this.vTi = undefined;
    this.EGt = undefined;
    this.gGt = undefined;
    this.SGt = false;
    this.yGt = 0;
    this.I7e = () => {
      if (this.vTi) {
        this.vTi();
      }
    };
    this.TGt = () => {
      var t = new ManufactureMaterialItem_1.ManufactureMaterialItem();
      t.BindOnCanExecuteChange(() => false);
      t.BindOnExtendToggleClicked(t => {
        t = t.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t.L8n);
      });
      return t;
    };
    this.LGt = t => {
      var e;
      this.t6 = t;
      if (this.fGt) {
        e = ForgingController_1.ForgingController.GetMaxCreateCount(this.fGt.ItemId);
        this.WGe.SetAddButtonInteractive(t < e);
        this.WGe.SetReduceButtonInteractive(t > 1);
      }
      this.DGt();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "Text_ItemSelectForgeQuantityTip_text", this.t6);
    };
  }
  GetManufactureCount() {
    return this.t6;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [19, UE.UIScrollViewWithScrollbarComponent], [17, UE.UIText], [18, UE.UIItem], [20, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [1, UE.UIItem], [21, UE.UIItem], [8, UE.UIItem], [16, UE.UIItem], [22, UE.UIItem], [23, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [24, UE.UIItem], [25, UE.UIText], [11, UE.UIText], [12, UE.UIText], [13, UE.UITexture], [26, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  async OnBeforeStartAsync() {
    this.EGt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(19), this.TGt);
    this.MGt = new SvInfo();
    await this.MGt.CreateByActorAsync(this.GetItem(0).GetOwner());
    this.MGt.SetActive(true);
    this.gGt = new ProficiencyView();
    await this.gGt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner());
    this.gGt.BindChangeRoleClick(this.I7e);
  }
  OnStart() {
    this.GetItem(1).SetUIActive(false);
    this.GetText(17).ShowTextNew("PrefabTextItem_MaterialChoose_Text");
    this.GetText(23).ShowTextNew("NeedMaterialTitleText");
    this.IGt = new MediumItemGrid_1.MediumItemGrid();
    this.IGt.Initialize(this.GetItem(21).GetOwner());
    this.IGt.BindOnCanExecuteChange(() => false);
    this.IGt.BindOnExtendToggleClicked(t => {
      t = t.Data;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
    });
    var t = this.GetItem(8);
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(t);
    var t = {
      MaxNumber: 0,
      ValueChangeFunction: this.LGt
    };
    this.WGe.Init(t);
    this.WGe.SetNumberSelectTipsVisible(false);
    this.WGe.SetAddReduceButtonActive(true);
    this.MGt.ChangeRoleClickDelegate = this.I7e;
    this.MGt.SetTypeNameVisible(false);
    this.GetText(12).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.MGt.Destroy();
  }
  BindChangeClickCall(t) {
    this.vTi = t;
  }
  DGt() {
    this.RGt(this.SGt, this.yGt * this.t6);
    var t = this.EGt?.GetScrollItemList();
    if (t) {
      for (const e of t) {
        e.SetTimes(this.t6);
      }
    }
  }
  tkt(t) {
    this.fGt = t;
    this.t6 = 1;
    var e = CommonManager_1.CommonManager.GetMaxCreateCount(this.fGt.ItemId);
    this.WGe.Refresh(e);
    this.WGe.SetAddReduceButtonActive(true);
    this.WGe.SetReduceButtonInteractive(false);
    this.MGt.SetDescVisible(true);
    this.MGt.SetDescBgVisible(false);
    var e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(t.ItemId);
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(e.ItemId);
    var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(t, 1);
    var t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Desc), ...i);
    var i = StringUtils_1.StringUtils.IsEmpty(e.Background) ? "" : ConfigManager_1.ConfigManager.CookConfig.GetLocalText(e.Background);
    this.MGt.SetDesc(t);
    this.MGt.SetDescBg(i);
    this.gGt.SetExpNumVisible(false);
  }
  xGt(t) {
    let e = false;
    let i = 0;
    t = t.filter(t => t.L8n !== ComposeController_1.ComposeController.ComposeCoinId || (e = true, i = t.UVn, false));
    return [e, i, t];
  }
  MLi() {
    var t;
    var e;
    if (this.fGt.IsUnlock) {
      this.GetItem(20).SetUIActive(false);
      this.GetItem(18).SetUIActive(true);
      e = ModelManager_1.ModelManager.ForgingModel.GetForgingMaterialList(this.fGt.ItemId);
      [this.SGt, this.yGt, e] = this.xGt(e);
      this.EGt.RefreshByData(e, () => {
        this.DGt();
      });
    } else {
      this.GetItem(20).SetUIActive(true);
      this.GetItem(18).SetUIActive(false);
      e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(this.fGt.ItemId);
      if (t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e.FormulaItemId)) {
        e = {
          Type: 4,
          Data: e.FormulaItemId,
          ItemConfigId: e.FormulaItemId,
          BottomTextId: t.Name,
          IsProhibit: true,
          IsOmitBottomText: true
        };
        this.IGt.Apply(e);
      }
    }
  }
  vGt(t) {
    return !!t || (Log_1.Log.CheckError() && Log_1.Log.Error("Compose", 49, "缺少itemData数据"), false);
  }
  Z2n() {
    var t = CommonManager_1.CommonManager.GetCurrentRoleId();
    if (t) {
      this.gGt.SetRoleTexture(t);
    }
  }
  STi(t) {
    if (this.vGt(t)) {
      let t = CommonManager_1.CommonManager.GetCurrentRoleId();
      if (!t) {
        t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
        CommonManager_1.CommonManager.SetCurrentRoleId(t);
      }
      if (t) {
        this.gGt.SetRoleTexture(t);
      }
    }
  }
  RefreshHelpRole() {
    this.Z2n();
  }
  OnSecondTimerRefresh() {
    if (this.fGt) {
      this.AGt(this.fGt);
    }
  }
  AGt(t) {
    if (t.ExistEndTime <= 0) {
      this.GetItem(24).SetUIActive(false);
      this.WGe.ResetLimitMaxValue();
    } else {
      this.GetItem(24).SetUIActive(true);
      t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(t.ExistEndTime - TimeUtil_1.TimeUtil.GetServerTime());
      this.GetText(25).SetText(t.CountDownText);
    }
  }
  PGt(e) {
    if (e.TotalMakeCountInLimitTime <= 0) {
      this.GetItem(3).SetUIActive(false);
      this.WGe.ResetLimitMaxValue();
    } else {
      var i = e.TotalMakeCountInLimitTime - e.MadeCountInLimitTime;
      this.WGe.SetLimitMaxValue(Math.max(1, i));
      let t = i.toString();
      if (i === 0) {
        t = StringUtils_1.StringUtils.Format("<color=#c25757>{0}</color>", i.toString());
      }
      this.GetItem(3).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "MakeLimit", t, e.TotalMakeCountInLimitTime);
    }
  }
  RGt(t, e) {
    var i;
    this.GetText(12).GetParentAsUIItem().SetUIActive(t);
    if (t) {
      t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ComposeController_1.ComposeController.ComposeCoinId);
      i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(ComposeController_1.ComposeController.ComposeCoinId);
      if (t < e) {
        this.GetText(11).SetText(StringUtils_1.StringUtils.Format("<color=#c25757>{0}</color>", e.toString()));
      } else {
        this.GetText(11).SetText(e.toString());
      }
      this.SetTextureByPath(i.IconSmall, this.GetTexture(13));
    }
  }
  RefreshForging(t) {
    this.AGt(t);
    this.PGt(t);
    this.tkt(t);
    this.MLi();
    this.MGt.SetWeaponAttribute(t);
    if (t.IsUnlock) {
      this.gGt.SetActive(false);
      this.STi(this.fGt);
      this.WGe.SetActive(true);
      this.GetItem(22).SetUIActive(false);
      this.GetItem(16).SetUIActive(true);
      this.GetItem(9).SetUIActive(true);
    } else {
      this.gGt.SetActive(false);
      this.WGe.SetActive(false);
      this.GetItem(22).SetUIActive(true);
      this.GetItem(16).SetUIActive(false);
      this.GetItem(9).SetUIActive(false);
    }
  }
}
exports.ForgingIngredientsVerticalView = ForgingIngredientsVerticalView;
//# sourceMappingURL=ForgingIngredientsVerticalView.js.map