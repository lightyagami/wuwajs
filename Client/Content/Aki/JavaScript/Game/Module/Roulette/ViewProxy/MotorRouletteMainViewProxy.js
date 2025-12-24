"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorRouletteMainViewProxy = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteComponentMain_1 = require("../RouletteComponent/RouletteComponentMain");
const RouletteMainViewProxyBase_1 = require("./RouletteMainViewProxyBase");
class MotorRouletteMainViewProxy extends RouletteMainViewProxyBase_1.RouletteMainViewProxyBase {
  constructor() {
    super(...arguments);
    this.Cpo = undefined;
    this.gpo = undefined;
    this.sGf = [3, 1];
  }
  OnGetRouletteComponent() {
    if (this.RouletteType === 3) {
      if (!this.Cpo) {
        this.Cpo = new RouletteComponentMain_1.RouletteComponentMainExplore();
        this.Cpo.RegisterViewProxy(this);
        this.Cpo.SetRootActor(this.View.RouletteUiItem.GetOwner(), true);
      }
      return this.Cpo;
    } else {
      if (!this.gpo) {
        this.gpo = new RouletteComponentMain_1.RouletteComponentMainFunction();
        this.gpo.RegisterViewProxy(this);
        this.gpo.SetRootActor(this.View.RouletteUiItem.GetOwner(), true);
      }
      return this.gpo;
    }
  }
  OnCanOpenView() {
    if (Info_1.Info.IsInGamepad()) {
      return this.sGf.some(e => ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(e).IsMainRouletteCanOpenView(true));
    }
    let e = ModelManager_1.ModelManager.RouletteModel.GetRouletteActionOpenConfig(this.ActionType);
    if (e === 0) {
      e = 3;
    }
    return ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(e).IsMainRouletteCanOpenView(true);
  }
  OnGetRouletteType() {
    let e = ModelManager_1.ModelManager.RouletteModel.GetRouletteActionOpenConfig(this.ActionType);
    if (e === 0) {
      e = 3;
    }
    var t = ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(3).IsMainRouletteCanOpenView(false);
    var n = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    if (e !== 1 || n) {
      if (e !== 3 || t) {
        return e;
      } else {
        return 1;
      }
    } else {
      return 3;
    }
  }
  OnGetCanSwitchType() {
    return !!Info_1.Info.IsInGamepad() && this.sGf.every(e => ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(e).IsMainRouletteCanOpenView(false));
  }
  OnGetPanelSwitchOpen() {
    return !!Info_1.Info.IsInGamepad() && this.sGf.every(e => ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(e).IsRouletteOpen());
  }
  OnRouletteTypeSwitch() {
    var e = this.RouletteType === 3;
    this.RouletteType = e ? 1 : 3;
    var e = e ? 1 : 0;
    ModelManager_1.ModelManager.RouletteModel.SaveRouletteActionOpenConfig(this.ActionType, e);
  }
  GetToggle1State() {
    var e = this.RouletteType === 3;
    if (ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(3).IsMainRouletteCanOpenView(false)) {
      if (e) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 2;
    }
  }
  GetToggle2State() {
    if (this.RouletteType === 1) {
      return 1;
    } else {
      return 0;
    }
  }
  OnGetCanOpenAssembly(e) {
    return e !== 1 || !ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(1).IsRouletteReplace();
  }
  OnGetExploreRouletteDataMap() {
    return ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(3).GetRouletteDataMap();
  }
  OnGetRouletteGridId(e, t) {
    return ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(this.RouletteType).GetRouletteGridId(e, t, true);
  }
  OnGetActionName() {
    var e = ModelManager_1.ModelManager.RouletteModel.GetRouletteActionName[this.ActionType];
    return ModelManager_1.ModelManager.RouletteModel.GetRouletteMainAction(e);
  }
  OnDestroy() {
    if (this.Cpo) {
      this.Cpo.Destroy();
      this.Cpo = undefined;
    }
    if (this.gpo) {
      this.gpo.Destroy();
      this.gpo = undefined;
    }
  }
}
exports.MotorRouletteMainViewProxy = MotorRouletteMainViewProxy;
//# sourceMappingURL=MotorRouletteMainViewProxy.js.map