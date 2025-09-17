import React from "react";

export function Card(props: { title?: string; children: React.ReactNode; className?: string; right?: React.ReactNode }) {
    return (
        <div className={`rounded-xl border border-neutral-800 glass ${props.className || ""}`}>
            {(props.title || props.right) && (
                <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                    <div className="text-sm font-medium">{props.title}</div>
                    <div>{props.right}</div>
                </div>
            )}
            <div className="p-4">{props.children}</div>
        </div>
    );
}

export function KPI(props: { label: string; value: string; trend?: string }) {
    return (
        <div className="rounded-xl border border-neutral-800 glass p-4">
            <div className="text-neutral-400 text-sm">{props.label}</div>
            <div className="text-2xl md:text-3xl font-semibold mt-1">{props.value}</div>
            {props.trend && <div className="text-xs text-neutral-500 mt-1">{props.trend}</div>}
        </div>
    );
}

export function Badge(props: { children: React.ReactNode; className?: string }) {
    return <span className={`text-xs px-2 py-0.5 rounded-full border ${props.className || ""}`}>{props.children}</span>;
}

export function Skeleton({ className }: { className?: string }) {
    return <div className={`animate-pulse bg-neutral-800/60 rounded-md ${className || "h-4"}`} />;
}


