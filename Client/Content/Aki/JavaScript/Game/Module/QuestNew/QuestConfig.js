"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestNewConfig = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const AreaQuestTrackingById_1 = require("../../../Core/Define/ConfigQuery/AreaQuestTrackingById");
const DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const NewOccupationConfigById_1 = require("../../../Core/Define/ConfigQuery/NewOccupationConfigById");
const OccupationConfigById_1 = require("../../../Core/Define/ConfigQuery/OccupationConfigById");
const QuestChapterById_1 = require("../../../Core/Define/ConfigQuery/QuestChapterById");
const QuestDataById_1 = require("../../../Core/Define/ConfigQuery/QuestDataById");
const QuestMainTypeById_1 = require("../../../Core/Define/ConfigQuery/QuestMainTypeById");
const QuestNodeDataByKey_1 = require("../../../Core/Define/ConfigQuery/QuestNodeDataByKey");
const QuestTypeAll_1 = require("../../../Core/Define/ConfigQuery/QuestTypeAll");
const QuestTypeById_1 = require("../../../Core/Define/ConfigQuery/QuestTypeById");
const QuestTypeByMainId_1 = require("../../../Core/Define/ConfigQuery/QuestTypeByMainId");
const TaskMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TaskMarkByMarkId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../Common/PublicUtil");
class QuestNewConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.W1_ = new Map();
  }
  OnInit() {
    this.Q1_();
    return true;
  }
  Q1_() {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var e = UE.KismetSystemLibrary.ConvertToAbsolutePath(UE.BlueprintPathsLibrary.ProjectDir());
      var e = UE.KismetSystemLibrary.ConvertToAbsolutePath("" + e + IGlobal_1.globalConfig.AreaQuestTracking);
      if (UE.BlueprintPathsLibrary.FileExists(e)) {
        var r = (0, puerts_1.$ref)("");
        UE.KuroStaticLibrary.LoadFileToString(r, e);
        r = (0, puerts_1.$unref)(r);
        var r = JSON.parse(r);
        for (const t of r) {
          this.W1_.set(t.QuestId + "_" + t.NodeId, t.AreaIds);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Editor", 18, "globalConfigTemp文件不存在", ["Path", e]);
      }
    }
  }
  GetTrackEffectPath(e) {
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      var r = `Name = 'ETrackEffect.${e}'`;
      var e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig("ETrackEffect." + e);
      if (e) {
        return e.Value;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "找不到全局配置表的配置", ["全局表路径", "Source/Config/Raw/Tables/q.全局配置"], ["查询条件", r]);
      }
    }
  }
  GetGlobalConfig(e) {
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      var r = `Name = '${e}'`;
      var e = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(e);
      if (e) {
        return e.Value;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "找不到全局配置表的配置", ["全局表路径", "Source/Config/Raw/Tables/q.全局配置"], ["查询条件", r]);
      }
    }
  }
  GetDropConfig(e) {
    var r;
    if (e) {
      if (!(r = DropPackageById_1.configDropPackageById.GetConfig(e))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 18, "DropPackage表配置没找到", ["rewardId", e]);
        }
      }
      return r;
    }
  }
  GetItemInfoConfig(e) {
    var r = ItemInfoById_1.configItemInfoById.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "ItemInfo表配置没找到", ["Id", e]);
      }
    }
    return r;
  }
  GetQuestTypeConfigs() {
    return QuestTypeAll_1.configQuestTypeAll.GetConfigList();
  }
  GetQuestTypeConfig(e) {
    var r = QuestTypeById_1.configQuestTypeById.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "QuestType表配置没找到", ["Id", e]);
      }
    }
    return r;
  }
  GetQuestMainTypeConfig(e) {
    var r = QuestMainTypeById_1.configQuestMainTypeById.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "QuestMainType表配置没找到", ["Id", e]);
      }
    }
    return r;
  }
  GetQuesTypesByMainType(e) {
    return QuestTypeByMainId_1.configQuestTypeByMainId.GetConfigList(e);
  }
  GetQuestMainTypeName(e) {
    e = this.GetQuestMainTypeConfig(e);
    if (e) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MainTypeName) ?? "";
    } else {
      return "";
    }
  }
  GetQuestTabIcon(e) {
    e = this.GetQuestMainTypeConfig(e);
    if (e) {
      return e.QuestTabIcon;
    } else {
      return "";
    }
  }
  GetQuestTypeMark(e) {
    var r = TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
    if (r) {
      if (StringUtils_1.StringUtils.IsBlank(r.MarkPic) && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 65, "地图标记表MarkPic为空", ["markId", e]);
      }
      return r.MarkPic;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "地图标记表TaskMark：MarkId = 的配置找不到", ["markId", e]);
      }
      return "";
    }
  }
  GetQuestMarkConfig(e) {
    var r = TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
    if (r) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Quest", 18, "地图标记表TaskMark：MarkId = 的配置找不到", ["markId", e]);
    }
  }
  GetQuestTypeMarkId(e) {
    e = this.GetQuestMainTypeConfig(e);
    if (e) {
      return e.TrackIconId;
    }
  }
  GetChapterConfig(e) {
    var r = QuestChapterById_1.configQuestChapterById.GetConfig(e);
    if (r) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Quest", 18, "任务章节表：id = 的配置找不到", ["chapterId", e]);
    }
  }
  GetOccupationConfig(e) {
    var r = OccupationConfigById_1.configOccupationConfigById.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "找不到占用配置表的配置", ["全局表路径", "Source/Config/Raw/Tables/k.可视化编辑/z.占用组配置"], ["Id", e]);
      }
    }
    return r;
  }
  GetNewOccupationConfig(e) {
    var r = NewOccupationConfigById_1.configNewOccupationConfigById.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "找不到占用配置表的配置", ["全局表路径", "Source/Config/Raw/Tables/k.可视化编辑/z.占用组配置"], ["Id", e]);
      }
    }
    return r;
  }
  GetOccupationResourceName(e) {
    e = this.GetOccupationConfig(e);
    if (e) {
      return PublicUtil_1.PublicUtil.GetConfigTextByTable(4, e.Id);
    } else {
      return "";
    }
  }
  GetOccupationType(e) {
    e = this.GetOccupationConfig(e);
    if (e) {
      return e.OccupationType;
    } else {
      return "";
    }
  }
  GetQuestConfig(e) {
    var r = QuestDataById_1.configQuestDataById.GetConfig(e, false);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "找不到任务配置", ["questId", e]);
      }
    }
    return r;
  }
  GetQuestNodeConfig(e, r) {
    var t = QuestNodeDataByKey_1.configQuestNodeDataByKey.GetConfig(e + "_" + r, false);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "找不到任务节点配置", ["questId", e], ["nodeId", r]);
      }
    }
    return t;
  }
  GetQuestTypeColor(e) {
    var r = this.GetQuestTypeConfig(e);
    if (r) {
      return r.TypeColor;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Quest", 18, "任务类型表：id = 的配置找不到", ["questType", e]);
    }
  }
  GetQuestTypeTextColor(e) {
    var r = this.GetQuestTypeConfig(e);
    if (r) {
      return r.TextColor;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Quest", 18, "任务类型表：id = 的配置找不到", ["questType", e]);
    }
  }
  GetNewTipsShowTime(e) {
    e = this.GetQuestMainTypeConfig(e);
    if (e) {
      return e.NewQuestTipTime;
    } else {
      return 0;
    }
  }
  GetQuestUpdateShowTime(e) {
    e = this.GetQuestMainTypeConfig(e);
    if (e) {
      return e.QuestUpdateTipsTime;
    } else {
      return 0;
    }
  }
  GetQuestNodeAreaInfo(e, r) {
    var t;
    var o = e + "_" + r;
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (t = AreaQuestTrackingById_1.configAreaQuestTrackingById.GetConfig(o)) {
        return t.AreaList;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Quest", 18, "找不到任务节点所在的区域信息", ["questId", e], ["nodeId", r]);
        }
        return;
      }
    } else {
      return this.W1_.get(o);
    }
  }
}
exports.QuestNewConfig = QuestNewConfig;
//# sourceMappingURL=QuestConfig.js.map