"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RollBlockController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TickProcessSystem_1 = require("../../../Core/Tick/TickProcessSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneItemJigsawBaseComponent_1 = require("../../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent");
const UiManager_1 = require("../../Ui/UiManager");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const RbBlockComponent_1 = require("./RbBlockComponent");
const RollBlockDefind_1 = require("./RollBlockDefind");
const COMMON_FORCE_FEEDBACK_PATH = "/Game/Aki/Character/Role/Common/Data/GamePadShake/CommonShake/FF_Common_Lv1.FF_Common_Lv1";
class RollBlockGameplayInfo {
  constructor(o) {
    this.GroupId = 0;
    this.Difficulty = 0;
    this.TotalDifficulty = 0;
    this.IsMainController = false;
    this.EntityIds = [];
    this.InitVisibleEntityIds = [];
    this.Forward = undefined;
    this.Right = undefined;
    this.RollBlockEntities = [];
    this.TmpVec = undefined;
    this.TmpRot = undefined;
    this.HasTipActorNum = 0;
    this.Width = 0;
    this.Height = 0;
    this.AvailableInputs = [];
    this.IndexedEntityMap = new Map();
    this.ShowTipsInputCount = 0;
    this.ShowedTips = false;
    this.MultiBlock = false;
    this.CameraTag = undefined;
    this.InitState = "无";
    this.GroupId = o.S9n;
    this.Difficulty = o.ljn;
    this.TotalDifficulty = o.I3f;
    this.IsMainController = o.htm;
    this.EntityIds = [];
    if (o.jCg !== undefined) {
      for (const t of o.jCg) {
        this.EntityIds.push(MathUtils_1.MathUtils.LongToNumber(t));
      }
    }
    if (o.HCg !== undefined) {
      for (const l of o.HCg) {
        this.InitVisibleEntityIds.push(MathUtils_1.MathUtils.LongToNumber(l));
      }
    }
    this.Width = o.eff ?? 0;
    this.Height = o.tff ?? 0;
    this.ShowTipsInputCount = o.rff ?? 0;
    this.CameraTag = o.sRf ?? undefined;
    for (const e of o.VSm) {
      if (e.XDs?.Nfu !== undefined) {
        this.AvailableInputs.push(e.XDs?.Nfu);
      }
    }
    if (o.g8n !== undefined && (this.TmpRot = Rotator_1.Rotator.Create(o.g8n.Y ?? 0, o.g8n.Z ?? 0, o.g8n.X ?? 0), this.Forward = Vector_1.Vector.Create(new UE.Quat(this.TmpRot.ToUeRotator()).GetRightVector()), this.Forward.Normalize(), this.Forward.MultiplyEqual(-1), this.Right = Vector_1.Vector.Create(new UE.Quat(this.TmpRot.ToUeRotator()).GetForwardVector()), this.Right.Normalize(), this.TmpVec = Vector_1.Vector.Create(o.l9_?.X ?? 0, o.l9_?.Y ?? 0, o.l9_?.Z ?? 0), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RollBlock", 31, "[RollBlockGameplayInfo] 玩法中心位置", ["Loc", this.TmpVec]);
    }
  }
}
class RollBlockController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RollBlock", 31, "[RollBlockController] 初始化");
    }
    ResourceSystem_1.ResourceSystem.LoadAsync(RollBlockDefind_1.RB_CONFIG_DA_PATH, UE.BP_RollBlockGameplaySetting_C, o => {
      if (o) {
        this.GameplaySetting = o;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[RollBlockController] 配置加载失败", ["Path", RollBlockDefind_1.RB_CONFIG_DA_PATH]);
      }
    });
    ResourceSystem_1.ResourceSystem.LoadAsync(COMMON_FORCE_FEEDBACK_PATH, UE.KuroForceFeedbackEffect, o => {
      if (o) {
        this.f_g = o;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[RollBlockController] 通用震动配置加载失败", ["Path", COMMON_FORCE_FEEDBACK_PATH]);
      }
    });
    return true;
  }
  static EnterRollBlockGameplay(o, t = false) {
    var l;
    if (this.GameplaySetting === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[EnterRollBlockGameplay] GameplaySetting未加载完成");
      }
    } else if ((l = o.YVn?.w5n) === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[EnterRollBlockGameplay] IncId未定义");
      }
    } else if (this.Etm.has(l)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[EnterRollBlockGameplay] IncId重复", ["IncId", l]);
      }
    } else if (o.YVn === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[EnterRollBlockGameplay] Proto_Info未定义", ["IncId", l]);
      }
    } else {
      o = new RollBlockGameplayInfo(o.YVn);
      if (this.Itm && o.IsMainController) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[EnterRollBlockGameplay] IsMainController重复", ["IncId", l], ["GroupId", o.GroupId], ["Difficulty", o.Difficulty]);
        }
      } else if (o.Forward === undefined || o.Right === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[EnterRollBlockGameplay] Forward或Right未定义", ["IncId", l], ["Forward", o.Forward], ["Right", o.Right]);
        }
      } else {
        this.Itm = o.IsMainController;
        if (this.Itm) {
          this.Ttm = l;
          if (!t) {
            this.wCf = 0;
          }
          this.RCf = 0;
          this.j7f = false;
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.IJt);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRollBlockDifficultyChanged, o.Difficulty);
        } else {
          if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLeaveOnlineWorld, this.ExitOnOnlineModeChange)) {
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveOnlineWorld, this.ExitOnOnlineModeChange);
          }
          this.K8g = l;
        }
        if (this.Etm.size === 0) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Ecu);
        }
        this.Etm.set(l, o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[EnterRollBlockGameplay] EnterRollBlockGameplay成功", ["IncId", l], ["GroupId", o.GroupId], ["Difficulty", o.Difficulty], ["IsMainController", o.IsMainController], ["EntityIds", o.EntityIds], ["InitVisibleEntityIds", o.InitVisibleEntityIds]);
        }
        t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
        t = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t)?.GetComponent(217);
        if (o.CameraTag !== 0) {
          t?.AddTag(o.CameraTag);
        }
        o.InitState = "进入";
        this.Rtm(l);
        if (!this.ydd && o.IsMainController) {
          UiManager_1.UiManager.OpenView("RollBlockView");
          t?.AddTag(698343876);
        }
        this.ESm.clear();
        this.MSm = undefined;
      }
    }
  }
  static ExitRollBlockGameplay(o, t = false) {
    var l = this.Etm.get(o);
    if (l === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[ExitRollBlockGameplay] IncId不存在", ["IncId", o]);
      }
    } else {
      this.Etm.delete(o);
      this.L9g.delete(o);
      if (l.IsMainController) {
        this.Itm = false;
        this.Ttm = undefined;
      } else {
        if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLeaveOnlineWorld, this.ExitOnOnlineModeChange)) {
          EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveOnlineWorld, this.ExitOnOnlineModeChange);
        }
        this.K8g = undefined;
      }
      var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      var e = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.GetComponent(217);
      if (l.CameraTag !== 0) {
        e?.RemoveTag(l.CameraTag);
      }
      if (!t && l.IsMainController) {
        UiManager_1.UiManager.CloseView("RollBlockView");
        e?.RemoveTag(698343876);
      }
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CloseView, this.$7f)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$7f);
      }
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OpenView, this.IJt)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.IJt);
      }
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.Ecu)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Ecu);
      }
      var t = this.yQ1.get(o);
      if (t !== undefined) {
        for (var [i, n] of t) {
          EventSystem_1.EventSystem.RemoveWithTarget(i, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, n);
        }
        this.yQ1.delete(o);
      }
    }
  }
  static UpdateRollBlockGameplayInfo(o) {
    var t = o.w5n;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[UpdateCurRollBlockGameplayInfo] IncId未定义");
      }
    } else {
      var l = this.Etm.get(t);
      if (l === undefined) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RollBlock", 31, "[UpdateCurRollBlockGameplayInfo] IncId不存在", ["IncId", t]);
        }
      } else {
        var e = new RollBlockGameplayInfo(o);
        this.Itm = e.IsMainController;
        if (this.Itm) {
          this.Ttm = t;
        }
        e.MultiBlock = l.MultiBlock;
        this.Etm.set(t, e);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[UpdateCurRollBlockGameplayInfo] 更新玩法信息", ["IncId", t], ["Info", o]);
        }
        for (const c of e.EntityIds) {
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(c)?.Entity;
          if (i === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RollBlock", 31, "[UpdateCurRollBlockGameplayInfo] Entity不存在", ["IncId", t], ["EntityId", c]);
            }
          } else if (i.GetComponent(217) === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RollBlock", 31, "[UpdateCurRollBlockGameplayInfo] BaseTagComponent不存在", ["IncId", t], ["EntityId", c]);
            }
          } else if ((i = i.GetComponent(330)) === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RollBlock", 31, "[UpdateCurRollBlockGameplayInfo] rbBaseComponent不存在", ["IncId", t], ["EntityId", c]);
            }
          } else {
            i.RegisterToGameplay(t);
          }
        }
        for (const r of e.InitVisibleEntityIds) {
          var n = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity;
          if (n === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RollBlock", 31, "[UpdateCurRollBlockGameplayInfo] Entity不存在", ["IncId", t], ["EntityId", r]);
            }
          } else if (n.GetComponent(217) === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RollBlock", 31, "[UpdateCurRollBlockGameplayInfo] BaseTagComponent不存在", ["IncId", t], ["EntityId", r]);
            }
          } else if ((n = n.GetComponent(330)) === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RollBlock", 31, "[UpdateCurRollBlockGameplayInfo] rbBaseComponent不存在", ["IncId", t], ["EntityId", r]);
            }
          } else {
            n.RegisterToGameplay(t);
          }
        }
      }
    }
  }
  static OnClickMoveInput(t, l) {
    if (!this.ydd) {
      var e = this.Etm.get(this.Ttm);
      if (e === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[OnClickMoveInput] IncId不存在", ["IncId", this.Ttm]);
        }
      } else {
        let o = false;
        for (const i of e.RollBlockEntities) {
          if (i.Valid && i.IsMainController) {
            o = true;
          }
        }
        if (o) {
          this.SSm(t, l);
          if (t === this.MSm && l === 0 || this.MSm !== undefined && e?.AvailableInputs.includes(RollBlockDefind_1.Input2RbGridDirection.get(this.MSm)) && l === 1) {
            this.xtm();
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RollBlock", 93, "[OnClickMoveInput] 没有主控制方块，拦截输入", ["IncId", this.Ttm]);
        }
      }
    }
  }
  static SSm(o, t) {
    if (t === 0) {
      if (this.MSm === undefined) {
        this.MSm = o;
      }
      this.ESm.add(o);
    } else {
      this.ESm.delete(o);
      if (this.MSm === o) {
        this.MSm = this.ESm.size > 0 ? [...this.ESm][0] : undefined;
      }
    }
    if (this.MSm !== undefined) {
      this.Btm = RollBlockDefind_1.Input2RbGridDirection.get(this.MSm);
    } else {
      this.Btm = undefined;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RollBlock", 31, "[Input] InputDir", ["Name", o], ["ActionType", t], ["CurrentKey", this.MSm], ["InputDir", this.Btm], ["PressedKey", this.ESm]);
    }
  }
  static OnClickTip() {
    var o;
    if (!this.ydd && !this.pct) {
      if ((o = this.Etm.get(this.Ttm)) === undefined) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RollBlock", 31, "[OnClickTip] IncId不存在", ["IncId", this.Ttm]);
        }
      } else if (o.HasTipActorNum > 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[OnClickTip] 已经有虚影方块");
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[OnClickTip]");
        }
        (o = Protocol_1.Aki.Protocol.aRm.create()).w5n = this.Ttm;
        o.Sps = true;
        Net_1.Net.Call(21707, o, o => {
          this.pct = false;
          if (o !== undefined) {
            switch (o.Cvs) {
              case Protocol_1.Aki.Protocol.Q4n.KRs:
              case Protocol_1.Aki.Protocol.Q4n.Proto_RollBlockHintAlreadyActive:
                break;
              default:
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("RollBlock", 31, "[OnClickTip] Proto_RollBlockToggleHintRequest失败", ["errorCode", o.Cvs]);
                }
            }
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("RollBlock", 31, "[OnClickTip] Proto_RollBlockToggleHintRequest成功");
            }
          }
        });
        this.pct = true;
      }
    }
  }
  static OnClickReset(t = false, l = false) {
    if (!this.ydd && !this.pct || l) {
      l = this.Etm.get(this.Ttm);
      if (l === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[OnClickMoveInput] IncId不存在", ["IncId", this.Ttm]);
        }
      } else {
        let o = false;
        for (const e of l.RollBlockEntities) {
          if (e.Valid && e.IsMainController) {
            o = true;
          }
        }
        if (o) {
          this.ydd = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRollBlockReseting, "开始");
          if (t) {
            TimerSystem_1.TimerSystem.Delay(this.j6g, this.GameplaySetting.BlockDestroyDelayResetTime);
          } else {
            this.j6g();
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RollBlock", 93, "[OnClickReset] 没有主控制方块，拦截重置", ["IncId", this.Ttm]);
        }
      }
    }
  }
  static OnClickEsc() {
    if (!this.ydd && !this.pct) {
      var t = this.Etm.get(this.Ttm);
      if (t === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[OnClickMoveInput] IncId不存在", ["IncId", this.Ttm]);
        }
      } else {
        let o = false;
        for (const l of t.RollBlockEntities) {
          if (l.Valid && l.IsMainController) {
            o = true;
          }
        }
        if (o) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RollBlock", 31, "[OnClickEsc]");
          }
          (t = Protocol_1.Aki.Protocol.nRm.create()).w5n = this.Ttm;
          Net_1.Net.Call(27201, t, o => {
            this.pct = false;
            if (o !== undefined) {
              if (o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("RollBlock", 31, "[OnClickEsc] Proto_RollBlockExitGamePlayRequest失败", ["errorCode", o.Cvs]);
                }
              } else if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("RollBlock", 31, "[OnClickEsc] Proto_RollBlockExitGamePlayRequest成功");
              }
            }
          });
          this.pct = true;
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RollBlock", 93, "[OnClickEsc] 没有主控制方块，拦截退出", ["IncId", this.Ttm]);
        }
      }
    }
  }
  static OnClickSwitch() {
    var o;
    var t;
    if (!this.ydd && !this.pct) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[OnClickSwitch]");
      }
      if (o = this.Etm.get(this.Ttm)?.MultiBlock) {
        (t = Protocol_1.Aki.Protocol.lRm.create()).w5n = this.Ttm;
        Net_1.Net.Call(18796, t, o => {
          var t;
          this.pct = false;
          if (o !== undefined) {
            if (o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("RollBlock", 31, "[OnClickSwitch] Proto_RollBlockSwitchControlBlockRequest失败", ["errorCode", o.Cvs]);
              }
            } else {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("RollBlock", 31, "[OnClickSwitch] Proto_RollBlockSwitchControlBlockRequest成功");
              }
              t = MathUtils_1.MathUtils.LongToNumber(o.cRm);
              if ((t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Entity?.GetComponent(330)) !== undefined) {
                t.IsMainController = false;
              }
              t = MathUtils_1.MathUtils.LongToNumber(o.dRm);
              if ((o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Entity?.GetComponent(330)) !== undefined) {
                o.IsMainController = true;
              }
            }
          }
        });
        this.pct = true;
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[OnClickSwitch] 单方块玩法不支持切换控制方块", ["MultiBlock", o]);
      }
    }
  }
  static OnNotifyGameplayReset(o) {
    var t = o.YVn.w5n;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[OnNotifyGameplayReset] IncId未定义");
      }
    } else {
      if (this.Etm.get(t) !== undefined) {
        this.ExitRollBlockGameplay(t, true);
      }
      (t = Protocol_1.Aki.Protocol.Nem.create()).YVn = o.YVn;
      this.EnterRollBlockGameplay(t, true);
      this.ydd = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[OnClickReset] 重置操作完成", ["IncId", o.YVn.w5n]);
      }
    }
  }
  static OnNotifyAvailableInputsChange(o) {
    var t = this.Etm.get(o.w5n);
    if (t) {
      t.AvailableInputs = [];
      for (const l of o.VSm) {
        if (l.XDs?.Nfu !== undefined && (t.AvailableInputs.push(l.XDs.Nfu), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("RollBlock", 31, "[OnNotifyAvailableInputsChange] 可用输入", ["Direction", l.XDs.Nfu]);
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RollBlock", 31, "[OnNotifyAvailableInputsChange] IncId不存在", ["IncId", o.w5n]);
    }
  }
  static xtm() {
    if (!this.pct) {
      if (this.Btm === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[OnClickMove] InputDir未定义");
        }
      } else if (this.vRm()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[OnClickMove] 方块正在移动，忽略此次输入", ["InputDir", this.Btm]);
        }
      } else if (this.Etm.get(this.Ttm)?.AvailableInputs.includes(this.Btm)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[OnClickMove] OnClickMove", ["InputDir", this.Btm]);
        }
        var o = Protocol_1.Aki.Protocol.Xem.create();
        o.w5n = this.Ttm;
        const l = Protocol_1.Aki.Protocol.ytm.create();
        l.Nfu = this.Btm;
        o.BWn = {
          XDs: l
        };
        Net_1.Net.Call(19590, o, o => {
          this.pct = false;
          if (o !== undefined && (o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs && (Log_1.Log.CheckError() && Log_1.Log.Error("RollBlock", 31, "[OnClickMove] Proto_RollBlockInputRequest失败", ["errorCode", o.Cvs]), o = RollBlockDefind_1.RbGridDirection2Input.get(l.Nfu)) && o === this.MSm && this.SSm(o, 1), Log_1.Log.CheckInfo() && Log_1.Log.Info("RollBlock", 31, "[OnClickMove] Proto_RollBlockInputRequest成功"), this.RCf = 0, this.wCf++, o = this.Etm.get(this.Ttm), this.wCf > o.ShowTipsInputCount) && !o.ShowedTips) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowRollBlockTips);
            o.ShowedTips = true;
          }
        });
        this.pct = true;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[OnClickMove] 当前方向不可用，忽略此次输入", ["InputDir", this.Btm]);
        }
        this.RCf++;
        if (this.f_g && Info_1.Info.IsInGamepad() && !ModelManager_1.ModelManager.ControlScreenModel?.IsTouching) {
          ControllerHolder_1.ControllerHolder.GamepadController.PlayKuroForceFeedback(this.f_g, FNameUtil_1.FNameUtil.GetDynamicFName("RollBlock"), false, false, false, "RollBlockController");
        }
        for (const e of this.Etm.get(this.Ttm)?.RollBlockEntities ?? []) {
          if (e.IsMainController) {
            var t = e.Entity.GetComponent(217);
            t?.RemoveTag(906967761);
            t?.AddTag(906967761);
            break;
          }
        }
        if (this.RCf >= this.GameplaySetting.ShowMistakeTipsCount) {
          o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.GameplaySetting.RollBlockErrorTipKey);
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [o]);
        }
      }
    }
  }
  static vRm() {
    var o = this.Etm.get(this.Ttm);
    if (o === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[IsBlockMoving] IncId不存在", ["IncId", this.Ttm]);
      }
    } else {
      for (const t of o.RollBlockEntities) {
        if (t.IsMainController) {
          return t.IsMoving();
        }
      }
    }
    return false;
  }
  static OnRollBlockStateChange(o) {
    var t;
    var l;
    var e;
    var i = o.w5n;
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[StartRollBlockMovement] IncId未定义");
      }
    } else {
      t = MathUtils_1.MathUtils.LongToNumber(o.F4n);
      if ((e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Entity) === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[StartRollBlockMovement] Entity不存在", ["EntityId", t]);
        }
      } else if ((l = e.GetComponent(331)) === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[StartRollBlockMovement] RollBlockItemComponent不存在", ["EntityId", t]);
        }
      } else if (e.GetComponent(0)?.GetCreatureDataId() === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[StartRollBlockMovement] CreatureDataId不存在", ["EntityId", t]);
        }
      } else if (this.Etm.get(i)?.EntityIds.includes(t) || this.Etm.get(i)?.InitVisibleEntityIds.includes(t)) {
        e = o.Y4n;
        l.ChangeMoveState(e);
        if (e?.NSm !== undefined && (0, RollBlockDefind_1.isRbBlockIdleState)(e.NSm) && this.MSm) {
          this.xtm();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[StartRollBlockMovement] Entity不在EntityIds或者InitInvisibleEntityIds中", ["EntityId", t]);
      }
    }
  }
  static Rtm(t) {
    var o = this.Etm.get(t);
    if (o === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[HandleGroupEntitiesCreate] IncId不存在", ["IncId", t]);
      }
    } else {
      var l = o.EntityIds;
      if (l.length === 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[HandleGroupEntitiesCreate] EntityIds为空", ["IncId", t]);
      }
      if (this.kHa.has(t)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[HandleGroupEntitiesCreate] WaitEntityTask已存在，将强行停止", ["IncId", t]);
        }
        const e = this.kHa.get(t);
        e?.Cancel();
      }
      const e = WaitEntityTask_1.WaitEntityTask.Create("[RollBlockController.HandleGroupEntitiesCreate]", l, o => {
        this.cb1(o, t);
      }, -1, false, true);
      this.kHa.set(t, e);
      o.InitState = "等待所有实体创建";
    }
  }
  static cb1(o, l) {
    this.kHa.delete(l);
    if (o) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[OnAllEntityCreated] 生成实体成功", ["IncId", l]);
      }
      var o = this.Etm.get(l);
      var t = o.EntityIds;
      o.InitState = "等待场景交互物加载完成";
      if (t.length === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[OnAllEntityCreated] EntityIds为空", ["IncId", l]);
        }
      } else {
        for (const n of t) {
          const c = ModelManager_1.ModelManager.CreatureModel.GetEntity(n)?.Entity;
          if (c === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RollBlock", 31, "[OnAllEntityCreated] Entity不存在", ["IncId", l], ["EntityId", n]);
            }
          } else {
            var e = c.GetComponent(214);
            if (e === undefined) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("RollBlock", 31, "[OnAllEntityCreated] SceneItemActorComponent不存在", ["IncId", l], ["EntityId", n]);
              }
            } else {
              var i = c.GetComponent(217);
              if (i === undefined) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("RollBlock", 31, "[OnAllEntityCreated] BaseTagComponent不存在", ["IncId", l], ["EntityId", n]);
                }
              } else {
                i.AddTag(1090344258);
                if (!e.GetIsSceneInteractionLoadCompleted()) {
                  const s = this.yQ1.get(l) ?? new Map();
                  this.yQ1.set(l, s);
                  if (Log_1.Log.CheckInfo()) {
                    Log_1.Log.Info("RollBlock", 31, "[OnAllEntityCreated] 实体IsSceneInteractionLoadCompleted is false", ["IncId", l], ["EntityId", n]);
                  }
                  const _ = () => {
                    EventSystem_1.EventSystem.RemoveWithTarget(c, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, _);
                    s.delete(c);
                    this.yQ1.set(l, s);
                    if (Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("RollBlock", 31, "[OnAllEntityCreated] 实体IsSceneInteractionLoadCompleted is true", ["IncId", l], ["EntityId", n]);
                    }
                    if (s.size === 0) {
                      this.MQ1(l);
                    }
                  };
                  EventSystem_1.EventSystem.AddWithTarget(c, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, _);
                  s.set(c, _);
                }
                const r = () => {
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("RollBlock", 31, "[OnAllEntityCreated] onSetEntityEnable 函数执行", ["IncId", l], ["EntityId", n]);
                  }
                  ControllerHolder_1.ControllerHolder.CreatureController?.SetEntityEnable(c, true, "RollBlockController");
                  var o;
                  var t = this.L9g.get(l);
                  if (t && ((o = t.indexOf(r)) > -1 && (t.splice(o, 1), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("RollBlock", 31, "[OnAllEntityCreated] 函数已从 Map 中移除", ["IncId", l], ["RemainingFunctions", t.length]), t.length === 0) && (this.L9g.delete(l), Log_1.Log.CheckDebug())) {
                    Log_1.Log.Debug("RollBlock", 31, "[OnAllEntityCreated] incId 对应的函数列表已清空", ["IncId", l]);
                  }
                };
                i = this.L9g.get(l) ?? [];
                i.push(r);
                this.L9g.set(l, i);
                if (Log_1.Log.CheckDebug()) {
                  Log_1.Log.Debug("RollBlock", 31, "[OnAllEntityCreated] onSetEntityEnable 函数已保存", ["IncId", l], ["EntityId", n], ["TotalFunctions", i.length]);
                }
                TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(5, true, r);
              }
            }
          }
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RollBlock", 31, "[OnAllEntityCreated] 生成实体失败或者等待超时", ["IncId", l]);
    }
  }
  static MQ1(t) {
    var l = this.Etm.get(t);
    if (l === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[OnAllSceneItemLoadCompleted] IncId不存在", ["IncId", t]);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[OnAllSceneItemLoadCompleted] 场景物件加载完成", ["IncId", t]);
      }
      let o = 0;
      for (const r of l.EntityIds) {
        var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity;
        if (e === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RollBlock", 31, "[OnAllSceneItemLoadCompleted] Entity不存在", ["IncId", t], ["EntityId", r]);
          }
        } else if (e.GetComponent(217) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RollBlock", 31, "[OnAllSceneItemLoadCompleted] BaseTagComponent不存在", ["IncId", t], ["EntityId", r]);
          }
        } else {
          var i = e.GetComponent(330);
          if (i === undefined) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RollBlock", 31, "[OnAllSceneItemLoadCompleted] rbBaseComponent不存在", ["IncId", t], ["EntityId", r]);
            }
          } else {
            i.RegisterToGameplay(t);
            if (i instanceof RbBlockComponent_1.RbBlockComponent) {
              o++;
            }
            for (const s of i.OccupiedCellIndex) {
              var n = s.GetKey();
              var c = l.IndexedEntityMap.get(n) ?? [];
              c.push(i);
              l.IndexedEntityMap.set(n, c);
            }
          }
        }
      }
      l.MultiBlock = o > 1;
      TimerSystem_1.TimerSystem.Delay(() => {
        this.LCf(t);
      }, 100);
    }
  }
  static LCf(o) {
    var l = this.Etm.get(o);
    if (l === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[StartRollBlockBirthEffect] IncId不存在", ["IncId", o]);
      }
    } else {
      if (l.Width % 2 == 0) {
        this.PCf = Vector2D_1.Vector2D.Create(l.Width / 2 - 1, l.Width / 2);
      } else {
        this.PCf = Vector2D_1.Vector2D.Create(Math.floor(l.Width / 2), Math.floor(l.Width / 2));
      }
      if (l.Height % 2 == 0) {
        this.ACf = Vector2D_1.Vector2D.Create(l.Height / 2 - 1, l.Height / 2);
      } else {
        this.ACf = Vector2D_1.Vector2D.Create(Math.floor(l.Height / 2), Math.floor(l.Height / 2));
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[StartRollBlockBirthEffect] 出生表现开始", ["Width", this.PCf], ["Height", this.ACf]);
      }
      l.InitState = "处理出生表现";
      this.DCf.clear();
      for (let t = this.PCf.X; t <= this.PCf.Y; t++) {
        for (let o = this.ACf.X; o <= this.ACf.Y; o++) {
          var e = new SceneItemJigsawBaseComponent_1.JigsawIndex(t, o);
          l.IndexedEntityMap.get(e.GetKey())?.forEach(o => {
            this.DCf.add(o);
          });
        }
      }
      for (const n of this.DCf) {
        var t = n.Entity;
        var i = t.GetComponent(217);
        if (i === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RollBlock", 31, "[StartRollBlockBirthEffect] BaseTagComponent不存在", ["IncId", o], ["EntityId", t.Id]);
          }
        } else {
          i.RemoveTag(1090344258);
        }
      }
      this.nyf = o;
      this.UCf = TimerSystem_1.TimerSystem.Forever(this.xCf, this.GameplaySetting.ShowBlockInterval);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RollBlock", 31, "[StartRollBlockBirthEffect] 出生表现开始", ["HandleId", this.UCf?.Id]);
      }
    }
  }
  static RegisterRollBlockToGameplay(o, t) {
    var l = this.Etm.get(t);
    if (l === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[RegisterRollBlockToGameplay] IncId不存在", ["IncId", t]);
      }
    } else {
      l.RollBlockEntities.push(o);
    }
  }
  static RegisterVisionRollBlockToGameplay(o) {
    var t = this.Etm.get(o);
    if (t === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[RegisterTipActorCreated] IncId不存在", ["IncId", o]);
      }
    } else {
      t.HasTipActorNum++;
    }
  }
  static UnRegisterVisionRollBlockToGameplay(o) {
    var t = this.Etm.get(o);
    if (t === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[UnRegisterVisionRollBlockToGameplay] IncId不存在", ["IncId", o]);
      }
    } else {
      t.HasTipActorNum--;
    }
  }
  static GetForwardVector(o) {
    var t = this.Etm.get(o);
    if (t !== undefined) {
      return t.Forward;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RollBlock", 31, "[GetFowardVector] IncId不存在", ["IncId", o]);
    }
  }
  static GetRightVector(o) {
    var t = this.Etm.get(o);
    if (t !== undefined) {
      return t.Right;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RollBlock", 31, "[GetRightVector] IncId不存在", ["IncId", o]);
    }
  }
  static GetIsMultiBlock() {
    var o = this.Etm.get(this.Ttm);
    if (o === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[GetIsMultiBlock] IncId不存在", ["IncId", this.Ttm]);
      }
      return false;
    } else {
      return o.MultiBlock;
    }
  }
  static IsCurrentIncId(o) {
    return this.Ttm === o;
  }
  static GetCurrentDifficulty() {
    var o = this.Etm.get(this.Ttm);
    if (o === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[GetCurrentDifficulty] IncId不存在", ["IncId", this.Ttm]);
      }
      return -1;
    } else {
      return o.Difficulty;
    }
  }
  static GetTotalDifficulty() {
    var o = this.Etm.get(this.Ttm);
    if (o === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[GetTotalDifficulty] IncId不存在", ["IncId", this.Ttm]);
      }
      return -1;
    } else {
      return o.TotalDifficulty;
    }
  }
  static TYf() {
    const t = this.Etm.get(this.Ttm);
    var o;
    if (t === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RollBlock", 31, "[GetTotalDifficulty] IncId不存在", ["IncId", this.Ttm]);
      }
    } else {
      (o = Protocol_1.Aki.Protocol.wWf.create()).w5n = this.Ttm;
      t.InitState = "等待玩法准备完毕";
      Net_1.Net.Call(27786, o, o => {
        if (o !== undefined) {
          if (o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RollBlock", 93, "[GamePlayReadyRequest] Proto_RollBlockGamePlayReadyRequest失败", ["errorCode", o.Cvs]);
            }
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("RollBlock", 93, "[GamePlayReadyRequest] Proto_RollBlockGamePlayReadyRequest成功");
            }
            if (this.j7f) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("RollBlock", 93, "[GamePlayReadyRequest] 引导中，等待引导结束再通知完成");
              }
              t.InitState = "等待引导组完成";
            } else {
              t.InitState = "全部完成";
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RollBlockAllCompleted);
            }
          }
        }
      });
    }
  }
  static NotifyServerShowAllBlock() {
    var o = this.Etm.get(this.Ttm)?.RollBlockEntities;
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[NotifyServerShowAllBlock] RollBlockEntities不存在", ["IncId", this.Ttm]);
      }
    } else {
      for (const t of o) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t.Entity, true, "RollBlockController");
      }
    }
  }
  static UpdateRollBlockItem(o) {
    var t;
    var l = MathUtils_1.MathUtils.LongToNumber(o.F4n);
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(l);
    if (e?.Valid) {
      if (o.C3s) {
        if ((t = e.Entity?.GetComponent(333)) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RollBlock", 93, "[UpdateRollBlockItem] rbItemComponent", ["EntityId", e?.Entity?.Id]);
          }
        } else {
          t.UpdateRollBlockItem(o.C3s);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 93, "[UpdateRollBlockItem] 下发的组件信息不存在", ["EntityId", l]);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RollBlock", 93, "[UpdateRollBlockItem] 下发的实体不存在", ["EntityId", l]);
    }
  }
}
exports.RollBlockController = RollBlockController;
(_a = RollBlockController).Etm = new Map();
RollBlockController.kHa = new Map();
RollBlockController.yQ1 = new Map();
RollBlockController.Itm = false;
RollBlockController.Ttm = undefined;
RollBlockController.K8g = undefined;
RollBlockController.ydd = false;
RollBlockController.GameplaySetting = undefined;
RollBlockController.MSm = undefined;
RollBlockController.ESm = new Set();
RollBlockController.pct = false;
RollBlockController.RCf = 0;
RollBlockController.wCf = 0;
RollBlockController.L9g = new Map();
RollBlockController.j7f = false;
RollBlockController.f_g = undefined;
RollBlockController.j6g = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("RollBlock", 31, "[OnClickReset] 重置操作开始");
  }
  var o = Protocol_1.Aki.Protocol.Vem.create();
  o.w5n = _a.Ttm;
  Net_1.Net.Call(19531, o, o => {
    if (o !== undefined) {
      if (o.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RollBlock", 31, "[OnClickReset] Proto_RollBlockResetGamePlayRequest失败", ["errorCode", o.Cvs]);
        }
        _a.ydd = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRollBlockReseting, "失败");
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRollBlockReseting, "成功");
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[OnClickReset] Proto_RollBlockResetGamePlayRequest成功");
        }
      }
    }
  });
};
RollBlockController.Btm = undefined;
RollBlockController.PCf = Vector2D_1.Vector2D.Create();
RollBlockController.ACf = Vector2D_1.Vector2D.Create();
RollBlockController.DCf = new Set();
RollBlockController.UCf = undefined;
RollBlockController.nyf = 0;
RollBlockController.xCf = () => {
  var t = _a.Etm.get(_a.nyf);
  if (t === undefined) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RollBlock", 31, "[SliceBirthEffect] IncId不存在", ["IncId", _a.nyf]);
    }
    TimerSystem_1.TimerSystem.Remove(_a.UCf);
  } else if (_a.PCf.X === 0 && _a.PCf.Y === t.Width - 1 && _a.ACf.X === 0 && _a.ACf.Y === t.Height - 1) {
    TimerSystem_1.TimerSystem.Remove(_a.UCf);
    for (const i of t.EntityIds) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(i)?.Entity;
      if (o === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[OnAllSceneItemLoadCompleted] Entity不存在", ["IncId", _a.Ttm], ["EntityId", i]);
        }
      } else if ((o = o.GetComponent(330)) === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[OnAllSceneItemLoadCompleted] rbBaseComponent不存在", ["IncId", _a.Ttm], ["EntityId", i]);
        }
      } else {
        o.OnActualShow();
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RollBlock", 31, "[SliceBirthEffect] 出生表现完成, 进行玩法准备通知");
    }
    _a.TYf();
  } else {
    _a.DCf.clear();
    _a.PCf.X = Math.max(0, _a.PCf.X - 1);
    _a.PCf.Y = Math.min(t.Width - 1, _a.PCf.Y + 1);
    _a.ACf.X = Math.max(0, _a.ACf.X - 1);
    _a.ACf.Y = Math.min(t.Height - 1, _a.ACf.Y + 1);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RollBlock", 31, "[SliceBirthEffect] 出生表现分帧", ["Width", _a.PCf], ["Height", _a.ACf]);
    }
    for (let o = _a.PCf.X; o <= _a.PCf.Y; o++) {
      const n = new SceneItemJigsawBaseComponent_1.JigsawIndex(o, _a.ACf.X);
      t.IndexedEntityMap.get(n.GetKey())?.forEach(o => {
        _a.DCf.add(o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[SliceBirthEffect] 上边界", ["Index", n.GetKey()]);
        }
      });
    }
    for (let o = _a.PCf.X; o <= _a.PCf.Y; o++) {
      const c = new SceneItemJigsawBaseComponent_1.JigsawIndex(o, _a.ACf.Y);
      t.IndexedEntityMap.get(c.GetKey())?.forEach(o => {
        _a.DCf.add(o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[SliceBirthEffect] 下边界", ["Index", c.GetKey()]);
        }
      });
    }
    for (let o = _a.ACf.X + 1; o <= _a.ACf.Y - 1; o++) {
      const r = new SceneItemJigsawBaseComponent_1.JigsawIndex(_a.PCf.X, o);
      t.IndexedEntityMap.get(r.GetKey())?.forEach(o => {
        _a.DCf.add(o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[SliceBirthEffect] 左边界", ["Index", r.GetKey()]);
        }
      });
    }
    for (let o = _a.ACf.X + 1; o <= _a.ACf.Y - 1; o++) {
      const s = new SceneItemJigsawBaseComponent_1.JigsawIndex(_a.PCf.Y, o);
      t.IndexedEntityMap.get(s.GetKey())?.forEach(o => {
        _a.DCf.add(o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[SliceBirthEffect] 右边界", ["Index", s.GetKey()]);
        }
      });
    }
    for (const _ of _a.DCf) {
      var l = _.Entity;
      var e = l.GetComponent(217);
      if (e === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RollBlock", 31, "[StartRollBlockBirthEffect] BaseTagComponent不存在", ["IncId", _a.Ttm], ["EntityId", l.Id]);
        }
      } else {
        e.RemoveTag(1090344258);
      }
    }
  }
};
RollBlockController.Ecu = (o, t, l) => {
  var e = t.CreatureDataId;
  if (e === undefined) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RollBlock", 31, "[OnEntityCreated] CreatureDataId不存在", ["EntityId", t.Id]);
    }
  } else {
    for (var [i, n] of _a.Etm) {
      if (n.EntityIds.includes(e) || n.InitVisibleEntityIds.includes(e)) {
        n = t?.Entity?.GetComponent(330);
        if (n === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RollBlock", 31, "[OnEntityCreated] rbBaseComponent不存在", ["EntityId", t?.Entity?.Id]);
          }
          return;
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("RollBlock", 31, "[OnEntityCreated] 实体创建, 注册到IncId", ["EntityId", t?.CreatureDataId], ["IncId", i]);
        }
        n.RegisterToGameplay(i);
        if (n instanceof RbBlockComponent_1.RbBlockComponent && !n.IsVisionBlock) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RollBlock", 93, "[OnEntityCreated] 监听主方块移除事件", ["EntityId", t?.CreatureDataId]);
          }
          EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.RemoveEntity, _a.Rkg);
        }
      }
    }
  }
};
RollBlockController.Rkg = (o, t) => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("RollBlock", 93, "[OnMainBlockEntityRemoved] 主方块移除", ["EntityId", t?.CreatureDataId], ["removeType", o]);
  }
  if (o === Protocol_1.Aki.Protocol.Fks.Proto_RbBlockDestroyed) {
    _a.OnClickReset(true, true);
  }
  if (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.RemoveEntity, _a.Rkg)) {
    EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.RemoveEntity, _a.Rkg);
  }
};
RollBlockController.IJt = (o, t) => {
  if (_a.Etm.get(_a.Ttm)) {
    if (o === "GuideTutorialView" || o === "GuideTutorialPopView") {
      _a.j7f = true;
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, _a.$7f);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RollBlock", 93, "滚方块玩法途中触发引导", ["viewName", o]);
      }
    }
  } else {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, _a.IJt);
  }
};
RollBlockController.$7f = (o, t) => {
  var l;
  if (o === "GuideTutorialView" || o === "GuideTutorialPopView") {
    _a.j7f = false;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, _a.$7f);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, _a.IJt);
    if ((l = _a.Etm.get(_a.Ttm)) && (l.InitState !== "等待玩法准备完毕" && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("RollBlock", 93, "引导结束，且不处于等待玩法准备完成通知，通知完成", ["viewName", o]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RollBlockAllCompleted)), l.InitState === "等待引导组完成")) {
      l.InitState = "全部完成";
    }
  }
};
RollBlockController.ExitOnOnlineModeChange = () => {
  if (_a.K8g !== undefined) {
    _a.ExitRollBlockGameplay(_a.K8g, false);
  } else {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveOnlineWorld, _a.ExitOnOnlineModeChange);
  }
}; //# sourceMappingURL=RollBlockController.js.map