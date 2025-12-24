"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaMapEntranceNpcListItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaMapEntranceNpcListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.hyc = 0;
    this.tof = undefined;
    this.SelectCallBack = undefined;
    this.jbe = t => {
      if (t !== 0) {
        this.SelectCallBack?.(this.hyc);
        this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => this.GridIndex !== this.ScrollViewDelegate?.GetSelectedGridIndex());
    this.GetExtendToggle(0).SetToggleState(0, false);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
  }
  Refresh(t, e, i) {
    this.hyc = t;
    var s = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeStateById(t);
    var r = ConfigManager_1.ConfigManager.PhantomArenaConfig?.GetPhantomBattleChallengeConfig(t);
    if (r) {
      var a = ModelManager_1.ModelManager.PhantomArenaModel?.GetPermanentChallengeData(t)?.qgf ?? true;
      var n = a ? r.NpcName : "PhantomBattle_1164";
      this.tof?.SetUIActive(false);
      this.GetText(4)?.SetText(r.NpcNumber);
      switch (s) {
        case 0:
          this.tof = this.GetItem(7);
          LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(8), n);
          break;
        case 1:
          this.tof = this.GetItem(2);
          LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(3), n);
          break;
        case 2:
          this.tof = this.GetItem(5);
          LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(6), n);
      }
      this.tof?.SetUIActive(true);
      if (a) {
        this.TrySetTextureByPath(r.NpcMapHead, this.GetTexture(1));
      } else {
        s = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(PhantomArenaDefine_1.MYSTERY_NPC_HEAD);
        this.TrySetTextureByPath(s, this.GetTexture(1));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 87, "PhantomArenaMapEntranceNpcListItem获取挑战配置失败", ["ChallengeId", t]);
    }
  }
  OnSelected(t) {
    this.GetExtendToggle(0)?.SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0)?.SetToggleState(0, t);
  }
  GetKey(t, e) {
    return t;
  }
}
exports.PhantomArenaMapEntranceNpcListItem = PhantomArenaMapEntranceNpcListItem;
//# sourceMappingURL=PhantomArenaMapEntranceNpcListItem.js.map