"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceExpressionItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class AdviceExpressionItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.U9e = 0;
    this.oHe = () => {
      this.rHe();
      this.nHe();
    };
    this.sHe = () => {
      ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId = this.U9e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickAdviceExpression);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.sHe]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickAdviceExpression, this.oHe);
  }
  Refresh(e, t, s) {
    this.U9e = e.Id;
    var i = e.ExpressionTexturePath;
    this.SetTextureByPath(i, this.GetTexture(2));
    var i = e.Name;
    this.GetText(1).ShowTextNew(i);
    this.rHe();
    this.nHe();
  }
  nHe() {
    var e = this.GetExtendToggle(0).ToggleState;
    var t = ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId === this.U9e ? 1 : 0;
    if (e !== t) {
      this.GetExtendToggle(0).SetToggleStateForce(t, false);
    }
  }
  rHe() {
    var e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId;
    this.GetItem(3).SetUIActive(e === this.U9e);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickAdviceExpression, this.oHe);
  }
}
exports.AdviceExpressionItem = AdviceExpressionItem;
//# sourceMappingURL=AdviceExpressionItem.js.map