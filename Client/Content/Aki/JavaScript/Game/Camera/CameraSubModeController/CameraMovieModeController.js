"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraMovieModeController = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const Global_1 = require("../../Global");
const SimpleLevelSequenceActor_1 = require("../../LevelGamePlay/StaticScene/SimpleLevelSequenceActor");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CameraSubModeController_1 = require("./CameraSubModeController");
const MOVIE_CAMER_CONFIG_PATH = "/Game/Aki/Data/Camera/DT_MovieCameraConfigList.DT_MovieCameraConfigList";
const SPECIAL_MOVIE_CAMER_CONFIG_PATH = "/Game/Aki/Data/Camera/DT_SpecialMovieCameraConfigList.DT_SpecialMovieCameraConfigList";
const MOVIE_CONFIG_DA_PATH = "/Game/Aki/Data/Camera/DA_MovieCameraConfig.DA_MovieCameraConfig";
const INVALID_GAMEPLAYTAGID = -1;
const CAMERA_TAG = new UE.FName("SequenceCamera");
const movieModeTagList = [589104572];
class MovieCameraConfig {
  constructor() {
    this.SmoothFactor = 10;
    this.SmoothDelta = 0;
  }
  Init(i) {
    this.SmoothFactor = i.ZSmoothFactor;
    this.SmoothDelta = i.ZSmoothDelta;
  }
}
class CameraMovieModeController extends CameraSubModeController_1.CameraSubModeController {
  constructor() {
    super(...arguments);
    this.tZ = false;
    this.Lo = undefined;
    this.wff = false;
    this.Lff = undefined;
    this.Pff = "";
    this.pkf = undefined;
    this.Aff = undefined;
    this.wMf = undefined;
    this.unf = false;
    this.cnf = undefined;
    this.dnf = "";
    this.mnf = -1;
    this.Nhf = undefined;
    this.fnf = undefined;
    this.vkf = [];
    this.gnf = [];
    this.Cnf = new Map();
    this.pnf = new Map();
    this.ynf = -1;
    this.Snf = -1;
    this.Mnf = undefined;
    this.vnf = 0;
    this.ykf = new Map();
    this.Enf = INVALID_GAMEPLAYTAGID;
    this.Inf = undefined;
    this.Tnf = undefined;
    this.cz = Vector_1.Vector.Create();
    this.gme = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.fme = Rotator_1.Rotator.Create();
    this.pme = Rotator_1.Rotator.Create();
    this.bnf = -1;
    this.Skf = i => {
      if (i && (this.wnf(), this.vnf !== 4)) {
        this.RMf();
      }
    };
    this.Rnf = () => {
      this.wnf();
      if (this.vnf !== 4) {
        this.RMf();
      }
    };
    this.Pnf = () => {
      this.Anf();
      if (this.vnf !== 4) {
        this.RMf();
      }
    };
  }
  OnStart() {
    this.tZ = true;
  }
  async Vi(i) {
    if (!this.Lo) {
      const e = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_MovieCameraConfig_C", () => {
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.BP_MovieCameraConfig_C, i => {
          if (i) {
            this.Lo ||= new MovieCameraConfig();
            this.Lo.Init(i);
            e.SetResult(i);
          } else {
            e.SetResult(undefined);
          }
        });
      });
      return e.Promise;
    }
  }
  async PlaySpecialMovieCamera(i, e = undefined) {
    var t;
    var s;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头][特殊]请求播放, 设置DT表RowName", ["RowName", i]);
    }
    await this.Vi(MOVIE_CONFIG_DA_PATH);
    if (this.pkf) {
      this.ykf.delete(this.pkf);
      this.pkf = undefined;
    }
    this.Aff = e;
    this.vnf = 1;
    if (this.Lff) {
      this.Unf();
      if (e = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Lff, i)) {
        this.vnf = 3;
        if ((this.pkf = e).Type === 2) {
          t = e.SequenceSetting?.SequenceAsset.ToAssetPathName() ?? "";
          if (s = await this.Mkf(t)) {
            this.ykf.set(e, s);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "[电影镜头][特殊]Sequence镜头类型配置错误", ["assetPath", t]);
          }
        }
        if (this.GetCurrentPlayState() === 4) {
          this.Aff?.(false);
        } else {
          this.U_g();
          s = this.Dff(e);
          this.Aff?.(s);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "[电影镜头][特殊]Invalid MovieCameraConfigItem", ["movieCameraConfigKey", i]);
        }
        this.Aff?.(false);
      }
    } else {
      this.Pff = i;
      this.Uff();
    }
  }
  Uff() {
    if (!this.Lff && !this.wff) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头][特殊]开始异步加载DT表");
      }
      this.wff = true;
      ResourceSystem_1.ResourceSystem.LoadAsync(SPECIAL_MOVIE_CAMER_CONFIG_PATH, UE.DataTable, i => {
        this.wff = false;
        if (i) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Camera", 57, "[电影镜头][特殊]异步加载DT表成功");
          }
          this.Lff = i;
          if (this.Pff) {
            this.PlaySpecialMovieCamera(this.Pff, this.Aff);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "[电影镜头][特殊]异步加载DT表失败");
          }
          this.Aff?.(false);
        }
      });
    }
  }
  async PlayMovieCamera(i, e = -1, t = undefined) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]请求播放, 设置DT表RowName", ["RowName", i], ["初始出播索引", e]);
    }
    await this.Vi(MOVIE_CONFIG_DA_PATH);
    if (this.vkf.length > 0) {
      for (const C of this.vkf) {
        this.ykf.delete(C);
      }
      this.vkf.length = 0;
    }
    this.vnf = 1;
    if (this.cnf) {
      this.Unf();
      var s = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.cnf, i);
      if (s) {
        if (s.MovieCameraConfigItemList.Num() === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "[电影镜头]Empty MovieCameraConfig", ["movieCameraConfigKey", i]);
          }
          this.Nhf?.(false);
        } else {
          this.vnf = 2;
          this.fnf = s;
          this.dnf = i;
          this.mnf = e;
          this.vkf.length = 0;
          this.gnf.length = 0;
          this.Cnf.clear();
          this.pnf.clear();
          var a = [];
          var h = [];
          for (let i = 0; i < this.fnf.MovieCameraConfigItemList.Num(); i++) {
            var o = this.fnf.MovieCameraConfigItemList.Get(i);
            if (o.Type === 2 && (o = o.SequenceSetting.SequenceAsset?.ToAssetPathName())) {
              a.push(this.Mkf(o));
              h.push(i);
            }
          }
          var r = await Promise.all(a);
          for (let i = 0; i < this.fnf.MovieCameraConfigItemList.Num(); i++) {
            var _ = this.fnf.MovieCameraConfigItemList.Get(i);
            this.vkf.push(_);
            switch (_.Type) {
              case 2:
                {
                  const l = _.SequenceSetting.SequenceAsset?.ToAssetPathName();
                  var n = r.find(i => i && l.endsWith(i.GetName()));
                  if (n && n.HasBindingTag(CAMERA_TAG, true)) {
                    this.Cnf.set(i, this.gnf.length);
                    this.pnf.set(this.gnf.length, i);
                    this.gnf.push(i);
                    this.ykf.set(_, n);
                  } else if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("Camera", 57, "[电影镜头]Sequence镜头类型配置错误", ["index", i]);
                  }
                  break;
                }
              case 1:
                if (GameplayTagUtils_1.GameplayTagUtils.IsValidTag(_.FightSubCameraSetting.FightSubCameraTag)) {
                  this.Cnf.set(i, this.gnf.length);
                  this.pnf.set(this.gnf.length, i);
                  this.gnf.push(i);
                } else if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Camera", 57, "[电影镜头]Fight镜头类型配置错误", ["index", i]);
                }
                break;
              default:
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Camera", 57, "[电影镜头]不支持的配置类型", ["Type", _.Type]);
                }
            }
          }
          if (this.GetCurrentPlayState() === 4) {
            this.Nhf?.(false);
          } else {
            let i = true;
            if (this.mnf !== -1) {
              i = this.bnf < 0 ? this.xnf(this.mnf) : this.xnf(this.bnf);
            } else {
              this.RMf();
            }
            this.U_g();
            this.Nhf?.(i);
          }
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "[电影镜头]Invalid MovieCameraConfig", ["movieCameraConfigKey", i]);
        }
        this.Nhf?.(false);
      }
    } else {
      this.dnf = i;
      this.mnf = e;
      this.Nhf = t;
      this.Dnf();
    }
  }
  Dnf() {
    if (!this.cnf && !this.unf) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头]开始异步加载DT表");
      }
      this.unf = true;
      ResourceSystem_1.ResourceSystem.LoadAsync(MOVIE_CAMER_CONFIG_PATH, UE.DataTable, i => {
        if (i) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Camera", 57, "[电影镜头]异步加载DT表成功");
          }
          this.cnf = i;
          if (this.dnf) {
            this.PlayMovieCamera(this.dnf, this.mnf, this.Nhf);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "[电影镜头]异步加载DT表失败");
          }
          this.Nhf?.(false);
        }
      });
    }
  }
  async Mkf(e) {
    if (e && !StringUtils_1.StringUtils.IsNothing(e)) {
      const t = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LevelSequence, i => {
        if (i) {
          t.SetResult(i);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "[电影镜头]Sequence资源加载失败", ["Path", e]);
          }
          t.SetResult(undefined);
        }
      });
      return t.Promise;
    }
  }
  Bnf(i) {
    var e;
    this.Unf();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]播放Sequence镜头", ["Index", this.ynf], ["CacheIndex", this.Snf], ["Tip", this.GetCurrentPlayCameraConfigItem()?.Tip ?? "None"], ["sequence", i?.SequenceAsset?.ToAssetPathName() ?? "None"]);
    }
    if (Global_1.Global.BaseCharacter) {
      this.cz.FromUeVector(i.BindTargetSetting.AttachLocationOffset);
      this.cie.FromUeRotator(i.BindTargetSetting.AttachRotatorOffset);
      this.gme.FromUeVector(i.BindTargetSetting.SpecificLocationOffset);
      this.fme.FromUeRotator(i.BindTargetSetting.SpecificRotatorOffset);
      this.fz.FromUeVector(i.BindTargetSetting.WorldLocation);
      this.pme.FromUeRotator(i.BindTargetSetting.WorldRotation);
      if (e = this.ykf.get(this.GetCurrentPlayCameraConfigItem())) {
        this.Tnf = new SimpleLevelSequenceActor_1.default(e);
        this.Tnf.PlaySequence(new SimpleLevelSequenceActor_1.DefaultLevelSequencePlayParam(i.BlendInTime, i.BlendOutTime, this.Lo.SmoothFactor, this.Lo.SmoothDelta, new SimpleLevelSequenceActor_1.BindTargetSetting(i.BindTargetSetting.BindTargetType, i.BindTargetSetting.AttachSocketName, this.cz, this.cie, this.gme, this.fme, this.fz, this.pme), new SimpleLevelSequenceActor_1.FollowTargetSetting(i.FollowTargetSetting.IsFollowTarget, i.FollowTargetSetting.FollowType === 0, i.FollowTargetSetting.PitchFollowSpeed, i.FollowTargetSetting.FollowType === 1, i.FollowTargetSetting.FollowSpeed, i.FollowTargetSetting.FollowType === 2, i.FollowTargetSetting.AngleFollowSpeed), Global_1.Global.BaseCharacter));
        this.Tnf.AddOnFinishedCallback(this.Rnf);
        this.Tnf.AddOnStopCallback(this.Skf);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "[电影镜头]Sequence镜头播放失败,不应出现此情况");
        }
        this.Unf();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Camera", 57, "[电影镜头]Sequence镜头播放失败", ["Global.BaseCharacter", !!Global_1.Global.BaseCharacter]);
    }
  }
  knf(i) {
    this.Unf();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]播放Fight镜头", ["Index", this.ynf], ["CacheIndex", this.Snf], ["Tip", this.GetCurrentPlayCameraConfigItem()?.Tip ?? "None"], ["Tag", i?.FightSubCameraTag?.TagName ?? "没有Tag"], ["TimeLength", i?.TimeLength ?? -1]);
    }
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController?.IsPlayerExist(e)) {
      if (i && Global_1.Global.BaseCharacter) {
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(e, i.FightSubCameraTag.TagId);
        this.Enf = i.FightSubCameraTag.TagId;
        this.Inf = TimerSystem_1.FlowTimeTimerSystem.Delay(this.Pnf, i.TimeLength * MathUtils_1.MathUtils.SecondToMillisecond);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "[电影镜头]Fight镜头播放失败", ["sequenceSetting", !!i], ["Global.BaseCharacter", !!Global_1.Global.BaseCharacter]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Camera", 57, "[电影镜头]Fight镜头播放失败, 因为没有玩家队伍");
    }
  }
  PauseMovieCamera() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]暂停播放电影镜头");
    }
    if (this.Inf?.Valid()) {
      TimerSystem_1.FlowTimeTimerSystem.Pause(this.Inf);
    }
    if (this.Tnf) {
      this.Tnf.Pause();
    }
  }
  ResumeMovieCamera() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]继续播放电影镜头");
    }
    if (this.Inf?.Valid()) {
      TimerSystem_1.FlowTimeTimerSystem.Resume(this.Inf);
    }
    if (this.Tnf) {
      this.Tnf.Resume();
    }
  }
  RMf() {
    if (this.fnf) {
      if (this.o1h()) {
        this.vnf = 2;
        switch (this.fnf.MovieCameraSwitchType) {
          case 0:
            this.Lnf();
            break;
          case 1:
            this.LMf();
        }
      }
    } else {
      this.StopMovieCamera(undefined, "没有常规电影镜头数据,停止电影镜头");
    }
  }
  Lnf() {
    var i;
    var e;
    if (!(this.gnf.length <= 0)) {
      i = Math.round(MathUtils_1.MathUtils.GetRandomFloatNumber(0, this.gnf.length - 1));
      e = this.pnf.has(i) ? this.pnf.get(i) : -1;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头]随机播放电影镜头", ["index", e], ["cacheIndex", i]);
      }
      if (this.Cnf.has(this.bnf)) {
        this.qnf(this.bnf, this.Cnf.get(this.bnf));
      } else {
        this.qnf(e, i);
      }
    }
  }
  LMf() {
    var i;
    var e;
    if (!(this.gnf.length <= 0)) {
      i = this.Snf === -1 ? 0 : (this.Snf + 1) % this.gnf.length;
      e = this.pnf.has(i) ? this.pnf.get(i) : -1;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头]顺序播放电影镜头", ["index", e], ["cacheIndex", i]);
      }
      if (this.Cnf.has(this.bnf)) {
        this.qnf(this.bnf, this.Cnf.get(this.bnf));
      } else {
        this.qnf(e, i);
      }
    }
  }
  xnf(i) {
    var e;
    if (this.Cnf.has(i)) {
      e = this.Cnf.get(i);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头]指定播放电影镜头", ["index", i], ["cacheIndex", e]);
      }
      return this.qnf(i, e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "[电影镜头]使用DT表的索引播放电影镜头失败", ["index", i]);
      }
      return false;
    }
  }
  qnf(i, e) {
    this.Unf();
    if (e < 0 || e >= this.gnf.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "[电影镜头]使用缓存的索引播放电影镜头失败", ["index", i], ["cacheIndex", e], ["cacheLength", this.gnf.length]);
      }
      return false;
    }
    this.ynf = i;
    this.Snf = e;
    this.Mnf = this.vkf[this.gnf[e]];
    switch (this.Mnf.Type) {
      case 2:
        this.Bnf(this.Mnf.SequenceSetting);
        break;
      case 1:
        this.knf(this.Mnf.FightSubCameraSetting);
    }
    return true;
  }
  Dff(i) {
    this.Unf();
    if (!i) {
      return false;
    }
    this.wMf = i;
    switch (this.wMf.Type) {
      case 2:
        this.Bnf(this.wMf.SequenceSetting);
        break;
      case 1:
        this.knf(this.wMf.FightSubCameraSetting);
    }
    return true;
  }
  StopMovieCamera(i = undefined, e = "") {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]停止播放", ["reason", e]);
    }
    this.x_g();
    this.vnf = 4;
    this.Unf();
    this.wff = false;
    this.Lff = undefined;
    this.Pff = "";
    this.pkf = undefined;
    this.wMf = undefined;
    this.Aff = undefined;
    this.wMf = undefined;
    this.unf = false;
    this.cnf = undefined;
    this.dnf = "";
    this.mnf = -1;
    this.Nhf = undefined;
    this.fnf = undefined;
    this.vkf.length = 0;
    this.gnf.length = 0;
    this.Cnf.clear();
    this.pnf.clear();
    this.ynf = -1;
    this.Snf = -1;
    this.Mnf = undefined;
    this.ykf.clear();
    this.Enf = INVALID_GAMEPLAYTAGID;
    this.Inf = undefined;
    this.Tnf = undefined;
    i?.(true);
  }
  Unf() {
    this.wnf();
    this.Anf();
  }
  wnf() {
    if (this.o1h() && this.Tnf) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头]停止播放Sequence镜头1", ["index", this.ynf], ["cacheIndex", this.Snf], ["Tip", this.GetCurrentPlayCameraConfigItem()?.Tip ?? "None"], ["sequence", this.GetCurrentPlayCameraConfigItem()?.SequenceSetting?.SequenceAsset?.ToAssetPathName() ?? "None"]);
      }
      this.Tnf.StopSequence();
      this.Tnf = undefined;
    }
  }
  Anf() {
    var i;
    if (this.o1h() && this.Enf !== INVALID_GAMEPLAYTAGID && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Camera", 57, "[电影镜头]停止播放Fight镜头", ["Index", this.ynf], ["CacheIndex", this.Snf], ["Tip", this.GetCurrentPlayCameraConfigItem()?.Tip ?? "None"], ["Tag", this.GetCurrentPlayCameraConfigItem()?.FightSubCameraSetting?.FightSubCameraTag?.TagName ?? "没有Tag"], ["TimeLength", this.GetCurrentPlayCameraConfigItem()?.FightSubCameraSetting?.TimeLength ?? -1]), i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), ControllerHolder_1.ControllerHolder.FormationDataController?.IsPlayerExist(i))) {
      if (this.Inf?.Valid()) {
        TimerSystem_1.FlowTimeTimerSystem.Remove(this.Inf);
        this.Inf = undefined;
      }
      ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(i, this.Enf);
      ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.ForceTickOutSide();
      this.Enf = INVALID_GAMEPLAYTAGID;
    }
  }
  GetCurrentPlayState() {
    return this.vnf;
  }
  GetCurrentPlayCameraIndex() {
    return this.ynf;
  }
  GetCurrentPlayCameraCacheIndex() {
    return this.Snf;
  }
  GetCurrentPlayCameraConfigItem() {
    if (this.vnf === 3) {
      return this.wMf;
    } else {
      return this.Mnf;
    }
  }
  IsPlayingSpecialMovieCamera(i) {
    return this.vnf === 3 && this.Pff === i;
  }
  o1h() {
    return this.tZ;
  }
  U_g() {
    var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController?.IsPlayerExist(i)) {
      for (const e of movieModeTagList) {
        if (!ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(i, e, true)) {
          ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(i, e);
        }
      }
    }
  }
  x_g() {
    var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController?.IsPlayerExist(i)) {
      for (const e of movieModeTagList) {
        if (ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(i, e, true)) {
          ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(i, e);
        }
      }
    }
  }
  OnEnd() {
    this.StopMovieCamera(undefined, "系统销毁,停止电影镜头");
    this.tZ = false;
  }
}
exports.CameraMovieModeController = CameraMovieModeController;
//# sourceMappingURL=CameraMovieModeController.js.map