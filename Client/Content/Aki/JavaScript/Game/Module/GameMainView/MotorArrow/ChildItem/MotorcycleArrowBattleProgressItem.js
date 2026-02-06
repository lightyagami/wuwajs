"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleBossHeadItem = exports.MotorcycleArrowBattleProgressItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const KscEnv_1 = require("../../../../KuroSimpleCombat/KscEnv");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PROGRESS_DURATION = 500;
const FOREVER_LEVEL_PERCOUNT = 5;
class MotorcycleArrowBattleProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.DistancePressBar = undefined;
    this.HeadList = undefined;
    this.HeadItem = undefined;
    this.PlayerHead = undefined;
    this.PlayerTextureHead = undefined;
    this.BarLength = 0;
    this.SubBarLength = 0;
    this.HeadItemList = [];
    this.SPe = undefined;
    this.Iqg = -1;
    this.Tqg = 0;
    this.bqg = 0;
    this.Rqg = false;
    this.Lqg = 0;
    this.r8g = 0;
    this.o8g = 0;
    this.Refresh = (t, i) => {
      var e = Math.floor(t / FOREVER_LEVEL_PERCOUNT) * FOREVER_LEVEL_PERCOUNT;
      if (this.Rqg && this.Lqg !== e) {
        this.Lqg = e;
        this.SPe.PlaySequencePurely("Start");
        this.q8g();
      }
      var s = t - this.Lqg;
      for (let t = 0; t < this.HeadItemList.length; t++) {
        var h = this.HeadItemList[t];
        if (t < s) {
          h.SetBossState(3);
        } else if (t === s) {
          h.SetBossState(i ? 2 : 1);
        } else {
          h.SetBossState(1);
        }
      }
    };
    this.RefreshBattleState = (t, i) => {
      this.HeadItemList[t]?.SetBossState(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    this.DistancePressBar = this.GetSprite(0);
    this.HeadList = this.GetItem(1);
    this.HeadItem = this.GetItem(2);
    this.PlayerHead = this.GetItem(3);
    this.PlayerTextureHead = this.GetTexture(4);
    this.BarLength = this.HeadList.GetHeight();
    this.HeadItem.SetUIActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.OnAddEventListener();
    this.InitPlayerHead();
    this.o8g = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorArrowBattleProgressOffsetY") ?? 0;
    await this.InitBossHeadItem();
    this.UpdatePlayerHeadPos();
  }
  OnBeforeDestroy() {
    this.OnRemoveEventListener();
  }
  OnBeforeShow() {
    this.SPe.PlaySequencePurely("Start");
    this.q8g();
    this.wqg();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorArrowSubLevelNotify, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorArrowBossStateChange, this.RefreshBattleState);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorArrowSubLevelNotify, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorArrowBossStateChange, this.RefreshBattleState);
  }
  InitPlayerHead() {
    var t;
    var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(i)?.GetCurrentGroup()?.GetCurrentRole()?.RoleId;
    if (i) {
      t = (i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)).RoleHeadIconCircle;
      this.SetTextureShowUntilLoaded(t, this.GetTexture(4));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.Name);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CommonGameMainView", 85, "[摩托战斗]获取不到当前角色id");
    }
  }
  async InitBossHeadItem() {
    var t = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
    var e = t.LevelConfig?.SubLevels;
    if (e && e.length !== 0) {
      this.Rqg = t.LevelConfig.LevelType === 2;
      if (this.BarLength <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("CommonGameMainView", 85, "[摩托战斗]获取不到进度条长度");
        }
      } else if (!(this.HeadItemList.length > 0)) {
        var s = e.length;
        var h = [];
        let i = -this.BarLength / 2;
        if (this.Rqg) {
          this.SubBarLength = this.BarLength / FOREVER_LEVEL_PERCOUNT;
          this.r8g = FOREVER_LEVEL_PERCOUNT;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("CommonGameMainView", 85, "[摩托战斗]初始化boss头像");
          }
          for (let t = 0; t < FOREVER_LEVEL_PERCOUNT; t++) {
            i += this.SubBarLength;
            h.push(this.oof(i));
          }
        } else {
          this.SubBarLength = this.BarLength / s;
          this.r8g = s;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("CommonGameMainView", 85, "[摩托战斗]初始化boss头像");
          }
          for (let t = 0; t < s; t++) {
            i += this.SubBarLength;
            h.push(this.oof(i));
          }
        }
        await Promise.all(h);
        this.Refresh(t.SubLevelIndex, t.IsInBossBattle);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CommonGameMainView", 85, "[摩托战斗]获取不到子关卡配置");
    }
  }
  async oof(t) {
    var i = new MotorcycleBossHeadItem();
    var e = LguiUtil_1.LguiUtil.CopyItem(this.HeadItem, this.HeadList);
    e.SetAnchorOffsetY(t);
    this.HeadItemList.push(i);
    await i.CreateByActorAsync(e.GetOwner());
    i.SetBossState(1);
  }
  OnTick(t) {
    this.UpdatePlayerHeadPos();
    if (this.Tqg > 0 && this.Tqg <= Time_1.Time.Now) {
      this.Pqg();
    }
  }
  UpdatePlayerHeadPos() {
    var i = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
    if (i) {
      var e = i.SubLevelIndex - this.Lqg;
      let t = 0;
      if (i.EndDistance > 0) {
        s = KscEnv_1.KscEnv.KscWorld?.SceneMovement?.MoveDistance ?? 0;
        t = MathUtils_1.MathUtils.Clamp(s / i.EndDistance, 0, 1);
      }
      var s = -this.BarLength / 2 + (e + t) * this.SubBarLength + this.o8g;
      this.PlayerHead?.SetAnchorOffsetY(s);
      if (this.r8g > 0) {
        i = (e + t) / this.r8g;
        this.DistancePressBar?.SetFillAmount(i);
      }
    }
  }
  wqg() {
    if (this.HeadItemList.length > 1) {
      this.bqg = PROGRESS_DURATION / (this.HeadItemList.length - 1);
      this.Tqg = Time_1.Time.Now + this.bqg;
    } else {
      this.bqg = 0;
      this.Tqg = 0;
    }
    this.Iqg = this.HeadItemList.length;
    this.Pqg();
  }
  Pqg() {
    this.Iqg--;
    if (this.Iqg >= this.HeadItemList.length || this.Iqg < 0) {
      this.Tqg = -1;
    } else {
      this.Tqg = Time_1.Time.Now + this.bqg;
      this.HeadItemList[this.Iqg].ShowAsync();
    }
  }
  q8g() {
    var t = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
    if (t) {
      var i = t.BossIconPathList;
      for (let t = 0; t < this.HeadItemList.length; t++) {
        var e = this.HeadItemList[t];
        var s = t + this.Lqg;
        e.SetBossIconPath(i[s]);
      }
    }
  }
}
exports.MotorcycleArrowBattleProgressItem = MotorcycleArrowBattleProgressItem;
class MotorcycleBossHeadItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.BossState = 0;
    this.Attack = undefined;
    this.BossHead = undefined;
    this.HeadBase = undefined;
    this.BossIcon = undefined;
    this.FinishIcon = undefined;
    this.StateAttack = undefined;
    this.$pt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem]];
  }
  OnStart() {
    this.Attack = this.GetItem(0);
    this.BossHead = this.GetTexture(1);
    this.HeadBase = this.GetSprite(2);
    this.BossIcon = this.GetSprite(3);
    this.FinishIcon = this.GetSprite(4);
    this.StateAttack = this.GetItem(5);
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
    this.$pt = undefined;
  }
  SetBossIconPath(t) {
    this.SetTextureByPath(t, this.BossHead);
  }
  SetBossState(t, i = false) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonGameMainView", 85, "[摩托战斗]设置boss头像状态", ["state", t], ["prevState", this.BossState]);
    }
    if (this.BossState !== t || !!i) {
      this.BossState = t;
      this.Refresh();
    }
  }
  Refresh() {
    var t;
    this.$pt.StopPlayingSequence();
    if (this.BossState === 1) {
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_HeadBgNor"), this.HeadBase, true);
      this.FinishIcon?.SetUIActive(false);
      this.StateAttack?.SetUIActive(true);
      this.$pt.PlaySequencePurely("Start");
      this.BossHead?.SetChangeColor(false);
    } else if (this.BossState === 2) {
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_HeadBgNor"), this.HeadBase, true);
      this.FinishIcon?.SetUIActive(false);
      this.StateAttack?.SetUIActive(true);
      this.$pt.PlaySequencePurely("Trigger");
      this.BossHead?.SetChangeColor(false);
    } else if (this.BossState === 3) {
      this.FinishIcon?.SetUIActive(true);
      this.StateAttack?.SetUIActive(false);
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_HeadBgSuccess"), this.HeadBase, true);
      this.$pt.PlaySequencePurely("Defeat");
      t = UE.Color.FromHex("375454");
      this.BossHead?.SetChangeColor(true, t);
    }
  }
}
exports.MotorcycleBossHeadItem = MotorcycleBossHeadItem;
//# sourceMappingURL=MotorcycleArrowBattleProgressItem.js.map