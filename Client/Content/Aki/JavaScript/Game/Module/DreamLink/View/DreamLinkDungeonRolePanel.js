"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkRoleInstanceItem = exports.DreamLinkRoleInstancePanel = undefined;
const UE = require("ue");
const RogueWhiteCatInstById_1 = require("../../../../Core/Define/ConfigQuery/RogueWhiteCatInstById");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const DreamLinkController_1 = require("../DreamLinkController");
class DreamLinkRoleInstancePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eeh = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    for (let e = 0; e < 3; e++) {
      var i = new DreamLinkRoleInstanceItem();
      this.eeh.push(i);
      i.Index = e;
      i.RefreshHandler = e => {
        this.SetSelectItem(e);
      };
      t.push(i.CreateThenShowByActorAsync(this.GetItem(0 + e).GetOwner()));
    }
    await Promise.all(t);
  }
  Refresh(t, i) {
    for (let e = 0; e < this.eeh.length; e++) {
      if (e < t.length) {
        this.eeh[e].Refresh(t[e], e === i);
      }
    }
  }
  GetScreenPositionByIndex(e) {
    e = this.eeh[e];
    if (e) {
      return e.GetRootItem().GetPositionInViewPort(true);
    }
  }
  GetLocationByIndex(e) {
    e = this.eeh[e];
    if (e) {
      return e.GetRootItem().D_K2_GetComponentToWorld().GetLocation();
    }
  }
  SetSelectItem(t) {
    for (let e = 0; e < this.eeh.length; e++) {
      if (e !== t) {
        this.eeh[e].SetToggleState(false);
      }
    }
  }
}
exports.DreamLinkRoleInstancePanel = DreamLinkRoleInstancePanel;
class DreamLinkRoleInstanceItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.RefreshHandler = e => {};
    this.Index = 0;
    this.Bke = e => {
      if (e === 1) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectRoleDreamDungeon, this.Pe.r6n);
      }
      this.RefreshHandler(this.Index);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UINiagara], [7, UE.UISprite], [8, UE.UITexture], [9, UE.UITexture]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  OnStart() {
    this.GetExtendToggle(0).OnStateChange.Add(e => {
      if (e === 1 && (e = DreamLinkController_1.DreamLinkController.GetCurrentActivityData())) {
        e.SaveDungeonRedDotStateByInstId(this.Pe.r6n);
        this.GetItem(4).SetUIActive(false);
      }
    });
  }
  Refresh(e, t) {
    this.Pe = e;
    const i = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    var s = this.GetExtendToggle(0);
    s.CanExecuteChange.Unbind();
    s.SetToggleState(0, false);
    s.SetToggleState(t ? 1 : 0, true);
    s.CanExecuteChange.Bind(() => {
      var e;
      return !!this.Pe?.K6n || ((e = RogueWhiteCatInstById_1.configRogueWhiteCatInstById.GetConfig(i.GetRoleInstDataIndex(this.Pe.r6n) + 1)) && (e = ConfigManager_1.ConfigManager.ConditionConfig?.GetConditionGroupConfig(e.ConditionGroupId), StringUtils_1.StringUtils.IsBlank(e.HintText) || ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(e.HintText)), false);
    });
    if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectRoleDreamDungeon, this.Pe.r6n);
    }
    var s = i?.GetDungeonToggleItemParams();
    var t = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetDreamLinkRoleDungeonConfig(e.r6n);
    var n = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(t.RoleId);
    this.SetTextureByPath(n.RoleHeadIconCircle, this.GetTexture(2));
    this.SetSpriteByPath(t.IndexTexturePath, this.GetSprite(7), false);
    if (s) {
      this.SetTextureByPath(s.TextureBgPath, this.GetTexture(8));
      this.SetTextureByPath(s.TextureLightPath, this.GetTexture(9));
      n = UE.Color.FromHex(s.EffectColor);
      t = new UE.LinearColor(n);
      this.GetUiNiagara(6).SetNiagaraVarLinearColor("Color", t);
    }
    var s = this.GetTexture(2);
    var n = this.GetSprite(1);
    if (e.K6n) {
      s.SetIsGray(false);
      s.SetColor(UE.Color.FromHex("#ffffff"));
      s.SetUIActive(true);
      n.SetUIActive(false);
    } else {
      s.SetIsGray(true);
      s.SetColor(UE.Color.FromHex("8F7FD999"));
      s.SetUIActive(false);
      n.SetUIActive(true);
    }
    var t = i.GetInstStage() === 0;
    if (t) {
      this.GetTexture(2).SetChangeColor(e.CM_, UE.Color.FromHex("738ec6ff"));
    } else {
      this.GetTexture(2).SetChangeColor(e.CM_, UE.Color.FromHex("9A7F8EFF"));
    }
    this.GetItem(3).SetUIActive(!e.K6n);
    this.GetItem(5).SetUIActive(e.CM_);
    this.GetItem(4).SetUIActive(i.CheckDungeonRedDotStateByInstId(e.r6n));
  }
  SetToggleState(e) {
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0, false);
  }
}
exports.DreamLinkRoleInstanceItem = DreamLinkRoleInstanceItem;
//# sourceMappingURL=DreamLinkDungeonRolePanel.js.map