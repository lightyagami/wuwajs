"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonKeySettingPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputKeyUtils_1 = require("../../../InputSettings/InputKeyUtils");
const InputSettingsController_1 = require("../../../InputSettings/InputSettingsController");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxController_1 = require("../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const PsGamepadItem_1 = require("../../Menu/KeySettingsView/PsGamepadItem");
const XboxGamepadItem_1 = require("../../Menu/KeySettingsView/XboxGamepadItem");
const MenuDefine_1 = require("../../Menu/MenuDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const KeySettingDefine_1 = require("../KeySettingDefine");
const KeySettingPanelBase_1 = require("../KeySettingPanelBase");
const KeySettingViewModel_1 = require("../KeySettingViewModel");
const CommonKeySettingRowsPanel_1 = require("./CommonKeySettingRowsPanel");
class CommonKeySettingPanel extends KeySettingPanelBase_1.KeySettingPanelBase {
  constructor() {
    super(...arguments);
    this.vIa = undefined;
    this.vxi = undefined;
    this.pxi = undefined;
    this.Mxi = undefined;
    this.rzu = undefined;
    this.ozu = undefined;
    this.m2n = undefined;
    this.Exi = () => {
      if (KeySettingViewModel_1.KeySettingViewModel.InputControllerType === 1) {
        KeySettingViewModel_1.KeySettingViewModel.InputControllerType = 2;
      } else if (KeySettingViewModel_1.KeySettingViewModel.InputControllerType === 2) {
        KeySettingViewModel_1.KeySettingViewModel.InputControllerType = 1;
      }
      this.bl();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, MenuDefine_1.STOP_GUIDE_TAG);
    };
    this.yxi = () => {
      if (KeySettingViewModel_1.KeySettingViewModel.InputControllerType === 1) {
        KeySettingViewModel_1.KeySettingViewModel.InputControllerType = 2;
      } else if (KeySettingViewModel_1.KeySettingViewModel.InputControllerType === 2) {
        KeySettingViewModel_1.KeySettingViewModel.InputControllerType = 1;
      }
      this.bl();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, MenuDefine_1.STOP_GUIDE_TAG);
    };
    this.Ixi = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(179);
      e.FunctionMap.set(2, () => {
        KeySettingViewModel_1.KeySettingViewModel.ResetSettings();
        InputSettingsController_1.InputSettingsController.InputSettingUpdateRequest(false);
        this.bl();
      });
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.Prh = () => {
      UiManager_1.UiManager.OpenView("OperationPreferencesView");
    };
    this.TZa = () => {
      if (KeySettingViewModel_1.KeySettingViewModel.CurrentDeviceType === 1) {
        if (KeySettingViewModel_1.KeySettingViewModel.IsEditing) {
          KeySettingViewModel_1.KeySettingViewModel.ExternalFinishEditKey();
        }
        this.bl();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent], [16, UE.UIButtonComponent], [17, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Exi], [1, this.yxi], [9, this.Ixi], [14, this.Ixi], [15, this.Prh], [16, this.Prh]];
  }
  async OnBeforeStartAsync() {
    this.vxi = new PsGamepadItem_1.PsGamepadItem();
    this.pxi = new XboxGamepadItem_1.XboxGamepadItem();
    this.rzu = new CommonKeySettingRowsPanel_1.CommonKeySettingRowsPanel();
    this.ozu = new CommonKeySettingRowsPanel_1.CommonKeySettingRowsPanel();
    var e = [];
    e.push(this.vxi.CreateByResourceIdAsync("UiItem_HandleSetPs", this.GetItem(10)));
    e.push(this.pxi.CreateByResourceIdAsync("UiItem_HandleSetXBox", this.GetItem(10)));
    e.push(this.rzu.CreateByActorAsync(this.GetItem(6).GetOwner()));
    e.push(this.ozu.CreateByActorAsync(this.GetItem(5).GetOwner()));
    this.m2n = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(7));
    await Promise.all(e);
  }
  OnStart() {
    this.bl();
    this.Fxi();
    this.Rka();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnDeviceLangChange, this.TZa);
    this.GetItem(17)?.SetUIActive(false);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnDeviceLangChange, this.TZa);
  }
  OnWaitKeySetting() {}
  OnBeforeBeginEditKey() {
    this.rzu?.StopScroll();
    this.ozu?.StopScroll();
  }
  OnBeginEditKey() {
    this.vIa?.SetAllKeyDisable();
    this.Fxi("EditKey_Text");
  }
  OnFinishEditKey() {
    this.Fxi();
  }
  OnKeyChange(e, t) {}
  OnKeySelected(e) {}
  OnKeyHover(e) {
    if (KeySettingViewModel_1.KeySettingViewModel.InputControllerType !== 1 && (this.Mxi = e) && (e = e.GetDisplayKeyName(KeySettingViewModel_1.KeySettingViewModel.InputControllerType))) {
      this.vIa?.SetKeysEnable(e);
    } else {
      this.vIa?.SetAllKeyDisable();
    }
  }
  OnKeyUnHover(e) {
    if (KeySettingViewModel_1.KeySettingViewModel.InputControllerType === 1 || !this.Mxi || this.Mxi.ConfigId === e?.ConfigId) {
      this.vIa?.SetAllKeyDisable();
    }
  }
  bl() {
    this.jxi();
    this.Wxi();
    this.Kxi();
  }
  jxi() {
    var e = KeySettingDefine_1.keySettingDeviceInfoRecord[KeySettingViewModel_1.KeySettingViewModel.CurrentDeviceType];
    if (e) {
      e = e.NameTextId;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
      if (KeySettingViewModel_1.KeySettingViewModel.CurrentDeviceType === 1) {
        this.GetButton(0)?.SetSelfInteractive(false);
        this.GetButton(1)?.SetSelfInteractive(true);
      } else {
        this.GetButton(0)?.SetSelfInteractive(true);
        this.GetButton(1)?.SetSelfInteractive(false);
      }
    }
  }
  Wxi() {
    switch (KeySettingViewModel_1.KeySettingViewModel.InputControllerType) {
      case 1:
        this.Pn1();
        break;
      case 2:
        this.xn1();
    }
  }
  Kxi() {
    var e;
    (KeySettingViewModel_1.KeySettingViewModel.InputControllerType === 2 ? (e = InputKeyUtils_1.InputKeyUtils.GetLastGamepadEnum(), Info_1.Info.CheckIsPsGamepad(e) ? (this.vIa = this.vxi, this.vxi?.SetActive(true), this.pxi) : (this.vIa = this.pxi, this.pxi?.SetActive(true), this.vxi)) : (this.vIa = undefined, this.vxi?.SetActive(false), this.pxi))?.SetActive(false);
  }
  Pn1() {
    this.rzu?.Refresh(KeySettingViewModel_1.KeySettingViewModel.GetKeySettingDataList(), KeySettingViewModel_1.KeySettingViewModel.InputControllerType);
    this.rzu?.SetActive(true);
    this.ozu?.SetActive(false);
    this.GetItem(4)?.SetUIActive(true);
    this.GetItem(3)?.SetUIActive(false);
    this.GetButton(9)?.RootUIComp.SetUIActive(true);
    this.GetButton(15)?.RootUIComp.SetUIActive(false);
    this.GetButton(16)?.RootUIComp.SetUIActive(false);
    this.GetItem(13)?.SetUIActive(false);
  }
  xn1() {
    this.ozu?.Refresh(KeySettingViewModel_1.KeySettingViewModel.GetKeySettingDataList(), KeySettingViewModel_1.KeySettingViewModel.InputControllerType);
    this.ozu?.SetActive(true);
    this.rzu?.SetActive(false);
    var e = Platform_1.Platform.IsPs5Platform();
    var t = InputKeyUtils_1.InputKeyUtils.GetLastGamepadEnum();
    var t = Info_1.Info.CheckIsBackBoneGamepad(t);
    var e = e || t;
    this.GetItem(4)?.SetUIActive(false);
    this.GetItem(3)?.SetUIActive(true);
    this.GetButton(9)?.RootUIComp.SetUIActive(!e);
    this.GetButton(15)?.RootUIComp.SetUIActive(false);
    this.GetButton(16)?.RootUIComp.SetUIActive(false);
    this.GetItem(13)?.SetUIActive(e);
  }
  Fxi(e) {
    if (StringUtils_1.StringUtils.IsEmpty(e)) {
      this.GetItem(7)?.SetUIActive(false);
      this.GetItem(11)?.SetUIActive(true);
      this.m2n.StopCurrentSequence();
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e);
      this.GetItem(7)?.SetUIActive(true);
      this.GetItem(11)?.SetUIActive(false);
      this.m2n.PlayLevelSequenceByName("Start");
    }
  }
  Rka() {
    var e = Platform_1.Platform.IsPs5Platform();
    var t = Info_1.Info.IsMobileInputModel() && Info_1.Info.IsInGamepad();
    this.GetButton(0)?.RootUIComp.SetUIActive(!e && !t);
    this.GetButton(1)?.RootUIComp.SetUIActive(!e && !t);
    var t = InputKeyUtils_1.InputKeyUtils.GetLastGamepadEnum();
    var t = Info_1.Info.IsInGamepad() && Info_1.Info.CheckIsBackBoneGamepad(t);
    var e = e || t;
    this.GetItem(12)?.SetUIActive(!e);
  }
}
exports.CommonKeySettingPanel = CommonKeySettingPanel;
//# sourceMappingURL=CommonKeySettingPanel.js.map