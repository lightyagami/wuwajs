"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemVideoPromptView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemVideoPromptView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    e = {
      TextureId: e.PictureCaptionConfig.PictureCaption,
      AutoCloseTime: e.PictureCaptionConfig.Duration
    };
    await UiManager_1.UiManager.OpenViewAsync("VideoPromptView", e);
    return true;
  }
  GetViewName(e) {
    return "VideoPromptView";
  }
}
exports.OpenSystemVideoPromptView = OpenSystemVideoPromptView;
//# sourceMappingURL=OpenSystemVideoPromptView.js.map