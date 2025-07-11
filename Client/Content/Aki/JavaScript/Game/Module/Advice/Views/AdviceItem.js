"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const AdviceController_1 = require("../AdviceController");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class AdviceItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.b9e = undefined;
    this.bHe = e => {
      if (e === this.b9e.GetAdviceId()) {
        this.Og();
      }
    };
    this.qHe = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(92);
      e.FunctionMap.set(2, () => {
        AdviceController_1.AdviceController.RequestDeleteAdvice(this.b9e.GetAdviceId());
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UISprite]];
    this.BtnBindInfo = [[0, this.qHe]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnModifyAdviceSuccess, this.bHe);
  }
  Update(e) {
    this.b9e = e;
    this.Og();
  }
  Og() {
    this.T2e();
    this.wHe();
    this.THe();
    this.GHe();
  }
  T2e() {
    this.GetText(1).SetText(this.b9e.GetAdviceShowText());
  }
  wHe() {
    var e;
    var t = this.b9e.GetAdviceExpressionId() > 0;
    if (t) {
      e = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(this.b9e.GetAdviceExpressionId());
      this.SetTextureByPath(e.ExpressionTexturePath, this.GetTexture(4));
    }
    this.GetSprite(5).SetUIActive(!t);
    this.GetTexture(4).SetUIActive(t);
  }
  THe() {
    var e = this.b9e.GetVote();
    this.GetText(2).SetText(e.toString());
  }
  GHe() {
    var e = this.b9e.GetAreaId();
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e);
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(e.Title);
    this.GetText(3).SetText(e);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnModifyAdviceSuccess, this.bHe);
  }
}
exports.AdviceItem = AdviceItem;
//# sourceMappingURL=AdviceItem.js.map