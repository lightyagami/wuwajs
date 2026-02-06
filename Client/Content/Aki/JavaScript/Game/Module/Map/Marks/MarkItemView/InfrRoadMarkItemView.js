"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrRoadMarkItemView = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
class InfrRoadMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
    this.Prg = () => {
      this.Holder.UpdateGamePlayState();
      this.MarkItemTopRightIconHandle.Update();
      this.MarkItemTopRightIconHandle.ApplyModified();
    };
  }
  RegisterEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureRoadDataUpdate, this.Prg);
  }
  UnRegisterEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureRoadDataUpdate, this.Prg);
  }
}
exports.InfrRoadMarkItemView = InfrRoadMarkItemView;
//# sourceMappingURL=InfrRoadMarkItemView.js.map