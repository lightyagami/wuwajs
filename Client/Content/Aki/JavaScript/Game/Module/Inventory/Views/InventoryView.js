"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonCurrencyItem_1 = require("../../Common/CommonCurrencyItem");
const FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance");
const ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool");
const ItemTipsWithButton_1 = require("../../Common/ItemTips/ItemTipsWithButton");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const InventoryDefine_1 = require("../InventoryDefine");
const CommonItemData_1 = require("../ItemData/CommonItemData");
const ItemViewData_1 = require("../ItemViewData");
const InventoryMediumItemGrid_1 = require("./InventoryMediumItemGrid");
const ItemViewDefine_1 = require("./ItemViewDefine");
class InventoryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Kci = undefined;
    this.sdi = 0;
    this.xmi = [];
    this.JPt = undefined;
    this.adi = undefined;
    this.hdi = undefined;
    this.ldi = new Map();
    this._di = undefined;
    this.udi = undefined;
    this.cdi = [];
    this.mdi = new Map();
    this.Ivt = undefined;
    this.ddi = undefined;
    this.SPe = undefined;
    this.vxt = undefined;
    this.TipsButtonRelationMap = undefined;
    this.TipsButtonIndexMap = undefined;
    this.Cdi = undefined;
    this.gdi = 0;
    this.WGe = undefined;
    this.fdi = false;
    this.pdi = false;
    this.vdi = false;
    this.Mdi = false;
    this.InvalidItemTempList = [];
    this.IsInvalidItemViewShow = false;
    this.Edi = () => {
      this.Sdi();
    };
    this.ydi = t => {
      if (this.IsInvalidItemViewShow) {
        this.InvalidItemTempList.push(t);
      } else {
        this.Idi(t);
      }
    };
    this.Tdi = () => {
      if (this.gdi === 1) {
        this.SetViewMode(0);
      }
    };
    this.Ldi = () => {
      if (this.gdi === 0) {
        this.SetViewMode(1);
      }
    };
    this.OnClickedUseItemButton = () => {
      var t;
      var e = ModelManager_1.ModelManager.InventoryModel;
      var i = e.GetSelectedItemData();
      if (i) {
        this.Ddi(i);
        if (i.GetRedDotDisableRule() === 2) {
          this.Rdi(i);
        }
        if ((t = i.GetItemDataType()) === 0) {
          e.SaveNewCommonItemConfigIdList();
          e.SaveRedDotCommonItemConfigIdList();
        } else {
          e.SaveNewAttributeItemUniqueIdList();
          e.SaveRedDotAttributeItemUniqueIdList();
        }
        if ((e = this.cdi.indexOf(i)) >= 0) {
          this.JPt.RefreshGridProxy(e);
        }
        this.Udi(0, false);
        this.Adi(i);
        if (t === 17) {
          ControllerHolder_1.ControllerHolder.SkinController.SkipToCalabashSkinView(i.GetConfigId());
        } else {
          ControllerHolder_1.ControllerHolder.InventoryController.TryUseItem(i.GetConfigId(), 1);
        }
      }
    };
    this.OnClickedSpecialItemFuncUseButton = () => {
      var t = ModelManager_1.ModelManager.InventoryModel;
      var e = t.GetSelectedItemData();
      if (e && (this.Ddi(e), e.GetRedDotDisableRule() === 2 && this.Rdi(e), e.GetItemDataType() === 0 ? (t.SaveNewCommonItemConfigIdList(), t.SaveRedDotCommonItemConfigIdList()) : (t.SaveNewAttributeItemUniqueIdList(), t.SaveRedDotAttributeItemUniqueIdList()), this.Adi(e), ControllerHolder_1.ControllerHolder.SpecialItemController.AutoEquipOrUnEquipSpecialItem(e.GetConfigId()))) {
        UiManager_1.UiManager.ResetToBattleView();
      }
    };
    this.OnClickedWeaponCultivateButton = () => {
      var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData();
      if (t) {
        SkipTaskManager_1.SkipTaskManager.Run(4, t.GetUniqueId());
      }
    };
    this.OnClickedVisionCultivateButton = () => {
      var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedItemData();
      if (t) {
        SkipTaskManager_1.SkipTaskManager.Run(5, t.GetUniqueId());
      }
    };
    this.O6a = () => {
      ControllerHolder_1.ControllerHolder.FragmentMemoryController.OpenFragmentMemoryView();
    };
    this.Vgt = () => {
      UiManager_1.UiManager.CloseView("InventoryView");
      if (UiManager_1.UiManager.IsViewShow("PowerView")) {
        UiManager_1.UiManager.CloseView("PowerView");
      }
    };
    this.Esu = () => {
      var t = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(this.Kci?.GetConfigId() ?? 0);
      var t = (t?.Parameters?.length ?? 0) > 0 ? parseInt(t?.Parameters[0] ?? "0") : 0;
      ControllerHolder_1.ControllerHolder.QuestReviewController.OpenQuestReview(t);
    };
    this.wdi = () => {
      this.Bdi();
    };
    this.bdi = () => {
      this.Bdi();
    };
    this.qdi = () => {
      this.Bdi();
    };
    this.Gdi = t => {
      this.Bdi();
    };
    this.Ndi = t => {
      this.Bdi();
    };
    this.Uft = (t, e, i) => {
      this.Odi();
      if (ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(t)) {
        t = ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(t);
        this.kdi(0, t <= 0);
      }
    };
    this.X4l = (t, e) => {
      var i;
      if (this.Kci && (i = this.Kci.GetItemDataBase()).IsBuffEquipItem()) {
        this.Y4l(i);
      }
    };
    this.e9e = (t, e) => {};
    this.$Ge = t => {
      if (t === "UseBuffItemView" && (this.SPe.StopSequenceByKey("Tc"), this.SPe.PlaySequencePurely("Tc", false, true), t = this.cdi[this.sdi])) {
        this.Xpt(t);
      }
    };
    this.zze = () => {
      this.Fdi();
    };
    this.I3a = e => {
      var i = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
      if (i) {
        for (let t = 0; t < this.cdi.length; t++) {
          var s = this.cdi[t];
          if (s.GetUniqueId() === e) {
            s.SetIsLock(i.GetIsLock());
            s.SetIsDeprecate(i.GetIsDeprecated());
            s.RemoveNewItem();
            this.JPt.RefreshGridProxy(t);
            break;
          }
        }
      }
    };
    this.FNt = (e, t, i) => {
      this.fdi = true;
      if (this.gdi === 1) {
        e.sort(this.SortViewDataSelectOn);
        this.SetDestroyAllSelectedState(undefined, false);
      }
      this.cdi = e;
      this.jNt(e);
      if (this.pdi) {
        this.Cud(e);
        this.Xpt(this.Hdi());
      } else if (i === 1) {
        this.Xpt(e[0]);
      } else {
        let t = undefined;
        if (this.Kci && this.cdi.includes(this.Kci)) {
          t = this.Kci;
        }
        this.Xpt(t ?? e[0]);
      }
      this.fdi = false;
      this.pdi = false;
    };
    this.cHe = () => {
      var t = new InventoryMediumItemGrid_1.InventoryMediumItemGrid();
      t.BindOnItemButtonClickedCallback(this.BTt);
      return t;
    };
    this.jdi = (t, e) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.Wdi = t => {
      var e = ModelManager_1.ModelManager.InventoryModel;
      if (e.GetSelectedTypeIndex() !== t) {
        this.Kdi();
        e.SetSelectedTypeIndex(t);
        this.Qdi(t);
      }
    };
    this.yqe = t => {
      t = this.ddi[t];
      return new CommonTabData_1.CommonTabData(t.Icon, new CommonTabTitleData_1.CommonTabTitleData(t.Name));
    };
    this.BTt = t => {
      var e;
      if (this.Kci === t) {
        e = this.cdi.indexOf(t);
        this.JPt.DeselectCurrentGridProxy(false);
        this.JPt.SelectGridProxy(e);
        if (this.gdi === 1) {
          this.Xdi(!t.GetSelectOn(), t);
        }
      } else {
        this.Xpt(t);
      }
    };
    this.$di = () => {
      this.Ydi();
    };
    this.Jdi = () => {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ItemDestroyNotJump");
    };
    this.zdi = 0;
    this.Zdi = new Set();
    this.OnClickedDestroyExecuteButton = () => {
      if (this.gdi === 1) {
        if (this.Zdi.size === 0) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ItemDestroyNotChoose");
        } else {
          let i = false;
          let s = false;
          let r = false;
          const a = [];
          var t;
          var n = Array.from(this.Zdi.values());
          n.sort(this.SortViewDataConfigId);
          var h = n.length;
          for (let e = 0; e < h; e++) {
            let t = 0;
            while (e + 1 < h && n[e].GetConfigId() === n[e + 1].GetConfigId() && n[e].GetUniqueId() === 0 && n[e + 1].GetUniqueId() === 0) {
              t += n[e].GetSelectNum();
              e++;
            }
            var o = {
              L8n: n[e].GetConfigId(),
              b9n: n[e].GetUniqueId(),
              m9n: t + n[e].GetSelectNum()
            };
            a.push(o);
            if (o.b9n > 0 && ModelManager_1.ModelManager.VisionEquipGroupModel.CheckVisionListIfInGroup([o.b9n])) {
              i = true;
            }
            if (n[e].GetQuality() >= 4) {
              r = true;
            }
            if (i || !s && r) {
              s = true;
            }
          }
          const e = () => {
            ControllerHolder_1.ControllerHolder.InventoryController.ItemDestructPreviewRequest(a);
          };
          if (ModelManager_1.ModelManager.InventoryModel.IsConfirmDestruction || !s) {
            e();
          } else {
            const _ = () => {
              var t;
              if (r) {
                (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(167)).HasToggle = true;
                t.ToggleText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemRecycleConfirmToggle_text");
                t.SetToggleFunction(this.RMt);
                t.FunctionMap.set(2, e);
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
              } else {
                e();
              }
            };
            if (i) {
              (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(247)).FunctionMap.set(2, () => {
                _();
              });
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
            } else {
              _();
            }
          }
        }
      }
    };
    this.RMt = t => {
      ModelManager_1.ModelManager.InventoryModel.IsConfirmDestruction = t;
    };
    this.eCi = t => {
      if (this.gdi === 1) {
        var e = t;
        if (!this.tCi() || !e) {
          for (const i of this.cdi) {
            if (i.IsItemCanDestroy() && i.GetUniqueId() !== 0) {
              this.Xdi(e, i);
            }
            if (this.tCi() && e) {
              break;
            }
          }
        }
      }
    };
    this.Kqu = () => {
      let t = this.Kci?.GetUniqueId() ?? 0;
      if (this.Kci?.GetItemDataType() !== 3) {
        t = 0;
      }
      UiManager_1.UiManager.OpenView("PhantomManageView", t);
    };
    this.FJu = () => {
      ControllerHolder_1.ControllerHolder.InventoryController.OpenManageConfigView();
    };
    this.SortViewDataSelectOn = (t, e) => {
      t = t.GetSelectOn() ? 1 : 0;
      return (e.GetSelectOn() ? 1 : 0) - t;
    };
    this.SortViewDataConfigId = (t, e) => t.GetConfigId() - e.GetConfigId();
    this.KGe = t => {
      var e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("ItemRecycleCount");
      return new LguiUtil_1.TableTextArgNew(e, t);
    };
    this.QGe = t => {
      var e;
      if (!!this.Kci && !((e = this.cdi.indexOf(this.Kci)) < 0)) {
        this.Kci.SetSelectNum(t);
        this.JPt.RefreshGridProxy(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UILoopScrollViewComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIText], [17, UE.UIText], [18, UE.UIExtendToggle], [19, UE.UIItem], [20, UE.UIButtonComponent], [21, UE.UIButtonComponent], [22, UE.UIButtonComponent]];
    this.BtnBindInfo = [[13, this.Ldi], [14, this.Tdi], [20, this.OnClickedDestroyExecuteButton], [18, this.eCi], [21, this.Kqu], [22, this.FJu]];
  }
  iCi() {
    this.TipsButtonIndexMap = new Map();
    this.TipsButtonRelationMap = new Map();
    this.TipsButtonRelationMap.set(0, {
      Function: this.OnClickedUseItemButton,
      Text: "HotKeyText_UseItemTips_Name",
      Index: 0
    });
    this.TipsButtonRelationMap.set(1, {
      Function: this.OnClickedSpecialItemFuncUseButton,
      Text: "Text_ButtonTextConfirm_Text",
      Index: 0
    });
    this.TipsButtonRelationMap.set(2, {
      Function: this.OnClickedWeaponCultivateButton,
      Text: "Text_BagFosterButton_Text",
      Index: 0
    });
    this.TipsButtonRelationMap.set(3, {
      Function: this.OnClickedVisionCultivateButton,
      Text: "Text_BagFosterButton_Text",
      Index: 0
    });
    this.TipsButtonRelationMap.set(4, {
      Function: this.O6a,
      Text: "Text_FragmentMemoryButton_Text",
      Index: 0
    });
    this.TipsButtonRelationMap.set(5, {
      Function: this.OnClickedUseItemButton,
      Text: "Mask_Wear_01",
      Index: 0
    });
    this.TipsButtonRelationMap.set(6, {
      Function: this.Esu,
      Text: "Item_70140005_UseTip",
      Index: 0
    });
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(9);
    var e = this.GetItem(10);
    this._di = new CommonCurrencyItem_1.CommonCurrencyItem();
    this.udi = new CommonCurrencyItem_1.CommonCurrencyItem();
    var i = this.GetItem(11);
    this.vxt = new ItemTipsWithButton_1.ItemTipsWithButtonComponent();
    await this._di.CreateThenShowByActorAsync(t.GetOwner());
    await this.udi.CreateThenShowByActorAsync(e.GetOwner());
    await this.vxt.CreateByActorAsync(i.GetOwner());
    this.pud();
    this.vud();
    var t = ModelManager_1.ModelManager.InventoryModel;
    var e = t.GetSelectedTypeIndex();
    this.Kci = t.GetSelectedItemData();
    this.sdi = 0;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    var i = this.GetItem(19);
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(i);
    this.WGe.SetMinValue(1);
    this.WGe.SetUiActive(false);
    this.iCi();
    await this.oCi(e);
    this.rCi();
    this.nCi();
    this.sCi();
    this.Fdi();
    this.Cdi = new Array(this.ddi.length).fill(0);
    var t = this.GetItem(8);
    var i = t.GetWidth();
    var e = t.GetHeight();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Inventory", 37, "背包物品滚动框ViewPort尺寸：", ["宽度", i], ["高度", e]);
    }
  }
  OnAfterPlayStartSequence() {
    var t = this.Ivt.GetSelectedIndex();
    this.Ivt.ScrollToToggleByIndex(t);
  }
  OnBeforeShow() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Ivt.SelectToggleByIndex(t, true);
    this.Qdi(t);
  }
  OnAfterShow() {
    this.aCi();
    this.hCi();
  }
  OnBeforeDestroy() {
    for (const e of this.xmi) {
      e.Destroy();
    }
    this.lCi();
    this._Ci();
    this.xmi.length = 0;
    this.sdi = 0;
    this.Kci = undefined;
    this.JPt = undefined;
    this.adi.Destroy();
    this._di.Destroy();
    this._di = undefined;
    this.udi.Destroy();
    this.udi = undefined;
    this.vxt.Destroy();
    this.vxt = undefined;
    this.Cdi = undefined;
    if (this.Ivt) {
      this.Ivt.Destroy();
      this.Ivt = undefined;
    }
    var t = ModelManager_1.ModelManager.InventoryModel;
    t.SaveNewCommonItemConfigIdList();
    t.SaveNewAttributeItemUniqueIdList();
    t.SaveRedDotCommonItemConfigIdList();
    t.SaveRedDotAttributeItemUniqueIdList();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddWeaponItemList, this.wdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddPhantomItemList, this.bdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveWeaponItem, this.Gdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemovePhantomItem, this.Ndi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUseBuffItem, this.Uft);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEquipBuffItemUpdate, this.X4l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.e9e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSpecialItemUpdate, this.$di);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NotifyInvalidItem, this.ydi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddWeaponItemList, this.wdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddPhantomItemList, this.bdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveWeaponItem, this.Gdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemovePhantomItem, this.Ndi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUseBuffItem, this.Uft);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEquipBuffItemUpdate, this.X4l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemUse, this.e9e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSpecialItemUpdate, this.$di);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NotifyInvalidItem, this.ydi);
  }
  Odi() {
    this.ldi.clear();
    ModelManager_1.ModelManager.BuffItemModel.GetInCdBuffItemMap(this.ldi);
    if (this.ldi.size <= 0) {
      this.lCi();
    } else {
      this.Sdi();
      if (!TimerSystem_1.GameplayTimerSystem.Has(this.hdi)) {
        this.hdi = TimerSystem_1.GameplayTimerSystem.Forever(this.Edi, ItemViewDefine_1.REFRESH_CD_INTERVAL);
      }
      this.Fdi();
    }
  }
  lCi() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.hdi)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.hdi);
    }
    this.hdi = undefined;
  }
  Sdi() {
    var t = [];
    for (const s of this.ldi.values()) {
      var e;
      var i = s.ItemConfigId;
      for (let t = 0; t < this.cdi.length; t++) {
        if (this.cdi[t].GetConfigId() === i && (e = this.JPt.UnsafeGetGridProxy(t))) {
          e.RefreshCoolDown();
        }
      }
      if (s.GetBuffItemRemainCdTime() <= 0) {
        t.push(i);
      }
    }
    for (const r of t) {
      this.ldi.delete(r);
      if (r === this.Kci.GetConfigId()) {
        this.kdi(0, true);
      }
    }
  }
  hCi() {
    ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemCheckRequest();
  }
  uCi() {
    var t = this.InvalidItemTempList.pop();
    if (t) {
      this.Idi(t);
    }
  }
  Idi(t) {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(174);
    e.IsMultipleView = true;
    e.ItemIdMap = t;
    e.SetCloseFunction(() => {
      this.IsInvalidItemViewShow = false;
      this.uCi();
    });
    this.IsInvalidItemViewShow = true;
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  Bdi() {
    this.SetViewMode(this.gdi);
    this.aCi();
  }
  Fdi() {
    var t;
    if (!!TimerSystem_1.GameplayTimerSystem.Has(this.hdi) && !((t = Time_1.Time.TimeDilation) <= 0)) {
      TimerSystem_1.GameplayTimerSystem.ChangeDilation(this.hdi, t);
    }
  }
  cCi(t) {
    var e = t.GetConfigId();
    var i = t.GetIsShowUseButton();
    if (i) {
      this.mCi([0]);
    }
    var s = t.IsBuffItem();
    if (s && i) {
      s = ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e);
      this.kdi(0, s <= 0);
    }
    if (t.GetRedDotDisableRule() === 2) {
      this.Udi(0, t.HasRedDot());
    } else {
      this.Udi(0, false);
    }
  }
  Y4l(t) {
    t = t.IsBuffEquippedItem();
    this.fCi(5, t ? "Mask_Remove_01" : "Mask_Wear_01");
  }
  G6a(t) {
    var e = new Array();
    if (this.Kci) {
      switch (this.Kci.GetItemType()) {
        case 13:
          var i = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(t.GetConfigId());
          if (i.UseButtonAdditionParam.length > 0) {
            for (const s of i.UseButtonAdditionParam) {
              if (s !== 1 || !!ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen()) {
                e.push(s);
              }
            }
          } else if (ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() && i.SpecialItemType === 0) {
            e.push(1);
          }
          break;
        case 2:
          e.push(2);
          break;
        case 9:
          e.push(3);
          break;
        default:
          i = t;
          if (i.GetConfig().ShowUseButton) {
            if (i.IsBuffEquipItem()) {
              e.push(5);
            } else {
              e.push(0);
            }
          }
      }
    }
    return e;
  }
  Ydi() {
    if (this.Kci) {
      var e = this.Kci.GetConfigId();
      var i = ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId();
      let t = undefined;
      t = e === i ? "UnEquip" : i !== undefined ? "Instead" : "Equip";
      this.fCi(1, t);
    }
  }
  sCi() {
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(12), this.FNt);
  }
  pCi(t) {
    for (const i of this.ddi) {
      var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(i.Id);
      var e = t === 0 ? e.UseWayId : e.DestroyUseWayId;
      this.adi.ClearData(e);
    }
  }
  vCi(t) {
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(t);
    var i = e !== undefined && e?.bFilterSortVisible;
    let s = 0;
    var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(t);
    switch (this.gdi) {
      case 0:
        s = r.UseWayId;
        this.adi.SetUiActive(i);
        break;
      case 1:
        s = r.DestroyUseWayId;
        var n = this.zdi === 0;
        this.adi.SetUiActive(i && n);
    }
    e = this.MCi(t);
    this.ECi(s, e);
    this.SCi(t, e);
  }
  NJu(t) {
    this.SetButtonUiActive(21, t === 3 && this.gdi === 0);
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(InventoryDefine_1.MANAGE_CONFIG_FUNCTION_ID);
    this.SetButtonUiActive(22, e && t === 3 && this.gdi === 0);
  }
  ECi(t, e) {
    var i = this.gdi === 0 ? 1 : 2;
    this.adi.UpdateDataWithConfig(t, i, e);
  }
  Hdi() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    var t = this.Cdi[t];
    if (this.cdi.length > t) {
      return this.cdi[t];
    } else if (this.cdi.length > 0) {
      return this.cdi[0];
    } else {
      return undefined;
    }
  }
  jNt(t) {
    var e;
    if (this.JPt && (e = t.length, this.JPt.RefreshByData(t, undefined, () => {
      this.yCi(t.length <= 0);
    }, true), e <= 0)) {
      ModelManager_1.ModelManager.InventoryModel.SetSelectedItemViewData(undefined);
    }
  }
  nCi() {
    var t = this.GetItem(7);
    var e = t.GetOwner();
    t.SetUIActive(true);
    this.JPt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(6), e, this.cHe);
    t.SetUIActive(false);
  }
  rCi() {
    this._di.RefreshTemp(InventoryDefine_1.COMMON_COIN);
    this._di.SetToPayShopFunction();
    this._di.RefreshAddButtonActive();
    this.udi.RefreshTemp(InventoryDefine_1.ADVANCED_COIN);
    this.udi.SetToPayShopFunction();
    this.udi.RefreshAddButtonActive();
  }
  pud() {
    this.ddi = ModelManager_1.ModelManager.InventoryModel.GetOpenIdMainTypeConfig();
    if (!(this.ddi.length <= 0)) {
      this.ddi.sort((t, e) => t.SequenceId - e.SequenceId);
    }
  }
  async oCi(t) {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.jdi, this.Wdi, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(1), e, this.Vgt);
    var e = this.ICi(this.ddi);
    await this.Ivt.RefreshTabItemAsync(e);
    this.Ivt.SelectToggleByIndex(t, true);
    this.Ivt.GetTabItemByIndex(1);
  }
  ICi(t) {
    var e = t.length;
    var i = this.Ivt.CreateTabItemDataByLength(e);
    for (let t = 0; t < e; t++) {
      var s = this.ddi[t];
      if (s) {
        i[t].RedDotName = this.TCi(s.Id);
      }
    }
    return i;
  }
  TCi(t) {
    let e = undefined;
    switch (t) {
      case 0:
        e = "InventoryVirtual";
        break;
      case 1:
        e = "InventoryCommon";
        break;
      case 2:
        e = "InventoryWeapon";
        break;
      case 3:
        e = "InventoryPhantom";
        break;
      case 4:
        e = "InventoryCollection";
        break;
      case 5:
        e = "InventoryMaterial";
        break;
      case 6:
        e = "InventoryMission";
        break;
      case 7:
        e = "InventorySpecial";
        break;
      case 8:
        e = "InventoryCard";
    }
    return e;
  }
  LCi() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Qdi(t);
  }
  Qdi(t) {
    this.pdi = true;
    t = this.ddi[t].Id;
    this.vCi(t);
    this.NJu(t);
    this.Odi();
  }
  MCi(t) {
    this._Ci();
    var e;
    var i;
    var s;
    var r = ModelManager_1.ModelManager.InventoryModel;
    for (const n of r.GetItemDataBaseByMainType(t)) {
      if (n.IsShowInInventory()) {
        if (n instanceof CommonItemData_1.CommonItemData) {
          if (!((s = n.GetMaxStackCount()) <= 0)) {
            if (e = n.GetConfig()) {
              i = n.GetConfigId();
              this.DCi(e.Id, n.GetCount(), s, e.QualityId, false, false, r.IsNewCommonItem(i), r.IsCommonItemHasRedDot(i), n);
            }
          }
        } else if (s = n.GetItemViewDataInfo(this.gdi)) {
          this.RCi(s);
        }
      }
    }
    return this.cdi;
  }
  _Ci() {
    this.cdi.length = 0;
    this.mdi.clear();
  }
  aCi() {
    if (this.ddi) {
      var t = [];
      for (const o of this.ddi) {
        var e = ModelManager_1.ModelManager.InventoryModel.GetInventoryItemGridCountByMainType(o.Id);
        var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(o.Id);
        var s = i.PackageId;
        if (ConfigManager_1.ConfigManager.InventoryConfig.GetPackageConfig(s).Capacity <= e) {
          s = i.Name;
          e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s) + " ";
          t.push(e);
        }
      }
      var r = t.length > 0;
      if (!this.vdi && r) {
        var n = new StringBuilder_1.StringBuilder();
        for (const a of t) {
          n.Append(a);
        }
        var h = new ConfirmBoxDefine_1.ConfirmBoxDataNew(173);
        h.SetTextArgs(n.ToString());
        this.vdi = true;
        h.FunctionMap.set(1, () => {
          this.vdi = false;
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(h);
      }
      if (this.Mdi !== r) {
        this.UCi(r);
      }
      this.Mdi = r;
    }
  }
  UCi(t) {
    if (t) {
      this.UiViewSequence.PlaySequence("Notice");
    } else {
      this.UiViewSequence.StopSequenceByKey("Notice", undefined, true);
    }
  }
  RCi(t) {
    var e = new ItemViewData_1.ItemViewData(t);
    for (const s of Array.from(this.Zdi.values())) {
      if (s.IsEqual(e, true)) {
        e.SetSelectOn(s.GetSelectOn());
        e.SetSelectNum(s.GetSelectNum());
        break;
      }
    }
    this.cdi.push(e);
    t = t.ConfigId;
    let i = this.mdi.get(t);
    if (!i) {
      i = new Set();
      this.mdi.set(t, i);
    }
    i.add(e);
    return e;
  }
  ACi(t) {
    return this.mdi.get(t);
  }
  DCi(i, s, r, n, h, o, a, _, m) {
    if (!(r <= 0)) {
      let t = s;
      let e = 0;
      const v = {
        ConfigId: i,
        Count: r,
        QualityId: n,
        IsLock: h,
        IsDeprecate: o,
        IsNewItem: a,
        ItemDataType: 0,
        ItemDataBase: m,
        HasRedDot: _,
        ItemOperationMode: this.gdi,
        IsSelectOn: false,
        SelectOnNum: 0,
        StackId: 0
      };
      while (t - r > 0) {
        const v = {
          ConfigId: i,
          Count: r,
          QualityId: n,
          IsLock: h,
          IsDeprecate: o,
          IsNewItem: a,
          ItemDataType: 0,
          ItemDataBase: m,
          HasRedDot: _,
          ItemOperationMode: this.gdi,
          IsSelectOn: false,
          SelectOnNum: 0,
          StackId: 0
        };
        v.Count = r;
        v.StackId = e;
        this.RCi(v);
        t -= r;
        e++;
      }
      v.Count = t;
      v.StackId = e;
      this.RCi(v);
    }
  }
  Xpt(t) {
    var e;
    var i;
    if (t) {
      e = t.GetRedDotDisableRule();
      i = ModelManager_1.ModelManager.InventoryModel;
      this.Ddi(t);
      if (e === 1) {
        this.Rdi(t);
      }
      if (t.GetItemDataType() === 0) {
        i.SaveNewCommonItemConfigIdList();
        i.SaveRedDotCommonItemConfigIdList();
      } else {
        i.SaveNewAttributeItemUniqueIdList();
        i.SaveRedDotAttributeItemUniqueIdList();
      }
      this.PCi(t);
      this.Adi(t);
      this.RefreshItemDescription(t);
      this.Kdi();
      if (this.gdi === 1) {
        this.xCi(t, this.fdi);
        if (!this.fdi) {
          this.Xdi(!t.GetSelectOn(), t);
        }
      }
    } else {
      this.wCi();
    }
  }
  SCi(t, e) {
    var i = ConfigManager_1.ConfigManager.InventoryConfig;
    var t = i.GetItemMainTypeConfig(t);
    var s = t.Name;
    var t = t.PackageId;
    var i = i.GetPackageConfig(t);
    var t = this.GetText(5);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, s);
    var t = e.length;
    var s = i.Capacity;
    var e = this.GetText(2);
    if (s <= t) {
      e.SetText(`<color=red>${t}</color>/${s}`);
      AudioSystem_1.AudioSystem.PostEvent("ui_inventory_capacity_full");
    } else {
      e.SetText(t + "/" + s);
    }
  }
  yCi(t) {
    var e = this.GetItem(4);
    var i = this.GetLoopScrollViewComponent(6);
    e.SetUIActive(t);
    i.RootUIComp.SetUIActive(!t);
    this.BCi();
    if (t && this.gdi === 1) {
      this.SetDestroyViewMode(0);
    }
  }
  Kdi() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Cdi[t] = this.JPt.GetSelectedGridIndex();
  }
  PCi(t) {
    if (this.Kci) {
      this.JPt.DeselectCurrentGridProxy();
    }
    var e = this.cdi.indexOf(t);
    if (!this.JPt.IsGridDisplaying(e)) {
      this.JPt.ScrollToGridIndex(e);
    }
    this.Kci = t;
    this.sdi = e;
    ModelManager_1.ModelManager.InventoryModel.SetSelectedItemViewData(t);
    this.JPt.SelectGridProxy(e, true);
    this.JPt.RefreshGridProxy(e);
    this.RefreshItemTipsFunction(t);
  }
  Ddi(t) {
    t.RemoveNewItem();
    if (!(t.GetUniqueId() > 0)) {
      var e = this.ACi(t.GetConfigId());
      if (e) {
        for (const i of e) {
          if (i !== t) {
            i.RemoveNewItem();
          }
        }
      }
    }
  }
  Rdi(t) {
    t.RemoveRedDotItem();
    if (!(t.GetUniqueId() > 0)) {
      var e = this.ACi(t.GetConfigId());
      if (e) {
        for (const i of e) {
          if (i !== t) {
            i.RemoveRedDotItem();
          }
        }
      }
    }
  }
  Adi(t) {
    if (!(t.GetUniqueId() > 0)) {
      var e;
      var i = this.ACi(t.GetConfigId());
      if (i) {
        for (const s of i) {
          if (s !== t) {
            e = this.cdi.indexOf(s);
            this.JPt.RefreshGridProxy(e);
          }
        }
      }
    }
  }
  RefreshItemTipsFunction(t) {
    var e = this.Kci.GetItemType();
    var t = t.GetItemDataBase();
    this.vxt.ClearButtonList();
    var i = this.G6a(t);
    this.mCi(i);
    if (e === 13) {
      if (!!ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() && !i.includes(4) && !i.includes(6)) {
        this.Ydi();
      }
    } else if (e !== 9 && e !== 2) {
      if (t.IsBuffEquipItem()) {
        this.Y4l(t);
      } else {
        this.cCi(t);
      }
    }
  }
  RefreshItemDescription(t) {
    var t = t.GetItemDataBase();
    var e = t.GetConfigId();
    var t = t.GetUniqueId();
    const i = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e, t);
    switch (this.gdi) {
      case 1:
        var s = i.GetWayData ?? [];
        for (const i of s) {
          i.Function = this.Jdi;
        }
        i.GetWayData = s;
        this.vxt.RefreshTips(i);
        this.vxt.SetVisible(true);
        this.vxt.SetTipsComponentLockButton(false);
        break;
      case 0:
        this.vxt.RefreshTips(i);
        this.vxt.SetVisible(true);
    }
    this.SPe.StopCurrentSequence();
  }
  wCi() {
    this.vxt.SetVisible(false);
  }
  kdi(t, e) {
    t = this.TipsButtonIndexMap.get(t);
    if (t) {
      this.vxt.SetButtonEnableByIndex(t, e);
    }
  }
  fCi(t, e, i) {
    if (this.TipsButtonIndexMap.has(t)) {
      t = this.TipsButtonIndexMap.get(t);
      this.vxt.SetButtonTextByIndex(t, e, i);
    }
  }
  Udi(t, e) {
    t = this.TipsButtonIndexMap.get(t);
    if (t !== undefined) {
      this.vxt.SetButtonRedDotVisible(t, e);
    }
  }
  mCi(t) {
    let e = 0;
    var i = [];
    for (const r of t) {
      var s = this.TipsButtonRelationMap.get(r);
      if (!s) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Inventory", 37, "背包Tips按钮功能设置错误");
        }
        return;
      }
      s.Index = e;
      this.TipsButtonIndexMap.set(r, e);
      i.push(s);
      e++;
    }
    this.vxt.RefreshButton(i);
  }
  tCi() {
    return this.Zdi.size === ItemViewDefine_1.MAX_DESTROY_MODE_COUNT;
  }
  SetViewMode(t) {
    var e = this.gdi;
    this.gdi = t;
    this.Zdi.clear();
    var i = this.GetButton(14);
    var s = this.GetButton(20);
    var r = this.GetExtendToggle(18);
    var n = this.GetItem(15);
    var h = this.GetText(16);
    var o = this.GetText(17);
    if (e !== this.gdi) {
      this.pCi(e);
    }
    this.Ivt.NeedCaptionSwitchWithToggle = this.gdi === 0;
    var t = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Ivt.SelectToggleByIndex(t, true);
    this.LCi();
    this.BCi();
    switch (this.gdi) {
      case 0:
        this.Ivt.SetCloseBtnShowState(true);
        i.RootUIComp.SetUIActive(false);
        this.vxt.SetButtonPanelVisible(true);
        r.RootUIComp.SetUIActive(false);
        s.RootUIComp.SetUIActive(false);
        this.WGe.SetUiActive(false);
        n.SetUIActive(false);
        h.SetUIActive(false);
        o.SetUIActive(false);
        break;
      case 1:
        this.Ivt.SetTitle(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemRecycle_text"));
        var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_DestroyModeIcon");
        this.Ivt.SetTitleIcon(a);
        this.Ivt.SetCloseBtnShowState(false);
        i.RootUIComp.SetUIActive(true);
        this.vxt.SetButtonPanelVisible(false);
        s.RootUIComp.SetUIActive(true);
        n.SetUIActive(true);
        this.bCi();
        o.SetUIActive(true);
    }
    if (e !== this.gdi) {
      this.UiViewSequence.PlaySequence(e === 0 ? "DestroyShow" : "DestroyHide", true);
    }
  }
  SetDestroyViewMode(t) {
    this.zdi = t;
    var e = this.GetText(16);
    switch (this.zdi) {
      case 0:
        var i = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
        var i = this.ddi[i].Id;
        var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(i);
        var i = i !== undefined && i?.bFilterSortVisible;
        if (!i) {
          e.ShowTextNew("Text_ItemRecycleChooseTip_text");
        }
        e.SetUIActive(!i);
        this.adi.SetUiActive(i);
        this.SetDestroyAllSelectedState(i);
        this.WGe.SetUiActive(false);
        break;
      case 1:
        e.SetUIActive(true);
        e.ShowTextNew("Text_ItemRecycleLimited_text");
        this.WGe.SetUiActive(false);
        this.adi.SetUiActive(false);
        this.SetDestroyAllSelectedState(false);
        break;
      case 2:
        e.SetUIActive(false);
        this.WGe.SetUiActive(true);
        this.adi.SetUiActive(false);
        this.SetDestroyAllSelectedState(false);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Inventory", 37, "切换摧毁模式表现", ["Mode", this.zdi.toString()]);
    }
  }
  xCi(t, e) {
    var i = !t.IsItemCanDestroy();
    if (i) {
      this.SetDestroyViewMode(e ? 0 : 1);
    } else {
      switch (t.GetItemDataType()) {
        case 0:
          this.SetDestroyViewMode(e ? 0 : 2);
          if (!e) {
            this.qCi(t);
          }
          break;
        case 2:
        case 3:
          this.SetDestroyViewMode(0);
      }
    }
  }
  Xdi(t, e) {
    if (e) {
      if (this.tCi() && t) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ItemDestroyCountLimit");
      } else if (e.IsItemCanDestroy()) {
        var i = this.cdi.indexOf(e);
        if (!(i < 0)) {
          for (const s of Array.from(this.Zdi.values())) {
            if (s.IsEqual(e, true)) {
              this.Zdi.delete(s);
              break;
            }
          }
          if (t) {
            this.Zdi.add(e);
            e.SetSelectNum(1);
          } else {
            e.SetSelectNum(0);
          }
          e.SetSelectOn(t);
          this.JPt.RefreshGridProxy(i);
          this.GCi(t, e);
        }
      } else if (this.zdi !== 1) {
        this.SetDestroyViewMode(1);
      }
    }
  }
  GCi(t, e) {
    this.bCi();
    switch (this.zdi) {
      case 0:
        if (t) {
          this.xCi(e, false);
        }
        break;
      case 2:
        if (t) {
          this.qCi(this.Kci);
        } else {
          this.SetDestroyViewMode(0);
        }
    }
  }
  SetDestroyAllSelectedState(t, e) {
    var i = this.GetExtendToggle(18);
    if (t !== undefined) {
      i.RootUIComp.SetUIActive(t);
    }
    if (e !== undefined) {
      i.SetToggleState(e ? 1 : 0, false);
    }
  }
  bCi() {
    var t = this.Zdi.size;
    var e = this.GetText(17);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Text_ItemRecycleChosenTotal_text", t.toString(), ItemViewDefine_1.MAX_DESTROY_MODE_COUNT.toString());
  }
  BCi() {
    var t = this.GetButton(13);
    var e = this.gdi === 1;
    var i = this.JPt.NCi >= 0;
    t.RootUIComp.SetUIActive(!e && i);
  }
  qCi(t) {
    if (t) {
      t = {
        MaxNumber: t.GetCount(),
        GetExchangeTableText: this.KGe,
        ValueChangeFunction: this.QGe
      };
      this.WGe.Init(t);
    }
  }
  vud() {
    if (this.OpenParam) {
      if (typeof this.OpenParam != "number") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Inventory", 87, "跳转参数类型错误");
        }
      } else {
        var t = this.OpenParam;
        var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t);
        if (e) {
          const i = e.GetMainType();
          e = this.ddi.findIndex(t => t.Id === i);
          if (e !== -1) {
            ModelManager_1.ModelManager.InventoryModel.SetSelectedTypeIndex(e);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Inventory", 87, "要定位的物品找不到对应页签", ["uniqueId", t], ["mainType", i]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Inventory", 87, "要定位的背包物品不存在", ["uniqueId", t]);
        }
      }
    }
  }
  Cud(t) {
    if (this.OpenParam) {
      if (typeof this.OpenParam != "number") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Inventory", 87, "跳转参数类型错误");
        }
      } else {
        const e = this.OpenParam;
        t = t.findIndex(t => t.GetUniqueId() === e);
        if (t !== -1) {
          this.yud(t);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Inventory", 87, "要定位的物品找不到对应格子", ["uniqueId", e]);
        }
        this.OpenParam = undefined;
      }
    }
  }
  yud(t) {
    var e = ModelManager_1.ModelManager.InventoryModel.GetSelectedTypeIndex();
    this.Cdi[e] = t;
  }
}
exports.InventoryView = InventoryView;
//# sourceMappingURL=InventoryView.js.map