"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalGameplayItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LOCK_TEXT_ALPHA = 0.2;
const NORMAL_TEXT_ALPHA = 1;
class RegionalTerminalGameplayItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.l4e = undefined;
    this.eBl = 0;
    this.EnableRedDot = true;
    this.OnClickToggleCallBack = undefined;
    this.IsToggleSelectOn = undefined;
    this.kqe = t => {
      this.qhf(t === 1);
      this.OnClickToggleCallBack?.(t === 1, this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggleTextureTransition], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  async RefreshAsync(t, i, e) {
    var s = (this.Pe = t).GetLockState();
    var r = ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalByGameplayId(t.Id);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), r.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r.TagName);
    var h = this.GetTexture(2);
    h.SetChangeColor(s, h.changeColor);
    this.SetTextureShowUntilLoaded(r.Icon, h);
    var h = this.GetUiExtendToggleTextureTransition(1);
    var a = r.TexBgLock;
    var r = r.TexBg;
    if (r) {
      await this.SetExtendToggleTextureTransitionGroupByPath(r, h, [3, 4, 5]);
    }
    if (a) {
      await this.SetExtendToggleTextureTransitionGroupByPath(a, h, [0, 1, 2]);
    }
    this.SetPin(ModelManager_1.ModelManager.RegionalTerminalModel.IsGameplayPin(t.Id));
    this.GetItem(6)?.SetUIActive(s);
    this.K8e();
    var r = this.IsToggleSelectOn?.(t) ?? false;
    this.EUt(r);
  }
  OnBeforeDestroy() {
    this.Ovt();
  }
  K8e() {
    var t = this.GetItem(7);
    if (this.EnableRedDot) {
      this.Ovt();
      this.l4e = this.Pe.GetRedDotName();
      this.eBl = this.Pe.GetRedDotId();
      if (this.l4e) {
        RedDotController_1.RedDotController.BindRedDot(this.l4e, t, undefined, this.eBl);
      } else {
        t.SetUIActive(this.Pe.GetRedDotState());
      }
    } else {
      t.SetUIActive(false);
    }
  }
  Ovt() {
    var t;
    if (this.l4e) {
      t = this.GetItem(7);
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, t, this.eBl);
      this.eBl = 0;
      this.l4e = undefined;
    }
  }
  SetPin(t) {
    this.GetItem(5)?.SetUIActive(t);
  }
  RefreshFunctional() {
    var t = this.Pe.GetLockState();
    var i = this.GetTexture(2);
    i.SetChangeColor(t, i.changeColor);
    this.SetPin(ModelManager_1.ModelManager.RegionalTerminalModel.IsGameplayPin(this.Pe.Id));
    this.GetItem(6)?.SetUIActive(t);
    if (!this.l4e) {
      this.GetItem(7).SetUIActive(this.Pe.GetRedDotState());
    }
  }
  qhf(t) {
    t = !t && this.Pe.GetLockState() ? LOCK_TEXT_ALPHA : NORMAL_TEXT_ALPHA;
    this.GetItem(8).SetAlpha(t);
  }
  EUt(t) {
    var i = t ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(i);
    this.qhf(t);
  }
  OnSelected(t) {
    this.EUt(true);
  }
  OnDeselected(t) {
    this.EUt(false);
  }
  GetKey(t, i) {
    return t.Id;
  }
}
exports.RegionalTerminalGameplayItem = RegionalTerminalGameplayItem;
//# sourceMappingURL=RegionalTerminalGameplayItem.js.map