"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById");
const ExchangeRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ExchangeRewardById");
const LordGymEntranceGroupByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/LordGymEntranceGroupByMarkId");
const LordGymEntranceSetByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/LordGymEntranceSetByMarkId");
const MonsterInfoById_1 = require("../../../../../Core/Define/ConfigQuery/MonsterInfoById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelPlay_1 = require("../../../LevelPlay/LevelPlay");
const MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapController_1 = require("../../WorldMapController");
const SceneGameplayTipGrid_1 = require("../SceneGameplayPanel/SceneGameplayTipGrid");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const LordGymDifficultyStateItem_1 = require("./LordGymDifficultyStateItem");
class LordGymPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.lql = false;
    this.Ymt = undefined;
    this.u2o = undefined;
    this.O2o = undefined;
    this.k2o = undefined;
    this.F2o = undefined;
    this.V2o = undefined;
    this.H2o = undefined;
    this.j2o = false;
    this.OnCreateDifficultyItem = () => new DifficultyItem();
    this.OnDetailBtnClick = () => {
      var e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(this.Ymt.Id);
      if (e.IsOccupied) {
        e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e.QuestId);
        UiManager_1.UiManager.OpenView("QuestView", e.TreeConfigId);
      }
    };
  }
  GetResourceId() {
    return "UiView_InstanceEntranceTip_Prefab_2";
  }
  OnStart() {
    this.H2o = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(16), this.OnCreateDifficultyItem);
    this.H2o.SetActive(true);
    super.OnStart();
  }
  OnBeforeDestroy() {
    this.H2o.ClearChildren();
    if (this.O2o) {
      this.AddChild(this.O2o);
      this.O2o = undefined;
    }
    if (this.k2o) {
      this.AddChild(this.k2o);
      this.k2o = undefined;
    }
    this.F2o = undefined;
    this.V2o = undefined;
    super.OnBeforeDestroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetVerticalLayout(5).RootUIComp.SetUIActive(false);
    this.GetVerticalLayout(16).RootUIComp.SetUIActive(true);
    this.GetItem(32).SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.lql = e.IsNewLordGym();
    this.u2o = e;
    this.LayoutContext.MarkItem = e;
    this.Ymt = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(e.MarkConfig.RelativeId);
    if (!this.Ymt) {
      this.Ymt = new LevelPlay_1.LevelPlayInfo(e.MarkConfig.RelativeId);
      this.Ymt.InitConfig();
    }
    this.SHe();
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
    WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
  }
  SHe() {
    var e = this.u2o.MarkConfigId;
    if (ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)) {
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(this.LayoutContext);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(this.LayoutContext);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
      var r = LordGymEntranceGroupByMarkId_1.configLordGymEntranceGroupByMarkId.GetConfigList(this.u2o.MarkId);
      var i = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(this.Ymt.Id)?.LevelPlayRewardConfig;
      if (this.lql) {
        var t = LordGymEntranceSetByMarkId_1.configLordGymEntranceSetByMarkId.GetConfig(this.u2o.MarkId);
        var a = r.length;
        var o = new Array(a);
        for (let e = 0; e < a; e++) {
          var s = r[e].LordGymList;
          var n = s.length;
          var d = new Array(n);
          let i = "";
          for (let r = 0; r < n; r++) {
            var l = s[r];
            if (r === 0) {
              h = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(l).MonsterList;
              h = MonsterInfoById_1.configMonsterInfoById.GetConfig(h[0]);
              i = h.Name;
            }
            var h = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(l);
            var _ = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(l);
            var l = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(l);
            let e = 0;
            if (_) {
              e = 2;
            } else if (l && h) {
              e = 1;
            }
            d[r] = e;
          }
          var y = {
            NameTextId: i,
            StateList: d
          };
          o[e] = y;
        }
        this.H2o.RefreshByData(o);
        this.F2o = ExchangeRewardById_1.configExchangeRewardById.GetConfig(t.PreviewRewardId);
      } else {
        var t = r[0];
        var M = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceLordList(t.Id);
        var t = ModelManager_1.ModelManager.LordGymModel.GetMaxDifficultyLordGymEntranceCanFight(t.Id) ?? 1;
        this.F2o = ExchangeRewardById_1.configExchangeRewardById.GetConfig(i.RewardConfig[t - 1].RewardId);
        this.V2o = this.Ymt.FirstRewardId ? ExchangeRewardById_1.configExchangeRewardById.GetConfig(this.Ymt.FirstRewardId) : undefined;
        var i = M[t - 1];
        this.j2o = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(i);
        var u = M.length;
        var g = new Array(u);
        for (let r = 0; r < u; r++) {
          var c = M[r];
          var p = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(c);
          var L = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(c);
          var f = ModelManager_1.ModelManager.LordGymModel.GetLordGymIsFinish(c);
          var c = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(c);
          let e = 0;
          if (f) {
            e = 2;
          } else if (c && L) {
            e = 1;
          }
          f = {
            NameTextId: "LordGymDifficulty",
            NameTextArg: [p.Difficulty],
            StateList: [e]
          };
          g[r] = f;
        }
        this.H2o.RefreshByData(g);
      }
      this.xHl();
      this.InitRewards();
      this.W2o();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 17, "缺少标记配置", ["MarkId", e]);
    }
  }
  xHl() {
    let e = false;
    let r = false;
    let i = false;
    var t;
    if (this.lql) {
      t = ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(this.u2o.MarkId).ShowFlag !== Protocol_1.Aki.Protocol.U5s.Proto_ShowDisable;
      i = t;
      e = MarkUiUtils_1.MarkUiUtils.IsShowGoto(this.u2o);
      r = !e;
    } else {
      t = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(this.Ymt.Id);
      e = !t.IsOccupied;
    }
    this.ConfirmButton.SetActive(r);
    this.ConfirmButton.SetEnableClick(i);
    this.UpdateQuickGotoActive(e);
  }
  W2o() {
    var e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(this.Ymt.Id);
    this.GetItem(12).SetUIActive(e.IsOccupied);
    if (e.IsOccupied) {
      e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e.QuestId);
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.TreeConfigId);
      e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Quest_Require_Note") ?? "", e.Name);
      this.GetText(13).SetText(e);
    }
  }
  InitRewards() {
    if (!this.O2o) {
      r = this.GetItem(8).GetOwner();
      e = this.GetVerticalLayout(7).RootUIComp;
      this.k2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid();
      this.k2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(r, e));
      this.O2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid();
      this.O2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(r, e));
    }
    var e;
    var r = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    if (this.lql) {
      this.k2o?.SetActive(false);
      this.K2o(this.O2o, this.F2o, r, "NewLordGymPassReward", false);
    } else {
      if (this.Ymt.IsFirstPass) {
        this.K2o(this.k2o, undefined, 0, "", this.j2o);
      } else {
        this.K2o(this.k2o, this.V2o, r, "FirstPassReward");
      }
      this.K2o(this.O2o, this.F2o, r, "FirstPassReward", this.j2o);
    }
  }
  K2o(e, t, a, r, o = false) {
    if (t) {
      var s = t.PreviewReward;
      let i = undefined;
      if (s.has(a)) {
        i = s.get(a).MapIntInt;
      } else {
        for (let e = a - 1; e >= 0; e--) {
          if (s.has(e)) {
            i = s.get(e).MapIntInt;
            break;
          }
        }
      }
      if (!i) {
        var n;
        var d = t.RewardId;
        let r = 0;
        if (d.has(a)) {
          r = d.get(a);
        } else {
          for (let e = a - 1; e >= 0; e--) {
            if (d.has(e)) {
              r = d.get(e);
              break;
            }
          }
        }
        if (r && r > 0) {
          if (n = DropPackageById_1.configDropPackageById.GetConfig(r)) {
            i = n.DropPreview;
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneGameplay", 17, "兑换奖励表配置的掉落ID读取不到掉落奖励", ["兑换奖励ID", t.Id]);
          }
        }
      }
      if (i) {
        e.Refresh(i, r, true, o);
        e.SetActive(true);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneGameplay", 17, "读取不到奖励配置", ["兑换奖励ID", t.Id], ["WorldLevel", a]);
        }
        e.SetActive(false);
      }
    } else {
      e.SetActive(false);
    }
  }
  HandleTeleportAndTrack() {
    var e = this.LayoutContext.MarkItem;
    if (!e.IsLocked && this.lql) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 43, "[地图系统]CommonGamePlayPanel->传送", ["markId", e.MarkId], ["IsTracked", e.IsTracked]);
      }
      WorldMapController_1.WorldMapController.TryTeleport(e.MarkConfigId);
    } else {
      this.HandleTrack();
    }
  }
}
exports.LordGymPanel = LordGymPanel;
class DifficultyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.hql = undefined;
    this._ql = () => new LordGymDifficultyStateItem_1.LordGymDifficultyStateItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIHorizontalLayout], [5, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(false);
    this.hql = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this._ql, this.GetItem(5).GetOwner());
  }
  Refresh(e, r, i) {
    if (e.NameTextArg) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.NameTextId, ...e.NameTextArg);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.NameTextId);
    }
    this.hql?.RefreshByData(e.StateList);
  }
  GetKey(e, r) {
    return this.GridIndex;
  }
}
//# sourceMappingURL=LordGymPanel.js.map