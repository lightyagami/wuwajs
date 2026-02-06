"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorAlbumPropView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const DEFAULT_AUTO_CLOSE_TIME = 4000;
class SpringManorAlbumPropView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.C5t = undefined;
    this.vOm = () => {
      this.C5t = undefined;
      this.CloseMe();
    };
    this.nqe = () => {
      var e = this.OpenParam;
      var e = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureById(e.BrochureId);
      if (e) {
        e = {
          OpenTab: e.Type
        };
        UiManager_1.UiManager.OpenView("Spring26AlbumView", e);
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  OnBeforeDestroy() {
    this.Ayg();
  }
  OnBeforeShow() {
    this.Og();
    this.C5t = TimerSystem_1.TimerSystem.Delay(this.vOm, DEFAULT_AUTO_CLOSE_TIME);
  }
  Og() {
    var e;
    var i = this.OpenParam;
    var r = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBrochureById(i.BrochureId);
    if (r) {
      if ((r = r.Type) === 0) {
        this.GetText(2)?.ShowTextNew("PrefabTextItem_1493464652_Text");
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_AlbumPropIcon01");
        this.SetTextureByPath(e, this.GetTexture(1));
      } else if (r === 1) {
        this.GetText(2)?.ShowTextNew("PrefabTextItem_3103733560_Text");
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_AlbumPropIcon00");
        this.SetTextureByPath(e, this.GetTexture(1));
      }
    }
    var r = ConfigManager_1.ConfigManager.SpringManorConfig?.GetSpringManorBookItemById(i.ConfigId);
    if (r) {
      this.GetText(3)?.ShowTextNew(r?.DescriptionTitle);
    }
  }
  Ayg() {
    if (this.C5t?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.C5t);
      this.C5t = undefined;
    }
  }
}
exports.SpringManorAlbumPropView = SpringManorAlbumPropView;
//# sourceMappingURL=SpringManorAlbumPropView.js.map