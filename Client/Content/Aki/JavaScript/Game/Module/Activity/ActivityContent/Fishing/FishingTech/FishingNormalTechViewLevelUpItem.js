"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingNormalTechViewLevelUpItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const FishingController_1 = require("../FishingController");
const FishingDefine_1 = require("../FishingDefine");
const FishingTechCostItem_1 = require("./FishingTechCostItem");
const FishingTechLevelUpItem_1 = require("./FishingTechLevelUpItem");
class FishingNormalTechViewLevelUpItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.s4e = undefined;
    this.U1a = undefined;
    this.PRr = undefined;
    this.th_ = e => {
      if (this.PRr?.ConfigId === e || this.PRr?.PreNode === e) {
        this.RefreshView(this.PRr);
      }
    };
    this.IK_ = () => {
      if (this.PRr) {
        this.RefreshView(this.PRr);
      }
    };
    this.sGe = () => {
      return new FishingTechLevelUpItem_1.FishingTechLevelUpItem();
    };
    this.ih_ = () => {
      if (this.PRr) {
        FishingController_1.FishingController.RequestFishingTechLevelUp(this.PRr.ConfigId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIHorizontalLayout], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIText]];
    this.BtnBindInfo = [[9, this.ih_]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFishingTechNodeRefresh, this.th_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingTechViewComeBack, this.IK_);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFishingTechNodeRefresh, this.th_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingTechViewComeBack, this.IK_);
  }
  async OnBeforeStartAsync() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.sGe);
    this.U1a = new FishingTechCostItem_1.FishingTechCostItem();
    await this.U1a.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
    this.U1a.RefreshCost(FishingDefine_1.FISHING_CURRENCY_ITEMID, 0);
  }
  RefreshView(i) {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(i.ConfigId);
    if (t) {
      this.PRr = i;
      this.SetTextureByPath(t.Icon, this.GetTexture(2));
      var s = this.PRr.NodeType === 1;
      this.GetItem(0).SetUIActive(s);
      this.GetItem(1).SetUIActive(!s);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), FishingDefine_1.fishingNodeTypeText[i.NodeType]);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Name);
      var s = ModelManager_1.ModelManager.FishingModel.GetTechNodeCurrentLevel(i.ConfigId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "PrefabTextItem_3692737534_Text", s);
      var n = t.Effect.length;
      if (n <= s) {
        this.GetItem(13).SetUIActive(false);
        this.GetItem(11).SetUIActive(true);
        this.GetItem(10).SetUIActive(false);
        this.GetButton(9).RootUIComp.SetUIActive(false);
        const l = t.Effect[n - 1];
        const U = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(l);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), U.Desc, ...U.ShowParams);
        this.U1a?.SetUiActive(false);
      } else {
        this.GetItem(13).SetUIActive(true);
        this.GetItem(11).SetUIActive(false);
        n = ModelManager_1.ModelManager.FishingModel.GetNodePreNodeUnlock(i.ConfigId);
        i = ModelManager_1.ModelManager.FishingModel.GetNodeLevelUpItemEnough(i.ConfigId);
        this.GetItem(10).SetUIActive(!n || !i);
        if (n) {
          if (!i) {
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "FishingTechLevelUpNotEnough");
          }
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "FishingTechLevelUpNotPreNodeLock");
        }
        this.GetButton(9).RootUIComp.SetUIActive(n && i);
        this.GetItem(11).SetUIActive(false);
        const l = t.Effect[s];
        const U = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(l);
        var h;
        var r = [];
        let e = false;
        for (const u of U.Consume) {
          if (u[0] === FishingDefine_1.FISHING_CURRENCY_ITEMID) {
            this.U1a?.RefreshCost(u[0], u[1]);
            e = true;
          } else {
            h = {
              ItemId: u[0],
              ItemNeedNum: u[1]
            };
            r.push(h);
          }
        }
        this.s4e?.RefreshByData(r);
        this.U1a?.SetUiActive(e);
        if (s === 0) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), U.Desc, ...U.ShowParams);
        } else {
          var n = t.Effect[s - 1];
          var o = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(n);
          var a = [];
          var g = o.ShowParams.length;
          for (let e = 0; e < g; e++) {
            var _ = o.ShowParams[e] + "->" + U.ShowParams[e];
            a.push(_);
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), U.Desc, ...a);
        }
      }
    }
  }
}
exports.FishingNormalTechViewLevelUpItem = FishingNormalTechViewLevelUpItem;
//# sourceMappingURL=FishingNormalTechViewLevelUpItem.js.map