"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionDirectionalFusionSelectTargetView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionDirectionalFusionSelectTargetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qc_ = undefined;
    this.jSg = 0;
    this.ebl = undefined;
    this.$Sg = () => {
      var e = new SelectTargetItem();
      e.OnClickToggleCallBack = this.WSg;
      return e;
    };
    this.Pwe = () => {
      ModelManager_1.ModelManager.CalabashModel.SetDirectionalFusionTargetFetter(this.jSg);
      this.CloseMe();
    };
    this.WSg = (e, i) => {
      if (e <= 0) {
        this.jSg = e;
        this.ZGe();
      } else if (this.jSg !== e) {
        this.ebl?.SetToggleStateForce(0);
        this.ebl = i;
        this.jSg = e;
        this.ZGe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UIGridLayout], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.Pwe]];
  }
  OnStart() {
    this.Qc_ = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.$Sg);
    var e = [];
    for (const i of ConfigManager_1.ConfigManager.CalabashConfig.GetPhantomDirectRefiningAll() ?? []) {
      e.push(i.FetterGroup);
    }
    e.sort((e, i) => {
      var t = ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(e);
      var t = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterFindCountByMonsterIdArrayWithoutCost4(t) <= 0 ? 0 : 1;
      var s = ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(i);
      var s = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterFindCountByMonsterIdArrayWithoutCost4(s) <= 0 ? 0 : 1;
      if (t != s) {
        return s - t;
      } else {
        return i - e;
      }
    });
    this.Qc_.RefreshByData(e, () => {
      this.ZGe();
    });
  }
  ZGe() {
    this.GetButton(1).SetSelfInteractive(this.jSg > 0);
  }
}
exports.VisionDirectionalFusionSelectTargetView = VisionDirectionalFusionSelectTargetView;
class SelectTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.QSg = 0;
    this.OnClickToggleCallBack = undefined;
    this.kqe = e => {
      if (e === 1) {
        this.OnClickToggleCallBack?.(this.QSg, this.GetExtendToggle(1));
      } else {
        this.OnClickToggleCallBack?.(0, this.GetExtendToggle(1));
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UITexture]];
    this.BtnBindInfo = [[1, this.kqe]];
  }
  Refresh(e, i, t) {
    this.QSg = e;
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(this.QSg);
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterFindCountByMonsterIdArrayWithoutCost4(e);
    var s = this.QSg === ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTargetFetterGroup;
    if (e <= 0) {
      this.GetExtendToggle(1).SetToggleState(2);
    } else {
      this.GetExtendToggle(1).SetToggleState(s ? 1 : 0, true);
    }
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(this.QSg);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.FetterGroupName);
    this.SetTextureByPath(e.FetterElementPath, this.GetTexture(2));
  }
}
//# sourceMappingURL=VisionDirectionalFusionSelectTargetView.js.map