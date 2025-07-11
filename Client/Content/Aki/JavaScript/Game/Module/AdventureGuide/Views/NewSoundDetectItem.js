"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundDetectItem = exports.NewSoundDetectItemData = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ConditionGroupData_1 = require("../../Activity/ConditionGroupData");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const NewSoundDetectRewardItem_1 = require("./NewSoundDetectRewardItem");
const NewSoundLordItem_1 = require("./NewSoundLordItem");
const NewSoundNormalItem_1 = require("./NewSoundNormalItem");
const NewSoundTeachItem_1 = require("./NewSoundTeachItem");
const NewSoundTowerItem_1 = require("./NewSoundTowerItem");
const NewSoundWeeklyRogueItem_1 = require("./NewSoundWeeklyRogueItem");
class NewSoundDetectItemData {
  constructor() {
    this.DetectRecordData = undefined;
    this.TracingList = undefined;
  }
}
exports.NewSoundDetectItemData = NewSoundDetectItemData;
class NewSoundDetectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.T8e = undefined;
    this.Pe = undefined;
    this.ZAt = undefined;
    this.L8e = undefined;
    this.D8e = undefined;
    this.R8e = undefined;
    this.U8e = undefined;
    this.A8e = undefined;
    this.Z4_ = undefined;
    this.oO_ = undefined;
    this.YVe = () => {
      return new NewSoundDetectRewardItem_1.NewSoundDetectRewardItem();
    };
    this.P8e = () => {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("DungeonDetection");
      } else if (this.Pe.Conf?.Secondary === 6 || this.Pe.Conf?.Secondary === 62) {
        const r = this.Pe.Conf.SubDungeonId;
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94);
        var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.Pe.Conf.Name);
        e.SetTextArgs(t);
        e.FunctionMap.set(2, () => {
          var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r).FightFormationId;
          var e = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e)?.AutoRole;
          if ((e?.length ?? 0) > 0) {
            var t = new Array();
            for (const o of e) {
              t.push(ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(o));
            }
            e = {
              Kah: this.Pe.Conf.Id
            };
            ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Vah = e;
            InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(r, t, 0, 0);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Role", 5, "未配置出战人物");
          }
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        if (this.Pe.Conf.Secondary === 29) {
          if (t = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData) {
            e = {
              MarkId: t.GetCycleConfig().MapMark,
              MarkType: 6
            };
            UiManager_1.UiManager.OpenView("WorldMapView", e);
            return;
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("WeeklyRogue", 34, "点击周常肉鸽追踪 活动数据为空");
            }
            return;
          }
        }
        if (this.Pe.Type === 0) {
          this.iql();
        } else {
          this.rql();
        }
      }
    };
    this.x8e = e => {
      var t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(this.Pe.Conf.ShowRewardMap, e);
      var o = ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionFinished(this.Pe);
      var r = new Array();
      for (const n of t.keys()) {
        var i = [{
          IncId: 0,
          ItemId: n
        }, t.get(n)];
        r.push({
          ItemData: i,
          HaveFinish: o
        });
      }
      this.T8e.RefreshByData(r, this.w8e);
    };
    this.w8e = () => {
      this.T8e?.ScrollToLeft(0);
    };
    this.ru_ = () => {
      var t = [];
      for (const n of ConfigManager_1.ConfigManager.ConditionConfig.GetGroupConditionIds(this.Pe.Conf.LockCon)) {
        var o;
        var r = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(n);
        let e = -1;
        if (r.AccessId) {
          o = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(r.AccessId);
          e = o.SkipName;
        }
        const i = {
          ConditionId: n,
          ConditionTextId: r.Description,
          IsFinished: false,
          AccessId: r.AccessId,
          AccessType: e
        };
        t.push(i);
      }
      const i = new ConditionGroupData_1.ConditionGroupData(this.Pe.Conf.LockCon, t);
      UiManager_1.UiManager.OpenView("CommonConditionView", i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [0, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent]];
    this.BtnBindInfo = [[12, this.ru_]];
  }
  async OnBeforeStartAsync() {
    this.ZAt = new ButtonItem_1.ButtonItem();
    await this.ZAt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.ZAt.SetFunction(this.P8e);
    this.oO_ = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.YVe);
    this.D8e = new NewSoundLordItem_1.NewSoundLordItem();
    this.R8e = new NewSoundNormalItem_1.NewSoundNormalItem();
    this.U8e = new NewSoundTeachItem_1.NewSoundTeachItem();
    this.A8e = new NewSoundTowerItem_1.NewSoundTowerItem();
    this.Z4_ = new NewSoundWeeklyRogueItem_1.NewSoundWeeklyRogueItem();
    await Promise.all([this.D8e.CreateByActorAsync(this.GetItem(2).GetOwner()), this.R8e.CreateByActorAsync(this.GetItem(5).GetOwner()), this.U8e.CreateByActorAsync(this.GetItem(4).GetOwner()), this.A8e.CreateByActorAsync(this.GetItem(3).GetOwner()), this.Z4_.CreateByActorAsync(this.GetItem(10).GetOwner())]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NewSoundAreaRefreshReward, this.x8e);
  }
  nO_(e) {
    if (e.TracingList?.includes(e.DetectRecordData.Conf.Id) ?? false) {
      this.oO_?.PlayLevelSequenceByName("Track");
    }
  }
  Refresh(e, t, o) {
    const r = e.DetectRecordData;
    this.Pe = r;
    this.L8e?.SetUiActive(false);
    var i = r.Conf.Secondary;
    switch (i) {
      case 61:
        this.D8e?.SetUiActive(true);
        this.L8e = this.D8e;
        break;
      case 28:
      case 5:
        this.A8e?.SetUiActive(true);
        this.L8e = this.A8e;
        break;
      case 6:
        this.U8e?.SetUiActive(true);
        this.L8e = this.U8e;
        break;
      case 29:
        this.Z4_?.SetUiActive(true);
        this.L8e = this.Z4_;
        break;
      default:
        this.R8e?.SetUiActive(true);
        this.L8e = this.R8e;
    }
    this.L8e?.Update(e);
    var n = ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionPreOpen(r);
    var a = n || !r.IsLock;
    var s = ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionNewContentOpen(r);
    this.GetItem(9).SetUIActive(n);
    this.ZAt?.SetUiActive(a);
    if (this.Pe.Conf.Secondary === 63) {
      this.GetItem(6).SetUIActive(false);
      this.GetItem(11).SetUIActive(!a);
    } else {
      this.GetItem(6).SetUIActive(!a);
      this.GetItem(11).SetUIActive(false);
    }
    var a = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleTutorialNew) ?? new Map();
    if (i === 6) {
      i = !a.get(r.Conf.Id);
      this.GetItem(7).SetUIActive(i);
      if (i) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "New_corner");
      }
    } else {
      a = !n && s;
      this.GetItem(7).SetUIActive(a);
      if (a) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), r.Conf.NewContent);
      }
    }
    let l = 0;
    if (r.Type === 0) {
      i = r.Conf;
      if (i.SubDungeonId && !ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i.SubDungeonId) && r.Conf.Secondary === 6) {
        return;
      }
    } else {
      n = r.Conf;
      if (r.Conf.Secondary === 61) {
        l = n.AdditionalId;
      }
    }
    let h = 0;
    if (l) {
      s = ModelManager_1.ModelManager.LordGymModel.GetHasFinishLord(l);
      h = s + 1;
    }
    h = h !== 0 ? h : ModelManager_1.ModelManager.AdventureGuideModel.CurrentShowLevel;
    var d = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(r.Conf.ShowRewardMap, h);
    var _ = ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionFinished(this.Pe);
    var u = new Array();
    for (const g of d.keys()) {
      const r = {
        ItemData: [{
          IncId: 0,
          ItemId: g
        }, d.get(g)],
        HaveFinish: _
      };
      u.push(r);
    }
    this.T8e.RefreshByData(u, this.w8e);
    this.nO_(e);
  }
  iql() {
    var e;
    var t;
    if (ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionPreOpen(this.Pe)) {
      this.oql();
    } else {
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(this.Pe.Conf.Id);
      t = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e.Conf.DungeonId);
      if (ControllerHolder_1.ControllerHolder.AdventureGuideController.IsMarkUnlock(t.MarkId)) {
        ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
        ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(e.Conf.Secondary !== 2 ? Protocol_1.Aki.Protocol.r8n.xPu : Protocol_1.Aki.Protocol.r8n.Proto_SilentArea, [e.Conf.DungeonId], this.Pe.Conf.Id);
      }
    }
  }
  oql() {
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("CantUseInMultiplayerMode");
    } else {
      let e = false;
      var t = ModelManager_1.ModelManager.AdventureGuideModel.GetPreOpenDetectionConf(this.Pe.Conf.Id, this.Pe.Type, this.Pe.Conf.PreOpenId);
      if (e = t ? t.Spoiler : e) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(238)).FunctionMap.set(2, () => {
          this.nql();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        this.nql();
      }
    }
  }
  rql() {
    var e;
    if (ModelManager_1.ModelManager.AdventureGuideModel.IsDetectionPreOpen(this.Pe)) {
      this.oql();
    } else {
      e = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(this.Pe.Conf.Id);
      if (ControllerHolder_1.ControllerHolder.AdventureGuideController.IsMarkUnlock(e.Conf.MarkId)) {
        ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
        ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.Proto_SilentArea, e.Conf.LevelPlayList, this.Pe.Conf.Id);
      }
    }
  }
  nql() {
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetPreOpenDetectionConf(this.Pe.Conf.Id, this.Pe.Type, this.Pe.Conf.PreOpenId);
    var t = e.TeleportEntityId;
    if (t) {
      WorldMapController_1.WorldMapController.TryTeleport(t);
    } else {
      t = e.DungeonEntranceId;
      if (t) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(t);
      } else {
        t = e.InstanceID;
        if (t) {
          var o = {
            v9n: e.Id
          };
          ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.m1c = o;
          var r = [];
          for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
            r.push(i.GetConfigId);
          }
          InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(t, r, 0, 0);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AdventureGuide", 63, "未配置预开放检测的传送点或副本入口", ["detectionId", this.Pe.Conf.Id], ["preOpenDetectionId", e?.Id]);
        }
      }
    }
  }
  OnBeforeDestroy() {
    this.D8e?.Destroy();
    this.R8e?.Destroy();
    this.U8e?.Destroy();
    this.A8e?.Destroy();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NewSoundAreaRefreshReward, this.x8e);
  }
}
exports.NewSoundDetectItem = NewSoundDetectItem;
//# sourceMappingURL=NewSoundDetectItem.js.map