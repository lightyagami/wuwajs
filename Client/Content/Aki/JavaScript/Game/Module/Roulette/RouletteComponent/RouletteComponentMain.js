"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteComponentMainFunction = exports.RouletteComponentMainExplore = exports.RouletteComponentMain = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const RouletteDefine_1 = require("../Data/RouletteDefine");
const RouletteGridForbiddenSettings_1 = require("../RouletteGrid/RouletteGridForbiddenSettings");
const RouletteComponent_1 = require("./RouletteComponent");
class RouletteComponentMain extends RouletteComponent_1.RouletteComponentBase {
  constructor() {
    super(...arguments);
    this.hIa = true;
    this.bll = false;
  }
  OnStart() {
    var e;
    super.OnStart();
    if (Info_1.Info.IsInGamepad()) {
      e = ModelManager_1.ModelManager.RouletteModel.GetRouletteSelectConfig();
      this.hIa = e === 1;
    }
  }
  GamepadReturnEmptyGrid() {
    var e;
    var t;
    var o;
    if (this.CurrentEquipGridIndex !== this.CurrentGridIndex) {
      e = this.RouletteGridList[this.CurrentEquipGridIndex];
      if ((o = (t = this.RouletteGridList[this.CurrentGridIndex]).Data).State === 0) {
        RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.TipsForbiddenState(o.GridType, o.Id);
        this.CurrentGridIndex = -1;
      } else if (o.Id !== 0 || o.GridType === 2) {
        e?.SetGridEquipped(false);
        t?.SetGridEquipped(true);
        this.CurrentEquipGridIndex = this.CurrentGridIndex;
        this.OnEmitCurrentGridSelectOn();
        this.CloseRouletteMain();
      }
    }
    this.IsEmptyChoose = true;
  }
  TryEmitCurrentGridSelectOn() {
    if (this.hIa) {
      this.OnEmitCurrentGridSelectOn();
    }
  }
  OnEmitCurrentGridSelectOn() {
    if (!this.bll) {
      this.bll = true;
      this.GetCurrentGrid()?.SelectOnGrid(true);
    }
  }
  IsCurrentEquippedId(e) {
    switch (e.GridType) {
      case 0:
        var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
        if (t !== 0 && e.Id === t) {
          return true;
        }
        break;
      case 2:
        return ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn;
    }
    return false;
  }
  GetGridId(e, t) {
    return ModelManager_1.ModelManager.RouletteModel.GetRouletteGridId(e, t, true);
  }
  SetCurrentToggleState(e) {
    this.GetCurrentGrid()?.SetGridToggleState(e);
    if (e) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_float_spl_roulette");
    }
  }
  RefreshCurrentShowName() {
    var e = Info_1.Info.IsInTouch();
    var t = this.GetCurrentGrid()?.Data?.Name;
    if (t) {
      this.SetNameVisible(true);
      this.RefreshName(t);
    } else {
      this.SetNameVisible(e);
      if (e) {
        this.RefreshName(RouletteDefine_1.ROULETTE_TEXT_EMPTY);
      }
    }
  }
  RefreshTips() {
    var e = Info_1.Info.IsInTouch();
    var t = this.IsEmptyChoose;
    var o = this.GetCurrentGrid()?.Data.State !== 1;
    var t = this.GetRefreshTips(t || o);
    this.RefreshTipsByText(t, !e);
  }
  GetRefreshTips(e) {}
  CloseRouletteMain() {
    UiManager_1.UiManager.CloseView("PhantomExploreView");
  }
}
class RouletteComponentMainExplore extends (exports.RouletteComponentMain = RouletteComponentMain) {
  GetRouletteInfoMap() {
    return RouletteComponent_1.exploreRouletteMap;
  }
  JudgeGridStateByData(e, t) {
    var o = e !== undefined && e !== 0;
    var i = t === 2;
    var t = RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.CheckGridSpecialState(1, t, e);
    if (o || i) {
      if (t !== undefined) {
        return t;
      } else {
        return 1;
      }
    } else {
      return 3;
    }
  }
  RefreshRouletteItem() {
    this.SetTipsActive(false);
  }
  GetRefreshTips(e) {
    let t = undefined;
    if (Info_1.Info.IsInTouch()) {
      t = e ? "Text_ProbeToolFunctionNotice3_Text" : "Text_ExploreToolsSwitchMobile_Text";
    } else if (Info_1.Info.IsInKeyBoard()) {
      t = e ? undefined : "Text_ExploreToolsSwitchPC_Text";
    } else if (Info_1.Info.IsInGamepad()) {
      e = this.GetCurrentGrid()?.Data.State !== 1;
      e = this.CurrentGridIndex !== undefined && this.CurrentGridIndex !== -1 && !e;
      t = e ? "Text_ExploreToolsSwitchPC_Text" : undefined;
    }
    this.SetTipsActive(t !== undefined);
    return t;
  }
}
exports.RouletteComponentMainExplore = RouletteComponentMainExplore;
class RouletteComponentMainFunction extends RouletteComponentMain {
  GetRouletteInfoMap() {
    return RouletteComponent_1.functionRouletteMap;
  }
  JudgeGridStateByData(e, t) {
    var o = e !== undefined && e !== 0;
    var t = RouletteGridForbiddenSettings_1.RouletteGridForbiddenSettings.CheckGridSpecialState(1, t, e);
    if (o) {
      if (t !== undefined) {
        return t;
      } else {
        return 1;
      }
    } else {
      return 3;
    }
  }
  RefreshRouletteItem() {
    this.SetTipsActive(true);
  }
  GetRefreshTips(e) {
    let t = e ? undefined : "Text_FuncToolsSwitchPC_Text";
    this.SetTipsActive(t !== undefined);
    return t;
  }
}
exports.RouletteComponentMainFunction = RouletteComponentMainFunction;
//# sourceMappingURL=RouletteComponentMain.js.map