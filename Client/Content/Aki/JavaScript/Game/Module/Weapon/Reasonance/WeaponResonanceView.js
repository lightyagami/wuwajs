"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponResonanceView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeaponController_1 = require("../WeaponController");
const SingleItemSelect_1 = require("./SingleItemSelect");
class WeaponResonanceView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.B1o = false;
    this.p9t = undefined;
    this.zOo = undefined;
    this.DOo = 0;
    this.N2i = undefined;
    this.O2i = undefined;
    this.EHd = false;
    this.IHd = undefined;
    this.ZOo = (e, t) => {
      var i;
      if (e === this.DOo) {
        this.N2i = UiSceneManager_1.UiSceneManager.GetWeaponObserver();
        this.O2i = UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver();
        WeaponController_1.WeaponController.PlayWeaponRenderingMaterial("WeaponResonanceUpMaterialController", this.N2i, this.O2i);
        i = this.N2i.Model;
        UiModelUtil_1.UiModelUtil.PlayEffectAtRootComponent(i, "WeaponResonanceUpEffect");
        if (this.EHd) {
          this.THd();
        } else {
          this.zOo.ClearSelectData();
        }
        this.pmt();
        i = {
          WeaponIncId: e,
          LastLevel: t
        };
        UiManager_1.UiManager.OpenView("WeaponResonanceSuccessView", i);
      }
    };
    this.LNt = () => ModelManager_1.ModelManager.WeaponModel.GetResonanceMaterialList(this.DOo);
    this.jOo = () => {
      this.pmt();
    };
    this.eko = () => {
      const i = this.bHd();
      if (i) {
        if (this.B1o) {
          var t = i.IncId;
          if (t <= 0 && ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(i.ItemId) === 0) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("ResonanceItemNotEnough");
          } else {
            var n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
            let e = 21;
            if (t > 0) {
              r = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(t);
              o = ModelManager_1.ModelManager.WeaponModel.IsWeaponHighLevel(r);
              r = ModelManager_1.ModelManager.WeaponModel.HasWeaponResonance(r);
              if (o && r) {
                e = 27;
              } else if (r) {
                e = 25;
              } else if (o) {
                e = 26;
              }
            }
            var r = ConfigManager_1.ConfigManager.WeaponConfig;
            var o = t > 0 ? r.GetWeaponName(r.GetWeaponConfigByItemId(i.ItemId).WeaponName) : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.ItemId).Name);
            var t = r.GetWeaponName(n.GetWeaponConfig().WeaponName);
            var r = this.tko();
            const a = n.GetIncId();
            n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
            n.SetTextArgs(o, t, r.toString());
            n.FunctionMap.set(2, () => {
              var e = [];
              var t = {
                w5n: i.IncId,
                m9n: 1,
                L8n: i.ItemId
              };
              e.push(t);
              WeaponController_1.WeaponController.SendPbResonUpRequest(a, e);
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
          }
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("WeaponResonanceNoEnoughMoneyText");
        }
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("WeaponSelectMaterialTipsText");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIText]];
  }
  OnStart() {
    this.DOo = this.ExtraParams;
    if (this.RHd().MaterialPlaceType === 1) {
      this.EHd = true;
    }
    if (this.EHd) {
      this.IHd = new MediumItemGrid_1.MediumItemGrid();
      this.IHd.Initialize(this.GetItem(5).GetOwner());
      this.THd();
    } else {
      this.iko();
    }
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(6));
    this.p9t.SetFunction(this.eko);
    this.oko();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeaponResonanceSuccess, this.ZOo);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeaponResonanceSuccess, this.ZOo);
  }
  iko() {
    this.zOo = new SingleItemSelect_1.SingleItemSelect();
    this.zOo.Init(this.GetItem(5));
    this.zOo.SetUseWayId(28);
    this.zOo.SetInitSortToggleState(true);
    this.zOo.SetGetItemListFunction(this.LNt);
    this.zOo.SetItemSelectChangeCallBack(this.jOo);
  }
  oko() {
    this.SetItemIcon(this.GetTexture(7), ItemDefines_1.EItemId.Gold);
  }
  rko(e, t) {
    let i = 0;
    if (this.EHd || this.zOo.GetCurrentSelectedData()) {
      n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo).GetWeaponConfig();
      i = ModelManager_1.ModelManager.WeaponModel.GetResonanceNeedMoney(n.ResonId, e, t);
    }
    var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ItemDefines_1.EItemId.Gold);
    this.GetText(8).SetText(i.toString());
    this.B1o = n >= i;
    this.GetText(8).useChangeColor = !this.B1o;
  }
  pmt() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
    var t = e.GetWeaponConfig();
    var e = e.GetResonanceLevel();
    var i = e === t.ResonLevelLimit;
    this.GetItem(3).SetUIActive(!i);
    this.GetText(1).SetUIActive(!i);
    this.GetItem(10).SetUIActive(!i);
    this.GetItem(4).SetUIActive(!i);
    this.p9t.GetRootItem().SetUIActive(!i);
    this.GetItem(9).SetUIActive(i);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "WeaponResonanceLevelText", e);
    var n = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(t, e);
    let r = undefined;
    if (!i) {
      var i = this.tko();
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "WeaponResonanceLevelText", i);
      this.rko(e, i);
      var o = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(t, i);
      r = [];
      var a = CommonParamById_1.configCommonParamById.GetStringConfig("HighlightColor");
      for (let t = 0; t < n.length; t++) {
        var s = n[t];
        var h = o[t];
        let e = undefined;
        e = s === h ? s.toString() : StringUtils_1.StringUtils.Format("{0}-><color=#{1}>{2}</color>", s, a, h);
        r.push(e);
      }
    }
    r = r ?? n;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.Desc, ...r);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(3);
    this.Refresh();
  }
  Refresh() {
    this.RefreshName();
    this.pmt();
  }
  RefreshName() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
    var t = e.GetWeaponConfig();
    var i = t.WeaponName;
    var n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(t.QualityId);
    var n = UE.Color.FromHex(n.DropColor);
    this.GetText(12).SetColor(n);
    this.GetText(12).ShowTextNew(i);
    var n = e.GetResonanceLevel();
    var i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(t.ResonId, n);
    if (i) {
      this.GetText(13).SetText(ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(i.Name));
    }
  }
  tko() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
    var t = e.GetResonanceLevel();
    var i = this.bHd();
    if (this.EHd || !i || i.IncId === 0) {
      return t + 1;
    } else {
      t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(i.IncId).GetResonanceLevel() + e.GetResonanceLevel();
      if ((i = e.GetWeaponConfig().ResonLevelLimit) < t) {
        return i;
      } else {
        return t;
      }
    }
  }
  bHd() {
    var e;
    if (this.EHd) {
      return {
        ItemId: e = this.RHd().AlternativeConsume[0],
        IncId: 0,
        Count: ModelManager_1.ModelManager.InventoryModel?.GetCommonItemCount(e) ?? 0,
        SelectedCount: 1
      };
    } else {
      return this.zOo.GetCurrentSelectedData();
    }
  }
  RHd() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
    var t = e.GetWeaponConfig();
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(t.ResonId, e.GetResonanceLevel());
  }
  THd() {
    const e = this.bHd().ItemId;
    var t = {
      Type: 4,
      ItemConfigId: e
    };
    var i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(e);
    t.BottomTextId = "Text_ItemEnoughText_Text";
    if (i < 1) {
      t.BottomTextId = "Text_ItemNotEnoughText_Text";
    }
    t.BottomTextParameter = [i, 1];
    this.IHd.Apply(t);
    this.IHd.BindOnCanExecuteChange(() => false);
    this.IHd.BindOnExtendToggleClicked(() => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
    });
  }
}
exports.WeaponResonanceView = WeaponResonanceView;
//# sourceMappingURL=WeaponResonanceView.js.map