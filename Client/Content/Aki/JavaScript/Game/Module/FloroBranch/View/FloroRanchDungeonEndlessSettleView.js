"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonEndlessSettleView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const FloroRanchDungeonSettleItem_1 = require("./Item/FloroRanchDungeonSettleItem");
class FloroRanchDungeonEndlessSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.juu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.ReStartGame();
    };
    this.Huu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.ExitGame(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.juu], [2, this.Huu]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    var o = e?.H4u;
    if (e === undefined || o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "弗洛洛牧场副本成功结算界面参数错误");
      }
    } else {
      await (e = new FloroRanchDungeonSettleItem_1.FloroRanchDungeonSettleItem()).CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
      await e.RefreshAsync(o);
    }
  }
}
exports.FloroRanchDungeonEndlessSettleView = FloroRanchDungeonEndlessSettleView;
//# sourceMappingURL=FloroRanchDungeonEndlessSettleView.js.map