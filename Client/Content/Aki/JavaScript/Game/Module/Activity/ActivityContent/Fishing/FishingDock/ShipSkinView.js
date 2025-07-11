"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipSkinView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const FishingController_1 = require("../FishingController");
class ShipSkinView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.xqe = undefined;
    this.ebl = undefined;
    this.dt_ = 0;
    this.mt_ = () => {
      this.CloseMe();
    };
    this.Oho = () => {
      var e = new ShipSkinItem();
      e.ClickFunc = this.SZl;
      return e;
    };
    this.SZl = (e, i) => {
      this.ebl?.SetToggleState(0);
      this.ebl = e;
      this.Og(i);
    };
    this.L3e = () => {
      FishingController_1.FishingController.RequestFishingShipSkinChange(this.dt_);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[6, this.L3e]];
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.Oho);
    var e = [];
    for (const i of ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingSkinConfig()) {
      e.push(i.Id);
    }
    this.xqe.RefreshByData(e, () => {
      this.dt_ = ModelManager_1.ModelManager.FishingModel.CurrentShipSkin;
      var e = this.xqe.GetScrollItemList();
      for (const i of e) {
        if (i.SkinId === this.dt_) {
          i.SelectToggle();
          return;
        }
      }
      e[0]?.SelectToggle();
    });
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingShipSkinChangeSuccess, this.mt_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingShipSkinChangeSuccess, this.mt_);
  }
  Og(e) {
    this.dt_ = e;
    e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingShipSkinConfig(e);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.DesText);
      if (ModelManager_1.ModelManager.FishingModel.UnlockShipSkin.includes(this.dt_)) {
        this.GetButton(6).RootUIComp.SetUIActive(true);
        this.GetItem(7).SetUIActive(false);
      } else {
        this.GetButton(6).RootUIComp.SetUIActive(false);
        this.GetItem(7).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.LockText);
      }
      this.dH_();
    }
  }
  dH_() {
    if (ModelManager_1.ModelManager.FishingModel.UnlockShipSkin.includes(this.dt_)) {
      ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FishingShipSkinRecord, this.dt_);
      ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.FishingShipSkinRecord);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingShipSkinClick);
    }
  }
}
exports.ShipSkinView = ShipSkinView;
class ShipSkinItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SkinId = 0;
    this.ClickFunc = undefined;
    this.kqe = () => {
      this.ClickFunc?.(this.GetExtendToggle(0), this.SkinId);
      this.GetItem(5).SetUIActive(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(e, i, t) {
    this.SkinId = e;
    var s;
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingShipSkinConfig(e);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
      this.SetTextureByPath(e.BigTexture, this.GetTexture(1));
      e = this.SkinId === ModelManager_1.ModelManager.FishingModel.GetShipData().GetCurrentSkinId();
      this.GetItem(3).SetUIActive(e);
      this.GetExtendToggle(0).SetToggleState(e ? 1 : 0);
      e = ModelManager_1.ModelManager.FishingModel.UnlockShipSkin.includes(this.SkinId);
      this.GetItem(4).SetUIActive(!e);
      s = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FishingShipSkinRecord, this.SkinId);
      if (e) {
        this.GetItem(5).SetUIActive(!s);
      } else {
        this.GetItem(5).SetUIActive(false);
      }
    }
  }
  SelectToggle() {
    this.GetExtendToggle(0).SetToggleState(1, false);
    this.ClickFunc?.(this.GetExtendToggle(0), this.SkinId);
    this.GetItem(5).SetUIActive(false);
  }
}
//# sourceMappingURL=ShipSkinView.js.map