"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifePointModel = exports.COLUMN_SIZE = exports.LINE_SIZE = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
exports.LINE_SIZE = 8;
exports.COLUMN_SIZE = 10;
const BLUE = "77CBFFFF";
const RED = "FF8E90FF";
const YELLOW = "FFCE89FF";
const GREEN = "ACFFB6FF";
const BLUE_FRAME = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_LeftPointFrmBlie.T_LeftPointFrmBlie";
const GREEN_FRAME = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_LeftPointFrmGreen.T_LeftPointFrmGreen";
const RED_FRAME = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_LeftPointFrmRed.T_LeftPointFrmRed";
const YELLOW_FRAME = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_LeftPointFrmYellow.T_LeftPointFrmYellow";
const BLUE_GRID = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_BgTextureBlueNor.T_BgTextureBlueNor";
const GREEN_GRID = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_BgTextureGreenNor.T_BgTextureGreenNor";
const RED_GRID = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_BgTextureRedNor.T_BgTextureRedNor";
const YELLOW_GRID = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_BgTextureYellowNor.T_BgTextureYellowNor";
const BLUE_HIT_GRID = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_BgTextureBlue.T_BgTextureBlue";
const GREEN_HIT_GRID = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_BgTextureGreen.T_BgTextureGreen";
const RED_HIT_GRID = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_BgTextureRed.T_BgTextureRed";
const YELLOW_HIT_GRID = "/Game/Aki/UI/UIResources/UiLevel/Image/LifePoint/T_BgTextureYellow.T_BgTextureYellow";
const YELLOW_TEXT = "LifePlay_Yellow_Text";
const RED_TEXT = "LifePlay_Red_Text";
const GREEN_TEXT = "LifePlay_Green_Text";
const BLUE_TEXT = "LifePlay_Blue_Text";
const SELF_EVENT_NAME = "LifePointPaint";
const VAR_NAME = "染色次数";
class AnimParam {
  constructor() {
    this.MaxTime = 0;
    this.AccelerationRes = 0;
    this.MinInterval = 0;
    this.GridMinRate = 0;
    this.GridMaxRate = 0;
    this.GridAccelerationTime = 0;
  }
}
class LifePointModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsDataInit = false;
    this.Config = undefined;
    this.dUl = new Map();
    this.GridTextureMap = new Map();
    this.HitGridTextureMap = new Map();
    this.DirectionParam = new Map();
    this.ParamName = new UE.FName("LocalFadeInoutRotate");
    this.InitColor = UE.Color.FromHex("FFFF00FF");
    this.AnimParam = new AnimParam();
    this.AudioEvent = "play_interact_life_point_click";
    this.RtpcCount = "mini_game_lifepoint_spreads_counting";
    this.RtpcGrids = "mini_game_lifepoint_spreading_grids";
    this.RtpcSpeed = "mini_game_lifepoint_spreading_speed";
    this.AudioMap = new Map();
    this.DangerStepColor = UE.Color.FromHex("FF7D6EFF");
    this.NormalStepColor = UE.Color.FromHex("FFCB3FFF");
    this.Jh = undefined;
    this.kFl = undefined;
  }
  GetText(e) {
    return this.dUl.get(e)[4];
  }
  GetColorHex(e) {
    return this.dUl.get(e)[0];
  }
  GetFramePath(e) {
    return this.dUl.get(e)[1];
  }
  OnInit() {
    this.dUl.set(IAction_1.EPieceColorType.Blue, [BLUE, BLUE_FRAME, BLUE_GRID, BLUE_HIT_GRID, BLUE_TEXT]);
    this.dUl.set(IAction_1.EPieceColorType.Red, [RED, RED_FRAME, RED_GRID, RED_HIT_GRID, RED_TEXT]);
    this.dUl.set(IAction_1.EPieceColorType.Yellow, [YELLOW, YELLOW_FRAME, YELLOW_GRID, YELLOW_HIT_GRID, YELLOW_TEXT]);
    this.dUl.set(IAction_1.EPieceColorType.Green, [GREEN, GREEN_FRAME, GREEN_GRID, GREEN_HIT_GRID, GREEN_TEXT]);
    this.DirectionParam.set(4, -1);
    this.DirectionParam.set(1, 0.75);
    this.DirectionParam.set(2, 0.5);
    this.DirectionParam.set(0, 0.25);
    this.DirectionParam.set(3, 0);
    this.AnimParam.MaxTime = CommonParamById_1.configCommonParamById.GetIntConfig("LifePoint_MaxTime");
    this.AnimParam.AccelerationRes = CommonParamById_1.configCommonParamById.GetFloatConfig("LifePoint_AccelerationResis");
    this.AnimParam.MinInterval = CommonParamById_1.configCommonParamById.GetIntConfig("LifePoint_MinInterval");
    this.AnimParam.GridMinRate = CommonParamById_1.configCommonParamById.GetFloatConfig("LifePoint_GridMinSpeed");
    this.AnimParam.GridMaxRate = CommonParamById_1.configCommonParamById.GetFloatConfig("LifePoint_GridMaxSpeed");
    this.AnimParam.GridAccelerationTime = CommonParamById_1.configCommonParamById.GetIntConfig("LifePoint_GridDuration");
    return true;
  }
  OnClear() {
    this.dUl.clear();
    this.GridTextureMap.clear();
    this.HitGridTextureMap.clear();
    this.DirectionParam.clear();
    return true;
  }
  CalcCountDownTime(e) {
    return this.AnimParam.MaxTime * (1 - Math.exp(-e * this.AnimParam.AccelerationRes)) + this.AnimParam.MinInterval * e;
  }
  CalPlayRate(e) {
    return MathUtils_1.MathUtils.Clamp((this.AnimParam.GridMinRate + (this.AnimParam.GridMaxRate - this.AnimParam.GridMinRate) * e) / this.AnimParam.GridAccelerationTime, this.AnimParam.GridMinRate, this.AnimParam.GridMaxRate);
  }
  BlendDirectionParam(e, i) {
    if (e < 0) {
      return e;
    }
    i = this.DirectionParam.get(i);
    if (Math.abs(e - i) === 0.5) {
      return e;
    }
    let t = 0;
    if ((t = Math.abs(e - i) > 0.5 ? (e + i - 1) / 2 : (e + i) / 2) < 0) {
      t += 1;
    }
    return t;
  }
  async LoadDataAsync(i, e) {
    if (!this.IsDataInit) {
      this.Config = i;
      this.Jh = EntitySystem_1.EntitySystem.Get(e);
      if (this.Config.MaxStepRewardRule) {
        this.kFl = [...this.Config.MaxStepRewardRule];
        this.kFl.sort((e, i) => i.PaintCount - e.PaintCount);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelPlay", 26, "生命点资源开始加载");
      }
      var t = new Array();
      for (const [o, i] of this.dUl) {
        {
          const s = new CustomPromise_1.CustomPromise();
          t.push(s.Promise);
          ResourceSystem_1.ResourceSystem.LoadAsync(i[2], UE.Texture2D, e => {
            if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
              this.GridTextureMap.set(o, e);
              s.SetResult();
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelPlay", 26, "生命点资源加载错误", ["path", i[2]]);
            }
          });
        }
        {
          const r = new CustomPromise_1.CustomPromise();
          t.push(r.Promise);
          ResourceSystem_1.ResourceSystem.LoadAsync(i[3], UE.Texture2D, e => {
            if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
              this.HitGridTextureMap.set(o, e);
              r.SetResult();
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelPlay", 26, "生命点资源加载错误", ["path", i[2]]);
            }
          });
        }
      }
      await Promise.all(t);
      this.IsDataInit = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelPlay", 26, "生命点资源加载完毕");
      }
    }
  }
  UnloadData() {
    this.Jh = undefined;
    this.Config = undefined;
    this.GridTextureMap.clear();
    this.HitGridTextureMap.clear();
    this.IsDataInit = false;
    this.AudioMap.clear();
    this.kFl = undefined;
  }
  AddStep() {
    var e = this.Jh.GetComponent(0).GetCreatureDataId();
    LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(e, SELF_EVENT_NAME);
  }
  GetStepBonus() {
    if (this.kFl) {
      var e = this.Jh.GetComponent(0).GetEntityVar(VAR_NAME)?.oTs;
      if (e !== undefined) {
        var i = MathUtils_1.MathUtils.LongToNumber(e);
        for (const t of this.kFl) {
          if (i >= t.PaintCount) {
            return t.AddStep;
          }
        }
      }
    }
    return 0;
  }
}
exports.LifePointModel = LifePointModel;
//# sourceMappingURL=LifePointModel.js.map