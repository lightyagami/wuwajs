"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HiddenBossWindow = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
const WorldMapController_1 = require("../WorldMap/WorldMapController");
class HiddenBossWindow extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.nt_ = () => {
      const e = this.OpenParam;
      var i = ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetHiddenBossWindowConfig(e.UiId);
      var r = i.MarkId;
      var o = ConfigManager_1.ConfigManager.MapConfig.SearchMarkConfig(r);
      if (o === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlayReport", 63, "[讨伐报告]隐藏boss解锁弹窗找不到对应的标记配置", ["弹窗Id", e.UiId], ["标记Id", i.MarkId]);
        }
      } else {
        this.CloseMe();
        const e = {
          MarkId: r,
          MarkType: o.ObjectType
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UITexture]];
    this.BtnBindInfo = [[0, this.nt_]];
  }
  OnStart() {
    var e = this.OpenParam;
    var e = ConfigManager_1.ConfigManager.LevelPlayReportConfig.GetHiddenBossWindowConfig(e.UiId);
    this.djl(e.BossName);
    var i = this.GetTexture(2);
    this.SetTextureByPath(e.IconRefPath, i);
  }
  djl(e, ...i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e, i);
  }
  OnAfterShow() {
    TimerSystem_1.GameplayTimerSystem.Next(() => {
      this.CloseMe();
    });
  }
}
exports.HiddenBossWindow = HiddenBossWindow;
//# sourceMappingURL=HiddenBossWindow.js.map