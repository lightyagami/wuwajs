"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTeamEditSlot = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const FormationRoleDragStateItem_1 = require("../../EditFormation/View/FormationRoleDragStateItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattleDefine_1 = require("../RogueBattleDefine");
const RogueBattleTeamEditFetterIconItem_1 = require("./RogueBattleTeamEditFetterIconItem");
const RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleTeamEditSlot extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.OnPointDown = undefined;
    this.OnDragStart = undefined;
    this.OnDragMove = undefined;
    this.OnDragEnd = undefined;
    this.OnGamePadDown = undefined;
    this.BIl = undefined;
    this.jLg = undefined;
    this.x3_ = undefined;
    this._fe = false;
    this.vlm = false;
    this.WLg = 0;
    this.SPe = undefined;
    this.S6g = undefined;
    this.M6g = undefined;
    this.ConfigId = 0;
    this.Index = 0;
    this.ElementItem = undefined;
    this.FetterLayout = undefined;
    this.OnClickCallBack = undefined;
    this.rV_ = () => {
      this.OnClickCallBack?.(this.Index);
    };
    this.GFo = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "RogueBattleTeamEditSlot-OnPointerUp");
      }
      if (ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex === this.Index + 1) {
        ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex = 0;
        this._fe = false;
        this.EndShowDragItem();
        this.QLg();
      }
    };
    this.Ngo = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "RogueBattleTeamEditSlot-OnPointerDown");
      }
      if (this.ConfigId) {
        if (ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Formation", 5, "RogueBattleTeamEditSlot-CanDragStart-false");
          }
        } else {
          ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex = this.Index + 1;
          this._fe = true;
          this.WLg = 0;
          this.OnPointDown?.(t, this.ConfigId ?? 0, this.BIl ?? 0, this.Index + 1);
        }
      }
    };
    this.vKe = t => {
      if (t && this.vlm) {
        this.OnDragMove?.(t);
      }
    };
    this.w$g = false;
    this.GamePadUp = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "RogueBattleTeamEditSlot-GamePadUp");
      }
      if (this.ConfigId && ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex === this.Index + 1) {
        ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex = 0;
        this._fe = false;
        this.EndShowDragItem();
        this.QLg(t);
      }
    };
    this.GamePadPress = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "RogueBattleTeamEditSlot-OnGamePadDown");
      }
      if (this.ConfigId) {
        if (ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Formation", 5, "FormationRoleView-CanDragStart-false");
          }
        } else {
          ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex = this.Index + 1;
          this._fe = true;
          this.WLg = 0;
          this.OnGamePadDown?.(this.RootItem, this.ConfigId ?? 0, this.BIl ?? 0, this.Index + 1);
        }
      }
    };
    this.GamePadRelease = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "RogueBattleTeamEditSlot-GamePadRelease");
      }
      if (this.vlm) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Formation", 5, "RogueBattleTeamEditSlot-GamePad-DragLogic");
        }
      } else {
        if (this.OnClickCallBack) {
          this.OnClickCallBack(this.Index + 1);
        }
        this.GamePadUp();
      }
    };
    this.E6g = false;
    this.rAt = (t, e) => {
      if (this.vlm && t && !Info_1.Info.IsInGamepad()) {
        this.MouseCancelDrag();
      }
    };
    this.BNe = () => {
      var t = this.Index === 0;
      var e = ModelManager_1.ModelManager.RogueBattleModel.GetRogueResNewRoleFlag();
      this.GetItem(10).SetUIActive(t && e);
    };
    this.Index = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.SpineSkeletonAnimationComponent], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIVerticalLayout], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [17, UE.UIDraggableComponent], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem]];
    this.BtnBindInfo = [[0, this.rV_]];
  }
  async OnBeforeStartAsync() {
    this.ElementItem = new RogueBattleTokenElement_1.RogueBattleTokenElement();
    await this.ElementItem.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.jLg = new FormationRoleDragStateItem_1.FormationRoleDragStateItem();
    await this.jLg.CreateThenShowByActorAsync(this.GetItem(18).GetOwner());
    this.FetterLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), () => new RogueBattleTeamEditFetterIconItem_1.RogueBattleTeamEditFetterIconItem());
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.S6g = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.M6g = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    var t = this.GetDraggable(17);
    t.OnPointerCancelCallBack.Bind(this.GFo);
    t.OnPointerUpCallBack.Bind(this.GFo);
    t.OnPointerDownCallBack.Bind(this.Ngo);
    t.OnPointerDragCallBack.Bind(this.vKe);
    this.x3_ = this.GetItem(1);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResNewRoleFlagChange, this.BNe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResNewRoleFlagChange, this.BNe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
  }
  OnTick(t) {
    if (this._fe) {
      this.WLg += t;
      if (this.WLg > EditFormationDefine_1.FORMATION_DRAG_START_MOVE_TIME) {
        this.KLg();
      } else if (this.WLg > EditFormationDefine_1.FORMATION_DRAG_START_SHOW_TIME) {
        this.XLg();
      }
    }
  }
  Reset() {}
  GetConfigId() {
    return this.ConfigId;
  }
  XLg() {
    if (this.E6g) {
      this.S6g?.StopCurrentSequence();
      this.M6g?.PlaySequencePurely("CircleOut");
      this.E6g = false;
    }
    if (!this.w$g) {
      ControllerHolder_1.ControllerHolder.FormationDragController.SetCustomShield(false);
      this.w$g = true;
    }
    this.GetItem(20).SetUIActive(false);
    this.jLg?.SetBarFill((this.WLg - EditFormationDefine_1.FORMATION_DRAG_START_SHOW_TIME) / (EditFormationDefine_1.FORMATION_DRAG_START_MOVE_TIME - EditFormationDefine_1.FORMATION_DRAG_START_SHOW_TIME));
  }
  EndShowDragItem() {
    if (this.E6g) {
      this.S6g?.StopCurrentSequence();
      this.M6g?.PlaySequencePurely("CircleOut");
      this.E6g = false;
    }
    if (this.w$g) {
      ControllerHolder_1.ControllerHolder.FormationDragController.SetCustomShield(true);
      this.w$g = false;
    }
    this.GetItem(20).SetUIActive(false);
    this.jLg?.SetBarFill(0);
  }
  MouseCancelDrag() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Formation", 5, "RogueBattleTeamEditSlot-MouseCancelDrag");
    }
    if (this.ConfigId && ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex === this.Index + 1) {
      ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex = 0;
      this._fe = false;
      this.EndShowDragItem();
      this.QLg(true);
    }
  }
  KLg() {
    if (!this.vlm) {
      this.vlm = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "RogueBattleTeamEditSlot-StartMove");
      }
      this.EndShowDragItem();
      this.OnDragStart?.();
      this.x3_.SetUIActive(false);
    }
  }
  QLg(t) {
    if (this.ConfigId && this.vlm) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Formation", 5, "RogueBattleTeamEditSlot-StopMove");
      }
      this.vlm = false;
      this.x3_.SetUIActive(true);
      this.OnDragEnd?.(t);
    }
  }
  ShowOtherItemUpState() {
    if (!this.E6g && !this.vlm) {
      this.S6g?.PlaySequencePurely("CircleIn");
      this.E6g = true;
      this.GetItem(20).SetUIActive(true);
    }
  }
  RefreshLockItemState(t) {
    if (t) {
      if ((this.ConfigId ?? 0) <= 0) {
        this.GetItem(19).SetUIActive(true);
        this.GetItem(21).SetUIActive(false);
      }
    } else {
      this.GetItem(19).SetUIActive(false);
      this.GetItem(21).SetUIActive(true);
    }
  }
  GetPlayerId() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
  }
  UpdateRoleInfo(t, e) {
    const r = ModelManager_1.ModelManager.RogueBattleModel.GetFormationDataByIndex(e);
    this.BNe();
    this.GetText(6).SetText((this.Index + 1).toString());
    if (t === 0) {
      this.GetItem(1)?.SetUIActive(false);
      this.XJu(t);
      this.ConfigId = t;
    } else {
      this.GetItem(1)?.SetUIActive(true);
      e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
      const h = e.GetRoleConfig();
      var i = ModelManager_1.ModelManager.RogueBattleModel.GetIncIdByRoleId(t);
      var i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(i);
      var o = e.GetRoleSkinId();
      this.BIl = o;
      var o = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(o);
      if (h) {
        const n = this.GetSpine(2);
        const l = n.GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
        l.SetAlpha(0);
        var s = (o || h).FormationSpineAtlas;
        var a = (o || h).FormationSpineSkeletonData;
        const _ = o ? o.SpineParam : [0, 0, 1];
        this.SetSpineAssetByPath(s, a, n).then(() => {
          l.SetAlpha(1);
          n.SetAnimation(0, "idle", true);
          l.SetAnchorOffsetX(_[0]);
          l.SetAnchorOffsetY(_[1]);
          l.SetUIItemScale(new UE.Vector(_[2], _[2], _[2]));
        });
        this.ElementItem?.Refresh(h.ElementId, false, 0);
        this.GetText(3).SetText(e.GetName());
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "RogueRes_FightFormation_RoleLevel", ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleLevel());
        this.GetText(9).SetText(i.F6n.toString());
        o = new UiAsyncTask_1.UiAsyncTask("RogueBattleTeamEditSlot.UpdateRoleInfo", async () => {
          var t = [];
          var e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(h.Id);
          if (e) {
            var i = [];
            for (const s of e.BondIds) {
              var o = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(s);
              i.push({
                OldRoleBondInfo: o,
                NewRoleBondInfo: o,
                AddStar: 0
              });
            }
            i.sort(RogueBattleDefine_1.sortRogueBattleRoleBondUpdateInfo);
            t.push(this.FetterLayout.RefreshByDataAsync(i));
          }
          await Promise.all(t);
          e = r.On1;
          if (e) {
            this.FetterLayout.GetLayoutItemByKey(e)?.SetLinkEffectOn(true);
          }
        });
        this.RunAsyncTask(o);
        this.XJu(t);
        this.ConfigId = t;
      }
    }
  }
  XJu(t) {
    if (this.ConfigId !== t) {
      if (t === 0) {
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