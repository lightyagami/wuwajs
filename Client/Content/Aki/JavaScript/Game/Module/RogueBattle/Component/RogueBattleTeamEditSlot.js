"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTeamEditSlot = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattleDefine_1 = require("../RogueBattleDefine");
const RogueBattleTeamEditFetterIconItem_1 = require("./RogueBattleTeamEditFetterIconItem");
const RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleTeamEditSlot extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.SPe = undefined;
    this.ConfigId = 0;
    this.Index = 0;
    this.ElementItem = undefined;
    this.FetterLayout = undefined;
    this.OnClickCallBack = undefined;
    this.rV_ = () => {
      this.OnClickCallBack?.(this.Index);
    };
    this.BNe = () => {
      var e = this.Index === 0;
      var t = ModelManager_1.ModelManager.RogueBattleModel.GetRogueResNewRoleFlag();
      this.GetItem(10).SetUIActive(e && t);
    };
    this.Index = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIVerticalLayout], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.rV_]];
  }
  async OnBeforeStartAsync() {
    this.ElementItem = new RogueBattleTokenElement_1.RogueBattleTokenElement();
    await this.ElementItem.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.FetterLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), () => new RogueBattleTeamEditFetterIconItem_1.RogueBattleTeamEditFetterIconItem());
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResNewRoleFlagChange, this.BNe);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResNewRoleFlagChange, this.BNe);
  }
  UpdateRoleInfo(e, t) {
    const s = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(t);
    this.BNe();
    this.GetText(6).SetText((this.Index + 1).toString());
    if (e === 0) {
      this.GetItem(1)?.SetUIActive(false);
      this.djc(e);
      this.ConfigId = e;
    } else {
      this.GetItem(1)?.SetUIActive(true);
      t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
      const o = t.GetRoleConfig();
      var i = ModelManager_1.ModelManager.RogueBattleModel.GetIncIdByRoleId(e);
      var i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(i);
      var a = t.GetRoleSkinId();
      var n = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(a);
      if (o) {
        const r = this.GetTexture(2);
        if (n) {
          this.SetRoleSkinIcon(n.FormationRoleCard, r, a, undefined, () => {
            r.SetAlpha(1);
          });
        } else {
          this.SetRoleIcon(o.FormationRoleCard, r, e, undefined, () => {
            r.SetAlpha(1);
          });
        }
        this.ElementItem?.Refresh(o.ElementId, false, 0);
        this.GetText(3).SetText(t.GetName());
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RogueRes_FightFormation_RoleLevel", ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleLevel());
        this.GetText(9).SetText(i.F6n.toString());
        n = new UiAsyncTask_1.UiAsyncTask("RogueBattleTeamEditSlot.UpdateRoleInfo", async () => {
          var e = [];
          var t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(o.Id);
          if (t) {
            var i = [];
            for (const n of t.BondIds) {
              var a = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(n);
              i.push({
                OldRoleBondInfo: a,
                NewRoleBondInfo: a,
                AddStar: 0
              });
            }
            i.sort(RogueBattleDefine_1.sortRogueBattleRoleBondUpdateInfo);
            e.push(this.FetterLayout.RefreshByDataAsync(i));
          }
          await Promise.all(e);
          t = s.On1;
          if (t) {
            this.FetterLayout.GetLayoutItemByKey(t)?.SetLinkEffectOn(true);
          }
        });
        this.RunAsyncTask(n);
        this.djc(e);
        this.ConfigId = e;
      }
    }
  }
  djc(e) {
    if (this.ConfigId !== e) {
      if (e === 0) {
        this.SPe?.StopSequenceByKey("PlayerIn", false, false);
        if (this.SPe?.IsPlayingSequence("PlayerOut")) {
          this.SPe?.ReplaySequenceByKey("PlayerOut");
        } else {
          this.SPe?.PlayLevelSequenceByName("PlayerOut");
        }
      } else {
        this.SPe?.StopSequenceByKey("PlayerOut", false, false);
        if (this.SPe?.IsPlayingSequence("PlayerIn")) {
          this.SPe?.ReplaySequenceByKey("PlayerIn");
        } else {
          this.SPe?.PlayLevelSequenceByName("PlayerIn");
        }
      }
    }
  }
}
exports.RogueBattleTeamEditSlot = RogueBattleTeamEditSlot;
//# sourceMappingURL=RogueBattleTeamEditSlot.js.map