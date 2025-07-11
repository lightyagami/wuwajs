"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MView = undefined;
const UE = require("ue");
const BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const CHECK_INTERVAL = 1000;
class MView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.OQl = false;
    this.FQl = "";
    this.NQl = 0;
    this.Xy = 0;
    this.pbc = () => {
      this.VQl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MReady, this.pbc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MReady, this.pbc);
  }
  OnStart() {
    if (BaseConfigController_1.BaseConfigController.GetRptIsOpen()) {
      this.FQl = ModelManager_1.ModelManager.LoginModel.GetWaterMarkPath();
      this.VQl();
    } else {
      this.OQl = true;
    }
  }
  OnTick(e) {
    if (!this.OQl) {
      if (this.NQl > CHECK_INTERVAL) {
        this.NQl = 0;
        this.VQl();
      } else {
        this.NQl += e;
      }
    }
  }
  VQl() {
    var e;
    var t;
    if (UE.KuroStaticLibrary.FileExists(this.FQl) && (this.OQl = true, e = this.GetTexture(0), t = UE.LGUIBPLibrary.CreateTexture2DFromPath(this.FQl, "Mask" + this.Xy, 0), this.Xy++, t)) {
      e?.SetTexture(t);
      e?.SetUIActive(true);
    }
  }
}
exports.MView = MView;
//# sourceMappingURL=MView.js.map