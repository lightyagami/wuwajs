"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingRoleTechView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiTabViewBase_1 = require("../../../../../Ui/Base/UiTabViewBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const FishingController_1 = require("../FishingController");
const FishingDefine_1 = require("../FishingDefine");
const FishingRoleTechItem_1 = require("./FishingRoleTechItem");
const FishingTechCostItem_1 = require("./FishingTechCostItem");
const FishingTechLevelUpItem_1 = require("./FishingTechLevelUpItem");
class FishingRoleTechView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.kpo = 0;
    this.xz = undefined;
    this.oul = undefined;
    this.rul = undefined;
    this.rh_ = undefined;
    this.s4e = undefined;
    this.ebl = undefined;
    this.oh_ = undefined;
    this.U1a = undefined;
    this.SPe = undefined;
    this.ytc = 0;
    this.th_ = e => {
      this.ebl = undefined;
      this.Og(this.kpo);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingRoleTechRefresh, this.kpo);
    };
    this.IK_ = () => {
      if (this.kpo) {
        this.Og(this.kpo);
      }
    };
    this.nh_ = e => {
      if (this.kpo !== 5) {
        this.Og(5);
        this.oh_?.SetToggleState(0, false);
        this.oh_ = e;
      }
    };
    this.sh_ = e => {
      if (this.kpo !== 4) {
        this.Og(4);
        this.oh_?.SetToggleState(0, false);
        this.oh_ = e;
      }
    };
    this.ih_ = () => {
      if (this.xz) {
        FishingController_1.FishingController.RequestFishingTechLevelUp(this.xz.ConfigId);
      }
    };
    this.sGe = () => {
      return new FishingTechLevelUpItem_1.FishingTechLevelUpItem();
    };
    this.ah_ = () => {
      var e = new FishingRoleTechItem_1.FishingRoleTechItem();
      e.OnClickToggleBack = this.hh_;
      return e;
    };
    this.hh_ = (t, s) => {
      this.ebl?.SetToggleState(0, false);
      this.ebl = s;
      this.xz = t;
      s = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(t.ConfigId);
      if (s) {
        t = ModelManager_1.ModelManager.FishingModel.GetTechNodeCurrentLevel(t.ConfigId);
        if (s.Effect.length <= t) {
          this.GetHorizontalLayout(6).RootUIComp.SetUIActive(false);
          this.GetItem(10).SetUIActive(true);
          this.GetButton(8).RootUIComp.SetUIActive(false);
          this.U1a?.SetUiActive(false);
          this.GetItem(14).SetUIActive(false);
        } else {
          this.GetItem(14).SetUIActive(true);
          this.GetHorizontalLayout(6).RootUIComp.SetUIActive(true);
          this.GetItem(10).SetUIActive(false);
          var s = s.Effect[t];
          var h = [];
          let e = false;
          let i = true;
          for (const o of ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(s).Consume) {
            var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o[0]);
            i = i && n >= o[1];
            e = true;
            if (o[0] === FishingDefine_1.FISHING_CURRENCY_ITEMID) {
              this.U1a?.RefreshCost(o[0], o[1], false);
            } else {
              n = {
                ItemId: o[0],
                ItemNeedNum: o[1]
              };
              h.push(n);
            }
          }
          this.GetButton(8).RootUIComp.SetUIActive(i);
          this.GetItem(9).SetUIActive(!i);
          this.s4e?.RefreshByData(h);
          this.U1a?.SetUiActive(e);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [2, UE.UIItem], [1, UE.UIItem], [3, UE.UIVerticalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[8, this.ih_]];
  }
  async OnBeforeStartAsync() {
    this.oul = new RoleTechToggle();
    await this.oul.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.rul = new RoleTechToggle();
    await this.rul.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.oul.OnClickToggleBack = this.nh_;
    this.rul.OnClickToggleBack = this.sh_;
    RedDotController_1.RedDotController.BindRedDot("FishingRoleToggleTech", this.GetItem(12), undefined, 5);
    RedDotController_1.RedDotController.BindRedDot("FishingRoleToggleTech", this.GetItem(11), undefined, 4);
    this.rh_ = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.ah_);
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.sGe);
    this.U1a = new FishingTechCostItem_1.FishingTechCostItem();
    await this.U1a.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.U1a.RefreshCost(FishingDefine_1.FISHING_CURRENCY_ITEMID, 0, false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    this.oul?.RefreshItem(5);
    this.rul?.RefreshItem(4);
    var i = this.ExtraParams;
    if (i) {
      this.ytc = i;
      let e = false;
      for (const t of ModelManager_1.ModelManager.FishingModel.RoleTechNodeMap.get(5)) {
        if (t.ConfigId === i) {
          this.oul?.SelectToggle();
          e = true;
          break;
        }
      }
      if (!e) {
        this.rul?.SelectToggle();
      }
    } else {
      this.rul?.SelectToggle();
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingRoleTechViewOpened);
    if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(100781)) {
      this.GetItem(13).SetUIActive(false);
    }
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("FishingRoleToggleTech", this.GetItem(12), 5);
    RedDotController_1.RedDotController.UnBindGivenUi("FishingRoleToggleTech", this.GetItem(11), 4);
  }
  OnBeforeShow() {
    this.SPe?.PlayLevelSequenceByName("Switch");
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFishingTechNodeRefresh, this.th_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingTechViewComeBack, this.IK_);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFishingTechNodeRefresh, this.th_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingTechViewComeBack, this.IK_);
  }
  Og(e) {
    this.kpo = e;
    let i = "";
    i = this.kpo === 4 ? ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0 ? FishingDefine_1.FISHING_FEMALE_TEXTURE : FishingDefine_1.FISHING_MALE_TEXTURE : FishingDefine_1.FISHING_PHOEBE_TEXTURE;
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetTextureByPath(t, this.GetTexture(0));
    var t = ModelManager_1.ModelManager.FishingModel.RoleTechNodeMap.get(e) ?? [];
    this.rh_?.RefreshByData(t, () => {
      this.rh_?.GetUiAnimController()?.Play();
      for (const e of this.rh_?.GetLayoutItemList()) {
        if (!this.ytc && e.Node === this.xz || e.Node?.ConfigId === this.ytc) {
          this.ytc = 0;
          e.SelectToggle();
          return;
        }
      }
      this.rh_?.GetLayoutItemByIndex(0)?.SelectToggle();
    });
  }
}
exports.FishingRoleTechView = FishingRoleTechView;
class RoleTechToggle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickToggleBack = undefined;
    this.kqe = () => {
      this.OnClickToggleBack?.(this.GetExtendToggle(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  RefreshItem(e) {
    let i = "";
    i = e === 4 ? ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0 ? FishingDefine_1.FISHING_FEMALE_ICON_SPRITE : FishingDefine_1.FISHING_MALE_ICON_SPRITE : FishingDefine_1.FISHING_PHOEBE_ICON_SPRITE;
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(e, this.GetSprite(1), false);
  }
  SelectToggle() {
    this.GetExtendToggle(0).SetToggleState(1, true);
  }
}
//# sourceMappingURL=FishingRoleTechView.js.map