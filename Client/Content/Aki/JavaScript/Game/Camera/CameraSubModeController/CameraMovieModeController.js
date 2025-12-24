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
const INVALID_GAMEPLAYTAGID = -1;
const CAMERA_TAG = new UE.FName("SequenceCamera");
const movieModeTagList = [589104572];
class CameraMovieModeController extends CameraSubModeController_1.CameraSubModeController {
  constructor() {
    super(...arguments);
    this.tZ = false;
    this.Ldf = false;
    this.Pdf = undefined;
    this.Adf = "";
    this.WLf = undefined;
    this.Ddf = undefined;
    this.gvf = undefined;
    this.Wif = false;
    this.Qif = undefined;
    this.Kif = "";
    this.Xif = -1;
    this.msf = undefined;
    this.Yif = undefined;
    this.QLf = [];
    this.zif = [];
    this.Jif = new Map();
    this.Zif = new Map();
    this.trf = -1;
    this.irf = -1;
    this.rrf = undefined;
    this.erf = 0;
    this.KLf = new Map();
    this.orf = INVALID_GAMEPLAYTAGID;
    this.nrf = undefined;
    this.srf = undefined;
    this.cz = Vector_1.Vector.Create();
    this.gme = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.fme = Rotator_1.Rotator.Create();
    this.pme = Rotator_1.Rotator.Create();
    this.arf = -1;
    this.XLf = e => {
      if (e && (this.lrf(), this.erf !== 4)) {
        this.Cvf();
      }
    };
    this.hrf = () => {
      this.lrf();
      if (this.erf !== 4) {
        this.Cvf();
      }
    };
    this.urf = () => {
      this.crf();
      if (this.erf !== 4) {
        this.Cvf();
      }
    };
  }
  OnStart() {
    this.tZ = true;
  }
  async PlaySpecialMovieCamera(e, i = undefined) {
    var t;
    var s;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头][特殊]请求播放, 设置DT表RowName", ["RowName", e]);
    }
    if (this.WLf) {
      this.KLf.delete(this.WLf);
      this.WLf = undefined;
    }
    this.Ddf = i;
    this.erf = 1;
    if (this.Pdf) {
      this.mrf();
      if (i = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Pdf, e)) {
        this.erf = 3;
        if ((this.WLf = i).Type === 2) {
          t = i.SequenceSetting?.SequenceAsset.ToAssetPathName() ?? "";
          if (s = await this.YLf(t)) {
            this.KLf.set(i, s);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "[电影镜头][特殊]Sequence镜头类型配置错误", ["assetPath", t]);
          }
        }
        if (this.GetCurrentPlayState() === 4) {
          this.Ddf?.(false);
        } else {
          this.EXf();
          s = this.Udf(i);
          this.Ddf?.(s);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "[电影镜头][特殊]Invalid MovieCameraConfigItem", ["movieCameraConfigKey", e]);
        }
        this.Ddf?.(false);
      }
    } else {
      this.Adf = e;
      this.xdf();
    }
  }
  xdf() {
    if (!this.Pdf && !this.Ldf) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头][特殊]开始异步加载DT表");
      }
      this.Ldf = true;
      ResourceSystem_1.ResourceSystem.LoadAsync(SPECIAL_MOVIE_CAMER_CONFIG_PATH, UE.DataTable, e => {
        this.Ldf = false;
        if (e) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Camera", 57, "[电影镜头][特殊]异步加载DT表成功");
          }
          this.Pdf = e;
          if (this.Adf) {
            this.PlaySpecialMovieCamera(this.Adf, this.Ddf);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "[电影镜头][特殊]异步加载DT表失败");
          }
          this.Ddf?.(false);
        }
      });
    }
  }
  async PlayMovieCamera(e, i = -1, t = undefined) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]请求播放, 设置DT表RowName", ["RowName", e], ["初始出播索引", i]);
    }
    if (this.QLf.length > 0) {
      for (const n of this.QLf) {
        this.KLf.delete(n);
      }
      this.QLf.length = 0;
    }
    this.erf = 1;
    if (this.Qif) {
      this.mrf();
      var s = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.Qif, e);
      if (s) {
        if (s.MovieCameraConfigItemList.Num() === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "[电影镜头]Empty MovieCameraConfig", ["movieCameraConfigKey", e]);
          }
          this.msf?.(false);
        } else {
          this.erf = 2;
          this.Yif = s;
          this.Kif = e;
          this.Xif = i;
          this.QLf.length = 0;
          this.zif.length = 0;
          this.Jif.clear();
          this.Zif.clear();
          var a = [];
          var h = [];
          for (let e = 0; e < this.Yif.MovieCameraConfigItemList.Num(); e++) {
            var o = this.Yif.MovieCameraConfigItemList.Get(e);
            if (o.Type === 2 && (o = o.SequenceSetting.SequenceAsset?.ToAssetPathName())) {
              a.push(this.YLf(o));
              h.push(e);
            }
          }
          var r = await Promise.all(a);
          for (let e = 0; e < this.Yif.MovieCameraConfigItemList.Num(); e++) {
            var _ = this.Yif.MovieCameraConfigItemList.Get(e);
            this.QLf.push(_);
            switch (_.Type) {
              case 2:
                {
                  const C = _.SequenceSetting.SequenceAsset?.ToAssetPathName();
                  var l = r.find(e => e && C.endsWith(e.GetName()));
                  if (l && l.HasBindingTag(CAMERA_TAG, true)) {
                    this.Jif.set(e, this.zif.length);
                    this.Zif.set(this.zif.length, e);
                    this.zif.push(e);
                    this.KLf.set(_, l);
                  } else if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("Camera", 57, "[电影镜头]Sequence镜头类型配置错误", ["index", e]);
                  }
                  break;
                }
              case 1:
                if (GameplayTagUtils_1.GameplayTagUtils.IsValidTag(_.FightSubCameraSetting.FightSubCameraTag)) {
                  this.Jif.set(e, this.zif.length);
                  this.Zif.set(this.zif.length, e);
                  this.zif.push(e);
                } else if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Camera", 57, "[电影镜头]Fight镜头类型配置错误", ["index", e]);
                }
                break;
              default:
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Camera", 57, "[电影镜头]不支持的配置类型", ["Type", _.Type]);
                }
            }
          }
          if (this.GetCurrentPlayState() === 4) {
            this.msf?.(false);
          } else {
            let e = true;
            if (this.Xif !== -1) {
              e = this.arf < 0 ? this.frf(this.Xif) : this.frf(this.arf);
            } else {
              this.Cvf();
            }
            this.EXf();
            this.msf?.(e);
          }
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "[电影镜头]Invalid MovieCameraConfig", ["movieCameraConfigKey", e]);
        }
        this.msf?.(false);
      }
    } else {
      this.Kif = e;
      this.Xif = i;
      this.msf = t;
      this.drf();
    }
  }
  drf() {
    if (!this.Qif && !this.Wif) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头]开始异步加载DT表");
      }
      this.Wif = true;
      ResourceSystem_1.ResourceSystem.LoadAsync(MOVIE_CAMER_CONFIG_PATH, UE.DataTable, e => {
        if (e) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Camera", 57, "[电影镜头]异步加载DT表成功");
          }
          this.Qif = e;
          if (this.Kif) {
            this.PlayMovieCamera(this.Kif, this.Xif, this.msf);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "[电影镜头]异步加载DT表失败");
          }
          this.msf?.(false);
        }
      });
    }
  }
  async YLf(i) {
    if (i && !StringUtils_1.StringUtils.IsNothing(i)) {
      const t = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LevelSequence, e => {
        if (e) {
          t.SetResult(e);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "[电影镜头]Sequence资源加载失败", ["Path", i]);
          }
          t.SetResult(undefined);
        }
      });
      return t.Promise;
    }
  }
  grf(e) {
    var i;
    this.mrf();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]播放Sequence镜头", ["Index", this.trf], ["CacheIndex", this.irf], ["Tip", this.GetCurrentPlayCameraConfigItem()?.Tip ?? "None"], ["sequence", e?.SequenceAsset?.ToAssetPathName() ?? "None"]);
    }
    if (Global_1.Global.BaseCharacter) {
      this.cz.FromUeVector(e.BindTargetSetting.AttachLocationOffset);
      this.cie.FromUeRotator(e.BindTargetSetting.AttachRotatorOffset);
      this.gme.FromUeVector(e.BindTargetSetting.SpecificLocationOffset);
      this.fme.FromUeRotator(e.BindTargetSetting.SpecificRotatorOffset);
      this.fz.FromUeVector(e.BindTargetSetting.WorldLocation);
      this.pme.FromUeRotator(e.BindTargetSetting.WorldRotation);
      if (i = this.KLf.get(this.GetCurrentPlayCameraConfigItem())) {
        this.srf = new SimpleLevelSequenceActor_1.default(i);
        this.srf.PlaySequence(new SimpleLevelSequenceActor_1.DefaultLevelSequencePlayParam(e.BlendInTime, e.BlendOutTime, new SimpleLevelSequenceActor_1.BindTargetSetting(e.BindTargetSetting.BindTargetType, e.BindTargetSetting.AttachSocketName, this.cz, this.cie, this.gme, this.fme, this.fz, this.pme), new SimpleLevelSequenceActor_1.FollowTargetSetting(e.FollowTargetSetting.IsFollowTarget, e.FollowTargetSetting.FollowType === 0, e.FollowTargetSetting.PitchFollowSpeed, e.FollowTargetSetting.FollowType === 1, e.FollowTargetSetting.FollowSpeed, e.FollowTargetSetting.FollowType === 2, e.FollowTargetSetting.AngleFollowSpeed), Global_1.Global.BaseCharacter));
        this.srf.AddOnFinishedCallback(this.hrf);
        this.srf.AddOnStopCallback(this.XLf);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "[电影镜头]Sequence镜头播放失败,不应出现此情况");
        }
        this.mrf();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Camera", 57, "[电影镜头]Sequence镜头播放失败", ["Global.BaseCharacter", !!Global_1.Global.BaseCharacter]);
    }
  }
  Crf(e) {
    this.mrf();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]播放Fight镜头", ["Index", this.trf], ["CacheIndex", this.irf], ["Tip", this.GetCurrentPlayCameraConfigItem()?.Tip ?? "None"], ["Tag", e?.FightSubCameraTag?.TagName ?? "没有Tag"], ["TimeLength", e?.TimeLength ?? -1]);
    }
    var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController?.IsPlayerExist(i)) {
      if (e && Global_1.Global.BaseCharacter) {
        ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(i, e.FightSubCameraTag.TagId);
        this.orf = e.FightSubCameraTag.TagId;
        this.nrf = TimerSystem_1.FlowTimeTimerSystem.Delay(this.urf, e.TimeLength * MathUtils_1.MathUtils.SecondToMillisecond);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "[电影镜头]Fight镜头播放失败", ["sequenceSetting", !!e], ["Global.BaseCharacter", !!Global_1.Global.BaseCharacter]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Camera", 57, "[电影镜头]Fight镜头播放失败, 因为没有玩家队伍");
    }
  }
  PauseMovieCamera() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]暂停播放电影镜头");
    }
    if (this.nrf?.Valid()) {
      TimerSystem_1.FlowTimeTimerSystem.Pause(this.nrf);
    }
    if (this.srf) {
      this.srf.Pause();
    }
  }
  ResumeMovieCamera() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]继续播放电影镜头");
    }
    if (this.nrf?.Valid()) {
      TimerSystem_1.FlowTimeTimerSystem.Resume(this.nrf);
    }
    if (this.srf) {
      this.srf.Resume();
    }
  }
  Cvf() {
    if (this.Yif) {
      if (this.o1h()) {
        this.erf = 2;
        switch (this.Yif.MovieCameraSwitchType) {
          case 0:
            this._rf();
            break;
          case 1:
            this.pvf();
        }
      }
    } else {
      this.StopMovieCamera(undefined, "没有常规电影镜头数据,停止电影镜头");
    }
  }
  _rf() {
    var e;
    var i;
    if (!(this.zif.length <= 0)) {
      e = Math.round(MathUtils_1.MathUtils.GetRandomFloatNumber(0, this.zif.length - 1));
      i = this.Zif.has(e) ? this.Zif.get(e) : -1;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头]随机播放电影镜头", ["index", i], ["cacheIndex", e]);
      }
      if (this.Jif.has(this.arf)) {
        this.prf(this.arf, this.Jif.get(this.arf));
      } else {
        this.prf(i, e);
      }
    }
  }
  pvf() {
    var e;
    var i;
    if (!(this.zif.length <= 0)) {
      e = this.irf === -1 ? 0 : (this.irf + 1) % this.zif.length;
      i = this.Zif.has(e) ? this.Zif.get(e) : -1;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头]顺序播放电影镜头", ["index", i], ["cacheIndex", e]);
      }
      if (this.Jif.has(this.arf)) {
        this.prf(this.arf, this.Jif.get(this.arf));
      } else {
        this.prf(i, e);
      }
    }
  }
  frf(e) {
    var i;
    if (this.Jif.has(e)) {
      i = this.Jif.get(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头]指定播放电影镜头", ["index", e], ["cacheIndex", i]);
      }
      return this.prf(e, i);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "[电影镜头]使用DT表的索引播放电影镜头失败", ["index", e]);
      }
      return false;
    }
  }
  prf(e, i) {
    this.mrf();
    if (i < 0 || i >= this.zif.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 57, "[电影镜头]使用缓存的索引播放电影镜头失败", ["index", e], ["cacheIndex", i], ["cacheLength", this.zif.length]);
      }
      return false;
    }
    this.trf = e;
    this.irf = i;
    this.rrf = this.QLf[this.zif[i]];
    switch (this.rrf.Type) {
      case 2:
        this.grf(this.rrf.SequenceSetting);
        break;
      case 1:
        this.Crf(this.rrf.FightSubCameraSetting);
    }
    return true;
  }
  Udf(e) {
    this.mrf();
    if (!e) {
      return false;
    }
    this.gvf = e;
    switch (this.gvf.Type) {
      case 2:
        this.grf(this.gvf.SequenceSetting);
        break;
      case 1:
        this.Crf(this.gvf.FightSubCameraSetting);
    }
    return true;
  }
  StopMovieCamera(e = undefined, i = "") {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Camera", 57, "[电影镜头]停止播放", ["reason", i]);
    }
    this.IXf();
    this.erf = 4;
    this.mrf();
    this.Ldf = false;
    this.Pdf = undefined;
    this.Adf = "";
    this.WLf = undefined;
    this.gvf = undefined;
    this.Ddf = undefined;
    this.gvf = undefined;
    this.Wif = false;
    this.Qif = undefined;
    this.Kif = "";
    this.Xif = -1;
    this.msf = undefined;
    this.Yif = undefined;
    this.QLf.length = 0;
    this.zif.length = 0;
    this.Jif.clear();
    this.Zif.clear();
    this.trf = -1;
    this.irf = -1;
    this.rrf = undefined;
    this.KLf.clear();
    this.orf = INVALID_GAMEPLAYTAGID;
    this.nrf = undefined;
    this.srf = undefined;
    e?.(true);
  }
  mrf() {
    this.lrf();
    this.crf();
  }
  lrf() {
    if (this.o1h() && this.srf) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Camera", 57, "[电影镜头]停止播放Sequence镜头1", ["index", this.trf], ["cacheIndex", this.irf], ["Tip", this.GetCurrentPlayCameraConfigItem()?.Tip ?? "None"], ["sequence", this.GetCurrentPlayCameraConfigItem()?.SequenceSetting?.SequenceAsset?.ToAssetPathName() ?? "None"]);
      }
      this.srf.StopSequence();
      this.srf = undefined;
    }
  }
  crf() {
    var e;
    if (this.o1h() && this.orf !== INVALID_GAMEPLAYTAGID && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Camera", 57, "[电影镜头]停止播放Fight镜头", ["Index", this.trf], ["CacheIndex", this.irf], ["Tip", this.GetCurrentPlayCameraConfigItem()?.Tip ?? "None"], ["Tag", this.GetCurrentPlayCameraConfigItem()?.FightSubCameraSetting?.FightSubCameraTag?.TagName ?? "没有Tag"], ["TimeLength", this.GetCurrentPlayCameraConfigItem()?.FightSubCameraSetting?.TimeLength ?? -1]), e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), ControllerHolder_1.ControllerHolder.FormationDataController?.IsPlayerExist(e))) {
      if (this.nrf?.Valid()) {
        TimerSystem_1.FlowTimeTimerSystem.Remove(this.nrf);
        this.nrf = undefined;
      }
      ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(e, this.orf);
      ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.ForceTickOutSide();
      this.orf = INVALID_GAMEPLAYTAGID;
    }
  }
  GetCurrentPlayState() {
    return this.erf;
  }
  GetCurrentPlayCameraIndex() {
    return this.trf;
  }
  GetCurrentPlayCameraCacheIndex() {
    return this.irf;
  }
  GetCurrentPlayCameraConfigItem() {
    if (this.erf === 3) {
      return this.gvf;
    } else {
      return this.rrf;
    }
  }
  IsPlayingSpecialMovieCamera(e) {
    return this.erf === 3 && this.Adf === e;
  }
  o1h() {
    return this.tZ;
  }
  EXf() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController?.IsPlayerExist(e)) {
      for (const i of movieModeTagList) {
        if (!ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(e, i, true)) {
          ControllerHolder_1.ControllerHolder.FormationDataController.AddPlayerTag(e, i);
        }
      }
    }
  }
  IXf() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ControllerHolder_1.ControllerHolder.FormationDataController?.IsPlayerExist(e)) {
      for (const i of movieModeTagList) {
        if (ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(e, i, true)) {
          ControllerHolder_1.ControllerHolder.FormationDataController.RemovePlayerTag(e, i);
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