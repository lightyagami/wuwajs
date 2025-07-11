"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundAreaPlayTipsController = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class SoundAreaPlayTipsController extends UiControllerBase_1.UiControllerBase {
  static async OpenSoundAreaPlayTips(e) {
    return !!ModelManager_1.ModelManager.SoundAreaPlayTipsModel.CheckInfoIdCanShow(e) && (UiManager_1.UiManager.IsViewShow("SoundAreaPlayTips") ? (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SilentTipsRefresh, e), true) : (await UiManager_1.UiManager.OpenViewAsync("SoundAreaPlayTips", e)) !== undefined);
  }
}
exports.SoundAreaPlayTipsController = SoundAreaPlayTipsController;
//# sourceMappingURL=SoundAreaPlayTipsController.js.map