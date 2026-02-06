"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackedMark = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
const MapController_1 = require("../../Map/Controller/MapController");
const MapDefine_1 = require("../../Map/MapDefine");
const MapUtil_1 = require("../../Map/MapUtil");
const TaskTrackedMarkItem_1 = require("../../Map/Marks/MarkItem/TaskTrackedMarkItem");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const TrackDefine_1 = require("../../Track/TrackDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BattleUiControl_1 = require("../BattleUiControl");
const WAVE_COLOR_NEAR = "86FF83";
const WAVE_COLOR_MIDDLE = "FFE683";
const WAVE_COLOR_FAR = "FFFFFF";
const VARNAME_WAVE_CYCLE_TIME = "LifeTime";
const VARNAME_WAVE_NUM_SCALE = "Scale";
const VARNAME_WAVE_COLOR = "Color";
const VARNAME_WAVE_ROTATION = "Rotation";
const TRACKA = "TrackA";
const TRACKB = "TrackB";
const TRACKC = "TrackC";
const DELAY_TIME = 500;
const SUB_SCALE = 0.8;
const QUEST_TRACK_MARK_INDEX = 999;
class TrackedMark extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    var i;
    super();
    this.FNl = t;
    this.TrackTarget = undefined;
    this.$pl = 0;
    this.IsSubTrack = false;
    this.ihl = undefined;
    this.rhl = false;
    this.pCt = false;
    this.Xq1 = false;
    this.xst = "";
    this.y$e = 0;
    this.I$e = 0;
    this.ScreenPositionRef = (0, puerts_1.$ref)(undefined);
    this.PointTransport = Vector2D_1.Vector2D.Create(1, -1);
    this.MarkHideDis = 0;
    this.vCt = 0;
    this.MCt = 0;
    this.ohl = 0;
    this.ECt = 0;
    this.SCt = undefined;
    this.IsInTrackRange = false;
    this.TempTrackPosition = undefined;
    this.ScreenPosition = undefined;
    this.LastScreenPosition = undefined;
    this.InRange = false;
    this.TempRotator = undefined;
    this.LCt = 0;
    this.DCt = -1;
    this.ShouldShowTrackMark = true;
    this.RCt = undefined;
    this.yB = Vector_1.Vector.Create();
    this.ACt = false;
    this.PCt = false;
    this.xCt = undefined;
    this.DirectionComp = undefined;
    this.BCt = undefined;
    this.bCt = undefined;
    this.NiagaraNeedActivateNextTick = false;
    this.GCt = -0;
    this.NCt = -0;
    this.CurShowTime = -0;
    this.kCt = -0;
    this.FCt = false;
    this.IsForceHideDirection = false;
    this.HCt = false;
    this.jCt = false;
    this.WCt = 0;
    this.KCt = 0;
    this.QCt = 0;
    this.XCt = 0;
    this.Wza = undefined;
    this._Fl = false;
    this.yJf = false;
    this.SJf = false;
    this.MJf = undefined;
    this.EJf = undefined;
    this.IJf = undefined;
    this.TJf = undefined;
    this.bJf = undefined;
    this.ilt = () => {
      var t;
      if (!ModelManager_1.ModelManager.TrackModel.IsForceCloseTracked()) {
        if (t = MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(this.TrackTarget, true)) {
          BattleUiControl_1.BattleUiControl.FocusToTargetLocation(t);
        }
      }
    };
    this.Tct = t => {
      if (t === "Start") {
        this.PCt = false;
      } else if (t === "Close") {
        this.RootItem?.SetUIActive(false);
      }
    };
    this.VZa = [2, 4, 3];
    this.$Ct = t => {
      if (t === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest && !this.IsInTrackRange) {
        this.YCt();
      }
    };
    this.JCt = (t, i, s) => {
      if (t.Type === 6 && t.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest) {
        this.YCt();
      }
    };
    this.zCt = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 39, "[TrackedMark] [疑难杂症] 播放点声源特效", ["MarkId", this.MCt], ["EffectDuration", t], ["TrackType", this.WCt], ["UIActiveSelf", this.RootItem?.IsUIActiveSelf()]);
      }
      if (this.WCt === 1 && !(t <= 0)) {
        if (this.RootItem.IsUIActiveSelf()) {
          this.ZCt();
          this.GCt = t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
          this.NCt = 0;
          this.NiagaraNeedActivateNextTick = true;
        }
      }
    };
    this.YCt = () => {
      if (this.RCt) {
        let t = this.yJf ? TRACKB : TRACKA;
        if (!this.SJf) {
          t = TRACKC;
        }
        var i = this.RCt.GetCurrentSequence();
        if (this.jCt) {
          if (i !== t) {
            this.RCt.PlayLevelSequenceByName(t);
          }
          this.RCt.StopCurrentSequence(true, true);
        } else if (i !== t && this.BCt.bIsUIActive) {
          this.CurShowTime = 0;
          this.RCt.PlayLevelSequenceByName(t);
        }
      }
    };
    this.egt = (t, i, s, e, h) => {
      if (t === this.ECt && e === this.MCt) {
        this.IsInTrackRange = h;
        this.BCt?.SetUIActive(!h);
      }
    };
    if (GlobalData_1.GlobalData.World) {
      this.ECt = t.TrackSource;
      this.xst = t.IconPath;
      this.vCt = t.ShowGroupId;
      this.MCt = t.Id;
      this.ohl = t.MarkType ?? 0;
      this.yJf = t.WeakTrack ?? false;
      if (t.TaskMarkConfigId && (i = ConfigManager_1.ConfigManager.MapConfig.GetTaskMarkConfig(t.TaskMarkConfigId))) {
        this.SJf = true;
        this.MJf = i.MarkRingPic;
        this.EJf = i.MarkIcon;
        this.IJf = i.RingColor;
        this.TJf = i.SmallHaloColor;
        this.bJf = i.LargeHaloColor;
        this.SJf = !StringUtils_1.StringUtils.IsBlank(this.MJf) && !StringUtils_1.StringUtils.IsBlank(this.EJf) && !StringUtils_1.StringUtils.IsBlank(this.TJf) && !StringUtils_1.StringUtils.IsBlank(this.bJf);
      }
      if ((i = ModelManager_1.ModelManager.MapModel.GetDynamicMark(this.MCt)) instanceof MapDefine_1.QuestMarkCreateInfo) {
        this.Wza = new TaskTrackedMarkItem_1.TaskTrackedMarkItem(i, this.ECt);
      }
      if (t.TrackAutoCancelDistance !== -1 && t.TrackAutoCancelDistance !== undefined) {
        this.ihl = t.TrackAutoCancelDistance * MapDefine_1.FLOAT_0_01;
      }
      this.rhl = false;
      this.MarkHideDis = t.TrackHideDis;
      this.TrackTarget = t.TrackTarget;
      this.$pl = t.TrackInstanceId ?? ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id;
      this.IsInTrackRange = t.IsInTrackRange ?? false;
      this.ACt = t.AutoHideTrack ?? false;
      this.kCt = CommonParamById_1.configCommonParamById.GetIntConfig("QuestMarkTrackStayTime") ?? 10;
      this.yB = t.Offset ?? Vector_1.Vector.Create();
      this.GCt = 0;
      this.NCt = 0;
      this.NiagaraNeedActivateNextTick = false;
      this.IsSubTrack = t.IsSubTrack ?? false;
      this.WCt = t.TrackType ?? 0;
      if (this.WCt === 1) {
        this.FCt = true;
        this.IsForceHideDirection = true;
        this.jCt = true;
        this.HCt = true;
        i = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.MCt)?.Entity?.GetComponent(171);
        this.KCt = (i?.AudioPointNearRadius ?? 0) * MapDefine_1.FLOAT_0_01;
        this.QCt = (i?.AudioPointMiddleRadius ?? 0) * MapDefine_1.FLOAT_0_01;
        this.XCt = (i?.AudioPointFarRadius ?? 0) * MapDefine_1.FLOAT_0_01;
      } else {
        this.FCt = false;
        this.IsForceHideDirection = false;
        this.jCt = false;
        this.HCt = false;
      }
      this.TempTrackPosition = Vector_1.Vector.Create();
      this.ScreenPosition = Vector2D_1.Vector2D.Create();
      this.LastScreenPosition = Vector2D_1.Vector2D.Create();
      this.TempRotator = Rotator_1.Rotator.Create();
      t = UiLayer_1.UiLayer.UiRootItem;
      this.y$e = Math.min(TrackDefine_1.MAX_A, ((t?.GetWidth() ?? 0) - TrackDefine_1.MARGIN_A) / 2);
      this.I$e = Math.min(TrackDefine_1.MAX_B, ((t?.GetHeight() ?? 0) - TrackDefine_1.MARGIN_B) / 2);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt);
    }
  }
  Initialize(t) {
    this.CreateThenShowByResourceIdAsync("UiItem_TrackedMarkMain", t, true);
  }
  CreateMark() {
    this.PCt = true;
    this.YCt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UINiagara], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UISprite]];
    this.BtnBindInfo = [[3, this.ilt]];
  }
  OnStart() {
    this.xCt = this.GetItem(4);
    this.DirectionComp = this.GetItem(2);
    this.BCt = this.GetItem(6);
    this.xCt.SetUIActive(false);
    this.DirectionComp.SetUIActive(!this.IsInTrackRange && !this.IsForceHideDirection);
    this.BCt.SetUIActive(false);
    this.GetSprite(7)?.SetUIActive(false);
    var t = this.GetSprite(10);
    var i = this.GetSprite(8);
    var s = this.GetSprite(9);
    var e = this.GetItem(11);
    i?.SetUIActive(this.SJf);
    s?.SetUIActive(this.SJf);
    t?.SetUIActive(this.SJf);
    e.SetUIActive(this.SJf);
    if (this.SJf) {
      if (!StringUtils_1.StringUtils.IsBlank(this.EJf)) {
        this.SetSpriteByPath(this.MJf, t, false);
      }
      if (!StringUtils_1.StringUtils.IsBlank(this.IJf)) {
        t.SetColor(UE.Color.FromHex(this.IJf));
        e.SetColor(UE.Color.FromHex(this.IJf));
      }
      if (!StringUtils_1.StringUtils.IsBlank(this.bJf)) {
        i.SetColor(UE.Color.FromHex(this.bJf));
      }
      if (!StringUtils_1.StringUtils.IsBlank(this.TJf)) {
        s.SetColor(UE.Color.FromHex(this.TJf));
      }
    }
    this.RCt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.RCt.BindSequenceCloseEvent(this.Tct);
    this.bCt = this.GetUiNiagara(5);
    this.bCt.SetUIActive(false);
    this.ehi(true);
    this.BCt.SetUIActive(!this.IsInTrackRange && !this.HCt);
    if (this.ECt === 5) {
      this.RootItem?.SetHierarchyIndex(QUEST_TRACK_MARK_INDEX);
    }
    this.CreateMark();
    this.OnUiShow();
  }
  OnBeforeDestroy() {
    this.TrackTarget = undefined;
    this.Wza = undefined;
    this.PointTransport = undefined;
    this.RCt?.Clear();
    this.RCt = undefined;
    if (TimerSystem_1.TimerSystem.Has(this.SCt)) {
      TimerSystem_1.TimerSystem.Remove(this.SCt);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.egt);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct);
    }
  }
  OnUiShow() {
    var t;
    if (this.WCt === 1 && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.MCt)) && !EventSystem_1.EventSystem.HasWithTarget(t.Entity, EventDefine_1.EEventName.PlaySoundTrackEffect, this.zCt)) {
      EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.PlaySoundTrackEffect, this.zCt);
    }
    this.SCt = TimerSystem_1.TimerSystem.Delay(this.YCt, DELAY_TIME);
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct);
    }
    if (this.IsSubTrack) {
      this.RootItem?.SetRelativeScale3D(new UE.Vector(SUB_SCALE, SUB_SCALE, SUB_SCALE));
    } else {
      this.RootItem?.SetRelativeScale3D(new UE.Vector(1, 1, 1));
    }
  }
  OnUiHide() {
    var t;
    if (this.WCt === 1 && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.MCt)) && EventSystem_1.EventSystem.HasWithTarget(t.Entity, EventDefine_1.EEventName.PlaySoundTrackEffect, this.zCt)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.PlaySoundTrackEffect, this.zCt);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeNodeStatusChange, this.JCt);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLogicTreeTrackUpdate, this.$Ct);
    }
  }
  UpdateTrackTarget(t) {
    this.TrackTarget = t;
  }
  ehi(t = false) {
    var i = this.SJf && !StringUtils_1.StringUtils.IsBlank(this.EJf) ? this.EJf : this.FNl.IconPath;
    var t = t || i !== this.xst;
    this.xst = i;
    if (t && this.xst) {
      this.SetSpriteByPath(this.xst, this.GetSprite(0), false);
    }
  }
  SetVisibleByOccupied(t) {
    this.pCt = t;
  }
  SetVisibleByInteractionSpotOccupied(t) {
    this.Xq1 = t;
  }
  UpdateTrackDistance() {
    var t;
    var i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (i) {
      MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(this.TrackTarget, true, this.TempTrackPosition, this.$pl);
      if (!this.yB.Equals(Vector_1.Vector.ZeroVectorProxy) && this.TrackTarget instanceof UE.Actor && this.TrackTarget.IsValid()) {
        (t = Vector_1.Vector.Create()).FromUeVector(this.TrackTarget.D_GetTransform().TransformPositionNoScale(this.yB.ToUeVector()));
        this.TempTrackPosition = t;
      }
      t = Vector_1.Vector.Distance(i, this.TempTrackPosition) * MapDefine_1.FLOAT_0_01;
      this.LCt = t;
      ModelManager_1.ModelManager.TrackModel.UpdateGroupMinDistance(this.vCt, t);
    }
  }
  Update(t) {
    var i;
    var s;
    var e;
    if (GlobalData_1.GlobalData.World) {
      if (UiLayer_1.UiLayer.UiRootItem) {
        if (this.RootItem) {
          if (this.Wza) {
            this.Wza.Update();
          }
          i = this.LCt;
          if (!this.rhl) {
            if (this.ihl && this.ihl >= i) {
              if (this.ohl !== 0) {
                MapController_1.MapController.RequestTrackMapMark({
                  MarkType: this.ohl,
                  MarkId: this.MCt,
                  Track: false
                }, (t, i) => {
                  if (t === 0) {
                    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("MapTrackingCanceled_Text");
                  }
                });
                this.rhl = true;
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Map", 63, "[追踪标记]->自动取消标记追踪失败，请检查配置或是否逻辑漏传参数", ["MarkType", this.ohl], ["MarkId", this.MCt]);
              }
            }
          }
          this.CurShowTime += t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
          e = (s = this.tgt()) !== this._Fl;
          this._Fl = s;
          if (this._Fl) {
            if (e) {
              this.ehi();
            }
            if (i < this.MarkHideDis && !this.PCt) {
              this.RootItem.SetUIActive(false);
              if (this.WCt === 1) {
                this.ZCt();
              }
            } else {
              this.hj1(true);
              this.UpdatePositionAndRotation(t);
              s = this.GetItem(4);
              if (!this.InRange || this.IsInTrackRange || this.FCt) {
                s?.SetUIActive(false);
                this.GetSprite(12)?.SetUIActive(false);
              } else {
                e = Math.round(i);
                if (this.DCt !== e) {
                  this.DCt = e;
                  LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Text_Meter_Text", this.DCt.toString());
                }
                s?.SetUIActive(true);
                this.GetSprite(12)?.SetUIActive(ModelManager_1.ModelManager.AutoPilotModel?.GetIsTracking(this.MCt) ?? false);
              }
              if (this.WCt === 1) {
                this.ogt(t);
              }
              this.GetItem(6)?.SetUIActive(!this.IsInTrackRange && !this.HCt);
            }
          } else {
            this.hj1(false);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 63, "【疑难杂症】标记固定在屏幕中心，RootItem为空");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Map", 63, "【疑难杂症】标记固定在屏幕中心，GameWorld为空");
    }
  }
  UpdatePositionAndRotation(t) {
    var i;
    var s = Global_1.Global.CharacterController;
    var e = this.TempTrackPosition.ToUeVector();
    var h = UE.GameplayStatics.D_ProjectWorldToScreen(s, e, this.ScreenPositionRef);
    if (!h) {
      (e = (i = ModelManager_1.ModelManager.CameraModel.CameraTransform).InverseTransformPositionNoScale(e)).X = -e.X;
      i = i.TransformPositionNoScale(e);
      UE.GameplayStatics.D_ProjectWorldToScreen(s, i, this.ScreenPositionRef);
    }
    var e = (0, puerts_1.$unref)(this.ScreenPositionRef);
    this.ScreenPosition.Set(e.X, e.Y);
    if (!this.LastScreenPosition.Equals(this.ScreenPosition, 1) || !!this.NiagaraNeedActivateNextTick) {
      this.LastScreenPosition.DeepCopy(this.ScreenPosition);
      s = ModelManager_1.ModelManager.BattleUiModel;
      this.ScreenPosition.MultiplyEqual(s.ScreenPositionScale).AdditionEqual(s.ScreenPositionOffset).MultiplyEqual(this.PointTransport);
      this.InRange = this.ClampToEllipse(this.ScreenPosition, h);
      i = this.ScreenPosition.AdditionEqual(TrackDefine_1.center);
      this.RootItem.SetAnchorOffset(i.ToUeVector2D());
      e = this.GetItem(2);
      if (this.InRange || this.IsInTrackRange || this.IsForceHideDirection) {
        e?.SetUIActive(false);
      } else {
        this.TempRotator.Reset();
        this.TempRotator.Yaw = Math.atan2(this.ScreenPosition.Y, this.ScreenPosition.X) * TrackDefine_1.RAD_2_DEG;
        e?.SetUIRelativeRotation(this.TempRotator.ToUeRotator());
        e?.SetUIActive(true);
      }
      s = this.GetUiNiagara(5);
      if (this.InRange || this.WCt !== 1) {
        s?.SetNiagaraVarFloat(VARNAME_WAVE_ROTATION, 0.25);
      } else {
        h = Math.atan2(this.ScreenPosition.Y, this.ScreenPosition.X) / (Math.PI * 2);
        s?.SetNiagaraVarFloat(VARNAME_WAVE_ROTATION, h);
      }
    }
  }
  MoveTowards(t, i, s) {
    var e = i.X - t.X;
    var i = i.Y - t.Y;
    var h = Math.sqrt(e * e + i * i);
    var i = Math.atan2(i, e);
    var e = s * Math.abs(h) / (h + 1);
    return new Vector2D_1.Vector2D(t.X + e * Math.cos(i), t.Y + e * Math.sin(i));
  }
  tgt() {
    if (this.TempTrackPosition?.IsNearlyZero()) {
      return false;
    }
    if (this.pCt || this.Xq1) {
      return false;
    }
    if (this.ACt && this.CurShowTime > this.kCt) {
      return false;
    }
    if (this.Wza && this.Wza.TargetInDiffWorld()) {
      return false;
    }
    if (!ModelManager_1.ModelManager.TrackModel.CanShowInGroup(this.vCt, this.LCt) || !this.ShouldShowTrackMark) {
      return false;
    }
    if (typeof this.TrackTarget == "number" && !ModelManager_1.ModelManager.CreatureModel.CheckEntityVisible(this.TrackTarget)) {
      return false;
    }
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      let t = false;
      for (const i of this.VZa) {
        if (t = t || ModelManager_1.ModelManager.TrackModel.IsTracking(i, this.MCt)) {
          break;
        }
      }
      return t;
    }
    return ModelManager_1.ModelManager.TrackModel.IsTracking(this.ECt, this.MCt);
  }
  ClampToEllipse(t, i) {
    var s = t.X;
    var e = t.Y;
    var h = this.y$e;
    var r = this.I$e;
    return !!i && !!(s * s / (h * h) + e * e / (r * r) <= 1) || (i = h * r / Math.sqrt(r * r * s * s + h * h * e * e), t.MultiplyEqual(i), false);
  }
  ogt(t) {
    if (this.WCt === 1 && (this.bCt.IsUIActiveSelf() || this.NiagaraNeedActivateNextTick)) {
      if (this.NiagaraNeedActivateNextTick) {
        this.NiagaraNeedActivateNextTick = false;
        this.bCt.SetNiagaraVarFloat(VARNAME_WAVE_CYCLE_TIME, this.GCt);
        if (this.LCt <= this.KCt) {
          this.bCt.SetNiagaraVarFloat(VARNAME_WAVE_NUM_SCALE, 1);
          this.bCt.SetNiagaraVarLinearColor(VARNAME_WAVE_COLOR, new UE.LinearColor(UE.Color.FromHex(WAVE_COLOR_NEAR)));
        } else if (this.LCt > this.KCt && this.LCt <= this.QCt) {
          this.bCt.SetNiagaraVarFloat(VARNAME_WAVE_NUM_SCALE, 2 / 3);
          this.bCt.SetNiagaraVarLinearColor(VARNAME_WAVE_COLOR, new UE.LinearColor(UE.Color.FromHex(WAVE_COLOR_MIDDLE)));
        } else if (this.LCt > this.QCt && this.LCt <= this.XCt) {
          this.bCt.SetNiagaraVarFloat(VARNAME_WAVE_NUM_SCALE, 1 / 3);
          this.bCt.SetNiagaraVarLinearColor(VARNAME_WAVE_COLOR, new UE.LinearColor(UE.Color.FromHex(WAVE_COLOR_FAR)));
        }
        this.bCt.SetUIActive(true);
      }
      if (this.NCt >= this.GCt) {
        this.ZCt();
      } else {
        this.NCt += t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
      }
    }
  }
  ZCt() {
    this.bCt.SetUIActive(false);
    this.GCt = 0;
    this.NCt = 0;
    this.NiagaraNeedActivateNextTick = false;
  }
  hj1(t) {
    if (this.RootItem && this.RootItem.IsUIActiveSelf() !== t) {
      if (t) {
        this.RootItem.SetUIActive(true);
        this.YCt();
      } else if (this.DCt < 0) {
        this.RootItem.SetUIActive(false);
      } else {
        this.RCt?.PlayLevelSequenceByName("Close");
      }
    }
  }
}
exports.TrackedMark = TrackedMark;
//# sourceMappingURL=TrackedMark.js.map