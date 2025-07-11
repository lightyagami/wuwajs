"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponLevelUpView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
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
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
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
    this.xOo = () => {
      this.aco();
      this.dji.PlayExpTween(this.vji);
      this.POo.length = 0;
      this.Iji();
      this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, 0, this.pji);
      this.Cji.SetMaxState(this.WeaponInstance.IsLevelMax());
    };
    this.wOo = e => {
      this.zuo = e;
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
        let e = false;
        let t = false;
        let i = false;
        for (const a of this.POo) {
          var s = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(a.IncId);
          if (s && (!e && ModelManager_1.ModelManager.WeaponModel.IsWeaponHighQuality(s) && (e = true), !t && ModelManager_1.ModelManager.WeaponModel.IsWeaponHighLevel(s) && (t = true), !i) && ModelManager_1.ModelManager.WeaponModel.IsWeaponHighResonanceLevel(s)) {
            i = true;
          }
        }
        let r = undefined;
        var o;
        var n = [];
        if (e) {
          o = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponHighQuality");
          n.push(o);
        }
        if (t) {
          o = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponHasLevelUp");
          n.push(o);
        }
        if (i) {
          o = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponHasResonance");
          n.push(o);
        }
        switch (n.length) {
          case 1:
            r = 3;
            break;
          case 2:
            r = 2;
            break;
          case 3:
            r = 1;
        }
        if (r) {
          (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(r)).SetTextArgs(...n);
          o.FunctionMap.set(2, () => {
            this.qOo();
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
        } else {
          this.qOo();
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponNoEnoughMoneyText");
      }
    };
    this.qOo = () => {
      var e = () => {
        var e = this.WeaponInstance.GetIncId();
        WeaponController_1.WeaponController.SendPbWeaponLevelUpRequest(e, this.POo);
      };
      var t = this.vji.GetOverExp();
      if (t > 0) {
        var i;
        var t = ModelManager_1.ModelManager.WeaponModel.GetCanChangeMaterialList(t);
        if (t.size > 0) {
          (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24)).ItemIdMap = t;
          i.FunctionMap.set(2, e);
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
          return;
        }
      }
      e();
    };
    this.bji = (e, t) => {
      var i = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData();
      var r = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemList(this.WeaponInstance.GetIncId());
      var s = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData();
      s.CurrentExp = this.vji.GetCurrentExp();
      s.CurrentLevel = this.vji.GetCurrentLevel();
      s.CurrentMaxLevel = this.vji.GetCurrentMaxLevel();
      s.MaxExpFunction = this.BOo;
      s.GetItemExpFunction = this.xji;
      var o = this.POo;
      var n = new SelectableComponent_1.SelectableComponentData();
      n.IsSingleSelected = false;
      n.OnChangeSelectedFunction = this.AMt;
      n.MaxSelectedGridNum = this.Cji.GetMaxCount();
      i.ItemDataBaseList = r;
      i.SelectedDataList = o ?? [];
      i.ExpData = s;
      i.SelectableComponentData = n;
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
      var s = this.GOo(this.Mji);
      for (const o of i) {
        if (!(o.GetQuality() > s)) {
          e = {
            IncId: o.GetUniqueId(),
            ItemId: o.GetConfigId(),
            Count: o.GetCount(),
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
      if (this.zuo.length > 0) {
        var e = [];
        for (const r of this.zuo) {
          var t = r[0];
          var i = r[1];
          var i = new RewardItemData_1.RewardItemData(t.ItemId, i, t.IncId);
          e.push(i);
        }
        ItemRewardController_1.ItemRewardController.OpenCommonRewardView(1010, e);
      }
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
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeaponLevelUp, this.xOo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeaponLevelUpReceiveItem, this.wOo);
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
    var s = [];
    for (const h of this.UOo) {
      var o = h.CurveId;
      var n = h.PropId.Value;
      var a = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(o, n, i, t);
      let e = 0;
      if (i < r) {
        e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(o, n, r, t);
      }
      o = {
        Id: h.PropId.Id,
        IsRatio: h.PropId.IsRatio,
        CurValue: a,
        BgActive: true,
        ShowNext: e > a,
        NextValue: e
      };
      s.push(o);
    }
    this.nvt.RefreshByData(s);
  }
  _co(e, t) {
    var i = [];
    var r = this.WeaponInstance.GetBreachLevel();
    for (const n of this.UOo) {
      var s = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(n.CurveId, n.PropId.Value, e, r);
      var o = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(n.CurveId, n.PropId.Value, t, r);
      if (s !== o) {
        s = new AttrListScrollData_1.AttrListScrollData(n.PropId.Id, s, o, 0, n.PropId.IsRatio, 0);
        i.push(RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(s));
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
}
exports.WeaponLevelUpView = WeaponLevelUpView;
//# sourceMappingURL=WeaponLevelUpView.js.map