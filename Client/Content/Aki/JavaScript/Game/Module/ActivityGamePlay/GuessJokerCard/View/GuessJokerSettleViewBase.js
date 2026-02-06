"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerSettleViewBase = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const UiCameraAnimationController_1 = require("../../../UiCameraAnimation/UiCameraAnimationController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GuessJokerDialogLogic_1 = require("../Data/GuessJokerDialogLogic");
const GuessJokerDefine_1 = require("../GuessJokerDefine");
const GuessJokerUtils_1 = require("../GuessJokerUtils");
class GuessJokerSettleViewBase extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CameraName = undefined;
    this.pOg = undefined;
    this.RWf = () => {
      var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelId();
      ControllerHolder_1.ControllerHolder.GuessJokerController.RequestJokerGuessRematch(e, () => {
        this.CloseMe();
      });
    };
    this.sOt = () => {
      var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelId();
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.ExitGame();
      let i = false;
      var r = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetGuessJokerGameData(e).FirstPass;
      if ((i = !ModelManager_1.ModelManager.GuessJokerGamePlayModel.IsFinish && r ? true : i) && e === GuessJokerDefine_1.GUESS_JOKER_JINXI_LEVEL_ID) {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel?.HideAllGuessJokerNpc();
        this.CloseMe();
      } else {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.ShowAllGuessJokerNpc();
        UiManager_1.UiManager.CloseAndOpenView(this.GetViewName(), "GuessJokerSelectRoleView", e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText]];
    this.BtnBindInfo = [[4, this.RWf], [5, this.sOt]];
  }
  OnStart() {
    let e = true;
    var i = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetLevelId();
    var i = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetGuessJokerGameData(i).FirstPass;
    if (!ModelManager_1.ModelManager.GuessJokerGamePlayModel.IsFinish && i) {
      e = false;
    }
    this.GetButton(4)?.RootUIComp.SetUIActive(e);
  }
  OnBeforeShow() {
    this.pOg ||= new GuessJokerDialogLogic_1.GuessJokerDialogLogic();
    this.pOg.InitData({
      GetDialogItem: e => this.GetItem(6),
      GetDialogText: e => this.GetText(8)
    });
    this.GetItem(6)?.SetUIActive(false);
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, "GuessJoker_WinText", this.GetWinnerName());
    this.SetTextureByPath(this.GetEmojiTexturePath(), this.GetTexture(2));
    this.GetText(3).ShowTextNew(this.GetDescText());
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetPlayerNameByType(1);
    this.GetText(7).SetText(e);
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.GuessJokerGamePlayModel?.SetActiveDialogLogic(this.pOg);
    ModelManager_1.ModelManager.GuessJokerGamePlayModel?.SetNpcPokerState(this.GetNpcPokerState());
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.GuessJokerGamePlayModel?.SetActiveDialogLogic(undefined);
    this.pOg?.Clear();
  }
  PushCameraHandle(e, i, r) {
    var a = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetRoleId();
    var a = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiConfigByRoleId(a);
    if (a !== undefined && (a = a.SettleCameraId, a = GuessJokerUtils_1.GuessJokerUtils.GetCameraNameByCameraId(a))) {
      this.CameraName = a;
      UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(a, i, r);
    }
  }
  PopCameraHandle(e, i, r, a) {
    if (this.CameraName) {
      UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(this.CameraName, i, r, a);
      this.CameraName = undefined;
    }
  }
}
exports.GuessJokerSettleViewBase = GuessJokerSettleViewBase;
//# sourceMappingURL=GuessJokerSettleViewBase.js.map