"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayReportMarkItemView = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class LevelPlayReportMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
    this.it_ = () => {
      this.MarkItemTopRightIconHandle.Update();
    };
  }
  RegisterEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LevelPlayStateDetailUpdate, this.it_);
  }
  UnRegisterEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelPlayStateDetailUpdate, this.it_);
  }
  OnViewRefresh() {
    this.UpdateIcon();
  }
  UpdateIcon() {
    this.OnIconPathChanged(this.Holder.IconPath);
    this.MarkItemTopRightIconHandle.Update();
  }
}
exports.LevelPlayReportMarkItemView = LevelPlayReportMarkItemView;
//# sourceMappingURL=LevelPlayReportMarkItemView.js.map