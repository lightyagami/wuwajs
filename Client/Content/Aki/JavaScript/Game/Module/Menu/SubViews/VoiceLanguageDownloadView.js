"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoiceLanguageToggle = exports.VoiceLanguageDownloadView = undefined;
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const NetworkDefine_1 = require("../../../../Launcher/NetworkDefine");
const ResourceUpdateView_1 = require("../../../../Launcher/Ui/HotFix/ResourceUpdateView");
const AppUtil_1 = require("../../../../Launcher/Update/AppUtil");
const LanguageUpdateManager_1 = require("../../../../Launcher/Update/LanguageUpdateManager");
const LauncherTextLib_1 = require("../../../../Launcher/Util/LauncherTextLib");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../../../GlobalData");
const CloudGameManager_1 = require("../../../Manager/CloudGameManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class VoiceLanguageDownloadView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
  constructor() {
    super(...arguments);
    this.wBi = false;
    this.BBi = () => {
      this.RefreshUiBySelect(this.SelectedToggle);
    };
    this.bBi = () => {
      const t = LanguageSettingViewBase_1.LanguageSettingViewBase.BackToPrevLangSettingViewName;
      if (t !== undefined) {
        this.CloseMe(e => {
          if (e) {
            UiManager_1.UiManager.OpenView(t, [ModelManager_1.ModelManager.MenuModel.GetMenuDataByFunctionId(GameSettingsDefine_1.EFunction.VOICELANGUAGE), undefined]);
            LanguageSettingViewBase_1.LanguageSettingViewBase.BackToPrevLangSettingViewName = undefined;
          }
        });
      } else {
        this.CloseMe();
      }
    };
    this.qBi = () => {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InUseCanNotDelete");
    };
    this.GBi = () => {
      let e = undefined;
      if (this.SelectedToggle !== undefined) {
        switch (this.SelectedToggle.Updater.Status) {
          case 2:
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(72)).SetTextArgs(this.SelectedToggle.GetMainText());
            e.FunctionMap.set(2, () => {
              this.SelectedToggle.Updater.Delete(GlobalData_1.GlobalData.World);
              this.RefreshUiBySelect(this.SelectedToggle);
            });
            break;
          case 0:
          case 1:
            var t;
            if (this.SelectedToggle.Updater.IsDownloading) {
              this.SelectedToggle.Updater.Pause();
              this.RefreshUiBySelect(this.SelectedToggle);
            } else {
              e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(AppUtil_1.AppUtil.GetNetworkConnectionType() === NetworkDefine_1.ENetworkType.Cell ? 70 : 71);
              t = this.SelectedToggle.Updater.TotalDiskSize - this.SelectedToggle.Updater.LocalDiskSize;
              t = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(t);
              e.SetTextArgs(this.SelectedToggle.GetMainText(), t);
              e.FunctionMap.set(2, () => {
                this.SelectedToggle.Updater.Update(this.SelectedToggle, GlobalData_1.GlobalData.World).then(() => {
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("HotPatch", 30, `Language ${this.SelectedToggle.Updater.LanguageCode} download success`);
                  }
                  this.RefreshUiBySelect(this.SelectedToggle);
                }, () => {
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("HotPatch", 30, `Language ${this.SelectedToggle.Updater.LanguageCode} download fail`);
                  }
                  this.RefreshUiBySelect(this.SelectedToggle);
                });
                this.RefreshUiBySelect(this.SelectedToggle);
              });
            }
        }
        if (e) {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        }
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
  }
  OnStart() {
    super.OnStart();
    this.CancelButton.SetFunction(this.bBi);
    this.ConfirmButton.SetFunction(this.GBi);
    if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
      this.ConfirmButton.SetUiActive(false);
    }
    this.ChildPopView?.PopItem?.OverrideBackBtnCallBack(this.bBi);
  }
  OnBeforeDestroy() {
    this.wBi = true;
  }
  CreateToggle(e, t, i) {
    var a = new VoiceLanguageToggle();
    a.Initialize(e, t, i);
    return a;
  }
  OnRefreshView(e) {
    super.OnRefreshView(e);
    var t = this.MenuDataIns.OptionsNameList[e.GetIndex()];
    e.SetMainText(t);
    e.SetDownloadStatusCallback(this.BBi);
  }
  InitScrollViewData() {
    var e = LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguageTypeForAudio();
    this.ScrollView.RefreshByData(e.sort((e, t) => e - t));
  }
  OnAfterShow() {
    if (this.SelectedToggle) {
      this.NBi(this.SelectedToggle);
    }
  }
  NBi(e) {
    e = e.GetUpdater();
    if (e !== undefined) {
      if (e.IsDownloading) {
        this.ConfirmButton.SetLocalText("PauseDownload");
      } else if (e.Status !== 2) {
        this.ConfirmButton.SetLocalText("DownloadLanguage");
      }
      if (e.Status === 2) {
        this.ConfirmButton.SetLocalText("DeleteLanguage");
      }
      if (e.Status === 2 && e.LanguageCode === LanguageSystem_1.LanguageSystem.PackageAudio) {
        this.ConfirmButton.SetFunction(this.qBi);
      } else {
        this.ConfirmButton.SetFunction(this.GBi);
      }
    }
  }
  OnSelected(e, t) {
    this.RefreshUiBySelect(e);
  }
  RefreshUiBySelect(e) {
    if (!this.wBi) {
      this.NBi(e);
      e.RefreshUi();
    }
  }
}
exports.VoiceLanguageDownloadView = VoiceLanguageDownloadView;
class LanguageDownloadTips extends ResourceUpdateView_1.ResourceUpdateViewBase {
  constructor(e, t) {
    super();
    this.OBi = undefined;
    this.kBi = "";
    this.OBi = e;
    this.kBi = t;
  }
  UpdatePatchProgress(e, t, i, a) {
    if (this.OBi) {
      if (t === i && (this.OBi.CalculateDownloadStatus("LanguageDownloadTips UpdatePatchProgress"), this.OBi.Status === 2)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("LanguageDownloadFinished", this.kBi);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HotPatch", 64, "UpdatePatchProgress时，找不到对应的LanguageUpdater");
    }
  }
}
class VoiceLanguageToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
  constructor() {
    super(...arguments);
    this.IRn = undefined;
    this.Updater = undefined;
    this.FBi = undefined;
  }
  async ShowNotEnoughSpaceConfirmation(a) {
    return new Promise(e => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(81);
      var i = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(a);
      t.SetTextArgs(i);
      t.FunctionMap.set(2, () => {
        e(true);
      });
      t.FunctionMap.set(1, () => {
        e(false);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    });
  }
  UpdatePatchProgress(e, t, i, a) {
    if (this.Updater) {
      this.VBi(t, i, a);
      if (t === i) {
        this.Updater.CalculateDownloadStatus("VoiceLanguageToggle UpdatePatchProgress");
        this.FBi?.();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HotPatch", 64, "UpdatePatchProgress时，找不到对应的LanguageUpdater", ["languageCode", this.IRn]);
    }
  }
  SetDownloadStatusCallback(e) {
    this.FBi = e;
  }
  RefreshUi() {
    var i;
    var a;
    var s = this.GetText(2);
    if (this.Updater) {
      s.SetUIActive(true);
      if (this.Updater.IsDownloading) {
        s.SetText(StringUtils_1.EMPTY_STRING);
      } else {
        let e = StringUtils_1.EMPTY_STRING;
        let t = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(this.Updater.TotalDiskSize);
        if (this.Updater.LanguageCode === LanguageSystem_1.LanguageSystem.PackageAudio) {
          e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("InUse");
        } else if (this.Updater.Status === 1) {
          e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Pausing");
          i = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(this.Updater.LocalDiskSize);
          a = t;
          this.ProgressBuilder.Clear();
          this.ProgressBuilder.Append(i, StringUtils_1.SLASH_STRING, a);
          t = this.ProgressBuilder.ToString();
        } else if (this.Updater.Status === 0) {
          e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("NotDownloaded");
          t = StringUtils_1.EMPTY_STRING;
        }
        this.ProgressBuilder.Clear();
        this.ProgressBuilder.Append(e, StringUtils_1.TAB_STRING, t);
        s.SetText(this.ProgressBuilder.ToString());
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HotPatch", 64, "RefreshUi时，找不到对应的LanguageUpdater", ["languageCode", this.IRn]);
      }
      s.SetUIActive(false);
    }
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
  }
  OnStart() {
    super.OnStart();
    this.IRn = GameSettingsManager_1.GameSettingsManager.GetAudioCodeById(this.Index);
    if (this.IRn) {
      this.Updater = LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(this.IRn);
      if (this.Updater) {
        this.Updater.UpdateView.SetImplement(this);
        this.Updater.CalculateDownloadStatus("VoiceLanguageToggle OnStart");
        this.RefreshUi();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HotPatch", 64, "创建VoiceLanguageToggle时，找不到对应的LanguageUpdater", ["languageCode", this.IRn]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HotPatch", 64, "创建VoiceLanguageToggle时，找不到对应的语言配置", ["Index", this.Index]);
    }
  }
  GetUpdater() {
    var e = GameSettingsManager_1.GameSettingsManager.GetAudioCodeById(this.Index);
    return LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(e);
  }
  VBi(e, t, i) {
    e = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(e);
    t = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(t);
    this.ProgressBuilder.Clear();
    this.ProgressBuilder.Append(e, StringUtils_1.SLASH_STRING, t);
    this.GetText(2).SetText(this.ProgressBuilder.ToString());
  }
  OnBeforeDestroy() {
    if (this.Updater) {
      this.Updater.UpdateView.SetImplement(undefined);
      this.Updater.UpdateView.SetImplement(new LanguageDownloadTips(this.Updater, this.GetMainText()));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HotPatch", 64, "销毁VoiceLanguageToggle时，找不到对应的LanguageUpdater", ["languageCode", this.IRn]);
    }
  }
}
exports.VoiceLanguageToggle = VoiceLanguageToggle;
//# sourceMappingURL=VoiceLanguageDownloadView.js.map