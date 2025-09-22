"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResonanceChainLockedItem = exports.ResonanceChainActivatedItem = exports.ResonanceChainBaseItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class ResonanceChainBaseItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ResonanceId = 0;
    this.RoleId = 0;
    this.Wai = false;
    this.pqe = undefined;
    this.$pt = undefined;
    this.ActivateSequenceName = undefined;
    this.OnActivateSequenceEndCallBack = undefined;
    this.wco = 0;
    this.LoadPromise = undefined;
    this.OnSequenceEndCallBack = e => {
      if (e === this.ActivateSequenceName && this.OnActivateSequenceEndCallBack) {
        this.OnActivateSequenceEndCallBack();
      }
    };
    this.Bco = () => {
      if (this.pqe) {
        this.pqe(this.ResonanceId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara], [1, UE.UIExtendToggle], [3, UE.UIItem], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Bco]];
  }
  OnStart() {
    this.GetUiNiagara(0).SetTickableWhenPaused(true);
  }
  OnStartImplement() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.$pt.BindSequenceCloseEvent(this.OnSequenceEndCallBack);
  }
  Update(e, t) {
    this.ResonanceId = t;
    this.RoleId = e;
    this.Refresh();
  }
  Refresh() {
    this.RefreshToggleState();
    this.Kbe();
    this.RefreshRedDot();
  }
  ShowItem() {
    this.SetUiActive(true);
    this.bco();
  }
  GetUiItemForGuide() {
    return this.GetExtendToggle(1)?.GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
  }
  BindToggleCallBack(e) {
    this.pqe = e;
  }
  RefreshToggleState(e = false) {
    var t = this.Wai ? 1 : 0;
    if (e) {
      this.GetExtendToggle(1).SetToggleStateForce(t);
    } else {
      this.GetExtendToggle(1).SetToggleState(t);
    }
  }
  SetSelectState(e) {
    this.Wai = e;
  }
  SetIconRotation(e) {
    this.wco = e;
    this.qco();
  }
  qco() {
    ResonanceChainBaseItem.Gco.Yaw = this.wco;
    this.GetItem(2).SetUIRelativeRotation(ResonanceChainBaseItem.Gco);
  }
  Kbe() {
    var e;
    var t = ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(this.ResonanceId);
    if (t && !StringUtils_1.StringUtils.IsBlank(t.NodeIcon)) {
      e = this.GetUiNiagara(0);
      this.SetNiagaraTextureByPath(t.NodeIcon, e, "icon001", "Mask");
    }
  }
  RefreshRedDot() {}
  GetResonanceId() {
    return this.ResonanceId;
  }
  GetRedDotItem() {
    return this.GetItem(3);
  }
  PlayActivateSequence(e) {
    this.OnActivateSequenceEndCallBack = e;
    this.$pt.PlayLevelSequenceByName(this.ActivateSequenceName);
  }
  bco() {
    this.$pt.PlayOrReplaySequenceByName("Start");
  }
}
(exports.ResonanceChainBaseItem = ResonanceChainBaseItem).Gco = new UE.Rotator(0, 0, 0);
class ResonanceChainActivatedItem extends ResonanceChainBaseItem {
  constructor() {
    super(...arguments);
    this.ActivateSequenceName = "ClickIn";
  }
}
exports.ResonanceChainActivatedItem = ResonanceChainActivatedItem;
class ResonanceChainLockedItem extends ResonanceChainBaseItem {
  constructor() {
    super(...arguments);
    this.ActivateSequenceName = "Click";
  }
  RefreshRedDot() {
    var e = ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(this.ResonanceId);
    var e = ModelManager_1.ModelManager.RoleModel.RedDotResonanceTabHoleCondition(this.RoleId, e.GroupIndex);
    this.GetItem(3)?.SetUIActive(e);
  }
}
exports.ResonanceChainLockedItem = ResonanceChainLockedItem;
//# sourceMappingURL=ResonanceChainItem.js.map