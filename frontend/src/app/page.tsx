"use client";

import { motion } from "framer-motion";
import { Activity, AlertTriangle, ArrowRight, BarChart3, Brain, Database, Train, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

export default function Home() {

  const [stats, setStats] = useState({
    totalTrains: 0,
    delayedTrains: 0,
    avgDelay: 0,
    conflicts: 0,
    apiStatus: "loading"
  });

  useEffect(() => {
    // Fetch quick stats from backend
    fetch(`${API_BASE}/api/status`)
      .then(res => res.json())
      .then(() => {
        // On successful connection, fetch KPIs
        setStats(prev => ({ ...prev, apiStatus: "connected" }));
        return fetch(`${API_BASE}/kpis/current`);
      })
      .then(res => res.json())
      .then(data => {
        setStats({
          totalTrains: data.total_trains || 0,
          delayedTrains: data.delayed_trains || 0,
          avgDelay: data.average_delay_minutes || 0,
          conflicts: Math.floor(Math.random() * 5), // Placeholder for demo
          apiStatus: "connected"
        });
      })
      .catch(() => {
        setStats(prev => ({ ...prev, apiStatus: "error" }));
      });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
            <span className="gradient-text">AlgoRail</span> Controller
          </h1>
          <p className="mt-4 text-neutral-300 max-w-3xl mx-auto text-lg">
            Intelligent Railway Traffic Management System powered by AI and Optimization Algorithms
          </p>
          <div className="mt-3 flex items-center justify-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stats.apiStatus === "connected" ? "bg-emerald-500/20 text-emerald-300" :
                stats.apiStatus === "error" ? "bg-red-500/20 text-red-300" :
                  "bg-amber-500/20 text-amber-300"
              }`}>
              <span className={`w-2 h-2 rounded-full mr-1.5 ${stats.apiStatus === "connected" ? "bg-emerald-400" :
                  stats.apiStatus === "error" ? "bg-red-400" :
                    "bg-amber-400"
                }`}></span>
              {stats.apiStatus === "connected" ? "Backend Connected" :
                stats.apiStatus === "error" ? "Connection Error" :
                  "Connecting..."}
            </span>
          </div>
        </motion.header>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          <QuickStat icon={<Train size={20} />} label="Total Trains" value={stats.totalTrains} />
          <QuickStat icon={<AlertTriangle size={20} />} label="Delayed Trains" value={stats.delayedTrains} />
          <QuickStat icon={<Activity size={20} />} label="Avg Delay (min)" value={stats.avgDelay.toFixed(1)} />
          <QuickStat icon={<Zap size={20} />} label="Active Conflicts" value={stats.conflicts} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <FeatureCard
            title="Controller Dashboard"
            desc="Real-time train monitoring, conflict detection, and optimization controls"
            href="/dashboard-main"
            icon={<Activity size={24} />}
            color="from-emerald-500/20 to-teal-500/20"
          />
          <FeatureCard
            title="Data Management"
            desc="Manage trains, sections, disruptions, and network infrastructure"
            href="/manage"
            icon={<Database size={24} />}
            color="from-blue-500/20 to-indigo-500/20"
          />
          <FeatureCard
            title="AI Decision Engine"
            desc="Submit scenarios to AI for intelligent decision support and optimization"
            href="/ai"
            icon={<Brain size={24} />}
            color="from-purple-500/20 to-pink-500/20"
          />
        </motion.div>

        {/* New Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FeatureCard
            title="Performance Analytics"
            desc="Comprehensive metrics, KPIs, and historical performance analysis"
            href="/dashboard-overview"
            icon={<BarChart3 size={24} />}
            color="from-amber-500/20 to-orange-500/20"
            isNew={true}
          />
          <FeatureCard
            title="What-If Simulator"
            desc="Simulate different scenarios and test optimization strategies"
            href="/simulator"
            icon={<Zap size={24} />}
            color="from-red-500/20 to-rose-500/20"
            isNew={true}
          />
        </motion.div>
      </div>
    </div>
  );
}

function QuickStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: number | string }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
      <div className="flex items-center gap-2 text-neutral-400 mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
  href,
  icon,
  color,
  isNew = false
}: {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  isNew?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all p-6 flex flex-col gap-3 relative overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30 group-hover:opacity-40 transition-opacity`}></div>

      {isNew && (
        <div className="absolute top-3 right-3 bg-emerald-500/90 text-white text-xs px-2 py-0.5 rounded-full">
          NEW
        </div>
      )}

      <div className="relative">
        <div className="w-10 h-10 rounded-lg bg-neutral-800/50 flex items-center justify-center text-neutral-300 group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>

      <div className="relative">
        <h2 className="text-lg md:text-xl font-medium mb-1">{title}</h2>
        <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">{desc}</p>
      </div>

      <div className="relative mt-auto pt-2 flex items-center text-sm text-neutral-500 group-hover:text-neutral-300">
        <span>Explore</span>
        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
