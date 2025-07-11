"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemTipsAbyssDangoComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const DangoAbyssActivityController_1 = require("../../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityController");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const InActiveRedItem_1 = require("../../../Common/InActiveRedItem");
const ItemTipsBaseSubComponent_1 = require("../../../Common/ItemTips/SubComponents/ItemTipsBaseSubComponent");
const ItemTipsLockButton_1 = require("../../../Common/ItemTips/SubComponents/ItemTipsLockButton");
const MediumItemGridDangoPluginIconComponent_1 = require("../../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridDangoPluginIconComponent");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DangoAbyssDefine_1 = require("../DangoAbyssDefine");
const DangoAbyssTagItem_1 = require("./DangoAbyssTagItem");
const DangoAbyssTipsAttributeItem_1 = require("./DangoAbyssTipsAttributeItem");
class ItemTipsAbyssDangoComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(e) {
    super(e);
    this.$8i = undefined;
    this.Yyc = undefined;
    this.ucc = undefined;
    this.AGc = undefined;
    this.pSc = undefined;
    this.wxt = undefined;
    this.vSc = undefined;
    this.uNc = 0;
    this.L3a = e => {
      this.Og(this.$8i);
    };
    this.ySc = () => {
      var e = new DangoAbyssTagItem_1.DangoAbyssTagItem();
      e.GetValueByTips = true;
      return e;
    };
    this.Bqe = () => {
      return new DangoAbyssTipsAttributeItem_1.DangoAbyssTipsAttributeItem();
    };
    this.tWt = () => {
      var e;
      if (this.uNc === 2) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(303)).FunctionMap.set(2, this.dNc);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        this.dNc();
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Activity", 75, "当前按钮状态：" + this.uNc);
      }
    };
    this.dNc = () => {
      var e;
      if (this.$8i) {
        e = {
          DangoId: this.$8i.DangoId,
          SlotIndex: this.$8i.SlotIndex,
          IncId: this.$8i.IncId
        };
        e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssItemNewEquip(e, this.uNc);
        DangoAbyssActivityController_1.DangoAbyssActivityController.RequestPutPluginOnDango(this.$8i.DangoId, e, this.uNc);
      }
    };
    this.CreateThenShowByResourceIdAsync("UiItem_TipsChipInfo", e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UITexture], [12, UE.UITexture], [13, UE.UINiagara], [14, UE.UIText]];
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.L3a);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.L3a);
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Yyc = new InActiveRedItem_1.InActiveRedItem();
    e.push(this.Yyc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.ucc = new ButtonItem_1.ButtonItem();
    e.push(this.ucc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.ucc.SetFunction(this.tWt);
    this.AGc = new MediumItemGridDangoPluginIconComponent_1.MediumItemGridDangoPluginIconComponent();
    e.push(this.AGc.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
    this.wxt = new ItemTipsLockButton_1.TipsLockButton(this.GetItem(0));
    await Promise.all(e);
  }
  OnStart() {
    this.pSc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Bqe, this.GetItem(2).GetOwner());
    this.vSc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.ySc, this.GetItem(4).GetOwner());
  }
  Refresh(e) {
    var t = () => {
      this.Og(e);
    };
    if (this.InAsyncLoading()) {
      this.OperationMap.set("Refresh", t);
    } else {
      t();
    }
  }
  Og(e) {
    this.$8i = e;
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginShowAttributeList(e.ConfigId);
    this.fvt(t);
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginShowTagDataList(e.ConfigId);
    this.qSo(t);
    var t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetItemBgDesc(e.ConfigId);
    this.GetText(6).SetText(t);
    this._Oe(e);
    this.Zyc(e);
    this.P7e(e);
    this.ASc(e);
    this.Kbe(e);
    this.P5e(e);
    this.BGt(e);
    this.iw1(e);
  }
  _Oe(e) {
    if ((this.uNc = 0) < e.DangoId && e.SlotIndex >= 0) {
      e = {
        DangoId: e.DangoId,
        SlotIndex: e.SlotIndex,
        IncId: e.IncId
      };
      this.uNc = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssItemTipsConfirmState(e);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 75, "当前按钮状态：" + this.uNc);
    }
  }
  Kbe(e) {
    e = {
      PluginItemId: e.ConfigId
    };
    this.AGc?.RefreshByInfo(e);
  }
  ASc(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemConfig(e.ConfigId);
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemTypeConfig(t.ItemType);
    if (e.IncId && e.IncId > 0) {
      this.wxt.Refresh(e.IncId, e.CanClickLockButton);
      this.wxt.SetDeprecateToggleVisible(t.Deprecate);
      this.wxt?.SetUiActive(true);
    } else {
      this.wxt?.SetUiActive(false);
    }
  }
  P7e(e) {
    this.ucc.SetUiActive(true);
    switch (this.uNc) {
      case 2:
        this.ucc.TrySetLocalTextNew("Text_PhantomReplace_Text");
        break;
      case 3:
        this.ucc.TrySetLocalTextNew("Text_PhantomTakeOff_Text");
        break;
      case 4:
        this.ucc.TrySetLocalTextNew("Text_PhantomReplace_Text");
        break;
      case 5:
        this.ucc.TrySetLocalTextNew("Text_PhantomPutOn_Text");
        break;
      case 6:
        this.ucc.TrySetLocalTextNew("Text_PhantomReplace_Text");
        break;
      case 7:
        this.ucc.TrySetLocalTextNew("Text_PhantomPutOn_Text");
        break;
      default:
        this.ucc.SetUiActive(false);
    }
  }
  Zyc(e) {
    this.Yyc.SetUiActive(true);
    this.Yyc.SetDetailButtonVisible(false);
    switch (this.uNc) {
      case 1:
        var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemBelongId(e.IncId);
        var t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(t).Name;
        var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
        this.Yyc.SetText(DangoAbyssDefine_1.TEXT_EQUIP_ERROR_DANGO, t);
        break;
      case 8:
        this.Yyc.SetText(DangoAbyssDefine_1.TEXT_EQUIP_SAME);
        break;
      case 9:
        this.Yyc.SetText(DangoAbyssDefine_1.TEXT_EQUIP_REPEAT);
        break;
      default:
        this.Yyc.SetUiActive(false);
    }
  }
  fvt(e) {
    this.pSc.RefreshByData(e);
  }
  qSo(e) {
    this.vSc.RefreshByData(e);
  }
  P5e(e) {
    var t = this.GetText(10);
    var i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(e.ConfigId);
    var i = UE.Color.FromHex(i.DropColor);
    t.SetColor(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Title);
  }
  BGt(e) {
    var t = this.GetUiNiagara(13);
    t.DeactivateSystem();
    var i = this.GetTexture(11);
    var e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(e.ConfigId);
    var s = e.TipsQualityTexturePath;
    var e = e.QualityColor;
    var e = UE.Color.FromHex(e);
    t.SetColor(e);
    t.ActivateSystem(true);
    this.SetTextureByPath(s, i);
  }
  iw1(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e.ConfigId).SlotType;
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(14), DangoAbyssDefine_1.textPluginType.get(e));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length < 2)) {
      e = e[1];
      if (e = this.GetGuideUiItem(e)) {
        return [e, e];
      } else {
        return undefined;
      }
    }
  }
}
exports.ItemTipsAbyssDangoComponent = ItemTipsAbyssDangoComponent;
//# sourceMappingURL=ItemTipsAbyssDangoComponent.js.map