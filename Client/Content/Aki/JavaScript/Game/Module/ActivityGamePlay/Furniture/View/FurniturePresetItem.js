"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurniturePresetItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonCurrencyItemListComponent_1 = require("../../../Common/CommonCurrencyItemListComponent");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const FurniturePresetGridItem_1 = require("./FurniturePresetGridItem");
class FurniturePresetItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xOl = undefined;
    this.kA1 = 0;
    this.TTg = 0;
    this.bTg = 0;
    this.ZLg = new Set();
    this.LTg = false;
    this.h1g = [];
    this.PresetScrollView = undefined;
    this.jvg = undefined;
    this.wTg = undefined;
    this.PTg = undefined;
    this.OnApplyDelegate = undefined;
    this.zxl = () => {
      UiManager_1.UiManager.CloseView("FurniturePresetView", () => {
        ControllerHolder_1.ControllerHolder.FurnitureController.OpenFurnitureShopViewAsync();
      });
    };
    this.Weg = () => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(441);
      t.IsEscViewTriggerCallBack = false;
      t.FunctionMap.set(2, () => {
        this.fMa();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.ATg = () => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(442);
      t.IsEscViewTriggerCallBack = false;
      t.FunctionMap.set(2, () => {
        this.DTg();
      });
      t.TextArgs = [this.TTg.toString()];
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    };
    this.Keg = () => new FurniturePresetGridItem_1.FurniturePresetGridItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIItem]];
    this.BtnBindInfo = [[5, this.zxl]];
  }
  async OnBeforeStartAsync() {
    this.PresetScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.Keg);
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetGameplayConfigById(ModelManager_1.ModelManager.FurnitureModel.cVn);
    if (t) {
      t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t.ShopId);
      this.kA1 = t.Money[0];
      this.jvg = new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(this.GetItem(10));
      this.wTg = new ButtonItem_1.ButtonItem();
      this.PTg = new ButtonItem_1.ButtonItem();
      await Promise.all([this.wTg.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()), this.PTg.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.jvg.SetCurrencyItemList([this.kA1])]);
      this.wTg.SetFunction(this.Weg);
      this.PTg.SetFunction(this.ATg);
    }
  }
  Refresh(t) {
    var t = (this.xOl = t).GetAreaId();
    var t = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurniturePresetConfig(t);
    this.l1g(t);
    this.$vg();
    this.PresetScrollView.RefreshByData(this.h1g);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
    this.SetTextureByPath(t.Icon, this.GetTexture(1));
    var t = this.bTg > 0;
    var i = this.bTg === this.h1g.length;
    var e = this.bTg === 0;
    this.wTg?.SetEnableClick(!i);
    this.wTg?.SetLocalTextNew(e ? "DIY_FoolproofWindow_SetAll_Button" : "DIY_FoolproofWindow_SetExist_Button");
    this.PTg?.SetUiActive(t);
    if (t) {
      i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.kA1);
      this.SetItemIcon(this.GetTexture(8), this.kA1);
      (e = this.GetText(9)).SetText(this.TTg.toString());
      e.SetChangeColor(i < this.TTg, e.changeColor);
      this.PTg?.SetEnableClick(i >= this.TTg);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "DIY_FoolproofWindow_FurList_Title", this.h1g.length - this.bTg, this.h1g.length);
  }
  l1g(t) {
    this.h1g.length = 0;
    this.bTg = 0;
    var i;
    var e;
    var r = new Set();
    for (const s of t.FurniturePlaceInfo.values()) {
      for (const o of s.ArrayInt) {
        if (!r.has(o)) {
          r.add(o);
          i = ConfigManager_1.ConfigManager.FurnitureConfig.GetFurnitureConfig(o);
          e = !ModelManager_1.ModelManager.FurnitureModel.GetIsFurnitureUnlockById(o);
          this.h1g.push({
            FurnitureConfig: i,
            IsLock: e,
            IsFinished: !e
          });
          if (e) {
            this.bTg++;
          }
        }
      }
    }
    this.gBg();
  }
  gBg() {
    this.h1g.sort((t, i) => t.IsLock === i.IsLock ? t.FurnitureConfig.Id - i.FurnitureConfig.Id : t.IsLock ? -1 : 1);
  }
  $vg() {
    this.TTg = 0;
    this.ZLg.clear();
    for (const e of this.h1g) {
      var t;
      var i;
      if (e.IsLock) {
        if ((t = e.FurnitureConfig).SourceType === 1 && !(t = t.GetWayId, this.ZLg.has(t))) {
          if ((i = ModelManager_1.ModelManager.PayShopModel.GetPayShopGoods(t)) && i.IfCanBuy()) {
            i = i?.GetPriceData();
            this.TTg += i?.NowPrice ?? 0;
            this.ZLg.add(t);
          }
        }
      }
    }
  }
  fMa() {
    if (this.xOl) {
      this.OnApplyDelegate?.(this.xOl);
    }
  }
  async UTg() {
    const i = new CustomPromise_1.CustomPromise();
    var t = [];
    for (const r of this.ZLg) {
      var e = {
        s5n: r,
        m9n: 1
      };
      t.push(e);
    }
    ControllerHolder_1.ControllerHolder.PayShopController.ActivityPayShopBuyRequest(t, t => {
      i.SetResult(t);
    });
    await i.Promise;
  }
  async DTg() {
    if (!this.LTg) {
      this.LTg = true;
      await this.UTg();
      this.fMa();
      this.LTg = false;
    }
  }
}
exports.FurniturePresetItem = FurniturePresetItem;
//# sourceMappingURL=FurniturePresetItem.js.map