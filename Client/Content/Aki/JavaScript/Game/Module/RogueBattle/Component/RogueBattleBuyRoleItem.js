"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleBuyRoleGroupItem = exports.RoleBuyInfoGroupData = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RogueBattleDefine_1 = require("../RogueBattleDefine");
const RogueBattleFetterIconItem_1 = require("./RogueBattleFetterIconItem");
const RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RoleBuyInfoGroupData {
  constructor(e, t) {
    this.Data1 = e;
    this.Data2 = t;
  }
}
exports.RoleBuyInfoGroupData = RoleBuyInfoGroupData;
class RogueBattleBuyRoleGroupItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnSelectCallback = undefined;
    this.IsSelectOn = undefined;
    this.dvu = undefined;
    this.mvu = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.dvu = new RogueBattleBuyRoleItem();
    await this.dvu.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.dvu.OnSelectCallback = this.OnSelectCallback;
    this.mvu = new RogueBattleBuyRoleItem();
    await this.mvu.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.mvu.OnSelectCallback = this.OnSelectCallback;
  }
  Refresh(e, t, i) {
    var s = i * 2;
    var i = i * 2 + 1;
    this.dvu.Refresh(e.Data1, this.IsSelectOn?.(s) ?? false, s);
    this.mvu.Refresh(e.Data2, this.IsSelectOn?.(i) ?? false, i);
  }
  fvu(e) {
    if (e % 2 == 0) {
      return this.dvu;
    } else {
      return this.mvu;
    }
  }
  Select(e) {
    this.fvu(e).OnSelected();
  }
  Deselect(e) {
    this.fvu(e).OnDeselected();
  }
  GetRoleUiItem(e) {
    return this.fvu(e).GetOriginalItem();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "FirstRole") {
      return this.fvu(0)?.GetGuideUiItemAndUiItemForShowEx(e);
    } else {
      return undefined;
    }
  }
}
exports.RogueBattleBuyRoleGroupItem = RogueBattleBuyRoleGroupItem;
class RogueBattleBuyRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Pe = undefined;
    this.gvu = -1;
    this.aho = undefined;
    this.l01 = undefined;
    this.$be = undefined;
    this.OnSelectCallback = undefined;
    this.gke = () => {
      var e = this.GetExtendToggle(0).GetToggleState();
      return !this.Pe?.mIc.O2s || !!e;
    };
    this._01 = () => {
      this.OnSelectCallback?.(this.gvu, this.Pe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[0, this._01]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.gke);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  async OnBeforeStartAsync() {
    this.aho = new RogueBattleTokenElement_1.RogueBattleTokenElement();
    await this.aho.CreateThenShowByActorAsync(this.GetItem(14).GetOwner());
    this.l01 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), () => new RogueBattleFetterIconItem_1.RogueBattleFetterIconItem());
    this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), () => new RogueBattleStarItem());
  }
  Refresh(e, a, t) {
    this.gvu = t;
    this.Pe = e;
    this.GetExtendToggle(0).RootUIComp.SetUIActive(e !== undefined);
    this.GetItem(12).SetUIActive(e === undefined);
    if (e) {
      t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.mIc.if1);
      if (t) {
        var i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(e.mIc.if1);
        const h = t.GetRoleConfig();
        var t = t.GetRoleSkinId();
        var t = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(t);
        var s = e.mIc.O2s;
        const n = ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar;
        const l = i?.F6n ?? 0;
        const u = s ? 0 : e.mIc.F6n;
        this.GetExtendToggle(0).SetToggleState(a ? 1 : 0, false);
        this.SetTextureShowUntilLoaded(t.FormationRoleCard, this.GetTexture(1));
        this.aho.Refresh(h.ElementId, false, 0);
        this.GetItem(2).SetUIActive(l === 0 && !s);
        this.GetItem(13).SetUIActive(l > 0 && !s);
        this.GetItem(11).SetUIActive(s);
        var i = e.mIc.qN_;
        var t = e.mIc.kN_;
        var r = this.GetText(9);
        var o = this.GetText(10);
        var e = e.mIc.L8n;
        r.SetText(i.toString());
        o.SetUIActive(i !== t);
        o.SetText(t.toString());
        var o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
        r.SetChangeColor(o < i, r.changeColor);
        this.GetItem(7).SetUIActive(!s);
        this.SetItemIcon(this.GetTexture(8), e);
        var t = new UiAsyncTask_1.UiAsyncTask("RogueBattleBuyRoleItem.Refresh", async () => {
          var e = [];
          var t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(h.Id);
          if (t) {
            var i = [];
            for (const o of t.BondIds) {
              var s = {
                OldRoleBondInfo: ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(o),
                NewRoleBondInfo: ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondPreviewDataById(o, u),
                AddStar: u
              };
              i.push(s);
            }
            i.sort(RogueBattleDefine_1.sortRogueBattleRoleBondUpdateInfo);
            e.push(this.l01.RefreshByDataAsync(i));
          }
          var r = [];
          for (let e = 0; e < n; e++) {
            r.push(e < l);
          }
          e.push(this.$be.RefreshByDataAsync(r));
          await Promise.all(e);
          this.Cvu(a);
        });
        this.RunAsyncTask(t);
        this.SPe?.PlayLevelSequenceByName("Start");
      }
    }
  }
  OnSelected() {
    if (this.Pe) {
      this.GetExtendToggle(0).SetToggleState(1, false);
      this.Syu(true);
      this.Cvu(true);
    }
  }
  OnDeselected() {
    if (this.Pe) {
      this.GetExtendToggle(0).SetToggleState(0, false);
      this.Syu(false);
      this.Cvu(false);
    }
  }
  Syu(e) {
    for (const t of this.l01.GetLayoutItemList()) {
      t.RefreshSelectState(e);
    }
  }
  Cvu(t) {
    if (this.Pe && !this.Pe.mIc.O2s) {
      var i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(this.Pe.mIc.if1);
      var e = ModelManager_1.ModelManager.RogueBattleModel.MaxRoleStar;
      var s = this.Pe.mIc.F6n;
      var i = i?.F6n ?? 0;
      var r = Math.min(i + s, e);
      for (let e = i; e < r; e++) {
        this.$be.GetLayoutItemByIndex(e)?.SetPreviewAnimOn(t);
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "FirstRole" && (e = this.GetExtendToggle(0)?.GetRootComponent())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
const SEQ_LIGHT = "Light";
class RogueBattleStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.GetSprite(0).SetUIActive(true);
  }
  Refresh(e, t, i) {
    this.GetSprite(1).SetUIActive(e);
    this.GetItem(2).SetUIActive(false);
  }
  SetPreviewAnimOn(e) {
    this.GetSprite(1).SetUIActive(e);
    this.GetItem(2).SetUIActive(e);
    if (e) {
      if (this.SPe.GetCurrentSequence() === SEQ_LIGHT) {
        this.SPe.ReplaySequenceByKey(SEQ_LIGHT);
      } else {
        this.SPe.StopPlayingSequence(false, true);
        this.SPe.PlayLevelSequenceByName(SEQ_LIGHT);
      }
    } else {
      this.SPe?.StopSequenceByKey("Light");
    }
  }
}
//# sourceMappingURL=RogueBattleBuyRoleItem.js.map