"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeadEyeAimItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class DeadEyeAimItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.gae = Vector2D_1.Vector2D.Create();
    this.$pt = undefined;
    this.yct = e => {
      if (e === "Start" && (ModelManager_1.ModelManager.DeadEyeModeModel.ViewStartSequenceFinish = true, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("DeadEye", 18, "死眼玩法：播放AimItem动画完成");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    var e = this.GetItem(0);
    e.SetUIActive(true);
    this.gae.Set(e.Width, e.Height);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.$pt.BindSequenceCloseEvent(this.yct);
  }
  OnAfterShow() {
    this.$pt?.PlayLevelSequenceByName("Start");
  }
  async OnBeforeHideAsync() {
    var e = new CustomPromise_1.CustomPromise();
    await this.$pt?.PlaySequenceAsync("Close", e);
  }
  GetAimRange() {
    return this.gae;
  }
}
exports.DeadEyeAimItem = DeadEyeAimItem;
//# sourceMappingURL=DeadEyeAimItem.js.map