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
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
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
    this.ZOo = (e, i) => {
      var t;
      if (e === this.DOo) {
        this.N2i = UiSceneManager_1.UiSceneManager.GetWeaponObserver();
        this.O2i = UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver();
        WeaponController_1.WeaponController.PlayWeaponRenderingMaterial("WeaponResonanceUpMaterialController", this.N2i, this.O2i);
        t = this.N2i.Model;
        UiModelUtil_1.UiModelUtil.PlayEffectAtRootComponent(t, "WeaponResonanceUpEffect");
        this.zOo.ClearSelectData();
        this.pmt();
        t = {
          WeaponIncId: e,
          LastLevel: i
        };
        UiManager_1.UiManager.OpenView("WeaponResonanceSuccessView", t);
      }
    };
    this.LNt = () => ModelManager_1.ModelManager.WeaponModel.GetResonanceMaterialList(this.DOo);
    this.jOo = () => {
      this.pmt();
    };
    this.eko = () => {
      const t = this.zOo.GetCurrentSelectedData();
      if (t) {
        if (this.B1o) {
          var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
          let e = 21;
          var n = t.IncId;
          if (n > 0) {
            r = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(n);
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
          var o = n > 0 ? r.GetWeaponName(r.GetWeaponConfigByItemId(t.ItemId).WeaponName) : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId).Name);
          var n = r.GetWeaponName(i.GetWeaponConfig().WeaponName);
          var r = this.tko();
          const a = i.GetIncId();
          i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
          i.SetTextArgs(o, n, r.toString());
          i.FunctionMap.set(2, () => {
            var e = [];
            var i = {
              w5n: t.IncId,
              m9n: 1,
              L8n: t.ItemId
            };
            e.push(i);
            WeaponController_1.WeaponController.SendPbResonUpRequest(a, e);
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponResonanceNoEnoughMoneyText");
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponSelectMaterialTipsText");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIText]];
  }
  OnStart() {
    this.DOo = this.ExtraParams;
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(6));
    this.p9t.SetFunction(this.eko);
    this.iko();
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
  rko(e, i) {
    let t = 0;
    if (this.zOo.GetCurrentSelectedData()) {
      n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo).GetWeaponConfig();
      t = ModelManager_1.ModelManager.WeaponModel.GetResonanceNeedMoney(n.ResonId, e, i);
    }
    var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ItemDefines_1.EItemId.Gold);
    this.GetText(8).SetText(t.toString());
    this.B1o = n >= t;
    this.GetText(8).useChangeColor = !this.B1o;
  }
  pmt() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
    var i = e.GetWeaponConfig();
    var e = e.GetResonanceLevel();
    var t = this.tko();
    var n = e === i.ResonLevelLimit;
    this.GetItem(3).SetUIActive(!n);
    this.GetText(1).SetUIActive(!n);
    this.GetItem(10).SetUIActive(!n);
    this.GetItem(4).SetUIActive(!n);
    this.p9t.GetRootItem().SetUIActive(!n);
    this.GetItem(9).SetUIActive(n);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "WeaponResonanceLevelText", e);
    var r = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(i, e);
    let o = undefined;
    if (!n) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "WeaponResonanceLevelText", t);
      this.rko(e, t);
      var a = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(i, t);
      o = [];
      var s = CommonParamById_1.configCommonParamById.GetStringConfig("HighlightColor");
      for (let i = 0; i < r.length; i++) {
        var l = r[i];
        var h = a[i];
        let e = undefined;
        e = l === h ? l.toString() : StringUtils_1.StringUtils.Format("{0}-><color=#{1}>{2}</color>", l, s, h);
        o.push(e);
      }
    }
    o = o ?? r;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Desc, ...o);
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
    var i = e.GetWeaponConfig();
    var t = i.WeaponName;
    var n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i.QualityId);
    var n = UE.Color.FromHex(n.DropColor);
    this.GetText(12).SetColor(n);
    this.GetText(12).ShowTextNew(t);
    var n = e.GetResonanceLevel();
    var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(i.ResonId, n);
    if (t) {
      this.GetText(13).SetText(ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(t.Name));
    }
  }
  tko() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.DOo);
    var i = e.GetResonanceLevel();
    var t = this.zOo.GetCurrentSelectedData();
    if (t && t.IncId !== 0) {
      t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(t.IncId).GetResonanceLevel() + e.GetResonanceLevel();
      if ((e = e.GetWeaponConfig().ResonLevelLimit) < t) {
        return e;
      } else {
        return t;
      }
    } else {
      return i + 1;
    }
  }
}
exports.WeaponResonanceView = WeaponResonanceView;
//# sourceMappingURL=WeaponResonanceView.js.map