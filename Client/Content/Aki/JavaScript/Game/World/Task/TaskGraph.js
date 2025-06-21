"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TaskGraph = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
  TaskGraphVisualizer_1 = require("./TaskGraphVisualizer"),
  TaskUtils_1 = require("./TaskUtils");
class TaskGraph {
  constructor(r, s) {
    if (this.JQ1 = new Map, this.ZQ1 = [], this.E7 = (r, s) => {
        var e = (0, TaskUtils_1.getNodeCumulativePriorities)(this.JQ1, this.ZQ1);
        return e.get(r) - e.get(s)
      }, [...r.entries()].forEach(([r, s]) => {
        this.JQ1.set(r, {
          ...s,
          DependsOn: new Set,
          DependedOnBy: new Set,
          Failed: !1
        })
      }), s.forEach(([r, s]) => {
        var e = this.JQ1.get(r),
          o = this.JQ1.get(s);
        if (!e) throw new Error(`检查dependencies参数传入的被依赖ID: ${r}, 不在nodeMap中`);
        if (!o) throw new Error(`检查dependencies参数传入的依赖ID ${s}, 不在nodeMap中`);
        e.DependedOnBy.add(s), o.DependsOn.add(r)
      }), this.ZQ1 = (0, TaskUtils_1.getNodesWithNoDependencies)(this.JQ1), 0 === this.ZQ1.length && 0 < r.size) throw new Error("找不到Task执行起点, 可能有一个依赖链包含了所有的Task");
    r = (0, TaskUtils_1.graphHasCycles)(this.JQ1);
    if (r.HasCycle) throw new Error(`检测到了循环依赖:
` + r.Cycle.join("\n"));
    TaskGraph.VisualizeTaskGraph && Log_1.Log.CheckDebug() && Log_1.Log.Debug("TaskGraph", 72, new TaskGraphVisualizer_1.TaskGraphVisualizer(s).Visualize())
  }
  async Run(t) {
    const i = t?.Concurrency;
    if (void 0 !== i && i < 0) throw new Error("Concurrency需要是正数或者不传, 现在: " + t?.Concurrency);
    const a = new PriorityQueue_1.PriorityQueue(this.E7);
    this.ZQ1.forEach(r => {
      a.Push(r)
    });
    let n = 0;
    const h = async () => {
      const e = a.Pop();
      if (!e) throw new Error("尝试调度一个Task的时候, 发现没货了!");
      const o = this.JQ1.get(e);
      try {
        n += 1, o.Failed || await o.Run()
      } catch (r) {
        throw o.Failed = !0, r instanceof Error ? (Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("TaskGraph", 72, "TaskGraph执行异常", r, ["error", r.message], ["taskToRun", o]), r) : (Log_1.Log.CheckError() && Log_1.Log.Error("TaskGraph", 72, "TaskGraph执行异常", ["error", r], ["taskToRun", o]), new Error("TaskGraph执行异常"))
      } finally {
        (t?.ContinueEvenFail ?? !o.Failed) && (--n, o.DependedOnBy.forEach(r => {
          var s = this.JQ1.get(r);
          o.Failed && (s.Failed = !0), s.DependsOn.delete(e), 0 === s.DependsOn.size && a.Push(r)
        }))
      }
    };
    return new Promise((r, s) => {
      const e = [],
        o = () => {
          if (a.Empty && 0 === n) 0 === e.length ? r() : s(new TaskUtils_1.CompositeError(e));
          else
            for (; !a.Empty && (void 0 === i || n < i);) h().then(() => {
              o()
            }).catch(r => {
              r = r instanceof Error ? r : new Error("trySchedulingTasks error");
              e.push(r), t?.ContinueEvenFail ? o() : s(r)
            })
        };
      o()
    })
  }
}(exports.TaskGraph = TaskGraph).VisualizeTaskGraph = !1;
//# sourceMappingURL=TaskGraph.js.map