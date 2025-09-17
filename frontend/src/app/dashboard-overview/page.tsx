"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, Train } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Indian Railways Decision Support System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Decision Support Card */}
        <Link href="/decisions">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Decision Recommendations</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">View AI-powered recommendations for train scheduling and routing decisions.</p>
            <div className="text-blue-600 font-medium">View recommendations →</div>
          </div>
        </Link>
        
        {/* Simulator Card */}
        <Link href="/simulator">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Scenario Simulator</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Run what-if scenarios to simulate different train parameters and section allocations.</p>
            <div className="text-blue-600 font-medium">Open simulator →</div>
          </div>
        </Link>
        
        {/* Disruption Management Card */}
        <Link href="/disruptions">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Disruption Management</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Report and manage disruptions across the railway network.</p>
            <div className="text-blue-600 font-medium">Manage disruptions →</div>
          </div>
        </Link>
      </div>
      
      {/* Quick Stats */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">System Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Active Trains</p>
            <p className="text-2xl font-bold">32</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">On-Time Performance</p>
            <p className="text-2xl font-bold">78%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Delay</p>
            <p className="text-2xl font-bold">12 min</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Alerts</p>
            <p className="text-2xl font-bold">2</p>
          </div>
        </div>
      </div>
      
      {/* Recent Alert */}
      <div className="mt-6 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-200 dark:border-red-900/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-500 mt-1" size={20} />
          <div>
            <h3 className="font-medium">Conflict Alert</h3>
            <p className="text-sm mt-1">Train #12301 and #12002 approaching same section at Ghaziabad Junction</p>
          </div>
        </div>
      </div>
    </div>
  );
}