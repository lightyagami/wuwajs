"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ItemTipsAbyssDangoComponent = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  DangoAbyssActivityController_1 = require("../../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityController"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  InActiveRedItem_1 = require("../../../Common/InActiveRedItem"),
  ItemTipsBaseSubComponent_1 = require("../../../Common/ItemTips/SubComponents/ItemTipsBaseSubComponent"),
  ItemTipsLockButton_1 = require("../../../Common/ItemTips/SubComponents/ItemTipsLockButton"),
  MediumItemGridDangoPluginIconComponent_1 = require("../../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridDangoPluginIconComponent"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DangoAbyssDefine_1 = require("../DangoAbyssDefine"),
  DangoAbyssTagItem_1 = require("./DangoAbyssTagItem"),
  DangoAbyssTipsAttributeItem_1 = require("./DangoAbyssTipsAttributeItem");
class ItemTipsAbyssDangoComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(e) {
    super(e), this.$8i = void 0, this.Yyc = void 0, this.ucc = void 0, this.AGc = void 0, this.pSc = void 0, this.wxt = void 0, this.vSc = void 0, this.uNc = 0, this.L3a = e => {
      this.Og(this.$8i)
    }, this.ySc = () => {
      var e = new DangoAbyssTagItem_1.DangoAbyssTagItem;
      return e.GetValueByTips = !0, e
    }, this.Bqe = () => {
      return new DangoAbyssTipsAttributeItem_1.DangoAbyssTipsAttributeItem
    }, this.tWt = () => {
      var e;
      2 === this.uNc ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(303)).FunctionMap.set(2, this.dNc), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e)) : this.dNc(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Activity", 75, "当前按钮状态：" + this.uNc)
    }, this.dNc = () => {
      var e;
      this.$8i && (e = {
        DangoId: this.$8i.DangoId,
        SlotIndex: this.$8i.SlotIndex,
        IncId: this.$8i.IncId
      }, e = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssItemNewEquip(e, this.uNc), DangoAbyssActivityController_1.DangoAbyssActivityController.RequestPutPluginOnDango(this.$8i.DangoId, e, this.uNc))
    }, this.CreateThenShowByResourceIdAsync("UiItem_TipsChipInfo", e)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UITexture],
      [12, UE.UITexture],
      [13, UE.UINiagara],
      [14, UE.UIText]
    ]
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.L3a)
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.L3a)
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Yyc = new InActiveRedItem_1.InActiveRedItem, e.push(this.Yyc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())), this.ucc = new ButtonItem_1.ButtonItem, e.push(this.ucc.CreateThenShowByActorAsync(this.GetItem(7).GetOwner())), this.ucc.SetFunction(this.tWt), this.AGc = new MediumItemGridDangoPluginIconComponent_1.MediumItemGridDangoPluginIconComponent, e.push(this.AGc.CreateThenShowByActorAsync(this.GetItem(9).GetOwner())), this.wxt = new ItemTipsLockButton_1.TipsLockButton(this.GetItem(0)), await Promise.all(e)
  }
  OnStart() {
    this.pSc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Bqe, this.GetItem(2).GetOwner()), this.vSc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.ySc, this.GetItem(4).GetOwner())
  }
  Refresh(e) {
    var t = () => {
      this.Og(e)
    };
    this.InAsyncLoading() ? this.OperationMap.set("Refresh", t) : t()
  }
  Og(e) {
    this.$8i = e;
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginShowAttributeList(e.ConfigId),
      t = (this.fvt(t), ModelManager_1.ModelManager.DangoAbyssModel.GetPluginShowTagDataList(e.ConfigId)),
      t = (this.qSo(t), ConfigManager_1.ConfigManager.DangoAbyssConfig.GetItemBgDesc(e.ConfigId));
    this.GetText(6).SetText(t), this._Oe(e), this.Zyc(e), this.P7e(e), this.ASc(e), this.Kbe(e), this.P5e(e), this.BGt(e), this.AL1(e)
  }
  _Oe(e) {
    (this.uNc = 0) < e.DangoId && 0 <= e.SlotIndex && (e = {
      DangoId: e.DangoId,
      SlotIndex: e.SlotIndex,
      IncId: e.IncId
    }, this.uNc = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssItemTipsConfirmState(e)), Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 75, "当前按钮状态：" + this.uNc)
  }
  Kbe(e) {
    e = {
      PluginItemId: e.ConfigId
    };
    this.AGc?.RefreshByInfo(e)
  }
  ASc(e) {
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemConfig(e.ConfigId),
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemTypeConfig(t.ItemType);
    e.IncId && 0 < e.IncId ? (this.wxt.Refresh(e.IncId, e.CanClickLockButton), this.wxt.SetDeprecateToggleVisible(t.Deprecate), this.wxt?.SetUiActive(!0)) : this.wxt?.SetUiActive(!1)
  }
  P7e(e) {
    switch (this.ucc.SetUiActive(!0), this.uNc) {
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
        this.ucc.SetUiActive(!1)
    }
  }
  Zyc(e) {
    switch (this.Yyc.SetUiActive(!0), this.Yyc.SetDetailButtonVisible(!1), this.uNc) {
      case 1:
        var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoItemBelongId(e.IncId),
          t = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(t).Name,
          t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
        this.Yyc.SetText(DangoAbyssDefine_1.TEXT_EQUIP_ERROR_DANGO, t);
        break;
      case 8:
        this.Yyc.SetText(DangoAbyssDefine_1.TEXT_EQUIP_SAME);
        break;
      case 9:
        this.Yyc.SetText(DangoAbyssDefine_1.TEXT_EQUIP_REPEAT);
        break;
      default:
        this.Yyc.SetUiActive(!1)
    }
  }
  fvt(e) {
    this.pSc.RefreshByData(e)
  }
  qSo(e) {
    this.vSc.RefreshByData(e)
  }
  P5e(e) {
    var t = this.GetText(10),
      i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(e.ConfigId),
      i = UE.Color.FromHex(i.DropColor);
    t.SetColor(i), LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Title)
  }
  BGt(e) {
    var t = this.GetUiNiagara(13),
      i = (t.DeactivateSystem(), this.GetTexture(11)),
      e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(e.ConfigId),
      s = e.TipsQualityTexturePath,
      e = e.QualityColor,
      e = UE.Color.FromHex(e);
    t.SetColor(e), t.ActivateSystem(!0), this.SetTextureByPath(s, i)
  }
  AL1(e) {
    e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e.ConfigId).SlotType;
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(14), DangoAbyssDefine_1.textPluginType.get(e))
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (!(e.length < 2)) return e = e[1], (e = this.GetGuideUiItem(e)) ? [e, e] : void 0
  }
}
exports.ItemTipsAbyssDangoComponent = ItemTipsAbyssDangoComponent;
//# sourceMappingURL=ItemTipsAbyssDangoComponent.js.map