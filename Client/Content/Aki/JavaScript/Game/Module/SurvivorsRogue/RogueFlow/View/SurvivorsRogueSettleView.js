"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueSettleView = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const SurvivorsRogueSettleBaseView_1 = require("./SurvivorsRogueSettleBaseView");
class SurvivorsRogueSettleView extends SurvivorsRogueSettleBaseView_1.SurvivorsRogueSettleBaseView {
  constructor() {
    super(...arguments);
    this.CommandIncId = 0;
    this.Command = undefined;
    this.OnClickBtnReturn = () => {
      ModelManager_1.ModelManager.SurvivorsRogueModel.HasNewSettle = false;
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.LeaveRogueInstance();
    };
    this.OnClickBtnReturnMain = () => {
      ModelManager_1.ModelManager.SurvivorsRogueModel.HasNewSettle = true;
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.LeaveRogueInstance();
    };
  }
  CloseView() {
    this.CloseMe();
  }
  async OnBeforeStartAsync() {
    var e;
    this.CommandIncId = this.OpenParam.CommandIncId;
    if (this.CommandIncId) {
      if (e = ModelManager_1.ModelManager.SurvivorsRogueModel.CommandQueue.GetCommandByIncId(this.CommandIncId)) {
        this.Command = e;
        await super.OnBeforeStartAsync();
        this.Command.BindView(this);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SurvivorsRogue", 37, "[SurvivorsRogue] 界面打开时缺少CommandIncId");
    }
  }
  GetViewInfo() {
    return this.Command.GetViewInfo();
  }
  OnBeforeDestroy() {
    this.Command?.BindView(undefined);
  }
  Refresh() {
    var e = new UiAsyncTask_1.UiAsyncTask("SurvivorsRogueSettleView.Refresh", async () => {
      await this.RefreshAsync();
    });
    this.RunAsyncTask(e);
  }
}
exports.SurvivorsRogueSettleView = SurvivorsRogueSettleView;
//# sourceMappingURL=SurvivorsRogueSettleView.js.map