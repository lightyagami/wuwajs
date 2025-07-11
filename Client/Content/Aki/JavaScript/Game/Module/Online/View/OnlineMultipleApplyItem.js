"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineMultipleApplyItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const OnlineController_1 = require("../OnlineController");
class OnlineMultipleApplyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
    this.iOi = undefined;
    this.pNi = undefined;
    this.T8t = () => {
      OnlineController_1.OnlineController.AgreeJoinResultRequest(this.iOi.PlayerId, true);
    };
    this.I8t = () => {
      OnlineController_1.OnlineController.AgreeJoinResultRequest(this.iOi.PlayerId, false);
      if (ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyListById(this.iOi.PlayerId)) {
        ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(this.iOi.PlayerId);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.T8t], [5, this.I8t]];
  }
  OnStart() {
    this.pNi = this.GetSprite(3);
  }
  Refresh(e, t, i) {
    this.iOi = e;
    var r = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e.HeadId, false);
    if (r) {
      this.SetTextureByPath(r.GetRoleHeadIconCircle(), this.GetTexture(1));
    }
    this.GetText(0).SetText(e.Name);
    this.GetText(2).SetText(e.Level.toString());
  }
  UpdateCountDownProgressBar() {
    if (this.iOi && (this.pNi.SetFillAmount(this.iOi.ApplyTimeLeftTime / ModelManager_1.ModelManager.OnlineModel.ApplyCd), this.iOi.ApplyTimeLeftTime <= 0) && ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyListById(this.iOi.PlayerId)) {
      ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(this.iOi.PlayerId);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply);
    }
  }
}
exports.OnlineMultipleApplyItem = OnlineMultipleApplyItem;
//# sourceMappingURL=OnlineMultipleApplyItem.js.map