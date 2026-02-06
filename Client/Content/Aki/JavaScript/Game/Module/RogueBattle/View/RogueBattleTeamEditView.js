"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTeamEditView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const FormationDragController_1 = require("../../EditFormation/FormationDragController");
const FormationRoleDragItem_1 = require("../../EditFormation/View/FormationRoleDragItem");
const MapRoguePanelFetter_1 = require("../../MapRogue/View/Components/MapRoguePanelFetter");
const SceneTeamDefine_1 = require("../../SceneTeam/SceneTeamDefine");
const RogueBattleLinkItem_1 = require("../Component/RogueBattleLinkItem");
const RogueBattleTeamEditSlot_1 = require("../Component/RogueBattleTeamEditSlot");
const RogueBattleTeamEditTab_1 = require("../Component/RogueBattleTeamEditTab");
const RogueBattleTeamRoleSelectView_1 = require("./RogueBattleTeamRoleSelectView");
const MAX_FORMATION_NUM = 1;
class RogueBattleTeamEditView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.PLu = undefined;
    this.Ivu = undefined;
    this.xLu = [];
    this.Ivt = undefined;
    this.wu1 = false;
    this.tM1 = undefined;
    this.BT1 = () => {
      var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
      if (e) {
        UiManager_1.UiManager.OpenView("RogueBattleEnvironmentBuffView", e.Data.Yr1?.Vy_);
      }
    };
    this.kT1 = () => {
      var e;
      if (!this.wu1) {
        e = new RogueBattleTeamRoleSelectView_1.RogueBattleTeamEditData(this.Ivt.GetSelectedIndex(), this.ULu);
        UiManager_1.UiManager.OpenView("RogueBattleTeamRoleSelectView", e);
      }
    };
    this.zo1 = e => {
      var t;
      if (!this.wu1) {
        t = new RogueBattleTeamRoleSelectView_1.RogueBattleTeamEditData(this.Ivt.GetSelectedIndex(), this.ULu);
        UiManager_1.UiManager.OpenView("RogueBattleTeamRoleSelectView", t);
      }
    };
    this.L1i = () => {
      var e = () => {
        if (!this.wu1) {
          this.GetItem(9).SetUIActive(true);
          this.tM1?.PlaySequencePurely("Progressing");
          const t = this.OpenParam;
          var e = new UiAsyncTask_1.UiAsyncTask("RogueBattleTeamEditView.OnClickBtnConfirm", async () => {
            this.wu1 = true;
            await ControllerHolder_1.ControllerHolder.RogueBattleController.SwitchFormationRequest(this.Ivt.GetSelectedIndex());
            await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
            ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(t);
          });
          this.RunAsyncTask(e);
        }
      };
      const t = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
      var i = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(this.Ivt.GetSelectedIndex());
      if (!t.NotTipsInactiveLink && i.On1 === 0 && ModelManager_1.ModelManager.RogueBattleModel.IsAnyBondLinkCanActivate()) {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(348)).HasToggle = true;
        i.ToggleTextKey = "RogueRes_LvlHint_Desc";
        i.FunctionMap.set(1, this.kT1);
        i.FunctionMap.set(2, e);
        i.SetToggleFunction(e => {
          t.NotTipsInactiveLink = e;
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      } else {
        e();
      }
    };
    this.pxu = () => !this.wu1;
    this.yqe = e => {
      e = EditFormationDefine_1.FORMATION_SPRITES[e];
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      e = new CommonTabData_1.CommonTabData(e, new CommonTabTitleData_1.CommonTabTitleData("RogueRes_TeamName"));
      e.SetSmallIcon(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TeamTitle"));
      return e;
    };
    this.l6c = i => {
      const o = ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(i);
      if (o) {
        this.xLu.forEach((e, t) => {
          if (t >= o.Q6n.length) {
            e.UpdateRoleInfo(0, i);
          } else {
            e.UpdateRoleInfo(o.Q6n[t], i);
          }
        });
      }
      this.Og();
    };
    this.ULu = async e => {
      var i = this.Ivt.GetSelectedIndex();
      var t = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(i);
      if (t.Q6n !== e) {
        await ControllerHolder_1.ControllerHolder.RogueBattleController.ChangeFormationAllListRequest(i, e);
        var o = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(i);
        let t = 0;
        for (let e = 0; e < o.Q6n.length; e++) {
          if (o.Q6n[e] !== 0) {
            this.xLu[t].UpdateRoleInfo(o.Q6n[e], i);
            t++;
          }
        }
        for (let e = t; e < this.xLu.length; e++) {
          this.xLu[e].UpdateRoleInfo(0, i);
        }
        this.Og();
      }
    };
    this.VLg = (i, o, a, r) => {
      const e = this.Ivt.GetSelectedIndex();
      var n = [];
      var s = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(e).Q6n;
      for (let t = 1; t < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; t++) {
        let e = s.length >= t ? s[t - 1] : 0;
        if (t === i) {
          e = a;
        }
        if (t === o) {
          e = r;
        }
        n.push(e);
      }
      ControllerHolder_1.ControllerHolder.RogueBattleController.ChangeFormationAllListRequest(e, n).then(() => {
        this.xLu[i - 1].UpdateRoleInfo(a, e);
        this.xLu[o - 1].UpdateRoleInfo(r, e);
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[3, this.L1i], [6, this.BT1]];
  }
  async OnBeforeStartAsync() {
    this.xLu = [new RogueBattleTeamEditSlot_1.RogueBattleTeamEditSlot(0), new RogueBattleTeamEditSlot_1.RogueBattleTeamEditSlot(1), new RogueBattleTeamEditSlot_1.RogueBattleTeamEditSlot(2)];
    this.xLu.forEach(e => {
      e.OnClickCallBack = this.zo1;
      e.OnPointDown = ControllerHolder_1.ControllerHolder.FormationDragController.OnFormationRoleViewPointDown;
      e.OnDragStart = ControllerHolder_1.ControllerHolder.FormationDragController.OnFormationRoleViewStartDrag;
      e.OnGamePadDown = ControllerHolder_1.ControllerHolder.FormationDragController.OnFormationRoleViewGamePadDown;
      e.OnDragMove = ControllerHolder_1.ControllerHolder.FormationDragController.OnFormationRoleViewMoveDrag;
      e.OnDragEnd = ControllerHolder_1.ControllerHolder.FormationDragController.OnFormationRoleViewEndDrag;
    });
    var e = new CommonTabComponentData_1.CommonTabComponentData(() => new RogueBattleTeamEditTab_1.RogueBattleTeamEditTab(), this.l6c, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(5), e, () => {});
    this.tM1 = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(9));
    this.PLu = new RogueBattleLinkItem_1.RogueBattleLinkItem();
    this.PLu.OnClickCallBack = this.kT1;
    this.Ivu = new MapRoguePanelFetter_1.MapRoguePanelFetter();
    this.Ivu.CheckCanOpenMenu = this.pxu;
    var e = new FormationRoleDragItem_1.FormationRoleDragItem();
    await Promise.all([this.xLu[0].CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.xLu[1].CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.xLu[2].CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.PLu.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.Ivu.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()), this.Ivt.RefreshTabItemByLengthAsync(MAX_FORMATION_NUM), e.CreateByActorAsync(this.GetItem(12).GetOwner())]);
    var t = new FormationDragController_1.FormationDragData();
    t.DragRoleItem = e;
    t.FormationRoleViewList = this.xLu;
    t.ExchangeRoleCallBack = this.VLg;
    ControllerHolder_1.ControllerHolder.FormationDragController.InitDragData(t);
    this.Ivt.SetCloseBtnShowState(false);
    this.Ivt.SelectToggleByIndex(0, true);
  }
  OnBeforeDestroy() {
    this.tM1?.StopPlayingSequence();
    this.tM1?.Clear();
    this.tM1 = undefined;
    ControllerHolder_1.ControllerHolder.FormationDragController.ClearDragData();
  }
  OnTick(e) {
    for (const t of this.xLu) {
      t.OnTick(e);
    }
  }
  Og() {
    this.Z6u();
    this.M3e();
    this.sF1();
  }
  Z6u() {
    this.PLu?.RefreshLinkInfo(this.Ivt.GetSelectedIndex());
  }
  sF1() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
    if (e) {
      e = (e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRoomPoolConfig(e.Data.Yr1.Vy_))?.EnvDesc.length !== 0 || e?.MonsterDesc.length !== 0;
      this.GetButton(6).RootUIComp.SetUIActive(e);
    }
  }
  M3e() {
    let e = true;
    for (const t of (ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(this.Ivt.GetSelectedIndex())).Q6n) {
      if (t !== 0) {
        e = false;
        break;
      }
    }
    this.GetButton(3).SetSelfInteractive(!e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "FirstFetter") {
      return this.Ivu?.GetGuideUiItemAndUiItemForShowEx(e);
    } else {
      return undefined;
    }
  }
}
exports.RogueBattleTeamEditView = RogueBattleTeamEditView;
//# sourceMappingURL=RogueBattleTeamEditView.js.map