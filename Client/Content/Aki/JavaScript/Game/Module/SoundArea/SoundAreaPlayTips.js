"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundAreaPlayTips = undefined;
const UE = require("ue");
const SoundAreaPlayInfoById_1 = require("../../../Core/Define/ConfigQuery/SoundAreaPlayInfoById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class SoundAreaPlayTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.tEt = 0;
    this.TIo = e => {
      this.SetBuffInfo(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SilentTipsRefresh, this.TIo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SilentTipsRefresh, this.TIo);
  }
  OnStart() {
    this.SetBuffInfo(this.OpenParam);
  }
  SetBuffInfo(e) {
    e = SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e);
    if (e?.ShowTitle) {
      this.GetItem(3).SetUIActive(true);
      this.GetItem(4).SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.BuffTitle);
    } else {
      this.GetItem(3).SetUIActive(false);
      this.GetItem(4).SetUIActive(true);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.BuffDescription);
    if (e?.Time) {
      this.tEt = TimeUtil_1.TimeUtil.GetServerTimeStamp() + e.Time * TimeUtil_1.TimeUtil.InverseMillisecond;
    }
    if (e?.MaxCount) {
      ModelManager_1.ModelManager.SoundAreaPlayTipsModel.AddShowInfoIdCount(e.Id);
    }
  }
  OnTick(e) {
    if (this.tEt > 0 && TimeUtil_1.TimeUtil.GetServerTimeStamp() > this.tEt) {
      this.CloseMe();
      this.tEt = 0;
    }
  }
  OnAfterPlayStartSequence() {
    if (!this.tEt) {
      this.CloseMe();
    }
  }
}
exports.SoundAreaPlayTips = SoundAreaPlayTips;
//# sourceMappingURL=SoundAreaPlayTips.js.map