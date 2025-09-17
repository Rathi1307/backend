"use client";

import { useState } from "react";
import { 
  Play, 
  RotateCcw, 
  Save, 
  Clock, 
  Train, 
  ArrowRight,
  BarChart,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart as RechartBarChart,
  Bar
} from "recharts";

// Mock data for trains
const mockTrains = [
  { id: "12301", name: "Rajdhani Express", type: "Express", priority: "High", currentDelay: 0 },
  { id: "12002", name: "Shatabdi Express", type: "Express", priority: "High", currentDelay: 5 },
  { id: "12213", name: "Duronto Express", type: "Express", priority: "Medium", currentDelay: 10 },
  { id: "FR2045", name: "Freight 2045", type: "Freight", priority: "Low", currentDelay: 15 },
  { id: "19019", name: "Dehradun Express", type: "Express", priority: "Medium", currentDelay: 8 },
];

// Mock data for sections
const mockSections = [
  { id: "SEC001", name: "Delhi-Agra", utilization: 75 },
  { id: "SEC002", name: "Agra-Gwalior", utilization: 60 },
  { id: "SEC003", name: "Gwalior-Jhansi", utilization: 80 },
  { id: "SEC004", name: "Jhansi-Bhopal", utilization: 65 },
];

// Mock data for comparison charts
const mockComparisonData = {
  delayImpact: [
    { name: "Current", rajdhani: 0, shatabdi: 5, duronto: 10, freight: 15, dehradun: 8 },
    { name: "Simulated", rajdhani: 0, shatabdi: 2, duronto: 5, freight: 20, dehradun: 4 },
  ],
  utilizationImpact: [
    { name: "Delhi-Agra", current: 75, simulated: 68 },
    { name: "Agra-Gwalior", current: 60, simulated: 55 },
    { name: "Gwalior-Jhansi", current: 80, simulated: 72 },
    { name: "Jhansi-Bhopal", current: 65, simulated: 60 },
  ],
  kpiComparison: [
    { name: "Avg Delay (min)", current: 7.6, simulated: 6.2 },
    { name: "Punctuality (%)", current: 82, simulated: 88 },
    { name: "Throughput (trains/hr)", current: 4.2, simulated: 4.5 },
    { name: "Utilization (%)", current: 70, simulated: 64 },
  ]
};

