"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgingRootView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid");
const NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const CommonManager_1 = require("../../Common/CommonManager");
const ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem");
const ComposeController_1 = require("../../Compose/ComposeController");
const ForgingController_1 = require("../ForgingController");
const ForgingMediumItemGrid_1 = require("./ForgingMediumItemGrid");
const TIMERGAP = 1000;
class ForgingRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.yLi = 0;
    this.ILi = undefined;
    this.TLi = new Array();
    this.LLi = undefined;
    this.vNt = undefined;
    this.MNt = undefined;
    this.GOe = undefined;
    this.WGe = undefined;
    this.i8l = false;
    this.t6 = 1;
    this.fGt = undefined;
    this.SGt = false;
    this.yGt = 0;
    this.IGt = undefined;
    this.EGt = undefined;
    this._Li = undefined;
    this.uLi = undefined;
    this.cLi = undefined;
    this.BNt = () => {
      this.dal();
      if (this.bNt() || this.NNt()) {
        ForgingController_1.ForgingController.SendForgeInfoRequestAsync().then(() => {
          this.RLi();
        });
      }
    };
    this.nWs = () => {
      this.MNt.UpdateData(24, this.LNt());
    };
    this.jwe = e => {
      if (e === "OnBlackScreen") {
        ForgingController_1.ForgingController.PlayForgingEnterDisplay();
      }
    };
    this.cHe = () => {
      var e = new ForgingMediumItemGrid_1.ForgingMediumItemGrid();
      e.BindOnExtendToggleStateChanged(this.HTi);
      return e;
    };
    this.HTi = e => {
      e = e.Data;
      this.ILi.DeselectCurrentGridProxy();
      this.yLi = this.TLi.indexOf(e);
      this.LLi = e;
      if (this.ILi.IsGridDisplaying(this.yLi)) {
        if (e.IsNew) {
          e.IsNew = false;
          ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey, e.ItemId);
        }
        this.ILi.SelectGridProxy(this.yLi);
        this.ILi.RefreshGridProxy(this.yLi);
        this.r8l(e);
        this.ekt(e);
        this.o8l(e);
      }
    };
    this.RLi = () => {
      this.MNt.UpdateData(24, this.LNt());
    };
    this.jNt = () => {
      this.ILi.ReloadData(this.TLi);
    };
    this.Q9t = () => {
      UiManager_1.UiManager.OpenView("ManufactureHelpRoleView", this.LLi.ItemId);
    };
    this.FNt = e => {
      this.TLi = e;
      this.TLi = this.TLi.filter(e => e.ExistStartTime <= 0 || TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime));
      this.jNt();
      if (this.TLi.length !== 0) {
        this.wLi(true);
      }
    };
    this.LGt = e => {
      this.t6 = e;
      if (this.fGt) {
        t = ForgingController_1.ForgingController.GetMaxCreateCount(this.fGt.ItemId);
        this.WGe.SetAddButtonInteractive(e < t);
        this.WGe.SetReduceButtonInteractive(e > 1);
      }
      var t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemSelectForgeQuantityTip_text"), "" + this.t6);
      this.WGe.SetNumberSelectTipsText(t);
      this.DGt();
    };
    this.xLi = () => {
      this.MNt.UpdateData(24, this.LNt());
    };
    this.OnClickBackBtn = () => {
      this.CloseMe();
    };
    this.TGt = () => {
      var e = new ManufactureMaterialItem_1.ManufactureMaterialItem();
      e.BindOnCanExecuteChange(() => false);
      e.BindOnExtendToggleClicked(e => {
        e = e.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.L8n);
      });
      return e;
    };
    this.vke = () => {
      return new StarItem();
    };
    this.Wft = 1;
    this.CLi = 0;
    this.sOt = () => {
      if (this.GetButton(27).IsSelfInteractive) {
        if (this.fGt.IsUnlock) {
          CommonManager_1.CommonManager.SendManufacture(this.fGt.ItemId, this.t6);
        } else {
          ForgingController_1.ForgingController.SendForgeFormulaUnlockRequest(this.fGt.ItemId);
        }
      } else {
        ForgingController_1.ForgingController.PlayForgingFailDisplay(() => {
          ForgingController_1.ForgingController.PlayForgingLoopDisplay();
        });
      }
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GetForgingData, this.nWs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenHelpRole, this.Q9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ForgingSuccess, this.RLi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ForgingFail, this.RLi);
    this.GOe = TimerSystem_1.TimerSystem.Forever(this.BNt, TIMERGAP);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GetForgingData, this.nWs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenHelpRole, this.Q9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ForgingSuccess, this.jNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ForgingFail, this.jNt);
    if (this.GOe && TimerSystem_1.TimerSystem.Has(this.GOe)) {
      TimerSystem_1.TimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  dal() {
    this.i8l = false;
    this.n8l();
    this.PGt();
    this.GetItem(29)?.SetUIActive(this.i8l);
  }
  n8l() {
    var e = ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTime();
    if (e) {
      this.i8l = true;
      this.GetText(26)?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(26), "RefreshTime", e);
    } else {
      this.GetText(26)?.SetUIActive(false);
    }
  }
  bNt() {
    return ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTimeValue() <= 0;
  }
  NNt() {
    var e = this.LNt();
    if (e) {
      for (const t of e) {
        if (t.ExistEndTime > 0 && !TimeUtil_1.TimeUtil.IsInTimeSpan(t.ExistStartTime, t.ExistEndTime)) {
          return true;
        }
      }
    }
    return false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UITexture], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UIHorizontalLayout], [11, UE.UIItem], [12, UE.UITexture], [13, UE.UIText], [14, UE.UIText], [15, UE.UITexture], [16, UE.UIText], [17, UE.UIText], [18, UE.UIText], [19, UE.UIText], [20, UE.UIText], [21, UE.UIItem], [22, UE.UIScrollViewWithScrollbarComponent], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIText], [26, UE.UIText], [27, UE.UIButtonComponent], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIText], [31, UE.UIText], [32, UE.UIItem], [34, UE.UITexture], [33, UE.UIText]];
    this.BtnBindInfo = [[27, this.sOt]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.OnClickBackBtn);
    this.lqe.SetTitleIcon("/Game/Aki/UI/UIResources/Common/Atlas/TabIcon/SP_IconForge.SP_IconForge");
    this.lqe.SetTitleByTextIdAndArgNew("NpcSystemBackground_1008_Title");
    await this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]);
    this.lqe.SetCurrencyItemVisible(true);
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(this.GetItem(24));
    var e = {
      MaxNumber: 0,
      ValueChangeFunction: this.LGt
    };
    this.WGe.Init(e);
    this.WGe.SetNumberSelectTipsVisible(false);
    this.WGe.SetAddReduceButtonActive(true);
    this.EGt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(22), this.TGt);
    this.IGt = new MediumItemGrid_1.MediumItemGrid();
    this.IGt.Initialize(this.GetItem(21).GetOwner());
    this.IGt.BindOnCanExecuteChange(() => false);
    this.IGt.BindOnExtendToggleClicked(e => {
      e = e.Data;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
    });
    this.cLi = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.vke);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent, this.jwe);
  }
  OnStart() {
    this.vNt = new FilterEntrance_1.FilterEntrance(this.GetItem(3), this.FNt);
    this.MNt = new SortEntrance_1.SortEntrance(this.GetItem(4), this.FNt);
    this.vNt.SetActive(false);
    this.ILi = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetLoopScrollViewComponent(1).TemplateGrid, this.cHe);
    ForgingController_1.ForgingController.RegisterCurrentInteractionEntity();
    CommonManager_1.CommonManager.SetCurrentSystem(2);
    ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 0;
    ModelManager_1.ModelManager.ForgingModel.CurrentInteractCreatureDataLongId = ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId;
    if (ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId === undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Forging", 64, "[LevelEventOpenSystem] 打开合成界面时找不到交互对象，直接关闭界面");
      }
      this.CloseMe();
    }
  }
  OnBeforeShow() {
    this.xLi();
    this.nWs();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent, this.jwe);
    this.vNt.Destroy();
    this.MNt.Destroy();
    ForgingController_1.ForgingController.PlayLeaveForgingAudio();
    ForgingController_1.ForgingController.ClearCurrentInteractionEntityDisplay();
    ModelManager_1.ModelManager.ForgingModel.CurrentForgingRoleId = 0;
  }
  r8l(e) {
    var e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e.ItemId);
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e.ItemId);
    this.GetText(8).ShowTextNew(t?.WeaponName ?? "");
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.ItemId);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "Have", t);
  }
  ekt(e) {
    let t = true;
    var i = ModelManager_1.ModelManager.ForgingModel;
    var r = i.CheckUnlock(e);
    var s = i.CheckCoinEnough(e.ItemId);
    var n = i.CheckLimitCount(e);
    let o = "";
    if (r) {
      o = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponMaking");
      t = i.CheckMaterialEnough(e.ItemId);
    } else {
      o = ConfigManager_1.ConfigManager.TextConfig.GetTextById("UnlockWeapon");
    }
    this.GetText(30).SetText(o);
    this.GetText(31).SetText(this.ikt(r, t, s, n));
    this.GetItem(28).SetUIActive(!r || !t || !n);
    this.GetButton(27).RootUIComp.SetUIActive(r && t && n);
  }
  ikt(e, t, i, r) {
    if (e) {
      if (t) {
        if (r) {
          return "";
        } else if ((e = ModelManager_1.ModelManager.ForgingModel.GetRefreshLimitTime()) === undefined) {
          return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeCountWithoutTime");
        } else {
          return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeCount"), e);
        }
      } else {
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LackMakeMaterial");
        if (i) {
          return StringUtils_1.StringUtils.Format(t, MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Material_Text"));
        } else {
          return StringUtils_1.StringUtils.Format(t, ConfigManager_1.ConfigManager.ItemConfig.GetItemName(ForgingController_1.ForgingController.ForgingCostId));
        }
      }
    } else {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("GenericPrompt_Unlocked_TipsText");
    }
  }
  wLi(e = false) {
    this.ILi.DeselectCurrentGridProxy();
    if (e) {
      this.ILi.ScrollToGridIndex(this.yLi);
    }
    this.ILi.SelectGridProxy(this.yLi);
    e = this.TLi[this.yLi];
    this.r8l(e);
    this.ekt(e);
    this.o8l(e);
  }
  DGt() {
    this.RGt(this.SGt, this.yGt * this.t6);
    var e = this.EGt?.GetScrollItemList();
    if (e) {
      for (const t of e) {
        t.SetTimes(this.t6);
      }
    }
  }
  RGt(e, t) {
    var i;
    this.GetItem(32).GetParentAsUIItem().SetUIActive(e);
    if (e) {
      e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ComposeController_1.ComposeController.ComposeCoinId);
      i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(ComposeController_1.ComposeController.ComposeCoinId);
      if (e < t) {
        this.GetText(33).SetText(StringUtils_1.StringUtils.Format("<color=#c25757>{0}</color>", t.toString()));
      } else {
        this.GetText(33).SetText(t.toString());
      }
      this.SetTextureByPath(i.IconSmall, this.GetTexture(34));
    }
  }
  o8l(e) {
    this.tkt(e);
    this.MLi();
    this.dal();
    this.s8l();
    if (e.IsUnlock) {
      this.WGe.SetActive(true);
    } else {
      this.WGe.SetActive(false);
    }
  }
  PGt() {
    if ((this.fGt?.TotalMakeCountInLimitTime ?? 0) <= 0) {
      this.WGe.ResetLimitMaxValue();
      this.GetText(25)?.SetUIActive(false);
    } else {
      this.i8l = true;
      this.GetText(25)?.SetUIActive(true);
      var t = this.fGt.TotalMakeCountInLimitTime - this.fGt.MadeCountInLimitTime;
      this.WGe.SetLimitMaxValue(Math.max(1, t));
      let e = t.toString();
      if (t === 0) {
        e = StringUtils_1.StringUtils.Format("<color=#c25757>{0}</color>", t.toString());
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), "MakeLimit", e, this.fGt.TotalMakeCountInLimitTime);
    }
  }
  tkt(e) {
    this.fGt = e;
    this.t6 = 1;
    var t = CommonManager_1.CommonManager.GetMaxCreateCount(this.fGt.ItemId);
    this.WGe.Refresh(t);
    this.WGe.SetAddReduceButtonActive(true);
    this.WGe.SetReduceButtonInteractive(false);
    var t = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e.ItemId);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(t.ItemId);
    var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(e, 1);
    var e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Desc), ...t);
    this.GetText(20).SetText(e);
  }
  MLi() {
    var e;
    var t;
    if (this.fGt.IsUnlock) {
      this.IGt.SetUiActive(false);
      this.EGt.SetActive(true);
      t = ModelManager_1.ModelManager.ForgingModel.GetForgingMaterialList(this.fGt.ItemId);
      [this.SGt, this.yGt, t] = this.xGt(t);
      this.EGt.RefreshByData(t, () => {
        this.DGt();
      });
    } else {
      this.IGt.SetUiActive(true);
      this.EGt.SetActive(false);
      t = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(this.fGt.ItemId);
      if (e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t.FormulaItemId)) {
        t = {
          Type: 4,
          Data: t.FormulaItemId,
          ItemConfigId: t.FormulaItemId,
          BottomTextId: e.Name,
          IsProhibit: true,
          IsOmitBottomText: true
        };
        this.IGt.Apply(t);
      }
    }
  }
  xGt(e) {
    let t = false;
    let i = 0;
    e = e.filter(e => e.L8n !== ComposeController_1.ComposeController.ComposeCoinId || (t = true, i = e.UVn, false));
    return [t, i, e];
  }
  s8l() {
    var e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(this.fGt.ItemId);
    this._Li = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e.ItemId);
    this.uLi = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(this._Li.BreachId, 1);
    this.gLi();
    this.fLi();
    this.aqe();
    this.pLi();
    this.a8l();
  }
  gLi() {
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(this._Li.ResonId, 1);
    if (e) {
      this.GetText(19).ShowTextNew(e.Name);
    }
  }
  fLi() {
    var e = this.uLi.LevelLimit;
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "ForgingWeaponLevel", 1, e);
  }
  aqe() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(this._Li.BreachId);
    var e = new Array(e);
    this.cLi.RefreshByData(e);
  }
  LNt(e = true) {
    let t = ModelManager_1.ModelManager.ForgingModel.GetForgingDataList();
    return t = t && e ? t.filter(e => e.IsUnlock > 0 || e.FormulaItemId > 0) : t;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (this.ILi?.DataInited) {
      t = Number(e[0]);
      if (t = this.ILi.GetGridByDisplayIndex(t)) {
        return [t, t];
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 53, "印造界面聚焦引导的额外参数配置错误", ["configParams", e]);
        }
        return;
      }
    }
  }
  pLi() {
    var e = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(this._Li.FirstPropId.Id);
    this.GetText(13)?.ShowTextNew(e.Name);
    this.SetTextureByPath(e.Icon, this.GetTexture(12));
    var t = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(this._Li.FirstCurve, this._Li.FirstPropId.Value, this.Wft, this.CLi);
    var t = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(this._Li.FirstPropId.Id, t, this._Li.FirstPropId.IsRatio);
    this.GetText(14)?.SetText(t);
    var t = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(this._Li.SecondPropId.Id);
    this.GetText(16)?.ShowTextNew(t.Name);
    this.SetTextureByPath(e.Icon, this.GetTexture(15));
    var t = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(this._Li.SecondCurve, this._Li.SecondPropId.Value, this.Wft, this.CLi);
    var e = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(this._Li.SecondPropId.Id, t, this._Li.SecondPropId.IsRatio);
    this.GetText(17)?.SetText(e);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(18), "WeaponResonanceItemLevelText", "1");
  }
  a8l() {
    this.SetTextureByPath(this._Li.Icon, this.GetTexture(6));
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(this._Li.QualityId);
    if (e) {
      this.SetSpriteByPath(e.ComposeQualityBg, this.GetSprite(5), false);
    }
  }
}
exports.ForgingRootView = ForgingRootView;
class StarItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
  }
  Refresh(e, t, i) {
    if (e === 0) {
      this.GetSprite(0).SetUIActive(true);
      this.GetSprite(1).SetUIActive(false);
    } else {
      this.GetSprite(0).SetUIActive(false);
      this.GetSprite(1).SetUIActive(true);
    }
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite]];
    this.BtnBindInfo = [];
  }
  SetState(e) {}
}
//# sourceMappingURL=ForgingRootView.js.map