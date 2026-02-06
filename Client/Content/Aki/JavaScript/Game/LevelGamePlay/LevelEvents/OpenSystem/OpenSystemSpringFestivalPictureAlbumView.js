"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemSpringFestivalPictureAlbumView = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemSpringFestivalPictureAlbumView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, i) {
    e = {
      OpenTab: (e?.BoardId ?? 0) === 0 ? 0 : 1
    };
    await UiManager_1.UiManager.OpenViewAsync("Spring26AlbumView", e);
    return true;
  }
  GetViewName(e) {
    return "Spring26AlbumView";
  }
}
exports.OpenSystemSpringFestivalPictureAlbumView = OpenSystemSpringFestivalPictureAlbumView;
//# sourceMappingURL=OpenSystemSpringFestivalPictureAlbumView.js.map