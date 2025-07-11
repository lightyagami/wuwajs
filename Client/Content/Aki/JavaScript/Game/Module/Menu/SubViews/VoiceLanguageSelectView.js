"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoiceLanguageSelectToggle = exports.VoiceLanguageSelectView = undefined;
const LanguageUpdateManager_1 = require("../../../../Launcher/Update/LanguageUpdateManager");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class VoiceLanguageSelectView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
  constructor() {
    super(...arguments);
    this.bBi = () => {
      this.CloseMe();
    };
    this.GBi = () => {
      if (this.SelectedToggle === undefined) {
        this.bBi();
      } else {
        switch (this.SelectedToggle.Updater.Status) {
          case 2:
            this.IsConfirm = true;
            this.bBi();
            break;
          case 0:
          case 1:
            LanguageSettingViewBase_1.LanguageSettingViewBase.BackToPrevLangSettingViewName = "VoiceLanguageSelectView";
            UiManager_1.UiManager.OpenView("VoiceLanguageDownloadView", [ModelManager_1.ModelManager.MenuModel.GetMenuDataByFunctionId(GameSettingsDefine_1.EFunction.VOICEPACKMANAGER), undefined]);
            this.bBi();
        }
      }
    };
  }
  InitScrollViewData() {
    var e = LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguageTypeForAudio();
    this.ScrollView.RefreshByData(e.sort((e, a) => e - a));
    this.CancelButton.SetFunction(this.bBi);
    this.ConfirmButton.SetFunction(this.GBi);
    this.ConfirmButton.SetLocalText("PowerConfirm");
  }
  CreateToggle(e, a, t) {
    var i = new VoiceLanguageSelectToggle();
    i.Initialize(e, a, t);
    return i;
  }
  OnRefreshView(e) {
    super.OnRefreshView(e);
    var a = this.MenuDataIns.OptionsNameList[e.GetIndex()];
    e.SetMainText(a);
  }
  OnSelected(e, a) {
    if (e.Updater.Status === 2) {
      this.ConfirmButton.SetLocalText("PowerConfirm");
    } else {
      this.ConfirmButton.SetLocalText("GoToDownload");
    }
  }
}
exports.VoiceLanguageSelectView = VoiceLanguageSelectView;
class VoiceLanguageSelectToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
  constructor() {
    super(...arguments);
    this.Updater = undefined;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
  }
  OnStart() {
    super.OnStart();
    var e = GameSettingsManager_1.GameSettingsManager.GetAudioCodeById(this.Index);
    this.Updater = LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(e);
    this.Updater.CalculateDownloadStatus("VoiceLanguageSelectToggle OnStart before set ui");
    var e = this.GetText(2);
    e.SetUIActive(true);
    if (this.PreToggled) {
      LguiUtil_1.LguiUtil.SetLocalText(e, "InUse");
    } else if (this.Updater.Status !== 2) {
      LguiUtil_1.LguiUtil.SetLocalText(e, "NotDownloaded");
    } else {
      e.SetText("");
    }
    this.Updater.CalculateDownloadStatus("VoiceLanguageSelectToggle OnStart after set ui");
  }
}
exports.VoiceLanguageSelectToggle = VoiceLanguageSelectToggle;
//# sourceMappingURL=VoiceLanguageSelectView.js.map