"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputLayerHelper = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
class InputLayerHelper {
  constructor() {
    this.Bhh = undefined;
    this.nhf = 0;
    this.vq = false;
    this.xie = () => {
      this._rl();
    };
    this.M6l = e => {
      this._rl();
    };
    this.E6l = e => {
      this._rl();
    };
  }
  Init(e) {
    this.Bhh = ControllerHolder_1.ControllerHolder.InputController.CreateInputLayer(e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
  }
  Clear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    if (this.vq) {
      this.RemoveInputLayer();
    }
    if (this.Bhh) {
      this.Bhh.Clear();
      this.Bhh = undefined;
    }
  }
  AddInputLayer() {
    if (!this.vq) {
      this.vq = true;
      this._rl();
    }
  }
  RemoveInputLayer() {
    if (this.vq) {
      this.vq = false;
      this._rl();
    }
  }
  GetInputLayer() {
    return this.Bhh;
  }
  _rl() {
    if (this.Bhh) {
      if (this.vq) {
        var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        let e = t?.Id;
        t = t?.Entity?.CheckGetComponent(242);
        if ((e = (e = t && t.VehicleEntity?.Valid ? t.VehicleEntity?.Id : e) ?? 0) !== this.nhf && (this.nhf = e, ControllerHolder_1.ControllerHolder.InputController.RemoveInputLayer(this.Bhh), e)) {
          ControllerHolder_1.ControllerHolder.InputController.AddInputLayer(e, this.Bhh);
        }
      } else if (this.nhf !== 0) {
        this.nhf = 0;
        ControllerHolder_1.ControllerHolder.InputController.RemoveInputLayer(this.Bhh);
      }
    }
  }
}
exports.InputLayerHelper = InputLayerHelper;
//# sourceMappingURL=InputLayerHelper.js.map