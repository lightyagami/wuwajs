"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuView = exports.MenuViewData = exports.MenuScrollItemData = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Pool_1 = require("../../../Core/Container/Pool");
const KeySettingById_1 = require("../../../Core/Define/ConfigQuery/KeySettingById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Platform_1 = require("../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsController_1 = require("../../GameSettings/GameSettingsController");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const MobileSwitchInputController_1 = require("../../Ui/Input/Moblie/MobileSwitchInputController");
const UiManager_1 = require("../../Ui/UiManager");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const LguiUtil_1 = require("../Util/LguiUtil");
const DynScrollView_1 = require("../Util/ScrollView/DynScrollView");
const PcAndGamepadKeySettingPanel_1 = require("./KeySettingsView/PcAndGamepadKeySettingPanel");
const MenuController_1 = require("./MenuController");
const MenuDefine_1 = require("./MenuDefine");
const MenuScrollSettingContainerDynItem_1 = require("./Views/MenuScrollSettingContainerDynItem");
const MenuScrollSettingContainerItem_1 = require("./Views/MenuScrollSettingContainerItem");
const CAPACITY = 20;
class MenuScrollItemData {
  constructor() {
    this.Type = 0;
    this.Data = undefined;
  }
}
exports.MenuScrollItemData = MenuScrollItemData;
class MenuViewData {
  constructor() {
    this.Awi = 200;
    this.Pwi = 100;
    this.xwi = 0;
    this.wwi = 0;
    this.MenuViewDataCurMainType = 0;
    this.MenuViewDataLastSubType = 0;
  }
  set MenuViewDataCurMainType(e) {
    this.xwi = e;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectMenuMainType);
  }
  get MenuViewDataCurMainType() {
    return this.xwi;
  }
  set MenuViewDataLastSubType(e) {
    this.wwi = e;
  }
  get MenuViewDataLastSubType() {
    return this.wwi;
  }
  get MenuViewDataMainInterval() {
    return this.Awi;
  }
  get MenuViewDataSubInterval() {
    return this.Pwi;
  }
}
exports.MenuViewData = MenuViewData;
class MenuView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Bwi = [];
    this.bwi = [];
    this.qwi = undefined;
    this.Gwi = new MenuViewData();
    this.Xpt = undefined;
    this.lHa = undefined;
    this.feh = undefined;
    this.Ivt = undefined;
    this.xqe = undefined;
    this.Nwi = undefined;
    this.Owi = undefined;
    this.a7 = () => new MenuScrollItemData();
    this.kwi = () => {
      this.Fwi();
    };
    this.Lja = e => {
      if (e) {
        this.GetUIDynScrollViewComponent(0).StopMovement();
      }
    };
    this.Vwi = (e = true) => {
      var t;
      var i;
      var n;
      if (Platform_1.Platform.IsMobilePlatform() || Platform_1.Platform.IsPcPlatform()) {
        if ((n = (i = (t = ModelManager_1.ModelManager.MenuModel).GetGameQualityLoadInfo()).Percentage) > 80 && e && (!t.IsOpenedImageOverloadConfirmBox || t.QualityInfoPercentage < 80)) {
          if (Platform_1.Platform.IsIOSPlatform()) {
            MenuController_1.MenuController.OpenImageQualityOverloadConfirmBox();
          } else {
            MenuController_1.MenuController.OpenImageOverloadConfirmBox();
          }
          t.IsOpenedImageOverloadConfirmBox = true;
        }
        t.QualityInfoPercentage = n;
        this.Hwi(i.Percentage, i.BarColor);
        this.jwi(i.Desc);
      }
    };
    this.uWa = () => {
      if (Info_1.Info.IsMobileInputModel() && Info_1.Info.IsInGamepad()) {
        MobileSwitchInputController_1.MobileSwitchInputController.SwitchToTouch();
      }
    };
    this.Rla = t => {
      if (t.length < 2) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 64, "引导配置MenuView时参数不足", ["ForTabType应有2个参数，但是实际只有", t.length]);
        }
      } else {
        var i;
        var n;
        var o = Number(t[1]);
        let e = 0;
        for ([i, n] of this.Bwi.entries()) {
          if (n === o) {
            e = i;
            break;
          }
        }
        var t = this.Ivt.GetTabItemByIndex(e);
        if (t) {
          this.Ivt.ScrollToToggleByIndex(e);
          return [t = t.GetRootItem(), t];
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 64, "引导配置MenuView时，未找到指定页签", ["targetIndex", e]);
        }
      }
    };
    this.xla = e => {
      if (e.length < 2) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 64, "引导配置MenuView时参数不足", ["ForKeySetting应有2个参数，但是实际只有", e.length]);
        }
      } else {
        var e = Number(e[1]);
        var t = KeySettingById_1.configKeySettingById.GetConfig(e);
        var i = this.Owi.GetGuideItemByKeySettingId(e, false);
        if (t) {
          if (i) {
            return [i, i];
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 64, "引导配置MenuView时找不到key setting", ["key setting id", e]);
        }
      }
    };
    this.EYa = undefined;
    this.IYa = e => {
      if (e.length < 2) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 64, "引导配置MenuView时参数不足", ["ForMenuConfig应有2个参数，但是实际只有", e.length]);
        }
      } else {
        const i = Number(e[1]);
        var t;
        var e = this.bwi.findIndex(e => e.Data?.FunctionId === i && e.Type === 1);
        if (!(e < 0)) {
          if (this.EYa === undefined) {
            this.EYa = true;
            this.xqe.ScrollToItemIndex(e, false).finally(() => {
              this.EYa = false;
            });
          }
          if (!this.EYa && (t = this.xqe.GetGrid(e))) {
            this.xqe.AddListenerOnItemClear(e, () => {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Guide", 64, "当item拖出view之后，停止引导@[MenuView]");
              }
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, MenuDefine_1.STOP_GUIDE_TAG);
            });
            return [t, t];
          } else {
            return undefined;
          }
        }
      }
    };
    this.Ula = new Map([["TabType", this.Rla], ["KeySetting", this.xla], ["MenuConfig", this.IYa]]);
    this.Wwi = (e, t, i) => {
      var n = new MenuScrollSettingContainerItem_1.MenuScrollSettingContainerItem();
      n.BindOnToggleStateChangedCallback(this._Ha);
      return n;
    };
    this._Ha = (e, t) => {
      var i;
      if (e.Type !== 0 && (i = e.GetMenuData())) {
        if (t === 0) {
          this.uHa();
        } else {
          this.peh();
          this.Xpt?.SetSelected(false);
          this.Xpt?.SetDetailVisible(false);
          e.SetDetailVisible(!i.GetIsDetailTextVisible());
          this.Xpt = e;
          this.lHa = i;
          t = e.MenuScrollItemData;
          if (i.HasDetailText() && t && this.bwi.indexOf(t) >= this.bwi.length - 1) {
            this.feh = TimerSystem_1.GameplayTimerSystem.Next(() => {
              this.xqe.ScrollToBottom(e.GetRootItem());
            });
          }
        }
      }
    };
    this.R6e = (e, t) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.Kwi = t => {
      var t = this.Bwi[t];
      this.Gwi.MenuViewDataCurMainType = t;
      var t = ConfigManager_1.ConfigManager.MenuBaseConfig.GetMainTypeConfigById(t);
      var i = this.GetItem(5);
      var n = this.GetItem(4);
      if (t) {
        let e = t.TabPanelType;
        if (Platform_1.Platform.IsPcPlatform()) {
          if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
            if (Info_1.Info.IsInGamepad()) {
              e = t.PsTabPanelType;
            } else if (Info_1.Info.IsMobileInputModel()) {
              e = t.TabPanelType;
            } else if (Info_1.Info.IsPcInputModel()) {
              e = t.PcTabPanelType;
            }
          } else {
            e = t.PcTabPanelType;
          }
        } else if (Platform_1.Platform.IsPs5Platform() || Platform_1.Platform.IsMobilePlatform() && Info_1.Info.IsInGamepad()) {
          e = t.PsTabPanelType;
        }
        switch (e) {
          case 1:
            this.Qwi();
            i.SetUIActive(true);
            n.SetUIActive(false);
            break;
          case 2:
            this.Xwi();
            i.SetUIActive(false);
            n.SetUIActive(true);
            break;
          default:
            i.SetUIActive(false);
            n.SetUIActive(false);
        }
        this.uHa();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, MenuDefine_1.STOP_GUIDE_TAG);
      } else {
        i.SetUIActive(false);
        n.SetUIActive(false);
      }
    };
    this.yqe = e => {
      e = this.Bwi[e];
      e = MenuController_1.MenuController.GetTargetMainInfo(e);
      return new CommonTabData_1.CommonTabData(e.MainIcon, new CommonTabTitleData_1.CommonTabTitleData(e.MainName));
    };
    this.$wi = () => {
      this.xqe.ScrollToItemIndex(0, true, true);
      this.xqe.UnBindLateUpdate();
    };
    this.$Ge = () => {
      MenuController_1.MenuController.BeforeViewClose();
      UiManager_1.UiManager.CloseView("MenuView");
    };
  }
  get MenuViewDataExternal() {
    return this.Gwi;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.uWa]];
  }
  OnStart() {
    this.Ivt.SelectToggleByIndex(0, true);
    this.GetButton(6)?.RootUIComp.SetUIActive(Info_1.Info.IsMobileInputModel() && Info_1.Info.IsInGamepad());
  }
  OnBeforeDestroy() {
    if (this.Ivt) {
      this.Ivt.Destroy();
      this.Ivt = undefined;
    }
    if (this.Nwi) {
      this.Nwi.Clear();
    }
    if (this.bwi) {
      this.bwi.length = 0;
    }
    if (this.xqe) {
      this.xqe.ClearChildren();
      this.xqe = undefined;
    }
    this.qwi &&= undefined;
    var e = ModelManager_1.ModelManager.MenuModel;
    if (e.IsEdited) {
      MenuController_1.MenuController.ReportSettingMenuLogEvent();
      e.IsEdited = false;
    }
    e.IsImageQualityCustom = undefined;
    this.peh();
    ModelManager_1.ModelManager.MenuModel.ClearMenuDataMap();
  }
  async OnBeforeStartAsync() {
    ModelManager_1.ModelManager.MenuModel.CreateConfigByBaseConfig();
    GameSettingsController_1.GameSettingsController.OnUEGameUserSettingsUpdate();
    this.qwi = new MenuScrollSettingContainerDynItem_1.MenuScrollSettingContainerDynItem();
    this.xqe = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(0), this.GetItem(2), this.qwi, this.Wwi);
    await this.xqe.Init();
    this.Nwi = new Pool_1.Pool(CAPACITY, this.a7);
    await this.Ywi();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDropDownListVisibleChanged, this.Lja);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.kwi);
    if (Platform_1.Platform.IsMobilePlatform() || Platform_1.Platform.IsPcPlatform()) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ConfigLoadChange, this.Vwi);
    }
    UE.GameUserSettings.GetGameUserSettings()?.OnGameUserSettingsUINeedsUpdate.Add(GameSettingsController_1.GameSettingsController.OnGameUserSettingsUINeedsUpdate);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDropDownListVisibleChanged, this.Lja);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.kwi);
    if (Platform_1.Platform.IsMobilePlatform() || Platform_1.Platform.IsPcPlatform()) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ConfigLoadChange, this.Vwi);
    }
    UE.GameUserSettings.GetGameUserSettings()?.OnGameUserSettingsUINeedsUpdate.Remove(GameSettingsController_1.GameSettingsController.OnGameUserSettingsUINeedsUpdate);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (!(e.length < 1)) {
      if (t = this.Ula.get(e[0])) {
        return t(e);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 64, "引导配置MenuView，Extra键值与代码不匹配", ["配置中的值", e[0]]);
        }
        return;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 64, "引导配置MenuView时，必须要有Extra参数");
    }
  }
  peh() {
    if (this.feh && TimerSystem_1.GameplayTimerSystem.Has(this.feh)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.feh);
    }
    this.feh = undefined;
  }
  uHa() {
    this.Xpt?.SetDetailVisible(false);
    this.Xpt?.SetSelected(false);
    this.lHa?.SetDetailTextVisible(false);
    this.Xpt = undefined;
    this.lHa = undefined;
  }
  async Ywi() {
    this.Bwi = MenuController_1.MenuController.GetMainTypeList();
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.Kwi, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(1), e, this.$Ge);
    await this.Ivt.RefreshTabItemByLengthAsync(this.Bwi.length);
  }
  Qwi() {
    this.Fwi();
  }
  Xwi() {
    let e = 0;
    if (Info_1.Info.IsInKeyBoard()) {
      e = 1;
    } else if (Info_1.Info.IsInGamepad()) {
      e = 2;
    }
    if (this.Owi) {
      this.Owi.Refresh(e);
    } else {
      this.Owi = new PcAndGamepadKeySettingPanel_1.PcAndGamepadKeySettingPanel();
      this.Owi.CreateThenShowByResourceIdAsync("UiItem_HandleSet", this.GetItem(4)).then(() => {
        this.Owi.Refresh(e);
      }, () => {});
    }
  }
  Fwi() {
    var e = MenuController_1.MenuController.GetTargetBaseConfigData(this.Gwi.MenuViewDataCurMainType);
    if (this.Gwi.MenuViewDataCurMainType === 2 && (Platform_1.Platform.IsMobilePlatform() || Platform_1.Platform.IsPcPlatform())) {
      this.GetItem(3)?.SetUIActive(true);
      this.Vwi();
    } else {
      this.GetItem(3)?.SetUIActive(false);
    }
    this.Gwi.MenuViewDataLastSubType = 0;
    this.Jwi();
    this.zwi(e);
  }
  jwi(e) {
    var t = this.GetItem(3)?.GetAttachUIChildren().Get(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e);
  }
  Hwi(e, t) {
    var i = this.GetItem(3);
    var n = i?.GetAttachUIChildren().Get(3);
    if (n) {
      var o = n.GetAttachUIChildren();
      var n = i?.GetAttachUIChildren().Get(4);
      if (n) {
        var r = n.Width;
        var s = [0, 0, 0, 0, 0];
        if (e >= 100) {
          for (let e = 0; e < o.Num(); e++) {
            s[e] = r;
          }
        } else if (e >= 80) {
          for (let e = 0; e < o.Num() - 1; e++) {
            s[e] = r;
          }
          s[4] = r * ((e - 80) * 5 / 100);
        } else if (e >= 60) {
          for (let e = 0; e < o.Num() - 2; e++) {
            s[e] = r;
          }
          s[3] = r * ((e - 60) * 5 / 100);
        } else if (e >= 40) {
          for (let e = 0; e < o.Num() - 3; e++) {
            s[e] = r;
          }
          s[2] = r * ((e - 40) * 5 / 100);
        } else if (e >= 20) {
          for (let e = 0; e < o.Num() - 4; e++) {
            s[e] = r;
          }
          s[1] = r * ((e - 20) * 5 / 100);
        } else {
          s[0] = r * (e * 5 / 100);
        }
        for (let e = 0; e < o.Num(); e++) {
          var a = o.Get(e);
          a.SetWidth(s[e]);
          this.SetSpriteByPath(t, a, false);
        }
      }
    }
  }
  Jwi() {
    for (const e of this.bwi) {
      this.Nwi.Put(e);
    }
    this.bwi = [];
  }
  Zwi(e, t) {
    let i = this.Nwi.Get();
    (i = i === undefined ? this.Nwi.Create() : i).Type = t;
    i.Data = e;
    this.bwi.push(i);
  }
  zwi(e) {
    for (const t of e) {
      if (t.SubType !== this.Gwi.MenuViewDataLastSubType) {
        this.Gwi.MenuViewDataLastSubType = t.SubType;
        this.Zwi(t, 0);
      }
      this.Zwi(t, 1);
    }
    this.xqe.RefreshByData(this.bwi, false, true);
    this.xqe.BindLateUpdate(this.$wi);
  }
}
exports.MenuView = MenuView;
//# sourceMappingURL=MenuView.js.map