"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoPromptView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiLayerType_1 = require("../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
class VideoPromptView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.vdg = false;
    this.ydg = () => {
      var e = UiManager_1.UiManager.GetViewByName("VideoView");
      if (!this.vdg && e) {
        e = e.GetRootItem();
        this.GetOriginalItem().SetUIParent(e);
        this.vdg = true;
      }
    };
    this.Sdg = () => {
      if (this.vdg) {
        this.GetOriginalItem().SetUIParent(UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Float));
        this.vdg = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e.TextureId) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage(e.TextureId);
      await this.SetTextureAsync(e, this.GetTexture(0));
    }
  }
  OnStart() {
    this.ydg();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.VideoViewShow, this.ydg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.VideoViewHide, this.Sdg);
  }
  OnAfterShow() {
    var e = this.OpenParam;
    if (e.AutoCloseTime) {
      TimerSystem_1.TimerSystem.Delay(() => {
        this.CloseMe();
      }, e.AutoCloseTime * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
  }
  OnAfterHide() {
    this.Sdg();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.VideoViewShow, this.ydg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.VideoViewHide, this.Sdg);
  }
}
exports.VideoPromptView = VideoPromptView;
//# sourceMappingURL=VideoPromptView.js.map