"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHotKeyHandleQuestView = undefined;
const HonamiStoryUtil_1 = require("../../../Module/HonamiStory/HonamiStoryUtil");
const UiManager_1 = require("../../UiManager");
const ViewHotKeyHandle_1 = require("../ViewHotKeyHandle");
class ViewHotKeyHandleQuestView extends ViewHotKeyHandle_1.ViewHotKeyHandle {
  get ViewName() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckHonamiQuestOpen()) {
      return "HonamiStoryQuestView";
    } else {
      return this.DefaultViewName;
    }
  }
  OnOpenViewImplement() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckHonamiQuestOpen()) {
      UiManager_1.UiManager.OpenView("HonamiStoryQuestView");
    } else {
      super.OnOpenViewImplement();
    }
  }
}
exports.ViewHotKeyHandleQuestView = ViewHotKeyHandleQuestView;
//# sourceMappingURL=ViewHotKeyHandleQuestView.js.map