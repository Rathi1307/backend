"use client";

import { useState } from "react";
import { 
  Check, 
  X, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  ThumbsUp, 
  ThumbsDown,
  BarChart,
  Clock
} from "lucide-react";

// Mock data for recommendations
const mockRecommendations = [
  {
    id: "rec-001",
    type: "precedence",
    description: "Give precedence to Rajdhani Express (12301) over Freight Train (FR-2045)",
    section: "Delhi-Agra",
    confidence: 92,
    impact: {
      delayReduction: 18,
      throughputIncrease: 2.5
    },
    reasoning: "Rajdhani Express is a high-priority train with 420 passengers. Giving precedence will minimize overall system delay by 18 minutes and improve section throughput.",
    alternatives: [
      {
        description: "Maintain current schedule",
        impact: {
          delayIncrease: 12,
          throughputDecrease: 1.2
        }
      }
    ]
  },
  {
    id: "rec-002",
    type: "crossing",
    description: "Schedule crossing for Shatabdi Express (12002) and Duronto Express (12213) at Mathura Junction",
    section: "Mathura-Kota",
    confidence: 87,
    impact: {
      delayReduction: 12,
      throughputIncrease: 1.8
    },
    reasoning: "Optimal crossing point based on current train positions and speeds. Will reduce cumulative delay by 12 minutes.",
    alternatives: [
      {
        description: "Schedule crossing at Sawai Madhopur",
        impact: {
          delayIncrease: 8,
          throughputDecrease: 0.5
        }
      }
    ]
  },
  {
    id: "rec-003",
    type: "platform",
    description: "Allocate Platform 3 for Gatimaan Express (12049) at Agra Cantt",
    section: "Agra-Gwalior",
    confidence: 95,
    impact: {
      delayReduction: 5,
      throughputIncrease: 1.2
    },
    reasoning: "Platform 3 is currently vacant and closest to the train's approach line. Will reduce station congestion and improve departure timing.",
    alternatives: [
      {
        description: "Allocate Platform 1",
        impact: {
          delayIncrease: 7,
          throughputDecrease: 0.8
        }
      }
    ]
  }
];

// Recommendation Card Component
interface RecommendationCardProps {
  recommendation: any;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const RecommendationCard = ({ recommendation, onAccept, onReject }: RecommendationCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                recommendation.type === 'precedence' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  : recommendation.type === 'crossing'
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              }`}>
                {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Section: {recommendation.section}</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{recommendation.description}</h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence:</span>
              <span className={`text-sm font-bold ${
                recommendation.confidence >= 90 
                  ? 'text-green-600 dark:text-green-400' 
                  : recommendation.confidence >= 75 
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>{recommendation.confidence}%</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onAccept(recommendation.id)}
                className="p-1.5 bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-800/40 text-green-600 dark:text-green-400 rounded-md transition-colors"
                title="Accept Recommendation"
              >
                <Check size={18} />
              </button>
              <button 
                onClick={() => onReject(recommendation.id)}
                className="p-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-800/40 text-red-600 dark:text-red-400 rounded-md transition-colors"
                title="Reject Recommendation"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-blue-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Delay reduction: <span className="font-medium text-blue-600 dark:text-blue-400">{recommendation.impact.delayReduction} min</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart size={16} className="text-purple-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Throughput increase: <span className="font-medium text-purple-600 dark:text-purple-400">{recommendation.impact.throughputIncrease}%</span>
            </span>
          </div>
        </div>
        
        <button 
          className="mt-3 flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUp size={16} />
              Hide details
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show details
            </>
          )}
        </button>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reasoning:</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{recommendation.reasoning}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alternatives:</h4>
            {recommendation.alternatives.map((alt: any, index: number) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-md mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">{alt.description}</p>
                <div className="mt-1 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-red-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Delay increase: <span className="font-medium text-red-600 dark:text-red-400">{alt.impact.delayIncrease} min</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart size={14} className="text-red-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Throughput decrease: <span className="font-medium text-red-600 dark:text-red-400">{alt.impact.throughputDecrease}%</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function DecisionsPage() {
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [filter, setFilter] = useState("all");
  const [feedback, setFeedback] = useState<{id: string, type: 'accepted' | 'rejected'} | null>(null);

  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === "all") return true;
    return rec.type === filter;
  });

  const handleAccept = (id: string) => {
    // In a real app, this would call an API to accept the recommendation
    setFeedback({id, type: 'accepted'});
    
    // Clear feedback after 3 seconds
    setTimeout(() => {
      setFeedback(null);
      // Remove the recommendation from the list
      setRecommendations(recommendations.filter(rec => rec.id !== id));
    }, 3000);
  };

  const handleReject = (id: string) => {
    // In a real app, this would call an API to reject the recommendation
    setFeedback({id, type: 'rejected'});
    
    // Clear feedback after 3 seconds
    setTimeout(() => {
      setFeedback(null);
      // Remove the recommendation from the list
      setRecommendations(recommendations.filter(rec => rec.id !== id));
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Decision Recommendations</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Filter:</span>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm px-3 py-1.5"
          >
            <option value="all">All Types</option>
            <option value="precedence">Precedence</option>
            <option value="crossing">Crossing</option>
            <option value="platform">Platform</option>
          </select>
        </div>
      </div>

      {feedback && (
        <div className={`p-3 rounded-md flex items-center gap-2 ${
          feedback.type === 'accepted' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}>
          {feedback.type === 'accepted' ? (
            <>
              <ThumbsUp size={18} />
              <span>Recommendation accepted. Implementing changes...</span>
            </>
          ) : (
            <>
              <ThumbsDown size={18} />
              <span>Recommendation rejected. No changes made.</span>
            </>
          )}
        </div>
      )}

      {filteredRecommendations.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-500">
              <Check size={24} />
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">All caught up!</h3>
          <p className="text-gray-500 dark:text-gray-400">There are no pending recommendations at this time.</p>
        </div>
      ) : (
        <div>
          {filteredRecommendations.map(recommendation => (
            <RecommendationCard 
              key={recommendation.id}
              recommendation={recommendation}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}