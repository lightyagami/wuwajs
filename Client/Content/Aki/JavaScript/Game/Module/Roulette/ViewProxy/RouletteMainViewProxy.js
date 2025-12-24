"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteMainViewProxy = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RouletteComponentMain_1 = require("../RouletteComponent/RouletteComponentMain");
const RouletteMainViewProxyBase_1 = require("./RouletteMainViewProxyBase");
class RouletteMainViewProxy extends RouletteMainViewProxyBase_1.RouletteMainViewProxyBase {
  constructor() {
    super(...arguments);
    this.Cpo = undefined;
    this.gpo = undefined;
  }
  OnGetRouletteComponent() {
    if (this.RouletteType === 0) {
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
    var e;
    if (Info_1.Info.IsInGamepad()) {
      return ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(true) || ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    } else if ((e = ModelManager_1.ModelManager.RouletteModel.GetRouletteActionOpenConfig(this.ActionType)) === 0) {
      return ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(true);
    } else {
      return e !== 1 || ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    }
  }
  OnGetRouletteType() {
    var e = ModelManager_1.ModelManager.RouletteModel.GetRouletteActionOpenConfig(this.ActionType);
    var t = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen();
    var n = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    if (e !== 1 || n) {
      if (e !== 0 || t) {
        return e;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }
  OnGetCanSwitchType() {
    var e = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen();
    var t = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    return Info_1.Info.IsInGamepad() && e && t;
  }
  OnGetPanelSwitchOpen() {
    var e = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    var t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10026);
    return Info_1.Info.IsInGamepad() && t && e;
  }
  OnRouletteTypeSwitch() {
    var e = this.RouletteType === 0;
    this.RouletteType = e ? 1 : 0;
    ModelManager_1.ModelManager.RouletteModel.SaveRouletteActionOpenConfig(this.ActionType, this.RouletteType);
  }
  GetToggle1State() {
    var e = this.RouletteType === 0;
    if (ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen()) {
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
    let t = true;
    return t = e === 0 && ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(0).IsRouletteReplace() || e === 1 && ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(1).IsRouletteReplace() ? false : t;
  }
  OnGetExploreRouletteDataMap() {
    return ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(0).GetRouletteDataMap();
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
exports.RouletteMainViewProxy = RouletteMainViewProxy;
//# sourceMappingURL=RouletteMainViewProxy.js.map