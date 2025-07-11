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
    this.SDu = 0;
    this.MDu = undefined;
    this.EDu = undefined;
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
      UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", true);
      this.Ndl = true;
      this.dji.PlayExpTween(this.vji);
      this.fji = [];
      this.Iji();
      this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, 0, this.pji);
      this.gji = 0;
      this.IDu();
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
    this.TDu = () => {
      this.Aji();
    };
    this.bDu = () => {
      this.W$c();
    };
    this.W$c = async () => {
      if (this.RDu() && this.wDu() && (await this.Lji()) && (await this.LDu())) {
        this.Dji();
      }
    };
    this.Dji = () => {
      const i = new Array();
      const o = new Map();
      this.fji.forEach(e => {
        var t = new Protocol_1.Aki.Protocol.Y5s();
        t.m9n = e.SelectedCount;
        t.w5n = e.IncId;
        t.L8n = e.ItemId;
        i.push(t);
        var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(e.IncId);
        if (t) {
          e = t.GetIdentifyBackItem();
          this.Rji(e, o);
        }
      });
      if (this.SDu > 0) {
        t = (e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi)).GetCurrentIdentifyCostId();
        r = o.get(t);
        e = e.GetCurrentIdentifyCostValue();
        e = this.SDu * e;
        if (r && e < r) {
          o.set(t, r - e);
        } else {
          o.delete(t);
        }
      }
      var e;
      var t;
      var r = this.vji.GetOverExp();
      if (r > 0) {
        e = ModelManager_1.ModelManager.PhantomBattleModel.CalculateExpBackItem(r);
        this.Rji(e, o);
      }
      const s = () => {
        var e;
        if (o.size > 0) {
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24)).ItemIdMap = o;
          e.FunctionMap.set(2, () => {
            ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomLevelUpRequest(this.qHi, i, this.SDu);
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        } else {
          ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomLevelUpRequest(this.qHi, i, this.SDu);
        }
      };
      let n = false;
      for (const h of i) {
        if (h.w5n > 0 && ModelManager_1.ModelManager.VisionEquipGroupModel.CheckVisionListIfInGroup([h.w5n])) {
          n = true;
          break;
        }
      }
      if (n) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(247)).FunctionMap.set(2, () => {
          s();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        s();
      }
    };
    this.Uji = () => {
      this.fji = [];
      this.Aji();
    };
    this.Pji = () => {
      var t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList()[this.Mji].Id;
      var i = ModelManager_1.ModelManager.PhantomBattleModel;
      var o = i.GetVisionLevelUpMaterialUseType();
      var t = i.GetSortedExpMaterialList(this.qHi, t, o === 0);
      if (t.length === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RoleNoMaterial");
      } else {
        const n = new Array();
        t.forEach(e => {
          e = {
            IncId: e.GetUniqueId(),
            ItemId: e.GetConfigId(),
            Count: e.GetCount(),
            SelectedCount: 0
          };
          n.push(e);
        });
        o = i.GetVisionLevelUpMaterialPutInMode() === 1;
        let e = 0;
        if (o) {
          var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionLevelStageList");
          var r = this.vji.GetCurrentLevel();
          var s = this.vji.GetCurrentMaxLevel();
          for (const h of t) {
            if (h > s) {
              break;
            }
            if (h > r) {
              e = this.vji.GetExpDistanceToLevel(h);
              break;
            }
          }
        } else {
          e = this.vji.GetExpDistanceToMax();
        }
        i = ModelManager_1.ModelManager.WeaponModel;
        t = this.Cji.GetMaxCount();
        if (o && !i.CheckSatisfyExp(e, t, n, this.xji)) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_EchoMaterialLack_Text");
        }
        o = i.AutoAddExpItem(e, t, n, this.xji);
        this.fji = o;
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
      var o = ModelManager_1.ModelManager.PhantomBattleModel.GetExpMaterialList(this.qHi);
      var r = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
      var s = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData();
      s.CurrentExp = r.GetExp();
      s.CurrentLevel = r.GetPhantomLevel();
      s.CurrentMaxLevel = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(this.qHi);
      s.MaxExpFunction = this.qji;
      s.GetItemExpFunction = this.xji;
      var r = this.fji;
      i.ItemDataBaseList = o;
      i.SelectedDataList = r;
      i.UseWayId = 26;
      i.ExpData = s;
      var o = new SelectableComponent_1.SelectableComponentData();
      o.IsSingleSelected = false;
      o.MaxSelectedGridNum = this.Cji.GetMaxCount();
      (i.SelectableComponentData = o).OnChangeSelectedFunction = this.AMt;
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
      let o = 0;
      if ((o = i.length > 0 ? i[0].GetUniqueId() : o) !== undefined && o > 0) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(o, t);
      } else {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(t);
      }
    };
    this.ADu = () => {
      let e = undefined;
      let t = false;
      let i = false;
      switch (this.MDu) {
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
      this.PDu(t, i, e);
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
    e.StrengthFunction = this.bDu;
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
        RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(e);
      }, i);
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionLevelUpIdentifyChange, this.TDu);
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
  xDu(e) {
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
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionLevelUpIdentifyChange, this.TDu);
    }
  }
  OnBeforeHide() {
    this.dSe();
  }
  RDu() {
    return this.fji?.length !== 0 || this.MDu !== 0 || (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionNotSelectItem"), false);
  }
  wDu() {
    return !!this.Cji.GetEnoughMoney() || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponNoEnoughMoneyText"), false);
  }
  async LDu() {
    const e = new CustomPromise_1.CustomPromise();
    var t;
    var i;
    if (this.EDu) {
      if (this.fji.length === 0 && this.EDu === 332) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("GenericPrompt_LevelUpMaterialShort_TipsText");
        e.SetResult(false);
      } else {
        t = [];
        i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(this.EDu);
        t.push(this.SDu.toString());
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
  async Lji() {
    const e = new CustomPromise_1.CustomPromise();
    let t = false;
    let i = false;
    let o = false;
    for (const a of this.fji) {
      var r = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(a.IncId);
      if (r && (!t && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighQuality(r) && (t = true), !i && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighLevel(r) && (i = true), !o) && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighRare(r)) {
        o = true;
      }
    }
    let s = undefined;
    var n;
    var h = [];
    if (t) {
      n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighQuality");
      h.push(n);
    }
    if (i) {
      n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighLevel");
      h.push(n);
    }
    if (o) {
      n = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighRare");
      h.push(n);
    }
    switch (h.length) {
      case 1:
        s = 127;
        break;
      case 2:
        s = 126;
        break;
      case 3:
        s = 125;
    }
    if (s) {
      (n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(s)).SetTextArgs(...h);
      n.FunctionMap.set(2, () => {
        e.SetResult(true);
      });
      n.FunctionMap.set(1, () => {
        e.SetResult(false);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
    } else {
      e.SetResult(true);
    }
    return e.Promise;
  }
  Rji(e, o) {
    e.forEach((e, t) => {
      let i = o.get(t);
      i = i || 0;
      i += e;
      o.set(t, i);
    });
  }
  Aji() {
    let t = 0;
    this.Iji();
    if (this.fji) {
      for (let e = 0; e < this.fji.length; e++) {
        var i = this.fji[e];
        var o = this.pji[e];
        o[0].IncId = i.IncId;
        o[0].ItemId = i.ItemId;
        o[1] = i.SelectedCount;
        t += this.xji(i) * i.SelectedCount;
      }
    }
    this.vji.UpdateExp(t);
    this.dji.Update(this.vji);
    this.gji = this.vji.GetArrivedLevel() - this.vji.GetCurrentLevel();
    var e = this.vji.GetExpDistanceToMax();
    var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetLevelUpNeedCost(Math.min(t, e));
    this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, e, this.pji);
    this.IDu();
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
    if (this.Ndl) {
      UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", false);
    }
  }
  IDu() {
    var e;
    var t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
    if (t) {
      e = this.xDu(t);
      this.UDu(t, e);
      this.DDu(t, e);
    }
  }
  DDu(o, r) {
    this.SDu = 0;
    this.EDu = undefined;
    if (r) {
      for (const a of o.GetLevelSubPropPreviewData(o.GetPhantomLevel(), o.GetPhantomLevel() + this.gji)) {
        if (a.SlotState === 2 || a.SlotState === 1) {
          this.SDu += 1;
        }
      }
      if (!this.ebt) {
        this.ebt = new MediumItemGrid_1.MediumItemGrid();
        this.ebt.Initialize(this.GetItem(10).GetOwner());
        this.ebt.BindOnExtendToggleStateChanged(this.wYt);
      }
      const h = o.GetCurrentIdentifyCostId();
      var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(h);
      var r = {
        Type: 4,
        ItemConfigId: h,
        StarLevel: r.QualityId
      };
      var s = o.GetCurrentIdentifyCostValue();
      var n = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(h);
      let e = 0;
      if (n.length > 0) {
        e = n[0].GetCount();
      }
      let i = 0;
      if (this.SDu > 0) {
        i = s * this.SDu;
        const l = new Map();
        this.fji.forEach(e => {
          var e = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(e.IncId);
          if (e) {
            e = e.GetIdentifyBackItem();
            this.Rji(e, l);
          }
        });
        const h = o.GetCurrentIdentifyCostId();
        n = l.get(h);
        let t = e;
        if (n) {
          i = Math.max(0, i - n);
          t += n;
        }
        if (t < s) {
          this.EDu = 332;
        } else if (t < this.SDu * s) {
          this.EDu = 333;
        }
        for (let e = this.SDu; e >= 0; e--) {
          if (t >= e * s) {
            this.SDu = e;
            break;
          }
        }
      }
      let t = undefined;
      t = e >= i ? "Text_CollectProgress_Text" : "Text_ItemCostNotEnough_Text";
      r.BottomText = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t), e.toString(), i.toString());
      this.ebt?.Apply(r);
      o = this.BDu() * this.SDu;
      n = this.Cji.GetCurrentCostCount();
      this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, o + n, this.pji);
    }
  }
  BDu() {
    return ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi).GetIdentifyCostItemValue();
  }
  UDu(e, t) {
    this.MDu = this.kDu(e, t);
    this.ADu();
  }
  kDu(e, t) {
    var i = e.GetPhantomLevel();
    var o = i === ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(this.qHi);
    let r = false;
    var s = e.GetLevelSubPropData(i);
    for (const l of s) {
      if (l.SlotState === 1) {
        r = true;
        break;
      }
    }
    let n = true;
    for (const _ of s) {
      if (_.SlotState !== 3) {
        n = false;
        break;
      }
    }
    let h = false;
    for (const m of e.GetLevelSubPropPreviewData(i, i + this.gji)) {
      if (m.SlotState === 2) {
        h = true;
        break;
      }
    }
    s = this.fji.length > 0;
    let a = 0;
    for (const C of [{
      Condition: t && r && !s,
      State: 1
    }, {
      Condition: t && r && s,
      State: 2
    }, {
      Condition: t && !r && h,
      State: 2
    }, {
      Condition: t && o && r,
      State: 3
    }, {
      Condition: t && o && n,
      State: 5
    }, {
      Condition: !t && o,
      State: 4
    }]) {
      if (C.Condition) {
        a = C.State;
      }
    }
    return a;
  }
  PDu(e, t, i) {
    var o = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.qHi);
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
    var t = this.xDu(o) ? e.LevelUpIdentify : e.LevelUp;
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