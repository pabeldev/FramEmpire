import React, { useState } from 'react';
import { FolderKanban, CheckSquare, Square, Calendar, DollarSign, UserCheck, Plus, Sparkles, AlertCircle } from 'lucide-react';
import { CLIENT_PROJECTS_PIPELINE } from '../../data/creativeData';

export default function ProjectKanban() {
  const [pipeline, setPipeline] = useState(CLIENT_PROJECTS_PIPELINE);

  const toggleTask = (projId, taskId) => {
    setPipeline(pipeline.map(proj => {
      if (proj.id === projId) {
        const updatedTasks = proj.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
        const completedCount = updatedTasks.filter(t => t.done).length;
        const newProgress = Math.round((completedCount / updatedTasks.length) * 100);
        return {
          ...proj,
          tasks: updatedTasks,
          progress: newProgress,
        };
      }
      return proj;
    }));
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['Syne'] text-xl font-bold text-white">Creative Project Pipeline & Deliverables</h2>
          <p className="text-xs text-slate-400">Track client milestones, render deliverables, and task completion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pipeline.map((proj) => (
          <div key={proj.id} className="neon-card p-6 border-cyan-500/20 space-y-4 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Discipline & Status */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                <span className="neon-badge text-[9px]">{proj.discipline}</span>
                <span className="text-xs font-bold text-yellow-400">{proj.status}</span>
              </div>

              {/* Title & Client */}
              <div>
                <h3 className="font-['Syne'] text-base font-bold text-white">{proj.name}</h3>
                <p className="text-xs text-slate-400">Client: <strong className="text-cyan-300">{proj.client}</strong></p>
              </div>

              {/* Metadata */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Project Lead:</span>
                  <span className="font-bold text-white">{proj.lead}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Budget:</span>
                  <span className="font-bold text-cyan-300">{proj.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Delivery:</span>
                  <span className="font-bold text-slate-300">{proj.dueDate}</span>
                </div>
              </div>

              {/* Interactive Milestone Checkbox List */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Milestone Checklist:</p>
                <div className="space-y-1.5">
                  {proj.tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(proj.id, task.id)}
                      className="flex items-start gap-2 text-left text-xs w-full p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors"
                    >
                      {task.done ? (
                        <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <span className={task.done ? 'line-through text-slate-500' : 'text-slate-200'}>
                        {task.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Progress Bar */}
            <div className="pt-4 border-t border-slate-800 space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Sprint Completion</span>
                <span className="font-bold text-cyan-300">{proj.progress}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${proj.progress}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
