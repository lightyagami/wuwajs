"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleAreaBuffActiveTips = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
class MoraleAreaBuffActiveTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.OpenParam = void 0, this.TipCountDown = 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UISprite],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem]
    ]
  }
  Es_() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, this.constructor.name, ["DataParam", this.OpenParam])
  }
  OnStart() {
    this.Es_(), this.GetItem(3)?.SetUIActive(!0), this.GetItem(5)?.SetUIActive(!1), this.GetItem(4)?.SetUIActive(!1)
  }
  OnBeforeShow() {
    this.UpdateData()
  }
  UpdateData() {
    this.TipCountDown = ConfigManager_1.ConfigManager.MoraleConfig.GetMoraleBuffShowTime(), this.GetText(1).ShowTextNew(this.OpenParam?.TitleKey ?? "not title key"), this.GetText(2).ShowTextNew(this.OpenParam?.DescKey ?? "not desc key")
  }
  OnTick(e) {
    this.TipCountDown <= 0 || (this.TipCountDown -= e, this.TipCountDown <= 0 && this.CloseMe())
  }
}
exports.MoraleAreaBuffActiveTips = MoraleAreaBuffActiveTips;
//# sourceMappingURL=MoraleAreaBuffActiveTips.js.map