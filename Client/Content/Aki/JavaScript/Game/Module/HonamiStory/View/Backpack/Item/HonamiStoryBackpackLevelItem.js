"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryBackpackLevelItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const RoleLevelUpSuccessController_1 = require("../../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const HonamiStoryController_1 = require("../../../HonamiStoryController");
const HonamiStoryUtil_1 = require("../../../HonamiStoryUtil");
const ADD_FRAME = 9;
const DOWN_FRAME = 6;
class HonamiStoryLevelPowerItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem]];
  }
  RefreshPowerVisible(e) {
    this.GetItem(4)?.SetUIActive(e);
  }
}
class HonamiStoryBackpackLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.H61 = e;
    this.jum = false;
    this._mm = false;
    this.umm = 0;
    this.cmm = 0;
    this.dmm = 0;
    this.mmm = false;
    this.SPe = undefined;
    this.fmm = undefined;
    this.wY = 0;
    this._bm = undefined;
    this.jJd = () => {
      if (!this.H61) {
        var t = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().LifeSupportLevel;
        if (t < ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().GetLifeSupportMaxLevel()) {
          var i = t + 1;
          var t = t + 1;
          var r = i + 1;
          var s = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
          if (s) {
            var o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(s.OutCoinItemId);
            var a = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLifeSupport(i).ConsumeItems.get(s.OutCoinItemId);
            var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLifeSupport(i).SteadyValue;
            var r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLifeSupport(r).SteadyValue;
            var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(s.OutCoinItemId);
            let e = "";
            if (s && s.IconSmall) {
              e = s.IconSmall;
            }
            var s = new StringBuilder_1.StringBuilder();
            s.Append("<texture=");
            s.Append(e);
            s.Append("/>");
            var a = a || 0;
            var n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(391);
            n.SetTextArgs(a.toString(), s.ToString(), t.toString(), i.toString(), r.toString());
            n.FunctionMap.set(2, () => {
              this.x1m();
            });
            if (o < a) {
              n.SetTipsBgRed = true;
              n.SetTableTextArgNew("Text_NotEnoughItem_Text");
              n.InteractionMap.set(1, false);
            }
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
          }
        }
      }
    };
    this.x1m = () => {
      HonamiStoryController_1.HonamiStoryController.RequestHonamiStoryLifeSupportUp().then(() => {
        this.RefreshLifeSupport();
      });
    };
    this.B1m = () => {
      this.CheckCanUpgrade();
      var e = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().LifeSupportLevel;
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().GetLifeSupportMaxLevel();
      var i = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLifeSupport(e).SteadyValue;
      var r = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLifeSupport(e + 1).SteadyValue;
      var s = [];
      var i = {
        Name: "HonamiStory_Tech_TalentTreeTips",
        ShowArrow: true,
        PreText: i.toString(),
        CurText: r.toString()
      };
      s.push(i);
      var r = {
        LevelInfo: {
          PreUpgradeLv: e - 1,
          UpgradeLv: e,
          FormatStringId: "Text_LevelShow_Text",
          IsMaxLevel: e === t
        },
        WiderScrollView: true,
        AttributeInfo: s
      };
      RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(r);
    };
    this.gmm = () => {
      this.wY++;
      var e = this.mmm ? ADD_FRAME : DOWN_FRAME;
      this.cmm = this.mmm ? Math.ceil(this.umm + (this.dmm - this.umm) * this.wY / e) : Math.floor(this.umm - (this.umm - this.dmm) * this.wY / e);
      if (this.mmm) {
        this.cmm = Math.min(this.dmm, this.cmm);
      } else {
        this.cmm = Math.max(this.dmm, this.cmm);
      }
      this.GetText(0)?.SetText("" + this.cmm);
      if (this.wY < e) {
        this.fmm = TimerSystem_1.TimerSystem.Next(this.gmm);
      } else {
        this.fmm = undefined;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UINiagara], [8, UE.UISprite], [9, UE.UITexture], [11, UE.UIText]];
    this.BtnBindInfo = [[3, this.jJd]];
  }
  async OnBeforeStartAsync() {
    this._bm = new HonamiStoryLevelPowerItem();
    await this._bm.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.jum = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false)?.GetPreGuideQuestFinishState() ?? false;
    this._bm?.RefreshPowerVisible(this.jum);
    this.RefreshLifeSupport();
    this.RefreshPowerLevel(false, false, 0, 0);
    this.CheckCanUpgrade();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryLifeSupportLevelUp, this.B1m);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryLifeSupportLevelUp, this.B1m);
  }
  RefreshLifeSupport() {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().GetLifeSupportMaxLevel();
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().LifeSupportLevel;
    var i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10122);
    var i = !this.H61 && t < e && i;
    var r = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    this.GetButton(3)?.RootUIComp.SetUIActive(i);
    var i = i ? "T_BackpackUpdateBgB" : "T_BackpackUpdateBg";
    var i = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(i) ?? "";
    this.SetTextureByPath(i, this.GetTexture(9));
    var i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10105);
    this.GetText(1)?.SetUIActive(i && t !== e);
    this.GetSprite(8)?.SetUIActive(i && t === e);
    var s = i ? "HonamiStory_TableValue_1" : "HonamiStory_TableValue_0";
    this.GetText(11)?.ShowTextNew(s);
    if (i && t !== e) {
      this.GetText(1)?.SetText("" + t);
    }
    if (r) {
      s = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(13);
      i = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(13);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "HonamiStory_LifeSupport_Value", s, i);
      this.GetSprite(4)?.SetFillAmount(s / i);
    } else {
      e = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().GetCurMaxValue();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "HonamiStory_LifeSupport_Value", e, e);
      this.GetSprite(4)?.SetFillAmount(e / e);
    }
    var t = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().GetLifeSupportIcon();
    this.SetSpriteByPath(t, this.GetSprite(6), false);
  }
  RefreshPowerLevel(e, t, i, r) {
    if (this.jum) {
      if (e) {
        this.wY = 0;
        this.mmm = t;
        this.dmm = r;
        if (this.fmm) {
          if (this.fmm.Valid()) {
            TimerSystem_1.TimerSystem.Remove(this.fmm);
          }
          this.umm = this.cmm;
        } else {
          this.umm = i;
        }
        this.fmm = TimerSystem_1.TimerSystem.Next(this.gmm);
        if (t) {
          this.SPe?.PlayOrReplaySequenceByName("Up");
          if (this.SPe?.IsPlayingSequence("Down")) {
            this.SPe?.StopSequenceByKey("Down");
          }
        } else {
          this.SPe?.PlayOrReplaySequenceByName("Down");
          if (this.SPe?.IsPlayingSequence("Up")) {
            this.SPe?.StopSequenceByKey("Up");
          }
        }
      } else if (r !== 0) {
        this.GetText(0)?.SetText("" + r);
      } else {
        e = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().PowerLevel;
        this.GetText(0)?.SetText("" + e);
      }
    }
  }
  SetIsEnable(e) {
    this.RootItem?.SetAlpha(e ? 1 : 0.4);
    this.GetButton(3)?.SetSelfInteractive(e);
  }
  CheckCanUpgrade() {
    var e;
    var t;
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData();
    if (i && ModelManager_1.ModelManager.FunctionModel.IsOpen(10122)) {
      t = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().LifeSupportLevel;
      e = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().GetLifeSupportMaxLevel();
      if (this.H61 || e <= t) {
        this.GetUiNiagara(7)?.SetUIActive(false);
      } else {
        e = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerData().GetCurLevelId(t);
        if ((t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetLifeSupport(e).ConsumeItems.get(i.OutCoinItemId) <= ModelManager_1.ModelManager.HonamiStoryModel.GetCurrencyCount()) !== this._mm) {
          if (this._mm = t) {
            this.SPe?.PlayLevelSequenceByName("Tips_Circle");
          } else {
            this.GetUiNiagara(7)?.SetUIActive(false);
          }
        }
      }
    }
  }
}
exports.HonamiStoryBackpackLevelItem = HonamiStoryBackpackLevelItem;
//# sourceMappingURL=HonamiStoryBackpackLevelItem.js.map