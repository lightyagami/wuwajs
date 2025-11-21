"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionLevelUpView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiInteractLogReport_1 = require("../../../../Ui/LogReport/UiInteractLogReport");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView");
const CommonMultipleConsumeComponent_1 = require("../../../Common/Consume/CommonMultipleConsumeComponent");
const ItemGridConsumeComponent_1 = require("../../../Common/Consume/ItemGridConsumeComponent");
const ExpComponent_1 = require("../../../Common/ExpTween/ExpComponent");
const MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid");
const CommonIntensifyPropExpData_1 = require("../../../Common/Model/CommonIntensifyPropExpData");
const SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent");
const SelectableExpData_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableExpData");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const ItemHintDefines_1 = require("../../../ItemHint/Data/ItemHintDefines");
const ItemHintViewNew_1 = require("../../../ItemHint/Views/ItemHintViewNew");
const RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const PhantomBattleController_1 = require("../../PhantomBattle/PhantomBattleController");
const VisionDefine_1 = require("../VisionDefine");
const VisionIdentifyComponent_1 = require("./VisionIdentifyComponent");
const VisionMainAttributeComponent_1 = require("./VisionMainAttributeComponent");
const VisionNameText_1 = require("./VisionNameText");
class VisionLevelUpView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.dji = undefined;
    this.Cji = undefined;
    this.qHi = 0;
    this.gji = 0;
    this.fji = [];
    this.pji = undefined;
    this.vji = undefined;
    this.bHi = undefined;
    this.BHi = undefined;
    this.Mji = 0;
    this.NHi = false;
    this.p9i = undefined;
    this.Ndl = false;
    this.ebt = undefined;
    this.tBu = 0;
    this.iBu = undefined;
    this.rBu = undefined;
    this.oLt = e => {
      this.Mji = e;
      e = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList()[this.Mji].Id;
      this.Cji.RefreshConditionText(ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e).ConsumeFilterText);
    };
    this.Eji = e => {
      if (e) {
        UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", false);
        this.Ndl = false;
        e = this.Sji();
        this.vji = e;
        this.dji.UpdateInitState(e);
      }
    };
    this.yji = () => {
      this.fji = [];
      this.Iji();
      this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, 0, this.pji);
      this.gji = 0;
      this.Gau();
      this.oBu();
      this.Rft();
      this.Tji();
    };
    this.I3a = e => {
      if (e === this.qHi) {
        this.Oqe();
      }
    };
    this.f1l = () => {
      this.v1l();
    };
    this.nBu = () => {
      this.Aji();
    };
    this.sBu = () => {
      this.hjc();
    };
    this.hjc = async () => {
      if (this.aBu() && this.hBu() && (await this.lBu())) {
        this.Dji();
      }
    };
    this.Dji = () => {
      const e = new Array();
      const t = new Map();
      this.e_d(e, t);
      this.t_d(t);
      this.i_d(t);
      const i = () => {
        if (!this.r_d(e, t)) {
          ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomLevelUpRequest(this.qHi, e, this.tBu);
        }
      };
      let r = false;
      for (const n of e) {
        if (n.w5n > 0 && ModelManager_1.ModelManager.VisionEquipGroupModel.CheckVisionListIfInGroup([n.w5n])) {
          r = true;
          break;
        }
      }
      var o;
      if (r) {
        (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(247)).FunctionMap.set(2, () => {
          i();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
      } else {
        i();
      }
    };
    this.Uji = () => {
      this.fji = [];
      this.Aji();
    };
    this.Pji = () => {
      var t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList()[this.Mji].Id;
      var i = ModelManager_1.ModelManager.PhantomBattleModel;
      var r = i.GetVisionLevelUpMaterialUseType();
      var t = i.GetSortedExpMaterialList(this.qHi, t, r === 0);
      if (t.length === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RoleNoMaterial");
      } else {
        const s = new Array();
        t.forEach(e => {
          e = {
            IncId: e.GetUniqueId(),
            ItemId: e.GetConfigId(),
            Count: e.GetCount(),
            SelectedCount: 0
          };
          s.push(e);
        });
        r = i.GetVisionLevelUpMaterialPutInMode() === 1;
        let e = 0;
        if (r) {
          var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionLevelStageList");
          var o = this.vji.GetCurrentLevel();
          var n = this.vji.GetCurrentMaxLevel();
          for (const a of t) {
            if (a > n) {
              break;
            }
            if (a > o) {
              e = this.vji.GetExpDistanceToLevel(a);
              break;
            }
          }
        } else {
          e = this.vji.GetExpDistanceToMax();
        }
        i = ModelManager_1.ModelManager.WeaponModel;
        t = this.Cji.GetMaxCount();
        if (r && !i.CheckSatisfyExp(e, t, s, this.xji)) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_EchoMaterialLack_Text");
        }
        r = i.AutoAddExpItem(e, t, s, this.xji);
        this.fji = r;
        this.Aji();
      }
    };
    this.wji = (t, i) => {
      for (let e = this.fji.length - 1; e >= 0; e--) {
        if (this.fji[e].ItemId === i && this.fji[e].IncId === t && (this.fji[e].SelectedCount--, this.fji[e].SelectedCount === 0)) {
          this.fji.splice(e, 1);
        }
      }
      this.Aji();
    };
    this.Bji = () => {
      this.bji(0, 0);
    };
    this.bji = (e, t) => {
      var i = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData();
      var r = ModelManager_1.ModelManager.PhantomBattleModel.GetExpMaterialList(this.qHi);
      var o = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
      var n = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData();
      n.CurrentExp = o.GetExp();
      n.CurrentLevel = o.GetPhantomLevel();
      n.CurrentMaxLevel = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(this.qHi);
      n.MaxExpFunction = this.qji;
      n.GetItemExpFunction = this.xji;
      var o = this.fji;
      i.ItemDataBaseList = r;
      i.SelectedDataList = o;
      i.UseWayId = 26;
      i.ExpData = n;
      var r = new SelectableComponent_1.SelectableComponentData();
      r.IsSingleSelected = false;
      r.MaxSelectedGridNum = this.Cji.GetMaxCount();
      (i.SelectableComponentData = r).OnChangeSelectedFunction = this.AMt;
      UiManager_1.UiManager.OpenView("CommonItemSelectViewRight", i);
    };
    this.qji = e => {
      var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
      var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(t.GetConfigId());
      return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelExpByGroupIdAndLevel(t.PhantomItem.LevelUpGroupId, e + 1);
    };
    this.AMt = (e, t) => {
      this.fji = e;
      this.vji = t;
      this.Aji();
    };
    this.xji = e => {
      var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(e.IncId);
      if (t) {
        return t.GetEatFullExp();
      } else {
        return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemById(e.ItemId).Exp;
      }
    };
    this.OnClickLockToggle = () => {
      var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.qHi);
      if (e !== undefined) {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(this.qHi, !e.GetIsLock());
      }
    };
    this.OnClickDeprecateToggle = () => {
      var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.qHi);
      if (e !== undefined) {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemDeprecateRequest(this.qHi, !e.GetIsDeprecated());
      }
    };
    this.wYt = e => {
      this.ebt?.SetSelected(false, true);
      var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi).GetCurrentIdentifyCostId();
      var i = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(t);
      let r = 0;
      if ((r = i.length > 0 ? i[0].GetUniqueId() : r) !== undefined && r > 0) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(r, t);
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
      }
    };
    this._Bu = () => {
      let e = undefined;
      let t = false;
      let i = false;
      switch (this.iBu) {
        case 0:
          e = "PrefabTextItem_1704419995_Text";
          break;
        case 1:
          e = "IdentifyText";
          break;
        case 2:
          e = "TuneEchoesProject_Button2";
          break;
        case 3:
          e = "TuneEchoesProject_Button4";
          t = true;
          break;
        case 4:
          e = "PrefabTextItem_1826757657_Text";
          t = true;
          break;
        case 5:
          e = "PrefabTextItem_183779057_Text";
          t = true;
          i = true;
          break;
        default:
          e = "PrefabTextItem_1704419995_Text";
      }
      this.uBu(t, i, e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIExtendToggle], [6, UE.UIExtendToggle], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[5, this.OnClickLockToggle], [6, this.OnClickDeprecateToggle]];
  }
  async OnBeforeStartAsync() {
    this.BHi = new VisionIdentifyComponent_1.LevelUpIdentifyComponent(this.GetItem(3));
    await this.BHi.Init(this.GetViewName());
    var e = new CommonMultipleConsumeComponent_1.CommonMultipleConsumeFunction();
    e.StrengthFunction = this.sBu;
    e.MaterialItemFunction = this.bji;
    e.ItemClickFunction = this.Bji;
    e.ReduceItemFunction = this.wji;
    e.AutoFunction = this.Pji;
    e.DeleteSelectFunction = this.Uji;
    this.Cji = new ItemGridConsumeComponent_1.ItemGridConsumeComponent(this.GetItem(2), e, "VisionLevelUpView", true);
    await this.Cji.Init();
    this.Cji.SetActive(true);
    this.bHi = new VisionMainAttributeComponent_1.VisionMainAttributeComponent();
    await this.bHi.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    this.dji = new ExpComponent_1.ExpComponent(this.GetItem(0), false);
    this.dji.Init();
    this.dji.SetLevelFormatText("VisionLevel");
    this.dji.BindPlayCompleteCallBack(this.Eji);
    this.Cji.InitFilter(0, this.oLt);
    this.Cji.SetConsumeTexture(ItemDefines_1.EItemId.Gold);
    this.Cji.SetSettingButtonVisible(true);
    this.Cji.BindSettingButtonRedDot("VisionLevelUpSetting");
    this.Cji.SetSettingButtonClickCallBack(() => {
      var e = ModelManager_1.ModelManager.RedDotModel.GetRedDot("VisionLevelUpSetting");
      if (e && e.IsRedDotActive()) {
        PhantomBattleController_1.PhantomBattleController.RecordVisionLevelUpSettingRedDot();
      }
      UiManager_1.UiManager.OpenView("VisionLevelUpSettingPopView");
    });
    var t = this.Cji.GetMaxCount();
    this.pji = new Array(t);
    for (let e = 0; e < t; e++) {
      this.pji[e] = [{
        IncId: 0,
        ItemId: 0
      }, 0];
    }
    this.p9i = new VisionNameText_1.VisionNameText(this.GetText(4));
  }
  Tji() {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetCachePhantomLevelUpData();
    var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    var i = t.GetPhantomLevel();
    if (e.Level !== i || e.SubProp.length < t.GetPhantomSubProp().length) {
      i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpDelay();
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        var e = UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle()?.Model;
        if (e) {
          UiModelUtil_1.UiModelUtil.SetRenderingMaterial(e, "VisionStepupController");
        }
        var e = ModelManager_1.ModelManager.PhantomBattleModel.GetLevelUpSuccessData(this.qHi);
        e.ClickFunction = () => {
          UiInteractLogReport_1.UiInteractLogReport.ReportSpaceKeyInteract(5);
          this.o_d();
        };
        RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(e);
        var e = new ItemHintViewNew_1.ItemHintViewNewData();
        e.CheckPriorNext = () => ModelManager_1.ModelManager.PhantomBattleModel.GetTempSaveItemList().length > 0;
        e.ShiftPriorItem = () => {
          var e = ModelManager_1.ModelManager.PhantomBattleModel.ShiftTempSaveItemList();
          var t = new ItemHintDefines_1.ItemRewardInfo();
          t.ItemId = e[0].ItemId;
          t.ItemCount = e[1];
          var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e[0].ItemId);
          t.Quality = e.QualityId;
          return t;
        };
        e.TitleTextId = "Text_ItemReturnTitle_Text";
        UiManager_1.UiManager.OpenView("ItemHintViewNew", e);
      }, i);
    }
  }
  o_d() {
    if (UiManager_1.UiManager.IsViewOpen("ItemHintViewNew")) {
      UiManager_1.UiManager.CloseView("ItemHintViewNew");
    }
  }
  Gau() {
    if (this.vji.GetCurrentAddExp() > 0) {
      UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", true);
      this.Ndl = true;
      this.dji.PlayExpTween(this.vji);
    }
  }
  Gji(e) {
    this.qHi = e;
    e = this.Sji();
    this.dji.UpdateInitState(e);
    this.AMt([], e);
  }
  Sji() {
    var e = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData();
    var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    e.CurrentExp = t.GetExp();
    e.CurrentLevel = t.GetPhantomLevel();
    e.CurrentMaxLevel = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(this.qHi);
    e.MaxExpFunction = this.qji;
    var t = SelectableExpData_1.SelectableExpData.PhraseData(e);
    return t;
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomLevelUp, this.yji);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionLevelUpMaterialPutInModeChange, this.f1l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionLevelUpIdentifyChange, this.nBu);
    this.NHi = true;
    this.qHi = this.ExtraParams;
    this.gji = 0;
    this.Gji(this.qHi);
    this.P5e();
    this.Oqe();
    this.v1l();
  }
  P5e() {
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    this.p9i.Update(e);
  }
  Rft() {
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    var t = e.GetLevelUpPreviewData(e.GetPhantomLevel() + this.gji);
    this.bHi.Update(t);
    var t = e.GetLevelSubPropPreviewData(e.GetPhantomLevel(), e.GetPhantomLevel() + this.gji);
    this.BHi.Update(t, false);
    this.BHi.GetRootItem().SetUIActive(t.length > 0);
  }
  Oqe() {
    var e;
    var t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.qHi);
    if (t !== undefined) {
      e = t.GetIsLock() ? 0 : 1;
      this.GetExtendToggle(5).SetToggleState(e, false);
      e = t.GetIsDeprecated() ? 1 : 0;
      this.GetExtendToggle(6).SetToggleState(e, false);
    }
  }
  v1l() {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionLevelUpMaterialPutInMode();
    this.Cji?.UpdateAutoSelectTextByTextId(e === 0 ? "Text_QuickInsertion_Text" : "Text_StageInsertion_Text");
  }
  cBu(e) {
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionLevelUpIdentify() === 1;
    var e = e.GetQuality() > VisionDefine_1.CANNOTLEVELSUBQUALITY;
    return t && e;
  }
  dSe() {
    if (this.NHi) {
      this.NHi = false;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomLevelUp, this.yji);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionLevelUpMaterialPutInModeChange, this.f1l);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionLevelUpIdentifyChange, this.nBu);
    }
  }
  OnBeforeHide() {
    this.dSe();
  }
  aBu() {
    return this.fji?.length !== 0 || this.iBu !== 0 || (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionNotSelectItem"), false);
  }
  hBu() {
    return !!this.Cji.GetEnoughMoney() || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponNoEnoughMoneyText"), false);
  }
  async lBu() {
    const e = new CustomPromise_1.CustomPromise();
    var t;
    var i;
    if (this.rBu) {
      if (this.fji.length === 0 && this.rBu === 332) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("GenericPrompt_LevelUpMaterialShort_TipsText");
        e.SetResult(false);
      } else {
        t = [];
        i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(this.rBu);
        t.push(this.tBu.toString());
        i.SetTextArgs(...t);
        i.FunctionMap.set(2, () => {
          e.SetResult(true);
        });
        i.FunctionMap.set(1, () => {
          e.SetResult(false);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      }
    } else {
      e.SetResult(true);
    }
    return e.Promise;
  }
  e_d(i, r) {
    this.fji.forEach(e => {
      var t = new Protocol_1.Aki.Protocol.Y5s();
      t.m9n = e.SelectedCount;
      t.w5n = e.IncId;
      t.L8n = e.ItemId;
      i.push(t);
      var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(e.IncId);
      if (t) {
        e = t.GetIdentifyBackItem();
        this.Rji(e, r);
      }
    });
  }
  t_d(e) {
    var t;
    var i;
    var r;
    if (this.tBu > 0) {
      t = (r = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi)).GetCurrentIdentifyCostId();
      i = e.get(t);
      r = r.GetCurrentIdentifyCostValue();
      r = this.tBu * r;
      if (i && r < i) {
        e.set(t, i - r);
      } else {
        e.delete(t);
      }
    }
  }
  i_d(e) {
    var t = this.vji.GetOverExp();
    if (t > 0) {
      t = ModelManager_1.ModelManager.PhantomBattleModel.CalculateExpBackItem(t);
      this.Rji(t, e);
    }
  }
  r_d(e, t) {
    if (ModelManager_1.ModelManager.PhantomBattleModel.LevelUpConfirmTipsNotShow) {
      return false;
    }
    let i = false;
    let r = false;
    let o = false;
    for (const _ of this.fji) {
      var n = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(_.IncId);
      if (n && (!i && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighQuality(n) && (i = true), !r && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighLevel(n) && (r = true), !o) && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighRare(n)) {
        o = true;
      }
    }
    var s = [];
    if (i) {
      a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighQuality");
      s.push(a);
    }
    if (r) {
      a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighLevel");
      s.push(a);
    }
    if (o) {
      a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighRare");
      s.push(a);
    }
    var a = t.size > 0;
    var h = s.length > 0;
    let l = undefined;
    if (a && h) {
      l = this.n_d(s, t);
    } else if (a) {
      l = this.s_d(t);
    } else if (h) {
      l = this.a_d(s);
    }
    return !!l && (l.HasToggle = true, l.ToggleText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_PhantomLevelUpTips_Text"), l.SetToggleFunction(e => {
      ModelManager_1.ModelManager.PhantomBattleModel.LevelUpConfirmTipsNotShow = e;
    }), l.FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomLevelUpRequest(this.qHi, e, this.tBu);
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(l), true);
  }
  a_d(e) {
    let t = undefined;
    switch (e.length) {
      case 1:
        t = 127;
        break;
      case 2:
        t = 126;
        break;
      case 3:
        t = 125;
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
        i = 354;
        break;
      case 2:
        i = 355;
        break;
      case 3:
        i = 356;
    }
    var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(i);
    r.SetTextArgs(...e);
    r.ItemIdMap = t;
    return r;
  }
  Rji(e, r) {
    e.forEach((e, t) => {
      let i = r.get(t);
      i = i || 0;
      i += e;
      r.set(t, i);
    });
  }
  Aji() {
    let t = 0;
    this.Iji();
    if (this.fji) {
      for (let e = 0; e < this.fji.length; e++) {
        var i = this.fji[e];
        var r = this.pji[e];
        r[0].IncId = i.IncId;
        r[0].ItemId = i.ItemId;
        r[1] = i.SelectedCount;
        t += this.xji(i) * i.SelectedCount;
      }
    }
    this.vji.UpdateExp(t);
    this.dji.Update(this.vji);
    this.gji = this.vji.GetArrivedLevel() - this.vji.GetCurrentLevel();
    var e = this.vji.GetExpDistanceToMax();
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetLevelUpNeedCost(Math.min(t, e));
    this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, e, this.pji);
    this.oBu();
    this.Rft();
  }
  Iji() {
    this.pji.forEach(e => {
      e[0].IncId = 0;
      e[0].ItemId = 0;
      e[1] = 0;
    });
  }
  OnBeforeDestroy() {
    this.dSe();
    this.bHi.Destroy();
    this.BHi.Destroy();
    this.o_d();
    if (this.Ndl) {
      UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", false);
    }
  }
  oBu() {
    var e;
    var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    if (t) {
      e = this.cBu(t);
      this.dBu(t, e);
      this.mBu(t, e);
    }
  }
  mBu(r, o) {
    this.tBu = 0;
    this.rBu = undefined;
    if (o) {
      for (const h of r.GetLevelSubPropPreviewData(r.GetPhantomLevel(), r.GetPhantomLevel() + this.gji)) {
        if (h.SlotState === 2 || h.SlotState === 1) {
          this.tBu += 1;
        }
      }
      if (!this.ebt) {
        this.ebt = new MediumItemGrid_1.MediumItemGrid();
        this.ebt.Initialize(this.GetItem(10).GetOwner());
        this.ebt.BindOnExtendToggleStateChanged(this.wYt);
      }
      const a = r.GetCurrentIdentifyCostId();
      var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(a);
      var o = {
        Type: 4,
        ItemConfigId: a,
        StarLevel: o.QualityId
      };
      var n = r.GetCurrentIdentifyCostValue();
      var s = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(a);
      let e = 0;
      if (s.length > 0) {
        e = s[0].GetCount();
      }
      let i = 0;
      if (this.tBu > 0) {
        i = n * this.tBu;
        const l = new Map();
        this.fji.forEach(e => {
          var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(e.IncId);
          if (e) {
            e = e.GetIdentifyBackItem();
            this.Rji(e, l);
          }
        });
        const a = r.GetCurrentIdentifyCostId();
        s = l.get(a);
        let t = e;
        if (s) {
          i = Math.max(0, i - s);
          t += s;
        }
        if (t < n) {
          this.rBu = 332;
        } else if (t < this.tBu * n) {
          this.rBu = 333;
        }
        for (let e = this.tBu; e >= 0; e--) {
          if (t >= e * n) {
            this.tBu = e;
            break;
          }
        }
      }
      let t = undefined;
      t = e >= i ? "Text_CollectProgress_Text" : "Text_ItemCostNotEnough_Text";
      o.BottomText = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t), e.toString(), i.toString());
      this.ebt?.Apply(o);
      r = this.fBu() * this.tBu;
      s = this.Cji.GetCurrentCostCount();
      this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, r + s, this.pji);
    }
  }
  fBu() {
    return ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi).GetIdentifyCostItemValue();
  }
  dBu(e, t) {
    this.iBu = this.gBu(e, t);
    this._Bu();
  }
  gBu(e, t) {
    var i = e.GetPhantomLevel();
    var r = i === ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(this.qHi);
    let o = false;
    var n = e.GetLevelSubPropData(i);
    for (const l of n) {
      if (l.SlotState === 1) {
        o = true;
        break;
      }
    }
    let s = true;
    for (const _ of n) {
      if (_.SlotState !== 3) {
        s = false;
        break;
      }
    }
    let a = false;
    for (const m of e.GetLevelSubPropPreviewData(i, i + this.gji)) {
      if (m.SlotState === 2) {
        a = true;
        break;
      }
    }
    n = this.fji.length > 0;
    let h = 0;
    for (const C of [{
      Condition: t && o && !n,
      State: 1
    }, {
      Condition: t && o && n,
      State: 2
    }, {
      Condition: t && !o && a,
      State: 2
    }, {
      Condition: t && r && o,
      State: 3
    }, {
      Condition: t && r && s,
      State: 5
    }, {
      Condition: !t && r,
      State: 4
    }]) {
      if (C.Condition) {
        h = C.State;
      }
    }
    return h;
  }
  uBu(e, t, i) {
    var r = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    var e = {
      LevelUp: {
        CostRoot: !e,
        StrengthEnable: !e,
        MaxEnable: e,
        ConsumeEnable: !e,
        MaxLevelTipsEnable: e,
        ShouldShowMaxText: e,
        IdentifyItemEnable: false,
        MaxLevelTipsTextEnable: false
      },
      LevelUpIdentify: {
        CostRoot: !t,
        StrengthEnable: !t,
        MaxEnable: e && t,
        ConsumeEnable: !e,
        MaxLevelTipsEnable: e,
        ShouldShowMaxText: e && t,
        IdentifyItemEnable: !t,
        MaxLevelTipsTextEnable: !t
      }
    };
    var t = this.cBu(r) ? e.LevelUpIdentify : e.LevelUp;
    this.Cji?.SetCostRootItemState(t.CostRoot);
    this.Cji?.SetStrengthItemEnable(t.StrengthEnable);
    this.Cji?.SetMaxItemEnable(t.MaxEnable);
    this.Cji?.SetConsumeListEnable(t.ConsumeEnable);
    this.GetItem(11)?.SetUIActive(t.MaxLevelTipsEnable);
    this.GetItem(9)?.SetUIActive(t.IdentifyItemEnable);
    this.GetItem(12)?.SetUIActive(t.MaxLevelTipsTextEnable);
    if (t.ShouldShowMaxText) {
      this.Cji?.SetMaxItemText(i);
    } else {
      this.Cji?.SetStrengthItemText(i);
    }
  }
}
exports.VisionLevelUpView = VisionLevelUpView;
//# sourceMappingURL=VisionLevelUpView.js.map