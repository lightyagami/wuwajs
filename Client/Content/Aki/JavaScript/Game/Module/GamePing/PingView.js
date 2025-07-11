"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PingView = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
const GOODPING = 100;
const MIDDLEPING = 200;
const LOOPPING = 500;
const BADCOLOR = "FF1F1EFF";
const MIDDLECOLOR = "FFD12FFF";
const GOODCOLOR = "30D82DFF";
class PingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.NKt = "";
    this.OKt = false;
    this.kKt = -9999;
    this.FKt = 0;
    this.VKt = e => {
      var i;
      if (!(Math.abs(e - this.kKt) < this.FKt)) {
        if ((i = (this.kKt = e) > LOOPPING) !== this.OKt) {
          this.GetSprite(0).SetUIActive(!i);
          this.GetItem(1).SetUIActive(i);
          this.HKt(i);
          this.OKt = i;
        }
        i = this.jKt(e);
        if (this.NKt !== i[0]) {
          this.SetSpriteByPath(i[0], this.GetSprite(0), false);
          this.NKt = i[0];
          this.GetText(2).SetColor(UE.Color.FromHex(i[1]));
        }
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "PingStr", e.toString());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this.GetItem(1).SetUIActive(false);
    this.OKt = false;
    this.FKt = ConfigManager_1.ConfigManager.CommonConfig.GetPingUnChangeValue();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCheckGamePing, this.VKt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCheckGamePing, this.VKt);
  }
  OnAfterShow() {
    this.VKt(ModelManager_1.ModelManager.GamePingModel.CurrentPing);
  }
  HKt(e) {
    if (e) {
      this.UiViewSequence.PlaySequencePurely("Loop");
    } else {
      this.UiViewSequence.StopSequenceByKey("Loop");
    }
  }
  jKt(e) {
    if (e <= GOODPING) {
      return [this.WKt(), GOODCOLOR];
    } else if (e > GOODPING && e <= MIDDLEPING) {
      return [this.KKt(), MIDDLECOLOR];
    } else {
      return [this.QKt(), BADCOLOR];
    }
  }
  WKt() {
    if (!Info_1.Info.IsPcOrGamepadPlatform() && UE.KuroLauncherLibrary.GetNetworkConnectionType() === NetworkDefine_1.ENetworkType.WiFi) {
      return ConfigManager_1.ConfigManager.CommonConfig.GetNetGoodSpriteMobile();
    } else {
      return ConfigManager_1.ConfigManager.CommonConfig.GetNetGoodSprite();
    }
  }
  KKt() {
    if (!Info_1.Info.IsPcOrGamepadPlatform() && UE.KuroLauncherLibrary.GetNetworkConnectionType() === NetworkDefine_1.ENetworkType.WiFi) {
      return ConfigManager_1.ConfigManager.CommonConfig.GetNetMiddleSpriteMobile();
    } else {
      return ConfigManager_1.ConfigManager.CommonConfig.GetNetMiddleSprite();
    }
  }
  QKt() {
    if (!Info_1.Info.IsPcOrGamepadPlatform() && UE.KuroLauncherLibrary.GetNetworkConnectionType() === NetworkDefine_1.ENetworkType.WiFi) {
      return ConfigManager_1.ConfigManager.CommonConfig.GetNetBadSpriteMobile();
    } else {
      return ConfigManager_1.ConfigManager.CommonConfig.GetNetBadSprite();
    }
  }
}
exports.PingView = PingView;
//# sourceMappingURL=PingView.js.map