export default function SimulatorPage() {
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [simulationRun, setSimulationRun] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [modifications, setModifications] = useState<{
    trainPriority: Record<string, string>;
    trainDelay: Record<string, number>;
    sectionAllocation: Record<string, string[]>;
  }>({
    trainPriority: {},
    trainDelay: {},
    sectionAllocation: {},
  });

  const handlePriorityChange = (trainId: string, priority: string) => {
    setModifications(prev => ({
      ...prev,
      trainPriority: {
        ...prev.trainPriority,
        [trainId]: priority
      }
    }));
  };

  const handleDelayChange = (trainId: string, delay: number) => {
    setModifications(prev => ({
      ...prev,
      trainDelay: {
        ...prev.trainDelay,
        [trainId]: delay
      }
    }));
  };

  const runSimulation = () => {
    // In a real app, this would call an API to run the simulation
    setSimulationRun(true);
    setShowComparison(true);
  };

  const resetSimulation = () => {
    setModifications({
      trainPriority: {},
      trainDelay: {},
      sectionAllocation: {},
    });
    setSimulationRun(false);
    setShowComparison(false);
  };

  const saveScenario = () => {
    // In a real app, this would call an API to save the scenario
    alert("Scenario saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">What-If Scenario Simulator</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={runSimulation}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            disabled={simulationRun}
          >
            <Play size={16} />
            Run Simulation
          </button>
          <button
            onClick={resetSimulation}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md transition-colors"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          {simulationRun && (
            <button
              onClick={saveScenario}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              <Save size={16} />
              Save Scenario
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Train Modifications Panel */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Modify Train Parameters</h2>
          
          <div className="space-y-4">
            {mockTrains.map(train => (
              <div 
                key={train.id}
                className={`p-3 border rounded-md transition-colors ${
                  selectedTrain === train.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => setSelectedTrain(train.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{train.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                        {train.type}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                        ID: {train.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Current Priority</span>
                    <span className={`text-sm font-medium ${
                      train.priority === 'High' 
                        ? 'text-red-600 dark:text-red-400' 
                        : train.priority === 'Medium'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      {modifications.trainPriority[train.id] || train.priority}
                    </span>
                  </div>
                </div>

                {selectedTrain === train.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Priority
                      </label>
                      <select
                        value={modifications.trainPriority[train.id] || train.priority}
                        onChange={(e) => handlePriorityChange(train.id, e.target.value)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-1.5"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Delay (minutes)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={modifications.trainDelay[train.id] !== undefined ? modifications.trainDelay[train.id] : train.currentDelay}
                        onChange={(e) => handleDelayChange(train.id, parseInt(e.target.value))}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-1.5"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section Allocation Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Section Allocation & Scheduling</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {mockSections.map(section => (
              <div 
                key={section.id}
                className={`p-3 border rounded-md transition-colors ${
                  selectedSection === section.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => setSelectedSection(section.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{section.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                        ID: {section.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Utilization</span>
                    <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          section.utilization > 80 
                            ? 'bg-red-500' 
                            : section.utilization > 60 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${section.utilization}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {section.utilization}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedSection && selectedTrain && (
            <div className="p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Schedule Modification</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
                  <span className="block text-xs text-gray-500 dark:text-gray-400">Train</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {mockTrains.find(t => t.id === selectedTrain)?.name}
                  </span>
                </div>
                <ArrowRight size={20} className="text-gray-400" />
                <div className="flex-1 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
                  <span className="block text-xs text-gray-500 dark:text-gray-400">Section</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {mockSections.find(s => s.id === selectedSection)?.name}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Arrival Time
                  </label>
                  <input
                    type="time"
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Departure Time
                  </label>
                  <input
                    type="time"
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-1.5"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulation Results */}
      {simulationRun && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Simulation Results</h2>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400"
            >
              {showComparison ? (
                <>
                  <ChevronUp size={16} />
                  Hide Comparison
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  Show Comparison
                </>
              )}
            </button>
          </div>

          {/* KPI Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {mockComparisonData.kpiComparison.map((kpi, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{kpi.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{kpi.simulated}</span>
                  <div className="flex items-center">
                    <span className={`text-xs ${
                      kpi.name.includes("Delay") 
                        ? kpi.simulated < kpi.current ? "text-green-500" : "text-red-500"
                        : kpi.simulated > kpi.current ? "text-green-500" : "text-red-500"
                    }`}>
                      {kpi.name.includes("Delay") 
                        ? kpi.simulated < kpi.current ? "↓" : "↑"
                        : kpi.simulated > kpi.current ? "↑" : "↓"
                      } 
                      {Math.abs(((kpi.simulated - kpi.current) / kpi.current) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showComparison && (
            <div className="space-y-6">
              {/* Delay Impact Chart */}
              <div>
                <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Delay Impact by Train</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart
                      data={mockComparisonData.delayImpact}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Delay (minutes)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="rajdhani" name="Rajdhani Express" fill="#8884d8" />
                      <Bar dataKey="shatabdi" name="Shatabdi Express" fill="#82ca9d" />
                      <Bar dataKey="duronto" name="Duronto Express" fill="#ffc658" />
                      <Bar dataKey="freight" name="Freight 2045" fill="#ff8042" />
                      <Bar dataKey="dehradun" name="Dehradun Express" fill="#0088fe" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Section Utilization Chart */}
              <div>
                <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Section Utilization Comparison</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartBarChart
                      data={mockComparisonData.utilizationImpact}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Utilization (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" name="Current" fill="#8884d8" />
                      <Bar dataKey="simulated" name="Simulated" fill="#82ca9d" />
                    </RechartBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}