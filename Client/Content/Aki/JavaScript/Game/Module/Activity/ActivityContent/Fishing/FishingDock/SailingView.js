"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SailingView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const CommonCurrencyItem_1 = require("../../../../Common/CommonCurrencyItem");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../../../Help/HelpController");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const FishingController_1 = require("../FishingController");
const FishingDefine_1 = require("../FishingDefine");
class SailingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.zji = undefined;
    this.Awe = () => {
      this.CloseMe();
    };
    this.mZl = () => {
      UiManager_1.UiManager.OpenView("ShipSkinView");
    };
    this.CZl = () => {
      HelpController_1.HelpController.OpenHelpById(FishingDefine_1.SAILING_TIME_HELP_ID);
    };
    this.gZl = () => {
      HelpController_1.HelpController.OpenHelpById(FishingDefine_1.SAILING_DURABILITY_HELP_ID);
    };
    this.pZl = () => {
      this.zji?.SetToggleState(0, false);
      this.zji = this.GetExtendToggle(4);
      ModelManager_1.ModelManager.FishingModel.LocalSailingTime = 0;
    };
    this.fZl = () => {
      this.zji?.SetToggleState(0, false);
      this.zji = this.GetExtendToggle(5);
      ModelManager_1.ModelManager.FishingModel.LocalSailingTime = 1;
    };
    this.vZl = () => {
      this.zji?.SetToggleState(0, false);
      this.zji = this.GetExtendToggle(6);
      ModelManager_1.ModelManager.FishingModel.LocalSailingTime = 2;
    };
    this.L3e = () => {
      const e = this.GetExtendToggle(14).ToggleState === 1;
      var i = ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust;
      if (i) {
        var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(i);
        if (i.IsNight) {
          if (ModelManager_1.ModelManager.FishingModel.LocalSailingTime === 1 || ModelManager_1.ModelManager.FishingModel.LocalSailingTime === 0 && !ModelManager_1.ModelManager.FishingQuestModel.IsInNight()) {
            (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(261)).FunctionMap.set(1, () => {
              FishingController_1.FishingController.RequestFishingSailingRequest(e, ModelManager_1.ModelManager.FishingModel.DockId, ModelManager_1.ModelManager.FishingModel.LocalSailingTime);
            });
            i.FunctionMap.set(2, () => {
              FishingController_1.FishingController.RequestFishingSailingRequest(e, ModelManager_1.ModelManager.FishingModel.DockId, 2);
            });
            i.IsEscViewTriggerCallBack = false;
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
            return;
          }
        }
      }
      FishingController_1.FishingController.RequestFishingSailingRequest(e, ModelManager_1.ModelManager.FishingModel.DockId, ModelManager_1.ModelManager.FishingModel.LocalSailingTime);
    };
    this.mt_ = () => {
      this.yZl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UIExtendToggle], [6, UE.UIExtendToggle], [7, UE.UIButtonComponent], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIText], [13, UE.UIText], [14, UE.UIExtendToggle], [15, UE.UIButtonComponent], [16, UE.UITexture], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Awe], [7, this.mZl], [2, this.CZl], [4, this.pZl], [5, this.fZl], [6, this.vZl], [11, this.gZl], [15, this.L3e]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingShipSkinChangeSuccess, this.mt_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingShipSkinClick, this.mt_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingShipSkinChangeSuccess, this.mt_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingShipSkinClick, this.mt_);
  }
  async OnBeforeStartAsync() {
    var e = new CommonCurrencyItem_1.CommonCurrencyItem();
    await e.CreateThenShowByActorAsync(this.GetItem(17).GetOwner());
    e.RefreshTemp(ModelManager_1.ModelManager.FishingModel.FishingShipFixItem);
    e.SetButtonActive(false);
  }
  OnStart() {
    ModelManager_1.ModelManager.FishingModel.LocalSailingTime = 0;
    this.zji = this.GetExtendToggle(4);
    this.zji?.SetToggleStateForce(1, false, true);
    if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.SailingIsFix)) {
      this.GetExtendToggle(14).SetToggleState(1);
    }
  }
  OnBeforeShow() {
    this.h4i();
    this.yZl();
    this.Xlt();
  }
  h4i() {
    var e = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString;
    this.GetText(3).SetText(e);
    var e = ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust;
    if (e <= 0) {
      this.GetItem(19).SetUIActive(false);
    } else {
      e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(e).IsNight;
      this.GetItem(19).SetUIActive(e);
    }
  }
  yZl() {
    var e = ModelManager_1.ModelManager.FishingModel.GetShipData().GetCurrentSkinId();
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingShipSkinConfig(e);
    if (e) {
      this.SetTextureByPath(e.IconTexture, this.GetTexture(8));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e.DesText);
      for (const i of ModelManager_1.ModelManager.FishingModel.UnlockShipSkin) {
        if (!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.FishingShipSkinRecord, i)) {
          this.GetItem(18).SetUIActive(true);
          return;
        }
      }
      this.GetItem(18).SetUIActive(false);
    }
  }
  Xlt() {
    var e = ModelManager_1.ModelManager.FishingModel.GetShipData();
    var i = e.GetCurrentHp();
    var e = e.GetMaxHp();
    this.GetText(12).SetText(i + "/" + e);
    var r = ConfigManager_1.ConfigManager.ItemConfig?.GetConfig(ModelManager_1.ModelManager.FishingModel.FishingShipFixItem);
    this.SetTextureByPath(r.IconSmall, this.GetTexture(16));
    var r = ModelManager_1.ModelManager.FishingModel.FishingShipFixCost ?? 0;
    var e = (e - i) * r;
    this.GetText(13).SetText("" + e);
  }
}
exports.SailingView = SailingView;
//# sourceMappingURL=SailingView.js.map