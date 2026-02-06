"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTogetherView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
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
    this.tbl = (e, o) => {
      if (this.ebl !== e) {
        this.ebl?.SetToggleState(0);
      }
      this.ebl = e;
      ModelManager_1.ModelManager.ShipTogetherModel.CurrentSelectTogetherRoleId = o;
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
    const t = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? [];
    var o;
    var i = [];
    const n = [];
    for (const r of t) {
      if (r > RoleDefine_1.ROBOT_DATA_MIN_ID) {
        n.push(ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(r)?.ParentId ?? 0);
      }
    }
    for (const s of e) {
      if (!ModelManager_1.ModelManager.RoleModel.IsMainRole(s.GetRoleId())) {
        o = {
          RoleInstance: s,
          IsInFormation: t.includes(s.GetRoleId()) || n.includes(s.GetRoleId())
        };
        i.push(o);
      }
    }
    i.sort((e, o) => {
      var e = e.RoleInstance;
      var o = o.RoleInstance;
      var i = t.includes(e.GetRoleId()) || n.includes(e.GetRoleId());
      var r = t.includes(o.GetRoleId()) || n.includes(o.GetRoleId());
      if (i || r) {
        if (i && r) {
          return 0;
        } else if (i) {
          return 1;
        } else {
          return -1;
        }
      } else if ((r = e.GetFavorData().GetFavorLevel()) !== (i = o.GetFavorData().GetFavorLevel())) {
        return i - r;
      } else {
        return o.GetRoleCreateTime() - e.GetRoleCreateTime();
      }
    });
    this.Flo?.RefreshByData(i);
  }
}
exports.ShipTogetherView = ShipTogetherView;
//# sourceMappingURL=ShipTogetherView.js.map