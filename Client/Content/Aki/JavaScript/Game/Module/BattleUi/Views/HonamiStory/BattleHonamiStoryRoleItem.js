"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleHonamiStoryRoleItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const BattleHonamiStoryRoleSuitItem_1 = require("./BattleHonamiStoryRoleSuitItem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class BattleHonamiStoryRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.jEm = [];
    this.$pt = undefined;
    this.Sbm = undefined;
    this.Mbm = undefined;
    this.Ebm = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UINiagara]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (const t of [1, 2, 3]) {
      e.push(this.yYd(t));
    }
    await Promise.all(e);
  }
  async yYd(e) {
    var t = new BattleHonamiStoryRoleSuitItem_1.BattleHonamiStoryRoleSuitItem();
    this.jEm.push(t);
    return t.CreateThenShowByActorAsync(this.GetItem(e).GetOwner());
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.GetUiNiagara(7).SetUIActive(false);
  }
  OnBeforeShow() {
    this.$pt?.PlaySequencePurely("Start");
  }
  async OnHideAsyncImplementImplement() {
    this.$pt?.StopPrevSequence(false, true);
    await this.$pt?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
    if (this.Mbm) {
      this.Mbm.Remove();
      this.Mbm = undefined;
      this.GetUiNiagara(7).SetUIActive(false);
    }
  }
  OnAfterHide() {
    this.Ebm?.();
  }
  OnBeforeDestroy() {
    this.Ebm = undefined;
    this.$pt?.Clear();
    this.$pt = undefined;
    this.Sbm?.Remove();
    this.Sbm = undefined;
  }
  RegisterOnAfterHide(e) {
    this.Ebm = e;
  }
  ShowRoleItem(e, t) {
    var i = e.RoleId;
    var s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    if (s) {
      this.SetActive(true);
      var o = this.GetTexture(0);
      o.SetUIActive(false);
      var r = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinDataByRoleId(i);
      var r = (r !== undefined ? r.GetRoleSkinConfig() : s).RoleHeadIconLarge;
      this.SetRoleIconByRoleIdOrSkinId(r, o, i, s.SkinId, () => {
        this.GetTexture(0)?.SetUIActive(true);
      });
      if (e.BuffActive) {
        this.GetUiNiagara(7).SetUIActive(true);
        this.Mbm = TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this.Mbm = undefined;
          this.GetUiNiagara(7).SetUIActive(false);
        }, 1000);
      }
      var a = e.SuitIdList;
      var h = e.SuitDataList;
      var r = a === undefined || h === undefined;
      this.GetSprite(4).SetUIActive(r);
      this.GetItem(5).SetUIActive(!r);
      if (!r) {
        var n = e.ItemSubType;
        var m = this.jEm.length;
        var l = Math.min(a.length, m);
        let t = undefined;
        for (let e = 0; e < l; e++) {
          var d = a[e];
          var u = h[e];
          var d = ModelManager_1.ModelManager.HonamiStoryModel.GetWeaponSuitData(d).WeaponPluginType;
          var v = this.jEm[e];
          v.Refresh(u, d);
          v.SetUiActive(true);
          if (u.IsActive && n === d) {
            t = v;
          }
        }
        t?.PlayBurst();
        for (let e = l; e < m; e++) {
          this.jEm[e].SetUiActive(false);
        }
      }
      this.Vbm(t);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("HonamiStory", 48, "拾取提示角色配置不存在", ["RoleId", i]);
      }
      this.Ebm?.();
    }
  }
  Vbm(e) {
    this.Sbm = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.Sbm = undefined;
      if (!this.IsHideOrHiding) {
        this.SetActive(false);
      }
    }, e);
  }
  HideRoleItem() {
    this.Sbm?.Remove();
    this.Sbm = undefined;
    if (!this.IsHideOrHiding) {
      this.SetActive(false);
    }
  }
}
exports.BattleHonamiStoryRoleItem = BattleHonamiStoryRoleItem;
//# sourceMappingURL=BattleHonamiStoryRoleItem.js.map