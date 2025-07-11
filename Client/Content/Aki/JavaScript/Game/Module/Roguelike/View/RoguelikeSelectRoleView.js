"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeSelectRoleData = exports.RoguelikeSelectRoleBaseGrid = exports.RoguelikeSelectRoleGrid = exports.RogueRoleSelectionItemGrid = exports.RogueAddLevelComponent = exports.RoguelikeSelectRoleView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent");
const HelpController_1 = require("../../Help/HelpController");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const RoleController_1 = require("../../RoleUi/RoleController");
const RoleDataBase_1 = require("../../RoleUi/RoleData/RoleDataBase");
const RoleDefine_1 = require("../../RoleUi/RoleDefine");
const RoleInstance_1 = require("../../RoleUi/View/ViewData/RoleInstance");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeSelectRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.DynamicScrollViewComponent = undefined;
    this.Jho = undefined;
    this.zho = [];
    this.ShowRoleList = [];
    this.yDn = [];
    this.NUe = 0;
    this.IDn = undefined;
    this.WJs = 1;
    this.xVi = undefined;
    this.vNt = undefined;
    this.Zho = undefined;
    this.dya = 0;
    this.Cya = 0;
    this.UQ = 0;
    this.KUa = true;
    this.Upl = [];
    this.Dpl = [];
    this.Gua = (t, e, i) => {
      if (!this.KUa) {
        this.DynamicScrollViewComponent.GetScrollItemItems().forEach(e => {
          if (e.Data?.Type === 1) {
            e.Data.RoleIdList = t;
            e.RefreshData();
          }
        });
      }
    };
    this.Bqe = (e, t, i) => {
      e = new RoguelikeSelectRoleGrid(e);
      e.BindSelectRoleCallBack(this.TDn);
      return e;
    };
    this.TDn = (e, t) => {
      this.IDn = e;
      var i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(this.NUe, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
      var o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe);
      var o = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(o.FightFormationId);
      var s = this.dya > 0 && this.dya > e.GetLevelData().GetLevel() ? this.dya : e.GetLevelData().GetLevel();
      var r = e.GetDataId();
      var n = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(r) !== undefined;
      var o = o.LimitRole.includes(r);
      var s = s < i && o && n;
      var i = r > RoleDefine_1.ROBOT_DATA_MIN_ID || o && n;
      var r = (n ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(e.GetDataId()).GetLevel() : 0) < this.Cya && !e.IsTrialRole() && n && o;
      var e = e.GetLevelData().GetLevel() < this.dya && !e.IsTrialRole() && n && o;
      this.GetItem(9).SetUIActive(s);
      this.GetButton(10).RootUIComp.SetUIActive(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "Text_RoleAddLevel_Text", this.dya);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "Text_WeaponAddLevel_Text", this.Cya);
      this.GetText(15).SetUIActive(r);
      this.GetText(14).SetUIActive(e);
      this.GetItem(13).SetUIActive(e || r);
    };
    this.tlo = () => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep();
      this.CloseMe();
    };
    this.ilo = () => {
      var e = this.OpenParam;
      var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e.FightFormationId).LimitRole.includes(this.IDn.GetRoleId())) {
        if (ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.IDn.GetDataId())) {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Rogue_Dont_Have_Role");
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Roguelike_SelectRole_CannotUse");
      }
    };
    this.olo = e => {
      let t = RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE;
      for (const s of this.Zho.BHn = e) {
        var i = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntriesById(s);
        if (i) {
          t += i.Rate;
        }
      }
      let o = UE.Color.FromHex("adadad");
      if (t > RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE) {
        o = UE.Color.FromHex("c25757");
      } else if (t < RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE) {
        o = UE.Color.FromHex("36cd33");
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Rogue_Entry_Multiple", t / 100);
      this.GetText(11)?.SetColor(o);
    };
    this.rlo = () => {
      UiManager_1.UiManager.OpenView("RoguelikeInstanceEntrySelectView", this.Zho);
    };
    this.nlo = () => {
      if (this.WJs === 2) {
        RoleController_1.RoleController.OpenRoleMainView(1, 0, [this.IDn.GetDataId()]);
      } else {
        RoleController_1.RoleController.OpenRoleMainView(0, 0, [this.IDn.GetDataId()]);
      }
    };
    this.JGn = () => {
      HelpController_1.HelpController.OpenHelpById(RoguelikeDefine_1.ROGUELIKE_HELP_ID);
    };
  }
  OnBeforeCreate() {
    this.xVi = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(8);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIDynScrollViewComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIText]];
    this.BtnBindInfo = [[1, this.tlo], [2, this.ilo], [8, this.rlo], [10, this.nlo], [12, this.JGn]];
  }
  async OnBeforeStartAsync() {
    this.NUe = this.OpenParam;
    await Promise.all([e = await RoguelikeController_1.RoguelikeController.RoguelikePopularEntriesInfoRequest(this.NUe), t = await RoguelikeController_1.RoguelikeController.RoguelikeTrialRoleInfoRequest([this.NUe])]);
    this.dya = t.Ebs;
    this.Cya = t.Cjn;
    this.UQ = t.wJs;
    this.yDn = t.gL_[0].Rqs;
    this.Upl = t.gL_[0].C5n;
    this.Dpl = t.gL_[0].pL_;
    this.Zho = e.sqs;
    this.olo(e.sqs.BHn);
    this.Jho = new RoguelikeSelectRoleBaseGrid();
    this.DynamicScrollViewComponent = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(3), this.GetItem(4), this.Jho, this.Bqe);
    await this.DynamicScrollViewComponent.Init();
    var e;
    var t = this.ITn();
    this.GetButton(8)?.GetRootComponent()?.SetUIActive(t);
    if (t) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeHasSelectEntryAndShow);
    }
    this.vNt = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(5), this.Gua);
  }
  OnStart() {
    RoguelikeSelectRoleGrid.CurSelectRoleItem = undefined;
    RoguelikeSelectRoleGrid.CurSelectRoleId = 0;
    this.InitRoleList();
    this.KUa = false;
  }
  OnBeforeShow() {
    UiSceneManager_1.UiSceneManager.SetSceneFloorReflection(true, false);
  }
  InitRoleList() {
    var e = this.OpenParam;
    var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    const s = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e.FightFormationId);
    e = this.GetTrailRoleInstanceList(this.yDn);
    if (e.length > 0) {
      this.zho.push(new RoguelikeSelectRoleData(0, e, this.dya, this.Cya, this.UQ, s.LimitRole));
    }
    const r = s.LimitRole;
    const i = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewShowRoleList = this.Upl;
    ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewRecommendRoleList = s.RecommendFormation;
    const o = [];
    this.Upl.forEach(t => {
      if (!ModelManager_1.ModelManager.RoleModel.IsMainRole(t) || !!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t)) {
        if (i.find(e => e.GetRoleId() === t) !== undefined) {
          o.push(i.find(e => e.GetRoleId() === t));
        } else {
          o.push(new RoleInstance_1.RoleInstance(t));
        }
      }
    });
    const n = [];
    this.Dpl.forEach(t => {
      if (i.find(e => e.GetRoleId() === t) !== undefined) {
        n.push(i.find(e => e.GetRoleId() === t));
      } else {
        n.push(new RoleInstance_1.RoleInstance(t));
      }
    });
    e = (e, t) => {
      var i;
      var o = r.includes(e.GetRoleId()) && e.GetLevelData().GetLevel() !== 0;
      if (o !== (r.includes(t.GetRoleId()) && t.GetLevelData().GetLevel() !== 0) || (o = s.RecommendFormation.includes(e.GetRoleId())) !== s.RecommendFormation.includes(t.GetRoleId())) {
        if (o) {
          return -1;
        } else {
          return 1;
        }
      } else if ((o = e.GetLevelData().GetLevel()) !== (i = t.GetLevelData().GetLevel())) {
        if (i < o) {
          return -1;
        } else {
          return 1;
        }
      } else if ((i = e.GetRoleConfig().QualityId) !== (o = t.GetRoleConfig().QualityId)) {
        if (o < i) {
          return -1;
        } else {
          return 1;
        }
      } else {
        o = e.GetRoleId();
        if ((i = t.GetRoleId()) < o) {
          return -1;
        } else if (o < i) {
          return 1;
        } else {
          return 0;
        }
      }
    };
    n.sort(e);
    o.sort(e);
    this.zho.push(new RoguelikeSelectRoleData(1, o, this.dya, this.Cya, this.UQ, r, s.RecommendFormation));
    this.zho.push(new RoguelikeSelectRoleData(2, n, this.dya, this.Cya, this.UQ, r, s.RecommendFormation));
    if (o.length > 0) {
      this.IDn = o[0];
      this.WJs = 1;
    } else if (n.length > 0) {
      this.IDn = n[0];
      this.WJs = 2;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Roguelike", 58, "RoguelikeSelectRoleView没有角色数据");
    }
    this.DynamicScrollViewComponent.RefreshByData(this.zho);
    this.vNt?.UpdateData(34, o);
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.xVi);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoguelikePopularEntriesChange, this.olo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoguelikePopularEntriesChange, this.olo);
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor().Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
    RoleController_1.RoleController.OnSelectedRoleChangeByConfig(this.IDn.GetRoleId(), -1);
    this.TDn(this.IDn, this.WJs);
  }
  GetTrailRoleInstanceList(e) {
    const t = [];
    e.forEach(e => {
      e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(e));
      if (e !== undefined) {
        t.push(e);
      }
    });
    return t;
  }
  ITn() {
    for (const e of ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntries()) {
      if (e.Insts.includes(this.Zho.r6n)) {
        return true;
      }
    }
    return false;
  }
}
exports.RoguelikeSelectRoleView = RoguelikeSelectRoleView;
class RogueAddLevelComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  GetResourceId() {
    return "UiItem_ItemRogueRoleType";
  }
  OnRefresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_LevelShow_Text", e);
  }
}
exports.RogueAddLevelComponent = RogueAddLevelComponent;
class RogueRoleSelectionItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, t, i) {
    var o = e.GetDataId();
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(o, {
      ParamType: 0
    }) !== undefined;
    var o = {
      Type: 2,
      Data: e,
      ItemConfigId: e.GetRoleId(),
      SkinId: e.GetRoleSkinId(),
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [e.GetLevelData().GetLevel()],
      IsInTeam: o,
      ElementId: e.GetRoleConfig().ElementId,
      IsTrialRoleVisible: e.IsTrialRole(),
      IsNewVisible: e.GetIsNew()
    };
    this.Apply(o);
    this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(true);
    this.SetNewVisible(false);
    if (this.Data instanceof RoleDataBase_1.RoleDataBase) {
      this.Data.TryRemoveNewFlag();
    }
  }
  SetAddLevelComponent(e, t, i) {
    var o = this.Data.GetLevelData().GetLevel();
    var o = Math.max(o, e);
    var e = this.RefreshComponent(RogueAddLevelComponent, true, o);
    this.SetComponentVisible(e, i);
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
}
exports.RogueRoleSelectionItemGrid = RogueRoleSelectionItemGrid;
class RoguelikeSelectRoleGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.RoleItemList = [];
    this.Data = undefined;
    this.LDn = undefined;
    this.slo = e => {
      var t;
      if (e.State === 0 && ((t = e.Data).IsTrialRole() ? ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList = [t.GetDataId()] : ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList = [t.GetRoleId()], RoguelikeSelectRoleGrid.CurSelectRoleItem && RoguelikeSelectRoleGrid.CurSelectRoleItem.SetSelected(false, false), RoguelikeSelectRoleGrid.CurSelectRoleItem = e.MediumItemGrid, RoguelikeSelectRoleGrid.CurSelectRoleId = t.GetDataId(), RoleController_1.RoleController.OnSelectedRoleChangeByConfig(t.GetDataId(), t.GetRoleSkinId()), this.LDn)) {
        this.LDn(t, this.Data.Type);
      }
    };
    this.Data = e;
  }
  BindSelectRoleCallBack(e) {
    this.LDn = e;
  }
  GetUsingItem(e) {
    return this.GetRootItem().GetOwner();
  }
  Update(e, t) {
    this.Data = e;
    this.RefreshData();
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async RefreshData() {
    var t;
    var i;
    var o;
    var s = (e, t) => {
      var i = this.Data.LimitRoleList.length > 0 && !this.Data.LimitRoleList.includes(t.GetRoleId()) || t.GetLevelData().GetLevel() === 0;
      var o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t.GetDataId()) !== undefined;
      var s = this.Data.LimitRoleList.includes(t.GetDataId());
      var r = (o ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(t.GetDataId()).GetLevel() : 0) < this.Data.AddWeaponLevel && !t.IsTrialRole() && o && s;
      var o = t.GetLevelData().GetLevel() < this.Data.AddRoleLevel && !t.IsTrialRole() && o && s;
      var s = {
        Type: 2,
        Data: t,
        ItemConfigId: t.GetRoleId(),
        SkinId: t.GetRoleSkinId(),
        BottomTextId: !o && !r || i || t.IsTrialRole() ? t.GetLevelData().GetLevel() !== 0 ? "Text_LevelShow_Text" : "Text_Role_Not_Have" : "",
        BottomTextParameter: [t.GetLevelData().GetLevel()],
        ElementId: t.GetRoleConfig().ElementId,
        IsTrialRoleVisible: t.IsTrialRole(),
        IsNewVisible: false,
        IsDisable: i,
        IsRecommendVisible: this.Data.RecommendedRoleList.includes(t.GetRoleId())
      };
      e.Apply(s);
      e.BindOnExtendToggleClicked(this.slo);
      e.SetSelected(RoguelikeSelectRoleGrid.CurSelectRoleId === t.GetDataId(), false);
      e?.SetAddLevelComponent(this.Data.AddRoleLevel, this.Data.MaxLevel, o || r);
    };
    for (let e = 0; e < this.Data.RoleIdList.length; e++) {
      if (this.RoleItemList.length <= e) {
        t = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(1));
        i = new RogueRoleSelectionItemGrid();
        o = this.Data?.RoleIdList[e];
        this.RoleItemList.push(i);
        await i.CreateThenShowByActorAsync(t.GetOwner());
        s(i, o);
        if (o.IsTrialRole() || RoguelikeSelectRoleGrid.CurSelectRoleItem !== undefined) {
          i.SetSelected(false, false);
        } else {
          RoguelikeSelectRoleGrid.CurSelectRoleItem = i;
          RoguelikeSelectRoleGrid.CurSelectRoleId = o.GetDataId();
          i.SetSelected(true, false);
          ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList = [o.GetRoleId()];
        }
      } else {
        s(this.RoleItemList[e], this.Data?.RoleIdList[e]);
      }
      this.RoleItemList[e].SetActive(true);
    }
    for (let e = this.Data.RoleIdList.length; e < this.RoleItemList.length; e++) {
      this.RoleItemList[e].SetActive(false);
    }
    this.GetItem(2).SetUIActive(false);
    switch (this.Data.Type) {
      case 1:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Rogue_juesexuanze_02");
        break;
      case 0:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Rogue_juesexuanze_01");
        break;
      case 2:
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Rogue_juesexuanze_03");
    }
  }
  ClearItem() {
    this.Destroy();
  }
}
(exports.RoguelikeSelectRoleGrid = RoguelikeSelectRoleGrid).CurSelectRoleItem = undefined;
RoguelikeSelectRoleGrid.CurSelectRoleId = 0;
class RoguelikeSelectRoleBaseGrid extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eqe = undefined;
  }
  GetItemSize(e) {
    if (this.eqe === undefined) {
      this.eqe = Vector2D_1.Vector2D.Create();
    }
    var t = this.GetRootItem();
    this.eqe.Set(t.GetWidth(), t.GetHeight());
    return this.eqe.ToUeVector2D(true);
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  ClearItem() {}
}
exports.RoguelikeSelectRoleBaseGrid = RoguelikeSelectRoleBaseGrid;
class RoguelikeSelectRoleData {
  constructor(e, t, i, o, s, r, n) {
    this.Type = 1;
    this.RoleIdList = [];
    this.LimitRoleList = [];
    this.RecommendedRoleList = [];
    this.AddRoleLevel = 0;
    this.AddWeaponLevel = 0;
    this.MaxLevel = 0;
    this.Type = e;
    this.RoleIdList = t;
    this.AddRoleLevel = i;
    this.AddWeaponLevel = o;
    this.MaxLevel = s;
    if (r) {
      this.LimitRoleList = r;
    }
    if (n) {
      this.RecommendedRoleList = n;
    }
  }
}
exports.RoguelikeSelectRoleData = RoguelikeSelectRoleData;
//# sourceMappingURL=RoguelikeSelectRoleView.js.map