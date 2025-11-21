"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecommendController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
class VisionRecommendController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleChangeEnd, VisionRecommendController.Io_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleInfoUpdate, VisionRecommendController.Io_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveRole, VisionRecommendController.To_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleDevViewOpen, VisionRecommendController.TWd);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleChangeEnd, VisionRecommendController.Io_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleInfoUpdate, VisionRecommendController.Io_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveRole, VisionRecommendController.To_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleDevViewOpen, VisionRecommendController.TWd);
  }
  static RequestRoleVisionRecommendData(o) {
    var e = new Protocol_1.Aki.Protocol.Qv_();
    e.Q6n = o;
    Net_1.Net.Call(24314, Protocol_1.Aki.Protocol.Qv_.create(e), e => {
      ModelManager_1.ModelManager.VisionRecommendModel.OnRoleRecommendData(o, e);
    });
  }
  static RequestRoleVisionRecommendAttr(o) {
    var e = new Protocol_1.Aki.Protocol.Xv_();
    e.Q6n = o;
    Net_1.Net.Call(19472, Protocol_1.Aki.Protocol.Xv_.create(e), e => {
      ModelManager_1.ModelManager.VisionRecommendModel.OnRoleRecommendAttrData(o, e);
    });
  }
  static RequestRoleVisionMainPhantom(o) {
    var e = new Protocol_1.Aki.Protocol.Jim();
    e.Q6n = o;
    Net_1.Net.Call(29139, Protocol_1.Aki.Protocol.Jim.create(e), e => {
      ModelManager_1.ModelManager.VisionRecommendModel.OnRoleMainPhantomRecommendData(o, e);
    });
  }
}
(exports.VisionRecommendController = VisionRecommendController).Io_ = () => {
  for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleList()) {
    VisionRecommendController.RequestRoleVisionRecommendData(e.GetRoleId());
    VisionRecommendController.RequestRoleVisionRecommendAttr(e.GetRoleId());
    VisionRecommendController.RequestRoleVisionMainPhantom(e.GetRoleId());
  }
};
VisionRecommendController.TWd = () => {
  for (const e of ModelManager_1.ModelManager.RoleModel.GetAllConfigRoleIdList()) {
    VisionRecommendController.RequestRoleVisionRecommendData(e);
    VisionRecommendController.RequestRoleVisionRecommendAttr(e);
    VisionRecommendController.RequestRoleVisionMainPhantom(e);
  }
};
VisionRecommendController.To_ = e => {
  VisionRecommendController.RequestRoleVisionRecommendData(e);
  VisionRecommendController.RequestRoleVisionRecommendAttr(e);
  VisionRecommendController.RequestRoleVisionMainPhantom(e);
}; //# sourceMappingURL=VisionRecommendController.js.map