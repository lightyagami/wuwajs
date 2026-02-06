"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponLevelUpView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiInteractLogReport_1 = require("../../../Ui/LogReport/UiInteractLogReport");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const CommonItemSelectView_1 = require("../../Common/CommonItemSelectView");
const CommonMultipleConsumeComponent_1 = require("../../Common/Consume/CommonMultipleConsumeComponent");
const ItemGridConsumeComponent_1 = require("../../Common/Consume/ItemGridConsumeComponent");
const ExpComponent_1 = require("../../Common/ExpTween/ExpComponent");
const CommonIntensifyPropExpData_1 = require("../../Common/Model/CommonIntensifyPropExpData");
const SelectableComponent_1 = require("../../Common/PropItem/SelectablePropItem/SelectableComponent");
const SelectableExpData_1 = require("../../Common/PropItem/SelectablePropItem/SelectableExpData");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ItemHintDefines_1 = require("../../ItemHint/Data/ItemHintDefines");
const ItemHintViewNew_1 = require("../../ItemHint/Views/ItemHintViewNew");
const RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const AttrListScrollData_1 = require("../../RoleUi/View/ViewData/AttrListScrollData");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const WeaponController_1 = require("../WeaponController");
class WeaponLevelUpView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.dji = undefined;
    this.vji = new SelectableExpData_1.SelectableExpData();
    this.WeaponInstance = undefined;
    this.UOo = undefined;
    this.Cji = undefined;
    this.zuo = [];
    this.POo = undefined;
    this.pji = undefined;
    this.Mji = undefined;
    this.nvt = undefined;
    this.N2i = undefined;
    this.O2i = undefined;
    this.Boo = () => {
      this.FOo();
    };
    this.xOo = () => {
      this.aco();
      this.dji.PlayExpTween(this.vji);
      this.POo.length = 0;
      this.Iji();
      this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, 0, this.pji);
      this.Cji.SetMaxState(this.WeaponInstance.IsLevelMax());
    };
    this.wOo = e => {
      this.zuo = e.sort((e, t) => {
        e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e[0].ItemId);
        return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t[0].ItemId).QualityId - e.QualityId;
      });
    };
    this.BOo = e => this.WeaponInstance.GetLevelExp(e);
    this.xji = e => {
      return ModelManager_1.ModelManager.WeaponModel.GetWeaponItemExp(e.IncId, e.ItemId);
    };
    this.tco = () => {
      this.bOo();
      this.k1o();
    };
    this.mvt = () => new AttributeItem_1.AttributeItem();
    this.Dji = () => {
      if (!this.POo || this.POo.length <= 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponSelectMaterialTipsText");
      } else if (this.Cji.GetEnoughMoney()) {
        var t = () => {
          var e = this.WeaponInstance.GetIncId();
          WeaponController_1.WeaponController.SendPbWeaponLevelUpRequest(e, this.POo);
        };
        if (ModelManager_1.ModelManager.WeaponModel.LevelUpConfirmTipsNotShow) {
          t();
        } else {
          var i = this.__d();
          var r = this.u_d();
          var n = r.size > 0;
          var s = i.length > 0;
          let e = undefined;
          if (n && s) {
            e = this.n_d(i, r);
          } else if (n) {
            e = this.s_d(r);
          } else if (s) {
            e = this.a_d(i);
          }
          if (e !== undefined) {
            e.FunctionMap.set(2, t);
            e.HasToggle = true;
            e.ToggleText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_WeaponLevelUpTips_Text");
            e.SetToggleFunction(e => {
              ModelManager_1.ModelManager.WeaponModel.LevelUpConfirmTipsNotShow = e;
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
          } else {
            t();
          }
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponNoEnoughMoneyText");
      }
    };
    this.bji = (e, t) => {
      var i = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData();
      var r = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemList(this.WeaponInstance.GetIncId());
      var n = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData();
      n.CurrentExp = this.vji.GetCurrentExp();
      n.CurrentLevel = this.vji.GetCurrentLevel();
      n.CurrentMaxLevel = this.vji.GetCurrentMaxLevel();
      n.MaxExpFunction = this.BOo;
      n.GetItemExpFunction = this.xji;
      var s = this.POo;
      var o = new SelectableComponent_1.SelectableComponentData();
      o.IsSingleSelected = false;
      o.OnChangeSelectedFunction = this.AMt;
      o.MaxSelectedGridNum = this.Cji.GetMaxCount();
      i.ItemDataBaseList = r;
      i.SelectedDataList = s ?? [];
      i.ExpData = n;
      i.SelectableComponentData = o;
      i.UseWayId = 2;
      UiManager_1.UiManager.OpenView("CommonItemSelectViewRight", i);
    };
    this.AMt = (e, t) => {
      this.POo = e;
      this.vji = t;
      this.Aji();
    };
    this.Bji = () => {
      this.bji(0, 0);
    };
    this.Uji = () => {
      this.POo = [];
      this.Aji();
    };
    this.Pji = () => {
      var e;
      var t;
      var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemListUseToAuto(this.WeaponInstance.GetIncId());
      var r = [];
      var n = this.GOo(this.Mji);
      for (const s of i) {
        if (!(s.GetQuality() > n)) {
          e = {
            IncId: s.GetUniqueId(),
            ItemId: s.GetConfigId(),
            Count: s.GetCount(),
            SelectedCount: 0
          };
          r.push(e);
        }
      }
      if (r.length === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RoleNoMaterial");
      } else {
        i = this.vji.GetExpDistanceToMax();
        t = this.Cji.GetMaxCount();
        i = ModelManager_1.ModelManager.WeaponModel.AutoAddExpItem(i, t, r, this.xji);
        this.POo = i;
        this.POo.sort((e, t) => {
          e = e.IncId > 0;
          if (e != t.IncId > 0) {
            if (e) {
              return 1;
            } else {
              return -1;
            }
          } else {
            return 0;
          }
        });
        this.Aji();
      }
    };
    this.wji = (t, i) => {
      for (let e = this.POo.length - 1; e >= 0; e--) {
        if (this.POo[e].ItemId === i && this.POo[e].IncId === t && (this.POo[e].SelectedCount--, this.POo[e].SelectedCount === 0)) {
          this.POo.splice(e, 1);
        }
      }
      this.Aji();
    };
    this.oLt = e => {
      this.Mji = e;
      this.NOo();
    };
    this.nco = () => {
      UiInteractLogReport_1.UiInteractLogReport.ReportSpaceKeyInteract(8);
      this.o_d();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WeaponCanGoBreach);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = new CommonMultipleConsumeComponent_1.CommonMultipleConsumeFunction();
    e.StrengthFunction = this.Dji;
    e.MaterialItemFunction = this.bji;
    e.ItemClickFunction = this.Bji;
    e.ReduceItemFunction = this.wji;
    e.AutoFunction = this.Pji;
    e.DeleteSelectFunction = this.Uji;
    this.Cji = new ItemGridConsumeComponent_1.ItemGridConsumeComponent(this.GetItem(2), e);
    await this.Cji.Init();
    this.Cji.SetActive(true);
  }
  OnStart() {
    var e = this.ExtraParams;
    this.WeaponInstance = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    this.OOo();
    this.Uho();
    this.kOo();
  }
  OnBeforeDestroy() {
    this.dji.Destroy();
    this.Cji.Destroy();
    this.o_d();
  }
  OnBeforeShow() {
    this.bOo();
    this.P5e();
    this.k1o();
    this.FOo();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeaponLevelUp, this.xOo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeaponLevelUpReceiveItem, this.wOo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerCurrencyChange, this.Boo);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeaponLevelUp, this.xOo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeaponLevelUpReceiveItem, this.wOo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerCurrencyChange, this.Boo);
  }
  OnHideUiTabViewBase(e) {
    if (e) {
      UiManager_1.UiManager.CloseView("CommonItemSelectViewRight");
    }
  }
  OOo() {
    this.dji = new ExpComponent_1.ExpComponent(this.GetItem(0), false);
    this.dji.Init();
    this.dji.SetLevelFormatText("LevelNumber");
    this.dji.BindPlayCompleteCallBack(this.tco);
    this.vji.SetMaxExpFunction(this.BOo);
  }
  bOo() {
    this.VOo();
    this.dji.UpdateInitState(this.vji);
  }
  VOo() {
    var e = this.WeaponInstance.GetLevel();
    var t = this.WeaponInstance.GetCurrentMaxLevel();
    var i = this.WeaponInstance.GetExp();
    var r = this.WeaponInstance.GetMaxLevel();
    this.vji.UpdateComponent(e, t, i, r);
  }
  aco() {
    var t = this.vji.GetCurrentLevel();
    var i = this.WeaponInstance.GetLevel();
    this.N2i = UiSceneManager_1.UiSceneManager.GetWeaponObserver();
    this.O2i = UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver();
    WeaponController_1.WeaponController.PlayWeaponRenderingMaterial("WeaponLevelUpMaterialController", this.N2i, this.O2i);
    var r = this.N2i.Model;
    UiModelUtil_1.UiModelUtil.PlayEffectAtRootComponent(r, "WeaponLevelUpEffect");
    if (t !== i) {
      r = this._co(t, i);
      let e = undefined;
      if (e = this.WeaponInstance.CanGoBreach() ? {
        Title: "Text_WeaponLevelUpSuccessText_Text",
        LevelInfo: {
          PreUpgradeLv: t,
          UpgradeLv: i,
          FormatStringId: "Text_LevelShow_Text",
          IsMaxLevel: true
        },
        AttributeInfo: r,
        ClickText: "Text_TurnToBreach_Text",
        ClickFunction: this.nco
      } : {
        Title: "Text_WeaponLevelUpSuccessText_Text",
        LevelInfo: {
          PreUpgradeLv: t,
          UpgradeLv: i,
          FormatStringId: "Text_LevelShow_Text",
          IsMaxLevel: this.WeaponInstance.GetLevel() === this.WeaponInstance.GetMaxLevel()
        },
        AttributeInfo: r
      }) {
        t = ConfigManager_1.ConfigManager.RoleConfig.GetWeaponLevelUpSuccessDelayTime();
        UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", true);
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(e);
          UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", false);
          this.c_d();
        }, t);
      }
    }
  }
  Uho() {
    this.nvt = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.mvt);
  }
  k1o() {
    var e = this.WeaponInstance.GetWeaponConfig();
    this.UOo = ModelManager_1.ModelManager.WeaponModel.GetWeaponAttributeParamList(e);
    var t = this.WeaponInstance.GetBreachLevel();
    var i = this.vji.GetCurrentLevel();
    var r = this.vji.GetArrivedLevel();
    var n = [];
    for (const h of this.UOo) {
      var s = h.CurveId;
      var o = h.PropId.Value;
      var a = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(s, o, i, t);
      let e = 0;
      if (i < r) {
        e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(s, o, r, t);
      }
      s = {
        Id: h.PropId.Id,
        IsRatio: h.PropId.IsRatio,
        CurValue: a,
        BgActive: true,
        ShowNext: e > a,
        NextValue: e
      };
      n.push(s);
    }
    this.nvt.RefreshByData(n);
  }
  _co(e, t) {
    var i = [];
    var r = this.WeaponInstance.GetBreachLevel();
    for (const o of this.UOo) {
      var n = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(o.CurveId, o.PropId.Value, e, r);
      var s = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(o.CurveId, o.PropId.Value, t, r);
      if (n !== s) {
        n = new AttrListScrollData_1.AttrListScrollData(o.PropId.Id, n, s, 0, o.PropId.IsRatio, 0);
        i.push(RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(n));
      }
    }
    return i;
  }
  kOo() {
    this.Cji.InitFilter(2, this.oLt);
    this.Cji.SetConsumeTexture(ItemDefines_1.EItemId.Gold);
    this.Mji = this.Cji.GetCurrentDropDownSelectIndex();
    if (this.Mji) {
      this.NOo();
    }
    var t = this.Cji.GetMaxCount();
    this.pji = new Array(t);
    for (let e = 0; e < t; e++) {
      this.pji[e] = [{
        IncId: 0,
        ItemId: 0
      }, 0];
    }
  }
  FOo() {
    this.Aji();
    this.Cji.SetMaxState(this.WeaponInstance.IsLevelMax());
  }
  __d() {
    let e = false;
    let t = false;
    let i = false;
    for (const o of this.POo) {
      var r = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(o.IncId);
      if (r && (!e && ModelManager_1.ModelManager.WeaponModel.IsWeaponHighQuality(r) && (e = true), !t && ModelManager_1.ModelManager.WeaponModel.IsWeaponHighLevel(r) && (t = true), !i) && ModelManager_1.ModelManager.WeaponModel.IsWeaponHighResonanceLevel(r)) {
        i = true;
      }
    }
    var n;
    var s = [];
    if (e) {
      n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponHighQuality");
      s.push(n);
    }
    if (t) {
      n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponHasLevelUp");
      s.push(n);
    }
    if (i) {
      n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponHasResonance");
      s.push(n);
    }
    return s;
  }
  u_d() {
    let e = undefined;
    var t = this.vji.GetOverExp();
    return e = t > 0 ? ModelManager_1.ModelManager.WeaponModel.GetCanChangeMaterialList(t) : new Map();
  }
  a_d(e) {
    let t = undefined;
    switch (e.length) {
      case 1:
        t = 3;
        break;
      case 2:
        t = 2;
        break;
      case 3:
        t = 1;
    }
    var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t);
    i.SetTextArgs(...e);
    return i;
  }
  s_d(e) {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24);
    t.ItemIdMap = e;
    return t;
  }
  n_d(e, t) {
    let i = undefined;
    switch (e.length) {
      case 1:
        i = 357;
        break;
      case 2:
        i = 358;
        break;
      case 3:
        i = 359;
    }
    var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(i);
    r.SetTextArgs(...e);
    r.ItemIdMap = t;
    return r;
  }
  NOo() {
    var e = this.GOo(this.Mji);
    this.Cji.RefreshConditionText(ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e).ConsumeFilterText);
  }
  GOo(e) {
    var t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList();
    return t[MathUtils_1.MathUtils.Clamp(e, 0, t.length - 1)].Id;
  }
  Aji() {
    let t = 0;
    this.Iji();
    if (this.POo) {
      for (let e = 0; e < this.POo.length; e++) {
        var i = this.POo[e];
        var r = this.pji[e];
        r[0].IncId = i.IncId;
        r[0].ItemId = i.ItemId;
        r[1] = i.SelectedCount;
        t += this.xji(i) * i.SelectedCount;
      }
    }
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemListCost(this.pji);
    this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, e, this.pji);
    this.vji.UpdateExp(t);
    this.dji.Update(this.vji);
    this.k1o();
  }
  P5e() {
    var e = this.WeaponInstance.GetWeaponConfig();
    var t = e.WeaponName;
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e.QualityId);
    var e = UE.Color.FromHex(e.DropColor);
    this.GetText(4).SetColor(e);
    this.GetText(4).ShowTextNew(t);
  }
  Iji() {
    this.pji.forEach(e => {
      e[0].IncId = 0;
      e[0].ItemId = 0;
      e[1] = 0;
    });
  }
  o_d() {
    if (UiManager_1.UiManager.IsViewOpen("ItemHintViewNew")) {
      UiManager_1.UiManager.CloseView("ItemHintViewNew");
    }
  }
  c_d() {
    var e;
    if (this.zuo.length > 0) {
      (e = new ItemHintViewNew_1.ItemHintViewNewData()).CheckPriorNext = () => this.zuo.length > 0;
      e.ShiftPriorItem = () => {
        var e = this.zuo.shift();
        var t = new ItemHintDefines_1.ItemRewardInfo();
        t.ItemId = e[0].ItemId;
        t.ItemCount = e[1];
        var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e[0].ItemId);
        t.Quality = e.QualityId;
        return t;
      };
      e.TitleTextId = "Text_ItemReturnTitle_Text";
      UiManager_1.UiManager.OpenView("ItemHintViewNew", e);
    }
  }
}
exports.WeaponLevelUpView = WeaponLevelUpView;
//# sourceMappingURL=WeaponLevelUpView.js.map