"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMainLevelView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const TrapDefenseLevelMapPanel_1 = require("./TrapDefenseLevelMapPanel");
const TrapDefenseLevelNamePanel_1 = require("./TrapDefenseLevelNamePanel");
const TrapDefenseLevelTargetPanel_1 = require("./TrapDefenseLevelTargetPanel");
const TrapDefenseMainLevelTabPanel_1 = require("./TrapDefenseMainLevelTabPanel");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
class TrapDefenseMainLevelView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ViewModel = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMainLevel;
    this.PopupCaption = undefined;
    this.PanelLevelTab = undefined;
    this.PanelNameInfo = undefined;
    this.PanelMapInfo = undefined;
    this.PanelTargetInfo = undefined;
    this.OnClickBtnKeyboardSet = () => {
      this.ViewModel.Model.OpenViewKeySetting();
    };
    this.OnClickBtnSave = () => {
      var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetHelpIdLevelSaveProgress();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    };
    this.OnBtnHelp = () => {
      var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetHelpIdMainLevel();
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    };
    this.OnBtnClose = () => {
      this.CloseMe();
    };
    this.OnSelectLevelItem = e => {
      this.UpdateSaveState();
      this.PanelNameInfo.UpdateData(e);
      this.PanelMapInfo.UpdateData(e);
      this.PanelTargetInfo.UpdateData(e);
      e = e.Config.LevelImage;
      this.SetTextureByPath(e, this.GetTexture(9));
      this.UiViewSequence?.StopSequenceByKey("Switch");
      this.UiViewSequence?.PlaySequencePurely("Switch");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UISprite], [8, UE.UIText], [9, UE.UITexture]];
    this.BtnBindInfo = [[1, this.OnClickBtnKeyboardSet], [6, this.OnClickBtnSave]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.PopupCaption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.PopupCaption.SetCloseCallBack(this.OnBtnClose);
    this.PopupCaption.SetHelpBtnActive(true);
    this.PopupCaption.SetHelpCallBack(this.OnBtnHelp);
    var e = this.GetItem(2);
    this.PanelLevelTab = new TrapDefenseMainLevelTabPanel_1.TrapDefenseMainLevelTabPanel();
    this.PanelLevelTab.IsInstance = this.ViewModel.IsInstance;
    await this.PanelLevelTab.Init(e);
    this.PanelLevelTab.OnSelectLevelCallback = this.OnSelectLevelItem;
    var e = this.GetItem(3);
    this.PanelNameInfo = new TrapDefenseLevelNamePanel_1.TrapDefenseLevelNamePanel();
    await this.PanelNameInfo.Init(e);
    var e = this.GetItem(4);
    this.PanelMapInfo = new TrapDefenseLevelMapPanel_1.TrapDefenseLevelMapPanel();
    this.PanelMapInfo.IsInstance = this.ViewModel.IsInstance;
    await this.PanelMapInfo.Init(e);
    var e = this.GetItem(5);
    this.PanelTargetInfo = new TrapDefenseLevelTargetPanel_1.TrapDefenseLevelTargetPanel();
    await this.PanelTargetInfo.Init(e);
  }
  OnStart() {
    this.InitData();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseMainLevelViewOpen, true);
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeShow() {
    this.UpdateData();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseMainLevelViewOpen, false);
  }
  OnBeforeHide() {
    this.ViewModel.Model.LevelModeData.SaveCacheReachOpenTimeLevels();
  }
  InitData() {
    if (this.ViewModel.JumpDifficulty) {
      this.PanelLevelTab.InitSelectDifficulty(this.ViewModel.JumpDifficulty);
    }
    if (this.ViewModel.JumpLevelData) {
      this.PanelLevelTab.InitSelectLevel(this.ViewModel.JumpLevelData);
    }
  }
  UpdateData() {
    this.PanelLevelTab.UpdateModeData();
    this.UpdateSaveState();
  }
  UpdateSaveState() {
    var e = this.PanelLevelTab.CurSelectLevel;
    var t = !!e?.Config.IsCanSave;
    this.GetButton(6)?.RootUIComp.SetUIActive(t);
    if (t) {
      t = e.IsLeaved ? "TrapDefenseLevelExistSaveTitle" : "TrapDefenseLevelCanSaveTitle";
      this.GetText(8)?.ShowTextNew(t);
    }
  }
}
exports.TrapDefenseMainLevelView = TrapDefenseMainLevelView;
//# sourceMappingURL=TrapDefenseMainLevelView.js.map