"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTogetherView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const ShipTogetherRoleItem_1 = require("./ShipTogetherRoleItem");
class ShipTogetherView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Flo = undefined;
    this.ebl = undefined;
    this.I2i = () => {
      var e = new ShipTogetherRoleItem_1.ShipTogetherRoleItem();
      e.BindOnClickToggleCallBack(this.tbl);
      return e;
    };
    this.tbl = (e, t) => {
      if (this.ebl !== e) {
        this.ebl?.SetToggleState(0);
      }
      this.ebl = e;
      ModelManager_1.ModelManager.ShipTogetherModel.CurrentSelectTogetherRoleId = t;
    };
    this.L3e = () => {
      if (ModelManager_1.ModelManager.ShipTogetherModel.CurrentSelectTogetherRoleId !== -1) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeRideSharingPassenger, ModelManager_1.ModelManager.ShipTogetherModel.CurrentSelectTogetherRoleId, 1);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveRideSharingPassenger, -1, -1);
      }
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.L3e]];
  }
  OnStart() {
    this.Flo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.I2i);
    ModelManager_1.ModelManager.ShipTogetherModel.CurrentSelectTogetherRoleId = ModelManager_1.ModelManager.ShipTogetherModel.RiderSharingRoleId;
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    const o = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? [];
    var t = [];
    for (const i of e) {
      if (!ModelManager_1.ModelManager.RoleModel.IsMainRole(i.GetRoleId())) {
        t.push(i);
      }
    }
    t.sort((e, t) => {
      var i = o.includes(e.GetRoleId());
      var r = o.includes(t.GetRoleId());
      if (i || r) {
        if (i && r) {
          return 0;
        } else if (i) {
          return 1;
        } else {
          return -1;
        }
      } else if ((r = e.GetFavorData().GetFavorLevel()) !== (i = t.GetFavorData().GetFavorLevel())) {
        return i - r;
      } else {
        return t.GetRoleCreateTime() - e.GetRoleCreateTime();
      }
    });
    this.Flo?.RefreshByData(t);
  }
}
exports.ShipTogetherView = ShipTogetherView;
//# sourceMappingURL=ShipTogetherView.js.map