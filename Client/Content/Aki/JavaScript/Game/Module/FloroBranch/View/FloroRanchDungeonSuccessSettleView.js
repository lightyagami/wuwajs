"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonSuccessSettleView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const FloroRanchController_1 = require("../FloroRanchController");
const FloroRanchDungeonSettleItem_1 = require("./Item/FloroRanchDungeonSettleItem");
class FloroRanchDungeonSuccessSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.b9c = undefined;
    this.luu = () => {
      var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().Id;
      var o = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
      FloroRanchController_1.FloroRanchController.SendFloroRanchPlayUnlimitedModeRequest(e, o, e => {
        if (e !== undefined) {
          this.CloseMe(e => {
            if (e) {
              ModelManager_1.ModelManager.FloroRanchGamePlayModel.ChangeState(2);
            }
          });
        }
      });
    };
    this.auu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.ExitGame(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.luu], [2, this.auu]];
  }
  async OnBeforeStartAsync() {
    this.b9c = new FloroRanchDungeonSettleItem_1.FloroRanchDungeonSettleItem();
    await this.b9c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    var o = e?.LFu;
    if (e === undefined || o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "弗洛洛牧场副本成功结算界面参数错误");
      }
    } else {
      this.b9c.RefreshAsync(o);
      this.GetButton(1).RootUIComp.SetUIActive(o.Gyu);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchSuccessSettleViewOpen, o.Gyu);
    }
  }
}
exports.FloroRanchDungeonSuccessSettleView = FloroRanchDungeonSuccessSettleView;
//# sourceMappingURL=FloroRanchDungeonSuccessSettleView.js.map